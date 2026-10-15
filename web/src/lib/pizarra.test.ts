import { describe, expect, it } from "vitest";
import {
  CANCHA,
  anadirLinea,
  anadirPieza,
  aVista,
  avanzarPiezas,
  cajaVista,
  cambiarCancha,
  clonar,
  codificarEnlace,
  confirmar,
  decodificarEnlace,
  deVista,
  deshacer,
  diasDesdeCopia,
  duplicarPaso,
  duracionTotal,
  envolverTexto,
  estadoEnTiempo,
  insertarPaso,
  leerLibroDeTexto,
  libroAJson,
  longitud,
  moverPiezaEn,
  normalizarJugada,
  normalizarLibro,
  nuevaJugada,
  nuevoHistorial,
  payloadDeHash,
  polilinea,
  posicionesEnTransicion,
  puntoEnLong,
  quitarPaso,
  quitarPieza,
  rehacer,
  renombrarPieza,
  simplifica,
  textoUltimaCopia,
  tocaRecordarCopia,
  trazosCancha,
  type Jugada,
  type Paso,
} from "./pizarra";
import { PLANTILLAS } from "./pizarraPlantillas";
import { PALETAS, geometriaLinea, renderCuadro, renderHoja, renderTablero } from "./pizarraRender";

const AHORA = Date.UTC(2026, 9, 15);
const DIA = 86_400_000;

function jugadaBase(): Jugada {
  const paso: Paso = {
    piezas: [
      { id: "a1", tipo: "atq", etiqueta: "1", x: 8, y: 7.5 },
      { id: "a2", tipo: "atq", etiqueta: "2", x: 6, y: 2 },
      { id: "b", tipo: "balon", etiqueta: "", x: 8.4, y: 7.8 },
    ],
    lineas: [
      { id: "l1", tipo: "corte", ref: "a2", pts: [{ x: 6, y: 2 }, { x: 3, y: 5 }] },
      { id: "l2", tipo: "pase", ref: "a1", fin: "a2", pts: [{ x: 8, y: 7.5 }, { x: 6, y: 2 }] },
    ],
    textos: [{ id: "t1", x: 5, y: 5, texto: "Hola", tam: 2 }],
    nota: "Paso uno",
  };
  return nuevaJugada({ id: "j1", nombre: "Prueba", pasos: [paso] });
}

describe("geometría de la pista", () => {
  it("aVista y deVista son inversas en las dos orientaciones", () => {
    for (const o of ["h", "v"] as const) {
      for (const p of [{ x: 0, y: 0 }, { x: 1.575, y: 7.5 }, { x: 13.3, y: 14.2 }, { x: -1, y: 16 }]) {
        const q = deVista(aVista(p, o), o);
        expect(q.x).toBeCloseTo(p.x, 9);
        expect(q.y).toBeCloseTo(p.y, 9);
      }
    }
  });

  it("la vista vertical pone la canasta ARRIBA y conserva la lateralidad (giro, no espejo)", () => {
    const aro = aVista({ x: CANCHA.ARO_X, y: 7.5 }, "v");
    expect(aro.y).toBeCloseTo(1.575);
    expect(aro.x).toBeCloseTo(7.5);
    // y creciente (hacia "abajo" en horizontal) pasa a la izquierda: giro de 90°
    expect(aVista({ x: 5, y: 10 }, "v").x).toBeLessThan(aVista({ x: 5, y: 5 }, "v").x);
  });

  it("el viewBox vertical es el horizontal girado, con margen en los cuatro lados", () => {
    const h = cajaVista("completa", "h");
    const v = cajaVista("completa", "v");
    expect(h.w).toBe(v.h);
    expect(h.h).toBe(v.w);
    expect(h.x).toBe(-CANCHA.MARGEN);
    expect(cajaVista("media", "h").w).toBe(14 + 2 * CANCHA.MARGEN);
  });

  it("trazos con medidas FIBA: línea de 3 a 6,75 m y zona de 4,9 × 5,8 m", () => {
    const media = trazosCancha("media").map((t) => t.d).join(" ");
    expect(media).toContain("A6.75,6.75");
    expect(media).toContain("M0,5.05 H5.8 V9.95 H0");
    // 9,95 - 5,05 = 4,90 m de ancho
    expect(9.95 - 5.05).toBeCloseTo(4.9);
    // la completa tiene las dos mitades: el doble de arcos de 3 puntos
    const n3 = (c: "media" | "completa") => (trazosCancha(c).map((t) => t.d).join(" ").match(/A6\.75,6\.75/g) ?? []).length;
    expect(n3("media")).toBe(1);
    expect(n3("completa")).toBe(2);
  });
});

