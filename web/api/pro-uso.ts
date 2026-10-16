/**
 * /api/pro-uso — contador ANÓNIMO de las funciones Pro durante la beta.
 *
 * Solo guarda totales: "a la función X se le ha enseñado el aviso Pro N veces" y "la han
 * activado M veces". Ni IP, ni identificador, ni nada de la persona o de sus jugadores.
 *
 *   POST /api/pro-uso   cuerpo {"evento":"visto"|"activado","funcion":"<id de FUNCIONES_PRO>"}
 *   GET  /api/pro-uso   → { visto: {id: n}, activado: {id: n} }
 *
 * Guarda en Redis por la API REST de Upstash (la integración de Vercel crea KV_REST_API_URL y
 * KV_REST_API_TOKEN). Sin esas variables NO falla: responde 204 y no cuenta, para que la web
 * nunca dependa del contador. Función autocontenida (ESM sin bundling): la lista de ids va
 * duplicada aquí a propósito; si cambia FUNCIONES_PRO en src/lib/pro.ts, cambiarla también.
 */

const FUNCIONES = [
  "pizarra-sesiones",
  "pizarra-jugador",
  "pizarra-animacion",
  "pizarra-lecturas",
  "stats-equipo",
  "stats-agente",
  "minutos-rotacion",
  "pizarra-club",
  "tiro-temporada",
];
const EVENTOS = ["visto", "activado"];

const URL_KV = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const TOKEN_KV = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

async function redis(cmd: string[]): Promise<any> {
  const r = await fetch(URL_KV, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN_KV}`, "Content-Type": "application/json" },
    body: JSON.stringify(cmd),
  });
  if (!r.ok) throw new Error(`redis ${r.status}`);
  return (await r.json())?.result;
}

function cuerpo(req: any): any {
  const b = req.body;
  if (typeof b === "string") {
    try {
      return JSON.parse(b);
    } catch {
      return null;
    }
  }
  return b;
}

/** HGETALL devuelve [campo, valor, campo, valor…] */
function aObjeto(lista: unknown): Record<string, number> {
  const o: Record<string, number> = {};
  if (Array.isArray(lista)) for (let i = 0; i + 1 < lista.length; i += 2) o[String(lista[i])] = Number(lista[i + 1]) || 0;
  return o;
}

export default async function handler(req: any, res: any) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method === "GET") {
    if (!URL_KV || !TOKEN_KV) return res.status(200).json({ activo: false });
    try {
      const [visto, activado] = await Promise.all(EVENTOS.map((e) => redis(["HGETALL", `cz:pro:${e}`])));
      return res.status(200).json({ activo: true, visto: aObjeto(visto), activado: aObjeto(activado) });
    } catch {
      return res.status(502).json({ error: "contador no disponible" });
    }
  }
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const b = cuerpo(req);
  const evento = String(b?.evento ?? "");
  const funcion = String(b?.funcion ?? "");
  if (!EVENTOS.includes(evento) || !FUNCIONES.includes(funcion)) return res.status(400).json({ error: "evento o función desconocidos" });
  if (!URL_KV || !TOKEN_KV) return res.status(204).end();
  try {
    await redis(["HINCRBY", `cz:pro:${evento}`, funcion, "1"]);
  } catch {
    /* el contador nunca debe romper nada */
  }
  return res.status(204).end();
}
