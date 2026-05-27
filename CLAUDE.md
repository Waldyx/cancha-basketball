# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-05-27 (sesión 12)
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

## Estado actual (sesión 12)

### ✅ Completado (sesión 12)
- **Fix bug CI**: blog/[slug].astro — Blog nav link añadido (estaba solo en breadcrumb, no en cz-nav)
- **Blog sidebar**: widget "Artículos relacionados" (misma categoría, ≤3) en sidebar de cada artículo
- **Shoe→blog linking**: sección "Artículos sobre esta zapatilla" en fichas de zapatilla → mejora enlazado interno
- **SEO page→blog**: sección "Del blog" en SEO landing pages (basada en relatedSeoPages de articles)
- **Blog index JSON-LD**: BreadcrumbList + ItemList para Google
- **3 artículos Análisis**: AE 3, Curry 13, Jordan Tatum 4 → **19 artículos total**
- **2 nuevas SEO pages**: Converse, Reebok → **32 SEO pages total**
- **Fix bug Puma duplicate**: eliminada segunda entrada marca("Puma") que generaba slug duplicado (error de build)
- **Fix URL New Balance**: slug generaba espacio → corregido a `mejores-zapatillas-new-balance`
- **blog/index.astro active**: añadido class="active" al link Blog en su propia página

### ✅ Completado (sesión 11)
- **CI fix**: eliminado paso "Deploy a Vercel" roto en `scrape-prices.yml` (error: cannot retrieve Project Settings). El git push ya activa Vercel automáticamente → 0 errores en próxima ejecución
- **Encoding fix**: corregidos **177 em-dashes** (`â€"` → `—`) y **62 euro signs** (`â‚¬` → `€`) en `zapatillas.ts` — textos de resumen/veredicto/pros/contras ahora muestran correctamente
- **Blog artículos 13-15**: GT Cut 4 análisis + niños 2025 + Tatum 4 vs AE 3 → 16 artículos
- **Nav: Blog añadido** a la navegación principal de las **16 páginas** del sitio
- **3 nuevas SEO pages**: Anta, Li-Ning, New Balance → **31 SEO pages total**
- **FAQ**: +4 preguntas (Anta KAI 2, New Balance, niños/jóvenes, GT Cut 4 principiantes) → **27 total**
- **robots.txt**: añadido `Allow` explícito para `/blog` y `/mis-zapas`

### ✅ Completado (sesión 10)
- **Blog artículo 11**: "Puma MB.04 vs MB.05 — LaMelo Ball 2025: ¿cuál comprar?" (Comparativa)
- **Blog artículo 12**: "Zapatillas de baloncesto para pie plano: guía 2025-2026" (Guías)
- **Nueva SEO page**: `/mejores-zapatillas-puma` — Puma brand page con guide y FAQs
- **Rankings mejorado**: +2 nuevas categorías: "Precio/Calidad" (score/precio ratio) y "Soporte tobillo" (8 categorías total)
- **TypeScript fixes**: 0 errores después de 6 correcciones (flyknit→knit, Fuente objects, mujer→women, etc.)
- **Precios Amazon ES actualizados**: LeBron 22, Sabrina 2, ANTA KAI 1, Curry 12
- **JD Sports**: URLs corregidas a `?q=` format, 7 zapas marcadas `disponible: false`
- **BETA badge eliminado** del hero de la home
- **CSS fix**: @import cancha-redesign.css movido antes de Tailwind (elimina warnings PostCSS)
- **FAQ ampliada**: +3 preguntas (Puma, pie plano, ranking precio/calidad) → 23 total
- **214 páginas** en producción

### ✅ Completado (sesión 9)
- **30 zapatillas retro** con badge 🏅, filtro chip, disclaimer y scores reales
  - Jordans: 1, 2, 3, 4, 5, 6, 7, 8, 11, 12, 13, 14
  - Nike: Kobe 4/5/6 Protro, Air Penny 1/2, Air More Uptempo, Zoom Generation, Air Force 1
  - Reebok: Shaq Attaq, Pump Omni Lite, Question Mid, Answer IV, Engine A
  - Converse: Chuck Taylor, Weapon
  - Adidas: Forum 84 · Puma: Clyde · Nike: Foamposite One
