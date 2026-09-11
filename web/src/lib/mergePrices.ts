import type { Zapatilla, LinkCompra } from "./types";

export interface PreciosJson {
  generated_at: string;
  shoes: Record<string, { links_compra: Partial<LinkCompra>[] }>;
}

/**
 * Guardarraíl de cordura (segunda red, defensiva). Aunque el scraper ya filtra
 * precios implausibles, este merge vuelve a comprobarlo en build: si un precio
 * scrapeado se desvía demasiado del editorial (ej. revendedor Marketplace que
 * infla 95€ → 356€), se ignora el override y se conserva el precio editorial.
 * Así NUNCA llega un precio basura a producción, venga de donde venga precios.json.
 */
const MAX_PRICE_RATIO = 1.5;
const MIN_PRICE_RATIO = 0.35;

function precioPlausible(scraped: number, ref: number): boolean {
  if (ref <= 0) return true;
  return scraped <= ref * MAX_PRICE_RATIO && scraped >= ref * MIN_PRICE_RATIO;
}

function isAmazonUrl(url: string): boolean {
  return /(^|\/\/)(www\.)?amazon\./i.test(url);
}

/**
 * Guardarraíl de IDENTIDAD de producto (segunda red, como el de precio).
 * El scraper puede emparejar mal o un ASIN puede derivar a otro producto
 * (ej. "Air Max Impact 5" → "Air Max SC"/"Alpha Trainer"). Si la URL de Amazon
 * trae un slug de nombre de producto pero NO contiene NINGÚN token del modelo,
 * es otra zapatilla → rechazamos el override y conservamos el enlace editorial.
 * Las fichas correctas de Amazon SÍ incluyen el modelo en el slug.
 */
function amazonProductoEquivocado(freshUrl: string, marca: string, modelo: string): boolean {
  try {
    const u = new URL(freshUrl);
    if (!/amazon\./i.test(u.hostname)) return false;
    // slug de nombre = segmento de texto antes de /dp/ (Amazon mete el título ahí)
    const m = u.pathname.match(/\/([^/]+)\/dp\//i);
    if (!m) return false; // /dp/ASIN pelado, sin slug que juzgar → no bloqueamos
    const slug = decodeURIComponent(m[1]).toLowerCase().replace(/[^a-z0-9]+/g, " ");
    if (slug.length < 6) return false;
    const GENERICAS = new Set(["air","zoom","low","mid","high","the","de","pro","gs","nike","adidas","jordan","puma","reebok","converse","under","armour","new","balance","anta","skechers"]);
    const toks = (modelo.toLowerCase().match(/[a-z0-9]+/g) || []).filter((t) => t.length >= 2 && !GENERICAS.has(t));
    if (toks.length === 0) return false; // sin tokens distintivos → no podemos juzgar
    return !toks.some((t) => slug.includes(t)); // ninguno presente → modelo equivocado
  } catch {
    return false;
  }
}

const AMAZON_TAG = "canchazapa-21";

/** Reaplica nuestro tag de afiliado a una URL de Amazon. Sin él, el clic no monetiza. */
function conTagAmazon(url: string): string {
  try {
    const parsed = new URL(url);
    parsed.searchParams.set("tag", AMAZON_TAG);
    return parsed.toString();
  } catch {
    return url;
  }
}

function getAmazonTag(url: string): string | null {
  try {
    const parsed = new URL(url);
    return parsed.searchParams.get("tag");
  } catch {
    return null;
  }
}

const WRAPPER_KEYS = ["ued", "u", "url", "dest", "destination"];

/**
 * Devuelve la URL de TIENDA que hay dentro de un wrapper de afiliado, o la
 * propia URL si no lo es. Resuelve wrappers anidados (wrapper dentro de wrapper).
 */
export function unwrapWrapperUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (!/awin1\.com|tradetracker\.net|deals\./i.test(parsed.hostname)) return url;
    for (const key of WRAPPER_KEYS) {
      const dest = parsed.searchParams.get(key);
      if (dest && /^https?:\/\//i.test(dest)) return unwrapWrapperUrl(dest);
    }
    return url;
  } catch {
    return url;
  }
}

