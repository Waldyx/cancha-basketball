// Plantillas clásicas de la pizarra. Se construyen con las mismas operaciones que
// usa el editor (cada paso nuevo parte de donde acabó el anterior, según las líneas
// de movimiento), así que lo que se ve al abrirlas es exactamente lo que se animará.
// Coordenadas canónicas en metros: x a lo largo (canasta en x = 1,575) e y a lo ancho.

import {
  avanzarPiezas,
  clonar,
  nuevaJugada,
  type Bando,
  type Categoria,
  type FormaZona,
  type Jugada,
  type Linea,
  type Paso,
  type Pieza,
  type Texto,
  type TipoLinea,
  type TipoPieza,
  type Zona,
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

const paso = (piezas: Pieza[], lineas: Linea[], nota: string, textos: Texto[] = [], zonas: Zona[] = []): Paso => ({ piezas, lineas, textos, nota, zonas });

/** Paso siguiente: parte de donde acaban las líneas del anterior y aplica ajustes manuales. */
const sig = (prev: Paso, lineas: Linea[], nota: string, mueve: Record<string, XY> = {}, textos: Texto[] = []): Paso => {
  const piezas = avanzarPiezas(prev).map((p) => (mueve[p.id] ? { ...p, x: mueve[p.id][0], y: mueve[p.id][1] } : p));
  return paso(piezas, lineas, nota, textos, clonar(prev.zonas ?? []));
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
    "El balón va al ala izquierda del ataque y la zona se desplaza: el guardia de ese lado (X2) sale a presionar, X1 cierra el centro, X4 se mueve hacia el balón, X5 baja a la esquina y X3 cierra la zona por el lado débil."
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

// ─── ejercicios de entrenamiento ────────────────────────────────────────
// Categoría "ejercicio". Misma regla que arriba: los pasos siguientes parten de donde
// acaban las líneas de movimiento, y lo que no se mueve por línea (la rotación, que es
// "después va a…") se recoloca a mano con `mueve`. Cada ejercicio lleva en `notas` cómo se
// hace y qué se corrige, y en cada paso lo que pasa en ese momento.

const ARO: XY = [1.575, 7.5];
const hacia = (de: XY, a: XY) => Math.round((((Math.atan2(a[1] - de[1], a[0] - de[0]) * 180) / Math.PI) % 360) + 360) % 360;
/** Fila de `cant` jugadores con la cabeza en (x,y) mirando hacia `mira`; el resto queda detrás. */
const fila = (id: string, x: number, y: number, cant: number, bando: Bando, mira: XY): Pieza => ({ id, tipo: "fila", etiqueta: "", x, y, cant, ang: hacia([x, y], mira), bando });
const zn = (forma: FormaZona, x: number, y: number, w: number, h: number): Zona => {
  n++;
  return { id: `z${n}`, forma, x, y, w, h };
};
const entrenador = (x: number, y: number): Pieza => pz("e", "ent", "E", x, y);

function ruedaBandejas(): Jugada {
  const p1 = paso(
    [
      pz("a1", "atq", "1", 6.6, 3.8),
      pz("a2", "atq", "2", 6.6, 11.2),
      fila("fl", 8.2, 2.8, 3, "atq", ARO),
      fila("fr", 8.2, 12.2, 3, "atq", ARO),
      pz("b", "balon", "", 7.1, 4.2),
      entrenador(11.5, 7.5),
    ],
    [
      ln("bote", "a1", [6.6, 3.8], [3.4, 5.6], { mid: [5.2, 4.3] }),
      ln("tiro", "a1", [3.4, 5.6], [1.9, 7.1]),
      ln("corte", "a2", [6.6, 11.2], [2.6, 8.7], { mid: [4.7, 10.2] }),
    ],
    "Dos filas en las alas, mirando a canasta. Una fila lleva los balones (con el 1) y la otra no (2). El primero de cada fila sale a la vez."
  );
  const p2 = sig(
    p1,
    [
      ln("pase", "a2", [2.6, 8.7], [7.8, 3.4]),
      ln("rotacion", "a1", [3.4, 5.6], [7.4, 11.8], { mid: [5.9, 9.4] }),
      ln("rotacion", "a2", [2.6, 8.7], [9.8, 1.8], { mid: [6.4, 4.6] }),
    ],
    "El del balón bota y termina con bandeja. El otro rebota y pasa a la fila de los balones. Después, cada uno cambia de fila (líneas finas).",
    { b: [3.1, 9.1] }
  );
  const p3 = sig(
    p2,
    [
      ln("bote", "a2", [7.0, 11.4], [3.4, 9.4], { mid: [5.2, 10.8] }),
      ln("tiro", "a2", [3.4, 9.4], [1.9, 7.9]),
      ln("corte", "a1", [6.6, 4.0], [2.6, 6.3], { mid: [4.7, 4.9] }),
    ],
    "Ahora por el otro lado: la fila que antes rebotaba lleva el balón y la otra rebota. Se alternan los dos lados sin parar.",
    { a1: [6.6, 4.0], a2: [7.0, 11.4], b: [7.5, 11.8] }
  );
  return nuevaJugada({
    id: "ejercicio-rueda-bandejas",
    nombre: "Rueda de bandejas por los dos lados",
    categoria: "ejercicio",
    notas:
      "Cómo se hace: dos filas en las alas. Bote, dos pasos y bandeja; el compañero de la otra fila rebota y pasa. Se cambia de fila y se alterna el lado cada repetición. Dura 5-6 minutos.\nQué se corrige: bote con la mano contraria a la defensa, salto con la pierna contraria a la mano que tira, mirar al aro antes del segundo apoyo y rebote con las dos manos.",
    cancha: "media",
    orient: "v",
    pasos: [p1, p2, p3],
  });
}

function tresHombres(): Jugada {
  const X = [3, 8, 13, 18, 23];
  const L = 3.2;
  const C = 7.5;
  const R = 11.8;
  // quién está en cada carril: el central lleva el balón y pasa al ala del lado contrario al último pase
  let carril: Record<string, number> = { a1: C, a2: L, a3: R };
  const pasos: Paso[] = [];
  let prev: Paso = paso(
    [pz("a1", "atq", "1", X[0], C), pz("a2", "atq", "2", X[0], L), pz("a3", "atq", "3", X[0], R), pz("b", "balon", "", X[0] + 0.5, C + 0.4)],
    [],
    "Tres carriles: 1 en el centro con balón, 2 y 3 en los carriles laterales. Avanzan sin botar: solo pasan y corren."
  );
  pasos.push(prev);
  let ladoPase = L;
  const notas = [
    "El 1 pasa al 2 y corre por detrás de él hasta su carril. El 2 pasa a ocupar el centro con el balón.",
    "Ahora el 2 pasa al 3 (lado contrario) y corre por detrás. Siempre se pasa al ala opuesta al último pase.",
    "El 3 pasa al 1, que ocupa el primer carril lateral, y rodea por detrás.",
    "Último pase: quien recibe en el centro llega al aro sin botar de más y termina con bandeja.",
  ];
  for (let s = 0; s < 4; s++) {
    const centro = Object.keys(carril).find((id) => carril[id] === C)!;
    const ala = Object.keys(carril).find((id) => carril[id] === ladoPase)!;
    const otra = Object.keys(carril).find((id) => id !== centro && id !== ala)!;
    const x0 = X[s];
    const x1 = X[s + 1];
    prev.lineas = [
      ln("pase", centro, [x0, C], [x0, ladoPase], { fin: ala }),
      ln("corte", centro, [x0, C], [x1, ladoPase], { mid: [(x0 + x1) / 2 - 0.7, (C + ladoPase) / 2] }),
      ln("corte", ala, [x0, ladoPase], [x1, C]),
      ln("corte", otra, [x0, carril[otra]], [x1, carril[otra]]),
    ];
    const siguiente = sig(prev, [], notas[s], { b: [x1 + 0.5, C + 0.4] });
    pasos.push(siguiente);
    carril = { ...carril, [centro]: ladoPase, [ala]: C };
    ladoPase = ladoPase === L ? R : L;
    prev = siguiente;
  }
  const portador = Object.keys(carril).find((id) => carril[id] === C)!;
  prev.lineas = [ln("bote", portador, [X[4], C], [25.0, C]), ln("tiro", portador, [25.0, C], [26.1, C])];
  return nuevaJugada({
    id: "ejercicio-tres-hombres",
    nombre: "3 hombres (trenza) en pista completa",
    categoria: "ejercicio",
    notas:
      "Cómo se hace: tres jugadores avanzan por tres carriles pasándose el balón sin botar. El que pasa corre por detrás del receptor y ocupa su carril. Se acaba con una bandeja; los tres vuelven por el otro lado.\nQué se corrige: pasar y correr a la vez, cabeza alta, pases a la mano de dentro y a la altura del pecho, mantener la anchura de los carriles y llegar al aro sin parar.",
    cancha: "completa",
    orient: "h",
    pasos,
  });
}

function tresDos(): Jugada {
  const p1 = paso(
    [
      pz("a1", "atq", "1", 9.0, 7.5),
      pz("a2", "atq", "2", 9.6, 3.0),
      pz("a3", "atq", "3", 9.6, 12.0),
      pz("b", "balon", "", 9.5, 7.9),
      pz("d1", "def", "X1", 19.6, 6.6),
      pz("d2", "def", "X2", 23.2, 8.4),
    ],
    [
      ln("bote", "a1", [9.0, 7.5], [16.0, 7.5]),
      ln("corte", "a2", [9.6, 3.0], [17.0, 3.4]),
      ln("corte", "a3", [9.6, 12.0], [17.0, 11.6]),
    ],
    "3 contra 2: los tres atacan hacia la canasta del fondo, anchos en los carriles. Defienden dos, uno arriba y otro abajo."
  );
  const p2 = sig(
    p1,
    [ln("pase", "a1", [16.0, 7.5], [17.0, 11.6], { fin: "a3" }), ln("corte", "a2", [17.0, 3.4], [22.2, 4.8])],
    "El defensor alto (X1) sale a parar al balón: el 1 pasa al lado libre (3). El 2 corta hacia el aro.",
    { d1: [18.4, 8.4], d2: [22.6, 7.6] }
  );
  const p3 = sig(
    p2,
    [ln("pase", "a3", [17.0, 11.6], [22.2, 4.8], { fin: "a2" }), ln("tiro", "a2", [22.2, 4.8], [26.0, 7.0])],
    "El 3 pasa al 2, libre cerca del aro, y este finaliza. Dos defensores no pueden con tres atacantes.",
    { d1: [19.2, 10.2], d2: [23.4, 9.6] }
  );
  const p4 = sig(
    p3,
    [
      ln("pase", "d2", [24.4, 9.2], [22.4, 6.4], { fin: "d1" }),
      ln("corte", "d1", [22.4, 6.4], [13.0, 6.6]),
      ln("corte", "d2", [24.4, 9.2], [15.0, 9.6], { mid: [20.0, 10.2] }),
    ],
    "Tras el tiro, los dos defensores recuperan el rebote y se convierten en atacantes hacia la otra canasta. El 1 corre a defender solo: 2 contra 1.",
    { d1: [22.4, 6.4], d2: [24.4, 9.2], b: [24.9, 9.6], a1: [14.6, 7.5] }
  );
  const p5 = sig(
    p4,
    [ln("bote", "d1", [13.0, 6.6], [6.6, 6.4]), ln("pase", "d1", [6.6, 6.4], [6.4, 10.4], { fin: "d2" }), ln("tiro", "d2", [6.4, 10.4], [1.9, 7.9])],
    "2 contra 1: el que lleva el balón ataca al defensor solo y pasa a su compañero libre cuando este sale a parar. Luego se repite en el otro sentido.",
    { a1: [8.4, 7.2], b: [13.5, 7.0] }
  );
  return nuevaJugada({
    id: "ejercicio-3c2-2c1",
    nombre: "3 contra 2 y 2 contra 1 continuo",
    categoria: "ejercicio",
    notas:
      "Cómo se hace: 3 atacantes contra 2 defensores hacia un aro. Cuando acaba la jugada, los dos defensores atacan hacia el otro aro contra el atacante que corre a defender. Quien tira sale; entran otros tres y se encadena.\nQué se corrige: abrir los carriles, pasar al lado libre antes de que llegue la ayuda, parar la bola con el cuerpo y comunicar en defensa (balón y ayuda), y correr la vuelta a defender.",
    cancha: "completa",
    orient: "h",
    pasos: [p1, p2, p3, p4, p5],
  });
}

function mikan(): Jugada {
  const zona = zn("rect", 2.5, 7.5, 3.4, 5.4);
  const p1 = paso(
    [pz("a1", "atq", "1", 2.6, 6.0), pz("b", "balon", "", 3.1, 6.4), fila("f", 6.6, 11.6, 3, "atq", ARO), entrenador(6.4, 3.0)],
    [ln("tiro", "a1", [2.6, 6.0], [1.9, 7.0])],
    "El jugador empieza a un lado del aro, dentro de la zona sombreada. Bandeja con la mano del lado, sin botar.",
    [],
    [zona]
  );
  const p2 = sig(
    p1,
    [ln("corte", "a1", [2.6, 6.0], [2.6, 9.0], { mid: [3.6, 7.5] })],
    "Recoge el balón antes de que toque el suelo y pasa por debajo del aro al otro lado (línea continua).",
    { b: [3.1, 6.4] }
  );
  const p3 = sig(
    p2,
    [ln("tiro", "a1", [2.6, 9.0], [1.9, 8.0]), ln("corte", "a1", [2.6, 9.0], [2.6, 6.0], { mid: [3.6, 7.5] })],
    "Termina con la otra mano desde el otro lado y vuelve a cambiar. Se encadenan 10 bandejas seguidas; luego entra el siguiente de la fila.",
    { b: [3.1, 9.4] }
  );
  return nuevaJugada({
    id: "ejercicio-mikan",
    nombre: "Mikan (bandejas bajo el aro)",
    categoria: "ejercicio",
    notas:
      "Cómo se hace: bajo el aro, bandeja con la mano derecha desde un lado y con la izquierda desde el otro, recogiendo el balón sin que bote. 10 seguidas y se rota con la fila.\nQué se corrige: mantener el balón alto con las dos manos, tablero con suavidad, pie de salto contrario a la mano y no perseguir la bola: pasar por debajo del aro con pasos cortos.",
    cancha: "media",
    orient: "v",
    pasos: [p1, p2, p3],
  });
}

function unoUnoCierre(): Jugada {
  const p1 = paso(
    [
      pz("a1", "atq", "1", 6.6, 2.8),
      pz("b", "balon", "", 7.1, 3.2),
      pz("d1", "def", "X1", 2.8, 7.5),
      fila("fa", 8.2, 3.6, 3, "atq", ARO),
      fila("fd", 3.2, 11.8, 3, "def", ARO),
      entrenador(10.5, 7.5),
    ],
    [ln("corte", "d1", [2.8, 7.5], [5.2, 4.0], { mid: [3.6, 5.4] })],
    "1 contra 1 desde el ala. El defensor empieza tocando la zona bajo el aro y sale corriendo hacia el atacante, que espera con el balón."
  );
  const p2 = sig(
    p1,
    [ln("bote", "a1", [6.6, 2.8], [3.4, 6.2], { mid: [5.2, 3.8] }), ln("tiro", "a1", [3.4, 6.2], [1.9, 7.2])],
    "El defensor llega con pasos cortos, manos arriba y el cuerpo entre el atacante y el aro. En cuanto frena, el atacante ataca el aro.",
    { d1: [5.2, 4.0] }
  );
  const p3 = sig(
    p2,
    [ln("corte", "d1", [5.0, 4.6], [3.6, 6.8], { mid: [4.3, 5.6] })],
    "El defensor se recoloca entre el atacante y el aro y le obliga a ir hacia la línea de fondo. Quien acaba la jugada sale y entra la pareja siguiente.",
    { d1: [5.0, 4.6] }
  );
  return nuevaJugada({
    id: "ejercicio-1c1-cierre",
    nombre: "1 contra 1 con salida del defensor desde el aro",
    categoria: "ejercicio",
    notas:
      "Cómo se hace: el atacante recibe en el ala con balón; el defensor sale desde el aro (toca línea de fondo o aro) y cierra. 1 contra 1 hasta canasta o rebote; se rota atacante a defensor.\nQué se corrige: aproximación en carrera con pasos finales cortos (no pasarse), manos arriba al llegar, pies fuera de la línea de bote, y cerrar la línea de fondo.",
    cancha: "media",
    orient: "v",
    pasos: [p1, p2, p3],
  });
}

function tiroEstrella(): Jugada {
  const spots: XY[] = [[2.4, 1.2], [6.6, 2.2], [9.0, 7.5], [6.6, 12.8], [2.4, 13.8]];
  const letras = ["A", "B", "C", "D", "E"];
  const p1 = paso(
    [...spots.map((s, i) => pz(`n${i}`, "neu", letras[i], s[0], s[1])), ...spots.map((s, i) => pz(`b${i}`, "balon", "", s[0] + 0.5, s[1] + 0.4)), entrenador(5.4, 7.5)],
    // cada flecha acaba en un punto distinto del aro, mirando al tirador, para que no se amontonen
    spots.map((s, i) => {
      const d = Math.hypot(s[0] - ARO[0], s[1] - ARO[1]);
      return ln("tiro", `n${i}`, s, [ARO[0] + ((s[0] - ARO[0]) / d) * 0.9, ARO[1] + ((s[1] - ARO[1]) / d) * 0.9]);
    }),
    "Cinco puestos alrededor del arco (esquina, ala, centro, ala, esquina), un jugador con balón en cada uno. Todos tiran a la vez."
  );
  const rot: Record<string, XY> = {};
  spots.forEach((_, i) => {
    const s5 = spots[(i + 1) % 5];
    rot[`n${i}`] = [s5[0], s5[1]];
    rot[`b${i}`] = [s5[0] + 0.5, s5[1] + 0.4];
  });
  const p2 = sig(
    p1,
    spots.map((s, i) => ln("rotacion", `n${i}`, s, spots[(i + 1) % 5])),
    "Cada uno rebota su tiro, recoge el balón y rota al puesto siguiente (líneas finas): A→B→C→D→E→A."
  );
  const p3 = sig(p2, [], "Cinco tiros seguidos en cada puesto; se cuentan los aciertos. Cuando se rota toda la estrella, se cambia la distancia.", rot);
  return nuevaJugada({
    id: "ejercicio-tiro-estrella",
    nombre: "Tiro en estrella",
    categoria: "ejercicio",
    notas:
      "Cómo se hace: cinco jugadores, uno en cada puesto de tiro, todos con balón. Tiran, rebotean su tiro y rotan al puesto siguiente. Se cuentan aciertos en 3 minutos.\nQué se corrige: pies orientados al aro, codo bajo la pelota y seguimiento largo, equilibrio antes de tirar y rebote a dos manos.",
    cancha: "media",
    orient: "v",
    pasos: [p1, p2, p3],
  });
}

function tiroReboteYPase(): Jugada {
  const p1 = paso(
    [
      pz("a1", "atq", "1", 6.6, 12.4),
      pz("b", "balon", "", 7.1, 12.8),
      pz("r", "neu", "R", 2.8, 7.5),
      fila("f", 8.2, 13.6, 4, "atq", ARO),
      entrenador(9.6, 4.0),
    ],
    [ln("tiro", "a1", [6.6, 12.4], [1.9, 7.6])],
    "El primero de la fila (1) tira desde el ala. El jugador R espera bajo el aro para rebotear."
  );
  const p2 = sig(
    p1,
    [ln("pase", "r", [2.8, 7.5], [8.0, 13.4]), ln("corte", "a1", [6.6, 12.4], [3.2, 8.6], { mid: [5.0, 11.2] })],
    "R coge el rebote y sale con un pase al siguiente de la fila. El tirador corre a ocupar el puesto de rebotador.",
    { b: [3.3, 7.9] }
  );
  const p3 = sig(
    p2,
    [ln("rotacion", "r", [2.8, 7.5], [9.8, 13.6], { mid: [6.6, 9.6] })],
    "R pasa a ser el último de la fila. El jugador que recibió el pase se coloca en el ala y tira; la rueda no se para.",
    { r: [9.8, 13.6], a1: [2.8, 7.5], b: [3.3, 7.9] }
  );
  return nuevaJugada({
    id: "ejercicio-tiro-rebote-pase",
    nombre: "Tiro con rebote y pase",
    categoria: "ejercicio",
    notas:
      "Cómo se hace: un tirador en el ala, un reboteador bajo el aro y una fila esperando. Tiro, rebote, pase a la fila y rotación: tirador a rebotear, reboteador al final de la fila. 5 minutos por lado.\nQué se corrige: tirar con los pies listos al recibir, reboteo con las dos manos y barbilla protegida, pase de salida rápido y a la mano de fuera, y no parar la rotación.",
    cancha: "media",
    orient: "v",
    pasos: [p1, p2, p3],
  });
}

export const PLANTILLAS_EJERCICIOS: Plantilla[] = [
  { id: "ejercicio-rueda-bandejas", nombre: "Rueda de bandejas (dos lados)", categoria: "ejercicio", descripcion: "Dos filas en las alas, rebote y cambio de fila · 3 pasos", crear: ruedaBandejas },
  { id: "ejercicio-tres-hombres", nombre: "3 hombres (trenza)", categoria: "ejercicio", descripcion: "Pista completa, pase y corre por detrás · 5 pasos", crear: tresHombres },
  { id: "ejercicio-3c2-2c1", nombre: "3c2 y 2c1 continuo", categoria: "ejercicio", descripcion: "Pista completa, los defensores atacan en la vuelta · 5 pasos", crear: tresDos },
  { id: "ejercicio-mikan", nombre: "Mikan", categoria: "ejercicio", descripcion: "Bandejas alternas bajo el aro · 3 pasos", crear: mikan },
  { id: "ejercicio-1c1-cierre", nombre: "1c1 con salida desde el aro", categoria: "ejercicio", descripcion: "Cierre del defensor y ataque al aro · 3 pasos", crear: unoUnoCierre },
  { id: "ejercicio-tiro-estrella", nombre: "Tiro en estrella", categoria: "ejercicio", descripcion: "Cinco puestos y rotación · 3 pasos", crear: tiroEstrella },
  { id: "ejercicio-tiro-rebote-pase", nombre: "Tiro con rebote y pase", categoria: "ejercicio", descripcion: "Tirador, reboteador y fila en rotación · 3 pasos", crear: tiroReboteYPase },
];
