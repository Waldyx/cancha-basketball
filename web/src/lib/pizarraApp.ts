// Interfaz de la pizarra (/pizarra): enlaza el DOM de pizarra.astro con la lógica
// pura de pizarra.ts y el render de pizarraRender.ts. Todo lo que viene de fuera
// (hash, archivo .json, localStorage) pasa por normalizar* antes de usarse, y el
// texto del usuario solo entra en el DOM con textContent/value o escapado en SVG.

import {
  CATEGORIAS,
  LIMITES,
  TIPOS_LINEA,
  anadirLinea,
  anadirPieza,
  anadirTexto,
  anadirZona,
  ajustarPieza,
  cajaVista,
  cambiarCancha,
  cambiarPista,
  clonar,
  codificarEnlace,
  compactar,
  confirmar,
  deVista,
  decodificarEnlace,
  deshacer,
  dist,
  distAPolilinea,
  flechaPorDefecto,
  duplicarPaso,
  estadoEnTiempo,
  hayCompresion,
  insertarPaso,
  libroAJson,
  leerLibroDeTexto,
  limitaPunto,
  limpiaTexto,
  limpiarPaso,
  moverPiezaEn,
  nombreArchivo,
  normalizarJugada,
  normalizarLibro,
  nuevaJugada,
  nuevoHistorial,
  payloadDeHash,
  tipoDePayload,
  polilinea,
  posicionesEnTransicion,
  puestosFila,
  puntoEnZona,
  quitarLinea,
  quitarZona,
  quitarPaso,
  quitarPieza,
  quitarTexto,
  rehacer,
  renombrarPieza,
  simplifica,
  textoUltimaCopia,
  tocaRecordarCopia,
  uid,
  zonaDesdeEsquinas,
  ZONA_POR_DEFECTO,
  ZONA_MIN,
  ZONA_MAX,
  FILA,
  MINIBASKET,
  DURACION_TRANSICION,
  PAUSA_PASO,
  duracionTotal,
  type CargaEnlace,
  type Categoria,
  type Historial,
  type Jugada,
  type Linea,
  type Orient,
  type Paso,
  type FormaZona,
  type Pieza,
  type Pt,
  type TipoLinea,
  type TipoPieza,
  type Zona,
} from "./pizarra";
import {
  PALETAS,
  RADIO_PIEZA,
  renderCuadro,
  renderHoja,
  renderSvgCompleto,
  renderTablero,
  type NombrePaleta,
} from "./pizarraRender";
import { PLANTILLAS, PLANTILLAS_EJERCICIOS } from "./pizarraPlantillas";
import { FORMACIONES, aplicarFormacion, aroDe, formacionPorId } from "./pizarraFormaciones";
import { decodificarEnlaceSesion, normalizarSesiones, remapearJugadas, sesionesDeLibro, type Sesion } from "./pizarraSesion";
import { iniciarSesiones, type ControlSesiones } from "./pizarraSesionUI";

const CLAVE = "cz.pizarra.v1";
const MS_DIA = 86_400_000;

type Herr =
  | "select"
  | "atq"
  | "def"
  | "balon"
  | "cono"
  | "neu"
  | "ent"
  | "fila"
  | "pase"
  | "bote"
  | "corte"
  | "bloqueo"
  | "tiro"
  | "libre"
  | "rotacion"
  | "zona"
  | "elipse"
  | "texto";
type Sel = { tipo: "pieza" | "linea" | "texto" | "zona"; id: string };
type Golpe = Sel | { tipo: "manejador"; id: string; cual: "ini" | "fin" | "mid" } | { tipo: "asa-zona"; id: string };
type Drag =
  | { k: "pieza"; id: string; off: Pt; propagar: boolean; origen: Pt; movido: boolean }
  | { k: "texto"; id: string; off: Pt; origen: Pt; movido: boolean }
  | { k: "zona"; id: string; off: Pt; origen: Pt; movido: boolean }
  | { k: "zona-tam"; id: string; origen: Pt; movido: boolean }
  | { k: "zona-nueva"; forma: FormaZona; ini: Pt }
  | { k: "manej"; id: string; cual: "ini" | "fin" | "mid"; origen: Pt; movido: boolean }
  | { k: "dibujo" };

/** Gesto en curso en modo tiempo muerto (antes de saber si mueve, dibuja o solo toca). */
interface TmGesto {
  /** Pieza bajo el dedo ("" si empezó en vacío). */
  id: string;
  /** Línea bajo el dedo si no había pieza. */
  linea: string | null;
  p0: Pt;
  px0: { x: number; y: number };
  /** La pieza ya estaba seleccionada al tocar: el arrastre dibuja flecha. */
  selYa: boolean;
  /** Toque largo cumplido: el arrastre dibuja flecha. */
  armado: boolean;
  modo: "pend" | "activo";
  timer: number;
}

const TIPO_PIEZA_DE: Partial<Record<Herr, TipoPieza>> = { atq: "atq", def: "def", balon: "balon", cono: "cono", neu: "neu", ent: "ent", fila: "fila" };
const TIPO_LINEA_DE: Partial<Record<Herr, TipoLinea>> = { pase: "pase", bote: "bote", corte: "corte", bloqueo: "bloqueo", tiro: "tiro", libre: "libre", rotacion: "rotacion" };

const AYUDA: Record<Herr, string> = {
  select: "Toca una pieza o una línea para seleccionarla. Arrastra para moverla.",
  atq: "Toca la pista para colocar un atacante (se numera solo).",
  def: "Toca la pista para colocar un defensor.",
  balon: "Toca la pista para colocar el balón.",
  cono: "Toca la pista para colocar un cono.",
  neu: "Toca la pista para colocar un jugador neutro (verde, sin número). Su letra se cambia al seleccionarlo.",
  ent: "Toca la pista para colocar al entrenador (E).",
  fila: "Toca la pista para colocar una fila de jugadores. Selecciónala para cambiar cuántos son y hacia dónde mira.",
  rotacion: "Arrastra para dibujar la rotación: adónde va el jugador después (línea punteada fina).",
  zona: "Arrastra de una esquina a la opuesta para sombrear un rectángulo. Un toque crea uno por defecto.",
  elipse: "Arrastra de una esquina a la opuesta para sombrear una elipse. Un toque crea una por defecto.",
  pase: "Arrastra para dibujar un pase. Empieza sobre un jugador para unirlo a él.",
  bote: "Arrastra para dibujar un bote (zigzag). Empieza sobre el jugador que bota.",
  corte: "Arrastra para dibujar un desplazamiento o corte. Empieza sobre el jugador.",
  bloqueo: "Arrastra para dibujar un bloqueo (línea terminada en T).",
  tiro: "Arrastra desde el tirador hasta la canasta para dibujar un tiro.",
  libre: "Dibuja a mano alzada.",
  texto: "Toca donde quieras escribir una nota.",
};

const NOMBRE_LINEA: Record<TipoLinea, string> = {
  pase: "Pase",
  bote: "Bote",
  corte: "Desplazamiento / corte",
  bloqueo: "Bloqueo",
  tiro: "Tiro",
  libre: "Trazo libre",
  rotacion: "Rotación (después va a…)",
};

interface Almacen {
  jugadas: Jugada[];
  sesiones: Sesion[];
  borrador: Jugada | null;
  ultimaCopia: number | null;
  paleta: NombrePaleta;
  avisoCerrado: number | null;
}

function leerAlmacen(): Almacen {
  const vacio: Almacen = { jugadas: [], sesiones: [], borrador: null, ultimaCopia: null, paleta: "parquet", avisoCerrado: null };
  try {
    const raw = localStorage.getItem(CLAVE);
    if (!raw) return vacio;
    const o: unknown = JSON.parse(raw);
    if (typeof o !== "object" || o === null) return vacio;
    const r = o as Record<string, unknown>;
    const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v > 0 ? v : null);
    return {
      jugadas: normalizarLibro(r.jugadas).jugadas,
      sesiones: normalizarSesiones(r.sesiones).sesiones,
      borrador: r.borrador ? normalizarJugada(r.borrador) : null,
      ultimaCopia: num(r.ultimaCopia),
      paleta: r.paleta === "neutra" || r.paleta === "oscura" ? r.paleta : "parquet",
      avisoCerrado: num(r.avisoCerrado),
    };
  } catch {
    return vacio;
  }
}

