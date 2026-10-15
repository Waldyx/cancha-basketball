// Plantillas clásicas de la pizarra. Se construyen con las mismas operaciones que
// usa el editor (cada paso nuevo parte de donde acabó el anterior, según las líneas
// de movimiento), así que lo que se ve al abrirlas es exactamente lo que se animará.
// Coordenadas canónicas en metros: x a lo largo (canasta en x = 1,575) e y a lo ancho.

import {
  avanzarPiezas,
  nuevaJugada,
  type Categoria,
  type Jugada,
  type Linea,
  type Paso,
  type Pieza,
  type Texto,
  type TipoLinea,
  type TipoPieza,
} from "./pizarra";

type XY = [number, number];

const pz = (id: string, tipo: TipoPieza, etiqueta: string, x: number, y: number): Pieza => ({ id, tipo, etiqueta, x, y });

let n = 0;
const ln = (tipo: TipoLinea, ref: string | undefined, a: XY, b: XY, o: { mid?: XY; fin?: string } = {}): Linea => {
  n++;
  const l: Linea = { id: `l${n}`, tipo, pts: [{ x: a[0], y: a[1] }, { x: b[0], y: b[1] }] };
  if (ref) l.ref = ref;
  if (o.fin) l.fin = o.fin;
  if (o.mid) l.mid = { x: o.mid[0], y: o.mid[1] };
  return l;
};

const tx = (x: number, y: number, texto: string): Texto => {
  n++;
  return { id: `t${n}`, x, y, texto, tam: 1 };
};

const paso = (piezas: Pieza[], lineas: Linea[], nota: string, textos: Texto[] = []): Paso => ({ piezas, lineas, textos, nota });

/** Paso siguiente: parte de donde acaban las líneas del anterior y aplica ajustes manuales. */
const sig = (prev: Paso, lineas: Linea[], nota: string, mueve: Record<string, XY> = {}, textos: Texto[] = []): Paso => {
  const piezas = avanzarPiezas(prev).map((p) => (mueve[p.id] ? { ...p, x: mueve[p.id][0], y: mueve[p.id][1] } : p));
  return paso(piezas, lineas, nota, textos);
};

export interface Plantilla {
  id: string;
  nombre: string;
  categoria: Categoria;
  descripcion: string;
  crear: () => Jugada;
}

function pickAndRoll(): Jugada {
  const p1 = paso(
    [
      pz("a1", "atq", "1", 9.4, 7.5),
      pz("a2", "atq", "2", 1.4, 13.6),
      pz("a3", "atq", "3", 7.2, 2.0),
      pz("a4", "atq", "4", 1.4, 1.4),
      pz("a5", "atq", "5", 5.8, 9.95),
      pz("b", "balon", "", 9.9, 7.9),
      pz("d1", "def", "X1", 8.4, 7.5),
      pz("d2", "def", "X2", 2.5, 12.4),
      pz("d3", "def", "X3", 6.2, 3.2),
      pz("d4", "def", "X4", 2.5, 2.6),
      pz("d5", "def", "X5", 4.2, 8.2),
    ],
    [ln("bloqueo", "a5", [5.8, 9.95], [8.1, 8.3])],
    "El 5 sube a poner el bloqueo directo sobre el defensor del 1. Los otros tres abren el campo (esquinas y ala débil)."
  );
  const p2 = sig(
    p1,
    [
      ln("bote", "a1", [9.4, 7.5], [6.4, 9.3], { mid: [8.6, 9.1] }),
      ln("corte", "a5", [8.1, 8.3], [3.4, 7.3], { mid: [6.0, 8.4] }),
    ],
    "El 1 usa el bloqueo pegado al hombro del 5. El 5 rueda hacia el aro mirando al balón.",
    { d1: [7.6, 8.9], d5: [5.4, 9.0] }
  );
  const p3 = sig(
    p2,
    [
      ln("pase", "a1", [6.4, 9.3], [3.4, 7.3], { fin: "a5" }),
      ln("tiro", "a5", [3.4, 7.3], [1.9, 7.5]),
    ],
    "El 1 pasa al hombre que rueda para que finalice. Si su defensor ayuda, pase a las esquinas (2 y 4).",
    { d1: [7.2, 9.9], d5: [4.2, 8.4] },
    [tx(-0.9, 12.2, "Si hay ayuda: esquina")]
  );
  return nuevaJugada({
    id: "plantilla-pick-and-roll",
    nombre: "Pick and roll central",
    categoria: "ataque",
    notas: "Bloqueo directo en el centro de la pista con tres jugadores abriendo el campo. Lectura: tiro si el defensor del 1 pasa por detrás, pase al que rueda si hay ayuda, esquina si se queda corto.",
    cancha: "media",
    orient: "v",
    pasos: [p1, p2, p3],
  });
}

