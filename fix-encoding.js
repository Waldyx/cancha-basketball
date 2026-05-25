// fix-encoding.js — corrige doble-encoding UTF-8/Latin-1 en zapatillas.ts
// Usa escapes Unicode para evitar problemas de encoding en el script mismo
const fs = require("fs");
const FILE = "./web/src/data/zapatillas.ts";

// Cada entrada: [secuencia_corrupta_unicode, caracter_correcto_unicode]
// Las secuencias corruptas son: Ã (U+00C3) + el byte de cada vocal/consonante
const FIXES = [
  ["Ã¡", "á"],  // á
  ["Ã©", "é"],  // é
  ["Ã­", "í"],  // í
  ["Ã³", "ó"],  // ó
  ["Ãº", "ú"],  // ú
  ["Ã±", "ñ"],  // ñ
  ["Ã¼", "ü"],  // ü
  ["Ã¶", "ö"],  // ö
  ["Ã¤", "ä"],  // ä
  ["Ã§", "ç"],  // ç
  ["Ã ", "à"],  // à
  ["Ã¨", "è"],  // è
  ["Ã¬", "ì"],  // ì
  ["Ã²", "ò"],  // ò
  ["Ã¹", "ù"],  // ù
  // Mayúsculas
  ["Ã", "É"],  // É
  ["Ã", "Ú"],  // Ú
  ["Ã", "Ñ"],  // Ñ
  ["Ã", "Ó"],  // Ó
  ["Ã", "Á"],  // Á
  // Guiones y comillas tipográficas
  // em dash — (U+2014) corrupto: â (U+00E2) + € (U+0080) + " (U+009C) no es correcto
  // La secuencia corrupta real de — es: â
  ["â", "—"],  // — em dash
  ["â", "–"],  // – en dash
  ["â", "’"],  // ' comilla simple derecha
  ["â", "‘"],  // ' comilla simple izquierda
  ["â", "“"],  // " comilla doble izquierda
  ["â", "”"],  // " comilla doble derecha
  ["â¦", "…"],  // … puntos suspensivos
  ["â¬", "€"],  // € euro
  // Caracteres Â + algo
  ["Â·", "·"],  // · punto medio
  ["Â¿", "¿"],  // ¿
  ["Â¡", "¡"],  // ¡
  ["Âº", "º"],  // º
  ["Âª", "ª"],  // ª
  ["Â°", "°"],  // °
  ["Â«", "«"],  // «
  ["Â»", "»"],  // »
];

let content = fs.readFileSync(FILE, "utf8");
let totalReplaced = 0;

for (const [bad, good] of FIXES) {
  let count = 0;
  while (content.includes(bad)) {
    content = content.split(bad).join(good);
    count++;
  }
  const occurrences = (content.split(good).length - 1);
  if (count > 0 || occurrences > 0) {
    // Re-count in original wasn't tracked perfectly, just note if we did something
  }
  // Simple count approach
  const testContent = content.split(good);
  // Count replacements differently: check before/after
}

// Redo cleanly
content = fs.readFileSync(FILE, "utf8");
totalReplaced = 0;

for (const [bad, good] of FIXES) {
  const parts = content.split(bad);
  const count = parts.length - 1;
  if (count > 0) {
    content = parts.join(good);
    totalReplaced += count;
    process.stdout.write(".");
  }
}

fs.writeFileSync(FILE, content, "utf8");

console.log("\n\nTotal reemplazos: " + totalReplaced);

// Verificacion
const badCount = (content.match(/Ã[-¿]/g) || []).length;
const badCountB = (content.match(/Â[-¿]/g) || []).length;
console.log("Secuencias Ã+x restantes: " + badCount);
console.log("Secuencias Â+x restantes: " + badCountB);

// Muestra sample
const lines = content.split("\n");
const problems = lines.filter(l => /Ã|â/.test(l) && l.includes("resumen")).slice(0,3);
console.log("Sample OK:", lines[60].trim().slice(0,80));
