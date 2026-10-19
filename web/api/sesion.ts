/**
 * /api/sesion — Generador de sesiones de entrenamiento con IA (función serverless de Vercel)
 *
 * Contrato (lo envía la pizarra, panel de sesiones):
 *   POST /api/sesion {
 *     etapa:     "premini" | "mini" | "infantil" | "cadete" | "junior-senior",
 *     duracion:  minutos totales (30-150),
 *     jugadores: número o null,
 *     peticion:  texto libre del entrenador ("bloqueo directo y defensa del pick and roll")
 *   }
 *   → 200 { plan: { titulo, objetivo, bloques: [{ titulo, minutos, ejercicio, notas, material }] } }
 *   → 502 { code, estados, detalle }  (el cliente monta entonces la sesión base de su etapa)
 *
 * La IA NO se cree: el plan se valida aquí (`normalizarPlan`) antes de devolverlo. Los minutos
 * se reparten para sumar EXACTO la duración pedida, un ejercicio que no existe en la biblioteca
 * pasa a bloque de texto y todos los textos se recortan.
 *
 * PRIVACIDAD: solo viaja la petición del entrenador; no se guarda. El aviso del formulario pide
 * no escribir nombres de jugadores.
 *
 * Env: OPENROUTER_API_KEY (obligatoria). CHAT_MODEL (opcional, fuerza un modelo).
 */
// 60 s: un plan largo tarda 15-20 s en nemotron y con 30 s el primer intento se cortaba
// (medido el 19-oct en producción, 105 min de júnior: `estados: 0,429,404,0`).
export const config = { maxDuration: 60 };

const RL_WINDOW_MS = 30 * 60 * 1000;
const RL_MAX = 12;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < RL_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > RL_MAX;
}

// ─── catálogo que conoce el modelo ────────────────────────────────────────
// Duplicado A PROPÓSITO de `src/lib/pizarraPlantillas.ts` (las funciones de /api son
// autocontenidas). `sesion.test.ts` comprueba que cada id siga existiendo allí.
export const EJERCICIOS_IA: { id: string; nombre: string; uso: string }[] = [
  { id: "ejercicio-rueda-bandejas", nombre: "Rueda de bandejas (dos lados)", uso: "bandejas en carrera, dos filas en las alas; calentamiento o finalización" },
  { id: "ejercicio-mikan", nombre: "Mikan", uso: "bandejas alternas bajo el aro, mano débil; individual o por parejas" },
  { id: "ejercicio-tres-hombres", nombre: "3 hombres (trenza)", uso: "pase en carrera por tríos a pista completa; transición" },
  { id: "ejercicio-3c2-2c1", nombre: "3c2 y 2c1 continuo", uso: "superioridad y toma de decisiones a pista completa; transición en grupos de 5" },
  { id: "ejercicio-1c1-cierre", nombre: "1c1 con salida desde el aro", uso: "cierre defensivo (closeout) y ataque al aro por parejas; defensa individual" },
  { id: "ejercicio-tiro-estrella", nombre: "Tiro en estrella", uso: "tiro tras recepción en cinco puestos con rotación" },
  { id: "ejercicio-tiro-rebote-pase", nombre: "Tiro con rebote y pase", uso: "tirador, reboteador y pasador por tríos; tiro con volumen" },
  { id: "ejercicio-zigzag-defensivo", nombre: "Zig-zag defensivo por parejas", uso: "desplazamientos defensivos delante del que bota; defensa individual" },
  { id: "ejercicio-cierre-rebote", nombre: "Cierre de rebote por parejas", uso: "bloqueo de rebote (box out) tras tiro del entrenador" },
  { id: "ejercicio-2c2-bloqueo-directo", nombre: "2c2 de bloqueo directo", uso: "base y pívot contra dos: bloqueo directo, continuación y su defensa" },
  { id: "ejercicio-pase-y-corte", nombre: "Pase y corte (dar y ir)", uso: "pasar al ala y cortar al aro por delante del defensor" },
  { id: "ejercicio-shell-4c4", nombre: "Concha defensiva 4c4", uso: "posiciones de presión, negación y ayuda en cada pase; defensa de equipo" },
];

