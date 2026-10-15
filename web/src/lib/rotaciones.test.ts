import { describe, expect, it } from "vitest";
import { REGLAS, evaluar, proponerRotacion, reglaPersonalizada, viabilidad, type Jugador, type Marcas } from "./rotaciones";

const plantilla = (n: number): Jugador[] => Array.from({ length: n }, (_, i) => ({ id: `j${i + 1}`, nombre: `Jugador ${i + 1}` }));
const regla = (id: string) => REGLAS.find((r) => r.id === id)!;

describe("rotaciones: viabilidad", () => {
  it("minibàsquet FCBQ se puede cumplir de 8 a 12 jugadores, y no fuera de ese rango", () => {
    const r = regla("fcbq-mini");
    for (let n = 8; n <= 12; n++) expect(viabilidad(r, n)).toBeNull();
    expect(viabilidad(r, 7)).toMatch(/máximo de 5/);
    expect(viabilidad(r, 13)).toMatch(/3 inicios/);
  });

  it("passarel·la FCBQ se puede cumplir de 8 a 15 jugadores", () => {
    const r = regla("fcbq-passarela");
    for (let n = 8; n <= 15; n++) expect(viabilidad(r, n)).toBeNull();
    expect(viabilidad(r, 7)).not.toBeNull();
  });
});

describe("rotaciones: propuesta", () => {
  for (const r of REGLAS) {
    it(`${r.nombre}: la propuesta cumple la regla en todo el rango viable`, () => {
      for (let n = 5; n <= 15; n++) {
        if (viabilidad(r, n)) continue;
        const js = plantilla(n);
        const inf = evaluar(r, js, proponerRotacion(r, js));
        expect(inf.periodos.every((p) => p.ok), `${r.id} n=${n} períodos`).toBe(true);
        expect(inf.jugadores.filter((j) => j.estado === "incumple" || j.estado === "pendiente"), `${r.id} n=${n}`).toEqual([]);
      }
    });
  }

  it("con 12 jugadores en mini, un único jugador hace su 3.er inicio en el 8.º", () => {
    const r = regla("fcbq-mini");
    const js = plantilla(12);
    const m = proponerRotacion(r, js);
    const conTercerEnOctavo = js.filter((j) => m[j.id].slice(0, 7).filter((x) => x === "I").length === 2 && m[j.id][7] === "I");
    expect(conTercerEnOctavo).toHaveLength(1);
  });

  it("una regla personalizada también se cumple", () => {
    const r = reglaPersonalizada({ periodos: 4, minInicios: 1, inicioHasta: 3, maxParticipaciones: 3, maxHasta: 4 });
    for (let n = 7; n <= 15; n++) {
      const js = plantilla(n);
      const inf = evaluar(r, js, proponerRotacion(r, js));
      expect(inf.jugadores.every((j) => j.estado === "ok" || j.estado === "tope"), `n=${n}`).toBe(true);
    }
  });
});

describe("rotaciones: avisos en directo", () => {
  const r = regla("fcbq-mini");
  const js = plantilla(10);

  it("avisa de lo que falta, del tope y de lo que ya no tiene arreglo", () => {
    const m: Marcas = {
      j1: ["I", "I", "I", "I", "I", "", "", ""], // en el máximo
      j2: ["I", "", "", "", "", "", "", ""], // le faltan 2 y tiene tiempo
      j3: ["E", "E", "E", "E", "E", "", "", ""], // 5 participaciones sin inicios: ya no llega
      j4: ["I", "E", "I", "E", "I", "I", "", ""], // 6 períodos: se pasa
    };
    const inf = evaluar(r, js, m);
    const de = (id: string) => inf.jugadores.find((j) => j.id === id)!;
    expect(de("j1").estado).toBe("tope");
    expect(de("j2")).toMatchObject({ estado: "pendiente", faltan: 2 });
    expect(de("j3").estado).toBe("incumple");
    expect(de("j4").estado).toBe("incumple");
    expect(inf.periodos[0]).toMatchObject({ inicio: 3, ok: false });
  });

  it("una entrada con el período empezado cuenta como participación pero no como inicio", () => {
    const inf = evaluar(r, js, { j1: ["E", "I", "", "", "", "", "", ""] });
    expect(inf.jugadores[0]).toMatchObject({ inicios: 1, participaciones: 2 });
  });

  it("la regla personalizada se ajusta a valores coherentes", () => {
    const p = reglaPersonalizada({ periodos: 99, minInicios: 50, inicioHasta: 0 });
    expect(p.periodos).toBe(10);
    expect(p.inicioHasta).toBe(1);
    expect(p.minInicios).toBe(1);
  });
});
