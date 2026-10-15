// Sesiones listas para usar por etapa formativa. Son una base editable, no un
// plan cerrado: el entrenador conserva los bloques, minutos y notas en su equipo.

import { type Jugada } from "./pizarra";
import { PLANTILLAS_EJERCICIOS } from "./pizarraPlantillas";
import { anadirBloqueJugada, anadirBloqueTexto, nuevaSesion, totalMinutos, type Sesion } from "./pizarraSesion";

type BloqueEdad =
  | { tipo: "texto"; titulo: string; minutos: number; notas?: string; material?: string }
  | { tipo: "ejercicio"; ejercicioId: string; minutos: number; notas?: string; material?: string };

export interface PlantillaSesionEdad {
  id: string;
  etapa: string;
  edades: string;
  titulo: string;
  objetivo: string;
  resumen: string;
  bloques: BloqueEdad[];
}

export const SESIONES_POR_EDAD: PlantillaSesionEdad[] = [
  {
    id: "premini",
    etapa: "Premini",
    edades: "6–8 años",
    titulo: "Premini · disfrutar, botar y encestar",
    objetivo: "Coordinarse con balón, mirar al aro y acabar la sesión con ganas de volver.",
    resumen: "juego motor · botes y bandejas",
    bloques: [
      { tipo: "texto", titulo: "Juego de bienvenida con balón", minutos: 10, notas: "Todos con balón: señales de colores, parar, cambiar de mano y protegerlo. Mucha actividad, pocas colas.", material: "1 balón por jugador, 6 conos" },
      { tipo: "ejercicio", ejercicioId: "ejercicio-rueda-bandejas", minutos: 12, notas: "Sin exigir el gesto completo: usar pasos naturales y celebrar cada finalización." },
      { tipo: "texto", titulo: "Circuito de bote y cambios", minutos: 12, notas: "Slalom corto, cambios de mano y parada. Hacerlo como reto, no como fila.", material: "Balones, conos" },
      { tipo: "ejercicio", ejercicioId: "ejercicio-tiro-rebote-pase", minutos: 10, notas: "Acercar los puestos de tiro. Prioridad: coger el rebote y pasar al compañero." },
      { tipo: "texto", titulo: "Partidillos 3c3", minutos: 12, notas: "Campos pequeños y cambios rápidos. Contar canastas, no sistemas." },
      { tipo: "texto", titulo: "Vuelta a la calma", minutos: 4, notas: "Una cosa que ha salido bien y despedida con balón." },
    ],
  },
  {
    id: "mini",
    etapa: "Mini",
    edades: "9–11 años",
    titulo: "Mini · pasar, correr y finalizar",
    objetivo: "Ocupar carriles, pasar antes de botar de más y defender sin hacer falta.",
    resumen: "coordinación · transición",
    bloques: [
      { tipo: "texto", titulo: "Activación con parejas", minutos: 10, notas: "Pases en movimiento, paradas y pivotes. Cambiar pareja cada poco.", material: "1 balón por pareja" },
      { tipo: "ejercicio", ejercicioId: "ejercicio-rueda-bandejas", minutos: 12, notas: "Añadir una consigna por ronda: mano contraria, mirar al aro o parada antes de tirar." },
      { tipo: "ejercicio", ejercicioId: "ejercicio-tres-hombres", minutos: 15, notas: "Primero sin oposición. Parar si se juntan los carriles: pase y carrera, no velocidad sin control." },
      { tipo: "ejercicio", ejercicioId: "ejercicio-1c1-cierre", minutos: 12, notas: "El atacante tiene dos botes como máximo; el defensor aprende a frenar antes de llegar." },
      { tipo: "texto", titulo: "Partidillos 3c3 con regla", minutos: 20, notas: "Punto extra si todos tocan balón antes de tirar. Rotaciones cada 3 minutos." },
      { tipo: "texto", titulo: "Vuelta a la calma", minutos: 6, notas: "Respiración corta y una corrección colectiva." },
    ],
  },
  {
    id: "infantil",
    etapa: "Infantil",
    edades: "12–13 años",
    titulo: "Infantil · transición y decisiones",
    objetivo: "Tomar ventaja en transición, leer al defensor y comunicar en la vuelta defensiva.",
    resumen: "toma de decisiones · 3c2",
    bloques: [
      { tipo: "texto", titulo: "Activación y movilidad", minutos: 10, notas: "Movilidad dinámica y pases con cambios de dirección.", material: "Balones, conos, petos" },
      { tipo: "ejercicio", ejercicioId: "ejercicio-tres-hombres", minutos: 12, notas: "Exigir pase adelantado y llegada a los tres carriles." },
      { tipo: "ejercicio", ejercicioId: "ejercicio-3c2-2c1", minutos: 18, notas: "Pausar para preguntar dónde estaba la ventaja. Cambiar los tríos con frecuencia." },
      { tipo: "ejercicio", ejercicioId: "ejercicio-1c1-cierre", minutos: 15, notas: "Corregir ángulo de cierre y primera ayuda, no solo el robo." },
      { tipo: "ejercicio", ejercicioId: "ejercicio-tiro-rebote-pase", minutos: 12, notas: "Tiro tras recepción: pies listos y pase de salida tras el rebote." },
      { tipo: "texto", titulo: "5c5 · transición y balance", minutos: 18, notas: "Cada pérdida obliga a dos jugadores a balance defensivo. Parar y corregir la primera decisión." },
      { tipo: "texto", titulo: "Vuelta a la calma", minutos: 5, notas: "Revisar qué decisión generó más ventajas." },
    ],
  },
  {
    id: "cadete",
    etapa: "Cadete",
    edades: "14–15 años",
    titulo: "Cadete · atacar ventajas y cerrar",
    objetivo: "Convertir una ventaja numérica en tiro claro y sostener la intensidad defensiva.",
    resumen: "intensidad · finalizaciones",
    bloques: [
      { tipo: "texto", titulo: "Activación competitiva", minutos: 10, notas: "Movilidad, desplazamientos defensivos y pases a máxima velocidad.", material: "Balones, conos, petos" },
      { tipo: "ejercicio", ejercicioId: "ejercicio-3c2-2c1", minutos: 18, notas: "Criterio: pase al lado libre antes de que llegue la segunda ayuda." },
      { tipo: "ejercicio", ejercicioId: "ejercicio-1c1-cierre", minutos: 15, notas: "Añadir segundo esfuerzo: cierre, contención y rebote." },
      { tipo: "ejercicio", ejercicioId: "ejercicio-tiro-estrella", minutos: 15, notas: "Competición por equipos. Contar solo tiros con pies orientados y recepción preparada." },
      { tipo: "ejercicio", ejercicioId: "ejercicio-tiro-rebote-pase", minutos: 12, notas: "Exigir pase de salida rápido y comunicación del rebote." },
      { tipo: "texto", titulo: "5c5 condicionado", minutos: 20, notas: "Máximo dos botes en campo ofensivo durante 3 minutos; después libre para transferir." },
      { tipo: "texto", titulo: "Vuelta a la calma", minutos: 5, notas: "Elegir una mejora individual para el próximo entrenamiento." },
    ],
  },
  {
    id: "junior-senior",
    etapa: "Júnior / Sénior",
    edades: "16+ años",
    titulo: "Júnior/Sénior · ritmo, ventaja y ejecución",
    objetivo: "Ejecutar a ritmo de partido, decidir bajo presión y trasladarlo al 5c5.",
    resumen: "ritmo de partido · ejecución",
    bloques: [
      { tipo: "texto", titulo: "Activación con balón y movilidad", minutos: 12, notas: "Movilidad específica, finalizaciones y pases a velocidad de partido.", material: "Balones, conos, petos" },
      { tipo: "ejercicio", ejercicioId: "ejercicio-3c2-2c1", minutos: 18, notas: "Registrar pérdidas y decisiones tardías; repetir las situaciones que fallen." },
      { tipo: "ejercicio", ejercicioId: "ejercicio-1c1-cierre", minutos: 15, notas: "Trabajo de primera contención, ayuda y recuperación al tirador." },
      { tipo: "ejercicio", ejercicioId: "ejercicio-tiro-estrella", minutos: 15, notas: "Series cortas con objetivo de acierto. Parar para corregir solo entre series." },
      { tipo: "texto", titulo: "5c5 · situación de partido", minutos: 30, notas: "Marcar contexto: marcador, tiempo, bonus y objetivo táctico. Jugar posesiones cortas y evaluar decisiones." },
      { tipo: "texto", titulo: "Tiros libres y cierre", minutos: 10, notas: "Rutina individual y breve revisión de la sesión." },
      { tipo: "texto", titulo: "Vuelta a la calma", minutos: 5, notas: "Recoger carga percibida y recordar la siguiente tarea." },
    ],
  },
];

