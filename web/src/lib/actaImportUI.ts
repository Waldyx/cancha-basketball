/**
 * Lector de actas — interfaz. Se monta sobre el recuadro de «pegar acta» que ya tiene cada página
 * (estadísticas jugador, estadísticas equipo, informe del rival) y le añade:
 *   · pegar una CAPTURA con Ctrl+V (o arrastrarla) en el mismo recuadro, o subir foto / PDF;
 *   · leerla EN EL NAVEGADOR (pdf.js / Tesseract, que se cargan solo al usarlos);
 *   · si el texto no se entiende sin ayuda, IA con los nombres cambiados por códigos;
 *   · y solo si eso falla y el entrenador lo acepta, la foto tal cual a la IA.
 * La lógica pura está en `actaIA.ts`.
 */
import { actaDeTexto, anonimizar, arreglarOcr, avisosActa, filasDeCajas, restaurarNombres, type ActaLeida, type CajaTexto } from "./actaIA";

// Versiones fijas (comprobadas el 22-oct-2026 en jsDelivr). Tesseract baja además su núcleo wasm
// y los idiomas de jsDelivr la primera vez (~4 MB); luego quedan en la caché del navegador.
const TESSERACT_URL = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
const PDFJS_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.min.mjs";
const PDFJS_WORKER_URL = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";

export type OrigenActa = "texto" | "ia" | "foto";

export interface OpcionesLector {
  textarea: HTMLTextAreaElement;
  boton: HTMLButtonElement;
  /** Mensaje de progreso o de error ("" lo borra). */
  estado: (msg: string, error?: boolean) => void;
  /** El acta leída, con los avisos de lo que no cuadra. */
  onActa: (acta: ActaLeida, avisos: string[], origen: OrigenActa) => void;
}

// ─── carga perezosa de librerías ───────────────────────────────────────────
const scripts = new Map<string, Promise<void>>();
function cargarScript(src: string): Promise<void> {
  let p = scripts.get(src);
  if (!p) {
    p = new Promise<void>((ok, ko) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      s.onload = () => ok();
      s.onerror = () => { scripts.delete(src); ko(new Error("No se pudo cargar el lector (¿sin conexión?).")); };
      document.head.append(s);
    });
    scripts.set(src, p);
  }
  return p;
}

// ─── imágenes ──────────────────────────────────────────────────────────────
/**
 * La imagen escalada a `k` y cortada en trozos verticales de `alto` px (ya escalados) que se solapan
 * `solape` px, para que ninguna fila se quede partida por la mitad en todos. Una captura con
 * desplazamiento del móvil mide 1080 × 6000-15000: entera, o se encoge hasta no leerse o no cabe.
 * `desde`/`hasta` marcan la franja que es «propia» de cada trozo (sin el solape).
 */
async function trozosDe(img: Blob, escala: (w: number, h: number) => number, alto: number, solape: number) {
  const bmp = await createImageBitmap(img);
  const k = escala(bmp.width, bmp.height);
  const W = Math.round(bmp.width * k);
  const H = Math.round(bmp.height * k);
  const out: { lienzo: HTMLCanvasElement; y0: number; desde: number; hasta: number }[] = [];
  for (let desde = 0; desde < H; desde += alto) {
    const hasta = Math.min(H, desde + alto);
    const y0 = Math.max(0, desde - solape);
    const y1 = Math.min(H, hasta + solape);
    const c = document.createElement("canvas");
    c.width = W;
    c.height = y1 - y0;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(bmp, 0, y0 / k, bmp.width, (y1 - y0) / k, 0, 0, W, y1 - y0);
    out.push({ lienzo: c, y0, desde, hasta });
  }
  bmp.close();
  return out;
}

/** Grises, invertida si la captura es de tema oscuro, y con el contraste estirado: Tesseract lee
 *  mucho mejor negro sobre blanco, y la web de la FCBQ pinta las cifras en gris muy claro. */
function prepararParaOcr(c: HTMLCanvasElement): HTMLCanvasElement {
  const ctx = c.getContext("2d")!;
  const im = ctx.getImageData(0, 0, c.width, c.height);
  const d = im.data;
  const n = d.length / 4;
  let suma = 0;
  for (let i = 0; i < d.length; i += 4) {
    const g = 0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2];
    d[i] = g;
    suma += g;
  }
  const invertir = suma / n < 110;
  const hist = new Array(256).fill(0);
  for (let i = 0; i < d.length; i += 4) {
    if (invertir) d[i] = 255 - d[i];
    hist[d[i] | 0]++;
  }
  // tinta = el 0,1 % más oscuro (la letra ocupa muy poco de una captura); fondo = el 50 % más
  // claro. Lo de en medio se estira a 0-255.
  let acum = 0, tinta = 0, fondo = 255;
  for (let v = 0; v < 256; v++) { acum += hist[v]; if (acum >= n * 0.001) { tinta = v; break; } }
  acum = 0;
  for (let v = 255; v >= 0; v--) { acum += hist[v]; if (acum >= n * 0.5) { fondo = v; break; } }
  fondo = Math.max(fondo - 8, tinta + 20);
  // con gamma 2 los bordes suavizados de los trazos finos (la barra de «4/7») no se pierden
  for (let i = 0; i < d.length; i += 4) {
    const t = Math.max(0, Math.min(1, (d[i] - tinta) / (fondo - tinta)));
    d[i] = d[i + 1] = d[i + 2] = 255 * t * t;
  }
  ctx.putImageData(im, 0, 0);
  return c;
}

