// UI del modo Equipo de /estadisticas (cliente). La lógica pura está en lib/statsEquipo.ts.
// 100 % en el navegador: el equipo vive en localStorage (cz.team.v1) y solo se llama a /api/feb
// cuando el usuario importa un acta. Nada se sube a ningún servidor.
import {
  type Equipo, type EquipoStore, type PartidoEq, type Payload, type PartidoJugador, type Linea, type Col, type Modo,
  COLUMNAS, LIMITE_ENLACE, LINEA_KEYS,
  archivoCopia, archivoEquipo, balance, calcLinea, codificarEnlace, csvTemporada, decodificarEnlace, emparejar, equipoSoloPartido, esArchivoCopia, mostrarAvisoCopia, recordatorioCopia, restaurarCopia, textoUltimaCopia,
  fechaCorta, fusionar, jugo, leerArchivoEquipo, lideres, lineaVacia, mejoresDelPartido, normalizarStore, ordenarTabla,
  parsePlantilla, partidosDeJugador, partidosOrdenados, puntosPropios, resultado, serieMarcadores,
  sumaLineas, tablaTemporada, textoPartido, tokenDeHash, uid, urlEnlace, valorColumna,
} from "../lib/statsEquipo";
import { montarLectorActa } from "../lib/actaImportUI";
import { equipoDelRival, type ActaFeb } from "../lib/informeRival";

export interface HostJugador {
  esc: (s: unknown) => string;
  getJugador: () => { nombre: string; partidos: PartidoJugador[] };
  importarJugador: (nombre: string, partidos: PartidoJugador[]) => { añadidos: number; duplicados: number };
}

const LS_TEAM = "cz.team.v1";
const LS_TAB = "cz.stats.tab";

interface DRow { key: number; imp: boolean; dorsal: string; nombre: string; asign: string; l: Linea; }
interface Draft {
  editId: string | null; origen: "manual" | "feb" | "pegado" | "edicion";
  fecha: string; rival: string; competicion: string; pf: string; pc: string; rows: DRow[]; error: string;
  /** Lo que no cuadra en un acta leída de una captura o con IA: se enseña para revisarlo. */
  avisos: string[];
}

// ───────────────────────── aviso y recordatorio de copia de seguridad ─────────────────────────
// Compartido por las pestañas Jugador y Equipo: los datos viven solo en localStorage.
const lsGet = (k: string): string | null => { try { return localStorage.getItem(k); } catch { return null; } };
const lsSet = (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* sin storage */ } };
const lsNum = (k: string): number | null => { const v = lsGet(k); return v != null && Number.isFinite(Number(v)) ? Number(v) : null; };
const refrescos: (() => void)[] = [];
export const refrescarAvisos = () => refrescos.forEach((f) => f());
export const marcarCopia = (scope: "jugador" | "equipo") => { lsSet(`cz.backup.last.${scope}`, String(Date.now())); refrescarAvisos(); };

export function montarAvisoCopia(el: HTMLElement | null, scope: "jugador" | "equipo", getPartidos: () => number, hacerCopia: () => void) {
  if (!el) return;
  const render = () => {
    const ahora = Date.now(), n = getPartidos(), ultima = lsNum(`cz.backup.last.${scope}`);
    const rec = recordatorioCopia(ahora, ultima, n);
    const largo = mostrarAvisoCopia(ahora, lsNum(`cz.backup.dismiss.${scope}`), rec);
    el.innerHTML = `<div class="st-backup${rec !== "ninguno" ? " st-backup-due" : ""}">
      ${largo ? `<p class="st-backup-warn"><span>💾 <strong>Tus datos se guardan solo en este navegador.</strong> Si borras el historial o las cookies, cambias de dispositivo o usas modo incógnito, se pierden. En iPhone/iPad, Safari puede borrarlos si pasas 7 días sin entrar. Haz copias de seguridad.</span><button type="button" class="st-del" data-bk="cerrar" aria-label="Cerrar aviso" title="Cerrar">✕</button></p>` : ""}
      <div class="st-backup-bar">
        <button type="button" class="st-btn st-backup-btn" data-bk="copia">💾 Copia de seguridad</button>
        <span class="st-backup-last">${textoUltimaCopia(ahora, ultima)}</span>
        ${rec !== "ninguno" ? `<span class="st-backup-rec">⚠ ${rec === "nunca" ? `Aún no has hecho ninguna copia de tus ${n} partidos.` : "Hace más de 14 días que no haces copia."}</span>` : ""}
      </div></div>`;
  };
  el.addEventListener("click", (ev) => {
    const b = (ev.target as Element).closest<HTMLElement>("[data-bk]");
    if (!b) return;
    if (b.dataset.bk === "copia") hacerCopia();
    else { lsSet(`cz.backup.dismiss.${scope}`, String(Date.now())); render(); }
  });
  refrescos.push(render);
  render();
}

