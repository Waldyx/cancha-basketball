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
    // Códigos de estilo (AO2372-122, DO1925). Se exigen 4+ dígitos: con 3 se
    // borraban modelos reales como el Tarmak "SE500", que dejaba de encontrarse.
    .replace(/\b[a-z]{1,3}\d{4,5}(?:[-\s]?\d{2,3})?\b/gi, " ")
    .replace(/\b(?:eu|uk|us|talla|size)\s*\d{1,2}(?:[.,]\d)?\b/gi, " ") // "EU 45"
    .replace(/\b\d{1,2}(?:[.,]\d)?\s*(?:eu|uk|us)\b/gi, " ") // "45 EU"
    // (PS) preescolar y (TD) bebé son ruido: no tenemos esos segmentos.
    .replace(/\(ps\)|\(td\)/gi, " ")
    // (GS) en cambio SÍ es significativo: el catálogo tiene 14 zapas "… GS" y
    // el token es obligatorio. Se conserva como palabra en vez de borrarse.
    .replace(/\(gs\)/gi, " gs ");
}

/**
 * Tokens que PARECEN romanos pero son tallas de ropa. Sin esta lista, "XL"
 * (talla) se leería como 40 y colaría en modelos con ese número.
 */
const SIZE_LIKE_ROMAN = new Set(["xs", "s", "m", "l", "xl", "xxl", "xxxl", "mm", "cm"]);

const ROMAN_VALUES: Record<string, number> = { i: 1, v: 5, x: 10, l: 50, c: 100, d: 500, m: 1000 };

function arabicToRoman(n: number): string {
  const tabla: [number, string][] = [
    [50, "l"], [40, "xl"], [10, "x"], [9, "ix"], [5, "v"], [4, "iv"], [1, "i"],
  ];
  let out = "";
  for (const [val, sym] of tabla) while (n >= val) { out += sym; n -= val; }
  return out;
}

/**
 * Convierte un token romano a su número, o null si no lo es.
 * Solo acepta romanos CANÓNICOS de 2+ caracteres y hasta 50: las generaciones de
 * zapatillas van de II a XXXIX (Air Jordan 39). Se valida re-generando el romano
 * para descartar basura tipo "iiii", "mm" o siglas del título.
 */
function romanToArabic(tok: string): number | null {
  if (tok.length < 2 || SIZE_LIKE_ROMAN.has(tok)) return null;
  if (!/^[ivxlcdm]+$/.test(tok)) return null;
  let total = 0;
  let prev = 0;
  for (let i = tok.length - 1; i >= 0; i--) {
    const v = ROMAN_VALUES[tok[i]];
    if (v < prev) total -= v;
    else { total += v; prev = v; }
  }
  if (total < 2 || total > 50) return null;
  return arabicToRoman(total) === tok ? total : null;
}

/**
 * Sinónimos de VARIAS palabras: hay que sustituirlos antes de trocear en tokens.
 * Algunas tiendas escriben el nombre completo del jugador donde la marca usa las
 * siglas (Decathlon vende la adidas "AE 1" como "Anthony Edwards 1").
 */
const PHRASE_SYNONYMS: [RegExp, string][] = [
  [/\banthony edwards\b/g, "ae"],
  // El catálogo llama "GS" al segmento junior, pero las tiendas lo escriben
  // "Junior" / "Jr" / "Grade School". Sin esto, las 14 zapas GS no podían
  // emparejar con NINGUNA ficha (el token del modelo es obligatorio).
  [/\bgrade school\b/g, "gs"],
  [/\bjuniors?\b/g, "gs"],
  [/\bjr\b/g, "gs"],
  // Las tiendas españolas rotulan ese mismo segmento como "niño"/"niña" (Forum
  // Sport: "adidas Dame X rojo zapatilla baloncesto niño"). Sin esto fallaban
  // las 3 GS que Forum Sport SÍ tiene en stock. Se aceptan las variantes sin
  // tilde porque así vienen en los slugs de URL ("…-ninos-ownthegame-30-j-…").
  [/\bni[ñn][oa]s?\b/g, "gs"],
  [/\bkids\b/g, "gs"],
];

/**
 * Normaliza un string para comparación: quita puntos, guiones → espacio, minúsculas.
 * Además unifica las dos convenciones con las que las tiendas escriben la
 * generación del modelo, y que hacían fallar el match con el catálogo:
 *  - Romanos → arábigos:  "Lebron Xxii" → "lebron 22"  (nuestro dato: "LeBron 22")
 *  - "Volume" → "vol":    "Harden Volume 9" → "harden vol 9"
 */
