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

export interface SesionPorEdadCreada {
  sesion: Sesion;
  jugadas: Jugada[];
}

/** Crea una copia editable y las jugadas que necesita; no toca el almacenamiento. */
export function crearSesionPorEdad(id: string): SesionPorEdadCreada | null {
  const plantilla = SESIONES_POR_EDAD.find((x) => x.id === id);
  if (!plantilla) return null;
  const usaPistaMini = plantilla.id === "premini" || plantilla.id === "mini";

  let sesion = nuevaSesion({ titulo: plantilla.titulo, objetivo: plantilla.objetivo });
  const jugadas: Jugada[] = [];

  for (const bloque of plantilla.bloques) {
    if (bloque.tipo === "texto") {
      sesion = anadirBloqueTexto(sesion, bloque.titulo, bloque.minutos);
    } else {
      const ejercicio = PLANTILLAS_EJERCICIOS.find((x) => x.id === bloque.ejercicioId)?.crear();
      if (!ejercicio) continue;
      if (usaPistaMini) ejercicio.pista = "mini";
      jugadas.push(ejercicio);
      sesion = anadirBloqueJugada(sesion, ejercicio, bloque.minutos);
    }
    const ultimo = sesion.bloques.at(-1);
    if (ultimo) {
      ultimo.notas = bloque.notas ?? "";
      ultimo.material = bloque.material ?? "";
    }
  }

  return { sesion, jugadas };
}

export const minutosSesionPorEdad = (id: string): number => {
  const creada = crearSesionPorEdad(id);
  return creada ? totalMinutos(creada.sesion) : 0;
};