export function initEquipo(host: HostJugador) {
  const { esc } = host;
  const root = document.getElementById("eq-root") as HTMLElement;
  const dlg = document.getElementById("eq-dialog") as HTMLDialogElement;
  const dlgBody = document.getElementById("eq-dialog-body") as HTMLElement;
  const dlgTitle = document.getElementById("eq-dialog-title") as HTMLElement;
  const incoming = document.getElementById("st-incoming") as HTMLElement;
  if (!root || !dlg) return;

  // Pide al navegador que no borre los datos por falta de espacio (no es una garantía: no bloquea nada).
  try { void navigator.storage?.persist?.(); } catch { /* sin soporte */ }

  // ───────────────────────── estado ─────────────────────────
  const cargar = (): EquipoStore => {
    try {
      const raw = localStorage.getItem(LS_TEAM);
      if (raw) return normalizarStore(JSON.parse(raw));
    } catch { /* storage bloqueado o corrupto */ }
    return { activo: "", equipos: [] };
  };
  let store = cargar();
  let avisoStorage = false;
  const guardar = () => {
    try { localStorage.setItem(LS_TEAM, JSON.stringify(store)); refrescarAvisos(); }
    catch { if (!avisoStorage) { avisoStorage = true; alert("No se pudo guardar en este navegador (¿modo privado o sin espacio?). Exporta el equipo a un archivo para no perderlo."); } }
  };
  const eq = (): Equipo | undefined => store.equipos.find((e) => e.id === store.activo);

  let modo: Modo = "medias";
  let sortCol: Col = "pts";
  let sortDesc = true;
  let draft: Draft | null = null;
  let febData: any = null;
  let febMsg = "";
  // el elegir equipo de un acta vale también para la leída de una captura (dos equipos)
  let febOrigen: "feb" | "pegado" = "feb";
  let febAvisos: string[] = [];
  let verId: string | null = null;
  let jugadorId: string | null = null;
  let creando = false;
  let rowKey = 1;
  let entrante: Payload | null = null;
  let cardBlob: Blob | null = null;
  let cardName = "";
  let cardUrl = "";
  let shareTxt = "";
  let shareUrl = "";
  let shareFile: { nombre: string; json: unknown } | null = null;

  // ───────────────────────── utilidades UI ─────────────────────────
  const hoy = () => new Date().toISOString().slice(0, 10);
  const f1 = (v: number | null | undefined) => (v == null || !Number.isFinite(v) ? "—" : v.toFixed(1));
  const f0 = (v: number | null | undefined) => (v == null || !Number.isFinite(v) ? "—" : String(Math.round(v)));
  const $q = <T extends HTMLElement = HTMLElement>(sel: string) => root.querySelector(sel) as T | null;
  const slug = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "equipo";
  const track = (n: string) => { try { (window as any).plausible?.(n); } catch { /* no-op */ } };

  let toastEl: HTMLElement | null = null;
  let toastT = 0;
  const aviso = (msg: string) => {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "st-toast"; toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg; toastEl.classList.add("show");
    clearTimeout(toastT); toastT = window.setTimeout(() => toastEl?.classList.remove("show"), 2200);
  };

  const descargar = (nombre: string, contenido: BlobPart, mime: string) => {
    const blob = new Blob([contenido], { type: mime });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = nombre; a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
  };
  const copiar = async (txt: string): Promise<boolean> => {
    try { await navigator.clipboard.writeText(txt); return true; } catch { /* cae al fallback */ }
    try {
      const ta = document.createElement("textarea");
      ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      const ok = document.execCommand("copy"); ta.remove(); return ok;
    } catch { return false; }
  };

  const copiaSeguridad = () => {
    descargar(`canchazapa-equipos-copia-${hoy()}.json`, JSON.stringify(archivoCopia(store), null, 2), "application/json");
    marcarCopia("equipo");
    aviso("Copia descargada: guárdala en un sitio seguro (Drive, correo…)");
  };
  montarAvisoCopia(document.getElementById("bk-equipo"), "equipo", () => store.equipos.reduce((a, e) => a + e.partidos.length, 0), copiaSeguridad);

  // ───────────────────────── pestañas ─────────────────────────
  const tabs = { jugador: document.getElementById("tab-jugador"), equipo: document.getElementById("tab-equipo") };
  const setTab = (t: "jugador" | "equipo", persist = true) => {
    (["jugador", "equipo"] as const).forEach((k) => {
      tabs[k]?.classList.toggle("hidden", k !== t);
      const b = document.getElementById("tabbtn-" + k);
      b?.classList.toggle("active", k === t);
      b?.setAttribute("aria-selected", k === t ? "true" : "false");
    });
    if (persist) { try { localStorage.setItem(LS_TAB, t); } catch { /* sin storage */ } }
    if (t === "equipo") requestAnimationFrame(renderChart);
  };
  document.querySelectorAll<HTMLElement>(".st-tab").forEach((b) =>
    b.addEventListener("click", () => setTab(b.dataset.tab === "equipo" ? "equipo" : "jugador")));
  try { setTab(localStorage.getItem(LS_TAB) === "equipo" ? "equipo" : "jugador", false); } catch { setTab("jugador", false); }

  // ───────────────────────── esqueleto ─────────────────────────
  root.innerHTML = `
    <p class="st-note st-privacy">🔒 <strong>Privacidad.</strong> Muchos jugadores son menores: los datos de tu equipo se quedan en <strong>tu navegador</strong>.
      No se suben a ningún servidor (solo se consulta la FEB cuando tú importas un acta). Si compartes un enlace, los datos viajan <em>dentro</em> de la propia dirección, tras el
      símbolo #, que el navegador nunca envía a ningún servidor: solo los ve quien reciba el enlace.</p>
    <div class="st-panel" id="eq-team"></div>
    <div class="st-panel" id="eq-add"></div>
    <div id="eq-views"></div>`;
  const elTeam = $q("#eq-team") as HTMLElement, elAdd = $q("#eq-add") as HTMLElement, elViews = $q("#eq-views") as HTMLElement;

  // ───────────────────────── panel equipo ─────────────────────────
  const renderTeam = () => {
    const e = eq();
    const opts = store.equipos.map((x) => `<option value="${esc(x.id)}"${x.id === store.activo ? " selected" : ""}>${esc(x.nombre)}${x.categoria ? " · " + esc(x.categoria) : ""}</option>`).join("");
    if (!e || creando) {
      elTeam.innerHTML = `
        <h2 class="st-h2">${e ? "Nuevo equipo" : "Crea tu equipo"}</h2>
        <p class="st-note" style="margin-top:0">Pon el nombre y la categoría; la plantilla la rellenas después (o pegas la lista de golpe).</p>
        <div class="st-form-row">
          <div class="st-field st-grow"><label for="eq-new-nombre">Nombre del equipo</label><input id="eq-new-nombre" type="text" maxlength="40" placeholder="CB Ejemplo" /></div>
          <div class="st-field st-grow"><label for="eq-new-cat">Categoría</label><input id="eq-new-cat" type="text" maxlength="30" placeholder="Cadete masculino" /></div>
        </div>
        <div class="st-actions">
          <button type="button" class="st-btn" data-act="crear-equipo">Crear equipo</button>
          ${e ? '<button type="button" class="st-btn st-btn-ghost" data-act="cancelar-equipo">Cancelar</button>' : ""}
          ${!e ? '<label class="st-btn st-btn-ghost st-file">⬆ Restaurar copia o importar archivo<input type="file" accept="application/json,.json" id="eq-file" class="hidden" /></label>' : ""}
        </div>`;
      return;
    }
    const filas = e.jugadores.map((j) => `
      <div class="st-plant-row">
        <input class="st-n st-dors" data-pj="${esc(j.id)}" data-k="dorsal" value="${esc(j.dorsal)}" maxlength="3" inputmode="numeric" aria-label="Dorsal" placeholder="#" />
        <input class="st-pj-nombre" data-pj="${esc(j.id)}" data-k="nombre" value="${esc(j.nombre)}" maxlength="40" aria-label="Nombre" />
        <button type="button" class="st-del" data-act="del-jug" data-id="${esc(j.id)}" aria-label="Quitar a ${esc(j.nombre)}" title="Quitar de la plantilla">✕</button>
      </div>`).join("");
    elTeam.innerHTML = `
      <div class="st-eq-head">
        <h2 class="st-h2">Tu equipo</h2>
        <div class="st-eq-switch">
          ${store.equipos.length > 1 ? `<select id="eq-switch" aria-label="Cambiar de equipo" data-sel="equipo">${opts}</select>` : ""}
          <button type="button" class="st-btn st-btn-ghost" data-act="nuevo-equipo">＋ Otro equipo</button>
        </div>
      </div>
      <div class="st-form-row">
        <div class="st-field st-grow"><label for="eq-nombre">Nombre</label><input id="eq-nombre" data-f="nombre" value="${esc(e.nombre)}" maxlength="40" /></div>
        <div class="st-field st-grow"><label for="eq-cat">Categoría</label><input id="eq-cat" data-f="categoria" value="${esc(e.categoria)}" maxlength="30" placeholder="Cadete, Júnior, Senior B…" /></div>
      </div>
      <h3 class="st-sub">Plantilla <span class="st-h2-tag">${e.jugadores.length} jugador${e.jugadores.length === 1 ? "" : "es"}</span></h3>
      ${filas || '<p class="st-empty" style="padding:12px 0">Aún no hay jugadores. Añade el primero aquí abajo o pega la lista entera.</p>'}
      <div class="st-plant-row st-plant-add">
        <input class="st-n st-dors" id="eq-new-d" maxlength="3" inputmode="numeric" placeholder="#" aria-label="Dorsal nuevo" />
        <input class="st-pj-nombre" id="eq-new-n" maxlength="40" placeholder="Nombre del jugador" aria-label="Nombre nuevo" />
        <button type="button" class="st-btn" data-act="add-jug">＋</button>
      </div>
      <details class="st-import st-import-paste">
        <summary>Pegar la plantilla entera (una línea por jugador)</summary>
        <textarea id="eq-bulk" class="st-paste-area" rows="5" placeholder="4 Marc Puig&#10;7 García López, Pau&#10;10 Jordi"></textarea>
        <button type="button" class="st-btn" data-act="add-bulk">Añadir a la plantilla</button>
      </details>
      <div class="st-actions st-actions-wrap">
        <button type="button" class="st-btn st-btn-ghost" data-act="share-equipo">🔗 Enlace del equipo</button>
        <button type="button" class="st-btn st-btn-ghost" data-act="exp-equipo">⬇ Exportar este equipo</button>
        <label class="st-btn st-btn-ghost st-file">⬆ Restaurar / importar .json<input type="file" accept="application/json,.json" id="eq-file" class="hidden" /></label>
        <button type="button" class="st-btn st-btn-danger" data-act="del-equipo">✕ Borrar equipo</button>
      </div>`;
  };

  // ───────────────────────── añadir / editar partido ─────────────────────────
  const rowsDeJugadores = (e: Equipo, lineas: Map<string, Linea>): DRow[] =>
    e.jugadores.map((j) => ({ key: rowKey++, imp: false, dorsal: j.dorsal, nombre: j.nombre, asign: j.id, l: { ...(lineas.get(j.id) ?? lineaVacia()) } }));

  const nuevoBorrador = (origen: Draft["origen"], parte: Partial<Draft> = {}): Draft => ({
    editId: null, origen, fecha: hoy(), rival: "", competicion: "", pf: "", pc: "", rows: [], error: "", avisos: [], ...parte,
  });

  const rowsImportadas = (e: Equipo, jugadores: any[]): DRow[] => {
    const jug = jugadores.filter((j) => jugo(j));
    const emp = emparejar(e.jugadores, jug.map((j) => ({ dorsal: j.dorsal, nombre: j.nombre })));
    return jug.map((j, i) => {
      const l = lineaVacia();
      for (const k of LINEA_KEYS) l[k] = Math.max(0, Math.min(k === "min" ? 99 : 999, parseInt(j[k], 10) || 0));
      return { key: rowKey++, imp: true, dorsal: String(j.dorsal ?? ""), nombre: String(j.nombre ?? ""), asign: emp[i] ?? "__new", l };
    });
  };

  const renderAdd = () => {
    const e = eq();
    elAdd.classList.toggle("hidden", !e || creando);
    if (!e || creando) { elAdd.innerHTML = ""; return; }
    if (!draft) {
      elAdd.innerHTML = `
        <h2 class="st-h2">Añadir partido</h2>
        <div class="st-import">
          <label for="eq-feb-q">Importar acta FEB (todos tus jugadores de golpe)</label>
          <div class="st-import-row">
            <input id="eq-feb-q" type="text" placeholder="URL o ID del partido en baloncestoenvivo.feb.es" autocomplete="off" />
            <button type="button" class="st-btn" data-act="feb-buscar">Importar</button>
          </div>
          ${febMsg ? `<p class="${febData ? "st-import-hint" : "st-error"}">${febMsg}</p>` : ""}
          ${febData ? febData.equipos.map((t: any, i: number) =>
            `<button type="button" class="st-btn st-btn-ghost st-feb-team" data-act="feb-elegir" data-i="${i}">Somos <strong>${esc(t.nombre || `Equipo ${i + 1}`)}</strong> (${t.pts ?? "?"})</button>`).join("") : ""}
        </div>
        <details class="st-import st-import-paste">
          <summary>Otra federación: pega el acta (texto, captura o PDF)</summary>
          <p class="st-paste-help">Haz una <strong>captura de la tabla de estadísticas</strong> del partido y pégala aquí con Ctrl+V, o copia la tabla tal cual. También vale una foto o el PDF del acta. Se lee en tu navegador; si hace falta IA, los nombres no salen de aquí.</p>
          <p class="st-paste-help"><strong>¿FCBQ?</strong> Su app no da la tabla por jugador: en el partido, pestaña «Jugades», graba la pantalla mientras bajas hasta el final y sube aquí el vídeo.</p>
          <textarea id="eq-paste" class="st-paste-area" rows="6" placeholder="Dorsal  Jugador  Min  Punts  T2  T3  TL  Reb  As  BR  Tap  PP  Faltes"></textarea>
          <button type="button" class="st-btn" id="eq-paste-leer">Leer acta</button>
          <p id="eq-paste-err" class="st-error hidden"></p>
        </details>
        <div class="st-actions"><button type="button" class="st-btn st-btn-ghost" data-act="manual">✍ Entrada manual rápida</button></div>
        ${e.jugadores.length ? "" : '<p class="st-note">Consejo: rellena antes la plantilla para que la entrada manual tenga una fila por jugador.</p>'}`;
      montarLectorActa({
        textarea: $q<HTMLTextAreaElement>("#eq-paste")!,
        boton: $q<HTMLButtonElement>("#eq-paste-leer")!,
        estado: (m, error) => {
          const el = $q("#eq-paste-err") as HTMLElement | null;
          if (!el) return;
          el.textContent = m;
          el.classList.toggle("hidden", !m);
          el.classList.toggle("st-error", !!error);
          el.classList.toggle("st-import-hint", !error);
        },
        onActa: (acta, avisos) => {
          const eqAct = eq();
          if (!eqAct) return;
          if (acta.equipos.length === 1) {
            const t = acta.equipos[0];
            draft = nuevoBorrador("pegado", { fecha: acta.fecha || hoy(), pf: t.pts == null ? "" : String(t.pts), rows: rowsImportadas(eqAct, t.jugadores), avisos });
          } else {
            febData = { fecha: acta.fecha, competicion: "", equipos: acta.equipos };
            febMsg = "Acta leída.<br/><strong>¿Cuál de los dos es tu equipo?</strong>";
            febOrigen = "pegado";
            febAvisos = avisos;
            const propio = equipoPropio(eqAct);
            if (propio >= 0) { track("Team Paste Import"); elegirEquipoActa(eqAct, propio); return; }
          }
          track("Team Paste Import");
          renderAdd();
        },
      });
      return;
    }
    const d = draft;
    const sel = (r: DRow) => `<select data-asign="${r.key}" aria-label="Asignar ${esc(r.nombre)} a la plantilla">
        ${e.jugadores.map((j) => `<option value="${esc(j.id)}"${r.asign === j.id ? " selected" : ""}>${j.dorsal ? esc(j.dorsal) + " · " : ""}${esc(j.nombre)}</option>`).join("")}
        <option value="__new"${r.asign === "__new" ? " selected" : ""}>＋ Añadir a la plantilla</option>
        <option value="__skip"${r.asign === "__skip" ? " selected" : ""}>— Ignorar</option></select>`;
    const inp = (r: DRow, k: keyof Linea, extra = "") =>
      `<input type="number" min="0" inputmode="numeric" class="st-n ${extra}" data-r="${r.key}" data-k="${k}" value="${r.l[k] || ""}" placeholder="0" aria-label="${k} ${esc(r.nombre)}" />`;
    const filas = d.rows.map((r) => `<tr>
        <td class="st-draft-name">${r.imp ? `<span class="st-dorsal">${esc(r.dorsal || "·")}</span> ${esc(r.nombre)}<br/>${sel(r)}` : `<span class="st-dorsal">${esc(r.dorsal || "·")}</span> ${esc(r.nombre)}`}</td>
        <td>${inp(r, "min")}</td>
        <td class="st-pair">${inp(r, "t2c")}/${inp(r, "t2i")}</td>
        <td class="st-pair">${inp(r, "t3c")}/${inp(r, "t3i")}</td>
        <td class="st-pair">${inp(r, "tlc")}/${inp(r, "tli")}</td>
        <td>${inp(r, "ro")}</td><td>${inp(r, "rd")}</td><td>${inp(r, "ast")}</td><td>${inp(r, "rob")}</td>
        <td>${inp(r, "tap")}</td><td>${inp(r, "per")}</td><td>${inp(r, "fal")}</td></tr>`).join("");
    const titulo = d.origen === "edicion" ? "Editar partido" : "Añadir partido";
    const pista = d.origen === "feb" ? "Acta FEB leída: revisa a quién corresponde cada jugador (la plantilla se empareja por dorsal y por nombre)."
      : d.origen === "pegado" ? "Acta pegada leída: revisa el emparejamiento con tu plantilla, la fecha, el rival y el marcador."
      : "Rellena solo a quien jugó; las filas a cero no se guardan.";
    elAdd.innerHTML = `
      <h2 class="st-h2">${titulo}</h2>
      <p class="st-import-hint" style="margin-top:0">${pista}</p>
      ${d.avisos.length ? `<ul class="st-import-avisos">${d.avisos.map((x) => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
      <div class="st-form-row">
        <div class="st-field"><label for="d-fecha">Fecha</label><input id="d-fecha" type="date" data-d="fecha" value="${esc(d.fecha)}" /></div>
        <div class="st-field st-grow"><label for="d-rival">Rival</label><input id="d-rival" data-d="rival" value="${esc(d.rival)}" maxlength="40" placeholder="CB Rival" /></div>
        <div class="st-field st-grow"><label for="d-comp">Competición</label><input id="d-comp" data-d="competicion" value="${esc(d.competicion)}" maxlength="80" placeholder="Liga, copa, amistoso…" /></div>
      </div>
      <div class="st-form-row">
        <div class="st-field"><label for="d-pf">Puntos de tu equipo</label><input id="d-pf" type="number" min="0" inputmode="numeric" data-d="pf" value="${esc(d.pf)}" placeholder="auto" /></div>
        <div class="st-field"><label for="d-pc">Puntos del rival</label><input id="d-pc" type="number" min="0" inputmode="numeric" data-d="pc" value="${esc(d.pc)}" /></div>
        <p class="st-note st-grow" id="d-sum" style="align-self:end;margin:0"></p>
      </div>
      <div class="st-table-wrap"><table class="st-table st-draft">
        <thead><tr><th>Jugador</th><th>MIN</th><th>T2 c/i</th><th>T3 c/i</th><th>TL c/i</th><th>RO</th><th>RD</th><th>AST</th><th>ROB</th><th>TAP</th><th>PÉR</th><th>FAL</th></tr></thead>
        <tbody>${filas || `<tr><td colspan="12" class="st-empty">No hay jugadores. Añádelos a la plantilla primero.</td></tr>`}</tbody></table></div>
      <p id="d-err" class="st-error ${d.error ? "" : "hidden"}">${esc(d.error)}</p>
      <div class="st-actions">
        <button type="button" class="st-btn" data-act="guardar-partido">＋ Guardar partido</button>
        <button type="button" class="st-btn st-btn-ghost" data-act="cancelar-partido">Cancelar</button>
      </div>`;
    actualizarSuma();
  };

  const actualizarSuma = () => {
    const out = $q("#d-sum"); if (!out || !draft) return;
    const pts = draft.rows.filter((r) => r.asign !== "__skip").reduce((a, r) => a + calcLinea(r.l).pts, 0);
    out.textContent = `Suma de las líneas: ${pts} pts` + (draft.pf !== "" && Number(draft.pf) !== pts ? " (distinta del marcador: se guarda el marcador)" : "");
  };

  const guardarPartido = () => {
    const e = eq(); if (!e || !draft) return;
    const d = draft;
    const fail = (m: string) => { d.error = m; const el = $q("#d-err"); if (el) { el.textContent = m; el.classList.remove("hidden"); } };
    if (!/^\d{4}-\d{2}-\d{2}$/.test(d.fecha)) return fail("Pon la fecha del partido.");
    const usados = new Set<string>();
    for (const r of d.rows) {
      if (r.asign === "__skip" || !jugo(r.l)) continue;
      if (r.l.t2c > r.l.t2i || r.l.t3c > r.l.t3i || r.l.tlc > r.l.tli) return fail(`${r.nombre || "Jugador"}: los tiros metidos no pueden superar a los intentados.`);
      if (r.asign !== "__new") {
        if (usados.has(r.asign)) return fail("Dos filas están asignadas al mismo jugador de la plantilla.");
        usados.add(r.asign);
      }
    }
    const clave = `${d.fecha}|${d.rival.trim().toLowerCase()}`;
    const dup = e.partidos.find((p) => p.id !== d.editId && `${p.fecha}|${p.rival.trim().toLowerCase()}` === clave);
    if (dup && !confirm("Ya tienes un partido con ese rival y esa fecha. ¿Guardarlo igualmente?")) return;
    const lineas: PartidoEq["lineas"] = [];
    for (const r of d.rows) {
      if (r.asign === "__skip" || !jugo(r.l)) continue;
      let jid = r.asign;
      if (jid === "__new") {
        const ya = e.jugadores.find((j) => j.dorsal && j.dorsal === r.dorsal && j.nombre === r.nombre);
        if (ya) jid = ya.id;
        else { jid = uid(); e.jugadores.push({ id: jid, dorsal: r.dorsal.replace(/\D/g, "").slice(0, 3), nombre: (r.nombre || "Jugador").slice(0, 40) }); }
      }
      lineas.push({ jid, ...r.l });
    }
    if (!lineas.length) return fail("No hay ningún jugador con estadísticas. Rellena al menos una fila.");
    const num = (s: string) => (s === "" || !Number.isFinite(Number(s)) ? null : Math.max(0, Math.min(300, Math.trunc(Number(s)))));
    const p: PartidoEq = { id: d.editId ?? uid(), fecha: d.fecha, rival: d.rival.trim().slice(0, 40), competicion: d.competicion.trim().slice(0, 80), pf: num(d.pf), pc: num(d.pc), lineas };
    const i = e.partidos.findIndex((x) => x.id === d.editId);
    if (i >= 0) e.partidos[i] = p; else e.partidos.push(p);
    guardar(); draft = null; febData = null; febMsg = "";
    verId = p.id;
    aviso("Partido guardado");
    track("Team Game Saved");
    renderAll();
  };

  /** Borrador del partido con el equipo `i` del acta en `febData` como el nuestro. */
  const elegirEquipoActa = (e: Equipo, i: number) => {
    const own = febData.equipos[i], other = febData.equipos[1 - i];
    draft = nuevoBorrador(febOrigen, {
      fecha: febData.fecha || hoy(), rival: String(other.nombre || ""), competicion: String(febData.competicion || ""),
      pf: String(own.pts ?? ""), pc: String(other.pts ?? ""), rows: rowsImportadas(e, own.jugadores || []), avisos: febAvisos,
    });
    if (febOrigen === "feb") track("Team FEB Import");
    febData = null; febMsg = ""; febAvisos = []; renderAdd();
  };
  /** Si el nombre del equipo encaja SIN DUDA con uno de los dos del acta, no hace falta preguntar. */
  const equipoPropio = (e: Equipo) =>
    equipoDelRival({ equipos: febData.equipos.map((t: any) => ({ ...t, pts: t.pts ?? 0 })) } as ActaFeb, e.nombre);

  // FEB
  const febBuscar = async () => {
    const q = ($q<HTMLInputElement>("#eq-feb-q")?.value || "").trim();
    if (!q) { febData = null; febMsg = "Pega la URL del partido (o su ID numérico)."; renderAdd(); return; }
    febData = null; febMsg = "Leyendo el acta…"; febOrigen = "feb"; febAvisos = []; renderAdd();
    try {
      const r = await fetch(`/api/feb?partido=${encodeURIComponent(q)}`);
      const d = await r.json();
      if (!r.ok) { febMsg = esc(d.error || "No se pudo leer el acta."); }
      else if (!d.equipos || d.equipos.length !== 2) { febMsg = "El acta no tiene estadísticas todavía."; }
      else { febData = d; febMsg = `${esc(d.competicion)} · ${esc(fechaCorta(d.fecha))}<br/><strong>¿Cuál de los dos es tu equipo?</strong>`; }
      const e = eq();
      if (febData && e && equipoPropio(e) >= 0) { elegirEquipoActa(e, equipoPropio(e)); return; }
    } catch { febMsg = "No se pudo leer el acta. Comprueba la URL y reintenta."; }
    renderAdd();
    const inp = $q<HTMLInputElement>("#eq-feb-q"); if (inp) inp.value = q;
  };

  // ───────────────────────── vistas ─────────────────────────
  const tonoRes = (r: string) => (r === "V" ? '<span class="st-w">V</span>' : r === "D" ? '<span class="st-l">D</span>' : r === "E" ? "E" : "—");

  const tablaHtml = (e: Equipo, interactiva: boolean) => {
    const filas = ordenarTabla(tablaTemporada(e), sortCol, modo, sortDesc);
    const th = COLUMNAS.map(({ col, label }) => {
      const act = col === sortCol;
      const flecha = act ? (sortDesc ? " ▼" : " ▲") : "";
      return `<th class="${col === "nombre" ? "" : "st-num"}"${act ? ` aria-sort="${sortDesc ? "descending" : "ascending"}"` : ""}>${interactiva ? `<button type="button" class="st-sort${act ? " on" : ""}" data-act="sort" data-col="${col}">${label}${flecha}</button>` : label}</th>`;
    }).join("");
    const cel = (f: any, col: Col) => {
      if (col === "dorsal") return esc(f.dorsal || "");
      if (col === "nombre") return interactiva ? `<button type="button" class="st-linkbtn" data-act="ver-jugador" data-id="${esc(f.jid)}">${esc(f.nombre)}</button>` : esc(f.nombre);
      const v = valorColumna(f, col, modo) as number | null;
      if (col === "pj") return String(f.pj);
      if (col === "ts" || col === "efg") return v == null ? "—" : v.toFixed(0) + "%";
      return modo === "medias" ? f1(v) : f0(v);
    };
    const cuerpo = filas.map((f) => `<tr class="${f.pj ? "" : "st-dim"}">${COLUMNAS.map(({ col }) => `<td class="${col === "nombre" ? "st-sticky" : "st-num"}">${cel(f, col)}</td>`).join("")}</tr>`).join("");
    return `<div class="st-table-wrap"><table class="st-table st-season"><thead><tr>${th}</tr></thead><tbody>${cuerpo || `<tr><td colspan="13" class="st-empty">Sin jugadores.</td></tr>`}</tbody></table></div>`;
  };

  const boxHtml = (e: Equipo, p: PartidoEq) => {
    const ls = p.lineas.filter(jugo).map((l) => ({ l, j: e.jugadores.find((x) => x.id === l.jid), c: calcLinea(l) }))
      .filter((x) => x.j).sort((a, b) => (parseInt(a.j!.dorsal, 10) || 999) - (parseInt(b.j!.dorsal, 10) || 999));
    const fila = (n: string, d: string, l: Linea, c: ReturnType<typeof calcLinea>, cls = "") => `<tr class="${cls}">
      <td class="st-sticky">${d ? `<span class="st-dorsal">${esc(d)}</span> ` : ""}${esc(n)}</td><td class="st-num">${l.min}</td><td class="st-num"><strong>${c.pts}</strong></td>
      <td class="st-num">${l.t2c}/${l.t2i}</td><td class="st-num">${l.t3c}/${l.t3i}</td><td class="st-num">${l.tlc}/${l.tli}</td>
      <td class="st-num">${c.reb}</td><td class="st-num">${l.ast}</td><td class="st-num">${l.rob}</td><td class="st-num">${l.tap}</td><td class="st-num">${l.per}</td><td class="st-num">${l.fal}</td><td class="st-num"><strong>${c.val}</strong></td></tr>`;
    const tot = sumaLineas(ls.map((x) => x.l));
    return `<div class="st-table-wrap"><table class="st-table st-box"><thead><tr><th>Jugador</th><th class="st-num">MIN</th><th class="st-num">PTS</th><th class="st-num">T2</th><th class="st-num">T3</th><th class="st-num">TL</th><th class="st-num">REB</th><th class="st-num">AST</th><th class="st-num">ROB</th><th class="st-num">TAP</th><th class="st-num">PÉR</th><th class="st-num">FAL</th><th class="st-num">VAL</th></tr></thead>
      <tbody>${ls.map((x) => fila(x.j!.nombre, x.j!.dorsal, x.l, x.c)).join("")}${fila("Equipo", "", tot, calcLinea(tot), "st-total")}</tbody></table></div>`;
  };

  const marcadorHtml = (p: PartidoEq) => {
    const r = resultado(p);
    return `<strong>${puntosPropios(p)}${p.pc == null ? "" : "–" + p.pc}</strong> ${r && r !== "E" ? tonoRes(r) : ""}`;
  };

  const chartSvg = (e: Equipo): string => {
    const serie = serieMarcadores(e);
    const wrap = $q("#eq-chart-wrap");
    const W = Math.max(300, Math.round(wrap?.clientWidth || 640)), H = 230;
    const padL = 34, padR = 14, padT = 14, padB = 26;
    const iw = W - padL - padR, ih = H - padT - padB;
    const vals = serie.flatMap((s) => (s.pc == null ? [s.pf] : [s.pf, s.pc]));
    const hi = Math.max(10, ...vals) * 1.08;
    const x = (i: number) => padL + (serie.length === 1 ? iw / 2 : (i / (serie.length - 1)) * iw);
    const y = (v: number) => padT + ih - (v / hi) * ih;
    let g = "";
    for (let t = 0; t <= 4; t++) {
      const v = (hi * t) / 4, yy = y(v);
      g += `<line class="eq-grid" x1="${padL}" x2="${W - padR}" y1="${yy}" y2="${yy}"/><text class="eq-axis" x="${padL - 6}" y="${yy + 3}" text-anchor="end">${Math.round(v)}</text>`;
    }
    const linea = (get: (s: (typeof serie)[number]) => number | null, cls: string) => {
      const pts = serie.map((s, i) => ({ i, v: get(s), s })).filter((p) => p.v != null) as { i: number; v: number; s: (typeof serie)[number] }[];
      const d = pts.map((p, k) => `${k ? "L" : "M"}${x(p.i).toFixed(1)},${y(p.v).toFixed(1)}`).join(" ");
      return `<path class="${cls}" d="${d}" fill="none"/>` + pts.map((p) => `<circle class="${cls}-dot" cx="${x(p.i).toFixed(1)}" cy="${y(p.v).toFixed(1)}" r="4"><title>${esc(fechaCorta(p.s.fecha))} vs ${esc(p.s.rival || "rival")}: ${p.v}</title></circle>`).join("");
    };
    const step = Math.max(1, Math.ceil(serie.length / 8));
    const xl = serie.map((_s, i) => (i % step === 0 || i === serie.length - 1 ? `<text class="eq-axis" x="${x(i)}" y="${H - 8}" text-anchor="middle">J${i + 1}</text>` : "")).join("");
    return `<svg viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Puntos a favor y en contra por partido">${g}${linea((s) => s.pc, "eq-line-pc")}${linea((s) => s.pf, "eq-line-pf")}${xl}</svg>`;
  };
  const renderChart = () => {
    const e = eq(); const w = $q("#eq-chart-wrap"); if (!e || !w || tabs.equipo?.classList.contains("hidden")) return;
    if (e.partidos.length < 2) { w.innerHTML = '<p class="st-empty">Registra al menos 2 partidos para ver la evolución.</p>'; return; }
    w.innerHTML = chartSvg(e);
  };
  let rz = 0;
  window.addEventListener("resize", () => { cancelAnimationFrame(rz); rz = requestAnimationFrame(renderChart); });

  const renderViews = () => {
    const e = eq();
    if (!e || creando) { elViews.innerHTML = ""; return; }
    if (!e.partidos.length) {
      elViews.innerHTML = `<div class="st-panel"><h2 class="st-h2">Temporada</h2><p class="st-empty">Todavía no hay partidos. Importa un acta FEB, pega una tabla o apúntalo a mano arriba.</p></div>`;
      return;
    }
    const b = balance(e);
    const filas = tablaTemporada(e);
    const lid = lideres(filas);
    const ldHtml = (titulo: string, arr: { nombre: string; dorsal: string; valor: number }[], fmt: (v: number) => string) =>
      `<div class="st-lider"><span class="st-lider-t">${titulo}</span>${arr.length ? `<strong>${fmt(arr[0].valor)}</strong><span class="st-lider-n">${arr[0].dorsal ? esc(arr[0].dorsal) + " · " : ""}${esc(arr[0].nombre)}</span>
        <ol>${arr.slice(1).map((l) => `<li>${esc(l.nombre)} <em>${fmt(l.valor)}</em></li>`).join("")}</ol>` : '<span class="st-lider-n">Sin datos suficientes</span>'}</div>`;
    const lista = partidosOrdenados(e).slice().reverse().map((p) => `<tr class="${p.id === verId ? "st-sel" : ""}">
        <td>${esc(fechaCorta(p.fecha))}</td><td class="st-sticky">${esc(p.rival || "—")}</td><td class="st-num">${marcadorHtml(p)}</td>
        <td class="st-acts"><button type="button" class="st-linkbtn" data-act="ver-partido" data-id="${esc(p.id)}">Ver</button>
          <button type="button" class="st-linkbtn" data-act="edit-partido" data-id="${esc(p.id)}">Editar</button>
          <button type="button" class="st-del" data-act="del-partido" data-id="${esc(p.id)}" aria-label="Borrar partido" title="Borrar">✕</button></td></tr>`).join("");
    const pv = verId ? e.partidos.find((p) => p.id === verId) : undefined;
    const box = pv ? `
      <div class="st-panel" id="eq-box">
        <div class="st-eq-head"><h2 class="st-h2">${esc(e.nombre)} ${marcadorHtml(pv)} ${esc(pv.rival || "rival")}</h2>
          <button type="button" class="st-del" data-act="cerrar-partido" aria-label="Cerrar">✕</button></div>
        <p class="st-note" style="margin-top:0">${esc(fechaCorta(pv.fecha))}${pv.competicion ? " · " + esc(pv.competicion) : ""}</p>
        ${boxHtml(e, pv)}
        <div class="st-actions st-actions-wrap">
          <button type="button" class="st-btn" data-act="card-partido" data-id="${esc(pv.id)}">📸 Tarjeta PNG</button>
          <button type="button" class="st-btn st-btn-ghost" data-act="txt-partido" data-id="${esc(pv.id)}">📋 Copiar como texto</button>
          <button type="button" class="st-btn st-btn-ghost" data-act="share-partido" data-id="${esc(pv.id)}">🔗 Enlace del partido</button>
        </div>
      </div>` : "";
    const jf = jugadorId ? filas.find((f) => f.jid === jugadorId) : undefined;
    const ficha = jf ? (() => {
      const ps = partidosDeJugador(e, jf.jid);
      const rows = partidosOrdenados(e).map((p) => ({ p, l: p.lineas.find((l) => l.jid === jf.jid) })).filter((x) => x.l && jugo(x.l!)).map(({ p, l }) => {
        const c = calcLinea(l!);
        return `<tr><td>${esc(fechaCorta(p.fecha))}</td><td class="st-sticky">${esc(p.rival || "—")}</td><td class="st-num">${tonoRes(resultado(p))}</td><td class="st-num">${l!.min}</td><td class="st-num"><strong>${c.pts}</strong></td><td class="st-num">${c.reb}</td><td class="st-num">${l!.ast}</td><td class="st-num">${c.ts == null ? "—" : c.ts.toFixed(0) + "%"}</td><td class="st-num">${c.val}</td></tr>`;
      }).join("");
      return `<div class="st-panel" id="eq-ficha">
        <div class="st-eq-head"><h2 class="st-h2">${jf.dorsal ? esc(jf.dorsal) + " · " : ""}${esc(jf.nombre)}</h2><button type="button" class="st-del" data-act="cerrar-jugador" aria-label="Cerrar">✕</button></div>
        <p class="st-note" style="margin-top:0">${jf.pj} partidos · ${f1(jf.pj ? jf.pts / jf.pj : null)} pts · ${f1(jf.pj ? jf.reb / jf.pj : null)} reb · ${f1(jf.pj ? jf.ast / jf.pj : null)} ast · VAL ${f1(jf.pj ? jf.val / jf.pj : null)}</p>
        <div class="st-table-wrap"><table class="st-table"><thead><tr><th>Fecha</th><th>Rival</th><th class="st-num">Res</th><th class="st-num">MIN</th><th class="st-num">PTS</th><th class="st-num">REB</th><th class="st-num">AST</th><th class="st-num">TS%</th><th class="st-num">VAL</th></tr></thead><tbody>${rows}</tbody></table></div>
        <div class="st-actions st-actions-wrap">
          <button type="button" class="st-btn" data-act="enviar-jugador" data-id="${esc(jf.jid)}"${ps.length ? "" : " disabled"}>📤 Enviar a este jugador</button>
        </div>
        <p class="st-note">Genera un enlace con solo <strong>sus</strong> ${ps.length} partido${ps.length === 1 ? "" : "s"}. Al abrirlo, los verá y podrá añadirlos a su modo Jugador.</p>
      </div>`;
    })() : "";

    elViews.innerHTML = `
      <div class="st-panel">
        <h2 class="st-h2">Temporada <span class="st-h2-tag">${e.partidos.length} partido${e.partidos.length === 1 ? "" : "s"}</span></h2>
        <div class="st-tiles st-tiles-4">
          <div class="st-tile"><strong>${b.conMarcador ? `${b.v}-${b.d}${b.e ? "-" + b.e : ""}` : "—"}</strong><span>balance V-D</span></div>
          <div class="st-tile"><strong>${f1(b.pfpg)}</strong><span>puntos a favor / partido</span></div>
          <div class="st-tile"><strong>${f1(b.pcpg)}</strong><span>puntos en contra / partido</span></div>
          <div class="st-tile"><strong>${b.dif == null ? "—" : (b.dif > 0 ? "+" : "") + b.dif.toFixed(1)}</strong><span>diferencia media</span></div>
        </div>
        <div class="st-legend"><span><i class="eq-sw eq-sw-pf"></i> A favor</span><span><i class="eq-sw eq-sw-pc"></i> En contra</span></div>
        <div id="eq-chart-wrap" class="st-chart-wrap"></div>
        ${b.conMarcador < e.partidos.length ? `<p class="st-note">${e.partidos.length - b.conMarcador} partido(s) sin marcador del rival no cuentan en el balance.</p>` : ""}
        <div class="st-actions st-actions-wrap">
          <button type="button" class="st-btn" data-act="card-temporada">📸 Tarjeta de la temporada</button>
          <button type="button" class="st-btn st-btn-ghost" data-act="share-equipo">🔗 Enlace del equipo</button>
        </div>
      </div>
      <div class="st-panel">
        <h2 class="st-h2">Partidos</h2>
        <div class="st-table-wrap"><table class="st-table"><thead><tr><th>Fecha</th><th>Rival</th><th class="st-num">Marcador</th><th></th></tr></thead><tbody>${lista}</tbody></table></div>
      </div>
      ${box}
      <div class="st-panel">
        <div class="st-eq-head">
          <h2 class="st-h2">Por jugador</h2>
          <div class="st-metric-tabs" role="group" aria-label="Medias o totales">
            <button type="button" class="st-mtab${modo === "medias" ? " active" : ""}" data-act="modo" data-m="medias" aria-pressed="${modo === "medias"}">Medias</button>
            <button type="button" class="st-mtab${modo === "totales" ? " active" : ""}" data-act="modo" data-m="totales" aria-pressed="${modo === "totales"}">Totales</button>
          </div>
        </div>
        ${tablaHtml(e, true)}
        <p class="st-note">${modo === "medias" ? "Medias por partido jugado." : "Totales de la temporada."} Toca una cabecera para ordenar y un nombre para ver su ficha. <strong>VAL</strong> = valoración estilo FIBA.</p>
        <div class="st-actions"><button type="button" class="st-btn st-btn-ghost" data-act="csv">⬇ Exportar tabla (.csv)</button></div>
      </div>
      <div class="st-panel">
        <h2 class="st-h2">Líderes del equipo</h2>
        <div class="st-liders">
          ${ldHtml("Puntos", lid.pts, f1)}${ldHtml("Rebotes", lid.reb, f1)}${ldHtml("Asistencias", lid.ast, f1)}${ldHtml("Valoración", lid.val, f1)}
          ${ldHtml("TS%", lid.ts, (v) => v.toFixed(1) + "%")}
        </div>
        <p class="st-note">Medias por partido jugado. El TS% exige un mínimo de tiros (${lid.minTsa} posesiones de tiro en la temporada) para que un 1/1 no sea líder.</p>
      </div>
      ${ficha}`;
    renderChart();
  };

  const renderAll = () => { renderTeam(); renderAdd(); renderViews(); };

  // ───────────────────────── diálogo ─────────────────────────
  const abrirDialogo = (titulo: string, html: string) => {
    dlgTitle.textContent = titulo; dlgBody.innerHTML = html;
    if (!dlg.open) { try { dlg.showModal(); } catch { dlg.setAttribute("open", ""); } }
  };
  const cerrarDialogo = () => {
    if (dlg.open) { try { dlg.close(); } catch { dlg.removeAttribute("open"); } }
  };
  dlg.addEventListener("close", () => { if (cardUrl) { URL.revokeObjectURL(cardUrl); cardUrl = ""; } });
  document.getElementById("eq-dialog-close")?.addEventListener("click", cerrarDialogo);
  dlg.addEventListener("click", (ev) => { if (ev.target === dlg) cerrarDialogo(); });

  /** Genera el enlace y lo enseña. El hash no viaja nunca al servidor. */
  const mostrarEnlace = async (titulo: string, payload: Payload, fichero: { nombre: string; json: unknown }, que: string) => {
    abrirDialogo(titulo, '<p class="st-empty">Generando enlace…</p>');
    const token = await codificarEnlace(payload);
    const url = urlEnlace(location.origin + location.pathname, token);
    shareUrl = url; shareFile = fichero; shareTxt = que;
    const largo = url.length > LIMITE_ENLACE;
    abrirDialogo(titulo, `
      <p class="st-note" style="margin-top:0">${esc(que)}</p>
      ${largo ? `<p class="st-error">⚠ Este enlace mide ${url.length.toLocaleString("es")} caracteres: muchas apps de mensajería lo cortan y no funcionará. Mejor pasa el <strong>archivo</strong> (WhatsApp, correo, Drive…) o comparte un solo partido.</p>` : ""}
      <div class="st-field"><label for="eq-url">Enlace (${url.length.toLocaleString("es")} caracteres)</label><textarea id="eq-url" class="st-paste-area" rows="3" readonly>${esc(url)}</textarea></div>
      <div class="st-actions st-actions-wrap">
        <button type="button" class="st-btn" data-act="copiar-url">📋 Copiar enlace</button>
        ${typeof navigator.share === "function" ? '<button type="button" class="st-btn st-btn-ghost" data-act="share-url">📤 Compartir…</button>' : ""}
        <button type="button" class="st-btn ${largo ? "" : "st-btn-ghost"}" data-act="dl-fichero">⬇ Descargar archivo (.json)</button>
      </div>
      <p class="st-note">🔒 Los datos van <em>dentro</em> del enlace, después del #: el navegador no lo envía a ningún servidor.</p>`);
    (document.getElementById("eq-url") as HTMLTextAreaElement | null)?.addEventListener("focus", (ev) => (ev.target as HTMLTextAreaElement).select());
    track("Team Link Created");
  };

  // ───────────────────────── tarjetas PNG ─────────────────────────
  const BC = "'Barlow Condensed', sans-serif", IN = "'Inter', sans-serif";
  const lienzo = async (h: number) => {
    try { await Promise.all([document.fonts.load(`900 60px ${BC}`), document.fonts.load(`700 28px ${IN}`), document.fonts.load(`600 28px ${IN}`)]); } catch { /* fuentes del sistema */ }
    const cv = document.createElement("canvas"); cv.width = 1080; cv.height = h;
    const ctx = cv.getContext("2d") as CanvasRenderingContext2D;
    ctx.fillStyle = "#232327"; ctx.fillRect(0, 0, 1080, h);
    ctx.fillStyle = "#2b2b30"; ctx.fillRect(0, 0, 1080, 8);
    ctx.fillStyle = "#f97316"; ctx.fillRect(0, 0, 360, 8);
    ctx.textBaseline = "alphabetic"; ctx.textAlign = "left"; ctx.font = `900 58px ${BC}`;
    let x = 76; const y = 128;
    ctx.fillStyle = "#fff"; ctx.fillText("CANCHA", x, y); x += ctx.measureText("CANCHA").width;
    ctx.fillStyle = "#f97316"; ctx.fillText(".", x, y); x += ctx.measureText(".").width;
    ctx.fillStyle = "#fff"; ctx.fillText("ZAPA", x, y);
    ctx.textAlign = "center"; ctx.fillStyle = "#f97316"; ctx.font = `800 30px ${IN}`;
    ctx.fillText("canchazapa.com/estadisticas", 540, h - 54);
    ctx.textAlign = "left";
    return { cv, ctx };
  };
  const ajustar = (ctx: CanvasRenderingContext2D, t: string, max: number) => {
    if (ctx.measureText(t).width <= max) return t;
    while (t.length > 1 && ctx.measureText(t + "…").width > max) t = t.slice(0, -1);
    return t + "…";
  };
  const aBlob = (cv: HTMLCanvasElement) => new Promise<Blob>((res, rej) => cv.toBlob((b) => (b ? res(b) : rej(new Error("png"))), "image/png"));

  const cardPartido = async (e: Equipo, p: PartidoEq) => {
    const { cv, ctx } = await lienzo(1350);
    const r = resultado(p);
    const col = r === "V" ? "#22c55e" : r === "D" ? "#ef4444" : "#facc15";
    ctx.fillStyle = "#f97316"; ctx.font = `700 27px ${IN}`;
    ctx.fillText("★ RESULTADO", 76, 214);
    ctx.fillStyle = "#a1a1aa"; ctx.font = `600 28px ${IN}`; ctx.textAlign = "right";
    ctx.fillText([fechaCorta(p.fecha), e.categoria].filter(Boolean).join(" · "), 1004, 214); ctx.textAlign = "left";
    ctx.fillStyle = "#fff"; ctx.font = `900 74px ${BC}`;
    ctx.fillText(ajustar(ctx, e.nombre.toUpperCase(), 928), 76, 300);
    ctx.fillStyle = "#a1a1aa"; ctx.font = `700 40px ${BC}`;
    ctx.fillText(ajustar(ctx, ("VS " + (p.rival || "RIVAL")).toUpperCase(), 928), 76, 352);
    // marcador
    ctx.fillStyle = "#2c2c31"; ctx.fillRect(76, 392, 928, 330);
    ctx.fillStyle = col; ctx.fillRect(76, 392, 8, 330);
    ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.font = `900 230px ${BC}`;
    ctx.fillText(p.pc == null ? String(puntosPropios(p)) : `${puntosPropios(p)} – ${p.pc}`, 540, 612);
    ctx.fillStyle = col; ctx.font = `800 34px ${IN}`;
    ctx.fillText(r === "V" ? "VICTORIA" : r === "D" ? "DERROTA" : r === "E" ? "EMPATE" : (p.competicion || "PARTIDO").toUpperCase().slice(0, 30), 540, 684);
    ctx.textAlign = "left";
    // mejores
    ctx.fillStyle = "#f97316"; ctx.font = `700 27px ${IN}`; ctx.fillText("★ LOS MEJORES", 76, 802);
    const mejores = mejoresDelPartido(e, p, 3);
    mejores.forEach((m, i) => {
      const ty = 832 + i * 140;
      ctx.fillStyle = "#2c2c31"; ctx.fillRect(76, ty, 928, 120);
      ctx.fillStyle = "#facc15"; ctx.fillRect(76, ty, 6, 120);
      ctx.fillStyle = "#facc15"; ctx.font = `900 56px ${BC}`; ctx.fillText(String(i + 1), 104, ty + 80);
      ctx.fillStyle = "#fff"; ctx.font = `900 50px ${BC}`;
      ctx.fillText(ajustar(ctx, ((m.dorsal ? "#" + m.dorsal + " " : "") + m.nombre).toUpperCase(), 520), 168, ty + 58);
      ctx.fillStyle = "#a1a1aa"; ctx.font = `700 24px ${IN}`; ctx.fillText(`${m.reb} REB · ${m.ast} AST · VAL ${m.val}`, 168, ty + 98);
      ctx.textAlign = "right"; ctx.fillStyle = "#fff"; ctx.font = `900 84px ${BC}`; ctx.fillText(String(m.pts), 940, ty + 88);
      ctx.fillStyle = "#a1a1aa"; ctx.font = `700 22px ${IN}`; ctx.fillText("PTS", 990, ty + 88); ctx.textAlign = "left";
    });
    return aBlob(cv);
  };

  const cardTemporada = async (e: Equipo) => {
    const { cv, ctx } = await lienzo(1350);
    const b = balance(e);
    const lid = lideres(tablaTemporada(e), { top: 1 });
    ctx.fillStyle = "#f97316"; ctx.font = `700 27px ${IN}`; ctx.fillText("★ TEMPORADA", 76, 214);
    ctx.fillStyle = "#fff"; ctx.font = `900 84px ${BC}`;
    ctx.fillText(ajustar(ctx, e.nombre.toUpperCase(), 928), 76, 300);
    ctx.fillStyle = "#a1a1aa"; ctx.font = `600 30px ${IN}`;
    ctx.fillText(`${e.categoria ? e.categoria + " · " : ""}${e.partidos.length} partido${e.partidos.length === 1 ? "" : "s"}`, 76, 346);
    // balance
    ctx.fillStyle = "#2c2c31"; ctx.fillRect(76, 384, 928, 230);
    ctx.fillStyle = "#f97316"; ctx.fillRect(76, 384, 6, 230);
    ctx.textAlign = "center"; ctx.fillStyle = "#fff"; ctx.font = `900 170px ${BC}`;
    ctx.fillText(b.conMarcador ? `${b.v} – ${b.d}` : "—", 540, 555);
    ctx.fillStyle = "#a1a1aa"; ctx.font = `700 26px ${IN}`; ctx.fillText("VICTORIAS – DERROTAS", 540, 596);
    // 3 tiles
    const sw = (928 - 44) / 3;
    [[f1(b.pfpg), "PTS A FAVOR"], [f1(b.pcpg), "PTS EN CONTRA"], [b.dif == null ? "—" : (b.dif > 0 ? "+" : "") + b.dif.toFixed(1), "DIFERENCIA"]].forEach((t, i) => {
      const tx = 76 + i * (sw + 22);
      ctx.fillStyle = "#2c2c31"; ctx.fillRect(tx, 640, sw, 150);
      ctx.fillStyle = "#facc15"; ctx.font = `900 72px ${BC}`; ctx.fillText(t[0], tx + sw / 2, 722);
      ctx.fillStyle = "#a1a1aa"; ctx.font = `700 20px ${IN}`; ctx.fillText(t[1], tx + sw / 2, 764);
    });
    ctx.textAlign = "left";
    // líderes
    ctx.fillStyle = "#f97316"; ctx.font = `700 27px ${IN}`; ctx.fillText("★ LÍDERES (MEDIAS)", 76, 850);
    const filas: [string, { nombre: string; valor: number }[]][] = [["PUNTOS", lid.pts], ["REBOTES", lid.reb], ["ASISTENCIAS", lid.ast], ["VALORACIÓN", lid.val]];
    filas.forEach(([t, arr], i) => {
      const ty = 872 + i * 100;
      ctx.fillStyle = "#2c2c31"; ctx.fillRect(76, ty, 928, 86);
      ctx.fillStyle = "#a1a1aa"; ctx.font = `700 22px ${IN}`; ctx.fillText(t, 104, ty + 52);
      ctx.fillStyle = "#fff"; ctx.font = `900 46px ${BC}`;
      ctx.fillText(arr[0] ? ajustar(ctx, arr[0].nombre.toUpperCase(), 470) : "—", 330, ty + 58);
      ctx.textAlign = "right"; ctx.fillStyle = "#facc15"; ctx.font = `900 62px ${BC}`; ctx.fillText(arr[0] ? f1(arr[0].valor) : "—", 976, ty + 62); ctx.textAlign = "left";
    });
    return aBlob(cv);
  };

  const mostrarTarjeta = async (titulo: string, hacer: () => Promise<Blob>, nombre: string, texto: string) => {
    abrirDialogo(titulo, '<p class="st-empty">Dibujando la tarjeta…</p>');
    try {
      cardBlob = await hacer(); cardName = nombre; shareTxt = texto;
      if (cardUrl) URL.revokeObjectURL(cardUrl);
      cardUrl = URL.createObjectURL(cardBlob);
      abrirDialogo(titulo, `
        <img class="st-card-prev" src="${cardUrl}" alt="Tarjeta para compartir" />
        <div class="st-actions st-actions-wrap">
          <button type="button" class="st-btn" data-act="card-share">📤 Compartir</button>
          <button type="button" class="st-btn st-btn-ghost" data-act="card-dl">⬇ Descargar PNG</button>
        </div>`);
    } catch { abrirDialogo(titulo, '<p class="st-error">No se pudo generar la imagen en este navegador.</p>'); }
  };

  const descargarTarjeta = () => {
    if (!cardBlob) return;
    const a = document.createElement("a"); a.href = cardUrl || URL.createObjectURL(cardBlob); a.download = cardName; a.click();
    track("Team Card Download");
  };
  const compartirTarjeta = async () => {
    if (!cardBlob) return;
    const file = new File([cardBlob], cardName, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try { await navigator.share({ files: [file], text: shareTxt }); track("Team Card Share"); return; } catch (err) { if ((err as Error)?.name === "AbortError") return; }
    }
    descargarTarjeta();
  };

  // ───────────────────────── enlace recibido / archivo ─────────────────────────
  const limpiarHash = () => { try { history.replaceState(null, "", location.pathname + location.search); } catch { /* no-op */ } };
  const cerrarEntrante = () => { entrante = null; incoming.classList.add("hidden"); incoming.innerHTML = ""; limpiarHash(); };

  const mostrarEntrante = (p: Payload) => {
    entrante = p;
    incoming.classList.remove("hidden");
    if (p.k === "jugador") {
      setTab("jugador", false);
      const mios = host.getJugador().partidos;
      const claves = new Set(mios.map((g) => g.fecha + "|" + g.rival.trim().toLowerCase()));
      const rows = p.partidos.map((g) => {
        const c = calcLinea(g);
        const dup = claves.has(g.fecha + "|" + g.rival.trim().toLowerCase());
        return `<tr class="${dup ? "st-dim" : ""}"><td>${esc(fechaCorta(g.fecha))}</td><td class="st-sticky">${esc(g.rival || "—")}</td><td class="st-num">${tonoRes(g.res)}</td><td class="st-num">${g.min}</td><td class="st-num"><strong>${c.pts}</strong></td><td class="st-num">${c.reb}</td><td class="st-num">${g.ast}</td><td class="st-num">${c.val}</td><td>${dup ? "ya lo tienes" : ""}</td></tr>`;
      }).join("");
      incoming.innerHTML = `
        <h2 class="st-h2">📥 Te han enviado ${p.partidos.length} partido${p.partidos.length === 1 ? "" : "s"}${p.nombre ? " de " + esc(p.nombre) : ""}</h2>
        <p class="st-note" style="margin-top:0">Vista previa de solo lectura. No se guarda nada hasta que lo confirmes.</p>
        <div class="st-table-wrap"><table class="st-table"><thead><tr><th>Fecha</th><th>Rival</th><th class="st-num">Res</th><th class="st-num">MIN</th><th class="st-num">PTS</th><th class="st-num">REB</th><th class="st-num">AST</th><th class="st-num">VAL</th><th></th></tr></thead><tbody>${rows}</tbody></table></div>
        <div class="st-actions st-actions-wrap">
          <button type="button" class="st-btn" data-act="in-jugador">＋ Añadir a mis partidos</button>
          <button type="button" class="st-btn st-btn-ghost" data-act="in-descartar">Descartar</button>
        </div>
        <p class="st-note">Los partidos que ya tengas con la misma fecha y rival no se duplican.</p>`;
    } else {
      setTab("equipo", false);
      const e = p.equipo;
      const una = p.k === "partido" && e.partidos[0];
      const b = balance(e);
      incoming.innerHTML = `
        <h2 class="st-h2">📥 ${una ? "Te han compartido un partido" : "Te han compartido un equipo"}: ${esc(e.nombre)}${e.categoria ? " · " + esc(e.categoria) : ""}</h2>
        <p class="st-note" style="margin-top:0">Vista previa de solo lectura · ${e.jugadores.length} jugadores · ${e.partidos.length} partido${e.partidos.length === 1 ? "" : "s"}${b.conMarcador ? ` · balance ${b.v}-${b.d}` : ""}. No se guarda nada hasta que lo confirmes.</p>
        ${una ? `<p class="st-note"><strong>${esc(e.nombre)} ${puntosPropios(una)}${una.pc == null ? "" : "–" + una.pc} ${esc(una.rival || "rival")}</strong> · ${esc(fechaCorta(una.fecha))}</p>${boxHtml(e, una)}`
          : `${tablaHtml(e, false)}<div class="st-table-wrap"><table class="st-table"><thead><tr><th>Fecha</th><th>Rival</th><th class="st-num">Marcador</th></tr></thead><tbody>${partidosOrdenados(e).map((x) => `<tr><td>${esc(fechaCorta(x.fecha))}</td><td class="st-sticky">${esc(x.rival || "—")}</td><td class="st-num">${marcadorHtml(x)}</td></tr>`).join("")}</tbody></table></div>`}
        <div class="st-actions st-actions-wrap">
          <button type="button" class="st-btn" data-act="in-nuevo">＋ Guardar como equipo nuevo</button>
          ${store.equipos.length ? `<span class="st-merge">${store.equipos.length > 1 ? `<select id="in-destino" aria-label="Equipo con el que fusionar">${store.equipos.map((x) => `<option value="${esc(x.id)}"${x.id === store.activo ? " selected" : ""}>${esc(x.nombre)}</option>`).join("")}</select>` : ""}<button type="button" class="st-btn st-btn-ghost" data-act="in-fusionar">⇄ Fusionar con ${store.equipos.length > 1 ? "el elegido" : "mi equipo"}</button></span>` : ""}
          <button type="button" class="st-btn st-btn-ghost" data-act="in-descartar">Descartar</button>
        </div>
        <p class="st-note">Al fusionar se añaden solo los partidos nuevos (se deduplica por fecha y rival) y los jugadores se emparejan por dorsal o nombre.</p>`;
    }
    incoming.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const comprobarHash = async () => {
    const t = tokenDeHash(location.hash);
    if (!t) return;
    try {
      mostrarEntrante(await decodificarEnlace(t));
    } catch (err) {
      incoming.classList.remove("hidden");
      incoming.innerHTML = `<h2 class="st-h2">Enlace no válido</h2><p class="st-error">${esc((err as Error).message || "No se pudo leer el enlace.")} Puede haberse cortado al copiarlo (los enlaces muy largos fallan en algunas apps): pide que te pasen el archivo .json.</p>
        <div class="st-actions"><button type="button" class="st-btn st-btn-ghost" data-act="in-descartar">Cerrar</button></div>`;
    }
  };
  window.addEventListener("hashchange", comprobarHash);

  const aceptarEntrante = (como: "nuevo" | "fusionar") => {
    if (!entrante || entrante.k === "jugador") return;
    const inc = entrante.equipo;
    if (como === "nuevo") {
      inc.id = uid(); store.equipos.push(inc); store.activo = inc.id;
      aviso("Equipo guardado");
    } else {
      const destino = (document.getElementById("in-destino") as HTMLSelectElement | null)?.value || store.activo;
      const mio = store.equipos.find((x) => x.id === destino);
      if (!mio) return;
      const r = fusionar(mio, inc);
      store.equipos = store.equipos.map((x) => (x.id === mio.id ? r.equipo : x)); store.activo = mio.id;
      aviso(`Fusionado: ${r.partidosNuevos} partido(s) nuevos, ${r.duplicados} repetido(s), ${r.jugadoresNuevos} jugador(es) nuevos`);
    }
    guardar(); creando = false; draft = null; verId = null; jugadorId = null;
    cerrarEntrante(); setTab("equipo"); renderAll();
  };

  // ───────────────────────── eventos ─────────────────────────
  const porId = <T,>(arr: T[], id: string | undefined, get: (x: T) => string) => arr.find((x) => get(x) === id);

  const onClick = async (ev: Event) => {
    const btn = (ev.target as Element).closest<HTMLElement>("[data-act]");
    if (!btn) return;
    const act = btn.dataset.act, id = btn.dataset.id;
    const e = eq();
    switch (act) {
      case "nuevo-equipo": creando = true; draft = null; renderAll(); break;
      case "cancelar-equipo": creando = false; renderAll(); break;
      case "crear-equipo": {
        const n = ($q<HTMLInputElement>("#eq-new-nombre")?.value || "").trim();
        if (!n) { ($q<HTMLInputElement>("#eq-new-nombre"))?.focus(); aviso("Pon un nombre al equipo"); break; }
        const ne: Equipo = { id: uid(), nombre: n.slice(0, 40), categoria: ($q<HTMLInputElement>("#eq-new-cat")?.value || "").trim().slice(0, 30), jugadores: [], partidos: [] };
        store.equipos.push(ne); store.activo = ne.id; creando = false; draft = null; verId = null; jugadorId = null;
        guardar(); renderAll(); break;
      }
      case "del-equipo":
        if (e && confirm(`¿Borrar el equipo «${e.nombre}» con sus ${e.partidos.length} partidos? No se puede deshacer. (Exporta el .json antes si dudas.)`)) {
          store.equipos = store.equipos.filter((x) => x.id !== e.id); store.activo = store.equipos[0]?.id ?? "";
          draft = null; verId = null; jugadorId = null; guardar(); renderAll();
        }
        break;
      case "add-jug": {
        if (!e) break;
        const d = $q<HTMLInputElement>("#eq-new-d"), n = $q<HTMLInputElement>("#eq-new-n");
        const nombre = (n?.value || "").trim();
        if (!nombre) { n?.focus(); break; }
        e.jugadores.push({ id: uid(), dorsal: (d?.value || "").replace(/\D/g, "").slice(0, 3), nombre: nombre.slice(0, 40) });
        guardar(); renderTeam(); renderAdd(); renderViews(); $q<HTMLInputElement>("#eq-new-d")?.focus();
        break;
      }
      case "add-bulk": {
        if (!e) break;
        const lista = parsePlantilla($q<HTMLTextAreaElement>("#eq-bulk")?.value || "");
        if (!lista.length) { aviso("No encuentro jugadores en ese texto"); break; }
        lista.forEach((j) => e.jugadores.push({ id: uid(), dorsal: j.dorsal.slice(0, 3), nombre: j.nombre }));
        guardar(); renderAll(); aviso(`${lista.length} jugador(es) añadidos`);
        break;
      }
      case "del-jug": {
        const j = e && porId(e.jugadores, id, (x) => x.id);
        if (!e || !j) break;
        const n = e.partidos.filter((p) => p.lineas.some((l) => l.jid === j.id)).length;
        if (n && !confirm(`${j.nombre} tiene estadísticas en ${n} partido(s). Si lo quitas, se borran también. ¿Seguir?`)) break;
        e.jugadores = e.jugadores.filter((x) => x.id !== j.id);
        e.partidos.forEach((p) => { p.lineas = p.lineas.filter((l) => l.jid !== j.id); });
        if (jugadorId === j.id) jugadorId = null;
        guardar(); renderAll(); break;
      }
      case "manual":
        if (!e) break;
        draft = nuevoBorrador("manual", { rows: rowsDeJugadores(e, new Map()) }); renderAdd(); break;
      case "feb-buscar": await febBuscar(); break;
      case "feb-elegir": {
        if (!e || !febData) break;
        elegirEquipoActa(e, Number(btn.dataset.i));
        break;
      }
      case "guardar-partido": guardarPartido(); break;
      case "cancelar-partido": draft = null; renderAdd(); break;
      case "ver-partido": verId = id ?? null; renderViews(); $q("#eq-box")?.scrollIntoView({ behavior: "smooth", block: "start" }); break;
      case "cerrar-partido": verId = null; renderViews(); break;
      case "edit-partido": {
        const p = e && porId(e.partidos, id, (x) => x.id);
        if (!e || !p) break;
        const m = new Map(p.lineas.map((l) => [l.jid, l as Linea]));
        draft = nuevoBorrador("edicion", {
          editId: p.id, fecha: p.fecha, rival: p.rival, competicion: p.competicion,
          pf: p.pf == null ? "" : String(p.pf), pc: p.pc == null ? "" : String(p.pc), rows: rowsDeJugadores(e, m),
        });
        renderAdd(); elAdd.scrollIntoView({ behavior: "smooth", block: "start" }); break;
      }
      case "del-partido": {
        const p = e && porId(e.partidos, id, (x) => x.id);
        if (!e || !p || !confirm(`¿Borrar el partido vs ${p.rival || "rival"} (${fechaCorta(p.fecha)})?`)) break;
        e.partidos = e.partidos.filter((x) => x.id !== p.id);
        if (verId === p.id) verId = null;
        guardar(); renderViews(); break;
      }
      case "modo": modo = btn.dataset.m === "totales" ? "totales" : "medias"; renderViews(); break;
      case "sort": {
        const c = btn.dataset.col as Col;
        if (c === sortCol) sortDesc = !sortDesc; else { sortCol = c; sortDesc = c !== "nombre" && c !== "dorsal"; }
        renderViews(); break;
      }
      case "ver-jugador": jugadorId = id ?? null; renderViews(); $q("#eq-ficha")?.scrollIntoView({ behavior: "smooth", block: "start" }); break;
      case "cerrar-jugador": jugadorId = null; renderViews(); break;
      case "csv":
        if (e) { descargar(`temporada-${slug(e.nombre)}.csv`, "﻿" + csvTemporada(ordenarTabla(tablaTemporada(e), sortCol, modo, sortDesc), modo), "text/csv;charset=utf-8"); track("Team CSV"); }
        break;
      case "exp-equipo":
        if (e) descargar(`equipo-${slug(e.nombre)}.json`, JSON.stringify(archivoEquipo(e), null, 2), "application/json");
        break;
      case "copiar-txt": case "txt-partido": {
        const p = e && porId(e.partidos, id, (x) => x.id);
        if (e && p) aviso((await copiar(textoPartido(e, p))) ? "Resumen copiado: pégalo en tu grupo" : "No se pudo copiar");
        track("Team Text Copy"); break;
      }
      case "share-equipo":
        if (e) await mostrarEnlace("Enlace del equipo", { k: "equipo", equipo: e }, { nombre: `equipo-${slug(e.nombre)}.json`, json: archivoEquipo(e) },
          `Equipo completo: ${e.jugadores.length} jugadores y ${e.partidos.length} partidos. Quien lo abra verá una vista previa y decidirá si lo guarda.`);
        break;
      case "share-partido": {
        const p = e && porId(e.partidos, id, (x) => x.id);
        if (e && p) {
          const solo = equipoSoloPartido(e, p.id);
          await mostrarEnlace("Enlace del partido", { k: "partido", equipo: solo }, { nombre: `partido-${slug(e.nombre)}-${p.fecha}.json`, json: archivoEquipo(solo) },
            `Un solo partido (${e.nombre} vs ${p.rival || "rival"}, ${fechaCorta(p.fecha)}) con su box score.`);
        }
        break;
      }
      case "enviar-jugador": {
        const j = e && porId(e.jugadores, id, (x) => x.id);
        if (!e || !j) break;
        const ps = partidosDeJugador(e, j.id);
        await mostrarEnlace(`Enviar a ${j.nombre}`, { k: "jugador", nombre: j.nombre, partidos: ps },
          { nombre: `${slug(j.nombre)}-stats.json`, json: { perfil: { nombre: j.nombre, posicion: "alero" }, partidos: ps, metas: [] } },
          `Solo los ${ps.length} partidos de ${j.nombre}, en formato del modo Jugador. Al abrirlo los verá y los añadirá con un toque. (El archivo .json también se puede cargar con «Importar JSON» en su modo Jugador.)`);
        break;
      }
      case "copiar-url": aviso((await copiar(shareUrl)) ? "Enlace copiado" : "No se pudo copiar: selecciónalo a mano"); break;
      case "share-url":
        try { await navigator.share({ title: "CANCHA.ZAPA · Estadísticas", text: shareTxt.slice(0, 120), url: shareUrl }); } catch { /* cancelado */ }
        break;
      case "dl-fichero": if (shareFile) descargar(shareFile.nombre, JSON.stringify(shareFile.json, null, 2), "application/json"); break;
      case "card-partido": {
        const p = e && porId(e.partidos, id, (x) => x.id);
        if (e && p) await mostrarTarjeta("Tarjeta del partido", () => cardPartido(e, p), `${slug(e.nombre)}-${p.fecha}.png`, `${e.nombre} ${puntosPropios(p)}${p.pc == null ? "" : "–" + p.pc} ${p.rival} 🏀 canchazapa.com/estadisticas`);
        break;
      }
      case "card-temporada":
        if (e) await mostrarTarjeta("Tarjeta de la temporada", () => cardTemporada(e), `${slug(e.nombre)}-temporada.png`, `Temporada de ${e.nombre} 🏀 canchazapa.com/estadisticas`);
        break;
      case "card-share": await compartirTarjeta(); break;
      case "card-dl": descargarTarjeta(); break;
      case "in-nuevo": aceptarEntrante("nuevo"); break;
      case "in-fusionar": aceptarEntrante("fusionar"); break;
      case "in-descartar": cerrarEntrante(); break;
      case "in-jugador":
        if (entrante?.k === "jugador") {
          const r = host.importarJugador(entrante.nombre, entrante.partidos);
          aviso(`${r.añadidos} partido(s) añadidos${r.duplicados ? `, ${r.duplicados} ya los tenías` : ""}`);
          limpiarHash();
          incoming.innerHTML = `<h2 class="st-h2">✓ Importado</h2><p class="st-note" style="margin-top:0">Se han añadido ${r.añadidos} partido(s) a tu modo Jugador${r.duplicados ? ` (${r.duplicados} ya estaban)` : ""}. Baja para ver tus estadísticas.</p><div class="st-actions"><button type="button" class="st-btn st-btn-ghost" data-act="in-descartar">Cerrar</button></div>`;
          entrante = null; track("Player Link Import");
        }
        break;
    }
  };
  [root, dlg, incoming].forEach((c) => c.addEventListener("click", onClick));

  root.addEventListener("input", (ev) => {
    const t = ev.target as HTMLInputElement;
    if (!draft) return;
    if (t.dataset.r) {
      const r = draft.rows.find((x) => String(x.key) === t.dataset.r);
      if (r) { r.l[t.dataset.k as keyof Linea] = Math.max(0, Math.min(t.dataset.k === "min" ? 99 : 999, parseInt(t.value, 10) || 0)); actualizarSuma(); }
    } else if (t.dataset.d) {
      (draft as any)[t.dataset.d] = t.value;
      if (t.dataset.d === "pf") actualizarSuma();
    }
  });

  root.addEventListener("change", (ev) => {
    const t = ev.target as HTMLInputElement & HTMLSelectElement;
    const e = eq();
    if (t.dataset.sel === "equipo") { store.activo = t.value; draft = null; verId = null; jugadorId = null; guardar(); renderAll(); return; }
    if (t.dataset.asign && draft) {
      const r = draft.rows.find((x) => String(x.key) === t.dataset.asign); if (r) { r.asign = t.value; actualizarSuma(); }
      return;
    }
    if (t.dataset.f && e) { (e as any)[t.dataset.f] = t.value.trim().slice(0, t.dataset.f === "nombre" ? 40 : 30) || (t.dataset.f === "nombre" ? e.nombre : ""); guardar(); renderAdd(); renderViews(); return; }
    if (t.dataset.pj && e) {
      const j = e.jugadores.find((x) => x.id === t.dataset.pj); if (!j) return;
      if (t.dataset.k === "dorsal") j.dorsal = t.value.replace(/\D/g, "").slice(0, 3); else j.nombre = t.value.trim().slice(0, 40) || j.nombre;
      guardar(); renderAdd(); renderViews(); return;
    }
    if (t.id === "eq-file" && t.files?.[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const j = JSON.parse(String(reader.result));
          if (esArchivoCopia(j)) {
            const n = j.equipos.length;
            if (!confirm(`Esta copia de seguridad tiene ${n} equipo(s). ¿Restaurarla? Se añaden a los que ya tienes; si alguno ya existe aquí, se fusiona sin duplicar partidos.`)) return;
            const r = restaurarCopia(store, j);
            store = r.store; guardar(); creando = false; draft = null; verId = null; jugadorId = null; renderAll();
            aviso(`Copia restaurada: ${r.nuevos} equipo(s) nuevos, ${r.fusionados} fusionado(s)`);
          } else mostrarEntrante({ k: "equipo", equipo: leerArchivoEquipo(j) });
        } catch { alert("Ese archivo no parece una copia o un equipo exportado de CANCHA.ZAPA."); }
      };
      reader.readAsText(t.files[0]); t.value = "";
    }
  });

  root.addEventListener("keydown", (ev) => {
    const t = ev.target as HTMLElement;
    if (ev.key === "Enter" && (t.id === "eq-new-n" || t.id === "eq-new-d")) { ev.preventDefault(); $q<HTMLElement>('[data-act="add-jug"]')?.click(); }
    if (ev.key === "Enter" && t.id === "eq-feb-q") { ev.preventDefault(); $q<HTMLElement>('[data-act="feb-buscar"]')?.click(); }
    if (ev.key === "Enter" && t.id === "eq-new-nombre") { ev.preventDefault(); $q<HTMLElement>('[data-act="crear-equipo"]')?.click(); }
  });

  renderAll();
  comprobarHash();
}
