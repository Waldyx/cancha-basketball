/**
 * Lector de la pestaña «Jugades» de la app de la FCBQ (Federació Catalana de Basquetbol).
 *
 * La FCBQ no publica la estadística por jugador (ni en la app ni en la web): solo «Resum», con
 * los totales del equipo. El detalle está jugada a jugada en «Jugades». El usuario graba la
 * pantalla mientras baja por esa pestaña, el navegador saca fotogramas, los lee con OCR
 * (`actaImportUI.ts`) y aquí se convierten las líneas leídas en jugadas y las jugadas en un acta.
 *
 * Cada tarjeta trae, de arriba abajo: «P1  05:28» · el marcador «3 - 0» · la jugada «Cistella de 3»
 * · «#8 NOMBRE». Las del equipo LOCAL llevan el texto a la derecha (su escudo a la izquierda) y las
 * del VISITANTE, a la izquierda. El marcador de cada tarjeta sirve de control: si entre dos
 * canastas falta alguna, se nota.
 *
 * Todo en el navegador: ni fotos ni nombres salen del dispositivo.
 */
import type { ActaLeida, JugadorLeido, LineaTexto } from "./actaIA";

export type Lado = "local" | "visitante";
export type TipoJugada = "canasta" | "fallo" | "falta" | "perdida" | "otra";

export interface Jugada {
  periodo: number;
  /** reloj tal cual («05:28») y en segundos, para ordenar */
  reloj: string;
  segundos: number;
  local: number;
  visitante: number;
  texto: string;
  tipo: TipoJugada;
  /** puntos de la canasta (1, 2 o 3) o del tiro fallado */
  valor: number;
  dorsal: string;
  nombre: string;
  lado: Lado;
}

const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

/** «Cistella de 3», «Tir lliure fallat», «Falta personal»… → tipo y valor. */
export function clasificar(texto: string): { tipo: TipoJugada; valor: number } {
  const t = sinTildes(texto);
  const fallo = /fallat|fallad|errat|errad|fallo|perdut/.test(t) && !/salt/.test(t);
  // «Personal 2 tirs lliures, 1a falta» es la FALTA que da los tiros, no un tiro libre
  if (/falta|personal|tecnica|antiesportiva|desqualificant/.test(t)) return { tipo: "falta", valor: 0 };
  // la app escribe «Cistella de 2» y «Intent fallat de 2»
  const n = t.match(/(?:cistella|tir|tiro|canasta|intent)\s*(?:fallat\s*|fallado\s*)?(?:de\s*)?([123])\b/);
  if (/tirs?\s*lliures?|tiros?\s*libres?/.test(t)) return { tipo: fallo ? "fallo" : "canasta", valor: 1 };
  if (n) return { tipo: fallo ? "fallo" : "canasta", valor: +n[1] };
  if (/perdua|pilota perduda|perdida|balon perdido/.test(t)) return { tipo: "perdida", valor: 0 };
  return { tipo: "otra", valor: 0 };
}

