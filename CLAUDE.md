# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-06-03 (sesión 19)
> Para Claude: lee esto al empezar una sesión nueva. Cubre todo lo importante.

---

## Reglas de edición (para Claude)

> Basadas en las "Karpathy skills". Este proyecto es grande (182 zapas en un
> solo archivo, comentarios con caracteres delicados). Sigue estas reglas SIEMPRE:

1. **Cambios quirúrgicos**: edita SOLO lo que pide la tarea. No "mejores" código,
   comentarios ni formato no relacionados. No refactorices lo que funciona. Respeta
   el estilo existente. En `zapatillas.ts`, edita haciendo match del `id:`/código,
   NUNCA de las líneas de comentario (tienen box-drawing chars que rompen el match).
2. **Simplicidad**: el mínimo código que resuelve lo pedido. Sin features
   especulativas ni abstracciones de un solo uso.
3. **Piensa antes**: si algo es ambiguo, di tus suposiciones y pregunta. Propón la
   alternativa más simple antes de lanzarte.
4. **Objetivos verificables**: convierte tareas vagas en criterios comprobables
   (ej. "el scraper saca un precio > 0") e itera hasta cumplirlos.

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

## Estado actual (sesión 19)

### ✅ Completado (sesión 19) — Precios retros + fixes afiliados

**Retros actualizadas con links reales (jun 2026):**
- `air-jordan-1`: 7 links (ECI 70€, BE 84€, Zalando 105€, Snipes Mid+Low ✅, JD 185€, Amazon 190€)
- `air-jordan-4`: 4 links (Foot District 158€, BE 180€, Snipes 210€ ✅, Amazon 230€ ✅)
- `air-jordan-11`: 6 links (Snipes High 170€ ✅, Zalando 185€, Decathlon 188€ ✅, Snipes Low 200€ ✅, FL 220€, JD 220€, Amazon 240€ ✅)
- `nike-air-force-1`: 5 links (Snipes Low 90€ ✅, Zalando 104€, Amazon 110€ ✅, FL 130€, Nike.es 120€)
- `converse-chuck-taylor`: 6 links (Decathlon 43€ ✅, Atmósfera 53€ ✅, Amazon 75€ ✅, Zalando 75€, FL 80€, JD 80€)

**Pendientes de actualizar (retros):** Converse Weapon, Air More Uptempo, Shox BB4, Reebok Question Mid, Reebok Answer IV.

**Fixes afiliados:**
- Bug `snipes_es` → `snipes_eu` corregido en AJ1 y AJ4
- Nueva tienda `footdistrict_es` (Webgains, sin afiliado por ahora)
- Sticky bottom panel: añadido `rel="sponsored"` condicional (igual que resto de botones)

**Joom limpiado:** 11 links con `tiene_afiliado: false` + URLs sin UTM (afiliado Awin pendiente).

**Precios modernos actualizados:** LeBron Witness 9 Atmósfera 109→99€, Precision 8 Atmósfera 67→75€.

**Imagen corregida:** `nike-precision-8.webp` (Mid) → `nike-precision-8-low.webp` (Low, descargada por usuario).

**TradeTracker:** campañas #37834 FuikaOmar (5%) y #35939 Fútbol Emotion (3.5%) en estado **"Bajo evaluación"**. Enviar mensaje al anunciante para acelerar aprobación.

**Build verificado:** 288 páginas, 0 errores TypeScript.

**Auditoría links:**
- 9 links AliExpress Portals (`s.click`) con `tiene_afiliado:true` — son correctos (Portals ES es afiliado válido para chinas sin Awin).
- ~352 URLs de búsqueda (`/search?q=`) vs producto directo — normal para tiendas sin stock garantizado. Priorizar reemplazar las de Nike.es y Basket World cuando el usuario encuentre URLs de producto.

### 🟡 Pendiente (sesión 19)

