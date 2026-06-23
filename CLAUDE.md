# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-06-18 (sesión 28)
> Para Claude: lee esto al empezar una sesión nueva. Cubre todo lo importante.

---

## Estado actual (sesión 28) — Migración de analítica: Plausible → Cloudflare Web Analytics

### ✅ Completado (sesión 28)

**Analítica migrada de Plausible a Cloudflare Web Analytics** (el trial de Plausible
acababa ~24 jun; con ~153 visitantes únicos/28d no compensa pagar 9€/mes):
- `web/src/components/Analytics.astro`: ahora inyecta el beacon de Cloudflare
  (`static.cloudflareinsights.com/beacon.min.js`, token `4052ed0c20a7494895e7111141ce38b5`),
  sin cookies. `window.plausible` pasa a **no-op** (`function(){}`) para no romper las
  llamadas de eventos custom (`Affiliate Click`, `Quiz Completed`, etc.) repartidas por el sitio.
- `web/src/pages/privacidad.astro`: 3 menciones Plausible → Cloudflare Web Analytics
  (sigue sin cookies, sin banner de consentimiento). `Base.astro`: comentario actualizado.
- **Eventos custom DEJAN de registrarse**: Cloudflare Web Analytics NO soporta eventos
  personalizados. No es pérdida real → los clicks de afiliado se miden desde los paneles de
  Amazon/Awin/TradeTracker. Si algún día se quiere recuperar, valorar Plausible de pago o
  un endpoint propio.
- Panel CF creado para `canchazapa.com` (método **JS snippet**, NO DNS proxy — el sitio
  sigue en Vercel). Account ID CF: `98aed7b8c4ec1be751603f514bbc3bfc`.
- Commit `4b0db0a` + deploy `d5fa005`. Build limpio (329 páginas), beacon verificado en el
  HTML de prod, 0 rastro de `plausible.io`. → El trial de Plausible puede caducar tranquilo.

**Scores — 2 anclas nuevas + 1 link WT** (`score-fuentes.json`, 118→120 zapas). Búsqueda de
fuentes para trending/nuevas sin consenso:
- `nike-kobe-3-protro`: estaba a **7.0 editorial → HoopsGeek 8.3/n7** (infravalorada, +1.3).
  Slug HG real: `nike-kobe-protro-3`. + wt_url.
- `rigorer-ar3`: editorial 8.3 → **HoopsGeek 8.5/n6** (pasa a verificada). + wt_url.
- `nike-giannis-immortality-5`: sin score numérico en ninguna fuente; axisAvg 7.3 coincide con
  WearTesters (~85$, "fiable pero básica"). Solo wt_url.
- Confirmado SIN review numérica (frontera, se quedan editorial): KD 19 (recién salida), Kobe 9
  High Protro (HG solo tiene la Low), Asics (Unpre/Gelhoop/Glide), Skechers (JE1/Float/Resagrip/
  League). RunRepeat ya no cubre básquet. Commit `2d5fcfa`.

**Auditoría de afiliados (sesión 28)** — `scripts/audit-affiliates.ts`:
- **653 enlaces totales: 317 con afiliado nuestro · 336 sin afiliado.** 0 mal etiquetados.
- **Fix bug FuikaOmar**: 6 enlaces eran URL directa `fuikaomar.es` (tiene_afiliado:false) →
  perdían comisión (FuikaOmar #37834 está aprobado). Existían solo en `precios.json`, por lo que
  el merge los añadía como false. Añadidos como link editorial en `zapatillas.ts` con wrapper:
  anta-kai-1-speed, anta-kai-2, anta-kt-10, nb-two-wxy-v4, adidas-harden-vol-10, adidas-don-issue-7.
  Commit `4efb2c3`. (311→317 afiliados.)
- **Afiliados ACTIVOS (9, las únicas que monetizan)**: Amazon, Decathlon, Atmósfera, adidas,
  AliExpress (Awin + Portals), Forum Sport, Snipes, **FuikaOmar**. (= set `AFILIADO_OK` del script.)
- **32 zapas SIN ningún afiliado** (media 2.8 links/zapa): muchas son flagships muy buscadas
  (KD 18, Luka 5, GT Cut 3, Book 2, Tatum 4, Zion 4, Freak 5/6, KD 16/17, Immortality 4). Su
  único stock es Nike.es/Foot Locker (no afiliados) → no cobran nada. PRIORIDAD: añadirles un
  afiliado. Mejor fuente por comisión que SÍ vende Nike/Jordan: **Atmósfera (6%) > Snipes (5%) >
  FuikaOmar (~5%) > Amazon (3%)**. El usuario pasa los enlaces y Claude los envuelve.

**Estrategia "Ver precio" IMPLEMENTADA** (commit `b294d99`) — solo mostramos PRECIO numérico
donde monetizamos. Las tiendas rechazadas/sin programa muestran **"Ver precio en [tienda]"** sin
número (no mantenemos un precio que se pudre). El "desde X€" sale de tiendas afiliadas/pendientes;
si no hay ninguna disponible, MSRP oficial. **NO se borró ningún enlace** (opción 3 del usuario:
todas las opciones de compra siguen). El ORDEN del catálogo y el editor's pick NO cambian (siguen
con findMejorPrecio = precio real más barato).
- `scoring.ts`: helpers nuevos `mostramosPrecio(link)` y `findMejorPrecioMostrado(links)`.
  `TIENDAS_PENDIENTES` (joom, elcorteingles_es, reebok_es, ...) también muestran precio.
- Aplicado en DISPLAY (no en lógica de orden/filtro): ficha (`zapatilla/[slug]`), catálogo
  (`zapatillas`), home, rankings, mis-zapas, blog, SEO (`[slug]`), OG image, ChatWidget, calculadora.
- Para volver a mostrar el precio de una tienda: basta activar su afiliado (tiene_afiliado:true)
  o meterla en TIENDAS_PENDIENTES.

