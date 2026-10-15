import { describe, expect, it } from "vitest";
import { anadirRama, nuevaJugada, type Jugada } from "./pizarra";
import { asignarNombres, equiposDeTexto, mapaNombres, nombreCorto, quitarNombres } from "./pizarraEquipo";
import { OPCIONES_POR_PAGINA, paginar, prepararBanquillo, tarjeta } from "./pizarraBanquillo";
import { PLANTILLAS } from "./pizarraPlantillas";

const STORE = JSON.stringify({
  activo: "e1",
  equipos: [
    {
      id: "e1",
      nombre: "Infantil A",
      categoria: "Infantil",
      jugadores: [
        { id: "j1", dorsal: "4", nombre: "Marta Pérez" },
        { id: "j2", dorsal: "07", nombre: "Pablo García" },
        { id: "j3", dorsal: "10", nombre: "Pablo Gómez" },
        { id: "j4", dorsal: "", nombre: "Sin dorsal" },
        { id: "j5", dorsal: "12", nombre: "" },
        { id: "j6", dorsal: "9", nombre: "Maximiliano Fernández Quiroga" },
      ],
      partidos: [],
    },
    { id: "e2", nombre: "Vacío", categoria: "", jugadores: [], partidos: [] },
  ],
});

describe("plantilla del modo Equipo", () => {
  it("lee los equipos con jugadores válidos y descarta el resto", () => {
    const eqs = equiposDeTexto(STORE);
    expect(eqs).toHaveLength(1);
    expect(eqs[0].nombre).toBe("Infantil A");
    expect(eqs[0].jugadores.map((j) => j.dorsal)).toEqual(["4", "7", "10", "9"]); // "07" -> "7"
  });

  it("nunca lanza con basura, vacío o JSON roto", () => {
    expect(equiposDeTexto(null)).toEqual([]);
    expect(equiposDeTexto("")).toEqual([]);
    expect(equiposDeTexto("{no es json")).toEqual([]);
    expect(equiposDeTexto('"hola"')).toEqual([]);
    expect(equiposDeTexto('{"equipos":"no"}')).toEqual([]);
    expect(equiposDeTexto('{"equipos":[1,null,{"jugadores":"x"}]}')).toEqual([]);
  });

  it("nombre corto: el primer nombre; con repetidos, la inicial del apellido; nunca más de 12", () => {
    const todos = ["Marta Pérez", "Pablo García", "Pablo Gómez", "Maximiliano Fernández Quiroga"];
    expect(nombreCorto("Marta Pérez", todos)).toBe("Marta");
    expect(nombreCorto("Pablo García", todos)).toBe("Pablo G.");
    expect(nombreCorto("Pablo Gómez", todos)).toBe("Pablo G.");
    expect(nombreCorto("Maximiliano Fernández Quiroga", todos)).toBe("Maximiliano");
    expect(nombreCorto("Maximiliano Fernández Quiroga", todos).length).toBeLessThanOrEqual(12);
    expect(nombreCorto("   ", [])).toBe("");
    expect(nombreCorto("Ana", ["Ana", "ana López"])).toBe("Ana");
  });

  it("mapa dorsal -> nombre, y el primero gana si el dorsal se repite", () => {
    const m = mapaNombres({ id: "x", nombre: "x", categoria: "", jugadores: [{ dorsal: "5", nombre: "Uno" }, { dorsal: "5", nombre: "Dos" }, { dorsal: "6", nombre: "Tres" }] });
    expect(m.get("5")).toBe("Uno");
    expect(m.get("6")).toBe("Tres");
  });
});

