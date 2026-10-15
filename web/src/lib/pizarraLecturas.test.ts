import { describe, expect, it } from "vitest";
import {
  LIMITES,
  VERSION_FORMATO,
  ajustarOrden,
  ajustarPieza,
  anadirLinea,
  anadirPieza,
  anadirRama,
  cambiarCancha,
  clonar,
  codificarEnlace,
  decodificarEnlace,
  descompactar,
  duplicarPaso,
  duracionTotal,
  estadoEnTiempo,
  etiquetaLectura,
  insertarPaso,
  jugadaLineal,
  migrarJugada,
  normalizarJugada,
  nuevaJugada,
  numerarLineas,
  posicionesEnTransicion,
  puntoDeLectura,
  quitarNumeros,
  quitarPaso,
  quitarPieza,
  quitarRama,
  ramasEn,
  reinyectarRama,
  renombrarPieza,
  renombrarPrincipal,
  renombrarRama,
  type Jugada,
  type Paso,
} from "./pizarra";
import { ENLACE_V1_COMPRIMIDO } from "./pizarraFixtureV1";
import { PALETAS, renderTablero } from "./pizarraRender";

const paso = (extra: Partial<Paso> = {}): Paso => ({ piezas: [], lineas: [], textos: [], nota: "", zonas: [], ...extra });

/** 3 pasos, 2 atacantes y un corte en el paso 2 que mueve al 1. */
function base(): Jugada {
  const p0 = paso({
    piezas: [
      { id: "a1", tipo: "atq", etiqueta: "1", x: 8, y: 7 },
      { id: "a2", tipo: "atq", etiqueta: "2", x: 6, y: 3 },
    ],
    lineas: [{ id: "l0", tipo: "corte", ref: "a1", pts: [{ x: 8, y: 7 }, { x: 5, y: 7 }] }],
    nota: "uno",
  });
  const p1 = paso({
    piezas: [
      { id: "a1", tipo: "atq", etiqueta: "1", x: 5, y: 7 },
      { id: "a2", tipo: "atq", etiqueta: "2", x: 6, y: 3 },
    ],
    lineas: [{ id: "l1", tipo: "corte", ref: "a2", pts: [{ x: 6, y: 3 }, { x: 3, y: 3 }] }],
    nota: "dos",
  });
  const p2 = paso({
    piezas: [
      { id: "a1", tipo: "atq", etiqueta: "1", x: 5, y: 7 },
      { id: "a2", tipo: "atq", etiqueta: "2", x: 3, y: 3 },
    ],
    nota: "tres",
  });
  return nuevaJugada({ id: "j1", nombre: "Con lectura", pasos: [p0, p1, p2] });
}

function conRama(): { j: Jugada; id: string } {
  const r = anadirRama(base(), 1, "Si cambia");
  return { j: r.jugada, id: r.id };
}

describe("lecturas: crear y consultar", () => {
  it("una lectura sale de un paso y su primer paso parte de donde acaba ese paso", () => {
    const { j, id } = conRama();
    expect(j.ramas).toHaveLength(1);
    const r = j.ramas![0];
    expect(r).toMatchObject({ id, desde: 1, etiqueta: "Si cambia" });
    expect(r.pasos).toHaveLength(1);
    // el corte del 2 en el paso 2 (índice 1) lo deja en (3,3)
    expect(r.pasos[0].piezas.find((p) => p.id === "a2")).toMatchObject({ x: 3, y: 3 });
    expect(r.pasos[0].lineas).toEqual([]);
    expect(ramasEn(j, 1)).toHaveLength(1);
    expect(ramasEn(j, 0)).toHaveLength(0);
    expect(puntoDeLectura(j)).toBe(1);
    expect(puntoDeLectura(base())).toBeNull();
  });

  it("máximo 6 lecturas y no crea desde un paso que no existe", () => {
    let j = base();
    for (let i = 0; i < 9; i++) j = anadirRama(j, 0).jugada;
    expect(j.ramas).toHaveLength(LIMITES.RAMAS);
    expect(anadirRama(base(), 9).id).toBe("");
    expect(anadirRama(base(), -1).id).toBe("");
  });

  it("las etiquetas por defecto son «Opción A, B, C…» y se pueden cambiar", () => {
    let { j, id } = conRama();
    expect(etiquetaLectura(j, null)).toBe("Opción A");
    expect(etiquetaLectura(j, id)).toBe("Si cambia");
    j = renombrarRama(j, id, "");
    expect(etiquetaLectura(j, id)).toBe("Opción B");
    j = renombrarPrincipal(j, "Si pasa por detrás");
    expect(etiquetaLectura(j, null)).toBe("Si pasa por detrás");
    expect(j.pasos[1].opcion).toBe("Si pasa por detrás");
    const j2 = anadirRama(j, 1).jugada;
    expect(etiquetaLectura(j2, j2.ramas![1].id)).toBe("Opción C");
    expect(etiquetaLectura(j2, "no-existe")).toBe("Opción");
    // sin lecturas, renombrar la principal no hace nada
    expect(renombrarPrincipal(base(), "x").pasos.some((p) => p.opcion)).toBe(false);
  });

  it("las etiquetas se recortan a 40 caracteres", () => {
    const j = anadirRama(base(), 1, "E".repeat(200)).jugada;
    expect(j.ramas![0].etiqueta).toHaveLength(LIMITES.ETIQUETA_RAMA);
  });

  it("quitar la última lectura deja la jugada sin el campo", () => {
    const { j, id } = conRama();
    expect(quitarRama(j, id).ramas).toBeUndefined();
  });
});

