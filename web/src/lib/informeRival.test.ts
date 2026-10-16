import { describe, expect, it } from "vitest";
import { lineaVacia } from "./statsEquipo";
import { actaDeFeb, actaPegada, equipoDelRival, informe, normalizarStoreRival, type ActaFeb, type JugadorActa } from "./informeRival";

const j = (nombre: string, dorsal: string, l: Partial<JugadorActa>): JugadorActa => ({ ...lineaVacia(), nombre, dorsal, min: 20, ...l });

const acta1: ActaFeb = {
  partido: "123456",
  fecha: "2026-10-04",
  equipos: [
    { nombre: "CB MATARÓ", pts: 62, jugadores: [j("GARCIA LOPEZ, PAU", "7", { t2c: 6, t2i: 10, t3c: 2, t3i: 5, tlc: 2, tli: 4, fal: 4, ro: 3 }), j("RUIZ, MARC", "10", { t2c: 2, t2i: 6 }), j("BANQUILLO, NO JUGÓ", "15", { min: 0 })] },
    { nombre: "AB PREMIÀ", pts: 58, jugadores: [j("ALGUIEN", "4", { t2c: 1, t2i: 2 })] },
  ],
};

describe("informe del rival", () => {
  it("encuentra al rival dentro del acta de la FEB, solo si no hay duda", () => {
    expect(equipoDelRival(acta1, "Mataró")).toBe(0);
    expect(equipoDelRival(acta1, "ab premia")).toBe(1);
    expect(equipoDelRival(acta1, "Sant Andreu")).toBe(-1);
    expect(equipoDelRival(acta1, "")).toBe(-1);
  });

  it("convierte el acta de la FEB y descarta a quien no jugó", () => {
    const a = actaDeFeb(acta1, 0);
    expect(a).toMatchObject({ id: "feb-123456", contra: "AB PREMIÀ", ptsRival: 62, ptsContra: 58 });
    expect(a.jugadores.map((x) => x.nombre)).toEqual(["GARCIA LOPEZ, PAU", "RUIZ, MARC"]);
  });

  it("junta varios partidos, saca medias por jugador y el balance", () => {
    const a = actaDeFeb(acta1, 0);
    // segundo partido pegado: el mismo jugador escrito de otra forma
    const b = actaPegada([j("Pau García López", "7", { t2c: 4, t2i: 8, t3c: 3, t3i: 6, tlc: 1, tli: 4, fal: 3, ro: 2 })], { fecha: "2026-10-11", contra: "CB X", ptsRival: 50, ptsContra: 55 });
    const inf = informe([a, b]);
    expect(inf).toMatchObject({ partidos: 2, victorias: 1, derrotas: 1, ptsFavor: 56, ptsContra: 56.5 });
    const pau = inf.jugadores[0];
    expect(pau).toMatchObject({ pj: 2, pct3: 45 }); // 5/11
    expect(pau.pts).toBe(19); // (12 + 6 + 2) + (8 + 9 + 1) = 38 en 2 partidos
  });
});

describe("informe del rival: cuentas y pistas", () => {
  it("calcula los puntos con las fórmulas de estadísticas", () => {
    const inf = informe([actaPegada([j("A", "1", { t2c: 2, t2i: 4, t3c: 1, t3i: 2, tlc: 3, tli: 4 })], { fecha: "", contra: "", ptsRival: null, ptsContra: null })]);
    expect(inf.jugadores[0].pts).toBe(10);
    expect(inf.ptsFavor).toBeNull();
    expect(inf.victorias + inf.derrotas).toBe(0);
  });

  it("da pistas solo cuando hay motivo", () => {
    const tirador = j("TIRADOR", "3", { t3c: 3, t3i: 6, t2c: 1, t2i: 2 });
    const faltas = j("PIVOT", "15", { fal: 4, ro: 3, t2c: 3, t2i: 6, tli: 5, tlc: 2 });
    const inf = informe([actaPegada([tirador, faltas], { fecha: "", contra: "", ptsRival: null, ptsContra: null })]);
    const t = inf.claves.join(" | ");
    expect(t).toMatch(/TIRADOR tira de tres con acierto \(3\/6, 50 %\)/);
    expect(t).toMatch(/PIVOT se carga de faltas/);
    expect(t).toMatch(/PIVOT va mucho a la línea pero falla libres \(40 %\)/);
    expect(t).toMatch(/PIVOT coge muchos rebotes ofensivos/);
    const tranquilo = informe([actaPegada([j("NORMAL", "4", { t2c: 2, t2i: 4 })], { fecha: "", contra: "", ptsRival: null, ptsContra: null })]);
    expect(tranquilo.claves).toHaveLength(1); // solo el anotador principal
    // muestra pequeña: un 1/3 no convierte a nadie en tirador, ni 3 faltas en un problema de faltas
    const poco = informe([actaPegada([j("UNO DE TRES", "5", { t3c: 1, t3i: 3, fal: 3 })], { fecha: "", contra: "", ptsRival: null, ptsContra: null })]);
    expect(poco.claves.join(" ")).not.toMatch(/tira de tres|se carga de faltas/);
  });

  it("valida lo guardado", () => {
    const st = normalizarStoreRival({
      activo: "r1",
      rivales: [{ id: "r1", nombre: "CB Mataró", actas: [{ id: "a", fecha: "2026-10-04", contra: "X", ptsRival: "62", ptsContra: null, origen: "feb", jugadores: [{ nombre: "PAU", dorsal: "07", t2c: 3, t2i: -2 }, { sinNombre: true }] }, { jugadores: [] }] }, "basura"],
    });
    expect(st.rivales).toHaveLength(1);
    expect(st.rivales[0].actas).toHaveLength(1);
    expect(st.rivales[0].actas[0]).toMatchObject({ ptsRival: 62, ptsContra: null });
    expect(st.rivales[0].actas[0].jugadores[0]).toMatchObject({ dorsal: "7", t2c: 3, t2i: 0 });
    expect(normalizarStoreRival(null)).toEqual({ v: 1, activo: "", rivales: [] });
  });
});
