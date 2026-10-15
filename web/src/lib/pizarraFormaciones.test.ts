import { describe, expect, it } from "vitest";
import { CANCHA, dist, flechaPorDefecto, nuevaJugada, normalizarJugada, portadorDe, tieneBalon, type Paso, type Pieza } from "./pizarra";
import { FORMACIONES, aplicarFormacion, aroDe, defensaIndividual, formacionPorId } from "./pizarraFormaciones";
import { RADIO_PIEZA } from "./pizarraRender";

const pz = (id: string, tipo: Pieza["tipo"], etiqueta: string, x: number, y: number): Pieza => ({ id, tipo, etiqueta, x, y });
const paso = (piezas: Pieza[]): Paso => ({ piezas, lineas: [], textos: [], nota: "" });

describe("formaciones: colocación", () => {
  it("hay ataque (1-3-1, 1-4 alto, 2-3, 1-2-2, cuernos, caja, línea) y defensa (individual, 2-3, 3-2, 1-3-1, presión)", () => {
    const ids = FORMACIONES.map((f) => f.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(FORMACIONES.filter((f) => f.lado === "ataque")).toHaveLength(7);
    expect(FORMACIONES.filter((f) => f.lado === "defensa")).toHaveLength(5);
    expect(formacionPorId("def-presion-1-2-1-1")?.cancha).toBe("completa");
  });

  it("cada ataque tiene 5 jugadores (1..5) y un balón junto a su portador", () => {
    for (const f of FORMACIONES.filter((x) => x.lado === "ataque")) {
      const s = f.slots([]);
      const at = s.filter((x) => x.tipo === "atq");
      expect(at.map((a) => a.etiqueta).sort(), f.id).toEqual(["1", "2", "3", "4", "5"]);
      const balon = s.filter((x) => x.tipo === "balon");
      expect(balon, f.id).toHaveLength(1);
      expect(Math.min(...at.map((a) => dist(a, balon[0]))), f.id).toBeLessThanOrEqual(1.3);
    }
  });

  it("todo está dentro de la pista (salvo el que saca, que va fuera de la línea de fondo) y en la mitad de la canasta", () => {
    for (const f of FORMACIONES.filter((x) => x.id !== "def-individual")) {
      const L = f.cancha === "media" ? CANCHA.MEDIA : CANCHA.LARGO;
      for (const s of f.slots([])) {
        if (s.fuera || (s.tipo === "balon" && f.id.startsWith("atq-saque"))) {
          expect(s.x, `${f.id} ${s.etiqueta}`).toBeLessThan(0);
          expect(s.x).toBeGreaterThan(-CANCHA.MARGEN);
          continue;
        }
        expect(s.x, `${f.id} ${s.etiqueta} x`).toBeGreaterThanOrEqual(0);
        expect(s.x, `${f.id} ${s.etiqueta} x`).toBeLessThanOrEqual(L);
        expect(s.y, `${f.id} ${s.etiqueta} y`).toBeGreaterThanOrEqual(0);
        expect(s.y, `${f.id} ${s.etiqueta} y`).toBeLessThanOrEqual(CANCHA.ANCHO);
      }
    }
  });

  it("ninguna formación solapa a dos jugadores (las fichas no se montan)", () => {
    for (const f of FORMACIONES.filter((x) => x.id !== "def-individual")) {
      const s = f.slots([]).filter((x) => x.tipo !== "balon");
      for (let i = 0; i < s.length; i++) {
        for (let k = i + 1; k < s.length; k++) {
          expect(dist(s[i], s[k]), `${f.id} ${s[i].etiqueta}-${s[k].etiqueta}`).toBeGreaterThanOrEqual(RADIO_PIEZA * 2);
        }
      }
    }
  });

  it("los exteriores quedan fuera de la línea de 3 (6,75 m) y las esquinas detrás de ella", () => {
    const aro = { x: CANCHA.ARO_X, y: 7.5 };
    const s = formacionPorId("atq-cuernos")!.slots([]);
    expect(dist(s.find((x) => x.etiqueta === "1")!, aro)).toBeGreaterThan(6.75);
    for (const e of ["2", "3"]) {
      const c = s.find((x) => x.etiqueta === e)!;
      expect(Math.min(c.y, 15 - c.y)).toBeLessThan(0.9); // detrás de la línea recta de la esquina
    }
    const a131 = formacionPorId("atq-1-3-1")!.slots([]);
    for (const e of ["2", "3"]) expect(dist(a131.find((x) => x.etiqueta === e)!, aro)).toBeGreaterThan(6.75);
  });

  it("la zona 2-3 deja dos arriba y tres abajo, y la 3-2 al revés", () => {
    const z23 = formacionPorId("def-zona-2-3")!.slots([]);
    expect(z23.filter((s) => s.x > 5)).toHaveLength(2);
    expect(z23.filter((s) => s.x < 5)).toHaveLength(3);
    const z32 = formacionPorId("def-zona-3-2")!.slots([]);
    expect(z32.filter((s) => s.x > 5)).toHaveLength(3);
    expect(z32.filter((s) => s.x < 5)).toHaveLength(2);
  });

  it("la presión 1-2-1-1 reparte a los cinco por la pista completa, de la canasta a la otra mitad", () => {
    const s = formacionPorId("def-presion-1-2-1-1")!.slots([]);
    expect(s).toHaveLength(5);
    expect(Math.max(...s.map((x) => x.x))).toBeGreaterThan(CANCHA.MEDIA);
    const orden = s.map((x) => x.x);
    expect(orden[0]).toBeLessThan(orden[1]);
    expect(orden[3]).toBeLessThan(orden[4]);
  });
});

describe("defensa individual", () => {
  const atacantes = [pz("a1", "atq", "1", 9.2, 7.5), pz("a2", "atq", "2", 6.6, 2.2), pz("a3", "atq", "3", 6.6, 12.8), pz("a4", "atq", "4", 5.8, 5.05), pz("a5", "atq", "5", 2.6, 7.5)];

  it("cada defensor queda entre su par y el aro", () => {
    const aro = aroDe(atacantes, "media");
    const slots = defensaIndividual(atacantes, "media");
    expect(slots.map((s) => s.etiqueta)).toEqual(["X1", "X2", "X3", "X4", "X5"]);
    atacantes.forEach((a, i) => {
      const d = slots[i];
      expect(dist(d, aro), `X${i + 1}`).toBeLessThan(dist(a, aro));
      expect(dist(d, a)).toBeGreaterThanOrEqual(0.99);
      expect(dist(d, a)).toBeLessThan(1.5);
    });
  });

  it("en pista completa defiende la canasta del lado donde está el ataque", () => {
    const der = atacantes.map((a) => ({ ...a, x: 28 - a.x }));
    expect(aroDe(der, "completa").x).toBeCloseTo(28 - CANCHA.ARO_X);
    const s = defensaIndividual(der, "completa");
    expect(s[0].x).toBeGreaterThan(der[0].x);
  });

  it("sin atacantes no inventa nada", () => {
    expect(defensaIndividual([], "media")).toEqual([]);
  });
});

describe("aplicarFormacion", () => {
  it("crea las piezas que faltan y las deja iguales en los pasos siguientes", () => {
    let j = nuevaJugada({ pasos: [paso([]), paso([])] });
    j = aplicarFormacion(j, 0, formacionPorId("atq-1-3-1")!).jugada;
    expect(j.pasos[0].piezas).toHaveLength(6);
    expect(j.pasos[1].piezas).toHaveLength(6);
    expect(j.pasos[1].piezas.map((p) => p.id).sort()).toEqual(j.pasos[0].piezas.map((p) => p.id).sort());
    expect(normalizarJugada(j)).not.toBeNull();
  });

  it("mueve las piezas existentes conservando su id y quita solo las líneas que salían de ellas", () => {
    const base = nuevaJugada({
      pasos: [
        {
          piezas: [pz("a1", "atq", "1", 3, 3), pz("a2", "atq", "2", 4, 4), pz("b", "balon", "", 3.5, 3.4), pz("d1", "def", "X1", 5, 5)],
          lineas: [
            { id: "l1", tipo: "corte", ref: "a1", pts: [{ x: 3, y: 3 }, { x: 5, y: 5 }] },
            { id: "l2", tipo: "corte", ref: "d1", pts: [{ x: 5, y: 5 }, { x: 6, y: 6 }] },
          ],
          textos: [],
          nota: "",
        },
      ],
    });
    const r = aplicarFormacion(base, 0, formacionPorId("atq-cuernos")!);
    const p = r.jugada.pasos[0];
    expect(p.piezas.filter((x) => x.tipo === "atq")).toHaveLength(5);
    expect(p.piezas.filter((x) => x.tipo === "balon")).toHaveLength(1);
    const a1 = p.piezas.find((x) => x.id === "a1")!;
    expect(a1.x).toBeCloseTo(9.2);
    expect(p.lineas.map((l) => l.id)).toEqual(["l2"]);
    expect(r.lineasQuitadas).toBe(1);
    expect(p.piezas.find((x) => x.id === "d1")).toBeDefined(); // el defensor no se toca
  });

  it("el balón queda junto al jugador 1 y lo lleva", () => {
    const r = aplicarFormacion(nuevaJugada(), 0, formacionPorId("atq-1-2-2")!).jugada.pasos[0];
    const balon = r.piezas.find((x) => x.tipo === "balon")!;
    expect(portadorDe(r, balon)?.etiqueta).toBe("1");
  });

  it("la presión cambia la pista a completa y el espejo la lleva a la otra canasta", () => {
    const j = nuevaJugada({ cancha: "media" });
    const izq = aplicarFormacion(j, 0, formacionPorId("def-presion-1-2-1-1")!).jugada;
    expect(izq.cancha).toBe("completa");
    const der = aplicarFormacion(j, 0, formacionPorId("def-presion-1-2-1-1")!, { espejo: true }).jugada;
    const x1i = izq.pasos[0].piezas.find((p) => p.etiqueta === "X1")!.x;
    const x1d = der.pasos[0].piezas.find((p) => p.etiqueta === "X1")!.x;
    expect(x1i + x1d).toBeCloseTo(CANCHA.LARGO);
  });

  it("el espejo no hace nada en media pista", () => {
    const a = aplicarFormacion(nuevaJugada({ cancha: "media" }), 0, formacionPorId("atq-1-3-1")!, { espejo: true }).jugada;
    expect(a.pasos[0].piezas.find((p) => p.etiqueta === "1")!.x).toBeCloseTo(9.2);
  });

  it("la defensa individual se coloca sobre los atacantes ya puestos", () => {
    let j = aplicarFormacion(nuevaJugada(), 0, formacionPorId("atq-1-3-1")!).jugada;
    j = aplicarFormacion(j, 0, formacionPorId("def-individual")!).jugada;
    const p = j.pasos[0];
    expect(p.piezas.filter((x) => x.tipo === "def")).toHaveLength(5);
    const x1 = p.piezas.find((x) => x.etiqueta === "X1")!;
    const a1 = p.piezas.find((x) => x.etiqueta === "1")!;
    expect(dist(x1, a1)).toBeLessThan(1.5);
    // aplicarla dos veces no duplica
    j = aplicarFormacion(j, 0, formacionPorId("def-individual")!).jugada;
    expect(j.pasos[0].piezas.filter((x) => x.tipo === "def")).toHaveLength(5);
  });
});

describe("flecha por defecto del modo tiempo muerto", () => {
  const p = paso([pz("a1", "atq", "1", 8, 7), pz("a2", "atq", "2", 5, 3), pz("b", "balon", "", 8.5, 7.4), pz("d1", "def", "X1", 3, 9)]);

  it("quien tiene el balón: bote; si suelta sobre un compañero: pase", () => {
    const a1 = p.piezas[0];
    expect(tieneBalon(p, a1)).toBe(true);
    expect(flechaPorDefecto(p, a1).tipo).toBe("bote");
    expect(flechaPorDefecto(p, a1, { x: 5.1, y: 3.1 }).tipo).toBe("pase");
    expect(flechaPorDefecto(p, a1, { x: 3, y: 12 }).tipo).toBe("bote");
  });

  it("quien no lo tiene: desplazamiento", () => {
    expect(tieneBalon(p, p.piezas[1])).toBe(false);
    expect(flechaPorDefecto(p, p.piezas[1]).tipo).toBe("corte");
    expect(flechaPorDefecto(p, p.piezas[3]).tipo).toBe("corte");
  });

  it("arrastrar el propio balón dibuja un pase que sale de quien lo lleva", () => {
    const f = flechaPorDefecto(p, p.piezas[2]);
    expect(f.tipo).toBe("pase");
    expect(f.origen.id).toBe("a1");
  });
});
