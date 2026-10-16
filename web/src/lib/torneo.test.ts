import { describe, expect, it } from "vitest";
import {
  aEnlace,
  clasificacion,
  deEnlace,
  equiposDeTexto,
  etiqueta,
  fotoCruces,
  generar,
  horaDe,
  jornadas,
  limpiarCruces,
  normalizarTorneo,
  problemaFormato,
  repartirGrupos,
  resolver,
  type Formato,
  type Torneo,
} from "./torneo";

const base = (n: number, formato: Formato, pistas = 2): Torneo => {
  const t = { v: 1 as const, nombre: "Test", equipos: Array.from({ length: n }, (_, i) => `E${i + 1}`), formato, pistas, inicio: "10:00", duracion: 15, descanso: 5 };
  return { ...t, partidos: generar(t) };
};
const marcar = (t: Torneo, id: string, pa: number, pb: number) => {
  const p = t.partidos.find((x) => x.id === id)!;
  p.pa = pa;
  p.pb = pb;
};

describe("torneo", () => {
  it("todos contra todos: cada pareja una vez y nadie dos veces por jornada", () => {
    for (const n of [3, 4, 5, 8]) {
      const js = jornadas(Array.from({ length: n }, (_, i) => i));
      const parejas = js.flat().map(([a, b]) => [Math.min(a, b), Math.max(a, b)].join("-"));
      expect(new Set(parejas).size).toBe((n * (n - 1)) / 2);
      expect(parejas).toHaveLength((n * (n - 1)) / 2);
      for (const j of js) expect(new Set(j.flat()).size).toBe(j.length * 2);
    }
  });

  it("reparte en serpiente", () => {
    expect(repartirGrupos(8, 2)).toEqual([[0, 3, 4, 7], [1, 2, 5, 6]]);
    expect(repartirGrupos(7, 2).map((g) => g.length)).toEqual([3, 4]);
  });

  it("el horario no pone a un equipo dos veces a la vez, ni deja pistas vacías sin motivo", () => {
    for (const [n, f, pistas] of [[3, "liga", 1], [6, "liga", 2], [8, "g2-semis", 2], [16, "g4-cuartos", 3], [12, "g4-semis", 4]] as const) {
      const t = base(n, f, pistas);
      const porSlot = new Map<number, typeof t.partidos>();
      for (const p of t.partidos) porSlot.set(p.slot, [...(porSlot.get(p.slot) ?? []), p]);
      const ultimo = Math.max(...t.partidos.map((p) => p.slot));
      for (let s = 0; s <= ultimo; s++) {
        const ps = porSlot.get(s) ?? [];
        expect(ps.length, `${f} hueco ${s} vacío`).toBeGreaterThan(0);
        expect(ps.length).toBeLessThanOrEqual(pistas);
        expect(new Set(ps.map((p) => p.pista)).size).toBe(ps.length);
        const eqs = ps.flatMap((p) => [p.a, p.b]).filter((r) => "e" in r).map((r) => (r as { e: number }).e);
        expect(new Set(eqs).size).toBe(eqs.length);
      }
      // los cruces, siempre después de los grupos y por rondas
      const ultGrupo = Math.max(...t.partidos.filter((p) => p.g !== undefined).map((p) => p.slot));
      for (const p of t.partidos.filter((x) => x.r !== undefined)) expect(p.slot).toBeGreaterThan(ultGrupo);
    }
  });

  it("cuadro de 4 grupos: cuartos, semis y final, sin cruzar a dos del mismo grupo hasta la final", () => {
    const t = base(16, "g4-cuartos", 4);
    const cruces = t.partidos.filter((p) => p.r !== undefined);
    expect(cruces.map((p) => p.r)).toEqual([0, 0, 0, 0, 1, 1, 2]);
    expect(cruces.slice(0, 4).map((p) => [etiqueta(t, p.a), etiqueta(t, p.b)])).toEqual([
      ["1.º grupo A", "2.º grupo B"],
      ["1.º grupo C", "2.º grupo D"],
      ["1.º grupo B", "2.º grupo A"],
      ["1.º grupo D", "2.º grupo C"],
    ]);
    expect(etiqueta(t, cruces[6].a)).toBe("Ganador semi 1");
  });

  it("clasifica y desempata por el partido entre los empatados", () => {
    const t = base(3, "liga-final", 1);
    // E1 gana a E2, E2 gana a E3, E3 gana a E1: triple empate a una victoria → decide la diferencia entre ellos
    for (const p of t.partidos.filter((x) => x.g === 0)) {
      const [a, b] = [(p.a as { e: number }).e, (p.b as { e: number }).e];
      const gana = (x: number, y: number) => (x === 0 && y === 1) || (x === 1 && y === 2) || (x === 2 && y === 0);
      const dif = a === 0 || b === 0 ? (a === 2 || b === 2 ? 1 : 10) : 3;
      if (gana(a, b)) (p.pa = 20 + dif), (p.pb = 20);
      else (p.pa = 20), (p.pb = 20 + dif);
    }
    // E1: +10 −1 = +9 · E2: −10 +3 = −7 · E3: −3 +1 = −2
    expect(clasificacion(t, 0).map((f) => t.equipos[f.e])).toEqual(["E1", "E3", "E2"]);
    const final = t.partidos.find((p) => p.r === 0)!;
    expect([etiqueta(t, final.a), etiqueta(t, final.b)]).toEqual(["E1", "E3"]);
  });

  it("un cruce no se resuelve hasta que su grupo ha terminado, y se vacía si cambia quién pasa", () => {
    const t = base(4, "liga-final", 1);
    const grupo = t.partidos.filter((p) => p.g === 0);
    const final = t.partidos.find((p) => p.r === 0)!;
    grupo.slice(0, -1).forEach((p) => ((p.pa = 50), (p.pb = 40)));
    expect(resolver(t, final.a)).toBeNull();
    const ult = grupo[grupo.length - 1];
    ult.pa = 50;
    ult.pb = 40;
    expect(resolver(t, final.a)).not.toBeNull();
    final.pa = 30;
    final.pb = 20;
    const antes = fotoCruces(t);
    ult.pa = 10; // cambia el último resultado y con él la clasificación
    limpiarCruces(t, antes);
    if (JSON.stringify(fotoCruces(t)) !== JSON.stringify(antes)) expect(final.pa).toBeNull();
  });

  it("calcula la hora de cada hueco", () => {
    expect(horaDe({ inicio: "09:30", duracion: 20, descanso: 5 }, 3)).toBe("10:45");
  });

  it("comprueba que el formato cabe", () => {
    expect(problemaFormato(1, "liga")).toMatch(/al menos 2/);
    expect(problemaFormato(5, "g4-semis")).toMatch(/8 equipos/);
    expect(problemaFormato(8, "g4-cuartos")).toMatch(/3 equipos/);
    expect(problemaFormato(12, "g4-cuartos")).toBeNull();
    expect(problemaFormato(4, "liga-semis")).toBeNull();
  });

  it("lee los equipos sin repetidos ni vacíos", () => {
    expect(equiposDeTexto("Leones\n\n leones \nTigres")).toEqual(["Leones", "Tigres"]);
  });

  it("viaja por enlace con sus resultados, también con tildes y emojis", () => {
    const t = base(6, "g2-final", 2);
    t.nombre = "3x3 Fiesta Mayor 🏀";
    t.equipos[0] = "Peñíscola";
    marcar(t, t.partidos[0].id, 21, 15);
    const u = deEnlace(aEnlace(t))!;
    expect(u.nombre).toBe(t.nombre);
    expect(u.equipos).toEqual(t.equipos);
    expect(u.partidos[0]).toMatchObject({ pa: 21, pb: 15 });
    expect(deEnlace("basura")).toBeNull();
  });

  it("valida lo guardado", () => {
    expect(normalizarTorneo({ equipos: ["a"], formato: "liga" })).toBeNull();
    const t = normalizarTorneo({ equipos: ["a", "b", "c"], formato: "inventado", pistas: 99, partidos: [{ id: "p0", pa: 3, pb: 1 }, { id: "p1", pa: -1, pb: 2 }] })!;
    expect(t.formato).toBe("liga");
    expect(t.pistas).toBe(8);
    expect(t.partidos[0]).toMatchObject({ pa: 3, pb: 1 });
    expect(t.partidos[1]).toMatchObject({ pa: null, pb: null });
  });
});
