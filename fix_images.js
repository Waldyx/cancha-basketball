// fix_images.js — Busca URLs de imágenes en RunRepeat para zapas con cloudfront roto
// Ejecutar: node fix_images.js
// Produce un mapa slug → URL para pegar en zapatillas.ts

const https = require("https");

// Todos los slugs con cloudfront roto (extraídos de zapatillas.ts)
const broken = [
  "nike-lebron-22",       // línea 76
  "ua-curry-12",          // línea 183
  "nike-sabrina-2",       // línea 269
  "nike-kobe-8-protro",   // línea 602 (kobe protro 8)
  "jordan-luka-5",        // línea 662
  "jordan-tatum-3",       // línea 785
  "nike-kyrie-low-5",     // línea 971
  "anta-kai-2",           // línea 1032
  "adidas-dame-certified",// línea 1391
  "nike-precision-8",     // línea 1510
  "jordan-one-take-5",    // línea 1747
  "jordan-xxxvii",        // línea 2037 (air jordan 37)
  "nike-lebron-21",       // línea 2097
  "nike-zoom-freak-4",    // línea 2156
  "nike-giannis-immortality-3", // línea 2215
  "puma-mb03",            // línea 2328
  "adidas-ae-1",          // línea 2501
  "nb-two-wxy-v4",        // línea 2558
  "jordan-luka-2",        // línea 2615
  "nike-pg-6",            // línea 2673
  "nike-gt-jump-2",       // línea 2730
  "nike-ja-3",            // línea 2885
  "adidas-ae-2",          // línea 2962
  "nike-gt-cut-4",        // línea 3191
  "nike-don-issue-6",     // línea 5106
  "puma-scoot-zeros",     // línea 5160
  "nike-pg-7",            // línea 5214
  "nike-zoom-freak-5",    // línea 5323
  "adidas-exhibit-a",     // línea 5376
  "adidas-exhibit-b",     // línea 5429
  "nike-kyrie-infinity-2",// línea 5482
  "ua-jet-23",            // línea 5589
  "nike-air-max-impact-5",// línea 5697
  "lining-sonic-12",      // línea 5750
  "nike-gt-run-2",        // línea 5858
  "jordan-super-fly-10",  // línea 5911
  "peak-taichi-flash",    // línea 5964
  "nike-zoom-freak-6",    // línea 6018
  "adidas-cross-em-up-5", // línea 6071
  "nb-kawhi-1",           // línea 6181
  "anta-shock-wave-5",    // línea 6234
  "adidas-harden-stepback-4", // línea 6342
  "nike-kyrie-flytrap-6", // línea 6395
  "ua-hovr-havoc-5",      // línea 6504
  "nike-air-zoom-crossover-2", // línea 6557
  "adidas-ownthegame-3",  // línea 6610
  "nb-omn1s",             // línea 6663
  "puma-playmaker-pro-mid",// línea 6717
  "lining-yu-shuai-18",   // línea 6770
  "converse-all-star-pro-bb", // línea 6932
];

