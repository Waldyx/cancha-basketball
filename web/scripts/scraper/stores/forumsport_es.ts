/**
 * Scraper para Forum Sport (forumsport.com/es-es)
 *
 * 13 enlaces en el catálogo (Awin 23805, 5%) y CERO verificados, mediana 48
 * días. Sin protección anti-bot: la ficha responde 200 al primer intento
 * (~2 s medidos), que es la más rápida de todas las tiendas.
 *
 * Todo lo que necesitamos está en el JSON-LD, que es un `ProductGroup` con un
 * `offers` de PRIMER NIVEL (precio + availability) correspondiente a la
 * colorway que se está mostrando. Dos motivos para no leer el DOM:
 *  1. El bloque de precio junta PVP tachado y precio de venta
 *     ("159,99 € 95,99 €"), y además la ficha repite `.price-tag-small` para
 *     los productos recomendados del carrusel.
 *  2. Los `span.size-item` NO son stock: son la tabla de equivalencias de
 *     tallas y salen TODOS con clase "off" aunque el producto esté a la venta.
 *
 * Ojo con los redirects: una ficha descatalogada redirige a otra colorway del
 * mismo modelo (la Luka 77 `…-1001053712-p` acaba en `…-1001068846-p`). El
 * `offers` de nivel superior ya describe el destino real, y matchesShoe sigue
 * validando que seguimos en el modelo correcto.
 */
import type { Page } from "playwright";
import type { StoreScraper, ShoeRef, ScrapeResult } from "../types.js";
import { matchesShoe, today } from "../matcher.js";

/**
 * Convierte el slug de una ficha en texto comparable.
 *
 * Hace falta porque Forum Sport a veces RECORTA la generación del nombre: la
 * AE 2 se publica como "adidas ANTHONY EDWARDS" en el `name`, el `h1` y el
 * `<title>` — los tres — y solo el slug dice cuál es
 * (`…-anthony-edwards-2-kj4228-1001075419-p`). Sin esto no hay forma de
 * distinguir la AE 1 de la AE 2 y había que rechazar la ficha entera.
 */
export function textoDeSlug(url: string): string {
  try {
    const ruta = new URL(url).pathname.replace(/\/+$/, "");
    const slug = ruta.slice(ruta.lastIndexOf("/") + 1);
    return slug.replace(/-/g, " ");
  } catch {
    return "";
  }
}

export interface OfertaForum {
  nombre: string;
  precio: number | null;
  /** null = la ficha no lo dice; no inventamos ni un sí ni un no. */
  disponible: boolean | null;
}

function disponibilidad(valor: unknown): boolean | null {
  if (typeof valor !== "string") return null;
  if (/OutOfStock|SoldOut|Discontinued/i.test(valor)) return false;
  if (/InStock|LimitedAvailability|PreOrder|BackOrder/i.test(valor)) return true;
  return null;
}

/**
 * Saca la oferta del `ProductGroup` (o `Product`) del JSON-LD.
 *
 * Solo mira objetos de PRIMER nivel: dentro de `hasVariant` van las demás
 * colorways con sus propios precios y stock (la Harden Vol 9 blanca a 159,99 €
 * agotada junto a la amarilla a 95,99 € disponible), y quedarnos con una de
 * esas daría el precio de un producto que no es el del enlace.
 */
export function ofertaDeJsonLd(textos: string[]): OfertaForum | null {
  for (const texto of textos) {
    let dato: any;
    try {
      dato = JSON.parse(texto);
    } catch {
      continue;
    }
    for (const nodo of Array.isArray(dato) ? dato : [dato]) {
      if (!nodo || typeof nodo !== "object") continue;
      const tipos = Array.isArray(nodo["@type"]) ? nodo["@type"] : [nodo["@type"]];
      if (!tipos.includes("ProductGroup") && !tipos.includes("Product")) continue;

      const oferta = Array.isArray(nodo.offers) ? nodo.offers[0] : nodo.offers;
      if (!oferta) continue;

      const precio = Number(oferta.price);
      return {
        nombre: typeof nodo.name === "string" ? nodo.name : "",
        precio: Number.isFinite(precio) && precio > 0 ? precio : null,
        disponible: disponibilidad(oferta.availability),
      };
    }
  }
  return null;
}

export const forumsport_es: StoreScraper = {
  tienda: "forumsport_es",

  async scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult> {
    const base: ScrapeResult = {
      tienda: "forumsport_es",
      url,
      precio_actual: 0,
      disponible: false,
      ultima_verificacion: today(),
    };

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 25000 });

      const datos = (await page.evaluate(
        `(() => {
          const lds = Array.prototype.slice
            .call(document.querySelectorAll('script[type="application/ld+json"]'))
            .map(function (s) { return s.textContent || ""; });
          return {
            lds: lds,
            h1: document.querySelector("h1") ? (document.querySelector("h1").textContent || "").trim() : "",
            titulo: document.title || "",
          };
        })()`
      )) as { lds: string[]; h1: string; titulo: string };

      const oferta = ofertaDeJsonLd(datos.lds);
      // Sin ProductGroup no estamos en una ficha (enlace caducado que cae en
      // una categoría o en el buscador).
      if (!oferta) return { ...base, disponible: false };

      // Identidad. El nombre del LD ya trae la marca ("adidas HARDEN VOLUME 9")
      // y el <title> también. El slug va de último recurso (ver textoDeSlug) y
      // se toma de la URL FINAL, para que un redirect no valide el producto
      // que pedimos en vez del que nos han servido.
      const candidatos = [
        oferta.nombre,
        datos.h1,
        datos.titulo,
        textoDeSlug(page.url()),
      ].filter((t) => t.trim().length > 0);
      if (!candidatos.some((t) => matchesShoe(t, shoe.marca, shoe.modelo))) {
        return { ...base, disponible: false };
      }

      if (oferta.disponible === false) return { ...base, disponible: false };
      if (oferta.precio === null) return { ...base, disponible: false };

      return { ...base, precio_actual: oferta.precio, disponible: true };
    } catch {
      return base;
    }
  },
};
