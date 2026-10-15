import { describe, expect, it } from "vitest";
import {
  CANCHA,
  FILA,
  LIMITES,
  MINIBASKET,
  ZONA_MAX,
  ZONA_MIN,
  ajustarPieza,
  anadirPieza,
  anadirZona,
  avanzarPiezas,
  cambiarCancha,
  cambiarPista,
  codificarEnlace,
  decodificarEnlace,
  dist,
  nuevaJugada,
  normalizarJugada,
  puestosFila,
  puntoEnZona,
  siguienteEtiqueta,
  trazosCancha,
  zonaDesdeEsquinas,
  type Jugada,
  type Paso,
} from "./pizarra";
import { PLANTILLAS, PLANTILLAS_EJERCICIOS } from "./pizarraPlantillas";
import { ENLACE_V1_COMPRIMIDO, ENLACE_V1_SIN_COMPRIMIR, NOMBRE_V1 } from "./pizarraFixtureV1";
import { PALETAS, renderTablero } from "./pizarraRender";

const sinVolatiles = (j: Jugada) => ({
  ...j,
  id: "",
  actualizada: 0,
  pasos: j.pasos.map((s) => ({
    ...s,
    lineas: s.lineas.map((l) => ({ ...l, id: "" })),
    textos: s.textos.map((t) => ({ ...t, id: "" })),
    zonas: (s.zonas ?? []).map((z) => ({ ...z, id: "" })),
  })),
});

describe("pista de minibasket", () => {
  const txt = (c: "media" | "completa", p: "fiba" | "mini") => trazosCancha(c, p).map((t) => t.d).join(" ");

  it("no tiene línea de 3 puntos; la FIBA sí", () => {
    expect(txt("media", "mini")).not.toContain("A6.75,6.75");
    expect(txt("completa", "mini")).not.toContain("A6.75,6.75");
    expect(txt("media", "fiba")).toContain("A6.75,6.75");
  });

  it("la zona y la línea de tiros libres están a 4 m de la línea de fondo", () => {
    expect(MINIBASKET.ZONA_LARGO).toBe(4);
    expect(MINIBASKET.ALTURA_ARO).toBe(2.6);
    expect(txt("media", "mini")).toContain("M0,5.05 H4 V9.95 H0");
    // el semicírculo de tiros libres arranca en x = 4
    expect(txt("media", "mini")).toContain("M4,5.7 A1.8,1.8");
  });

  it("la zona sigue midiendo 4,90 m de ancho y la pista completa dibuja las dos zonas", () => {
    const zonas = trazosCancha("completa", "mini").filter((t) => t.rol === "pintura");
    expect(zonas).toHaveLength(2);
    expect(zonas[1].d).toContain("H24"); // 28 - 4
  });

  it("sin pista indicada se dibuja FIBA (compatibilidad con lo ya guardado)", () => {
    expect(trazosCancha("media")).toEqual(trazosCancha("media", "fiba"));
  });

  it("la pista se guarda, se cambia y viaja en el enlace", async () => {
    const j = cambiarPista(nuevaJugada(), "mini");
    expect(j.pista).toBe("mini");
    expect(cambiarPista(j, "fiba").pista).toBeUndefined();
    const norm = normalizarJugada(j)!;
    expect(norm.pista).toBe("mini");
    const r = (await decodificarEnlace(await codificarEnlace([norm]))).jugadas[0];
    expect(r.pista).toBe("mini");
    expect(normalizarJugada({ ...j, pista: "otra" })!.pista).toBeUndefined();
  });

  it("cambiar de media a completa no rompe nada y conserva la pista", () => {
    const j = cambiarCancha(cambiarPista(nuevaJugada(), "mini"), "completa");
    expect(j.cancha).toBe("completa");
    expect(j.pista).toBe("mini");
  });
});

