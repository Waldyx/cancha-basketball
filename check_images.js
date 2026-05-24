// check_images.js — Busca URLs válidas en ballershoesdb.com para zapas con cloudfront roto
// Ejecutar: node check_images.js

const https = require("https");
const http = require("http");

// Slugs con imágenes rotas (cloudfront)
const slugs = [
  "nike-lebron-22","ua-curry-12","nike-sabrina-2","nike-kobe-8-protro",
  "jordan-luka-5","jordan-tatum-3","nike-kyrie-low-5","anta-kai-2",
  "adidas-dame-certified","nike-precision-8","jordan-one-take-5","jordan-xxxvii",
  "nike-lebron-21","nike-zoom-freak-4","nike-giannis-immortality-3","puma-mb03",
  "adidas-ae-1","nb-two-wxy-v4","jordan-luka-2","nike-pg-6","nike-gt-jump-2",
  "nike-ja-3","adidas-ae-2","nike-gt-cut-4","nike-don-issue-6","puma-scoot-zeros",
  "nike-pg-7","nike-zoom-freak-5","adidas-exhibit-a","adidas-exhibit-b",
  "nike-kyrie-infinity-2","ua-jet-23","nike-air-max-impact-5","lining-sonic-12",
  "nike-gt-run-2","jordan-super-fly-10","peak-taichi-flash","nike-zoom-freak-6",
  "adidas-cross-em-up-5","nb-kawhi-1","anta-shock-wave-5","adidas-harden-stepback-4",
  "nike-kyrie-flytrap-6","ua-hovr-havoc-5","nike-air-zoom-crossover-2",
  "adidas-ownthegame-3","nb-omn1s","puma-playmaker-pro-mid","lining-yu-shuai-18",
  "converse-all-star-pro-bb"
];

// Mapeo de prefijos de slug → nombre en ballershoesdb
const brandMap = {
  "nike-": "Nike-",
  "jordan-": "Jordan-",
  "adidas-": "Adidas-",
  "ua-": "Under-Armour-",
  "puma-": "Puma-",
  "nb-": "New-Balance-",
  "anta-": "Anta-",
  "lining-": "Li-Ning-",
  "peak-": "Peak-",
  "converse-": "Converse-",
  "reebok-": "Reebok-",
};

function slugToName(slug) {
  let name = slug;
  for (const [prefix, brand] of Object.entries(brandMap)) {
    if (slug.startsWith(prefix)) {
      name = brand + slug.slice(prefix.length);
      break;
    }
  }
  // Title-case cada segmento separado por guión
  return name.split("-").map(w => {
    if (/^\d/.test(w)) return w; // números sin cambiar
    if (w.length <= 2) return w.toUpperCase(); // siglas
    return w.charAt(0).toUpperCase() + w.slice(1);
  }).join("-");
}

function checkUrl(url) {
  return new Promise((resolve) => {
    const mod = url.startsWith("https") ? https : http;
    const req = mod.request(url, { method: "HEAD", timeout: 8000 }, (res) => {
      resolve({ url, status: res.statusCode });
    });
    req.on("error", () => resolve({ url, status: 0 }));
    req.on("timeout", () => { req.destroy(); resolve({ url, status: 0 }); });
    req.end();
  });
}

function generateVariants(slug) {
  const name = slugToName(slug);
  const base = "https://ballershoesdb.com/wp-content/uploads/";
  return [
    `${base}${name}-Cropped-650x406.jpg`,
    `${base}${name}-Cropped.jpg`,
    `${base}${name}-650x406.jpg`,
    `${base}${name}.jpg`,
    // Sin "Cropped" y con sufijo diferente
    `${base}${name}-Cropped-650x406.png`,
    `${base}${name}-Cropped-650x406.webp`,
  ];
}

async function main() {
  const results = {};
  console.log(`Verificando ${slugs.length} slugs...\n`);

  for (const slug of slugs) {
    const variants = generateVariants(slug);
    let found = null;
    for (const url of variants) {
      const { status } = await checkUrl(url);
      if (status === 200 || status === 301 || status === 302) {
        found = url;
        break;
      }
    }
    results[slug] = found;
    if (found) {
      console.log(`✅ ${slug}\n   → ${found}`);
    } else {
      console.log(`❌ ${slug} — no encontrado`);
    }
  }

  console.log("\n\n=== RESUMEN PARA COPIAR EN zapatillas.ts ===\n");
  for (const [slug, url] of Object.entries(results)) {
    if (url) {
      console.log(`// ${slug}\n"${url}",\n`);
    }
  }

  const found = Object.values(results).filter(Boolean).length;
  console.log(`\nEncontradas: ${found}/${slugs.length}`);
}

main();
