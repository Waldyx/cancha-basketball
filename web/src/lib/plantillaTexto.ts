// Plantilla escrita a mano (una línea por jugador) para las herramientas de partido. Un nombre
// repetido NO se descarta: en minibasket hay dos «Pau» a menudo, y quitar uno dejaría a un niño
// fuera de la rotación sin avisar. El segundo pasa a ser «Pau (2)».

export function lineasPlantilla(texto: string, max = 30, largo = 30): string[] {
  const usados = new Set<string>();
  const out: string[] = [];
  for (const bruto of texto.split("\n")) {
    const l = bruto.trim().slice(0, largo);
    if (!l) continue;
    let nombre = l;
    for (let n = 2; usados.has(nombre); n++) nombre = `${l} (${n})`;
    usados.add(nombre);
    out.push(nombre);
    if (out.length >= max) break;
  }
  return out;
}

/** Cuántas líneas con nombre hay (para avisar si pasan del máximo). */
export const lineasConNombre = (texto: string) => texto.split("\n").filter((l) => l.trim()).length;

/** Fecha AAAA-MM-DD real y razonable. Un <input type="date"> deja teclear un año de 5 cifras. */
export function fechaValida(f: string): boolean {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(f);
  if (!m || +m[1] < 2000 || +m[1] > 2100) return false;
  const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
  return d.getUTCMonth() === +m[2] - 1 && d.getUTCDate() === +m[3];
}

/** ¿Hay nombres repetidos? (para avisar de que conviene añadir el dorsal o el apellido). */
export const hayRepetidos = (texto: string): boolean => {
  const ls = texto.split("\n").map((l) => l.trim()).filter(Boolean);
  return new Set(ls).size !== ls.length;
};

/**
 * Nombres que tienen datos guardados pero ya no están en la plantilla. Los datos cuelgan del
 * nombre escrito, así que al corregir «4 Laia» por «4 Laia Pons» sus datos se quedan huérfanos.
 */
export function huerfanos(registros: Record<string, unknown>[], jugadores: string[]): string[] {
  const en = new Set(jugadores);
  const out = new Set<string>();
  for (const r of registros) for (const k of Object.keys(r)) if (!en.has(k)) out.add(k);
  return [...out];
}

/** Jugadores de la plantilla sin ningún dato todavía (los únicos a los que se pueden pasar los de otro). */
export const sinDatos = (registros: Record<string, unknown>[], jugadores: string[]) => jugadores.filter((j) => !registros.some((r) => Object.hasOwn(r, j)));

/** Pasa los datos de `de` a `a` en todos los registros. Nunca pisa: si `a` ya tiene algo, no se toca nada de ese registro. */
export function pasarDatos(registros: Record<string, unknown>[], de: string, a: string): void {
  for (const r of registros) {
    if (!Object.hasOwn(r, de) || Object.hasOwn(r, a)) continue;
    r[a] = r[de];
    delete r[de];
  }
}

/** Borra los datos de un nombre en todos los registros (p. ej. un jugador que deja el equipo). */
export function borrarDatos(registros: Record<string, unknown>[], nombre: string): void {
  for (const r of registros) delete r[nombre];
}
