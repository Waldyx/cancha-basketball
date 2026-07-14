/**
 * /api/feb — Importador de actas FEB para /estadisticas (función serverless de Vercel)
 *
 * Contrato:
 *   GET /api/feb?partido={id | URL de baloncestoenvivo.feb.es/partido/id}
 *   → 200 { fecha, competicion, equipos: [{ nombre, pts, jugadores: [...] }, ...] }
 *
 * Cómo funciona (mismo flujo que hace la propia web de la FEB en el navegador):
 *   1. Descarga https://baloncestoenvivo.feb.es/partido/{id} y extrae el JWT que
 *      la página incrusta en el input oculto #_ctl0_token (caduca en ~24h).
 *   2. Llama a https://intrafeb.feb.es/LiveStats.API/api/v1/BoxScore/{id} con
 *      Authorization: Bearer {jwt} y devuelve el box score mapeado y recortado.
 *
 * Uso puntual bajo demanda del usuario (importa SU partido) + caché CDN de 10 min:
 * el volumen hacia la FEB es mínimo.
 */

export const config = { maxDuration: 15 };

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

const n = (v: unknown): number => {
  const x = parseInt(String(v ?? "0"), 10);
  return Number.isFinite(x) && x >= 0 ? x : 0;
};

/** "01-11-2025 - 11:00" → "2025-11-01" */
function parseFecha(starttime: unknown): string {
  const m = String(starttime ?? "").match(/(\d{2})-(\d{2})-(\d{4})/);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : "";
}

function mapJugador(p: any) {
  return {
    nombre: String(p?.name ?? "").trim(),
    dorsal: String(p?.no ?? "").trim(),
    min: Math.round(n(p?.min) / 60), // la API da segundos
    t2c: n(p?.p2m), t2i: n(p?.p2a),
    t3c: n(p?.p3m), t3i: n(p?.p3a),
    tlc: n(p?.p1m), tli: n(p?.p1a),
    ro: n(p?.ro), rd: n(p?.rd),
    ast: n(p?.assist), rob: n(p?.st), tap: n(p?.bs),
    per: n(p?.to), fal: n(p?.pf),
  };
}

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  // Acepta el ID suelto o la URL completa del acta
  const raw = String(req.query?.partido ?? "");
  const id = raw.match(/(\d{5,10})/)?.[1];
  if (!id) {
    res.status(400).json({ error: "Falta ?partido= (ID o URL de baloncestoenvivo.feb.es/partido/...)" });
    return;
  }

  try {
    const pagina = await fetch(`https://baloncestoenvivo.feb.es/partido/${id}`, {
      headers: { "User-Agent": UA },
    });
    if (!pagina.ok) throw new Error(`acta HTTP ${pagina.status}`);
    const html = await pagina.text();
    const token = html.match(/id="_ctl0_token"[^>]*value="([^"]+)"/)?.[1];
    if (!token) {
      res.status(404).json({ error: "No se encontró ese partido en baloncestoenvivo.feb.es" });
      return;
    }

    const api = await fetch(`https://intrafeb.feb.es/LiveStats.API/api/v1/BoxScore/${id}`, {
      headers: { "User-Agent": UA, Accept: "application/json", Authorization: `Bearer ${token}` },
    });
    if (!api.ok) throw new Error(`BoxScore HTTP ${api.status}`);
    const data = await api.json();

    const header = data?.HEADER ?? {};
    const equiposHeader: any[] = header?.TEAM ?? [];
    const equiposBox: any[] = data?.BOXSCORE?.TEAM ?? [];
    if (equiposBox.length !== 2) {
      res.status(404).json({ error: "El acta no tiene box score todavía (¿partido sin empezar?)" });
      return;
    }

    const equipos = equiposBox.map((t: any, i: number) => ({
      nombre: String(t?.name ?? equiposHeader[i]?.name ?? `Equipo ${i + 1}`).trim(),
      pts: n(equiposHeader[i]?.pts),
      jugadores: (Array.isArray(t?.PLAYER) ? t.PLAYER : []).map(mapJugador),
    }));

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=3600");
    res.status(200).json({
      partido: id,
      fecha: parseFecha(header?.starttime),
      competicion: String(header?.competition ?? "").trim(),
      finalizado: String(header?.statusText ?? "") === "FINISHED",
      equipos,
    });
  } catch (e: any) {
    res.status(502).json({ error: "No se pudo leer el acta de la FEB ahora mismo. Reintenta en un momento." });
  }
}
