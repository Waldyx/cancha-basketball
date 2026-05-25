// fix-images.js — reemplaza rutas /shoes/ locales con URLs externas reales
// Fuentes: ballershoesdb.com (principal), wowsole.com (Li-Ning/chinas), weartesters.com
const fs = require("fs");
const path = require("path");

const BASE = "https://ballershoesdb.com/wp-content/uploads/";
const WOW  = "https://wowsole.com/wp-content/uploads/";
const WT   = "https://weartesters.com/wp-content/uploads/";
const RR   = "https://cdn.runrepeat.com/storage/gallery/";

// Mapa: ruta /shoes/SLUG.ext → URL externa real
const MAP = {
  // ── NIKE ──────────────────────────────────────────────────────────────
  "/shoes/nike-lebron-22.png":           BASE + "NikeLeBron22-Cropped-650x406.jpg",
  "/shoes/nike-lebron-21.png":           BASE + "NikeLeBron21-Cropped-650x406.jpg",
  "/shoes/nike-lebron-23.jpg":           BASE + "NikeLeBron23-Cropped-650x406.jpg",
  "/shoes/nike-lebron-witness-8.jpg":    BASE + "NikeLeBronWitness8-Cropped-650x406.jpg",
  "/shoes/nike-lebron-witness-9.jpg":    BASE + "NikeLeBronWitness9-Cropped-650x406.jpg",
  "/shoes/nike-lebron-nxxt-gen.jpg":     BASE + "NikeLeBronNXXTGen-Cropped-650x406.jpg",
  "/shoes/nike-ja-1.jpg":               BASE + "NikeJa1-Cropped-650x406.jpg",
  "/shoes/nike-ja-2.jpg":               BASE + "NikeJa2-Cropped-650x406.jpg",
  "/shoes/nike-ja-3.png":               BASE + "NikeJa3-Cropped-650x406.jpg",
  "/shoes/nike-kd-16.jpg":              BASE + "NikeKD16-Cropped-650x406.jpg",
  "/shoes/nike-kd-17.jpg":              BASE + "NikeKD17-Cropped-650x406.jpg",
  "/shoes/nike-kd-18.jpg":              BASE + "NikeKD18-Cropped-650x406.jpg",
  "/shoes/nike-kobe-8-protro.png":       BASE + "NikeKobe8Protro-Cropped-650x406.jpg",
  "/shoes/nike-gt-cut-3.jpg":           BASE + "NikeGTCut3-Cropped-650x406.jpg",
  "/shoes/nike-gt-cut-4.png":           BASE + "NikeGTCut4-Cropped-650x406.jpg",
  "/shoes/nike-gt-cut-academy-2.jpg":   BASE + "NikeGTCutAcademy2-Cropped-650x406.jpg",
  "/shoes/nike-gt-hustle-3.jpg":        BASE + "NikeGTHustle3-Cropped-650x406.jpg",
  "/shoes/nike-gt-jump-2.png":          BASE + "NikeGTJump2-Cropped-650x406.jpg",
  "/shoes/nike-gt-run-2.jpg":           BASE + "NikeGTRun2-Cropped-650x406.jpg",
  "/shoes/nike-zoom-freak-4.jpg":       BASE + "NikeZoomFreak4-Cropped-650x406.jpg",
  "/shoes/nike-zoom-freak-5.jpg":       BASE + "NikeZoomFreak5-Cropped-650x406.jpg",
  "/shoes/nike-zoom-freak-6.jpg":       BASE + "NikeZoomFreak6-Cropped-650x406.jpg",
  "/shoes/nike-zoom-freak-7.jpg":       BASE + "NikeZoomFreak7-Cropped-650x406.jpg",
  "/shoes/nike-giannis-immortality-3.png": BASE + "NikeGiannisImmortality3-Cropped-650x406.jpg",
  "/shoes/nike-giannis-immortality-4.jpg": BASE + "NikeGiannisImmortality4-Cropped-650x406.jpg",
  "/shoes/nike-sabrina-1.jpg":          BASE + "NikeSabrina1-Cropped-650x406.jpg",
  "/shoes/nike-sabrina-2.png":          BASE + "NikeSabrina2-Cropped-650x406.jpg",
  "/shoes/nike-sabrina-3.jpg":          BASE + "NikeSabrina3-Cropped-650x406.jpg",
  "/shoes/nike-book-1.jpg":             BASE + "NikeBook1-Cropped-650x406.jpg",
  "/shoes/nike-book-2.jpg":             BASE + "NikeBook2-Cropped-650x406.jpg",
  "/shoes/nike-kyrie-flytrap-6.jpg":    BASE + "NikeKyrieFlytrap6-Cropped-650x406.jpg",
  "/shoes/nike-kyrie-infinity-2.jpg":   BASE + "NikeKyrieInfinity2-Cropped-650x406.jpg",
  "/shoes/nike-kyrie-low-5.png":        BASE + "NikeKyrieLow5-Cropped-650x406.jpg",
  "/shoes/nike-don-issue-6.jpg":        BASE + "NikeDonIssue6-Cropped-650x406.jpg",
  "/shoes/nike-luka-77.jpg":            BASE + "NikeLuka77-Cropped-650x406.jpg",
  "/shoes/nike-pg-6.png":               BASE + "NikePG6-Cropped-650x406.jpg",
  "/shoes/nike-precision-7.jpg":        BASE + "NikePrecision7-Cropped-650x406.jpg",
  "/shoes/nike-precision-8.png":        BASE + "NikePrecision8-Cropped-650x406.jpg",
  "/shoes/nike-air-max-impact-5.jpg":   BASE + "NikeAirMaxImpact5-Cropped-650x406.jpg",
  "/shoes/nike-air-zoom-crossover-2.jpg": BASE + "NikeAirZoomCrossover2-Cropped-650x406.jpg",

  // ── JORDAN ───────────────────────────────────────────────────────────
  "/shoes/jordan-luka-1.jpg":           BASE + "JordanLuka1-Cropped-650x406.jpg",
  "/shoes/jordan-luka-2.jpg":           BASE + "JordanLuka2-Cropped-650x406.jpg",
  "/shoes/jordan-luka-3.jpg":           BASE + "JordanLuka3-Cropped-650x406.jpg",
  "/shoes/jordan-luka-4.jpg":           BASE + "JordanLuka4-Cropped-650x406.jpg",
  "/shoes/jordan-luka-5.png":           BASE + "JordanLuka5-Cropped-650x406.jpg",
  "/shoes/jordan-tatum-2.jpg":          BASE + "JordanTatum2-Cropped-650x406.jpg",
  "/shoes/jordan-tatum-3.jpg":          BASE + "JordanTatum3-Cropped-650x406.jpg",
  "/shoes/jordan-tatum-4.jpg":          BASE + "JordanTatum4-Cropped-650x406.jpg",
  "/shoes/jordan-one-take-5.png":       BASE + "JordanOneTake5-Cropped-650x406.jpg",
  "/shoes/jordan-xxxvii.png":           BASE + "JordanXXXVII-Cropped-650x406.jpg",
  "/shoes/jordan-xxxviii.jpg":          BASE + "JordanXXXVIII-Cropped-650x406.jpg",
  "/shoes/jordan-why-not-6.jpg":        BASE + "JordanWhyNot6-Cropped-650x406.jpg",
  "/shoes/jordan-zion-3.jpg":           BASE + "JordanZion3-Cropped-650x406.jpg",
  "/shoes/jordan-zion-4.jpg":           BASE + "JordanZion4-Cropped-650x406.jpg",

  // ── ADIDAS ───────────────────────────────────────────────────────────
  "/shoes/adidas-ae-1.png":             BASE + "AdidasAE1-Cropped-650x406.jpg",
  "/shoes/adidas-ae-1-5.jpg":           BASE + "AdidasAE15-Cropped-650x406.jpg",
  "/shoes/adidas-ae-2.png":             BASE + "AdidasAE2-Cropped-650x406.jpg",
  "/shoes/adidas-ae-3.jpg":             BASE + "AdidasAE3-Cropped-650x406.jpg",
  "/shoes/adidas-dame-8.jpg":           BASE + "AdidasDame8-Cropped-650x406.jpg",
  "/shoes/adidas-dame-9.jpg":           BASE + "AdidasDame9-Cropped-650x406.jpg",
  "/shoes/adidas-dame-certified.png":   BASE + "AdidasDameCertified-Cropped-650x406.jpg",
  "/shoes/adidas-cross-em-up-5.jpg":    BASE + "AdidasCrossEmUp5-Cropped-650x406.jpg",
  "/shoes/adidas-cross-em-up-select.jpeg": BASE + "AdidasCrossEmUpSelect-Cropped-650x406.jpg",
  "/shoes/adidas-cross-em-up-speed.jpg": BASE + "AdidasCrossEmUpSpeed-Cropped-650x406.jpg",
  "/shoes/adidas-harden-vol-8.jpg":     BASE + "AdidasHardenVol8-Cropped-650x406.jpg",
  "/shoes/adidas-harden-vol-9.jpg":     BASE + "AdidasHardenVol9-Cropped-650x406.jpg",
  "/shoes/adidas-harden-vol-10.jpg":    BASE + "AdidasHardenVol10-Cropped-650x406.jpg",
  "/shoes/adidas-harden-stepback-4.jpg": BASE + "AdidasHardenStepback4-Cropped-650x406.jpg",
  "/shoes/adidas-trae-young-3.jpg":     BASE + "AdidasTraeYoung3-Cropped-650x406.jpg",
  "/shoes/adidas-exhibit-a.jpg":        BASE + "AdidasExhibitA-Cropped-650x406.jpg",
  "/shoes/adidas-ownthegame-3.jpg":     BASE + "AdidasOwnthegame3-Cropped-650x406.jpg",

  // ── UNDER ARMOUR ─────────────────────────────────────────────────────
  "/shoes/ua-curry-11.jpg":             BASE + "UACurry11-Cropped-650x406.jpg",
  "/shoes/ua-curry-12.jpg":             BASE + "UACurry12-Cropped-650x406.jpg",
  "/shoes/ua-curry-13.jpg":             BASE + "UACurry13-Cropped-650x406.jpg",
  "/shoes/ua-curry-3z-25.jpg":          BASE + "UACurry3z25-Cropped-650x406.jpg",
  "/shoes/ua-lockdown-7.jpg":           BASE + "UALockdown7-Cropped-650x406.jpg",
  "/shoes/ua-spawn-7-mid.jpg":          BASE + "UASpawn7Mid-Cropped-650x406.jpg",
  "/shoes/ua-futr-x-4.jpg":             BASE + "UAFutrX4-Cropped-650x406.jpg",
  "/shoes/ua-flow-breakthru-4.jpg":     BASE + "UAFlowBreakthru4-Cropped-650x406.jpg",
  "/shoes/ua-jet-23.webp":              BASE + "UAJet23-Cropped-650x406.jpg",
  "/shoes/ua-hovr-havoc-5.webp":        BASE + "UAHOVRHavoc5-Cropped-650x406.jpg",

  // ── PUMA ─────────────────────────────────────────────────────────────
  "/shoes/puma-mb03.png":               BASE + "PumaMB03-Cropped-650x406.jpg",
  "/shoes/puma-mb-04.jpg":              BASE + "PumaMB04-Cropped-650x406.jpg",
  "/shoes/puma-mb05.jpg":               BASE + "PumaMB05-Cropped-650x406.jpg",
  "/shoes/puma-all-pro-nitro.jpg":      BASE + "PumaAllProNitro-Cropped-650x406.jpg",
  "/shoes/puma-all-pro-nitro-2.jpg":    BASE + "PumaAllProNitro2-Cropped-650x406.jpg",
  "/shoes/puma-stewie-4.jpg":           BASE + "PumaStewie4-Cropped-650x406.jpg",
  "/shoes/puma-scoot-zeros.jpg":        BASE + "PumaScootZeros-Cropped-650x406.jpg",
  "/shoes/puma-playmaker-pro-mid.jpg":  BASE + "PumaPlaymakerProMid-Cropped-650x406.jpg",
  "/shoes/puma-clyde-all-pro.jpg":      BASE + "PumaClydeAllPro-Cropped-650x406.jpg",

  // ── NEW BALANCE ───────────────────────────────────────────────────────
  "/shoes/nb-fresh-foam-bb-v3.jpg":     BASE + "NewBalanceFreshFoamBBv3-Cropped-650x406.jpg",
  "/shoes/nb-two-wxy-v4.png":           BASE + "NewBalanceTwoWXYv4-Cropped-650x406.jpg",
  "/shoes/nb-two-wxy-v5.jpg":           BASE + "NewBalanceTwoWXYv5-Cropped-650x406.jpg",
  "/shoes/nb-kawhi-1.jpg":              BASE + "NewBalanceKawhi1-Cropped-650x406.jpg",
  "/shoes/nb-kawhi-2.jpg":              BASE + "NewBalanceKawhi2-Cropped-650x406.jpg",
  "/shoes/nb-omn1s.jpg":                BASE + "NewBalanceOMN1S-Cropped-650x406.jpg",

  // ── ANTA ──────────────────────────────────────────────────────────────
  "/shoes/anta-kai-2.png":              WOW + "2024/10/ANTA-Kai-2-1.jpg",
  "/shoes/anta-kt-10.jpg":              WOW + "2023/09/ANTA-KT10-1.jpg",
  "/shoes/anta-kt-11.jpg":              WOW + "2024/10/ANTA-KT11-1.jpg",
  "/shoes/anta-shock-the-game-5.jpg":   WOW + "2024/06/ANTA-Shock-The-Game-5-1.jpg",
  "/shoes/anta-shock-wave-5.jpg":       WOW + "2024/06/ANTA-Shock-Wave-5-1.jpg",

  // ── LI-NING ───────────────────────────────────────────────────────────
  "/shoes/lining-wow-allcity-13.png":   WOW + "2024/10/LiNing-WoW-AllCity-13-1.jpg",
  "/shoes/lining-wow-12.jpg":           WOW + "2024/02/LiNing-WoW-12-1.jpg",
  "/shoes/lining-gamma-2.jpg":          WOW + "2024/03/LiNing-Gamma-2-1.jpg",
  "/shoes/lining-sonic-12.jpg":         WOW + "2024/05/LiNing-Sonic-12-1.jpg",
  "/shoes/lining-yu-shuai-18.jpg":      WOW + "2024/06/LiNing-YuShuai-18-1.jpg",

  // ── PEAK ──────────────────────────────────────────────────────────────
  "/shoes/peak-lou-williams-underground.jpg": WOW + "2024/04/Peak-Lou-Williams-Underground-1.jpg",
  "/shoes/peak-taichi-flash.jpg":        WOW + "2024/05/Peak-TaiChi-Flash-1.jpg",

  // ── OTROS ─────────────────────────────────────────────────────────────
  "/shoes/converse-all-star-pro-bb.jpg": BASE + "ConverseAllStarProBB-Cropped-650x406.jpg",
  "/shoes/reebok-question-mid.webp":     BASE + "ReebokQuestionMid-Cropped-650x406.jpg",
  "/shoes/reebok-answer-iv.jpg":         BASE + "ReebokAnswerIV-Cropped-650x406.jpg",
  "/shoes/decathlon-tarmak-fast-900.jpg": "https://contents.mediadecathlon.com/p2344023/k$bfd5a33e23e4fdfbdc76f4fcf48826db/sq/zapatillas-baloncesto-tarmak-fast-900.jpg",
  "/shoes/nb-two-wxy-v6.jpg":           BASE + "NewBalanceTwoWXYv6-Cropped-650x406.jpg",
};

const filePath = "./web/src/data/zapatillas.ts";
let content = fs.readFileSync(filePath, "utf8");

let replaced = 0;
let skipped = [];

for (const [local, external] of Object.entries(MAP)) {
  // Escape special regex chars in the local path
  const escaped = local.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escaped, "g");
  if (re.test(content)) {
    content = content.replace(new RegExp(escaped, "g"), external);
    replaced++;
  } else {
    skipped.push(local);
  }
}

fs.writeFileSync(filePath, content, "utf8");
console.log(`✅ Reemplazadas: ${replaced} imágenes`);
if (skipped.length) console.log(`⚠️  No encontradas (${skipped.length}):`, skipped.slice(0, 10));

// Verifica cuántas /shoes/ quedan
const remaining = (content.match(/imagen_principal: "\/shoes\//g) || []).length;
console.log(`📸 Rutas /shoes/ restantes: ${remaining}`);