function setWrapperDestination(originalUrl: string, destinationUrl: string): string {
  try {
    const parsed = new URL(originalUrl);

    // El destino puede venir YA envuelto: precios.json guarda la URL tal cual
    // la tiene el catálogo, wrapper incluido. Si no lo desenvolvemos, metemos un
    // wrapper dentro de otro y sale un enlace anidado de ~230 chars (pasaba en
    // anta-kai-1-speed). Siempre queremos wrapper → URL de tienda, un solo nivel.
    const destino = unwrapWrapperUrl(destinationUrl);

    // Awin uses `ued`, Tradetracker often uses `u`; keep the wrapper and swap
    // only the merchant destination.
    for (const key of WRAPPER_KEYS) {
      if (parsed.searchParams.has(key)) {
        parsed.searchParams.set(key, destino);
        return parsed.toString();
      }
    }
  } catch {
    // Fall through to returning the destination.
  }
  return destinationUrl;
}

/**
 * Identidad de producto de un enlace: host + ruta, sin query ni wrapper. Sirve
 * para emparejar la entrada de precios.json con SU enlace editorial cuando una
 * misma tienda tiene varios productos para la misma zapatilla.
 *
 * La EXPORTA también el scraper (`scripts/scraper/output.ts`) para fusionar
 * precios.json por enlace. Lectura y escritura DEBEN usar la misma identidad:
 * si divergen, la escritura guardaría entradas que el merge nunca sabría
 * emparejar con su enlace editorial.
 *
 * Amazon es un caso especial: la ruta completa lleva el slug del título Y un
 * sufijo `/ref=sr_1_N` que cambia según la posición en el listado de búsqueda.
 * El MISMO ASIN sale con slug/ref distintos en cada pasada del scraper, así que
 * identificar por ruta entera trataba cada aparición como "otro producto":
 * 30 de las 188 entradas de amazon_es eran el mismo ASIN repetido con ref
 * distinto (p.ej. B0CV9F3XZJ salía 4 veces), y `elegirScrape` nunca encontraba
 * un match exacto para la ficha editorial. Para Amazon, la identidad es solo
 * el ASIN de `/dp/` o `/gp/product/`.
 */
export function identidadProducto(url: string): string | null {
  try {
    const u = new URL(unwrapWrapperUrl(url));
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();
    if (/amazon\./i.test(host)) {
      const asin = u.pathname.match(/\/(?:dp|gp\/product)\/([a-z0-9]{10})/i);
      if (asin) return `${host}/dp/${asin[1].toLowerCase()}`;
    }
    return `${host}${u.pathname.replace(/\/+$/, "")}`.toLowerCase();
  } catch {
    return null;
  }
}

/**
 * ¿La URL identifica un producto CONCRETO (no una búsqueda, categoría, o URL
 * opaca)? Amazon (ASIN de /dp/ o /gp/product/) y AliExpress (/item/<id>) son
 * los dos casos reconocibles hoy. Sirve para decidir si `elegirScrape` puede
 * caer al candidato "más barato" cuando no hay match exacto: si el editorial
 * YA es una ficha concreta, el más barato de un scrape de búsqueda es casi
 * seguro OTRO producto — mejor conservar el dato editorial que mezclar precios
 * de fichas distintas (medido: puma-all-pro-nitro enseñaba 32,98€ de un ASIN
 * ajeno en vez de sus 76,99€ verificados).
 */
function esFichaReconocible(url: string): boolean {
  try {
    const u = new URL(unwrapWrapperUrl(url));
    const host = u.hostname.replace(/^www\./i, "").toLowerCase();
    if (/amazon\./i.test(host)) return /\/(?:dp|gp\/product)\/[a-z0-9]{10}/i.test(u.pathname);
    if (/aliexpress\./i.test(host)) return /\/item\/\d+/i.test(u.pathname);
    return false;
  } catch {
    return false;
  }
}

