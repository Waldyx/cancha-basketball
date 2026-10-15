// Nombres de los jugadores en la pizarra a partir del modo Equipo de /estadisticas
// (localStorage `cz.team.v1`, formato de `statsEquipo.ts`). Lógica pura: el texto de
// localStorage se lee con `normalizarStore`, que valida y limpia todo.

import { LIMITES, clonar, limpiaTexto, todosLosPasos, type Jugada } from "./pizarra";
import { normDorsal, normalizarStore } from "./statsEquipo";

export const CLAVE_EQUIPO = "cz.team.v1";

export interface EquipoParaPizarra {
  id: string;
  nombre: string;
  categoria: string;
  jugadores: { dorsal: string; nombre: string }[];
}

/** Equipos con plantilla utilizable (jugadores con dorsal y nombre). Nunca lanza. */
export function equiposDeTexto(raw: string | null): EquipoParaPizarra[] {
  if (!raw) return [];
  let st;
  try {
    st = normalizarStore(JSON.parse(raw));
  } catch {
    return [];
  }
  return st.equipos
    .map((e) => ({
      id: e.id,
      nombre: e.nombre,
      categoria: e.categoria,
      jugadores: e.jugadores.filter((j) => normDorsal(j.dorsal) !== "" && j.nombre.trim() !== "").map((j) => ({ dorsal: normDorsal(j.dorsal), nombre: j.nombre.trim() })),
    }))
    .filter((e) => e.jugadores.length > 0);
}

/**
 * Nombre que cabe en el círculo (12 letras): el primer nombre; si dos jugadores comparten primer
 * nombre se añade la inicial del primer apellido ("Pablo G."), y si aun así no cabe se recorta.
 */
export function nombreCorto(completo: string, todos: string[]): string {
  const partes = completo.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "";
  const primero = partes[0];
  const repetido = todos.filter((t) => (t.trim().split(/\s+/)[0] ?? "").toLowerCase() === primero.toLowerCase()).length > 1;
  const base = repetido && partes.length > 1 ? `${primero} ${partes[1][0].toUpperCase()}.` : primero;
  return limpiaTexto(base, LIMITES.NOMBRE_JUGADOR);
}

/** dorsal -> nombre corto (el primero gana si un dorsal está repetido). */
export function mapaNombres(eq: EquipoParaPizarra): Map<string, string> {
  const todos = eq.jugadores.map((j) => j.nombre);
  const m = new Map<string, string>();
  for (const j of eq.jugadores) if (!m.has(j.dorsal)) m.set(j.dorsal, nombreCorto(j.nombre, todos));
  return m;
}

/**
 * Pone el nombre a los atacantes cuyo número coincide con un dorsal de la plantilla, en todos los
 * pasos y lecturas (la identidad de la pieza es la misma). Los defensores son el rival y no se tocan.
 */
export function asignarNombres(j: Jugada, mapa: Map<string, string>): { jugada: Jugada; asignados: number; sinNombre: string[] } {
  const out = clonar(j);
  const vistos = new Set<string>();
  const sinNombre = new Set<string>();
  for (const s of todosLosPasos(out)) {
    for (const p of s.piezas) {
      if (p.tipo !== "atq") continue;
      const d = normDorsal(p.etiqueta);
      const n = d ? mapa.get(d) : undefined;
      if (n) {
        p.nombre = n;
        vistos.add(p.id);
      } else if (p.etiqueta) sinNombre.add(p.etiqueta);
    }
  }
  return { jugada: out, asignados: vistos.size, sinNombre: [...sinNombre] };
}

export function quitarNombres(j: Jugada): { jugada: Jugada; quitados: number } {
  const out = clonar(j);
  const ids = new Set<string>();
  for (const s of todosLosPasos(out)) {
    for (const p of s.piezas) {
      if (p.nombre) {
        ids.add(p.id);
        delete p.nombre;
      }
    }
  }
  return { jugada: out, quitados: ids.size };
}
