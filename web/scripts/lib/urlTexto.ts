/**
 * ¿Qué dice una URL sobre el producto que vende?
 *
 * Lo usan las dos auditorías de enlaces, y es lo que separa "esta URL apunta a
 * OTRA zapatilla" de "esta URL no dice nada". El día 14-ago `audit-affiliates`
 * marcaba 29 enlaces como "modelo equivocado" y ~25 eran URLs de ECI del tipo
 * `/deportes/A56001758/`: no nombran NADA, así que no pueden nombrar otro
 * producto. Ese ruido tapaba los 4 hallazgos de verdad.
 */

/** Una búsqueda no promete un producto concreto: no hay nada que auditar. */
export function esBusqueda(url: string): boolean {
  try {
    const u = new URL(url);
    if (u.search && /[?&](q|s|k|ntt|text|term|query|search)=/i.test(u.search)) return true;
    return /\/(search|buscar|w)\b/i.test(u.pathname);
  } catch {
    return /[?&](q|s|k|ntt|text|term|query|search)=/i.test(url);
  }
}

/**
 * El texto que la URL da sobre el producto, o null si es OPACA (id pelado,
 * hash, ASIN sin slug). Solo se puede juzgar una URL que describe lo que vende.
 */
export function textoDescriptivo(url: string): string | null {
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  if (esBusqueda(url)) return null;

  const segs = u.pathname.split("/").filter(Boolean).map((s) => decodeURIComponent(s));
  // Un segmento describe algo si trae 3+ palabras de 3+ letras. Con menos son
  // ids (`A56001758`, `dp`, un uuid) o rutas de sección (`deportes`, `es/p`).
  const descriptivos = segs.filter(
    (s) => (s.match(/[a-zA-Z]{3,}/g) ?? []).length >= 3 && !/^[0-9a-f]{16,}$/i.test(s)
  );
  if (descriptivos.length === 0) return null;
  return descriptivos.join(" ").replace(/[^a-zA-Z0-9]+/g, " ");
}