describe("lecturas: elegir cuál se reproduce", () => {
  it("la lectura lineal es la principal hasta el punto de salida y luego los pasos de la rama", () => {
    const { j, id } = conRama();
    const l = jugadaLineal(j, id);
    expect(l.pasos).toHaveLength(3); // pasos 0 y 1 de la principal + 1 de la rama
    expect(l.pasos[0]).toBe(j.pasos[0]);
    expect(l.pasos[2]).toBe(j.ramas![0].pasos[0]);
    expect(l.ramas).toBeUndefined();
    // la principal: todos sus pasos
    expect(jugadaLineal(j, null).pasos).toHaveLength(3);
    expect(jugadaLineal(j, "no-existe").pasos).toBe(j.pasos);
  });

  it("la animación de la lectura recorre el tramo común y acaba en la rama", () => {
    let { j, id } = conRama();
    // la rama tiene 2 pasos: el 1 se queda y el 2 va a otro sitio
    const r = j.ramas![0];
    r.pasos.push(clonar(r.pasos[0]));
    r.pasos[0].lineas = [{ id: "lr", tipo: "corte", ref: "a1", pts: [{ x: 5, y: 7 }, { x: 2, y: 9 }] }];
    r.pasos[1].piezas.find((p) => p.id === "a1")!.x = 2;
    r.pasos[1].piezas.find((p) => p.id === "a1")!.y = 9;
    const l = jugadaLineal(j, id);
    expect(l.pasos).toHaveLength(4);
    const total = duracionTotal(l);
    expect(total).toBeGreaterThan(duracionTotal(jugadaLineal(j, null)) - 1);
    const fin = estadoEnTiempo(l, total + 10);
    expect(fin).toMatchObject({ k: 3, fin: true });
    // a mitad de la transición entre el paso 3 (rama, índice 2) y el 4 el 1 está entre sus dos posiciones
    const mitad = posicionesEnTransicion(l, 2, 0.5).find((p) => p.id === "a1")!;
    expect(mitad.x).toBeLessThan(5);
    expect(mitad.x).toBeGreaterThan(2);
  });
});