describe("líneas", () => {
  it("la curva pasa exactamente por el punto medio indicado", () => {
    const l = { id: "x", tipo: "corte" as const, pts: [{ x: 0, y: 0 }, { x: 10, y: 0 }], mid: { x: 5, y: 4 } };
    const pl = polilinea(l, 24);
    const m = pl[12];
    expect(m.x).toBeCloseTo(5, 6);
    expect(m.y).toBeCloseTo(4, 6);
    expect(polilinea({ ...l, mid: undefined })).toHaveLength(2);
  });

  it("recorta del principio y del final sin cambiar la dirección", () => {
    const g = geometriaLinea({ id: "x", tipo: "pase", ref: "a", fin: "b", pts: [{ x: 0, y: 0 }, { x: 10, y: 0 }] });
    const ini = g.cuerpo[0];
    expect(ini.x).toBeGreaterThan(0.5);
    expect(g.cabeza).toBeDefined();
    expect(g.cabeza![0].x).toBeLessThan(10);
  });

  it("el bote hace zigzag y acaba en recto con flecha", () => {
    const g = geometriaLinea({ id: "x", tipo: "bote", pts: [{ x: 0, y: 0 }, { x: 8, y: 0 }] });
    expect(g.cuerpo.length).toBeGreaterThan(6);
    expect(g.cuerpo.some((p) => Math.abs(p.y) > 0.2)).toBe(true);
    expect(g.cabeza).toBeDefined();
  });

  it("el bloqueo acaba en T (barra perpendicular) y no lleva flecha", () => {
    const g = geometriaLinea({ id: "x", tipo: "bloqueo", pts: [{ x: 0, y: 0 }, { x: 5, y: 0 }] });
    expect(g.cabeza).toBeUndefined();
    expect(g.barra).toBeDefined();
    expect(g.barra![0].x).toBeCloseTo(g.barra![1].x);
    expect(Math.abs(g.barra![0].y - g.barra![1].y)).toBeGreaterThan(1);
  });

  it("simplifica un trazo libre sin perder los extremos", () => {
    const pts = Array.from({ length: 50 }, (_, i) => ({ x: i * 0.1, y: i % 2 === 0 ? 0 : 0.01 }));
    const s = simplifica(pts);
    expect(s.length).toBeLessThan(5);
    expect(s[0]).toEqual(pts[0]);
    expect(s[s.length - 1]).toEqual(pts[pts.length - 1]);
  });

  it("puntoEnLong recorre la polilínea por longitud de arco", () => {
    const pts = [{ x: 0, y: 0 }, { x: 3, y: 0 }, { x: 3, y: 4 }];
    expect(longitud(pts)).toBe(7);
    expect(puntoEnLong(pts, 3)).toEqual({ x: 3, y: 0 });
    expect(puntoEnLong(pts, 5)).toEqual({ x: 3, y: 2 });
    expect(puntoEnLong(pts, 99)).toEqual({ x: 3, y: 4 });
  });
});

