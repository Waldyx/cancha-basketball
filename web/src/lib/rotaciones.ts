// Control de minutos y períodos (/minutos): normas de participación obligatoria del
// baloncesto base, validación en directo y propuesta de rotación que las cumple.
// Lógica pura, sin DOM. Los nombres de los jugadores nunca salen del navegador.
//
// Marca por jugador y período:
//   "I" = sale de INICIO en ese período (cuenta como período "des del començament").
//   "E" = ENTRA con el período empezado (solo cuenta como participación).

export type Marca = "" | "I" | "E";

export interface ReglaParticipacion {
  id: string;
  nombre: string;
  categorias: string;
  periodos: number;
  /** Jugadores en pista al empezar cada período. */
  enPista: number;
  /** Mínimo de períodos saliendo de inicio dentro de 1..inicioHasta. */
  minInicios: number;
  inicioHasta: number;
  /** Máximo de períodos jugados (de inicio o entrando) dentro de 1..maxHasta. */
  maxParticipaciones: number;
  maxHasta: number;
  /** FCBQ mini: con 12 jugadores, uno puede salir de inicio por 3.ª vez en el 8.º período. */
  excepcionDoce?: boolean;
  fuente?: string;
  fuenteUrl?: string;
  nota: string;
}

const FUENTE_FCBQ = "FCBQ · Resum de reglaments (Comunicat 1-1415). Comprueba la normativa vigente de tu competición.";
const URL_FCBQ = "https://s3-eu-west-1.amazonaws.com/producciofcbq/recursos/documents/noticies/47090e0757bd91e3.pdf";

export const REGLAS: ReglaParticipacion[] = [
  {
    id: "fcbq-mini",
    nombre: "Cataluña · Minibàsquet",
    categorias: "Premini y mini · 8 períodos de 6'",
    periodos: 8,
    enPista: 5,
    minInicios: 3,
    inicioHasta: 7,
    maxParticipaciones: 5,
    maxHasta: 8,
    excepcionDoce: true,
    fuente: FUENTE_FCBQ,
    fuenteUrl: URL_FCBQ,
    nota: "Cada jugador sale de inicio en 3 períodos como mínimo antes del 7.º (incluido) y juega 5 como máximo (con unos segundos ya cuenta). Con 12 jugadores, uno puede hacer su 3.er período en el 8.º, sin ser sustituido. Excepciones: lesión, descalificación o 5 faltas.",
  },
  {
    id: "fcbq-passarela",
    nombre: "Cataluña · Passarel·la",
    categorias: "Preinfantil e infantil · 8 períodos de 5'",
    periodos: 8,
    enPista: 5,
    minInicios: 2,
    inicioHasta: 6,
    maxParticipaciones: 4,
    maxHasta: 6,
    fuente: FUENTE_FCBQ,
    fuenteUrl: URL_FCBQ,
    nota: "En los 6 primeros períodos, cada jugador sale de inicio en 2 como mínimo y juega 4 como máximo (con unos segundos ya cuenta). El 7.º y el 8.º son libres. Excepciones: lesión, descalificación o 5 faltas.",
  },
];

export const LIMITES_ROTACION = { JUGADORES: 15, PERIODOS_MIN: 2, PERIODOS_MAX: 10, NOMBRE: 30 } as const;

/** Regla propia del entrenador (otra federación o un amistoso). Se ajusta a valores coherentes. */
export function reglaPersonalizada(p: Partial<Pick<ReglaParticipacion, "periodos" | "enPista" | "minInicios" | "inicioHasta" | "maxParticipaciones" | "maxHasta">>): ReglaParticipacion {
  const ent = (v: unknown, min: number, max: number, def: number) =>
    typeof v === "number" && Number.isFinite(v) ? Math.min(max, Math.max(min, Math.round(v))) : def;
  const periodos = ent(p.periodos, LIMITES_ROTACION.PERIODOS_MIN, LIMITES_ROTACION.PERIODOS_MAX, 4);
  const inicioHasta = ent(p.inicioHasta, 1, periodos, periodos);
  const maxHasta = ent(p.maxHasta, 1, periodos, periodos);
  return {
    id: "personalizada",
    nombre: "Personalizada",
    categorias: `${periodos} períodos`,
    periodos,
    enPista: ent(p.enPista, 3, 5, 5),
    minInicios: ent(p.minInicios, 0, inicioHasta, 1),
    inicioHasta,
    maxParticipaciones: ent(p.maxParticipaciones, 1, maxHasta, maxHasta),
    maxHasta,
    nota: "Regla definida por ti. Comprueba que coincide con la de tu competición.",
  };
}

export interface Jugador {
  id: string;
  nombre: string;
}

export type Marcas = Record<string, Marca[]>;

export type EstadoJugador = "ok" | "pendiente" | "tope" | "incumple";

export interface InformeJugador {
  id: string;
  inicios: number;
  participaciones: number;
  faltan: number;
  estado: EstadoJugador;
  mensaje: string;
}

export interface InformePeriodo {
  periodo: number;
  inicio: number;
  ok: boolean;
}

export interface Informe {
  jugadores: InformeJugador[];
  periodos: InformePeriodo[];
  /** Avisos generales: plantilla corta o larga para la regla. */
  avisos: string[];
}

const fila = (m: Marcas, id: string, n: number): Marca[] => Array.from({ length: n }, (_, i) => m[id]?.[i] ?? "");