async function ocr(img: Blob, progreso: (p: number) => void): Promise<string> {
  await cargarScript(TESSERACT_URL);
  const T = (window as any).Tesseract;
  // ×3 y gamma 2: medido el 22-oct con una tabla en gris claro de 15 px, la única combinación
  // que leyó todas las fracciones (a ×1,5 o ×2 se perdían «4/7» o «0/1»). Tope de 40 Mpx en
  // total para que una captura larga no ahogue al móvil.
  const trozos = await trozosDe(img, (w, h) => Math.min(3, 5000 / w, Math.sqrt(40e6 / (w * h))), 3000, 150);
  let hecho = 0;
  const worker = await T.createWorker(["spa", "cat"], 1, {
    logger: (m: any) => { if (m?.status === "recognizing text") progreso((hecho + (m.progress ?? 0)) / trozos.length); },
  });
  try {
    // 6 = un bloque de texto uniforme: conserva las filas de la tabla en vez de partirla en columnas
    await worker.setParameters({ tessedit_pageseg_mode: "6", preserve_interword_spaces: "1" });
    const cajas: CajaTexto[] = [];
    for (const t of trozos) {
      const { data } = await worker.recognize(prepararParaOcr(t.lienzo));
      for (const w of data.words ?? []) {
        const y = t.y0 + w.bbox.y0;
        const centro = y + (w.bbox.y1 - w.bbox.y0) / 2;
        // cada palabra la aporta solo el trozo en cuya franja propia cae (el solape no duplica)
        if (centro < t.desde || centro >= t.hasta) continue;
        cajas.push({ texto: String(w.text ?? ""), x: w.bbox.x0, y, ancho: w.bbox.x1 - w.bbox.x0, alto: w.bbox.y1 - w.bbox.y0 });
      }
      hecho++;
    }
    return arreglarOcr(filasDeCajas(cajas).trim());
  } finally {
    await worker.terminate();
  }
}

/** Texto de las 3 primeras páginas; si no hay (PDF escaneado), la primera página como imagen. */
async function leerPdf(file: Blob): Promise<{ texto: string; imagen: Blob | null }> {
  const url = PDFJS_URL;
  const pdfjs: any = await import(/* @vite-ignore */ url);
  pdfjs.GlobalWorkerOptions.workerSrc = PDFJS_WORKER_URL;
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const cajas: CajaTexto[] = [];
  let desplazamiento = 0;
  for (let p = 1; p <= Math.min(3, doc.numPages); p++) {
    const pag = await doc.getPage(p);
    const alto = pag.getViewport({ scale: 1 }).height;
    const tc = await pag.getTextContent();
    for (const it of tc.items as any[]) {
      const h = Math.abs(it.transform?.[3] ?? it.height ?? 0) || it.height || 0;
      cajas.push({ texto: String(it.str ?? ""), x: it.transform[4], y: desplazamiento + alto - it.transform[5] - h, ancho: it.width ?? 0, alto: h });
    }
    desplazamiento += alto + 50;
  }
  const texto = filasDeCajas(cajas);
  if (texto.replace(/\s/g, "").length >= 40) return { texto, imagen: null };
  const pag = await doc.getPage(1);
  const vp = pag.getViewport({ scale: 2 });
  const c = document.createElement("canvas");
  c.width = vp.width;
  c.height = vp.height;
  await pag.render({ canvasContext: c.getContext("2d")!, viewport: vp }).promise;
  const imagen = await new Promise<Blob | null>((ok) => c.toBlob(ok, "image/png"));
  return { texto: "", imagen };
}

// ─── IA ────────────────────────────────────────────────────────────────────
async function pedirIA(cuerpo: Record<string, string | string[]>): Promise<ActaLeida> {
  let r: Response;
  try {
    r = await fetch("/api/acta", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(cuerpo) });
  } catch {
    throw new Error("Sin conexión con la IA. Reinténtalo en un momento.");
  }
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.acta) throw new Error(d.error || "La IA no ha podido leer el acta.");
  return d.acta as ActaLeida;
}

