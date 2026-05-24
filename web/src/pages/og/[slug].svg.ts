// /og/[slug].svg — Open Graph image dinámica por zapatilla
//
// Genera un SVG 1200×630 con datos de cada zapa: marca, modelo, score,
// precio, categoría. Se sirve como /og/<slug>.svg desde <meta property="og:image">
// en la página de detalle.
//
// SVG funciona en todos los crawlers modernos (Twitter, Facebook, WhatsApp,
// LinkedIn). Si necesitas PNG en algún lado, conviértelo en build con sharp.

import { zapatillas } from "../../data/zapatillas";
import { findMejorPrecio } from "../../lib/scoring";

export const getStaticPaths = () =>
  zapatillas.map((z) => ({ params: { slug: z.slug } }));

const CAT_LABELS: Record<string, string> = {
  "cushion-focused": "Cushion",
  "responsive":      "Reactiva",
  "balanced":        "Equilibrada",
  "traction-king":   "Traccion",
};
const CAT_ACCENT: Record<string, string> = {
  "cushion-focused": "#38bdf8",
  "responsive":      "#facc15",
  "balanced":        "#d4d4d8",
  "traction-king":   "#fb923c",
};

function escape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export const GET = ({ params }: { params: Record<string, string> }) => {
  const z = zapatillas.find((x) => x.slug === params.slug);
  if (!z) return new Response("Not found", { status: 404 });

  const score = Math.round((Object.values(z.puntuaciones).reduce((a, b) => a + b, 0) / 8) * 10) / 10;
  const mejor = findMejorPrecio(z.links_compra);
  const precio = mejor?.precio_actual ?? z.precio_msrp_eur;
  const ahorro = mejor && mejor.precio_actual < z.precio_msrp_eur
    ? Math.round((1 - mejor.precio_actual / z.precio_msrp_eur) * 100)
    : 0;
  const cat = CAT_ACCENT[z.categoria_principal] ?? "#f97316";
  const catLabel = CAT_LABELS[z.categoria_principal] ?? z.categoria_principal;

  // Truncate model name if too long for hero text
  const modelo = z.modelo.length > 18 ? z.modelo.slice(0, 16) + "…" : z.modelo;

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <!-- Background -->
  <rect width="1200" height="630" fill="#0c0c0c"/>

  <!-- Subtle radial spotlight -->
  <defs>
    <radialGradient id="spot" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#1a1a1d"/>
      <stop offset="100%" stop-color="#0c0c0c"/>
    </radialGradient>
    <linearGradient id="topStrip" x1="0" y1="0" x2="100%" y2="0">
      <stop offset="0%" stop-color="#f97316"/>
      <stop offset="50%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#f97316"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#spot)"/>

  <!-- Top brand strip -->
  <rect x="0" y="0" width="1200" height="6" fill="url(#topStrip)"/>

  <!-- Court line motif (right side, low opacity) -->
  <g transform="translate(800,80)" fill="none" stroke="${cat}" stroke-width="2" opacity="0.18">
    <rect x="0" y="0" width="380" height="480" rx="2"/>
    <line x1="0" y1="120" x2="380" y2="120"/>
    <circle cx="190" cy="120" r="65"/>
    <rect x="115" y="0" width="150" height="160"/>
    <circle cx="190" cy="32" r="14"/>
  </g>

  <!-- Logo wordmark -->
  <text x="60" y="92" font-family="system-ui, -apple-system, 'Segoe UI', sans-serif"
        font-size="36" font-weight="900" fill="#ffffff" letter-spacing="-2">CANCHA<tspan fill="#f97316">.</tspan>ZAPA</text>

  <!-- Eyebrow -->
  <text x="60" y="200" font-family="system-ui, sans-serif" font-size="22" font-weight="900"
        fill="#f97316" letter-spacing="4">★ ${escape(catLabel.toUpperCase())} · ${z.año_lanzamiento}</text>

  <!-- Brand -->
  <text x="60" y="252" font-family="system-ui, sans-serif" font-size="28" font-weight="700"
        fill="#a1a1aa" letter-spacing="5">${escape(z.marca.toUpperCase())}</text>

  <!-- Model name (big) -->
  <text x="60" y="370" font-family="'Barlow Condensed', 'Inter Black', system-ui, sans-serif"
        font-size="108" font-weight="900" fill="#ffffff" letter-spacing="-5">${escape(modelo.toUpperCase())}</text>

  <!-- Score chip -->
  <g transform="translate(60,440)">
    <rect x="0" y="0" width="120" height="58" fill="#f97316"/>
    <text x="60" y="42" font-family="'Barlow Condensed', system-ui, sans-serif" font-size="36"
          font-weight="900" fill="#0c0c0c" text-anchor="middle">${score}/10</text>
  </g>
  <text x="200" y="465" font-family="system-ui, sans-serif" font-size="14" font-weight="900"
        fill="#71717a" letter-spacing="3">SCORE CANCHA</text>
  <text x="200" y="488" font-family="system-ui, sans-serif" font-size="13" font-weight="700"
        fill="#a1a1aa">Media ponderada · ${z.fuentes.length || 1} fuente${z.fuentes.length === 1 ? "" : "s"}</text>

  <!-- Price chip -->
  <g transform="translate(60,520)">
    <text x="0" y="42" font-family="'Barlow Condensed', system-ui, sans-serif" font-size="56"
          font-weight="900" fill="#f97316">${Math.round(precio)}€</text>
    ${ahorro > 0 ? `
    <text x="155" y="42" font-family="system-ui, sans-serif" font-size="18" font-weight="700"
          fill="#52525b" text-decoration="line-through">${z.precio_msrp_eur}€</text>
    <text x="265" y="42" font-family="system-ui, sans-serif" font-size="20" font-weight="900"
          fill="#4ade80">−${ahorro}%</text>
    ` : ""}
    <text x="0" y="70" font-family="system-ui, sans-serif" font-size="14" font-weight="700"
          fill="#71717a" letter-spacing="2">${mejor ? "PRECIO VERIFICADO" : "PRECIO EDITORIAL"}</text>
  </g>

  <!-- Bottom tagline -->
  <text x="60" y="615" font-family="system-ui, sans-serif" font-size="16" font-weight="700"
        fill="#52525b" letter-spacing="2">SIN SESGO · SIN BS · 100% HONESTO</text>
  <text x="1140" y="615" font-family="system-ui, sans-serif" font-size="16" font-weight="700"
        fill="#52525b" letter-spacing="2" text-anchor="end">cancha.zapa</text>

  <!-- Bottom strip -->
  <rect x="0" y="624" width="1200" height="6" fill="${cat}"/>
</svg>`;

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=86400",
    },
  });
};
