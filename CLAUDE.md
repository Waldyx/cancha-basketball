# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-05-25 (sesión 5)
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

## Estado actual (sesión 5)

### ✅ Completado
- Web live en `canchazapa.com` con SSL
- Dominio registrado en GoDaddy, DNS apuntando a Vercel
- Google Search Console verificado + sitemap enviado
- Plausible Analytics configurado (dominio: `canchazapa.com`)
- Amazon Afiliados activo — **ID: `canchazapa-21`**, 73 links actualizados con tag
- Awin solicitado (pendiente aprobación)
- AliExpress Portals solicitado (pendiente aprobación, 1h-2 días)
- Política de privacidad en `/privacidad`
- SEO mejorado: títulos, descriptions, JSON-LD Product en fichas
- JSON-LD Product: añadidos `shippingDetails` y `hasMerchantReturnPolicy` (fix GSC warnings)
- Breadcrumbs visuales en fichas de zapatilla
- Sección "Comprar ahora" con botones (Sprinter, Foot Locker, Amazon) en fichas
- Plausible tracking en clicks de afiliado ("Affiliate Click")
- Nav simplificado: solo Rankings | Catálogo | Quiz | ♥ Mis zapas
- Footer global unificado en todas las páginas (FAQ | Metodología | Financiación | Privacidad)
- Footers custom eliminados de todas las páginas internas
- Jordan Brand → Jordan (unificado)
- **Imágenes**: 130 zapas con imagen real (4 nuevas con URLs externas)
- **AliExpress**: 13 zapas de marcas chinas (Anta, Li-Ning, Peak) con links a AliExpress
- **Nuevas zapas 2025** (sesión 6): Nike KD 19, Air Jordan 40, Adidas Dame X, UA D. Fox 2
- **Blog**: `/blog` con 5 artículos editoriales (guías, comparativas, análisis)
- **SEO pages**: 25 páginas (añadidas: UA, Puma, Mujer, Junior, Mejores 2025)
- **Quiz**: recency bonus 2025+, sort por precio cuando prioridad=precio, contador de matches en resultados

### 🟡 Pendiente
- **Awin**: esperar aprobación → solicitar de golpe: Sprinter, Foot Locker, Zalando, JD Sports, Nike, Adidas, Puma, Decathlon
- **AliExpress Portals**: ✅ completado — 13 links activos con tracking `default`
- **Precios reales**: precios son editoriales, no scrapeados
- **Plausible**: verificar que trackea visitas correctamente

---

## Arquitectura de datos

### Archivo principal: `web/src/data/zapatillas.ts`
- Array `_rawZapatillas` con ~126 zapas
- Función `mergePricesIntoShoes()` fusiona precios del scraper
- Exporta `zapatillas`, `getZapatillaBySlug()`, `getAllZapatillas()`
- Campo afiliados: `links_compra[].tiene_afiliado` — `true` para Amazon (activo), `false` para el resto (pendiente)

### Tipos: `web/src/lib/types.ts`
- `Zapatilla` — entidad principal
- `LinkCompra` — tienda, url, precio_actual, disponible, tiene_afiliado, ultima_verificacion
- `Tienda` — incluye: `sprinter_es`, `footlocker_es`, `amazon_es`, `aliexpress`, etc.
- `RespuestasQuiz` — respuestas del quiz (10 preguntas)

---

## Páginas

| Página | Ruta | Estado |
|--------|------|--------|
| Home | `/` | ✅ |
| Catálogo | `/zapatillas` | ✅ 130 modelos |
| Quiz | `/quiz` | ✅ 10 pasos |
| Resultados | `/resultados` | ✅ |
| Detalle zapatilla | `/zapatilla/[slug]` | ✅ + JSON-LD Product completo |
| Comparador | `/comparar` | ✅ |
| Rankings | `/rankings` | ✅ |
| Metodología | `/metodologia` | ✅ |
| Financiación | `/financiacion` | ✅ |
| FAQ | `/faq` | ✅ |
| Guía de tallas | `/guia-tallas` | ✅ |
| Privacidad | `/privacidad` | ✅ |
| SEO pages (25) | `/mejores-zapas-*`, `/zapatillas-*` | ✅ |
| Blog | `/blog` + `/blog/[slug]` | ✅ 3 artículos |
| 404 | `/404` | ✅ |