const ETAPAS: Record<string, { nombre: string; edades: string; guia: string }> = {
  premini: {
    nombre: "Premini",
    edades: "6-8 años",
    guia: "Todo en forma de juego y con un balón por jugador siempre que se pueda. Bote, pase, bandeja y coordinación. Nada de sistemas, nada de filas de más de 3. Partidillos 2c2 o 3c3 en campos pequeños. Bloques cortos (5-12 min).",
  },
  mini: {
    nombre: "Mini",
    edades: "9-11 años",
    guia: "Fundamentos con oposición progresiva, pase y ocupación de carriles, 1c1 y juego reducido (2c2, 3c3). En minibasket la defensa es INDIVIDUAL: no planifiques zona. Sistemas solo como pase y corte simples.",
  },
  infantil: {
    nombre: "Infantil",
    edades: "12-13 años",
    guia: "Fundamentos individuales con toma de decisiones: lectura del defensor, ventajas en 2c1 y 3c2, defensa individual con ayudas. Se puede introducir el bloqueo directo y el bloqueo indirecto de forma simple. Juego reducido y 5c5 condicionado.",
  },
  cadete: {
    nombre: "Cadete",
    edades: "14-15 años",
    guia: "Intensidad y conceptos tácticos: bloqueo directo y su defensa, ayudas y rotaciones, transición y balance. Ejercicios con competición y 5c5 con reglas que obliguen a lo que se trabaja.",
  },
  "junior-senior": {
    nombre: "Júnior / Sénior",
    edades: "16 años o más",
    guia: "Ritmo e intensidad de partido, situaciones especiales (final de cuarto, bonus, saques), ejecución táctica y 5c5 con contexto de marcador.",
  },
};

export const DURACION_MIN = 30;
export const DURACION_MAX = 150;
const MIN_POR_BLOQUE = 3;
const MAX_BLOQUES = 10;
const MIN_BLOQUES = 3;

function buildSystem(etapa: string, duracion: number, jugadores: number | null): string {
  const e = ETAPAS[etapa];
  const lista = EJERCICIOS_IA.map((x) => `- ${x.id}: ${x.nombre} (${x.uso})`).join("\n");
  return `Eres un entrenador de baloncesto de formación en España. Diseñas UNA sesión de entrenamiento y la devuelves SOLO como JSON válido, sin texto antes ni después y sin bloques de código.

EQUIPO: ${e.nombre} (${e.edades}). ${jugadores ? `${jugadores} jugadores.` : "Número de jugadores sin indicar."}
DURACIÓN TOTAL: ${duracion} minutos (la suma de los bloques debe dar exactamente ${duracion}).
CRITERIOS DE LA ETAPA: ${e.guia}

EJERCICIOS DIBUJADOS DISPONIBLES (úsalos con su id en "ejercicio" SOLO si encajan de verdad; si no, deja "ejercicio": null y describe el ejercicio en "notas". Si un bloque ES uno de estos, pon su id aunque lo adaptes):
${lista}

FORMATO EXACTO:
{"titulo":"…","objetivo":"…","bloques":[{"titulo":"…","minutos":10,"ejercicio":null,"notas":"…","material":"…"}]}

REGLAS:
- Castellano de España, tono de entrenador, frases cortas.
- Entre 4 y 8 bloques. Empieza con una activación con balón y acaba con una vuelta a la calma corta.
- Cada bloque debe ser algo que se pueda hacer en una pista: en "notas" explica la organización (filas, parejas, tríos, canastas)${jugadores ? ` pensada para ${jugadores} jugadores` : ""}, la consigna principal y una corrección clave. Máximo 3 frases.
- "titulo" de la sesión de menos de 60 caracteres. "objetivo" en una frase.
- "material" corto (balones, conos, petos) o cadena vacía.
- Trabaja lo que pide el entrenador, sin salirte de lo que es razonable para la edad.
- No escribas nombres de jugadores.`;
}

