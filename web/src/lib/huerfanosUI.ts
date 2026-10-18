// Aviso de datos huérfanos para las herramientas que guardan datos por NOMBRE de jugador
// (evaluación, tests físicos): si el entrenador corrige un nombre en la lista, sus datos se quedan
// colgando del nombre viejo. Aquí se ofrece pasárselos a un jugador de la lista o borrarlos.
// También avisa de nombres repetidos. Lógica pura en plantillaTexto.ts.

import { borrarDatos, hayRepetidos, huerfanos, pasarDatos, sinDatos } from "./plantillaTexto";

export function pintarHuerfanos(cont: HTMLElement, opts: { texto: string; jugadores: string[]; registros: Record<string, unknown>[]; que: string; alCambiar: () => void }) {
  const { texto, jugadores, registros, que, alCambiar } = opts;
  cont.replaceChildren();
  const el = (tag: string, cls?: string, txt?: string) => {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (txt !== undefined) e.textContent = txt;
    return e;
  };
  if (hayRepetidos(texto)) cont.append(el("p", "hf-aviso", `Hay nombres repetidos en la lista: añade el dorsal o el apellido para no mezclar sus ${que}.`));
  const libres = sinDatos(registros, jugadores);
  for (const h of huerfanos(registros, jugadores)) {
    const fila = el("div", "hf-fila");
    fila.append(el("span", undefined, `«${h}» tiene ${que} pero ya no está en la lista.`));
    if (libres.length) {
      const sel = document.createElement("select");
      sel.className = "hf-sel";
      sel.setAttribute("aria-label", `A quién pasar los datos de ${h}`);
      sel.append(new Option("Pasárselas a…", ""), ...libres.map((j) => new Option(j, j)));
      sel.addEventListener("change", () => {
        if (!sel.value) return;
        pasarDatos(registros, h, sel.value);
        alCambiar();
      });
      fila.append(sel);
    }
    const borrar = el("button", "hf-bn", "Borrarlas") as HTMLButtonElement;
    borrar.type = "button";
    borrar.addEventListener("click", () => {
      if (!confirm(`¿Borrar todas las ${que} de «${h}»? No se puede deshacer.`)) return;
      borrarDatos(registros, h);
      alCambiar();
    });
    fila.append(borrar);
    cont.append(fila);
  }
  cont.hidden = !cont.childElementCount;
}
