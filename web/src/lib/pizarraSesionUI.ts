// Interfaz de las sesiones de entrenamiento (hoja "Sesión" de /pizarra). Se monta sobre el
// DOM de pizarra.astro y recibe del resto de la pizarra lo que necesita (biblioteca, toast,
// guardado) a través de `CtxSesion`. Todo texto del usuario entra al DOM con textContent/value
// y al SVG escapado: nunca como HTML.

import { CATEGORIAS, type Jugada } from "./pizarra";
import { PLANTILLAS, PLANTILLAS_EJERCICIOS } from "./pizarraPlantillas";
import {
  DURACIONES_SESION,
  JUGADORES_MAX,
  JUGADORES_MIN,
  OBJETIVOS_SESION,
  SESIONES_POR_EDAD,
  crearSesionPorEdad,
  minutosSesionPorEdad,
  type OpcionesSesionEdad,
} from "./pizarraSesionesEdad";
import { PETICION_MAX, crearSesionDesdePlan, leerPlanIA, objetivoDeTexto, type PlanIA } from "./pizarraSesionIA";

// Límites de duración que acepta /api/sesion (DURACION_MIN/MAX en api/sesion.ts).
const DURACION_IA_MIN = 30;
const DURACION_IA_MAX = 150;
import { PALETAS, opcionesResumen, renderSvgCompleto, type NombrePaleta } from "./pizarraRender";
import {
  BLOQUES_TEXTO_TIPO,
  LIMITES_SESION,
  ajustarBloque,
  anadirBloqueJugada,
  anadirBloqueTexto,
  bajarBloque,
  codificarEnlaceSesion,
  copiarSesion,
  duplicarBloque,
  fechaLarga,
  moverBloque,
  nuevaSesion,
  quitarBloque,
  remapearJugadas,
  subirBloque,
  textoDuracion,
  textoFin,
  textoInicio,
  totalMinutos,
  type CargaSesion,
  type Sesion,
} from "./pizarraSesion";

export interface CtxSesion {
  root: HTMLElement;
  printEl: HTMLElement;
  /** Cabecera con la marca del club para lo impreso (o null). */
  marca?: () => HTMLElement | null;
  biblio: () => Jugada[];
  /** Jugadas que llegaron por enlace y aún no se han guardado. */
  jugadasCompartidas: () => Jugada[];
  /** Devuelve la jugada de la biblioteca equivalente a esta, o la guarda como copia nueva. */
  asegurarJugada: (j: Jugada) => Jugada;
  /** Guarda copias (con id nuevo) en la biblioteca; devuelve el mapa id original -> id nuevo. */
  guardarJugadas: (js: Jugada[]) => Map<string, string>;
  sesiones: () => Sesion[];
  setSesiones: (s: Sesion[]) => void;
  paleta: () => NombrePaleta;
  toast: (m: string, ms?: number) => void;
  abrirJugada: (j: Jugada, vista: boolean) => void;
  copiar: (t: string) => Promise<boolean>;
  urlBase: () => string;
  lanzarImpresion: () => void;
}

function el<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: { cls?: string; text?: string; attrs?: Record<string, string>; on?: Record<string, (e: Event) => void> } = {},
  ...hijos: (Node | string)[]
): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag);
  if (props.cls) e.className = props.cls;
  if (props.text !== undefined) e.textContent = props.text;
  for (const [k, v] of Object.entries(props.attrs ?? {})) e.setAttribute(k, v);
  for (const [k, fn] of Object.entries(props.on ?? {})) e.addEventListener(k, fn);
  for (const h of hijos) e.append(h);
  return e;
}

export interface ControlSesiones {
  abrir: () => void;
  abrirCompartida: (c: CargaSesion) => void;
  cerrar: () => void;
  estaAbierta: () => boolean;
}

/** Fecha de hoy en hora LOCAL (toISOString da la de UTC: pasada la medianoche saldría ayer). */
const hoyLocal = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

