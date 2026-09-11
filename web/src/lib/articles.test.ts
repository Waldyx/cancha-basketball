import { describe, it, expect } from "vitest";
import { ARTICLES } from "./articles";
import { zapatillas } from "../data/zapatillas";

// ─────────────────────────────────────────────────────────
// TAREA 5 — candado: las tablas de "Comparativa rápida" NUNCA vuelven a
// llevar peso/precio escritos a mano. 37 de 51 celdas se habían desviado de
// la ficha (peso_real_g / precio real) porque cada artículo copiaba el dato
// una vez y se quedaba clavado ahí. Las marcas {{peso:ID}}/{{precio:ID}} se
// sustituyen en build (src/pages/blog/[slug].astro); este test es el que
// falla si alguien vuelve a escribir un número suelto.
// ─────────────────────────────────────────────────────────

const MARCA_RE = /\{\{(peso|precio):([a-z0-9-]+)\}\}/g;
const strip = (s: string) => s.replace(/<[^>]+>/g, "").replace(/⭐|✅|❌|🔥/g, "").replace(/\s+/g, " ").trim();
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\./g, "")
    .replace(/°/g, " ")
    .replace(/\b(nike|jordan|adidas|under armour|ua|anta|puma|new balance|nb|li-ning|li ning|361|reebok|converse|air)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const catalogIndex = zapatillas.map((z) => ({ z, k: norm(z.modelo) }));
function findShoe(name: string) {
  const n = norm(name);
  if (!n) return null;
  let best = catalogIndex.filter((e) => e.k === n);
  if (best.length > 1) best = best.filter((e) => !/-gs$/.test(e.z.id));
  if (best.length === 1) return best[0].z;
  best = catalogIndex.filter(
    (e) => e.k && e.k.length > 3 && (n === e.k || n.endsWith(" " + e.k) || e.k.endsWith(" " + n))
  );
  return best.length === 1 ? best[0].z : null;
}

const pesoRawRe = /^(⭐\s*)?(\d{3})\s?g$/i;
const eurRawRe = /^(⭐\s*)?(\d{2,4})\s?€$/i;

describe("ARTICLES — marcas {{peso:ID}}/{{precio:ID}}", () => {
  it("toda marca apunta a un id real del catálogo", () => {
    const malas: string[] = [];
    for (const art of ARTICLES) {
      for (const m of art.body.matchAll(MARCA_RE)) {
        const [, , id] = m;
        if (!zapatillas.some((z) => z.id === id)) {
          malas.push(`${art.slug}: {{${m[1]}:${id}}} — id inexistente`);
        }
      }
    }
    expect(malas, malas.join("\n")).toEqual([]);
  });

  it("toda marca {{peso:ID}} apunta a una ficha con peso_real_g", () => {
    const malas: string[] = [];
    for (const art of ARTICLES) {
      for (const m of art.body.matchAll(MARCA_RE)) {
        if (m[1] !== "peso") continue;
        const z = zapatillas.find((zz) => zz.id === m[2]);
        if (z && !z.peso_real_g) malas.push(`${art.slug}: {{peso:${m[2]}}} — ficha sin peso_real_g`);
      }
    }
    expect(malas, malas.join("\n")).toEqual([]);
  });

  it("ninguna tabla lleva un peso/precio escrito a mano para una zapa del catálogo (candado anti-deriva)", () => {
    const hallazgos: string[] = [];

    for (const art of ARTICLES) {
      for (const t of art.body.matchAll(/<table[\s\S]*?<\/table>/g)) {
        const tableHtml = t[0];
        const trs = [...tableHtml.matchAll(/<tr[\s\S]*?<\/tr>/g)].map((r) => ({
          raws: [...r[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => c[1]),
          texts: [...r[0].matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((c) => strip(c[1])),
        }));
        if (trs.length < 2) continue;
        const head = trs[0].texts;
        const colMode = /atributo|caracter|spec|dato/i.test(head[0]) || head.slice(1).some((h) => findShoe(h));
        const rowMode = trs.slice(1).some((r) => findShoe(r.texts[0])) && !head.slice(1).some((h) => findShoe(h));

        if (rowMode) {
          const pi = head.findIndex((h) => /peso/i.test(h));
          const ei = head.findIndex((h) => /precio/i.test(h));
          for (const r of trs.slice(1)) {
            const z = findShoe(r.texts[0]);
            if (!z) continue;
            if (pi > 0 && pesoRawRe.test(r.raws[pi] ?? "")) {
              hallazgos.push(`${art.slug}: fila "${r.texts[0]}" peso a mano "${r.raws[pi]}" (${z.id})`);
            }
            if (ei > 0 && eurRawRe.test(r.raws[ei] ?? "")) {
              hallazgos.push(`${art.slug}: fila "${r.texts[0]}" precio a mano "${r.raws[ei]}" (${z.id})`);
            }
          }
        } else if (colMode) {
          const shoes = head.map((h) => findShoe(h));
          for (const r of trs.slice(1)) {
            const campo = /peso/i.test(r.texts[0]) ? "peso" : /precio/i.test(r.texts[0]) ? "precio" : null;
            if (!campo) continue;
            r.raws.slice(1).forEach((raw, k) => {
              const z = shoes[k + 1];
              if (!z) return;
              const re = campo === "peso" ? pesoRawRe : eurRawRe;
              if (re.test(raw)) {
                hallazgos.push(`${art.slug}: columna "${head[k + 1]}" ${campo} a mano "${raw}" (${z.id})`);
              }
            });
          }
        }
      }
    }

    expect(hallazgos, hallazgos.join("\n")).toEqual([]);
  });
});