**Las 32 zapas sin afiliado → 28 RELLENADAS con Amazon** (commit `16696e2`). Verificado en
Chrome: **Atmósfera y FuikaOmar NO stockean las flagships Nike/Jordan** (KD 18, etc.) — por eso
no tenían afiliado; su único stock era Nike.es/Foot Locker (no afiliados). **Amazon SÍ las tiene**
(resellers). Añadido enlace Amazon afiliado `amazon.es/s?k=modelo&tag=canchazapa-21` a 28 zapas.
- **Precio inicial = MSRP placeholder** (disponible:true); el scraper diario debe refinar el precio
  real de Amazon. OJO: hasta que corra el scraper, muestran MSRP como "Verificado en Amazon".
- **4 se quedan SIN fuente afiliada posible**: `nike-kobe-1-protro` (Amazon solo tiene Kobe 4/9
  Protro, no la 1 → un search-link caería en modelo equivocado) + 3 Moolah Kicks (marca US no
  distribuida en Amazon.es). Mantienen su tienda actual como "Ver precio" + MSRP.
- Afiliados 317 → 345. **Zapas sin afiliado: 32 → 4.**

### 🟡 Pendiente / requiere criterio del usuario (sesión 28)
- ~~Migrar analítica a Cloudflare~~ **HECHO**.
- ~~Estrategia "Ver precio" en enlaces no-monetizables~~ **HECHO** (opción A, sin podar).
- ~~Rellenar las 32 zapas sin afiliado~~ **28/32 HECHO con Amazon** (ver arriba). Quedan 4 sin
  fuente posible (Kobe 1 Protro + 3 Moolah). Si algún día Atmósfera/Snipes/FuikaOmar stockean
  alguna flagship, mejor cambiarla de Amazon (3%) a esa fuente (5-6%).
- **Verificar precios Amazon reales** de las 28 (ahora MSRP placeholder) — lo hará el scraper, o
  pasada manual. Amazon confirmado con stock de todas (KD 18 ~145€, etc.).
- **Podar redundantes** (opción B): descartado de momento; reconsiderar si el catálogo se ve cargado.
- **Pendientes Awin que SÍ convertirán** → activarán sus links solos: Joom (19), ECI (7), Reebok (5).
- **Anclas editoriales para ~110 nicho** (heredado s27): EVALUADO, no hace falta acción masiva.

#### Las 32 zapas SIN afiliado (worklist — el usuario pasa enlace, Claude envuelve)
NIKE: kd-18, gt-cut-3, book-2, zoom-freak-5, zoom-freak-6, giannis-immortality-4, kyrie-low-5,
kd-17, kd-16, gt-cut-academy-2, gt-jump-3, sabrina-1, sabrina-3-gs, giannis-immortality-4-gs.
JORDAN: luka-5, tatum-4, zion-4, luka-4, luka-3, luka-1, one-take-5, xxxviii (AJ38).
UNDER ARMOUR: futr-x-elite, futr-x-4, spawn-7-mid (→ Amazon/FuikaOmar).
PUMA: stewie-4, scoot-zeros (→ Atmósfera/FuikaOmar).
NEW BALANCE: kawhi-1 (→ Amazon).
MOOLAH KICKS (difíciles, quizá solo Amazon): neovolt-pro-v3, evolyte-elite, triple-double.

---

## Estado anterior (sesión 27) — Ampliación de consenso de fuentes (HoopsGeek) + auditoría imágenes

### ✅ Completado (sesión 27)

**Consenso de scores ampliado 98 → 115 zapas** en `web/src/data/score-fuentes.json`:
- **9 variantes GS/junior** heredan el score MOSTRADO del adulto WT/HG-calibrado (confianza
  `editorial`, no se revisa la GS en sí): curry-12-gs, ae-1-gs, ae-2-gs, mb05-gs, luka-77-gs,
  sabrina-3-gs, immortality-4-gs, dame-x-gs, don-issue-7-gs.
- **4 nicho modernas** ancladas a HoopsGeek (verificadas en web): 361 Joker 1 (8.8/n5),
  Puma MB.03 (8.3/n7), Puma MB.04 (7.9/n5), Jordan Why Not 6 (7.9/n5, slug HG `jordan-why-not-zero6`).
- **4 Kobe Protro retro** con review HG real (fuera del ranking global, pero la ficha muestra el
  consenso): Kobe 1 (8.7/n9), Kobe 4 (8.6/n6), Kobe 5 (8.7/n6), Kobe 6 (8.7/n5).
- Commits: `bd9b873` (GS + 4 HG) y `3828dd2` (4 Kobe Protro).

**Frontera de fuentes AGOTADA** (no insistir): confirmado SIN review pública en HG/RR/WT →
se quedan en editorial/axisAvg. NO tienen review: Asics (Unpre/Gelhoop/Glide Nova), Skechers
(JE1/Resagrip/Float/League), GT Jump 3, Kyrie Flytrap 6, Kyrie Infinity, Cross Em Up 5, Li-Ning
Sonic 12, Trae Young 4, Trae Unlimited 2, Stewie 4, Immortality 5, Air Max Impact 5, Harden
Stepback 4, Flow Breakthru 4, Kobe 3 Protro. (RunRepeat ya casi no cubre básquet; HG no lleva
Asics/Skechers de básquet.) → para anclar estas haría falta otra fuente o estimación editorial manual.

**Auditoría de imágenes — catálogo SANO, nada que arreglar**:
- 0 imágenes rotas (las 230 refs `/shoes/` existen en disco), 0 thumbnails diminutos.
- `scripts/optimize-images.mjs` **capa a 600px de ancho a propósito** ("suficiente para catálogo",
  WebP q82). Las imágenes de ~460-600px son por DISEÑO, no baja calidad. NO subir resolución: el
  optimizador lo revierte. Imágenes ~terminadas.
