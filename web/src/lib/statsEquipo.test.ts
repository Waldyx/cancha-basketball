import { describe, it, expect } from "vitest";
import {
  type Equipo, type PartidoEq, type Linea,
  calcLinea, lineaVacia, tablaTemporada, ordenarTabla, lideres, balance, resultado, puntosPropios,
  emparejar, mismoNombre, normDorsal, parsePlantilla, fusionar, fusionarJugador, equipoSoloPartido, partidosDeJugador,
  codificarEnlace, decodificarEnlace, tokenDeHash, urlEnlace, normalizarEquipo, leerArchivoEquipo, archivoEquipo,
  csvTemporada, textoPartido, recordatorioCopia, mostrarAvisoCopia, textoUltimaCopia, diasDesde, archivoCopia, esArchivoCopia, restaurarCopia, DIAS_AVISO_COPIA, mejoresDelPartido, parsePaste, LIMITE_ENLACE,
} from "./statsEquipo";

const L = (p: Partial<Linea>): Linea => ({ ...lineaVacia(), ...p });

function equipo(): Equipo {
  const p1: PartidoEq = {
    id: "p1", fecha: "2026-10-04", rival: "CB Nord", competicion: "Liga", pf: 60, pc: 50,
    lineas: [
      { jid: "a", ...L({ min: 30, t2c: 5, t2i: 8, t3c: 2, t3i: 5, tlc: 2, tli: 2, ro: 1, rd: 4, ast: 3, rob: 2, per: 2, fal: 2 }) },
      { jid: "b", ...L({ min: 20, t2c: 2, t2i: 6, tlc: 1, tli: 4, ro: 3, rd: 5, ast: 1, tap: 2, per: 3, fal: 3 }) },
      { jid: "c", ...L({}) }, // DNP
    ],
  };
  const p2: PartidoEq = {
    id: "p2", fecha: "2026-10-11", rival: "CB Sud", competicion: "", pf: null, pc: 70,
    lineas: [
      { jid: "a", ...L({ min: 25, t2c: 3, t2i: 7, t3c: 1, t3i: 4, tlc: 0, tli: 0, rd: 2, ast: 5, per: 1, fal: 1 }) },
      { jid: "b", ...L({ min: 28, t2c: 6, t2i: 9, tlc: 4, tli: 6, ro: 2, rd: 6, ast: 0, rob: 1, per: 2, fal: 4 }) },
    ],
  };
  return {
    id: "e1", nombre: "CB Ejemplo", categoria: "Cadete",
    jugadores: [
      { id: "a", dorsal: "7", nombre: "García López, Pau" },
      { id: "b", dorsal: "10", nombre: "Marc Puig" },
      { id: "c", dorsal: "4", nombre: "Jordi Roca" },
    ],
    partidos: [p2, p1], // desordenados a propósito
  };
}

describe("métricas", () => {
  it("calcLinea: puntos, rebotes, TS%, eFG% y valoración", () => {
    const c = calcLinea(L({ t2c: 5, t2i: 8, t3c: 2, t3i: 5, tlc: 2, tli: 2, ro: 1, rd: 4, ast: 3, rob: 2, per: 2, fal: 2 }));
    expect(c.pts).toBe(18);
    expect(c.reb).toBe(5);
    // VAL = 18+5+3+2+0 - (13-7) - 0 - 2 - 2 = 18
    expect(c.val).toBe(18);
    expect(c.ts).toBeCloseTo((18 / (2 * (13 + 0.44 * 2))) * 100, 6);
    expect(c.efg).toBeCloseTo(((7 + 1) / 13) * 100, 6);
  });
  it("sin tiros: TS% y eFG% nulos", () => {
    const c = calcLinea(L({ ast: 2 }));
    expect(c.ts).toBeNull();
    expect(c.efg).toBeNull();
  });
});

describe("balance y marcador", () => {
  it("cuenta V-D, medias de puntos a favor y en contra", () => {
    const b = balance(equipo());
    expect(b.v).toBe(1);
    expect(b.d).toBe(1);
    // p2.pf = suma de líneas = (3*2+1*3) + (6*2+4) = 9 + 16 = 25
    expect(puntosPropios(equipo().partidos[0])).toBe(25);
    expect(b.pfpg).toBeCloseTo((60 + 25) / 2);
    expect(b.pcpg).toBeCloseTo(60);
    expect(b.dif).toBeCloseTo(((60 - 50) + (25 - 70)) / 2);
  });
  it("sin marcador del rival no hay resultado", () => {
    const p = { ...equipo().partidos[0], pc: null };
    expect(resultado(p)).toBe("");
  });
});

