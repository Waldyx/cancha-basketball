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
 *   → 200 text/plain en STREAMING: el texto tal cual, con [[shoe:slug]] opcionales.
 *   → 200 application/json { reply, code, estados, detalle } cuando NINGÚN modelo
 *     responde y contesta el fallback local. El front distingue por Content-Type.
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

// Versión de `limpiarRespuesta` para STREAMING. La otra no vale a medio stream: su
// segundo `.replace(/<\/?think>/gi, "")` borra la etiqueta suelta y deja el razonamiento
// A LA VISTA mientras el bloque sigue abierto. Aquí, si queda un `<think>` sin cerrar,
// se corta ahí: todavía no sabemos dónde acaba, así que no se emite nada de lo que venga
// detrás. Lo ya cerrado sí se limpia igual.
const visibleParcial = (t: string) => {
  const sinCerrados = t.replace(/<think>[\s\S]*?<\/think>/gi, "");
  const abierto = sinCerrados.search(/<think>/i);
  return (abierto >= 0 ? sinCerrados.slice(0, abierto) : sinCerrados).trimStart();
};

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

  // Cuerpo de la petición. `models` = la lista entera (OpenRouter la recorre por dentro);
  // `model` = un modelo suelto. Los docs muestran `models` SIN `model`, así que se manda
  // uno u otro, nunca los dos.
  const payload = (sel: { models: string[] } | { model: string }) =>
    JSON.stringify({
      ...sel,
      messages: [{ role: "system", content: SYSTEM }, ...messages],
      // 380 se quedaba CORTO y era la causa real de las respuestas en blanco. Medido en
      // el panel de OpenRouter (Logs > Generations, 31-ago): de 4 generaciones de minimax,
      // 3 cortaron con finish_reason `length` clavadas en 380 tokens y solo respondió la que
      // terminó en `stop` (352 tokens de texto). minimax-m2.7 es de RAZONAMIENTO: el
      // razonamiento CONSUME este presupuesto, así que se quedaba sin tokens antes de emitir
      // el texto final. Por eso fallaba de forma intermitente — según cuánto razonara.
      // 380 estaba calibrado para los gemma, que no razonan, y se heredó al poner minimax
      // primero. Es un TOPE, no un objetivo: los que no razonan paran solos en `stop`.
      max_tokens: 1000,
      temperature: 0.4,
      // Streaming. El cuello del chat es minimax RAZONANDO (10-13 s medidos en producción
      // el 1-sep) y eso no se arregla desde aquí: lo que se arregla es la espera en blanco.
      // El front ya lo soportaba desde siempre (ChatWidget.astro lee res.body con un
      // reader y repinta incremental), solo que el backend nunca lo usó.
      stream: true,
    });

  // Plan de intentos. El PRIMERO es la cadena entera en una sola petición: si OpenRouter
  // la acepta, se acabó (es el caso normal y el motivo del refactor). Detrás quedan los
  // modelos de uno en uno, que es el comportamiento clásico y PROBADO.
  //
  // ⚠ Esta cola de respaldo no es decorativa: el 31-ago, ya en producción, la petición
  // con `models` devolvió **400** (code `local-contrato`, medido contra canchazapa.com).
  // Los docs dicen que la forma es correcta, así que la causa está sin identificar — no
  // hay clave en local con la que reproducirlo y OpenRouter valida el auth antes que el
  // body. Hasta saberlo, el chat NO puede depender de que `models` funcione.
  //
  // Coste real: si `models` va bien, 1 petición. Si no, se degrada exactamente a lo que
  // había antes. El presupuesto de tiempo corta la cola si se alarga.
  // ⚠ TOPE DE 3. Medido: con los 5 de la cadena, OpenRouter devolvía 400
  // `'models' array must have 3 items or fewer.` (capturado en el campo `detalle`, 31-ago).
  // Su boletín lo decía, pero en el párrafo del endpoint de Anthropic, así que parecía no
  // aplicar aquí. Aplica igual. Los 2 restantes NO se pierden: quedan en la cola de
  // respaldo de abajo, que los prueba de uno en uno.
  const CADENA_MAX = 3;
  const intentos: { etiqueta: string; body: string }[] = [];
  if (models.length > 1)
    intentos.push({ etiqueta: "cadena", body: payload({ models: models.slice(0, CADENA_MAX) }) });
  for (const m of models) intentos.push({ etiqueta: m, body: payload({ model: m }) });

  // Status de cada fallo. Si es de auth/cuota, el problema es la clave o el límite del
  // free tier, no los modelos: hay que poder distinguirlo desde fuera sin entrar en los
  // logs de Vercel (un 502 opaco costó una sesión entera en ago-2026).
  const fallos: number[] = [];
  // Primer mensaje de error de upstream, recortado. Sin esto, un 400 solo dice "400" y
  // no se puede diagnosticar sin desplegar otra vez. No lleva nada sensible: es el texto
  // de error de OpenRouter.
  // Errores de upstream, TODOS. Al principio esto guardaba solo el primero y fue un error
  // de diseño: cazó el 400 de la cadena y por eso nunca habría cazado el 403 que aparece
  // al final de `estados`. Cada fallo aporta una entrada `etiqueta:status:mensaje`, que es
  // lo que permite saber QUÉ eslabón falla y POR QUÉ sin desplegar otra vez ni mirar los
  // logs de Vercel. No lleva nada sensible: es el texto de error de OpenRouter.
  const detalles: string[] = [];

  // Presupuesto total. maxDuration=30s, dejamos ~25s.
  const deadline = Date.now() + 25000;

  // Texto YA enviado al cliente (limpio) y texto crudo acumulado del modelo. Se separan
  // porque lo emitido es irreversible: una vez sale el primer byte no se puede volver al
  // JSON de error ni cambiar de modelo.
  let emitido = "";
  let acumulado = "";
  let modeloUsado = "";

  // Abre la respuesta como stream de texto plano. Se llama SOLO cuando ya hay contenido
  // real que emitir: mientras no se llame, la cola de intentos sigue viva y un modelo que
  // falle o venga vacío deja pasar al siguiente, que es lo que se arregló el 31-ago.
  const abrirStream = () => {
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Cache-Control", "no-cache, no-transform");
    res.setHeader("X-Accel-Buffering", "no"); // que ningún proxy lo bufferice
    res.status(200);
  };

  for (const intento of intentos) {
    const restante = deadline - Date.now();
    if (restante < 4000) break; // sin tiempo útil para otro intento
    // Generoso a propósito: los modelos caídos fallan al instante y no gastan presupuesto,
    // así que repartirlo a partes iguales solo servía para asfixiar al único que responde.
    const tope = Math.min(15000, restante - 1000);
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
        signal: AbortSignal.timeout(tope),
      });

      if (!r.ok) {
        const txt = await r.text().catch(() => "");
        fallos.push(r.status);
        detalles.push(`${intento.etiqueta}:${r.status}:${txt.slice(0, 140)}`);
        console.error("[api/chat]", intento.etiqueta, r.status, txt.slice(0, 200));
        continue;
      }

      // Lectura del SSE de OpenRouter: líneas `data: {...}` y un `data: [DONE]` al final.
      const reader = r.body?.getReader?.();
      if (!reader) {
        fallos.push(0);
        detalles.push(`${intento.etiqueta}:0:sin body legible`);
        continue;
      }
      const dec = new TextDecoder();
      let buf = "";
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        const lineas = buf.split("\n");
        buf = lineas.pop() ?? ""; // la última puede venir partida
        for (const linea of lineas) {
          const l = linea.trim();
          if (!l.startsWith("data:")) continue;
          const d = l.slice(5).trim();
          if (!d || d === "[DONE]") continue;
          let j: any;
          try {
            j = JSON.parse(d);
          } catch {
            continue; // chunk incompleto o keep-alive
          }
          if (!modeloUsado) modeloUsado = String(j?.model ?? intento.etiqueta);
          // SOLO `delta.content`. `delta.reasoning` se ignora a propósito: es la defensa
          // buena contra los modelos de razonamiento, mejor que limpiar a posteriori.
          const delta: string = j?.choices?.[0]?.delta?.content ?? "";
          if (!delta) continue;
          acumulado += delta;
          const limpio = visibleParcial(acumulado);
          // Solo se emite lo NUEVO, y solo si el limpio sigue siendo una extensión de lo
          // ya emitido. Si la limpieza reescribiera hacia atrás (un `<think>` que abre),
          // se calla y espera: el cierre de abajo manda lo que falte.
          if (limpio.length > emitido.length && limpio.startsWith(emitido)) {
            if (!emitido) abrirStream();
            res.write(limpio.slice(emitido.length));
            emitido = limpio;
          }
        }
      }

      // Un 200 que no emitió NI UN carácter NO es una respuesta. Pasa con los modelos de
      // razonamiento, que se gastan los max_tokens pensando y no llegan al texto final.
      // Como no se ha abierto el stream, todavía se puede probar el siguiente intento.
      if (!emitido) {
        fallos.push(204); // 204 = respondió pero vino vacío (no es un status real de OR)
        acumulado = "";
        console.error("[api/chat]", intento.etiqueta, "200 sin content");
        continue;
      }

      // Cierre: `asegurarMarcadores` necesita el texto ENTERO, así que se aplica aquí y
      // se manda solo la diferencia. El front concatena, así que las mini-cards salen igual.
      const final = asegurarMarcadores(limpiarRespuesta(acumulado));
      if (final.startsWith(emitido) && final.length > emitido.length) {
        res.write(final.slice(emitido.length));
      }
      console.log("[api/chat] respondió", modeloUsado || "(modelo desconocido)", "(stream)");
      res.end();
      return;
    } catch (err) {
      // 0 = se colgó (timeout/red). Sin esto un modelo lento no dejaría rastro en
      // `fallos` y se confundiría con un error real del modelo.
      fallos.push(0);
      console.error("[api/chat]", intento.etiqueta, err);
      // Si el stream YA estaba abierto, el fallo es TERMINAL: no se puede probar otro
      // modelo (su texto se pegaría al del anterior y saldría una respuesta Frankenstein
      // de dos modelos) ni volver al JSON de diagnóstico (las cabeceras ya salieron:
      // `res.json()` reventaría con ERR_HTTP_HEADERS_SENT). Se cierra con lo emitido, que
      // es texto útil aunque esté cortado. Caso real, no teórico: el tope de 15 s corta a
      // minimax, que es justo el modelo lento por el que se puso el streaming.
      if (emitido) {
        res.end();
        return;
      }
    }
  }

  // Si se llega aquí, NINGÚN intento emitió texto: no se ha abierto el stream y la
  // respuesta sigue pudiendo ser el JSON de diagnóstico + el fallback local de abajo.
  // El modelo que responde se loguea arriba, al cerrar el stream: es el dato que decide
  // el orden de la cadena en la próxima revisión (ordenarla por calidad estimada en vez
  // de por éxito medido ya salió caro una vez con los gemma).

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
          ? "contrato" // OpenRouter rechaza el body en TODOS los intentos
          : todosSon(204)
            ? "vacios" // contestan 200 pero sin texto (razonamiento sin `content`)
            : todosSon(0)
              ? "lentos" // se colgó: no falla, se atasca (otro arreglo distinto)
              : "upstream"; // los modelos: saturados, retirados o caídos
  // Ni un 502 ni un "no he podido responder": el usuario se lleva zapatillas reales del
  // catálogo, calculadas aquí y sin gastar una sola petición de la cuota. `code`,
  // `estados` y `detalle` viajan para poder diagnosticar desde fuera; el front solo lee
  // `reply`, así que esto es invisible para el usuario.
  console.error("[api/chat] sin respuesta, respondo en local:", code, fallos.join(","), detalles.join(" | "));
  res.status(200).json({
    reply: respuestaLocal(messages[messages.length - 1].content),
    code: "local-" + code,
    estados: fallos.join(","),
    // Recortado por si la cadena entera falla: 6 intentos * 140 no debe inflar la respuesta.
    detalle: detalles.join(" | ").slice(0, 900),
  });
}