function horns(): Jugada {
  const p1 = paso(
    [
      pz("a1", "atq", "1", 9.2, 7.5),
      pz("a2", "atq", "2", 1.4, 1.4),
      pz("a3", "atq", "3", 1.4, 13.6),
      pz("a4", "atq", "4", 5.8, 5.05),
      pz("a5", "atq", "5", 5.8, 9.95),
      pz("b", "balon", "", 9.7, 7.9),
      pz("d1", "def", "X1", 8.0, 7.5),
      pz("d2", "def", "X2", 2.6, 2.6),
      pz("d3", "def", "X3", 2.6, 12.4),
      pz("d4", "def", "X4", 4.8, 5.4),
      pz("d5", "def", "X5", 4.8, 9.6),
    ],
    [ln("pase", "a1", [9.2, 7.5], [5.8, 5.05], { fin: "a4" })],
    "Formación Horns: los dos pívots en los codos de la zona, el base arriba y los aleros en las esquinas. El 1 pasa al codo."
  );
  const p2 = sig(
    p1,
    [
      ln("bloqueo", "a5", [5.8, 9.95], [7.4, 8.5]),
      ln("corte", "a1", [9.2, 7.5], [3.6, 8.6], { mid: [7.6, 9.4] }),
    ],
    "El 5 bloquea al defensor del 1, que corta pegado al bloqueo hacia el aro (curl). El 4 tiene el balón en el codo."
  );
  const p3 = sig(
    p2,
    [
      ln("pase", "a4", [5.8, 5.05], [3.6, 8.6], { fin: "a1" }),
      ln("tiro", "a1", [3.6, 8.6], [1.9, 7.6]),
    ],
    "El 4 pasa al 1 que acaba el corte. Si la defensa lo cambia, el 4 puede atacar o buscar al 5 abriendo a la línea de 3.",
    { d1: [5.4, 8.1] }
  );
  return nuevaJugada({
    id: "plantilla-horns",
    nombre: "Horns (cuernos): pase y corte",
    categoria: "ataque",
    notas: "Clásico set Horns. Primero se pasa al codo, luego el base corta usando el bloqueo del otro pívot. Tiene muchas continuaciones: pick and roll por el codo, apertura del 4 o bloqueo ciego para un alero.",
    cancha: "media",
    orient: "v",
    pasos: [p1, p2, p3],
  });
}

