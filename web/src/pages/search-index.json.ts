import type { APIRoute } from "astro";
import { zapatillas } from "../data/zapatillas";

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
        precio: z.precio_msrp_eur,
        cat: z.categoria_principal,
        img: z.imagen_principal,
      }))
    ),
    { headers: { "Content-Type": "application/json; charset=utf-8" } }
  );