describe("pasos y animación", () => {
  it("un paso nuevo parte de donde acabaron las líneas de movimiento y el balón sigue al pase", () => {
    const j = insertarPaso(jugadaBase(), 0);
    expect(j.pasos).toHaveLength(2);
    const p2 = j.pasos[1];
    const a2 = p2.piezas.find((p) => p.id === "a2")!;
    expect(a2.x).toBeCloseTo(3);
    expect(a2.y).toBeCloseTo(5);
    // a1 no tiene línea de movimiento: se queda donde estaba
    expect(p2.piezas.find((p) => p.id === "a1")).toMatchObject({ x: 8, y: 7.5 });
    // el balón estaba en manos de a1 y la línea de pase de a1 acaba en a2 (6,2)
    const b = p2.piezas.find((p) => p.id === "b")!;
    expect(b.x).toBeCloseTo(6);
    expect(b.y).toBeCloseTo(2);
    expect(p2.lineas).toHaveLength(0);
  });

  it("el bloqueo también mueve al que bloquea hasta el punto del bloqueo", () => {
    const j = jugadaBase();
    j.pasos[0].lineas = [{ id: "s", tipo: "bloqueo", ref: "a1", pts: [{ x: 8, y: 7.5 }, { x: 7, y: 9 }] }];
    const fin = avanzarPiezas(j.pasos[0]).find((p) => p.id === "a1")!;
    expect(fin).toMatchObject({ x: 7, y: 9 });
  });

  it("interpolación: en recta sin línea, y exacta en los extremos", () => {
    const j = insertarPaso(jugadaBase(), 0);
    j.pasos[1].piezas.find((p) => p.id === "a1")!.x = 4; // a1 se mueve sin línea
    const t0 = posicionesEnTransicion(j, 0, 0).find((p) => p.id === "a1")!;
    const t1 = posicionesEnTransicion(j, 0, 1).find((p) => p.id === "a1")!;
    const tm = posicionesEnTransicion(j, 0, 0.5).find((p) => p.id === "a1")!;
    expect(t0.x).toBeCloseTo(8);
    expect(t1.x).toBeCloseTo(4);
    expect(tm.x).toBeCloseTo(6, 5); // easing simétrico: la mitad exacta
    expect(tm.y).toBeCloseTo(7.5);
  });

  it("interpolación: sigue la CURVA de la línea asignada, no la recta", () => {
    const j = jugadaBase();
    j.pasos[0].lineas = [{ id: "c", tipo: "corte", ref: "a2", pts: [{ x: 6, y: 2 }, { x: 6, y: 12 }], mid: { x: 10, y: 7 } }];
    const j2 = insertarPaso(j, 0);
    const tm = posicionesEnTransicion(j2, 0, 0.5).find((p) => p.id === "a2")!;
    expect(tm.x).toBeCloseTo(10, 4); // mitad del recorrido = punto medio de la curva
    expect(tm.y).toBeCloseTo(7, 4);
    const fin = posicionesEnTransicion(j2, 0, 1).find((p) => p.id === "a2")!;
    expect(fin.x).toBeCloseTo(6, 6);
    expect(fin.y).toBeCloseTo(12, 6);
  });

  it("si la línea acaba lejos del paso siguiente, igualmente se llega a donde dice el paso", () => {
    const j = insertarPaso(jugadaBase(), 0);
    j.pasos[1].piezas.find((p) => p.id === "a2")!.x = 1; // el paso siguiente discrepa de la línea
    const fin = posicionesEnTransicion(j, 0, 1).find((p) => p.id === "a2")!;
    expect(fin.x).toBeCloseTo(1);
  });

  it("estadoEnTiempo recorre pausa y transición y termina en el último paso", () => {
    const j = insertarPaso(insertarPaso(jugadaBase(), 0), 1);
    expect(estadoEnTiempo(j, 0)).toMatchObject({ k: 0, t: 0, fin: false });
    expect(duracionTotal(j)).toBeGreaterThan(3000);
    const fin = estadoEnTiempo(j, duracionTotal(j) + 10);
    expect(fin).toMatchObject({ k: 2, fin: true });
    const mitad = estadoEnTiempo(j, 450 + 850);
    expect(mitad.k).toBe(0);
    expect(mitad.t).toBeCloseTo(0.5, 1);
  });

  it("duplicar, borrar y no borrar el único paso", () => {
    let j = jugadaBase();
    j = duplicarPaso(j, 0);
    expect(j.pasos).toHaveLength(2);
    j = quitarPaso(j, 1);
    expect(j.pasos).toHaveLength(1);
    j = quitarPaso(j, 0);
    expect(j.pasos).toHaveLength(1);
    expect(j.pasos[0].lineas).toHaveLength(0);
    expect(j.pasos[0].piezas.length).toBeGreaterThan(0);
  });
});

