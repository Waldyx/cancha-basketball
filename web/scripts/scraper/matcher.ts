/**
 * Fuzzy matching de título de producto contra la zapatilla buscada.
 * Devuelve true si el título contiene suficientes palabras clave de marca + modelo.
 *
 * Mejoras sobre v1:
 *  - Normalización de separadores: "MB.04" === "MB04" === "MB 04"
 *  - Manejo de modelos con números: "LeBron 22" ← no matchea "LeBron 2"
 *  - Soporte de alias de marca: "UA" → "Under Armour", "NB" → "New Balance"
 *  - Puntuación mínima configurable (default 0.6)
 */

const BRAND_ALIASES: Record<string, string[]> = {
  "under armour": ["ua", "underarmour"],
  "new balance": ["nb", "newbalance"],
  "adidas": ["adidas"],
  "nike": ["nike"],
  "puma": ["puma"],
  "reebok": ["reebok"],
  "converse": ["converse"],
  "jordan": ["jordan", "air jordan"],
  "li-ning": ["li ning", "lining", "li-ning"],
  "anta": ["anta"],
  "decathlon tarmak": ["tarmak", "decathlon"],
  "decathlon": ["decathlon", "tarmak"],
};

/**
 * Quita "ruido" del título que inyecta números/tokens espurios y provoca
 * falsos positivos en el matching (tallas y códigos de estilo):
 *  - Tallas:  "EU 45", "UK 10", "US 11", "45 EU", "talla 42", "(PS)"
 *  - Códigos: "AO2372-122", "DO1925", "DX8733", "IM6119-800"
 * Ej: sin esto, "Air Max 270 ... 34 EU" matchea "Air Max CB 34" por la talla.
 */
function stripNoise(s: string): string {
  return s
    .replace(/\b[a-z]{1,3}\d{3,5}(?:[-\s]?\d{2,3})?\b/gi, " ") // códigos de estilo
    .replace(/\b(?:eu|uk|us|talla|size)\s*\d{1,2}(?:[.,]\d)?\b/gi, " ") // "EU 45"
    .replace(/\b\d{1,2}(?:[.,]\d)?\s*(?:eu|uk|us)\b/gi, " ") // "45 EU"
    .replace(/\(ps\)|\(gs\)|\(td\)/gi, " "); // segmentos de talla infantil
}

/** Normaliza un string para comparación: quita puntos, guiones → espacio, minúsculas */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/[.·]/g, " ")   // MB.04 → MB 04
    .replace(/[-–—]/g, " ")  // All-Pro → All Pro
    .replace(/[''´`]/g, "")  // L'eggs → Legs
    .replace(/\s+/g, " ")
    .trim();
}

/** Palabras significativas (> 1 char y no stopwords de ropa deportiva) */
const STOP_WORDS = new Set([
  "de", "la", "el", "los", "las", "y", "e", "o", "con",
  "para", "baloncesto", "basketball", "unisex", "mujer", "hombre",
  "zapatilla", "zapatillas", "shoe", "shoes", "sneaker", "talla",
  "size", "color", "colores", "team", "lo", "hi", "mid",
]);

function significantWords(s: string): string[] {
  return normalize(s)
    .split(/\s+/)
    // Keep words with length > 1, OR single-digit numbers (e.g. "4" in "Freak 4")
    .filter((w) => (w.length > 1 || /^\d$/.test(w)) && !STOP_WORDS.has(w));
}

export function matchesShoe(
  title: string,
  marca: string,
  modelo: string,
  minScore = 0.6
): boolean {
  // Limpiar tallas/códigos ANTES de normalizar (evita números espurios)
  const tNorm = normalize(stripNoise(title));

  // ── 1. Marca ─────────────────────────────────────────────────────────────
  const marcaNorm = normalize(marca);
  // Incluir SIEMPRE el nombre normalizado además de los alias. Si no, marcas de
  // dos palabras como "under armour" / "new balance" (cuyos alias son "ua"/"nb")
  // nunca matchean el título real que sí escribe el nombre completo.
  const aliases = [marcaNorm, ...(BRAND_ALIASES[marcaNorm] ?? [])];
  const marcaMatch = aliases.some((a) => tNorm.includes(a));
  if (!marcaMatch) return false;

  // ── 2. Modelo ─────────────────────────────────────────────────────────────
  const modeloWords = significantWords(modelo);
  if (modeloWords.length === 0) return true; // Sin palabras útiles → OK si marca ok

  const tWords = tNorm.split(/\s+/);
  const numeros = modeloWords.filter((w) => /^\d+$/.test(w));
  const palabras = modeloWords.filter((w) => !/^\d+$/.test(w));

  // ── 2a. TODOS los números del modelo son OBLIGATORIOS ──────────────────────
  // El número es lo que distingue saga (Curry 12 ≠ 13, Impact 5 ≠ Alpha Trainer 6,
  // AJ10 ≠ AJ Two Trey). Si falta cualquiera, NO es el mismo modelo. Como ya
  // limpiamos tallas/códigos, un número que quede es de verdad del modelo.
  for (const n of numeros) {
    if (!tWords.includes(n)) return false;
  }

  // ── 2b. Score sobre las PALABRAS (sin contar números, que ya son obligatorios) ─
  // Así "Air Max 1" no cuela como "Air Penny 1": comparten "air"+"1" pero falta
  // la palabra distintiva "penny" → score de palabras < umbral.
  if (palabras.length === 0) return true; // modelo solo-número y ya validado
  let matched = 0;
  for (const w of palabras) {
    const re = new RegExp(`(^|\\s|-)${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|-|$)`, "i");
    if (re.test(tNorm)) matched++;
  }
  return matched / palabras.length >= minScore;
}

/**
 * Extrae un precio numérico de un string de texto.
 * Soporta formatos:
 *  "189,99 €" | "€ 189.99" | "189.99" | "1.189,99" | "110€" | "110,00"
 */
export function parsePrice(raw: string): number | null {
  if (!raw) return null;

  // Eliminar símbolos de moneda, espacios, nbsp
  let clean = raw.replace(/[€$£ \s]/g, "").trim();

  // Si queda vacío tras limpiar
  if (!clean) return null;

  // Extraer el primer patrón numérico con posible separador decimal/miles
  const match = clean.match(/(\d{1,3}(?:[.,]\d{3})*(?:[.,]\d{1,2})?|\d+(?:[.,]\d{1,2})?)/);
  if (!match) return null;
  clean = match[1];

  // Formato europeo con separador de miles: 1.234,56 → 1234.56
  if (/^\d{1,3}(\.\d{3})+(,\d{1,2})?$/.test(clean)) {
    clean = clean.replace(/\./g, "").replace(",", ".");
  }
  // Formato sin miles pero con coma decimal: 189,99 → 189.99
  else if (/^\d+,\d{1,2}$/.test(clean)) {
    clean = clean.replace(",", ".");
  }
  // Si tiene punto Y coma → el último es el decimal
  else if (clean.includes(".") && clean.includes(",")) {
    const dotPos = clean.lastIndexOf(".");
    const commaPos = clean.lastIndexOf(",");
    if (commaPos > dotPos) {
      // ej: 1.234,56
      clean = clean.replace(/\./g, "").replace(",", ".");
    } else {
      // ej: 1,234.56
      clean = clean.replace(/,/g, "");
    }
  }

  const price = parseFloat(clean);
  return isNaN(price) || price <= 0 || price > 2000 ? null : price;
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