describe("jugadores: hasta 15 por color, neutros y entrenador", () => {
  it("se numeran del 1 al 15 y luego se acaban las etiquetas", () => {
    let j = nuevaJugada();
    for (let i = 0; i < 15; i++) j = anadirPieza(j, 0, "atq", { x: 5, y: 1 + i * 0.9 }).jugada;
    expect(j.pasos[0].piezas.map((p) => p.etiqueta)).toEqual(Array.from({ length: 15 }, (_, i) => String(i + 1)));
    expect(siguienteEtiqueta(j.pasos[0], "atq")).toBe("");
    for (let i = 0; i < 15; i++) j = anadirPieza(j, 0, "def", { x: 7, y: 1 + i * 0.9 }).jugada;
    expect(j.pasos[0].piezas.filter((p) => p.tipo === "def").map((p) => p.etiqueta).pop()).toBe("X15");
    expect(normalizarJugada(j)!.pasos[0].piezas).toHaveLength(30);
  });

  it("el jugador neutro no lleva número y el entrenador es una E", () => {
    const j = anadirPieza(anadirPieza(nuevaJugada(), 0, "neu", { x: 5, y: 5 }).jugada, 0, "ent", { x: 6, y: 6 }).jugada;
    expect(j.pasos[0].piezas.find((p) => p.tipo === "neu")!.etiqueta).toBe("");
    expect(j.pasos[0].piezas.find((p) => p.tipo === "ent")!.etiqueta).toBe("E");
  });

  it("el nombre corto es opcional, se recorta, se cambia en todos los pasos y viaja", async () => {
    let j = nuevaJugada({ pasos: [{ piezas: [], lineas: [], textos: [], nota: "" }, { piezas: [], lineas: [], textos: [], nota: "" }] });
    const r = anadirPieza(j, 0, "atq", { x: 5, y: 5 });
    j = ajustarPieza(r.jugada, r.id, { nombre: "Marcos Fernádez-Ruiz López" });
    for (const s of j.pasos) expect(s.piezas[0].nombre).toBe("Marcos Ferná");
    expect(ajustarPieza(j, r.id, { nombre: "  " }).pasos[1].piezas[0].nombre).toBeUndefined();
    const ida = (await decodificarEnlace(await codificarEnlace([normalizarJugada(j)!]))).jugadas[0];
    expect(ida.pasos[0].piezas[0].nombre).toBe("Marcos Ferná");
  });
});

describe("filas de jugadores", () => {
  it("nace con 4 jugadores, mirando a donde se le diga, en verde", () => {
    const r = anadirPieza(nuevaJugada(), 0, "fila", { x: 8, y: 3 }, undefined, { ang: 140 });
    const f = r.jugada.pasos[0].piezas[0];
    expect(f).toMatchObject({ tipo: "fila", cant: 4, ang: 140, bando: "neu" });
  });

  it("dibuja como mucho 4 jugadores en cola con la cabeza en la pieza", () => {
    const f = { id: "f", tipo: "fila" as const, etiqueta: "", x: 8, y: 3, cant: 9, ang: 0 };
    const p = puestosFila(f);
    expect(p).toHaveLength(FILA.DIBUJADOS);
    expect(p[0]).toEqual({ x: 8, y: 3 });
    expect(p[1].x).toBeCloseTo(8 - FILA.SEPARACION);
    expect(dist(p[0], p[3])).toBeCloseTo(3 * FILA.SEPARACION);
    expect(puestosFila({ ...f, cant: 2 })).toHaveLength(2);
    expect(puestosFila({ ...f, cant: 0 })).toHaveLength(1);
  });

  it("cant se mantiene entre 1 y 15 y el ángulo se normaliza a 0-359", () => {
    const r = anadirPieza(nuevaJugada(), 0, "fila", { x: 8, y: 3 });
    const id = r.id;
    expect(ajustarPieza(r.jugada, id, { cant: 99 }).pasos[0].piezas[0].cant).toBe(LIMITES.FILA_MAX);
    expect(ajustarPieza(r.jugada, id, { cant: -3 }).pasos[0].piezas[0].cant).toBe(1);
    expect(ajustarPieza(r.jugada, id, { ang: -45 }).pasos[0].piezas[0].ang).toBe(315);
    expect(ajustarPieza(r.jugada, id, { ang: 725 }).pasos[0].piezas[0].ang).toBe(5);
    expect(ajustarPieza(r.jugada, id, { bando: "def" }).pasos[0].piezas[0].bando).toBe("def");
  });

  it("la validación sanea una fila hostil", () => {
    const j = normalizarJugada({
      pasos: [{ piezas: [{ id: "f1", tipo: "fila", etiqueta: "", x: 5, y: 5, cant: 1e9, ang: "x", bando: "<script>" }], lineas: [], textos: [], nota: "" }],
    })!;
    expect(j.pasos[0].piezas[0]).toMatchObject({ tipo: "fila", cant: LIMITES.FILA_MAX, ang: 0, bando: "neu" });
    const j2 = normalizarJugada({ pasos: [{ piezas: [{ id: "a", tipo: "atq", etiqueta: "1", x: 5, y: 5, cant: 9, ang: 90, bando: "def" }], lineas: [], textos: [], nota: "" }] })!;
    expect(j2.pasos[0].piezas[0]).not.toHaveProperty("cant"); // solo las filas llevan estos datos
  });

  it("viaja por el enlace con su cantidad, ángulo y color", async () => {
    const r = anadirPieza(nuevaJugada(), 0, "fila", { x: 8, y: 3 }, undefined, { cant: 7, ang: 135, bando: "atq" });
    const n = normalizarJugada(r.jugada)!;
    const ida = (await decodificarEnlace(await codificarEnlace([n]))).jugadas[0];
    expect(ida.pasos[0].piezas[0]).toMatchObject({ tipo: "fila", cant: 7, ang: 135, bando: "atq" });
  });
});

