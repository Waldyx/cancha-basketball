import type { Page } from "playwright";

export interface ShoeRef {
  id: string;
  marca: string;
  modelo: string;
}

export interface ScrapeResult {
  tienda: string;
  url: string; // puede ser la URL directa encontrada (upgrade desde search)
  precio_actual: number;
  disponible: boolean;
  ultima_verificacion: string;
  /**
   * La tienda CONFIRMA que no hay stock (la página lo dice). Distinto de un fallo
   * de scraping: este sí se guarda en precios.json y apaga el enlace en el merge.
   */
  agotado?: boolean;
}

export interface StoreScraper {
  tienda: string;
  scrape(page: Page, url: string, shoe: ShoeRef): Promise<ScrapeResult>;
}
