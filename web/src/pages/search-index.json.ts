import type { APIRoute } from "astro";
import { zapatillas } from "../data/zapatillas";
import { findMejorPrecioMostrado } from "../lib/scoring";

// Índice del buscador global (Cmd+K). Vive aquí y NO dentro de
// `CommandPalette.astro` porque ese componente está en `Base.astro`: inlinearlo
// metía ~60 KB del catálogo entero en CADA página del sitio (240 fichas + el
// resto), tanto en el peso que descarga el visitante como en el tamaño del
// despliegue. El paladar solo lo necesita cuando el usuario abre la paleta, así
// que se sirve como fichero estático y el navegador lo cachea para todo el sitio.
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      zapatillas.map((z) => ({
        slug: z.slug,
        marca: z.marca,
        modelo: z.modelo,
        search:
          `${z.marca} ${z.modelo} ${z.slug} ${z.categoria_principal} ${z.tags.join(" ")}`.toLowerCase(),
        // El mismo «desde» que la ficha y las tarjetas; antes era el MSRP y la KT 11
        // salía a 110 € en el buscador y a 75 € en su ficha.
        precio: Math.round(findMejorPrecioMostrado(z.links_compra, z.precio_msrp_eur)?.precio_actual ?? z.precio_msrp_eur),
        cat: z.categoria_principal,
        img: z.imagen_principal,
      }))
    ),
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