export function iniciarSesiones(ctx: CtxSesion): ControlSesiones {
  const root = ctx.root;
  const q = <T extends HTMLElement = HTMLElement>(n: string): T => {
    const e = root.querySelector<T>(`[data-pz="${n}"]`);
    if (!e) throw new Error("pizarra: falta " + n);
    return e;
  };
  const hoja = q("ses");
  const selSesion = q<HTMLSelectElement>("ses-elegir");
  const bannerEl = q("ses-banner");
  const inpTitulo = q<HTMLInputElement>("ses-titulo");
  const inpFecha = q<HTMLInputElement>("ses-fecha");
  const inpHora = q<HTMLInputElement>("ses-hora");
  const inpEquipo = q<HTMLInputElement>("ses-equipo");
  const txtObjetivo = q<HTMLTextAreaElement>("ses-objetivo");
  const totalEl = q("ses-total");
  const listaEl = q("ses-bloques");
  const selAnadir = q<HTMLSelectElement>("ses-anadir");
  const rapidosEl = q("ses-rapidos");
  const infoEl = q("ses-info");
  const edadEl = q("ses-edad");

  let actualId = "";
  let compartida: CargaSesion | null = null;

  const actual = (): Sesion | null => (compartida ? compartida.sesion : (ctx.sesiones().find((s) => s.id === actualId) ?? null));
  const buscarJugada = (id: string): Jugada | undefined =>
    ctx.biblio().find((j) => j.id === id) ?? ctx.jugadasCompartidas().find((j) => j.id === id) ?? compartida?.jugadas.find((j) => j.id === id);

  function guardar(nueva: Sesion, repintar = true) {
    nueva.actualizada = Date.now();
    ctx.setSesiones(ctx.sesiones().map((s) => (s.id === nueva.id ? nueva : s)));
    if (repintar) pintarBloques();
    pintarTotal();
  }

  // ── pintar ─────────────────────────────────────────────────────────
  function pintarSelector() {
    selSesion.replaceChildren();
    const lista = ctx.sesiones();
    if (lista.length === 0) selSesion.append(el("option", { text: "Sin sesiones: pulsa + Nueva", attrs: { value: "" } }));
    for (const s of lista) {
      const o = el("option", { text: s.titulo + (s.fecha ? ` · ${s.fecha}` : ""), attrs: { value: s.id } });
      if (s.id === actualId) o.selected = true;
      selSesion.append(o);
    }
    selSesion.hidden = compartida !== null;
  }

  function pintarDatos() {
    const s = actual();
    const bloqueada = compartida !== null;
    for (const c of [inpTitulo, inpFecha, inpHora, inpEquipo, txtObjetivo]) c.disabled = bloqueada || !s;
    inpTitulo.value = s?.titulo ?? "";
    inpFecha.value = s?.fecha ?? "";
    inpHora.value = s?.hora ?? "";
    inpEquipo.value = s?.equipo ?? "";
    txtObjetivo.value = s?.objetivo ?? "";
  }

  function pintarTotal() {
    const s = actual();
    if (!s) {
      totalEl.textContent = "";
      return;
    }
    const fin = textoFin(s);
    totalEl.textContent = `${s.bloques.length} ${s.bloques.length === 1 ? "bloque" : "bloques"} · Total: ${textoDuracion(totalMinutos(s))}${fin ? ` · termina a las ${fin}` : ""}`;
    // las horas de inicio dependen de los minutos: se refrescan sin reconstruir la lista
    listaEl.querySelectorAll<HTMLElement>("[data-ini]").forEach((e, i) => (e.textContent = textoInicio(s, i)));
  }

  function pintarAnadir() {
    selAnadir.replaceChildren();
    const grupo = (label: string, opciones: { v: string; t: string }[]) => {
      if (!opciones.length) return;
      const g = el("optgroup", { attrs: { label } });
      for (const o of opciones) g.append(el("option", { text: o.t, attrs: { value: o.v } }));
      selAnadir.append(g);
    };
    grupo("Mis jugadas y ejercicios", ctx.biblio().map((j) => ({ v: "b:" + j.id, t: j.nombre })));
    grupo("Ejercicios de entrenamiento", PLANTILLAS_EJERCICIOS.map((p) => ({ v: "e:" + p.id, t: p.nombre })));
    grupo("Plantillas de jugadas", PLANTILLAS.map((p) => ({ v: "p:" + p.id, t: p.nombre })));
    rapidosEl.replaceChildren();
    for (const b of BLOQUES_TEXTO_TIPO) {
      rapidosEl.append(el("button", { cls: "pz-bn pz-bn-2 pz-bn-sm", text: "+ " + b.titulo, attrs: { type: "button", "data-rapido": b.titulo } }));
    }
    rapidosEl.append(el("button", { cls: "pz-bn pz-bn-2 pz-bn-sm", text: "+ Otro bloque", attrs: { type: "button", "data-rapido": "" } }));
  }

  function pintarBloques() {
    const s = actual();
    const bloqueada = compartida !== null;
    listaEl.replaceChildren();
    hoja.classList.toggle("pz-ses-ro", bloqueada);
    if (!s) {
      listaEl.append(el("li", { cls: "pz-vacio", text: "Crea una sesión con «+ Nueva» y añade ejercicios de tu biblioteca o bloques de texto." }));
      return;
    }
    if (s.bloques.length === 0) {
      listaEl.append(el("li", { cls: "pz-vacio", text: "Aún no hay bloques. Añade un ejercicio o un bloque de texto (calentamiento, charla…)." }));
    }
    s.bloques.forEach((b, i) => {
      const j = b.tipo === "jugada" && b.jugadaId ? buscarJugada(b.jugadaId) : undefined;
      const li = el("li", { cls: "pz-bl", attrs: { "data-i": String(i) } });
      // los controles actúan sobre la sesión ACTUAL (no la de cuando se pintó la fila): si no, un
      // cambio de notas se perdería al guardar después el material del mismo bloque
      const cur = (): Sesion => actual() ?? s;
      const pos = (): number => cur().bloques.findIndex((x) => x.id === b.id);
      const asa = el("button", { cls: "pz-bl-asa", text: "≡", attrs: { type: "button", "aria-label": `Arrastrar el bloque ${i + 1} para reordenarlo`, title: "Arrastra para reordenar" } });
      const arriba = el("button", {
        cls: "pz-bl-btn",
        text: "↑",
        attrs: { type: "button", "aria-label": "Subir el bloque", ...(i === 0 ? { disabled: "" } : {}) },
        on: { click: () => guardar(subirBloque(cur(), pos())) },
      });
      const abajo = el("button", {
        cls: "pz-bl-btn",
        text: "↓",
        attrs: { type: "button", "aria-label": "Bajar el bloque", ...(i === s.bloques.length - 1 ? { disabled: "" } : {}) },
        on: { click: () => guardar(bajarBloque(cur(), pos())) },
      });
      const orden = el("div", { cls: "pz-bl-ord" }, asa, arriba, abajo);
      if (!bloqueada) asa.addEventListener("pointerdown", (e) => arrastrar(e, li, i));
      else orden.hidden = true;

      const ini = el("div", { cls: "pz-bl-ini", text: textoInicio(s, i), attrs: { "data-ini": "" } });
      const th = el("div", { cls: "pz-bl-th" });
      if (j) th.innerHTML = renderSvgCompleto(opcionesResumen(j, "todos", PALETAS[ctx.paleta() === "oscura" ? "oscura" : "neutra"]));
      else th.append(el("span", { cls: "pz-bl-th-txt", text: b.tipo === "jugada" ? "Jugada borrada" : "Texto" }));

      const principal = el("div", { cls: "pz-bl-main" });
      if (b.tipo === "jugada") {
        const cat = j ? (CATEGORIAS.find((c) => c.id === j.categoria)?.label ?? "") : "";
        principal.append(el("strong", { cls: "pz-bl-nom", text: j ? j.nombre : b.titulo }));
        principal.append(el("span", { cls: "pz-bl-meta", text: j ? `${cat} · ${j.pasos.length} ${j.pasos.length === 1 ? "paso" : "pasos"}` : "Esta jugada ya no está en tu biblioteca" }));
        if (j) {
          principal.append(
            el("button", { cls: "pz-bl-link", text: "Abrir en la pizarra", attrs: { type: "button" }, on: { click: () => abrirJugada(j) } })
          );
        }
      } else {
        const t = el("input", {
          cls: "pz-inp pz-bl-titulo",
          attrs: { type: "text", maxlength: "80", "aria-label": "Título del bloque", autocomplete: "off", value: b.titulo, ...(bloqueada ? { disabled: "" } : {}) },
          on: { change: (e) => guardar(ajustarBloque(cur(), b.id, { titulo: (e.target as HTMLInputElement).value }), false) },
        });
        t.value = b.titulo;
        principal.append(t);
      }
      const notas = el("textarea", {
        cls: "pz-inp pz-bl-notas",
        attrs: { rows: "2", maxlength: String(LIMITES_SESION.NOTAS), placeholder: "Notas: qué se trabaja, variantes, qué corregir…", "aria-label": "Notas del bloque", ...(bloqueada ? { disabled: "" } : {}) },
        on: { change: (e) => guardar(ajustarBloque(cur(), b.id, { notas: (e.target as HTMLTextAreaElement).value }), false) },
      });
      notas.value = b.notas;
      const material = el("input", {
        cls: "pz-inp pz-bl-material",
        attrs: { type: "text", maxlength: String(LIMITES_SESION.MATERIAL), placeholder: "Material: balones, conos, petos…", "aria-label": "Material del bloque", autocomplete: "off", ...(bloqueada ? { disabled: "" } : {}) },
        on: { change: (e) => guardar(ajustarBloque(cur(), b.id, { material: (e.target as HTMLInputElement).value }), false) },
      });
      material.value = b.material;
      principal.append(notas, material);

      const min = el("input", {
        cls: "pz-inp pz-bl-min",
        attrs: { type: "number", min: String(LIMITES_SESION.MIN_BLOQUE), max: String(LIMITES_SESION.MAX_BLOQUE), step: "1", inputmode: "numeric", "aria-label": "Duración en minutos", ...(bloqueada ? { disabled: "" } : {}) },
        on: {
          change: (e) => {
            const inp = e.target as HTMLInputElement;
            const nuevo = ajustarBloque(cur(), b.id, { minutos: Number(inp.value) });
            inp.value = String(nuevo.bloques.find((x) => x.id === b.id)?.minutos ?? b.minutos);
            guardar(nuevo, false);
          },
        },
      });
      min.value = String(b.minutos);
      const minBox = el("label", { cls: "pz-bl-minbox" }, el("span", { text: "Min" }), min);

      const acc = el("div", { cls: "pz-bl-acc" });
      if (!bloqueada) {
        acc.append(
          el("button", { cls: "pz-bl-btn", text: "Duplicar", attrs: { type: "button", "aria-label": "Duplicar el bloque" }, on: { click: () => guardar(duplicarBloque(cur(), b.id)) } }),
          el("button", { cls: "pz-bl-btn pz-bl-del", text: "Quitar", attrs: { type: "button", "aria-label": "Quitar el bloque" }, on: { click: () => guardar(quitarBloque(cur(), b.id)) } })
        );
      }
      li.append(orden, ini, th, principal, minBox, acc);
      listaEl.append(li);
    });
    pintarTotal();
  }

  function pintarTodo() {
    pintarSelector();
    pintarDatos();
    pintarAnadir();
    pintarBloques();
    bannerEl.hidden = compartida === null;
    root.querySelectorAll<HTMLElement>("[data-ses-edit]").forEach((e) => (e.hidden = compartida !== null));
    infoEl.textContent = "";
  }

  // ── reordenar arrastrando ──────────────────────────────────────────
  function arrastrar(e: PointerEvent, li: HTMLElement, i: number) {
    const s = actual();
    if (!s || compartida) return;
    e.preventDefault();
    const asa = e.currentTarget as HTMLElement;
    try {
      asa.setPointerCapture(e.pointerId);
    } catch {
      /* no pasa nada */
    }
    const items = [...listaEl.children] as HTMLElement[];
    const rects = items.map((x) => x.getBoundingClientRect());
    const y0 = e.clientY;
    let destino = i;
    li.classList.add("pz-bl-arrastrando");
    const mover = (ev: PointerEvent) => {
      const dy = ev.clientY - y0;
      li.style.transform = `translateY(${dy}px)`;
      const yc = rects[i].top + rects[i].height / 2 + dy;
      let mejor = 0;
      let md = Infinity;
      rects.forEach((r, k) => {
        const d = Math.abs(yc - (r.top + r.height / 2));
        if (d < md) {
          md = d;
          mejor = k;
        }
      });
      destino = mejor;
      items.forEach((x, k) => x.classList.toggle("pz-bl-destino", k === destino && k !== i));
    };
    const fin = (ev: PointerEvent) => {
      asa.removeEventListener("pointermove", mover);
      asa.removeEventListener("pointerup", fin);
      asa.removeEventListener("pointercancel", fin);
      try {
        asa.releasePointerCapture(ev.pointerId);
      } catch {
        /* ya soltado */
      }
      li.style.transform = "";
      items.forEach((x) => x.classList.remove("pz-bl-destino", "pz-bl-arrastrando"));
      const fresca = actual();
      if (ev.type !== "pointercancel" && destino !== i && fresca) guardar(moverBloque(fresca, i, destino));
    };
    asa.addEventListener("pointermove", mover);
    asa.addEventListener("pointerup", fin);
    asa.addEventListener("pointercancel", fin);
  }

  // ── acciones ───────────────────────────────────────────────────────
  function abrirJugada(j: Jugada) {
    cerrar();
    ctx.abrirJugada(j, compartida !== null || !ctx.biblio().some((x) => x.id === j.id));
  }

  function nueva() {
    const s = nuevaSesion({ fecha: hoyLocal() });
    ctx.setSesiones([s, ...ctx.sesiones()]);
    actualId = s.id;
    compartida = null;
    pintarTodo();
    inpTitulo.focus();
    inpTitulo.select();
  }

  /** Guarda una sesión recién creada (por edad o con IA) con sus ejercicios y la abre. */
  function guardarCreada(creada: { sesion: Sesion; jugadas: Jugada[] }) {
    // La sesión referencia los IDs que genera la plantilla. `asegurarJugada`
    // puede reutilizar una copia existente, así que remapeamos cada bloque al ID
    // real antes de guardar la nueva sesión.
    const mapa = new Map<string, string>();
    for (const j of creada.jugadas) mapa.set(j.id, ctx.asegurarJugada(j).id);
    for (const b of creada.sesion.bloques) {
      if (b.jugadaId) b.jugadaId = mapa.get(b.jugadaId) ?? b.jugadaId;
    }
    creada.sesion.fecha = hoyLocal();
    ctx.setSesiones([creada.sesion, ...ctx.sesiones()]);
    actualId = creada.sesion.id;
    pintarTodo();
  }

  function crearPorEdad(id: string) {
    if (compartida) return;
    const creada = crearSesionPorEdad(id, opcionesEdad);
    if (!creada) return;
    guardarCreada(creada);
    const etapa = SESIONES_POR_EDAD.find((x) => x.id === id)?.etapa ?? "Sesión";
    const obj = OBJETIVOS_SESION.find((o) => o.id === opcionesEdad.objetivo)?.nombre.toLowerCase();
    ctx.toast(creada.objetivoAplicado ? `${etapa} lista para editar` : `${etapa} no tiene bloques de ${obj}: se ha creado la sesión general`, 4500);
  }

  // Con IA: la etapa se elige aquí; duración y jugadores salen de los campos de arriba.
  // Si la IA no responde, se crea la sesión base de la etapa con esas mismas opciones.
  let generando = false;
  async function crearConIA() {
    if (compartida || generando) return;
    const etapaId = selEtapaIA.value;
    const plantilla = SESIONES_POR_EDAD.find((x) => x.id === etapaId);
    const peticion = txtIA.value.trim();
    if (!plantilla) return;
    if (peticion.length < 3) {
      ctx.toast("Escribe qué quieres trabajar en la sesión");
      txtIA.focus();
      return;
    }
    const duracion = Math.min(DURACION_IA_MAX, Math.max(DURACION_IA_MIN, opcionesEdad.duracion ?? minutosSesionPorEdad(etapaId, opcionesEdad)));
    const pistaMini = etapaId === "premini" || etapaId === "mini";
    generando = true;
    btnIA.disabled = true;
    btnIA.textContent = "Generando… (unos 15 s)";
    let plan: PlanIA | null = null;
    try {
      const r = await fetch("/api/sesion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ etapa: etapaId, duracion, jugadores: opcionesEdad.jugadores ?? null, peticion }),
        signal: AbortSignal.timeout(32000),
      });
      if (r.ok) plan = leerPlanIA(await r.json());
    } catch {
      plan = null;
    } finally {
      generando = false;
      btnIA.disabled = false;
      btnIA.textContent = "Generar con IA";
    }
    if (plan) {
      guardarCreada(crearSesionDesdePlan(plan, { pistaMini, nota: "Generada con IA: revísala antes de usarla." }));
      ctx.toast("Sesión generada: revisa y ajusta lo que quieras", 4500);
      return;
    }
    const objetivo = !opcionesEdad.objetivo || opcionesEdad.objetivo === "general" ? objetivoDeTexto(peticion) : opcionesEdad.objetivo;
    const base = crearSesionPorEdad(etapaId, { ...opcionesEdad, objetivo, duracion });
    if (!base) return;
    guardarCreada(base);
    ctx.toast(`La IA no responde ahora: te dejo la sesión base de ${plantilla.etapa} con ${duracion} min`, 6000);
  }

  function duplicar() {
    const s = actual();
    if (!s || compartida) return;
    const c = copiarSesion(s, " (copia)");
    ctx.setSesiones([c, ...ctx.sesiones()]);
    actualId = c.id;
    pintarTodo();
    ctx.toast("Sesión duplicada");
  }

  let borrarT = 0;
  function borrar(btn: HTMLElement) {
    const s = actual();
    if (!s || compartida) return;
    if (btn.dataset.seguro !== "1") {
      btn.dataset.seguro = "1";
      btn.textContent = "¿Seguro?";
      btn.classList.add("peligro");
      window.clearTimeout(borrarT);
      borrarT = window.setTimeout(() => {
        btn.dataset.seguro = "0";
        btn.textContent = "Borrar";
        btn.classList.remove("peligro");
      }, 3000);
      return;
    }
    window.clearTimeout(borrarT);
    btn.dataset.seguro = "0";
    btn.textContent = "Borrar";
    btn.classList.remove("peligro");
    const resto = ctx.sesiones().filter((x) => x.id !== s.id);
    ctx.setSesiones(resto);
    actualId = resto[0]?.id ?? "";
    pintarTodo();
    ctx.toast("Sesión borrada");
  }

  function anadirSeleccion() {
    const s = actual();
    if (!s || compartida) return;
    const v = selAnadir.value;
    if (!v) return void ctx.toast("No hay nada que añadir todavía.");
    if (s.bloques.length >= LIMITES_SESION.BLOQUES) return void ctx.toast("Máximo de bloques alcanzado.");
    const [tipo, id] = [v.slice(0, 1), v.slice(2)];
    let j: Jugada | undefined;
    if (tipo === "b") j = ctx.biblio().find((x) => x.id === id);
    else if (tipo === "e") j = PLANTILLAS_EJERCICIOS.find((x) => x.id === id)?.crear();
    else if (tipo === "p") j = PLANTILLAS.find((x) => x.id === id)?.crear();
    if (!j) return;
    // un ejercicio de las plantillas pasa a la biblioteca: la sesión siempre apunta a la biblioteca
    const guardada = tipo === "b" ? j : ctx.asegurarJugada(j);
    guardar(anadirBloqueJugada(s, guardada));
    pintarAnadir();
    listaEl.lastElementChild?.scrollIntoView({ block: "nearest" });
  }

  function anadirRapido(titulo: string) {
    const s = actual();
    if (!s || compartida) return;
    const min = BLOQUES_TEXTO_TIPO.find((b) => b.titulo === titulo)?.minutos ?? 10;
    guardar(anadirBloqueTexto(s, titulo || "Bloque de texto", min));
    if (!titulo) {
      const t = listaEl.querySelector<HTMLInputElement>("li:last-child .pz-bl-titulo");
      t?.focus();
      t?.select();
    }
  }

  async function urlSesion(): Promise<string | null> {
    const s = actual();
    if (!s) return null;
    const payload = await codificarEnlaceSesion(s, [...ctx.biblio(), ...ctx.jugadasCompartidas(), ...(compartida?.jugadas ?? [])]);
    return `${ctx.urlBase()}#j=${payload}`;
  }

  async function copiarEnlace() {
    try {
      const url = await urlSesion();
      if (!url) return void ctx.toast("Crea primero una sesión.");
      infoEl.textContent =
        url.length > 8000
          ? `Enlace muy largo (${url.length} caracteres): algunas apps lo cortan. Mejor imprime o comparte el PDF.`
          : `${url.length} caracteres · la sesión y sus ejercicios viajan dentro del enlace, no se suben a ningún servidor`;
      infoEl.classList.toggle("warn", url.length > 8000);
      if (await ctx.copiar(url)) ctx.toast("Enlace de la sesión copiado: pégalo en WhatsApp o donde quieras");
      else ctx.toast("No se pudo copiar el enlace automáticamente.");
    } catch {
      ctx.toast("No se pudo generar el enlace de la sesión.");
    }
  }

  async function compartirNativo() {
    const s = actual();
    try {
      const url = await urlSesion();
      if (!s || !url) return void ctx.toast("Crea primero una sesión.");
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ title: s.titulo, text: `Sesión de entrenamiento: ${s.titulo}`, url });
          return;
        } catch (e) {
          if (e instanceof DOMException && e.name === "AbortError") return;
        }
      }
      if (await ctx.copiar(url)) ctx.toast("Tu navegador no tiene menú de compartir: enlace copiado");
    } catch {
      ctx.toast("No se pudo compartir la sesión.");
    }
  }

  function guardarCompartida() {
    if (!compartida) return;
    const mapa = ctx.guardarJugadas(compartida.jugadas);
    const s = copiarSesion(remapearJugadas(compartida.sesion, mapa));
    ctx.setSesiones([s, ...ctx.sesiones()]);
    compartida = null;
    actualId = s.id;
    pintarTodo();
    ctx.toast("Sesión y ejercicios guardados en tu biblioteca");
  }

  // ── impresión / PDF ────────────────────────────────────────────────
  function imprimir() {
    const s = actual();
    if (!s) return void ctx.toast("Crea primero una sesión.");
    const pal = PALETAS.neutra;
    const p = ctx.printEl;
    p.replaceChildren();
    const sec = el("section", { cls: "pz-print-ses" });
    const cab = ctx.marca?.();
    if (cab) sec.append(cab);
    sec.append(el("h2", { text: s.titulo }));
    const fecha = fechaLarga(s.fecha);
    const meta = [fecha, s.equipo, s.hora ? `Inicio ${s.hora}` : ""].filter(Boolean).join(" · ");
    if (meta) sec.append(el("p", { cls: "pz-print-meta", text: meta }));
    if (s.objetivo) sec.append(el("p", { cls: "pz-print-notas", text: "Objetivo: " + s.objetivo }));
    const fin = textoFin(s);
    sec.append(el("p", { cls: "pz-print-meta", text: `Duración total: ${textoDuracion(totalMinutos(s))}${fin ? ` (${s.hora} – ${fin})` : ""}` }));
    const tabla = el("table", { cls: "pz-print-tabla" });
    tabla.append(el("thead", {}, el("tr", {}, el("th", { text: s.hora ? "Hora" : "Minuto" }), el("th", { text: "Dur." }), el("th", { text: "Bloque" }), el("th", { text: "Notas y material" }), el("th", { text: "Esquema" }))));
    const cuerpo = el("tbody");
    s.bloques.forEach((b, i) => {
      const j = b.tipo === "jugada" && b.jugadaId ? buscarJugada(b.jugadaId) : undefined;
      const notas = el("td", {});
      if (b.notas) notas.append(el("div", { cls: "pz-print-bl-notas", text: b.notas }));
      if (b.material) notas.append(el("div", { cls: "pz-print-bl-mat", text: "Material: " + b.material }));
      // lo que ya explica el propio ejercicio (cómo se hace, qué se corrige) sale debajo, en pequeño
      if (j && j.notas) notas.append(el("div", { cls: "pz-print-bl-ej", text: j.notas }));
      const esq = el("td", { cls: "pz-print-esq" });
      if (j) {
        const box = el("div", {});
        box.innerHTML = renderSvgCompleto(opcionesResumen(j, "todos", pal));
        esq.append(box);
      }
      cuerpo.append(el("tr", {}, el("td", { cls: "pz-print-ini", text: textoInicio(s, i).replace("min ", "") + (s.hora ? "" : "'") }), el("td", { text: `${b.minutos}'` }), el("td", { cls: "pz-print-nom", text: j ? j.nombre : b.titulo }), notas, esq));
    });
    tabla.append(cuerpo);
    sec.append(tabla);
    sec.append(el("p", { cls: "pz-print-pie", text: "canchazapa.com/pizarra" }));
    p.append(sec);
    ctx.lanzarImpresion();
  }

  // ── abrir / cerrar ─────────────────────────────────────────────────
  function abrir() {
    // una sesión compartida sin guardar sigue ahí hasta que se guarda o se descarta
    if (compartida) return abrirCompartida(compartida);
    const lista = ctx.sesiones();
    if (!lista.some((s) => s.id === actualId)) actualId = lista[0]?.id ?? "";
    hoja.hidden = false;
    document.documentElement.classList.add("pz-fs-lock", "pz-modal");
    pintarTodo();
  }

  function abrirCompartida(c: CargaSesion) {
    compartida = c;
    hoja.hidden = false;
    document.documentElement.classList.add("pz-fs-lock", "pz-modal");
    pintarTodo();
  }

  function cerrar() {
    hoja.hidden = true;
    document.documentElement.classList.remove("pz-fs-lock", "pz-modal");
  }

  // ── eventos ────────────────────────────────────────────────────────
  const edita = (fn: (s: Sesion, v: string) => Partial<Sesion>) => (e: Event) => {
    const s = actual();
    if (!s || compartida) return;
    const v = (e.target as HTMLInputElement).value;
    const nueva = { ...s, ...fn(s, v) };
    guardar(nueva, false);
    pintarSelector();
  };
  inpTitulo.addEventListener("change", edita((_, v) => ({ titulo: v.trim().slice(0, LIMITES_SESION.TITULO) || "Entrenamiento sin título" })));
  inpFecha.addEventListener("change", edita((_, v) => ({ fecha: /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : "" })));
  inpHora.addEventListener("change", edita((_, v) => ({ hora: /^([01]\d|2[0-3]):[0-5]\d$/.test(v) ? v : "" })));
  inpEquipo.addEventListener("change", edita((_, v) => ({ equipo: v.slice(0, LIMITES_SESION.EQUIPO) })));
  txtObjetivo.addEventListener("change", edita((_, v) => ({ objetivo: v.slice(0, LIMITES_SESION.OBJETIVO) })));
  selSesion.addEventListener("change", () => {
    actualId = selSesion.value;
    pintarTodo();
  });
  rapidosEl.addEventListener("click", (e) => {
    const b = (e.target as Element).closest<HTMLElement>("[data-rapido]");
    if (b) anadirRapido(b.dataset.rapido ?? "");
  });
  hoja.addEventListener("click", (e) => {
    const b = (e.target as Element).closest<HTMLElement>("[data-ses]");
    if (!b) return;
    switch (b.dataset.ses) {
      case "cerrar":
        return cerrar();
      case "nueva":
        return nueva();
      case "duplicar":
        return duplicar();
      case "borrar":
        return borrar(b);
      case "anadir":
        return anadirSeleccion();
      case "enlace":
        return void copiarEnlace();
      case "compartir":
        return void compartirNativo();
      case "imprimir":
        return imprimir();
      case "guardar-compartida":
        return guardarCompartida();
      case "descartar-compartida":
        compartida = null;
        return abrir();
      default:
    }
  });
  edadEl.addEventListener("click", (e) => {
    const b = (e.target as Element).closest<HTMLButtonElement>("[data-ses-edad]");
    if (b) crearPorEdad(b.dataset.sesEdad ?? "");
  });

  // Objetivo, duración y jugadores: se aplican a la sesión que se cree con los botones de etapa.
  let opcionesEdad: OpcionesSesionEdad = {};
  const opEl = el("div", { cls: "pz-ses-edad-op" });
  const campo = (texto: string, control: HTMLElement) => el("label", { cls: "pz-ses-edad-campo" }, el("span", { text: texto }), control);
  const selObj = el("select", { cls: "pz-inp", attrs: { "aria-label": "Objetivo de la sesión" } });
  for (const o of OBJETIVOS_SESION) selObj.append(el("option", { text: o.nombre, attrs: { value: o.id } }));
  const selDur = el("select", { cls: "pz-inp", attrs: { "aria-label": "Duración de la sesión" } });
  selDur.append(el("option", { text: "Estándar", attrs: { value: "" } }));
  for (const d of DURACIONES_SESION) selDur.append(el("option", { text: `${d} min`, attrs: { value: String(d) } }));
  const inpJug = el("input", {
    cls: "pz-inp",
    attrs: { type: "number", min: String(JUGADORES_MIN), max: String(JUGADORES_MAX), inputmode: "numeric", placeholder: "—", "aria-label": "Jugadores disponibles" },
  });
  opEl.append(campo("Objetivo", selObj), campo("Duración", selDur), campo("Jugadores", inpJug));
  const botonesEdadEl = el("div", { cls: "pz-ses-edad-btns" });
  edadEl.append(opEl, botonesEdadEl);
  const leerOpciones = () => {
    const j = Number(inpJug.value);
    opcionesEdad = {
      objetivo: selObj.value as OpcionesSesionEdad["objetivo"],
      duracion: Number(selDur.value) || undefined,
      jugadores: Number.isFinite(j) && j >= JUGADORES_MIN && j <= JUGADORES_MAX ? j : undefined,
    };
    pintarSesionesEdad();
  };
  for (const c of [selObj, selDur, inpJug]) c.addEventListener("change", leerOpciones);

  function pintarSesionesEdad() {
    botonesEdadEl.replaceChildren();
    for (const plantilla of SESIONES_POR_EDAD) {
      const minutos = minutosSesionPorEdad(plantilla.id, opcionesEdad);
      const b = el("button", {
        cls: "pz-ses-edad-btn",
        attrs: { type: "button", "data-ses-edad": plantilla.id, title: `Crear sesión de ${plantilla.etapa}` },
      });
      b.append(
        el("strong", { text: plantilla.etapa }),
        el("span", { cls: "pz-ses-edad-meta", text: `${plantilla.edades} · ${minutos} min` }),
        el("span", { cls: "pz-ses-edad-desc", text: plantilla.resumen })
      );
      botonesEdadEl.append(b);
    }
  }
  pintarSesionesEdad();

  const selEtapaIA = el("select", { cls: "pz-inp", attrs: { "aria-label": "Etapa del equipo" } });
  for (const p of SESIONES_POR_EDAD) selEtapaIA.append(el("option", { text: `${p.etapa} (${p.edades})`, attrs: { value: p.id } }));
  selEtapaIA.value = "infantil";
  const txtIA = el("textarea", {
    cls: "pz-inp",
    attrs: {
      rows: "2",
      maxlength: String(PETICION_MAX),
      placeholder: "Ej.: bloqueo directo y su defensa, y acabar con 5c5",
      "aria-label": "Qué quieres trabajar",
    },
  });
  const btnIA = el("button", { cls: "pz-bn pz-ses-ia-btn", text: "Generar con IA", attrs: { type: "button", "data-pro": "pizarra-sesion-ia" } });
  btnIA.addEventListener("click", () => void crearConIA());
  edadEl.append(
    el(
      "div",
      { cls: "pz-ses-ia" },
      el("strong", { cls: "pz-ses-ia-tit", text: "O pídesela a la IA" }),
      campo("Etapa", selEtapaIA),
      campo("Qué quieres trabajar", txtIA),
      el("p", { cls: "pz-ses-ia-nota", text: "Usa la duración y los jugadores de arriba. No escribas nombres de jugadores: solo se envía este texto y no se guarda." }),
      btnIA
    )
  );

  return { abrir, abrirCompartida, cerrar, estaAbierta: () => !hoja.hidden };
}