// ─── objetivo, duración y jugadores ──────────────────────────────────────
// La plantilla de cada etapa no cambia: el foco y la organización se DEDUCEN de cada bloque
// (por el ejercicio o por el título del bloque de texto), así no hay que mantener dos tablas.

export type Foco = "tiro" | "defensa" | "transicion";
export type ObjetivoSesion = "general" | Foco;

export const OBJETIVOS_SESION: { id: ObjetivoSesion; nombre: string }[] = [
  { id: "general", nombre: "General" },
  { id: "tiro", nombre: "Tiro y finalización" },
  { id: "defensa", nombre: "Defensa" },
  { id: "transicion", nombre: "Transición" },
];

/** Duraciones que se ofrecen además de la propia de cada etapa. */
export const DURACIONES_SESION = [45, 60, 75, 90, 105, 120] as const;
export const JUGADORES_MIN = 4;
export const JUGADORES_MAX = 24;
/** Peso extra de los bloques del foco elegido al repartir los minutos. */
const PESO_FOCO = 1.6;
const MIN_POR_BLOQUE = 3;

type Organizacion =
  | { t: "grupos"; tam: number; uno: string; varios: string }
  | { t: "canasta"; max: number; que: string }
  | { t: "partido"; formato: number };

const POR_EJERCICIO: Record<string, { foco?: Foco; org: Organizacion }> = {
  "ejercicio-rueda-bandejas": { foco: "tiro", org: { t: "canasta", max: 10, que: "dos filas" } },
  "ejercicio-tiro-rebote-pase": { foco: "tiro", org: { t: "grupos", tam: 3, uno: "trío", varios: "tríos" } },
  "ejercicio-tiro-estrella": { foco: "tiro", org: { t: "canasta", max: 7, que: "cinco puestos" } },
  "ejercicio-tres-hombres": { foco: "transicion", org: { t: "grupos", tam: 3, uno: "trío", varios: "tríos" } },
  "ejercicio-3c2-2c1": { foco: "transicion", org: { t: "grupos", tam: 5, uno: "grupo de 5", varios: "grupos de 5" } },
  "ejercicio-1c1-cierre": { foco: "defensa", org: { t: "grupos", tam: 2, uno: "pareja", varios: "parejas" } },
};