describe("edición", () => {
  it("mover una pieza arrastra el inicio/fin de las líneas pegadas a ella", () => {
    const j = clonar(jugadaBase());
    moverPiezaEn(j.pasos[0], "a2", { x: 7, y: 3 });
    const corte = j.pasos[0].lineas.find((l) => l.id === "l1")!;
    expect(corte.pts[0]).toEqual({ x: 7, y: 3 });
    expect(corte.pts[1]).toEqual({ x: 3, y: 5 }); // el final no
    const pase = j.pasos[0].lineas.find((l) => l.id === "l2")!;
    expect(pase.pts[1]).toEqual({ x: 7, y: 3 }); // el pase llega a a2 (fin)
  });

  it("añadir pieza numera sola 1..5 y X1..; quitarla limpia referencias; renombrar vale para todos los pasos", () => {
    let j = nuevaJugada();
    for (let i = 0; i < 3; i++) j = anadirPieza(j, 0, "atq", { x: 5 + i, y: 5 }).jugada;
    const d = anadirPieza(j, 0, "def", { x: 5, y: 6 });
    j = d.jugada;
    expect(j.pasos[0].piezas.map((p) => p.etiqueta)).toEqual(["1", "2", "3", "X1"]);
    j = insertarPaso(j, 0);
    const idA1 = j.pasos[0].piezas[0].id;
    j = renombrarPieza(j, idA1, "PG");
    expect(j.pasos.map((s) => s.piezas.find((p) => p.id === idA1)?.etiqueta)).toEqual(["PG", "PG"]);
    const con = anadirLinea(j, 0, { tipo: "corte", pts: [{ x: 5, y: 5 }, { x: 3, y: 3 }], ref: idA1 }).jugada;
    const sin = quitarPieza(con, 0, idA1);
    expect(sin.pasos[0].piezas.find((p) => p.id === idA1)).toBeUndefined();
    expect(sin.pasos[1].piezas.find((p) => p.id === idA1)).toBeUndefined();
    expect(sin.pasos[0].lineas[0].ref).toBeUndefined();
  });

  it("al pasar a media pista nada queda fuera de la pista", () => {
    const j = nuevaJugada({ cancha: "completa" });
    const { jugada } = anadirPieza(j, 0, "atq", { x: 24, y: 5 });
    const m = cambiarCancha(jugada, "media");
    expect(m.pasos[0].piezas[0].x).toBeLessThanOrEqual(14 + CANCHA.MARGEN);
  });
});

describe("historial", () => {
  it("deshacer y rehacer recorren los estados y un cambio nuevo borra el futuro", () => {
    let h = nuevoHistorial(1);
    h = confirmar(h, 2);
    h = confirmar(h, 3);
    h = deshacer(h);
    expect(h.presente).toBe(2);
    h = deshacer(h);
    expect(h.presente).toBe(1);
    h = deshacer(h); // sin más pasado: no cambia
    expect(h.presente).toBe(1);
    h = rehacer(h);
    expect(h.presente).toBe(2);
    h = confirmar(h, 9);
    expect(h.futuro).toEqual([]);
    expect(rehacer(h).presente).toBe(9);
    expect(deshacer(h).presente).toBe(2);
  });

  it("limita la memoria a 100 estados", () => {
    let h = nuevoHistorial(0);
    for (let i = 1; i <= 150; i++) h = confirmar(h, i);
    expect(h.pasado.length).toBe(100);
  });
});

