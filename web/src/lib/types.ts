// ─────────────────────────────────────────────────────────
// Tipos del dominio: perfiles de jugador
// ─────────────────────────────────────────────────────────

export type Posicion = "base" | "escolta" | "alero" | "ala-pivot" | "pivot";

export type Estilo = "explosivo" | "equilibrado" | "potente" | "tirador";

export type Lesion = "rodillas" | "tobillos" | "fascia";

export type PesoJugador = "menos-70" | "70-85" | "85-100" | "mas-100";

export type Cancha = "interior" | "exterior" | "mixto";

export type Prioridad =
  | "proteccion"
  | "reactividad"
  | "soporte-tobillo"
  | "durabilidad"
  | "precio";

export type AnchoPie = "normal" | "ancho" | "no-se";

export type Uso = "competicion" | "entrenamiento" | "ambos";

// ─────────────────────────────────────────────────────────
// Tipos del dominio: zapatillas
// ─────────────────────────────────────────────────────────

export type Genero = "unisex" | "women" | "gs";

export type Altura = "low" | "mid" | "high";

export type Horma = "estrecha" | "normal" | "ancha";

export type CategoriaPrincipal =
  | "cushion-focused"
  | "responsive"
  | "balanced"
  | "traction-king";

export type TipoCierre = "cordones" | "strap" | "lace-lock" | "boa";

export type MaterialSuperior =
  | "mesh"
  | "leather"
  | "knit"
  | "mesh+tpu"
  | "synthetic"
  | "mesh+synthetic"
  | "mesh+leather"
  | "leather+synthetic"
  | "synthetic+tpu";

export type Tienda =
  | "amazon_es"
  | "decathlon"
  | "nike_es"
  | "adidas_es"
  | "puma_es"
  | "ua_es"
  | "nb_es"
  | "reebok_es"
  | "footlocker_es"
  | "jd_sports_es"
  | "zalando_es"
  | "sprinter_es"
  | "basket_world"
  | "aliexpress"
  | "kickscrew"
  | "basket4ballers_es"
  | "manelsanchez_es"
  | "fuikaomar_es"
  | "24segons_es"
  | "idealo_es"
  | "snipes_eu"
  | "atmosfera_sport"
  | "joom"
  | "basketballemotion_es"
  | "forumsport_es"
  | "sizeofficial_es"
  | "elcorteingles_es"
  | "footdistrict_es"
  | "converse_es"
  | "miinto_es"
  | "moolahkicks"
  // Tienda OFICIAL de 361 Degrees. Vende en EUR y envía a España, pero DESDE FUERA DE
  // LA UE y sin IOSS: el IVA y la gestión aduanera los paga el comprador al recibir.
  // Por eso sus enlaces llevan `nota`. Alta el 21-sep-2026.
  | "361sport";

export type FuenteReview =
  | "weartesters"
  | "hoops-geek"
  | "runrepeat-lab"
  | "schwollo"
  | "evaluacion-propia";

// ─────────────────────────────────────────────────────────
// Subestructuras
// ─────────────────────────────────────────────────────────

export interface Puntuaciones {
  /** Agarre en pista (1-10). Mayor = más grip. */
  traccion: number;
  /** Protección de impactos (1-10). Mayor = más cushion. */
  amortiguacion: number;
  /** Sensación reactiva / court feel (1-10). Mayor = más respuesta. */
  respuesta: number;
  /** Contención lateral del pie (1-10). */
  soporte_lateral: number;
  /** Base ancha, sin tambaleo (1-10). */
  estabilidad: number;
  /** Inverso del peso (1-10). Mayor = más ligera. */
  peso_score: number;
  /** Resistencia en asfalto/exterior (1-10). */
  durabilidad_outdoor: number;
  /** Transpiración (1-10). */
  ventilacion: number;
}

export interface IdealPara {
  posiciones: Posicion[];
  /** Tupla [min, max] en kg. */
  peso_jugador_kg: [number, number];
  estilos: Estilo[];
  lesiones_compatibles?: Lesion[];
}

export interface NoRecomendadaPara {
  posiciones?: Posicion[];
  estilos?: Estilo[];
  lesiones?: Lesion[];
}

export interface Fuente {
  tipo: FuenteReview;
  url?: string;
  score_original?: number | string;
  datos?: string;
  fecha?: string;
}