describe("zonas sombreadas", () => {
  const rect = { id: "z", forma: "rect" as const, x: 5, y: 5, w: 4, h: 2 };
  const eli = { ...rect, forma: "elipse" as const };

  it("el rectángulo contiene su caja y la elipse no sus esquinas", () => {
    expect(puntoEnZona({ x: 6.9, y: 5.9 }, rect)).toBe(true);
    expect(puntoEnZona({ x: 7.1, y: 5 }, rect)).toBe(false);
    expect(puntoEnZona({ x: 6.9, y: 5.9 }, eli)).toBe(false);
    expect(puntoEnZona({ x: 5, y: 5 }, eli)).toBe(true);
    expect(puntoEnZona({ x: 6.99, y: 5 }, eli)).toBe(true);
  });

  it("se define de una esquina a la opuesta y respeta mínimo y máximo", () => {
    const z = zonaDesdeEsquinas("rect", { x: 2, y: 2 }, { x: 6, y: 5 });
    expect(z).toMatchObject({ forma: "rect", x: 4, y: 3.5, w: 4, h: 3 });
    expect(zonaDesdeEsquinas("elipse", { x: 2, y: 2 }, { x: 2.1, y: 2.1 })).toMatchObject({ w: ZONA_MIN, h: ZONA_MIN });
    expect(zonaDesdeEsquinas("rect", { x: -50, y: 0 }, { x: 50, y: 0 }).w).toBe(ZONA_MAX);
  });

  it("anadirZona la guarda en el paso, con tope", () => {
    let j = nuevaJugada();
    for (let i = 0; i < LIMITES.ZONAS + 5; i++) j = anadirZona(j, 0, { forma: "rect", x: 5, y: 5, w: 3, h: 3 }).jugada;
    expect(j.pasos[0].zonas).toHaveLength(LIMITES.ZONAS);
  });

  it("la validación quita lo inválido y limita el tamaño", () => {
    const j = normalizarJugada({
      pasos: [
        {
          piezas: [],
          lineas: [],
          textos: [],
          nota: "",
          zonas: [
            { id: "ok", forma: "elipse", x: 5, y: 5, w: 4, h: 3 },
            { forma: "triángulo", x: 5, y: 5, w: 4, h: 3 },
            { forma: "rect", x: "a", y: 5, w: 4, h: 3 },
            { forma: "rect", x: 5, y: 5, w: 1e9, h: NaN },
            { forma: "rect", x: 5, y: 5, w: 1e9, h: 2 },
            "basura",
          ],
        },
      ],
    })!;
    expect(j.pasos[0].zonas).toHaveLength(2);
    expect(j.pasos[0].zonas![1].w).toBe(ZONA_MAX);
  });

  it("viajan por el enlace", async () => {
    const r = anadirZona(nuevaJugada(), 0, { forma: "elipse", x: 5, y: 6, w: 4, h: 3 });
    const ida = (await decodificarEnlace(await codificarEnlace([normalizarJugada(r.jugada)!]))).jugadas[0];
    expect(ida.pasos[0].zonas![0]).toMatchObject({ forma: "elipse", x: 5, y: 6, w: 4, h: 3 });
  });
});