function rasgos(b: BloqueEdad): { foco?: Foco; org?: Organizacion } {
  if (b.tipo === "ejercicio") return POR_EJERCICIO[b.ejercicioId] ?? {};
  const t = b.titulo.toLowerCase();
  const partido = /(\d)c\1/.exec(t);
  return {
    foco: /transici/.test(t) ? "transicion" : /tiro/.test(t) ? "tiro" : undefined,
    org: partido ? { t: "partido", formato: Number(partido[1]) } : undefined,
  };
}

/** Objetivos que tienen algún bloque en esa etapa ("general" siempre). */
export function objetivosDisponibles(id: string): ObjetivoSesion[] {
  const p = SESIONES_POR_EDAD.find((x) => x.id === id);
  if (!p) return [];
  const focos = new Set(p.bloques.map((b) => rasgos(b).foco).filter(Boolean));
  return OBJETIVOS_SESION.map((o) => o.id).filter((o) => o === "general" || focos.has(o));
}

/**
 * Reparte `total` minutos en proporción a `pesos`, con un mínimo por bloque y suma EXACTA:
 * se redondea y la diferencia se compensa en los bloques más largos.
 */
export function repartirMinutos(pesos: number[], total: number, minimo = MIN_POR_BLOQUE): number[] {
  if (!pesos.length) return [];
  const suma = pesos.reduce((a, b) => a + b, 0) || 1;
  const out = pesos.map((p) => Math.max(minimo, Math.round((p / suma) * total)));
  let diff = total - out.reduce((a, b) => a + b, 0);
  const orden = out.map((_, i) => i).sort((a, b) => out[b] - out[a]);
  for (let k = 0; diff !== 0 && k < orden.length * 60; k++) {
    const i = orden[k % orden.length];
    if (diff > 0) {
      out[i]++;
      diff--;
    } else if (out[i] > minimo) {
      out[i]--;
      diff++;
    }
  }
  return out;
}

const plural = (n: number, uno: string, varios: string) => `${n} ${n === 1 ? uno : varios}`;