/** ¿Se puede cumplir la regla con n jugadores? Devuelve el motivo si no. */
export function viabilidad(r: ReglaParticipacion, n: number): string | null {
  if (n < r.enPista) return `Con ${n} jugadores no salen ${r.enPista} en pista.`;
  const huecosMax = r.maxHasta * r.enPista;
  if (n * r.maxParticipaciones < huecosMax)
    return `Con ${n} jugadores no se puede respetar el máximo de ${r.maxParticipaciones} períodos: hacen falta al menos ${Math.ceil(huecosMax / r.maxParticipaciones)}.`;
  const huecosInicio = r.inicioHasta * r.enPista + (r.excepcionDoce && n === 12 ? 1 : 0);
  if (n * r.minInicios > huecosInicio) return `Con ${n} jugadores no caben ${r.minInicios} inicios por jugador antes del período ${r.inicioHasta + 1}.`;
  return null;
}

export function evaluar(r: ReglaParticipacion, jugadores: Jugador[], marcas: Marcas): Informe {
  const n = jugadores.length;
  const filas = jugadores.map((j) => fila(marcas, j.id, r.periodos));
  // la excepción de los 12: un único jugador puede apoyarse en un inicio en el último período
  let excepcionUsada = false;

  const informes = jugadores.map((j, k) => {
    const f = filas[k];
    let inicios = f.slice(0, r.inicioHasta).filter((x) => x === "I").length;
    const participaciones = f.slice(0, r.maxHasta).filter((x) => x === "I" || x === "E").length;
    if (r.excepcionDoce && n === 12 && !excepcionUsada && inicios === r.minInicios - 1 && f[r.periodos - 1] === "I") {
      inicios++;
      excepcionUsada = true;
    }
    const faltan = Math.max(0, r.minInicios - inicios);
    // períodos donde aún podría salir de inicio: los que no tiene marcados dentro del plazo
    const libresInicio = f.slice(0, r.inicioHasta).filter((x) => x === "").length + (r.excepcionDoce && n === 12 && !excepcionUsada && f[r.periodos - 1] === "" ? 1 : 0);
    const margen = r.maxParticipaciones - participaciones;

    let estado: EstadoJugador = "ok";
    let mensaje = "Cumple";
    if (participaciones > r.maxParticipaciones) {
      estado = "incumple";
      mensaje = `Lleva ${participaciones} períodos: el máximo es ${r.maxParticipaciones}`;
    } else if (faltan > Math.min(libresInicio, margen)) {
      estado = "incumple";
      mensaje = `Ya no llega a ${r.minInicios} inicios antes del ${r.inicioHasta + 1}.º`;
    } else if (faltan > 0) {
      estado = "pendiente";
      mensaje = `Le ${faltan === 1 ? "falta 1 inicio" : `faltan ${faltan} inicios`} antes del ${r.inicioHasta + 1}.º`;
    } else if (participaciones === r.maxParticipaciones) {
      estado = "tope";
      mensaje = r.maxHasta === r.periodos ? "En el máximo: ya no puede jugar más" : `En el máximo hasta el ${r.maxHasta}.º`;
    }
    return { id: j.id, inicios, participaciones, faltan, estado, mensaje };
  });

  const periodos = Array.from({ length: r.periodos }, (_, p) => {
    const inicio = filas.filter((f) => f[p] === "I").length;
    return { periodo: p + 1, inicio, ok: inicio === r.enPista };
  });

  const avisos: string[] = [];
  const v = viabilidad(r, n);
  if (n && v) avisos.push(v);
  return { jugadores: informes, periodos, avisos };
}

/**
 * Propone quién sale de inicio en cada período cumpliendo la regla (todo con "I": en el
 * baloncesto base el que sale de inicio suele jugar el período entero). Reparto equilibrado:
 * primero los que más inicios necesitan, luego los que menos han jugado.
 */
export function proponerRotacion(r: ReglaParticipacion, jugadores: Jugador[]): Marcas {
  const n = jugadores.length;
  const marcas: Marcas = Object.fromEntries(jugadores.map((j) => [j.id, Array<Marca>(r.periodos).fill("")]));
  if (n < r.enPista) return marcas;
  const inicios = Array(n).fill(0);
  const juega = Array(n).fill(0);

  for (let p = 0; p < r.periodos; p++) {
    const enPlazoInicio = p < r.inicioHasta;
    const conTope = p < r.maxHasta;
    const ultimo = p === r.periodos - 1;
    const restantesInicio = Math.max(0, r.inicioHasta - p);
    const candidatos = jugadores
      .map((_, k) => k)
      .filter((k) => !conTope || juega[k] < r.maxParticipaciones)
      .map((k) => {
        let falta = Math.max(0, r.minInicios - inicios[k]);
        if (!enPlazoInicio && !(r.excepcionDoce && n === 12 && ultimo)) falta = 0;
        // urgencia: cuánto le falta frente a los períodos que le quedan para conseguirlo
        const urgencia = enPlazoInicio ? falta / restantesInicio : falta;
        return { k, falta, urgencia };
      })
      .sort((a, b) => b.urgencia - a.urgencia || b.falta - a.falta || juega[a.k] - juega[b.k] || ((a.k - p + n) % n) - ((b.k - p + n) % n));
    for (const { k } of candidatos.slice(0, r.enPista)) {
      marcas[jugadores[k].id][p] = "I";
      juega[k]++;
      if (enPlazoInicio) inicios[k]++;
    }
  }
  return marcas;
}