describe("temporada por jugador", () => {
  const filas = tablaTemporada(equipo());
  const a = filas.find((f) => f.jid === "a")!;
  it("PJ ignora los DNP y suma totales", () => {
    expect(a.pj).toBe(2);
    expect(a.pts).toBe(18 + 9);
    expect(filas.find((f) => f.jid === "c")!.pj).toBe(0);
  });
  it("ordena por columna con los nulos al final", () => {
    const porPts = ordenarTabla(filas, "pts", "totales", true).map((f) => f.jid);
    expect(porPts).toEqual(["a", "b", "c"]);
    const porMedia = ordenarTabla(filas, "ts", "medias", false).map((f) => f.jid);
    expect(porMedia[porMedia.length - 1]).toBe("c"); // sin tiros → TS% nulo → al final aunque sea ascendente
    const porNombre = ordenarTabla(filas, "nombre", "medias", false).map((f) => f.jid);
    expect(porNombre).toEqual(["a", "c", "b"]); // García < Jordi < Marc
  });
  it("líderes: TS% exige mínimo de tiros", () => {
    const l = lideres(filas, { minTsa: 30 });
    expect(l.pts[0].jid).toBe("a");
    expect(l.ts.every((x) => x.jid !== "c")).toBe(true);
    const exigente = lideres(filas, { minTsa: 1000 });
    expect(exigente.ts).toHaveLength(0);
  });
});

describe("emparejar plantilla", () => {
  const plantilla = equipo().jugadores;
  it("por dorsal, aunque el nombre venga distinto", () => {
    expect(emparejar(plantilla, [{ dorsal: "07", nombre: "P. GARCIA" }])).toEqual(["a"]);
  });
  it("por nombre normalizado si no hay dorsal", () => {
    const r = emparejar(plantilla, [{ dorsal: "", nombre: "Pau García López" }, { dorsal: "99", nombre: "PUIG, Marc" }, { dorsal: "", nombre: "Desconocido Total" }]);
    expect(r).toEqual(["a", "b", null]);
  });
  it("no asigna dos importados al mismo jugador", () => {
    expect(emparejar(plantilla, [{ dorsal: "10", nombre: "x" }, { dorsal: "10", nombre: "Marc Puig" }])).toEqual(["b", null]);
  });
  it("normDorsal y mismoNombre", () => {
    expect(normDorsal("007")).toBe("7");
    expect(normDorsal("")).toBe("");
    expect(mismoNombre("Marc", "Marc Puig")).toBe(false); // un solo nombre no basta
    expect(mismoNombre("Pau García", "García López, Pau")).toBe(true);
    expect(mismoNombre("Pau García", "Pau Martín")).toBe(false);
  });
  it("parsePlantilla acepta varios formatos", () => {
    expect(parsePlantilla("4 Marc Puig\n7. García López, Pau\n#10 - Jordi\nAlex 12\nSolo Nombre")).toEqual([
      { dorsal: "4", nombre: "Marc Puig" }, { dorsal: "7", nombre: "García López, Pau" },
      { dorsal: "10", nombre: "Jordi" }, { dorsal: "12", nombre: "Alex" }, { dorsal: "", nombre: "Solo Nombre" },
    ]);
  });
});