describe("validación de entrada no confiable", () => {
  const basura: unknown[] = [null, undefined, 42, "texto", [], {}, { pasos: [] }, { pasos: "x" }, { pasos: [null] }, true];

  it("rechaza lo que no es una jugada sin lanzar", () => {
    for (const b of basura.slice(0, 8)) expect(normalizarJugada(b)).toBeNull();
    // un paso basura se normaliza a un paso vacío, no revienta
    expect(normalizarJugada({ pasos: [null] })!.pasos[0].piezas).toEqual([]);
  });

  it("descarta tipos desconocidos, coordenadas no numéricas y referencias rotas", () => {
    const j = normalizarJugada({
      nombre: "  x  ",
      categoria: "hackeada",
      cancha: "otra",
      orient: "z",
      pasos: [
        {
          piezas: [
            { id: "a", tipo: "atq", etiqueta: "1234567", x: 5, y: 5 },
            { id: "b", tipo: "dragon", x: 1, y: 1 },
            { id: "c", tipo: "def", x: "7", y: 1 },
            { id: "d", tipo: "def", x: Infinity, y: 1 },
            { id: "e", tipo: "cono", x: 1e9, y: -1e9 },
          ],
          lineas: [
            { tipo: "pase", pts: [{ x: 1, y: 1 }, { x: 5, y: 5 }], ref: "a", fin: "no-existe" },
            { tipo: "laser", pts: [{ x: 1, y: 1 }, { x: 2, y: 2 }] },
            { tipo: "corte", pts: [{ x: 1, y: 1 }] },
          ],
          textos: [{ x: 3, y: 3, texto: "\u0000hola\u0007", tam: 99 }, { x: 3, y: 3, texto: "", tam: 1 }],
        },
      ],
    })!;
    expect(j.nombre).toBe("x");
    expect(j.categoria).toBe("ataque");
    expect(j.cancha).toBe("media");
    expect(j.orient).toBe("v");
    const p = j.pasos[0];
    expect(p.piezas.map((x) => x.id)).toEqual(["a", "e"]);
    expect(p.piezas[0].etiqueta).toBe("1234");
    expect(p.piezas[1].x).toBeLessThanOrEqual(CANCHA.MEDIA + CANCHA.MARGEN);
    expect(p.lineas).toHaveLength(1);
    expect(p.lineas[0].ref).toBe("a");
    expect(p.lineas[0].fin).toBeUndefined();
    expect(p.textos).toHaveLength(1);
    expect(p.textos[0].texto).toBe("hola");
    expect(p.textos[0].tam).toBe(3);
  });

  it("limita cantidades (pasos, piezas, puntos) y sanea los ids", () => {
    const muchas = Array.from({ length: 200 }, (_, i) => ({ id: `p${i}`, tipo: "atq", x: 5, y: 5 }));
    const j = normalizarJugada({
      pasos: Array.from({ length: 100 }, () => ({ piezas: muchas })),
    })!;
    expect(j.pasos.length).toBeLessThanOrEqual(40);
    expect(j.pasos[0].piezas.length).toBeLessThanOrEqual(40);
    const raro = normalizarJugada({ pasos: [{ piezas: [{ id: '"><img src=x onerror=1>', tipo: "atq", x: 1, y: 1 }] }] })!;
    expect(raro.pasos[0].piezas[0].id).toMatch(/^[A-Za-z0-9_-]{1,12}$/);
  });

  it("normalizarLibro acepta libro, array y jugada suelta, y cuenta lo descartado", () => {
    const buena = jugadaBase();
    expect(normalizarLibro({ app: "x", jugadas: [buena, { pasos: [] }, 7] })).toMatchObject({ descartadas: 2 });
    expect(normalizarLibro([buena, buena]).jugadas).toHaveLength(2);
    expect(normalizarLibro(buena).jugadas).toHaveLength(1);
    expect(normalizarLibro("nada")).toEqual({ jugadas: [], descartadas: 0 });
  });

  it("ida y vuelta del archivo .json y tolerancia a JSON roto", () => {
    const txt = libroAJson([jugadaBase()]);
    const r = leerLibroDeTexto(txt)!;
    expect(r.jugadas).toHaveLength(1);
    expect(r.jugadas[0].pasos[0].lineas).toHaveLength(2);
    expect(leerLibroDeTexto("{no es json")).toBeNull();
    expect(leerLibroDeTexto("")).toBeNull();
  });

  it("el render escapa el texto del usuario: nunca entra HTML en el SVG", () => {
    const j = jugadaBase();
    j.nombre = "<img src=x onerror=alert(1)>";
    j.pasos[0].textos[0].texto = '</text><script>alert("x")</script>';
    j.pasos[0].piezas[0].etiqueta = "<b>";
    const svg = renderTablero({ cancha: "media", orient: "v", piezas: j.pasos[0].piezas, lineas: j.pasos[0].lineas, textos: j.pasos[0].textos, paleta: PALETAS.parquet });
    expect(svg).not.toContain("<script");
    expect(svg).not.toContain("<b>");
    expect(svg).toContain("&lt;script&gt;");
    const cuadro = renderCuadro(j, 0, { paleta: PALETAS.neutra, ancho: 800 }).svg;
    expect(cuadro).not.toContain("<img");
    expect(cuadro).toContain("&lt;img");
    expect(renderHoja(j, { paleta: PALETAS.neutra }).svg).not.toContain("<img");
  });
});