- Único placeholder legítimo: **puma-mb-06** → MB.06 NO está revelada/lanzada (esperada temporada
  2026-27 NBA, ~oct; MB.05 sigue siendo la actual). Dejar placeholder hasta que Puma publique imagen.

**SEO — aviso GSC "4xx" RESUELTO**: Search Console marcaba "bloqueado por otro problema 4xx" porque
Googlebot rastreaba `/api/chat` (serverless POST-only) con GET y recibía **405**. Fix: añadido
`Disallow: /api/` a `robots.txt` (no afecta al chat, robots.txt no aplica al fetch del navegador).
Verificado en prod: `GET /api/chat` = 405. → El usuario debe pulsar "Validar corrección" en GSC.
NO es pérdida de SEO real (el endpoint nunca fue una página). Commit `2470de7`.

**Afiliados (sesión 27)**:
- **Basketball Emotion — CERRADO DEFINITIVO**: TradeTracker (Sports Emotion Hub) respondió por
  ticket 2026-06-16: *"Basketball Emotion no tiene programa de afiliados"*. Los ~23 links
  `basketballemotion_es` se quedan como URL directa `tiene_afiliado:false` (funcionan, sin comisión).
  Auditado: 0 con afiliado activo, 0 con wrapper TradeTracker muerto. NO volver a perseguir esto.
- **Promo adidas End of Season Sales** añadida a `promos.ts` (date-gated 26 jun–20 jul 2026, hasta
  30%, deeplink Awin 77008→outlet, sin código). Se autoactiva el 26-jun. Commit `d8e0291`.

**SEO — DOMINIO CANÓNICO UNIFICADO (importante)**: GSC daba "Error de redirección" en 5 URLs y el
sitio tenía un desajuste www/sin-www. Causa: en **Vercel → Domains**, `www.canchazapa.com` era el
dominio PRIMARIO (apex redirigía a www con 307 temporal), pero TODO el código (astro `site`, sitemap,
canonical, og:url, robots) usa **sin-www**. → Invertido en Vercel (vía Chrome): ahora
`canchazapa.com` sirve Production (200) y `www` → **308 permanente** → apex. Verificado en prod.
NO hay cambio de repo (el código ya era sin-www). Si algún día se vuelve a tocar el dominio primario,
mantener **apex (sin-www) como primario**. Las 2 validaciones de GSC (Error redirección + 4xx
`/api/chat`) lanzadas 18/6/26. Los 2 "404" de GSC eran URLs fantasma de versiones viejas
(`$(z.slug)` template roto + `ua-flow-breakthru-5`), ya no en el código → se autolimpian, NO validar.

**Auditoría de integridad de referencias internas (sesión 27)**: 0 rotas en predecesor/sucesor,
relatedShoes, ids/slugs (todo único). Arreglados **5 `relatedSeoPages` con slug roto** en artículos
(`zapatillas-baloncesto-rodillas`→`-para-rodillas`, `zapatillas-baloncesto-outdoor`→`zapatillas-outdoor`);
el widget los descartaba en silencio → enlace perdido. Commit `da31095`. Sanidad catálogo: 0 sin links,
0 precio≤0, 0 url vacía. Auditoría afiliados (`scripts/audit-affiliates.ts`, worklist en `.out.json`):
311 links, "graves" son falsos positivos (AJ1/Decathlon con slug de marketplace sin "jordan") o
`disponible:false` (Converse Chuck Taylor burdeos en Decathlon, sin verificar por bot-protection 403).

### 🟡 Pendiente / requiere criterio del usuario (sesión 27)
- **Analítica — Plausible trial acaba ~24 jun**: decidido migrar a **Cloudflare Web Analytics**
  (gratis, sin cookies, mantiene promesa /privacidad). Falta que el usuario cree la cuenta CF y pase
  el token `data-cf-beacon`; luego swap en `Analytics.astro` (dejar `window.plausible` como no-op) +
  actualizar `/privacidad`. Eventos custom (Affiliate Click) se pierden pero ya los dan los paneles
  de Amazon/Awin/TradeTracker.
- ~~Anclas editorial para ~110 nicho~~ **EVALUADO — no hace falta acción masiva**: las nicho sin
  review muestran el `axisAvg` de los 8 ejes, que YA están curados y funcionan como la estimación
  editorial. Verificado: `anta-kai-2-speed` cae en axisAvg 8.5 = exacto el HG de su base `anta-kai-2`
  → los ejes ya están bien calibrados. Solo 2 "variantes" candidatas y ninguna necesitaba override
  (kai-2-speed ya da 8.5; `adidas-dame-certified-3` es gen budget distinta, su 7.3 es correcto, NO
  heredar de Dame Certified 8.2). → Overridear una zapa concreta con `editorial` solo si aparece
  review nueva o detectas una miscalibración puntual; no batchear.
- ~~Posible duplicado Kobe 9~~ **RESUELTO**: `nike-kobe-9-low-protro` era un FANTASMA (Nike solo
  lanzó "Kobe 9 Elite Low Protro" / "Elite High Protro"; no existe una "Low Protro" no-Elite).
  Eliminado (ficha + precios.json + imagen + repuntado relatedShoes del artículo de tiradores a
  `nike-kobe-9-elite-low-protro`, que es la canónica HG-verificada 8.6). Catálogo 231→230 ids.

---

## Estado anterior (sesión 26) — Sistema promos + trending en todo + barrido afiliados + fichas nuevas

### ✅ Completado (sesión 26)

**Chat IA — ya conoce los accesorios**: el system prompt de `web/api/chat.ts` ahora sabe que
la web tiene balones/calcetines/plantillas en `/balones` y redirige ahí en vez de negarlo.
Cadena de modelos gratuita actual (mejor→peor): gemma-4-31b → llama-3.3-70b → qwen3-next-80b →
gpt-oss-120b → gemma-4-26b. `deepseek-v4-flash:free` NO existe (404, solo de pago).