---

## Afiliados

### Amazon ✅ ACTIVO
- **ID**: `canchazapa-21`
- **Panel**: https://afiliados.amazon.es
- **Formato link**: `https://www.amazon.es/s?k=MODELO&tag=canchazapa-21`
- **Cobro**: depósito directo en Banco Santander, mínimo 25€
- **Estado**: ✅ 73 links actualizados con tag, `tiene_afiliado: true`

### Awin ⏳ PENDIENTE APROBACIÓN
- **Panel**: https://ui.awin.com
- **Estado**: solicitado, esperando email
- **Cuando aprueben — solicitar TODOS estos programas de golpe**:
  - Sprinter ES
  - Foot Locker ES
  - Zalando ES (~4-6%, 30 días)
  - JD Sports ES (~5%, 30 días)
  - Nike.com ES (~7%, 30 días)
  - Adidas.es (~8%, 30 días)
  - Puma ES (~7%, 30 días)
  - Decathlon ES (~3-9%, 30 días)
- Si no hay respuesta en unos días, escribir a: global-approvals@awin.com

### AliExpress Portals ✅ ACTIVO
- **Panel**: https://portals.aliexpress.com
- **Tracking ID**: `default`
- **Estado**: ✅ aprobado 2026-05-25, 13 links actualizados con `tiene_afiliado: true`
- **Comisión**: ~4-9%, cookie 3 días
- **Uso**: SOLO para marcas chinas (Anta, Li-Ning, Peak, Way of Wade)
- **Formato link**: `https://s.click.aliexpress.com/e/_XXXXX`
- **Zapas con AliExpress** (13): anta-kai-1-speed, lining-wow-allcity-13, anta-kai-2, anta-kt-10, lining-wow-12, peak-lou-williams-underground, anta-shock-the-game-5, lining-gamma-2, anta-kt-11, lining-sonic-12, peak-taichi-flash, anta-shock-wave-5, lining-yu-shuai-18

### Tiendas sin programa de afiliados (no añadir)
- El Corte Inglés — sin programa público
- Basket World — sin programa
- AliExpress — SÍ usar pero SOLO para marcas chinas (originales)

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
Rankings | Catálogo | Quiz | ♥ Mis zapas
```

### Footer global (Base.astro)
```
FAQ | Metodología | Financiación | Privacidad
```

---

## Imágenes

### Fuentes usadas
- `https://ballershoesdb.com/wp-content/uploads/` — fuente principal
- `https://weartesters.com/wp-content/uploads/` — fallback
- `https://wowsole.com/wp-content/uploads/` — Li-Ning y otros
- `https://cdn.runrepeat.com/` — fuente secundaria
- `https://d3pnpe87i1fkwu.cloudfront.net/` — algunas Nike

### Estado
- ✅ 126 zapas con imagen real
- ✅ 0 placeholders
- `jordan-super-fly-10` → corregido a `jordan-super-fly-8`
- `nike-pg-7` → eliminado (modelo no existe)

---

## SEO

### JSON-LD por tipo de página
- **Fichas zapatilla**: Product completo (precio, rating, shippingDetails, hasMerchantReturnPolicy)
- **SEO pages**: FAQPage + BreadcrumbList + ItemList
- **Todas**: BreadcrumbList visual (`cz-breadcrumbs`)

### Títulos optimizados
- Fichas: `Nike LeBron 22 (2024) · Análisis y mejor precio | CANCHA.ZAPA`
- Rankings: `Top 10 Mejores Zapatillas de Baloncesto 2026 | Rankings CANCHA.ZAPA`
- Catálogo: `Catálogo de zapatillas de baloncesto | 126 modelos analizados`

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

Último push: 2026-05-26 (sesión 7)
Web live: canchazapa.com ✅

## Blog artículos (5)
1. Cómo elegir zapatillas de baloncesto (Guía)
2. AE 3 vs Ja 3 — guards 2025 (Comparativa)
3. Air Jordan 40 análisis (Análisis)
4. Mejores zapatillas para pívots 2025-2026 (Guía) — generado con Mike/OpenRouter
5. GT Cut 4 vs Curry 13 vs ANTA Kai 2 — explosivos (Comparativa) — generado con Mike/OpenRouter
