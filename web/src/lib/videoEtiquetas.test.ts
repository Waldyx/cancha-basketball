import { describe, expect, it } from "vitest";
import { TIPOS_POR_DEFECTO, aCsv, aTexto, claveVideo, clipsDe, formatoTiempo, normalizarStoreVideo, type Etiqueta } from "./videoEtiquetas";

const e = (id: string, t: number, tipo = "perdida", jugador = "", nota = ""): Etiqueta => ({ id, t, tipo, jugador, nota });

describe("etiquetas de vídeo", () => {
  it("formatea el tiempo", () => {
    expect(formatoTiempo(0)).toBe("0:00");
    expect(formatoTiempo(75.9)).toBe("1:15");
    expect(formatoTiempo(3725)).toBe("1:02:05");
    expect(formatoTiempo(Infinity)).toBe("—");
    expect(formatoTiempo(NaN)).toBe("—");
  });

  it("identifica el vídeo por nombre, tamaño y duración", () => {
    expect(claveVideo("partido.mp4", 123456, 3599.6)).toBe("partido.mp4|123456|3600");
  });

  it("monta los clips uniendo los que se solapan y sin salirse del vídeo", () => {
    const clips = clipsDe([e("a", 100), e("b", 104), e("c", 300), e("d", 2)], 302, 6, 3);
    expect(clips).toEqual([
      { desde: 0, hasta: 5, etiquetas: ["d"] },
      { desde: 94, hasta: 107, etiquetas: ["a", "b"] },
      { desde: 294, hasta: 302, etiquetas: ["c"] },
    ]);
  });

  it("exporta a CSV y a texto, ordenado por tiempo", () => {
    const ls = [e("x", 130, "canasta", "Laia", "contraataque"), e("y", 65, "perdida", "", 'pase "malo"; lento')];
    expect(aCsv(ls, TIPOS_POR_DEFECTO)).toBe('Tiempo;Tipo;Jugador;Nota\n1:05;Pérdida;;"pase ""malo""; lento"\n2:10;Canasta;Laia;contraataque');
    expect(aTexto(ls, TIPOS_POR_DEFECTO)).toBe('1:05 · Pérdida — pase "malo"; lento\n2:10 · Canasta · Laia — contraataque');
  });

  it("una nota que empieza por = no se convierte en fórmula al abrir el CSV", () => {
    expect(aCsv([e("f", 5, "revisar", "", "=SUMA(A1)")], TIPOS_POR_DEFECTO).split("\n")[1]).toBe("0:05;Revisar;;'=SUMA(A1)");
  });

  it("valida lo guardado y deja renombrar los tipos", () => {
    const st = normalizarStoreVideo({
      tipos: [{ id: "jugada", nombre: "Horns" }, { id: "inventado", nombre: "X" }],
      videos: { "a.mp4|1|60": { nombre: "a.mp4", etiquetas: [{ id: "1", t: 12.345, tipo: "canasta" }, { t: -1 }, { t: 5, tipo: "raro" }, "basura"] } },
    });
    expect(st.tipos.find((t) => t.id === "jugada")?.nombre).toBe("Horns");
    expect(st.tipos).toHaveLength(TIPOS_POR_DEFECTO.length);
    expect(st.videos["a.mp4|1|60"].etiquetas).toEqual([
      { id: "1", t: 12.3, tipo: "canasta", jugador: "", nota: "" },
      { id: "e1", t: 5, tipo: "revisar", jugador: "", nota: "" },
    ]);
    expect(normalizarStoreVideo(null).videos).toEqual({});
  });
});