describe("enlace compartible", () => {
  // el id de la jugada, la fecha y los ids de líneas/textos no viajan en el enlace
  const sinVolatiles = (j: Jugada) => ({
    ...j,
    id: "",
    actualizada: 0,
    pasos: j.pasos.map((s) => ({
      ...s,
      lineas: s.lineas.map((l) => ({ ...l, id: "" })),
      textos: s.textos.map((t) => ({ ...t, id: "" })),
    })),
  });

  it("ida y vuelta comprimido (deflate-raw) de una jugada", async () => {
    const j = normalizarJugada(jugadaBase())!;
    const txt = await codificarEnlace([j]);
    expect(txt.startsWith("zj")).toBe(true);
    const r = await decodificarEnlace(txt);
    expect(r.tipo).toBe("jugada");
    expect(sinVolatiles(r.jugadas[0])).toEqual(sinVolatiles(j));
  });

  it("ida y vuelta sin comprimir (navegadores sin CompressionStream)", async () => {
    const j = normalizarJugada(jugadaBase())!;
    const txt = await codificarEnlace([j], { comprimir: false });
    expect(txt.startsWith("rj")).toBe(true);
    expect(sinVolatiles((await decodificarEnlace(txt)).jugadas[0])).toEqual(sinVolatiles(j));
  });

  it("todas las plantillas viajan por el enlace sin perder nada y caben en una URL razonable", async () => {
    const todas = PLANTILLAS.map((p) => p.crear());
    const libro = await codificarEnlace(todas);
    expect(libro.startsWith("zb")).toBe(true);
    const r = await decodificarEnlace(libro);
    expect(r.tipo).toBe("libro");
    expect(r.jugadas).toHaveLength(todas.length);
    for (let i = 0; i < todas.length; i++) {
      expect(sinVolatiles(r.jugadas[i])).toEqual(sinVolatiles(normalizarJugada(todas[i])!));
    }
    for (const t of todas) {
      expect((await codificarEnlace([t])).length).toBeLessThan(3000);
    }
  });

  it("un trazo libre largo sobrevive al enlace", async () => {
    const j = jugadaBase();
    const pts = Array.from({ length: 120 }, (_, i) => ({ x: 3 + i * 0.05, y: 4 + Math.sin(i / 5) }));
    j.pasos[0].lineas.push({ id: "libre1", tipo: "libre", pts });
    const n = normalizarJugada(j)!;
    const r = (await decodificarEnlace(await codificarEnlace([n]))).jugadas[0];
    expect(r.pasos[0].lineas.find((l) => l.tipo === "libre")!.pts).toHaveLength(120);
  });

  it("rechaza basura con un Error y sin colgarse", async () => {
    await expect(decodificarEnlace("")).rejects.toThrow();
    await expect(decodificarEnlace("zj")).rejects.toThrow();
    await expect(decodificarEnlace("xx12345")).rejects.toThrow();
    await expect(decodificarEnlace("zj!!!no-base64!!!")).rejects.toThrow();
    await expect(decodificarEnlace("zjAAAAAAAA")).rejects.toThrow(); // no es deflate
    await expect(decodificarEnlace("rjaGVsbG8")).rejects.toThrow(); // "hello" no es JSON
    const noJugada = btoa('["hola",1,2]').replace(/=+$/, "");
    await expect(decodificarEnlace("rj" + noJugada)).rejects.toThrow();
    await expect(decodificarEnlace("zj" + "A".repeat(500_000))).rejects.toThrow();
  });

  it("payloadDeHash extrae j= del hash", () => {
    expect(payloadDeHash("#j=zjabc")).toBe("zjabc");
    expect(payloadDeHash("#x=1&j=rjdef")).toBe("rjdef");
    expect(payloadDeHash("")).toBeNull();
    expect(payloadDeHash("#otra=1")).toBeNull();
  });
});

