// Sesión generada con IA: convierte el plan que devuelve /api/sesion (ya validado en el
// servidor) en una sesión de la pizarra, y decide el respaldo sin IA cuando la IA no responde.
// Lógica pura, sin DOM ni red: se prueba en Node.

import { type Jugada } from "./pizarra";
import { PLANTILLAS_EJERCICIOS } from "./pizarraPlantillas";
import { LIMITES_SESION, anadirBloqueJugada, anadirBloqueTexto, nuevaSesion, type Sesion } from "./pizarraSesion";
import { type ObjetivoSesion } from "./pizarraSesionesEdad";

/** Lo que devuelve /api/sesion en `plan` (ver `normalizarPlan` en api/sesion.ts). */
export interface PlanIA {
  titulo: string;
  objetivo: string;
  bloques: { titulo: string; minutos: number; ejercicio: string | null; notas: string; material: string }[];
}

export const PETICION_MAX = 400;

const txt = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/**
 * Lee la respuesta de la API sin fiarse de ella del todo (es red): devuelve el plan o null.
 * El servidor ya valida, esto solo evita que una respuesta rara rompa la pizarra.
 */
export function leerPlanIA(raw: unknown): PlanIA | null {
  const p = (raw as { plan?: unknown } | null)?.plan as Record<string, unknown> | undefined;
  if (!p || !Array.isArray(p.bloques)) return null;
  const bloques = p.bloques
    .filter((b): b is Record<string, unknown> => !!b && typeof b === "object")
    .map((b) => ({
      titulo: txt(b.titulo, LIMITES_SESION.TITULO),
      minutos: Math.round(Number(b.minutos)),
      ejercicio: typeof b.ejercicio === "string" ? b.ejercicio : null,
      notas: txt(b.notas, LIMITES_SESION.NOTAS),
      material: txt(b.material, LIMITES_SESION.MATERIAL),
    }))
    .filter((b) => b.titulo && Number.isFinite(b.minutos) && b.minutos >= LIMITES_SESION.MIN_BLOQUE && b.minutos <= LIMITES_SESION.MAX_BLOQUE);
  if (bloques.length < 3) return null;
  return { titulo: txt(p.titulo, LIMITES_SESION.TITULO) || "Sesión generada", objetivo: txt(p.objetivo, LIMITES_SESION.OBJETIVO), bloques };
}

/** Crea la sesión editable y las jugadas (ejercicios dibujados) que necesita. No guarda nada. */
export function crearSesionDesdePlan(plan: PlanIA, opciones: { pistaMini?: boolean; nota?: string } = {}): { sesion: Sesion; jugadas: Jugada[] } {
  const objetivo = [plan.objetivo, opciones.nota ?? ""].filter(Boolean).join(" ").slice(0, LIMITES_SESION.OBJETIVO);
  let sesion = nuevaSesion({ titulo: plan.titulo, objetivo });
  const jugadas: Jugada[] = [];
  for (const b of plan.bloques) {
    const ejercicio = b.ejercicio ? PLANTILLAS_EJERCICIOS.find((x) => x.id === b.ejercicio)?.crear() : undefined;
    if (ejercicio) {
      if (opciones.pistaMini) ejercicio.pista = "mini";
      jugadas.push(ejercicio);
      sesion = anadirBloqueJugada(sesion, ejercicio, b.minutos);
    } else {
      sesion = anadirBloqueTexto(sesion, b.titulo, b.minutos);
    }
    const ultimo = sesion.bloques.at(-1);
    if (ultimo) {
      ultimo.titulo = b.titulo;
      ultimo.notas = b.notas;
      ultimo.material = b.material;
    }
  }
  return { sesion, jugadas };
}

/**
 * Para el respaldo sin IA: si el entrenador dejó el objetivo en "General" pero escribió de qué
 * va la sesión, se intenta deducir el foco de sus palabras. Ante la duda, "general".
 */
export function objetivoDeTexto(texto: string): ObjetivoSesion {
  const t = texto.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const puntos: Record<Exclude<ObjetivoSesion, "general">, number> = {
    tiro: (t.match(/\b(tiro|tirar|lanzamiento|triple|bandeja|finaliza|encestar|tiros libres)/g) ?? []).length,
    defensa: (t.match(/\b(defens|defender|ayuda|rotacion|cierre|closeout|presion|zona)/g) ?? []).length,
    transicion: (t.match(/\b(transicion|contraataque|contragolpe|correr|carril|superioridad|3c2|2c1|balance)/g) ?? []).length,
  };
  const [mejor, n] = (Object.entries(puntos) as [ObjetivoSesion, number][]).sort((a, b) => b[1] - a[1])[0];
  const empatados = Object.values(puntos).filter((x) => x === n).length;
  return n > 0 && empatados === 1 ? mejor : "general";
}
