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
  nombre: string;
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
      nombre: c[1] ?? "",
      precio: Number((c[3] ?? "").replace(/[^\d]/g, "")) || 0,
      scores,
      marcadores: c.slice(7).join(" "),
    };
  })
  .filter((z) => z.slug);

// Red de seguridad del formato. Si el modelo describe zapas en texto plano y no emite
// ningún [[shoe:slug]], el front no pinta tarjetas y se pierde foto, score y precio
// (ago-2026: los modelos nuevos de la cadena redactan bien pero se saltan el formato).
// Se detectan por NOMBRE EXACTO del catálogo, así que no puede inventarse ninguna: si
// el nombre no está en el catálogo, no hay marcador.
function asegurarMarcadores(texto: string): string {
  if (!texto || /\[\[shoe:/.test(texto)) return texto;
  // De más largo a más corto para que "Nike Ja 2 GS" gane a "Nike Ja 2".
  const porLongitud = [...ZAPAS].sort((a, b) => b.nombre.length - a.nombre.length);
  let resto = texto.toLowerCase();
  const halladas: { slug: string; pos: number }[] = [];
  for (const z of porLongitud) {
    if (!z.nombre) continue;
    const n = z.nombre.toLowerCase();
    const i = resto.indexOf(n);
    if (i === -1) continue;
    halladas.push({ slug: z.slug, pos: i });
    // Se tacha la aparición para que una zapa más corta no vuelva a casar sobre ella.
    resto = resto.slice(0, i) + " ".repeat(n.length) + resto.slice(i + n.length);
  }
  if (!halladas.length) return texto;
  // Se ordenan por DONDE aparecen en el texto, no por longitud de nombre: el modelo ya
  // las ha priorizado al redactar ("1a opcion...") y las tarjetas deben seguir ese orden.
  const encontradas = halladas.sort((a, b) => a.pos - b.pos).slice(0, 3).map((h) => h.slug);
  return texto + "\n\n" + encontradas.map((s) => `[[shoe:${s}]]`).join("\n");
}

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

  // Cadena de modelos gratuitos, de mejor a peor. YA NO se recorre a mano: se manda
  // ENTERA en `models` y OpenRouter la recorre server-side en UNA sola petición
  // (docs "Model Fallbacks", verificado 31-ago-2026). Salta al siguiente ante error de
  // context-length, moderación, rate-limit o downtime, y dentro de cada modelo ya
  // reintenta otros proveedores antes de rendirse. Se factura el que responde y su id
  // llega en `model` de la respuesta.
  //
  // Antes esto eran hasta 5 peticiones HTTP secuenciales desde Vercel: los 3 primeros
  // eslabones devolvían 429 al instante (medido en los logs de OpenRouter el 29-ago) y
  // cada uno se cobraba una llamada upstream y un trozo del presupuesto de 25 s. Con
  // `models` desaparecen el reparto de tiempo, la latencia acumulada y el `Map` de
  // enfriamiento, que además nunca enfriaba nada: cada invocación serverless es un
  // proceso nuevo y el Map nacía vacío.
  //
  // ⚠ REVISAR CADA POCOS MESES. El free tier de OpenRouter ROTA: la cadena validada en
  // vivo en jun-2026 se quedó con 3 de 5 modelos retirados y el chat cayó entero
  // (ago-2026). Los 5 de abajo están verificados VIVOS a 31-ago-2026 contra
  // `curl -s https://openrouter.ai/api/v1/models`.
  //
  // CHAT_MODEL fuerza un único modelo (sin cadena).
  const models = process.env.CHAT_MODEL
    ? [process.env.CHAT_MODEL]
    : [
        "minimax/minimax-m2.7:free", // el único que devolvía 200 el 29-ago (GMICloud)
        // Los dos gemma son los únicos VALIDADOS para español limpio + formato
        // [[shoe:slug]] (jun-2026): si minimax cae, son el mejor relevo conocido.
        "google/gemma-4-31b-it:free",
        "google/gemma-4-26b-a4b-it:free",
        // Cola SIN VALIDAR, y son modelos de RAZONAMIENTO (más lentos).
        "z-ai/glm-5.2:free",
        "thinkingmachines/inkling-small:free",
      ];

  // Con cadena se manda `models` (lista de prioridad) y NO `model`; con un modelo
  // forzado, al revés. Enviar los dos no está documentado, así que no se hace.
  const payload = (cadena: boolean) =>
    JSON.stringify({
      ...(cadena && models.length > 1 ? { models } : { model: models[0] }),
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      max_tokens: 380, // el prompt pide 2-4 frases; menos tokens = completa antes
      temperature: 0.4,
    });

  // Status de cada fallo. Si es de auth/cuota, el problema es la clave o el límite del
  // free tier, no los modelos: hay que poder distinguirlo desde fuera sin entrar en los
  // logs de Vercel (un 502 opaco costó una sesión entera en ago-2026).
  const fallos: number[] = [];

  // Presupuesto total. maxDuration=30s, dejamos ~25s. Ahora es UNA sola petición, así
  // que se le da casi todo: el reparto entre eslabones lo hace OpenRouter por dentro.
  const deadline = Date.now() + 25000;

  let data: any = null;
  let modeloUsado = "";

  // Dos vueltas como MUCHO, y la segunda casi nunca: es la red de seguridad por si
  // OpenRouter rechazara `models` con un 400 (parámetro retirado, cambio de contrato).
  // Sin ella, un 400 dejaría el chat entero sin IA; con ella, se reintenta a pelo con el
  // primer modelo de la cadena. Cualquier otro fallo NO se reintenta: no arreglaría nada.
  for (const cadena of [true, false]) {
    if (!cadena && fallos[fallos.length - 1] !== 400) break;
    const restante = deadline - Date.now();
    if (restante < 4000) break; // sin tiempo útil
    try {
      const r = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://canchazapa.com",
          "X-Title": "CANCHA.ZAPA",
        },
        body: payload(cadena),
        signal: AbortSignal.timeout(restante - 1000),
      });

      if (!r.ok) {
        const detail = await r.text().catch(() => "");
        fallos.push(r.status);
        console.error("[api/chat]", cadena ? "cadena" : models[0], r.status, detail.slice(0, 200));
        continue;
      }

      data = await r.json();
      modeloUsado = String(data?.model ?? "");
      break;
    } catch (err) {
      // 0 = se colgó (timeout/red). Sin esto un modelo lento no dejaría rastro en
      // `fallos` y se confundiría con un error real del modelo.
      fallos.push(0);
      console.error("[api/chat]", cadena ? "cadena" : models[0], err);
    }
  }

  const reply = asegurarMarcadores(limpiarRespuesta(data?.choices?.[0]?.message?.content ?? ""));
  if (reply) {
    // Qué modelo respondió DE VERDAD. Es el dato que decide el orden de la cadena en la
    // próxima revisión: ordenarla por calidad estimada en vez de por éxito medido ya
    // salió caro una vez (los gemma iban primeros y llevaban meses devolviendo 429).
    console.log("[api/chat] respondió", modeloUsado || "(modelo desconocido)");
    res.status(200).json({ reply });
    return;
  }

  // Distinguir el status IMPORTA. 429 aquí ya NO es "un modelo saturado" —de eso se
  // encarga OpenRouter por dentro—: si devuelve 429 con la cadena entera, es el tope de
  // la CUENTA (50/día sin créditos comprados), que sí comparten todos los `:free`.
  const todosSon = (...sts: number[]) => fallos.length > 0 && fallos.every((st) => sts.includes(st));
  const code = todosSon(401)
    ? "auth"         // 401: clave inválida o revocada
    : todosSon(403)
      ? "prohibido"  // 403: la clave es VÁLIDA pero ese modelo le está vetado
                     // (permisos de la key, guardarraíl o moderación). NO es la clave:
                     // confundirlo con "auth" manda a regenerar una clave que está bien.
    : todosSon(402)
      ? "sin-saldo"  // la cuenta se quedó sin créditos
      : todosSon(429)
        ? "cuota"    // tope diario del free tier de la CUENTA agotado
        : todosSon(400)
          ? "contrato" // OpenRouter rechazó el body: `models` o el propio prompt
          : todosSon(0)
            ? "lentos" // se colgó: no falla, se atasca (otro arreglo distinto)
            : "upstream"; // los modelos: saturados, retirados o caídos
  // Ni un 502 ni un "no he podido responder": el usuario se lleva zapatillas reales del
  // catálogo, calculadas aquí y sin gastar una sola petición de la cuota. `code` y
  // `estados` viajan para poder diagnosticar desde fuera; el front solo lee `reply`.
  console.error("[api/chat] sin respuesta, respondo en local:", code, fallos.join(","));
  res.status(200).json({
    reply: respuestaLocal(messages[messages.length - 1].content),
    code: "local-" + code,
    estados: fallos.join(","),
  });
}
