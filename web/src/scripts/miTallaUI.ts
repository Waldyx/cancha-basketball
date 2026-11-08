import { estadoMiTalla, normalizarMiTalla, type DatosMiTalla } from "../lib/miTalla";

export function montarMiTalla(alCambiar: () => void) {
  const select = document.getElementById("mi-talla") as HTMLSelectElement;
  const toggle = document.getElementById("mi-talla-solo") as HTMLInputElement;
  const datos: DatosMiTalla = JSON.parse(document.getElementById("mi-talla-datos")!.textContent || "{}");
  let talla = "";
  try { talla = normalizarMiTalla(localStorage.getItem("cz.talla")); } catch { /* Funciona en memoria si el almacenamiento esta bloqueado. */ }
  let solo = false;
  const controles = () => { select.value = talla; toggle.disabled = !talla; toggle.checked = solo; };
  select.addEventListener("change", () => {
    talla = normalizarMiTalla(select.value);
    if (!talla) solo = false;
    try { if (talla) localStorage.setItem("cz.talla", talla); else localStorage.removeItem("cz.talla"); } catch { /* Conserva la seleccion en esta pagina. */ }
    controles(); alCambiar();
  });
  toggle.addEventListener("change", () => { solo = !!talla && toggle.checked; controles(); alCambiar(); });
  addEventListener("storage", (event) => {
    if (event.key !== "cz.talla" && event.key !== null) return;
    talla = normalizarMiTalla(event.newValue); if (!talla) solo = false;
    controles(); alCambiar();
  });
  controles();
  return {
    get solo() { return solo; },
    confirmada: (id: string) => estadoMiTalla(datos[id], talla).confirmada,
    limpiarFiltro: () => { solo = false; controles(); },
    pintar: (root: ParentNode) => {
      root.querySelectorAll<HTMLElement>("[data-mi-talla-id]").forEach((card, index) => {
        const chip = card.querySelector<HTMLElement>("[data-mi-talla-chip]");
        if (!chip) return;
        const estado = estadoMiTalla(datos[card.dataset.miTallaId!], talla);
        chip.textContent = estado.texto; chip.hidden = !estado.texto;
        chip.dataset.confirmada = String(estado.confirmada);
        chip.id ||= `mi-talla-chip-${index}`;
        if (estado.texto) card.setAttribute("aria-describedby", chip.id);
        else card.removeAttribute("aria-describedby");
      });
    },
  };
}