function saqueCaja(): Jugada {
  const p1 = paso(
    [
      pz("a1", "atq", "1", -1.0, 3.2),
      pz("a2", "atq", "2", 3.4, 5.05),
      pz("a3", "atq", "3", 3.4, 9.95),
      pz("a4", "atq", "4", 5.8, 5.05),
      pz("a5", "atq", "5", 5.8, 9.95),
      pz("b", "balon", "", -0.5, 3.6),
      pz("d1", "def", "X1", 0.9, 4.4),
      pz("d2", "def", "X2", 2.2, 5.7),
      pz("d3", "def", "X3", 2.2, 9.3),
      pz("d4", "def", "X4", 4.7, 5.8),
      pz("d5", "def", "X5", 4.7, 9.2),
    ],
    [
      ln("bloqueo", "a4", [5.8, 5.05], [4.3, 5.05]),
      ln("corte", "a2", [3.4, 5.05], [7.0, 2.4], { mid: [4.8, 3.3] }),
      ln("corte", "a3", [3.4, 9.95], [2.4, 7.9]),
    ],
    "Caja: cuatro jugadores en la zona y el 1 saca. El 4 bloquea hacia abajo para el 2, que sale al ala del lado del balón. El 3 hace un corte al poste bajo como segunda opción."
  );
  const p2 = sig(
    p1,
    [
      ln("pase", "a1", [-1.0, 3.2], [7.0, 2.4], { fin: "a2" }),
      ln("corte", "a1", [-1.0, 3.2], [1.6, 1.6]),
    ],
    "El 1 saca al 2 que llega al ala y entra en cancha para ocupar la esquina.",
    { d1: [2.4, 2.9], d2: [6.1, 3.8], d4: [4.0, 6.5] }
  );
  const p3 = sig(
    p2,
    [
      ln("pase", "a2", [7.0, 2.4], [2.4, 7.9], { fin: "a3" }),
      ln("tiro", "a3", [2.4, 7.9], [1.9, 7.5]),
    ],
    "Segunda opción: el 2 pasa al poste bajo (3) para finalizar cerca del aro. Si el saque se bloquea, el 4 abre al otro lado.",
    { d3: [3.4, 9.0] }
  );
  return nuevaJugada({
    id: "plantilla-saque-fondo-caja",
    nombre: "Saque de fondo en caja (box)",
    categoria: "saque-fondo",
    notas: "Saque de fondo contra defensa individual o zona. La caja permite bloqueos en cruz y varias opciones de pase. Recuerda: 5 segundos para sacar.",
    cancha: "media",
    orient: "v",
    pasos: [p1, p2, p3],
  });
}

function contraataque(): Jugada {
  const p1 = paso(
    [
      pz("a1", "atq", "1", 9.0, 7.5),
      pz("a2", "atq", "2", 10.5, 2.5),
      pz("a3", "atq", "3", 10.5, 12.5),
      pz("b", "balon", "", 9.6, 7.9),
      pz("d1", "def", "X1", 22.6, 6.8),
      pz("d2", "def", "X2", 24.4, 8.2),
    ],
    [
      ln("corte", "a2", [10.5, 2.5], [19.5, 2.8]),
      ln("bote", "a1", [9.0, 7.5], [18.0, 7.5]),
      ln("corte", "a3", [10.5, 12.5], [19.5, 12.2]),
    ],
    "3 contra 2 en línea: el base lleva el balón por el centro y los dos aleros corren los carriles abiertos, a la altura del balón o ligeramente por delante.",
    [tx(14, 10.4, "carril central")]
  );
  const p2 = sig(
    p1,
    [
      ln("pase", "a1", [18.0, 7.5], [19.5, 12.2], { fin: "a3" }),
      ln("corte", "a2", [19.5, 2.8], [24.0, 4.0]),
    ],
    "Lectura del defensor alto: si sale al balón, el balón va al lado libre. El 1 pasa al 3 mientras el 2 se mete hacia el aro por el lado contrario.",
    { d1: [21.4, 7.2], d2: [24.2, 7.6] }
  );
  const p3 = sig(
    p2,
    [
      ln("pase", "a3", [19.5, 12.2], [24.0, 4.0], { fin: "a2" }),
      ln("tiro", "a2", [24.0, 4.0], [26.1, 7.1]),
    ],
    "Cuando el defensor bajo sale a parar al 3, el 3 pasa al 2 que está libre para anotar. Dos defensores no pueden cubrir a tres.",
    { d1: [22.0, 9.8], d2: [24.2, 10.6] }
  );
  return nuevaJugada({
    id: "plantilla-contraataque-3x2",
    nombre: "Contraataque 3 contra 2 en línea",
    categoria: "contraataque",
    notas: "Tres carriles. Principios: ancho en los carriles, balón al lado libre, pasar antes de que el defensor llegue y finalizar rápido.",
    cancha: "completa",
    orient: "h",
    pasos: [p1, p2, p3],
  });
}