**Sistema de promos afiliadas date-gated** (`web/src/data/promos.ts` + `components/PromoBanner.astro`):
- Banner superior dismissable (apila varias) + aviso contextual en ficha (`zapatilla/[slug].astro`).
- Activación por fecha EN CLIENTE (web estática). `?promo=preview` fuerza mostrarlas (preview).
- Activas: AliExpress Mitad de Año (ESMYS02-55, 15-20 jun), Forum Sport Flash 48h (7EXTRA, 14-15 jun).
- Para añadir promo: copiar objeto en promos.ts (tienda, fechas, codigo/codigos, url Awin). Aparece sola.

**Trending en 4 sitios**: tag `trending` en ~20 zapas (lista curada del usuario) → chip 🔥 en catálogo
(`?trending=1`), Radar del home, pestaña Rankings, y artículo SEO `/blog/zapatillas-baloncesto-mas-buscadas-2026`.

**Fantasmas eliminados**: Adidas AE 3 y AE 1.5 NO existen (verificado adidas.es+WT, tenían URLs WT
inventadas). Borradas; AE 3 retargeteada a AE 2 en blog/SEO/FAQ. Existen: AE 1 (mid/low) y AE 2.

**Imágenes**: barrido de las 207 → solo 6 eran genéricas "on-foot baldosas" (cluster 600x400).
Cambiadas a producto real (LeBron 23, KD 18, Witness 9, AJ38, Harden Vol 9) + Immortality 5 corregida.

**Barrido de afiliados (en curso, el usuario pasa enlaces)** — añadidos producto real:
- adidas.es: AE 2, AE 1, Dame X, DON Issue 6/7, Harden Vol 9/10, Believe That 1.
- Decathlon: Curry 12/13, MB.04, All-Pro Nitro 2, AE 1, DON 6/7, Dame 9, Dame X, NB WXY V5, cross-em-up.
- Atmósfera: AE 2, Believe That 1, Witness 9, Precision 7/8, Ownthegame 3, Immortality 5, Curry 3Z 25, NB WXY V5.
- FuikaOmar (7, ya activas) + Basketball Emotion.

**Fichas NUEVAS creadas** (208→213 zapas, marcas nuevas Asics/Kipsta):
- Asics: Unpre Ars 2, Gelhoop V17, Glide Nova FF 4.
- Kipsta Canaveral 900 (Decathlon, Alex Sarr). Decathlon Tarmak SE500 Mid. Adidas Believe That 1. UA Jet '25.
- **Segmento JUNIOR/GS** (genero "gs"): Curry 12 GS, AE 1 GS, AE 2 GS (+ ya existían Cross Em Up 5, Crossover 2).

### 📋 Metodología de SCORES (regla del usuario, importante)
- **WT-verificado** 🟢: contrastar con WearTesters/RunRepeat/TheHoopsGeek (mainstream casi siempre tienen).
- **Estimación editorial** 🟡: budget/team/nicho/chinas/GS sin review → `fuentes: evaluacion-propia`,
  fundamentar en specs oficiales + reseñas. GS heredan los scores del adulto (que ya están WT-calibrados).
- SIEMPRE avisar al usuario del estado del score al crear ficha nueva.
- Verificar SIEMPRE modelo + generación exactos antes de meter un enlace (Curry 12≠13≠GS, etc.).

### Formato enlaces afiliados (recordatorio)
- Decathlon Awin: `awinmid=105405` · Atmósfera: `awinmid=26255` · adidas: `awinmid=77008` · AliExpress: `awinmid=11640` · Forum Sport: `awinmid=23805`
- Wrapper: `https://www.awin1.com/cread.php?awinmid=AID&awinaffid=2908587&ued=URL_ENCODED`
- FuikaOmar (TT): `https://deals.fuikaomar.es/c?c=37834&m=12&a=511170&r=&u=URL_ENCODED`
- Imágenes: descargar a `web/public/shoes/{slug}.jpg|webp` (adidas CDN, KicksCrew shopify, Decathlon mediadecathlon — todas accesibles vía Chrome).

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

## Estado actual (sesión 25) — Chat IA en producción + calculadora + FuikaOmar aprobado

### ✅ Completado (sesión 25)

**Asistente IA (chat) ARREGLADO y funcionando en producción** ✅
- **Bug raíz**: la función serverless `web/api/chat.ts` crasheaba con `ERR_MODULE_NOT_FOUND`.
  Con `"type":"module"` Vercel ejecuta `/api` en ESM puro SIN bundling, y los imports sin
  extensión (`../src/data/zapatillas`) no resuelven en Node ESM. Nunca llegaba a OpenRouter
  (por eso el error era constante aunque la API key estuviera bien).
- **Fix**: función **autocontenida**. `scripts/gen-chat-catalog.ts` (corre en `prebuild`)
  precompila el catálogo compacto a `web/api/_catalog.json`; la función solo importa ese
  JSON (con extensión → seguro en ESM). El JSON se commitea como fallback y se regenera en
  cada build (precios siempre frescos).
- **CORS + OPTIONS**: añadido por si el SW sirve la página en apex y el fetch cruza a www.
- **Cadena de modelos GRATUITA optimizada** (probada en vivo jun 2026, mejor→peor),
  diversificada por proveedor para esquivar el rate-limit compartido (un 429 vuelve en ~0.3s):
  1. `google/gemma-4-31b-it:free` (2-3s, español limpio, sigue formato `[[shoe:]]`, alta disponib.)
  2. `meta-llama/llama-3.3-70b-instruct:free`
  3. `qwen/qwen3-next-80b-a3b-instruct:free`
  4. `openai/gpt-oss-120b:free`
  5. `google/gemma-4-26b-a4b-it:free`
  - Presupuesto 25s, 12s máx/modelo, `export const config={maxDuration:30}`.
  - Fiabilidad real ~90% (resto = saturación free tier, se maneja con "reintenta", no crashea).
  - DESCARTADOS: `deepseek-v4-flash:free` (YA NO existe en gratis, da 404 → solo de pago),
    nemotron-ultra-550b (30s), nemotron-super-120b (filtra su reasoning en inglés al texto).
  - `OPENROUTER_API_KEY` configurada en Vercel (Production). NUNCA en el repo.

