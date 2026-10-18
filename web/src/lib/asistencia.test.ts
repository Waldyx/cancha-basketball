import { describe, expect, it } from "vitest";
import { SIGUIENTE, fechaHumana, normalizarStoreAsistencia, plantilla, resumen, textoConvocatoria, type Sesion } from "./asistencia";

describe("asistencia", () => {
  it("guarda la convocatoria y descarta lo raro", () => {
    const st = normalizarStoreAsistencia({ conv: { rival: "CB X", notas: "n".repeat(400), hora: 5, fuera: ["Pau", 3] } });
    expect(st.conv).toMatchObject({ rival: "CB X", hora: "", fuera: ["Pau"] });
    expect(st.conv.notas).toHaveLength(300);
    expect(normalizarStoreAsistencia(null).conv.fuera).toEqual([]);
  });

  it("lee la plantilla sin líneas vacías y sin perder a quien repite nombre", () => {
    expect(plantilla("4 Laia\n\n7 Marc\n4 Laia\n  9 Nora  ")).toEqual(["4 Laia", "7 Marc", "4 Laia (2)", "9 Nora"]);
  });

  it("calcula el % de asistencia sin que las faltas justificadas cuenten en contra", () => {
    const ses: Sesion[] = [
      { id: "1", fecha: "2026-10-01", lista: { "4 Laia": "si", "7 Marc": "no" } },
      { id: "2", fecha: "2026-10-03", lista: { "4 Laia": "si", "7 Marc": "just" } },
      { id: "3", fecha: "2026-10-06", lista: { "4 Laia": "no", "7 Marc": "si" } },
    ];
    expect(resumen(["4 Laia", "7 Marc", "9 Nora"], ses)).toEqual([
      { jugador: "4 Laia", si: 2, no: 1, just: 0, pct: 67 },
      { jugador: "7 Marc", si: 1, no: 1, just: 1, pct: 50 },
      { jugador: "9 Nora", si: 0, no: 0, just: 0, pct: null },
    ]);
  });

  it("rota el estado con cada toque", () => {
    expect([SIGUIENTE[""], SIGUIENTE.si, SIGUIENTE.no, SIGUIENTE.just]).toEqual(["si", "no", "just", ""]);
  });

  it("escribe la fecha en castellano sin depender de la zona horaria", () => {
    expect(fechaHumana("2026-10-18")).toBe("domingo 18 de octubre");
    expect(fechaHumana("2026-10-17")).toBe("sábado 17 de octubre");
    expect(fechaHumana("mal")).toBe("");
  });

  it("monta el mensaje de la convocatoria", () => {
    const t = textoConvocatoria({ equipo: "Infantil A", rival: "CB Mataró", fecha: "2026-10-17", hora: "10:00", quedada: "9:15", lugar: "Pavelló Municipal", equipacion: "Blanca", notas: "Traed agua.", convocados: ["4 Laia", "7 Marc"] });
    expect(t).toBe(
      "🏀 *Convocatoria Infantil A*\nvs CB Mataró · sábado 17 de octubre · a las 10:00\n📍 Pavelló Municipal\n⏰ Quedamos a las 9:15\n👕 Blanca\n\n*Convocados (2):*\n• 4 Laia\n• 7 Marc\n\nTraed agua."
    );
    expect(textoConvocatoria({ equipo: "", rival: "", fecha: "", hora: "", quedada: "", lugar: "", equipacion: "", notas: "", convocados: [] })).toBe("🏀 *Convocatoria*");
  });

  it("valida lo guardado", () => {
    const st = normalizarStoreAsistencia({ jugadores: "4 Laia", sesiones: [{ id: "a", fecha: "2026-10-01", lista: { "4 Laia": "si", x: "quizá" } }, { fecha: "ayer" }, { id: "b", fecha: "2026-10-05", lista: {} }] });
    expect(st.sesiones.map((s) => s.id)).toEqual(["b", "a"]);
    expect(st.sesiones[1].lista).toEqual({ "4 Laia": "si" });
    expect(normalizarStoreAsistencia(7)).toMatchObject({ v: 1, jugadores: "", sesiones: [] });
  });
});