// ─── estilos (una vez por página) ──────────────────────────────────────────
function estilos() {
  if (document.getElementById("acta-ia-css")) return;
  const s = document.createElement("style");
  s.id = "acta-ia-css";
  s.textContent = `
  .acta-x{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:6px 0;font:600 13px Inter,sans-serif;color:var(--cz-text-2,#aaa)}
  .acta-sube{display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:0 12px;border:1px dashed var(--cz-border,#444);cursor:pointer;color:var(--cz-text,#eee);font:800 12px Inter,sans-serif}
  .acta-sube:hover{border-color:#f97316}
  .acta-adj{display:inline-flex;align-items:center;gap:6px;color:var(--cz-text,#eee)}
  .acta-adj img{max-height:40px;max-width:80px;border:1px solid var(--cz-border,#444)}
  .acta-adj button,.acta-otra{background:none;border:0;color:var(--cz-accent-text,#f97316);font:800 12px Inter,sans-serif;cursor:pointer;padding:2px 4px}
  .acta-foto{margin:8px 0;padding:10px 12px;border:1px solid #f97316;display:flex;flex-direction:column;gap:8px;font:500 13px/1.4 Inter,sans-serif;color:var(--cz-text,#eee)}
  .acta-foto[hidden]{display:none}
  .acta-foto label{display:flex;gap:8px;align-items:flex-start}
  .acta-foto input{margin-top:3px;flex:none}
  .acta-foto button{align-self:flex-start;min-height:38px;padding:0 14px;background:#f97316;border:1px solid #f97316;color:#0c0c0c;font:900 12px Inter,sans-serif;letter-spacing:.06em;text-transform:uppercase;cursor:pointer}
  .acta-foto button:disabled{opacity:.45;cursor:not-allowed}
  .acta-drop{outline:2px dashed #f97316;outline-offset:2px}`;
  document.head.append(s);
}