describe("lecturas: editar sin romper la principal", () => {
  it("reinyectar devuelve lo editado al tramo común y a la lectura, sin tocar el resto de la principal", () => {
    const { j, id } = conRama();
    const lin = clonar(jugadaLineal(j, id));
    lin.pasos[0].piezas[0].x = 9.5; // tramo común: paso 0
    lin.pasos[2].nota = "nota de la rama"; // paso propio de la lectura
    lin.nombre = "Renombrada";
    const real = reinyectarRama(j, id, lin);
    expect(real.pasos[0].piezas[0].x).toBe(9.5);
    expect(real.ramas![0].pasos[0].nota).toBe("nota de la rama");
    expect(real.nombre).toBe("Renombrada");
    // el paso 3 de la principal (continuación) sigue como estaba
    expect(real.pasos[2]).toEqual(j.pasos[2]);
    expect(real.pasos).toHaveLength(3);
    // el original no se modifica
    expect(j.pasos[0].piezas[0].x).toBe(8);
  });

  it("añadir pasos dentro de la lectura no cambia el número de pasos de la principal", () => {
    const { j, id } = conRama();
    let lin = jugadaLineal(j, id);
    lin = insertarPaso(lin, 2); // después del primer paso de la rama
    const real = reinyectarRama(j, id, lin);
    expect(real.pasos).toHaveLength(3);
    expect(real.ramas![0].pasos).toHaveLength(2);
  });

  it("la etiqueta de la lectura principal sobrevive a editar otra lectura", () => {
    let { j, id } = conRama();
    j = renombrarPrincipal(j, "Principal buena");
    const lin = clonar(jugadaLineal(j, id));
    lin.pasos[1].piezas[0].x = 4;
    const real = reinyectarRama(j, id, lin);
    expect(real.pasos[1].opcion).toBe("Principal buena");
  });
});

describe("lecturas: operaciones sobre pasos y jugadores", () => {
  it("insertar o duplicar un paso desplaza el punto de salida de las lecturas posteriores", () => {
    let { j } = conRama(); // sale del paso 1
    j = anadirRama(j, 2, "B").jugada; // sale del paso 2
    const ins = insertarPaso(j, 0); // nuevo paso en el índice 1
    expect(ins.ramas!.map((r) => r.desde)).toEqual([2, 3]);
    const dup = duplicarPaso(j, 1); // copia en el índice 2: la lectura del paso 1 se queda con el original
    expect(dup.ramas!.map((r) => r.desde)).toEqual([1, 3]);
    // insertar tras el propio punto de salida no mueve esa lectura
    expect(insertarPaso(j, 1).ramas!.map((r) => r.desde)).toEqual([1, 3]);
  });

  it("duplicar un paso con etiqueta de lectura no duplica la etiqueta", () => {
    let { j } = conRama();
    j = renombrarPrincipal(j, "Principal");
    const d = duplicarPaso(j, 1);
    expect(d.pasos[1].opcion).toBe("Principal");
    expect(d.pasos[2].opcion).toBeUndefined();
  });

  it("borrar el paso del que sale una lectura la borra; las posteriores se recolocan", () => {
    let { j } = conRama(); // desde 1
    j = anadirRama(j, 2, "B").jugada; // desde 2
    const sin1 = quitarPaso(j, 1);
    expect(sin1.ramas!.map((r) => r.desde)).toEqual([1]);
    expect(sin1.ramas![0].etiqueta).toBe("B");
    const sin2 = quitarPaso(conRama().j, 2);
    expect(sin2.ramas).toHaveLength(1);
    const sinTodas = quitarPaso(conRama().j, 1);
    expect(sinTodas.ramas).toBeUndefined();
  });

  it("un jugador nuevo aparece también en las lecturas que salen de ese paso o de uno posterior", () => {
    let { j } = conRama(); // desde 1
    const antes = anadirPieza(j, 2, "atq", { x: 4, y: 11 }); // creado en el paso 3, DESPUÉS del punto de salida
    expect(antes.jugada.ramas![0].pasos[0].piezas.some((p) => p.id === antes.id)).toBe(false);
    const alMismoTiempo = anadirPieza(j, 1, "atq", { x: 4, y: 11 }); // creado en el paso del que sale
    expect(alMismoTiempo.jugada.ramas![0].pasos[0].piezas.some((p) => p.id === alMismoTiempo.id)).toBe(true);
    const antesDelTodo = anadirPieza(j, 0, "atq", { x: 4, y: 11 });
    expect(antesDelTodo.jugada.ramas![0].pasos[0].piezas.some((p) => p.id === antesDelTodo.id)).toBe(true);
    expect(antesDelTodo.jugada.pasos.every((s) => s.piezas.some((p) => p.id === antesDelTodo.id))).toBe(true);
  });

  it("quitar un jugador lo quita también de las lecturas que salen de ese paso o posterior", () => {
    const { j } = conRama();
    const q = quitarPieza(j, 1, "a2");
    expect(q.ramas![0].pasos[0].piezas.some((p) => p.id === "a2")).toBe(false);
    expect(q.pasos[0].piezas.some((p) => p.id === "a2")).toBe(true); // antes sigue existiendo
    const q2 = quitarPieza(j, 2, "a2"); // se quita después de la salida: la lectura lo conserva
    expect(q2.ramas![0].pasos[0].piezas.some((p) => p.id === "a2")).toBe(true);
  });

  it("renombrar, ajustar y cambiar de pista llegan a todas las lecturas", () => {
    const { j } = conRama();
    const r = renombrarPieza(j, "a1", "9");
    expect(r.ramas![0].pasos[0].piezas.find((p) => p.id === "a1")!.etiqueta).toBe("9");
    const n = ajustarPieza(j, "a1", { nombre: "Marta" });
    expect(n.ramas![0].pasos[0].piezas.find((p) => p.id === "a1")!.nombre).toBe("Marta");
    const c = cambiarCancha(j, "completa");
    expect(c.cancha).toBe("completa");
    expect(c.ramas).toHaveLength(1);
  });
});