describe("plantillas", () => {
  it("hay entre 4 y 6, con ids únicos y jugadas válidas con 2+ pasos", () => {
    expect(PLANTILLAS.length).toBeGreaterThanOrEqual(4);
    expect(PLANTILLAS.length).toBeLessThanOrEqual(6);
    expect(new Set(PLANTILLAS.map((p) => p.id)).size).toBe(PLANTILLAS.length);
    for (const p of PLANTILLAS) {
      const j = p.crear();
      const norm = normalizarJugada(j)!;
      expect(norm).not.toBeNull();
      expect(j.pasos.length).toBeGreaterThanOrEqual(2);
      // la validación no tira nada: mismas piezas y líneas en cada paso
      j.pasos.forEach((s, i) => {
        expect(norm.pasos[i].piezas).toHaveLength(s.piezas.length);
        expect(norm.pasos[i].lineas).toHaveLength(s.lineas.length);
      });
    }
  });

  it("pick and roll: 5 atacantes, 5 defensores, balón, y el balón acaba en el que rueda", () => {
    const j = PLANTILLAS.find((p) => p.id === "plantilla-pick-and-roll")!.crear();
    const ult = j.pasos[j.pasos.length - 1];
    expect(ult.piezas.filter((p) => p.tipo === "atq")).toHaveLength(5);
    expect(ult.piezas.filter((p) => p.tipo === "def")).toHaveLength(5);
    expect(ult.piezas.filter((p) => p.tipo === "balon")).toHaveLength(1);
    const pase = ult.lineas.find((l) => l.tipo === "pase")!;
    const a5 = ult.piezas.find((p) => p.id === pase.fin)!;
    expect(a5.etiqueta).toBe("5");
  });

  it("contraataque: pista completa en horizontal, 3 atacantes y 2 defensores", () => {
    const j = PLANTILLAS.find((p) => p.id === "plantilla-contraataque-3x2")!.crear();
    expect(j.cancha).toBe("completa");
    expect(j.orient).toBe("h");
    expect(j.pasos[0].piezas.filter((p) => p.tipo === "atq")).toHaveLength(3);
    expect(j.pasos[0].piezas.filter((p) => p.tipo === "def")).toHaveLength(2);
  });

  it("todas las piezas de las plantillas están dentro del área visible", () => {
    for (const pl of PLANTILLAS) {
      const j = pl.crear();
      const L = j.cancha === "media" ? 14 : 28;
      for (const s of j.pasos) {
        for (const p of s.piezas) {
          expect(p.x).toBeGreaterThanOrEqual(-CANCHA.MARGEN);
          expect(p.x).toBeLessThanOrEqual(L + CANCHA.MARGEN);
          expect(p.y).toBeGreaterThanOrEqual(-CANCHA.MARGEN);
          expect(p.y).toBeLessThanOrEqual(15 + CANCHA.MARGEN);
        }
      }
    }
  });
});

describe("aviso de copia de seguridad", () => {
  it("sin jugadas guardadas nunca toca recordar", () => {
    expect(tocaRecordarCopia(0, null, AHORA)).toBe(false);
    expect(tocaRecordarCopia(0, AHORA - 100 * DIA, AHORA)).toBe(false);
  });

  it("nunca hubo copia: toca desde 3 jugadas", () => {
    expect(tocaRecordarCopia(1, null, AHORA)).toBe(false);
    expect(tocaRecordarCopia(2, null, AHORA)).toBe(false);
    expect(tocaRecordarCopia(3, null, AHORA)).toBe(true);
    expect(tocaRecordarCopia(10, 0, AHORA)).toBe(true);
  });

  it("con copia: toca si tiene MÁS de 14 días", () => {
    expect(tocaRecordarCopia(1, AHORA - 14 * DIA, AHORA)).toBe(false);
    expect(tocaRecordarCopia(1, AHORA - 15 * DIA, AHORA)).toBe(true);
    expect(tocaRecordarCopia(5, AHORA - 2 * DIA, AHORA)).toBe(false);
    // fecha en el futuro (reloj cambiado): no se queja
    expect(tocaRecordarCopia(5, AHORA + 5 * DIA, AHORA)).toBe(false);
  });

  it("fechas inválidas cuentan como 'nunca'", () => {
    expect(diasDesdeCopia(NaN, AHORA)).toBeNull();
    expect(diasDesdeCopia(-5, AHORA)).toBeNull();
    expect(tocaRecordarCopia(3, NaN, AHORA)).toBe(true);
  });

  it("texto de la última copia", () => {
    expect(textoUltimaCopia(null, AHORA)).toMatch(/ninguna copia/);
    expect(textoUltimaCopia(AHORA - 1000, AHORA)).toBe("Última copia: hoy");
    expect(textoUltimaCopia(AHORA - DIA, AHORA)).toBe("Última copia: hace 1 día");
    expect(textoUltimaCopia(AHORA - 9 * DIA, AHORA)).toBe("Última copia: hace 9 días");
  });
});

describe("envolverTexto", () => {
  it("no corta palabras y respeta el máximo de líneas", () => {
    const l = envolverTexto("uno dos tres cuatro cinco seis siete ocho", 10);
    expect(l.every((x) => x.length <= 10)).toBe(true);
    expect(l.join(" ")).toBe("uno dos tres cuatro cinco seis siete ocho");
    expect(envolverTexto("a b c d e f g h i j", 3, 2)).toHaveLength(2);
  });
});
