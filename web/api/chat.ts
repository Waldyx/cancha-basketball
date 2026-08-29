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
- Tu especialidad son las ZAPATILLAS de este catálogo: NUNCA inventes modelos, specs ni precios; usa solo los datos de abajo. Si una zapa no está, dilo claro.
- ACCESORIOS: la web SÍ tiene además una sección de accesorios con balones/pelotas, calcetines y plantillas de baloncesto. Si el usuario pregunta por ellos, NO lo niegues: dile que los tiene en la sección Accesorios (/balones). No te inventes modelos ni precios de accesorios concretos; solo redirige ahí. Escribe SIEMPRE la ruta a secas (/balones), NUNCA una URL completa ni un dominio: te los inventas y salen enlaces rotos. Tu recomendación detallada se centra en zapatillas.
- Si una zapa es mala para el caso del usuario, lo dices sin rodeos.
- Los scores van de 1 a 10. Los precios son los mejores verificados en tiendas españolas.
- Cuando recomiendes una zapa concreta, escribe su marcador EXACTO [[shoe:SLUG]] en su propia línea (el SLUG es el primer campo de cada línea del catálogo). El front lo convierte en tarjeta con foto, score y precio. Máximo 2-3 marcadores por respuesta.
- Para zapas marcadas RETRO: avisa que son más de coleccionismo/uso casual que de cancha competitiva.
- GÉNERO/EDAD (marcadores al final de cada línea del catálogo):
  · "JUNIOR-GS" = versión júnior (Grade School, tallaje niño hasta ~EU40). Recomiéndalas SOLO si el usuario pide algo para un niño/junior; NUNCA a un adulto. Si te piden la adulta, usa la versión sin este marcador.
  · "MUJER-100%" = horma 100% femenina (Moolah Kicks, UA Flow Breakthru 4, Adidas Exhibit Select, etc.): diseñadas solo para pie de mujer (talón estrecho). Son LA recomendación para jugadoras que buscan ajuste femenino real.
  · "MUJER-tambien" = signature unisex con ADN femenino (Sabrina, A'One, Stewie, Jordan Heir Series): la usan hombres y mujeres; perfectas para recomendar a jugadoras sin dejar de ser unisex.
  · Si una jugadora pregunta "zapatillas para mujer", prioriza las MUJER-100% y las MUJER-tambien. Si no especifica género, trata todo como unisex normal.
- Respeta SIEMPRE el presupuesto que pida el usuario: no recomiendes una zapa cuyo precio supere su tope.
- Respuestas breves (2-4 frases + marcadores). Cierra sugiriendo el quiz (/quiz) o una ficha concreta.

CATÁLOGO (slug | marca modelo | categoría | precio | scores | altura | horma | marcadores RETRO/JUNIOR-GS/MUJER):
${CATALOGO}`;

// ── Fallback local: responde SIN llamar a ninguna IA ───────────────────────────
// Cuando la cadena entera falla (free tier agotado, modelos caídos) el usuario se
// quedaba con "no he podido responder", que es justo lo que había que evitar. Esto
// le da una recomendación real sacada del MISMO catálogo, sin gastar ni una
// petición. No suplanta al asistente: dice claramente que no ha podido consultarlo.
type ZapaCat = {
  slug: string;
  precio: number;
  scores: Record<string, number>;
  marcadores: string;
};

// Línea del catálogo: slug | nombre | categoría | 90€ | tracc 10 cushion 9 … | altura | horma | MARCADORES
const ZAPAS: ZapaCat[] = CATALOGO.split("\n")
  .filter(Boolean)
  .map((linea) => {
    const c = linea.split("|").map((x) => x.trim());
    const scores: Record<string, number> = {};
    for (const m of (c[4] ?? "").matchAll(/([a-z]+)\s+(\d+)/g)) scores[m[1]] = Number(m[2]);
    return {
      slug: c[0] ?? "",
      precio: Number((c[3] ?? "").replace(/[^\d]/g, "")) || 0,
      scores,
      marcadores: c.slice(7).join(" "),
    };
  })
  .filter((z) => z.slug);

function respuestaLocal(pregunta: string): string {
  const q = pregunta.toLowerCase();
  const mp = q.match(/(\d{1,4})\s*(?:€|eur|euros?)/) ?? q.match(/presupuesto\D{0,12}(\d{1,4})/);
  const presupuesto = mp ? Number(mp[1]) : 0;
  const exterior = /exterior|outdoor|calle|asfalto|cemento|parque/.test(q);
  const junior = /junior|jr\b|niñ|infantil|hijo|hija|grade school/.test(q);
  const mujer = /mujer|chica|jugadora|femenin/.test(q);

  // Los RETRO fuera siempre: son de coleccionismo, no de cancha (regla del prompt).
  let cand = ZAPAS.filter((z) => !/RETRO/.test(z.marcadores));
  // Las GS solo si piden algo júnior; y si piden júnior, solo GS.
  cand = junior
    ? cand.filter((z) => /JUNIOR-GS/.test(z.marcadores))
    : cand.filter((z) => !/JUNIOR-GS/.test(z.marcadores));
  if (mujer) {
    const f = cand.filter((z) => /MUJER/.test(z.marcadores));
    if (f.length >= 3) cand = f;
  }
  if (presupuesto > 0) cand = cand.filter((z) => z.precio > 0 && z.precio <= presupuesto);

  // Nota = los 5 criterios de cancha. En exterior, la suela pesa el triple.
  const nota = (z: ZapaCat) => {
    const s = z.scores;
    const base =
      (s.tracc ?? 0) + (s.cushion ?? 0) + (s.resp ?? 0) + (s.soporte ?? 0) + (s.estab ?? 0);
    return base + (exterior ? (s.outdoor ?? 0) * 3 : 0);
  };
  const top = [...cand].sort((a, b) => nota(b) - nota(a)).slice(0, 3);

  if (!top.length) {
    return "Ahora mismo no puedo consultar al asistente. Pásate por el quiz (/quiz), que filtra por presupuesto, posición y tipo de pista.";
  }
  const criterio = [
    presupuesto ? `por debajo de ${presupuesto}€` : null,
    exterior ? "buenas en exterior" : null,
    junior ? "en tallaje júnior" : null,
    mujer ? "para jugadora" : null,
  ]
    .filter(Boolean)
    .join(", ");
  return (
    `Ahora mismo no puedo consultar al asistente, así que te doy directamente las mejor valoradas del catálogo${criterio ? " " + criterio : ""}:\n\n` +
    top.map((z) => `[[shoe:${z.slug}]]`).join("\n") +
    `\n\nPara afinar de verdad (posición, peso, lesiones), el quiz (/quiz) lo hace mejor que yo.`
  );
}

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

// Modelos que acaban de devolver 429: saltarlos ahorra latencia y no quema intentos
// del tope diario en algo que ya sabemos que va a rebotar. Best-effort por instancia
// caliente, igual que el rate limit de arriba.
const enfriando = new Map<string, number>();
const ENFRIAMIENTO_MS = 60 * 1000;

// Algunos modelos de razonamiento cuelan su cadena de pensamiento dentro del texto
// (le pasó a nemotron en jun-2026, y por eso se descartó). Lo normal es que vaya aparte
// en `message.reasoning`; esto quita lo que se cuele igualmente en `content`.
const limpiarRespuesta = (t: string) =>
  t.replace(/<think>[\s\S]*?<\/think>/gi, "").replace(/<\/?think>/gi, "").trim();

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
        // Cadena gratuita mejor→peor. Diversificada por PROVEEDOR: un 429 vuelve en ~0.3s,
        // así que saltar entre familias distintas esquiva el rate-limit compartido casi
        // sin coste de latencia.
        //
        // ⚠ REVISAR CADA POCOS MESES. El free tier de OpenRouter ROTA: la cadena validada
        // en vivo en jun-2026 se quedó con 3 de 5 modelos retirados y el chat cayó entero
        // (ago-2026). Comprobar con: curl -s https://openrouter.ai/api/v1/models | grep ':free'
        // Solo gemma-4-31b (1º) y gemma-4-26b (5º) están validados para español + formato
        // [[shoe:slug]]; los tres de en medio son SUSTITUTOS SIN VALIDAR (ago-2026).
        // Los dos gemma PRIMERO: son los únicos validados (jun-2026) para español limpio
        // + formato [[shoe:slug]], y responden en 2-4s. Que ambos sean de Google no rompe
        // la diversificación: si Google rate-limitea, los dos caen en ~0.3s y la cadena
        // sigue con los otros proveedores casi sin gastar presupuesto.
        "google/gemma-4-31b-it:free", // 2.4s, formato OK, español limpio
        "google/gemma-4-26b-a4b-it:free", // MoE 3.8B activos, rápido
        // Refuerzo de otras familias. SIN VALIDAR y son modelos de RAZONAMIENTO: más
        // lentos (ago-2026: se atascaban >10s y agotaban el presupuesto cuando iban
        // delante). Detrás cumplen su papel sin estrangular a los rápidos.
        "z-ai/glm-5.2:free",
        "minimax/minimax-m2.7:free",
        "thinkingmachines/inkling-small:free",
      ];

  const payload = (model: string) =>
    JSON.stringify({
      model,
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      max_tokens: 380, // el prompt pide 2-4 frases; menos tokens = completa antes
      temperature: 0.4,
    });

  // Status de cada fallo. Si TODOS son de auth/cuota, el problema es la clave o el
  // límite del free tier, no los modelos: hay que poder distinguirlo desde fuera sin
  // entrar en los logs de Vercel (un 502 opaco costó una sesión entera en ago-2026).
  const fallos: number[] = [];

  // Presupuesto total de tiempo. maxDuration=30s (validado por Vercel en build),
  // dejamos margen: ~25s repartidos, hasta 15s por modelo. Los free de OpenRouter
  // suelen contestar en 3-6s pero a veces se atascan; con este presupuesto el
  // segundo modelo aún tiene tiempo si el primero tarda.
  const deadline = Date.now() + 25000;

  for (const model of models) {
    if ((enfriando.get(model) ?? 0) > Date.now()) continue; // rebotó hace nada, ni lo intentes
    const remaining = deadline - Date.now();
    if (remaining < 4000) break; // sin tiempo útil para otro intento
    // Tiempo para ESTE intento. Generoso a propósito: los modelos caídos fallan al
    // instante y no gastan presupuesto, así que repartirlo a partes iguales solo servía
    // para asfixiar al único que responde. En ago-2026 la cadena real era de UN modelo
    // vivo y lento, y con 8s fijos no le daba tiempo a completar una recomendación.
    const tope = Math.min(15000, remaining - 1000);
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
        signal: AbortSignal.timeout(tope),
      });

      if (!r.ok) {
        const detail = await r.text().catch(() => "");
        fallos.push(r.status);
        if (r.status === 429) enfriando.set(model, Date.now() + ENFRIAMIENTO_MS);
        console.error("[api/chat]", model, r.status, detail.slice(0, 200));
        continue; // prueba el siguiente modelo de la cadena
      }

      const data = await r.json();
      const reply = limpiarRespuesta(data?.choices?.[0]?.message?.content ?? "");
      if (!reply) continue;
      res.status(200).json({ reply });
      return;
    } catch (err) {
      // 0 = se colgó (timeout/red). Sin esto un modelo lento no dejaba rastro en `fallos`
      // y se confundía con un error real del modelo.
      fallos.push(0);
      console.error("[api/chat]", model, err);
      // sigue con el siguiente modelo
    }
  }

  // Distinguir el 429 IMPORTA: el tope del free tier de OpenRouter es POR CUENTA y lo
  // comparten TODOS los modelos :free, así que la cadena NO lo esquiva por muchos modelos
  // que se le añadan (los 5 fallan a la vez). "upstream" sí es culpa de los modelos.
  const todosSon = (...sts: number[]) => fallos.length > 0 && fallos.every((st) => sts.includes(st));
  const code = todosSon(401, 403)
    ? "auth"         // clave inválida o revocada
    : todosSon(402)
      ? "sin-saldo"  // la cuenta se quedó sin créditos
      : todosSon(429)
        ? "cuota"    // tope diario del free tier agotado (50/día sin créditos comprados)
        : todosSon(0)
          ? "lentos" // todos se colgaron: no fallan, se atascan (otro arreglo distinto)
          : "upstream"; // los modelos: saturados, retirados o caídos
  // Ni un 502 ni un "no he podido responder": el usuario se lleva zapatillas reales del
  // catálogo, calculadas aquí y sin gastar una sola petición de la cuota. `code` y
  // `estados` viajan para poder diagnosticar desde fuera; el front solo lee `reply`.
  console.error("[api/chat] cadena agotada, respondo en local:", code, fallos.join(","));
  res.status(200).json({
    reply: respuestaLocal(messages[messages.length - 1].content),
    code: "local-" + code,
    estados: fallos.join(","),
  });
}
