/**
 * Fuzzy matching de título de producto contra la zapatilla buscada.
 * Devuelve true si el título contiene suficientes palabras clave de marca + modelo.
 */
export function matchesShoe(
  title: string,
  marca: string,
  modelo: string
): boolean {
  const t = title.toLowerCase();

  // Normalizar marca: "Nike", "Adidas", "Under Armour" → palabras
  const marcaWords = marca.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
  const marcaMatch = marcaWords.some((w) => t.includes(w));

  // Normalizar modelo: quitar caracteres especiales, dividir en palabras
  const modeloWords = modelo
    .toLowerCase()
    .replace(/[''´]/g, "")
    .split(/\s+/)
    .filter((w) => w.length > 1);

  // Necesitamos ≥ 60% de las palabras del modelo presentes en el título
  const modeloMatches = modeloWords.filter((w) => t.includes(w));
  const modeloScore = modeloMatches.length / modeloWords.length;

  return marcaMatch && modeloScore >= 0.6;
}

/**
 * Extrae un precio numérico de un string de texto.
 * Soporta formatos: "189,99 €", "€ 189.99", "189.99", "1.189,99"
 */
export function parsePrice(raw: string): number | null {
  if (!raw) return null;

  // Eliminar símbolos de moneda y espacios
  let clean = raw.replace(/[€$£\s]/g, "").trim();

  // Formato europeo 1.234,56 → 1234.56
  if (/^\d{1,3}(\.\d{3})*(,\d{1,2})?$/.test(clean)) {
    clean = clean.replace(/\./g, "").replace(",", ".");
  }
  // Formato 1234,56 (sin separador de miles)
  else if (/^\d+,\d{1,2}$/.test(clean)) {
    clean = clean.replace(",", ".");
  }

  const price = parseFloat(clean);
  return isNaN(price) || price <= 0 || price > 2000 ? null : price;
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