describe("fusionar", () => {
  it("deduplica partidos por fecha+rival y empareja jugadores", () => {
    const mio = equipo();
    const otro: Equipo = {
      id: "x", nombre: "CB Ejemplo", categoria: "Cadete",
      jugadores: [{ id: "j0", dorsal: "7", nombre: "Pau García" }, { id: "j1", dorsal: "22", nombre: "Nuevo Jugador" }],
      partidos: [
        { id: "q1", fecha: "2026-10-04", rival: "cb nord", competicion: "", pf: 60, pc: 50, lineas: [{ jid: "j0", ...L({ t2c: 1, t2i: 1 }) }] }, // duplicado
        { id: "q2", fecha: "2026-10-18", rival: "CB Est", competicion: "", pf: 55, pc: 40, lineas: [{ jid: "j0", ...L({ t2c: 2, t2i: 3 }) }, { jid: "j1", ...L({ t3c: 1, t3i: 2 }) }] },
      ],
    };
    const r = fusionar(mio, otro);
    expect(r.partidosNuevos).toBe(1);
    expect(r.duplicados).toBe(1);
    expect(r.jugadoresNuevos).toBe(1);
    expect(r.equipo.partidos).toHaveLength(3);
    const nuevo = r.equipo.partidos.find((p) => p.rival === "CB Est")!;
    expect(nuevo.lineas.map((l) => l.jid)).toContain("a"); // Pau García → el 7 de la plantilla
    expect(r.equipo.jugadores).toHaveLength(4);
    expect(mio.partidos).toHaveLength(2); // no muta
    // fusionar dos veces no duplica nada
    const r2 = fusionar(r.equipo, otro);
    expect(r2.partidosNuevos).toBe(0);
    expect(r2.jugadoresNuevos).toBe(0);
  });
  it("fusionarJugador deduplica por fecha+rival", () => {
    const g = { fecha: "2026-10-04", rival: "CB Nord", res: "V", ...lineaVacia() };
    const r = fusionarJugador([g], [{ ...g, rival: "cb nord" }, { ...g, fecha: "2026-10-11" }]);
    expect(r.añadidos).toBe(1);
    expect(r.duplicados).toBe(1);
    expect(r.partidos.map((p) => p.fecha)).toEqual(["2026-10-04", "2026-10-11"]);
  });
});

