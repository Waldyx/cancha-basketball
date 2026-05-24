# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-05-24 (sesión 4)
> Para Claude: lee esto al empezar una sesión nueva. Cubre todo lo importante.

---

## ¿Qué es esto?

Web de catálogo y recomendación de zapatillas de baloncesto para el mercado español.
Stack: **Astro + TypeScript + Tailwind CSS**, desplegado en **Vercel** vía GitHub Actions.

**Repo**: `C:\Users\oswal\Desktop\AI\Proyectos\Basketball Shoe Tracker`
**Web**: `C:\Users\oswal\Desktop\AI\Proyectos\Basketball Shoe Tracker\web`
**Dev server**: `localhost:4321`
**Vercel**: auto-deploy en cada push a `master`
**URL producción**: `https://canchazapa.com` ✅ LIVE
**URL Vercel**: `https://web-puce-chi-60.vercel.app` (alias)

---

## Nombre del proyecto

**CANCHA.ZAPA** — el logo se renderiza como:
```html
CANCHA<span class="text-orange-500">.</span>ZAPA
```
"CANCHA" blanco, punto naranja, "ZAPA" blanco.

---

## Estado actual (sesión 4)

### ✅ Completado
- Web live en `canchazapa.com` con SSL
- Dominio registrado en GoDaddy, DNS apuntando a Vercel
- Google Search Console verificado + sitemap enviado
- Plausible Analytics configurado (dominio: `canchazapa.com`)
- Amazon Afiliados activo — **ID: `canchazapa-21`**
- Awin solicitado (pendiente aprobación por email)
- Política de privacidad en `/privacidad`
- SEO mejorado: títulos, descriptions, JSON-LD Product en fichas
- Breadcrumbs visuales en fichas de zapatilla
- Sección "Comprar ahora" con 3 botones (Sprinter, Foot Locker, Amazon) en fichas
- Plausible tracking en clicks de afiliado ("Affiliate Click")
- Nav: Rankings primero en todas las páginas
- Enlace activo del nav en naranja en todas las páginas
- Jordan Brand → Jordan (unificado)
- Filtro "Nuevas (2026)" actualizado

### 🟡 Pendiente
- **Awin**: esperar email de aprobación → solicitar Sprinter y Foot Locker
- **Links Amazon**: añadir `tag=canchazapa-21` a los links de amazon_es en `zapatillas.ts`
  - Formato: `https://www.amazon.es/s?k=nike+lebron+22&tag=canchazapa-21`
- **Imágenes rotas**: 28 zapas siguen con `/placeholder-shoe.svg` (ballershoesdb no las tiene)
- **Precios reales**: precios son editoriales, no scrapeados
- **Sitemap Google**: re-verificar en 24-48h (DNS estaba propagando)
- **Plausible**: verificar en 24h que trackea visitas correctamente

---

## Arquitectura de datos

### Archivo principal: `web/src/data/zapatillas.ts`
- Array `_rawZapatillas` con ~124 zapas
- Función `mergePricesIntoShoes()` fusiona precios del scraper
- Exporta `zapatillas`, `getZapatillaBySlug()`, `getAllZapatillas()`
- Campo afiliados: `links_compra[].tiene_afiliado` — cambiar a `true` + URL de afiliado cuando tengas los links

### Tipos: `web/src/lib/types.ts`
- `Zapatilla` — entidad principal
- `LinkCompra` — tienda, url, precio_actual, disponible, tiene_afiliado, ultima_verificacion
- `Tienda` — incluye: `sprinter_es`, `footlocker_es`, `amazon_es`, etc.
- `RespuestasQuiz` — respuestas del quiz (10 preguntas)

---

## Páginas

| Página | Ruta | Estado |
|--------|------|--------|
| Home | `/` | ✅ |
| Catálogo | `/zapatillas` | ✅ 124 modelos |
| Quiz | `/quiz` | ✅ 10 pasos |
| Resultados | `/resultados` | ✅ |
| Detalle zapatilla | `/zapatilla/[slug]` | ✅ + JSON-LD Product |
| Comparador | `/comparar` | ✅ |
| Rankings | `/rankings` | ✅ |
| Metodología | `/metodologia` | ✅ |
| Financiación | `/financiacion` | ✅ |
| FAQ | `/faq` | ✅ |
| Guía de tallas | `/guia-tallas` | ✅ |
| Privacidad | `/privacidad` | ✅ |
| SEO pages (20) | `/mejores-zapas-*` | ✅ |
| 404 | `/404` | ✅ |

---

## Afiliados

### Amazon
- **ID**: `canchazapa-21`
- **Panel**: https://afiliados.amazon.es
- **Formato link**: `https://www.amazon.es/s?k=MODELO&tag=canchazapa-21`
- **Cobro**: depósito directo en Banco Santander, mínimo 25€
- **Estado**: ✅ activo, pendiente añadir links en zapatillas.ts

### Awin (Sprinter + Foot Locker)
- **Panel**: https://ui.awin.com
- **Estado**: ⏳ pendiente aprobación por email
- Una vez aprobado: ir a Awin → buscar Sprinter → Join Program → generar deeplinks