// ─── validación del plan ──────────────────────────────────────────────────
export interface BloquePlan {
  titulo: string;
  minutos: number;
  ejercicio: string | null;
  notas: string;
  material: string;
}
export interface PlanSesion {
  titulo: string;
  objetivo: string;
  bloques: BloquePlan[];
}

/** Texto plano de una línea (o varias si `multilinea`), sin caracteres de control y recortado. */
function limpio(v: unknown, max: number, multilinea = false): string {
  if (typeof v !== "string") return "";
  let t = v.replace(multilinea ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ");
  t = t.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  if (t.length <= max) return t;
  const corte = t.slice(0, max);
  const fin = Math.max(corte.lastIndexOf(". "), corte.lastIndexOf("\n"));
  return (fin > max * 0.5 ? corte.slice(0, fin + 1) : corte.replace(/\s+\S*$/, "") + "…").trim();
}

/** Reparte `total` en proporción a `pesos`, con mínimo por bloque y suma EXACTA. Gemela de
 *  `repartirMinutos` en `src/lib/pizarraSesionesEdad.ts`. */
export function repartir(pesos: number[], total: number, minimo = MIN_POR_BLOQUE): number[] {
  if (!pesos.length) return [];
  const suma = pesos.reduce((a, b) => a + b, 0) || 1;
  const out = pesos.map((p) => Math.max(minimo, Math.round((p / suma) * total)));
  let diff = total - out.reduce((a, b) => a + b, 0);
  const orden = out.map((_, i) => i).sort((a, b) => out[b] - out[a]);
  for (let k = 0; diff !== 0 && k < orden.length * 60; k++) {
    const i = orden[k % orden.length];
    if (diff > 0) {
      out[i]++;
      diff--;
    } else if (out[i] > minimo) {
      out[i]--;
      diff++;
    }
  }
  return out;
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

/**
 * Convierte lo que devuelve el modelo en un plan que la pizarra puede usar sin más
 * comprobaciones, o `null` si no hay por dónde cogerlo.
 */
export function normalizarPlan(raw: unknown, duracion: number): PlanSesion | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const ids = new Map(EJERCICIOS_IA.map((x) => [x.id, x.nombre]));
  const crudos = Array.isArray(r.bloques) ? r.bloques : [];
  const bloques: BloquePlan[] = [];
  const pesos: number[] = [];
  for (const b of crudos) {
    if (!b || typeof b !== "object") continue;
    const x = b as Record<string, unknown>;
    const ej = typeof x.ejercicio === "string" && ids.has(x.ejercicio.trim()) ? x.ejercicio.trim() : null;
    const titulo = limpio(x.titulo, 60) || (ej ? ids.get(ej)! : "");
    if (!titulo) continue;
    const m = Number(x.minutos);
    pesos.push(Number.isFinite(m) && m > 0 ? Math.min(m, 90) : 10);
    bloques.push({ titulo, minutos: 0, ejercicio: ej, notas: limpio(x.notas, 420, true), material: limpio(x.material, 80) });
    if (bloques.length === MAX_BLOQUES) break;
  }
  if (bloques.length < MIN_BLOQUES) return null;
  const total = Math.max(DURACION_MIN, Math.min(DURACION_MAX, Math.round(duracion)));
  repartir(pesos, total).forEach((m, i) => (bloques[i].minutos = m));
  return {
    titulo: limpio(r.titulo, 70) || "Sesión generada",
    objetivo: limpio(r.objetivo, 220),
    bloques,
  };
}

// Gemela de la de `chat.ts`/`coach.ts`: los modelos gratis de la cadena son de razonamiento y
// a veces vuelcan su planificación en `content`, en inglés y sin etiquetas.
const RAZONAMIENTO = /\b(?:we (?:need|should|can|must|have)\b|let(?:'s| us| me)\b|i (?:need|should|will|'ll)\b|the user (?:is |wants|asked|said)|okay,? (?:the user|so)\b|first,? (?:i|we|let)\b)/i;
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
  const etapa = String(body.etapa ?? "");
  if (!ETAPAS[etapa]) { res.status(400).json({ error: "etapa desconocida" }); return; }
  const duracion = Math.round(Number(body.duracion));
  if (!Number.isFinite(duracion) || duracion < DURACION_MIN || duracion > DURACION_MAX) {
    res.status(400).json({ error: `duración entre ${DURACION_MIN} y ${DURACION_MAX} minutos` });
    return;
  }
  const j = Math.round(Number(body.jugadores));
  const jugadores = Number.isFinite(j) && j >= 2 && j <= 30 ? j : null;
  const peticion = limpio(body.peticion, 400);
  if (peticion.length < 3) { res.status(400).json({ error: "escribe qué quieres trabajar" }); return; }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) { res.status(500).json({ error: "IA sin configurar" }); return; }

  const ip = (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() || req.socket?.remoteAddress || "anon";
  if (rateLimited(ip)) { res.status(429).json({ error: "Has generado muchas seguidas. Espera un rato." }); return; }

  // Misma cadena gratuita y mismo orden que /api/coach (ver allí y en chat.ts el porqué de
  // cada eslabón). Primero la cadena en `models` (tope 3), detrás de uno en uno.
  const models = process.env.CHAT_MODEL
    ? [process.env.CHAT_MODEL]
    : [
        "google/gemma-4-31b-it:free",
        "nvidia/nemotron-3-super-120b-a12b:free",
        "minimax/minimax-m3.1-flash:free", // nuevo el 19-oct-2026, sin validar
        "google/gemma-4-26b-a4b-it:free",
        // 🔴 19-oct-2026, medido contra /api/v1/models: qwen3.8-27b (404 "unavailable for free"),
        // ling-3.0-flash-vl y glm-5.2 ya no existen gratis. Entran tres vivos ese día, SIN VALIDAR:
        // el modelo que contesta sale en la cabecera X-CZ-Model y los fallos en `detalle`.
        "nvidia/nemotron-3.5-super-vl:free",
        "nvidia/nemotron-3-ultra-550b-a55b:free",
      ];
  const SYSTEM = buildSystem(etapa, duracion, jugadores);
  const payload = (sel: { models: string[] } | { model: string }) =>
    JSON.stringify({
      ...sel,
      messages: [
        { role: "system", content: SYSTEM },
        { role: "user", content: `Quiero trabajar: ${peticion}` },
      ],
      max_tokens: 1800,
      temperature: 0.5,
      reasoning: { enabled: false, exclude: true },
    });
  const intentos: { etiqueta: string; body: string }[] = [];
  if (models.length > 1) intentos.push({ etiqueta: "cadena", body: payload({ models: models.slice(0, 3) }) });
  for (const m of models) intentos.push({ etiqueta: m, body: payload({ model: m }) });

  const fallos: number[] = [];
  const detalles: string[] = [];
  const deadline = Date.now() + 52000;
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
        signal: AbortSignal.timeout(Math.min(40000, restante - 1000)),
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
      if (RAZONAMIENTO.test(txt.slice(0, 300)) && !txt.trimStart().startsWith("{")) {
        fallos.push(205);
        detalles.push(`${intento.etiqueta}:205:razonamiento en content`);
        continue;
      }
      const plan = normalizarPlan(extraerJson(txt), duracion);
      if (!plan) {
        fallos.push(422); // 422 = respondió, pero no hay un plan válido dentro
        detalles.push(`${intento.etiqueta}:422:${txt.slice(0, 120)}`);
        continue;
      }
      const modelo = String(jr?.model ?? intento.etiqueta);
      console.log("[api/sesion] respondió", modelo);
      res.setHeader("X-CZ-Model", modelo);
      res.status(200).json({ plan });
      return;
    } catch (err) {
      fallos.push(0);
      console.error("[api/sesion]", intento.etiqueta, err);
    }
  }

  // Sin fallback aquí: lo monta el cliente con la sesión base de la etapa, que ya tiene.
  res.status(502).json({
    error: "La IA no ha respondido",
    estados: fallos.join(","),
    detalle: detalles.join(" | ").slice(0, 900),
  });
}