/**
 * Elige QUÉ entrada scrapeada corresponde a un enlace editorial.
 *
 * Antes esto era un `Map` indexado solo por tienda, así que cuando una tienda
 * tenía varios productos para la misma zapa el Map se quedaba con el ÚLTIMO y
 * se lo aplicaba a todos los enlaces de esa tienda. Medido: 361-joker-1 mostraba
 * 151,40 € cuando su AliExpress más barato eran 57,05 €, y anta-kai-1-speed
 * 58,09 € en vez de 40,48 €. En un comparador eso es el peor fallo posible.
 *
 * Ahora: se empareja por PRODUCTO, y si no hay forma de identificarlo se coge
 * el MÁS BARATO (que es la semántica del sitio), nunca el último por azar.
 */
export function elegirScrape<
  T extends { url?: string; precio_actual?: number; ultima_verificacion?: string }
>(orig: LinkCompra, candidatos: T[], variosEditoriales = false): T | undefined {
  if (candidatos.length === 0) return undefined;

  const idOrig = identidadProducto(orig.url);
  if (idOrig) {
    const exactos = candidatos.filter((c) => c.url && identidadProducto(c.url) === idOrig);
    if (exactos.length === 1) return exactos[0];
    if (exactos.length > 1) {
      // Con la identidad por ASIN, varias entradas de precios.json (scrapeadas
      // en noches distintas antes de que el scraper dedupicara con esta misma
      // función) pueden compartir identidad. Quedarnos con la MÁS RECIENTE,
      // nunca con la primera del array por azar (el mismo fallo que motivó
      // esta función, ahora dentro del propio match exacto).
      return [...exactos].sort((a, b) =>
        (b.ultima_verificacion ?? "").localeCompare(a.ultima_verificacion ?? "")
      )[0];
    }
  }

  // Si el catálogo tiene VARIOS enlaces de esta tienda y no sabemos a cuál
  // corresponde el scrape, no adivinamos: aplicarlo a todos les ponía la misma
  // URL y el mismo precio, y la ficha acababa enseñando la misma opción de
  // compra 2 o 3 veces (pasaba en lining-wow-allcity-12, air-jordan-1...).
  // Mejor conservar el dato editorial que inventar una correspondencia.
  if (variosEditoriales) return undefined;

  // Si el editorial YA identifica un producto concreto (ASIN de Amazon, /item/
  // de AliExpress) y ninguno de los candidatos coincidió arriba, no hay "más
  // barato" razonable que ofrecer: son fichas de OTROS productos (una búsqueda
  // resuelta a otro ASIN, por ejemplo). Conservamos el dato editorial en vez
  // de mezclar el precio de un producto ajeno.
  if (esFichaReconocible(orig.url)) return undefined;

  if (candidatos.length === 1) return candidatos[0];

  // Antes de coger el más barato, descartar candidatos "viejos" frente al más
  // reciente del grupo (más de 7 días atrás): una entrada rancia que nadie ha
  // vuelto a verificar no debería ganarle en precio a una fresca solo por ser
  // más barata — probablemente ya no es válida.
  const fechas = candidatos.map((c) => c.ultima_verificacion).filter((f): f is string => !!f);
  let pool = candidatos;
  if (fechas.length > 0) {
    const masReciente = fechas.reduce((a, b) => (a > b ? a : b));
    const limite = new Date(masReciente).getTime() - 7 * 24 * 60 * 60 * 1000;
    const frescos = candidatos.filter(
      (c) => !c.ultima_verificacion || new Date(c.ultima_verificacion).getTime() >= limite
    );
    if (frescos.length > 0) pool = frescos;
  }

  return [...pool].sort(
    (a, b) => (a.precio_actual ?? Infinity) - (b.precio_actual ?? Infinity)
  )[0];
}

function isSearchLikeUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    const haystack = `${parsed.hostname}${parsed.pathname}`.toLowerCase();
    const searchParams = [...parsed.searchParams.keys()].map((k) => k.toLowerCase());

    if (/(^|\/)(search|results|finder|browse)(\/|$)/.test(haystack)) return true;
    if (/(^|\/)(collection|category|categories)(\/|$)/.test(haystack)) return true;
    if (searchParams.some((key) => ["q", "query", "keyword", "keywords", "s"].includes(key))) {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}