describe("asignar nombres a los números", () => {
  const mapa = mapaNombres(equiposDeTexto(STORE)[0]);

  function plantel(): Jugada {
    const j = PLANTILLAS.find((p) => p.id === "plantilla-pick-and-roll")!.crear();
    return j;
  }

  it("pone el nombre a los atacantes con ese número en TODOS los pasos, y no toca a los defensores", () => {
    const { jugada, asignados, sinNombre } = asignarNombres(plantel(), mapa);
    expect(asignados).toBe(1); // solo el 4 está en la plantilla de la jugada (la plantilla es 1..5)
    for (const s of jugada.pasos) {
      expect(s.piezas.find((p) => p.etiqueta === "4")!.nombre).toBe("Marta");
      for (const d of s.piezas.filter((p) => p.tipo === "def")) expect(d.nombre).toBeUndefined();
    }
    expect(sinNombre.sort()).toEqual(["1", "2", "3", "5"]);
  });

  it("también llega a las lecturas alternativas", () => {
    const j = anadirRama(plantel(), 0, "B").jugada;
    const { jugada } = asignarNombres(j, mapa);
    expect(jugada.ramas![0].pasos[0].piezas.find((p) => p.etiqueta === "4")!.nombre).toBe("Marta");
  });

  it("el dorsal 07 casa con el número 7 de la pizarra", () => {
    let j = nuevaJugada();
    j.pasos[0].piezas.push({ id: "p7", tipo: "atq", etiqueta: "7", x: 5, y: 5 });
    const r = asignarNombres(j, mapa);
    expect(r.jugada.pasos[0].piezas[0].nombre).toBe("Pablo G.");
  });

  it("quitar los nombres los deja como antes", () => {
    const { jugada } = asignarNombres(plantel(), mapa);
    const r = quitarNombres(jugada);
    expect(r.quitados).toBe(1);
    expect(r.jugada.pasos.every((s) => s.piezas.every((p) => p.nombre === undefined))).toBe(true);
  });

  it("no modifica la jugada original", () => {
    const j = plantel();
    const antes = JSON.stringify(j);
    asignarNombres(j, mapa);
    expect(JSON.stringify(j)).toBe(antes);
  });
});

describe("hoja de banquillo", () => {
  const diez = (): Jugada[] => Array.from({ length: 10 }, (_, i) => ({ ...PLANTILLAS[i % PLANTILLAS.length].crear(), id: "j" + i, nombre: "Jugada " + (i + 1) }));

  it("reparte 4 o 6 jugadas por página y la última puede quedar corta", () => {
    expect(OPCIONES_POR_PAGINA).toEqual([4, 6]);
    expect(paginar([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 4).map((p) => p.length)).toEqual([4, 4, 2]);
    expect(paginar([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6).map((p) => p.length)).toEqual([6, 4]);
    expect(paginar([], 4)).toEqual([]);
    expect(paginar([1], 4)).toEqual([[1]]);
  });

  it("prepara una tarjeta por jugada con el nombre, la categoría y el dibujo", () => {
    const h = prepararBanquillo(diez(), 6, "todos");
    expect(h.total).toBe(10);
    expect(h.paginas.map((p) => p.length)).toEqual([6, 4]);
    const t = h.paginas[0][0];
    expect(t.nombre).toBe("Jugada 1");
    expect(t.meta).toMatch(/^Ataque · 3 pasos$/);
    expect(t.svg.startsWith("<svg")).toBe(true);
  });

  it("«todos» superpone las flechas de todos los pasos y «último» dibuja solo el último", () => {
    const j = PLANTILLAS.find((p) => p.id === "plantilla-pick-and-roll")!.crear();
    const todos = tarjeta(j, "todos").svg;
    const ultimo = tarjeta(j, "ultimo").svg;
    // el pick and roll tiene 1 línea en el paso 1, 2 en el 2 y 2 en el 3: 5 trazos de línea frente a 2
    const lineas = (s: string) => (s.match(/stroke-linecap="round" stroke-linejoin="round"/g) ?? []).length;
    expect(lineas(todos)).toBeGreaterThan(lineas(ultimo));
    expect(todos).not.toBe(ultimo);
  });

  it("indica si la jugada tiene lecturas", () => {
    const j = anadirRama(PLANTILLAS[0].crear(), 0, "B").jugada;
    expect(tarjeta(j, "todos").lecturas).toBe("2 lecturas");
    expect(tarjeta(PLANTILLAS[0].crear(), "todos").lecturas).toBe("");
  });

  it("el nombre de una jugada hostil no se interpreta: la tarjeta lo guarda como texto y el SVG no lo contiene", () => {
    const j = { ...PLANTILLAS[0].crear(), nombre: "<img src=x onerror=alert(1)>" };
    const t = tarjeta(j, "todos");
    expect(t.nombre).toBe("<img src=x onerror=alert(1)>"); // el DOM lo pone con textContent
    expect(t.svg).not.toContain("<img");
  });
});
