/**
 * /api/acta — Lector de actas de baloncesto con IA (función serverless de Vercel)
 *
 * Contrato (lo envía `src/lib/actaImportUI.ts` desde estadísticas y el informe del rival):
 *   POST /api/acta { modo: "texto", texto }   → el texto del acta SIN NOMBRES: el navegador los
 *                                              cambia por códigos (NOM1, NOM2…) y los repone él.
 *   POST /api/acta { modo: "foto", imagen }   → data URL JPEG/PNG. Solo con el consentimiento
 *                                              explícito del entrenador, porque lleva los nombres.
 *   → 200 { acta: { fecha, sinIntentos, equipos: [{ nombre, pts, jugadores: [{ nombre, dorsal, min,
 *           pts, t2c, t2i, t3c, t3i, tlc, tli, ro, rd, ast, rob, tap, per, fal }] }] } }
 *   → 502 { error, estados, detalle }
 *
 * La IA NO se cree: `normalizarActa` deja solo números enteros en rango, los intentos nunca por
 * debajo de los anotados y como mucho dos equipos. El entrenador revisa el resultado antes de
 * guardarlo (la web le avisa de lo que no cuadra).
 *
 * PRIVACIDAD: no se guarda nada. En modo texto aquí no llega ni un nombre.
 *
 * Env: OPENROUTER_API_KEY (obligatoria). CHAT_MODEL (opcional, fuerza un modelo).
 */
export const config = { maxDuration: 60 };

const RL_WINDOW_MS = 30 * 60 * 1000;
const RL_MAX = 20;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < RL_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > RL_MAX;
}

export const MAX_TEXTO = 15000;
export const MAX_IMAGEN = 3_500_000; // caracteres del data URL (~2,6 MB de imagen)

export const STATS = ["min", "t2c", "t2i", "t3c", "t3i", "tlc", "tli", "ro", "rd", "ast", "rob", "tap", "per", "fal"] as const;
type Stat = (typeof STATS)[number];
const TOPE: Record<Stat, number> = { min: 60, t2c: 60, t2i: 90, t3c: 30, t3i: 60, tlc: 40, tli: 50, ro: 40, rd: 40, ast: 40, rob: 30, tap: 20, per: 30, fal: 6 };

export interface JugadorLeido extends Record<Stat, number> {
  nombre: string;
  dorsal: string;
  pts: number | null;
}
export interface EquipoLeido {
  nombre: string;
  pts: number | null;
  jugadores: JugadorLeido[];
}
export interface ActaLeida {
  fecha: string;
  sinIntentos: boolean;
  equipos: EquipoLeido[];
}

const SYSTEM = `Lees actas y estadísticas de partidos de baloncesto (federaciones españolas: FEB, FCBQ y otras; en castellano o catalán) y las pasas a JSON. Respondes SOLO con el JSON, sin texto antes ni después.

FORMATO EXACTO:
{"fecha":"AAAA-MM-DD o vacío","sinIntentos":false,"equipos":[{"nombre":"…","pts":61,"jugadores":[{"dorsal":"7","nombre":"…","min":24,"pts":15,"t2c":4,"t2i":7,"t3c":1,"t3i":3,"tlc":4,"tli":4,"ro":2,"rd":4,"ast":3,"rob":2,"tap":0,"per":2,"fal":3}]}]}

CLAVES: min = minutos · t2c/t2i = tiros de 2 anotados/intentados · t3c/t3i = triples · tlc/tli = tiros libres (T1, TL, "tirs lliures") · ro/rd = rebotes ofensivos/defensivos · ast = asistencias · rob = recuperaciones/robos (BR, Rec) · tap = tapones · per = pérdidas (PP, BP) · fal = faltas personales cometidas · pts = puntos del jugador tal como aparecen.

REGLAS:
- Copia los números del acta. NO inventes ni calcules nada que no esté: un dato que no aparece es 0 (y "pts": null si no hay columna de puntos).
- "4/7", "4-7" o "4 de 7" = 4 anotados de 7 intentados. Si el acta da solo los anotados (sin intentos), pon intentos = anotados y "sinIntentos": true.
- Minutos "24:35" → 25 (redondea). Si no hay minutos, 0.
- Si solo hay rebotes totales, ponlos en "rd" y "ro": 0.
- Los nombres pueden venir cambiados por códigos como NOM3: cópialos EXACTOS, sin traducirlos ni completarlos.
- Un jugador por fila. NO incluyas filas de totales, equipo, entrenador, banquillo ni "Equip".
- Uno o dos equipos, en el orden en que salen. "pts" del equipo = su marcador final si aparece; si no, null.
- "fecha" solo si aparece en el acta.`;

