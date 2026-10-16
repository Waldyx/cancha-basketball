// Plantilla escrita a mano (una línea por jugador) para las herramientas de partido. Un nombre
// repetido NO se descarta: en minibasket hay dos «Pau» a menudo, y quitar uno dejaría a un niño
// fuera de la rotación sin avisar. El segundo pasa a ser «Pau (2)».

export function lineasPlantilla(texto: string, max = 30, largo = 30): string[] {
  const vistos = new Map<string, number>();
  const out: string[] = [];
  for (const bruto of texto.split("\n")) {
    const l = bruto.trim().slice(0, largo);
    if (!l) continue;
    const n = (vistos.get(l) ?? 0) + 1;
    vistos.set(l, n);
    out.push(n === 1 ? l : `${l} (${n})`);
    if (out.length >= max) break;
  }
  return out;
}

/** ¿Hay nombres repetidos? (para avisar de que conviene añadir el dorsal o el apellido). */
export const hayRepetidos = (texto: string): boolean => {
  const ls = texto.split("\n").map((l) => l.trim()).filter(Boolean);
  return new Set(ls).size !== ls.length;
};