describe("enlace compartible (ida y vuelta)", () => {
  const misma = (a: Equipo, b: Equipo) => {
    expect(b.nombre).toBe(a.nombre);
    expect(b.categoria).toBe(a.categoria);
    expect(b.jugadores.map((j) => [j.dorsal, j.nombre])).toEqual(a.jugadores.map((j) => [j.dorsal, j.nombre]));
    expect(b.partidos.map((p) => [p.fecha, p.rival, p.competicion, p.pf, p.pc, p.lineas.length])).toEqual(a.partidos.map((p) => [p.fecha, p.rival, p.competicion, p.pf, p.pc, p.lineas.length]));
    // las líneas siguen apuntando al mismo jugador (por posición en la plantilla)
    a.partidos.forEach((p, i) => p.lineas.forEach((l, k) => {
      const ja = a.jugadores.findIndex((j) => j.id === l.jid), jb = b.jugadores.findIndex((j) => j.id === b.partidos[i].lineas[k].jid);
      expect(jb).toBe(ja);
      expect(b.partidos[i].lineas[k].t2c).toBe(l.t2c);
      expect(b.partidos[i].lineas[k].fal).toBe(l.fal);
    }));
  };
  it("equipo: comprimido y sin comprimir", async () => {
    const e = equipo();
    for (const comprimir of [true, false]) {
      const t = await codificarEnlace({ k: "equipo", equipo: e }, { comprimir });
      expect(t).toMatch(/^[zr][A-Za-z0-9_-]+$/);
      const p = await decodificarEnlace(t);
      expect(p.k).toBe("equipo");
      if (p.k !== "jugador") misma(e, p.equipo);
    }
  });
  it("comprime de verdad un equipo grande y cabe bajo el límite", async () => {
    const e = equipo();
    for (let i = 0; i < 20; i++) e.partidos.push({ ...e.partidos[0], id: "g" + i, fecha: `2026-11-${String(i + 1).padStart(2, "0")}` });
    const z = await codificarEnlace({ k: "equipo", equipo: e });
    const r = await codificarEnlace({ k: "equipo", equipo: e }, { comprimir: false });
    expect(z.length).toBeLessThan(r.length);
    expect(z.length).toBeLessThan(LIMITE_ENLACE);
  });
  it("partido suelto: solo viajan sus jugadores", async () => {
    const e = equipo();
    const solo = equipoSoloPartido(e, "p1");
    expect(solo.partidos).toHaveLength(1);
    expect(solo.jugadores.map((j) => j.id).sort()).toEqual(["a", "b"]);
    const p = await decodificarEnlace(await codificarEnlace({ k: "partido", equipo: solo }));
    expect(p.k).toBe("partido");
    if (p.k !== "jugador") { expect(p.equipo.partidos[0].rival).toBe("CB Nord"); expect(p.equipo.jugadores).toHaveLength(2); }
  });
  it("jugador: sus partidos en formato cz.stats.v1", async () => {
    const e = equipo();
    const ps = partidosDeJugador(e, "a");
    expect(ps.map((g) => [g.fecha, g.res])).toEqual([["2026-10-04", "V"], ["2026-10-11", "D"]]);
    const p = await decodificarEnlace(await codificarEnlace({ k: "jugador", nombre: "Pau", partidos: ps }));
    expect(p.k).toBe("jugador");
    if (p.k === "jugador") {
      expect(p.nombre).toBe("Pau");
      expect(p.partidos).toEqual(ps);
    }
  });
  it("rechaza basura y recorta valores absurdos", async () => {
    await expect(decodificarEnlace("zzz")).rejects.toThrow();
    await expect(decodificarEnlace("rAAAA")).rejects.toThrow();
    await expect(decodificarEnlace("")).rejects.toThrow();
    const sucio = normalizarEquipo({
      nombre: "<img src=x>".repeat(20), jugadores: [{ id: "a", nombre: "X" }],
      partidos: [{ id: "p", fecha: "mañana", pf: -4, pc: 99999, lineas: [{ jid: "a", t2c: 50, t2i: 1, min: 5000 }, { jid: "zzz", t2c: 1 }] }],
    });
    expect(sucio.nombre.length).toBeLessThanOrEqual(40);
    expect(sucio.partidos[0].fecha).toBe("");
    expect(sucio.partidos[0].pf).toBeNull();
    expect(sucio.partidos[0].pc).toBe(300);
    expect(sucio.partidos[0].lineas).toHaveLength(1); // la que apunta a un jugador inexistente se descarta
    expect(sucio.partidos[0].lineas[0].t2i).toBe(50); // intentados nunca por debajo de metidos
    expect(sucio.partidos[0].lineas[0].min).toBe(99);
  });
  it("tokenDeHash y urlEnlace", () => {
    expect(tokenDeHash("#e=zAbc_-9")).toBe("zAbc_-9");
    expect(tokenDeHash("#otro=1&e=rXY")).toBe("rXY");
    expect(tokenDeHash("")).toBeNull();
    expect(tokenDeHash("#nada")).toBeNull();
    expect(urlEnlace("https://x.es/estadisticas", "zA")).toBe("https://x.es/estadisticas#e=zA");
  });
  it("archivo .json: ida y vuelta (con y sin envoltorio)", () => {
    const e = equipo();
    const viaArchivo = leerArchivoEquipo(JSON.parse(JSON.stringify(archivoEquipo(e))));
    expect(viaArchivo.partidos).toHaveLength(2);
    expect(leerArchivoEquipo(JSON.parse(JSON.stringify(e))).jugadores).toHaveLength(3);
    expect(() => leerArchivoEquipo({ hola: 1 })).toThrow();
  });
});

describe("CSV y texto", () => {
  it("CSV con ; y coma decimal, y protegido contra fórmulas", () => {
    const e = equipo();
    e.jugadores[1].nombre = "=SUMA(A1)";
    const csv = csvTemporada(tablaTemporada(e), "medias");
    const lineas = csv.split("\r\n");
    expect(lineas[0]).toBe("Dorsal;Jugador;PJ;MIN;PTS;REB;AST;ROB;TAP;PER;VAL;TS%;eFG%");
    expect(lineas).toHaveLength(4);
    expect(csv).toContain("'=SUMA(A1)");
    const a = lineas.find((l) => l.startsWith("7;"))!.split(";");
    expect(a[2]).toBe("2"); // PJ
    expect(a[4]).toBe("13,5"); // PTS medios (18+9)/2
    const tot = csvTemporada(tablaTemporada(e), "totales").split("\r\n").find((l) => l.startsWith("7;"))!.split(";");
    expect(tot[4]).toBe("27");
  });
  it("texto del partido para WhatsApp", () => {
    const e = equipo();
    const t = textoPartido(e, e.partidos[1]);
    expect(t).toContain("CB Ejemplo (Cadete) vs CB Nord: 60–50 (victoria)");
    expect(t).toContain("04/10/2026 · Liga");
    expect(t).toContain("7 García López, Pau: 18 pts, 5 reb, 3 ast, 2 rob (VAL 18)");
    expect(t).not.toContain("Jordi"); // el DNP no sale
  });
  it("mejores del partido por valoración", () => {
    const e = equipo();
    const m = mejoresDelPartido(e, e.partidos[1], 3);
    expect(m.map((x) => x.jid)).toEqual(["a", "b"]);
  });
});

