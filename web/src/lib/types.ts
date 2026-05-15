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
  | "synthetic";

export type Tienda =
  | "amazon_es"
  | "decathlon"
  | "nike_es"
  | "adidas_es"
  | "puma_es"
  | "footlocker_es"
  | "jd_sports_es"
  | "zalando_es"
  | "sprinter_es"
  | "reebok_es"
  | "basket_world"
  | "aliexpress"
  | "kickscrew";

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