describe("línea de rotación", () => {
  it("no mueve a la pieza en la animación (es el «después va a…»)", () => {
    const paso: Paso = {
      piezas: [{ id: "a", tipo: "atq", etiqueta: "1", x: 5, y: 5 }],
      lineas: [{ id: "l", tipo: "rotacion", ref: "a", pts: [{ x: 5, y: 5 }, { x: 10, y: 10 }] }],
      textos: [],
      nota: "",
    };
    expect(avanzarPiezas(paso)[0]).toMatchObject({ x: 5, y: 5 });
    paso.lineas[0].tipo = "corte";
    expect(avanzarPiezas(paso)[0]).toMatchObject({ x: 10, y: 10 });
  });

  it("se valida y viaja como cualquier línea", async () => {
    const j = normalizarJugada({
      pasos: [{ piezas: [], lineas: [{ id: "l1", tipo: "rotacion", pts: [{ x: 1, y: 1 }, { x: 4, y: 4 }] }], textos: [], nota: "" }],
    })!;
    expect(j.pasos[0].lineas[0].tipo).toBe("rotacion");
    const ida = (await decodificarEnlace(await codificarEnlace([j]))).jugadas[0];
    expect(ida.pasos[0].lineas[0].tipo).toBe("rotacion");
  });
});

describe("render de las piezas nuevas", () => {
  const base = { cancha: "media" as const, orient: "h" as const, textos: [], lineas: [], paleta: PALETAS.neutra };

  it("dibuja neutro, entrenador, fila y zonas", () => {
    const svg = renderTablero({
      ...base,
      piezas: [
        { id: "n", tipo: "neu", etiqueta: "A", x: 4, y: 4 },
        { id: "e", tipo: "ent", etiqueta: "E", x: 6, y: 4 },
        { id: "f", tipo: "fila", etiqueta: "", x: 9, y: 8, cant: 6, ang: 180, bando: "atq" },
      ],
      zonas: [
        { id: "z1", forma: "rect", x: 3, y: 3, w: 2, h: 2 },
        { id: "z2", forma: "elipse", x: 7, y: 7, w: 3, h: 2 },
      ],
    });
    expect(svg).toContain(PALETAS.neutra.neutro);
    expect(svg).toContain("<rect"); // entrenador y zona
    expect(svg).toContain("<ellipse");
    expect(svg).toContain("×6");
    expect((svg.match(/<circle/g) ?? []).length).toBeGreaterThanOrEqual(1 + FILA.DIBUJADOS);
  });

  it("el nombre corto se escapa: nunca entra como HTML", () => {
    const svg = renderTablero({
      ...base,
      piezas: [{ id: "a", tipo: "atq", etiqueta: "1", x: 4, y: 4, nombre: "<img src=x onerror=alert(1)>" }],
    });
    expect(svg).not.toContain("<img");
    expect(svg).toContain("&lt;img");
  });

  it("la pista de minibasket se pinta sin arco de 3", () => {
    const m = renderTablero({ ...base, piezas: [], pista: "mini" });
    const f = renderTablero({ ...base, piezas: [] });
    expect(m).not.toContain("A6.75");
    expect(f).toContain("A6.75");
  });
});

describe("compatibilidad con lo ya emitido (versión 1)", () => {
  it("un enlace sin comprimir de la versión 1 sigue abriéndose igual", async () => {
    const r = await decodificarEnlace(ENLACE_V1_SIN_COMPRIMIR);
    expect(r.tipo).toBe("jugada");
    const j = r.jugadas[0];
    expect(j.nombre).toBe(NOMBRE_V1);
    expect(j.pista).toBeUndefined();
    expect(j.pasos).toHaveLength(3);
    expect(j.pasos[0].piezas).toHaveLength(11);
    expect(j.pasos.map((s) => s.lineas.length)).toEqual([1, 2, 2]);
    expect(j.pasos.every((s) => (s.zonas ?? []).length === 0)).toBe(true);
  });

  it("y el comprimido también, con el mismo contenido", async () => {
    const a = (await decodificarEnlace(ENLACE_V1_SIN_COMPRIMIR)).jugadas[0];
    const b = (await decodificarEnlace(ENLACE_V1_COMPRIMIDO)).jugadas[0];
    expect(sinVolatiles(b)).toEqual(sinVolatiles(a));
  });

  it("coincide con la plantilla de la que salió (nada se perdió al ampliar el formato)", async () => {
    const horns = PLANTILLAS.find((p) => p.id === "plantilla-horns")!.crear();
    const ida = (await decodificarEnlace(ENLACE_V1_SIN_COMPRIMIR)).jugadas[0];
    expect(sinVolatiles(ida)).toEqual(sinVolatiles(normalizarJugada(horns)!));
  });
});

