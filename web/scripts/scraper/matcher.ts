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
    .filter((w) => w.length > 1 && !STOP_WORDS.has(w));
}

export function matchesShoe(
  title: string,
  marca: string,
  modelo: string,
  minScore = 0.6
): boolean {
  const tNorm = normalize(title);

  // ── 1. Marca ─────────────────────────────────────────────────────────────
  const marcaNorm = normalize(marca);
  const aliases = BRAND_ALIASES[marcaNorm] ?? [marcaNorm];
  const marcaMatch = aliases.some((a) => tNorm.includes(a));
  if (!marcaMatch) return false;

  // ── 2. Modelo ─────────────────────────────────────────────────────────────
  const modeloWords = significantWords(modelo);
  if (modeloWords.length === 0) return true; // Sin palabras útiles → OK si marca ok

  // Contar palabras del modelo que aparecen completas en el título normalizado
  // Usamos regex para evitar falsos positivos: "LeBron 2" no debe matchear "LeBron 22"
  const tWords = tNorm.split(/\s+/);
  let matched = 0;
  for (const w of modeloWords) {
    // Número exacto o palabra completa
    const isNumber = /^\d+$/.test(w);
    if (isNumber) {
      // Número: debe aparecer como token separado (evita LeBron2 ~ LeBron22)
      if (tWords.includes(w)) matched++;
    } else {
      // Palabra: aparece como subcadena completa
      const re = new RegExp(`(^|\\s|-)${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(\\s|-|$)`, "i");
      if (re.test(tNorm)) matched++;
    }
  }

  const score = matched / modeloWords.length;
  return score >= minScore;
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