- **Chips de colección** en sidebar catálogo: Outdoor / Más ligeras / 🏅 Retro
- **Blog artículo 10**: "Mejores zapatillas retro para jugar 2025"
- **SEO page**: `/zapatillas-baloncesto-retro` — 29 retros, FAQs, guide
- **214 páginas** en producción (sesión 8: 212)

### ✅ Completado (sesiones anteriores)
- Web live en `canchazapa.com` con SSL
- Dominio registrado en GoDaddy, DNS apuntando a Vercel
- Google Search Console verificado + sitemap enviado
- Plausible Analytics configurado (dominio: `canchazapa.com`)
- Amazon Afiliados activo — **ID: `canchazapa-21`**, 73 links actualizados con tag
- AliExpress Portals ✅ activo — 13 links con tracking `default`
- Política de privacidad en `/privacidad`
- SEO mejorado: títulos, descriptions, JSON-LD Product en fichas
- JSON-LD Product: añadidos `shippingDetails` y `hasMerchantReturnPolicy` (fix GSC warnings)
- Breadcrumbs visuales en fichas de zapatilla
- Sección "Comprar ahora" con botones (Sprinter, Foot Locker, Amazon) en fichas
- Plausible tracking en clicks de afiliado ("Affiliate Click")
- Nav reordenado: **Quiz | Rankings | Catálogo | ♥ Mis zapas** (quiz primero)
- Footer global unificado en todas las páginas (FAQ | Metodología | Financiación | Privacidad)
- Jordan Brand → Jordan (unificado)
- **Encoding**: ✅ 1204 secuencias doble-encoding (Ã¡→á, â€"→—, etc.) corregidas
- **AliExpress**: 13 zapas de marcas chinas (Anta, Li-Ning, Peak) con links
- **Blog**: `/blog` con **14 artículos** editoriales
- **SEO pages**: 31 páginas (añadidas sesión 11: Anta, Li-Ning, New Balance)
- **FAQ**: ampliada de 8 → 20 preguntas
- **Quiz**: recency bonus 2025+, sort por precio cuando prioridad=precio
- **Vercel Root Directory**: arreglado a `web` (era `./`, causaba todos los deploy failures)
- **Logo CANCHA.ZAPA**: creado `/public/logo-cancha-zapa.svg` (400×400, para Awin profile)
- **Favicon**: rediseñado `/public/favicon.svg` (CZ minimalista, legible a 16px)
- **Awin Publisher ID 2908587**: ✅ cuenta activa, varios programas aprobados:
  - ✅ **Decathlon ES** (aid: 105405, ~6%)
  - ✅ **Snipes EU** (aid: 122628, ~5%)
  - ⏳ Pendientes: El Corte Inglés, Foot Locker, JD Sports, adidas, Sprinter, Zalando, Reebok
- **Afiliado ordering**: tiendas ordenadas por comisión cuando precio igual (±€0.50)
- **COMISIONES_TIENDA** actualizado en `scoring.ts` con rates 2026
- **Imágenes**: ✅ 120/138 zapas con imagen local en `/public/shoes/`
  - ballershoesdb bloqueaba hotlinking → imágenes descargadas localmente
  - 3 zapas con placeholder (puma-mb-06 no lanzada, jordan-super-fly-10, nike-kd-19)
  - ~15 zapas usan `/placeholder-shoe.svg` (modelos sin imagen conocida)

### 🟡 Pendiente
- **Awin**: esperar aprobaciones → El Corte Inglés (EPC €13.99, prioritario), Foot Locker, JD Sports, adidas, Sprinter, Zalando, Reebok
- **StockX Impact Radius**: pendiente aplicar
- **Puma EU CJ Affiliate**: pendiente aprobación
- **Precios reales**: precios son editoriales, no scrapeados
- **Recordatorio diario**: configurado para Amazon ES y JD Sports manual
- **Imágenes placeholder** (19 zapas):
  - No lanzadas aún: jordan-super-fly-10, nike-kd-19, puma-mb-06 (Q3 2026)
  - Retros sin imagen en ballershoesdb: converse-weapon, nike-air-penny-1, adidas-forum-84, reebok-pump-omni-lite
  - Modernas: ua-flow-breakthru-5, converse-shai-001, nike-giannis-immortality-5, adidas-exhibit-b, jordan-super-fly-8, adidas-trae-young-4, nike-gt-jump-3, nb-two-wxy-v6, adidas-ownthegame-2, ua-assert-10, nike-kobe-9-low-protro, decathlon-tarmak-voltzy-500

---

## Arquitectura de datos

### Archivo principal: `web/src/data/zapatillas.ts`
- Array `_rawZapatillas` con **138 zapas** (sesión 7)
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
| Catálogo | `/zapatillas` | ✅ 138 modelos |
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
| Blog | `/blog` + `/blog/[slug]` | ✅ 8 artículos |
| 404 | `/404` | ✅ |

---

## Afiliados

### Amazon ✅ ACTIVO
- **ID**: `canchazapa-21`
- **Panel**: https://afiliados.amazon.es
- **Formato link**: `https://www.amazon.es/s?k=MODELO&tag=canchazapa-21`
- **Cobro**: depósito directo en Banco Santander, mínimo 25€
- **Estado**: ✅ 73 links actualizados con tag, `tiene_afiliado: true`

### Awin ✅ ACTIVO — Publisher ID: 2908587
- **Panel**: https://ui.awin.com
- **Programas aprobados**:
  - ✅ **Decathlon ES** — aid: 105405, ~6%, formato Awin
  - ✅ **Snipes EU** — aid: 122628, ~5%, formato Awin
- **Programas pendientes** (ya solicitados):
  - ⏳ El Corte Inglés (EPC €13.99 — prioritario)
  - ⏳ Foot Locker ES
  - ⏳ JD Sports ES (~5%)
  - ⏳ adidas ES (~8%)
  - ⏳ Sprinter ES
  - ⏳ Zalando ES (~4-6%)
  - ⏳ Reebok ES (~6%)
- **Formato link Awin**: `https://www.awin1.com/cread.php?awinmid=AIDID&awinaffid=2908587&ued=URL_ENCODED_URL`

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
Quiz | Rankings | Catálogo | ♥ Mis zapas
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
- ✅ 120/138 zapas con imagen local `/shoes/{slug}.ext`
- ⚠️ ballershoesdb.com bloquea hotlinking desde canchazapa.com (403) → imágenes descargadas localmente
- ❌ 3 zapas con placeholder (no tienen imagen): `puma-mb-06` (no lanzada), `jordan-super-fly-10`, `nike-kd-19`
- ~15 zapas con `/placeholder-shoe.svg` (sin imagen conocida)
- Script `update-images.js` en raíz del repo para migrar URLs externas → locales

### Cómo añadir imagen nueva
1. Buscar imagen en ballershoesdb.com o weartesters.com (sin Referer header)
2. Descargar a `web/public/shoes/{slug}.jpg`
3. Actualizar `imagen_principal` en `zapatillas.ts` a `/shoes/{slug}.jpg`

---

## SEO

### JSON-LD por tipo de página
- **Fichas zapatilla**: Product completo (precio, rating, shippingDetails, hasMerchantReturnPolicy)
- **SEO pages**: FAQPage + BreadcrumbList + ItemList
- **Todas**: BreadcrumbList visual (`cz-breadcrumbs`)

### Títulos optimizados
- Fichas: `Nike LeBron 22 (2024) · Análisis y mejor precio | CANCHA.ZAPA`
- Rankings: `Top 10 Mejores Zapatillas de Baloncesto 2026 | Rankings CANCHA.ZAPA`
- Catálogo: `Catálogo de zapatillas de baloncesto | 138 modelos analizados`

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

Último push: 2026-05-27 (sesión 12)
Web live: canchazapa.com ✅

## Blog artículos (19)
1. Cómo elegir zapatillas de baloncesto (Guía)
2. AE 3 vs Ja 3 — guards 2025 (Comparativa)
3. Air Jordan 40 análisis (Análisis)
4. Mejores zapatillas para pívots 2025-2026 (Guía)
5. Mejores zapatillas outdoor 2025 (Guía)
6. Zapatillas pie ancho 2025 (Guía)
7. Zapatillas para tobillo/esguince 2025 (Guía)
8. GT Cut 4 vs Curry 13 vs ANTA Kai 2 — explosivos (Comparativa)
9. Mejores zapatillas baratas 2025 (Guía)
10. Mejores zapatillas retro para jugar 2025 (Guía)
11. Puma MB.04 vs MB.05 (Comparativa)
12. Zapatillas baloncesto pie plano 2026 (Guías)
13. Jordan Tatum 4 vs AE 3 — aleros 2025 (Comparativa)
14. Nike GT Cut 4 análisis (Análisis)
15. Zapatillas niños y jóvenes 2025 (Guía)
16. Zapatillas baloncesto pie plano 2026 (Guía)
17. Adidas AE 3 análisis completo (Análisis)
18. Under Armour Curry 13 análisis (Análisis)
19. Jordan Tatum 4 análisis (Análisis)

## SEO pages (32)
Posición (5): base, escolta, alero, ala-pivot, pivot
Cancha (2): outdoor, indoor
Categoría (4): cushion, reactivas, equilibradas, traccion
Presupuesto (3): baratas, 130€, premium
Lesión (3): rodillas, tobillos, pie-ancho
Marca (9): Nike, Jordan, Adidas, Puma, Anta, Li-Ning, New Balance, Converse, Reebok
Manual (6): Under Armour, mujer, junior, retro, talla-grande, mejores-2025

## Nuevas zapas sesión 7
- `nike-kobe-9-high-protro` — Kobe signature, high-top, Zoom Air, 199€
- `jordan-super-fly-10` — pívots, high-top, Zoom Air Strobel, 159€
- `puma-mb-06` — LaMelo Ball, Nitro foam, low-top, 139€
- `adidas-pro-vision` — budget mid-top, Cloudfoam, outdoor, 74€

## Scripts de mantenimiento
- `update-images.js` — migra URLs externas de `imagen_principal` a rutas `/shoes/` locales (usar cuando se añadan imágenes nuevas a `web/public/shoes/`)
- `fix-encoding.js` — corrige doble-encoding UTF-8/Latin-1 en zapatillas.ts

## Tiendas y comisiones (COMISIONES_TIENDA en scoring.ts)
```
aliexpress: 7%    decathlon: 6%    snipes_eu: 5%    puma_es: 6%
reebok_es: 6%     ua_es/nb_es/nike_es/adidas_es/jd_sports_es/zalando_es/sprinter_es: 5%
basket_world/kickscrew: 5%    footlocker_es/basket4ballers_es/manelsanchez_es/fuikaomar_es: 4%
amazon_es: 3%     idealo_es: 0%
```
Ordenación: precio primero, desempate por comisión dentro de ±€0.50

## Calling Mike (OpenRouter) desde PowerShell
```powershell
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$bytes = [System.Text.Encoding]::UTF8.GetBytes($bodyJson)
$req = [System.Net.WebRequest]::Create("https://openrouter.ai/api/v1/chat/completions")
$req.Method = "POST"; $req.ContentType = "application/json; charset=utf-8"
$req.Headers.Add("Authorization", "Bearer $apiKey")
$req.ContentLength = $bytes.Length
$stream = $req.GetRequestStream(); $stream.Write($bytes,0,$bytes.Length); $stream.Close()
$resp = $req.GetResponse()
$reader = New-Object System.IO.StreamReader($resp.GetResponseStream(), [System.Text.Encoding]::UTF8)
$result = $reader.ReadToEnd() | ConvertFrom-Json
$result.choices[0].message.content
```
Modelo: `openai/gpt-oss-120b:free` | API key: ver `~/.openclaw/openclaw.json`