/** Cómo organizar a `n` jugadores en un bloque (texto corto para las notas). */
export function organizacion(org: Organizacion, n: number): string {
  if (org.t === "grupos") {
    const g = Math.floor(n / org.tam);
    const resto = n - g * org.tam;
    if (g === 0) return `Con ${n} jugadores no llega para ${org.varios}: hacedlo todos juntos.`;
    // si sobran al menos medio grupo, se forma uno más pequeño en vez de tenerlos esperando
    if (org.tam >= 3 && resto * 2 >= org.tam) return `${n} jugadores: ${g + 1} ${org.varios}, uno de ellos con ${resto}.`;
    return `${n} jugadores: ${plural(g, org.uno, org.varios)}` + (resto ? ` y ${plural(resto, "jugador entra", "jugadores entran")} rotando.` : ".");
  }
  if (org.t === "canasta") {
    const c = Math.max(1, Math.ceil(n / org.max));
    return `${n} jugadores: ${plural(c, "canasta", "canastas")} con ${org.que}` + (c > 1 ? `, unos ${Math.ceil(n / c)} por canasta.` : ".");
  }
  const f = org.formato;
  if (n >= 2 * f) {
    const partidos = Math.floor(n / (2 * f));
    const fuera = n - partidos * 2 * f;
    return `${n} jugadores: ${plural(partidos, "partido", "partidos")} ${f}c${f}` + (fuera ? `; ${plural(fuera, "espera", "esperan")} y entran cada 3 min.` : ".");
  }
  const g = Math.max(1, Math.floor(n / 2));
  return `Con ${n} jugadores no llega para ${f}c${f}: jugad ${g}c${g}` + (n % 2 ? " y uno rota en cada canasta." : ".");
}

export interface OpcionesSesionEdad {
  objetivo?: ObjetivoSesion;
  /** Minutos totales; sin indicar = los de la etapa. */
  duracion?: number;
  /** Jugadores disponibles; sin indicar = sin nota de organización. */
  jugadores?: number;
}

export interface SesionPorEdadCreada {
  sesion: Sesion;
  jugadas: Jugada[];
  /** false si el objetivo pedido no tiene bloques en esa etapa (la sesión sale equilibrada). */
  objetivoAplicado: boolean;
}

/** Crea una copia editable y las jugadas que necesita; no toca el almacenamiento. */
export function crearSesionPorEdad(id: string, opciones: OpcionesSesionEdad = {}): SesionPorEdadCreada | null {
  const plantilla = SESIONES_POR_EDAD.find((x) => x.id === id);
  if (!plantilla) return null;
  const usaPistaMini = plantilla.id === "premini" || plantilla.id === "mini";

  const objetivo = opciones.objetivo ?? "general";
  const objetivoAplicado = objetivo === "general" || objetivosDisponibles(id).includes(objetivo);
  const base = plantilla.bloques.reduce((a, b) => a + b.minutos, 0);
  const total = opciones.duracion && opciones.duracion > 0 ? Math.round(opciones.duracion) : base;
  const conFoco = objetivoAplicado && objetivo !== "general";
  const pesos = plantilla.bloques.map((b) => b.minutos * (conFoco && rasgos(b).foco === objetivo ? PESO_FOCO : 1));
  const minutos = repartirMinutos(pesos, total);
  const n = opciones.jugadores && opciones.jugadores > 0 ? Math.round(opciones.jugadores) : 0;

  const nombreObj = OBJETIVOS_SESION.find((o) => o.id === objetivo)?.nombre ?? "";
  const extra = [conFoco ? `Énfasis: ${nombreObj.toLowerCase()}.` : "", n ? `Planificada para ${n} jugadores.` : ""]
    .filter(Boolean)
    .join(" ");
  let sesion = nuevaSesion({ titulo: plantilla.titulo, objetivo: extra ? `${plantilla.objetivo} ${extra}` : plantilla.objetivo });
  const jugadas: Jugada[] = [];

  plantilla.bloques.forEach((bloque, i) => {
    if (bloque.tipo === "texto") {
      sesion = anadirBloqueTexto(sesion, bloque.titulo, minutos[i]);
    } else {
      const ejercicio = PLANTILLAS_EJERCICIOS.find((x) => x.id === bloque.ejercicioId)?.crear();
      if (!ejercicio) return;
      if (usaPistaMini) ejercicio.pista = "mini";
      jugadas.push(ejercicio);
      sesion = anadirBloqueJugada(sesion, ejercicio, minutos[i]);
    }
    const ultimo = sesion.bloques.at(-1);
    if (ultimo) {
      const org = rasgos(bloque).org;
      const nota = n && org ? `Organización: ${organizacion(org, n)}` : "";
      ultimo.notas = [nota, bloque.notas ?? ""].filter(Boolean).join("\n");
      ultimo.material = bloque.material ?? "";
    }
  });

  return { sesion, jugadas, objetivoAplicado };
}

export const minutosSesionPorEdad = (id: string, opciones: OpcionesSesionEdad = {}): number => {
  const creada = crearSesionPorEdad(id, opciones);
  return creada ? totalMinutos(creada.sesion) : 0;
};
