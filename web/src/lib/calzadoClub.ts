import { esEnlaceDeBusqueda, findMejorPrecioMostrado, recomendar } from "./scoring";
import type { RespuestasQuiz, Zapatilla } from "./types";

export const RUTA_CALZADO_CLUB = "/clubs/calzado/";
export const PRESUPUESTO_CLUB = 80;
export type TallajeClub = "gs" | "adulto";
export type FranjaClub = "mini" | "infantil" | "junior" | "adulto";
export const FRANJAS_CLUB: { id: FranjaClub; nombre: string; edad: string; texto: string }[] = [
  { id: "mini", nombre: "Minibasket", edad: "8–11 años", texto: "Si la tienda lo llama GS, júnior o escolar, corresponde al tallaje infantil. Si ya usa tallas de adulto, cambia el tallaje de esta franja." },
  { id: "infantil", nombre: "Infantil y cadete", edad: "12–15 años", texto: "En esta etapa pueden convivir tallas escolares y de adulto. Elige el tallaje que usa ahora, no solo la edad." },
  { id: "junior", nombre: "Júnior", edad: "16–17 años", texto: "Esta selección usa tallaje adulto/unisex. Comprueba la equivalencia de la marca y la talla disponible en la tienda." },
  { id: "adulto", nombre: "Adulto", edad: "18 años en adelante", texto: "Modelos de tallaje adulto/unisex. Una misma talla puede ajustar de forma distinta entre marcas y modelos." },
];

export interface OpcionesCalzadoClub {
  club: string;
  max: number;
  mini: TallajeClub;
  infantil: TallajeClub;
}

export function leerOpcionesCalzadoClub(params: URLSearchParams): OpcionesCalzadoClub {
  const club = [...(params.get("club") ?? "").replace(/[\p{Cc}\p{Cf}]/gu, " ").replace(/\s+/g, " ").trim()].slice(0, 80).join("");
  const bruto = params.get("max") ?? "";
  const n = Number(bruto);
  const max = bruto.trim() && Number.isFinite(n) && n >= 1 && n <= 1000 ? Math.round(n * 100) / 100 : PRESUPUESTO_CLUB;
  const tallaje = (id: string, defecto: TallajeClub): TallajeClub => params.get(id) === "gs" ? "gs" : params.get(id) === "adulto" ? "adulto" : defecto;
  return { club, max, mini: tallaje("mini", "gs"), infantil: tallaje("infantil", "adulto") };
}

export function enlaceCalzadoClub(opciones: OpcionesCalzadoClub): string {
  const p = new URLSearchParams({ club: opciones.club, max: String(opciones.max), mini: opciones.mini, infantil: opciones.infantil });
  const o = leerOpcionesCalzadoClub(p);
  const url = new URL(RUTA_CALZADO_CLUB, "https://canchazapa.com");
  if (o.club) url.searchParams.set("club", o.club);
  url.searchParams.set("max", String(o.max));
  url.searchParams.set("mini", o.mini);
  url.searchParams.set("infantil", o.infantil);
  return url.href;
}

export function perfilCalzadoClub(franja: FranjaClub, max: number): RespuestasQuiz {
  return {
    posicion: "alero", peso: franja === "adulto" ? "70-85" : "menos-70", estilo: "equilibrado",
    cancha: "mixto", lesiones: [], prioridad: "precio", presupuesto_max_eur: max,
    ancho_pie: "no-se", perfil: franja === "mini" || franja === "infantil" ? "junior" : "hombre", uso: "ambos",
  };
}

const comprasAfiliadas = (z: Zapatilla) => z.links_compra.filter((l) =>
  l.disponible && l.tiene_afiliado === true && !esEnlaceDeBusqueda(l) && Number.isFinite(l.precio_actual) && l.precio_actual > 0);

export function candidatasCalzadoClub(catalogo: Zapatilla[], tallaje: TallajeClub, max: number): Zapatilla[] {
  return catalogo.filter((z) => {
    if (z.oculto || z.proximamente || (tallaje === "gs" ? z.genero !== "gs" : z.genero !== "unisex")) return false;
    const compras = comprasAfiliadas(z);
    if (!compras.some((l) => l.precio_actual <= max)) return false;
    const mostrado = findMejorPrecioMostrado(z.links_compra, z.precio_msrp_eur);
    return !mostrado || mostrado.precio_actual <= max;
  });
}

export const recomendarCalzadoClub = (catalogo: Zapatilla[], franja: FranjaClub, tallaje: TallajeClub, max: number) =>
  recomendar(perfilCalzadoClub(franja, max), candidatasCalzadoClub(catalogo, tallaje, max), 3);

export interface FichaCalzadoClub {
  id: string; slug: string; marca: string; modelo: string; imagen: string;
  precio: number | null; tallaje: string; horma: string;
}
interface EscalonClub { desde: number; ids: string[]; }
export interface DatosCalzadoClub {
  fichas: FichaCalzadoClub[];
  franjas: Record<FranjaClub, Partial<Record<TallajeClub, EscalonClub[]>>>;
}

/** Precalcula con el motor real: el cliente recibe las selecciones, no todo el catálogo. */
export function construirCalzadoClub(catalogo: Zapatilla[]): DatosCalzadoClub {
  const fichas = new Map<string, FichaCalzadoClub>();
  const franjas = {} as DatosCalzadoClub["franjas"];
  const limites = [...new Set(catalogo.flatMap((z) => {
    const compras = comprasAfiliadas(z);
    if (!compras.length) return [];
    const minimo = Math.min(...compras.map((l) => l.precio_actual));
    const mostrado = findMejorPrecioMostrado(z.links_compra, z.precio_msrp_eur)?.precio_actual ?? 0;
    // Evita que el redondeo binario retrase un precio un centimo entero.
    return [Math.ceil(Math.max(minimo, mostrado) * 100 - 1e-8) / 100];
  }).filter((n) => n <= 1000))].sort((a, b) => a - b);
  for (const { id } of FRANJAS_CLUB) {
    franjas[id] = {};
    for (const tallaje of (id === "mini" || id === "infantil" ? ["gs", "adulto"] : ["adulto"]) as TallajeClub[]) {
      const escalones: EscalonClub[] = [{ desde: 0, ids: [] }];
      for (const max of limites) {
        const recs = recomendarCalzadoClub(catalogo, id, tallaje, max);
        const ids = recs.map(({ zapatilla: z }) => {
          if (!fichas.has(z.id)) fichas.set(z.id, {
            id: z.id, slug: z.slug, marca: z.marca, modelo: z.modelo, imagen: z.imagen_principal,
            precio: findMejorPrecioMostrado(z.links_compra, z.precio_msrp_eur)?.precio_actual ?? null,
            tallaje: z.genero === "gs" ? "Escolar · GS" : "Adulto · unisex", horma: z.horma,
          });
          return z.id;
        });
        if (ids.join("|") !== escalones[escalones.length - 1].ids.join("|")) escalones.push({ desde: max, ids });
      }
      franjas[id][tallaje] = escalones;
    }
  }
  return { fichas: [...fichas.values()], franjas };
}

export function seleccionCalzadoClub(datos: DatosCalzadoClub, franja: FranjaClub, opciones: OpcionesCalzadoClub): string[] {
  const tallaje = franja === "mini" || franja === "infantil" ? opciones[franja] : "adulto";
  const escalones = datos.franjas[franja][tallaje] ?? [];
  return escalones.filter((e) => e.desde <= opciones.max).at(-1)?.ids ?? [];
}