// Variantes de slug para RunRepeat (a veces difieren del slug del proyecto)
const runrepeatSlugs = {
  "nike-lebron-22":       ["nike-le-bron-22"],
  "ua-curry-12":          ["under-armour-curry-12"],
  "nike-sabrina-2":       ["nike-sabrina-2"],
  "nike-kobe-8-protro":   ["nike-kobe-8-protro", "nike-kobe-8", "nike-zoom-kobe-8"],
  "jordan-luka-5":        ["jordan-luka-5"],
  "jordan-tatum-3":       ["jordan-tatum-3"],
  "nike-kyrie-low-5":     ["nike-kyrie-low-5"],
  "anta-kai-2":           ["anta-kai-2"],
  "adidas-dame-certified":["adidas-dame-certified"],
  "nike-precision-8":     ["nike-precision-8"],
  "jordan-one-take-5":    ["jordan-one-take-5", "nike-jordan-one-take-5"],
  "jordan-xxxvii":        ["air-jordan-37", "jordan-xxxvii"],
  "nike-lebron-21":       ["nike-le-bron-21"],
  "nike-zoom-freak-4":    ["nike-zoom-freak-4"],
  "nike-giannis-immortality-3": ["nike-giannis-immortality-3"],
  "puma-mb03":            ["puma-mb-03", "puma-mb03"],
  "adidas-ae-1":          ["adidas-ae-1", "adidas-anthony-edwards-1"],
  "nb-two-wxy-v4":        ["new-balance-two-wxy-v4", "new-balance-twowxy-v4"],
  "jordan-luka-2":        ["jordan-luka-2"],
  "nike-pg-6":            ["nike-pg-6"],
  "nike-gt-jump-2":       ["nike-g-t-jump-2", "nike-gt-jump-2"],
  "nike-ja-3":            ["nike-ja-3"],
  "adidas-ae-2":          ["adidas-ae-2", "adidas-anthony-edwards-2"],
  "nike-gt-cut-4":        ["nike-g-t-cut-4", "nike-gt-cut-4"],
  "nike-don-issue-6":     ["nike-don-issue-6"],
  "puma-scoot-zeros":     ["puma-scoot-zeros", "puma-scoot-zeros-2"],
  "nike-pg-7":            ["nike-pg-7"],
  "nike-zoom-freak-5":    ["nike-zoom-freak-5"],
  "adidas-exhibit-a":     ["adidas-exhibit-a"],
  "adidas-exhibit-b":     ["adidas-exhibit-b"],
  "nike-kyrie-infinity-2":["nike-kyrie-infinity-2"],
  "ua-jet-23":            ["under-armour-jet-23", "ua-jet-23"],
  "nike-air-max-impact-5":["nike-air-max-impact-5"],
  "lining-sonic-12":      ["li-ning-sonic-12"],
  "nike-gt-run-2":        ["nike-g-t-run-2", "nike-gt-run-2"],
  "jordan-super-fly-10":  ["jordan-super-fly-10"],
  "peak-taichi-flash":    ["peak-taichi-flash"],
  "nike-zoom-freak-6":    ["nike-zoom-freak-6"],
  "adidas-cross-em-up-5": ["adidas-cross-em-up-5"],
  "nb-kawhi-1":           ["new-balance-kawhi-1", "nb-kawhi-1"],
  "anta-shock-wave-5":    ["anta-shock-wave-5"],
  "adidas-harden-stepback-4": ["adidas-harden-stepback-4"],
  "nike-kyrie-flytrap-6": ["nike-kyrie-flytrap-6"],
  "ua-hovr-havoc-5":      ["under-armour-hovr-havoc-5", "ua-hovr-havoc-5"],
  "nike-air-zoom-crossover-2": ["nike-air-zoom-crossover-2"],
  "adidas-ownthegame-3":  ["adidas-own-the-game-3", "adidas-ownthegame-3"],
  "nb-omn1s":             ["new-balance-omn1s"],
  "puma-playmaker-pro-mid":["puma-playmaker-pro-mid"],
  "lining-yu-shuai-18":   ["li-ning-yu-shuai-18"],
  "converse-all-star-pro-bb": ["converse-all-star-pro-bb"],
};

function fetchPage(url) {
  return new Promise((resolve) => {
    const req = https.request(
      url,
      {
        method: "GET",
        timeout: 12000,
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
          "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "Accept-Language": "en-US,en;q=0.9",
        },
      },
      (res) => {
        // Handle redirects
        if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
          const redirectUrl = res.headers.location.startsWith("http")
            ? res.headers.location
            : `https://runrepeat.com${res.headers.location}`;
          resolve(fetchPage(redirectUrl));
          return;
        }
        if (res.statusCode !== 200) {
          resolve({ status: res.statusCode, html: "" });
          return;
        }
        let body = "";
        res.on("data", (c) => { body += c; if (body.length > 50000) req.destroy(); });
        res.on("end", () => resolve({ status: res.statusCode, html: body }));
      }
    );
    req.on("error", () => resolve({ status: 0, html: "" }));
    req.on("timeout", () => { req.destroy(); resolve({ status: 0, html: "" }); });
    req.end();
  });
}

function extractOgImage(html) {
  // og:image meta tag
  const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (m) return m[1];
  return null;
}

async function findImage(slug) {
  const variants = runrepeatSlugs[slug] || [slug];
  for (const variant of variants) {
    const url = `https://runrepeat.com/${variant}`;
    const { status, html } = await fetchPage(url);
    if (status === 200 && html) {
      const img = extractOgImage(html);
      if (img && img.includes("cdn.runrepeat.com")) {
        return img;
      }
    }
  }
  return null;
}

async function main() {
  console.log(`Buscando imágenes para ${broken.length} zapas con cloudfront roto...\n`);
  const results = {};

  for (const slug of broken) {
    const img = await findImage(slug);
    results[slug] = img;
    if (img) {
      console.log(`✅ ${slug}\n   → ${img}`);
    } else {
      console.log(`❌ ${slug} — NO ENCONTRADO`);
    }
    // Pequeña pausa para no saturar
    await new Promise(r => setTimeout(r, 300));
  }

  console.log("\n\n=== REEMPLAZOS PARA zapatillas.ts ===\n");
  for (const [slug, url] of Object.entries(results)) {
    if (url) {
      console.log(`"${slug}": "${url}",`);
    }
  }

  const found = Object.values(results).filter(Boolean).length;
  console.log(`\n✅ Encontradas: ${found}/${broken.length}`);
  console.log(`❌ No encontradas: ${broken.length - found}/${broken.length}`);

  const missing = Object.entries(results).filter(([,v]) => !v).map(([k]) => k);
  if (missing.length) {
    console.log("\nSin imagen (usar /placeholder-shoe.svg):");
    missing.forEach(s => console.log(`  - ${s}`));
  }
}

main();