function normalize(s: string): string {
  const base = s
    .toLowerCase()
    .replace(/[.·]/g, " ")   // MB.04 → MB 04
    .replace(/[-–—]/g, " ")  // All-Pro → All Pro
    .replace(/[''´`]/g, "")  // L'eggs → Legs
    .replace(/[()[\],/]/g, " ") // "Canaveral 900 (Sarr Edition)" → tokens limpios
    .replace(/\s+/g, " ")
    .trim();

  const conSinonimos = PHRASE_SYNONYMS.reduce(
    (acc, [re, rep]) => acc.replace(re, rep),
    base
  );

  const tokens = conSinonimos
    .split(" ")
    .map((tok) => {
      if (tok === "volume") return "vol";
      const n = romanToArabic(tok);
      if (n !== null) return String(n);
      // "MB04" → "mb 04", "AE1" → "ae 1": las tiendas pegan la sigla al número
      // y el catálogo los separa ("MB.04", "AE 1"), así el número obligatorio
      // sí se encuentra. Se limita a siglas cortas para no partir palabras.
      const m = tok.match(/^([a-z]{1,3})(\d{1,3})$/);
      return m ? `${m[1]} ${m[2]}` : tok;
    })
    .join(" ")
    .split(" ");

  return unirIniciales(tokens).join(" ");
}

/**
 * Une las RACHAS de letras sueltas en una sigla: "g t cut 3" → "gt cut 3",
 * "d o n issue 7" → "don issue 7".
 *
 * Hace falta porque el punto ya se ha convertido en espacio y las tiendas
 * escriben las siglas punteadas: Amazon lista la GT Cut 3 como "G.t. Cut 3",
 * así que el token obligatorio "gt" del catálogo no aparecía NUNCA y se
 * rechazaba el producto correcto. Nuestro propio catálogo es inconsistente
 * ("GT Cut 3" pero "Air Zoom G.T. Cut 4"), y esto hace converger ambos lados.
 *
 * Solo une rachas de 2+ letras seguidas: una letra suelta se deja como está,
 * para no fundir la "x" de las colaboraciones ("Dame 9 x Wale") con nada.
 */
function unirIniciales(tokens: string[]): string[] {
  const salida: string[] = [];
  let racha: string[] = [];

  const volcar = () => {
    if (racha.length >= 2) salida.push(racha.join(""));
    else salida.push(...racha);
    racha = [];
  };

  for (const tok of tokens) {
    if (/^[a-z]$/.test(tok)) racha.push(tok);
    else {
      volcar();
      salida.push(tok);
    }
  }
  volcar();
  return salida.filter((t) => t.length > 0);
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

/**
 * Deportes que NO son el nuestro. El catálogo es 100% baloncesto, así que un
 * título que se anuncia como otra cosa no es nuestro producto por mucho que
 * comparta nombre de modelo.
 *
 * Caso real (Amazon, 2026-08-06): la "G.t. Cut 3 Turbo, Zapatillas de fútbol"
 * comparte marca, "gt", "cut" y el 3 con la GT Cut 3 de baloncesto, y colaba
 * a 173,26 €. OJO: "tenis" NO va en la lista — en español de América es
 * justamente como se llaman las zapatillas ("Tenis de baloncesto Curry 12").
 */
const OTRO_DEPORTE = /\b(f[úu]tbol|football|running|trail|senderismo|p[áa]del)\b/i;

/**
 * Productos que NO son calzado. Las tiendas venden ROPA con el nombre del mismo
 * modelo, así que marca y modelo casan perfectamente y el precio (más barato que
 * la zapatilla) pasa el guardarraíl de plausibilidad sin despeinarse.
 *
 * Caso real (adidas.es, 2026-08-14): buscando "adidas superstar" la primera
 * tarjeta era "Mallas cortas deportivas adidas Originals Superstar" a 50 €.
 * El scraper la daba por buena, fijaba SU URL en precios.json y la ficha de la
 * Superstar llevaba meses mostrando 50 € con el botón de compra apuntando a
 * unas mallas.
 *
 * OJO con lo que NO puede entrar aquí:
 *  - "top": la adidas Top Ten es una zapatilla del catálogo.
 *  - "balón": `\b` evita que "baloncesto" caiga, pero es un borde fino.
 */
const NO_ES_CALZADO =
  /\b(mallas|leggings|camiseta|camisetas|sudadera|chaqueta|pantal[oó]n|pantalones|shorts|ch[áa]ndal|mochila|gorra|calcetines|calcet[íi]n|bal[óo]n)\b/i;

export function matchesShoe(
  title: string,
  marca: string,
  modelo: string,
  minScore = 0.6
): boolean {
  if (OTRO_DEPORTE.test(title)) return false;
  if (NO_ES_CALZADO.test(title)) return false;

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

/** Hosts de redirección de afiliado y el parámetro donde llevan la URL destino. */
const AFFILIATE_HOSTS: [RegExp, string[]][] = [
  [/(^|\.)awin1\.com$/i, ["ued", "p"]],
  [/(^|\.)tradetracker\.net$/i, ["u", "r"]],
  [/(^|\.)fuikaomar\.es$/i, ["u"]],
];

/**
 * Devuelve la URL real de la tienda que hay dentro de un enlace de afiliado.
 * Si no es un wrapper conocido, devuelve la URL tal cual.
 *
 * Importante para el scraper por dos motivos:
 *  1. Al pedir el wrapper, la red de afiliación responde con su página de
 *     tracking/redirect — no con el HTML de la tienda. Los 31 links de Decathlon
 *     (100% envueltos en Awin) fallaban siempre por esto.
 *  2. Cada fetch del wrapper cuenta como CLICK de afiliado. Scrapear a diario
 *     inflaba clicks que jamás convierten y hunde el EPC de la cuenta.
 *
 * La URL de afiliado original NO se toca en los datos: el merge (`resolveUrl`)
 * conserva el wrapper y solo sustituye el destino.
 */
export function unwrapAffiliateUrl(url: string): string {
  try {
    const parsed = new URL(url);
    for (const [host, params] of AFFILIATE_HOSTS) {
      if (!host.test(parsed.hostname)) continue;
      for (const p of params) {
        const dest = parsed.searchParams.get(p);
        if (dest && /^https?:\/\//i.test(dest)) {
          // Puede venir doblemente codificada (wrapper dentro de wrapper).
          return unwrapAffiliateUrl(dest);
        }
      }
    }
    return url;
  } catch {
    return url;
  }
}