function resolveUrl(orig: LinkCompra, freshUrl?: string): string {
  if (!freshUrl || freshUrl === orig.url) return orig.url;

  const freshLooksLikeSearch = isSearchLikeUrl(freshUrl);
  const origLooksLikeSearch = isSearchLikeUrl(orig.url);

  // Si el scraper trae una URL de búsqueda/categoría y ya teníamos una ficha
  // de producto, nos quedamos con la ficha. No queremos degradar una URL buena.
  if (freshLooksLikeSearch && !origLooksLikeSearch) {
    return orig.url;
  }

  // If the scraper found a clean product URL, prefer it. When the original
  // link is an affiliate wrapper, try to preserve the wrapper and swap only
  // the destination to the fresh product URL.
  if (orig.tiene_afiliado) {
    if (isAmazonUrl(orig.url)) {
      const tag = getAmazonTag(orig.url) ?? AMAZON_TAG;
      try {
        const parsed = new URL(freshUrl);
        if (parsed.hostname.includes("amazon.")) {
          parsed.searchParams.set("tag", tag);
          return parsed.toString();
        }
      } catch {
        // If freshUrl is not a valid absolute URL, fall through.
      }
    }

    const wrapped = setWrapperDestination(orig.url, freshUrl);
    if (wrapped !== freshUrl) return wrapped;
  }

  return freshUrl;
}

/**
 * Mezcla precios scrapeados (precios.json) sobre los datos editoriales (zapatillas.ts).
 *
 * Reglas:
 * - Solo se aplica un override si el scraper encontró el producto (disponible: true,
 *   precio_actual > 0). Un fallo de scraping (bot-detection, timeout, etc.) NO debe
 *   anular un precio editorial válido.
 * - Las entradas editoriales que no existen en precios.json se conservan tal cual.
 * - El scraper puede "upgrade" la URL al directlink del producto cuando lo encuentra.
 * - Las tiendas encontradas por el scraper que no están en el catálogo editorial
 *   (ej. idealo_es como fallback) se añaden al final de links_compra.
 */