describe("ejercicios de entrenamiento", () => {
  const cuerpos = (s: Paso) => [
    ...s.piezas.filter((p) => p.tipo === "atq" || p.tipo === "def" || p.tipo === "neu" || p.tipo === "ent").map((p) => ({ x: p.x, y: p.y, r: 0.62 })),
    ...s.piezas.filter((p) => p.tipo === "fila").flatMap((p) => puestosFila(p).map((q) => ({ ...q, r: FILA.RADIO }))),
  ];

  it("hay siete, con ids únicos, categoría ejercicio y las dos notas (cómo se hace y qué se corrige)", () => {
    expect(PLANTILLAS_EJERCICIOS).toHaveLength(7);
    expect(new Set(PLANTILLAS_EJERCICIOS.map((p) => p.id)).size).toBe(7);
    for (const p of PLANTILLAS_EJERCICIOS) {
      const j = p.crear();
      expect(j.categoria, p.id).toBe("ejercicio");
      expect(j.notas, p.id).toContain("Cómo se hace");
      expect(j.notas, p.id).toContain("Qué se corrige");
      expect(j.pasos.length, p.id).toBeGreaterThanOrEqual(2);
      for (const s of j.pasos) expect(s.nota.length, p.id).toBeGreaterThan(10);
    }
  });

  it("cubren los ejercicios pedidos", () => {
    const ids = PLANTILLAS_EJERCICIOS.map((p) => p.id).join(" ");
    for (const k of ["rueda-bandejas", "tres-hombres", "3c2-2c1", "mikan", "1c1", "estrella", "rebote-pase"]) expect(ids).toContain(k);
  });

  it("pasan la validación sin perder nada y caben en una URL razonable", async () => {
    for (const p of PLANTILLAS_EJERCICIOS) {
      const j = p.crear();
      const norm = normalizarJugada(j)!;
      j.pasos.forEach((s, i) => {
        expect(norm.pasos[i].piezas, p.id).toHaveLength(s.piezas.length);
        expect(norm.pasos[i].lineas, p.id).toHaveLength(s.lineas.length);
        expect(norm.pasos[i].zonas ?? [], p.id).toHaveLength((s.zonas ?? []).length);
      });
      const ida = (await decodificarEnlace(await codificarEnlace([norm]))).jugadas[0];
      expect(sinVolatiles(ida), p.id).toEqual(sinVolatiles(norm));
      expect((await codificarEnlace([norm])).length, p.id).toBeLessThan(4000);
    }
  });

  it("todo está dentro del área visible, también cada jugador de las filas", () => {
    for (const pl of PLANTILLAS_EJERCICIOS) {
      const j = pl.crear();
      const L = j.cancha === "media" ? 14 : 28;
      j.pasos.forEach((s, i) => {
        for (const c of cuerpos(s)) {
          expect(c.x, `${pl.id} paso ${i + 1}`).toBeGreaterThanOrEqual(-CANCHA.MARGEN);
          expect(c.x, `${pl.id} paso ${i + 1}`).toBeLessThanOrEqual(L + CANCHA.MARGEN);
          expect(c.y, `${pl.id} paso ${i + 1}`).toBeGreaterThanOrEqual(-CANCHA.MARGEN);
          expect(c.y, `${pl.id} paso ${i + 1}`).toBeLessThanOrEqual(CANCHA.ANCHO + CANCHA.MARGEN);
        }
        for (const z of s.zonas ?? []) {
          expect(z.x - z.w / 2).toBeGreaterThanOrEqual(-CANCHA.MARGEN);
          expect(z.x + z.w / 2).toBeLessThanOrEqual(L + CANCHA.MARGEN);
        }
      });
    }
  });

  it("en ningún paso se montan dos jugadores (se pueden tocar, no taparse)", () => {
    for (const pl of PLANTILLAS_EJERCICIOS) {
      const j = pl.crear();
      j.pasos.forEach((s, i) => {
        const c = cuerpos(s);
        for (let a = 0; a < c.length; a++) {
          for (let b = a + 1; b < c.length; b++) {
            expect(dist(c[a], c[b]), `${pl.id} paso ${i + 1}: ${a}-${b}`).toBeGreaterThanOrEqual(c[a].r + c[b].r - 0.25);
          }
        }
      });
    }
  });

  it("el balón siempre está junto a algún jugador (nadie juega sin balón por un descuido)", () => {
    for (const pl of PLANTILLAS_EJERCICIOS) {
      const j = pl.crear();
      j.pasos.forEach((s, i) => {
        for (const b of s.piezas.filter((p) => p.tipo === "balon")) {
          const cerca = cuerpos(s).some((c) => dist(c, b) <= 1.4);
          expect(cerca, `${pl.id} paso ${i + 1}`).toBe(true);
        }
      });
    }
  });

  it("la trenza: 3 jugadores, el balón cambia de manos y acaba en bandeja", () => {
    const j = PLANTILLAS_EJERCICIOS.find((p) => p.id === "ejercicio-tres-hombres")!.crear();
    expect(j.cancha).toBe("completa");
    expect(j.pasos).toHaveLength(5);
    for (const s of j.pasos) expect(s.piezas.filter((p) => p.tipo === "atq")).toHaveLength(3);
    const pasadores = j.pasos.slice(0, 4).map((s) => s.lineas.find((l) => l.tipo === "pase")!.ref);
    expect(new Set(pasadores).size).toBeGreaterThanOrEqual(3);
    expect(j.pasos[4].lineas.some((l) => l.tipo === "tiro")).toBe(true);
    // avanza hacia la canasta del fondo en cada paso
    const xs = j.pasos.map((s) => s.piezas.find((p) => p.tipo === "balon")!.x);
    for (let i = 1; i < xs.length; i++) expect(xs[i]).toBeGreaterThan(xs[i - 1]);
  });

  it("el 3c2 pasa a 2c1: en el último paso hay dos atacantes nuevos y uno defendiendo", () => {
    const j = PLANTILLAS_EJERCICIOS.find((p) => p.id === "ejercicio-3c2-2c1")!.crear();
    expect(j.pasos[0].piezas.filter((p) => p.tipo === "atq")).toHaveLength(3);
    expect(j.pasos[0].piezas.filter((p) => p.tipo === "def")).toHaveLength(2);
    const u = j.pasos[j.pasos.length - 1];
    const bota = u.lineas.find((l) => l.tipo === "bote")!;
    expect(u.piezas.find((p) => p.id === bota.ref)!.tipo).toBe("def"); // los que defendían ahora atacan
  });

  it("el Mikan usa una zona sombreada y las filas llevan su número", () => {
    const m = PLANTILLAS_EJERCICIOS.find((p) => p.id === "ejercicio-mikan")!.crear();
    expect(m.pasos[0].zonas).toHaveLength(1);
    const f = m.pasos[0].piezas.find((p) => p.tipo === "fila")!;
    expect(f.cant).toBe(3);
  });

  it("el 1c1 enfrenta una fila azul y una roja, y el defensor sale de debajo del aro", () => {
    const j = PLANTILLAS_EJERCICIOS.find((p) => p.id === "ejercicio-1c1-cierre")!.crear();
    const filas = j.pasos[0].piezas.filter((p) => p.tipo === "fila");
    expect(filas.map((f) => f.bando).sort()).toEqual(["atq", "def"]);
    const x1 = j.pasos[0].piezas.find((p) => p.tipo === "def")!;
    expect(dist(x1, { x: CANCHA.ARO_X, y: 7.5 })).toBeLessThan(1.6);
  });

  it("el tiro en estrella usa cinco jugadores neutros con letra y rotación sin tirar de la pieza", () => {
    const j = PLANTILLAS_EJERCICIOS.find((p) => p.id === "ejercicio-tiro-estrella")!.crear();
    expect(j.pasos[0].piezas.filter((p) => p.tipo === "neu").map((p) => p.etiqueta)).toEqual(["A", "B", "C", "D", "E"]);
    expect(j.pasos[1].lineas.every((l) => l.tipo === "rotacion")).toBe(true);
    // tras rotar, cada uno ocupa el puesto del siguiente
    const a0 = j.pasos[0].piezas.find((p) => p.etiqueta === "A")!;
    const b0 = j.pasos[0].piezas.find((p) => p.etiqueta === "B")!;
    const a2 = j.pasos[2].piezas.find((p) => p.etiqueta === "A")!;
    expect(a2.x).toBeCloseTo(b0.x);
    expect(a2.y).toBeCloseTo(b0.y);
    expect(dist(a0, a2)).toBeGreaterThan(1);
  });
});
