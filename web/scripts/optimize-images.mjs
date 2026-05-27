/**
 * optimize-images.mjs
 * Convierte todas las imágenes de /public/shoes a WebP optimizado.
 * - Redimensiona a máximo 600px de ancho (suficiente para catálogo)
 * - Calidad WebP 82 (buena calidad, peso mínimo)
 * - Mantiene los originales como backup en /public/shoes/originals/
 * - Actualiza las referencias en zapatillas.ts automáticamente
 *
 * Uso: node scripts/optimize-images.mjs
 */

import sharp from "sharp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SHOES_DIR = path.join(__dirname, "../public/shoes");
const ORIGINALS_DIR = path.join(SHOES_DIR, "originals");
const ZAPATILLAS_FILE = path.join(__dirname, "../src/data/zapatillas.ts");

const MAX_WIDTH = 600;
const WEBP_QUALITY = 82;
const SKIP_EXTENSIONS = [".svg"];

// Crear carpeta de backups
if (!fs.existsSync(ORIGINALS_DIR)) {
  fs.mkdirSync(ORIGINALS_DIR, { recursive: true });
}

const files = fs.readdirSync(SHOES_DIR).filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return (
    [".jpg", ".jpeg", ".png", ".webp"].includes(ext) &&
    !SKIP_EXTENSIONS.includes(ext)
  );
});

console.log(`\n🔄 Optimizando ${files.length} imágenes...\n`);

let totalAntes = 0;
let totalDespues = 0;
const renameMap = {}; // { "/shoes/old.jpg": "/shoes/new.webp" }

for (const file of files) {
  const srcPath = path.join(SHOES_DIR, file);
  const ext = path.extname(file).toLowerCase();
  const baseName = path.basename(file, ext);
  const destName = `${baseName}.webp`;
  const destPath = path.join(SHOES_DIR, destName);
  const backupPath = path.join(ORIGINALS_DIR, file);

  const sizeBefore = fs.statSync(srcPath).size;
  totalAntes += sizeBefore;

  try {
    // Si ya es WebP y tiene el nombre correcto, solo comprimir
    if (ext === ".webp" && file === destName) {
      await sharp(srcPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toBuffer()
        .then((buf) => {
          fs.copyFileSync(srcPath, backupPath);
          fs.writeFileSync(destPath, buf);
        });
    } else {
      // Convertir a WebP
      await sharp(srcPath)
        .resize({ width: MAX_WIDTH, withoutEnlargement: true })
        .webp({ quality: WEBP_QUALITY })
        .toFile(destPath);

      // Backup del original
      fs.copyFileSync(srcPath, backupPath);

      // Borrar original si el nombre cambia
      if (file !== destName) {
        fs.unlinkSync(srcPath);
        renameMap[`/shoes/${file}`] = `/shoes/${destName}`;
      }
    }

    const sizeAfter = fs.statSync(destPath).size;
    totalDespues += sizeAfter;
    const ahorro = Math.round((1 - sizeAfter / sizeBefore) * 100);

    console.log(
      `  ✅ ${file.padEnd(45)} ${(sizeBefore / 1024).toFixed(0).padStart(6)}KB → ${(sizeAfter / 1024).toFixed(0).padStart(5)}KB  (-${ahorro}%)`
    );
  } catch (err) {
    totalDespues += sizeBefore; // no contabilizar ahorro si falla
    console.error(`  ❌ ${file}: ${err.message}`);
  }
}

// Actualizar referencias en zapatillas.ts
const renames = Object.keys(renameMap);
if (renames.length > 0) {
  console.log(`\n📝 Actualizando ${renames.length} referencias en zapatillas.ts...`);
  let content = fs.readFileSync(ZAPATILLAS_FILE, "utf-8");
  for (const [oldPath, newPath] of Object.entries(renameMap)) {
    content = content.split(oldPath).join(newPath);
  }
  fs.writeFileSync(ZAPATILLAS_FILE, content, "utf-8");
  console.log("  ✅ Referencias actualizadas");
}

console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 RESUMEN
   Antes:   ${(totalAntes / 1024 / 1024).toFixed(1)} MB
   Después: ${(totalDespues / 1024 / 1024).toFixed(1)} MB
   Ahorro:  ${(((totalAntes - totalDespues) / totalAntes) * 100).toFixed(0)}% menos peso
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