export interface LinkCompra {
  tienda: Tienda;
  url: string;
  /** Precio actual en EUR. */
  precio_actual: number;
  disponible: boolean;
  /** Si es un link de afiliado. Si false, se muestra igualmente (principio editorial). */
  tiene_afiliado: boolean;
  /** Fecha ISO (YYYY-MM-DD) de la última verificación manual del precio. */
  ultima_verificacion: string;
  /**
   * Aviso corto que se pinta bajo el nombre de la tienda en el bloque de compra.
   * Para lo que el precio NO dice: costes que el comprador paga aparte (IVA de
   * importación), o una salvedad de la oferta. Se usa poco a propósito — si cada
   * fila lleva una nota, dejan de leerse.
   */
  nota?: string;
}

// ─────────────────────────────────────────────────────────
// Entidad principal: Zapatilla
// ─────────────────────────────────────────────────────────

export interface Zapatilla {
  // Identidad
  id: string;
  slug: string;
  marca: string;
  modelo: string;
  generacion?: number;
  año_lanzamiento: number;
  genero: Genero;
  signature_player?: string;
  tecnologia_clave: string[];
  predecesor_id?: string | null;
  sucesor_id?: string | null;

  // Datos físicos medidos
  /** Peso real en gramos, medido en talla US 9 (estándar WT/RunRepeat). */
  peso_real_g: number;
  altura: Altura;
  horma: Horma;
  drop_mm: number;
  tipo_cierre?: TipoCierre;
  material_superior?: MaterialSuperior;

  // Scoring y categorización
  puntuaciones: Puntuaciones;
  categoria_principal: CategoriaPrincipal;
  tags: string[];

  // Recomendación
  ideal_para: IdealPara;
  no_recomendada_para: NoRecomendadaPara;

  // Editorial
  resumen: string;
  pros: string[];
  contras: string[];
  veredicto: string;

  // Multimedia
  imagen_principal: string;
  imagenes: string[];
  video_review_url?: string;

  // Trazabilidad (transparencia editorial)
  fuentes: Fuente[];
  /** Fecha ISO (YYYY-MM-DD). */
  ultima_actualizacion: string;

  // Retro / histórica
  /** Si true: excluida del quiz, badge "Retro" en catálogo. */
  es_retro?: boolean;
  /** Si true: aún sin lanzar. Se oculta de catálogo/rankings y la ficha muestra "Próximamente" en vez de nota. */
  proximamente?: boolean;

  /**
   * Si true: la zapa NO aparece en NINGÚN listado del sitio (catálogo, rankings,
   * quiz, home, comparador, buscador, índice del chat ni sitemap), pero su ficha
   * sigue respondiendo 200 con `noindex`.
   *
   * Se pone cuando no se puede comprar por un enlace de afiliado: recomendar una
   * zapa que no nos paga y que además el usuario no puede comprar bien no sirve a
   * nadie. NO es una retirada: el dato se conserva entero para rescatarla el día
   * que vuelva a haber una opción de compra, y `audit-enlaces.ts` avisa de las que
   * ya se pueden rescatar.
   *
   * Excepción decidida por el usuario (22-sep-2026): las más buscadas/con más hype
   * se quedan visibles con el enlace a la tienda oficial de la marca aunque no haya
   * afiliado.
   */
  oculto?: boolean;

  // Precios
  precio_msrp_eur: number;
  links_compra: LinkCompra[];
}

// ─────────────────────────────────────────────────────────
// Respuestas del quiz
// ─────────────────────────────────────────────────────────

export interface RespuestasQuiz {
  posicion: Posicion;
  peso: PesoJugador;
  estilo: Estilo;
  cancha: Cancha;
  lesiones: Lesion[]; // multi-select; vacío = ninguna
  prioridad: Prioridad;
  presupuesto_max_eur: number | null; // null = sin tope
  ancho_pie?: AnchoPie;
  perfil?: "hombre" | "mujer" | "junior";
  uso?: Uso;
}

// ─────────────────────────────────────────────────────────
// Resultado del motor de recomendación
// ─────────────────────────────────────────────────────────

export interface Recomendacion {
  zapatilla: Zapatilla;
  /** 0-100, porcentaje de match calculado por el motor. */
  match_pct: number;
  /** Frases humanas explicando por qué encaja con el perfil. */
  razones: string[];
  /** Tienda con el precio actual más bajo. */
  mejor_precio?: LinkCompra;
}