// el OCR lee «PS» por P5 y «Pl» por P1, y a veces se come los dos puntos del reloj («0600»): con
// una grabación real se perdía así casi todo el 5.º periodo (24-oct)
const RE_PERIODO = /\bP\s?([1-8lIi|SB])\b[^\d]*?(\d{1,2})(?:\s?[:.]\s?|(?=\d{2}\b))(\d{2})\b/;
const numPeriodo = (p: string) => +p.replace(/[lIi|]/, "1").replace("S", "5").replace("B", "8");
// «#8 ARNAU GARCIA». El OCR lee el «#» como «#», «H», «4» o «+», y a veces lo pega a la cifra
// («48», «412», «H8»): el primer carácter del dorsal se descarta salvo que sea un «#» limpio, y el
// dorsal de cada jugador se decide luego por votación entre todas sus jugadas (`unirJugadas`).
const RE_JUGADOR = /^\s*([#H+4][+]?[\dSOoIlBZ|]{1,3}|#\s?\d{1,2})\s+([A-ZÀ-Ý][A-ZÀ-Ý.·'’\- ]*[A-ZÀ-Ý.])\s*$/;

/** El dorsal de la ficha de jugador tal como lo da el OCR → el dorsal («H8» → 8, «412» → 12, «HS» → 5). */
export function dorsalDe(token: string): string {
  let t = token.replace(/\s+/g, "");
  t = t.startsWith("#") ? t.slice(1) : t.replace(/^[H+4]/, "");
  t = t.replace(/^\+/, "");
  const d = t.replace(/[Ss]/g, "5").replace(/[Oo]/g, "0").replace(/[Il|]/g, "1").replace(/B/g, "8").replace(/Z/g, "2");
  return /^\d{1,2}$/.test(d) ? String(+d) : "";
}

/**
 * Las tarjetas a las que les falta el marcador (las cifras grandes y en negrita se las salta el
 * OCR de página entera): la franja donde está, entre la línea del periodo y la de la jugada, para
 * leerla aparte con un OCR solo de números.
 */
export function franjasSinMarcador(lineas: LineaTexto[]): { y0: number; y1: number; x0: number; x1: number; despuesDe: number }[] {
  const out: { y0: number; y1: number; x0: number; x1: number; despuesDe: number }[] = [];
  for (let i = 0; i < lineas.length; i++) {
    if (!RE_PERIODO.test(lineas[i].texto)) continue;
    const sig = lineas[i + 1];
    if (!sig || marcadorDe(sig.texto)) continue;
    const ev = lineas.slice(i + 1, i + 4).find((l) => /[A-Za-zÀ-ÿ]{3,}/.test(l.texto) && !RE_JUGADOR.test(l.texto));
    if (!ev) continue;
    out.push({ y0: lineas[i].y + lineas[i].alto, y1: ev.y, x0: lineas[i].x0, x1: lineas[i].x1, despuesDe: i });
  }
  return out;
}

/**
 * Las tarjetas a las que les falta la línea del periodo y el reloj (en la tarjeta resaltada va en
 * turquesa sobre turquesa claro y el OCR de página la pierde: medido con una captura real, 22-oct):
 * la franja encima del marcador, para leerla aparte. Sin ella la tarjeta no cuenta.
 */
export function franjasSinPeriodo(lineas: LineaTexto[]): { y0: number; y1: number; x0: number; x1: number; antesDe: number }[] {
  const out: { y0: number; y1: number; x0: number; x1: number; antesDe: number }[] = [];
  for (let i = 0; i < lineas.length; i++) {
    const l = lineas[i];
    if (!marcadorDe(l.texto)) continue;
    // ya tiene su periodo justo encima (entre medias, como mucho, la basura de la foto o el escudo)
    if (lineas.slice(Math.max(0, i - 2), i).some((p) => RE_PERIODO.test(p.texto))) continue;
    const resto = lineas.slice(i + 1, i + 4);
    const ev = resto.findIndex((r) => /[A-Za-zÀ-ÿ]{3,}/.test(r.texto) && !RE_JUGADOR.test(r.texto));
    if (ev < 0 || !resto.slice(ev + 1).some((r) => RE_JUGADOR.test(r.texto))) continue;
    out.push({ y0: Math.max(0, l.y - l.alto * 1.6), y1: l.y - 1, x0: l.x0, x1: l.x1, antesDe: i });
  }
  return out;
}

/** Dos números solos en la línea (el «-» del marcador a veces el OCR no lo ve). */
function marcadorDe(texto: string): [number, number] | null {
  if (/[:#/]/.test(texto)) return null;
  // una «o» suelta es un 0 mal leído («3 o»); el resto de letras sueltas, la inicial del avatar («A»),
  // que va en la misma línea
  const limpio = texto.replace(/\b[oO]\b/g, "0").replace(/\b[A-Za-z]\b/g, " ");
  if (/[A-Za-z]{2,}/.test(limpio)) return null;
  const nums = limpio.match(/\d{1,3}/g);
  return nums && nums.length === 2 ? [+nums[0], +nums[1]] : null;
}

/**
 * Las jugadas COMPLETAS de las líneas de un fotograma (las tarjetas cortadas por arriba o por
 * abajo se ignoran: saldrán enteras en otro fotograma). `ancho` = ancho de la imagen.
 */
export function jugadasDeLineas(lineas: LineaTexto[], ancho: number): Jugada[] {
  const out: Jugada[] = [];
  for (let i = 0; i < lineas.length; i++) {
    const m = lineas[i].texto.match(RE_PERIODO);
    if (!m) continue;
    const periodo = numPeriodo(m[1]);
    const reloj = `${m[2].padStart(2, "0")}:${m[3]}`;
    let marcador: [number, number] | null = null;
    let evento: LineaTexto | null = null;
    let jugador: LineaTexto | null = null;
    let j = i + 1;
    for (; j < Math.min(lineas.length, i + 6); j++) {
      const t = lineas[j].texto;
      if (RE_PERIODO.test(t)) break; // empieza otra tarjeta
      if (!marcador) { marcador = marcadorDe(t); if (marcador) continue; }
      if (!marcador) continue;
      if (!evento) { if (/[A-Za-zÀ-ÿ]{3,}/.test(t) && !RE_JUGADOR.test(t)) evento = lineas[j]; continue; }
      if (RE_JUGADOR.test(t)) { jugador = lineas[j]; break; }
    }
    if (!marcador || !evento || !jugador) continue;
    const mj = jugador.texto.match(RE_JUGADOR)!;
    const dorsal = dorsalDe(mj[1]);
    if (!dorsal) continue;
    // el texto de las jugadas del visitante empieza en el margen izquierdo de la tarjeta
    const lado: Lado = Math.min(evento.x0, jugador.x0) < ancho * 0.15 ? "visitante" : "local";
    const { tipo, valor } = clasificar(evento.texto);
    out.push({
      periodo,
      reloj,
      segundos: +m[2] * 60 + +m[3],
      local: marcador[0],
      visitante: marcador[1],
      texto: evento.texto.replace(/\s+/g, " ").trim(),
      tipo,
      valor,
      dorsal,
      nombre: mj[2].replace(/\s+/g, " ").trim(),
      lado,
    });
    i = j;
  }
  return out;
}

/**
 * Clave de una jugada para no contarla dos veces. NO lleva el dorsal: en un fotograma movido el OCR
 * puede leer «3» donde pone «8», y con el dorsal en la clave esa canasta se contaría dos veces. Un
 * marcador solo se alcanza una vez en el partido, así que periodo + reloj + marcador + equipo + tipo
 * ya identifican la jugada; el dorsal y el nombre se deciden por votación entre fotogramas.
 */
export const claveJugada = (j: Jugada) => `${j.periodo}|${j.reloj}|${j.local}-${j.visitante}|${j.lado}|${j.tipo}${j.valor}`;

const masVotado = (xs: string[]) => {
  const n = new Map<string, number>();
  for (const x of xs) if (x) n.set(x, (n.get(x) ?? 0) + 1);
  return [...n.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
};

/** Une las jugadas de todos los fotogramas (sin repetidas y sin las que no cuentan) en orden de partido. */
export function unirJugadas(listas: Jugada[][]): Jugada[] {
  // el dorsal de cada jugador = el más leído junto a su nombre (el nombre el OCR lo lee bien)
  const porNombre = new Map<string, string[]>();
  const kn = (j: Jugada) => `${j.lado}|${j.nombre.replace(/[^A-ZÀ-Ý]/g, "")}`;
  for (const l of listas) for (const j of l) if (j.nombre) porNombre.set(kn(j), [...(porNombre.get(kn(j)) ?? []), j.dorsal]);
  const grupos = new Map<string, Jugada[]>();
  for (const l of listas) for (let j of l) {
    if (j.nombre && porNombre.has(kn(j))) j = { ...j, dorsal: masVotado(porNombre.get(kn(j))!) };
    if (j.tipo === "otra") continue;
    const k = claveJugada(j);
    grupos.set(k, [...(grupos.get(k) ?? []), j]);
  }
  const lista = [...grupos.values()]
    .map((g) => ({ ...g[0], dorsal: masVotado(g.map((j) => j.dorsal)), nombre: masVotado(g.map((j) => j.nombre)), veces: g.length }))
    .sort((a, b) => a.periodo - b.periodo || b.segundos - a.segundos || a.local + a.visitante - (b.local + b.visitante));
  return sinMarcadoresMalLeidos(lista).map(({ veces, ...j }) => j);
}

/**
 * La misma canasta leída con dos marcadores («9-0» y, en otro fotograma, «9-90») sale como dos
 * jugadas con el mismo reloj, equipo y valor. Si esos marcadores no son una serie de verdad (dos
 * tiros libres seguidos: 4-1 y 5-1), se queda la lectura que más se ha repetido y, si empatan, la
 * que encaja con la canasta anterior del periodo.
 */
function sinMarcadoresMalLeidos<T extends Jugada & { veces: number }>(lista: T[]): T[] {
  const fuera = new Set<T>();
  let previo: [number, number] = [0, 0];
  let periodo = 0;
  for (let i = 0; i < lista.length; i++) {
    const j = lista[i];
    if (j.tipo !== "canasta" || fuera.has(j)) continue;
    if (j.periodo !== periodo) { periodo = j.periodo; previo = [0, 0]; }
    const g = lista.filter((x) => x.tipo === "canasta" && x.periodo === j.periodo && x.reloj === j.reloj && x.lado === j.lado && x.valor === j.valor);
    const lado = j.lado === "local" ? 0 : 1;
    const pts = (x: T) => [x.local, x.visitante][lado];
    const serie = g.length > 1 && [...g].sort((a, b) => pts(a) - pts(b)).every((x, k, s) =>
      k === 0 || (pts(x) - pts(s[k - 1]) === j.valor && [x.local, x.visitante][1 - lado] === [s[k - 1].local, s[k - 1].visitante][1 - lado]));
    if (g.length > 1 && !serie) {
      const esperado = lado === 0 ? [previo[0] + j.valor, previo[1]] : [previo[0], previo[1] + j.valor];
      const dist = (x: T) => Math.abs(x.local - esperado[0]) + Math.abs(x.visitante - esperado[1]);
      const buena = [...g].sort((a, b) => b.veces - a.veces || dist(a) - dist(b))[0];
      for (const x of g) if (x !== buena) fuera.add(x);
      previo = [buena.local, buena.visitante];
    } else previo = [j.local, j.visitante];
  }
  return lista.filter((x) => !fuera.has(x));
}

/** Nombres de los equipos y marcador final, de la cabecera (solo sale en los primeros fotogramas). */
export function cabeceraDeLineas(lineas: LineaTexto[], ancho: number): { local: string; visitante: string; final: [number, number] | null } {
  const res = { local: "", visitante: "", final: null as [number, number] | null };
  const fin = lineas.findIndex((l) => (l.texto.match(/\bP\s?[1-8]\b/g) ?? []).length >= 3 || RE_PERIODO.test(l.texto));
  const cab = fin < 0 ? lineas : lineas.slice(0, fin);
  const RUIDO = /federaci|catalana|basquetbol|resum|jugades|fcbq/i;
  // el marcador final son las cifras GRANDES de la cabecera: una línea de dos números de letra normal
  // no lo es (con una grabación real salió «1-5» en vez de 60-55)
  const altos = lineas.map((l) => l.alto).sort((a, b) => a - b);
  const altoTipico = altos[Math.floor(altos.length / 2)] ?? 0;
  // los nombres van en la línea de la fecha y la de debajo: lo de encima (las letras de los escudos,
  // «HAB» del de la ABP con una grabación real) no es nombre. Sin la fecha no hay cabecera en el
  // fotograma (una grabación que empieza ya en las tarjetas) y no se lee ningún nombre
  const fecha = cab.find((l) => /\d{1,2}\/\d{1,2}\/\d{2,4}/.test(l.texto));
  const esNombre = (l: LineaTexto) => !!fecha && l.y >= fecha.y - fecha.alto * 0.8 && l.y <= fecha.y + fecha.alto * 3;
  for (const l of cab) {
    if (!res.final && l.alto >= altoTipico * 1.4 && /^\s*\d{1,3}\s+\d{1,3}\s*$/.test(l.texto.replace(/\t/g, " "))) {
      const [a, b] = l.texto.match(/\d{1,3}/g)!.map(Number);
      res.final = [a, b];
      continue;
    }
    if (RUIDO.test(l.texto) || !esNombre(l)) continue;
    // la fecha y la hora van en la misma línea que los nombres, en medio: fuera los trozos con cifras
    const trozos = l.texto.split("\t").map((t) => t.trim()).filter((t) => t && !/\d/.test(t) && /[A-ZÀ-Ý]{2,}/.test(t));
    if (!trozos.length) continue;
    if (trozos.length >= 2 && l.x0 < ancho * 0.45 && l.x1 > ancho * 0.55) {
      res.local = `${res.local} ${trozos[0]}`.trim();
      res.visitante = `${res.visitante} ${trozos[trozos.length - 1]}`.trim();
    } else if (l.x0 < ancho * 0.45) res.local = `${res.local} ${trozos.join(" ")}`.trim();
    else res.visitante = `${res.visitante} ${trozos.join(" ")}`.trim();
  }
  return res;
}

const vacio = (dorsal: string, nombre: string): JugadorLeido => ({
  nombre, dorsal, pts: 0, min: 0, t2c: 0, t2i: 0, t3c: 0, t3i: 0, tlc: 0, tli: 0, ro: 0, rd: 0, ast: 0, rob: 0, tap: 0, per: 0, fal: 0,
});

/**
 * Las jugadas → un acta con los dos equipos (local primero) y avisos de lo que no cuadra: huecos en
 * el marcador (canastas que no se han leído) y la suma frente al marcador final.
 */
export function actaDeJugadas(
  jugadas: Jugada[],
  cab: { local: string; visitante: string; final: [number, number] | null } = { local: "", visitante: "", final: null },
): { acta: ActaLeida; avisos: string[] } {
  const avisos: string[] = [];
  const por: Record<Lado, Map<string, JugadorLeido & { nombres: Map<string, number> }>> = { local: new Map(), visitante: new Map() };
  let hayFallos = false;
  for (const j of jugadas) {
    let p = por[j.lado].get(j.dorsal);
    if (!p) por[j.lado].set(j.dorsal, (p = { ...vacio(j.dorsal, ""), nombres: new Map() }));
    if (j.nombre) p.nombres.set(j.nombre, (p.nombres.get(j.nombre) ?? 0) + 1);
    if (j.tipo === "falta") p.fal = Math.min(6, p.fal + 1);
    if (j.tipo === "perdida") p.per++;
    if (j.tipo === "canasta" || j.tipo === "fallo") {
      const c = j.valor === 1 ? "tl" : j.valor === 2 ? "t2" : "t3";
      if (j.tipo === "canasta") { (p as any)[c + "c"]++; p.pts = (p.pts ?? 0) + j.valor; }
      else hayFallos = true;
      (p as any)[c + "i"]++;
    }
  }

  // control con el marcador de cada canasta, en orden de partido. El de cada tarjeta es el PARCIAL
  // del periodo (vuelve a 0-0 en cada uno: medido con una grabación real, 24-oct)
  let previo: [number, number] = [0, 0];
  let periodo = 0;
  const parciales = new Map<number, [number, number]>();
  let huecos = 0;
  for (const j of jugadas.filter((x) => x.tipo === "canasta")) {
    if (j.periodo !== periodo) { periodo = j.periodo; previo = [0, 0]; }
    const esperado: [number, number] = j.lado === "local" ? [previo[0] + j.valor, previo[1]] : [previo[0], previo[1] + j.valor];
    if (j.local !== esperado[0] || j.visitante !== esperado[1]) {
      huecos++;
      if (huecos <= 3) avisos.push(`Entre ${previo[0]}-${previo[1]} y ${j.local}-${j.visitante} (P${j.periodo} ${j.reloj}) falta alguna canasta por leer.`);
    }
    previo = [j.local, j.visitante];
    parciales.set(j.periodo, previo);
  }
  if (huecos > 3) avisos.push(`… y ${huecos - 3} hueco(s) más en el marcador.`);

  // la suma frente al marcador final y la falta de intentos ya los avisa `avisosActa`
  const final = cab.final ?? (parciales.size ? [...parciales.values()].reduce((a, b) => [a[0] + b[0], a[1] + b[1]], [0, 0]) as [number, number] : null);

  const equipo = (l: Lado, nombre: string, pts: number | null) => ({
    nombre,
    pts,
    jugadores: [...por[l].values()]
      .map(({ nombres, ...p }) => ({ ...p, nombre: [...nombres.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "" }))
      .sort((a, b) => (+a.dorsal || 0) - (+b.dorsal || 0)),
  });
  return {
    acta: {
      fecha: "",
      sinIntentos: !hayFallos,
      equipos: [equipo("local", cab.local || "Local", final ? final[0] : null), equipo("visitante", cab.visitante || "Visitante", final ? final[1] : null)],
    },
    avisos,
  };
}
