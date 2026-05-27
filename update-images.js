const fs = require('fs');
const path = require('path');

const shoesDir = path.join(__dirname, 'web', 'public', 'shoes');
const zapatillasFile = path.join(__dirname, 'web', 'src', 'data', 'zapatillas.ts');

// Build a map: slug -> extension
const slugToExt = {};
const files = fs.readdirSync(shoesDir);
for (const file of files) {
  const ext = path.extname(file); // .jpg, .jpeg, .png
  const slug = path.basename(file, ext);
  // Prefer .jpg over others
  if (!slugToExt[slug] || ext === '.jpg') {
    slugToExt[slug] = ext;
  }
}

console.log('Found local images for slugs:', Object.keys(slugToExt).length);

// Read zapatillas.ts
let content = fs.readFileSync(zapatillasFile, 'utf8');

let updatedCount = 0;
let skippedCount = 0;

// Strategy: find each zapatilla block that has a matching slug
// Pattern: find slug: "some-slug" and then imagen: "..." within the same object
// We'll process line by line

const lines = content.split('\n');
const result = [];
let currentSlug = null;

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];

  // Detect slug: "..."
  const slugMatch = line.match(/^\s+slug:\s*["']([^"']+)["']/);
  if (slugMatch) {
    currentSlug = slugMatch[1];
  }

  // Detect imagen_principal: "..."
  const imagenMatch = line.match(/^(\s+imagen_principal:\s*["'])([^"']+)(["'].*)/);
  if (imagenMatch && currentSlug) {
    const indent = imagenMatch[1];
    const currentUrl = imagenMatch[2];
    const suffix = imagenMatch[3];

    if (slugToExt[currentSlug]) {
      const ext = slugToExt[currentSlug];
      const localPath = `/shoes/${currentSlug}${ext}`;
      if (currentUrl !== localPath) {
        line = `${indent}${localPath}${suffix}`;
        updatedCount++;
        console.log(`✓ ${currentSlug}: ${currentUrl.substring(0, 60)}... → ${localPath}`);
      }
    } else {
      skippedCount++;
      console.log(`✗ ${currentSlug}: no local image, keeping ${currentUrl.substring(0, 60)}...`);
    }
  }

  result.push(line);
}

const newContent = result.join('\n');
fs.writeFileSync(zapatillasFile, newContent, 'utf8');

console.log('\n=== DONE ===');
console.log(`Updated: ${updatedCount} images`);
console.log(`Skipped (no local file): ${skippedCount} images`);