**Calculadora de coste/partido — mejoras visuales** (`/calculadora` + `components/CosteBlock.astro`)
- El número grande (€/partido) ahora adopta el color del veredicto (verde/naranja/amarillo/rojo);
  número + texto coordinados (ambos miden coste). La barra y su % mantienen su color (desgaste).
- Aviso outdoor en rojo: cuando desgaste ≥85% (y no es retro) aparece consejo accionable +
  enlace a `/zapatillas?cancha=exterior` (filtro Outdoor real). Aplicado en los DOS sitios
  (página suelta y bloque embebido en la ficha).
- Fixes previos: quitado doble overlay/footer, footer global anclado abajo en Base.astro
  (body flex column), nav completo añadido.

**Nav: Calculadora entre Catálogo y Accesorios en TODAS las páginas** + botón en el hero del home.

**Afiliados — FuikaOmar (TradeTracker #37834, 5%) APROBADO** ✅
- Activado `tiene_afiliado: true` en 7 zapas con deeplink ya preconfigurado:
  nike-sabrina-2, nike-aone, nike-book-1, anta-shock-wave-5, converse-weapon,
  nike-air-more-uptempo, nb-kawhi-4.
- TradeTracker ahora con **3 campañas aceptadas**: FuikaOmar (#37834, 5%),
  Fútbol/Basketball Emotion (#35939, 3.5%), Referidos TradeTracker (#1158, 3%).

### 🟡 Pendiente (sesión 25)
- **Awin en cola**: ECI (prioritario, EPC alto), Zalando, Size?, Reebok.
- **Chat ~100% fiable**: solo con modelo de pago (`deepseek/deepseek-v4-flash`, céntimos/mes).
  El usuario prefiere mantenerlo 100% gratis por ahora.

---

## Estado anterior (sesión 24) — Auditoría iterativa scores + 13 nuevas zapas + marcas nicho

### ✅ Completado (sesión 24)

**Editor's Pick — WoW 12 como tie-breaker permanente**
- Override editorial: si hay empate de score, gana lining-wow-12 (sobre Curry 12 a 9.5).
- Aplicado en `web/src/pages/zapatillas.astro` Y `web/src/pages/index.astro` (las 2 páginas que muestran pick).
- Si una zapa supera el score actual (>9.5), gana ella automáticamente sin necesidad de tocar el código.
- Sin filtro MSRP (antes excluía zapas a precio MSRP).

**Catálogo: ordena por Mejor Score por defecto**
- Select y JS arrancan en score-desc. Pre-render server-side también por score (sin flash al cargar).

**Auditoría iterativa de puntuaciones (12 oleadas de ajustes)**

Oleada 1 (Top tier + Immortality + retros):
- KD 17 9.0→8.6, KD 19 9.0→8.8, WoW All City 14 9.0→8.8, Kobe 9 ELP 8.5→8.8
- Immortality 3/4/5: 8.3/8.3/8.0 → 7.3 (zona budget real)
- AJ12 Retro 6.1→7.0, Kobe 6 Protro 6.9→7.1

Oleada 2 (Kobe Protro + dedupe Freak 7):
- Kobe 4 Protro 6.8→8.8, Kobe 6 Protro 7.1→9.0 (Protro = estándar oro NBA actual)
- LeBron 21 8.0→8.5, AJ XXXIX 7.5→8.3, Dame Certified 8.5→7.5
- DELETED duplicado nike-zoom-freak-7; nike-giannis-freak-7 score 6.0→7.6
- 2 sucesor_id de Freak 5/6 actualizados a nike-giannis-freak-7

Oleada 3 (Granularidad 9.0 + 3 fantasmas):
- Curry 11, LeBron 22, WoW All City 14: 9.0 → 9.1 (aciertos unánimes)
- Hali 1, AJ 40: 9.0 → 8.8 (todavía sin demostrar consistencia)
- Precision 8 8.0→6.8 (gama blanca, no premium)
- Kobe 5 Protro 7.0→8.8 (Protro tier)
- Book 2 6.0→7.5 (penalización excesiva)

Oleada 4 (Brands cruzadas + 2 scores):
- D.O.N. Issue 6: Nike → Adidas (rename id, slug, marca, imagen)
- Luka 77: Nike → Jordan (idem)
- Shock The Game 5.0: 9.3 → 8.0 (es outdoor king, no flagship pabellón)
- Clyde All-Pro: 8.0 → 8.5 ("la Kobe de Puma")

Oleada 5 (3 fantasmas + 3 años):
- DELETED: nike-gt-run-2 (saga GT Run → GT Hustle)
- DELETED: jordan-super-fly-8 y jordan-super-fly-10 (línea Super.Fly discontinuada)
- Kobe 1 Protro año 1999 → 2006 (Kobe firmó con Nike en 2003)
- Anta KAI 3 año 2025 → 2026 (no solapa con KAI 2)
- Jordan Tatum 4 año 2025 → 2026 (idem solapamiento)

Oleada 6 (1 delete + 9 años):
- DELETED: ua-assert-10 (zapa de running, no básquet)
- Harden Vol 8: 2022 → 2024 (el del chasis EVA salió en 2024)
- Kyrie Low 5: 2024 → 2022 + score 8.5 → 8.0 (Kyrie rompió con Nike fin 2022)
- Pro Vision: 2024 → 2018 (modelo clásico de equipo)
- Kawhi 1: 2024 → 2020 (campeonato Raptors), Kawhi 2: 2024 → 2022, Kawhi 4: 2025 → 2024
- Embiid 1: 2023 → 2020 (Embiid ya dejó UA por Skechers)
- AE 3: 2025 → 2026, MB.06: 2025 → 2026, Luka 5: 2025 → 2026 (no solapan con predecesores)

Oleada 7 (Consistencia datos):
- AJ XXXVIII → "Air Jordan 38" (modelo visible; slug jordan-xxxviii preserved)
- XXXIX → "Air Jordan 39" (modelo visible; slug jordan-xxxix preserved)
- Sabrina 1, Stewie 3, Stewie 4: genero "women" → "unisex" (los hombres también las usan)

NOTA confirmada: "Nike LeBron NXXT Genisus" NO es errata. Es el nombre oficial de Nike (fusión "Gen II" + "Genesis"). Nike.es y ECI usan "genisus" en sus SKUs.

**+10 nuevas fichas — Marcas nicho SEO alta conversión**

361° (3 zapas):
- Joker 1 (Jokić MVP signature) — 8.0/10, 119€
- Big3 6.0 Pro — 8.0/10, 105€
- Zen 7 (outdoor calidad-precio) — 7.5/10, 90€

Rigorer (3 zapas):
- AR3 (Austin Reaves nuevo flagship) — 8.3/10, 95€
- AR1 (la viral, estilo Kobe) — 7.8/10, 75€
- Warship (outdoor budget) — 7.0/10, 60€

Skechers (4 zapas):
- SKX JE1 (Joel Embiid signature) — 8.0/10, 130€
- SKX Resagrip (tracción Goodyear top) — 8.1/10, 145€
- SKX League (budget bajo 100€) — 7.0/10, 95€
- SKX Float (max cushion premium) — 8.3/10, 155€

Catálogo final sesión 24: **205 zapas, 298 páginas** (sesión 23 = 200 zapas).

**Afiliados nuevos activados (sesión 24)**
- Forum Sport ES (Awin aid:23805) ✅ APROBADO — link AE 2 envuelto en wrapper
- WoW 12: Basketball Emotion 169.99€ (TradeTracker activo)
- Curry 12: Joom 76€ (URL limpia)

**Sesión incluyó también (sesión 24 inicio):**
- Fix `disponible:false` en catálogo de zapatillas.astro (sesión 23 era solo editor's pick)
- Fix repo .git huérfano en C:\Users\oswal\ (borrado, no afectaba master)

---

## Estado anterior (sesión 23) — Fix editor's pick + regla disponibilidad

### ✅ Completado (sesión 23)

**Fix editor's pick** (`web/src/pages/zapatillas.astro`):
- Bug: editor's pick usaba `findMejorPrecio` (solo `disponible:true`) para calificar zapas. Zapas con links baratos marcados como `disponible:false` (Gamma 2 a 105€ en AliExpress) quedaban excluidas porque el único disponible era más caro que el MSRP (Joom 282€).
- Fix: ahora usa el precio mínimo de TODOS los links independientemente de `disponible`. Stock se muestra en la ficha, no condiciona el catálogo.
- 10 zapas rescatadas: Gamma 2, Reebok Question Mid, Reebok Answer IV, NB OMN1S, Ja 2, Dame 9, One Take 5, Air Max Impact 5, Kyrie Flytrap 6, NB Fresh Foam BB v3.

**Regla nueva (NO olvidar):**
`disponible: false` solo afecta al botón de compra en la ficha individual. NUNCA debe excluir una zapa de rankings, editor's pick ni catálogo.

**Total commits sesión 23:** 1 commit en master

---

## Estado actual (sesión 22) — Auditoría masiva de puntuaciones y specs

### ✅ Completado (sesión 22) — Calidad de datos

**Auditoría puntuaciones (119 zapas ajustadas):**
- Contraste de TODAS las puntuaciones no-retro contra WearTesters (~80 reviews verificadas)
- Lógica de saga aplicada al resto (sucesoras no deben puntuar menos que predecesoras salvo evidencia)
- Quedan solo 13 inconsistencias menores (diff ≤ 0.5), todas confirmadas correctas por WT (LeBron 23, Freak 7, GT Cut 4, XXXIX son peor que sus predecesores)

**Top scores ahora reflejando WT real:**
- Curry 12 (9.5), KT 10 (9.5), WoW 12 (9.5), Gamma 2 (9.5), Kyrie Infinity (9.5)
- Shock The Game 5 (9.25), Curry 11 (9.25)
- LeBron 22, KD 18, KAI 2/3, Hali 1, Dame 9, AE 2, GT Jump 2, AJ 40, XXXVIII, KD 16/17, Curry 10, Wow All City 14 (todas 9)
- GT Cut 4 bajada a 6.5 (WT 5/10), Freak 7 a 6 (WT 6/10), Book 2 a 6 (WT 6/10)

**Auditoría specs peso/drop (76 zapas ajustadas):**
- 26 verificadas en RunRepeat lab (datos cuasi-oficiales)
- 50 verificadas con Google AI overview (WT/RR/fichas oficiales)
- Hallazgos críticos: AE 1 348g→448g, Kawhi 2 NB 348g→437g, SHAI 001 315g→414g, Curry 11 298g→348g, Immortality 4 420g/10mm→357g/5mm, Sabrina 3 drop 10mm→6mm, Witness 8 drop 6mm→9mm, etc.

**Total commits sesión 22:** 8 commits en master

**Pendiente sesión 22:** ~50 zapas sin verificar specs (Reebok, Decathlon, Peak, NB OMN1S, Anta secundarias — sin reviews públicas o datos no encontrados)

---

## Estado anterior (sesión 21)

### ✅ Completado (sesión 21) — Auditoría completa de links retros

**SW cache bump v2** — forzado re-fetch imagen SHAI 001 corregida.

**Precios actualizados:**
- Air More Uptempo: Amazon Low 153€ (B0DGTYTW9L) ✅
- Nike Shox BB4: Joom 171€ ✅ (FL + Amazon sin BB4)

**Auditoría retros — 20 correcciones aplicadas:**
- 4 Zalando product URLs caducadas → search format
- Fuikaomar Weapon + Uptempo: URLs caducadas → `disponible:false`
- Kickscrew Kobe 4/5/6 collections (404) → search URLs
- Nike.es AF1 URL rota → `disponible:false`
- ECI Shaqnosis + FL AF1 SKU → `disponible:false`
- Precios: ECI AJ1 70→140€, Decathlon AJ11 188→190€, FL Chuck Taylor 80→45€
- Precios Amazon: AJ3 210→186€, AJ6 215→289€, Shaq Attaq 150→273€, Foamposite 280→207€, Penny 2 160→134€
- Reebok Pump Omni Lite → `disponible:false` (no aparece en Amazon ES)
- Question Mid + Answer IV: todas las tiendas sin stock

**mergePrices.ts mejorado** — resolveUrl() preserva affiliate wrappers al actualizar destinos.

### 🟡 Pendiente (sesión 21)
- **FuikaOmar #37834:** pendiente aprobación → activar tiene_afiliado:true en Sabrina 2, Book 1, Kawhi 4, Weapon, Uptempo
- **Awin pendientes:** ECI (prioritario), Zalando, Size?, Reebok
- **Snipes (via Awin) y JD Sports searches:** no verificados precio (requieren JS)
- **Kickscrew** (AJ2/5/7/8/12/14, Zoom Gen, Penny 1, FILA GH1): cargan sin precio visible
- **Adidas.es + Puma.es:** bot protection impide verificación directa

---

## Estado actual (sesión 20)

### ✅ Completado (sesión 20) — Retros + nuevas fichas + TradeTracker activo

**TradeTracker Fútbol Emotion #35939 APROBADO (3.5%)** — deeplinks activos en 5 zapas:
- jordan-luka-5, puma-hali-1, nike-ja-3, air-jordan-1, air-jordan-4

**FuikaOmar #37834** — deeplinks preconfigurados (tiene_afiliado:false hasta aprobación) en:
- nike-sabrina-2, nike-book-1, nb-kawhi-4, converse-weapon, nike-air-more-uptempo

**Nuevas fichas:**
- `reebok-shaqnosis` (1995, Shaq, score 4.3/10) — 289 páginas
- `nike-kobe-1-protro` "81 Points" (1999/retro, score 7.1/10, BE 160€ ✅ TradeTracker) — 290 páginas

**Retros actualizadas con links reales (jun 2026):**
- `converse-weapon`: Amazon (Low) 72€ ✅, Converse.com 130€, Fuikaomar 130€ ⏳, Decathlon 136€ ✅
- `nike-air-more-uptempo`: Amazon 150€ ✅, FL 155€, Decathlon (Low) 178€ ✅, Fuikaomar 190€ ⏳
- `reebok-shaqnosis`: Zalando 150€, Amazon 150€ ✅, Reebok.eu 150€, ECI 150€

**Pendientes de actualizar (retros):** Shox BB4, Reebok Question Mid, Reebok Answer IV.

**Nuevas tiendas:** `converse_es` (sin afiliado), `footdistrict_es` (Webgains, sin afiliado).

**Imagen SHAI 001 corregida** — era colorway incorrecto, reemplazada por Triple White.

**Auditoría nocturna (sesión 19→20):**
- atmosfera_sport: 6 añadido a COMISIONES_TIENDA
- 2 Joom pendientes limpiados (LeBron 22 + Sabrina 2)
- footlocker_es duplicado eliminado en SHAI 001
- 0 errores TS, 197 zapas, 290 páginas, build limpio

### 🟡 Pendiente (sesión 20)
- **Retros pendientes precios:** Shox BB4, Reebok Question Mid, Reebok Answer IV
- **FuikaOmar #37834:** pendiente aprobación → activar tiene_afiliado:true en Sabrina 2, Book 1, Kawhi 4, Weapon, Uptempo
- **Awin pendientes:** ECI (prioritario), Zalando, Size?, Reebok, Basket-Center
- **Joom Awin:** cuando aprueben → activar 11 links

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

### 📋 Estado retros pendientes (precios actuales en BD)

| Modelo | MSRP | Links actuales | Afiliado |
|---|---|---|---|
| Converse Weapon | 110€ | Amazon 110€ | ✅ solo Amazon |
| Air More Uptempo | 160€ | FL 155€, Amazon 150€ | ✅ solo Amazon |
| Shox BB4 | 160€ | FL 160€, Amazon 165€ | ✅ solo Amazon |
| Reebok Question Mid | 130€ | Reebok.es 130€ (no disp), Zalando 115€, FL 120€ | ❌ ninguno |
| Reebok Answer IV | 120€ | Reebok.es 120€ (no disp), Zalando 110€, FL 105€ | ❌ ninguno |

Todas con URLs de búsqueda — en la próxima sesión reemplazar con URLs de producto directo + añadir Snipes/Decathlon/Atmósfera donde aplique.

### 📋 Top URLs de búsqueda a reemplazar (136 modelos, prioridad alta)

Las más críticas por tráfico estimado:
- `jordan-luka-5`, `nike-gt-cut-3`, `jordan-tatum-3`, `nike-ja-2`, `nike-kyrie-low-5` — 3 tiendas cada una con search URL
- `air-jordan-37`, `nike-lebron-21`, `nike-zoom-freak-4` — Nike.es + Zalando + FL con search URL
- `reebok-question-mid`, `reebok-answer-iv` — Reebok.es + Zalando + FL con search URL

En la práctica: Nike.es y Basket World siempre son search (no tienen URLs de producto estables). FL y Zalando sí conviene reemplazar con producto directo cuando el usuario encuentre la URL.

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
- **Programas ADHERIDOS (6) — al 2026-06-12**:
  - ✅ **adidas ES** — aid: 77008, conv 2.06%, aprob 87%, EPC 0.08€ (25 links)
  - ✅ **AliExpress ES** — aid: 11640, conv 18.55%, aprob 96%, EPC 0.09€ (17 links)
  - ✅ **Forum Sport ES** — aid: 23805, conv 3.24%, aprob 57%, EPC 0.09€ (3 links de producto real)
    - ⚠ OJO: el catálogo de básquet de Forum Sport es FINO. NO tiene flagships actuales
      (LeBron 22, Curry 12, KD 18, Luka 5, Tatum 3, GT Cut 3, Hali 1, Freak 7, MB.04, Sabrina 2).
      Solo gama media/budget: Harden Vol 9 (103.99€), LeBron Witness IX (90.19€), AE 2, Precision VII,
      GT Cut Academy, Dame Certified 3 (infantil). Verificado con Claude-in-Chrome 2026-06-12.
      Formato búsqueda: `forumsport.com/es-es/search?text=QUERY`. URL producto acaba en `-p`.
      NO añadir search-links: caen en modelos equivocados. Solo enlazar producto verificado.
  - ✅ **Decathlon ES** — aid: 105405, conv 5.95%, aprob 86%, EPC 0.14€ (15 links)
  - ✅ **Atmósfera Sport ES** — aid: 26255, conv 3.74%, aprob 69%, EPC 0.16€ (11 links)
  - ✅ **Snipes EU** — aid: 122628, conv 0.88%, aprob 79%, EPC 0.07€ (14 links)
- **PENDIENTES de aprobación (6) — al 2026-06-12**:
  - ⏳ **El Corte Inglés ES** — conv 29.90%, EPC **13.99€** 🔥 (el premio gordo, prioritario)
  - ⏳ **Joom ES** — conv 7.65%, aprob 94%, EPC 0.30€ → desbloquea **19 links Joom** ya en BD (tiene_afiliado:false)
  - ⏳ **Basket-Center ES** — conv 7.27%, aprob 90%
  - ⏳ **Sneakin ES** — conv 4.32%, aprob 75%
  - ⏳ **Pro:Direct ES** — conv 0.12%, aprob 100%
  - ⏳ **Reebok ES** — N/A (recién lanzado 11/12/26) → 5 links Reebok esperando
- **Rechazados (6) — al 2026-06-18** (botón "+Unirse", reintentar en 3-6 meses con más tráfico):
  Foot Locker ES, JD Sports ES, Sprinter ES, Foot-Store ES, **size?Official ES**, **Privé by Zalando ES**.
  ⚠ CAMBIO s28: **Zalando y size? pasaron de PENDIENTE a RECHAZADO**. Sus enlaces (Zalando 27,
  size? 1) ya NO van a convertir → son peso muerto, tratar como "Ver precio"/podar (ver sesión 28).
- **Formato link Awin**: `https://www.awin1.com/cread.php?awinmid=AIDID&awinaffid=2908587&ued=URL_ENCODED_URL`

### CJ (Commission Junction) — Publisher 7969834
- ❌ **Puma EU** (#5569379) — solicitud **RECHAZADA** (2026-06). Buena estructura (Sneaker Content
  10%/8%, cookie 30d) → reintentar con más tráfico documentado. Hay **11 links puma_es** esperando.

### TradeTracker ✅ ACTIVO — User ID: 334982
- **Panel**: https://affiliate.tradetracker.com
- **Campañas ACEPTADAS (3) — al 2026-06-12**:
  - ✅ **FuikaOmar** — #37834, 5% (7 links: sabrina-2, aone, book-1, shock-wave-5, weapon, uptempo, kawhi-4)
  - ✅ **Fútbol Emotion** — #35939, 3.5% — ⚠️ SOLO `futbolemotion.com` (fútbol). NO cubre baloncesto.
  - ✅ **Referidos TradeTracker** — #1158, 3%
- ⛔ **Basketball Emotion (basketballemotion.com) NO tiene programa de afiliados** (verificado 2026-06-12).
  La campaña 35939 es Fútbol Emotion (futbolemotion.com) y su deeplink da error con URLs de basketballemotion.com.
  NO existe campaña "Basketball Emotion"/"baloncesto" en TradeTracker. → Los ~23 enlaces de `basketballemotion_es`
  están como **URL directa con `tiene_afiliado:false`** (funcionan, sin comisión). NO volver a envolverlos en
  tc.tradetracker.net. Revisar si algún día sale programa de basketballemotion.com.
  - ⛔ **CERRADO DEFINITIVO (2026-06-16)**: TradeTracker respondió por ticket que *Basketball Emotion
    NO tiene programa de afiliados*. Los ~23 enlaces `basketballemotion_es` se quedan como URL directa
    con `tiene_afiliado:false` (funcionan, sin comisión). NO volver a perseguir esto (ver sesión 27).
- **Formato deeplink**: `https://tc.tradetracker.net/?c=CAMPAÑA&m=12&a=511170&r=&u=URL_ENCODED` (FuikaOmar usa `deals.fuikaomar.es/c?c=37834&m=12&a=511170&...`)

> AUDITORÍA 2026-06-12: todo lo aprobado está correctamente activado en los datos
> (0 links de tienda aprobada en `tiene_afiliado:false`). Único pendiente: 6 enlaces
> AliExpress de marcas nicho (361° Joker 1/Big3 6/Zen 7, Rigorer AR3/AR1/Warship) son
> URLs de búsqueda planas — requieren que el usuario genere el link Portals s.click.

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
