import { describe, expect, it } from "vitest";
import { aBase64Url, leerLibroDeTexto, libroAJson, normalizarJugada, nuevaJugada, tipoDePayload, decodificarEnlace, type Jugada } from "./pizarra";
import { PLANTILLAS, PLANTILLAS_EJERCICIOS } from "./pizarraPlantillas";
import {
  LIMITES_SESION,
  ajustarBloque,
  anadirBloqueJugada,
  anadirBloqueTexto,
  bajarBloque,
  codificarEnlaceSesion,
  copiarSesion,
  decodificarEnlaceSesion,
  duplicarBloque,
  fechaLarga,
  iniciosMinutos,
  jugadasDeSesion,
  moverBloque,
  normalizarSesion,
  normalizarSesiones,
  nuevaSesion,
  quitarBloque,
  remapearJugadas,
  sesionesDeLibro,
  subirBloque,
  sumarMinutos,
  textoDuracion,
  textoFin,
  textoInicio,
  totalMinutos,
  type Sesion,
} from "./pizarraSesion";
import { PALETAS, opcionesResumen, renderSvgCompleto } from "./pizarraRender";
import { tocaRecordarCopia } from "./pizarra";

const ej = (i: number): Jugada => ({ ...PLANTILLAS_EJERCICIOS[i].crear(), id: `ej${i}` });

function sesionBase(): Sesion {
  let s = nuevaSesion({ id: "s1", titulo: "Martes", fecha: "2026-10-13", hora: "17:30", equipo: "Infantil A", objetivo: "Tiro y transición" });
  s = anadirBloqueTexto(s, "Calentamiento", 10);
  s = anadirBloqueJugada(s, ej(0), 15);
  s = anadirBloqueJugada(s, ej(3), 20);
  s = anadirBloqueTexto(s, "Charla", 5);
  return s;
}

describe("bloques de la sesión", () => {
  it("se añaden en orden, con minutos por defecto y notas vacías", () => {
    const s = sesionBase();
    expect(s.bloques.map((b) => b.tipo)).toEqual(["texto", "jugada", "jugada", "texto"]);
    expect(s.bloques[1]).toMatchObject({ jugadaId: "ej0", minutos: 15, notas: "", material: "" });
    expect(anadirBloqueTexto(nuevaSesion(), "x").bloques[0].minutos).toBe(LIMITES_SESION.MINUTOS_DEFECTO);
  });

  it("no pasa de 40 bloques", () => {
    let s = nuevaSesion();
    for (let i = 0; i < 50; i++) s = anadirBloqueTexto(s, "b" + i);
    expect(s.bloques).toHaveLength(LIMITES_SESION.BLOQUES);
  });

  it("los minutos se limitan a 1-240 y no aceptan basura", () => {
    let s = anadirBloqueTexto(nuevaSesion(), "x", 10);
    const id = s.bloques[0].id;
    expect(ajustarBloque(s, id, { minutos: 9999 }).bloques[0].minutos).toBe(240);
    expect(ajustarBloque(s, id, { minutos: -5 }).bloques[0].minutos).toBe(1);
    expect(ajustarBloque(s, id, { minutos: 12.6 }).bloques[0].minutos).toBe(13);
    expect(ajustarBloque(s, id, { minutos: Number.NaN }).bloques[0].minutos).toBe(10);
    s = ajustarBloque(s, id, { titulo: "   " });
    expect(s.bloques[0].titulo).toBe("x"); // un título vacío no vale
  });

  it("subir, bajar y mover reordenan sin perder ninguno", () => {
    const s = sesionBase();
    const ids = s.bloques.map((b) => b.id);
    expect(subirBloque(s, 2).bloques.map((b) => b.id)).toEqual([ids[0], ids[2], ids[1], ids[3]]);
    expect(bajarBloque(s, 0).bloques.map((b) => b.id)).toEqual([ids[1], ids[0], ids[2], ids[3]]);
    expect(moverBloque(s, 0, 3).bloques.map((b) => b.id)).toEqual([ids[1], ids[2], ids[3], ids[0]]);
    expect(moverBloque(s, 3, 0).bloques.map((b) => b.id)).toEqual([ids[3], ids[0], ids[1], ids[2]]);
    // en los extremos no pasa nada y no se sale del rango
    expect(subirBloque(s, 0).bloques.map((b) => b.id)).toEqual(ids);
    expect(bajarBloque(s, 3).bloques.map((b) => b.id)).toEqual(ids);
    expect(moverBloque(s, 1, 99).bloques.map((b) => b.id)).toEqual([ids[0], ids[2], ids[3], ids[1]]);
    expect(moverBloque(s, 9, 0).bloques.map((b) => b.id)).toEqual(ids);
  });

  it("duplicar pone la copia debajo con id nuevo; quitar borra solo ese", () => {
    const s = sesionBase();
    const d = duplicarBloque(s, s.bloques[1].id);
    expect(d.bloques).toHaveLength(5);
    expect(d.bloques[2].jugadaId).toBe("ej0");
    expect(d.bloques[2].id).not.toBe(d.bloques[1].id);
    expect(quitarBloque(s, s.bloques[0].id).bloques).toHaveLength(3);
  });

  it("las operaciones no modifican la sesión original", () => {
    const s = sesionBase();
    const antes = JSON.stringify(s);
    moverBloque(s, 0, 2);
    quitarBloque(s, s.bloques[0].id);
    ajustarBloque(s, s.bloques[0].id, { minutos: 99 });
    expect(JSON.stringify(s)).toBe(antes);
  });
});

