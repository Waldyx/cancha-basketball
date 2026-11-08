import { valorTalla } from "../../scripts/scraper/tallas";
import { unaFilaPorTienda } from "./scoring";
import type { Zapatilla } from "./types";

export const TALLAS_EU = Array.from({ length: 31 }, (_, i) => String(35 + i / 2).replace(".", ","));
export interface TallasTienda { tienda: string; tallas: string[]; }
export type DatosMiTalla = Record<string, TallasTienda[]>;
const NOMBRES: Record<string, string> = {
  fuikaomar_es: "FuikaOmar", atmosfera_sport: "Atmósfera Sport", elcorteingles_es: "El Corte Inglés",
  forumsport_es: "Forum Sport", adidas_es: "Adidas", amazon_es: "Amazon", aliexpress: "AliExpress", decathlon: "Decathlon",
};

export function normalizarMiTalla(valor: string | null): string {
  if (!valor?.trim()) return "";
  const numero = Number(valor.trim().replace(",", "."));
  const talla = String(numero).replace(".", ",");
  return TALLAS_EU.includes(talla) ? talla : "";
}

/** Solo lo que puede verse en la ficha: una fila disponible por tienda. */
export function construirDatosMiTalla(zapatillas: Pick<Zapatilla, "id" | "links_compra">[]): DatosMiTalla {
  const datos: DatosMiTalla = {};
  for (const z of zapatillas) {
    const tiendas = unaFilaPorTienda(z.links_compra.filter((l) => l.disponible)).flatMap((l) => {
      const tallas = (l.tallas ?? []).filter((t) => Number.isFinite(valorTalla(t)));
      return tallas.length ? [{ tienda: NOMBRES[l.tienda] ?? l.tienda, tallas }] : [];
    });
    if (tiendas.length) datos[z.id] = tiendas;
  }
  return datos;
}

export function estadoMiTalla(tiendas: TallasTienda[] | undefined, talla: string): { confirmada: boolean; texto: string } {
  const elegida = normalizarMiTalla(talla);
  if (!elegida) return { confirmada: false, texto: "" };
  const medidas = (tiendas ?? []).filter((t) => t.tallas.some((s) => Number.isFinite(valorTalla(s))));
  if (!medidas.length) return { confirmada: false, texto: "" };
  // No redondeamos tercios a medias tallas: una aproximacion no confirma stock.
  const disponibles = medidas.filter((t) => t.tallas.some((s) => Math.abs(valorTalla(s) - valorTalla(elegida)) < 1e-6));
  return disponibles.length
    ? { confirmada: true, texto: `Tu talla en ${[...new Set(disponibles.map((t) => t.tienda))].join(" · ")}` }
    : { confirmada: false, texto: `Sin tu talla en ${[...new Set(medidas.map((t) => t.tienda))].join(" · ")}` };
}
