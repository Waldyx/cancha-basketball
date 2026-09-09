import type { APIRoute } from "astro";
import { zapatillas } from "../data/zapatillas";
import { findMejorPrecioMostrado } from "../lib/scoring";

// Índice mínimo para las mini-cards del chat (marcadores `[[shoe:<slug>]]`).
// Vive aquí y NO dentro de `ChatWidget.astro` porque ese componente está en
// `Base.astro`: inlinearlo metía ~40 KB en CADA página del sitio. El chat solo
// lo necesita cuando el usuario lo abre, y para cuando llega una respuesta del
// modelo (>10 s) el fichero ya está descargado y cacheado.
export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      Object.fromEntries(
        zapatillas.map((z) => {
          const vals = Object.values(z.puntuaciones);
          const score =
            Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
          const precio =
            findMejorPrecioMostrado(z.links_compra)?.precio_actual ?? z.precio_msrp_eur;
          return [
            z.slug,
            {
              marca: z.marca,
              modelo: z.modelo,
              img: z.imagen_principal,
              score,
              precio: Math.round(precio),
              cat: z.categoria_principal,
            },
          ];
        })
      )
    ),
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
