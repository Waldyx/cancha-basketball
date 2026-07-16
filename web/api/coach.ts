/**
 * /api/coach — Entrenador IA sobre TUS estadísticas (función serverless de Vercel)
 *
 * Contrato (lo envía /estadisticas):
 *   POST /api/coach {
 *     perfil:   { nombre?, posicion? },
 *     resumen:  { n, ppg, rpg, apg, ... },        // agregados de temporada (cliente)
 *     partidos: [{ fecha, rival, res, min, pts, reb, ast, rob, tap, per, fal, ts, val }],
 *     messages: [{ role:"user"|"assistant", content }]
 *   }
 *   → 200 { reply }
 *
 * El modelo se ancla SOLO a estos datos (no inventa partidos ni números). Reutiliza la
 * misma cadena de modelos gratuitos de OpenRouter que /api/chat.
 *
 * PRIVACIDAD: los partidos viven en el navegador (localStorage). Solo se envían aquí
 * cuando el usuario hace una pregunta al agente, para poder analizarlos. No se guardan.
 *
 * Env: OPENROUTER_API_KEY (obligatoria). CHAT_MODEL (opcional, fuerza un modelo).
 */
export const config = { maxDuration: 30 };

const RL_WINDOW_MS = 30 * 60 * 1000;
const RL_MAX = 25;
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < RL_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear();
  return arr.length > RL_MAX;
}

type Msg = { role: string; content: string };
const num = (v: unknown, d = 0) => { const x = Number(v); return Number.isFinite(x) ? x : d; };
const f1 = (v: unknown) => (v == null || !Number.isFinite(Number(v)) ? "—" : Number(v).toFixed(1));

function buildSystem(perfil: any, resumen: any, partidos: any[]): string {
  const pos = String(perfil?.posicion ?? "").trim() || "sin especificar";
  const nombre = String(perfil?.nombre ?? "").trim() || "el jugador";
  const r = resumen ?? {};
  const resumenTxt = r && r.n
    ? [
        `Partidos: ${num(r.n)}`,
        `Puntos/partido: ${f1(r.ppg)}`,
        `Rebotes/partido: ${f1(r.rpg)}`,
        `Asistencias/partido: ${f1(r.apg)}`,
        `Robos/partido: ${f1(r.spg)}`,
        `Faltas/partido: ${f1(r.fpg)}`,
        `Valoración media: ${f1(r.valAvg)}`,
        `TS% (tiro real): ${r.ts == null ? "—" : f1(r.ts) + "%"}`,
        `eFG%: ${r.efg == null ? "—" : f1(r.efg) + "%"}`,
        `Tiros libres: ${r.tlPct == null ? "—" : f1(r.tlPct) + "%"}`,
        `Triple: ${r.t3Pct == null ? "—" : f1(r.t3Pct) + "%"}`,
      ].join(" · ")
    : "Sin partidos registrados todavía.";

  const tabla = partidos.length
    ? partidos
        .map((g, i) =>
          `J${i + 1} ${g.fecha || "?"} vs ${String(g.rival || "?").slice(0, 24)} [${g.res || "-"}] ` +
          `${num(g.min)}min ${num(g.pts)}pts ${num(g.reb)}reb ${num(g.ast)}ast ${num(g.rob)}rob ` +
          `${num(g.tap)}tap ${num(g.per)}per ${num(g.fal)}fal TS%${g.ts == null ? "—" : Math.round(num(g.ts))} VAL${num(g.val)}`
        )
        .join("\n")
    : "(sin partidos)";

  return `Eres el ANALISTA/ENTRENADOR de baloncesto de CANCHA.ZAPA. Analizas el rendimiento de ${nombre} (posición: ${pos}) SOLO a partir de las estadísticas de abajo. Hablas castellano de España, directo y honesto ("sin BS"), tuteas.

REGLAS:
- Usa SOLO estos datos. NUNCA inventes partidos, rivales ni números que no estén aquí.
- Sé concreto y accionable: cita números y partidos reales ("en los últimos 3 tu TS% cae a X", "vs CB Tal metiste Y"). Nada de generalidades de coach de manual.
- Si te preguntan algo que estos datos no pueden responder (p. ej. altura, minutos por cuarto, algo no registrado), dilo claro en una frase y ofrece lo que sí puedes analizar.
- Métricas: TS% = eficiencia real de anotación (bueno ≳55%, élite ≳60%). eFG% ajusta el triple. VAL = valoración FIBA (aporte − errores). AST/PÉR alto = cuidas el balón.
- Respuestas breves y útiles: 2-5 frases. Si procede, 1-2 consejos de entrenamiento concretos.
- Solo si viene MUY a cuento del material (mucho desgaste/saltos/tracción), puedes sugerir de pasada el quiz de zapatillas (/quiz) o /rankings. No fuerces la venta.

RESUMEN DE TEMPORADA:
${resumenTxt}

PARTIDOS (más antiguo → más reciente):
${tabla}`;
}

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

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) { res.status(500).json({ reply: "El agente no está configurado todavía." }); return; }

  const ip = (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() || req.socket?.remoteAddress || "anon";
  if (rateLimited(ip)) { res.status(429).json({ reply: "Has preguntado mucho seguido. Espera un poco y vuelve." }); return; }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const partidos = (Array.isArray(body.partidos) ? body.partidos : []).slice(-40);
  const messages: Msg[] = (Array.isArray(body.messages) ? body.messages : [])
    .filter((m: any) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-10)
    .map((m: any) => ({ role: m.role, content: m.content.slice(0, 600) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    res.status(400).json({ error: "messages inválido" });
    return;
  }
  if (!partidos.length) {
    res.status(200).json({ reply: "Aún no tienes partidos registrados. Apunta o importa alguno y te analizo el juego al detalle." });
    return;
  }

  const SYSTEM = buildSystem(body.perfil, body.resumen, partidos);

  const models = process.env.CHAT_MODEL
    ? [process.env.CHAT_MODEL]
    : [
        "google/gemma-4-31b-it:free",
        "meta-llama/llama-3.3-70b-instruct:free",
        "qwen/qwen3-next-80b-a3b-instruct:free",
        "openai/gpt-oss-120b:free",
        "google/gemma-4-26b-a4b-it:free",
      ];

  const payload = (model: string) =>
    JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      max_tokens: 500,
      temperature: 0.4,
    });

  const deadline = Date.now() + 25000;
  for (const model of models) {
    const remaining = deadline - Date.now();
    if (remaining < 2500) break;
    try {
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://canchazapa.com",
          "X-Title": "CANCHA.ZAPA",
        },
        body: payload(model),
        signal: AbortSignal.timeout(Math.min(12000, remaining)),
      });
      if (!r.ok) {
        const detail = await r.text().catch(() => "");
        console.error("[api/coach]", model, r.status, detail.slice(0, 200));
        continue;
      }
      const data = await r.json();
      const reply = data?.choices?.[0]?.message?.content ?? "";
      if (!reply) continue;
      res.status(200).json({ reply });
      return;
    } catch (err) {
      console.error("[api/coach]", model, err);
    }
  }
  res.status(502).json({ reply: "Uy, no he podido analizar ahora mismo. Reinténtalo en un momento." });
}