const INSTRUCCION_FOTO = "Esta imagen es un acta o una tabla de estadísticas de un partido de baloncesto. Pásala al JSON. Lee con cuidado cada fila y cada columna: si un número no se lee bien, pon 0.";

/** Entero en [0, tope]; acepta "12", 12.4, "24:35" (minutos). */
function entero(v: unknown, tope: number): number {
  let n: number;
  if (typeof v === "number") n = v;
  else if (typeof v === "string") {
    const mmss = v.match(/^\s*(\d{1,2}):(\d{2})/);
    n = mmss ? +mmss[1] + +mmss[2] / 60 : parseFloat(v.replace(",", "."));
  } else n = NaN;
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(tope, Math.round(n));
}

function texto(v: unknown, max: number): string {
  if (typeof v !== "string" && typeof v !== "number") return "";
  return String(v).replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);
}

function puntosONull(v: unknown, tope: number): number | null {
  if (v === null || v === undefined || v === "") return null;
  const n = typeof v === "number" ? v : parseFloat(String(v));
  return Number.isFinite(n) && n >= 0 ? Math.min(tope, Math.round(n)) : null;
}

/** Saca el objeto JSON de la respuesta aunque venga entre ``` o con una frase delante. */
export function extraerJson(txt: string): unknown {
  const sinVallas = txt.replace(/```(?:json)?/gi, "");
  const a = sinVallas.indexOf("{");
  const b = sinVallas.lastIndexOf("}");
  if (a < 0 || b <= a) return null;
  try {
    return JSON.parse(sinVallas.slice(a, b + 1));
  } catch {
    return null;
  }
}

/** Lo que devuelve el modelo → un acta con números en rango, o `null` si no hay ni un jugador. */
export function normalizarActa(raw: unknown): ActaLeida | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const equipos: EquipoLeido[] = [];
  for (const e of Array.isArray(r.equipos) ? r.equipos : []) {
    if (!e || typeof e !== "object") continue;
    const x = e as Record<string, unknown>;
    const jugadores: JugadorLeido[] = [];
    for (const j of Array.isArray(x.jugadores) ? x.jugadores : []) {
      if (!j || typeof j !== "object") continue;
      const y = j as Record<string, unknown>;
      const nombre = texto(y.nombre, 60);
      const dorsal = texto(y.dorsal, 3).replace(/\D/g, "");
      if (!nombre && !dorsal) continue;
      if (/^(total|totals|totales|equip|equipo|team)\b/i.test(nombre)) continue;
      const g = { nombre, dorsal, pts: puntosONull(y.pts, 150) } as JugadorLeido;
      for (const k of STATS) g[k] = entero(y[k], TOPE[k]);
      // los intentos nunca por debajo de los anotados
      g.t2i = Math.max(g.t2i, g.t2c);
      g.t3i = Math.max(g.t3i, g.t3c);
      g.tli = Math.max(g.tli, g.tlc);
      jugadores.push(g);
      if (jugadores.length === 25) break;
    }
    if (!jugadores.length) continue;
    equipos.push({ nombre: texto(x.nombre, 60), pts: puntosONull(x.pts, 300), jugadores });
    if (equipos.length === 2) break;
  }
  if (!equipos.length) return null;
  const f = texto(r.fecha, 10);
  return {
    fecha: /^\d{4}-\d{2}-\d{2}$/.test(f) ? f : "",
    sinIntentos: r.sinIntentos === true,
    equipos,
  };
}

// Gemela de la de `chat.ts`/`sesion.ts`: los modelos gratis vuelcan a veces su razonamiento en `content`.
const limpiarRespuesta = (t: string) => t.replace(/<think>[\s\S]*?<\/think>/gi, "").replace(/<\/?think>/gi, "").trim();

export default async function handler(req: any, res: any) {
  const origin = (req.headers["origin"] || "").toString();
  if (/^https:\/\/(www\.)?canchazapa\.com$/.test(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") { res.status(204).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  let body: any;
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  } catch {
    res.status(400).json({ error: "JSON inválido" });
    return;
  }
  const modo = body.modo === "foto" ? "foto" : body.modo === "texto" ? "texto" : "";
  let contenido: unknown;
  if (modo === "texto") {
    const t = typeof body.texto === "string" ? body.texto.replace(/\r/g, "").trim() : "";
    if (t.length < 20) { res.status(400).json({ error: "El acta está vacía." }); return; }
    if (t.length > MAX_TEXTO) { res.status(413).json({ error: "El acta es demasiado larga: pega solo la tabla de estadísticas." }); return; }
    contenido = `ACTA:\n${t}`;
  } else if (modo === "foto") {
    const img = typeof body.imagen === "string" ? body.imagen : "";
    if (!/^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/.test(img)) { res.status(400).json({ error: "Imagen no válida." }); return; }
    if (img.length > MAX_IMAGEN) { res.status(413).json({ error: "La imagen es demasiado grande." }); return; }
    contenido = [
      { type: "text", text: INSTRUCCION_FOTO },
      { type: "image_url", image_url: { url: img } },
    ];
  } else {
    res.status(400).json({ error: "modo desconocido" });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) { res.status(500).json({ error: "IA sin configurar" }); return; }

  const ip = (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() || req.socket?.remoteAddress || "anon";
  if (rateLimited(ip)) { res.status(429).json({ error: "Has leído muchas actas seguidas. Espera un rato." }); return; }

  // Para la foto solo valen los gratuitos que aceptan imagen (medido el 22-oct-2026 contra
  // /api/v1/models, `architecture.input_modalities`). Para el texto, la cadena de siempre.
  const models = process.env.CHAT_MODEL
    ? [process.env.CHAT_MODEL]
    : modo === "foto"
      ? [
          "google/gemma-4-31b-it:free",
          "nvidia/nemotron-3.5-super-vl:free",
          "google/gemma-4-26b-a4b-it:free",
          "minimax/minimax-m3.1-flash:free",
        ]
      : [
          "google/gemma-4-31b-it:free",
          "nvidia/nemotron-3-super-120b-a12b:free",
          "minimax/minimax-m3.1-flash:free",
          "google/gemma-4-26b-a4b-it:free",
          "nvidia/nemotron-3.5-super-vl:free",
        ];
  const payload = (sel: { models: string[] } | { model: string }) =>
    JSON.stringify({
      ...sel,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: contenido },
      ],
      max_tokens: 4000,
      temperature: 0,
      reasoning: { enabled: false, exclude: true },
    });
  const intentos: { etiqueta: string; body: string }[] = [];
  if (models.length > 1) intentos.push({ etiqueta: "cadena", body: payload({ models: models.slice(0, 3) }) });
  for (const m of models) intentos.push({ etiqueta: m, body: payload({ model: m }) });

  const fallos: number[] = [];
  const detalles: string[] = [];
  const deadline = Date.now() + 54000;
  for (const intento of intentos) {
    const restante = deadline - Date.now();
    if (restante < 4000) break;
    try {
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://canchazapa.com",
          "X-Title": "CANCHA.ZAPA",
        },
        body: intento.body,
        signal: AbortSignal.timeout(Math.min(45000, restante - 1000)),
      });
      if (!r.ok) {
        const txt = await r.text().catch(() => "");
        fallos.push(r.status);
        detalles.push(`${intento.etiqueta}:${r.status}:${txt.slice(0, 140)}`);
        continue;
      }
      const jr = await r.json();
      const txt = limpiarRespuesta(jr?.choices?.[0]?.message?.content ?? "");
      if (!txt) { fallos.push(204); continue; }
      const acta = normalizarActa(extraerJson(txt));
      if (!acta) {
        fallos.push(422); // respondió, pero sin un acta con jugadores dentro
        detalles.push(`${intento.etiqueta}:422:${txt.slice(0, 120)}`);
        continue;
      }
      const modelo = String(jr?.model ?? intento.etiqueta);
      console.log("[api/acta] respondió", modelo, modo);
      res.setHeader("X-CZ-Model", modelo);
      res.status(200).json({ acta });
      return;
    } catch (err) {
      fallos.push(0);
      console.error("[api/acta]", intento.etiqueta, err);
    }
  }

  res.status(502).json({
    error: "La IA no ha podido leer el acta",
    estados: fallos.join(","),
    detalle: detalles.join(" | ").slice(0, 900),
  });
}