describe("lecturas: validación y enlace", () => {
  it("una jugada con lecturas pasa la validación y el enlace sin perder nada", async () => {
    let { j, id } = conRama();
    j = renombrarPrincipal(j, "Si pasa por detrás");
    j.ramas![0].pasos[0].nota = "El 2 se queda";
    const n = normalizarJugada(j)!;
    expect(n.ramas).toHaveLength(1);
    expect(n.ramas![0]).toMatchObject({ desde: 1, etiqueta: "Si cambia" });
    expect(n.pasos[1].opcion).toBe("Si pasa por detrás");
    const ida = (await decodificarEnlace(await codificarEnlace([n]))).jugadas[0];
    const sinVol = (x: Jugada) => ({
      ...x,
      id: "",
      actualizada: 0,
      ramas: x.ramas?.map((r) => ({ ...r, id: "", pasos: r.pasos.map((s) => ({ ...s, lineas: s.lineas.map((l) => ({ ...l, id: "" })) })) })),
      pasos: x.pasos.map((s) => ({ ...s, lineas: s.lineas.map((l) => ({ ...l, id: "" })) })),
    });
    expect(sinVol(ida)).toEqual(sinVol(n));
    expect(ida.ramas![0].pasos[0].nota).toBe("El 2 se queda");
    void id;
  });

  it("la validación descarta lo inválido: sin pasos, sin punto de salida, de más y de menos", () => {
    const { j } = conRama();
    const sucio = clonar(j) as unknown as Record<string, unknown>;
    const buena = j.ramas![0];
    sucio.ramas = [
      buena,
      { ...buena, id: "x1", desde: "dos", etiqueta: "sin desde" },
      { ...buena, id: "x2", pasos: [] },
      { ...buena, id: "x3", pasos: "no" },
      "basura",
      null,
      { ...buena, id: buena.id, desde: 99, etiqueta: "fuera de rango" }, // id repetido y desde fuera: se corrige
      ...Array.from({ length: 20 }, (_, i) => ({ ...buena, id: "r" + i, desde: 0 })),
    ];
    const n = normalizarJugada(sucio)!;
    expect(n.ramas!.length).toBeLessThanOrEqual(LIMITES.RAMAS);
    expect(n.ramas!.every((r) => r.desde >= 0 && r.desde <= 2)).toBe(true);
    expect(new Set(n.ramas!.map((r) => r.id)).size).toBe(n.ramas!.length);
    expect(n.ramas!.some((r) => r.etiqueta === "sin desde")).toBe(false);
  });

  it("limita los pasos de una lectura y sanea su contenido", () => {
    const { j } = conRama();
    const r = j.ramas![0];
    r.pasos = Array.from({ length: 60 }, () => clonar(r.pasos[0] ?? paso()));
    r.pasos[0].nota = "N".repeat(5000);
    (r.pasos[0] as unknown as Record<string, unknown>).opcion = "O".repeat(500);
    const n = normalizarJugada(j)!;
    expect(n.ramas![0].pasos).toHaveLength(LIMITES.PASOS_RAMA);
    expect(n.ramas![0].pasos[0].nota).toHaveLength(LIMITES.NOTA_PASO);
    expect(n.ramas![0].pasos[0].opcion).toHaveLength(LIMITES.ETIQUETA_RAMA);
  });

  it("una lectura que referencia piezas de otro paso no inventa líneas con piezas inexistentes", () => {
    const { j } = conRama();
    j.ramas![0].pasos[0].lineas = [{ id: "z", tipo: "corte", ref: "fantasma", fin: "a1", pts: [{ x: 1, y: 1 }, { x: 4, y: 4 }] }];
    const n = normalizarJugada(j)!;
    expect(n.ramas![0].pasos[0].lineas[0].ref).toBeUndefined();
    expect(n.ramas![0].pasos[0].lineas[0].fin).toBe("a1");
  });
});

