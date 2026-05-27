// update-retro-images.js — update imagen_principal for retro shoes
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "web/src/data/zapatillas.ts");
let content = fs.readFileSync(file, "utf8");

const retros = {
  "air-jordan-1":            "/shoes/air-jordan-1.jpg",
  "air-jordan-3":            "/shoes/air-jordan-3.jpg",
  "air-jordan-4":            "/shoes/air-jordan-4.jpg",
  "air-jordan-6":            "/shoes/air-jordan-6.jpg",
  "air-jordan-11":           "/shoes/air-jordan-11.jpg",
  "air-jordan-13":           "/shoes/air-jordan-13.jpg",
  "nike-kobe-4-protro":      "/shoes/nike-kobe-4-protro.jpg",
  "nike-kobe-5-protro":      "/shoes/nike-kobe-5-protro.jpg",
  "nike-kobe-6-protro":      "/shoes/nike-kobe-6-protro.jpg",
  "reebok-shaq-attaq":       "/shoes/reebok-shaq-attaq.jpg",
  "nike-air-foamposite-one": "/shoes/nike-air-foamposite-one.jpg",
  "converse-chuck-taylor":   "/shoes/converse-chuck-taylor.jpg",
  "nike-air-penny-2":        "/shoes/nike-air-penny-2.jpg",
  "nike-zoom-generation":    "/shoes/nike-zoom-generation.jpg",
};

let changes = 0;

for (const [slug, localPath] of Object.entries(retros)) {
  // Find the shoe block: id: "slug" ... imagen_principal: "/placeholder-shoe.svg"
  // We replace the placeholder only within this shoe's block
  const idMarker = `id: "${slug}"`;
  const idx = content.indexOf(idMarker);
  if (idx === -1) {
    console.log(`MISS slug not found: ${slug}`);
    continue;
  }

  // Look for imagen_principal after the id marker (within next 3000 chars to stay in block)
  const block = content.slice(idx, idx + 3000);
  const placeholder = `imagen_principal: "/placeholder-shoe.svg"`;
  if (!block.includes(placeholder)) {
    console.log(`SKIP already updated or not placeholder: ${slug}`);
    continue;
  }

  const newBlock = block.replace(placeholder, `imagen_principal: "${localPath}"`);
  content = content.slice(0, idx) + newBlock + content.slice(idx + 3000);
  changes++;
  console.log(`OK  ${slug} → ${localPath}`);
}

fs.writeFileSync(file, content, "utf8");
console.log(`\nDone: ${changes} images updated.`);
