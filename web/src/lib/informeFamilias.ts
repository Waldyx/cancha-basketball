// Informe de temporada para las familias (/familias): una hoja por jugador con sus números de
// la temporada, su evolución y sus puntos fuertes, a partir del modo Equipo de /estadisticas.
// Va dirigido a familias de jugadores menores: el texto es SIEMPRE en positivo. Solo se nombran
// puntos fuertes, la tendencia solo aparece si es buena y nunca se compara con un compañero por
// su nombre. Lógica pura.

import { calcLinea, partidosDeJugador, type Equipo } from "./statsEquipo";

export interface InformeJugador {
  jid: string;
  nombre: string;
  dorsal: string;
  pj: number;
  partidosEquipo: number;
  medias: { min: number; pts: number; reb: number; ast: number; rob: number };
  tiro: { t2: [number, number]; t3: [number, number]; tl: [number, number] };
  mejor: { fecha: string; rival: string; pts: number; reb: number; ast: number } | null;
  /** Puntos por partido en orden de fecha (para la gráfica). */
  serie: number[];
  mejora: boolean;
  puntosFuertes: string[];
}

const r1 = (v: number) => Math.round(v * 10) / 10;
const fmt = (v: number) => String(r1(v)).replace(".", ",");

/** Medias por partido de todos los que han jugado: la referencia para los puntos fuertes. */
function mediasEquipo(eq: Equipo) {
  let n = 0;
  const s = { pts: 0, reb: 0, ast: 0, rob: 0, tap: 0 };
  for (const p of eq.partidos)
    for (const l of p.lineas) {
      const c = calcLinea(l);
      if (!(l.min || c.pts || c.reb || l.ast || l.rob)) continue;
      n++;
      s.pts += c.pts;
      s.reb += c.reb;
      s.ast += l.ast;
      s.rob += l.rob;
      s.tap += l.tap;
    }
  return n ? { pts: s.pts / n, reb: s.reb / n, ast: s.ast / n, rob: s.rob / n, tap: s.tap / n } : null;
}

export function informeJugador(eq: Equipo, jid: string): InformeJugador | null {
  const j = eq.jugadores.find((x) => x.id === jid);
  if (!j) return null;
  const ps = partidosDeJugador(eq, jid);
  const pj = ps.length;
  const tot = { min: 0, pts: 0, reb: 0, ast: 0, rob: 0, tap: 0, t2c: 0, t2i: 0, t3c: 0, t3i: 0, tlc: 0, tli: 0 };
  const serie: number[] = [];
  const vals: number[] = [];
  let mejor: InformeJugador["mejor"] = null;
  let mejorVal = -Infinity;
  for (const p of ps) {
    const c = calcLinea(p);
    tot.min += p.min;
    tot.pts += c.pts;
    tot.reb += c.reb;
    tot.ast += p.ast;
    tot.rob += p.rob;
    tot.tap += p.tap;
    tot.t2c += p.t2c;
    tot.t2i += p.t2i;
    tot.t3c += p.t3c;
    tot.t3i += p.t3i;
    tot.tlc += p.tlc;
    tot.tli += p.tli;
    serie.push(c.pts);
    vals.push(c.val);
    if (c.val > mejorVal) {
      mejorVal = c.val;
      mejor = { fecha: p.fecha, rival: p.rival, pts: c.pts, reb: c.reb, ast: p.ast };
    }
  }
  const d = pj || 1;
  const medias = { min: r1(tot.min / d), pts: r1(tot.pts / d), reb: r1(tot.reb / d), ast: r1(tot.ast / d), rob: r1(tot.rob / d) };

  // ¿ha ido a más? Solo con partidos suficientes, y solo se dice si es así.
  let mejora = false;
  if (pj >= 4) {
    const mitad = Math.floor(pj / 2);
    const media = (xs: number[]) => xs.reduce((a, b) => a + b, 0) / xs.length;
    mejora = media(vals.slice(pj - mitad)) - media(vals.slice(0, mitad)) >= 2;
  }

  const fuertes: string[] = [];
  const ref = mediasEquipo(eq);
  if (pj && ref) {
    const destaca = (mio: number, equipo: number) => mio >= 1 && mio >= equipo * 1.25;
    if (destaca(medias.pts, ref.pts)) fuertes.push(`Es de los que más anotan del equipo: ${fmt(medias.pts)} puntos por partido.`);
    if (destaca(medias.reb, ref.reb)) fuertes.push(`Destaca en el rebote: ${fmt(medias.reb)} por partido.`);
    if (destaca(medias.ast, ref.ast)) fuertes.push(`Hace jugar a sus compañeros: ${fmt(medias.ast)} asistencias por partido.`);
    if (destaca(medias.rob, ref.rob)) fuertes.push(`Muy activo en defensa: ${fmt(medias.rob)} recuperaciones por partido.`);
    if (tot.tli >= 10 && tot.tlc / tot.tli >= 0.7) fuertes.push(`Muy fiable desde la línea de tiros libres: ${Math.round((100 * tot.tlc) / tot.tli)} %.`);
    if (tot.t3i >= 8 && tot.t3c / tot.t3i >= 0.33) fuertes.push(`Buen tirador de tres: ${tot.t3c} de ${tot.t3i}.`);
  }
  const partidosEquipo = eq.partidos.length;
  if (pj && pj === partidosEquipo && partidosEquipo >= 3) fuertes.push("No se ha perdido ni un partido de la temporada.");
  if (mejora) fuertes.push("Ha ido a más a lo largo de la temporada.");
  if (pj && !fuertes.length) fuertes.push(`Ha jugado ${pj} ${pj === 1 ? "partido" : "partidos"} esta temporada, ${fmt(medias.min)} minutos de media.`);

  return {
    jid,
    nombre: j.nombre,
    dorsal: j.dorsal,
    pj,
    partidosEquipo,
    medias,
    tiro: { t2: [tot.t2c, tot.t2i], t3: [tot.t3c, tot.t3i], tl: [tot.tlc, tot.tli] },
    mejor,
    serie,
    mejora,
    puntosFuertes: fuertes.slice(0, 4),
  };
}

/** Puntos de una polilínea SVG para la serie (ancho × alto), con el máximo arriba. */
export function puntosSerie(serie: number[], ancho: number, alto: number): string {
  if (!serie.length) return "";
  const max = Math.max(1, ...serie);
  const paso = serie.length > 1 ? ancho / (serie.length - 1) : 0;
  return serie.map((v, i) => `${Math.round(i * paso * 10) / 10},${Math.round((alto - (v / max) * alto) * 10) / 10}`).join(" ");
}