describe("versión del formato y migración", () => {
  it("lo nuevo se emite como v2", () => {
    expect(VERSION_FORMATO).toBe(2);
    expect(nuevaJugada().v).toBe(2);
    expect(normalizarJugada(nuevaJugada())!.v).toBe(2);
  });

  it("una jugada v1 guardada (sin pista, zonas ni lecturas) se migra y queda igual", () => {
    const v1 = {
      v: 1,
      id: "vieja",
      nombre: "Mi jugada antigua",
      categoria: "ataque",
      notas: "n",
      cancha: "media",
      orient: "v",
      actualizada: 1700000000000,
      pasos: [
        {
          piezas: [{ id: "a1", tipo: "atq", etiqueta: "1", x: 8, y: 7 }, { id: "b", tipo: "balon", etiqueta: "", x: 8.5, y: 7.4 }],
          lineas: [{ id: "l1", tipo: "pase", pts: [{ x: 8, y: 7 }, { x: 5, y: 7 }], ref: "a1" }],
          textos: [{ id: "t1", x: 3, y: 3, texto: "Hola", tam: 2 }],
          nota: "paso uno",
        },
      ],
    };
    const m = migrarJugada(v1) as Record<string, unknown>;
    expect(m.v).toBe(2);
    expect(m.pista).toBe("fiba");
    expect(m.ramas).toEqual([]);
    expect((m.pasos as Paso[])[0].zonas).toEqual([]);
    const n = normalizarJugada(v1)!;
    expect(n).toMatchObject({ v: 2, id: "vieja", nombre: "Mi jugada antigua", cancha: "media", actualizada: 1700000000000 });
    expect(n.pista).toBeUndefined();
    expect(n.ramas).toBeUndefined();
    expect(n.pasos[0].piezas).toHaveLength(2);
    expect(n.pasos[0].lineas[0]).toMatchObject({ tipo: "pase", ref: "a1" });
    expect(n.pasos[0].textos[0].texto).toBe("Hola");
    expect(n.pasos[0].zonas).toEqual([]);
    // sin `v` (las más antiguas) también
    const { v: _v, ...sinV } = v1;
    void _v;
    expect(normalizarJugada(sinV)!.v).toBe(2);
  });

  it("la migración no cambia una jugada que ya es v2 ni falla con basura", () => {
    const j = normalizarJugada(base())!;
    expect(migrarJugada(JSON.parse(JSON.stringify(j)))).toMatchObject({ v: 2 });
    expect(migrarJugada(null)).toBeNull();
    expect(migrarJugada("x")).toBe("x");
    expect(normalizarJugada({ v: 1, pasos: "no" })).toBeNull();
  });

  it("una versión futura se lee como mejor se pueda", () => {
    const j = normalizarJugada({ ...JSON.parse(JSON.stringify(base())), v: 7, campoNuevo: "x" })!;
    expect(j.v).toBe(2);
    expect(j.pasos).toHaveLength(3);
  });

  it("los enlaces v1 ya emitidos se abren, se migran a v2 y vuelven a emitirse en v2", async () => {
    const viejo = (await decodificarEnlace(ENLACE_V1_COMPRIMIDO)).jugadas[0];
    expect(viejo.v).toBe(2);
    expect(viejo.ramas).toBeUndefined();
    const otra = (await decodificarEnlace(await codificarEnlace([viejo]))).jugadas[0];
    expect(otra.pasos.map((s) => s.piezas.length)).toEqual(viejo.pasos.map((s) => s.piezas.length));
    expect(otra.pasos.map((s) => s.lineas.length)).toEqual(viejo.pasos.map((s) => s.lineas.length));
  });

  it("un enlace compacto de v1 (sin extras) se descompacta como v1", () => {
    const compacto = ["Vieja", 0, "notas", 0, 1, [["n", [[0, "1", 5, 5, "a1"]], [], []]]];
    const j = descompactar(compacto)!;
    expect(j).toMatchObject({ v: 2, nombre: "Vieja", orient: "h" });
    expect(j.pasos[0].piezas[0]).toMatchObject({ tipo: "atq", etiqueta: "1" });
    expect(j.pista).toBeUndefined();
    expect(j.pasos[0].zonas).toEqual([]);
  });
});

