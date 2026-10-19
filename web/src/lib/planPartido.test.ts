import { describe, expect, it } from "vitest";
import { lineaVacia } from "./statsEquipo";
import { actaPegada, type JugadorActa, type Rival } from "./informeRival";
import { cabecera, clavesDelRival, reengancharJugadas, fechaLarga, jugadoresRival, normalizarStorePlan, planVacio, secciones, textoParaEquipo } from "./planPartido";

const j = (nombre: string, dorsal: string, l: Partial<JugadorActa>): JugadorActa => ({ ...lineaVacia(), nombre, dorsal, min: 20, ...l });
const rival: Rival = {
  id: "r1",
  nombre: "CB Mataró",
  actas: [
    actaPegada([j("Pau Ruiz", "7", { t2c: 8, t2i: 14, t3c: 3, t3i: 6, fal: 4 }), j("Pau", "", { t2c: 1, t2i: 3 }), j("Marc", "10", { t2c: 2, t2i: 5 })], { fecha: "2026-10-04", contra: "X", ptsRival: 50, ptsContra: 40 }),
  ],
};

describe("plan de partido", () => {
  it("usa el dorsal del rival y no su nombre", () => {
    expect(jugadoresRival(rival).map((x) => x.etiqueta)).toEqual(["#7", "#10", "P."]);
    const claves = clavesDelRival(rival);
    expect(claves).toContain("#7");
    expect(claves).not.toContain("Pau Ruiz");
  });

  it("monta las secciones con contenido y el texto para el grupo", () => {
    const p = { ...planVacio("a"), rival: "CB Mataró", fecha: "2026-10-24", hora: "17:30", objetivos: "- Menos de 12 pérdidas\n\n• Cerrar el rebote", emparejamientos: [{ rival: "#7", nuestro: "Laia", nota: "negarle el balón" }, { rival: "", nuestro: "Marc", nota: "" }] };
    expect(secciones(p, ["Horns"]).map((s) => s.titulo)).toEqual(["Objetivos", "Emparejamientos", "Jugadas"]);
    expect(cabecera(p)).toBe("vs CB Mataró · sábado 24 de octubre · a las 17:30");
    expect(textoParaEquipo(p, ["Horns"]).split("\n")).toEqual([
      "🏀 *Plan de partido*",
      "vs CB Mataró · sábado 24 de octubre · a las 17:30",
      "",
      "*Objetivos:*",
      "• Menos de 12 pérdidas",
      "• Cerrar el rebote",
      "",
      "*Emparejamientos:*",
      "• Laia → #7 (negarle el balón)",
      "• Marc → ¿a quién?",
      "",
      "*Jugadas:*",
      "• Horns",
    ]);
    expect(fechaLarga("mal")).toBe("");
  });

  it("reengancha jugadas por nombre si cambian de id y cuenta las perdidas", () => {
    const p = { ...planVacio("a"), jugadas: ["x1", "x2", "x3"], jugadasNombres: ["Horns", "Flex", "Borrada"] };
    expect(reengancharJugadas(p, [{ id: "x1", nombre: "Horns" }, { id: "nuevo", nombre: "Flex" }])).toBe(1);
    expect(p.jugadas).toEqual(["x1", "nuevo"]);
    expect(p.jugadasNombres).toEqual(["Horns", "Flex"]);
  });

  it("no se come el signo de «-3 de parcial» y marca los emparejamientos a medias", () => {
    const p = { ...planVacio("a"), objetivos: "-3 de parcial como mucho\n- Cerrar el rebote\n*Importante*", emparejamientos: [{ rival: "", nuestro: "Marc", nota: "" }] };
    const s = secciones(p);
    expect(s[0].items).toEqual(["-3 de parcial como mucho", "Cerrar el rebote", "*Importante*"]);
    expect(s[1].items).toEqual(["Marc → ¿a quién?"]);
    expect(fechaLarga("2026-13-01")).toBe("");
  });

  it("valida lo guardado", () => {
    const st = normalizarStorePlan({
      activo: "zz",
      planes: [{ id: "a", rival: "X".repeat(99), hora: "25:00", fecha: "2026-10-25", emparejamientos: [{ rival: "#7", nuestro: "Laia" }, "basura"], jugadas: ["j1", 3] }, { id: "a" }, "basura"],
    });
    expect(st.planes).toHaveLength(2);
    expect(st.planes[0]).toMatchObject({ hora: "", fecha: "2026-10-25", jugadas: ["j1"], emparejamientos: [{ rival: "#7", nuestro: "Laia", nota: "" }] });
    expect(st.planes[0].rival).toHaveLength(60);
    expect(new Set(st.planes.map((p) => p.id)).size).toBe(2);
    expect(st.activo).toBe("a");
  });
});