describe("minutos totales y horas", () => {
  it("suma los minutos y calcula cuándo empieza cada bloque", () => {
    const s = sesionBase();
    expect(totalMinutos(s)).toBe(50);
    expect(iniciosMinutos(s)).toEqual([0, 10, 25, 45]);
    expect(totalMinutos(nuevaSesion())).toBe(0);
    expect(iniciosMinutos(nuevaSesion())).toEqual([]);
  });

  it("cambiar un bloque o el orden recalcula los inicios", () => {
    let s = sesionBase();
    s = ajustarBloque(s, s.bloques[0].id, { minutos: 20 });
    expect(iniciosMinutos(s)).toEqual([0, 20, 35, 55]);
    expect(iniciosMinutos(moverBloque(s, 0, 3))).toEqual([0, 15, 35, 40]);
  });

  it("con hora de inicio da horas de reloj; sin ella, minutos", () => {
    const s = sesionBase();
    expect(textoInicio(s, 0)).toBe("17:30");
    expect(textoInicio(s, 2)).toBe("17:55");
    expect(textoFin(s)).toBe("18:20");
    const sin = { ...s, hora: "" };
    expect(textoInicio(sin, 2)).toBe("min 25");
    expect(textoFin(sin)).toBeNull();
  });

  it("sumarMinutos cruza la hora y la medianoche, y rechaza horas inválidas", () => {
    expect(sumarMinutos("17:50", 20)).toBe("18:10");
    expect(sumarMinutos("23:50", 20)).toBe("00:10");
    expect(sumarMinutos("25:00", 5)).toBeNull();
    expect(sumarMinutos("", 5)).toBeNull();
    expect(sumarMinutos("9:00", 5)).toBeNull();
  });

  it("textoDuracion", () => {
    expect(textoDuracion(45)).toBe("45 min");
    expect(textoDuracion(60)).toBe("1 h");
    expect(textoDuracion(95)).toBe("1 h 35 min");
  });

  it("fechaLarga en español y rechaza fechas imposibles", () => {
    expect(fechaLarga("2026-10-13")).toMatch(/13 de octubre de 2026/);
    expect(fechaLarga("2026-02-31")).toBeNull();
    expect(fechaLarga("ayer")).toBeNull();
  });
});