describe("orden de las acciones de un paso", () => {
  function conLineas(): Jugada {
    let j = base();
    j = anadirLinea(j, 1, { tipo: "pase", pts: [{ x: 6, y: 3 }, { x: 4, y: 3 }] }).jugada;
    j = anadirLinea(j, 1, { tipo: "bote", pts: [{ x: 5, y: 7 }, { x: 3, y: 8 }] }).jugada;
    return j;
  }

  it("numerarLineas pone 1, 2, 3… en el orden en que se dibujaron", () => {
    const j = numerarLineas(conLineas(), 1);
    expect(j.pasos[1].lineas.map((l) => l.orden)).toEqual([1, 2, 3]);
    expect(quitarNumeros(j, 1).pasos[1].lineas.every((l) => l.orden === undefined)).toBe(true);
  });

  it("solo numera hasta 20 y no toca otros pasos", () => {
    let j = base();
    for (let i = 0; i < 25; i++) j = anadirLinea(j, 0, { tipo: "corte", pts: [{ x: 1, y: 1 }, { x: 2, y: 2 }] }).jugada;
    const n = numerarLineas(j, 0);
    expect(n.pasos[0].lineas.filter((l) => l.orden).length).toBe(LIMITES.ORDEN);
    expect(n.pasos[1].lineas.every((l) => l.orden === undefined)).toBe(true);
  });

  it("ajustarOrden lo cambia, lo limita a 1-20 y lo quita con null", () => {
    const j = conLineas();
    const id = j.pasos[1].lineas[1].id;
    expect(ajustarOrden(j, 1, id, 3).pasos[1].lineas[1].orden).toBe(3);
    expect(ajustarOrden(j, 1, id, 99).pasos[1].lineas[1].orden).toBe(20);
    expect(ajustarOrden(j, 1, id, -4).pasos[1].lineas[1].orden).toBe(1);
    expect(ajustarOrden(ajustarOrden(j, 1, id, 3), 1, id, null).pasos[1].lineas[1].orden).toBeUndefined();
    expect(ajustarOrden(j, 1, "no-existe", 3)).toEqual(j);
  });

  it("la validación acepta 1-20 y descarta el resto; viaja por el enlace", async () => {
    const j = numerarLineas(conLineas(), 1);
    const sucio = clonar(j);
    sucio.pasos[1].lineas[0].orden = 500;
    (sucio.pasos[1].lineas[1] as unknown as Record<string, unknown>).orden = "dos";
    const n = normalizarJugada(sucio)!;
    expect(n.pasos[1].lineas[0].orden).toBe(20);
    expect(n.pasos[1].lineas[1].orden).toBeUndefined();
    expect(n.pasos[1].lineas[2].orden).toBe(3);
    const ida = (await decodificarEnlace(await codificarEnlace([normalizarJugada(j)!]))).jugadas[0];
    expect(ida.pasos[1].lineas.map((l) => l.orden)).toEqual([1, 2, 3]);
  });

  it("se dibuja en un circulito con el número, y el número se escapa", () => {
    const j = numerarLineas(conLineas(), 1);
    const s = j.pasos[1];
    const svg = renderTablero({ cancha: "media", orient: "h", piezas: s.piezas, lineas: s.lineas, textos: [], paleta: PALETAS.neutra });
    expect((svg.match(/r="0\.44"/g) ?? []).length).toBe(3); // un circulito por línea numerada
    expect(svg).toContain(">3</text>");
    const sin = renderTablero({ cancha: "media", orient: "h", piezas: s.piezas, lineas: j.pasos[0].lineas, textos: [], paleta: PALETAS.neutra });
    expect(sin).not.toContain('r="0.44"');
  });
});
