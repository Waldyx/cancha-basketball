import { enlaceCalzadoClub, FRANJAS_CLUB, leerOpcionesCalzadoClub, seleccionCalzadoClub, type DatosCalzadoClub } from "../lib/calzadoClub";
import { euros } from "../lib/scoring";
import { svgQR } from "../lib/pizarraQR";

export function montarCalzadoClub() {
  const form = document.getElementById("clz-form") as HTMLFormElement | null;
  const data = document.getElementById("clz-data");
  if (!form || !data) return;
  const datos: DatosCalzadoClub = JSON.parse(data.textContent || "{}");
  const templates = new Map([...document.querySelectorAll<HTMLTemplateElement>("template[data-template-shoe]")].map((t) => [t.dataset.templateShoe!, t]));
  const input = (id: string) => document.getElementById(id) as HTMLInputElement;
  const link = input("clz-link");
  const status = document.getElementById("clz-status")!;
  let opciones = leerOpcionesCalzadoClub(new URLSearchParams(location.search));

  const render = () => {
    input("clz-name").value = opciones.club;
    input("clz-max").value = String(opciones.max);
    input("clz-mini").value = opciones.mini;
    input("clz-infantil").value = opciones.infantil;
    document.getElementById("clz-club")!.textContent = opciones.club ? `Guía de ${opciones.club}` : "Guía para las familias del club";
    document.getElementById("clz-budget")!.textContent = `Hasta ${euros(opciones.max)} € por par`;
    for (const { id } of FRANJAS_CLUB) {
      const section = document.querySelector<HTMLElement>(`[data-franja="${id}"]`)!;
      const ids = seleccionCalzadoClub(datos, id, opciones);
      section.querySelector("[data-list]")!.replaceChildren(...ids.flatMap((shoeId) => {
        const t = templates.get(shoeId);
        return t ? [t.content.cloneNode(true)] : [];
      }));
      (section.querySelector("[data-empty]") as HTMLElement).hidden = ids.length > 0;
    }
    link.value = enlaceCalzadoClub(opciones);
    document.getElementById("clz-print-link")!.textContent = link.value;
    const qr = document.getElementById("clz-qr")!;
    const svg = svgQR(link.value);
    qr.replaceChildren();
    if (svg) qr.append(document.importNode(new DOMParser().parseFromString(svg, "image/svg+xml").documentElement, true));
    else qr.textContent = "QR no disponible";
  };

  const aplicarFormulario = (): boolean => {
    if (!form.reportValidity()) return false;
    const params = new URLSearchParams();
    for (const [key, value] of new FormData(form)) if (typeof value === "string") params.set(key, value);
    opciones = leerOpcionesCalzadoClub(params);
    const url = new URL(enlaceCalzadoClub(opciones));
    if (location.search !== url.search) history.pushState(null, "", url.pathname + url.search);
    render();
    status.textContent = "Selección actualizada";
    return true;
  };

  const copiar = async () => {
    try { await navigator.clipboard.writeText(link.value); }
    catch {
      try {
        link.select();
        if (!document.execCommand("copy")) throw new Error("Copia no disponible");
      } catch { status.textContent = "No se pudo copiar el enlace"; return; }
    }
    status.textContent = "Enlace copiado";
  };

  form.addEventListener("submit", (event) => { event.preventDefault(); aplicarFormulario(); });
  document.getElementById("clz-copy")!.addEventListener("click", () => { if (aplicarFormulario()) void copiar(); });
  document.getElementById("clz-share")!.addEventListener("click", async () => {
    if (!aplicarFormulario()) return;
    if (!navigator.share) { await copiar(); return; }
    try {
      await navigator.share({ title: opciones.club ? `Calzado · ${opciones.club}` : "Calzado para el club", url: link.value });
      status.textContent = "Guía compartida";
    } catch (error) {
      if ((error as Error).name !== "AbortError") await copiar();
    }
  });
  document.getElementById("clz-print")!.addEventListener("click", () => { if (aplicarFormulario()) window.print(); });
  addEventListener("popstate", () => {
    opciones = leerOpcionesCalzadoClub(new URLSearchParams(location.search));
    render(); status.textContent = "";
  });
  render();
}
