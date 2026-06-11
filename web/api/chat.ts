/**
 * /api/chat — Asistente IA de CANCHA.ZAPA (función serverless de Vercel)
 *
 * Por qué función standalone (no ruta Astro): la web se compila 100% estática
 * (output `dist`). Una función en `/api` es puramente aditiva — Vercel la detecta
 * y la despliega como serverless junto al build estático, sin tocar el resto del
 * sitio. Así el chat NO arriesga el catálogo en producción.
 *
 * Contrato (lo que envía ChatWidget.astro):
 *   POST /api/chat  { messages: [{ role: "user"|"assistant", content: "..." }, ...] }
 *   → 200 { reply: "texto con [[shoe:slug]] opcionales" }
 *
 * El LLM se ancla SIEMPRE al catálogo (RAG por inyección en el system prompt):
 * no inventa modelos ni specs — solo usa las ~205 zapas reales.
 *
 * Variables de entorno (configurar en Vercel → Settings → Environment Variables):
 *   OPENROUTER_API_KEY   (obligatoria) — clave de https://openrouter.ai
 *   CHAT_MODEL           (opcional)    — fuerza un único modelo; si no, usa la
 *                                        cadena de fallback gratuita de abajo.
 */
// Catálogo precompilado en build (scripts/gen-chat-catalog.ts → prebuild). Se importa
// como JSON con extensión explícita para que la función sea autocontenida y no
// arrastre la cadena de TS del catálogo (evita ERR_MODULE_NOT_FOUND en el ESM de Vercel).
import catalogData from "./_catalog.json" with { type: "json" };

// Permite a Vercel ampliar el tiempo de ejecución si el plan lo soporta.
export const config = { maxDuration: 30 };

// ── Catálogo compacto para el system prompt (1 línea/zapa, ~5k tokens) ─────────
const CATALOGO: string = catalogData.catalogo;

const SYSTEM = `Eres el experto de CANCHA.ZAPA, web independiente de zapatillas de baloncesto para España. Hablas castellano, directo, sin marketing ("sin BS"). Tuteas.

REGLAS:
- SOLO recomiendas zapas de este catálogo. NUNCA inventes modelos, specs ni precios: usa solo los datos de abajo. Si algo no está, dilo claro.
- Si una zapa es mala para el caso del usuario, lo dices sin rodeos.
- Los scores van de 1 a 10. Los precios son los mejores verificados en tiendas españolas.
- Cuando recomiendes una zapa concreta, escribe su marcador EXACTO [[shoe:SLUG]] en su propia línea (el SLUG es el primer campo de cada línea del catálogo). El front lo convierte en tarjeta con foto, score y precio. Máximo 2-3 marcadores por respuesta.
- Para zapas marcadas RETRO: avisa que son más de coleccionismo/uso casual que de cancha competitiva.
- Respeta SIEMPRE el presupuesto que pida el usuario: no recomiendes una zapa cuyo precio supere su tope.
- Respuestas breves (2-4 frases + marcadores). Cierra sugiriendo el quiz (/quiz) o una ficha concreta.

CATÁLOGO (slug | marca modelo | categoría | precio | scores | altura | horma):
${CATALOGO}`;

// ── Rate limit best-effort en memoria (por instancia caliente) ─────────────────
// Para un límite duro entre instancias haría falta Upstash/Vercel KV; esto es un
// guardarraíl gratuito que frena abuso desde una IP en una instancia caliente.
const RL_WINDOW_MS = 30 * 60 * 1000; // 30 min
const RL_MAX = 30; // 30 mensajes / 30 min / IP
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const arr = (hits.get(ip) ?? []).filter((t) => now - t < RL_WINDOW_MS);
  arr.push(now);
  hits.set(ip, arr);
  if (hits.size > 5000) hits.clear(); // evita fuga de memoria en instancias longevas
  return arr.length > RL_MAX;
}

type Msg = { role: string; content: string };

export default async function handler(req: any, res: any) {
  // CORS: el sitio puede servirse en canchazapa.com o www.canchazapa.com (redirect
  // apex→www). Si el service worker sirve la página en el apex, el fetch a /api/chat
  // cruza a www → preflight. Permitimos ambos orígenes para que nunca falle.
  const origin = (req.headers["origin"] || "").toString();
  if (/^https:\/\/(www\.)?canchazapa\.com$/.test(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    res.status(500).json({ reply: "El asistente no está configurado todavía. Prueba el quiz mientras tanto." });
    return;
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "anon";
  if (rateLimited(ip)) {
    res.status(429).json({ reply: "Has hecho muchas preguntas seguidas. Espera un poco y vuelve — o usa el quiz." });
    return;
  }

  // Body ya viene parseado por Vercel cuando el content-type es JSON
  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {};
  const raw: Msg[] = Array.isArray(body.messages) ? body.messages : [];

  // Saneo: solo roles válidos, recorta longitud y limita el historial a los últimos 12
  const messages = raw
    .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    res.status(400).json({ error: "messages inválido" });
    return;
  }

  // Modelos gratuitos en orden de preferencia. Los free se rate-limitean upstream,
  // así que probamos en cadena hasta que uno responda. CHAT_MODEL fuerza uno solo.
  const models = process.env.CHAT_MODEL
    ? [process.env.CHAT_MODEL]
    : [
        // Rápidos primero (no-reasoning) para responder dentro del corte de Vercel.
        "meta-llama/llama-3.3-70b-instruct:free",
        "openai/gpt-oss-120b:free",
      ];

  const payload = (model: string) =>
    JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      max_tokens: 500,
      temperature: 0.4,
    });

  // Presupuesto total de tiempo. maxDuration=30s (validado por Vercel en build),
  // dejamos margen: ~25s repartidos, hasta 15s por modelo. Los free de OpenRouter
  // suelen contestar en 3-6s pero a veces se atascan; con este presupuesto el
  // segundo modelo aún tiene tiempo si el primero tarda.
  const deadline = Date.now() + 25000;

  for (const model of models) {
    const remaining = deadline - Date.now();
    if (remaining < 2500) break; // sin tiempo útil para otro intento
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
        signal: AbortSignal.timeout(Math.min(15000, remaining)),
      });

      if (!r.ok) {
        const detail = await r.text().catch(() => "");
        console.error("[api/chat]", model, r.status, detail.slice(0, 200));
        continue; // prueba el siguiente modelo de la cadena
      }

      const data = await r.json();
      const reply = data?.choices?.[0]?.message?.content ?? "";
      if (!reply) continue;
      res.status(200).json({ reply });
      return;
    } catch (err) {
      console.error("[api/chat]", model, err);
      // sigue con el siguiente modelo
    }
  }

  res.status(502).json({ reply: "Uy, no he podido responder ahora mismo. Reintenta en un momento — o usa el quiz." });
}