function escribirAlmacen(a: Almacen): boolean {
  try {
    localStorage.setItem(CLAVE, JSON.stringify({ v: 1, ...a }));
    return true;
  } catch {
    return false;
  }
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

const sinTildes = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export function iniciarPizarra(): void {
  const rootEl = document.querySelector<HTMLElement>('[data-pz="app"]');
  if (!rootEl) return;
  const root: HTMLElement = rootEl;

  const q = <T extends HTMLElement = HTMLElement>(n: string): T => {
    const e = root.querySelector<T>(`[data-pz="${n}"]`);
    if (!e) throw new Error("pizarra: falta " + n);
    return e;
  };
  const svg = q<HTMLElement>("svg") as unknown as SVGSVGElement;
  const selbar = q("selbar");
  const boardEl = root.querySelector<HTMLElement>(".pz-board") ?? selbar;
  const hint = q("hint");
  const toastEl = q("toast");
  const pasosEl = q("pasos");
  const sideEl = q("side");
  const shareEl = q("share");
  const bannerEl = q("banner");
  const inpNombre = q<HTMLInputElement>("nombre");
  const selCat = q<HTMLSelectElement>("categoria");
  const txtNotas = q<HTMLTextAreaElement>("notas");
  const txtNotaPaso = q<HTMLTextAreaElement>("nota-paso");
  const listaEl = q("lista");
  const compartidasEl = q("compartidas");
  const plantillasEl = q("plantillas");
  const ejerciciosEl = q("ejercicios");
  const selPista = q<HTMLSelectElement>("pista");
  const inpBuscar = q<HTMLInputElement>("buscar");
  const selFiltro = q<HTMLSelectElement>("filtro-cat");
  const selVel = q<HTMLSelectElement>("vel");
  const infoPaso = q("paso-info");
  const avisoCopia = q("aviso-copia");
  const ultimaCopiaEl = q("ultima-copia");
  const inpEnlace = q<HTMLInputElement>("enlace");
  const infoEnlace = q("enlace-info");
  const fileEl = q<HTMLInputElement>("file");
  const formEl = q("formaciones");
  const formListaEl = q("formaciones-lista");
  const formEspejoEl = q("form-espejo");
  const printEl = document.querySelector<HTMLElement>('[data-pz="print"]') ?? document.body.appendChild(document.createElement("div"));

  // ── estado ──────────────────────────────────────────────────────────
  const almacen = leerAlmacen();
  let biblio: Jugada[] = almacen.jugadas;
  let sesiones: Sesion[] = almacen.sesiones;
  let control: ControlSesiones | null = null;
  let paleta: NombrePaleta = almacen.paleta;
  let ultimaCopia = almacen.ultimaCopia;
  let avisoCerrado = almacen.avisoCerrado;

  const inicial = almacen.borrador ?? PLANTILLAS[0].crear();
  let hist: Historial<Jugada> = nuevoHistorial(almacen.borrador ? inicial : { ...inicial, id: uid() });
  let trabajo: Jugada | null = null;
  let paso = 0;
  let herr: Herr = "select";
  let sel: Sel | null = null;
  let drag: Drag | null = null;
  let borrador: Linea | null = null;
  let zonaBorrador: Zona | null = null;
  let libreTmp: Pt[] = [];
  let anim: { k: number; t: number } | null = null;
  let reproduciendo = false;
  let raf = 0;
  let soloVista = false;
  let compartidas: Jugada[] = [];
  let guardadaJson = "";
  let avisoAlmacenFallo = false;
  let grabando = false;
  // modo tiempo muerto: trabaja sobre una copia de UN paso que no se guarda nunca
  const ESCALA_TM = 1.35;
  let tm = false;
  let tmReal: { hist: Historial<Jugada>; paso: number } | null = null;
  let tmBase: Jugada | null = null;
  let tmGesto: TmGesto | null = null;
  let tmFlecha: string | null = null;
  let formEspejo = false;

  const actual = (): Jugada => trabajo ?? hist.presente;
  const escalaPiezas = () => (tm ? ESCALA_TM : 1);
  /** En tiempo muerto la pista se pone apaisada si la pantalla lo es; si no, la vista guardada. */
  const orientVista = (): Orient => (tm ? (window.innerWidth >= window.innerHeight ? "h" : "v") : actual().orient);

  // ── utilidades de UI ────────────────────────────────────────────────
  let toastT = 0;
  function toast(msg: string, ms = 3400) {
    toastEl.textContent = msg;
    toastEl.classList.add("on");
    window.clearTimeout(toastT);
    toastT = window.setTimeout(() => toastEl.classList.remove("on"), ms);
  }

  function persistir(inmediato = false) {
    const hacer = () => {
      const ok = escribirAlmacen({
        jugadas: biblio,
        sesiones,
        borrador: soloVista ? null : (tmReal ? tmReal.hist.presente : hist.presente),
        ultimaCopia,
        paleta,
        avisoCerrado,
      });
      if (!ok && !avisoAlmacenFallo) {
        avisoAlmacenFallo = true;
        toast("Este navegador no deja guardar datos (¿modo incógnito?). Usa Copia de seguridad para no perder la jugada.", 7000);
      }
    };
    if (inmediato) {
      window.clearTimeout(persistirT);
      hacer();
    } else {
      window.clearTimeout(persistirT);
      persistirT = window.setTimeout(hacer, 500);
    }
  }
  let persistirT = 0;

  function aCanon(e: { clientX: number; clientY: number }): Pt {
    const m = svg.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    const q2 = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return deVista({ x: q2.x, y: q2.y }, orientVista());
  }

  /** Píxeles de pantalla -> metros de pista (para zonas táctiles cómodas). */
  function enMetros(px: number): number {
    const m = svg.getScreenCTM();
    return px / (m ? Math.max(1, m.a) : 20);
  }

  // ── render ──────────────────────────────────────────────────────────
  function pintar() {
    const j = actual();
    const s = j.pasos[Math.min(paso, j.pasos.length - 1)];
    const orv = orientVista();
    const vb = cajaVista(j.cancha, orv);
    svg.setAttribute("viewBox", `${vb.x} ${vb.y} ${vb.w} ${vb.h}`);
    boardEl.style.setProperty("--pz-ar", `${vb.w} / ${vb.h}`);
    let piezas = s.piezas;
    let lineas = s.lineas;
    let textos = s.textos;
    let zonas = s.zonas ?? [];
    let op = 1;
    if (anim) {
      const base = j.pasos[anim.k];
      piezas = posicionesEnTransicion(j, anim.k, anim.t);
      lineas = base.lineas;
      textos = base.textos;
      zonas = base.zonas ?? [];
      op = 0.4;
    }
    svg.innerHTML = renderTablero({
      cancha: j.cancha,
      orient: orv,
      escala: escalaPiezas(),
      piezas,
      lineas,
      textos,
      zonas,
      zonaBorrador,
      pista: j.pista,
      paleta: PALETAS[paleta],
      seleccion: anim ? null : sel,
      borrador,
      opacidadLineas: op,
      manejadores: !anim && !drag,
    });
  }

  function pintarPasos() {
    const j = actual();
    pasosEl.replaceChildren();
    j.pasos.forEach((s, i) => {
      const mini = renderSvgCompleto({
        cancha: j.cancha,
        orient: j.orient,
        piezas: s.piezas,
        lineas: s.lineas,
        textos: [],
        zonas: s.zonas,
        pista: j.pista,
        paleta: PALETAS[paleta],
      });
      const b = el("button", {
        cls: "pz-step" + (i === paso ? " on" : ""),
        attrs: { type: "button", "data-paso": String(i), "aria-label": `Paso ${i + 1} de ${j.pasos.length}`, "aria-pressed": String(i === paso) },
      });
      const th = el("span", { cls: "pz-step-th" });
      th.innerHTML = mini; // SVG generado por nosotros; el texto del usuario va escapado
      b.append(th, el("span", { cls: "pz-step-n", text: String(i + 1) }));
      pasosEl.append(b);
    });
    infoPaso.textContent = `Paso ${paso + 1} / ${j.pasos.length}`;
  }

  function marcarPaso() {
    pasosEl.querySelectorAll<HTMLElement>(".pz-step").forEach((b, i) => {
      b.classList.toggle("on", i === paso);
      b.setAttribute("aria-pressed", String(i === paso));
      if (i === paso) b.scrollIntoView({ block: "nearest", inline: "nearest" });
    });
    infoPaso.textContent = `Paso ${paso + 1} / ${actual().pasos.length}`;
    if (document.activeElement !== txtNotaPaso) txtNotaPaso.value = actual().pasos[paso].nota;
  }

  function actualizarUI() {
    const j = hist.presente;
    if (document.activeElement !== inpNombre) inpNombre.value = j.nombre;
    selCat.value = j.categoria;
    if (document.activeElement !== txtNotas) txtNotas.value = j.notas;
    if (document.activeElement !== txtNotaPaso) txtNotaPaso.value = j.pasos[Math.min(paso, j.pasos.length - 1)].nota;
    setDis("deshacer", hist.pasado.length === 0);
    setDis("rehacer", hist.futuro.length === 0);
    setDis("play-prev", paso <= 0);
    setDis("play-next", paso >= j.pasos.length - 1);
    setDis("del-step", false);
    selPista.value = `${j.pista ?? "fiba"}-${j.cancha}`;
    selPista.disabled = soloVista;
    const lblFondo = root.querySelector<HTMLElement>('[data-act="fondo"] .pz-lbl');
    if (lblFondo) lblFondo.textContent = { parquet: "Parqué", neutra: "Neutra", oscura: "Oscura" }[paleta];
    root.classList.toggle("pz-view", soloVista);
    for (const c of [inpNombre, selCat, txtNotas, txtNotaPaso]) c.disabled = soloVista;
    root.dataset.cancha = j.cancha;
    root.dataset.orient = j.orient;
    marcarPaso();
    pintarSelbar();
  }

  function setDis(act: string, v: boolean) {
    root.querySelectorAll<HTMLButtonElement>(`[data-act="${act}"]`).forEach((b) => (b.disabled = v));
  }

  function refrescarTodo() {
    pintar();
    pintarPasos();
    actualizarUI();
  }

  // ── selección, barra contextual ─────────────────────────────────────
  function pintarSelbar() {
    selbar.replaceChildren();
    if (!sel || soloVista || anim) {
      selbar.hidden = true;
      return;
    }
    const j = hist.presente;
    const s = j.pasos[paso];
    const eliminar = el("button", { cls: "pz-sb-btn pz-sb-del", text: "Eliminar", attrs: { type: "button", "aria-label": "Eliminar elemento seleccionado" }, on: { click: () => eliminarSel() } });
    if (sel.tipo === "pieza") {
      const pz = s.piezas.find((p) => p.id === sel!.id);
      if (!pz) return void (selbar.hidden = true);
      const nom = { atq: "Atacante", def: "Defensor", balon: "Balón", cono: "Cono", neu: "Jugador neutro", ent: "Entrenador", fila: "Fila" }[pz.tipo];
      selbar.append(el("span", { cls: "pz-sb-t", text: nom }));
      const campo = (aria: string, valor: string, max: number, size: string, alCambiar: (v: string) => void) => {
        const inp = el("input", {
          cls: "pz-sb-inp",
          attrs: { type: "text", maxlength: String(max), value: valor, "aria-label": aria, size, autocomplete: "off" },
          on: {
            change: (e) => alCambiar((e.target as HTMLInputElement).value),
            keydown: (e) => {
              if ((e as KeyboardEvent).key === "Enter") (e.target as HTMLInputElement).blur();
            },
          },
        });
        inp.value = valor;
        return inp;
      };
      if (pz.tipo === "atq" || pz.tipo === "def" || pz.tipo === "neu" || pz.tipo === "ent") {
        const etq = pz.tipo === "neu" ? "Letra " : pz.tipo === "ent" ? "Marca " : "Nº ";
        selbar.append(
          el("label", { cls: "pz-sb-lab" }, etq, campo("Número, letra o marca del jugador", pz.etiqueta, LIMITES.ETIQUETA, "4", (v) => commit(ajustarPieza(hist.presente, pz.id, { etiqueta: v })))),
          el("label", { cls: "pz-sb-lab" }, "Nombre ", campo("Nombre corto del jugador", pz.nombre ?? "", LIMITES.NOMBRE_JUGADOR, "9", (v) => commit(ajustarPieza(hist.presente, pz.id, { nombre: v }))))
        );
      } else if (pz.tipo === "fila") {
        const cant = pz.cant ?? 4;
        const ajusta = (c: Partial<Pick<Pieza, "cant" | "ang" | "bando">>) => () => commit(ajustarPieza(hist.presente, pz.id, c));
        const bandoSel = el("select", {
          cls: "pz-sb-inp",
          attrs: { "aria-label": "Color de la fila" },
          on: { change: (e) => commit(ajustarPieza(hist.presente, pz.id, { bando: (e.target as HTMLSelectElement).value as "atq" | "def" | "neu" })) },
        });
        for (const [v, t] of [["neu", "Verde"], ["atq", "Azul"], ["def", "Rojo"]] as const) {
          const o = el("option", { text: t, attrs: { value: v } });
          if ((pz.bando ?? "neu") === v) o.selected = true;
          bandoSel.append(o);
        }
        selbar.append(
          el("button", { cls: "pz-sb-btn", text: "−", attrs: { type: "button", "aria-label": "Un jugador menos en la fila" }, on: { click: ajusta({ cant: cant - 1 }) } }),
          el("span", { cls: "pz-sb-t", text: `${cant} jug.` }),
          el("button", { cls: "pz-sb-btn", text: "+", attrs: { type: "button", "aria-label": "Un jugador más en la fila" }, on: { click: ajusta({ cant: cant + 1 }) } }),
          el("button", { cls: "pz-sb-btn", text: "↺", attrs: { type: "button", "aria-label": "Girar la fila a la izquierda" }, on: { click: ajusta({ ang: (pz.ang ?? 0) - 45 }) } }),
          el("button", { cls: "pz-sb-btn", text: "↻", attrs: { type: "button", "aria-label": "Girar la fila a la derecha" }, on: { click: ajusta({ ang: (pz.ang ?? 0) + 45 }) } }),
          bandoSel
        );
      }
    } else if (sel.tipo === "linea") {
      const l = s.lineas.find((x) => x.id === sel!.id);
      if (!l) return void (selbar.hidden = true);
      if (l.tipo === "libre") {
        selbar.append(el("span", { cls: "pz-sb-t", text: NOMBRE_LINEA.libre }));
      } else {
        const sl = el("select", {
          cls: "pz-sb-inp",
          attrs: { "aria-label": "Tipo de línea" },
          on: {
            change: (e) => {
              const v = (e.target as HTMLSelectElement).value as TipoLinea;
              const j2 = clonar(hist.presente);
              const l2 = j2.pasos[paso].lineas.find((x) => x.id === l.id);
              if (l2) l2.tipo = v;
              commit(j2);
            },
          },
        });
        for (const t of TIPOS_LINEA.filter((t) => t !== "libre")) {
          const o = el("option", { text: NOMBRE_LINEA[t], attrs: { value: t } });
          if (t === l.tipo) o.selected = true;
          sl.append(o);
        }
        selbar.append(sl);
        if (l.mid) {
          selbar.append(
            el("button", {
              cls: "pz-sb-btn",
              text: "Enderezar",
              attrs: { type: "button" },
              on: {
                click: () => {
                  const j2 = clonar(hist.presente);
                  const l2 = j2.pasos[paso].lineas.find((x) => x.id === l.id);
                  if (l2) delete l2.mid;
                  commit(j2);
                },
              },
            })
          );
        } else {
          selbar.append(el("span", { cls: "pz-sb-note", text: "Arrastra el punto central para curvarla" }));
        }
      }
    } else if (sel.tipo === "zona") {
      const z = (s.zonas ?? []).find((x) => x.id === sel!.id);
      if (!z) return void (selbar.hidden = true);
      const forma = el("select", {
        cls: "pz-sb-inp",
        attrs: { "aria-label": "Forma de la zona" },
        on: {
          change: (e) => {
            const j2 = clonar(hist.presente);
            const z2 = (j2.pasos[paso].zonas ?? []).find((x) => x.id === z.id);
            if (z2) z2.forma = (e.target as HTMLSelectElement).value === "elipse" ? "elipse" : "rect";
            commit(j2);
          },
        },
      });
      for (const [v, t] of [["rect", "Rectángulo"], ["elipse", "Elipse"]] as const) {
        const o = el("option", { text: t, attrs: { value: v } });
        if (z.forma === v) o.selected = true;
        forma.append(o);
      }
      selbar.append(el("span", { cls: "pz-sb-t", text: "Zona" }), forma, el("span", { cls: "pz-sb-note", text: "Arrastra el cuadrado de la esquina para cambiar el tamaño" }));
    } else {
      const t = s.textos.find((x) => x.id === sel!.id);
      if (!t) return void (selbar.hidden = true);
      const inp = el("input", {
        cls: "pz-sb-inp pz-sb-wide",
        attrs: { type: "text", maxlength: String(LIMITES.TEXTO), "aria-label": "Texto de la nota", autocomplete: "off" },
        on: {
          change: (e) => {
            const v = limpiaTexto((e.target as HTMLInputElement).value, LIMITES.TEXTO);
            const j2 = clonar(hist.presente);
            const t2 = j2.pasos[paso].textos.find((x) => x.id === t.id);
            if (t2 && v) t2.texto = v;
            commit(j2);
          },
          keydown: (e) => {
            if ((e as KeyboardEvent).key === "Enter") (e.target as HTMLInputElement).blur();
          },
        },
      });
      inp.value = t.texto;
      const tam = (d: number) => () => {
        const j2 = clonar(hist.presente);
        const t2 = j2.pasos[paso].textos.find((x) => x.id === t.id);
        if (t2) t2.tam = Math.min(3, Math.max(1, t2.tam + d));
        commit(j2);
      };
      selbar.append(
        el("span", { cls: "pz-sb-t", text: "Texto" }),
        inp,
        el("button", { cls: "pz-sb-btn", text: "A−", attrs: { type: "button", "aria-label": "Texto más pequeño" }, on: { click: tam(-1) } }),
        el("button", { cls: "pz-sb-btn", text: "A+", attrs: { type: "button", "aria-label": "Texto más grande" }, on: { click: tam(1) } })
      );
    }
    selbar.append(eliminar);
    selbar.hidden = false;
  }

  function seleccionar(s: Sel | null) {
    sel = s;
    pintar();
    pintarSelbar();
  }

  function eliminarSel() {
    if (!sel || soloVista) return;
    const j = hist.presente;
    const { tipo, id } = sel;
    sel = null;
    if (tipo === "pieza") commit(quitarPieza(j, paso, id));
    else if (tipo === "linea") commit(quitarLinea(j, paso, id));
    else if (tipo === "zona") commit(quitarZona(j, paso, id));
    else commit(quitarTexto(j, paso, id));
  }

  // ── historial ───────────────────────────────────────────────────────
  function commit(nueva: Jugada) {
    nueva.actualizada = Date.now();
    hist = confirmar(hist, nueva);
    trabajo = null;
    paso = Math.min(paso, nueva.pasos.length - 1);
    if (sel && !existe(sel)) sel = null;
    refrescarTodo();
    persistir();
  }

  function existe(s: Sel): boolean {
    const st = hist.presente.pasos[paso];
    if (!st) return false;
    if (s.tipo === "pieza") return st.piezas.some((p) => p.id === s.id);
    if (s.tipo === "linea") return st.lineas.some((l) => l.id === s.id);
    if (s.tipo === "zona") return (st.zonas ?? []).some((z) => z.id === s.id);
    return st.textos.some((t) => t.id === s.id);
  }

  function deshacerAcc() {
    if (soloVista) return;
    detener();
    hist = deshacer(hist);
    paso = Math.min(paso, hist.presente.pasos.length - 1);
    if (sel && !existe(sel)) sel = null;
    refrescarTodo();
    persistir();
  }
  function rehacerAcc() {
    if (soloVista) return;
    detener();
    hist = rehacer(hist);
    paso = Math.min(paso, hist.presente.pasos.length - 1);
    if (sel && !existe(sel)) sel = null;
    refrescarTodo();
    persistir();
  }

  function irAPaso(k: number) {
    const j = actual();
    detener();
    paso = Math.max(0, Math.min(j.pasos.length - 1, k));
    if (sel && !existe(sel)) sel = null;
    pintar();
    marcarPaso();
    pintarSelbar();
    setDis("play-prev", paso <= 0);
    setDis("play-next", paso >= j.pasos.length - 1);
  }

  function cargarJugada(j: Jugada, opts: { vista?: boolean; conservarId?: boolean } = {}) {
    detener();
    const copia = clonar(j);
    if (!opts.conservarId) copia.id = uid();
    hist = nuevoHistorial(copia);
    trabajo = null;
    paso = 0;
    sel = null;
    drag = null;
    borrador = null;
    soloVista = !!opts.vista;
    bannerEl.hidden = !opts.vista;
    guardadaJson = opts.conservarId ? JSON.stringify(comparable(copia)) : "";
    refrescarTodo();
    persistir();
  }

  const comparable = (j: Jugada) => ({ ...j, actualizada: 0 });
  const haySinGuardar = () => {
    const j = hist.presente;
    const hayContenido = j.pasos.some((s) => s.piezas.length || s.lineas.length || s.textos.length);
    if (!hayContenido) return false;
    return JSON.stringify(comparable(j)) !== guardadaJson;
  };

  // ── hit test ────────────────────────────────────────────────────────
  const ORDEN_PIEZA = { cono: 0, fila: 1, def: 2, neu: 3, ent: 4, atq: 5, balon: 6 } as const;

  /** Distancia del punto a la pieza (a la más cercana de sus jugadores si es una fila). */
  const distAPieza = (p: Pt, pz: Pieza): number =>
    pz.tipo === "fila" ? Math.min(...puestosFila(pz).map((q) => dist(p, q))) : dist(p, pz);

  /** Pieza bajo el dedo: primero lo que se ve (manda la de encima), luego la más cercana. */
  function buscarPieza(s: Paso, p: Pt, um: number): Pieza | null {
    const e = escalaPiezas();
    const piezas = s.piezas.slice().sort((a, b) => ORDEN_PIEZA[b.tipo] - ORDEN_PIEZA[a.tipo]);
    const jug = (RADIO_PIEZA + 0.1) * e;
    const visible = { cono: 0.6 * e, def: jug, atq: jug, neu: jug, ent: jug, balon: 0.46 * e, fila: (FILA.RADIO + 0.12) * e };
    for (const pz of piezas) {
      if (distAPieza(p, pz) <= visible[pz.tipo]) return pz;
    }
    let cercana: Pieza | null = null;
    let md = Math.max(um, 0.8 * e);
    for (const pz of piezas) {
      const d = distAPieza(p, pz);
      if (d <= md) {
        md = d;
        cercana = pz;
      }
    }
    return cercana;
  }

  function golpe(p: Pt, tactil: boolean): Golpe | null {
    const s = actual().pasos[paso];
    const um = enMetros(tactil ? 26 : 14);
    if (sel?.tipo === "linea") {
      const l = s.lineas.find((x) => x.id === sel!.id);
      if (l && l.tipo !== "libre" && l.pts.length >= 2) {
        const a = l.pts[0];
        const b = l.pts[l.pts.length - 1];
        const medio = l.mid ?? { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
        const r = Math.max(0.55, um);
        if (dist(p, medio) <= r) return { tipo: "manejador", id: l.id, cual: "mid" };
        if (dist(p, a) <= r) return { tipo: "manejador", id: l.id, cual: "ini" };
        if (dist(p, b) <= r) return { tipo: "manejador", id: l.id, cual: "fin" };
      }
    }
    if (sel?.tipo === "zona") {
      const z = (s.zonas ?? []).find((x) => x.id === sel!.id);
      if (z && dist(p, { x: z.x + z.w / 2, y: z.y + z.h / 2 }) <= Math.max(0.6, um)) return { tipo: "asa-zona", id: z.id };
    }
    const pzHit = buscarPieza(s, p, um);
    if (pzHit) return { tipo: "pieza", id: pzHit.id };
    for (const t of s.textos.slice().reverse()) {
      const w = Math.max(1.2, t.texto.length * [0, 0.62, 0.86, 1.2][t.tam] * 0.5);
      if (Math.abs(p.x - t.x) <= w / 2 + 0.3 && Math.abs(p.y - t.y) <= 0.8) return { tipo: "texto", id: t.id };
    }
    const dl = Math.max(0.42, enMetros(tactil ? 16 : 10));
    for (const l of s.lineas.slice().reverse()) {
      if (distAPolilinea(p, polilinea(l)) <= dl) return { tipo: "linea", id: l.id };
    }
    // las zonas son un fondo: lo último que se toca
    for (const z of (s.zonas ?? []).slice().reverse()) {
      if (puntoEnZona(p, z)) return { tipo: "zona", id: z.id };
    }
    return null;
  }

  function piezaCerca(p: Pt, r: number, tipos: TipoPieza[], excluir?: string): Pieza | null {
    let mejor: Pieza | null = null;
    let md = r;
    for (const pz of actual().pasos[paso].piezas) {
      if (!tipos.includes(pz.tipo) || pz.id === excluir) continue;
      const d = dist(p, pz);
      if (d <= md) {
        md = d;
        mejor = pz;
      }
    }
    return mejor;
  }

  // ── puntero ─────────────────────────────────────────────────────────
  svg.addEventListener("contextmenu", (e) => e.preventDefault());

  svg.addEventListener("pointerdown", (e: PointerEvent) => {
    if (soloVista || grabando) return;
    if (e.pointerType === "mouse" && e.button !== 0) return;
    if (reproduciendo || anim) detener();
    e.preventDefault();
    const j = hist.presente;
    const p = limitaPunto(aCanon(e), j.cancha);
    const tactil = e.pointerType !== "mouse";
    try {
      svg.setPointerCapture(e.pointerId);
    } catch {
      /* no pasa nada */
    }

    if (tm) return tmDown(e, p, tactil);

    if (herr === "select") {
      const g = golpe(p, tactil);
      if (!g) {
        seleccionar(null);
        return;
      }
      if (g.tipo === "manejador") {
        trabajo = clonar(j);
        drag = { k: "manej", id: g.id, cual: g.cual, origen: p, movido: false };
        return;
      }
      if (g.tipo === "asa-zona") {
        trabajo = clonar(j);
        drag = { k: "zona-tam", id: g.id, origen: p, movido: false };
        return;
      }
      seleccionar({ tipo: g.tipo, id: g.id });
      if (g.tipo === "zona") {
        const z = (j.pasos[paso].zonas ?? []).find((x) => x.id === g.id)!;
        trabajo = clonar(j);
        drag = { k: "zona", id: g.id, off: { x: z.x - p.x, y: z.y - p.y }, origen: p, movido: false };
      }
      if (g.tipo === "pieza") {
        const pz = j.pasos[paso].piezas.find((x) => x.id === g.id)!;
        trabajo = clonar(j);
        drag = { k: "pieza", id: g.id, off: { x: pz.x - p.x, y: pz.y - p.y }, propagar: false, origen: p, movido: false };
      } else if (g.tipo === "texto") {
        const t = j.pasos[paso].textos.find((x) => x.id === g.id)!;
        trabajo = clonar(j);
        drag = { k: "texto", id: g.id, off: { x: t.x - p.x, y: t.y - p.y }, origen: p, movido: false };
      }
      return;
    }

    if (herr === "zona" || herr === "elipse") {
      drag = { k: "zona-nueva", forma: herr === "zona" ? "rect" : "elipse", ini: p };
      return;
    }

    const tp = TIPO_PIEZA_DE[herr];
    if (tp) {
      // una fila nace mirando a la canasta más cercana
      const extra = tp === "fila" ? { ang: (Math.atan2(aroDe([p], j.cancha).y - p.y, aroDe([p], j.cancha).x - p.x) * 180) / Math.PI } : {};
      const r = anadirPieza(j, paso, tp, p, undefined, extra);
      trabajo = r.jugada;
      sel = { tipo: "pieza", id: r.id };
      drag = { k: "pieza", id: r.id, off: { x: 0, y: 0 }, propagar: true, origen: p, movido: true };
      pintar();
      return;
    }

    if (herr === "texto") {
      const r = anadirTexto(j, paso, p);
      commit(r.jugada);
      herr = "select";
      marcarHerramienta();
      seleccionar({ tipo: "texto", id: r.id });
      const inp = selbar.querySelector<HTMLInputElement>("input");
      if (inp) {
        inp.focus();
        inp.select();
      }
      return;
    }

    const tl = TIPO_LINEA_DE[herr];
    if (tl) {
      drag = { k: "dibujo" };
      if (tl === "libre") {
        libreTmp = [p];
        borrador = { id: "tmp", tipo: "libre", pts: [p, p] };
      } else {
        const origen = piezaCerca(p, 1.0, ["atq", "def", "cono"]);
        const ini = origen ? { x: origen.x, y: origen.y } : p;
        borrador = { id: "tmp", tipo: tl, pts: [ini, ini], ...(origen ? { ref: origen.id } : {}) };
      }
      pintar();
    }
  });

  // ── modo tiempo muerto: mover, flecha por toque largo, borrar línea con un toque ──
  function tmDown(e: PointerEvent, p: Pt, tactil: boolean) {
    const s = hist.presente.pasos[0];
    const pz = buscarPieza(s, p, enMetros(tactil ? 26 : 14));
    const px = { x: e.clientX, y: e.clientY };
    if (pz) {
      const selYa = sel?.tipo === "pieza" && sel.id === pz.id;
      const g: TmGesto = { id: pz.id, linea: null, p0: p, px0: px, selYa, armado: selYa, modo: "pend", timer: 0 };
      if (!selYa) {
        g.timer = window.setTimeout(() => {
          if (tmGesto !== g || g.modo !== "pend") return;
          g.armado = true;
          sel = { tipo: "pieza", id: pz.id };
          pintar();
          try {
            navigator.vibrate?.(25);
          } catch {
            /* sin vibración */
          }
        }, 380);
      }
      tmGesto = g;
      return;
    }
    const dl = Math.max(0.5, enMetros(tactil ? 18 : 10));
    const l = s.lineas.slice().reverse().find((x) => distAPolilinea(p, polilinea(x)) <= dl);
    tmGesto = { id: "", linea: l?.id ?? null, p0: p, px0: px, selYa: false, armado: false, modo: "pend", timer: 0 };
  }

  function tmMover(e: PointerEvent) {
    const g = tmGesto;
    if (!g || g.modo !== "pend") return;
    if (Math.hypot(e.clientX - g.px0.x, e.clientY - g.px0.y) < 8) return;
    window.clearTimeout(g.timer);
    g.modo = "activo";
    if (!g.id) return; // arrastrar desde un hueco no hace nada
    const j = hist.presente;
    const st = j.pasos[0];
    const pz = st.piezas.find((x) => x.id === g.id);
    if (!pz) return;
    if (g.armado) {
      const f = flechaPorDefecto(st, pz);
      const ini = { x: f.origen.x, y: f.origen.y };
      tmFlecha = pz.id;
      sel = { tipo: "pieza", id: pz.id };
      borrador = { id: "tmp", tipo: f.tipo, pts: [ini, ini], ...(f.origen.tipo !== "balon" ? { ref: f.origen.id } : {}) };
      drag = { k: "dibujo" };
    } else {
      trabajo = clonar(j);
      sel = { tipo: "pieza", id: pz.id };
      drag = { k: "pieza", id: pz.id, off: { x: pz.x - g.p0.x, y: pz.y - g.p0.y }, propagar: false, origen: g.p0, movido: true };
    }
    pintar();
  }

  svg.addEventListener("pointermove", (e: PointerEvent) => {
    if (tm && tmGesto && !drag) tmMover(e);
    if (!drag) {
      if (e.pointerType === "mouse" && herr === "select" && !anim) {
        const g = golpe(aCanon(e), false);
        svg.style.cursor = g ? (g.tipo === "manejador" ? "pointer" : "grab") : "default";
      }
      return;
    }
    const d = drag;
    const j = trabajo;
    const p = limitaPunto(aCanon(e), actual().cancha);
    if (d.k === "zona-nueva") {
      zonaBorrador = { id: "tmp", ...zonaDesdeEsquinas(d.forma, d.ini, p) };
      pintar();
      return;
    }
    if (d.k === "dibujo") {
      if (!borrador) return;
      if (borrador.tipo === "libre") {
        const ult = libreTmp[libreTmp.length - 1];
        if (dist(ult, p) > 0.22 && libreTmp.length < LIMITES.PUNTOS) libreTmp.push(p);
        borrador = { ...borrador, pts: libreTmp.length > 1 ? libreTmp.slice() : [libreTmp[0], p] };
      } else {
        borrador = { ...borrador, pts: [borrador.pts[0], p] };
        if (tm && tmFlecha) {
          const pz = hist.presente.pasos[0].piezas.find((x) => x.id === tmFlecha);
          if (pz) borrador.tipo = flechaPorDefecto(hist.presente.pasos[0], pz, p).tipo;
        }
      }
      pintar();
      return;
    }
    if (!j) return;
    const st = j.pasos[paso];
    if (!d.movido && dist(p, d.origen) > 0.12) d.movido = true;
    if (d.k === "pieza") {
      const np = limitaPunto({ x: p.x + d.off.x, y: p.y + d.off.y }, j.cancha);
      const pos = { x: Math.round(np.x * 100) / 100, y: Math.round(np.y * 100) / 100 };
      moverPiezaEn(st, d.id, pos);
      if (d.propagar) {
        for (let i = paso + 1; i < j.pasos.length; i++) {
          const pz = j.pasos[i].piezas.find((x) => x.id === d.id);
          if (pz) {
            pz.x = pos.x;
            pz.y = pos.y;
          }
        }
      }
    } else if (d.k === "texto") {
      const t = st.textos.find((x) => x.id === d.id);
      if (t) {
        const np = limitaPunto({ x: p.x + d.off.x, y: p.y + d.off.y }, j.cancha);
        t.x = Math.round(np.x * 100) / 100;
        t.y = Math.round(np.y * 100) / 100;
      }
    } else if (d.k === "zona") {
      const z = (st.zonas ?? []).find((x) => x.id === d.id);
      if (z) {
        const np = limitaPunto({ x: p.x + d.off.x, y: p.y + d.off.y }, j.cancha);
        z.x = Math.round(np.x * 100) / 100;
        z.y = Math.round(np.y * 100) / 100;
      }
    } else if (d.k === "zona-tam") {
      const z = (st.zonas ?? []).find((x) => x.id === d.id);
      if (z) {
        z.w = Math.round(Math.min(ZONA_MAX, Math.max(ZONA_MIN, 2 * Math.abs(p.x - z.x))) * 100) / 100;
        z.h = Math.round(Math.min(ZONA_MAX, Math.max(ZONA_MIN, 2 * Math.abs(p.y - z.y))) * 100) / 100;
      }
    } else if (d.k === "manej") {
      const l = st.lineas.find((x) => x.id === d.id);
      if (l) {
        const a = l.pts[0];
        const b = l.pts[l.pts.length - 1];
        if (d.cual === "ini") l.pts[0] = p;
        else if (d.cual === "fin") l.pts[l.pts.length - 1] = p;
        else {
          const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
          if (dist(p, m) < 0.2) delete l.mid;
          else l.mid = p;
        }
      }
    }
    pintar();
  });

  function terminarPuntero(e: PointerEvent, cancelado: boolean) {
    try {
      svg.releasePointerCapture(e.pointerId);
    } catch {
      /* ya soltado */
    }
    const d = drag;
    drag = null;
    const g = tmGesto;
    tmGesto = null;
    if (g) window.clearTimeout(g.timer);
    if (tm && g && !d) return void tmToque(g, cancelado);
    if (!d) return;
    if (d.k === "zona-nueva") {
      const b = zonaBorrador;
      zonaBorrador = null;
      if (cancelado) return void pintar();
      const fin = b ? { x: b.x + (b.x - d.ini.x), y: b.y + (b.y - d.ini.y) } : d.ini;
      const grande = b && dist(d.ini, fin) > 0.9;
      const nueva = grande && b ? { forma: d.forma, x: b.x, y: b.y, w: b.w, h: b.h } : { forma: d.forma, x: d.ini.x, y: d.ini.y, ...ZONA_POR_DEFECTO };
      const r = anadirZona(hist.presente, paso, nueva);
      commit(r.jugada);
      seleccionar({ tipo: "zona", id: r.id });
      return;
    }
    if (d.k === "dibujo") {
      const b = borrador;
      borrador = null;
      libreTmp = [];
      if (cancelado || !b) return void pintar();
      const j = hist.presente;
      if (b.tipo === "libre") {
        const pts = simplifica(b.pts, 0.12);
        if (pts.length < 2 || dist(pts[0], pts[pts.length - 1]) + pts.length < 3) return void pintar();
        const r = anadirLinea(j, paso, { tipo: "libre", pts });
        commit(r.jugada);
        seleccionar({ tipo: "linea", id: r.id });
        return;
      }
      const ini = b.pts[0];
      let fin = b.pts[1];
      if (dist(ini, fin) < 0.8) {
        tmFlecha = null;
        if (tm) sel = null;
        return void pintar();
      }
      if (tm && tmFlecha) {
        const pz = j.pasos[0].piezas.find((x) => x.id === tmFlecha);
        if (pz) b.tipo = flechaPorDefecto(j.pasos[0], pz, fin).tipo;
      }
      tmFlecha = null;
      const nueva: Omit<Linea, "id"> = { tipo: b.tipo, pts: [ini, fin] };
      if (b.ref) nueva.ref = b.ref;
      if (b.tipo === "pase" || b.tipo === "tiro") {
        const tipoOrigen = tm && b.ref ? j.pasos[0].piezas.find((x) => x.id === b.ref)?.tipo : undefined;
        const dest = piezaCerca(fin, 0.95, tipoOrigen === "atq" || tipoOrigen === "def" ? [tipoOrigen] : ["atq", "def"], b.ref);
        if (dest && b.tipo === "pase") {
          fin = { x: dest.x, y: dest.y };
          nueva.pts = [ini, fin];
          nueva.fin = dest.id;
        }
      }
      const r = anadirLinea(j, paso, nueva);
      if (tm) {
        sel = null;
        commit(r.jugada);
        return;
      }
      commit(r.jugada);
      seleccionar({ tipo: "linea", id: r.id });
      return;
    }
    const j = trabajo;
    if (cancelado || !j) {
      trabajo = null;
      return void refrescarTodo();
    }
    if (d.k === "manej" && d.movido) {
      // al soltar, la línea vuelve a unirse a la pieza más cercana (o se suelta)
      const l = j.pasos[paso].lineas.find((x) => x.id === d.id);
      if (l && d.cual !== "mid") {
        const pzs = j.pasos[paso].piezas;
        const cerca = (pt: Pt, tipos: TipoPieza[]) => {
          let m: Pieza | null = null;
          let md = 0.95;
          for (const pz of pzs) {
            if (!tipos.includes(pz.tipo)) continue;
            const dd = dist(pt, pz);
            if (dd <= md) {
              md = dd;
              m = pz;
            }
          }
          return m;
        };
        if (d.cual === "ini") {
          const pz = cerca(l.pts[0], ["atq", "def", "cono"]);
          if (pz) {
            l.ref = pz.id;
            l.pts[0] = { x: pz.x, y: pz.y };
          } else delete l.ref;
        } else if (l.tipo === "pase") {
          const pz = cerca(l.pts[l.pts.length - 1], ["atq", "def"]);
          if (pz) {
            l.fin = pz.id;
            l.pts[l.pts.length - 1] = { x: pz.x, y: pz.y };
          } else delete l.fin;
        }
      }
    }
    if (tm) sel = null;
    if (d.movido) commit(j);
    else {
      trabajo = null;
      pintar();
    }
  }

  /** Toque sin arrastre en modo tiempo muerto: (des)selecciona una pieza o borra una línea. */
  function tmToque(g: TmGesto, cancelado: boolean) {
    if (cancelado) return void pintar();
    if (g.id) {
      sel = g.selYa ? null : { tipo: "pieza", id: g.id };
      return void pintar();
    }
    if (g.linea) {
      sel = null;
      commit(quitarLinea(hist.presente, 0, g.linea));
      return void toast("Línea borrada. Puedes deshacer.", 2200);
    }
    sel = null;
    pintar();
  }
  svg.addEventListener("pointerup", (e: PointerEvent) => terminarPuntero(e, false));
  svg.addEventListener("pointercancel", (e: PointerEvent) => terminarPuntero(e, true));
  svg.addEventListener("dblclick", () => {
    if (sel && !soloVista) {
      const inp = selbar.querySelector<HTMLInputElement>("input");
      inp?.focus();
      inp?.select();
    }
  });

  // ── herramientas ────────────────────────────────────────────────────
  let hintT = 0;
  function marcarHerramienta() {
    root.querySelectorAll<HTMLButtonElement>("[data-tool]").forEach((b) => {
      const on = b.dataset.tool === herr;
      b.classList.toggle("on", on);
      b.setAttribute("aria-pressed", String(on));
    });
    hint.textContent = AYUDA[herr];
    hint.classList.add("on");
    window.clearTimeout(hintT);
    hintT = window.setTimeout(() => hint.classList.remove("on"), 6000);
    svg.style.cursor = herr === "select" ? "default" : "crosshair";
  }

  function elegirHerramienta(h: Herr) {
    if (soloVista) return;
    herr = h;
    if (h !== "select") sel = null;
    marcarHerramienta();
    pintar();
    pintarSelbar();
  }

  // ── reproducción ────────────────────────────────────────────────────
  const velocidad = () => Number(selVel.value) || 1;

  function inicioDePaso(k: number) {
    return k * (PAUSA_PASO + DURACION_TRANSICION);
  }

  function reproducir() {
    const j = actual();
    if (j.pasos.length < 2) {
      toast("Crea al menos dos pasos (botón + Paso) para poder animar la jugada.");
      return;
    }
    if (reproduciendo) return detener();
    sel = null;
    pintarSelbar();
    reproduciendo = true;
    const base = paso >= j.pasos.length - 1 ? 0 : inicioDePaso(paso);
    let t0 = performance.now();
    let ultVel = velocidad();
    let acum = base;
    root.classList.add("pz-playing");
    setPlayIcon();
    const bucle = (ahora: number) => {
      if (!reproduciendo) return;
      const v = velocidad();
      acum += (ahora - t0) * v;
      t0 = ahora;
      ultVel = v;
      const st = estadoEnTiempo(j, acum);
      if (st.fin || acum > duracionTotal(j) + 200 / ultVel) {
        anim = null;
        paso = j.pasos.length - 1;
        reproduciendo = false;
        root.classList.remove("pz-playing");
        setPlayIcon();
        pintar();
        marcarPaso();
        return;
      }
      if (st.k !== paso) {
        paso = st.k;
        marcarPaso();
      }
      anim = { k: st.k, t: st.t };
      pintar();
      raf = requestAnimationFrame(bucle);
    };
    raf = requestAnimationFrame(bucle);
  }

  function detener() {
    if (!reproduciendo && !anim) return;
    reproduciendo = false;
    cancelAnimationFrame(raf);
    anim = null;
    root.classList.remove("pz-playing");
    setPlayIcon();
    pintar();
    marcarPaso();
  }

  function setPlayIcon() {
    root.querySelectorAll<HTMLButtonElement>('[data-act="play"]').forEach((b) => {
      b.setAttribute("aria-label", reproduciendo ? "Pausar" : "Reproducir jugada");
      b.title = reproduciendo ? "Pausar (Espacio)" : "Reproducir (Espacio)";
      b.classList.toggle("on", reproduciendo);
    });
  }

  // ── guardar, biblioteca ─────────────────────────────────────────────
  function guardarActual() {
    if (soloVista || tm) return;
    const j = clonar(hist.presente);
    j.actualizada = Date.now();
    const i = biblio.findIndex((x) => x.id === j.id);
    if (i >= 0) biblio[i] = j;
    else if (biblio.length >= LIMITES.BIBLIOTECA) return void toast("La biblioteca está llena. Borra alguna jugada.");
    else biblio.unshift(j);
    guardadaJson = JSON.stringify(comparable(j));
    persistir(true);
    pintarBiblioteca();
    toast(`«${j.nombre}» guardada en tu biblioteca`);
  }

  function confirmarCambio(): boolean {
    if (!haySinGuardar()) return true;
    return window.confirm("Hay cambios sin guardar en la jugada actual. ¿Abrir otra de todos modos?");
  }

  function abrir(j: Jugada, desdePlantilla: boolean, vista = false) {
    if (!confirmarCambio()) return;
    cargarJugada(j, { conservarId: !desdePlantilla && !vista, vista });
    if (desdePlantilla) herr = "select";
    marcarHerramienta();
    cerrarPanelMovil();
    if (vista) bannerEl.hidden = false;
  }

  function pintarAvisoCopia() {
    const ahora = Date.now();
    ultimaCopiaEl.textContent = textoUltimaCopia(ultimaCopia, ahora);
    const toca = tocaRecordarCopia(biblio.length + sesiones.length, ultimaCopia, ahora);
    // el aviso es cerrable, pero vuelve a salir si hace falta una copia o pasó una semana
    const cerradoReciente = avisoCerrado !== null && ahora - avisoCerrado < 7 * MS_DIA;
    avisoCopia.hidden = cerradoReciente && !toca;
    avisoCopia.classList.toggle("urgente", toca);
    const recordatorio = root.querySelector<HTMLElement>('[data-act="tab"][data-tab="biblioteca"]');
    recordatorio?.classList.toggle("pz-dot", toca);
    root.querySelectorAll<HTMLElement>('[data-act="panel-biblio"]').forEach((b) => b.classList.toggle("pz-dot", toca));
  }

  function pintarBiblioteca() {
    pintarAvisoCopia();
    const texto = sinTildes(inpBuscar.value.trim());
    const cat = selFiltro.value;
    listaEl.replaceChildren();
    const filtradas = biblio.filter((j) => (!cat || j.categoria === cat) && (!texto || sinTildes(j.nombre + " " + j.notas).includes(texto)));
    if (biblio.length === 0) {
      listaEl.append(el("li", { cls: "pz-vacio", text: "Aún no has guardado ninguna jugada. Pulsa «Guardar» para añadir la actual." }));
    } else if (filtradas.length === 0) {
      listaEl.append(el("li", { cls: "pz-vacio", text: "Ninguna jugada coincide con la búsqueda." }));
    }
    for (const j of filtradas) {
      const actualMarca = j.id === hist.presente.id;
      const info = el("span", { cls: "pz-item-info" }, el("span", { cls: "pz-item-nom", text: j.nombre }), el("span", { cls: "pz-item-meta", text: `${CATEGORIAS.find((c) => c.id === j.categoria)?.label ?? ""} · ${j.pasos.length} ${j.pasos.length === 1 ? "paso" : "pasos"}` }));
      const abrirB = el("button", { cls: "pz-item-main", attrs: { type: "button", "aria-label": `Abrir ${j.nombre}` }, on: { click: () => abrir(j, false) } }, info);
      let borrarT = 0;
      const borrarB = el("button", {
        cls: "pz-item-btn",
        text: "Borrar",
        attrs: { type: "button", "aria-label": `Borrar ${j.nombre}` },
        on: {
          click: () => {
            if (borrarB.dataset.seguro === "1") {
              window.clearTimeout(borrarT);
              biblio = biblio.filter((x) => x.id !== j.id);
              persistir(true);
              pintarBiblioteca();
              toast("Jugada borrada");
            } else {
              borrarB.dataset.seguro = "1";
              borrarB.textContent = "¿Seguro?";
              borrarB.classList.add("peligro");
              borrarT = window.setTimeout(() => {
                borrarB.dataset.seguro = "0";
                borrarB.textContent = "Borrar";
                borrarB.classList.remove("peligro");
              }, 3000);
            }
          },
        },
      });
      const dupB = el("button", {
        cls: "pz-item-btn",
        text: "Duplicar",
        attrs: { type: "button", "aria-label": `Duplicar ${j.nombre}` },
        on: {
          click: () => {
            const c = clonar(j);
            c.id = uid();
            c.nombre = (j.nombre + " (copia)").slice(0, LIMITES.NOMBRE);
            c.actualizada = Date.now();
            biblio.unshift(c);
            persistir(true);
            pintarBiblioteca();
            toast("Jugada duplicada");
          },
        },
      });
      listaEl.append(el("li", { cls: "pz-item" + (actualMarca ? " on" : "") }, abrirB, dupB, borrarB));
    }

    for (const [ul, lista] of [[plantillasEl, PLANTILLAS], [ejerciciosEl, PLANTILLAS_EJERCICIOS]] as const) {
      ul.replaceChildren();
      for (const p of lista) {
        ul.append(
          el(
            "li",
            { cls: "pz-item" },
            el(
              "button",
              { cls: "pz-item-main", attrs: { type: "button", "aria-label": `Cargar plantilla ${p.nombre}` }, on: { click: () => abrir(p.crear(), true) } },
              el("span", { cls: "pz-item-info" }, el("span", { cls: "pz-item-nom", text: p.nombre }), el("span", { cls: "pz-item-meta", text: p.descripcion }))
            )
          )
        );
      }
    }

    compartidasEl.replaceChildren();
    const caja = compartidasEl.parentElement;
    if (caja) caja.hidden = compartidas.length === 0;
    for (const j of compartidas) {
      compartidasEl.append(
        el(
          "li",
          { cls: "pz-item" },
          el(
            "button",
            { cls: "pz-item-main", attrs: { type: "button" }, on: { click: () => abrir(j, false, true) } },
            el("span", { cls: "pz-item-info" }, el("span", { cls: "pz-item-nom", text: j.nombre }), el("span", { cls: "pz-item-meta", text: `${j.pasos.length} pasos · sin guardar` }))
          )
        )
      );
    }
  }

  // ── panel lateral ───────────────────────────────────────────────────
  function elegirTab(t: string) {
    root.querySelectorAll<HTMLElement>('[data-act="tab"]').forEach((b) => {
      const on = b.dataset.tab === t;
      b.classList.toggle("on", on);
      b.setAttribute("aria-selected", String(on));
    });
    root.querySelectorAll<HTMLElement>("[data-panel]").forEach((p) => (p.hidden = p.dataset.panel !== t));
  }
  /** Con un panel o diálogo abierto, el botón del chat flotante sobraría encima. */
  function estadoModal() {
    const abierto = tm || !shareEl.hidden || !formEl.hidden || (sideEl.classList.contains("open") && window.matchMedia("(max-width: 900px)").matches);
    document.documentElement.classList.toggle("pz-modal", abierto);
  }
  function abrirPanelMovil(t: string) {
    elegirTab(t);
    sideEl.classList.add("open");
    estadoModal();
  }
  function cerrarPanelMovil() {
    sideEl.classList.remove("open");
    estadoModal();
  }

  // ── compartir ───────────────────────────────────────────────────────
  async function urlDe(jugadas: Jugada[]): Promise<string> {
    const payload = await codificarEnlace(jugadas);
    return `${location.origin}${location.pathname}#j=${payload}`;
  }

  async function copiar(texto: string): Promise<boolean> {
    try {
      await navigator.clipboard.writeText(texto);
      return true;
    } catch {
      /* sigue con el plan B */
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = texto;
      ta.setAttribute("readonly", "");
      ta.style.cssText = "position:fixed;opacity:0;top:0;left:0";
      document.body.append(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }

  async function prepararEnlace() {
    try {
      const j = hist.presente;
      const url = await urlDe([j]);
      inpEnlace.value = url;
      infoEnlace.textContent =
        url.length > 8000
          ? `Enlace muy largo (${url.length} caracteres): algunas apps lo cortan. Mejor usa imagen o archivo .json.`
          : `${url.length} caracteres${hayCompresion() ? " · comprimido" : ""} · la jugada viaja dentro del enlace, no se sube a ningún servidor`;
      infoEnlace.classList.toggle("warn", url.length > 8000);
    } catch {
      inpEnlace.value = "";
      infoEnlace.textContent = "No se pudo generar el enlace.";
    }
  }

  async function copiarEnlace(libro = false) {
    try {
      const url = await urlDe(libro ? biblio : [hist.presente]);
      if (libro && biblio.length === 0) return void toast("Tu biblioteca está vacía.");
      if (await copiar(url)) toast(libro ? "Enlace del playbook copiado" : "Enlace copiado: pégalo donde quieras");
      else {
        inpEnlace.value = url;
        inpEnlace.select();
        toast("Copia el enlace manualmente (Ctrl+C)");
      }
    } catch {
      toast("No se pudo generar el enlace.");
    }
  }

  async function compartirNativo() {
    const j = hist.presente;
    try {
      const url = await urlDe([j]);
      if (typeof navigator.share === "function") {
        try {
          await navigator.share({ title: j.nombre, text: `Jugada de baloncesto: ${j.nombre}`, url });
          return;
        } catch (e) {
          if (e instanceof DOMException && e.name === "AbortError") return;
        }
      }
      if (await copiar(url)) toast("Tu navegador no tiene menú de compartir: enlace copiado");
      else toast("No se pudo compartir ni copiar el enlace.");
    } catch {
      toast("No se pudo generar el enlace.");
    }
  }

  function descargar(blob: Blob, nombre: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = nombre;
    document.body.append(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 5000);
  }

  async function svgACanvas(svgTxt: string, w: number, h: number, escala: number): Promise<HTMLCanvasElement> {
    const img = new Image();
    const url = URL.createObjectURL(new Blob([svgTxt], { type: "image/svg+xml;charset=utf-8" }));
    try {
      await new Promise<void>((ok, ko) => {
        img.onload = () => ok();
        img.onerror = () => ko(new Error("No se pudo dibujar la imagen"));
        img.src = url;
      });
      const e = Math.min(escala, 8000 / Math.max(w, h));
      const c = document.createElement("canvas");
      c.width = Math.round(w * e);
      c.height = Math.round(h * e);
      const ctx = c.getContext("2d");
      if (!ctx) throw new Error("Sin canvas");
      ctx.drawImage(img, 0, 0, c.width, c.height);
      return c;
    } finally {
      URL.revokeObjectURL(url);
    }
  }

  const aBlob = (c: HTMLCanvasElement, tipo: string) =>
    new Promise<Blob>((ok, ko) => c.toBlob((b) => (b ? ok(b) : ko(new Error("No se pudo crear la imagen"))), tipo));

  async function exportarPNG(hoja: boolean) {
    const j = hist.presente;
    try {
      toast("Generando imagen…", 8000);
      const l = hoja ? renderHoja(j, { paleta: PALETAS[paleta] }) : renderCuadro(j, paso, { paleta: PALETAS[paleta], ancho: 1200 });
      const c = await svgACanvas(l.svg, l.w, l.h, 1.5);
      descargar(await aBlob(c, "image/png"), nombreArchivo(j.nombre + (hoja ? " hoja" : ` paso ${paso + 1}`), "png"));
      toast(hoja ? "Hoja de pasos descargada (PNG)" : "Imagen del paso descargada (PNG)");
    } catch {
      toast("No se pudo crear la imagen en este navegador.");
    }
  }

  function videoSoportado(): string | null {
    if (typeof MediaRecorder === "undefined") return null;
    if (typeof HTMLCanvasElement.prototype.captureStream !== "function") return null;
    for (const t of ["video/webm;codecs=vp9", "video/webm;codecs=vp8", "video/webm"]) {
      if (MediaRecorder.isTypeSupported(t)) return t;
    }
    return null;
  }

  async function grabarVideo() {
    const mime = videoSoportado();
    if (!mime) return void toast("Tu navegador no puede grabar vídeo de la animación (en Safari, usa Chrome o Edge). Puedes exportar imágenes.", 6000);
    const j = clonar(hist.presente);
    if (j.pasos.length < 2) return void toast("Crea al menos dos pasos para grabar la animación.");
    if (grabando) return;
    detener();
    grabando = true;
    root.classList.add("pz-rec");
    const W = 1280;
    const pal = PALETAS[paleta];
    const base = renderCuadro(j, 0, { paleta: pal, ancho: W, notas: false });
    const canvas = document.createElement("canvas");
    canvas.width = base.w;
    canvas.height = base.h;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      grabando = false;
      root.classList.remove("pz-rec");
      return void toast("No se pudo preparar el vídeo.");
    }
    const total = duracionTotal(j);
    try {
      const rec = new MediaRecorder(canvas.captureStream(30), { mimeType: mime, videoBitsPerSecond: 4_000_000 });
      const trozos: Blob[] = [];
      rec.ondataavailable = (e) => e.data.size && trozos.push(e.data);
      const fin = new Promise<void>((ok) => (rec.onstop = () => ok()));
      const dibujar = async (ms: number) => {
        const st = estadoEnTiempo(j, ms);
        const piezas = posicionesEnTransicion(j, st.k, st.t);
        const l = renderCuadro(j, st.k, { paleta: pal, ancho: W, notas: false, piezas, opacidadLineas: st.t > 0 ? 0.4 : 1 });
        const url = URL.createObjectURL(new Blob([l.svg], { type: "image/svg+xml;charset=utf-8" }));
        try {
          const img = new Image();
          await new Promise<void>((ok, ko) => {
            img.onload = () => ok();
            img.onerror = () => ko(new Error("frame"));
            img.src = url;
          });
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        } finally {
          URL.revokeObjectURL(url);
        }
      };
      await dibujar(0);
      rec.start(250);
      const t0 = performance.now();
      toast("Grabando la animación…", total + 2000);
      await new Promise<void>((ok) => {
        let ocupado = false;
        const tick = () => {
          const ms = performance.now() - t0;
          if (ms >= total + 500) return ok();
          if (!ocupado) {
            ocupado = true;
            dibujar(Math.min(ms, total)).finally(() => (ocupado = false));
          }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
      await dibujar(total);
      await new Promise((r) => setTimeout(r, 350));
      rec.stop();
      await fin;
      descargar(new Blob(trozos, { type: "video/webm" }), nombreArchivo(j.nombre, "webm"));
      toast("Vídeo de la animación descargado (WebM)");
    } catch {
      toast("No se pudo grabar el vídeo en este navegador.");
    } finally {
      grabando = false;
      root.classList.remove("pz-rec");
    }
  }

  function exportarJson(jugadas: Jugada[], nombre: string, esCopia: boolean) {
    // la copia y el playbook completo llevan también las sesiones de entrenamiento
    const extra = esCopia || jugadas.length > 1 ? { sesiones } : {};
    descargar(new Blob([libroAJson(jugadas, extra)], { type: "application/json" }), nombreArchivo(nombre, "json"));
    if (esCopia) {
      ultimaCopia = Date.now();
      persistir(true);
      pintarAvisoCopia();
    }
  }

  function copiaDeSeguridad() {
    const lista = biblio.length ? biblio : [hist.presente];
    const hoy = new Date().toISOString().slice(0, 10);
    exportarJson(lista, `copia pizarra ${hoy}`, true);
    const ses = sesiones.length ? ` y ${sesiones.length} ${sesiones.length === 1 ? "sesión" : "sesiones"}` : "";
    toast(`Copia descargada (${lista.length} ${lista.length === 1 ? "jugada" : "jugadas"}${ses}). Guárdala en tu correo, Drive o el móvil.`, 6000);
  }

  async function importarArchivo(f: File) {
    if (f.size > 5_000_000) return void toast("El archivo es demasiado grande (máximo 5 MB).");
    let texto = "";
    try {
      texto = await f.text();
    } catch {
      return void toast("No se pudo leer el archivo.");
    }
    const r = leerLibroDeTexto(texto);
    let ses = { sesiones: [] as Sesion[], descartadas: 0 };
    try {
      ses = sesionesDeLibro(JSON.parse(texto));
    } catch {
      /* ya lo ha dicho leerLibroDeTexto */
    }
    if (!r || (r.jugadas.length === 0 && ses.sesiones.length === 0)) return void toast("Ese archivo no es una copia válida de la pizarra.", 5000);
    const existentes = new Set(biblio.map((x) => x.id));
    const mapa = new Map<string, string>();
    let n = 0;
    for (const j of r.jugadas) {
      if (biblio.length >= LIMITES.BIBLIOTECA) break;
      const antes = j.id;
      if (existentes.has(j.id)) j.id = uid();
      mapa.set(antes, j.id);
      biblio.unshift(j);
      existentes.add(j.id);
      n++;
    }
    // las sesiones importadas siguen apuntando a sus jugadas aunque estas hayan cambiado de id
    const idsSesion = new Set(sesiones.map((x) => x.id));
    let ns = 0;
    for (const sesion of ses.sesiones) {
      const nueva = remapearJugadas(sesion, mapa);
      if (idsSesion.has(nueva.id)) nueva.id = uid();
      idsSesion.add(nueva.id);
      sesiones.unshift(nueva);
      ns++;
    }
    persistir(true);
    pintarBiblioteca();
    abrirPanelMovil("biblioteca");
    const descartadas = r.descartadas + ses.descartadas;
    const txtSes = ns ? ` y ${ns} ${ns === 1 ? "sesión" : "sesiones"}` : "";
    toast(`${n} ${n === 1 ? "jugada importada" : "jugadas importadas"}${txtSes}${descartadas ? ` · ${descartadas} descartadas por no ser válidas` : ""}`, 5000);
  }

  // ── impresión / PDF ─────────────────────────────────────────────────
  function prepararImpresion(jugadas: Jugada[]) {
    printEl.replaceChildren();
    const pal = PALETAS.neutra;
    for (const j of jugadas) {
      const sec = el("section", { cls: "pz-print-play" });
      sec.append(el("h2", { text: j.nombre }));
      sec.append(el("p", { cls: "pz-print-meta", text: `${CATEGORIAS.find((c) => c.id === j.categoria)?.label ?? ""} · ${j.pasos.length} ${j.pasos.length === 1 ? "paso" : "pasos"}` }));
      if (j.notas) sec.append(el("p", { cls: "pz-print-notas", text: j.notas }));
      const grid = el("div", { cls: "pz-print-grid" + (j.pasos.length === 1 ? " uno" : "") });
      j.pasos.forEach((s, i) => {
        const fig = el("figure", { cls: "pz-print-paso" });
        const box = el("div", { cls: "pz-print-svg" });
        box.innerHTML = renderSvgCompleto({ cancha: j.cancha, orient: j.orient, piezas: s.piezas, lineas: s.lineas, textos: s.textos, zonas: s.zonas, pista: j.pista, paleta: pal });
        const cap = el("figcaption", {}, el("strong", { text: `Paso ${i + 1}` }));
        if (s.nota) cap.append(" · " + s.nota);
        fig.append(box, cap);
        grid.append(fig);
      });
      sec.append(grid);
      sec.append(el("p", { cls: "pz-print-pie", text: "canchazapa.com/pizarra" }));
      printEl.append(sec);
    }
  }

  function imprimir(jugadas: Jugada[]) {
    if (jugadas.length === 0) return void toast("No hay jugadas que imprimir.");
    prepararImpresion(jugadas);
    document.documentElement.classList.add("pz-printing");
    window.setTimeout(() => window.print(), 60);
  }
  window.addEventListener("beforeprint", () => {
    if (!printEl.firstChild) prepararImpresion([hist.presente]);
    document.documentElement.classList.add("pz-printing");
  });
  window.addEventListener("afterprint", () => {
    document.documentElement.classList.remove("pz-printing");
    printEl.replaceChildren();
  });

  // ── pantalla completa ───────────────────────────────────────────────
  function pantallaCompleta() {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
      return;
    }
    if (root.classList.contains("pz-fs")) {
      root.classList.remove("pz-fs");
      document.documentElement.classList.remove("pz-fs-lock");
      return;
    }
    const entrar = root.requestFullscreen?.bind(root);
    if (entrar) {
      entrar().catch(() => {
        root.classList.add("pz-fs");
        document.documentElement.classList.add("pz-fs-lock");
      });
    } else {
      root.classList.add("pz-fs");
      document.documentElement.classList.add("pz-fs-lock");
    }
  }
  document.addEventListener("fullscreenchange", () => {
    root.classList.toggle("pz-fs-on", !!document.fullscreenElement);
    window.setTimeout(pintar, 60);
  });

  // ── jugada compartida (hash) ────────────────────────────────────────
  async function abrirDesdeHash() {
    const payload = payloadDeHash(location.hash);
    if (payload === null) return;
    try {
      if (tipoDePayload(payload) === "s") {
        const cs = await decodificarEnlaceSesion(payload);
        compartidas = cs.jugadas;
        pintarBiblioteca();
        control?.abrirCompartida(cs);
        return;
      }
      const c: CargaEnlace = await decodificarEnlace(payload);
      compartidas = c.jugadas;
      cargarJugada(c.jugadas[0], { vista: true });
      q("banner-texto").textContent =
        c.tipo === "jugada"
          ? `Jugada compartida: «${c.jugadas[0].nombre}»`
          : `Playbook compartido con ${c.jugadas.length} jugadas (se muestra la primera). Están en Biblioteca > Compartidas contigo.`;
      pintarBiblioteca();
      if (c.tipo === "libro") abrirPanelMovil("biblioteca");
    } catch (e) {
      toast("Este enlace no es válido o está incompleto" + (e instanceof Error && e.message ? ` (${e.message})` : "") + ".", 7000);
    }
  }

  function limpiarHash() {
    try {
      history.replaceState(null, "", location.pathname + location.search);
    } catch {
      /* da igual */
    }
  }

  // ── formaciones rápidas ─────────────────────────────────────────────
  function pintarFormaciones() {
    formListaEl.replaceChildren();
    for (const lado of ["ataque", "defensa"] as const) {
      formListaEl.append(el("h4", { cls: "pz-form-h", text: lado === "ataque" ? "Ataque" : "Defensa" }));
      const fila = el("div", { cls: "pz-form-grid" });
      for (const f of FORMACIONES.filter((x) => x.lado === lado)) {
        fila.append(
          el(
            "button",
            { cls: "pz-form-btn", attrs: { type: "button", "data-form": f.id, title: f.descripcion } },
            el("span", { cls: "pz-form-n", text: f.nombre }),
            el("span", { cls: "pz-form-d", text: f.descripcion })
          )
        );
      }
      formListaEl.append(fila);
    }
  }

  function abrirFormaciones() {
    const completa = hist.presente.cancha === "completa";
    formEspejoEl.hidden = !completa;
    formEspejoEl.querySelector("input")!.checked = formEspejo && completa;
    formEl.hidden = !formEl.hidden;
    estadoModal();
  }

  function usarFormacion(id: string) {
    if (soloVista && !tm) return;
    const f = formacionPorId(id);
    if (!f) return;
    const j = hist.presente;
    if (f.id === "def-individual" && !j.pasos[paso].piezas.some((p) => p.tipo === "atq")) {
      return void toast("Coloca primero a tus atacantes (por ejemplo con una formación de ataque) y luego la defensa individual.", 5000);
    }
    const r = aplicarFormacion(j, paso, f, { espejo: formEspejo });
    commit(r.jugada);
    formEl.hidden = true;
    estadoModal();
    toast(`${f.nombre} colocada${r.lineasQuitadas ? ` · se quitaron ${r.lineasQuitadas} líneas que salían de esos jugadores` : ""}. Puedes deshacer.`, 4200);
  }

  // ── modo tiempo muerto ──────────────────────────────────────────────
  function entrarTM() {
    if (tm) return;
    detener();
    const j = hist.presente;
    const s = j.pasos[Math.min(paso, j.pasos.length - 1)];
    tmReal = { hist, paso };
    tmBase = nuevaJugada({
      nombre: "Tiempo muerto",
      categoria: j.categoria,
      cancha: j.cancha,
      orient: j.orient,
      ...(j.pista ? { pista: j.pista } : {}),
      pasos: [{ piezas: clonar(s.piezas), lineas: [], textos: [], nota: "", zonas: clonar(s.zonas ?? []) }],
    });
    hist = nuevoHistorial(clonar(tmBase));
    paso = 0;
    sel = null;
    herr = "select";
    tm = true;
    root.classList.add("pz-tm", "pz-fs");
    document.documentElement.classList.add("pz-fs-lock");
    shareEl.hidden = true;
    formEl.hidden = true;
    cerrarPanelMovil();
    // pantalla completa de verdad si el navegador la deja (iPhone no): si no, queda el modo superpuesto
    try {
      void root.requestFullscreen?.().catch(() => undefined);
    } catch {
      /* sin pantalla completa */
    }
    try {
      void (screen.orientation as unknown as { lock?: (o: string) => Promise<void> })?.lock?.("landscape")?.catch(() => undefined);
    } catch {
      /* no se puede bloquear la orientación */
    }
    estadoModal();
    refrescarTodo();
    marcarHerramienta();
    toast("Tiempo muerto. Arrastra para mover · toque largo y arrastra para dibujar una flecha.", 5200);
  }

  function salirTM() {
    if (!tm || !tmReal) return;
    window.clearTimeout(tmGesto?.timer);
    tmGesto = null;
    tmFlecha = null;
    hist = tmReal.hist;
    paso = tmReal.paso;
    tmReal = null;
    tmBase = null;
    tm = false;
    sel = null;
    drag = null;
    borrador = null;
    trabajo = null;
    formEl.hidden = true;
    root.classList.remove("pz-tm");
    if (document.fullscreenElement) void document.exitFullscreen().catch(() => undefined);
    else {
      root.classList.remove("pz-fs");
      document.documentElement.classList.remove("pz-fs-lock");
    }
    try {
      (screen.orientation as unknown as { unlock?: () => void })?.unlock?.();
    } catch {
      /* da igual */
    }
    estadoModal();
    refrescarTodo();
    marcarHerramienta();
  }

  function tmReset() {
    if (!tm || !tmBase) return;
    hist = nuevoHistorial(clonar(tmBase));
    sel = null;
    refrescarTodo();
    toast("Formación inicial recuperada.", 1800);
  }

  // ── acciones (botones) ──────────────────────────────────────────────
  function accion(act: string, b: HTMLElement) {
    const j = hist.presente;
    switch (act) {
      case "ses":
        return control?.abrir();
      case "tm":
        return tm ? salirTM() : entrarTM();
      case "tm-salir":
        return salirTM();
      case "tm-reset":
        return tmReset();
      case "tm-goma": {
        const hay = hist.presente.pasos[0].lineas.length > 0;
        if (!hay) return void toast("No hay líneas que borrar.", 1800);
        return commit(limpiarPaso(hist.presente, 0, false));
      }
      case "formaciones":
        return abrirFormaciones();
      case "cerrar-formaciones":
        formEl.hidden = true;
        return estadoModal();
      case "deshacer":
        return deshacerAcc();
      case "rehacer":
        return rehacerAcc();
      case "limpiar": {
        if (soloVista) return;
        const hay = j.pasos[paso].lineas.length + j.pasos[paso].textos.length > 0;
        if (hay) return commit(limpiarPaso(j, paso, false)), void toast("Líneas y textos del paso borrados. Puedes deshacer (Ctrl+Z).");
        if (j.pasos[paso].piezas.length && window.confirm("¿Quitar también todos los jugadores de este paso?")) return commit(limpiarPaso(j, paso, true));
        return;
      }
      case "cancha":
        if (soloVista) return;
        return commit(cambiarCancha(j, j.cancha === "media" ? "completa" : "media"));
      case "orient": {
        if (soloVista) return;
        const n = clonar(j);
        n.orient = j.orient === "h" ? "v" : "h";
        return commit(n);
      }
      case "fondo":
        paleta = paleta === "parquet" ? "neutra" : paleta === "neutra" ? "oscura" : "parquet";
        persistir(true);
        return refrescarTodo();
      case "pantalla":
        return pantallaCompleta();
      case "compartir":
        shareEl.hidden = !shareEl.hidden;
        if (!shareEl.hidden) void prepararEnlace();
        return estadoModal();
      case "cerrar-share":
        shareEl.hidden = true;
        return estadoModal();
      case "guardar":
        return guardarActual();
      case "nueva": {
        if (!confirmarCambio()) return;
        cargarJugada(nuevaJugada({ orient: hist.presente.orient, cancha: hist.presente.cancha }));
        cerrarPanelMovil();
        return toast("Pizarra en blanco. Empieza colocando jugadores.");
      }
      case "play":
        return reproducir();
      case "play-prev":
        return irAPaso(paso - 1);
      case "play-next":
        return irAPaso(paso + 1);
      case "add-step":
        if (soloVista) return;
        if (j.pasos.length >= LIMITES.PASOS) return void toast("Máximo de pasos alcanzado.");
        paso = paso + 1;
        return commit(insertarPaso(j, paso - 1));
      case "dup-step":
        if (soloVista) return;
        paso = paso + 1;
        return commit(duplicarPaso(j, paso - 1));
      case "del-step": {
        if (soloVista) return;
        const k = paso;
        paso = Math.max(0, k - (k === j.pasos.length - 1 ? 1 : 0));
        return commit(quitarPaso(j, k));
      }
      case "tab":
        return elegirTab(b.dataset.tab ?? "jugada");
      case "panel-jugada":
        return abrirPanelMovil("jugada");
      case "panel-biblio":
        return abrirPanelMovil("biblioteca");
      case "cerrar-panel":
        return cerrarPanelMovil();
      case "cerrar-aviso":
        avisoCerrado = Date.now();
        persistir(true);
        return pintarAvisoCopia();
      case "copy-link":
        return void copiarEnlace(false);
      case "copy-book":
        return void copiarEnlace(true);
      case "share-native":
        return void compartirNativo();
      case "png-paso":
        return void exportarPNG(false);
      case "png-hoja":
        return void exportarPNG(true);
      case "video":
        return void grabarVideo();
      case "print-jugada":
        shareEl.hidden = true;
        estadoModal();
        return imprimir([j]);
      case "print-book":
        shareEl.hidden = true;
        estadoModal();
        return imprimir(biblio);
      case "json-jugada":
        return exportarJson([j], j.nombre, false);
      case "backup":
        return copiaDeSeguridad();
      case "restaurar":
      case "importar":
        return fileEl.click();
      case "guardar-compartida": {
        const n = compartidas.length;
        for (const c of compartidas) {
          const k = clonar(c);
          k.id = uid();
          biblio.unshift(k);
        }
        const primero = biblio[Math.min(n, biblio.length) - 1];
        compartidas = [];
        bannerEl.hidden = true;
        soloVista = false;
        limpiarHash();
        if (primero) guardadaJson = JSON.stringify(comparable(primero));
        if (primero) cargarJugada(primero, { conservarId: true });
        persistir(true);
        pintarBiblioteca();
        return toast(n === 1 ? "Guardada en tu biblioteca" : `${n} jugadas guardadas en tu biblioteca`);
      }
      case "editar-copia":
        soloVista = false;
        bannerEl.hidden = true;
        limpiarHash();
        hist = nuevoHistorial({ ...hist.presente, id: uid() });
        refrescarTodo();
        persistir();
        return toast("Ahora puedes editar tu copia. Recuerda guardarla.");
      default:
    }
  }

  root.addEventListener("click", (e) => {
    const t = e.target as Element | null;
    if (!t) return;
    const paso$ = t.closest<HTMLElement>("[data-paso]");
    if (paso$ && pasosEl.contains(paso$)) return irAPaso(Number(paso$.dataset.paso));
    const form = t.closest<HTMLElement>("[data-form]");
    if (form) return usarFormacion(form.dataset.form ?? "");
    const tool = t.closest<HTMLElement>("[data-tool]");
    if (tool) return elegirHerramienta(tool.dataset.tool as Herr);
    const act = t.closest<HTMLElement>("[data-act]");
    if (act && !(act as HTMLButtonElement).disabled) accion(act.dataset.act ?? "", act);
  });

  // metadatos de la jugada
  const meta = (fn: (j: Jugada) => void) => {
    if (soloVista) return;
    const j = clonar(hist.presente);
    fn(j);
    commit(j);
  };
  inpNombre.addEventListener("change", () => meta((j) => (j.nombre = limpiaTexto(inpNombre.value, LIMITES.NOMBRE).trim() || "Jugada sin título")));
  selCat.addEventListener("change", () => meta((j) => (j.categoria = selCat.value as Categoria)));
  txtNotas.addEventListener("change", () => meta((j) => (j.notas = limpiaTexto(txtNotas.value, LIMITES.NOTAS))));
  txtNotaPaso.addEventListener("change", () => meta((j) => (j.pasos[paso].nota = limpiaTexto(txtNotaPaso.value, LIMITES.NOTA_PASO))));
  inpBuscar.addEventListener("input", pintarBiblioteca);
  selFiltro.addEventListener("change", pintarBiblioteca);
  selPista.addEventListener("change", () => {
    if (soloVista) return void actualizarUI();
    const [pista, cancha] = selPista.value.split("-");
    let j = hist.presente;
    if (pista === "fiba" || pista === "mini") j = cambiarPista(j, pista);
    if (cancha === "media" || cancha === "completa") j = cambiarCancha(j, cancha);
    commit(j);
  });
  selVel.addEventListener("change", () => {
    /* la velocidad se lee en cada fotograma */
  });
  fileEl.addEventListener("change", () => {
    const f = fileEl.files?.[0];
    if (f) void importarArchivo(f);
    fileEl.value = "";
  });
  inpEnlace.addEventListener("focus", () => inpEnlace.select());
  formEspejoEl.querySelector("input")?.addEventListener("change", (e) => {
    formEspejo = (e.target as HTMLInputElement).checked;
  });

  // teclado
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    const t = e.target as HTMLElement | null;
    const escribiendo = !!t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT" || t.isContentEditable);
    const ctrl = e.ctrlKey || e.metaKey;
    if (e.key === "Escape") {
      if (control?.estaAbierta()) {
        control.cerrar();
      } else if (!formEl.hidden) {
        formEl.hidden = true;
        estadoModal();
      } else if (!shareEl.hidden) {
        shareEl.hidden = true;
        estadoModal();
      } else if (tm) salirTM();
      else if (root.classList.contains("pz-fs")) pantallaCompleta();
      else if (sideEl.classList.contains("open")) cerrarPanelMovil();
      else if (herr !== "select") elegirHerramienta("select");
      else if (sel) seleccionar(null);
      return;
    }
    if (escribiendo) return;
    if (ctrl && e.key.toLowerCase() === "z") {
      e.preventDefault();
      return e.shiftKey ? rehacerAcc() : deshacerAcc();
    }
    if (ctrl && e.key.toLowerCase() === "y") {
      e.preventDefault();
      return rehacerAcc();
    }
    if (ctrl && e.key.toLowerCase() === "s") {
      e.preventDefault();
      return guardarActual();
    }
    if (ctrl || e.altKey) return;
    if (e.key.toLowerCase() === "t") return tm ? salirTM() : entrarTM();
    if (tm) return;
    if (e.key === "Delete" || e.key === "Backspace") {
      if (sel) {
        e.preventDefault();
        eliminarSel();
      }
      return;
    }
    if (e.key === " ") {
      e.preventDefault();
      return reproducir();
    }
    if (e.key === "ArrowLeft") return irAPaso(paso - 1);
    if (e.key === "ArrowRight") return irAPaso(paso + 1);
    const mapa: Record<string, Herr> = { v: "select", a: "atq", d: "def", b: "balon", k: "cono", g: "neu", e: "ent", i: "fila", z: "zona", x: "elipse", o: "rotacion", p: "pase", r: "bote", c: "corte", l: "bloqueo", s: "tiro", f: "libre", n: "texto" };
    const h = mapa[e.key.toLowerCase()];
    if (h) elegirHerramienta(h);
  });

  // recolocar al cambiar de tamaño (el SVG escala solo; esto es por si cambia el umbral)
  window.addEventListener("resize", () => pintar());
  window.addEventListener("hashchange", () => {
    if (payloadDeHash(location.hash) !== null) void abrirDesdeHash();
  });
  window.addEventListener("pagehide", () => persistir(true));

  // ── arranque ────────────────────────────────────────────────────────
  control = iniciarSesiones({
    root,
    printEl,
    biblio: () => biblio,
    jugadasCompartidas: () => compartidas,
    asegurarJugada: (j) => {
      const huella = JSON.stringify(compactar(j));
      const igual = biblio.find((x) => x.nombre === j.nombre && x.categoria === j.categoria && JSON.stringify(compactar(x)) === huella);
      if (igual) return igual;
      const copia = clonar(j);
      copia.id = uid();
      copia.actualizada = Date.now();
      if (biblio.length < LIMITES.BIBLIOTECA) {
        biblio.unshift(copia);
        persistir(true);
        pintarBiblioteca();
      }
      return copia;
    },
    guardarJugadas: (js) => {
      const mapa = new Map<string, string>();
      for (const j of js) {
        const huella = JSON.stringify(compactar(j));
        const igual = biblio.find((x) => x.nombre === j.nombre && JSON.stringify(compactar(x)) === huella);
        if (igual) {
          mapa.set(j.id, igual.id);
          continue;
        }
        const copia = clonar(j);
        copia.id = uid();
        if (biblio.length < LIMITES.BIBLIOTECA) biblio.unshift(copia);
        mapa.set(j.id, copia.id);
      }
      persistir(true);
      pintarBiblioteca();
      return mapa;
    },
    sesiones: () => sesiones,
    setSesiones: (l) => {
      sesiones = l;
      persistir(true);
      pintarAvisoCopia();
    },
    paleta: () => paleta,
    toast,
    abrirJugada: (j, vista) => abrir(j, false, vista),
    copiar,
    urlBase: () => `${location.origin}${location.pathname}`,
    lanzarImpresion: () => {
      shareEl.hidden = true;
      estadoModal();
      document.documentElement.classList.add("pz-printing");
      window.setTimeout(() => window.print(), 60);
    },
  });
  pintarFormaciones();
  marcarHerramienta();
  elegirTab("jugada");
  refrescarTodo();
  pintarBiblioteca();
  setPlayIcon();
  root.classList.add("pz-listo");
  root.classList.toggle("pz-sin-video", !videoSoportado());
  if (!almacen.borrador) persistir();

  try {
    // pedir almacenamiento persistente: ayuda, pero NO es una garantía
    void navigator.storage?.persist?.().catch(() => undefined);
  } catch {
    /* sin navigator.storage */
  }

  if (payloadDeHash(location.hash) !== null) void abrirDesdeHash();
  else if (tocaRecordarCopia(biblio.length + sesiones.length, ultimaCopia, Date.now()) && (avisoCerrado === null || Date.now() - avisoCerrado > 3 * MS_DIA)) {
    window.setTimeout(() => toast("Hace tiempo que no haces una copia de seguridad de tus jugadas. Hazla desde Biblioteca.", 6500), 1500);
  }

  // para pruebas y depuración desde la consola
  (window as unknown as { __pizarra?: unknown }).__pizarra = {
    estado: () => ({ jugada: hist.presente, paso, herr, sel, biblio: biblio.length }),
  };
}