describe("validación de la sesión (entrada no confiable)", () => {
  it("una sesión válida pasa igual", () => {
    const s = sesionBase();
    expect(normalizarSesion(JSON.parse(JSON.stringify(s)))).toEqual(s);
  });

  it("limita longitudes, saca los caracteres de control y arregla los datos raros", () => {
    const s = normalizarSesion({
      id: "../../x",
      titulo: "T".repeat(500) + "\u0000",
      fecha: "2026-13-45",
      hora: "99:99",
      equipo: "E".repeat(500),
      objetivo: "O".repeat(5000),
      bloques: [
        { tipo: "texto", titulo: "A".repeat(500), minutos: 1e9, notas: "N".repeat(5000), material: "M".repeat(5000) },
        { tipo: "jugada", jugadaId: "ok1", titulo: "", minutos: "10" },
        { tipo: "jugada", titulo: "sin referencia" },
        { tipo: "jugada", jugadaId: "<script>", titulo: "x" },
        "basura",
        null,
      ],
    })!;
    expect(s.id).not.toBe("../../x");
    expect(s.titulo).toHaveLength(LIMITES_SESION.TITULO);
    expect(s.titulo).not.toContain("\u0000");
    expect(s.fecha).toBe("");
    expect(s.hora).toBe("");
    expect(s.equipo).toHaveLength(LIMITES_SESION.EQUIPO);
    expect(s.objetivo).toHaveLength(LIMITES_SESION.OBJETIVO);
    expect(s.bloques).toHaveLength(2);
    expect(s.bloques[0]).toMatchObject({ minutos: 240, tipo: "texto" });
    expect(s.bloques[0].titulo).toHaveLength(80);
    expect(s.bloques[0].notas).toHaveLength(LIMITES_SESION.NOTAS);
    expect(s.bloques[0].material).toHaveLength(LIMITES_SESION.MATERIAL);
    expect(s.bloques[1]).toMatchObject({ tipo: "jugada", jugadaId: "ok1", minutos: LIMITES_SESION.MINUTOS_DEFECTO, titulo: "Jugada" });
  });

  it("rechaza lo que no es una sesión y no repite ids de bloques", () => {
    expect(normalizarSesion(null)).toBeNull();
    expect(normalizarSesion("x")).toBeNull();
    expect(normalizarSesion({ titulo: "sin bloques" })).toBeNull();
    const s = normalizarSesion({ bloques: [{ id: "b", tipo: "texto", titulo: "1" }, { id: "b", tipo: "texto", titulo: "2" }] })!;
    expect(new Set(s.bloques.map((b) => b.id)).size).toBe(2);
  });

  it("normalizarSesiones cuenta lo descartado y no repite ids", () => {
    const buena = JSON.parse(JSON.stringify(sesionBase()));
    const r = normalizarSesiones([buena, buena, { nada: 1 }, 3]);
    expect(r.sesiones).toHaveLength(2);
    expect(r.descartadas).toBe(2);
    expect(new Set(r.sesiones.map((s) => s.id)).size).toBe(2);
    expect(normalizarSesiones("nada")).toEqual({ sesiones: [], descartadas: 0 });
    expect(normalizarSesiones(Array.from({ length: 120 }, () => buena)).sesiones).toHaveLength(LIMITES_SESION.SESIONES);
  });

  it("un texto con HTML se queda como texto: el render del esquema no lo deja pasar", () => {
    const j = nuevaJugada({ nombre: '<img src=x onerror="alert(1)">' });
    const svg = renderSvgCompleto(opcionesResumen(j, "todos", PALETAS.neutra));
    expect(svg).not.toContain("<img");
  });
});