### Cómo añadir links de afiliado en zapatillas.ts
```typescript
// En links_compra de cada zapatilla:
{
  tienda: "amazon_es",
  url: "https://www.amazon.es/s?k=nike+gt+cut+4&tag=canchazapa-21",  // ← añadir &tag=
  precio_actual: 130,
  disponible: true,
  tiene_afiliado: true,  // ← cambiar a true
  ultima_verificacion: "2026-05-24",
}
```

---

## Quiz — 10 pasos

1. Perfil (hombre/mujer/junior)
2. Posición (base/escolta/alero/ala-pivot/pivot)
3. Peso (menos-70 / 70-85 / 85-100 / mas-100 kg)
4. Estilo (explosivo/equilibrado/potente/tirador)
5. Cancha (interior/exterior/mixto)
6. Lesiones (rodillas/tobillos/fascia — multi-select, auto-avance 700ms)
7. Prioridad (proteccion/reactividad/soporte-tobillo/durabilidad/precio)
8. Presupuesto (80/130/180/null €)
9. Ancho de pie (normal/ancho/no-se)
10. Uso (competicion/entrenamiento/ambos — auto-submit 400ms)

---

## Design System

### CSS: `web/src/styles/cancha-redesign.css`
Importado en `web/src/styles/global.css` → disponible en TODAS las páginas.

### Clases principales
- **Header**: `cz-strip` + `cz-header` + `cz-header-inner` + `cz-logo` + `cz-nav`
- **Nav activo**: `class="active"` → color naranja `#f97316`
- **Cards**: `cz-card`, `cz-card-img`, `cz-card-body`, `cz-badge`
- **Breadcrumbs**: `cz-breadcrumbs`
- **SEO pages**: `seo-*`
- **Rankings**: `rk-*`

### Nav orden (todas las páginas)
```
Rankings | Catálogo | Quiz | Método | FAQ | ♥ Mis zapas
```

---

## Imágenes

### Fuente principal
`https://ballershoesdb.com/wp-content/uploads/[NombreModelo]-Cropped-650x406.jpg`

### Estado
- ~96 zapas tienen imagen real
- 28 zapas con `/placeholder-shoe.svg` (no encontradas en ballershoesdb)
- Placeholder: SVG oscuro con 🏀 y "Sin imagen"

### Zapas sin imagen (28)
```
nike-lebron-22, nike-sabrina-2, anta-kai-1-speed, nike-kd-18,
jordan-luka-3, nike-kyrie-low-5, jordan-one-take-5, nike-zoom-freak-6,
puma-mb03, adidas-ae-1, nb-two-wxy-v4, nike-pg-6, nike-pg-7,
nike-don-issue-6, puma-scoot-zeros-3, nike-kyrie-infinity-2, ua-jet-23,
nike-air-max-impact-5, li-ning-sonic-12, nike-gt-run-2, nike-gt-jump-2,
nike-kyrie-flytrap-6, ua-hovr-havoc-5, nike-air-zoom-crossover-2,
li-ning-yu-shuai-18, converse-all-star-pro-bb, nb-kawhi-1, anta-shock-wave-5
```

---

## SEO

### JSON-LD por tipo de página
- **Fichas zapatilla**: Product (precio, rating, oferta)
- **SEO pages**: FAQPage + BreadcrumbList + ItemList
- **Todas**: BreadcrumbList visual (`cz-breadcrumbs`)

### Títulos optimizados
- Fichas: `Nike LeBron 22 (2024) · Análisis y mejor precio | CANCHA.ZAPA`
- Rankings: `Top 10 Mejores Zapatillas de Baloncesto 2026 | Rankings CANCHA.ZAPA`
- Catálogo: `Catálogo de zapatillas de baloncesto | 124 modelos analizados`

---

## Deploy

```yaml
# .github/workflows/deploy.yml
on: push → master
working-directory: web
steps: npm ci → npx vercel --prod
```
Secrets en GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

**Nota**: Si el deploy falla con "token not valid", renovar `VERCEL_TOKEN` en:
- Vercel → Account → Tokens → crear nuevo
- GitHub → Settings → Secrets → VERCEL_TOKEN → Update

---

## Flujo de trabajo con Mike (LLM local)

**Mike** = modelo LLM en OpenClaw Control (`http://127.0.0.1:18789`)

### Modelos disponibles (OpenRouter free)
- **GPT-OSS 120B (Free)** → `openai/gpt-oss-120b:free` ← usar este
- **qwen3.5:9b** → local via Ollama (fallback sin internet)

### API key OpenRouter
```
sk-or-v1-[REDACTED — ver ~/.openclaw/openclaw.json]
```

---

## Diseño

- **Colores**: fondo `#09090b` / naranja `#f97316` / amarillo `#facc15`
- **Tipografía**: Barlow Condensed bold/black uppercase
- **Hero**: fondo SVG con líneas de cancha (`/public/bg-court.svg`)

---

## localStorage / sessionStorage

- `cz.favs` — zapatillas favoritas
- `cz.cookies.v1` — consentimiento cookies
- `cz.pricealerts` — alertas de precio
- `cancha-quiz-respuestas` (sessionStorage) — respuestas quiz → resultados

---

Último push: 2026-05-24
Web live: canchazapa.com ✅