**Retros sin actualizar:** Weapon, Uptempo, Shox BB4, Reebok Question, Reebok Answer IV.
**TradeTracker:** enviar mensaje a FuikaOmar (#37834) y Fútbol Emotion (#35939) para acelerar aprobación. Una vez aceptados → activar deeplinks en: Sabrina 2, Book 1, Kawhi 4 (Fuikaomar) + Hali 1, Luka 5, Ja 3 (Basketball Emotion).
**Awin pendientes:** ECI (prioritario, EPC €13.99), Zalando, Size?, Reebok, Basket-Center.

---

## Estado actual (sesión 18)

### ✅ Completado (sesión 18) — Afiliados Awin + 13 zapas nuevas + auditoría

**Afiliados Awin activados:**
- **adidas ES** (AID 77008): 24 zapas con deeplinks activos
- **AliExpress ES** (AID 11640): top 5 chinas migradas de Portals s.click a Awin (producto directo + cookie 30d)
- Anta KAI 2 con afiliado por fin (estaba pendiente meses por bug Portals)

**Programas Awin confirmados (5 adheridos):** adidas, decathlon, aliexpress, atmosfera sport, snipes.
**Rechazados Awin (3):** Foot-Store ES, Sprinter ES (aid 27904, "URL no relevante"), Foot Locker ES (aid 23409, "espacio no complementa"). Patrón típico de marcas grandes con muchos afiliados — reintentar en 3-6 meses cuando haya más tráfico documentado en Plausible.
**Pendientes Awin:** ECI, Size?, Zalando, Reebok, Basket-Center, etc.

**Joom activo** (Impact, utm_campaign=2700663): aplicado en ~10 modelos.

**13 zapas nuevas con datos HG reales:**
- lining-wow-allcity-14, anta-kai-2-speed, anta-kai-3, puma-hali-1, nike-giannis-freak-7,
  nike-kobe-9-elite-low-protro, ua-embiid-1, nb-kawhi-4, adidas-don-issue-7,
  nike-lebron-nxxt-genisus, ua-curry-10, lining-wow-allcity-12, lining-wade-dlo-1.
- Total catálogo: 182 → **195 zapas, 288 páginas**.

**Auditoría puntuaciones:**
- Cross-check con HG para 83 zapas (matcher strict tras bug "Air Jordan 1 → 31")
- 69 correcciones iniciales (outdoor -1 + 5 discrepancias graves)
- 12 correcciones adicionales saga PUMA All-Pro tras checklist técnico del usuario
  - Bug grave: All-Pro Nitro 1 peso 295g → 380g real

**Nuevas tiendas dadas de alta:** `forumsport_es`, `sizeofficial_es`, `elcorteingles_es`.

### 🟡 Pendiente (sesión 18)

**Esperando aprobaciones del usuario / Awin:**
- TradeTracker (Fútbol/Basketball Emotion + Fuikaomar) → desbloquea afiliado en Sabrina 2, Book 1, Hali 1, Kawhi 4, Tatum 3, Luka 5
- Foot Locker Awin → activaría Kobe 9 ELP + muchas Nike/Adidas
- Size? Official Awin → activaría Kobe 9 ELP
- El Corte Inglés Awin (EPC €13.99 prioritario)
- Zalando Awin → activaría Luka 5, Witness 9, Harden Vol 10, DON 7
- StockX Impact Radius
- Puma EU CJ Affiliate

**Posibles próximas auditorías por saga:** Nike LeBron (21/22/23/Witness/NXXT), UA Curry (10/11/12/13), Adidas Dame (8/9/X/Certified), Anta KT.

### ✅ Completado (sesión 17)

### ✅ Completado (sesión 17) — UI/UX + PWA + comparador
- **Tema visual**: paleta a variables CSS (`--cz-*`), fondo gris carbón `#2a2a2e`
  (antes negro), superficies/bordes y grises de texto recalibrados. Toda la web a
  estética **cuadrada** (sin border-radius en cards/badges/botones/pills).
- **Vídeo en el hero (home)**: `web/public/hero-cancha.mp4` (3,3 MB, de Pinterest) +
  poster, en bucle silencioso. Escritorio: grid `1fr auto 0.7fr`, vídeo 460px centrado,
  bordes difuminados con máscaras H+V cruzadas. Móvil (≤880): vídeo absoluto a la
  derecha (top -55px, 475px alto, 52% ancho, op .62); texto en columna estrecha a la
  izquierda (`.home-hero-left .home-h1/.home-lede` max-width 52-58% — OJO especificidad:
  la base va después en el CSS). Botones margin-top 130px para no solaparse.
- **PWA instalable**: `web/public/sw.js` (network-first páginas + cache assets/offline) +
  registro en `Base.astro` + `offline.html`. Manifest colores `#2a2a2e`. iOS no muestra
  icono auto (instalación manual vía Compartir → Añadir a inicio); Android Chrome menú ⋮.
- **Comparador (`/comparar`)**: cambio de zapa **en cliente** (era estático → la URL no se
  leía en runtime; ahora re-render JS sin recargar + `history.replaceState`). Tabla a un
  único CSS grid por filas con `gap:1px` (cada fila cuadra). "sin trampa." en naranja.
- **Nav**: añadido **Comparar** entre Quiz y Rankings en las 17 páginas. Móvil (≤720):
  header en columna (logo arriba, nav fila con scroll horizontal debajo).
- **Avisos beta** (imágenes orientativas + precios pueden fallar): en ficha, catálogo y footer.
- **Ficha**: foto 1:1 (más grande) y sticky; quitada sección "Comprar ahora" (redundante).
- **Home**: cards "Lo más reciente" compactas (estilo blog); panel Radar con 5 trending +
  enlace "Ver rankings"; precios del ticker en naranja; botones hero (Rankings + Comparar);
  arreglada incoherencia "Top 3" (`trendingHero` 5 para ticker, `top3` 3 para sección).
- **Mis zapas**: botón ✓/♥ por tarjeta para mover zapas entre "Lo quiero"/"Lo tengo".
- **Rankings móvil**: podio apila 1→2→3 (`order:-1` al primero).
- **Accesorios** (`/balones`): pestaña renombrada a "Accesorios" + estética cuadrada.

### 🟡 Pendiente (sesión 17)
- **Precios top-10** (faltan 7, usuario pasa tienda→precio→URL): nike-lebron-22, ua-curry-12,
  nike-gt-cut-3, jordan-tatum-3, nike-sabrina-2, lining-wow-12, nike-kobe-8-protro.
- **Afiliados nuevos** (esperando aprobación/código del usuario):
  - **Joom** (AWIN) → integrar con `awinmid` cuando aprueben.
  - **TradeTracker** (Fútbol/Basketball Emotion + Fuikaomar) → monetizar Ja 3 (93,99€) y KAI 2.
  - **AliExpress KAI 2** → cambiar a enlace `s.click` (ahora provisional, Portals roto por anti-bot).

### ✅ Completado (sesión 15)
- **Sweep precios Amazon ES**: 94 entradas verificadas/actualizadas con fecha 2026-05-28
  - ~51 modelos modernos procesados (batches 1-4), retros en curso vía agente background
  - Entradas marcadas `disponible: false`: ANTA (no distribuida ES), Decathlon (no en Amazon), modelos descatalogados inflados (jordan-xxxvii, lebron-21, ae-1, etc.)
- **Awin verificación**: meta tag + archivo HTML en producción → sitio verificado
- **adidas ES**: re-solicitud enviada tras verificación
- **Atmósfera Sport**: links de afiliado añadidos a 9 modelos
- **CLAUDE.md**: actualizado (182 zapas, estado Awin, imágenes)

### ✅ Completado (sesión 14)
- **3 artículos retro** → **30 artículos total**:
  - Art.28: Adidas Crazy 8 / Kobe Bryant era KB8 (Análisis)
  - Art.29: FILA Grant Hill 1 — la zapatilla que casi destrona a Jordan (Análisis)
  - Art.30: Nike Shox BB4 y el dunk de Vince Carter en Sydney 2000 (Análisis)
- **Nueva SEO page**: `/mejores-zapatillas-fila` → **34 SEO pages total**
- **FAQ ampliada**: +6 preguntas retro → **43 total** (retros jugables, retro vs Protro, Crazy 8, Grant Hill 1, Shox, coleccionismo)
- **258 páginas** en producción (eran 214)

### ✅ Completado (sesión 13)
- **Widget "Guías relacionadas"**: sidebar de blog/[slug].astro ahora muestra hasta 3 links a SEO pages relacionadas
- **Fix slugs relatedSeoPages**: corregidos 9 artículos con slugs erróneos (zapatillas-baratas→baloncesto-baratas, zapatillas-junior→baloncesto-junior, zapatillas-premium→baloncesto-premium)
- **Barra de progreso de lectura**: barra naranja fija en artículos (scroll sobre .art-body)
- **7 nuevos artículos** → **27 artículos total** (todas las posiciones cubiertas):
  - Art.21: Guía mejores zapas para aleros 2025 (6 min)
  - Art.22: Nike Ja 3 análisis completo (5 min)
  - Art.23: Guía zapatillas para rodillas 2025 (5 min)
  - Art.24: Comparativa New Balance vs ANTA (5 min)
  - Art.25: Guía mejores zapas para bases 2025 (6 min)
  - Art.26: Guía mejores zapas para escoltas 2025 (5 min)
  - Art.27: Guía mejores zapas para ala-pívots 2025 (6 min)
- **Tabla de Contenidos (ToC)**: auto-generada en sidebar de artículos con ≥3 h2s, resalta sección activa al scroll
- **JSON-LD mejorado**: Article ahora incluye image, wordCount, publisher.logo
- **Home page**: añadido link "Para ala-pívots" en sección Guías por perfil (todas las 5 posiciones)
- **FAQ**: +6 preguntas → **37 total** (aleros, Ja 3, rodillas, NB vs ANTA, ala-pívots, bases)

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
  - ✅ **Atmósfera Sport** (aid: 26255) — añadidos links en 9 modelos
  - ✅ **Verificación de sitio Awin**: meta tag + archivo HTML en producción
  - ⏳ Pendientes aprobación (13): adidas ES, Foot Locker ES, Reebok ES, Basket-Center ES, size?Official ES, Sneakin ES, Pro:Direct ES, Foot-Store ES, Forum Sport ES, AliExpress ES (Awin), Privé by Zalando ES, El Corte Inglés ES (EPC €13.99 🔥), Sprinter ES
  - ❌ JD Sports: rechazado 3 veces — reintentar cuando haya más tráfico
- **Afiliado ordering**: tiendas ordenadas por comisión cuando precio igual (±€0.50)
- **COMISIONES_TIENDA** actualizado en `scoring.ts` con rates 2026
- **Imágenes**: ✅ 179/182 zapas con imagen local en `/public/shoes/`
  - ballershoesdb bloqueaba hotlinking → imágenes descargadas localmente
  - 3 zapas con placeholder: nike-kd-19, jordan-super-fly-10, puma-mb-06 (no lanzadas, Q3 2026)

### 🟡 Pendiente
- **Awin**: esperar 13 aprobaciones → El Corte Inglés (EPC €13.99, prioritario), Foot Locker, adidas, Sprinter, Zalando, Reebok, Basket-Center, size?Official, etc.
- **StockX Impact Radius**: pendiente aplicar
- **Puma EU CJ Affiliate**: pendiente aprobación
- **Precios**: sweep Amazon ES en curso (2026-05-28) — ~51/94 entradas procesadas
- **Recordatorio diario**: configurado para Amazon ES y JD Sports manual
- **Imágenes placeholder** (3 zapas — no lanzadas Q3 2026):
  - nike-kd-19, jordan-super-fly-10, puma-mb-06

---

## Arquitectura de datos

### Archivo principal: `web/src/data/zapatillas.ts`
- Array `_rawZapatillas` con **182 zapas** (sesión 15)
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
| Catálogo | `/zapatillas` | ✅ 182 modelos |
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

Último push: 2026-05-28 (sesión 14)
Web live: canchazapa.com ✅

## Blog artículos (30)
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
12. Zapatillas baloncesto pie plano 2026 (Guía)
13. Jordan Tatum 4 vs AE 3 — aleros 2025 (Comparativa)
14. Nike GT Cut 4 análisis (Análisis)
15. Zapatillas niños y jóvenes 2025 (Guía)
16. Anta/Li-Ning/Peak — marcas chinas 2025 (Comparativa)
17. Adidas AE 3 análisis completo (Análisis)
18. Under Armour Curry 13 análisis (Análisis)
19. Jordan Tatum 4 análisis (Análisis)
20. Nike LeBron 22 análisis (Análisis)
21. Mejores zapatillas para aleros 2025 (Guía)
22. Nike Ja 3 análisis completo (Análisis)
23. Zapatillas para rodillas 2025 (Guía)
24. New Balance vs ANTA comparativa (Comparativa)
25. Mejores zapatillas para bases 2025 (Guía)
26. Mejores zapatillas para escoltas 2025 (Guía)
27. Mejores zapatillas para ala-pívots 2025 (Guía)
28. Adidas Crazy 8 / Kobe Bryant era KB8 (Análisis) ← sesión 14
29. FILA Grant Hill 1 — la zapatilla que casi destrona a Jordan (Análisis) ← sesión 14
30. Nike Shox BB4 y el dunk de Vince Carter en Sydney 2000 (Análisis) ← sesión 14

## SEO pages (34)
Posición (5): base, escolta, alero, ala-pivot, pivot
Cancha (2): outdoor, indoor
Categoría (4): cushion, reactivas, equilibradas, traccion
Presupuesto (3): baratas, 130€, premium
Lesión (4): rodillas, tobillos, pie-ancho, pie-plano
Marca (10): Nike, Jordan, Adidas, Puma, Anta, Li-Ning, New Balance, Converse, Reebok, FILA ← nueva sesión 14
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