export function mergePricesIntoShoes(
  shoes: Zapatilla[],
  overrides: PreciosJson
): Zapatilla[] {
  if (!overrides?.shoes || Object.keys(overrides.shoes).length === 0) {
    return shoes;
  }

  return shoes.map((shoe) => {
    const cached = overrides.shoes[shoe.id];
    if (!cached?.links_compra?.length) return shoe;

    // Solo usar overrides con precio real (disponible: true AND precio > 0)
    const validScraped = cached.links_compra.filter(
      (l) => l.disponible === true && (l.precio_actual ?? 0) > 0
    );
    if (validScraped.length === 0) return shoe;

    // Agrupado por tienda, NO indexado por tienda: una misma tienda puede tener
    // varios productos para la misma zapatilla (ver `elegirScrape`).
    const scrapedPorTienda = new Map<string, typeof validScraped>();
    for (const l of validScraped) {
      const lista = scrapedPorTienda.get(l.tienda as string);
      if (lista) lista.push(l);
      else scrapedPorTienda.set(l.tienda as string, [l]);
    }

    // Cuántos enlaces EDITORIALES hay por tienda: si hay más de uno, el scrape
    // solo se aplica cuando podemos identificar a cuál corresponde.
    const editorialesPorTienda = new Map<string, number>();
    for (const l of shoe.links_compra) {
      editorialesPorTienda.set(l.tienda, (editorialesPorTienda.get(l.tienda) ?? 0) + 1);
    }

    // Tiendas editables que también existen en el scrape
    const mergedLinks: LinkCompra[] = shoe.links_compra.map((orig) => {
      // La ficha manda: si el editorial dice que este enlace NO está disponible,
      // ningún scrape lo resucita. El scraper recorre el catálogo YA fusionado
      // (`scripts/scraper/index.ts`) y también procesa los enlaces `false`; sin
      // este freno, un `disponible:false` decidido a propósito (retro sin venta,
      // segmento equivocado, matcher que emparejó otro modelo) vuelve a `true`
      // en cuanto el scraper encuentra CUALQUIER resultado para esa búsqueda —
      // medido: 15 de 211 enlaces `false` salían vivos en la web (Air Max Impact
      // 5 → Air Max Alpha, Shox BB4 → Shox R4 Brazil...). Una reposición real
      // (el modelo SÍ ha vuelto a venderse) no se pierde: sale listada en
      // `audit-enlaces.ts` → "Posibles reposiciones" para verificarla a mano.
      if (orig.disponible === false) return orig;

      const fresh = elegirScrape(
        orig,
        scrapedPorTienda.get(orig.tienda) ?? [],
        (editorialesPorTienda.get(orig.tienda) ?? 0) > 1
      );
      if (!fresh) return orig;
      // Guardarraíl: si el precio scrapeado es implausible vs el editorial,
      // ignorar el override por completo y conservar la entrada editorial.
      if (!precioPlausible(fresh.precio_actual ?? 0, orig.precio_actual)) {
        return orig;
      }
      // Guardarraíl de identidad: si la URL de Amazon nombra OTRA zapatilla,
      // ignorar el override (el scraper emparejó mal o el ASIN derivó).
      if (fresh.url && amazonProductoEquivocado(fresh.url, shoe.marca, shoe.modelo)) {
        return orig;
      }
      // NUNCA sobreescribir la URL de un link de afiliado: el scraper devuelve
      // la URL directa del producto (p.ej. amazon.es/dp/...) SIN el tag de
      // afiliado (?tag=, redirect AWIN cread.php, short link aliexpress), lo que
      // rompería la monetización. Para afiliados, intentamos mantener el wrapper
      // y solo sustituir el destino por la URL de producto directa. Para
      // no-afiliados, hacemos el "upgrade" completo a la página de producto.
      const upgradeUrl = resolveUrl(orig, fresh.url);
      return {
        ...orig,
        precio_actual: fresh.precio_actual ?? orig.precio_actual,
        disponible: true, // ya comprobamos arriba que fresh.disponible === true
        url: upgradeUrl,
        ultima_verificacion:
          fresh.ultima_verificacion ?? orig.ultima_verificacion,
      };
    });

    // Añadir tiendas extra del scraper que no estaban en el catálogo editorial
    // (e.g. idealo_es como fallback automático)
    const editorialTiendas = new Set(shoe.links_compra.map((l) => l.tienda));
    for (const fresh of validScraped) {
      if (editorialTiendas.has(fresh.tienda as any)) continue;
      const url = fresh.url ?? "";

      // El MISMO guardarraíl de identidad que arriba. Aquí no hay enlace editorial
      // que conservar, así que un mal emparejamiento de Amazon entraba SIN filtro:
      // por eso air-jordan-10 y adidas-cross-em-up-5 seguían enseñando enlaces de
      // Amazon después de que el catálogo los quitase a propósito. Al no quedar ya
      // enlace editorial de esa tienda, precios.json los resucitaba en cada build.
      if (amazonProductoEquivocado(url, shoe.marca, shoe.modelo)) continue;

      // Un enlace de Amazon SIN `tag=` es un clic que no monetiza. El scraper
      // devuelve siempre la URL pelada, así que el tag se reaplica aquí igual que
      // en resolveUrl(); para el resto de tiendas no tenemos programa, van tal cual.
      const esAmazon = isAmazonUrl(url);

      mergedLinks.push({
        tienda: fresh.tienda as any,
        url: esAmazon ? conTagAmazon(url) : url,
        precio_actual: fresh.precio_actual ?? 0,
        disponible: true,
        tiene_afiliado: esAmazon,
        ultima_verificacion:
          fresh.ultima_verificacion ?? new Date().toISOString().slice(0, 10),
      });
    }

    return { ...shoe, links_compra: mergedLinks };
  });
}