// ─── montaje ───────────────────────────────────────────────────────────────
export function montarLectorActa(o: OpcionesLector): void {
  estilos();
  const { textarea, boton } = o;
  let adjunto: File | null = null;
  let miniatura = "";

  const fila = document.createElement("div");
  fila.className = "acta-x";
  fila.innerHTML = `<label class="acta-sube">📷 Subir captura, foto o PDF<input type="file" accept="image/*,application/pdf" hidden /></label>
    <span class="acta-adj" hidden></span>
    <span>o pega la captura aquí con Ctrl+V</span>`;
  const input = fila.querySelector("input")!;
  const adj = fila.querySelector<HTMLElement>(".acta-adj")!;

  const foto = document.createElement("div");
  foto.className = "acta-foto";
  foto.hidden = true;
  foto.innerHTML = `<p style="margin:0" data-msg></p>
    <label><input type="checkbox" /> <span>Entiendo que la imagen, <strong>con los nombres y las fotos que aparezcan</strong>, se envía a un modelo de IA gratuito (vía OpenRouter) solo para leerla. Aquí no se guarda, pero el proveedor del modelo podría conservarla.</span></label>
    <button type="button" disabled>Enviar la foto a la IA</button>`;
  const fotoMsg = foto.querySelector<HTMLElement>("[data-msg]")!;
  const fotoOk = foto.querySelector<HTMLInputElement>("input")!;
  const fotoBtn = foto.querySelector<HTMLButtonElement>("button")!;
  fotoOk.addEventListener("change", () => { fotoBtn.disabled = !fotoOk.checked; });

  const otra = document.createElement("button");
  otra.type = "button";
  otra.className = "acta-otra";
  otra.hidden = true;
  otra.textContent = "¿No ha salido bien? Probar enviando la foto a la IA";

  textarea.after(fila);
  boton.after(foto);
  foto.after(otra);

  const pintarAdjunto = () => {
    if (miniatura) URL.revokeObjectURL(miniatura);
    miniatura = "";
    if (!adjunto) { adj.hidden = true; adj.replaceChildren(); return; }
    adj.hidden = false;
    adj.innerHTML = "";
    if (adjunto.type.startsWith("image/")) {
      miniatura = URL.createObjectURL(adjunto);
      const im = document.createElement("img");
      im.src = miniatura;
      im.alt = "";
      adj.append(im);
    }
    adj.append(document.createTextNode(adjunto.name || "captura"));
    const q = document.createElement("button");
    q.type = "button";
    q.textContent = "✕";
    q.setAttribute("aria-label", "Quitar el archivo");
    q.addEventListener("click", () => { adjunto = null; input.value = ""; foto.hidden = true; otra.hidden = true; pintarAdjunto(); });
    adj.append(q);
  };
  const adjuntar = (f: File | null | undefined) => {
    if (!f) return false;
    if (!f.type.startsWith("image/") && f.type !== "application/pdf") {
      o.estado("Ese archivo no es una imagen ni un PDF.", true);
      return false;
    }
    if (f.size > 15_000_000) {
      o.estado("El archivo es demasiado grande (máx. 15 MB).", true);
      return false;
    }
    adjunto = f;
    foto.hidden = true;
    otra.hidden = true;
    o.estado("");
    pintarAdjunto();
    return true;
  };

  input.addEventListener("change", () => { adjuntar(input.files?.[0]); });
  textarea.addEventListener("paste", (ev) => {
    const f = [...(ev.clipboardData?.files ?? [])].find((x) => x.type.startsWith("image/"));
    if (f && adjuntar(f)) ev.preventDefault();
  });
  textarea.addEventListener("dragover", (ev) => { ev.preventDefault(); textarea.classList.add("acta-drop"); });
  textarea.addEventListener("dragleave", () => textarea.classList.remove("acta-drop"));
  textarea.addEventListener("drop", (ev) => {
    textarea.classList.remove("acta-drop");
    const f = ev.dataTransfer?.files?.[0];
    if (f) { ev.preventDefault(); adjuntar(f); }
  });

  /** La imagen que se mandaría con consentimiento (la captura, o la 1.ª página del PDF escaneado). */
  let imagenParaIA: Blob | null = null;

  const entregar = (acta: ActaLeida, origen: OrigenActa) => {
    o.estado("");
    const avisos = avisosActa(acta);
    otra.hidden = !(imagenParaIA && origen !== "foto");
    o.onActa(acta, avisos, origen);
    // números que no cuadran en una captura leída aquí: la IA con la foto suele leerla bien
    if (avisos.length && imagenParaIA && origen !== "foto") ofrecerFoto("Hay números que no cuadran (mira los avisos).");
  };

  const ofrecerFoto = (motivo: string) => {
    fotoMsg.textContent = `${motivo} Puedo intentarlo enviando la imagen a la IA, que lee las tablas mucho mejor:`;
    fotoOk.checked = false;
    fotoBtn.disabled = true;
    foto.hidden = false;
    otra.hidden = true;
    o.estado("");
  };

  boton.addEventListener("click", async () => {
    if (boton.disabled) return;
    foto.hidden = true;
    otra.hidden = true;
    imagenParaIA = null;
    boton.disabled = true;
    try {
      let texto = textarea.value.trim();
      if (adjunto) {
        if (adjunto.type === "application/pdf") {
          o.estado("Leyendo el PDF…");
          const r = await leerPdf(adjunto);
          texto = r.texto;
          imagenParaIA = r.imagen;
        } else imagenParaIA = adjunto;
        if (imagenParaIA) {
          o.estado("Leyendo la imagen en tu dispositivo (la primera vez tarda un poco)…");
          texto = await ocr(imagenParaIA, (p) => o.estado(`Leyendo la imagen en tu dispositivo… ${Math.round(p * 100)} %`));
        }
      }
      if (!texto) throw new Error(adjunto ? "No he encontrado texto en el archivo." : "Pega el acta o una captura en el recuadro.");
      // 1. sin IA
      try {
        return entregar(actaDeTexto(texto), "texto");
      } catch {
        /* no lleva una cabecera que se entienda: a la IA, sin nombres */
      }
      o.estado("Leyendo el acta con IA (sin enviar ningún nombre)…");
      const { texto: anon, nombres } = anonimizar(texto);
      const acta = await pedirIA({ modo: "texto", texto: anon });
      entregar(restaurarNombres(acta, nombres), "ia");
    } catch (e) {
      const msg = e instanceof Error ? e.message : "No se pudo leer el acta.";
      if (imagenParaIA) ofrecerFoto(msg.endsWith(".") ? msg : msg + ".");
      else o.estado(msg, true);
    } finally {
      boton.disabled = false;
    }
  });

  otra.addEventListener("click", () => ofrecerFoto("¿Algún número mal leído?"));

  fotoBtn.addEventListener("click", async () => {
    if (!imagenParaIA || !fotoOk.checked) return;
    fotoBtn.disabled = true;
    o.estado("Enviando la foto a la IA…");
    try {
      // ancho ≤ 1100 y trozos de 1500 px de alto (máx. 6): una captura larga del móvil se manda en
      // trozos legibles en vez de encogida hasta no leerse
      const trozos = await trozosDe(imagenParaIA, (w, h) => Math.min(1, 1100 / w, 8400 / h), 1500, 100);
      const imagenes = trozos.map((t) => t.lienzo.toDataURL("image/jpeg", 0.8));
      const acta = await pedirIA({ modo: "foto", imagenes });
      foto.hidden = true;
      entregar(acta, "foto");
    } catch (e) {
      o.estado(e instanceof Error ? e.message : "La IA no ha podido leer la foto.", true);
      fotoBtn.disabled = !fotoOk.checked;
    }
  });
}