describe("copia de seguridad y archivo del playbook con sesiones", () => {
  it("el .json lleva las sesiones y se lee de vuelta con ellas", () => {
    const s = sesionBase();
    const txt = libroAJson([ej(0), ej(3)], { sesiones: [s] });
    const raw = JSON.parse(txt);
    expect(raw.sesiones).toHaveLength(1);
    expect(leerLibroDeTexto(txt)!.jugadas).toHaveLength(2);
    expect(sesionesDeLibro(raw).sesiones[0]).toEqual(s);
  });

  it("un archivo antiguo (sin sesiones) sigue valiendo", () => {
    const txt = libroAJson([ej(0)]);
    expect(leerLibroDeTexto(txt)!.jugadas).toHaveLength(1);
    expect(sesionesDeLibro(JSON.parse(txt))).toEqual({ sesiones: [], descartadas: 0 });
    expect(sesionesDeLibro("basura")).toEqual({ sesiones: [], descartadas: 0 });
  });

  it("las sesiones cuentan para recordar la copia de seguridad", () => {
    const ahora = Date.UTC(2026, 9, 15);
    expect(tocaRecordarCopia(0, null, ahora)).toBe(false);
    expect(tocaRecordarCopia(1 + 2, null, ahora)).toBe(true); // 1 jugada + 2 sesiones
  });

  it("remapear apunta los bloques a los ids nuevos de las jugadas importadas", () => {
    const s = sesionBase();
    const r = remapearJugadas(s, new Map([["ej0", "nuevo1"]]));
    expect(r.bloques[1].jugadaId).toBe("nuevo1");
    expect(r.bloques[2].jugadaId).toBe("ej3");
    expect(s.bloques[1].jugadaId).toBe("ej0");
  });

  it("copiarSesion da ids nuevos y no toca la original", () => {
    const s = sesionBase();
    const c = copiarSesion(s, " (copia)");
    expect(c.id).not.toBe(s.id);
    expect(c.titulo).toBe("Martes (copia)");
    expect(c.bloques.map((b) => b.id).some((id) => s.bloques.some((b) => b.id === id))).toBe(false);
    expect(c.bloques.map((b) => b.jugadaId)).toEqual(s.bloques.map((b) => b.jugadaId));
  });
});