describe("parser de acta pegada (compartido con el modo Jugador)", () => {
  it("detecta columnas por cabecera, en catalán", () => {
    const js = parsePaste("Dorsal\tJugador\tMin\tPunts\tT2\tT3\tTL\tReb\tAs\tBR\tTap\tPP\tFaltes\n7\tCOGNOM, Nom\t24\t15\t4/7\t1/3\t4/4\t6\t3\t2\t0\t2\t3");
    expect(js).toHaveLength(1);
    expect(js[0]).toMatchObject({ dorsal: "7", min: 24, t2c: 4, t2i: 7, t3c: 1, t3i: 3, tlc: 4, tli: 4, rd: 6, ast: 3, rob: 2, per: 2, fal: 3 });
  });
});

describe("copia de seguridad", () => {
  const D = 86_400_000, ahora = Date.UTC(2026, 9, 15, 12);
  it("recordatorio: sin datos nunca; sin copia desde 3 partidos; con copia, pasados 14 días", () => {
    expect(recordatorioCopia(ahora, null, 0)).toBe("ninguno");
    expect(recordatorioCopia(ahora, null, 2)).toBe("ninguno");
    expect(recordatorioCopia(ahora, null, 3)).toBe("nunca");
    expect(recordatorioCopia(ahora, ahora - DIAS_AVISO_COPIA * D, 10)).toBe("ninguno"); // justo 14 días: aún no
    expect(recordatorioCopia(ahora, ahora - 15 * D, 10)).toBe("antigua");
    expect(recordatorioCopia(ahora, ahora - 15 * D, 0)).toBe("ninguno"); // nada que perder
    expect(recordatorioCopia(ahora, ahora - 2 * D, 50)).toBe("ninguno");
  });
  it("texto de última copia", () => {
    expect(textoUltimaCopia(ahora, null)).toBe("Última copia: nunca");
    expect(textoUltimaCopia(ahora, ahora - 1000)).toBe("Última copia: hoy");
    expect(textoUltimaCopia(ahora, ahora - 1.5 * D)).toBe("Última copia: ayer");
    expect(textoUltimaCopia(ahora, ahora - 20 * D)).toBe("Última copia: hace 20 días");
    expect(diasDesde(ahora, ahora + 5 * D)).toBe(0); // reloj adelantado: no negativo
  });
  it("el aviso cerrado vuelve antes si falta copia reciente", () => {
    expect(mostrarAvisoCopia(ahora, null, "ninguno")).toBe(true);
    expect(mostrarAvisoCopia(ahora, ahora - 2 * D, "ninguno")).toBe(false);
    expect(mostrarAvisoCopia(ahora, ahora - 31 * D, "ninguno")).toBe(true);
    expect(mostrarAvisoCopia(ahora, ahora - 3600_000, "nunca")).toBe(false);
    expect(mostrarAvisoCopia(ahora, ahora - 25 * 3600_000, "antigua")).toBe(true);
  });
  it("restaurar una copia en otro dispositivo (vacío) y sobre datos existentes sin duplicar", () => {
    const e = equipo();
    const copia = JSON.parse(JSON.stringify(archivoCopia({ activo: e.id, equipos: [e] }, ahora)));
    expect(esArchivoCopia(copia)).toBe(true);
    expect(esArchivoCopia(archivoEquipo(e))).toBe(false);
    const r = restaurarCopia({ activo: "", equipos: [] }, copia);
    expect(r.nuevos).toBe(1);
    expect(r.store.activo).toBe(e.id);
    expect(r.store.equipos[0].partidos).toHaveLength(2);
    const r2 = restaurarCopia(r.store, copia);
    expect(r2.fusionados).toBe(1);
    expect(r2.store.equipos).toHaveLength(1);
    expect(r2.store.equipos[0].partidos).toHaveLength(2); // sin duplicados
    expect(r2.store.equipos[0].jugadores).toHaveLength(3);
  });
});