function zona23(): Jugada {
  const ataque = [
    pz("a1", "atq", "1", 9.6, 7.5),
    pz("a2", "atq", "2", 6.8, 2.0),
    pz("a3", "atq", "3", 6.8, 13.0),
    pz("a4", "atq", "4", 5.6, 7.5),
    pz("a5", "atq", "5", 1.8, 7.5),
    pz("b", "balon", "", 10.1, 7.9),
  ];
  const p1 = paso(
    [
      ...ataque,
      pz("d1", "def", "X1", 7.0, 5.2),
      pz("d2", "def", "X2", 7.0, 9.8),
      pz("d3", "def", "X3", 3.8, 3.0),
      pz("d4", "def", "X4", 3.0, 7.5),
      pz("d5", "def", "X5", 3.8, 12.0),
    ],
    [],
    "Zona 2-3 frente a un ataque 1-3-1: dos defensores arriba, tres abajo (los de las alas de la zona y el central cerca del aro). Con el balón arriba, formación equilibrada."
  );
  const p2 = sig(
    p1,
    [
      ln("pase", "a1", [9.6, 7.5], [6.8, 13.0], { fin: "a3" }),
      ln("corte", "d2", [7.0, 9.8], [7.9, 11.9]),
      ln("corte", "d1", [7.0, 5.2], [7.0, 8.0]),
      ln("corte", "d4", [3.0, 7.5], [3.2, 9.6]),
      ln("corte", "d5", [3.8, 12.0], [2.2, 13.0]),
      ln("corte", "d3", [3.8, 3.0], [3.2, 5.8]),
    ],
    "El balón va al ala derecha y la zona se desplaza: el guardia de ese lado (X2) sale a presionar, X1 cierra el centro, X4 se mueve hacia el balón, X5 baja a la esquina y X3 cierra la zona por el lado débil."
  );
  const p3 = sig(
    p2,
    [
      ln("pase", "a3", [6.8, 13.0], [9.6, 7.5], { fin: "a1" }),
      ln("corte", "d2", [7.9, 11.9], [7.0, 9.8]),
      ln("corte", "d1", [7.0, 8.0], [7.0, 5.2]),
      ln("corte", "d4", [3.2, 9.6], [3.0, 7.5]),
      ln("corte", "d5", [2.2, 13.0], [3.8, 12.0]),
      ln("corte", "d3", [3.2, 5.8], [3.8, 3.0]),
    ],
    "El balón vuelve arriba: toda la defensa recupera su posición de partida. El objetivo es mover el balón más rápido que los pies de la defensa."
  );
  return nuevaJugada({
    id: "plantilla-zona-2-3",
    nombre: "Defensa en zona 2-3",
    categoria: "defensa",
    notas: "Zona 2-3 clásica. Normas: comunicar, saltar al balón, no dejar tirar libre desde el ala y cerrar el rebote por el lado del balón.",
    cancha: "media",
    orient: "v",
    pasos: [p1, p2, p3],
  });
}

export const PLANTILLAS: Plantilla[] = [
  { id: "plantilla-pick-and-roll", nombre: "Pick and roll central", categoria: "ataque", descripcion: "Bloqueo directo con apertura de campo · 3 pasos", crear: pickAndRoll },
  { id: "plantilla-horns", nombre: "Horns (cuernos)", categoria: "ataque", descripcion: "Pase al codo y corte con bloqueo · 3 pasos", crear: horns },
  { id: "plantilla-saque-fondo-caja", nombre: "Saque de fondo en caja", categoria: "saque-fondo", descripcion: "Box con bloqueos hacia abajo · 3 pasos", crear: saqueCaja },
  { id: "plantilla-contraataque-3x2", nombre: "Contraataque 3 contra 2", categoria: "contraataque", descripcion: "Pista completa, tres carriles · 3 pasos", crear: contraataque },
  { id: "plantilla-zona-2-3", nombre: "Defensa en zona 2-3", categoria: "defensa", descripcion: "Desplazamientos ante el pase al ala · 3 pasos", crear: zona23 },
];
