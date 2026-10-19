import type { APIRoute } from "astro";
import { zapatillas } from "../data/zapatillas";
import { catalogoQuiz } from "../lib/quizCatalogo";

// Lo pide /resultados al cargar (ver lib/quizCatalogo.ts).
export const GET: APIRoute = () =>
  new Response(JSON.stringify(catalogoQuiz(zapatillas)), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