describe("enlace de una sesión", () => {
  const biblioteca = [ej(0), ej(3), { ...PLANTILLAS[0].crear(), id: "sin-usar" }];

  it("viaja con sus jugadas y al abrirla todo apunta a las jugadas del enlace", async () => {
    const s = sesionBase();
    const txt = await codificarEnlaceSesion(s, biblioteca);
    expect(txt.startsWith("zs")).toBe(true);
    expect(tipoDePayload(txt)).toBe("s");
    const r = await decodificarEnlaceSesion(txt);
    expect(r.jugadas).toHaveLength(2); // solo las que usa la sesión
    expect(r.sesion).toMatchObject({ titulo: "Martes", fecha: "2026-10-13", hora: "17:30", equipo: "Infantil A" });
    expect(r.sesion.bloques.map((b) => b.titulo)).toEqual(s.bloques.map((b) => b.titulo));
    expect(r.sesion.bloques.map((b) => b.minutos)).toEqual([10, 15, 20, 5]);
    for (const b of r.sesion.bloques.filter((x) => x.tipo === "jugada")) {
      expect(r.jugadas.some((j) => j.id === b.jugadaId)).toBe(true);
    }
    // las jugadas son las mismas (ignorando los ids que se generan al abrir)
    expect(r.jugadas[0].nombre).toBe(ej(0).nombre);
    expect(r.jugadas[1].pasos).toHaveLength(ej(3).pasos.length);
    expect(jugadasDeSesion(r.sesion, (id) => r.jugadas.find((j) => j.id === id))).toHaveLength(2);
  });

  it("ida y vuelta sin comprimir", async () => {
    const txt = await codificarEnlaceSesion(sesionBase(), biblioteca, { comprimir: false });
    expect(txt.startsWith("rs")).toBe(true);
    expect((await decodificarEnlaceSesion(txt)).sesion.bloques).toHaveLength(4);
  });

  it("las notas y el material de cada bloque viajan", async () => {
    let s = sesionBase();
    s = ajustarBloque(s, s.bloques[1].id, { notas: "Dos filas.\nCorregir el segundo apoyo.", material: "6 balones, 4 conos" });
    const r = await decodificarEnlaceSesion(await codificarEnlaceSesion(s, biblioteca));
    expect(r.sesion.bloques[1]).toMatchObject({ notas: "Dos filas.\nCorregir el segundo apoyo.", material: "6 balones, 4 conos" });
  });

  it("si una jugada ya no está en la biblioteca, su bloque viaja como texto con el título", async () => {
    const s = sesionBase();
    const r = await decodificarEnlaceSesion(await codificarEnlaceSesion(s, [biblioteca[1]]));
    expect(r.jugadas).toHaveLength(1);
    expect(r.sesion.bloques[1].tipo).toBe("texto");
    expect(r.sesion.bloques[1].titulo).toBe(ej(0).nombre);
    expect(r.sesion.bloques[2].tipo).toBe("jugada");
  });

  it("una sesión con 8 ejercicios cabe en un enlace razonable", async () => {
    let s = nuevaSesion({ titulo: "Larga" });
    const todas: Jugada[] = [];
    for (let i = 0; i < 7; i++) {
      todas.push(ej(i));
      s = anadirBloqueJugada(s, ej(i), 10);
    }
    const txt = await codificarEnlaceSesion(s, todas);
    expect(txt.length).toBeLessThan(12_000);
  });

  it("el enlace de jugada y el de sesión no se confunden", async () => {
    const txt = await codificarEnlaceSesion(sesionBase(), biblioteca);
    await expect(decodificarEnlace(txt)).rejects.toThrow(/sesión/);
    await expect(decodificarEnlaceSesion("zjAAAA")).rejects.toThrow();
  });

  it("rechaza basura sin colgarse", async () => {
    await expect(decodificarEnlaceSesion("")).rejects.toThrow();
    await expect(decodificarEnlaceSesion("zs!!!")).rejects.toThrow();
    await expect(decodificarEnlaceSesion("zsAAAAAAAA")).rejects.toThrow();
    const crudo = (o: unknown) => "rs" + aBase64Url(new TextEncoder().encode(JSON.stringify(o)));
    await expect(decodificarEnlaceSesion(crudo("hola"))).rejects.toThrow();
    await expect(decodificarEnlaceSesion(crudo({ j: [] }))).rejects.toThrow();
    await expect(decodificarEnlaceSesion(crudo({ s: "no es un array", j: [] }))).rejects.toThrow();
  });

  it("los datos del enlace se validan: HTML, minutos y referencias falsas", async () => {
    const raro = aBase64Url(
      new TextEncoder().encode(
        JSON.stringify({
          s: ["<b>x</b>", "2026-10-13", "17:00", "Eq", "Ob", [[0, "A", 99999, "n", "m", 7], [1, "T", 5, "n", "m", -1]]],
          j: [],
        })
      )
    );
    const r = await decodificarEnlaceSesion("rs" + raro);
    expect(r.sesion.titulo).toBe("<b>x</b>"); // es texto: el DOM lo pone con textContent
    expect(r.sesion.bloques[0]).toMatchObject({ tipo: "texto", minutos: 240 }); // referencia a una jugada que no viaja
    expect(r.sesion.bloques[1]).toMatchObject({ tipo: "texto", minutos: 5 });
  });

  it("al abrirla, las jugadas valen aunque la sesión se guarde con id nuevo", async () => {
    const r = await decodificarEnlaceSesion(await codificarEnlaceSesion(sesionBase(), biblioteca));
    const copia = copiarSesion(r.sesion);
    expect(copia.bloques.filter((b) => b.tipo === "jugada").every((b) => r.jugadas.some((j) => j.id === b.jugadaId))).toBe(true);
    expect(r.jugadas.every((j) => normalizarJugada(j) !== null)).toBe(true);
  });
});
