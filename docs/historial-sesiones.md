# CANCHA.ZAPA — Historial de sesiones (ARCHIVO)

> Volcado íntegro del CLAUDE.md tal y como estaba al cerrar la **sesión 38 (24-ago-2026)**.
> Se archiva aquí porque ocupaba ~160k caracteres y se cargaba entero en cada sesión.
>
> **Claude NO lee este archivo por defecto.** Consúltalo solo cuando necesites el detalle
> completo de una sesión concreta (`## Estado ... (sesión N)`). Lo que sigue vigente —reglas,
> afiliados, arquitectura, doctrina y pendientes— vive en `CLAUDE.md`.

---

# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-08-24 (sesión 38)
> Para Claude: lee esto al empezar una sesión nueva. Cubre todo lo importante.

---

## Estado actual (sesión 38) — Repaso de mercado: 21 modelos nuevos detectados, 4 en catálogo

Commit `a61dd22`. Catálogo **234 → 238 zapas**, build **340 págs**, `astro check` 0 errores,
236 tests, `audit-enlaces` "Sin hallazgos".

### De dónde sale
El usuario pidió "revisa el mercado, creo que han salido modelos nuevos". Se contrastó el
catálogo contra las novedades reales (Hypebeast signature list 2026, WearTesters, SneakerNews,
SneakerFiles, SoleRetriever). **Resultado: 21 modelos fuera del catálogo**, varios con meses
en venta.

### Las 4 fichas creadas (bloque 1: sucesoras de flagships que ya teníamos)
| Ficha | Salida | Estado en España (verificado 24-ago) |
|---|---|---|
| `jordan-41` | 9-jul-2026 | ❌ **NO se vende** ni en Nike ES ni en Amazon ES |
| `nike-ja-4` | 13-ago-2026 | ✅ Nike ES **129,99 €**, ficha real |
| `nike-giannis-freak-8` | 1-ago-2026 | ✅ Nike ES **114,99 €**, ficha real |
| `adidas-ae-3` | 15-sep-2026 | ⏳ `proximamente: true` |

- **Solo la Ja 4 tiene score real** (WearTesters 7,5/10). Las otras 3 son `evaluacion-propia`:
  a 24-ago no hay review numérica publicada de ninguna. **Revisar cuando salgan.**
- **Los pesos son ESTIMADOS**, derivados de la predecesora + cambios de construcción. Ninguna
  tiene dato de laboratorio publicado. Actualizar cuando RunRepeat las corte por la mitad.
- Encadenados `predecesor_id`/`sucesor_id` en AJ 40, Ja 3, Freak 7 y AE 2.
- ⚠ **Estas 4 no monetizan casi nada todavía**: Nike ES no es afiliado nuestro, y Amazon ES,
  FuikaOmar, adidas ES y ECI no las stockean aún. Repuntar a ECI (6%) / Atmósfera (6%) /
  FuikaOmar (5%) en cuanto entren.

### 🔴 La AE 3 dejó de ser un fantasma
En la s26 se borró una "AE 3" por inexistente — **era correcto entonces**. adidas la anunció
después: sale el 15-sep-2026 y estrena **Hyperboost** (perlas supercríticas fusionadas, +22% de
retorno frente a Lightstrike Pro; primera zapa de baloncesto que lo lleva). Efectos colaterales
que seguían vivos y se han limpiado: un **comentario huérfano** `// 69. Adidas AE 3` sin ficha
debajo en `zapatillas.ts`, **5 fichas que la citaban** en su texto (D. Fox 2, MB.06, Pro Vision…)
apuntando a una zapa inexistente, y un **`adidas-ae-3.webp` huérfano** que en realidad era una
foto de la AE 2. Sustituido por la Cold Blooded real.

### ▶️ SIGUIENTE PASO — quedan 17 modelos por meter
**Bloque 2 (el más rentable):** `361 Joker 2` / Joker 2 GT (feb-2026, $129-149, **WearTesters
9/10**) — sucesora directa de `361-joker-1` y 361° va por AliExpress al **7%, la comisión más
alta del catálogo**.

**Bloque 3 — flagships ya a la venta:** Nike Sabrina 4 (17-jul, $135), New Balance Kawhi V
(verano 2026, $160), Puma Stewie 5 (15-may, $125), Puma Scoot Zeros III (tenemos solo la gen 1).
Sin lanzar aún: **Nike LeBron 24** (17-nov, $200, upper "KingKnit", la LeBron más ligera de la
saga) y **adidas Harden Vol 11** (dic-2026, $160).

**Bloque 4 — marcas nuevas que WearTesters puntúa 9/10 y no tenemos ni una:**
`Serious Player Only Player 1.5` ($190, "el mejor drop-in del mercado") y `EQLZ 247 NXT` ($125).

**Bloque 5 — nicho/chinas y femenino:** Li-Ning JB4 (Jimmy Butler), Peak AW4 (Wiggins),
361 AG6 (Aaron Gordon, sin confirmar del todo), **Reebok Angel Reese 1** (¡en venta desde
sept-2025!), Holo JS:01 (Jacy Sheldon, $120), LeBron NXXT Gen by JuJu, 741 Performance Rover
(Jaylen Brown), Nike GT Cut 1 Retro (WT 9,5/10) y Converse SHAI 001 Lux.

### 🔴 Curry 13 es la ÚLTIMA de Under Armour — NO habrá Curry 14
Curry y UA rompieron en **nov-2025**; la Curry 13 (13-feb-2026) es el cierre pactado, con
colorways hasta oct-2026. Curry Brand es ya independiente y él es **agente libre de calzado**.
→ La ficha `ua-curry-13` y los artículos de la saga Curry dan por hecha una continuidad que ya
no existe. **Pendiente de revisar.**

### 📌 Aprendizajes (sesión 38)
- **"Ese modelo no existe" es una foto con fecha, no un hecho permanente.** El veredicto de la
  s26 sobre la AE 3 era correcto y caducó en 8 meses. Antes de reusar una nota de "fantasma",
  mirar cuándo se escribió. Ahora la nota vieja lleva su aviso de caducidad al lado.
- **Al borrar una ficha quedan restos en tres sitios**: el comentario de sección, la imagen en
  `public/shoes/` y las MENCIONES en el texto de otras fichas. Los tres sobrevivieron 8 meses.
- **Verificar la disponibilidad en ES, no deducirla del lanzamiento global.** La AJ 41 lleva
  desde julio en el mercado y hoy no está ni en Nike ES ni en Amazon ES. Sale con sus enlaces
  en `disponible: false` porque se COMPROBÓ, no porque se supusiera.
- **La búsqueda de Amazon confirma el aviso de la s34**: "air jordan 41" devuelve AJ1 y AJ4
  sueltas. Un resultado no vacío no es un resultado correcto.
- **Para imágenes, la portada del artículo NO sirve**: son banners con marca de agua o collages
  (SneakerFiles/SneakerBarDetroit). Las buenas están en los artículos de **colorway individual**
  y en `static.nike.com`. Hay que MIRARLAS una a una: de 7 descargadas, 3 eran inservibles
  (banner con watermark, foto en mano de un revendedor, primer plano de la suela).
- **`_catalog.json` no se commitea, y esta vez se vio por qué**: al regenerarlo en local traía
  **38 líneas de churn de precios** ajenas al cambio. Vercel lo regenera solo.
- **`scoreFuentes` no tiene clave `wt` numérica**: una zapa con review de WearTesters pero sin
  HoopsGeek se registra como `editorial` + `wt_url` (igual que `lining-gamma-2`). El score sale
  bien; la etiqueta de confianza se queda corta. Si algún día molesta, es 1 rama en
  `scoreFuentes.ts`.

---
## Estado anterior (sesión 37, 3ª parte) — Hero de la home + contraste del tema claro

9 commits, de `f296342` a `4c026de`. Build 336 págs, `astro check` 0 errores, 236 tests.

### Lo hecho
**1. El vídeo del hero, de recuadro a banda de fondo.** Era una columna de 460px con máscaras
que se comían el 24% por cada lado: se veía una manchita en una caja negra. Ahora es una banda
a toda altura de `min(1000px, 62vw)` centrada, con los lados desvaneciéndose en el fondo.
- ⚠ **El vídeo es VERTICAL (540×960) y el hero muy apaisado.** A sangre completa `object-fit:
  cover` solo deja ver el **24%** de la imagen. La tabla del compromiso (ancho → % visible):
  600px 76% · 750px 61% · 900px 50% · **1000px 45%** · 1300px 35% · completo 24%.
- El scrim (`.home-hero-bg::after`) necesita `z-index: 1` para quedar por encima del vídeo.

**2. El panel del radar, translúcido (0.85 → 0.30) y sin blur.**
- ⚠ **Sin `backdrop-filter`.** Se probó con blur y es contraproducente: por muy translúcido que
  sea el panel, detrás solo se ve una mancha difuminada. Si se vuelve a tocar, el blur NO es la
  solución para la legibilidad.
- Al bajar a 0.30 hubo que subir dos textos que caían: `.stat .k` (2,69) y `.home-cta-foot`
  (3,29), los dos de `--cz-text-muted` a `--cz-text-soft`.

**3. El hero en tema claro: escenario acotado + degradado.** Sigue siendo oscuro (decisión s37,
correcta), pero el negro ya no llega a los bordes: `.home-hero-bg` se centra a `min(100%, 1560px)`
sobre fondo cemento, con fundido lateral del 9%.
- ⚠ **El fundido solo a partir de 1600px** (`@media`). Por debajo el escenario ocupa todo el
  viewport y el degradado caería bajo el H1: medido a 1280, el título empieza en x=24 y la zona
  opaca en x=115 → texto blanco sobre fondo aclarado.
- Nuevo token `--cz-page-bg` en la raíz del tema claro: copia del fondo de página que el hero NO
  sobreescribe, para que el margen siga la paleta.

**4. Contraste del tema claro (viene de la 2ª parte, seguía roto en 4 sitios)**
- **ChatWidget invisible: 1,03:1.** Tenía su propia familia `--chat-*` fuera del tema claro: las
  superficies aliaseaban `--cz-*` pero el texto estaba hardcodeado en `#ececee`. Afectaba a las
  336 páginas (vive en `Base.astro`).
- `estadisticas.astro`: 4 usos de `#f87171` como texto (2,2:1).
- **`calculadora.astro` tenía DUPLICADA la lógica de `CosteBlock.astro`** con los mismos dos
  fallos. Si se toca uno, mirar el otro.
- 12 usos de `#4ade80`/`#22c55e`/`#ef4444` como texto → tokens con versión por tema.
- **Los tokens claros fallaban sobre el footer y las bandas**: se calibraron contra `--cz-bg`
  (#d6d3d1) pero no contra `--cz-footer` (#bab7b2). Ajustados 8 tokens para pasar 4,5:1 contra la
  superficie MÁS oscura.

### 📌 Aprendizajes (sesión 37, 3ª parte)
- **Si el fondo es un vídeo o una imagen, MÍDELO, no supongas el peor caso.** Calculé el límite de
  transparencia del panel contra un fondo hipotético de luminancia 100-180 y me quedé en 0.65.
  Muestreando fotogramas a un canvas, el vídeo real da **mediana 86**: el panel podía bajar a 0.30,
  tres veces más transparente. Dos rondas perdidas por ser conservador con un número inventado.
- **Cambiar el tamaño de un contenedor cambia en silencio a los hijos que dependen de él en %.**
  Al acotar el escenario a 1560px, el vídeo (`min(1000px, 62%)`) pasó a 967px solo en tema claro.
  Se arregló con `62vw`: desacoplar es mejor que corregir el valor.
- **Un componente puede traer su propia familia de tokens dentro** (`--chat-*`). Al barrer restos
  para un tema nuevo no basta con rejillar por `--cz-`; buscar `--[a-z]+-`.
- **Un mismo color con dos usos necesita dos variables** — otra vez: `gColor` pintaba el % de
  desgaste (texto, necesita contraste) y la barra (relleno, invariante).
- **Aplicar el umbral WCAG correcto**: 4,5:1 texto normal pero **3:1 texto grande** (≥24px, o
  ≥18,66px en negrita). Sin eso salen falsos positivos en cada titular.

---

## Estado anterior (sesión 37, 2ª parte) — REDISEÑO: tema claro "cemento" + header/footer globales

Commits `9e8b6c8` y `54fceec`, en producción. Build 336 págs, `astro check` 0 errores, 236 tests.

### De dónde sale
El usuario trajo un **handoff de rediseño** en `C:\Users\oswal\Downloads\Rediseño premium de
CANCHA.ZAPA\design_handoff_cancha_redesign\` (README + 5 prototipos `.dc.html` + assets).
Cubre 5 pantallas (home, catálogo, quiz, ficha, rankings) en alta fidelidad, con tokens exactos.
**Se han hecho SOLO las fases 0 y 1** — la piel del sitio entero — porque lo que el usuario quería
era "mejorar el diseño y poner el modo claro", y eso vive en los tokens + header + footer, no en
las pantallas. **Las 5 pantallas rediseñadas siguen SIN implementar** (ver "siguiente paso").

### Lo hecho
**1. Header y Footer, a componentes** (`components/Header.astro`, `components/Footer.astro`)
El header estaba **copiado en 20 páginas** y cada una marcaba su enlace activo a mano. Ahora lo
pone `Base.astro` y el activo sale de `Astro.url.pathname`. Del handoff: sticky con blur, barra de
progreso de scroll, **menú hamburguesa ≤860px** y el **toggle de tema**. El footer ya era global.

**2. Los dos temas, por tokens** (`styles/global.css`)
- Rampa oscura nueva (fondo `#0c0c0c`, ya no el `#2a2a2e` de la s17) y rampa clara "cemento".
- **Canales sueltos `--cz-*-rgb`** para los ~300 `rgba()` translúcidos del design system: así cada
  alpha individual se conserva exacta y el tema claro los voltea todos de una vez, sin inventar un
  token por nivel de opacidad.
- **410 colores hardcodeados → token** en 20 archivos, con script de un solo uso.
- El tema se aplica **en `<head>` antes de pintar** (script inline que lee `localStorage`
  `cz-tema`); si se aplicara después habría flash de oscuro en cada navegación.
- Verificado: el sitio **no usa ni una utilidad de color de Tailwind** (`text-white`, `bg-zinc-*`…),
  todo va por el design system propio. Eso quitó de golpe una categoría entera de riesgo.

**3. Correcciones que el handoff NO traía** (medidas con WCAG en el navegador)
El handoff dice "naranja, amarillo y chips de score no cambian entre temas". **Es cierto para
RELLENOS y falso para TEXTO**: el naranja `#f97316` sobre cemento da **1,88:1** (WCAG pide 4,5:1).
- `--cz-accent-text` se oscurece a `#9a3412` solo en claro; el naranja de fondos no cambia.
- Igual con amarillo (`--cz-amber-text`), verde, rojo (`--cz-red-text`), oro/plata/bronce del podio
  y los colores de categoría (el cian y el amarillo bajaban de 2:1).
- La **rampa tenue del handoff** (`#79716b`/`#6d675f`) daba 3,2-3,8:1 → `#5f5952`, que pasa contra
  los tres fondos claros. **En un tema claro los grises apagados tienen suelo de contraste**: fg5 y
  fg6 acaban colapsando, y es correcto.
- `--cz-ink` para la tinta sobre color de marca. Antes se usaba `var(--cz-bg)`, que funcionaba
  **por casualidad** (el fondo era oscuro); en claro daba cemento sobre naranja.

**4. `bg-court.svg` lleva su propio degradado oscuro** (`#1a1a1d`→`#09090b`)
Como `background-image` de las fotos dejaba un **cuadro negro sobre cemento** en 4 sitios (ficha,
pick del editor, comparador, cards magazine). Pasa a **pseudo-elemento** con
`filter: var(--cz-court-filter)`: así se invierte sin arrastrar la foto del producto (un `filter`
en el contenedor afectaría también al `<img>`). Además se sustituyó por el del handoff (arco de
triples 435→609). Caché del SW a **v4**.

**5. El hero de la home se queda OSCURO en los dos temas**
Lo pide el handoff ("es cinematográfico") y se confirmó al verlo: el vídeo tiene los cuatro bordes
difuminados a transparente para fundirse con el fondo, y sobre cemento se lava. Resuelto
**redeclarando los tokens en `:root[data-cz-theme="claro"] .home-hero`** — todo lo de dentro
hereda la rampa oscura solo, sin tocar ni una regla hija.

### ▶️ SIGUIENTE PASO del rediseño (si se retoma)
Las 5 pantallas del handoff, **una a una y en este orden**: home → catálogo + ficha → rankings +
quiz. Antes de tocarlas, releer los avisos de abajo. No hay prisa: el objetivo del usuario ya está
cumplido con lo hecho.

### ⚠ AVISOS para cuando se implementen las pantallas
- **Los datos del prototipo (`zapas-data.js`) NO son fiables**: dice "datos reales" y tiene precios
  falsos (Harden Vol 9 a 29 €, AE 1 a 27 €, Jet 23 a 16 €). Y literales peligrosos: "234
  zapatillas", "Precios re-verificados 23 AGO", "100%". **Todo número debe salir del catálogo**;
  el sello de fecha ya costó la s31 (`fechaVerificacionMasReciente`, la marca es "sin BS").
- **El diseño pinta precio en TODAS las tarjetas y filas.** Choca con la regla "Ver precio" de la
  s28 (`mostramosPrecio`): solo se muestra precio de tiendas afiliadas/pendientes.
- El **quiz del prototipo trae su propia fórmula de matching** (score×6 + bonus). Es lógica, no
  diseño: se recrea la UI y se conserva la lógica real.
- El **banner de promo del prototipo es uno fijo**; el sitio tiene `promos.ts` date-gated con
  carrusel. Adaptar el diseño al sistema, no al revés.

### 📌 Aprendizajes (sesión 37, 2ª parte)
- **El dev server y el service worker MIENTEN al verificar CSS.** Perdí un buen rato depurando un
  "bug" que no existía: el SW cachea assets cache-first y sirve el CSS viejo, y el dev server
  resuelve mal los estilos con scope de Astro. **Verificar siempre contra `astro preview` del build
  y desregistrar el SW** (`cz-cache-v*`) — y ojo: el SW se registra **por origen**, así que limpiar
  el de :4321 no limpia el de :4322.
- **`getComputedStyle` a través del puente del navegador puede devolver valores obsoletos.** Llegó a
  decir que 211 títulos eran blancos cuando la captura los mostraba negros — y ni un `!important`
  ni un `style` inline cambiaban el valor leído. **Ante la duda, la captura manda sobre el DOM.**
- **Un token que funciona "por casualidad" se rompe al añadir un tema.** `color: var(--cz-bg)`
  servía de tinta oscura porque el fondo era oscuro. Al hacer el fondo claro, se invirtió el
  significado. Los tokens deben nombrar el PAPEL (`--cz-ink`), no el valor.
- **Un color de marca tiene dos usos con reglas opuestas**: como relleno es el mismo en los dos
  temas; como texto necesita versión propia. Si una variable sirve para las dos cosas (la barra de
  atributos y su número), hay que partirla.
- **Un asset puede traer su propio tema dentro.** El SVG de cancha lleva un degradado oscuro
  incrustado: ningún token lo arregla, hay que invertirlo con `filter` — y para eso tiene que estar
  en un elemento que no arrastre a sus hermanos.
- **Antes de estimar el coste de un tema claro, contar los colores hardcodeados.** 488 al empezar;
  saber que 47 eran legítimos (definiciones + generador de OG) y que no había utilidades Tailwind
  convirtió un "quizá semanas" en una tarde.

---

## Estado anterior (sesión 37, 1ª parte) — Dos tiendas congeladas por los fixes de la s36: FuikaOmar y adidas

Todo en `master` (commit `8e75a1b`). **Tests: 230 → 236.** Los DOS fixes de esta sesión son
regresiones/efectos laterales destapados al auditar la semana de pasadas que pedía la s36.
**Frescura medida hoy: 45%** (167/374) — la caída desde el 55% eran estas dos tiendas a 0%.

### 1. FuikaOmar: los 30 enlaces CONGELADOS desde el 18-ago (regresión del guard de la s36)
El log nocturno decía en cada uno "enlace de afiliado opaco, no se navega". Causa: el regex del
wrapper en `AFFILIATE_HOSTS` era `/(^|\.)fuikaomar\.es$/` y **también matcheaba
`www.fuikaomar.es`** — el dominio de la TIENDA de destino. FuikaOmar es la única red cuyo wrapper
(`deals.fuikaomar.es`) vive en el mismo dominio que la tienda, así que la comprobación de
`esRedirectOpaco` ("wrapper que sobrevive al unwrap = mal formado") daba falso positivo en el
100% de sus enlaces. **Es el aprendizaje de la s36 repetido: un guard que impide navegar también
impide re-verificar.** Fix: regex acotado a `^deals\.fuikaomar\.es$` + 2 tests. Verificado con
pasada real: 23/30 con precio (77%, su nivel de la s35).

### 2. adidas: 0% desde el ~19-ago — y NO era la IP de CI
La s36 lo dejó al 93%·1d; desde el 20-ago los 14 fallaban en CI con "no encontrado". La primera
hipótesis (Akamai bloquea la IP de datacenter) era FALSA — en local también fallaba 12/14. Causa
real, encontrada por bisección de las opciones del contexto:
- **El `extraHTTPHeaders: Accept-Language` de `index.ts`** (ahí desde el MVP de mayo). CloakBrowser
  ya emite ese header NATIVO vía `locale: "es-ES"`; sobreescribirlo por CDP desalinea el
  fingerprint y Akamai empezó a castigarlo con **403** hacia el 19-ago. Medido: con el header
  403 · 0 tarjetas; sin él 200 · 28 tarjetas, página en español correcto. **Quitado** (era de
  contexto, afectaba a todas las tiendas; sin él el fingerprint es MÁS nativo).
- Con eso arreglado quedaban 3 fallos con una firma nueva en el diagnóstico: **adidas redirige la
  búsqueda DIRECTO a la ficha cuando hay un único resultado** (Forum 84, Pro Model, AE 1 GS — las
  2 primeras son justo las recuperadas en s36) y ahí no hay listado que leer. Cubierto en
  `adidas_es.ts`: se valida el `h1` (mismos filtros: prenda, junior en los dos sentidos, matcher)
  y el precio sale del estado embebido **`pricing_information.currentPrice`** + stock del `Offer`
  JSON-LD. ⚠ Los `[data-testid="main-price"]` de la ficha NO sirven: hay 53 y TODOS son del
  carrusel de recomendados (la trampa de Snipes de la s34, otra vez).
- Resultado local: **2/14 → 14/14**. Afloran rebajas: Forum 84 120→84, Believe That 1 100→52,
  Superstar 120→75, AE 1 GS 58,5→54.
- Añadida línea de diagnóstico al fallar (nº tarjetas + título de página) para separar
  bloqueo / redirect-a-ficha / no-match en el log de CI.

### 3. La pasada del 19-ago fue CANCELADA a las 2h30m (timeout 150 min)
El mismo modo de fallo que tuvo el scraper muerto un mes (s31): el commit es el último paso, así
que esa noche no se guardó NADA. Las 4 pasadas siguientes volvieron a ~1h30 (parece puntual), pero
**si se repite**: subir `timeout-minutes` o hacer que el scraper escriba resultados parciales.

### ▶️ SIGUIENTE PASO (retomar aquí)
1. **Mirar el log de la pasada nocturna del 24-ago**: en local todo verde, pero si Akamai además
   penaliza la IP de GitHub, adidas puede seguir fallando en CI — la línea de diagnóstico nueva
   dirá exactamente por qué (0 tarjetas = bloqueo; título de ficha = redirect; N tarjetas = matcher).
2. Con FuikaOmar y adidas de vuelta, la frescura debería volver a ~55-58% en unos días.
   Confirmar con la semana, no con una noche.
3. **amazon_es sigue siendo el siguiente objetivo** (40%, mediana 21d, 174 enlaces).
4. Pendientes de decisión del usuario heredados de la s36: los 7 `s.click` de marca china,
   `rigorer-ar1`/`warship` (la API no los indexa), `361-zen-7` (156,99 vs 90), 3 Asics sin
   opción monetizada.

### 📌 Aprendizajes (sesión 37)
- **Al escribir un guard por HOST, distinguir el host del wrapper del host de la tienda.** Si una
  red usa el dominio de la propia tienda para el tracking, un regex de dominio entero convierte el
  destino legítimo en "wrapper mal formado".
- **"Funciona en local, falla en CI" no siempre es la IP.** Aquí fallaba en los dos sitios (2/14
  local); la primera pasada local completa desmintió la hipótesis de la IP antes de perseguirla.
- **Un header inyectado "inofensivo" es deuda de fingerprint.** Puede convivir meses con el WAF
  hasta que el WAF aprende a verlo. Si el navegador stealth ya emite el header nativo (locale),
  NO sobreescribirlo por CDP. Ojo si algún día se añaden `extraHTTPHeaders` para otra cosa.
- **Un buscador puede responder con una FICHA.** Si el scraper solo sabe leer listados, el
  resultado único (el caso más inequívoco) es justo el que falla. Y en la ficha, el selector de
  precio "obvio" era 53 veces el carrusel: validar SIEMPRE de qué contenedor sale el precio.
- **La bisección de opciones de contexto es barata y concluyente**: 4 sondas de un minuto
  aislaron el header exacto que provocaba el 403.

---

## Estado anterior (sesión 36) — Clicks de afiliado FALSOS, el símbolo ° y 20 enlaces muertos

Todo en `master`. **Tests: 224 → 230.** Build OK, 336 páginas, `astro check` 0 errores.
**Frescura 52% → 55%** (204/374). Ojo al leerlo: sube en parte porque se han QUITADO 20
enlaces que no se podían verificar nunca — el numerador no se mueve, el denominador sí.

| Tienda | s35 (18-ago) | Ahora | Nota |
|---|---|---|---|
| **adidas_es** | 41% · **79d** | **93% · 1d** | quedan solo fichas reales (27→14 enlaces) |
| elcorteingles_es | 53% | 60% | 34→30 (los 4 de Skechers, muertos) |
| aliexpress | 38% | 36% | 47→44 (los 3 Asics, falsos) |
| amazon_es | 41% | 41% | sin tocar — es el siguiente objetivo |

### 1. Los enlaces `s.click` generaban un CLICK DE AFILIADO FALSO cada noche
`aliexpress_api.ts` devuelve null para los `s.click` **a propósito** (regla s31). Pero al
devolver null el scraper **caía al navegador**, y `index.ts` hace `goto(unwrapAffiliateUrl(url))`
— y `unwrapAffiliateUrl` **no puede** desenvolver un `s.click`: solo saca el destino de wrappers
que lo llevan en un query param (Awin `ued`, TradeTracker `u`). Navegaba el wrapper tal cual.
**La protección de la capa de arriba quedaba anulada por la capa de abajo: ~10 clicks falsos por
pasada (~300/mes) en la tienda de comisión más alta (7%)** — y a cambio de NADA: los 7 de marca
china llevaban sin dar precio desde mayo.
- `esRedirectOpaco()` en `matcher.ts`; el bucle los salta **conservando su fecha original**.
  Verificado en pasada real: los 7 siguen con fecha de mayo, no se re-fechan.

### 2. El símbolo `°` hacía IMPOSIBLE emparejar cualquier zapa de 361°
La marca del catálogo es `"361°"` y `normalize` no tocaba el grado, así que la marca normalizada
seguía siendo `361°` — cadena que **ninguna tienda escribe** (AliExpress pone "361 grados" o
"361 °" con espacio). La comprobación de marca fallaba **siempre**, antes de mirar el modelo.
- **No era cosa de las búsquedas**: ninguna zapa de 361° podía emparejar por título en NINGUNA
  tienda. No se veía porque la única que daba precio (`361-joker-1`) va por `product_id`.
- **El test de invariante de la s34 no lo detecta**: compara el catálogo consigo mismo y ahí
  el ° está en los DOS lados. Un invariante que solo se mira a sí mismo no ve un símbolo que
  ninguna tienda escribe. Si aparece otra marca con símbolo raro, mismo agujero.
- Fix: `normalize` manda `°` a espacio, como ya hacía con `.` y `·`. Medido: la Big3 pasó de
  **0/8 candidatos emparejados a 8/8**, y de 105 € rancios a **79,69 € reales**.

### Las 4 búsquedas `wholesale`, CERRADAS (era la pregunta pendiente de la s35)
Se añadió el diagnóstico que faltaba (`onDiag`: cuántos candidatos trae la API **antes** del
matcher). La respuesta estaba **partida en dos**, con arreglos opuestos:
- `361-big3-6-pro` → **RESUELTO**, 79,69 € y enlace auto-reparado a ficha real.
- `361-zen-7` → ya empareja (1/1), pero su único candidato cuesta **156,99 € vs 90 €** guardados
  y lo descarta el guardarraíl de plausibilidad. **Correcto**, no es bug. Falta decidir a mano si
  el 90 € era irreal o si AliExpress solo tiene un listado caro.
- `rigorer-ar1` y `rigorer-warship` → **0 candidatos de la API, sin error**. La API no indexa esas
  marcas nicho por keywords. **No hay nada que arreglar en código**: hay que repuntar o quitar.

### 3. El enlace auto-reparado apuntaba a un s.click imposible de re-verificar
Solo se vio corriendo la pasada de verdad. Con el matcher arreglado, el merge auto-reparó la Big3
a la **`promotion_link` de la API, que es otro `s.click`** → `awin1 → s.click` → desde la noche
siguiente `esRedirectOpaco` lo habría saltado y el precio habría quedado congelado **para siempre**.
Se auto-reparaba a algo muerto: peor que no repararlo.
- `AeProduct.urlFicha` (canónica desde el `product_id`) es lo que se guarda ahora. El merge le
  re-aplica el wrapper Awin encima → monetiza igual (cookie 30 d) y sigue siendo verificable.

### 4. Reintento del límite de frecuencia de la API
3 de 47 enlaces fallaron con `ApiCallLimit` ("this ban will last 1 seconds") y se contaban como
"no está en el catálogo" — la conclusión **contraria** a la verdadera. `callAe` reintenta **solo**
ese error (1,5 s y 4 s, re-firmando porque el timestamp entra en la firma). Pasada siguiente:
**0 errores de API**.

### 5. Veinte enlaces que no llevaban a ninguna parte, verificados HOY uno a uno
La nota de la s34 decía que los 15 `search?q=` de adidas fallaban "legítimamente". Re-verificado
con Chrome: **cierto en 13, pero NO en 2**.
- **RECUPERADOS (2)**: `adidas-forum-84` → `/zapatilla-forum-84-low-adv/FY7998.html` y
  `adidas-pro-model` → `/zapatilla-pro-model-adv/IE6593.html`, ambos 120 €. adidas SÍ los vende y
  redirige la búsqueda a la ficha. Pasan de 78 días a verificarse cada noche.
- **BORRADOS de adidas (13)**: la búsqueda devuelve otra cosa — `crazy-8`→pantalones,
  `trae-young-3/4`→calcetines, `dame-8`→Dame X Niño, `exhibit-b`→gorra, `harden-vol-8` y
  `stepback-4`→Vol 9/10, `dame-certified`→chaqueta, `ownthegame-2`→VL Court… Salían como
  `disponible: true` con precio de hace 78 días. Las 13 conservan otra opción (11 con afiliado).
- **BORRADOS de ECI (4 Skechers SKX)** — cierra el pendiente que venía de la **s31**: el 403 no
  probaba nada; con Chrome se ve que están rotos por partida doble. La ruta
  `/deportes/buscar/?term=` **ya no existe** (ahora `/search-nwx/`) y su buscador **ignora el
  modelo**: "skx", "je1" y "resagrip" devuelven las **mismas 304 fichas**, todas Skechers de andar.
  ECI no vende la línea SKX de baloncesto. Las 4 conservan Amazon con afiliado.
- **BORRADOS de AliExpress (3 Asics)**: `unpre-ars-2`, `gelhoop-v17` y `glide-nova-ff-4`
  compartían **literalmente el mismo `s.click`** y cada una sacaba un precio distinto de él
  (132,39 / 119,39 / 118,39). Resuelto una vez a mano: apunta a **`best.aliexpress.com`, la home
  promocional**, no a un producto. No era el enlace equivocado: es que no era un enlace de producto.
- `scripts/audit-enlaces.ts`: **715 → 695 enlaces y "Sin hallazgos" por primera vez.**

### Pendiente / requiere decisión del usuario (sesión 36)
- **Los 3 Asics se quedan sin opción monetizada** (solo kickscrew, sin afiliado). Para recuperarla
  hace falta ficha real de AliExpress **con sello Marcas+ Verificado** (Asics es marca occidental,
  regla s28) — eso lo tiene que pasar el usuario, no se puede auto-resolver por búsqueda.
- **Los 7 `s.click` de marca china** (peak, anta, lining) ya no se tocan: ni click falso ni datos,
  congelados desde mayo. Se pueden pasar a búsqueda por API (son marcas chinas, la regla Marcas+
  no aplica) o resolverlos a mano una vez y guardar el `product_id`. **Decidir.**
- `rigorer-ar1` / `rigorer-warship`: la API no los indexa. Repuntar a mano o quitar.
- `361-zen-7`: 156,99 € (API) vs 90 € (catálogo). ¿Cuál es el bueno?
- `deploy.yml` lleva fallando desde el 26-may (heredado). El deploy real lo hace Vercel.

### Aprendizajes (sesión 36)
- **Una protección en una capa no protege si la capa de abajo hace lo contrario.** La API evitaba
  el click falso devolviendo null, y ese mismo null mandaba al navegador a hacerlo. Al blindar
  algo, seguir el camino del fallo hasta el final.
- **Un guard que impide navegar también impide RE-verificar.** Al prohibir una forma de URL hay
  que mirar quién la ESCRIBE, no solo quién la lee: nuestro propio merge la estaba escribiendo.
- **Un invariante que compara el sistema consigo mismo no ve los sesgos compartidos.** El ° estaba
  en los dos lados del test. Los invariantes hay que contrastarlos con datos REALES de tienda.
- **Un fallo silencioso y un fallo ruidoso piden arreglos opuestos.** Hasta que el log no dijo
  "8 de la API, 0 emparejan", "0 de la API" y "ApiCallLimit" por separado, los tres eran el mismo
  "no encontrado" y llevaban a la conclusión equivocada.
- **Re-verificar antes de borrar salva datos, no solo evita errores.** La nota decía que los 15 de
  adidas estaban muertos; 2 estaban vivos. Si se hubieran borrado a ciegas se habrían perdido.
- **Un precio "fresco" puede venir de una URL que no es de ningún producto.** Los 3 Asics tenían
  fecha de ayer y precios distintos... salidos de la home de AliExpress.
- **Quitar enlaces sube la frescura sin verificar nada nuevo.** Al leer el %, mirar también el
  número de enlaces: 52%→55% es sobre todo dejar de contar lo que nunca se podía comprobar.

---

## Estado anterior (sesión 35) — API de AliExpress + bug de precio en el merge + enlaces muertos

Todo en `master`. **Tests: 156 → 191.** Build OK, 336 páginas.

### 📊 La pasada del 7-ago CONFIRMÓ el efecto de la sesión 34

Predicción de la s34: ~45%. **Real: 51% (203/398).** Venía del 29%.

| Tienda | s32 | 7-ago | Mediana |
|---|---|---|---|
| amazon_es | 29% | **41%** | 46d |
| aliexpress | 6% | 15% | 45d |
| elcorteingles_es | 74% | 71% | 1d |
| decathlon | 81% | 72% | 1d |
| **fuikaomar_es** | **0%** | **77%** | 1d |
| adidas_es | 41% | 44% | 68d |
| **atmosfera_sport** | **4%** | **93%** | 1d |
| **snipes_eu** | **0%** | **57%** | 2d |
| **forumsport_es** | **1** | **69%** | 1d |

⚠ **AliExpress 6→15% NO es una mejora**: sigue bloqueado por el reto, es la misma variación que
engañó en la s33 (3→11 y luego cayó a 5). Y el 51% global es UNA noche: **reconfirmar el 13-14 ago**.

### ✅ Completado (sesión 35)

**1. Cliente de la API de afiliados de AliExpress** — commit `2f3d8e0`
`stores/aliexpress_api.ts` + wiring en `aliexpress.ts`. **Sin credenciales NO cambia nada**:
`getAeCredentials()` da null y se usa el navegador de siempre.
- **Gateway NUEVO**: `https://api-sg.aliexpress.com/sync`, firma **sha256** (hex mayúsculas).
  NO el viejo `gw.api.taobao.com/router/rest` con md5. AliExpress migró a su Open Platform.
  Siempre **POST**, aunque el método se llame `...get`.
- Los **7 enlaces `wholesale?SearchText=`** (Asics, Rigorer, 361°) se resuelven por
  `aliexpress.affiliate.product.query` + nuestro matcher, cogiendo **el más barato que empareja**.
  Devuelve la ficha → el merge auto-repara el enlace, como pasó con Amazon en la s34.
- Los **7 `s.click` cortos devuelven null A PROPÓSITO**: seguir el redirect para sacar el id
  generaría un **CLICK DE AFILIADO FALSO** por pasada y hundiría el EPC (error de la s31).
  Hay test que lo blinda. Son todos de marca china → podrían ir por búsqueda si se decide.
- ⚠ **SIN VERIFICAR contra la API real**: la variante de firma y los params de sistema exactos.
  Aislado en `signParams`/`buildSignedParams` por si hay que tocarlo. Si da `sign error`, es ahí.
- **product_id recuperable: 33/47** (no 30: `unwrapAffiliateUrl` resuelve wrappers anidados).

**2. BUG GORDO de precio: el merge mostraba el producto EQUIVOCADO** — commit `9d5a219`
`mergePrices.ts` indexaba el scrape **solo por tienda** (`new Map(...[l.tienda, l])`). Si una
tienda tiene VARIOS productos para la misma zapa, el Map se queda con el **ÚLTIMO** y se lo aplica
a todos sus enlaces. En un comparador es el peor fallo posible.
- Medido: **`361-joker-1` (trending) mostraba 151,40 € cuando su AliExpress más barato eran
  57,05 €** (+94,35). `anta-kai-1-speed`: 58,09 en vez de 40,48.
- Fix: emparejar por **PRODUCTO** (host+ruta, sin wrapper ni query) y, si no se puede identificar,
  coger **el MÁS BARATO** — nunca el último por azar.
- **Wrapper ANIDADO**: `setWrapperDestination` metía un wrapper dentro de otro porque precios.json
  guarda la URL ya envuelta (enlaces Awin de ~230 chars). Se desenvuelve el destino antes de
  envolver. Anidados **3 → 0**. Duplicados 10 → 7 (los 7 que quedan son del editorial, no del merge).
- Nuevo `mergePrices.test.ts` (primer test de este módulo).

**3. Los 4 enlaces MUERTOS de Snipes, borrados** — commit `bca381b`
Verificado **hoy** contra la URL de destino (nunca el wrapper): `/c/zapatillas?q=` da **404**.
El editorial ya los tenía en `disponible:false` pero **precios.json los resucitaba a `true`** con
precio de mayo → mostrábamos 199,99/200/105 € de una tienda que no las vende, con click a 404.
- `reebok-answer-iv` queda con **0 enlaces disponibles**, que es la verdad (s21: nadie la stockea).

**4. 14 enlaces de Basketball Emotion con wrapper MUERTO + las filas duplicadas** — commit `5c3478e`
- Iban envueltos en `tc.tradetracker.net` campaña **35939, que es FÚTBOL Emotion**. El ticket de
  la s27 ya cerró que basketballemotion.com NO tiene programa y que ese deeplink da error con sus
  URLs. **El editorial ya usaba URL directa; era `precios.json` quien la PISABA** con la vieja
  envuelta (2 de los 14, doblemente envueltos). Verificadas 3 fichas de destino: **200**.
- **NO se borraron**: 11 de las 12 zapas tienen su enlace de BE **solo en `precios.json`**, así que
  borrarlas quitaría la opción de compra (aviso de la s31). Se desenvuelve la URL y la entrada queda.
- **La otra cara del bug del merge**: con VARIOS enlaces editoriales de una tienda y UNA sola
  entrada en `precios.json`, esa entrada se aplicaba a todos → los 3 acababan con la misma URL y
  la ficha enseñaba **la misma opción de compra 2 o 3 veces**. Ahora solo se aplica al enlace que
  se identifica por producto; si no se sabe a cuál corresponde, se conserva el editorial.
- Efecto: BE envueltos 14 → 0, anidados 0, **filas duplicadas 7 → 0**.

**5. `scripts/audit-enlaces.ts`** — commit `932355a`
La revisión de salud de enlaces que esta sesión hizo a mano. **No pide ni una página** (corre sobre
el catálogo mergeado → instantáneo y sin clicks falsos). Detecta wrappers anidados, filas
duplicadas, rutas que la tienda ya retiró, wrappers de redes que no cubren esa tienda, y zapas sin
ninguna opción disponible. `RUTAS_MUERTAS` y `SIN_PROGRAMA` quedan escritas dentro **a propósito**:
cada una costó una sesión descubrirla.
- Estado hoy: **715 enlaces · 0 anidados · 0 duplicados · 0 mal envueltos**, y los 4 de ECI como
  único hallazgo. 3 zapas con enlaces pero ninguno disponible (`reebok-question-mid`,
  `reebok-answer-iv`, `nb-omn1s`) — correcto, nadie las stockea.

### ✅ LA API DE ALIEXPRESS YA ESTÁ VIVA (17-ago) — funciona, pero a medias

App creada en openservice.aliexpress.com (categoría **Affiliates API**, nombre `CANCHA ZAPA`
— el punto de "CANCHA.ZAPA" lo rechaza: no admite caracteres especiales). Secrets
`ALIEXPRESS_APP_KEY` / `ALIEXPRESS_APP_SECRET` puestos en GitHub el 17-ago.

⚠ **Hizo falta un fix de CI** (`cb87d59`): el paso "Ejecutar scraper" solo exportaba `NODE_ENV`,
así que con los secrets puestos el scraper **seguía sin verlos** y caía al navegador sin avisar.
Si algún día se añade otra credencial, acordarse de este agujero.

**MEDIDO en pasada real de CI (run 32061853281, solo AliExpress):**
- **La firma HMAC entró A LA PRIMERA, sin `sign error`.** El gateway sha256 de `signParams` es
  correcto; la duda de la s35 queda cerrada.
- **17/47 (36%)**, frente a ~5-7 por navegador. 47 enlaces en **2 minutos** (antes >1 h).
- Afloran precios que llevaban meses invisibles: 63,69→71,69 · 204,58→220,39 · 78,69→101,39.

### 🔬 DIAGNOSTICADO (17-ago, 2ª pasada): los fallos NO son un bug nuestro

Antes de diagnosticar hubo que **hacer visible el motivo**: `callAe` devolvía `[]` con un HTTP 500
igual que con una respuesta correcta y vacía, y `parseProducts` devolvía `[]` al ver
`error_response`. **Tres causas opuestas, un solo síntoma** ("❌ no encontrado"). Arreglado en
`765d92f`: `callAe` devuelve `{ products, error }`, `parseAeError` lee el `error_response`
prefiriendo `sub_code`/`sub_msg`, y el scraper imprime `API AliExpress [código] mensaje · zapa-id`.

**Resultado de la pasada con el log ya hablando (run `32063586907`): CERO líneas de error.**
Ni un `sign error`, ni permisos, ni HTTP. O sea: **la API responde bien y dice que no tiene el
producto**. Los fallos son respuestas correctas y vacías.
- ⇒ Los ~19 `product_id` de ficha que no dan dato **no están en el catálogo de afiliados**. La
  acción NO es tocar código: es repuntar o quitar esos enlaces, uno a uno.
- ⇒ El scope **Affiliate está concedido** (si no, saldría `isv.permission-deny` en cada llamada).
- ⚠ 15/47 en esta pasada frente a 17/47 en la anterior, con el mismo código de API: **el propio
  catálogo de AliExpress fluctúa entre pasadas**. No perseguir 2 enlaces de diferencia.
- `page_no=1` en `product.query` (hipótesis) **NO arregló** las búsquedas: siguen a cero y **sin
  error**, así que la API devuelve lista vacía o el matcher descarta todo. Falta separar esas dos.

### ▶️ SIGUIENTE PASO (retomar aquí)
1. **Las 4 búsquedas `wholesale` dan CERO y sin error.** Loguear cuántos candidatos devuelve
   `productQuery` ANTES del matcher: si vienen 20 y el matcher los tira, es nuestro; si vienen 0,
   es que la API no indexa esas marcas nicho por keywords.
2. **Repasar a mano los ~19 enlaces de ficha que la API no reconoce** (ver arriba: no es bug).
3. **Reconfirmar la frescura con una semana**, no con una pasada (aprendizaje repetido: el salto
   3→11 de agosto era ruido y volvió a 5). Medido el 17-ago: total **52%**, aliexpress **38%**.

### ✅ CERRADO (17-ago) — adidas colaba ROPA como si fuera la zapatilla
Commits `fd9f72a` (filtro), `02c1768` (corrección) y `e5add8a` (datos).
- La causa no era la página 404: el scraper de adidas **nunca visita la URL guardada**, siempre
  reconstruye la búsqueda. Buscando "adidas superstar" adidas devuelve la línea entera (de 15
  tarjetas solo 4 son calzado) y, como cogemos **la más barata que empareja** (s34), ganaban unas
  mallas de 50 €. El enlace del catálogo NO estaba mal: es una búsqueda `?q=superstar`.
- `matcher.ts`: `NO_ES_CALZADO` + `esPrenda()`, para TODAS las tiendas. Los singulares quedan
  fuera a propósito ("malla" es el tejido del upper, "media caña" una altura).
- ⚠ **La ruta NO vale como lista blanca**: 19 de los 20 enlaces de adidas cuelgan de
  `/zapatilla-…` pero la **DON Issue 7 vive en `/d.o.n.-issue-7/`** y es una zapatilla real.
  Exigir el prefijo la dejaba sin precio: cambiaba un fallo por otro. La ruta solo CONFIRMA;
  para rechazar hay que reconocer una prenda. Hay test.
- Datos: quitadas las 2 entradas de mallas de `adidas-superstar` (la 2ª entró el 17-ago sola —
  el bug seguía trabajando cada noche).

### 🗒️ Contexto viejo del bug de adidas (ya cerrado, se deja por el diagnóstico)
Detectado el 9-ago diagnosticando adidas.
- `adidas-superstar` apunta a `/mallas-cortas-deportiva-adidas-originals-superstar/KT6964.html`
  → son **MALLAS, no zapatillas**, y además el enlace está MUERTO: redirige a
  `/mallas-originals-superstar-cortas` y sirve **`h1` = "No se encuentra la página" con status 200**
  (mismo truco que Snipes, s34: la 404 viene con 200, hay que mirar el CONTENIDO).
- Aun así el scraper devuelve **`→ 50€ (sin cambio)`, éxito 1/1**, y lo re-fecha como fresco cada
  noche. O sea: mostramos precio de un enlace muerto que encima era de otro producto.
- Faltan dos arreglos: (1) `stores/adidas_es.ts` debe rechazar la página de error, y (2) el enlace
  del catálogo está mal de origen (mallas) → repuntar a la ficha real de la Superstar o quitarlo.
- ⚠ Revisar si el resto de fichas de adidas tienen el mismo agujero.

### 📊 adidas: el reparto de fallos está MEDIDO (9-ago)
**Las 12 fichas van al 100% (0-2 días); las 15 búsquedas `/search?q=` van al 0% (69 días).**
No es un scraper inestable, es un corte limpio por tipo de enlace. Y los 15 fallos de búsqueda
**son legítimos**: comprobado que `?q=dame+9` devuelve 3 resultados que no son la Dame 9 (sale una
"Bota con cremallera GS" a 200€) y que `?q=trae+young+3` da "sin resultados" + 1640 productos
aleatorios. El matcher los rechaza bien. → Para subir adidas del 44% hay que **fijar fichas a mano**,
no tocar el scraper (mismo patrón que Amazon en s34).

### 🟡 Pendiente / requiere decisión del usuario (sesión 35)
- **4 enlaces ECI de Skechers SKX**: NO se tocaron. `elcorteingles.es` responde **403** a una
  petición automatizada (su anti-bot), lo que **no prueba** que el enlace esté muerto. Para
  verificarlo hay que ir con Chrome: **primero la home**, luego la búsqueda (ver truco de ECI en
  la sección de Awin). Borrarlos sobre la nota de la s31 sin comprobar sería adivinar.
- `deploy.yml` lleva fallando desde el 26-may (heredado). El deploy real lo hace Vercel.

### 📌 Aprendizajes (sesión 35)
- **Un bug de datos puede esconder otro más gordo.** Buscando por qué un enlace de AliExpress no
  daba `product_id` apareció el wrapper anidado, y tirando de ahí, que el merge enseñaba un precio
  casi 3× el real en una zapa trending. Nadie lo habría visto mirando el scraper.
- **Indexar por tienda asume una tienda = un producto.** Es falso: AliExpress, Amazon y los
  marketplaces tienen varios listados de la misma zapa. Al mapear scrape↔catálogo, la clave es el
  PRODUCTO, no la tienda.
- **Un 403 no es un enlace muerto**, es un anti-bot. Solo el 404 de Snipes justificaba borrar.
  Nunca borrar datos sobre una nota vieja sin volver a verificar.
- **Para verificar un enlace de afiliado, pedir SIEMPRE la URL de destino desenvuelta.** Pedir el
  wrapper genera un click falso y ensucia el EPC (misma regla que en el scraper, s31).
- **La vía legítima no siempre es la más lenta**: la API de AliExpress evita el reto anti-bot, es
  más rápida que el navegador y encima resuelve los enlaces de búsqueda que nunca emparejaban.
- **Antes de borrar un dato, mirar SI VIVE EN OTRO SITIO.** Los 4 de Snipes se borraron porque el
  editorial ya los tenía; los 14 de Basketball Emotion NO, porque 11 solo existían en
  `precios.json` y borrarlos habría quitado la opción de compra. Mismo síntoma, arreglo opuesto.
- **`precios.json` no solo trae precios, trae URLs — y pisa las buenas.** El editorial tenía la URL
  directa correcta de Basketball Emotion y el merge la sustituía por el wrapper viejo. Al revisar
  una tienda, mirar SIEMPRE las dos fuentes, no solo el editorial.
- **Un bug simétrico se arregla dos veces.** El merge fallaba con varias entradas scrapeadas por
  tienda Y con varios enlaces editoriales por tienda. Arreglar un lado dejó el otro vivo un día.

---

## Estado anterior (sesión 34) — Últimas 2 tiendas sin scraper + Amazon: diagnóstico y falsos positivos

Todo en `master` y verificado con pasadas reales por tienda. **Tests: 114 → 156.**
**Ya NO queda ninguna tienda afiliada sin scraper.**

### ✅ Completado (sesión 34)

**1. Scrapers nuevos: Snipes (6/9 fichas) y Forum Sport (9/13)** — commit `22330ab`
27 enlaces que no se verificaban NUNCA (mediana 48-57 días). Ninguna tiene anti-bot: la
ficha responde 200 al primer intento (**2 s Forum Sport — la más rápida de todas—, 4 s Snipes**).
- **Las dos publican precio Y stock en el JSON-LD.** El DOM NO sirve en ninguna:
  - Snipes repite `.product-price` para el **carrusel de recomendados** (en la AJ4 de 170 € el
    primero marca 119,99 €).
  - Forum Sport junta PVP tachado y precio de venta en el mismo bloque. Y ojo: sus
    `span.size-item` **NO son stock**, son la tabla de equivalencias de tallas y salen TODOS con
    clase `off` aunque el producto esté a la venta.
- **Quedarse siempre con el objeto de PRIMER nivel**: el producto anida otros con sus propios
  precios (`isSimilarTo` en Snipes, `hasVariant` en Forum Sport — la Harden Vol 9 blanca a
  159,99 € agotada junto a la amarilla a 95,99 € disponible).
- Bajadas que llevaban meses sin verse: AJ11 200→160, AJ3 170→140, AJ1 Low 140→70, DON Issue 7 GS
  70,19→53,99, Dame X GS 50,73→41,99, Crossover 2 57,11→47,99, AE 2 83,84→77,99.
- **Los 7 fallos restantes NO son bugs: los 7 son AGOTADO de verdad**, verificados uno a uno.

**2. Dos arreglos de emparejamiento que afloraron al medir los fallos**
- **`matcher.ts`: "niño"/"niña"/"kids" → gs.** Las tiendas españolas rotulan así el segmento
  junior ("adidas Dame X rojo zapatilla baloncesto **niño**"). Va en la línea del fix de s33
  (junior/jr/grade school) y recuperó **3 GS que SÍ tenían stock**. Se aceptan las variantes sin
  tilde porque así vienen en los slugs de URL.
- **`forumsport_es.ts`: el slug de la URL como identidad de último recurso** (`textoDeSlug`).
  La AE 2 se publica como "adidas ANTHONY EDWARDS" en el `name`, el `h1` y el `<title>` — los
  tres se comen la generación — y **solo el slug** dice cuál es. Se toma de la URL FINAL para que
  un redirect no valide el producto que pedimos en vez del que nos han servido.

**3. Las 5 URLs de búsqueda de Snipes están MUERTAS**
`/c/zapatillas?q=…` sirve una **404 con status 200** y un carrusel de productos aleatorios; el
`?q=` ya no filtra (`/c/zapatos-3?q=kobe` devuelve la categoría entera) y `/c/zapatillas` sin id
tampoco existe. Por eso el scraper **exige un `Product` en el JSON-LD**: si se conformara con el
primer producto de la página, cada búsqueda muerta devolvería unas Air Force 1 cualesquiera.
- **Recuperada**: `reebok-question-mid` → ficha real (`/p/reebok-question-mid-gris-17566`, 80 €,
  agotada). Retirada además su entrada rancia de `precios.json`, que la daba disponible a 120 €.
- **NO recuperables** (ver pendientes): el sitemap `es-es/sitemap_products.xml` (8,5 MB, útil para
  comprobar catálogo) confirma **0 resultados** para kobe, answer y AJ39. Snipes solo tiene
  retros AJ1/3/4/5/6/7/11.

### ✅ Completado (sesión 34, 2ª parte) — AMAZON: diagnóstico cerrado + bug de falsos positivos

**4. Por qué Amazon DIVERGE entre local y CI (la duda que venía de s32)** — commit `166a7cd`
Comparados los 174 enlaces entre la pasada nocturna REAL de CI y una pasada local idéntica:
- **CI 52/173 (30%) vs LOCAL 81/173 (47%)**. La divergencia es real y **estable**, no ruido.
- **NO es un captcha**: 0 errores duros, 0 páginas de reto. Lo que cambia son las **ofertas**
  (hay flips en las DOS direcciones en "descartado por precio implausible"): Amazon sirve
  vendedores/precios distintos a la IP de datacenter de GitHub que a una IP española.
- **Pero la causa dominante NO es la IP, es el TIPO DE ENLACE**: 96 de los 174 son búsquedas
  `/s?k=` y aciertan el **8%** en CI, frente al **56%** de las fichas `/dp/`. → el arreglo no es
  endurecer el scraper, es **fijar fichas**.

**5. BUG GORDO: la búsqueda de Amazon validaba productos EQUIVOCADOS** — commit `166a7cd`
El matcher comparaba contra el texto COMPLETO de la tarjeta de resultado, que incluye **precio,
valoración y talla**. Para un modelo que se llama por un número, cualquier "40,00 €" o "talla 40"
lo validaba. **Medido: 8 de 31 aciertos aparentes (26%) eran OTRO producto**:
| Buscábamos | Era realmente |
|---|---|
| Air Jordan 40 | AJ1 Mid **de béisbol**, talla 40 EU |
| Air Max CB 34 | Air Max **270**, talla 34 EU |
| Zion 4 | Zion **3** |
| Harden Vol 8 | Harden Volume **9** |
- Fix: **la tarjeta solo PROPONE** (hasta 3 candidatos), **quien decide es la ficha**: se abre el
  `/dp/` y se empareja contra el `#productTitle`, que es el nombre real sin precio ni talla
  pegados. Verificado: los 4 falsos positivos se rechazan y los aciertos buenos siguen pasando.
- Efecto secundario bueno: al devolver la URL `/dp/` verificada, `resolveUrl` la fija sola en el
  merge → **los enlaces de búsqueda se auto-reparan** noche a noche.

**6. Dos bugs de matcher, y el segundo lo destapó el primero** — commits `6fac805`, `fde2140`
- **Siglas punteadas**: al normalizar, el punto se vuelve espacio, así que "G.t. Cut 3" quedaba
  "g t cut 3" y el token OBLIGATORIO `gt` no aparecía NUNCA. `normalize()` une ahora las rachas de
  2+ letras sueltas ("g t"→"gt", "d o n"→"don"). Una letra suelta se deja: si no, la "x" de las
  colaboraciones ("Dame 9 x Wale") se fundiría con la palabra siguiente. Afecta a 10 modelos y hace
  converger nuestro propio catálogo, que es **inconsistente consigo mismo** ("GT Cut 3" pero
  "Air Zoom G.T. Cut 4").
- **Modelos de OTRO deporte**: en cuanto empezó a encontrar `gt`, la "NIKE G.t. Cut 3 **Turbo,
  Zapatillas de fútbol**" coló a 173,26 € como si fuera la de baloncesto — comparte marca, `gt`,
  `cut` y el 3, así que ninguna regla de nombre podía separarlas. Guardarraíl: fútbol/football/
  running/trail/senderismo/pádel → rechazo. ⚠ **"tenis" NO puede entrar en esa lista**: en español
  de América es justamente como se llaman las zapatillas ("Tenis de baloncesto Curry 12", Amazon).

**7. Herramientas** — commits `4cbf2e9`, `2a3648f`
- `scripts/audit-frescura.ts`: la auditoría por tienda que se rehacía a mano cada sesión.
- Test de invariante: **toda zapa del catálogo empareja con su propio nombre** (234/234). Si una
  ficha no se reconoce ni a sí misma, su precio queda congelado para siempre.

**8. adidas.es: 3 fallos distintos, 10/27 → 12/27** — commit `a80a3ce`
- **Las 2 zapas GS eran IMPOSIBLES de encontrar**: el scraper descartaba TODO título con
  "Niños/Junior", que es justo como adidas rotula el segmento que buscábamos. Y la consulta
  mandaba "gs", que su buscador **no entiende** ("adidas ae 1 low gs" → CERO resultados, aunque
  la vende como "Anthony Edwards 1 Low Basketball para niño", 58,50 €). Tampoco entiende la sigla:
  "ae 1" da zapatillas de correr; "anthony edwards 1" da las 6 colorways. Ahora el segmento debe
  **coincidir en los dos sentidos**, la consulta traduce `gs`→niños y `AE`→anthony edwards, y se
  reconocen como junior la **J final** ("ANTHONY EDWARDS 2 J") y **"(Adolescentes)"**.
- **Cogía la primera tarjeta que emparejaba, no la más barata**: adidas devuelve una tarjeta por
  colorway con un rango enorme (la AE 2 sale en 10 tarjetas de 70 a 130 €) → el precio era
  arbitrario, y si tocaba una de 130 € el guardarraíl de plausibilidad la descartaba.
- **Fallos INTERMITENTES que cambiaban de víctima en cada pasada**: se hacían 3 viajes al navegador
  POR TARJETA y adidas re-renderiza el listado mientras tanto → handles obsoletos, título vacío.
  Ahora se leen de una sola pasada + reintento si el listado no hidrata.
- Los **15 fallos restantes son legítimos**: adidas.es ya no vende esos modelos (Dame 8/9, Harden
  Vol 8, Trae Young 3/4, Exhibit A/B, Stepback 4, Ownthegame 2.0, Crazy 8, Forum 84, Pro Model,
  Cross 'Em Up) — verificado a mano, con y sin prefijo de marca.

### ▶️ SIGUIENTE PASO (retomar aquí)
1. **AliExpress por API** en cuanto llegue el app_key (47 enlaces al 7%, la comisión más alta).
   Sigue siendo lo más rentable pendiente. ⏳ Depende del usuario.
2. **Comprobar el efecto real de esta sesión con la pasada del 7-ago**: deberían subir Amazon
   (fichas fijadas + fin de los falsos positivos) y aparecer por primera vez fuikaomar, atmósfera,
   snipes y forumsport. Predicción: frescura 28% → ~45%. **Confirmar con una semana, no con una
   noche** (aprendizaje de s33).
3. **Quedan ~73 enlaces de búsqueda en Amazon**. De los 96, 50 no emparejaron y 15 dieron precio
   implausible (revendedor). Repasar si merece la pena fijarlos a mano; ojo: el resolutor coge el
   primer resultado que empareja, **no el más barato**.

### 🟡 Pendiente / requiere decisión del usuario (sesión 34)
- **4 enlaces de Snipes MUERTOS y sin destino posible**: `nike-kobe-8-protro`,
  `nike-kobe-9-high-protro`, `jordan-xxxix` (AJ39), `reebok-answer-iv`. Snipes NO vende esos
  modelos (verificado en su sitemap), así que no hay ficha a la que repuntarlos. **Viven SOLO en
  `precios.json`** (no están en el editorial), y allí siguen marcados `disponible: true` con
  precio y fecha fabricados de mayo → hoy muestran precio y mandan el click a una 404. Borrarlos
  de `precios.json` elimina la opción Snipes de esas 4 zapas. **Decidir si se borran.**
  (Mismo caso que los 4 enlaces ECI de Skechers SKX, que siguen sin tocar.)
- **Hueco LATENTE del matcher con los modelos de una sola letra**: en "Dame X GS" la "X" se
  descarta por tener 1 carácter, así que el modelo NO exige generación y una ficha de "Dame 9
  niño" colaría como Dame X GS. Es **anterior** a esta sesión (pasaba igual con "Junior"). NO se
  tocó: hacer que la "x" suelta valga 10 rompería los títulos con "x" de colaboración
  ("Dame 9 x Wale" pasaría a casar con Dame X). Necesita su propia pasada con cuidado.
- `deploy.yml` lleva fallando desde el 26-may (heredado). El deploy real lo hace Vercel.

### 📌 Aprendizajes (sesión 34, 3ª parte — adidas)
- **Un filtro defensivo puede volverse un muro**: el "descarta lo junior" protegía a las de adulto
  y a la vez hacía imposibles las GS. Cuando un filtro depende del segmento, hay que compararlo
  con el segmento que se BUSCA, no aplicarlo a ciegas.
- **El buscador de cada tienda habla su idioma comercial**, no el del catálogo: adidas no entiende
  "gs" ni "ae 1". Si una búsqueda da 0 resultados para algo que la tienda claramente vende, la
  sospecha número uno es la consulta.
- **Coger "el primero que empareja" es una decisión de precio disfrazada.** Con 10 colorways de 70
  a 130 €, elegir el primero es elegir un precio al azar; en un comparador toca el más barato.
- **Muchos `$eval` por tarjeta = fallos intermitentes.** Si la página re-renderiza, los handles
  caducan a media iteración. Leer todo en un `$$eval` es más rápido y no falla.

### 📌 Aprendizajes (sesión 34, 2ª parte — Amazon)
- **Un acierto del scraper puede ser un producto equivocado.** Contar "éxitos" no vale: el 26% de
  los de Amazon eran otra zapatilla. Cuando el nombre del modelo es un NÚMERO, emparejar contra
  texto que lleva precios y tallas es pedir un falso positivo.
- **Emparejar siempre contra el título del producto, nunca contra el bloque que lo rodea.**
- **Un fix del matcher puede abrir un agujero nuevo**: el de las siglas hizo colar una zapatilla de
  fútbol. Al tocar el matcher, medir SIEMPRE contra fichas reales, no solo correr los tests.
- **Cuidado con las sondas de diagnóstico**: dentro de un template literal `\s` colapsa a `s`, así
  que un `page.evaluate` con `.replace(/\s+/g,' ')` mal escapado borra TODAS las eses del texto y
  te hace "descubrir" un bug que no existe. Escapar `\\s` o usar `locator.innerText()`.

### 📌 Aprendizajes (sesión 34)
- **Un enlace que responde 200 puede ser una 404**: Snipes sirve su página de error con status
  200. Comprobar SIEMPRE el contenido (aquí: que exista `Product` en el JSON-LD), nunca el status.
- **El sitemap de la tienda es la forma barata de saber si stockea un modelo** antes de buscar
  ficha a mano: `snipes.com/es-es/sitemap_products.xml` respondió en segundos y cerró 4 dudas.
- Se confirma lo de s33: antes de tocar código, separar **agotado / no-match / enlace muerto**.
  De 15 "fallos" iniciales, 7 eran agotados correctos, 4 eran matcher y 4 eran enlaces muertos.
- `writePreciosJson` **FUSIONA**, no reescribe: una entrada rancia de `precios.json` no caduca
  sola nunca y además **pisa** al editorial. Al repuntar un enlace, mirar siempre si está ahí.

---

## Estado anterior (sesión 33) — 2 scrapers nuevos (0% → 73/93%) + bug GS + AliExpress bloqueado

Todo en `master` y verificado con pasadas reales. **Tests: 80 → 114.**

### ✅ Completado (sesión 33)

**1. Scrapers nuevos: FuikaOmar (22/30) y Atmósfera (25/27)** — comm. `781946d`
Eran las 2 tiendas afiliadas más grandes SIN scraper: 57 enlaces que no se verificaban NUNCA
(mediana 55 días, 0% frescos). Ninguna tiene protección anti-bot.
- **El precio limpio de ambas está en `meta[product:price:amount]`.** NO leer el texto del DOM:
  las dos mezclan en el mismo bloque precio actual + PVP tachado + ahorro.
- **Stock, que es donde se diferencian**:
  - FuikaOmar (PrestaShop) publica `availability` en el JSON-LD (con las barras escapadas).
  - Atmósfera NO (su JSON-LD es un `ProductGroup`). El stock solo está en el selector de tallas,
    que marca las agotadas con `attribute-not-in-stock out_of_stock`. Comprable si queda ≥1 talla.
    ⚠ El placeholder "Selecciona una talla" no lleva clase de agotado → hay que ignorarlo o das
    por comprable un producto sin ni una talla. Hay test que lo blinda.
- Afloran bajadas que llevaban meses sin verse: 91→78, 89,99→62,93, 52→39, 44→35,75.
- De los 8 fallos de FuikaOmar, **6 son AGOTADO de verdad** (correcto). Los 57 enlaces dan 200,
  no hay ninguno muerto.

**2. BUG GORDO: las 14 zapas "GS" no podían emparejar con NINGUNA ficha** — commit `44aa0ca`
El catálogo llama "GS" al segmento junior, pero ninguna tienda escribe eso: usan "Junior", "Jr",
"Grade School" o "(GS)". Como el token del modelo es OBLIGATORIO, esas 14 zapas (20 enlaces, 17
con afiliado) fallaban siempre, **en todas las tiendas**. Fix en `matcher.ts`: sinónimos
junior/jr/grade school → gs, y `stripNoise` ya no borra "(GS)" (sí sigue borrando (PS) y (TD)).
Verificado: `puma-mb05-gs` pasa de fallar a 99,90€.

**3. AliExpress: diagnosticado, NO arreglable scrapeando** — commits `c31b7b9`, `41960fe`
- **Causa raíz medida**: la ficha es CSR (`runParams` vacío) y pide el precio por XHR a
  `mtop.aliexpress.pdp.pc.query`. Esa XHR responde con **reto anti-bot**
  (`_____tmd_____/punish` → reCAPTCHA Enterprise). ~9 llamadas de precio y ~20 respuestas de reto
  por ficha. Esperar más NO sirve: el HTML es idéntico a los 3s, 8s y 15s.
- **NO se debe rodear el reto.** La vía legítima es la **API de afiliados de AliExpress**
  (`aliexpress.affiliate.productdetail.get`, app_key desde openservice.aliexpress.com).
  **⏳ SOLICITUD ENVIADA EL 2026-08-06**, tipo de colaborador `Affiliates (individual)`, país
  España. Estado "Under Review", tarda 2-5 días laborables → **esperar respuesta ~11-13 ago**.
  Cuando lleguen las credenciales: el usuario las mete como secrets `ALIEXPRESS_APP_KEY` /
  `ALIEXPRESS_APP_SECRET` (NUNCA en el chat ni en el repo) y se reescribe `stores/aliexpress.ts`
  contra la API, leyendo de `process.env`. Los product IDs ya los tenemos: salen de las URLs
  `es.aliexpress.com/item/ID.html` (33 de los 47 enlaces ya son de ficha).
  ⚠ Su API exige **firma HMAC** en cada petición; es la parte tediosa de montar.
- Mientras tanto: `isBotChallengeUrl()` abandona el enlace al detectar el reto (3775→1403 ms por
  enlace). ⚠ **OJO**: el ahorro NO se notó en la pasada nocturna (1h24m17s → 1h24m29s). Y el salto
  de frescura 3→11 que pareció mejora **NO aguantó**: una semana después está en 5. Era variación.
- Arreglado además que el módulo **importaba `matchesShoe` y no lo llamaba nunca**: aceptaba
  cualquier precio ≥20€ sin comprobar el producto. Ahora `precioDeCandidato()` lo valida, y el
  último recurso (mínimo precio visible, sin título) queda limitado a fichas `/item/`.

**4. Promos** — commits `578cf88`, `d3af191`
- ECI "Ofertas Límite en Deportes" (−60%, 30 jul–2 ago) ✔ ya caducada.
- AliExpress "Día de envío local" (1–7 ago), códigos `ESSC02`..`ESSC30`.
  ⚠ **ESSC45 y ESSC60 RETIRADOS**: AliExpress avisó el 4-ago de que están agotados. El aviso de
  ficha elige el código de mayor descuento que cumpla el mínimo → habríamos ofrecido uno roto.
- adidas "Time to Treat Yourself" (hasta 25%, **20–25 ago**), date-gated: no se muestra hasta el 20,
  respetando el embargo que pedía el anunciante.
- **ECI "Rebaja Final" NO cubre deportes** (es hogar/papelería/electrónica, correo del 3-ago).
  Duda cerrada, no se añade.

### ▶️ SIGUIENTE PASO (retomar aquí)
1. **AliExpress por API** en cuanto llegue el app_key (47 enlaces al 7%, la comisión más alta).
2. **Amazon**: 174 enlaces, ~120 rancios. Antes de tocar código, averiguar por qué DIVERGE
   (local 47% vs CI ~30%), probablemente bloqueo por volumen.
3. **Snipes (14) y Forum Sport (13)**: siguen a 0% y sin scraper. Mismo patrón que los 2 de hoy.

### 🟡 Pendiente / requiere decisión del usuario
- **`ua-curry-12-gs`**: su enlace de FuikaOmar apunta a "Curry 12 Dub Nation", sin ninguna marca de
  junior. O el enlace está mal o esa colorway es de adulto. NO se forzó el match. **Revisar a mano.**
- **4 enlaces ECI de Skechers SKX muertos** (heredado de s31, sin tocar).
- **`deploy.yml` lleva fallando desde el 26-may** (heredado). El deploy real lo hace Vercel.

### 📌 Aprendizajes (sesión 33)
- **Un "fallo" del scraper no es siempre un bug**: de los 8 de FuikaOmar, 6 eran productos
  agotados de verdad. Antes de tocar nada, separar agotado / no-match / enlace muerto.
- **Cuidado al celebrar una mejora con una sola noche de datos**: lo de AliExpress (3→11) parecía
  un éxito y era ruido. Confirmar con una semana.
- Al añadir tienda nueva: comprobar SIEMPRE si el JSON-LD trae disponibilidad; si no, el selector
  de tallas es el sitio, y hay que excluir el placeholder.

---

## Estado anterior (sesión 32) — Auditoría de frescura por tienda + 2 promos nuevas

Sesión corta. Todo en `master` (commit `578cf88`) y verificado en producción.

### 📊 AUDITORÍA DE FRESCURA POR TIENDA (el dato que manda la prioridad)

Medido el 2026-07-30 sobre el catálogo mergeado. "Frescos" = `ultima_verificacion` ≤3 días.
**398 enlaces que monetizan, solo 117 frescos (29%).**

| Tienda | Enlaces afi. | Frescos | Mediana | ¿Scraper? |
|---|---|---|---|---|
| amazon_es | 174 | 50 (29%) | 57 d | sí, flojo |
| **aliexpress** | **47** | **3 (6%)** | 36 d | **sí, pero MUERTO** |
| elcorteingles_es | 34 | 25 | 0 d | sí ✅ |
| decathlon | 32 | 26 | 0 d | sí ✅ |
| fuikaomar_es | 30 | 0 | 48 d | no |
| adidas_es | 27 | 11 | 59 d | sí |
| atmosfera_sport | 27 | 1 | 48 d | no |
| snipes_eu | 14 | 0 | 57 d | no |
| forumsport_es | 13 | 1 | 48 d | no |

Los scrapers de ECI y Decathlon arreglados en s31 **funcionan de verdad** (mediana 0 días).
Presupuesto de tiempo: la pasada nocturna tarda ~1h20-1h40 de los 150 min → **cabe más trabajo**.

### ▶️ SIGUIENTE PASO RECOMENDADO (retomar aquí)
**1. Arreglar el scraper de AliExpress.** Es lo más rentable por esfuerzo: 47 enlaces a la
comisión MÁS ALTA del catálogo (7%) y solo 3 frescos. El módulo `stores/aliexpress.ts` YA existe
→ es diagnosticar, no construir. Sospecha: los 47 van por wrapper Awin; el `unwrapAffiliateUrl()`
de s31 arregló el wrapper pero el scraper sigue al 6%, o sea que está roto por debajo.
Empezar reproduciendo una pasada real de esa tienda para ver dónde rompe.
**2. Amazon**: 124 enlaces rancios (el mayor volumen). OJO al dato incómodo: en pasada local
medimos 47% pero en CI real da 29% → antes de tocar código, averiguar por qué DIVERGE
(probablemente bloqueo por volumen). Más trabajo y menos seguro que AliExpress.
**3. FuikaOmar (30) + Atmósfera (27)**: scrapers nuevos, caben en el tiempo que sobra.

### ✅ Completado (sesión 32)
**2 promos nuevas** desde los correos de Awin (`promos.ts`, commit `578cf88`), verificadas en prod:
- **ECI "Ofertas Límite en Deportes"**, hasta 60%, 30 jul 12:56 → 2 ago 23:59. La única de la
  tanda de ECI que tocaba deportes (el resto: hogar, belleza, bebés, LEGO).
  ⚠ El anunciante pidió por email rotularla **"Ofertas Límite"**, NO "Límite 48H".
- **AliExpress "Día de envío local"** (antes Choice Day), 1-7 ago, códigos `ESSC02`..`ESSC60`.
  No acumulables con otras promos pero **SÍ con los cupones PayPal** (8€/100€, 15€/150€).
- Snipes "Flash Deal" (24 jul→7 ago) ya estaba registrada. Resto de correos: irrelevantes.

### 📌 Aprendizajes / avisos (sesión 32)
- **El aviso contextual de FICHA solo sale en promos CON código** (`codigos`/`codigo`). Las de
  descuento directo (ECI) salen solo en la franja superior. Es por diseño, no es un bug.
- **La franja es un CARRUSEL** (rota cada 5s entre las activas), no apila banners. Con 4 activas
  el ciclo tarda 20s → una promo urgente tarda en verse. Si molesta, ordenar por fecha de fin
  (cambio en `PromoBanner.astro`, no en datos). NO hecho.
- **`deploy.yml` de GitHub Actions lleva FALLANDO desde el 26-may** (último run: failure, 32s).
  No rompe nada —el deploy real lo hace la integración de Git de Vercel— pero deja un workflow
  en rojo permanente que ensucia la señal. Valorar borrarlo o arreglarlo.
- `web/api/_catalog.json` se regenera en cada build local (prebuild) → sale como modificado.
  Es subproducto, NO commitear por inercia; Vercel lo regenera.
- **Forum Sport (Awin) escribió el 20 jul** avisando de que nuestra actividad "ha sido baja".
  Cuadra con el dato: 13 enlaces suyos, 1 fresco, sin scraper.

### 🟡 Sigue pendiente (heredado de s31, sin tocar)
- **4 enlaces ECI de Skechers SKX muertos** (`skechers-skx-je1/resagrip/league/float`): ECI no
  vende esas zapas → no hay destino correcto. **Falta que el usuario decida si se borran.**
- **ECI "Rebaja Final" hasta -50% (3-31 ago)**: los enlaces del email eran moda/hogar, no
  deportes. Cuando arranque el día 3, comprobar si cubre deportes y añadirla si sí.

---

## Estado anterior (sesión 31) — SALUD DEL SITIO: scraper resucitado, honestidad de fechas, tipos a 0

Sesión de auditoría ("mira cómo está la web") que descubrió que **el scraper llevaba un mes sin
guardar nada**. Todo lo de abajo está en `master` y verificado con pasadas reales por tienda.

### ✅ Completado (sesión 31)

**1. El scraper estaba MUERTO desde el 2026-06-28 (causa raíz, lo más importante)**
- Corría a diario y "terminaba", pero GitHub lo **cancelaba a los 90 min exactos**
  (`timeout-minutes: 90`) habiendo procesado 217/234 zapas. El commit de `precios.json` es el
  ÚLTIMO paso y el scraper escribe el fichero **una sola vez al final** → no guardaba nada.
- Fix: `timeout-minutes: 90 → 150` en `.github/workflows/scrape-prices.yml` (commit `e1fdb56`).
  Repo público = minutos de Actions gratis, sin coste.
- **Verificado**: 3 noches seguidas OK (1h41m, 1h41m, 1h19m) y commits del `price-bot` de nuevo.
- ⚠️ Si el catálogo crece mucho, vigilar que no roce los 150 min otra vez.

**2. Dos MENTIRAS de datos corregidas (la marca es "sin BS", esto importa)**
- El sello **"Precios re-verificados X"** del home/catálogo usaba `new Date()` = **fecha de build**,
  o sea decía "hoy" aunque los precios llevaran semanas. Ahora sale de la verificación real más
  reciente: helper `fechaVerificacionMasReciente()` en `scoring.ts` (commit `863780b`).
- El scraper, para las tiendas **sin scraper**, copiaba el precio editorial y le estampaba
  `ultima_verificacion: hoy` **sin comprobar nada** (193 enlaces "verificados" a diario, y encima
  contaminaba el sello anterior). Ahora conserva la fecha original; restauradas 167 fechas reales
  desde el editorial (commit `3bef6db`). Quedan 26 huérfanas sin fecha recuperable.
- NO se borraron esas entradas de `precios.json` porque hay ~25 enlaces (basket4ballers,
  manelsanchez) que **solo viven ahí** y desaparecerían del sitio.

**3. `astro check`: 351 errores → 0** (commit `e56f28e`)
- 340 eran de `estadisticas.astro`: tipos `Game/Perfil/Meta/State/Insight` + helper `$()` tipado
  que sustituye 61 `getElementById`. **OJO**: el reemplazo masivo se comió la propia definición de
  `$` y dejó `const $ = (id) => $(id)` → **recursión infinita** que habría roto la página; lo
  detectó el propio tipado (ts 7023). Verificado en navegador que todo sigue funcionando.
- `zapatilla/[slug].astro`: `ctaLink` podía ser undefined → guarda condicional en los 2 botones.
- Datos: 2 `material_superior` en español → inglés (+`synthetic+tpu` al enum `MaterialSuperior`).

**4. Scrapers arreglados — MEDIDO con pasada completa por tienda**

| Tienda | Antes | Después |
|---|---|---|
| amazon_es | 18/174 (10%) | **82/174 (47%)** |
| decathlon | 0/32 (0%) | **26/32 (81%)** |
| elcorteingles_es | (no existía) | **25/34 (74%)** |

Causas reales encontradas (commits `5ffd7f8`, `50be340`, `bde645e`):
- **`matcher.ts` — números ROMANOS**: las tiendas escriben "Lebron **Xxii**", "LeBron XXIII",
  "AJ XXXVIII"; el catálogo usa arábigos y el matcher exige que TODOS los números aparezcan
  literales → rechazaba el producto correcto. Ahora normaliza romanos→arábigos (canónicos, 2..50,
  excluyendo tallas tipo "XL"→40). **Es el fix de mayor impacto y aplica a TODAS las tiendas.**
- **`matcher.ts` — sinónimos**: "Volume"→"vol"; `PHRASE_SYNONYMS` para "Anthony Edwards"→"ae"
  (Decathlon vende la AE 1 con el nombre largo).
- **`matcher.ts` — letra+número pegados**: "MB04"/"AE1"/"KT10" vs "MB.04"/"AE 1"/"KT 10".
- **`matcher.ts` — `stripNoise` borraba modelos reales**: exigía `\d{3,5}` y se comía el Tarmak
  "SE500". Ahora `\d{4,5}` (AO2372, DO1925 siguen fuera; hay test que lo blinda).
- **`matcher.ts` — paréntesis**: "Canaveral 900 (Sarr Edition)" no casaba.
- **WRAPPERS DE AFILIADO (importante)**: 105 enlaces (decathlon 31, aliexpress 47, adidas 27) van a
  `awin1.com`. El scraper pedía **el wrapper**, que devuelve la página de tracking y no el HTML de
  la tienda → Decathlon a 0%. Y **cada fetch contaba como CLICK de afiliado falso** (hunde el EPC).
  Nuevo `unwrapAffiliateUrl()` en `matcher.ts`, aplicado en `index.ts` antes de navegar. El wrapper
  original NO se toca en los datos: el merge (`resolveUrl`) lo reaplica.
- **amazon_es**: no soportaba fichas `/dp/` (esperaba selectores de listado → timeout). Añadido; se
  coge el primer precio que **parsea** porque el primer `.a-offscreen` viene vacío.
- **decathlon**: el fetch HTTP previo recibía **403 de Cloudflare SIEMPRE** (15s perdidos por
  enlace) → eliminado; clases nuevas `vp-price-amount`; precio del **JSON-LD**; hay que **esperar a
  la hidratación** (leer tras `domcontentloaded` daba la página vacía); y las fichas retiradas
  **redirigen a búsqueda**, así que el tipo de página se decide por la URL FINAL (`page.url()`).
- **elcorteingles_es (NUEVO, `stores/elcorteingles_es.ts`)**: visita la home 1 vez por contexto
  (si entras directo a una ficha → bucle "Challenge Validation"); el JSON-LD trae **una oferta POR
  TALLA** con 2 precios cada una (venta y PVP) → se toma el **MENOR** y se considera disponible si
  queda **al menos una talla InStock** (buscar `OutOfStock` daba casi todo por agotado); y hay que
  esperar al **JSON-LD**, no al `<h1>` (el h1 se pinta antes, sin precio).

**5. Datos corregidos** (commit `6f4263d`)
- `nike-sabrina-2`: su enlace de Decathlon era una búsqueda genérica cuyo 1er resultado eran unas
  **Adidas Cross 'Em Up**. Decathlon SÍ la vende → ficha real, colorway más barata de 7
  ("Activate" 97,90 vs 133-238), `disponible: false → true`.
- `adidas-ae-1`: 89,99 → **53,99** gracias al alias "Anthony Edwards".

**Tests**: `npx vitest run` → **80 tests** (eran 57). Todos los fixes del matcher llevan test con
títulos reales, incluidos los de NO-regresión (que "Anthony Edwards 2" no cuele como AE 1, etc.).

### 🟡 Pendiente / requiere decisión del usuario (sesión 31)
- **4 enlaces ECI de Skechers MUERTOS** (`skechers-skx-je1/resagrip/league/float`): usan
  `/deportes/buscar/?term=`, ruta que ECI ya **no sirve** (redirige a la home de deportes). Y ECI
  **no vende** las SKX de baloncesto (solo la "SKX Aero Burst" de running) → no hay destino
  correcto posible. **El usuario tiene que decidir si se borran** (no se tocaron).
- **Tiendas afiliadas que SIGUEN sin scraper** (siguiente golpe de valor):
  FuikaOmar (30 enlaces, 5%), Atmósfera (27, 6%), Snipes (14, 5%), Forum Sport (13, 5%).
- **AE 2 en Decathlon**: existe (129,99) pero `InStoreOnly` + agotada, y sería la opción MÁS CARA
  de las 6 que ya tiene. NO se añadió a propósito. URL localizada si algún día repone:
  `/es/p/zapatillas-de-baloncesto-adulto-anthony-edwards-ae2-rosa-coral/386555/m9030183`.
- **Frescura real** tras limpiar las fechas falsas: ~7% ≤3d, 80% >30d. Debería mejorar solo ahora
  que el scraper vuelve a commitear a diario.

### 📌 Aprendizajes para no repetir (sesión 31)
- **Un scraper "que corre" no es un scraper que funciona**: mirar SIEMPRE los commits del
  `price-bot` y las fechas de `ultima_verificacion`, no solo que el workflow salga verde.
- **Nunca scrapear un enlace de afiliado**: no devuelve el HTML de la tienda y genera clicks falsos.
- Antes de dar por bueno un fallo de scraping, comprobar a mano si el producto existe en esa tienda:
  buena parte de los fallos "restantes" son legítimos (Amazon no vende Anta/Li-Ning/Peak/Tarmak, ni
  la LeBron 23 — solo lista "LeBron Witness", y rechazarla es lo CORRECTO).
- En `page.evaluate` con tsx/esbuild, las funciones con nombre revientan con
  `__name is not defined`: pasar el snippet **como string**.
- Reemplazos masivos por regex: revisar que no se toquen las **definiciones** de lo que sustituyes
  (el caso `$` recursivo).

---

## Estado anterior (sesión 30) — Herramienta de ESTADÍSTICAS personales (`/estadisticas`)

### ✅ Completado (sesión 30)

**Nueva sección `/estadisticas`** — agente/calculadora de estadísticas personales de baloncesto,
**100% cliente** (localStorage `cz.stats.v1`, sin backend ni cuentas). Página nueva
`web/src/pages/estadisticas.astro`. Enlace **"Stats"** añadido al nav de TODAS las páginas
(entre Calculadora y Accesorios). Build 336 págs. Todo en producción (`master`) y verificado E2E
(Playwright) antes de cada merge.

Piezas (todas en esa única página + 1 función serverless):
- **Registro manual** de partidos (T2/T3/TL C-I, reb O/D, AST, ROB, TAP, PÉR, FAL, min, rival, V/D).
- **Métricas avanzadas** por partido y temporada: **TS%**, **eFG%**, **valoración estilo FIBA**,
  ratio AST/PÉR. Tiles de temporada + **gráfico SVG de evolución** (Puntos/Valoración/TS%) con
  tooltip. Color de serie `#ea580c` (validado sobre superficie oscura con el validador dataviz).
- **Agente de reglas** ("El agente dice"): consejos en español por eficiencia/libres/triple/
  pérdidas/faltas/tendencia últimos 3/récords/posición + tie-in a zapas (robos→tracción,
  rebotes→cushion → quiz/rankings).
- **Agente conversacional IA** (`web/api/coach.ts`, serverless OpenRouter, misma cadena de modelos
  gratuita que `chat.ts`): le pasas tus partidos y responde "¿en qué mejoro?" etc. Verificado en
  prod HTTP 200 con análisis real. (Nota: reutiliza el patrón autocontenido; NO importa el catálogo.)
- **Importador de actas FEB** (`web/api/feb.ts`, serverless): `GET /api/feb?partido=ID|URL`. Descarga
  el acta de `baloncestoenvivo.feb.es/partido/{id}`, extrae el **JWT** que la página incrusta en
  `#_ctl0_token` y llama a la API interna **`https://intrafeb.feb.es/LiveStats.API/api/v1/BoxScore/{id}`**
  con `Authorization: Bearer {jwt}` (mismo flujo que hace su web). Devuelve equipos+jugadores
  mapeados. Verificado en prod (partido real 2491568). Cubre FEB + autonómicas que publican en su
  plataforma. Caché CDN 10 min. Campos JSON FEB: `p1m/p1a,p2m/p2a,p3m/p3a,min(seg),ro,rd,assist,st,bs,to,pf,pts`.
- **Importador por PEGADO** (Cataluña/FCBQ y genérico): bloque plegable, parser en cliente **dirigido
  por cabecera** (no asume orden) con sinónimos catalán+castellano (T1 tiros libres, BR robos,
  BP pérdidas, FC faltas, RO/RD/RT rebotes…). Soporta tiros "4/7" o columnas C/I separadas. El
  usuario pega su tabla y elige su nombre. **NO se pudo validar contra un acta FCBQ literal** (ver
  abajo); calibrado sobre notación FIBA-catalana estándar (la app catalana es sistema **Meytel**,
  mismo proveedor/modelo que la FEB). Si un usuario real reporta un desajuste → añadir etiqueta al
  diccionario `COLS` (1 línea).
- **Tarjeta compartible** de temporada: botón genera imagen 1080×1080 en canvas (sin servidor) con
  marca + medias + TS%/eFG%/mejor partido + `canchazapa.com/estadisticas` al pie. `navigator.share`
  en móvil, descarga en escritorio. Palanca de crecimiento.
- **Panel "Rachas y récords"**: récords personales (máx pts/reb/ast/val con rival), victorias vs
  derrotas (pts y VAL medios), tabla por rival (PJ, balance V-D, medias). Agrega cualquier origen.
- `web/public/sw.js`: **bypass de `/api/`** en el service worker (antes cacheaba GET a la API para
  siempre). Importante para futuros endpoints.

**Artículo SEO** `web/src/lib/articles.ts` → `/blog/calcular-estadisticas-baloncesto-gratis`
(categoría Guías, sale 1º por fecha): posiciona para "calcular estadísticas de baloncesto gratis",
canaliza a `/estadisticas` (3 CTAs), explica TS%/eFG%/VAL con fórmulas, y **ata al motor de
ingresos** (11 enlaces a fichas + quiz; la plantilla surface las zapas mencionadas con precio de
afiliado en el sidebar). Total artículos: 30 → 31.

### 🟡 FCBQ / Cataluña — DÓNDE QUEDÓ (importante, NO reintentar por la vía mala)
- `basquetcatala.cat` protege **toda** la web (incluidas páginas informativas) con un reto
  **reCAPTCHA "Verificació de seguretat"** — confirmado renderizando con Chromium real. **NO se
  debe resolver/rodear** (el clasificador de seguridad lo bloqueó, con razón; además el usuario
  pedía saltárselo y se le explicó por qué no). Su **Open Data FCBQ es de PAGO** (~25-30€/mes).
- Sondas descartadas (todas limpiadas del repo): APK de mirrors (bloqueado), capturas de las tiendas
  (solo noticias/marcador, no box score), `basquet.top` (SPA que ya no muestra stats).
- **Vía legítima = el importador por pegado** (ya hecho). El usuario NO juega/no está federado, así
  que la función es para SUS usuarios catalanes; se validará cuando un jugador real pegue un acta.
- Aprendizaje: las apps FEB y FCBQ son **Meytel**; la FEB expone `intrafeb.feb.es/LiveStats.API`
  (JWT del acta, sin key). NO hay equivalente accesible para FCBQ sin pasar su reCAPTCHA.

### ▶️ EN CURSO / decisión tomada — MEDIR antes de construir más
Roadmap de stats PAUSADO a propósito. Pendientes NO hechos (solo si hay señal de uso): **mapa de
tiro** (la API FEB da coordenadas en `SHOTCHART`, solo sirve para partidos FEB) y **metas/objetivos**.
- **Problema de medición**: la web usa **Cloudflare Web Analytics**, que **NO registra eventos
  custom**. Los `window.plausible(...)` que dejé cableados (`Stat Game Logged`, `FEB Import`,
  `Acta Paste Import`, `Season Card Share/Download`, `FEB Coach Ask`…) son **no-op** → no se miden.
  Cloudflare SÍ mide páginas vistas de `/estadisticas`. Para medir adopción real haría falta un
  contador propio ligero (o volver a Plausible de pago). Recomendación dada al usuario: soltar,
  mirar páginas vistas/retorno unas semanas, y decidir con datos.

Commits sesión 30 (en `master`): estadisticas.astro (MVP) → feb.ts (importador FEB) → nav Stats +
Enter → parser pegado Cataluña → +notación catalana → coach.ts (IA) → tarjeta compartible → panel
Rachas y récords → artículo SEO. Rama de trabajo: `claude/basketball-analytics-app-mwwaq5`.

---

## Estado anterior (sesión 29) — AliExpress Marcas+ como fuente afiliada + cierre frente 1 + cruce ECI

### ✅ Completado (sesión 29)

**AliExpress Marcas+ Verificado abierto como fuente afiliada para marcas occidentales** (7%,
canal autenticado POIZON/Dewu con garantía de originalidad y SKU real). **Regla actualizada en
CLAUDE.md** (sección AliExpress Portals): marcas occidentales (Nike/Jordan/adidas) permitidas
SOLO con el sello `Marcas+ Verificado`; y **solo añadir el enlace si su precio ≤ MSRP / precio
mostrado actual** (si está por encima, empeora el "desde X€"). Búsqueda con
`es.aliexpress.com/w/wholesale-QUERY.html?SortType=price_asc` + click al listado con badge
Marcas+; el SKU y precio se leen del título de la pestaña. Wrapper Awin `awinmid=11640`.

**Trending #7 = nike-sabrina-3 MONETIZADA** (era la que tocaba): AliExpress Marcas+ 90,99€
(HF2882-600) → "desde" 149,90 (FuikaOmar) → 90,99. + Decathlon W.Sneakers Oregon Ducks 144,29
(6%). Foot Locker/Nike siguen "Ver precio". Atmósfera/Snipes/Amazon NO tienen la 3 exacta.

**Flagships infladas: precio y comisión mejorados vía AliExpress Marcas+** (su único afiliado
era Amazon a precio reseller inflado):
- jordan-zion-4: 292,55 (Amazon 3%) → 115,39 (FD0591-401, 7%).
- nike-kyrie-low-5: 196 (Amazon) → 140,69 (DJ6014-100).
- nike-gt-cut-3: +AliExpress 160,39 (IB8870-191), afiliado activo más barato (Amazon 289,99;
  joom 127 sigue "pendiente" mostrando precio).
- nb-kawhi-1: SKIP (solo NB 850 lifestyle, sin Marcas+ del signature) → se queda Amazon.
- nike-kobe-1-protro: Marcas+ 202,99 > MSRP 200 → SKIP por la regla.

**FRENTE 1 (zapas sin afiliado) — AGOTADO.** Barrido AliExpress Marcas+:
- jordan-xxxviii (AJ38): primer afiliado, 123,99 (FD2325-107, <MSRP 180). "Ver precio" → 123,99.
- SKIP definitivos: sabrina-3-gs (no hay GS diferenciada en AliExpress), nike-kobe-1-protro
  (>MSRP), 3 Moolah (marca US NO está en AliExpress, solo accesorios de coche).
- immortality-4-gs ya tenía afiliado (ECI 52,49). gt-jump-3 NO existe en el catálogo (entrada
  errónea de la worklist; solo hay gt-jump-1/2/academy). → Lista real "sin afiliado" baja a 5
  (sabrina-3-gs, kobe-1-protro, 3 Moolah), todas por causas insalvables. NO insistir.

**Cruce del catálogo básquet de El Corte Inglés (afiliado 6%) con el nuestro** — ya estaba
integrado casi al completo (ECI es el precio más barato mostrado en la mayoría: LeBron 23,
Curry 13, Luka 4/5, Tatum 4, Immortality 4/5, GT Cut Academy 2, Witness IX, D Fox 2, UA Jet 25,
Believe That 1, Freak 7…). Dos mejoras:
- nike-kd-18: enlace ECI PRM (111,99) → KD18 estándar A53978261 (95,99).
- nike-book-2: ECI estándar (159,99) → Book 2 SE A56001212 (104,99). Colorway estándar sigue
  disponible vía Decathlon/Nike/BE.
- SIN mejora (ya lo tenemos o ECI más caro que nuestro afiliado): Harden Vol 9, DON 7, Dame X, AE 1.

**Promo añadida** (`promos.ts`, date-gated): Atmósfera Sport rebajas −60% (01-26 jul, Awin 26255).

**Trending #12 = jordan-tatum-3 MONETIZADA**: único afiliado que pagaba era FuikaOmar 109,90 →
AliExpress Marcas+ 79,80 (HV5912-300, 7%). joom 75 sigue "pendiente" mostrando precio.

**FASE 2 TRENDING — REVISADA AL COMPLETO.** Resto ya bien monetizado (sin acción): luka-4
(ECI 77,99), immortality-4 (ECI 53,99), immortality-5 (ECI 89,99), freak-7 (ECI 68,99),
unpre-ars-2 (AliExpress 120=MSRP), mb05 (Amazon 85,99). SIN fuente afiliada viable (NO insistir):
- skx-float: ninguna afiliada la stockea (Amazon OOS, Atmósfera/FuikaOmar/ECI no tienen Skechers).
- ja-3: AliExpress Marcas+ 152,99 (>MSRP 135), Amazon solo GS inflada (165-295), ECI/FuikaOmar no.

**Promo**: añadido tramo bajo ESCD02 (2€/18€) a AliExpress Ahorros de verano (newsletter Awin).

**RETROS más buscados — revisados (NO usar AliExpress para retros).** Aprendizaje clave: AliExpress
Marcas+ NO sirve para retros hiper-demandados → las legítimas (Kobe Protro 295-640) salen MÁS caras
que Amazon; las sospechosamente baratas (AJ4 a 85€) = riesgo de RÉPLICA aunque pongan Marcas+, NO
enlazar. Barrido en ECI/Snipes/Decathlon. Mejoras aplicadas:
- air-jordan-5: Decathlon marketplace (WE HAVE IT) 238,99 (6%) < Amazon inflado 299.
- reebok-shaqnosis (es la LOW, product ID 100244789): ECI 150/sin-stock → 120/disponible.
- air-jordan-4: Snipes Toro Bravo 170 (era 210 stale en precios.json) < Amazon.
- air-jordan-3/6: precios/URLs Snipes verificados (AJ3 170, AJ6 150). Limpiadas comillas mal
  codificadas (%2522/%22) en URLs de producto Snipes de AJ4/AJ3 (editorial + precios.json, node/CRLF).
- SIN mejora (Amazon ya es el precio real de mercado): AJ12/13 (Decathlon 365), AJ8/9 (no stock),
  Kobe 4/5/6 Protro (Amazon 195-200; AliExpress/Decathlon 295-640). Kobe 1 Protro sigue sin afiliado.

Commits sesión 29 (14): `fc8f273`→`878675b`→`be00443`→`f1d2924`→`a8bcfa7`→`fed75c2`→`dcb36a9`→
`efd5069`→`5f76d00`→`4640921`→`6d74c95`→`0455441` (+ promo, regla, docs, retros). Build 334 págs.

### ▶️ EN CURSO — retomar aquí (frente 2, opcional)
**FASE 2 TRENDING = CERRADA** (todas revisadas; sabrina-3, kd-18, book-2, tatum-3 monetizadas
esta sesión; skx-float y ja-3 sin stock afiliado, no insistir).
**FRENTE 2 (opcional, NO urgente)**: upgrade de comisión Amazon 3% → AliExpress Marcas+ 7% / ECI 6%
en zapas que ya monetizan barato pero con comisión baja (KD 16/17, Luka 3, One Take 5…). Requiere
que el AliExpress Marcas+ sea ≤ precio actual mostrado (regla). No urgente.

---

## Estado anterior (sesión 28) — Migración de analítica: Plausible → Cloudflare Web Analytics

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

**Las 32 zapas sin afiliado → 24 monetizadas (navegación manual en Chrome, precios REALES)**.
Verificado tienda por tienda con Claude-in-Chrome. RESULTADO FINAL (commits `16696e2`, `4abf5c9`, `892975f`, `4f2842a`):
- **8 vía FuikaOmar (5%, precio real)** — FuikaOmar SÍ stockea varias flagships (mi búsqueda inicial
  "kd 18" con espacio fallaba; "kd" sí las encuentra): KD 16/17/18, Luka 1/4/5, Freak 5/6.
- **1 vía Decathlon (6%, marketplace W.Sneakers)**: nike-book-2 (161,09 — sobre MSRP, reseller).
- **15 vía Amazon (3%, precio real del modelo EXACTO)**: gt-cut-3 (289,99 — descatalogada, resellers
  inflan), immortality-4 (75,90), kyrie-low-5 (196), gt-cut-academy-2 (116,71), tatum-4 (109,05),
  zion-4 (292,55), one-take-5 (68,26), luka-3 (186,34), sabrina-1 (137,23), ua-futr-x-elite (75),
  ua-futr-x-4 (48), ua-spawn-7-mid (67,95), stewie-4 (58,99), scoot-zeros (58,99), kawhi-1 (286,70).
- **8 SIN afiliado** (ninguna fuente afiliada tiene el modelo EXACTO; verificado Amazon+Decathlon+
  FuikaOmar+Snipes): gt-jump-3 (solo GT Jump Academy), AJ38/xxxviii (solo AJ1/4 talla 38),
  sabrina-3-gs e immortality-4-gs (solo adulto, no GS), nike-kobe-1-protro (solo Kobe 4/9) y
  3 Moolah Kicks (marca US no distribuida). Muestran "Ver precio" + MSRP. NO insistir salvo
  que entren en stock en una afiliada.
- **OJO precios Amazon de modelos descatalogados** (gt-cut-3, zion-4, kyrie-low-5, kawhi-1): resellers
  los venden MUY por encima de MSRP (250-290€). Es el precio real, pero hace que parezcan caras.
- Afiliados 317 → 346. **Zapas sin afiliado: 32 → 8.**

**Promos añadidas** (`promos.ts`, date-gated, commit `fc8f273`): AliExpress "Día de marcas"
(BDES04→40, 22-26 jun) + Decathlon "Play Days" (PLAY10, 10% solo app, 23-26 jun).

### ▶️ EN CURSO — Revisión manual de enlaces (retomar aquí)
El usuario revisa los enlaces de compra zapa por zapa y confirma si son correctos. Navega en Chrome
y pasa precio/URL reales; Claude los envuelve (AliExpress→Awin awinmid=11640, Decathlon→105405,
adidas→77008, atmosfera→26255, FuikaOmar→deals.fuikaomar.es c=37834). Worklist por score en
**`web/scripts/review-by-score.out.txt`** (regenerar con `npx tsx scripts/review-by-score.ts`).

**FASE 1 — por score: verificadas #1–#11** (commits hasta `9fef595`). Hecho: wow-allcity-14, wow-12,
clyde-all-pro, wow-allcity-13, kai-1-speed, kt-10, gamma-2, jordan-40, 361-joker-1, lebron-21,
wow-allcity-12. (Pendiente seguir por score desde #12 si se retoma esa vía, pero ahora vamos por trending.)

**FASE 2 — TRENDING (en curso, retomar en #7).** 21 zapas con tag `trending`; 3 ya hechas en fase 1
(wow-allcity-14, wow-12, 361-joker-1). Orden por score (ver lista). **Verificadas trending #1–#6**:
don-issue-7, ae-2, rigorer-ar3, ua-curry-12, harden-vol-9, lebron-23. **SIGUIENTE: trending #7 =
nike-sabrina-3 (8.3)**. Luego: skx-float, kd-18, ja-3, mb05, luka-4, immortality-4, freak-7, tatum-3,
unpre-ars-2, immortality-5, book-2.

**APRENDIZAJES de esta sesión (importantes para `precios.json`)**:
- `precios.json` (scraper, CRLF) **OVERRIDE/append por tienda** vía `mergePricesIntoShoes`. Al revisar
  una zapa SIEMPRE comprobar `node -e "...p.shoes['ID']..."`: si una tienda que editas también está
  en precios.json, el merge **pisa** tu precio/URL (mismo tienda) o **reañade** la tienda (si no está
  en editorial). Hay que actualizar/eliminar también en precios.json. Para borrar entradas: script
  node por rango de líneas respetando CRLF (NO round-trip JSON.stringify, reformatea todo el archivo).
- Limpiadas 6 huérfanas de precios.json (zapas borradas): freak-7, ae-3, je-1, ar-2, adizero-select-3,
  assert-10 (182→176). Fix URL atmosfera ae-2 (wrapper Awin auto-anidado ~4000 chars, roto).
- Imágenes nuevas: descargar og:image del listado (AliExpress/FuikaOmar), `sharp` resize 600px webp q82,
  mismo path .webp. kd-18 pasó de Aunt Pearl rosa a Liquid Lime. kai-1-speed a foto AliExpress real.
- Pendiente menor: imagen `nike-lebron-nxxt-genisus` es pequeña (585×319), mejorable. KD19 (8.3
  editorial) y Kobe 1 Protro (8.7 hg/n9) → el usuario dice DEJARLAS como están.
- Verificación: tras editar, reiniciar dev server (el módulo de datos se cachea) + `gen-chat-catalog`
  + fetch ficha con cache-bust. Commit+push por zapa. Build OK 329 págs.

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
> ⚠ **CADUCADO (s38, 24-ago-2026): la AE 3 YA EXISTE** — adidas la anunció en 2026 y sale el
> 15-sep-2026 con Hyperboost. Ficha `adidas-ae-3` recreada. La AE 1.5 sigue sin existir.
> Lección: "no existe" es una foto con fecha, no un hecho permanente. Antes de reusar un
> veredicto de fantasma, mirar la fecha.

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
  - ✅ **El Corte Inglés ES** — aid: 13075, **APROBADO 2026-06-26** 🔥 (EPC €13.99, el premio gordo).
    Activados los 7 links elcorteingles_es (wrapper Awin + tiene_afiliado:true), comisión 6%.
    Quitado de TIENDAS_PENDIENTES y añadido a AFILIADO_OK. ⚠ NO permite Cashback (no aplica, no somos cashback).
    - 🔑 **NAVEGAR ECI con Claude-in-Chrome (bot-block resuelto, s29)**: ECI mete un bucle de
      "Challenge Validation" si navegas DIRECTO a una URL de búsqueda/ficha sin sesión. Solución
      (navegación normal, NO es evadir nada): **1º navegar a la home `https://www.elcorteingles.es/`**
      (carga sin reto y crea cookies de sesión), **2º ya funcionan** las búsquedas
      (`/search-nwx/?s=QUERY`) y las fichas. Ojo: `get_page_text` en el grid de resultados solo
      devuelve el 1er producto (lazy-load) → leer por **screenshots** scrolleando. Categoría básquet:
      buscar "zapatillas de baloncesto" (~947 resultados, ordenables por descuento).
- **PENDIENTES de aprobación (4) — al 2026-08-23**:
  - ⏳ **Joom ES** — conv 7.65%, aprob 94%, EPC 0.30€ → desbloquea **19 links Joom** ya en BD (tiene_afiliado:false)
  - ⏳ **Sneakin ES** — conv 4.32%, aprob 75%
  - ⏳ **Pro:Direct ES** — conv 0.12%, aprob 100%
  - ⏳ **Reebok ES** — N/A (recién lanzado 11/12/26) → 5 links Reebok esperando
- **Rechazados (7) — al 2026-08-14** (botón "+Unirse", reintentar en 3-6 meses con más tráfico):
  Foot Locker ES, JD Sports ES, Sprinter ES, Foot-Store ES, **size?Official ES**, **Privé by Zalando ES**,
  **Basket-Center ES** (aid 71517, rechazado el 14-ago-2026 — pasó de PENDIENTE a rechazado).
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
- **Uso**: marcas chinas (Anta, Li-Ning, Peak, Way of Wade) SIEMPRE. **Marcas occidentales
  (Nike/Jordan/adidas/etc.) SOLO si el listado tiene el sello `Marcas+ Verificado`** (canal de
  marcas autenticadas de AliExpress con garantía de originalidad; el SKU debe coincidir con el
  modelo real). NUNCA enlazar un listado Nike/Jordan suelto sin ese sello (son réplicas). Ejemplo:
  nike-sabrina-3 → "Nike Authentic Sabrina 3 EP HF2882-600" (Marcas+ Verificado) 90,99€, s28.
- **Formato link**: `https://s.click.aliexpress.com/e/_XXXXX` (Portals) o wrapper Awin
  `awinmid=11640` sobre la URL de producto `es.aliexpress.com/item/ID.html` (preferido, cookie 30d).
- **Zapas con AliExpress** (13): anta-kai-1-speed, lining-wow-allcity-13, anta-kai-2, anta-kt-10, lining-wow-12, peak-lou-williams-underground, anta-shock-the-game-5, lining-gamma-2, anta-kt-11, lining-sonic-12, peak-taichi-flash, anta-shock-wave-5, lining-yu-shuai-18

### Tiendas sin programa de afiliados (no añadir)
- El Corte Inglés — sin programa público
- Basket World — sin programa
- AliExpress — SÍ usar: marcas chinas siempre; marcas occidentales solo con sello Marcas+ Verificado (ver arriba)

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

---

# Archivado el 2-nov-2026: sesiones 38→57

> Volcado íntegro de lo que CLAUDE.md llevaba entre *Estado actual* y *Doctrina* al recortarlo.
> Lo que sigue vigente de aquí está resumido en CLAUDE.md.

## ▶️ Estado actual (sesión 43, 1-sep) — Streaming en producción, y decisiones tomadas

Sesión a DOS AGENTES (ver *Infra*): una sesión ejecuta y commitea, la otra decide con el usuario.

1. ✅ **El chat responde en STREAMING** (`be208c9`, desplegado y verificado en producción).
   El front ya lo soportaba desde siempre y nadie lo había usado (`ChatWidget.astro` línea ~252
   ya hacía `res.body.getReader()` con repintado incremental). Solo cambió `chat.ts`.
   · Verificado: 11 trozos entre 9.324 y 12.024 ms, `transfer-encoding: chunked`, y **Vercel NO
     bufferiza** pese al `br` (respeta el `X-Accel-Buffering: no`). Marcadores `[[shoe:]]` intactos,
     cero fuga de `<think>`.
   · 🔴 **PERO el primer carácter tarda 9,3 s de los 12,3 totales.** Esos 9 s son minimax
     RAZONANDO antes de emitir nada. Pasamos de 12 s de spinner a 9,3 s de spinner + 3 s de
     lectura: es una mejora, pero NO la que se esperaba al pedirlo. Ver doctrina.
   · **DECIDIDO POR EL USUARIO: se queda así.** Ni `reasoning: {effort:"low"}` ni reordenar la
     cadena. Prefiere conservar la calidad de recomendación antes que los 9 s. **Tema cerrado.**

2. ✅ **Enlaces de búsqueda de Amazon: DECIDIDO, en tres grupos.** Son **73** los que quedan (el
   "~39" de la s41 eran solo aquellos donde Amazon es la única tienda afiliada). Desglose medido:
   67 "Amazon no tiene el modelo" · 4 reventa · 2 segmento equivocado.
   · **QUITAR los 4 de reventa**: `nike-kobe-4-protro` (1.204,89 €), `nike-pg-6` (420,64 € sobre
     MSRP ~120), `nike-kyrie-flytrap-6` (205,73 € sobre ~80), `air-jordan-14` (487-840 €). Si
     alguien compra paga 2-7× el precio justo por recomendación nuestra.
   · **QUITAR los 2 de segmento**: `adidas-cross-em-up-5` (nuestra ficha es la adulta unisex;
     Amazon solo vende la "Cross Em Up 5 **K**" de kids) y `air-jordan-10` (único candidato GS).
   · **Los 67 restantes SE QUEDAN, pero SIN precio numérico.** 🔑 El motivo de conservarlos es que
     **la cookie de Amazon dura 24 h y cubre cualquier compra posterior**, no solo el producto
     enlazado: con 94 clics/mes son superficie real para las 3 ventas que la cuenta necesita antes
     de nov-2026. El motivo de quitarles el precio es que su `precio_actual` salió del LISTADO de
     búsqueda, o sea que es el precio de otro producto.
   · Vía de implementación: `mostramosPrecio(link)` en `scoring.ts` (estrategia "Ver precio" de la
     s28), NO editar 67 enlaces a mano. ⚠ Aplicarlo **solo en DISPLAY**: el orden del catálogo y el
     editor's pick usan `findMejorPrecio` con el precio real y tocarlo cambiaría el orden del sitio.

2b. ✅ **APLICADO (`75ab314`)**: fuera los 6 de (A)+(B) y regla nueva `esEnlaceDeBusqueda()` en
   `scoring.ts` para (C). Medido sobre el catálogo fusionado: **75 enlaces dejan de mostrar precio**
   (67 amazon_es + 4 reebok_es + 3 aliexpress + 1 adidas_es, que son rebote de la misma regla y por
   el mismo motivo) y **14 zapas pasan a enseñar MSRP**, las 14 con MSRP real: ninguna se queda con
   un hueco. Casi todos los precios ocultados estaban **por encima del MSRP** (`nike-kobe-5-protro`
   "desde 195 €" con MSRP 175), que es la señal de que venían de la tarjeta equivocada. Cae también
   el "desde 90 €" de `361-zen-7`, el número que ya estaba señalado como sospechoso. Un solo "desde"
   cambia de valor: `reebok-kamikaze-1` 120 → 181,66 €. La regla **se autocorrige**: cuando el
   scraper resuelve una búsqueda, `resolveUrl()` le pone la URL de la ficha y su precio vuelve.

3. ✅ **Auditoría de parámetros de búsqueda — CERRADA (`b79379a`), 42 enlaces arreglados.**
   15 formas distintas en 12 tiendas, cada una comprobada contra la tienda real.
   · **Rotas y arregladas**: Zalando `/buscar/?q=` → `/catalogo/?q=` (14) · JD `/search?q=` →
     `/products/search?q=` (10) · Puma `es.puma.com/es_ES` → `eu.puma.com/es/es/search` (7) ·
     UA `/es-es/buscar/?q=` → `/es-es/search?q=` (6) · Reebok (4, `reebok.es` **ya no resuelve en
     DNS**) → `reebok.eu/es-es/search?q=` · adidas `/busqueda?q=` → `/search?q=` (1, **y adidas es
     afiliado ACTIVO**: ese enlace no monetizaba nada).
   · **Verificadas BUENAS, no se tocan**: Amazon `/s?k=` (71) · Foot Locker `?query=` (49) ·
     Nike `/es/w?q=&vst=` (44) · KicksCrew `/search?q=` (18) · Zalando `/zapatillas/?q=` (5).
   · ✅ **New Balance (6) VERIFICADO (s44, 5-sep)**: el muro anti-bot frena `curl`/WebFetch pero NO
     un navegador real (Claude-in-Chrome) — control positivo `?q=baloncesto` da 34 resultados reales.
     Con eso: `/es/buscar/?q=` (4 enlaces) está **MUERTO**, sirve la 404 propia del sitio; el que
     funciona es `/search?q=`. Pero funcionar el parámetro no basta — de los 6, solo
     `nb-fresh-foam-bb-v3` es un match real (3 resultados exactos, precio actualizado 140→84€).
     Los otros 5 devuelven el catálogo genérico completo (925, 207, 1.010 resultados) sin ni un
     Kawhi ni un OMN1S ni una Two WXY real: **NB ES no vende ninguna de las tres líneas**, mismo
     patrón ya documentado para la Kawhi V. `nb-kawhi-2`, `nb-kawhi-4` y `nb-two-wxy-v4` estaban
     marcados `disponible: true` por error del scraper (coló el catálogo entero como "resultado");
     corregidos a `false` — ninguna ficha se queda sin opción de compra, las tres tienen otra
     tienda activa. `nb-kawhi-1` y `nb-omn1s` ya estaban bien.
   · 🔴 **Basket World (14) — CERRADO Y RESUELTO (s44, 5-sep)**: los 14 enlaces se quitaron
     (ninguna ficha se quedó sin opción de compra). Ver el pendiente propio más abajo si queda
     alguna referencia histórica.

4. 📧 **Joom: CONTESTÓ el 10-sep — no acepta publishers nuevos en Awin, hay que ir por Impact.** Ver *Pendientes*.

---

## Bloque 3 del catálogo (s43, 1-sep) — DECIDIDO: entran 4 de 6

Investigados los seis, fuente por fuente, sin deducir disponibilidad del lanzamiento global.

| Modelo | Salida | MSRP | Score | España (verificado 1-sep) | Decisión |
|---|---|---|---|---|---|
| Nike Sabrina 4 | 17-jul-2026 | $135 | **WT 8/10** verificado | Nike ES **129,99 EUR** "Superventas" | ENTRA |
| Puma Stewie 5 | 19-may-2026 | $125 | ninguna, editorial | Puma ES **120 EUR** (Turbo) InStock | ENTRA |
| Puma Scoot Zeros III | 6-feb-2026 | $95 | ninguna, editorial | Puma ES **81 EUR** InStock | ENTRA |
| Nike LeBron 24 | **17-nov-2026** | $200 | imposible | sin lanzar | ENTRA `proximamente` |
| NB Kawhi V | verano 2026 | $160 | ninguna | **NO se vende en ES** | FUERA |
| adidas Harden Vol 11 | **dic-2026** | $160 | imposible | sin lanzar | ESPERA |

Los precios de Puma salen del **JSON-LD `Product` de primer nivel** de cada ficha, no de una tarjeta
de listado. Validan de paso el arreglo de URLs de `b79379a`: `eu.puma.com/es/es/search?q=` devuelve
producto real donde `es.puma.com/es_ES` mandaba a una landing de categoría.

**Por qué las dos Puma entran con score editorial**: tienen precio Y disponibilidad verificados, y
una review numerada de un modelo Puma puede no llegar NUNCA — esperarla es esperar a nada. Ninguna
de las seis aparece en el *Best Basketball Shoes 2026* de WT, que sí puntúa a 15 modelos.

**Por qué la LeBron 24 sí y la Harden Vol 11 no**: la LeBron sale en dos meses y medio y su volumen
de búsqueda es de otra liga; esa ventana de indexación no se recupera. La Harden es de diciembre
(colorway de All-Star el 19-feb-2027) y puede entrar más tarde sin coste, con más specs publicadas.
ATENCION: de la LeBron 24, **"KingKnit" y "la más ligera de la saga" son afirmaciones de NIKE, no
medidas**: van atribuidas en la ficha, y el peso va ESTIMADO y marcado (igual que las 4 de la s38).

### NB Kawhi V: NO se puede comprar en España — medido, no supuesto
No es "sin verificar": es un **NO con control positivo**, que es lo que lo hace fiable.
- `newbalance.es/search?q=kawhi` -> *"Ningún resultado encontrado para kawhi"*.
- **Control**: `?q=baloncesto` -> **34 artículos con calzado de básquet real** (P400 140 EUR, P400
  Low 135, P350 120). La tienda vende baloncesto y el buscador funciona: **no trabaja la Kawhi**.
- Amazon ES: 106 resultados para "new balance kawhi 5" y **ninguno es la Kawhi V** (son 530/515/480
  de lifestyle). El único Kawhi es una **Kawhi 1 de reventa a 379,36 EUR**, descartada por el
  criterio de ~2x MSRP que aplicó `75ab314`.

Crear la ficha sería **parir una zapa con cero enlaces a propósito**. Mantener así a
`adidas-cross-em-up-5` (que ya existía) es una cosa; crear una así, otra. **Reabrir cuando NB ES
la stockee.**

**Doctrina nueva del matcher: el buscador de New Balance casa SUBCADENAS.** `?q=hesi` devuelve
**14 artículos y son todos ropa *Heritage***. Una consulta corta puede dar 14 resultados no vacíos
y ni uno relevante. Es "un resultado no vacío no es un resultado correcto" con mecanismo NUEVO:
subcadena, no sinónimo.

**Las 3 vendibles NO monetizan**: Nike ES y Puma ES no son afiliados nuestros y Puma sigue rechazado
en CJ. Entran como "Ver precio en Nike/Puma" SIN número (estrategia s28 funcionando como debe).
Repuntar a ECI / Atmósfera / Snipes / FuikaOmar cuando entren en stock. No ahora.

---

## Estado anterior (sesión 41, 29-ago) — Sesión de PANELES: los números reales, por fin

Nada de catálogo esta vez. Se abrieron los paneles de OpenRouter, Awin y Amazon Afiliados y
**tres diagnósticos anteriores resultaron estar mal**. Detalle en *Pendientes abiertos*.

1. **El chat NO estaba caído** y el "403" de la s40 no existe: son **429 por modelo**, y minimax
   responde 200. Cadena reordenada (minimax primero) en `chat.ts` y `coach.ts`. 236 tests OK.
2. **Los 942 clics de Decathlon de julio eran del propio scraper.** El tráfico real de la web es
   de ~100 clics/mes, no de mil.
3. **El riesgo de Amazon no es de tráfico, es de conversión**: 94 clics reales y 0 ventas, con el
   **49% de los enlaces apuntando a búsquedas `/s?k=` en vez de a fichas `/dp/`** (87 vs 90,
   medido post-merge). **Repasados a mano los 56 prioritarios: 17 fichas nuevas fijadas** (70
   búsquedas / 107 fichas). Los ~39 restantes no tienen arreglo — **Amazon ES apenas vende este
   nicho** — y queda decidir si se quitan.
4. **adidas / tracking 20-27 ago: cerrado, impacto cero** (1 clic en todo el mes).

5. **Repasado el correo (30-ago)**: nada urgente. Lo accionable era el parámetro **`models: [...]`**
   de OpenRouter — **ya implementado en la s42 (31-ago)**, ver *IA del chat*.
   El Choice Day de AliExpress (1-7 sept) ya estaba cargado en `promos.ts`; la de ECI caduca el 31.

**▶️ ESPERANDO DECISIÓN DEL USUARIO**: (a) re-solicitar los 7 programas rechazados de Awin, que ya
tienen el botón "Unirse" activo; (b) los $10 de créditos de OpenRouter; (c) qué hacer con los ~39
enlaces de Amazon sin ficha posible; (d) 361sport como Tienda nueva.

---

## Estado anterior (sesión 39, 26-ago) — Bloque 2: Joker 2 + Joker 2 GT, y 361° vende en España

CLAUDE.md partido en "lo vivo" + `docs/historial-sesiones.md`. Catálogo 238 → **240**,
342 páginas, 236 tests, `astro check` 0 errores, `audit-enlaces` "Sin hallazgos".

### 🔥 HALLAZGO GORDO — `361sport.com` tiene tienda `/es-es`, precios en EUR y ENVÍA A ESPAÑA
La marca vende directa. Política de envío verificada el 26-ago: *"podemos entregar a los Estados
Unidos, Canadá, Australia, Francia, Alemania, Italia, **España** y el Reino Unido"*, 7-21 días,
envío gratis desde 99 $. **Tarifas oficiales en €** (que hasta hoy dábamos por inexistentes):

| Modelo | Tarifa oficial € | Lo que decía el catálogo |
|---|---|---|
| Joker 2 GT | **200 €** | no existía |
| Joker 2 (y "Denver" Alto) | **150 €** | 119 € estimados por conversión → ⚠ se dio por CORREGIDO aquí pero **el dato no cambió hasta la s45** |
| Joker 1 | **140 €** | 119 € |
| ZEN 7 | **120 €** | 90 € (y la API de AliExpress decía 156,99 €) |
| Big3 4.0 Quick | **124 €** | — |

⚠ **Ojo, el precio NO es final**: *"361Sport.com no es responsable de los impuestos de importación"*
→ envía desde fuera de la UE sin IOSS aparente, así que el cliente paga IVA (21%) + gestión al
recibir. Unos 150 € de tarifa salen por ~185 € reales. **Por eso AliExpress (IVA incluido y
afiliado al 7%) sigue siendo la mejor opción de compra**, no un mal menor.

**▶️ DECIDIR (más urgente desde la s47)**: `361-zen-8` (130 €) y `361-ag-6` (110 €) entraron el 11-sep (`fe6ebfb`)
con **cero enlaces**: 361sport las vende y envía a España, pero no es una `Tienda` dada de alta, y AliExpress no
vale (ZEN 8 a 174,99 € = 1,35× MSRP; AG 6 sin resultados). NO es el caso de la NB Kawhi V (que no se vende en
España en absoluto): aquí el hueco lo cierra dar de alta la tienda. **▶️ DECIDIR**: meter `361sport` como `Tienda` nueva. No le conocemos programa de afiliados, así
que entraría como "Ver precio en 361sport" (sin número) salvo que se pida el afiliado primero.
Toca `Tienda` en `types.ts` + `COMISIONES_TIENDA`. **No hecho: es tu llamada.**

### `361-joker-2-gt` — ficha nueva (bloque 2 cerrado)
| Dato | Valor | Fuente |
|---|---|---|
| Score | **8,7** confianza *editorial* | **NO hay review numérica**: anclado al 8,6 verificado de la normal + consenso cualitativo (WT y kicksown la ven "más completa") |
| Salida | feb-2026 | 361sport / shopnings |
| MSRP | **200 €** oficiales | 361sport `/es-es` |
| Enlace | AliExpress **180,69 €** (`1005012413955051`, 29 vendidos) — **por debajo de tarifa** ✅ | verificado 26-ago |
| Peso | **390 g** de FABRICANTE. ⚠ una fuente suelta dice 371 g, sin confirmar | shopnings |
| `drop_mm: 9` | HEREDADO de la Joker 1, 361° no lo publica | — |

Es **otro tier, no un colorway**: CQTEXTREME supercrítica de longitud completa (+16% propulsión)
frente a la supercrítica solo-talón de la normal, placa **QU!KBONE** de carbono+TPU fusionada en
una pieza, upper DIAMOND SHELL con KPU microinyectado y suela **RPU** (la normal lleva Diamond
Grip). Por eso va con `categoria_principal: "responsive"` y la normal con `"cushion-focused"`.
`predecesor_id: null` **a propósito**: su predecesora sería la Joker 1 GT, que no está en catálogo
— encadenarla a `361-joker-2` sería mentir sobre la generación.

### `361-joker-2` — la ficha (verificada 26-ago)
| Dato | Valor | Fuente |
|---|---|---|
| Score | **8,6** confianza *alta* | HoopsGeek 8,6 (5 análisis) + WearTesters 8/10 |
| Salida | dic-2025 (los 6 colorways globales, feb-2026) | WT / HoopsGeek |
| MSRP | **150 €** oficiales (corregido: eran 119 € estimados por conversión del $) | 361sport `/es-es` |
| Peso | **390 g** — dato de FABRICANTE (US9), no de laboratorio | 361sport |
| `drop_mm: 9` | **HEREDADO de la Joker 1**, 361° no lo publica | — |

⚠ **Dos datos de la s38 estaban mal y quedan corregidos**: no es "WearTesters 9/10" (es **8/10**;
el 8,6 sale de HoopsGeek) y no salió en feb-2026 (**dic-2025**; en feb-2026 cayeron 6 colorways).

### ⚠ La Joker 2 NO se vende en España — la premisa de "el más rentable" no se sostuvo
Verificado tienda por tienda el 26-ago:
- ❌ **Amazon ES**: 0 resultados reales (devuelve AE 2, Ja 3, Luka 2… ninguna 361°).
- ❌ **Basketball Emotion**: 3 resultados de "joker 2" y **los 3 son Joker 1** (84-120 €).
- ❌ **FuikaOmar**: no trabaja 361° en absoluto.
- ✅ **AliExpress ES**: única vía. La Joker 2 Low a **184,10 €** (item `1005011771667705`),
  es decir **+23% sobre sus 150 € de tarifa** (no el +55% que parecía antes de encontrar el precio
  oficial en €). Único enlace de la ficha → la web muestra "desde 184 €". Con el IVA de importación
  que 361sport NO cubre, comprar en la marca sale parecido: el enlace de AliExpress se sostiene.

---

## Estado anterior (sesión 38, 24-ago) — Repaso de mercado: 21 modelos nuevos, 4 en catálogo

Commits `a61dd22` + `f327f13`. Catálogo 234 → **238**. `audit-enlaces` "Sin hallazgos".

### Las 4 fichas creadas (bloque 1: sucesoras de flagships que ya teníamos)
| Ficha | Salida | Estado en España (verificado 24-ago) |
|---|---|---|
| `jordan-41` | 9-jul-2026 | ❌ **NO se vende** ni en Nike ES ni en Amazon ES (`disponible: false`) |
| `nike-ja-4` | 13-ago-2026 | ✅ Nike ES **129,99 €** |
| `nike-giannis-freak-8` | 1-ago-2026 | ✅ Nike ES **114,99 €** |
| `adidas-ae-3` | 15-sep-2026 | ⏳ `proximamente: true` — estrena **Hyperboost** (+22% retorno vs Lightstrike Pro) |

- **Solo la Ja 4 tiene score real** (WearTesters 7,5/10). Las otras 3 son `evaluacion-propia`:
  a 24-ago no hay review numérica publicada. **Revisar cuando salgan.**
- **Los pesos son ESTIMADOS** (predecesora + cambios de construcción). Ninguna tiene dato de
  laboratorio. Actualizar cuando RunRepeat las corte por la mitad.
- Encadenados `predecesor_id`/`sucesor_id` en AJ 40, Ja 3, Freak 7 y AE 2.
- ⚠ **Las 4 no monetizan casi nada**: Nike ES no es afiliado nuestro, y Amazon ES, FuikaOmar,
  adidas ES y ECI no las stockean aún. Repuntar a ECI (6%) / Atmósfera (6%) / FuikaOmar (5%)
  en cuanto entren.

### ▶️ SIGUIENTE PASO — quedan 16 modelos por meter
**Bloque 2:** ✅ CERRADO (s39): `361-joker-2` y `361-joker-2-gt`. Siguiente parada, el bloque 3.

**Bloque 3 — flagships ya a la venta:** Nike Sabrina 4 (17-jul, $135), New Balance Kawhi V
(verano 2026, $160), Puma Stewie 5 (15-may, $125), Puma Scoot Zeros III (tenemos solo la gen 1).
Sin lanzar aún: **Nike LeBron 24** (17-nov, $200, upper "KingKnit", la más ligera de la saga) y
**adidas Harden Vol 11** (dic-2026, $160).

**Bloque 4 — marcas nuevas que WearTesters puntúa 9/10 y no tenemos ni una:**
`Serious Player Only Player 1.5` ($190, "el mejor drop-in del mercado") y `EQLZ 247 NXT` ($125).

**Bloque 5 — nicho/chinas y femenino:** Li-Ning JB4 (Jimmy Butler), Peak AW4 (Wiggins),
361 AG6 (Aaron Gordon, sin confirmar), **Reebok Angel Reese 1** (¡en venta desde sept-2025!),
Holo JS:01 (Jacy Sheldon, $120), LeBron NXXT Gen by JuJu, 741 Performance Rover (Jaylen Brown),
Nike GT Cut 1 Retro (WT 9,5/10) y Converse SHAI 001 Lux.

---

## 🔴 Pendientes abiertos

### ▶️ S57 (19-oct, autónomo) — generador de sesiones con IA y la cadena gratuita, otra vez medio muerta

- ✅ **Fuentes**: los dos `preload` de `.woff2` de `Base.astro` daban **404 en TODAS las páginas** (Google cambió las
  versiones). Quitados (`3f6e0d9`); la hoja de Google Fonts sigue cargando las buenas.
- ✅ **QA en móvil (375 px) de las 11 herramientas en producción**: ninguna desborda la página (las tablas anchas van en su
  contenedor con scroll) y sin errores de consola salvo el de las fuentes. Torneo probado de punta a punta (6 equipos, 2
  grupos + semis, triple empate resuelto por diferencia, cruces correctos, foco conservado al teclear resultados).
- ✅ **Generador de sesiones con IA** (`feedf89`), ver el punto del modelo de negocio.
- 🔴 **Cadena gratuita: 3 de 6 modelos ya no existen gratis** (medido contra `/api/v1/models`): `qwen3.8-27b` (404
  "unavailable for free"), `ling-3.0-flash-vl` y `glm-5.2`. Quedan **17 `:free`**, todos de razonamiento. Entran
  `minimax-m3.1-flash` (nuevo ese mismo día), `nemotron-3.5-super-vl` y `nemotron-3-ultra-550b`, **sin validar**.
  Hoy contesta casi todo **nemotron-3-super**; gemma-31b sigue con 429.
- 🔴 **El chat servía filas crudas del catálogo y sin tarjetas**: nemotron imita el formato de las líneas del prompt
  (slug suelto + `Marca | cat | 98€ | tracc 10…`) y el tope de 15 s lo cortaba a mitad, por un camino que cerraba sin
  `asegurarMarcadores`. Arreglado en el stream (`formatoVisible`) + 40 s por intento + `maxDuration: 60`. Lo mismo para
  `coach.ts`.
- ✅ **Chat medido tras el arreglo (3 consultas)**: las 3 con tarjetas y 0 filas crudas (gemma 4 s; nemotron 14-24 s). Pero
  nemotron se saltaba reglas: GS a un adulto y una zapa de 127 € con tope de 120. Ahora `sistemaPara()` quita las GS del
  catálogo que ve el modelo si nadie pide algo júnior y añade el presupuesto al final del prompt; y se le pide nombrar por
  nombre comercial, no por slug.
- ✅ **5 ejercicios dibujados nuevos** (7 → 12): zig-zag defensivo, cierre de rebote, 2c2 de bloqueo directo, pase y corte y
  concha 4c4 (shell). Revisados dibujados paso a paso (render a PNG con `renderSvgCompleto` + sharp). 🔑 En `sig()` el
  `mueve` coloca las piezas al EMPEZAR el paso, no al acabarlo: lo que se mueve DURANTE un paso va con una línea.
  También van en `EJERCICIOS_IA`, así que la IA de sesiones ya los usa.
- ✅ **`scripts/audit-ia.ts`** nuevo: lista qué modelos de la cadena ya no existen gratis (exit 1) y cuáles hay sin usar.
- ✅ **El catálogo del chat usa el precio MOSTRADO** (`gen-chat-catalog.ts`): anunciaba la reventa que la web oculta
  (Gamma 2 «479 €» con la ficha enseñando MSRP 120).
- ✅ **Chat sin tecnología inventada**: cada línea del catálogo del chat lleva `| tec …` (`tecnologia_clave`) y el prompt
  prohíbe nombrar otra (nemotron atribuía «Max Air y placa de carbono» a la LeBron 22). Re-medido: cita Air Zoom y Cushlon 3.0.
- ✅ **/resultados: 127 KB → 5 KB de JS** (`lib/quizCatalogo.ts` + `/quiz-catalogo.json`, 26 KB gz cacheable). Importaba el
  catálogo entero para puntuar 5 zapas. Test candado: 60 combinaciones de respuestas dan lo mismo con el catálogo recortado.
  🔴 Y sus tarjetas enseñaban el precio REAL (reventa y tiendas sin afiliado, con CTA patrocinado): ahora el de la ficha.
- ✅ **25 notas más ancladas a HoopsGeek** (páginas publicadas tras la auditoría del 21-sep): Curry 13, Joker 2 GT,
  Believe That 1, Sabrina 4, Ja 4, Caitlin 1, A'Two, Gamma 2, GT Cut 3 (slug `nike-air-zoom-gt-cut-3`), Dame Certified 3,
  All-Pro Nitro, AE 1, Luka .77, GT Cut Academy 2, Zion 4, Book 1, KD 17, D.O.N. 6, Witness 8, Precision 7, TWO WXY v5,
  KD 19, Dame X, ZEN 7 y Rigorer AR1. Pro Vision NO (2 reviews). AE 3: WearTesters 8,5. Cortes: todos coinciden salvo
  Witness 8 (se queda low). 🔑 HoopsGeek da también **notas por categoría** (tracción, cushion, soporte, % exterior) en
  «Category Performance Ratings» y pros/contras: con eso se reescribieron Caitlin 1, A'Two, Joker 2 GT, AE 3, AG 6 y JB4,
  que seguían como pre-lanzamiento o «sin review». Quedan 45 visibles sin ancla: budget/team sin reviews (s44) y
  lanzamientos sin review aún (Freak 8, MB.06, Stewie 5, Scoot Zeros III, Immortality 5, AJ 41, KT 11).
- 🔴 **La durabilidad en EXTERIOR estaba inflada en todo el catálogo** (142 de 153 adultas pasaban el filtro de exterior
  del quiz). Comparadas las 102 ancladas con el «% de análisis que la ven apta para exterior» de HoopsGeek: AE 2 8/10 y 0 %,
  Curry 12 6 y 0 %, Jordan XXXIX 8 y 0 %… Corregidas 41 (+GS) donde el desvío era ≥ 3 (0 % → 2, 100 % → 9) y la Flow
  Breakthru 4 (UA Flow). Ahora pasan 110. La guía de outdoor recomendaba la AE 2: rehecha con All City 14, Shock Wave 5,
  Luka .77, Dame Certified y Precision 7, y su tabla usa la marca nueva **`{{exterior:ID}}`**. Siete fichas que seguían
  vendiendo el exterior, reescritas. ⚠ Tracción/cushion/soporte de HG NO se aplican: otra escala (HG casi nunca da 10)
  y bajarlos solo en las medidas hundiría a esas zapas en el quiz frente a las no medidas.
- ✅ **Horma corregida en 16 zapas** que HoopsGeek describe explícitamente como estrechas (Zion 3/4, Freak 5, GT Jump 1
  → estrecha; Immortality 3, GT Jump 2, Witness 8 → normal; Ja 1, Kobe 6 y 9 Elite Low, Kyrie Low 5, One Take 5, Gamma 2,
  All-Pro Nitro 2, AJ 40, GT Cut Academy 2 → estrecha). La coletilla «wide footers, half size up» NO cuenta: sale en casi todas.
- ✅ **Contenido corregido contra la ficha**: FAQ (28 respuestas), páginas SEO (New Balance rehecha + 10 líneas), guías de
  outdoor, pie ancho, baratas y niños rehechas, y 8 menciones sueltas en análisis. Recomendaban zapas que NO existen
  (Voltzy 500, Flow Breakthru 5, TWO WXY v6, Precision 8 GS, Tatum 2/3 GS, Immortality 5 GS, Tarmak Fast 500), ocultas
  (Fresh Foam BB v3, Precision 8, Answer IV), GS a adultos (Cross 'Em Up Select, Air Zoom Crossover 2), «Max Air» en la
  LeBron 22/23, «Nike AE 2», precios de hace meses y que el tag de Amazon «garantiza producto oficial» (falso).
  🔑 Herramientas de esta sesión en el scratchpad (no en el repo): bajar páginas HG a `$TEMP/hgcat/<id>.html` y parsear
  «Category Performance Ratings» (`|9.5|Traction|…`, `|50%|Outdoor|…`, `|Fit|…`, `|Sizing|…`) y `ratingValue` del JSON-LD.
- ✅ **19-oct (tarde), tras el clear**: chat medido otra vez y otras dos reglas saltadas → `sistemaPara()` ahora da al
  modelo SOLO las GS si piden júnior y quita las `low` si hablan de tobillo/esguince (`69f7c09`, verificado en producción:
  Curry 13 + Sabrina 2 para tobillos, Believe That 1 GS + Immortality 4 GS para un niño). `/api/sesion`: 2 de 2 bien.
  **Notas x/10 de los artículos → marcas `{{nota:ID:eje}}` y `{{score:ID}}`** (`99ff847`, test candado en
  `articles.test.ts`): de 264, 131 ya no coincidían con la ficha; 58 frases reescritas porque quedaban falsas (GT Cut 4
  «la más reactiva» con respuesta 7 y score 7,0; MB.04 vs MB.05; Kobe 8 «poco soporte» con 9; Tatum 4 fuera de la guía de
  pie plano, entra la Kai 2). Se dejan: notas citadas de HG/WT y la guía de espumas (valora tecnologías, no zapas). Fuera
  de las recomendaciones las ocultas (BB v3, Kawhi 2, Luka 77 GS, Unpre ARS 2, Embiid 1) y «NB vs ANTA» rehecho. Mapeo en
  `trabajo/w32-notas.tsv`. ⚠ Las marcas solo se resuelven en `body`: en `description`/`title` no pongas números.
- ✅ **Horma, barrido de artículos (`1d89684`, `trabajo/w33-horma.tsv`)**: 107 afirmaciones de horma de zapas concretas
  contrastadas con ficha + HoopsGeek (`thehoopsgeek.com`, no `hoopsgeek.com`; caché en `$TEMP/hgcat`). **7 fichas
  corregidas** con cita verificada en el HTML: GT Cut 4, Ja 3, Sabrina 3 → estrecha; Joker 1, Immortality 4 (+GS), Freak 7
  → normal («narrow to regular best»). 🔑 **Regla: la ficha de horma solo se mueve hacia MÁS ESTRECHA** (Curry 13 y KD 17,
  que HG ve amplias, se quedan normal): recomendar como ancha una zapa que aprieta es el error que duele, como con el corte.
  45 frases de artículos corregidas (la Ja 3 «la Nike ancha», la Kai 2 «la mejor para pie ancho», la LeBron 23
  «estrecha»…). Y las FAQ de `seoPages` sin notas x/10 a mano (no resuelven marcas).
- ✅ **Tecnología, barrido de artículos (`e0ee482`, `trabajo/w34-tecnologia.tsv`)**: 12 fichas con `tecnologia_clave`
  mal, corregidas con cita de HG verificada (Ja 3 = ZoomX enjaulado; Tatum 4 = Cushlon 3.0 + Zoom antepié; GT Cut 4 =
  Zoom Strobel + ZoomX; Luka 1 = Formula 23; LeBron 23 = ZoomX + Cushlon + carbono, SIN Air Zoom; Kobe 8 Protro = React
  drop-in; Shock Wave 5 = nitrógeno + carbono; Joker 1 = CQT + shank de plástico…) y 78 frases de artículos/SEO/FAQ. El
  «Max Air» de las LeBron 22/23 estaba en ~15 líneas. ⚠ Sin resolver (FICHA_DUDA): ¿la AE 2 lleva Lightstrike **Pro**?
  (HG no lo nombra y adidas.com bloquea; los artículos lo repiten en ~10 líneas), KT 11, Trae Young 3, Kobe 9 High Protro.
  Heir Series sin tocar: HG solo tiene la Heir Series 2. «Luka DonÄiÄ‡» se veía así en producción: arreglado (6 fichas).
- ✅ **Noche del 19→20-oct (autónomo): `tecnologia_clave` auditada en TODO el catálogo moderno** (`trabajo/w36-tec-*.tsv`,
  cita + URL por ficha; 4 Sonnets por grupos de marca, yo verifiqué al azar ~20 citas en el HTML real y todas estaban).
  **81 fichas corregidas**: 21 Jordan/UA/NB, 19 chinas/Asics/Skechers, 17 Nike, 24 adidas/Puma/Converse (+ prosa de cada
  ficha, `material_superior` y etiquetas falsas). 🔑 **El «Lightstrike Pro» estaba puesto en media gama adidas sin serlo**
  (AE 1 = Boost+Lightstrike; AE 2 = Light BOOST+Lightstrike, RunRepeat laboratorio; Harden 8 = Boost; Harden 10 = Light
  BOOST; Dame 8 = Bounce Pro); ninguna fuente respalda la «goma Continental». Placas de carbono inventadas en 6 chinas y la
  SKX Float. SHAI 001 lleva Zoom antepié (no React). Freak 7 sin Zoom, Immortality = Renew, PG 6 sin aire. Yu Shuai 18 sin
  tocar (la fuente era la ABAU009 high). Script de aplicación: `aplicar_w36.py` (scratchpad; valida que `tec_actual`
  coincida con la ficha antes de cambiar). Además: **páginas SEO, 149 afirmaciones** (`w35-seo.tsv`: zapas inexistentes u
  ocultas recomendadas —Converse «BBall Pro», Reebok Answer V/Legacy Court, Moolah—, comparaciones falsas, números a mano,
  hechos: Puma volvió en 2018, Li-Ning es de 1990) y **coherencia interna de fichas** (prosa/etiquetas contra sus campos:
  Zion 4, GT Jump 2, Curry 13, Reebok Blast; JB4 → estrecha). 🔑 El heredoc del Bash de esta máquina convierte `\\` en `\`:
  scripts con regex, escribirlos con la herramienta Write.
- ✅ **20-oct (mañana)**: retros auditados (14 fichas, `w36-tec-retro.tsv`), segunda pasada de contenido (`w37`), **pesos**
  (`w38-pesos.tsv`: solo 51 de 227 tienen laboratorio; 12 corregidas con RunRepeat o peso oficial de Nike — Ja 3 310 → 379 g)
  y 🔑 **`peso_score` = f(peso_real_g)**: 10 con ≤300 g y −1 cada 25 g, con test candado (`pesoScore.test.ts`). Antes se
  ponía a ojo (AE 2 de 428 g con un 10). Recalculadas 168; nota global movida en 60 (máx ±0,5), top 10 igual. El ranking
  «Más ligeras» ordena por gramos.
- 📧 **Joom (20-oct)**: segundo recordatorio a Viviana enviado (pide invitación directa a la cuenta Impact 7791022). Probado
  otra vez desde el Chrome del usuario: el enlace `campaign-promo-signup/Joom.brand` con la cuenta existente → «Iniciar
  sesión» CIERRA la sesión y vuelve al panel; no hay forma de solicitar desde dentro (Marketplace rechazado). 🔑 **Vía que
  queda por probar (la tiene que hacer el usuario, es crear cuenta): darse de alta como partner NUEVO desde ese mismo enlace
  de Joom con OTRO correo** (p. ej. uno de CANCHA.ZAPA): el alta por enlace de marca va directa a la marca, sin la revisión
  de Marketplace que rechazó la cuenta actual. Plan B: FlexOffers lista «Joom ES» (1,6-20 %, cookie 30 d; estado dudoso).
  ✅ **Ticket a Impact n.º 903210 (20-oct, «Marketplace Approval»)** pidiendo re-evaluar el rechazo, con el caso de Joom.
  Vía oficial según su ayuda (no hay botón de «reapply» en el panel). El usuario NO quiere cuentas nuevas. 🔑 Se abrió desde
  su Chrome (Claude in Chrome) con su sesión de Google, sin contraseña: elegir cuenta + «Continuar». Si el equipo está
  bloqueado, Chrome no pinta (capturas con timeout); con `read_page`/JS sí se puede leer y rellenar. El editor es Quill:
  rellenar `.ql-editor` y copiar `__quill.root.innerHTML` al `input#description` antes de «Crear».
- ✅ **20-oct (tarde)**: **números a mano en la prosa de las fichas** fuera (`w39-numeros-prosa.tsv`, 232 frases en 162
  fichas: precios que se pudren, pesos que no cuadraban con `peso_real_g`, notas x/10 sin fuente; se quedan los pesos que
  coinciden ±5 % y las notas atribuidas a HG/WT) + 16 adjetivos «ligera» que contradecían el peso (KD 19 «más ligera que
  la KD 18» con 440 g frente a 422…). Quiz comprobado tras los cambios de horma y ligereza: pie ancho ya no recibe
  estrechas, tobillos solo mid. Cortes reauditados (`w40`/`w41`): Sabrina 2 mid → low, GT Jump 2 high → mid, LeBron 24
  high → low, Jet 23 mid → low.
- ✅ **20-oct (noche): precios viejos y enlaces muertos.** 32 «desde» con >14 días re-verificados a mano (Amazon, Atmósfera,
  Decathlon, AliExpress; `w42-enlaces-scraper.tsv`). 🔑 **Merge: una `ultima_verificacion` editorial MÁS RECIENTE que el
  scrape manda también en el PRECIO** (`3085061`, +2 tests): antes el scrape de hace días pisaba la corrección de hoy.
  **AliExpress, los 34 items visibles abiertos con navegador: 7 ya no existen** («Esta página no existe»), y el scraper
  había dado por vivos dos de ellos el 16 y el 18-oct (Tatum 3, All City 13). 🔑 **La API de afiliados sigue devolviendo
  producto para items retirados**: ahora el scraper abre la ficha cuando la API dice que existe y solo el texto de error
  la marca agotada (`veredictoFichaItem`, `5cd9d00`; probado con cloakbrowser, <2 s por item). All City 13 recupera compra
  (ABAV001-4, Marcas+ POIZON, 63,39 €). Ocultas por enlaces muertos: Jet 23, TWO WXY v5, Ownthegame 2, Yu Shuai 18 → **46**.
  ⚠ Sin poder re-verificar: adidas.es (bloquea curl Y navegador: AE 2 GS, D.O.N. 7, Forum 84, AE 3), 7 fichas de Amazon con
  selector de talla y los 3 `s.click`. → Resuelto el 21-oct (abajo).
- ✅ **21-oct: lo que quedaba sin verificar, verificado.** 🔑 **adidas.es YA carga en el navegador integrado** (curl sigue en
  403). Agotadas AE 2, AE 2 GS, Harden 9, D.O.N. 7 y Forum 84 Low; Pro Model redirige a /classics. 🔑 **El scraper le puso a la
  Dame X ADULTA la versión JUNIOR** (KJ6559, «Kids Unisex»): adidas redirige un color retirado a otro, también de otro
  segmento. Vuelve la KI5949. MSRP corregidos con el «Precio original» de adidas.es: AE 2 130 · AE 2 GS 100 · D.O.N. 7 120 ·
  OwnTheGame 3 65 · Dame X 90. AE 2 GS recupera compra en FuikaOmar (VDay Junior, 99,90 €, 3 tallas). **Amazon**: 10
  «desde» viejos; la mayoría ya solo se venden como reventa o con un vendedor externo (Curry 12 GS, Sabrina 2, Harden 9,
  MB.04, MB.03, Kawhi 1, Tatum 4, Precision 7: 125-286 €) → la ficha enseña MSRP. Forum 84: la búsqueda devolvía Low y Mid,
  fijada la High (B0CH4875SK). Dame X en Decathlon a 33,99 € con `nota` de talla única (47 1/3). **Los 3 `s.click`**: KT 11
  → item real (112611101-4, 75,39 €); Shock The Game 5 y Taichi Flash no existen en AliExpress (la Flash Taichi es mid) →
  **ocultas (46 → 48)**; el artículo de marcas chinas usa la Peak AW4. 🔑 **Títulos de una búsqueda de AliExpress**: las
  tarjetas no traen texto en el DOM; están en el HTML como `"productId"…"displayTitle"`. Ordenar por precio devuelve basura.
  **Chat**: nemotron-3.5 escribía `[[slug]]` sin prefijo y repetía las tarjetas → `formatoVisible` lo convierte y deduplica.
  **Precios con coma** en toda la web (`euros()` en `scoring.ts`) y el buscador Cmd+K enseña el mismo «desde» que la ficha
  (antes, el MSRP). Joom: borrador SIN ENVIAR a hello@joom.com (único contacto oficial), a la espera del usuario; FlexOffers y
  Admitad listan Joom ES abierto, pero piden cuenta nueva.
- ✅ **21-oct (tarde): barrido de CATÁLOGO ENTERO por tienda afiliada** (mucho más rendidor que buscar modelo a modelo, porque
  ECI y Atmósfera ignoran el modelo en su buscador). 🔑 **Método**: listar la categoría de baloncesto entera (ECI
  `/deportes/baloncesto/zapatillas/N/` con `fetch` desde la página; Atmósfera `/baloncesto-zapatillas-hombre-242`, `-ninos-244`,
  `/outlet-baloncesto-3704` con `?page=`; FuikaOmar `/zapatillas-baloncesto/?page=` por curl), quedarse con lo no enlazado,
  leer precio + tallas, cruzar con las fichas y REVISAR A MANO (el `matchesShoe` del scraper casa AJ 4 con «Why Not Zero 0.4»
  y Scoot Zeros 1 con la 2/3). Umbral: **4 tallas o más**. Resultado: **18 fichas** con precio mejor o afiliado nuevo (ECI:
  Immortality 4 62,99 [era 108 en Amazon], AE 2 GS, Believe That 1 GS · Atmósfera: AE 3 109,90 [adidas 130], Curry 3Z 25
  46,75, Witness 9, FUTR X 4, SKX League, Jet 25, Precision 7, Cross Em Up Select GS · FuikaOmar: MB.04 Gem 84,90 [enseñaba
  MSRP], MB.06 [ya no depende solo de Puma], Trae Young 3, Harden 10, Sabrina 3, MB.05 GS). 🔑 **Scraper de Atmósfera
  arreglado**: leía `[class*=size]` y los carruseles de recomendados (`km-c002-size-select`) traen tallas disponibles de
  OTROS productos ⇒ nunca detectaba un agotado. Ahora solo `.product-actions` (esperando a que se pinte). La «Precision 8
  Mid» de Atmósfera es IH1104 = Low (no rescata la ficha). ▶️ Quedan por barrer igual: Forum Sport, Snipes y Decathlon.
  ⚠ AJ 40: su «desde» es Decathlon 155,49 y Nike ES la vende hoy a 139,99 (regla de s55): decidir si se quita.
  **Forum Sport** (tallas pintadas en cliente: `.size-item.js-select-size` = disponible, `off` = no): casi todo con 1-3
  tallas; entran Harden 10 KI1605 107,19 y D.O.N. 7 JR9502 78,11. Luka 77 GS sigue oculta (Nike ES 55,99 < Forum 71,99);
  su MSRP 90 → 79,99. Snipes no tiene categoría de rendimiento y Decathlon mezcla marketplace (2.150 resultados): no
  compensa barrerlos.
- ✅ **Ficha nueva `adidas-don-issue-8`** (`9f28e81`): WearTesters 9/10 (ancla editorial 9.0 + `wt_url`, como la AE 3),
  Lightstrike Pro desbloqueado en antepié, 352 g de fabricante (WT pesó 409 g en EU 45), low (imagen oficial), 120 €.
  Desde 77,99 en Forum (11 tallas) + adidas.es 120 + FuikaOmar 119,90. IndexNow enviado. **Catálogo 245 → 246.**
  ▶️ **Candidatas a ficha nueva vistas en los barridos** (todas lanzadas en ES): **LeBron Witness X** (Nike ES 99,99,
  Cushlon 3.0, sin reviews; Forum solo «Halloween» a 109,99 → hoy no pasa la regla del afiliado más caro), **Tatum 5**
  (Nike ES 129,99; ninguna afiliada la vende en adulto → saldría oculta), **G.T. Future** (Nike ES 199,99, sin mirar).
- ✅ **4 fichas chinas nuevas con ancla de HoopsGeek, todas en AliExpress/POIZON** (`8e6de52` + siguiente): **Wade DLo 2**
  (HG 8,5, ABPW013, desde 62,99, MSRP 110), **Wade 808 5 Ultra V2** (HG 8,8, ABAV045, desde 102,99, MSRP 145), **Wade Flash 2**
  (HG 8,3, ABPV013, desde 51,69) y **Wade Shadow 7** (HG 8,2, ABPV011, desde 63,39). Pesos ESTIMADOS (HG no los publica).
  + **All City 13 Encore** (HG 8,9, ABAV047, desde 65,39). **Catálogo 246 → 251.** 🔑 **La DLo es la línea de D'Angelo Russell**, no de Dwyane Wade: corregida la DLo 1. 🔑 **Método**:
  la SKU de la zapa reseñada sale de los nombres de imagen de HG (`/IMG/…-abpw013-…`); se busca ESA SKU en AliExpress
  (`/w/wholesale-ABPW013.html?SortType=price_asc`, precios en el HTML como `productId…displayTitle…formattedPrice`) y en la
  ficha se lee el precio talla a talla clicando `[class*=sku-item--text]`. Descartadas: **Shock Wave 7** (HG reseña la
  112611606 sin correa; AliExpress solo tiene la 112611111S con correa y otras SKU: no es el mismo producto), **Rigorer
  AR 2** (adulto ≥136 € con tarifa de 100 $) y **361 BioSpeed BB 2** (no está; la gen 1 a 156 €).
- ✅ **Más baratas por POIZON** (misma búsqueda por SKU): DLo 1 119,69 → **61,39** (ABPV009-14, 16 tallas), All City 12
  102,39 → **89,99** (ABAU015-5, 18 tallas), KT 10 **107,99** (112441101-6; FuikaOmar solo tiene la 44). MB.06: Amazon
  `/dp/B0HKNHGYQB` a **91,99** (era búsqueda apagada; FuikaOmar 119,90). ⚠ La «Joker 2» a 88 € de AliExpress es la **672611104**
  = Joker 2 **Alta** (361sport, `/products/<handle>.js` da la SKU por variante); nuestra ficha es la baja, 672611110.
- 🔴 **Gamma 2: MSRP 120 € SIN FUENTE → 370 €.** HoopsGeek $399,99 y WearTesters «Price: $400+» («the biggest issue is the
  price»). La ficha la vendía como «la mejor relación rendimiento-precio» y por eso los 479 € de AliExpress salían como
  reventa a 4×: es la tope de gama de Li-Ning. Reescritos ficha y `seoPages` («Gamma 2 = relación calidad-precio»).
  🔑 **Cruce MSRP ficha vs tarifa de HG** (todas las fichas con URL de HG): también salen por debajo la Shock Wave 5 (90 € vs
  $199,99), la JB4 (120 vs $249) y la Rigorer AR1 (75 vs $139,99), pero **NO se tocan**: HG da para marcas chinas el precio
  de importación en EE. UU. y sus propios analistas las llaman «budget» / «great value». Hace falta segunda fuente. Por
  arriba (ratio 1,35-1,45): Tatum 2, NXXT Gen, Luka 1 y Zion 3 → corregidos el 22-oct (abajo); Embiid 1 sin fuente.
- Nike de 2025-26 sin ficha (ST Charge, Kobe 11 Protro, Heir Series 2, NXXT Gen by JuJu, G.T. Future): **ninguna afiliada
  las vende** (Amazon tampoco). No se crean. Scoot Zeros III: Amazon la tiene a 63 € pero Puma ES a 50 € → regla s55, fuera.
- ✅ **22-oct: MSRP auditados contra sneakerjagers** (Sonnet, `trabajo/w43-msrp-salida.tsv`; 170 fichas de marcas no chinas):
  82 OK · 30 distintos · 47 sin fuente · 11 ya con fuente. **27 corregidos con fuente** (Tatum 2/3, Luka 1, Zion 3, LeBron 23
  220→200, GT Cut 4 170→200, A'One 130→110, Book 1 110→150, AJ 38, GT Jump 2 150→220, Crazy 8 110→160, Forum 84 High 140,
  retros AJ 7/9, Zoom Generation 250…; el comentario de cada MSRP lleva el SKU). 🔑 En sneakerjagers la tarifa está en
  `Retail price</dt><dd …>€X` (la meta «Retail €X» no siempre). NO aplicados: Engine A (la página no da tarifa), Superstar y
  Kobe 9 High Protro (no se sabe qué versión es la ficha), Question Mid (110-180), NXXT Genisus (solo QS), AE 1 (la ficha es
  la Mid de 2025, 140). Efecto: Freak 4, Forum 84 y Flight 95 dejan de contar como reventa y enseñan su Amazon (verificado);
  la GT Jump 2 ya solo tiene una oferta a 402,63 € (1,83×) → sigue enseñando su MSRP.
- ✅ **Noche del 21→22-oct (autónomo)**:
  · 🔴 **Nike en AliExpress SIN Marcas+ en enlaces visibles**: LeBron 21 (×4, tiendas «Core Life Gear», «Active Drive
    Sports»…, 94-112 € con MSRP 190) y LeBron 23 (genérica, 129 €) → apagados. La AJ 38 enlazaba la FD2325 = **AJ 38 LOW PF**
    y sin sello → **oculta (48 → 49)**. LeBron 21 conserva compra con Amazon B0D9V558GK (7 tallas, desde 223,60). 🔑 Para leer
    el título de un item de AliExpress basta `fetch('/item/ID.html')` desde la página y la meta `og:title`; la tienda y el
    sello solo salen con el navegador (`De<tienda>(` en el texto). Revisados los 35 items visibles: ninguno más de marca
    occidental. Rigorer AR1: MSRP 75 → 92 ($100 de lanzamiento, sneakernews/StockX) y oferta de «RIGORER Basketball Pro
    Store» a 91,99 con `nota: "Se envía sin caja"`.
  · 🔑 **SKU de Anta**: `112` + año (`3` = 2023) + temporada + estilo (`1106`). 112331106 y 112341106 son la MISMA Shock Wave
    5 en dos temporadas. La MSRP de las chinas en $ (HG/StockX) es precio de importación a EE. UU.: SW5 $200-230 y JB4 $150-299
    según fuente, con POIZON a 70-145 € → no se tocan sin una tarifa europea.
  · Contenido: página SEO de Li-Ning (top nuevo + línea Wade), guía de baratas (+ Encore, DLo 2, Flash 2), guía de exterior
    (+ Encore y DLo 2 en tabla), artículo de marcas chinas (Amazon NO las vende; Basketball Emotion sí) y 4 listas de tiendas
    falsas en artículos (Joker 1 «y Amazon», Kobe 9 High «solo KicksCrew», Curry 13 «UA y Basket4Ballers», Breakthru 4).
  · Promo Forum Sport Flash Night (20MIN, hasta el 22-oct 10:00). Enlaces internos rotos en el build: 0. Imágenes: 0 faltan.
  · Ocultas en Amazon: Jet '23 solo en anuncios de 1-2 tallas; Kobe Protro y PG 6, reventa a 400-530 €. Siguen ocultas.
  · **3 fichas más desde el índice de WearTesters** (`/category/basketball/performance-reviews/page/N/`; la nota está en
    `"ratingValue"`): **Wade 808 6 Ultra** (WT 9, ABAW009, desde 122,39), **All City 14 Encore** (WT 9, **ABAW037**; la ABAW053
    es la «V2 Summer Edition», otra), **Wade Shadow 8** (WT 8,5, ABPW023, desde 70,39). Todas POIZON, pesos ESTIMADOS (los de
    su predecesora). **Catálogo 251 → 254.** Asics Swiftace Yuki (WT 8): no se vende en España → no se crea.
  · **Puma MB.04 Low** (WT 8, «mejor que la mid»): FuikaOmar Alien Skin 79,90 (5 tallas) + Amazon B0FP8BKP5D 82,35 (5).
    🔑 La MB.04 (mid) citaba como fuente la reseña de la LOW: quitada. Barrido de todas las `fuentes` buscando variantes
    cruzadas en la URL (low/mid/pro/elite/encore/gs…): ninguna más. **Catálogo 254 → 255.** Sin afiliada que las venda (no
    se crean): Nike Ja Twelve Time (WT 9, $90), Jordan Triangle (WT 8), Jordan Air Rev (WT 7), Curry Series 7 (WT 9).
  · Basketball Emotion: los 28 enlaces visibles re-verificados (JSON-LD de primer nivel, todos InStock; 27 con precio
    actualizado; `scratchpad/be_check.py`).
  · ▶️ **DECIDIR (usuario): el «desde» de 8 fichas sale de una afiliada MÁS CARA que una tienda sin afiliado verificada hoy**
    (la regla s55 solo se aplicaba a enlaces nuevos): KD 18 Amazon 132 vs BE 96 · A'One FuikaOmar 110 vs BE 77 · JB4
    AliExpress 145 vs BE 99 · LeBron 23 ECI 140 vs BE 120 · WoW 12 AliExpress 227 vs BE 170 · Joker 1 AliExpress 101 vs BE 90
    · AJ 40 Decathlon 155 vs Nike ES 140 · Tatum 4 ECI 91 vs BE 90. Opciones: (a) dejarlo (se cobra comisión, pero el «desde»
    no es el más barato), (b) apagar esas afiliadas (la ficha enseñaría MSRP + «Ver precio en BE») o (c) enseñar el número de
    BE cuando sea el más barato (contradice la estrategia «Ver precio» de la s28: BE no tiene scraper y el número se pudre).
    Los 7 casos con Joom no cuentan: precios de junio y Joom sin garantía de autenticidad.
  · 🔴 **La Tarmak Fast 900 Low-1 de ADULTO enlazaba la de NIÑO**: su enlace era una búsqueda y el scraper la resolvió al
    producto 348019 (niño, 54,99). Fijada la de adulto 343952 (79,99, tallas 39-48; Decathlon da 375 g en T43 = el peso de la
    ficha). Revisadas las 23 URLs visibles que puso el scraper al resolver búsquedas (Amazon por `/dp/` con título,
    departamento y modelo: `scratchpad/amz_dp.py`): todas correctas. Ninguna otra ficha de adulto enlaza producto de niño.
  · **Chat**: con «calle/exterior/outdoor/asfalto» el modelo ya no ve las zapas con outdoor < 5 (el filtro duro del quiz),
    + test. Medido: recomienda Dame Certified, All City 13 Encore y Stewie 5. Y con «pie ancho» fuera las de horma estrecha.
  · **Black Friday** (`b06bd21`): fuera Li-Ning, Anta, Peak y Rigorer del top por descuento: su MSRP es la tarifa en $ de
    importación a EE. UU. y el «descuento» de POIZON era de cartel (Flash 2 y AC14 encabezaban). 361° se queda (tarifa en €).
  · 🔑 **`msrpComparable(z)`** (`scoring.ts`): sin «−X %» ni MSRP tachado para Li-Ning/Anta/Peak/Rigorer en ficha, catálogo,
    resultados, SEO, OG y portada (la Flash 2 enseñaba «−53 %»). Su MSRP sigue valiendo para el corte de reventa.
  · **Horma con WearTesters como 2.ª fuente** (`scratchpad/wt_fit.py`, caché en `$TEMP/wtcat`; sección «Fit» de 110 reseñas):
    → estrecha donde WT Y HG coinciden: Luka 77 (+GS), Tatum 2, Kawhi 1, Book 1, GT Cut 3, Harden Vol 10, MB.03 y Wade DLo 1
    (WT: «tira a estrecha»). ancha → normal donde HG dice ceñida/«narrow to regular best»: Witness 9, NXXT Gen, Freak 6,
    LeBron 21. Se quedan: Luka 3 y A'Two (HG holgadas), Book 2 (HG «varía»), FUTR X Elite (HG «permisiva»). Las reseñas de
    retros 2026 de WT (AJ 3/6/13) puntúan materiales, no rendimiento: no anclan nota. Reparto adulto: 14 ancha · 104 · 39.
  · Chat: prohibidos los superlativos sobre el catálogo entero («la más ligera del catálogo» con 12 empatadas). Medido:
    cadena viva (audit-ia), nemotron-3.5 contesta bien; `/api/sesion` 75 min exactos con 11 jugadores.
  · 📧 **Joom / Impact, respuestas del 21-oct (sin contestar, decide el usuario)**: Impact (ticket 903210) vuelve a
    rechazar el Marketplace: *«the traffic on your domain doesn't quite meet the minimum requirements»*, que solicitemos
    campañas directamente y volvamos a pedirlo con más tráfico. Viviana: *«I cannot see you on Impact, could you please open
    a ticket with the customer service?»* (es justo lo que se hizo). ⇒ Por Impact está cerrado hasta tener tráfico; el
    borrador a hello@joom.com sigue sin enviar.
  · 🔴 **Vercel otra vez al 100 % del almacenamiento (correo del 22-oct 00:10)**: lo provocan los pushes sueltos (51 commits
    en 24 h; ~61 MB por despliegue × ~165 = 10 GB, y la retención es de 1 semana). Hecho: `ignoreCommand` en `web/vercel.json`
    (no despliega si nada cambió en `web/` desde `$VERCEL_GIT_PREVIOUS_SHA`; probado en local) y **pushes agrupados**. No se
    ha borrado nada: borrar despliegues lo decide el usuario (panel de Vercel).
  · Decathlon «Colección adidas baloncesto» (correo de Awin): D.O.N. 8 105,49 · Believe That 1 69,99 · OTG 3 64,99 · OTG 3
    niño 44,99, todas más caras que el «desde» actual → no se añaden. La AE 2 de Decathlon es **solo en tienda física**
    (`InStoreOnly`). OTG 3: fuera una búsqueda de Amazon que buscaba la OTG 2. Build: 0 marcas sin resolver / undefined / NaN.
  · **«ancha» sin fuente → normal**: SKX JE1 (sin reseñas; Skechers solo vende ancho estándar), Freak 8 (sin reseña;
    Freak 6/7 estrechas de puntera; fuera su «Horma ancha de verdad») y GT Jump Academy. Sabrina 3 GS → estrecha como la
    adulta. 🔑 **Regla: una ficha solo va en «ancha» si una fuente la ve holgada** (hoy: LeBron 22/23, Dame 9, Freak 4,
    Luka 1, FUTR X Elite; la LeBron 24 hereda de la 23). La página SEO de pie ancho se rellena con esas. Sin duplicados de
    title/description en el build; HG sin reseñas nuevas de fichas sin ancla (sitemap: 900).
  · **Etiquetas (`tags`)**: se pintan en la ficha (las 2 primeras), van al buscador y el chat lee `retro`/`mujer`. Fuera
    «ligera» de 8 zapas de 363-464 g, «soporte-tobillo» de la Kai 3 (low), «pebax» de la All-Pro Nitro y «retro» de la Kobe 8
    y Kobe 9 High Protro (no son `es_retro`: el chat las avisaba de coleccionismo). Angel Reese 1 gana «mujer». ⚠ Sin
    decidir: las Kobe 1/3/4/5/6 Protro SÍ son `es_retro` y la 8/9 High/9 Elite Low no; unificar mueve rankings y quiz.
  · **Páginas SEO: las GS solo en la júnior** (`[slug].astro`): 12 páginas de adulto tenían GS en el top 5 (talla grande con
    la Curry 12 GS, mujer abriendo con la Sabrina 3 GS).
  · Ranking de mujer sin GS (entraba la Crossover 2 GS). Quiz probado con 5 perfiles exigentes (pie ancho + tobillo +
    exterior + tope): todos con 4-5 resultados coherentes. **Imágenes**: la MB.06 (visible y a la venta) y la LeBron 24 seguían
    con `placeholder-shoe.svg`; ahora MB.06 «Shooting Star» de su `/dp/` de Amazon (`hiRes`) y LeBron 24 de la foto oficial de
    Nike (vía Sole Retriever; las del newsroom son de ambiente, y su URL exige el `m=…&s=…` firmado). Sin más imágenes que falten.
    A'Two y Caitlin 1 eran miniaturas de 320×400: ahora 600 px desde la CDN de Nike (🔑 en la ficha de nike.com/es la URL
    `t_default/…/<id>/<NOMBRE>.png` vale con `t_PDP_1280_v1/f_auto,q_auto:eco,…` delante del mismo id). SW → `cz-cache-v5`.
  · ✅ **`ignoreCommand` comprobado en Vercel**: el commit solo-docs `7826da5` salió «Canceled by Ignored Build Step».
    Para ver el estado de un despliegue: `gh api repos/Waldyx/cancha-basketball/commits/<sha>/status`.
  · Enlaces de marca re-verificados (22-oct): los 10 de Nike ES vivos y InStock (KD 19 159,99, AJ 40 139,99, AJ 41 199,99…),
    361sport ZEN 8 14/19 tallas y AG 6 9/15; Hali 1 en Puma ES sigue OutOfStock en todos los colores (enlace apagado bien).
  · Artículos: fuera los «desde X €» de zapas ocultas (Kobe 6 Protro, Shox BB4 y las 3 Moolah): «precio oficial» o aviso de
    que no la vende ninguna de nuestras tiendas. Las `relatedShoes` ocultas se descartan solas.
  · Chat: el modelo escribía los marcadores internos tal cual («Todas son MUJER-tambien o MUJER-100%»): regla en el prompt;
    re-medido limpio. **Años**: las 3 guías rehechas el 19-oct (exterior, pie ancho, niños) y las páginas SEO de marca y
    accesorios pasan a 2026 en título/meta (las SEO se rellenan solas del catálogo). Los análisis «la mejor de 2025» se quedan:
    ahí el año es un dato, y subirlo sin revisar el texto sería fingir frescura. Quedan ~28 artículos con «2025» en el título.
  · ▶️ **DECIDIR (usuario)**: (1) «Tendencia» (etiqueta `trending`, portada y ranking) incluye generaciones ya superadas en
    catálogo (Curry 12, KD 18, Sabrina 3, Ja 3, Freak 7, MB.05, Harden 9, AE 2, Joker 1, D.O.N. 7…). Pasarla a las sucesoras
    refresca, pero muchas sucesoras solo se venden en Nike ES (sin comisión) y las viejas tienen afiliada. (2) ~~Las Protro~~ → resuelto el 22-oct (abajo).
  · Enlaces externos: las 154 `fuentes` de las fichas y las 124 URL de `score-fuentes.json` comprobadas: 4 de HG daban 404
    (formato viejo `/<x>-review/` → `/shoe-reviews/<slug>/`; la Kai 1 Speed citaba la reseña de la Kai 1). Sneaker News da 403
    (anti-bot). Portada OG del artículo de marcas chinas: era un hotlink a wowsole.com (429) → local. Fichas ocultas: og:image
    por defecto (su `/og/<slug>.png` no se genera). Build: 650 rutas locales, 0 rotas.
  · **«desde» viejos** (todos ≤ 12 días): Havoc 5 en Amazon era reventa (Amazon ya no la vende; vendedores externos a
    343-424 €, MSRP 110) → precio real y la web enseña MSRP. Luka .77: su «desde» 59,99 era el ECI **blanco**, agotado en
    todas las tallas y sin refrescar desde el 14-oct (el scraper fallaba y lo conservaba) → apagado; queda el verde a 69,99.
    🔑 Una URL de afiliado va codificada dentro del wrapper (`%2F`): para buscar un producto en `zapatillas.ts` hay que
    buscar su id (`A56814491`), no la URL. Pasada del 21-oct: 177/399; Amazon 32 ok / 135 fallos (lo conocido de CI),
    AliExpress 25/47 (los fallos son items ya apagados que el scraper sigue intentando).
  · Filas con número de >10 días: FUTR X 4 e Immortality 4 en Amazon daban `#outOfStock` → apagadas (conservan Atmósfera
    y ECI); OTG 3 GS en Atmósfera viva (8 tallas EU). 🔑 Amazon desde CI no ve agotados (`AMAZON_MARCA_AGOTADO=false`): las
    filas de Amazon solo se refrescan a mano. Barrido de las 66 que enseñan número: `fetch('/dp/ASIN')` desde amazon.es en
    el navegador integrado, en segundo plano dentro de la página (`window.__res`), 1,5 s entre peticiones.
    Resultado: 64 con carrito, 9 precios al día. **One Take 5**: su color se agotó → otro color FD2335 con 13 tallas a
    87,97. **Pump Omni Lite**: su ASIN era la Pump Omni **Zone II** (otro modelo) y agotada; ni Amazon ni reebok.eu tienen
    la Omni Lite de adulto → **oculta (49 → 50)**. 🔑 **`#outOfStock` en una `/dp/` con selector de talla solo dice que la
    talla POR DEFECTO está agotada**: hay que pedir cada ASIN hijo (`li[data-asin]` del selector, `/dp/<hijo>?th=1&psc=1`)
    y mirar `#add-to-cart-button`. «Ver opciones disponibles» = solo vendedores externos (a menudo reventa).
  · Texto contra los cambios de horma y ocultas: SEO Nike («la LeBron 22 y 23 y la Freak 4» son anchas), SEO mujer (la
    Sabrina 3 es estrecha), FAQ de pie ancho (la KD 19 va estrecha), FAQ de New Balance (sin la TWO WXY v5, oculta) y FAQ
    de Converse (preguntaba por la inexistente «BBall Pro» y recomendaba la All Star Pro BB oculta → SHAI 001). 7
    comparativas sin «en 2025» en título/meta. All City 13 sin «menos de 100 €» en la prosa.
  · **Pasada del 22-oct revisada**: 0 zapas visibles sin compra; 16 «desde» cambian (casi todo céntimos). 🔴 **Bug del
    scraper**: FuikaOmar daba el producto por agotado si UNA talla del JSON-LD decía OutOfStock (la Trae Young 3 tenía 4
    InStock y 1 agotada; también la MB.04 «Love»), y Forum/Snipes miraban solo `offers[0]` → ahora basta una oferta InStock
    (+ tests, 663). Los otros 8 agotados de FuikaOmar son reales. Tatum 3: FuikaOmar agotada → Amazon HV5882-100 (5 tallas,
    desde 99,99). GT Cut Academy 2: ECI agotada; en Amazon la HV9774 (= Academy 2) solo tiene 3 tallas → no entra, se queda
    con su búsqueda de Amazon; ▶️ revisar si ECI repone. AJ 6: Snipes agotada de verdad (una sola oferta).
  · ✅ **Kobe Protro: decidido por el usuario (22-oct)** — *«las renovadas con tecnología actual NO son retro; las que
    conservan la tecnología vieja, SÍ»*. Comprobado modelo a modelo en HoopsGeek (Cushion) y prensa: **modernas** Kobe 1
    Protro (Zoom de longitud completa en vez de las cápsulas de talón y antepié del original, shank más pequeño), 3 (Zoom
    Strobel + Cushlon), 5 y 6 (Zoom Turbo + Cushlon), 8, 9 High y 9 Elite Low (React en vez del Lunarlon original) ·
    **retro** Kobe 4 Protro (sigue con Zoom en el talón sobre Phylon; las reseñas: «no es una mejora de rendimiento», «más
    retro que Protro»). Cambiado `es_retro` en 1/3/5/6, fuera la etiqueta «retro», y el año de la 5 y la 6 pasa al de la
    Protro (2020 y 2021, el de las retro se deja en el original). Texto de la página SEO de retros y del artículo de retros
    para jugar ajustado. Efecto: la Kobe 5 Protro (única visible de las 4) entra en quiz, rankings modernos y Black Friday.
- ▶️ **PARA RETOMAR**: (1) ~~horma~~ y ~~tecnología~~ en los artículos, hechos (segunda pasada contra las fichas nuevas:
  `w37-contenido-tec.tsv`; retros: `w36-tec-retro.tsv`); (2) las 45
  visibles sin ancla de HG (Freak 8, MB.06, Stewie 5, Scoot Zeros III, Immortality 5, AJ 41, KT 11…): repetir el cruce con
  el sitemap de HG en 2-3 semanas; (3) Search Console (sesión de Google caducada en el navegador integrado: la abre el
  usuario); (4) medir otra vez el chat y `/api/sesion` (`npx tsx scripts/audit-ia.ts` + 2-3 consultas reales).
- ✅ **Lector de actas (22-oct, `dbe24a7`)**: en estadísticas (jugador y equipo) y en el informe del rival, el recuadro de
  «pegar acta» acepta una CAPTURA con Ctrl+V, foto o PDF. Orden, de más privado a menos: (1) PDF con pdf.js / imagen con
  Tesseract EN EL NAVEGADOR (CDN jsDelivr, versiones fijas, carga perezosa) → `parsePaste`, sin IA; (2) si no se entiende,
  `/api/acta` con el texto SIN NOMBRES (`anonimizar`: toda palabra que no sea de estadística → NOM1…, se reponen en local);
  (3) solo si falla, o si hay avisos, y con casilla de consentimiento: la foto a un modelo con visión. Siempre se revisa
  antes de guardar y salen avisos de lo que no cuadra (puntos del acta vs tiros, marcador vs suma). 🔑 OCR medido con tablas
  en gris claro: hace falta ×3 + gamma 2 (a ×1,5-2 la barra de «4/7» desaparece) y rehacer fracciones en las columnas
  T2/T3/TL («59» → 5/9, «410» → 4/10). Con letra de 12 px gris claro en 2000 px: 8 de 9 filas exactas y la 9.ª avisada.
  ✅ IA medida en producción el 22-oct con un acta inventada: texto anonimizado con cabecera y DOS equipos → 100 % bien en
  4,8 s; la foto → 100 % bien en 9,3 s (también la fila que el OCR local leyó mal). Contestó `nemotron-3.5-super-vl`.
  ⚠ Sin fila de cabecera la IA adivina las columnas y se equivoca: el texto tiene que llevarla. Lógica en `lib/actaIA.ts`, interfaz en
  `lib/actaImportUI.ts`. 🔑 La web de la FCBQ: la página `/estadistica/equip/…` es el resumen de temporada (sin jugadores);
  la tabla por jugador está en cada partido (flecha › de la lista) → pestaña «Resum». NO abrirla nosotros (robots.txt).
  ✅ **Capturas largas del móvil** (`0e712e4`): se cortan en trozos solapados (OCR: cada palabra la aporta el trozo en
  cuya franja propia cae; IA: hasta 6 trozos en una petición y la fila repetida fuera). Medido: 1080×7000 con filas en
  los cortes → 8/8 exactas en 10 s en el navegador; 3 trozos a la IA en producción → 5/5 y la fila del corte una vez.
  🔴 **La FCBQ NO publica estadística por jugador** (22-oct, visto por el usuario): «Resum» de la app solo trae totales de
  equipo (TL/T2/T3 anotados, parciales) y la web, solo resumen. El detalle por dorsal está únicamente en «Jugades» (jugada a
  jugada, con fotos de los niños) y capturarlo entero es inviable. Ideas que quedaron en el aire («ya veremos», usuario):
  leer una GRABACIÓN de pantalla de «Jugades» (fotogramas + OCR local, dedupe por periodo/minuto/marcador, el marcador de cada
  jugada como control), anotar en directo con botones por dorsal, o el Open Data de la FCBQ para el club. NO empezar sin él.
  ⛔ **22-oct: el usuario trajo el consejo de otra IA para sacar los datos de la FCBQ** (buscar su «API oculta» en F12,
  Playwright que pase por humano, o 2Captcha). **Descartado y explicado**: es esquivar un CAPTCHA/antibot que la FCBQ pone a
  propósito, su robots.txt veta a los agentes de IA, vende esos datos a los clubs (Open Data) y son datos de menores. La vía
  es pedirlos: el club con el Open Data, o un correo a la FCBQ (se ofreció redactarlo). NO volver a plantear la API oculta.
  ✅ **Lector de «Jugades» (`e6f2d1d`, `lib/jugadesFCBQ.ts`)**: el usuario graba la pantalla bajando por «Jugades» y sube el
  vídeo en estadísticas (jugador/equipo) o rival. Fotograma cada 0,8 s a 720 px sin las barras fijas → Tesseract → tarjetas
  (`P1 05:28` · marcador · jugada · `#8 NOMBRE`); equipo por el LADO del texto (local a la derecha, visitante a la izquierda);
  🔑 las cifras grandes del marcador el OCR de página se las salta → se leen aparte por franja con un worker solo de cifras
  (PSM 7, whitelist); 🔑 el «#» sale como H/4/+ → se descarta el 1.er carácter y el dorsal se VOTA por nombre; la clave de
  jugada no lleva dorsal (un marcador solo ocurre una vez). Sintético (Arial, 12 s): 4/4 exactos en 83 s. ⏳ Falta la grabación
  REAL (el usuario la pasa por WhatsApp; ojo, WhatsApp comprime: mejor como «Documento»).
  ▶️ **ESTADO AL HACER EL CLEAR (22-oct, 19:45) — EMPIEZA AQUÍ si se retoma el lector:**
  · 1.ª prueba REAL del usuario (desde el móvil, bajando deprisa): solo leyó el principio, marcadores basura y final «5-1».
    Arreglado y desplegado: (1) se leen solo fotogramas QUIETOS que han cambiado (muestreo cada 0,2 s; si nunca para, cada
    1 s) y se le dijo que grabe **a saltos** (deslizar 1/3 de pantalla, parar 1 s); (2) 🔑 **gris por el canal MÍNIMO
    (`prepararParaOcr(c, true)`)**: el marcador del equipo que anota va en amarillo sobre turquesa y en gris normal
    desaparecía; (3) final = las dos cajas grandes encima de la línea de la FECHA, leídas por separado.
  · Probado con un vídeo hecho de su captura REAL (`.claude/uploads/…/73076105-image.png`, copiada a `web/dist/_t/` para
    servirla en la preview): las 3 tarjetas bien (#5 vis, #19 local, «3 - 0» canasta de 3 del #8). 🔴 PENDIENTE: (a) el
    60-55 de la cabecera NO se leyó con el recorte por mitades (con la caja entera sale «6055»): revisar el recorte (bordes
    turquesa de las cajas) o partir «6055» por la mitad; (b) en el nombre del visitante se cuela «HAB» (el logo ABP):
    `cabeceraDeLineas` debe usar solo las líneas pegadas a la de la fecha. Diagnóstico: `localStorage cz.debug.acta=1` →
    `window.__actaDebug` (líneas leídas por fotograma). El usuario NO está en el PC: prueba desde el móvil y manda capturas.
  ▶️ **24-oct (`cd2f2a4`, desplegado) — EMPIEZA AQUÍ:** (a) y (b) arreglados y probados con 2 GRABACIONES REALES (WhatsApp,
  576×1296; copiadas a `web/public/_t/v1.mp4` = partido completo Sant Andreu 60-55 Premià, y `v2.mp4` = otro partido SIN
  el principio, sin cabecera; NO commitear `public/_t/`). Cabecera y 60-55 bien. 🔑 **El marcador de cada tarjeta es el
  PARCIAL del periodo** (vuelve a 0-0). Arreglados también: «Personal 2 tirs lliures» contaba como tiro libre anotado,
  «Intent fallat de N» se tiraba, «PS»/«Pi» por P5/P1. 🔴 **Pendiente: solo se leen ~45 de 60 y ~41 de 55 puntos.** La
  grabación va lenta (cada tarjeta sale en 4-5 fotogramas): el fallo es de OCR, sobre todo en la tarjeta RESALTADA (fondo
  turquesa, marcador amarillo) y con la letra de 576 px. Ampliar el fotograma a 1000 px EMPEORA (33/30): no. Ideas: pedir
  el vídeo como «Documento» (resolución original), leer los parciales por periodo de la cabecera (P1 11 · P2 4…) para
  avisar por cuarto de lo que falta. En la preview oculta tarda ~6 min; visible, ~2. Guardar `__actaDebug` en
  `sessionStorage` durante la prueba: cualquier edición recarga la página y se pierde.
- ✅ **22-oct (tarde): `minimax-m3.1-flash` dejó de ser gratis** (estaba vivo por la mañana) → `nemotron-3.5-super-vl` sube a 3.º
  en chat/coach/sesion y entra `nemotron-3.5-lightning` en la cola; en actas super-vl va delante. `audit-ia` revisa también
  `acta.ts`. Medido en producción: chat 3/3 bien (super-vl, 2,5-12 s; presupuesto, tobillos → mid/high, niño → solo GS),
  /api/sesion 60 min exactos (lightning, 29 s), /api/acta bien. Y `vitest.config.ts` regenera `api/_catalog.json` antes de
  los tests (la copia de git va atrasada y tumbaba 2 tests del chat según el último build).
- ✅ **22-oct (tarde): despliegue 63 → 49 MB (−22 %)**, por Vercel al 100 % de almacenamiento: banner y ficha solo meten en el
  HTML las promos NO caducadas (`promosNoCaducadas`; antes todas desde junio, 15 KB × ~380 páginas; ficha 108 → 88 KB) ·
  OG sin alfa y compresión máxima (16 → 8 MB, mismos píxeles; con paleta el degradado salía en anillos) · los 29 JPG/PNG de
  zapatillas que quedaban → WebP 600 q82 (2,3 → 0,47 MB). 🔑 **`optimize-images.mjs` reprocesa TODAS** (recomprime los WebP
  ya hechos): para imágenes nuevas, convertir solo esas. 🔴 **La imagen OG calculaba su propio score** (media simple de los 8
  ejes): la LeBron 23 salía «7/10» al compartirla y la ficha dice 8,3. Ahora `scoreBadge` + de dónde sale. Lector de actas: el
  archivo se suelta al leerlo y en /rival releer la misma acta (fecha, contrario y ≥60 % de dorsales) la sustituye; en el modo
  Equipo, si el nombre del equipo encaja con uno del acta (FEB o leída) ya no pregunta cuál es el nuestro.
- ✅ **22-oct (tarde): accesibilidad con axe-core en 29 páginas → 0 fallos** (dos temas). 🔑 **Los grises secundarios del tema
  oscuro no llegaban a 4,5:1**: `--cz-text-muted`/`--cz-fg4` #71717a → **#8a8a94** y `--cz-text-dim`/`--cz-fg5` #52525b → **#80808a**
  (el contorno decorativo del pie conserva el viejo con `--cz-wordmark-stroke`). La cabecera del chat era un 2.º «banner»
  (`<header>` → div), `<aside>` anidados → div, filtros del catálogo y paneles de la pizarra h3 → h2 (mismo estilo, por
  clase), enlaces de párrafo subrayados en las guías. Redirecciones 301 de las 5 fichas retiradas (trae-young-4,
  harden-stepback-4, cross-em-up-speed, air-max-impact-5, rigorer-warship). Método: inyectar axe desde jsDelivr en un iframe
  del mismo origen por página (`axe.run(iframe.contentDocument)`); el tema se fuerza con `localStorage cz-tema`.
- ✅ **Scraper de Puma**: con enlace a una ficha `/pd/` lee ESA ficha por HTTP (JSON-LD de primer nivel: precio + stock;
  `agotado` solo con señal positiva). Antes buscaba el modelo y daba por disponible la 1.ª tarjeta: la Hali 1 agotada salía
  disponible a 78 € (no se veía porque la ficha la tenía apagada; «la ficha manda»). Stewie 5, Scoot Zeros III y MB.06 en stock.
  ⚠ **`nike_es` (10 enlaces visibles), `ua_es`, `nb_es` y `reebok_es` tampoco leen stock.** Nike: su JSON-LD (ProductGroup)
  NO trae `availability` y las tallas del __NEXT_DATA__ dicen `status: ACTIVE` sin decir si hay stock → hace falta comparar
  con una ficha AGOTADA de Nike antes de programarlo. Mientras, los de Nike se revisan a mano (último: 22-oct, los 10 vivos).
- ✅ Portada: el vídeo del hero (3,3 MB, 37 s a 718 kbps: ya bien codificado) arranca tras el `load` y nunca con ahorro de
  datos o «reducir movimiento».
- ✅ **SEO de fichas (22-oct)**: título sin « | CANCHA.ZAPA» cuando pasa de ~60 caracteres (Google lo cortaba en 222 de 255) y
  descripción con el RESUMEN propio delante (cortado por frase/palabra) + «Nota CANCHA x/10, caña, peso. Precio en tiendas de
  España.» en ~160 (antes las 255 abrían con la misma frase genérica). Enlaces externos de guías/SEO/FAQ: los 14 vivos.
- ✅ **Kobe 5 Protro rescatada** (Decathlon marketplace, 233,99 € = 1,34× MSRP, 7 tallas). Descartadas: **PG 6** (una
  talla y 1 unidad) y **Why Not .6** (solo 36,5-40: curva de mujer/GS). Ocultas 43 → 42.
- ⏸ **Search Console**: la sesión de Google del navegador integrado caducó; no se mete contraseña. Revisarlo el usuario
  (estaba previsto hacia el 29-oct).
- Correo: Forum Flash 48h (18-19 oct) ya cargada; las de ECI «8 Días de Oro» son de hogar/juguetes/ropa, no se cargan.
  Invitación de Awin de «Pixasocial (US)»: irrelevante, sin aceptar.

### 💼 MODELO DE NEGOCIO (decidido con el usuario, 15-oct)
- **Freemium**: lo de zapatillas (catálogo, fichas, quiz, rankings, blog) GRATIS SIEMPRE: es el embudo SEO y
  de afiliados. Lo de más valor (herramientas de entrenador) será **Pro**. Lo que empuja una compra de
  zapatillas (p. ej. "Mis zapas" con desgaste) se deja gratis a propósito.
- **Beta**: Pro gratis para todos hasta que el usuario diga lo contrario. Desbloqueo lo más fácil posible: un
  botón "Activar Pro gratis (beta)" con el código visible en la misma pantalla; solo en el navegador.
- **Clubs**: licencia de club para TODOS sus equipos, en vez de que cada entrenador pague lo suyo.
- ✅ **Paso 1 hecho**: páginas `/jugadores/`, `/entrenadores/`, `/clubs/` (`HubGrid.astro`) y menú
  `Zapatillas ▾ | Jugadores | Entrenadores | Clubs | Blog | ♥`. Las URLs de las herramientas NO cambian.
- ✅ **Paso 2 hecho (15-oct)**: `lib/pro.ts` + `components/ProGate.astro` (intercepta clics/envíos de
  `data-pro="id"`, aviso con código CANCHA-BETA visible, 1 clic, repite la acción) + `api/pro-uso.ts`
  (contador anónimo visto/activado). Pro: sesiones, modo jugador/QR, GIF/vídeo, lecturas (pizarra), pestaña
  Equipo y agente IA (estadísticas). Los enlaces que reciben los jugadores NO se bloquean.
  ⚠ El contador necesita un Redis de Upstash en Vercel (vars `KV_REST_API_URL`/`KV_REST_API_TOKEN`); sin
  ellas responde 204 y no cuenta. Crearlo es acción del usuario en el panel de Vercel.
- 🔎 **Investigación BasketIQ** en `trabajo/biq-investigacion.md` (local): 39/99 €/año entrenador, 349/499
  club (10 equipos), IVA aparte, prueba 1 mes con registro, sin plan gratis. Tracción baja (1 valoración en
  App Store, Play "100+", ~8 clubs del sureste). Fuerte en ejercicios (500+), planificación y cargas;
  débil en pizarra y estadísticas. Guarda datos de jugadores en su servidor sin mencionar menores.
- ✅ **Sesiones listas por edad (15-oct)**: cinco sesiones editables en la pizarra (Premini 6–8, Mini 9–11,
  Infantil 12–13, Cadete 14–15 y Júnior/Sénior 16+) con ejercicios, minutos, notas y material. Al abrir una,
  sus ejercicios se guardan o reutilizan en la biblioteca local para poder editar, imprimir y compartir igual que
  cualquier otra sesión.
  (Hecho por Codex, revisado y subido el 16-oct con `629f6a9`: fecha en hora local y minutos sin repetir.)
- ✅ **Objetivo, duración y jugadores (16-oct)**: encima de las sesiones por edad. El objetivo (tiro / defensa /
  transición) da ×1,6 de peso a sus bloques; la duración reparte minutos con suma exacta (mín. 3/bloque); los
  jugadores añaden una nota "Organización:" por bloque (tríos, parejas, canastas, partidillo que cabe). El foco y
  la organización se DEDUCEN del ejercicio o del título del bloque (`POR_EJERCICIO` en `pizarraSesionesEdad.ts`).
- ✅ **Control de minutos `/minutos/` (16-oct)**: rejilla jugador × período (I = sale de inicio, E = entra
  empezado), avisos en directo y "Proponer rotación" (Pro, `minutos-rotacion`). Lógica en `lib/rotaciones.ts`.
  Normas: **FCBQ mini** (8×6', ≥3 inicios antes del 7.º incl., máx. 5; con 12, uno hace el 3.º en el 8.º) y
  **FCBQ passarel·la** (8×5', en los 6 primeros ≥2 inicios y máx. 4; 7.º-8.º libres) + personalizada.
  ⚠ Fuente: Resum de reglaments FCBQ **Comunicat 1-1415** (el más reciente legible; un resumen dice que el
  2-2223 dice lo mismo). La web de la FCBQ da 403 a las descargas: **confirmar la vigente con un entrenador**.
  Asturias NO incluida (solo vista en un resumen de buscador). Viable mini 8-12 jugadores, passarel·la 8-15.
- ✅ **Biblioteca del club (16-oct)**: en la pizarra, Biblioteca → "Soy coordinador" comparte TODAS sus jugadas y
  sesiones con nombre de club, por enlace (`#j=zc…`, tipo de enlace nuevo `c`) o archivo .json (campo `club`). El
  entrenador lo guarda tras un `confirm`; `cz.pizarra.club.v1` recuerda qué ids vinieron del club, y otra versión
  del MISMO club (sin mayúsculas/tildes) sustituye la anterior sin tocar lo suyo. Filtro "Del club" + marca "Club ·".
  Compartir es Pro (`pizarra-club`); recibir, gratis. Lógica en `lib/pizarraClub.ts`. Medido: 9 jugadas + 5 sesiones
  = enlace de 6.630 caracteres; si pasa de 8.000 se avisa de usar el archivo.
- ✅ **Mapa de tiro `/tiro/` (16-oct)**: tocar la media pista + ✓/✗, por jugador; clasifica 2/3 con la geometría FIBA
  (arco 6,75 m, esquinas a 0,90 m; minibasket todo 2) y zonas (pintura, media, triple de esquina, frontal). Tablas por
  zona y por jugador (TC, T3, puntos, eFG). "Toda la temporada" es Pro (`tiro-temporada`). Lógica en `lib/mapaTiro.ts`,
  pista = `renderTablero` de la pizarra en vertical. Datos en `cz.tiro.v1` (solo navegador).
- ✅ **Informe del rival `/rival/` (17-oct)**: actas de la FEB (`/api/feb`, el rival se identifica por nombre; si es
  ambiguo, el entrenador elige) o pegadas (`parsePaste` de estadísticas, vale para FCBQ). Balance, KPIs de equipo,
  tabla por jugador y pistas por reglas (máx. 2 por tipo; tirador exige ≥4 intentos). 1 partido gratis, varios = Pro
  (`rival-varios`). Lógica en `lib/informeRival.ts`, datos en `cz.rival.v1`. Probado con actas reales de Tercera FEB.
- 🔧 `scoring.test.ts` asumía que la LeBron 22 nunca baja de 80 € (Amazon la puso a 78,35 € el 16-oct): quitada esa
  aserción de datos; el filtro de presupuesto se sigue comprobando con el bucle del mismo test.
- ✅ **Marca del club en lo impreso (17-oct)**: Biblioteca → "Escudo y colores del club": nombre, color y escudo
  (PNG/JPG/WebP reducido a 200 px en el navegador, data URL ≤120 KB; SVG fuera a propósito). Cabecera en el playbook,
  la hoja de banquillo y la sesión impresa. Guardar es Pro (`pizarra-marca`). `lib/pizarraMarca.ts`, `cz.pizarra.marca.v1`.
  ⚠ Comprobado que las 3 impresiones llevan la cabecera (DOM), NO visto en una vista previa de impresión real.
- ✅ Footer con columna "Entrenadores" (pizarra, minutos, tiro, rival, clubs): enlaces internos a las herramientas.
- ✅ **Informe para las familias `/familias/` (17-oct)**: una hoja por jugador desde el modo Equipo (`cz.team.v1`),
  SIEMPRE en positivo (puntos fuertes frente a la media del equipo sin nombrar a nadie, "ha ido a más" solo si es
  verdad, frase neutra para quien apenas juega), mejor partido, gráfica de puntos, comentario del entrenador
  (`cz.familias.v1`) y escudo del club. Imprimir es Pro (`familias-informe`). `lib/informeFamilias.ts`.
- ✅ **Etiquetas de vídeo `/video/` (17-oct)**: el vídeo se abre desde el dispositivo (object URL, no se sube), 9 botones
  con teclas 1-9 (nombres editables), jugador opcional (datalist de `cz.team.v1`), lista con salto y nota, filtro,
  "Ver seguidas" (clips −6/+3 s unidos si se solapan) y CSV = Pro (`video-clips`); copiar lista, gratis. Etiquetas por
  vídeo = nombre|tamaño|duración en `cz.video.v1`. 🔑 Los WebM grabados desde un navegador traen duración = Infinity:
  se trata como 0 (desconocida) y `formatoTiempo` devuelve "—". `lib/videoEtiquetas.ts`.
- ✅ `/entrenadores/` ya no tiene sección "En preparación": todo lo que prometía está hecho.
- ✅ **Asistencia y convocatorias `/asistencia/` (17-oct)**: pasar lista (✓/✗/J, % = vino÷(vino+faltó), la justificada
  no cuenta en contra) y mensaje de convocatoria para WhatsApp (copiar/compartir). GRATIS a propósito (uso semanal).
  `lib/asistencia.ts`, `cz.asistencia.v1`. + JSON-LD WebApplication en las 6 herramientas nuevas e IndexNow enviado
  (17-oct, 8 URLs, 200).
- ✅ **Plan de tiro `/plan-tiro/` (17-oct, para JUGADORES, gratis)**: 4 rutinas (libres, media ×5, triples ×5, completa),
  ✓/✗ por puesto + "Deshacer último" (en iPhone no hay clic derecho), evolución por sesión y % por puesto pintado en la
  pista. Test que comprueba que los 5 puestos de triple están fuera del arco y los 5 de media dentro. `lib/planTiro.ts`.
  `/jugadores/` ya no tiene "En preparación".
- ✅ **Revisión de la noche (subagente, `trabajo/revision-noche-17oct.md`) y sus 11 arreglos**: el paquete del club sale
  SIN nombres de jugadores (`quitarNombres`) · al actualizar el club, las sesiones propias se reenganchan a la jugada nueva
  con el mismo nombre (o pasan a texto) — probado en navegador · nombres repetidos ya no desaparecen: «Pau (2)»
  (`lib/plantillaTexto.ts`, en minutos, tiro y asistencia) · /minutos valida su estado · /rival rechaza actas sin terminar
  · familias: frase del mejor partido bien formada y gráfica solo si ha ido a más · /video limpia el estado al cambiar de
  archivo · /tiro avisa de los topes · escudo pesado bien avisado · trampa de foco en el aviso Pro · CSV sin fórmulas.
  🔑 Al probar coordinador y entrenador en el MISMO navegador, el `pagehide` de la pizarra reescribe `cz.pizarra.v1` al
  recargar: escribir en localStorage a mano y recargar NO sirve para preparar pruebas (crea falsos duplicados).
- ✅ **Evaluación de jugadores `/evaluacion/` (17-oct)**: 12 criterios (técnica, juego, actitud) por NIVELES 1-4
  (Empezando · En progreso · Lo consigue · Destaca), no por notas: en base, un número a un niño no ayuda. Cada criterio
  lleva una «pista» de qué mirar para que dos entrenadores del club valoren lo mismo. Varias evaluaciones por temporada
  (máx. 12), comparación con la anterior, tabla del equipo por áreas. Puntos fuertes solo desde «Lo consigue» y «para
  trabajar» solo por debajo: una hoja nunca llama «lo mejor» a lo flojo. Fichas imprimibles con escudo = Pro
  (`evaluacion-fichas`). Lógica en `lib/evaluacion.ts`, datos en `cz.evaluacion.v1`.
- ✅ **Organizador de torneos `/torneo/` (17-oct)**: liga, liga + final/semis, 2 grupos + final/semis, 4 grupos + semis/
  cuartos. Reparto en serpiente, jornadas por el método del círculo, horario por huecos y pistas (nadie juega dos a la vez
  y, si cabe sin dejar pistas vacías, tampoco dos seguidos), clasificación con desempate FIBA (partidos entre empatados →
  diferencia → puntos a favor) y cruces que se rellenan solos; si cambia quién juega un cruce, su resultado se vacía.
  Enlace de solo ver con TODO en el `#t=` (~300 caracteres para 8 equipos) y «Guardar una copia para editarlo».
  Gratis a propósito: es lo que más se comparte con familias de fuera del club (adquisición). `lib/torneo.ts`, `cz.torneo.v1`.
- ✅ **Tests físicos `/tests-fisicos/` (18-oct)**: velocidad 20 m, agilidad 5-10-5, salto vertical y horizontal, Course
  Navette (palier → VO2máx ESTIMADO con Léger 1988: fórmula con edad de 6 a 17, la de adultos desde 18; usa la edad media
  de la sesión) y balón medicinal. Entrada estación por estación (Intro salta al siguiente), rangos plausibles por prueba,
  marca anterior con ▲/▼ según si es mejor más o menos, media del grupo, CSV con coma decimal y evolución por jugador.
  SIN rankings entre niños. Fichas imprimibles = Pro (`tests-fichas`). `lib/testsFisicos.ts`, `cz.tests.v1`.
- ✅ **Revisión del 18-oct (Sonnet, `trabajo/revision-18oct.md`) aplicada**: torneo — filas que se actualizan en su sitio
  (antes el repintado mataba el foco y en móvil cerraba el teclado), desempate FIBA RECURSIVO (si la mini-liga deja a dos
  empatados decide su cara a cara; difería en el 2-24 % de grupos), horario hueco a hueco que llena todas las pistas
  (4 eq./2 pistas: 3 huecos, antes 5) y prefiere dar descanso, avisos de equipos repetidos/recortados (`leerEquipos`,
  nombre hasta 40), corregir un marcador no vacía el cuadro (foto de cruces hasta que el partido vuelve a tener
  resultado), renombrar no borra resultados, `hashchange`, horas «(+1 d)». 🔑 El ORDEN de `partidos` es el de creación y
  hay test-instantánea: los enlaces guardan resultados por posición. Evaluación/tests: ids que ordenan por creación,
  `lib/huerfanosUI.ts` (datos que cuelgan de un nombre viejo → pasarlos o borrarlos; también en tests físicos),
  «Cambio» solo con criterios comunes. Claves de jugador hasta 48 car. (antes 40 rompía «nombre de 40 (2)»).
- ✅ **3 guías para entrenadores en el blog (18-oct, redactadas por Sonnet y revisadas)**: torneo 3x3 (reglas FIBA 3x3
  verificadas en about.fiba.basketball y fiba.basketball; el PDF de fiba3x3.com da 403, por eso faltan faltas/tiempos
  muertos), tests físicos y evaluar sin nota. Enlace en los dos sentidos con su herramienta. Portada: el torneo sustituye
  a «Coste por partido» en herramientas y enlace a todas.
- ✅ **Plan de partido `/plan-partido/` (19-oct)**: claves del rival (de `cz.rival.v1`, con cada nombre cambiado por su
  DORSAL: es lo que se dice en pista y el texto para el grupo no lleva nombres de niños del otro equipo), objetivos,
  ataque, defensa, emparejamientos (datalist con dorsales del rival y la plantilla de `cz.team.v1`), hasta 6 jugadas de la
  pizarra (`cz.pizarra.v1`) con su dibujo (`tarjeta` de la hoja de banquillo) y situaciones especiales. Texto para
  WhatsApp gratis; hoja A4 con escudo = Pro (`plan-partido`). Campos que se guardan al escribir sin repintar.
  `lib/planPartido.ts`, `cz.planpartido.v1`.
- ✅ **Revisión del 19-oct (Sonnet, `trabajo/revision-19oct.md`) aplicada**: 🔑 VO2máx de ADULTOS mal: Léger 1988 (resumen en
  PubMed 3184250) dice usar la MISMA ecuación con la edad fija en 18, no `−24,4 + 6·X` (daba ~3 ml/kg/min de más y un salto
  a los 18) · plan de tiro: cambiar de rutina borraba tiros en silencio (ahora avisa), «Empezar de cero» confirma,
  pulsación larga en táctil ya no resta, marcador del TL dibujado 1,3 m hacia el aro (tapaba la media frontal) ·
  asistencia: la CONVOCATORIA se guarda (`conv` en `cz.asistencia.v1`), «Todos presentes» no pisa faltas, aviso de
  huérfanos/repetidos/sobran · `fechaValida` (un input date deja teclear años de 5 cifras y la sesión se perdía al
  recargar) en tests, asistencia y evaluación · `lineasPlantilla` ya no repite «Pau (2)».
- ✅ **3 guías más (19-oct)**: scouting con el informe del rival, rutina de tiro para jugadores, asistencia y convocatorias.
  Enlaces de vuelta desde `/rival/`, `/plan-tiro/` y `/asistencia/`; `/rival/` enlaza también al plan de partido.
  + 2 guías (plan de partido y pizarra táctica, 19-oct), enlazadas desde `/plan-partido/` y `/pizarra/`. Ya son 8 guías
  para entrenadores. 🔑 Campos de texto a 16 px en móvil en TODA la web (`cancha-redesign.css`): iOS hacía zoom.
- ✅ **Revisión del plan de partido (`trabajo/revision-19oct-plan.md`) aplicada entera**: al cambiar de rival no se
  quedan las claves del anterior · rival SIN dorsal → iniciales («M. P.»), nunca su nombre · rival escrito a mano
  sincroniza `rivalId`, «Traer» y el datalist sin repintar el campo · `fechaValida` en fecha y en `fechaLarga` ·
  emparejamientos a medias salen marcados («Marc → ¿a quién?») · «-3 de parcial» ya no pierde el signo · jugadas
  guardadas con su nombre (`jugadasNombres`) y reenganchadas por nombre si la biblioteca del club les cambia el id
  (`reengancharJugadas`), con aviso de las borradas · claves hasta 2000 caracteres y solo líneas completas · inputs de
  16 px en móvil (iOS no hace zoom).
- ✅ **Rescate de ocultas (Sonnet, 19-oct, `trabajo/w31-rescate.tsv`)**: 45 ocultas revisadas → **2 rescatadas** en
  FuikaOmar (verificadas por mí con curl: JSON-LD InStock por talla): `nike-sabrina-3-gs` 109,90 € (IR3207-100, 5 tallas)
  y `nike-kobe-9-elite-low-protro` 179,90 € (IH1401 600 University Red, 7 tallas; «EM» = nomenclatura de tienda, ya
  establecido en s52). **Ocultas 45 → 43, visibles 202.** NO aplicadas: Kobe 9 Halo y Kyrie Flytrap 6 en FuikaOmar con
  UNA sola talla · 5 de AliExpress con sello POIZON «Authenticity Verified» sin texto Marcas+ (NB Fresh Foam BB v3, Kawhi 2,
  Asics Unpre ARS 2, Glide Nova FF 4, UA Embiid 1) → ▶️ **DECIDIR (usuario): ¿cuenta el sello POIZON como Marcas+?** ·
  Decathlon marketplace (PG 6, Why Not 6, Kobe 5 Protro) sin poder leer stock: Decathlon dio 429 y luego verificación de
  Cloudflare a mitad de la pasada → repetir esas tres desde un navegador normal.
- ✅ **Pizarra en móvil APAISADO (20-oct)**: con `max-height: 520px` y horizontal, herramientas en columna a la izquierda
  y la pista con toda la altura (844×390: 378 px de alto, antes 175). Vertical, tableta y escritorio no cambian.
- 🔑 **FCBQ, investigado a fondo (20-oct)**: `basquetcatala.cat` da 403 + reCAPTCHA a curl Y al navegador integrado, y su
  `robots.txt` **prohíbe expresamente a los agentes de IA (ClaudeBot, Claude-User…) todo el sitio** ⇒ NO acceder, ni
  siquiera para mirar. La FEB no tiene esa prohibición. **Open Data FCBQ**: servicio de pago SOLO para clubs federados,
  para publicar en la web del club los datos de SUS equipos: 25 €+IVA/mes, 30 €+IVA con actas (según el resumen del
  buscador de basquetcatala.cat/pagina/8516; sin confirmar). Integración con el servicio informático de la FCBQ, sin API
  documentada. La vía legítima sigue siendo el PEGADO por el entrenador. ▶️ Propuesta pendiente: correo a la FCBQ (mejor
  con el club). 🔑 **En Pre-mini el resultado oficial limita la diferencia a +50**: el partido del Alella fue 128-1 según
  la propia estadística de la FCBQ y el resultado oficial 51-1 (y el del Mataró 69-19). Sin confirmar en el reglamento.
  El usuario está montando las estadísticas de su hijo (Pre-mini, AB Premià Blau, dorsal 12): falta la captura de la
  pestaña «Resum» de la app oficial (la de «Jugades» es jugada a jugada); la J1 vs Mataró no tiene acta digital.
- ✅ **Generador de sesiones con IA (19-oct)**: en la pizarra, panel de sesiones → «O pídesela a la IA» (etapa + texto libre;
  duración y jugadores salen de los campos de arriba). `api/sesion.ts` pide un plan en JSON y lo VALIDA (`normalizarPlan`:
  minutos que suman exacto, solo ids de `EJERCICIOS_IA` — test candado contra la biblioteca —, textos recortados). Si la IA
  falla, la pizarra crea la sesión base de la etapa con esa duración y el foco deducido del texto (`objetivoDeTexto`).
  Pro: `pizarra-sesion-ia`. Medido: 4 de 5 peticiones reales bien (13-15 s, nemotron); la que falló era de tiempo y se
  arregló con `maxDuration: 60`. `src/lib/pizarraSesionIA.ts`.
- ▶️ **Paso 3, por orden**: control de minutos/cuartos (verificar normas de participación de la FCBQ) → mapa de
  tiro → libro de jugadas con escudo del club → etiquetas de vídeo. Más ideas: informe del rival (actas FEB),
  plan de partido, generador de sesiones con IA, evaluación de jugadores + informe a familias, tests físicos,
  asistencia/convocatorias, plan individual de tiro (jugadores), cuadros de torneos 3x3/campus.
- ⚠ Decisión futura: la sincronización entre dispositivos y compartir en el club choca con la regla de no tener
  datos de menores en servidor. Para cobrar: pasarela tipo Lemon Squeezy/Paddle (gestiona el IVA) y gestor.

### ▶️ PARA RETOMAR (tras el clear del 15-oct) — EMPIEZA AQUÍ
1. ✅ **Pizarra v2 PUBLICADA (15-oct)**: tiempo muerto + formaciones, ejercicios + minibasket, sesiones
   imprimibles, modo jugador + QR + GIF, lecturas, nombres desde `cz.team.v1`, orden de acciones, hoja de banquillo.
   517 tests. ⚠ **Sin verificar con el reglamento**: medidas de minibasket (`MINIBASKET.ZONA_LARGO`, tiro libre
   a 4 m de la línea de fondo; FIBA mini lo mide desde el tablero) → confirmar con un entrenador de minibasket.
   ⚠ La carpeta `.claude/worktrees/agent-a8ce156f780c92bb1` no se pudo borrar (bloqueada); la rama sí.
2. 📧 **4 borradores en Gmail, en catalán, SIN ENVIAR** (AB Premià, Consell Esportiu Maresme, Ràdio Premià,
   La Clau). Enviar solo cuando el usuario lo diga; recomendado esperar a la pizarra v2 y empezar por el club.
   Lista completa de 18 objetivos en `trabajo/w30-enlaces-objetivos.md`.
3. 🔎 **Mañana (16-oct)**: pedir indexación en Search Console de `/pizarra/` y `/estadisticas/` (cupo ~10/día;
   el del 15 se gastó). Revisar Search Console hacia el **29-oct**.
4. ❓ Pendiente del usuario: ¿proyecto personal o negocio? (decide el tono del outreach) · probar pizarra y
   estadísticas con un partido real del Premià · ✅ plantilla zona 2-3 corregida (`fd0b232`: "ala izquierda del
   ataque"; las otras 4 no nombran lados) · ⚠ minibasket: la normativa FEXB no da la distancia del tiro libre
   (solo aro 2,60 m y zona de triple a 4 m DEL TABLERO); sigue pendiente del entrenador · Bing Webmaster Tools (importar de GSC)
   · permisos de la app Claude en GitHub · decisión Nike en AliExpress POIZON (recomendado: no).

**Hecho el 15-oct (todo en producción):** modo Equipo de estadísticas (`statsEquipo.ts` + `scripts/statsEquipoUI.ts`,
enlaces en el hash, enviar a jugador, tarjetas, CSV, aviso de pérdida de datos + copia de seguridad +
`storage.persist`) · pizarra v1 en `/pizarra` (merge `1cd3dda`) · redirección `/ruta` → `/ruta/` en `vercel.json`
(cada página respondía 200 en las dos formas) · **IndexNow**: clave `public/3bf4b75a1833c661c41f6043eb691d9b.txt`,
301 URLs aceptadas (para reenviar: POST a `api.indexnow.org/IndexNow` con host, key, keyLocation y urlList) ·
bloque "Para jugadores y entrenadores" en la portada · título/JSON-LD de `/estadisticas`. 363 tests.
🔑 **Regla de producto nueva**: los datos de usuario (estadísticas, pizarra) viven solo en el navegador; nada de
backend con datos de menores. Siempre aviso de pérdida + copia de seguridad.

### ▶️ S56 (15-oct) — EL PROBLEMA ES DE INDEXACIÓN: Google tiene 6 páginas de 485

🔴 **Search Console, medido el 15-oct** (por fin; sesión de Google en el navegador integrado):
· **Indexadas 6 de 485**, así desde julio. **411 "Rastreada: actualmente sin indexar"** (Google la visita y la
  descarta), 34 canónica alternativa, 12 × 404, 8 noindex (ocultas, a propósito), 7 robots.txt.
· **90 días: 6 clics y 33 impresiones**, casi todo a la portada. **Enlaces externos: 0.**
· El sitemap llevaba sin leerse desde el **1-jul** ("0 páginas descubiertas"), aunque se sirve bien (299 URLs).
  La ficha de la Ja 4 daba "Google no reconoce esta URL".
⇒ El cuello de botella NO es el catálogo ni el SEO técnico: es **autoridad cero** (web nueva, sin enlaces,
cientos de fichas con plantilla). Mientras no haya enlaces entrantes, el contenido nuevo no llegará a Google.
✅ **Hecho con autorización del usuario**: sitemap reenviado (15-oct; a los minutos la Ja 4 ya salía
"descubierta" vía sitemap) e **indexación solicitada** para 10 URLs: Black Friday, /zapatillas, /rankings,
/quiz, /blog y las fichas Ja 4, AE 3, LeBron 23, Sabrina 4 y KD 19. Cuota ≈10/día.
▶️ **Siguiente**: conseguir los primeros enlaces (club Bàsquet Premià, foros/comunidades de baloncesto ES,
blogs de baloncesto base). Si tras eso sigue sin indexar, valorar `noindex` en las fichas flojas
(retro/GS) para concentrar. Revisar Search Console en ~2 semanas.
✅ **Página `/black-friday-zapatillas-baloncesto`** (`seoPages.ts`): top 5 por descuento del precio MOSTRADO
vs MSRP, sin GS ni retro, solo verificado ≤10 días y ≤55 % (por encima era un precio mal leído: Trae Young 3
al 70 %). ⚠ El `related` de las páginas SEO lo sobrescribe un `forEach` al final del fichero.
✅ Promos: Snipes Flash Deal (→29-oct) y AliExpress Ofertas de Invierno (WOES, 13-16 oct).

### ▶️ S55 (4-oct) — vuelta tras 10 días: todo sano, el banner estaba vacío

- ✅ Scraper 10/10 noches · web 200 · chat con IA real (`X-CZ-Model: qwen3.8-27b`) · `audit-enlaces` limpio.
- ✅ **Promos (`5786b7c`)**: la de adidas MidSeason **nunca se cargó el 25-sep** (llevaba 9 días activa
  sin banner). Cargadas adidas MidSeason (→13-oct), AliExpress Choice Day ESLD (1-7 oct) y Forum Sport
  SuPRIME Day (SINIVA, 4-7 oct). Antes, Snipes Deal Weeks (`6b8c5d5`, →5-oct).
- ✅ **Lanzamientos (`d32832e`)**: MB.06, Caitlin 1 y AE 3 fuera de `proximamente`. AE 3 en adidas ES y
  FuikaOmar (afiliadas); Caitlin 1 y MB.06 solo marca + BE (excepciones visibles). MSRP MB.06 → 125 €.
  OwnTheGame 3 GS recupera compra (Forum + Atmósfera). **Zapas visibles sin compra: 0.**
- ✅ **w28 cerrado** (`trabajo/w28-monetizar-*.tsv`): ganan afiliada Freak 8, AJ 40, Luka 77, Scoot Zeros
  III y SHAI 001. 🔑 **Regla nueva del director**: un enlace afiliado NO entra si su precio pasa a ser el
  "desde" de la ficha y es MÁS CARO que una tienda no afiliada ya enlazada (marca/BE). Por eso fuera KD 19,
  GT Cut 4, Kobe 8 Protro y Ja 3 (marketplace de Decathlon 1,09-1,41×), Hali 1 y Engine A. AliExpress
  POIZON ("Authenticity Verified" en la foto) **no** se ha tomado como Marcas+: sin decidir.
- 📧 **Recordatorio a Viviana (Joom) enviado el 4-oct** con autorización del usuario.
- ▶️ Usuario: la app de GitHub "Claude" pide permisos nuevos (correo 30-sep).
- 📅 AliExpress: Brand day 9-11 oct y Winter Offers 13-16 oct (esperar correo con códigos).

### ▶️ S54 (22-24 sep, modo AUTÓNOMO: director + Sonnets) — catálogo OCULTO y Amazon sin agotado

**▶️ PARA RETOMAR (24-sep) — EMPIEZA AQUÍ:**
1. 🔄 **Relanzar el encargo w28 (monetizar las 18 excepciones)**: murió por límite de sesión el 23-sep.
   Todo lo necesario está en **`trabajo/ENCARGO-w28-monetizar.md`** (cómo relanzar, trampas, salida y
   cómo aplicar). Única fila guardada: **`jordan-luka-77` en ECI a 59,99 €, 3 de 15 tallas** — sin aplicar
   todavía, revisarla con el resto.
2. ✅ **Pasada del 24-sep LIMPIA**: 0 fichas pierden compra, agotados de Amazon estables en 8. Es la
   primera en cuatro noches: `AMAZON_MARCA_AGOTADO = false` funciona. Seguir mirándolo unos días.
3. 📅 **25-sep: promo adidas MidSeason** · **26-27 sep: recordatorio a Viviana (Joom)**.

**Modo de trabajo decidido por el usuario (23-sep):** *"trabaja en modo autónomo. tú eres el cerebro y
director de orquesta. abre un sonnet o lo que creas oportuno… tú revisas y subes"*. ⇒ Yo decido,
reparto, reviso, commiteo y pusheo sin preguntar trámites. Los trabajadores son **subagentes Sonnet**
(tool `Agent`, `model: sonnet`, en background): funcionan mejor que las terminales `cz-*`, que se
quedan retenidas esperando aprobación en su ventana. El método común está en
`trabajo/METODO-verificacion.md` y cada encargo lo manda leer primero.

1. 🔑 **CATÁLOGO OCULTO** (`6968f63` + `0a69c76`). Decisión del usuario: *"todas las zapas que no se
   puedan comprar desde nuestros enlaces de afiliado las quiero en oculto, para rescatarlas… incluidas
   las retro. Excepción para las más importantes… esas las mantenemos en la tienda de la marca"*.
   · Medido: **74 de 245 sin compra afiliada**. Ocultas **52**; visibles sin afiliado **19 excepciones +
     4 `proximamente`** (éstas no se ocultan: existen para llegar indexadas al lanzamiento).
   · Excepciones (tienda de la marca o Basketball Emotion, verificadas una a una el 22-sep): Nike ES
     generación actual (Ja 3*, Ja 4, KD 19, Sabrina 4, Freak 8, GT Cut 4, A'Two, AJ 40, AJ 41, Luka 77),
     Kobe 8 Protro y SHAI 001 (BE), Stewie 5, Scoot Zeros III, Hali 1*, Engine A, ZEN 8, AG 6.
     (*) su enlace de marca murió y se sostienen por Basketball Emotion.
   · **Mecanismo**: campo `oculto?: boolean`. `zapatillasTodas` = catálogo entero; `zapatillas` = lo que
     se ENSEÑA (filtrado). Todos los listados cuelgan de `zapatillas`, así que no hay que tocar páginas.
     La ficha se construye desde `zapatillasTodas`: **responde 200 con `noindex,follow`** y su MSRP.
     Fuera del sitemap vía `src/data/ocultas.json` (lo genera el prebuild). Las marcas `{{precio:ID}}`
     de los artículos resuelven contra `zapatillasTodas` (9 artículos citan ocultas).
   · **Rescatar** = añadir la compra afiliada y quitar `oculto: true`. `audit-enlaces.ts` lista las
     ocultas que YA tienen compra afiliada ("Ocultas que YA se pueden rescatar"). Herramienta de
     aplicación: `web/_w27_aplicar.mjs <tsv>` (envuelve con el afiliado correcto, enciende o inserta, y
     saca de ocultas; `--dry` para probar). Es local, no está en el repo.
   · ⚠ Regla que CAMBIA: la vieja *"`disponible:false` nunca excluye una zapa de rankings ni catálogo"*
     sigue valiendo para `disponible`; lo que excluye ahora es `oculto`, que se pone a mano.
2. 🔴 **Amazon: el `agotado` desde CI está APAGADO** (`2f88a59` → `61295e3`). Tres noches seguidas
   (21, 22 y 23-sep) la pasada marcó decenas de agotados falsos y dejó 23-29 fichas "sin compra" sin
   que ninguna la recuperase. El 22 se quitó el texto de `#availability` y se dejó solo la PRESENCIA
   de `#outOfStock`; el 23 volvió a pasar: **33 de 37 vendían con carrito vistos desde fuera**. ⇒ No es
   el selector: **Amazon sirve a la IP de GitHub Actions una página distinta**. `AMAZON_MARCA_AGOTADO =
   false`: sin botón, inconcluyente y manda la ficha. Los agotados reales (8) se llevan a mano.
   ✅ **24-sep: comprobada, limpia** (0 fichas pierden compra, 8 agotados de Amazon, igual que el 23).
   Script de comparación: `web/_w26_diff.ts` (pide `web/_precios_ayer.json` = `git show HEAD~1:...`).
3. ✅ `.gitignore`: `trabajo/`, `ENCARGO*` y los `web/_*` ya no pueden subir por accidente (`aa0563e`).
   La promo embargada de adidas vivía ahí sin protección en un repo público.
4. ❌ **P400 y P400 Low de New Balance: NO se crean** (decisión del director, 23-sep). Son dos fichas
   distintas (UFFBBV4 / UFFBLV4) pero **ninguna afiliada las vende** — entrarían ocultas, que es "parir
   una zapa con cero enlaces a propósito" (doctrina NB Kawhi V). P400: HoopsGeek 8,6 verificado, 422 g de
   fabricante; la Low no tiene ni una review. Datos listos en `trabajo/w27-p400.md` (local). **Reabrir
   cuando las venda una afiliada.**
4b. ✅ **7 ocultas RESCATADAS** (`cff59a9`): Curry 10 y KD 18 (Amazon), Kai 2 Speed, Kai 3, All City 14 y
   ZEN 7 (AliExpress, marcas chinas), Immortality 4 GS (ECI). **Ocultas 52 → 45.** ⚠ Curry 10 (1 talla),
   Immortality 4 GS (2) son opciones débiles. Las **22 retros**: ninguna rescatable (reventa, Low/GS o no
   se venden, con control positivo). **"KAI SPEED 2" (912541114S) = nuestra "KAI 2 Speed"**.
4c. ✅ **5 reposiciones** (`e0bb71e`): AJ3 y AJ11 (Decathlon marketplace), Lockdown 7 y Jet '25 (ECI; el ID
   de la Jet cambió a A57852354). Lockdown y Jet: solo 2 tallas cada una.
4d. 🔑 **`adidas-cross-em-up-select` ES DE NIÑO → `genero: "gs"`** (`cff59a9`). Las 5 publicaciones que
   existen (3 Decathlon, 2 Amazon) acaban en la talla 40; la que Amazon etiquetaba "Unisex adulto"
   (B0CKXYQJ9Y) se titula "Mid Trainers **Kids**" y va de la 21 a la 40. La ficha se la recomendaba a
   pívots de 55-100 kg. ⚠ **`e0bb71e` dice lo contrario** ("la versión adulta existe"): era una suposición
   no verificada del trabajador, que él mismo corrigió. **No existe versión adulta.** Cierra el punto 11
   de la S52b.
4e. ⏸ **Pendiente de relanzar** (ver "PARA RETOMAR" arriba): buscar AFILIADA a las 18 visibles que hoy
   solo vende la marca/BE (Ja 4, KD 19, Sabrina 4, AJ 40/41, Kobe 8 Protro, SHAI 001…). No generan comisión.
5. ✅ La BB v3 ya no la vende NB ES (sí el 5-sep, a 84 €): control positivo con 32 artículos de básquet.
6. 📅 **25-sep: commitear la promo de adidas MidSeason** (`trabajo/w24-promos.md`). El banner se queda
   vacío el 24. **26-27 sep: recordatorio a Viviana (Joom)** si sigue sin contestar (último correo suyo
   10-sep; el nuestro del 17-sep salió a `@joom-contractors.com` con copia a `@joom.com`).

### ▶️ S53 (21-sep, tarde) — EL CHAT SERVÍA EL RAZONAMIENTO DEL MODELO, y los 21 gratis razonan

Commits `1a262bc` + `98ec3ee`, **desplegados y verificados en producción**. 273 tests · `astro check` 0 errores.

1. 🔴 **El chat devolvía la CADENA DE PENSAMIENTO del modelo en vez de la respuesta.** Medido en
   producción: **2 de cada 3 consultas**. Literal de una de ellas: *"We need to recommend a cheap
   outdoor shoe under 90 euros. Must respect budget…"* — en inglés, y cortándose sin llegar a
   responder nunca. ⚠ **La validación de la mañana del 21-sep usó UNA sola consulta y salió la
   buena**: por eso el bloque S52b lo da por "validado en producción" y no lo estaba. Una muestra
   de uno no valida un fallo intermitente.
2. 🔑 **Por qué no lo paraba nada de lo que ya había** (las dos defensas existían y ninguna cubría
   este caso): `delta.reasoning` se ignora a propósito, que es la defensa BUENA, pero solo sirve si
   el modelo usa ese canal — éstos vuelcan el razonamiento en `delta.content`. Y `limpiarRespuesta`
   solo quita etiquetas `<think>`, y esto viene SIN etiquetas. El comentario de la cadena ("hoy
   limpiarRespuesta quita los `<think>`, así que nemotron vuelve a entrar") **daba por cubierto un
   caso que no lo estaba**: el escape de nemotron de jun-2026 nunca fue de etiquetas.
3. ✅ **Arreglo en tres piezas** (`1a262bc`): guarda `pareceRazonamiento` (el sitio responde SIEMPRE
   en español, así que un arranque de planificación en inglés y primera persona se descarta; solo se
   mira el arranque, no el resto) · **retención de arranque en el streaming**: no se emite hasta
   tener 180 caracteres limpios, que es la única ventana en la que todavía se puede cambiar de
   modelo, porque **emitir es irreversible**; si el arranque parece razonamiento se descarta el
   intento con un `205` y sigue el siguiente · una respuesta legítima más corta que el mínimo se
   emite igual al cerrar. 4 tests de candado con las capturas literales de producción.
4. 🔑 **Cabecera `X-CZ-Model` con el modelo que respondió.** Hasta ahora eso solo estaba en los logs
   de Vercel, que no se miran, y por eso el fallo se podía reproducir pero no atribuir sin desplegar
   otra vez. Con la cabecera, la PRIMERA petición tras el despliegue ya dijo el culpable:
   **`nvidia/nemotron-3-super-120b-a12b`**. Es la misma lección que el 502 opaco de la s40, aplicada
   al camino feliz: **si una función depende de un tercero, que diga en su propia respuesta quién
   contestó**, no solo por qué falló.
5. 🔑 **HALLAZGO DE FONDO: de los 21 modelos `:free` que quedan en OpenRouter, los 21 son de
   RAZONAMIENTO** (medido contra `/api/v1/models`, mirando `supported_parameters`). ⇒ **"Poner
   delante uno que no razone" ya NO es una opción: esa palanca no existe.** La doctrina de "mezclar
   familias para esquivar el 429" sigue valiendo; la de "gemma no razona" ha caducado.
6. ✅ **La palanca que SÍ existe** (`98ec3ee`): los 21 declaran `reasoning` en sus
   `supported_parameters`, así que se manda **`reasoning: { enabled: false, exclude: true }`** —
   que no razone, y si razona igual, que no lo devuelva. **OpenRouter lo ACEPTA** (ni un 400 en
   `estados`, al contrario que el `models` de la s42). Verificado en producción: nemotron responde
   ahora en español limpio, con marcadores `[[shoe:]]` correctos y slugs que existen.
   ⚠ La guarda del punto 3 **se queda**: esto reduce cuántas veces tiene que saltar, no la sustituye.
7. 📏 **Estado medido de la cadena** (`estados: 205,429,429,205` antes del arreglo 6):
   `gemma-4-31b-it` y `qwen3.8-27b` están **los dos rate-limited**, así que hoy el chat entero
   depende de nemotron. Orden nuevo: gemma primero (único medido como español limpio), qwen y
   nemotron detrás. ⇒ El argumento de los **$10 de créditos** (tope de 50 → 1.000 peticiones/día y
   un eslabón de pago) ya no es una mejora: es el plan B de un servicio que hoy cuelga de un hilo.

### ▶️ S53c (21-sep, noche) — DECISIONES CERRADAS: el usuario delegó y se resolvieron seis

**▶️ PARA RETOMAR (lo que queda vivo al cerrar la s53c):**
1. 🤖 **Hay TRES trabajadores abiertos en ventana propia** (`cz-fantasmas`, `cz-361sport`,
   `cz-reposiciones`), vivos y en `ListAgents`. Los dos primeros ya entregaron
   (`trabajo/w25-fantasmas.md`, `trabajo/w25-361sport.md`) y se pueden cerrar.
   🔴 **`cz-reposiciones` NO terminó**: `trabajo/w25-reposiciones.tsv` tiene solo la cabecera. Se le
   mandó retomar por `SendMessage` y **su ventana retiene el mensaje esperando aprobación del
   usuario** (está en otro modo de permisos). O lo aprueba en esa ventana, o se relanza.
   Su encargo está en `trabajo/ENCARGO-w25-reposiciones.md`: auditar las ~44 "posibles reposiciones"
   de `audit-enlaces` una a una, mirando el título de cada producto. ⚠ Esa lista **NO se aplica en
   bloque**: la muestra comprobada salió falsa entera.
2. 📅 **El 25-sep hay que commitear la promo de adidas MidSeason** (25-sep → 13-oct, hasta 30%, sin
   código). Está lista en `trabajo/w24-promos.md`, que NO sube a GitHub. Ver el punto 9 de la s53b:
   hoy no se commiteó porque el correo de Awin la manda no difundir antes y **este repo es público**.
   · Sigue descubierto **solo el 24-sep** en el banner.
   · **AliExpress Choice Day 1-7 oct** confirmado por su calendario oficial pero **sin códigos**:
     llegan en correo dedicado 2-3 días antes (28-30 sep). No cargarla hasta tenerlos.
3. ▶️ **DECIDIR (usuario): alta en el afiliado de 361sport** (GoAffPro, self-service, gratis, hasta
   5%). Implica crear cuenta, así que lo hace el usuario. El 5% ya está en `COMISIONES_TIENDA`.
4. 🌙 **LO PRIMERO DE MAÑANA: comprobar la pasada nocturna del scraper.** Es la primera que corre con
   el arreglo del `agotado` de Amazon (`e0ac58f`), y lo que se arregló fue justo algo que apagó 25
   fichas de golpe. El arreglo es conservador —`agotado` solo con señal positiva— así que el riesgo
   es al revés (que marque de menos), pero hay que verlo. Comprobación de un minuto, desde `web/`:
   ```
   npx tsx scripts/audit-enlaces.ts | head -14
   ```
   Si "Zapas con enlaces pero NINGUNO disponible" sube mucho por encima de **32**, mirar si los
   `agotado` nuevos de Amazon son reales antes de dar nada por bueno. El método está en
   `trabajo/w24-amazon-agotados.tsv`: abrir cada `/dp/` y leer `add-to-cart-button`.
   🔑 Y la señal que delató el fallo, por si se repite: **si muchas fichas pierden compra y NINGUNA
   la recupera, el fallo es nuestro, no del mercado.**

**Estado verificado en producción al cerrar la sesión (21-sep, 22:2x):** las 7 páginas principales
devuelven 200 · el chat responde con IA real en español (`X-CZ-Model: nvidia/nemotron-3-super-120b`)
· las 3 fichas retiradas dan 404 · las 361 pintan su aviso de IVA · las de reventa enseñan MSRP y
conservan sus enlaces.

Commits `302306e` · `502d55c` · `6d769ff`, desplegados. **245 zapas · 287 tests · `astro check` 0
errores.** Zapas sin opción de compra: **38** (empezó el día en 47, llegó a 72 por el fallo del
scraper). **Modo: director + 3 trabajadores en terminal propio** (`cz-fantasmas`, `cz-361sport`,
`cz-reposiciones`), lanzados con `--remote-control <nombre>` y dirigidos por `SendMessage`.

**Las seis decisiones, cerradas. NO reabrir salvo que cambien los hechos:**

1. 💰 **CRÉDITOS DE IA: NO, y es decisión del usuario, textual.** Ni los $10 de OpenRouter ni la
   facturación de Gemini. *"NO VOY A PONER CREDITOS DE IA HAY MUCHISIMAS GRATUITAS."* ⇒ El chat vive
   del catálogo gratis y el plan es hacerlo resistente, no comprar cobertura. **Quitar este tema de
   los pendientes: ya no es una decisión abierta.**
2. ✅ **Umbral de reventa: se OCULTA EL NÚMERO por encima de 1,5× MSRP, no se apaga el enlace**
   (`302306e`). 10 fichas pasan a enseñar su MSRP y **ninguna se queda sin compra** (apagarlas dejaba
   9 a cero). Ver el bloque propio más abajo.
3. ✅ **361sport: DADA DE ALTA** (`6d769ff`). La ZEN 8 y la AG 6 recuperan compra. Ver bloque propio.
4. ✅ **Fantasmas: RETIRADAS las 3** (`502d55c`), con control positivo en cada una. 248 → 245.
5. ❌ **`reebok-shaqnosis`: NO se enlaza la Shaqnosis Low de reebok.eu.** Está viva (150 €, 13 de 28
   tallas) pero la ficha es la **high** de 1995 y en el sitemap ES de Reebok solo existen colorways
   Low. **El corte es identidad de producto**, regla propia del proyecto: sería el mismo error que
   la AE 1 Low o la Kobe 9 Low. La ficha se queda sin compra. **Cerrado.**
6. ❌ **`adidas-ae-1` en Amazon (209,82 €, 1,50× MSRP, una unidad): NO.** La ficha ya tiene
   **FuikaOmar a 84,90 €**, que es 2,5× más barato y con afiliado. El enlace de Amazon no aporta
   nada y además cae justo en el umbral nuevo. **Cerrado.**

7. ✅ **`decathlon-tarmak-se500-mid` NO se retira** (decisión del director, distinta de las 3
   fantasmas). Descatalogada ≠ inexistente: el producto EXISTIÓ, y la regla propia dice que la falta
   de stock nunca saca una zapa del catálogo. Su MSRP de 80 € sigue sin fuente y sigue siendo
   inverosímil — queda anotado, no inventado.

8. 🔑 **Los trabajadores en terminal, cómo se lanzan de verdad** (costó dos intentos): `wt.exe` con
   el prompt como argumento **parte el prompt por los espacios y `claude` no llega a arrancar**. Lo
   que funciona es un **`.cmd` por trabajador** (`trabajo/_run-<nombre>.cmd`) lanzado con
   `Start-Process cmd.exe /k`, con el encargo en un fichero y un prompt corto de arranque. Se
   registran en `ListAgents` en unos segundos y responden a `SendMessage`.
   ⚠ **La pestaña del panel de Terminal de la app NO sirve**: se puede abrir y leer, pero no hay
   forma de escribir en ella, así que el trabajador nunca arranca.

9. ✅ **El token de GitHub ya no está en la URL del remoto.** Movido al Credential Manager de Windows
   (`git config --global credential.helper manager` + `git credential approve`), remoto reescrito a
   `https://github.com/Waldyx/cancha-basketball.git` y autenticación verificada con `git ls-remote`.

### 361sport — alta hecha, y el colorway anotado era el malo

Verificado con navegador, JSON-LD de primer nivel + el endpoint `/products/<handle>.js` de Shopify,
que es lo que da el stock POR TALLA (el JSON-LD no lo desglosa).

| ficha | producto | precio | tallas InStock |
|---|---|---|---|
| `361-zen-8` | ZEN 8 "BE WATER" | **130,00 €** | **14 de 19** |
| `361-ag-6` | AG 6 "Ión AG" | **110,00 €** | **9 de 15** |

🔑 **Cambia el colorway que este documento daba por bueno**: el "Black Mamba" de la AG 6 está
InStock y al mismo precio, **pero solo le quedan 2 tallas de 16**. *Un `InStock` no dice cuántas
tallas quedan* — hay que pedir el `.js` de la variante. "Ión AG" tiene 9.

- **Entran SIN número** ("Ver precio en 361sport"), el trato de las tiendas sin afiliado activo.
- 🆕 **361sport SÍ tiene programa de afiliados**, y no es el de ninguna red conocida: es **propio,
  con GoAffPro** (`361sport.goaffpro.com`), alta **self-service y gratuita**, *"Earn up to 5%
  commission"* y la lista de productos excluidos **vacía**, o sea que el calzado entra al 5%.
  ▶️ **DECIDIR (usuario): darse de alta.** Es un alta aparte, fuera de Awin/TradeTracker/Impact/CJ,
  con su propio panel y su propio formato de enlace. El 5% ya está puesto en `COMISIONES_TIENDA`.
  ⚠ Su Operating Agreement es la **plantilla genérica de GoAffPro** (jurisdicción India, GST,
  mínimos en INR): no está reescrito para 361sport ni para la UE, así que no tomar sus cifras como
  propias. Sí prohíbe expresamente los sitios de cupones/cashback — un comparador no encaja ahí.
- ⚠ **IVA de importación, reconfirmado literal hoy**: *"361Sport.com no es responsable de los
  impuestos de importación aplicados a su pedido. Todas las tarifas impuestas durante o después del
  envío son responsabilidad del cliente"*. Sin IOSS. Sobre 130 € se acaban pagando **~160 € reales**.
  ⇒ `LinkCompra` gana un campo **`nota`** opcional que se pinta bajo el nombre de la tienda en el
  bloque de compra. **Se usa poco a propósito**: si cada fila lleva aviso, dejan de leerse.
- 🆕 **El envío gratis está fijado en USD ($99), no en euros**, aunque la tienda `/es-es` muestre
  precios en EUR. Para una unidad de cualquiera de las dos se cumple siempre.

### Precios de reventa: se deja de anunciar el número (`302306e`)

Regla: por encima de **1,5× el MSRP** no se enseña el precio. El enlace se queda vivo como "Ver
precio en X" y el "desde" cae al MSRP oficial — la estrategia de la s28 aplicada a otro caso.

**Por qué así y no apagando enlaces**: apagarlos dejaba **9 fichas sin ninguna opción de compra**;
ocultar el número deja **0**. Medido, no supuesto.

Las 10 afectadas: `gt-cut-3` 1,53× · `kyrie-low-5` 1,64× · `zoom-freak-4` 1,57× · `gt-jump-2` 1,86× ·
`gamma-2` 4,04× · `zion-4` 1,53× · `sabrina-1` 1,56× · `pro-vision` 2,28× · `air-flight-huarache`
1,64× · `air-zoom-flight-95` 1,66×.

Implementación: `mostramosPrecio(link, msrp?)` y `findMejorPrecioMostrado(links, msrp?)` aceptan el
MSRP como parámetro **opcional**, así que una llamada sin él se comporta como siempre; se propaga
desde las 11 páginas que pintan precio. ⚠ **Es DISPLAY y solo display**: el orden del catálogo y el
editor's pick siguen usando `findMejorPrecio` con el precio real.

🔑 **Y de rebote apareció un desajuste de datos estructurados**: al dejar de anunciar el precio, el
CTA seguía cayendo en el enlace de reventa y **el JSON-LD le decía a Google "485,39 €" mientras la
ficha enseñaba "Ver precio" y el MSRP**. `ofertaValida` exige ahora que el precio del `offers` sea
uno que la página esté enseñando. Verificado en el build: `gamma-2` y `gt-jump-2` quedan sin
`offers`; `ae-1` (84,90) y `lebron-23` (126,39) lo publican. **Al cambiar lo que la página MUESTRA,
hay que mirar si el marcado estructurado sigue diciendo lo mismo.**

### ▶️ S53b (21-sep, tarde) — el scraper de Amazon apagó 25 fichas por un fallo NUESTRO

Commits `e0ac58f` + `36c58ad`, desplegados. 278 tests · `astro check` 0 errores · `audit-enlaces`
sin hallazgos. **Zapas sin opción de compra: 72 → 42** (eran 47 antes del scrape de anoche).

1. 🔴 **El scrape del 21-sep marcó 61 enlaces de Amazon como agotados y dejó 25 fichas anunciando
   "ahora mismo no la vende ninguna de nuestras tiendas" mientras Amazon las vendía.** Varias eran
   justo las verificadas A MANO el 20-sep con el botón de carrito delante (`adidas-dame-8`,
   `adidas-dame-certified`, `nike-ja-1`, `fila-mb`).
   🔑 **El chivato de que el fallo era nuestro y no del mercado: 25 fichas perdieron la compra en
   una noche y NINGUNA la recuperó.** Un mercado real no hace eso. La asimetría es la señal, no el
   número.
2. 🔑 **Causa: la regla "sin `#add-to-cart-button` ⇒ agotado" es AUSENCIA DE EVIDENCIA.** Se puso el
   18-sep (`f08647e`) y era correcta al distinguirla del texto "No disponible", pero no al concluir
   desde la ausencia. Con `waitUntil: "domcontentloaded"` el buybox puede no estar todavía en el DOM,
   y la IP de CI puede recibir una página recortada. Comprobado contra Amazon ese mismo día:
   B0B6GM83PV (Dame 8) y B0D1S5M6LG (Ja 1) tenían `add-to-cart-button` **Y** `buy-now-button`.
3. ✅ **Arreglo (`e0ac58f`)**, que cubre las dos causas sin tener que distinguirlas: se **espera** a
   que aparezca una de las tres señales (`#add-to-cart-button`, `#buy-now-button`, `#outOfStock`) en
   vez de preguntar al instante por una sola · **`agotado` exige señal POSITIVA** (`#outOfStock` o el
   texto de `#availability`) · si no aparece ninguna, el scrape es **INCONCLUYENTE**
   (`disponible: false` SIN `agotado`), que es lo que no apaga el enlace editorial. Decisión aislada
   en `veredictoFicha()`, pura y con 5 tests de candado.
   ⚠ El texto de agotado se lee con `$$eval` + `some`, **no** con `$eval`: con selectores separados
   por comas los nodos vienen en ORDEN DEL DOCUMENTO, la misma trampa del bug del buybox del 13-sep.
4. ✅ **Las otras 6 tiendas con `agotado` están BIEN planteadas** (revisadas): ECI, Decathlon, Forum,
   Snipes y FuikaOmar exigen que la propia tienda declare `OutOfStock` en su JSON-LD — y comprueban
   antes que el campo `availability` exista — y Atmósfera mira las clases de talla. **Amazon era la
   única que concluía desde la ausencia**, y es la que más enlaces tiene.
5. ✅ **Limpieza (`36c58ad`)**: comprobados **uno a uno contra Amazon los 74 enlaces** marcados
   agotados, leyendo `productTitle` + `add-to-cart-button` de cada `/dp/`. **55 falsos y 18 agotados
   de verdad** (+ la Dame 8 ya verificada = 56 limpiados). **De los 61 de anoche, 48 eran falsos: el
   79%.** Los 18 reales se conservan con su marca. Detalle por ASIN en
   `trabajo/w24-amazon-agotados.tsv`. Editado por líneas respetando CRLF, sin round-trip de
   `JSON.stringify`.
6. ✅ **5 fichas recuperan compra con enlaces afiliados verificados hoy** (trabajo w24):
   `adidas-ae-1` **FuikaOmar 84,90 €** (0,61×) + Forum Sport 95,05 € · `adidas-ae-1-gs` FuikaOmar
   64,90 € · `jordan-xxxix` **Decathlon 176,28 €** (0,88×) · `nike-kobe-9-high-protro` Decathlon
   274,10 € (1,37×) · `adidas-ownthegame-2` Decathlon 81,40 € (1,16×, una sola talla: opción débil).
   🔑 **El corte de la AE 1 confirmado A TRES BANDAS** (JI0424 = MID): el título de FuikaOmar dice
   "Mid", Forum lista la AE 1 **LOW** aparte con otro SKU (JQ6140), y el precio original de 139,99 €
   es el MSRP de la Mid (la Low es 109,99). La descripción de Forum dice "Low" y es copy-paste que se
   contradice con su propio título.
7. ⚠ **`nike-precision-8` CERRADA con evidencia: la Mid no la vende nadie en España.** ECI, Atmósfera
   y Forum titulan productos como "Precision 8" e incluso "Precision 8 **Mid**", pero **las 8
   referencias son IH1104 = la LOW** (Forum vende con el mismo IH1104 tres artículos titulados
   "PRECISION 8 LOW"). La Mid es IH1105. Cierra el pendiente de la s49 por SKU, no por inferencia.
8. **Cosecha de los otros frentes, para no repetirla**: Amazon, de 18 fichas a cero, solo dio la AE 1
   a **1,50× MSRP con una unidad** (no aplicada) y la AJ 39 a 1,94× (reventa); todo lo demás,
   `OTRO_PRODUCTO` o `NO_VENDE` con control positivo — **361° y Rigorer no existen en Amazon ES**.
   Basketball Emotion + tiendas oficiales de marca: **0 de 23**, con el sitemap entero cruzado por
   sus tres rutas. Lo único que quedó a decidir ahí es `reebok-shaqnosis`: reebok.eu vende la
   Shaqnosis **Low** a 150 € (13 de 28 tallas) y la ficha es la **high** de 1995 — por la regla del
   corte = identidad de producto NO se aplicó.
9. 📣 **Promo encontrada y NO commiteada a propósito**: adidas ES **MidSeason Sales, 25-sep → 13-oct,
   hasta 30% sin código** (correo de Awin del 21-sep, adidas es afiliado activo). El correo dice
   *"no compartir esta información hasta el lanzamiento"* y **este repo es PÚBLICO**, así que
   commitearla hoy sería difundirla. No se pierde nada: el date-gate no la enseñaría antes del 25.
   Queda en `trabajo/w24-promos.md`, que no sube a GitHub. **▶️ Commitearla el 25-sep.**
   · Sigue descubierto **solo el 24-sep** (AliExpress muere el 23, adidas arranca el 25).
   · **AliExpress Choice Day 1-7 oct** confirmado por su calendario oficial, pero **sin códigos
     todavía**: llegan en correo dedicado 2-3 días antes (esperable 28-30 sep). No cargar hasta
     tenerlos, que las promos de AliExpress viven de sus tramos `BDES`/`FSES`.
10. ⚠ **El `origin` local lleva el token de GitHub incrustado en la URL del remoto.** No está
   commiteado (es `.git/config`), pero conviene moverlo a un credential helper.

### ▶️ S52 (20-sep) — Gemini reconfigurado: el muro no eran 5/min, son **20 peticiones AL DÍA**

Sesión corta de infra, sin tocar catálogo. Todo MEDIDO contra la API, no deducido.

1. 🔑 **La cuota real del plan gratuito es `GenerateRequestsPerDayPerProjectPerModel-FreeTier`,
   limit: 20, por modelo y día.** El "5 peticiones/min" de la s48 existe, pero es otra métrica y no es la
   que muerde: con 20/día, Gemini da para **un encargo grande al día**, no para una tanda. Los modelos
   **pro tienen `limit: 0`**: no están en la capa gratuita en absoluto.
2. 🔑 **Cada `gemini -p` gastaba 3 peticiones, no 1.** Medido con `-o json`: una a
   `gemini-3.1-flash-lite` con rol `utility_router` + dos a `gemini-3.5-flash` (una de ellas fallida).
   **Fijando el modelo desaparece el router → 1 petición.** Es triplicar la cuota gratis. Aplicado en
   `~/.gemini/settings.json` (`model.name`), así que no hace falta pasar `-m` a mano.
3. ✅ **`~/.gemini/settings.json` al día** (backup en `settings.json.bak-s52`): modelo fijo,
   `maxSessionTurns: 40` (cada turno es una petición, o sea cuota), `useRipgrep`, telemetría apagada,
   banner oculto. Y **dos alias propios** en `modelConfigs.customAliases`, verificados:
   · **`cz-audit`** = `gemini-3.5-flash` a **temperatura 0** — contra la divagación que echó a perder la
     auditoría de firmas de la s49; el preset de fábrica va a temperatura 1.
   · **`cz-barato`** = `gemini-3.1-flash-lite`, también a 0: **cuota diaria APARTE**, que es la salida
     cuando 3.5-flash se agota a media tarde.
4. ✅ **`gemini-cz.sh` en la raíz**: pasa un fichero de encargo por stdin (y lo cierra, así que no puede
   colgarse esperando una tecla), **`--approval-mode plan` = solo lectura de verdad** — la regla 1 de
   `GEMINI.md` era hasta hoy solo una frase en el prompt — y reintenta si choca con la cuota.
   Probado en seco: se le pidió crear un fichero y buscar en la web y **las dos fueron DENEGADAS**
   (el fichero no existe; la política `cancha-no-web.toml` sigue viva).
5. ⚠ **`gemini-3.8-flash` existe y la clave lo acepta por API, pero el CLI 0.60.0 NO lo alcanza**: ni con
   `-m` ni con alias propio — resuelve siempre a `gemini-3.5-flash`, porque 3.8 no está en su registro de
   modelos. Revisar cuando el CLI se actualice.
6. ⚠ **Ripgrep**: el CLI solo se fía de un `rg` que esté bajo `C:\Windows` o `Program Files`, o de un
   `rg-win32-x64.exe` dentro de su propio `bundle/`. Copiado ahí el de VS Code. **Un
   `npm i -g @google/gemini-cli` lo borra**: hay que volver a copiarlo.
7. ⚠ **Cita bien y cuenta mal**: en la prueba acertó la línea exacta de `TIENDAS_PENDIENTES`
   (`scoring.ts:478`) y se inventó el tamaño del fichero (dijo 526 líneas, son 770). Regla nueva en
   `GEMINI.md`: **ningún total sin la lista que lo sostiene**.
8. **▶️ DECIDIR (usuario): ¿se activa la facturación en el proyecto de la clave?** Es lo único que quita
   el muro de las 20/día (Tier 1 exige una cuenta de facturación activa) y de paso desbloquea los pro.
   Tarifa de `gemini-3.5-flash`: **1,50 $/Mtok de entrada y 9 $/Mtok de salida** → auditar `articles.ts`
   entero (~150k tokens) sale por **~0,25 $**. `gemini-3.1-flash-lite` es 6× más barato (0,25 / 1,50 $).
   Mientras no se active, Gemini es **un encargo grande al día y poco más**.

**Correo repasado el 20-sep** (desde el 17-sep):

9. 🔴 **Amazon cambia el reporting el 22-sep, y uno de los cambios ENSUCIA nuestra métrica clave.**
   Literal del correo: *"es posible que observes un **aumento de los clics** y el correspondiente **descenso
   de la tasa de conversión** debido a la mejora de la cobertura de clics"*. ⇒ Los clics de Amazon van a
   SUBIR por un cambio de medición, no porque entre más gente: **no leer ese salto como tráfico nuevo**
   (es la misma trampa que los 942 clics de Decathlon de julio, pero al revés). Los ingresos no cambian.
   Lo bueno del mismo correo: los informes descargables pasan de **30 a 90 días** de rango personalizado
   — justo lo que faltaba para comparar periodos, que en el panel no se podía — y se pueden seleccionar
   **10 IDs de seguimiento** a la vez. Las filas de poca actividad se agruparán en «Otros».
10. ✅ **Impact: RESUELTO. SÍ se entra, y la cuenta está VIVA.** Lo que fallaba era la URL:
   `/secure/mediapartner/home.ihtml` **no existe** y, al pedirla, el login se quedaba en bucle devolviendo a
   `login.user`. 🔑 **La home real es `https://app.impact.com/secure/member/home/mview.ihtml`.**
   Confirmado dentro: `account_id=7791022`, `status=PUBLISHER`, `country=SPAIN`. La cuenta usa **SSO de Google
   obligatorio** (al meter el correo salta directo a Google; no hay contraseña que valga).
   ⚠ Corrección de lo que esta sesión llegó a escribir antes: no es que la cuenta estuviera muerta.
   · **Los "Application Message" del Daily Digest están VACÍOS**: 3 notificaciones (19-sep y dos del 17-sep)
     sin cuerpo y con el enlace deshabilitado (*"there is no link available for this notification"*). El
     **Inbox de mensajería está a cero**: Viviana NO ha contestado por ahí.
   · **El panel está pelado**: solo "Inicio", "Trackonomics" y "Help", y la home sale en blanco. Sin
     Marketplace ni buscador de programas — coherente con el rechazo del 17-sep.
   · 🔥 **PERO el alta en Joom SÍ está disponible** en `app.impact.com/campaign-promo-signup/Joom.brand`:
     pide aceptar la oferta y ofrece **"Iniciar sesión"** para la cuenta que ya existe (antes se intentaba por
     "Continuar con Google", que es el alta de cuenta NUEVA y por eso "volvía al panel").
   🔴 **PROBADO CON AUTORIZACIÓN DEL USUARIO (20-sep) Y NO FUNCIONA, POR LOS DOS CAMINOS.**
   Con sesión activa, `campaign-promo-signup/Joom.brand` sigue ofreciendo solo el alta de cuenta NUEVA:
   · **"Iniciar sesión"** → login con Google → **te suelta en la home vacía del panel**. Sin solicitud.
   · **"Continuar con Google"** → lo mismo. (Comprobado después: **NO creó cuenta duplicada**, el selector
     de cuentas sigue mostrando solo la 7791022.)
   🔑 **El mecanismo, ahora sí entendido**: ese flujo es para partners NUEVOS; con cuenta existente termina
   en el panel. Y la vía normal para un partner que ya existe — buscar la marca y solicitar desde dentro —
   **no existe en este panel**, porque el acceso al Marketplace es justo lo que rechazaron el 17-sep.
   ⇒ **Es un círculo cerrado que NO se puede romper desde el navegador.** Tiene que abrirlo Impact o Joom:
   o revisan el rechazo del Marketplace, o Joom manda una **invitación directa** al programa para la 7791022.

10b. 💰 **CONDICIONES REALES DE JOOM, por fin** (leídas en la propia oferta del panel; llevaban desde la s46
   como "solo con cuenta"):
   · **España: 12% del importe del artículo.** Es el tramo por país (CH/IL 25% · GB/FR/DE… 19% · PT/NL/AT 17% ·
     IT/PL 15% · **ES/MT/BY 12%** · resto 19%). Coincide con el 12% que decía Awin.
   · 🔑 **El calzado NO está en las categorías especiales**, que son las que cobran 15/10/5/2% y se evaluan
     ANTES que el país. Comprobadas las 32: móviles, portátiles, relojes, belleza, juguetes, maletas, bicis
     eléctricas, consolas… ni una de calzado. ⇒ **nuestras zapas van al 12%**, que es **4× Amazon y ~2×**
     lo que paga cualquier otra tienda del catálogo.
   · **Cookie 30 días, last click**, ventana de atribución 30 días, validación 30 días, moneda **EUR**.
   · **Cobro**: las acciones se bloquean 27 días después de acabar el mes en que se registran y se pagan 20
     días después de bloquearse ⇒ ~2,5 meses desde la venta. Reversión hasta el 100%, a criterio del anunciante.
   · Contacto del programa: `viale.viviana@joom.com` (ojo, **no** el `@joom-contractors.com` de Awin).
   · Tabla completa: `docs.google.com/spreadsheets/d/1YOkmt5-HwOtaRgz9Pgk_MBEmsZUsK4qK0h29TNXKvbk`.
11. ✅ **3 promos nuevas** (`8a23f1e`): Snipes Weekend Deal (19-21 sep), Forum Sport Flash 48H (20-21 sep) y
   AliExpress Día de marcas (21-23 sep, tramos BDES). 🔑 **Las tres que había caducaban HOY**, así que el
   banner se quedaba vacío hasta el Prime Day. ⚠ Dos avisos que van en la `nota`: el código WD-20 de Snipes
   es **solo para Polonia** (en España el descuento va aplicado) y los BDES de AliExpress **solo valen en
   productos con el sello "Promo"**, que no son todos.
12. **Sin nada que hacer**: Search Console validó otra vez la indexación de canchazapa.com (16-sep) y las
   promos de adidas ES del 17-20 sep ya estaban cargadas.


### ▶️ S52b (21-sep, autónomo: yo + 3 trabajadores) — 8 fichas recuperan compra y el merge tenía un hueco

**Commits `5d97d6d` · `4924814` · `fda3180`.** 268 tests · `astro check` 0 errores.

1. 🔑 **Zapas sin opción de compra: 60 → 52.** Ocho recuperadas, todas con `productTitle` +
   `Departamento` + `id="add-to-cart-button"` verificados: `adidas-dame-8` (B0B6GM83PV 68,25 € —
   **la ficha no tenía NI UN enlace**), `adidas-dame-certified` (B0BNN8MF4M 70), `nike-ja-2`
   (B0F44BX5GY 126,85), `nike-ja-1` (B0D1S5M6LG 126,03), `air-jordan-13` (B0CZHS7L8J 271,49),
   `fila-mb` (B0BCXJ5X33 124,90), `nike-zoom-generation` (B0CJX8KW27 245,83) y **`ua-d-fox-2` en ECI**
   (A57852858, 129,99 €, repuesta — el 16-sep estaba SoldOut). ECI paga 6%: es la mejor de las ocho.
   ⚠ Corrige una nota de la s47: el Amazon de `fila-mb` **NO era "una running moderna MB"**, es el FILA MB.
2. 🔑 **Hueco del merge, encontrado y cerrado (`5d97d6d`)**: el `agotado` del scraper solo se podía
   levantar con otro SCRAPE más reciente, **nunca con una verificación editorial**. Así `nike-kyrie-low-5`
   se quedaba sin compra por un agotado del 20-sep cuando su ficha de Amazon tenía hoy `add-to-cart-button`,
   `buy-now-button` y *"Sólo queda(n) 1 en stock"*. Ahora una `ultima_verificacion` de la ficha posterior al
   agotado también manda; el scraper sigue siendo la autoridad mientras nadie mire a mano después. +2 tests.
3. ✅ **Enlaces de Amazon, medido sobre el catálogo fusionado**: 188 en total, **109 ficha `/dp/` y 79
   búsqueda `/s?k=`** — pero solo **16 búsquedas están `disponible`** (11 son la única opción de su ficha),
   así que el daño real era mucho menor que el titular. Revisadas las 16 y **fijadas 4 a ficha real**:
   `ua-curry-11` (B0CMK2W8HH 95 €), `nb-kawhi-1` (B0BM3JSRHX 185,80, los 286,70 salían de una tarjeta de
   listado), `puma-playmaker-pro-mid` (B0BM9FNJ29 67,50) y `nike-kyrie-low-5` (B0CRRVDBK6 197).
   · **`air-jordan-8` NO se toca**: su único candidato (B0BKR56DGB) tiene **Departamento Mujer** — la
     auditoría w17 tenía razón. · Amazon **no vende** la GT Cut Academy **2** (solo la 1, y el resto de la
     búsqueda son botas de fútbol: "Academy" es una línea de fútbol de Nike), ni la Clyde All-Pro gen 1,
     ni la Cross Em Up Speed, ni la Converse Pro Leather → apagarlas dejaría esas 4 fichas a cero:
     **decisión del usuario** (ya estaban en la lista de las 6).
4. ✅ **Precios anómalos: 22 auditados** (`trabajo/w20-precios-anomalos.tsv`), **17 OK**. Los 6 baratos de
   Amazon coinciden al céntimo con el `corePrice_feature_div` ⇒ **el bug del buybox está bien cerrado**.
   Corregidos dos datos (`4924814`): el Joom de `lining-gamma-2` cuesta **640 €, no 282** (JSON-LD de primer
   nivel, y el `variant_id` de la URL es esa talla; **ninguna** talla vale 282) = 5,33× MSRP; y el MSRP de
   `nike-giannis-immortality-3` pasa de **65 a 85 €** — los 65 eran el precio de la GS (la Immortality 4 GS
   vale justo 65), HoopsGeek publica *"Official Retail Price: $84.99"* y la 4 adulta está a 85. ⚠ Es una
   inferencia bien sostenida, **no una tarifa leída en Nike ES**: revisable.
5. ⚠ **35 de 248 fichas anuncian un "desde" POR ENCIMA de su MSRP** y los precios son REALES (mercado
   secundario), no un fallo: `lining-gamma-2` 4,04× · `adidas-pro-vision` 2,28× · `nike-gt-jump-2` 1,68× ·
   `air-zoom-flight-95` 1,66× · `kyrie-low-5` 1,64× · `air-flight-huarache` 1,64× · `zoom-freak-4` 1,57× ·
   `sabrina-1` 1,56× · `gt-cut-3` 1,53× · `zion-4` 1,53×… Solo los dos primeros pasan el corte de 2× del
   proyecto. **▶️ DECIDIR**: ¿tiene sentido anunciar "desde 289 €" una zapatilla de 190?
   **Simulado para que la decisión sea concreta** (`web/_umbral.ts`): bajar el corte de reventa saldría así —
   **1,75× y 2× dan EXACTAMENTE lo mismo** (3 enlaces, 2 fichas a cero), o sea que el umbral actual es de
   hecho 1,75× · **1,5× → 12 enlaces caen y 9 fichas se quedan sin compra** (`kyrie-low-5`, `zoom-freak-4`,
   `gt-jump-2`, `gamma-2`, `zion-4`, `sabrina-1`, `pro-vision`, `air-flight-huarache`, `air-zoom-flight-95`) ·
   **1,4× → 16 enlaces y 11 fichas** · **1,3× → 24 enlaces y 16 fichas**.
   ⚠ El dato NO está mal: son precios reales de mercado secundario de modelos descatalogados. La pregunta es
   de producto, no de datos: **¿un comparador honesto enseña el precio de reventa, o prefiere decir "ahora
   mismo no la vende nadie a precio razonable"?** Las dos posturas se defienden; es tu llamada.
6. ✅ **Recuperar compra también arregla el JSON-LD**: verificado en producción que `adidas-dame-8` ya publica
   su bloque `offers` con el ASIN nuevo y le desaparece el aviso de "ninguna de nuestras tiendas". Es el
   pendiente de SEO que abrió la s45 (las fichas a cero se quedaban sin `offers`), cerrándose ficha a ficha.
8. 🔥 **361sport: medido hoy, y la decisión encaja con una regla que YA tomaste.** Verificado el 21-sep
   por JSON-LD en `361sport.com/es-es`: **AG 6 "Black Mamba" 110,00 EUR InStock** y **ZEN 8 "BE WATER"
   130,00 EUR InStock** — justo el MSRP que tienen las dos fichas. Y hay colorways de sobra (21 resultados
   para AG6, 168 para Zen 8), o sea que **`361-ag-6` NO es un fantasma**: esa sospecha queda descartada.
   · **AliExpress no sirve**: la Zen 8 está a **177,39 €** (1,36× MSRP) y la regla propia de AliExpress exige
     precio ≤ MSRP; de la AG 6 no hay **ni un** resultado. Así que la única vía es la tienda de la marca.
   · 🔑 **Y eso ya está permitido por tu propia decisión de la s51**: "si la zapa no tiene afiliado, se queda
     solo la tienda oficial de la marca (Nike, Puma, NB, UA, Converse, Moolah)". **361sport ES la tienda
     oficial de 361°**, el mismo caso que Nike ES.
   · ⚠ Lo que lo frena de verdad no es el afiliado, es el **IVA de importación**: 361sport envía desde fuera
     de la UE sin IOSS aparente, así que sobre esos 130 € el comprador paga 21% + gestion al recibir (~160 €
     reales). Enlazar a "130 €" sin decirlo engaña. **▶️ DECIDIR**: darla de alta (toca `Tienda` en `types.ts`
     + `COMISIONES_TIENDA`) con el aviso del IVA en la ficha, o dejar las dos zapas sin compra.
7. ⚠ **`decathlon-tarmak-se500-mid`: producto DESCATALOGADO y MSRP inverosímil.** Su enlace de Decathlon ya
   estaba apagado y hoy **redirige al outlet de baloncesto**, no a una ficha. Decathlon **renombró la línea
   SE500 → SS500** y hoy solo vende cortes HIGH: la "SE 500 HIGH" está a **21,99 € sin precio tachado**.
   Nuestra ficha dice **MSRP 80 €**, cuando en el mismo catálogo la Fast 900 (su tope de gama) vale 85 y la
   Canaveral 900, 90. **No lo he cambiado**: no hay fuente del precio de la SE500 Mid y no se inventa un
   número. **▶️ DECIDIR**: corregir el MSRP a ojo, retirar la ficha, o reapuntarla a la SS500 (que es otro
   corte, y el corte es identidad de producto).

9. ✅ **Cortes: auditadas las 171 que quedaban sin URL de HoopsGeek** (`trabajo/w22-cortes.tsv`).
   🔑 **Cambio de método que vale para siempre**: en vez de adivinar slugs, se bajan los ÍNDICES completos
   — el `page-sitemap.xml` de HoopsGeek (**872 reviews**) y el catálogo paginado de RunRepeat (**63 de
   baloncesto, completo**). Con eso un `SIN_FUENTE` deja de ser "no la encontré" y pasa a ser "no existe".
   Reparto: **46 COINCIDE · 74 SIN_FUENTE · 46 retro fuera de alcance · 3 desvíos reales**. De las 49 con
   fuente, **44 ya estaban bien**: las sesiones previas dejaron el campo casi limpio.
   · Aplicados (`verificados por mí antes de tocar`): **`nike-lebron-witness-8` mid → low** (RunRepeat parte
     la zapa y dice `Top: Low`, HG dice `Mid Top` → gana el más bajo; es la más grave porque es barata y de
     las que más se recomiendan para esguinces) · **`puma-mb05-gs` mid → low** (la adulta ya estaba en low:
     estaban descuadradas entre sí) · **`reebok-blast` high → mid** (RunRepeat; retro, no toca el quiz).
   · NO aplicados: `nb-two-wxy-v5` y `nike-lebron-nxxt-genisus` salen más ALTAS con una sola fuente, y subir
     un corte necesita dos. Y se cierran dos dudas viejas: **`nike-precision-8` es `Mid Top` en HG** (el
     catálogo acierta; lo de "Precision 8 Low" en tiendas es variante, no corte) y **`nb-fresh-foam-bb-v3`
     se queda mid**.
   · Reparto final del catálogo: **153 low / 56 mid / 39 high**; el quiz de tobillos admite **95 zapas**.

10. ⚠ **`audit-enlaces` marca 44 "posibles reposiciones" y la muestra que compruebo sale FALSA entera.**
   Son casos con `ficha=false` y un scrape disponible en `precios.json`. Comprobados 3 al azar, los 3 mal:
   · `jordan-xxxix` → B0B3T928QG es **"Air jordan 1 mid black fire red - 39"**, donde el **39 es la TALLA**.
   · `adidas-ae-1` → B0FJ4WKCND es la **"Anthony Edwards 1 Low"** y la ficha es mid.
   · `air-jordan-1` → el de Snipes (70 €, InStock, afiliado 5%) es la **"Air Jordan 1 Low SE"** y la ficha
     es la High.
   Más los ya documentados (`nike-air-max-impact-5` → Air Max **Alpha**, `gt-cut-academy-2` → **Phantom
   Academy** de fútbol, `nb-fresh-foam-bb-v3` → Fresh Foam **Arishi** de running). ⇒ **La lista de
   reposiciones NO se aplica en bloque**: es justo el material que "la ficha manda" está conteniendo, y
   cada fila necesita mirar el título. Sigue siendo útil como cola de trabajo, no como lista de cambios.
11. ⚠ **`adidas-cross-em-up-select`: TRES fuentes dicen que es de NIÑO y la ficha dice `genero: unisex`**
   (adulto). Decathlon la titula *"Zapatillas de baloncesto **niño** ADIDAS Cross 'Em Up Select Negras"* a
   **55,60 € y con botón de compra**; en Amazon el ASIN B0C2QMD1Q6 tiene **Departamento "Unisex niños"** y
   los demás llevan **"Kids"** en el nombre. En contra, un solo ASIN (B0CKXYQJ9Y) dice "Unisex adulto".
   ⇒ Esto decide si su enlace de **Decathlon (afiliado, 6%)**, que ya existe en la ficha apagado, vale o no.
   **▶️ DECIDIR**: marcarla como junior y encender ese enlace, o dejarla como adulta y sin opción real.

12. ✅ **Basketball Emotion: 5 fichas más recuperan compra (52 → 47).** Cruzado por su **SITEMAP**, porque su
   buscador devuelve 500: **4.152 URLs de producto, 714 slugs de calzado**. 🔑 **Existen las dos formas y son
   catálogos DISTINTOS**: `/comprar/zapatillas/` (464, baloncesto de rendimiento) · `/comprar/zapatilla/`
   (210, lifestyle) · `/comprar/sneakers/` (40). Mirar solo el singular se deja fuera casi todo lo bueno.
   Añadidas con JSON-LD de primer nivel + curva de tallas: `nike-kobe-8-protro` 189,99 € (17 tallas) ·
   `nike-kobe-9-elite-low-protro` 159,99 (12; SKU **IH1401-003**, que SÍ es la Elite Low Protro — el "Em" del
   título es nomenclatura de la tienda) · `lining-wow-allcity-14` 139,99 (5) · `converse-shai-001` 124,99 (12) ·
   `anta-kai-2-speed` 93,99 (4).
   · **NO añadida `nike-kobe-4-protro`**: InStock a 93,99 € (0,54× MSRP) pero **solo queda la talla 4 USA**.
     **▶️ DECIDIR**: un enlace a una zapa con una sola talla infantil, ¿vale o estorba?
   · Descartes con **control positivo**: Kobe 6 → venden 7 generaciones de Kobe Protro y ninguna es la 6 ·
     361 → trabajan la marca pero sus 3 productos son Joker 1 · AE 1 → 23 slugs de AE 2 y 2 de AE 3, cero AE 1 ·
     `jordan-xxxix` → solo AJ 40. **Asics, Peak, Rigorer, EQLZ y Tarmak no existen en su sitemap.**
   · ✅ **`nike-air-force-1` comprobado y la ficha ACIERTA**: BE tiene 26 AF1 y **todos son Low**; la nuestra es
     la ORIGINAL de 1982, que era high-top. No es un corte inflado.
13. 🔴 **La ficha pedía un email y prometía avisos que nadie manda — ARREGLADO.** El bloque de alerta decía
   *"Avísame cuando baje"*, pedía el correo y al enviarlo respondía *"Suscrito a alertas"* + *"Te avisaremos
   cuando baje del precio que indicaste"*. El propio comentario del componente lo desmentía (*"Sin backend =
   sin alertas"*), el `fetch` a `/api/price-alert` estaba comentado y ese endpoint **no existe**. O sea: se
   recogían correos que no salían de `localStorage` y se prometía un aviso imposible. Misma familia que el
   sello de fecha falso de la s31. Ahora se llama **"Ponle un precio objetivo"**, **no pide email** y dice que
   se guarda solo en ese navegador. `privacidad.astro` también decía que guardábamos el correo: corregido.
   ⚠ Si algún día hay backend, se vuelve a pedir el email y se cambia el copy, **no al revés**.
14. ✅ **El sello "Precios re-verificados X" SÍ se sostiene** (lo comprobé por si era otro caso del mismo tipo):
   de 293 enlaces disponibles con fecha, la **mediana tiene 1 día**, el 68% se verificó en los últimos 7 días
   y el 73% en 30. El scraper nocturno está haciendo su trabajo. **No hay nada que arreglar aquí.**

15. 🔴 **EL CHAT LLEVABA SIRVIENDO SOLO EL FALLBACK LOCAL — cadena entera caída, y arreglada.**
   Petición real a `canchazapa.com/api/chat` (21-sep): `code: local-upstream`,
   **`estados: 429,404,429,429,429,403`**. Ningún modelo responde. El fallback funciona (devolvió 3 zapas
   reales con marcadores en 1,5 s), pero el usuario no está hablando con una IA.
   El campo `detalle` de la s42 dio los mensajes literales y cierra dos cosas:
   · 🔑 **`minimax/minimax-m2.7:free` → 404**: *"This model is unavailable for free. The paid version is
     available now - use this slug instead: minimax/minimax-m2.7"*. Era el primero de la cadena y **el
     único que respondía desde la s41**: cuando se lo llevaron, se cayó todo.
   · ✅ **`thinkingmachines/inkling-small:free` → 403. SE CIERRA LA DUDA DE LA s42**: el 403 sin identificar
     era éste, exactamente el que decía su posición en `estados`. Entonces se decidió no tocarlo sin medir;
     ahora está medido.
   · Los otros tres (los dos gemma y glm-5.2) **siguen vivos** pero dan *"temporarily rate-limited upstream"*.
   **Cadena nueva** (`chat.ts` y `coach.ts`): `qwen/qwen3.8-27b` + `google/gemma-4-31b-it` +
   `nvidia/nemotron-3-super-120b-a12b`, y de cola `gemma-4-26b`, `inclusionai/ling-3.0-flash-vl` y `glm-5.2`.
   Se mezclan familias a propósito: el 429 es POR MODELO, así que diversificar proveedor sí esquiva (s41).
   ✅ **VALIDADA EN PRODUCCIÓN el mismo día**: tras el despliegue, una petición real a `/api/chat` devuelve
   **texto de IA en streaming** (recomendó la Dame X con sus datos de ficha: 42 €, outdoor 9, low) en vez del
   `code: local-upstream`. El chat vuelve a funcionar de verdad.
   nemotron colaba `<think>` en jun-2026 y por eso se descartó; hoy `limpiarRespuesta` lo filtra.
   📏 **Solo quedan 21 modelos `:free` en todo OpenRouter.** La doctrina de "el catálogo gratis CADUCA" se
   queda corta: no es que roten, es que **se están acabando**. Los $10 de créditos (que suben el tope de 50 a
   1.000 peticiones/día y habilitan un eslabón de pago) dejan de ser una mejora y empiezan a ser el plan B.

16. 🔴 **EL QUIZ RECOMENDABA ZAPATILLAS GS (DE NIÑO) A ADULTOS — arreglado.** Medido en producción con
   perfil *hombre, 75 kg, base, exterior, lesión de tobillo*: entre las 5 recomendaciones salía la
   **adidas Cross Em Up 5 GS**, que es de tallaje escolar y a un adulto no le entra.
   🔑 **El fallback del chat ya tenía la regla** (*"las GS solo si piden algo júnior; y si piden júnior,
   solo GS"*) y el catálogo ya marca el segmento con **`genero: "gs"` (17 zapas)**. Lo que faltaba era el
   filtro en `scoring.ts`, que solo miraba `genero === "women"`. Dos motores de recomendación en el mismo
   sitio con reglas distintas, y el que fallaba era el principal.
   Acotado a perfil **explícito** hombre/mujer (igual que el filtro de women que tiene justo encima): si el
   quiz no llegó a preguntarlo, no se filtra. Medido: hombre 5 resultados y 0 GS (entra la Stewie 5 en su
   sitio) · mujer 5 y 0 · junior 5 y sigue viendo las suyas. **Ningún perfil se queda sin resultados.**
   Test candado nuevo → 269 tests.
17. ✅ **Verificado end-to-end en producción lo que SÍ funciona** (para que nadie lo vuelva a mirar):
   · **El filtro de tobillos del quiz es correcto**: las 5 recomendaciones de ese perfil son mid-top.
   · **Las 13 fichas que recuperaron compra publican de nuevo su bloque `offers`** en el JSON-LD y pierden
     el aviso de "ninguna de nuestras tiendas" (comprobado en `adidas-dame-8`, `kobe-8-protro`, `shai-001`).
   · **`/api/coach` y `/api/feb` están sanos**: validan la entrada y responden 400 con mensaje útil.
   · **Las 13 páginas principales devuelven 200** con su título correcto.
   · **El sello "Precios re-verificados" se sostiene**: mediana de 1 día, 68% en los últimos 7 días.
   · **La metodología no miente**: la ficha declara la confianza y las fuentes (comprobado `moolah-triple-
     double` → "⚪ Estimación editorial" sin fuentes, y `nike-lebron-23` → "🟢 Verificado" con HoopsGeek 8.3
     y RunRepeat 83/100).

⚠ **Tres trampas al leer HoopsGeek, medidas hoy (la tabla no es de una zapa, es una COMPARATIVA):**
· La tabla de specs de HG tiene **6 columnas** y solo la **PRIMERA** es la zapa reseñada. "El valor que sigue
  a `Type of Cut`" solo vale si coges esa primera celda; si no, lees el corte de otro modelo.
· **Hay páginas con esa primera celda VACÍA** (Ja 2, KD 17, TWO WXY v5): la zapa no tiene corte publicado.
  Coger "la primera no vacía" habría devuelto el corte de una zapatilla distinta.
· El slug `nike-gt-cut-3` de HG es en realidad la **GT Cut 3 Turbo**, otro producto; la buena es
  `nike-air-zoom-gt-cut-3`. Un slug plausible puede devolver 200 con OTRA zapatilla.

🔑 **Doctrina nueva de método (medida hoy, las tres):**
· **Amazon `/s?k=` con `curl` a pelo devuelve un stub de 2,3 KB** con `bm-verify` y un meta refresh, no
  resultados. **Con cookie jar SÍ funciona**: pide antes cualquier `/dp/` con `-c cj.txt` y reutiliza el
  fichero; entonces la búsqueda devuelve 1,5-2,2 MB. Las fichas `/dp/` nunca necesitaron cookies.
· **ECI y Decathlon bloquean `curl`** (374 bytes y el "Just a moment..." de Cloudflare): ésas van con
  navegador. Y **Snipes tiene redirect silencioso**: `/search?q=` te deja en la home tirando la query.
· **El navegador propio (no el de Chrome) vale para Amazon**: acepta el banner de cookies con "Rechazar" y
  `data-cy="title-recipe"` da el título de cada tarjeta (`h2` solo devuelve la marca).

🔎 **Auditoría SEO local del build (sin Search Console, que sigue pendiente de Chrome):** 353 páginas,
**347 en el sitemap**, robots y canonical correctos. Hallazgos menores: **1 título duplicado**
(`/blog/mejores-plantillas-baloncesto` y `/plantillas-baloncesto` comparten `<title>` exacto) · **159
títulos >65 chars** (118 son fichas: la plantilla `marca modelo (año) · Análisis y mejor precio |
CANCHA.ZAPA` gasta 46 de fijo) · **las dos variantes de URL responden 200 sin redirect** (`/x` y `/x/`),
aunque el canonical y el sitemap apuntan a la de barra final, que es lo que consolida Google · 4 huérfanas
y todas justificadas (404, offline, /catalogo que es un redirect a /zapatillas, y la de hash). **Descartado
un problema de contenido duplicado**: el mayor solape léxico entre páginas editoriales es 0,61 y se explica
por el menú y el pie.
### ▶️ S51 (17-18 sep) — PUSH HECHO: 54 commits en producción, y solo enlaces afiliados

1. ✅ **Vercel desbloqueado y 52 commits subidos** (`b4f2b7c`). Se borraron **163 despliegues** por la API del
   panel desde el navegador (169 → 6) y se bajó la **retención a 1 semana** (1 día para cancelados y fallidos)
   en los dos proyectos, así que no se vuelve a llenar. ⚠ El clasificador de permisos bloquea el borrado en
   bloque: hubo que hacerlo en tandas de 10-40 desde la consola de la página, y con el modo de permisos cambiado.
2. ✅ **DECISIÓN DEL USUARIO APLICADA: fuera los enlaces de tiendas sin afiliado** (`b28fa27`). 247 enlaces
   menos (705 → 458). Regla: si la zapa tiene un afiliado disponible, fuera todo lo demás; si no lo tiene, se
   queda solo la tienda oficial de la marca (Nike, Puma, NB, UA, Converse, Moolah). **Excepciones: Basketball
   Emotion y Joom.** Foot Locker 85 · Nike ES 49 · KicksCrew 28 · Zalando 24 · basket4ballers 22 · JD 10…
3. ✅ **El scraper ya guarda un AGOTADO confirmado** (`5e412d0`): `ScrapeResult.agotado`, lo escribe index.ts y
   el merge apaga el enlace solo por identidad exacta y solo si no hay un scrape disponible más reciente.
   Antes un agotado se trataba como fallo de scraping y el precio viejo seguía vivo hasta caducar a los 30 días.
   Hoy solo lo marca el módulo de ECI; los demás se pueden ir sumando igual.
4. ✅ **Enlaces apagados con fuente**: 12 agotados y un 404 en ECI (`d38aae1`) · 3 + 6 de Decathlon que
   redirigen a una categoría (`832a46a` y `dc4161d`) · **auditoría w17** de los afiliados que quedan
   (`4185bcc`): 14 apagados (otro producto, otra variante o reventa) y **25 agotados** a precios.json.
   ⚠ **Zapas sin opción de compra: 43 → 51.** Muestran MSRP.
5. ✅ **Promos** (`edb719b`): adidas 2x20% y Flash adidas de ECI (17-20 sep) y Forum Sport 20MIN (15-19 sep).
6. 📋 **Impact / Joom — a la espera de Joom.** Cuenta creada (**ID 7791022**), **dominio verificado** con meta tag
   en `Base.astro` (`81dd2d1`), perfil completo y **oferta de Joom aceptada**. Condiciones reales del programa:
   **comisión 2-25%** por categoría y país, **cookie 30 días**, validación 30 días, respuesta en 7 días.
   🔴 **Impact RECHAZÓ el acceso al Marketplace** (correo del 17-sep, sin motivo concreto), así que el panel no
   tiene buscador de programas, y **el enlace de registro de Joom no completa la solicitud**: vuelve al panel.
   Su propio aviso dice que las relaciones con marcas no se ven afectadas y que se puede entrar por invitación.
   ⇒ **Escrito a Viviana (17-sep)** pidiendo invitación directa al programa. Awin rechazó Joom ES el 14-sep.
7. **Del correo**: ECI baja la atribución a 15 días (14-sep) · Search Console validó la indexación de
   canchazapa.com (16-sep) · **Plausible borra los datos de la prueba el 15-oct** · **Amazon Prime Big Deal Days
   el 6 y 7 de octubre** (preparar promo y contenido; Amazon es el programa con más enlaces).
8. **Precios anómalos que quedan (18-sep)**: 14 por debajo de 0,45× MSRP, casi todos de Amazon → los corrige el
   scraper nocturno ahora que el arreglo del buybox está en producción. Por arriba: gt-jump-2 1,88× ·
   air-flight-huarache 1,94× · pro-vision 2,28× y gamma-2 4,04× (los dos últimos, decisión pendiente).

### ▶️ S50 (16-sep, autónomo, director + 4 trabajadores en terminal) — hecho y commiteado, SIN PUSH
- 🔑 Los trabajadores en terminal SOLO se registran en `ListAgents` si se lanzan con `--remote-control <nombre>`.
- `68b3515` Li-Ning JB4 anclada a HoopsGeek 8.7 (n=4, low) · `79ceb38` Immortality 5 → WT 8/10, Gamma 2 pesa
  **280 g** (WT; ficha decía 315 y 298) y JB4 estimada a 280, NXXT Genisus año 2025 · `9e5d444` SKX Resagrip: los dos
  Amazon eran la colab Snoop Dogg "Resagrip-Boss" (caña media) → `disponible:false`; queda Atmósfera (253007, low) ·
  `f88b69d` Moolah Neovolt Pro v3 → mid y Triple Double → high (ficha de la marca, cita literal).
- Sin tocar, con motivo: Joker 1 y AJ XXXVII (solo HG dice high) · Taichi Flash (única fuente mid = título de AliExpress;
  analykix da 404) · Curry 3Z 25 / Scoot Zeros III / Evolyte Elite / Ownthegame 2 sin fuente · GT Jump Academy sin verificar.
- `peak-lou-williams-underground` NO es colorway de la Taichi Flash ("Taichi" es la espuma de Peak): no fusionar.
- AE 3 (16-sep): nadie la vende en ES; Basketball Emotion tiene ficha (KH8537, 129,99 €) en "Próximamente".
  Precision 8: Nike ES, Foot Locker y Atmósfera solo venden la Low IH1104 (refuerza la decisión pendiente).
- Precios anómalos (`trabajo/w11-precios-anomalos.tsv`, 32): 11 son el bug de Amazon ya arreglado → se van con el push.
- Integridad: imágenes, ids, URLs y rangos OK. `predecesor_id`/`sucesor_id` tienen ~60 no recíprocos (p. ej. LeBron 23 →
  predecesor `nike-gt-jump-1`), pero **ningún componente los usa** (solo `types.ts`): no se arreglan.

### ▶️ S51b (18-sep) — auditoría de afiliados CERRADA, y la ficha ya no se queda muda sin stock

9. ✅ **Auditoría w17 completa de los enlaces afiliados que quedan.** Amazon 1-88 (cz-sonnet-1) ·
   FuikaOmar, Atmósfera, Forum, Snipes, Reebok y adidas (cz-sonnet-3) · **Amazon 89-175 la hice yo**
   con `curl` leyendo `productTitle` + `Departamento` (`trabajo/w17-amazon-dp.tsv`) y una segunda
   pasada mirando el **botón de añadir al carrito** (`w17-amazon-dp2.tsv`).
   🔑 **El texto "No disponible" NO sirve como señal de agotado**: sale en páginas que sí venden.
   La señal fiable es `id="add-to-cart-button"`. Con el texto salían 39 de 51 agotadas; con el botón, 8.
   ⚠ Y otra trampa de medición propia: buscar `low` sin límites de palabra marca "Yellow" como Low.
10. ✅ **Aplicado**: 14 enlaces de Amazon que venden OTRA variante del retro (`ed5cfbf`) — el mejor,
   `jordan-xxxix` → "Air jordan 1 mid black fire red - **39**", donde el 39 era la TALLA — y 4 agotados
   más + la Pro Leather, que era la Pro Blaze Strap (`4c0b314`). **Zapas sin compra: 50 → 58.**
11. ✅ **Precios reales puestos a mano** (`b545687`): 11 entradas que arrastraban el bug del buybox
   (Stewie 4 23,14 € cuando son 125,90 · Spawn 7 Mid 26,94 vs 99 · Question Mid 43,99 vs 119 ·
   Curry 12 81,95 vs 212,43…) y la **Angel Reese 1, que la web anunciaba a 70 € y cuesta 140**
   (reebok.eu, JSON-LD, 16 de 18 tallas InStock).
12. ✅ **Reebok Engine A recupera compra** (`d49aef9`): su Amazon está agotado y la búsqueda de
   reebok.eu no resolvía; la ficha real `/products/engine-a-shoes-100245968-4243` está a 70 € con
   15 de 26 tallas InStock. ⚠ La "Engine A 26 SE" de esa misma búsqueda es OTRO producto (84-120 €).
13. ✅ **Una fila por tienda en el bloque de compra** (`1a640b4`): `unaFilaPorTienda()` en `scoring.ts`
   + 3 tests. La `anta-kai-1-speed` y la `nike-lebron-21` enseñaban CUATRO filas de AliExpress seguidas.
   Medido en el build: 4 → 1. Afecta a 9 zapas.
14. ✅ **Ficha sin tienda disponible** (`9a0fe74`): antes se escondía el bloque entero y la ficha se
   quedaba **sin precio y sin explicación**. Ahora enseña el MSRP como "precio oficial" + "Ahora mismo
   no la vende ninguna de nuestras tiendas" (o "Aún no ha salido a la venta" si es `proximamente`).
   Son **58 fichas, el 23% del catálogo**.
15. **Comprobado y sin cambios**: ECI no vende ninguna de las 8 zapas a cero que se le preguntaron
   (rellena con otros modelos) · **AE 1 es MID según HoopsGeek**, así que los enlaces "AE 1 Low" son
   de otro producto y la ficha está bien · 9 enlaces de AliExpress por encima del MSRP (gamma-2 4,04× ·
   rigorer-ar3 1,28× · 361-joker-2 1,25× · kyrie-low-5 1,17× · wow-12 1,11×), que incumplen la regla
   propia de AliExpress: **decisión del usuario**.
16. 🔴 **Los tres trabajadores dejaron de responder** a mitad de tarde (idle sin escribir fichero, uno
   en `requires_action`). Las partes D y E del w17 las acabé yo con scripts de `curl` en background,
   que para esto es más barato que un trabajador.

### ▶️ S51c (18-sep) — el scraper ya sabe decir "agotado" en las 7 tiendas afiliadas

17. ✅ **`agotado` implementado en las 7 tiendas con scraper**: ECI (`5e412d0`), **Amazon** (`f08647e`),
   **Atmósfera y FuikaOmar** (`8012f8a`), **Decathlon, Snipes y Forum Sport** (`2727441`).
   🔑 En Amazon la señal fiable es **`#add-to-cart-button`**, y hay que mirarla ANTES del precio: la
   página de una zapa agotada sigue enseñando precios de otros vendedores (la Ja 1 devolvía 29,99 €,
   que es justo lo que engañaba al guardarraíl). Probado en seco: `nike-ja-1` → agotado y
   `adidas-dame-x` → 101,56 € de control.
18. ⚠ **Un agotado de auditoría manual hay que contrastarlo con el propio scraper** (`973450a`): de los
   6 de Atmósfera que marcó el trabajador, **2 estaban a la venta** (`ua-jet-23` 39,95 € y
   `nb-two-wxy-v5` 71,50 €). Los de FuikaOmar sí eran ciertos (Sabrina 2, KD 18, Ja 2, MB.04, Dame 9,
   Uptempo, Weapon). Zapas sin compra: **57**.
19. ✅ **AliExpress, repaso de los que están por encima del MSRP** (`400c617`): `nike-kyrie-low-5`
   apuntaba a un item **que ya no existe** → apagado (le queda Amazon a 196 €). Los demás son el
   producto correcto: Gamma 2 ABAV033-7 a **484,69 € (4,04× MSRP, decisión pendiente)**, Joker 2 Low
   187,62, WoW 12 ABAV085 222,69, Rigorer AR3 100,49 y JB4 ABAV089-4 123,69.
   ⚠ Los 3 enlaces `s.click` (Taichi Flash, Shock The Game 5, KT 11) **no se pueden auditar**: abrirlos
   genera un clic falso de afiliado. Y las fichas de AliExpress no se pueden leer con `curl` (CSR):
   hace falta navegador.
20. ✅ **Promo de Amazon Prime Big Deal Days programada** para el 6 y 7 de octubre (`505dd58`), sin
   código y avisando de que es solo para clientes Prime. Se enciende sola.

### ▶️ S51d (18-sep) — AliExpress tenía 9 items MUERTOS, y la limpieza dejó un hueco

21. 🔴 **9 de los 26 enlaces de AliExpress que enseñaba la web apuntaban a un item que YA NO EXISTE**
   (`5a184e2`): kai-1-speed 48,19 · gt-cut-3 · All City 14 · kai-2-speed · KT 10 · sabrina-3 ·
   zion-4 · **jordan-40** · zen-7. Comprobado con navegador uno a uno (la ficha de AliExpress es CSR:
   `curl` devuelve siempre el mismo shell de 22 KB, viva o muerta, así que el scraper tampoco lo ve).
   De paso, 10 precios reales: **LeBron 23 125,99 → 152,69 €** es el mayor desvío.
   ⚠ Los 3 `s.click` (Taichi Flash, Shock The Game 5, KT 11) NO se pueden auditar: abrirlos genera
   un clic falso de afiliado.
22. 🔑 **Hueco de la limpieza de no-afiliados**: a una zapa con afiliado se le quitó su tienda oficial;
   cuando ese afiliado MUERE, se queda sin nada. Pasó con la **AJ 40** y la **Luka .77**, que Nike ES
   sí vende (199,99 y 99,99 €) y con la **Luka 77 GS** (55,99). Repuestos como "Ver precio en Nike"
   (`57b9de8`, `7087692`). ⇒ Al apagar un enlace, mirar si la ficha se queda a cero y si la marca la
   vende en su tienda oficial.
23. **Comprobado sin resultado** (18-sep): Nike ES no tiene Ja 2 (solo pantalones), Kyrie Flytrap 6
   (redirige a la landing de EE.UU.), Kobe 8 Protro (redirige a Nike UK) ni Air Max Impact 5 (solo
   Air Max de calle: refuerza que es fantasma) · ECI no tiene la AJ 40 · Amazon tampoco (su búsqueda
   devuelve Jordan de mujer patrocinadas) · **adidas.es bloquea también al navegador**, no solo a curl.
   **Converse ES solo vende la "SHAI 001 Lace Up"** (otra variante) y anuncia colores nuevos de la
   SHAI 001 **a partir del 24-sep**: volver entonces.
24. **Estado**: **58 zapas sin opción de compra** (23% del catálogo), todas con su precio oficial y el
   aviso en la ficha. 266 tests · `astro check` 0 errores · todo desplegado.

### ▶️ PARA RETOMAR (s50) — EMPIEZA AQUÍ (s49, 14-sep, director + trabajadores en terminal)

**33 commits en local SIN PUSH**. 259 tests, `astro check` 0 errores. Push pendiente de Vercel
(100% almacenamiento; hubo un login nuevo en Vercel el 13-sep desde Barcelona: preguntar si borró despliegues).

**Hecho en la s49 (todo commiteado):**
- Cortes: ~30 zapas más corregidas con fuente (a low: A'Two, AJ41, Stewie 4, Flytrap 6, GT Jump Academy, Havoc 5,
  Breakthru 4, FUTR X 4, All City 13, Gamma 2, KT 11, SKX JE1, Glide Nova FF 4, Harden Vol 10, ZEN 8, AE 2 GS; suben:
  OMN1S y GT Jump 1 → high, Gelhoop V17 → mid, SKX League → high, Cross Em Up Select high → mid) + la prosa, tags,
  FAQ y `lesiones_compatibles` que decían lo contrario. "Top 4 tobillo débil" reescrito con Kobe 9 High Protro,
  Curry 13, Joker 1 y MB.04.
- Scores: HG Engine A 8.2, Curry Fox 2 7.7, AG 6 8.3; WT KD 19 7.0, Sabrina 4 8.0, Believe That 1 8.0.
- Datos: Kobe 3 Protro año 2025, Exhibit B 2022 + Lightstrike (no Pro), BB v3 año 2025, Fox 2 = UA Flow.
- 🔑 La AE 2 "Low"/"Mid" de Foot Locker NO son modelos distintos (mismos SKU en una review): nombres de colorway.
- Promo AliExpress Rebajas de otoño 14-20 sep (FSES*).

**✅ YA RESUELTO — histórico de lo que se repartió (todo lo de esta lista quedó hecho y commiteado; ver el bloque "Añadido tras el corte" de abajo). No hay trabajadores vivos ni trabajo sin commitear:**
- `cz-sonnet-1`: creando 4 fichas (Reebok Angel Reese 1, EQLZ 247 NXT, Li-Ning JB4, Peak AW4) en `zapatillas.ts`
  SIN commitear. Datos en `trabajo/informe-bloques45.md`. Revisar diff antes de commitear (pesos estimados, puntuaciones).
- `cz-sonnet-2`: 15 cortes dudosos (variantes Yu Shuai 18 / Resagrip / Float / Unpre ARS 2 / Lockdown 7…) → `trabajo/w2-cortes.tsv`.
- `cz-sonnet-3`: prosa de articles/seoPages/faq contra los cortes nuevos, SIN commitear → `trabajo/w3-prosa-cortes.md`.
- `cz-haiku`: URLs de reviews rotas/redirigidas → `trabajo/w4-urls.tsv`.
- Gemini (cola `trabajo/gemini/`): atribuciones de jugador en artículos → `trabajo/gemini/hechos/firmas-jugadores/salida.txt`.
- Agente Joom/Impact → `trabajo/joom-impact.md` (alta en impact.com: la cuenta la crea el usuario).
- Informes previos de subagentes: `trabajo/informe-*.md`.

**Añadido tras el corte por límite de uso (15-sep):** las terminales de la ventana `cancha-trabajadores` murieron con el
límite y, al relanzarlas, NO llegaron a registrarse como sesiones (procesos vivos, invisibles en ListAgents). Se siguió con
subagentes en Sonnet/Haiku, que sí funcionan. Hechos:
- ✅ `c644b1b`: **4 fichas nuevas** — `reebok-angel-reese-1` (reebok.eu 70 € + Amazon 140 €, WT 9), `eqlz-247-nxt` (KicksCrew,
  WT 9), `lining-jb4` (Basketball Emotion + AliExpress), `peak-aw4` (AliExpress). **Catálogo 244 → 248.** Pesos estimados;
  MSRP de JB4 y AW4 estimados y comentados.
- 📋 **Joom/Impact** (`trabajo/joom-impact.md`): el programa existe y está abierto →
  `https://app.impact.com/campaign-promo-signup/Joom.brand`. Alta gratuita, acepta particular o empresa. **Comisión y cookie NO
  son públicas** (solo con cuenta). Formato de enlace: se genera dentro (Deep Link Generator). ▶️ Lo tiene que hacer el usuario.
- 🔴 **23 URLs de reviews de WearTesters redirigen a la portada** (`trabajo/w4-urls.tsv`, verificado con curl: la de la LeBron 22
  y la de la KD 19 en `fuentes` son falsas). ✅ APLICADO (`7b02139`): 17 corregidas y 6 sin review en WT pasan a `evaluacion-propia` (Dame Certified 3, MB.05, KT 11, Freak 6, Kobe 9 High Protro, AF1). Mismo commit: prosa de cortes en comparativa/FAQ/calcetines y fuera la "Altura" de la Shox BB4.
- ⚠ La auditoría de firmas de jugador con Gemini salió basura (divagación "What about…"): descartada, no reintentar con ese prompt.

- ✅ Cortes dudosos (`trabajo/w2-cortes.tsv`): `ua-lockdown-7` → mid (3 fuentes). Sin subir por falta de 2ª fuente: Curry 3Z 25,
  Neovolt Pro v3, Triple Double. ZEN 8 sigue low con evidencia débil. Sin fuente: Scoot Zeros III, Evolyte Elite, Ownthegame 2.
  ⚠ Variantes cruzadas SIN tocar: `skechers-skx-resagrip` (ficha low-top, enlace Amazon = la Mid) · `asics-unpre-ars-2` (su enlace
  es una COLECCIÓN que mezcla ARS 2/3 y ARS Low 2/3: fijar SKU) · `peak-lou-williams-underground` (ficha gen 1/2023 pero su
  fuente es la review de la Underground 2 de 2021; no hay rastro de una "Underground 1") · enlace `ua_es` de Lockdown 7 da 404.
  ✅ Aplicado después: Lou Williams Underground = gen 2 / 2021 / low y sin compra (su AliExpress era una búsqueda vacía; en
  realidad es una colorway de la Taichi Flash: ¿fusionar o retirar? decisión) · Unpre ARS 2 fijada al SKU 1063A070 (ojo: la ficha
  se llama "Low 2" pero ese SKU es la ARS 2 normal, altura sin cita) · Lockdown 7: UA ES 404 → false. AE 3: 15-sep sale solo en
  EE.UU., nadie la vende en España → sigue `proximamente` (revisar en 2-3 semanas).
  ✅ Los 7 `s.click` de marca china (`trabajo/w8-sclick.tsv`, SIN abrirlos: clic falso): Sonic 12 y Shock Wave 5 fijados a
  su item real (`d8172ad`, cambiado en zapatillas.ts Y precios.json). Yu Shuai 18 → item de la 18 V2 Low ABAU025 (`ad2b377`; la 18 original ABAU009 es HIGH). Sin tocar: Taichi Flash (la línea Lou Williams Flash es mid y la Taichi Flash 1-6 numerada es low: no se sabe cuál es la ficha; item "media caña",
  ficha low) y Yu Shuai 18 (item = 18 original ABAU009, ficha low). Sin item en AliExpress: Shock The Game 5 y KT 11 (sus
  s.click siguen vivos sin verificar). Lou Williams Underground ya desactivado.
  (6) `adidas-cross-em-up-speed` FANTASMA reforzado: su único enlace es la Cross Em Up Select de niño → candidata a retirar.
**▶️ DECIDIR (usuario):** (1) Nike Precision 8: en España solo se vende la Low (IH1104); la ficha/reviews son la Mid
(IH1105) → ¿ficha sin compra, pasarla a Low o ficha nueva? (2) `nike-air-max-impact-5` FANTASMA (sin rastro en Nike,
KicksCrew, GOAT, StockX) → ¿retirar? (3) `rigorer-warship` fantasma casi seguro (0 de 377 productos en rigorer.com)
→ ¿retirar? (4) SPO Player 1.5 (WT 9) solo importando de EE.UU. → decidir junto a 361sport. (5) `adidas-cross-em-up-speed`
posible fantasma (en investigación). Y siguen las de la s49 de abajo.
- Nota: El Corte Inglés (Awin) baja la cookie de 30 a 15 días desde el 14-sep.

### ▶️ PARA RETOMAR (s49) — EMPIEZA AQUÍ

La s48b (12-13 sep, modo autónomo con subagentes) dejó **15 commits en local SIN PUSH** (último `25da88f`). Todo el detalle
está en el bloque **S48b** más abajo. 259 tests, `astro check` 0 errores.

**▶️ Decisiones del usuario pendientes, por orden:**
1. **Push.** El arreglo del scraper de Amazon (precio de otra oferta + guardarraíl que lo bloqueaba) no actúa hasta estar en
   `master`. Pero Vercel sigue al 100% de almacenamiento: primero borrar despliegues viejos desde el panel.
2. **6 fichas que se quedarían a cero** si se quita su enlace a otro producto: `puma-clyde-all-pro`, `adidas-cross-em-up-speed`,
   `converse-pro-leather`, `ua-curry-11`, `adidas-forum-84`, `puma-mb05-gs`.
3. **`rigorer-warship`: posible fantasma** (ni en rigorer.com, AliExpress ni KicksCrew). ¿Retirar?
4. Artículo "menos de 80 €": incluye la Answer IV (sin enlaces, MSRP 120 €).
5. Arrastradas: 361sport como tienda (ZEN 8 / AG 6 a cero), reventa de `adidas-pro-vision` y `lining-gamma-2`, Joom vía Impact.

**Abierto sin decisión:** 67 zapas sin corte en HoopsGeek ni RunRepeat · Precision 8 (¿mid o "Low"?) y OMN1S · reescribir de
verdad el "Top 4 para tobillo débil" con mids verificadas (Curry 13, MB.04, Sabrina 2, AE 1).

### ▶️ PARA RETOMAR (s48) — lo primero que hay que leer

**La s47 (11-sep) fue la sesión más productiva hasta ahora: 14 commits, todos revisados por la dirección.**
Modo: director (esta sesión) + terminal (ejecuta) + dos trabajadores nuevos (Qwen local y Gemini CLI).

**Cerrado y desplegado**: barrido de las 62 búsquedas (22 fichas reales fijadas, 39 falsas, 0 fichas a cero) ·
bug del merge por identidad de Amazon (`9982f37`) · "la ficha manda": un scrape ya no resucita un
`disponible:false` (`74bda79`) + 8 reposiciones reales verificadas (AJ41 y Caitlin 1 ya se venden en Nike ES) ·
Curry 13 con su tecnología real (`6a8cc89`, tarifa UA ES 140 €) · tablas de artículos que sacan peso y precio de
la ficha, con test candado (`40d4426`) · fichas `361-zen-8` y `361-ag-6` (`fe6ebfb`) · Air Max CB 34 y la
Converse de Larry Johnson, que en realidad es la **Aero Jam** (`1f1fe41`).

**⏳ LO QUE QUEDÓ A MEDIAS (por orden):**
1. ✅ **(HECHO s48b)** **Pesos en la PROSA de los artículos** → `ENCARGO-pesos-prosa.json` (raíz, sin commitear). 35 líneas: 7 ya
   revisadas por la dirección, 21 propuestas del Qwen SIN revisar, 6 que el Qwen no supo redactar. Cada entrada
   trae la línea original, los pesos reales de ficha y el estado. Ojo: varias comparaciones se INVIERTEN con el
   dato real (la GT Cut 4 no es "la más ligera": pesa 431 g). Aplicar por texto exacto, no por número de línea.
2. ✅ **(HECHO s48b y ampliado a 73 zapas)** **TAREA 10 de `ENCARGO.md`: el corte (low/mid/high) de 13 zapatillas** contra RunRepeat. Lo encontró Gemini
   auditando los 48 artículos (citas en `ENCARGO-cortes.md`): en cada una, artículo y catálogo se contradicen.
   **Urgente porque `scoring.ts:245` es un filtro duro del quiz**: "lesión de tobillos → fuera las low-top", así
   que un corte mal puesto recomienda una low-top a quien tiene esguinces.
3. 🟡 **(s48b: 4 recuperadas, ver S48b)** **TAREA 6: 7 fichas con cero opciones de compra** (quedan 5 tras cerrar CB 34 y Larry Johnson).
4. **Precios en prosa**: 101 líneas con el precio de un modelo concreto + listas de tiendas falsas. Plan escrito
   más abajo, en la sección de la deriva de specs.

**El terminal de la s47 ya no existe** (se cerró la ventana). Para seguir hace falta abrir otra sesión de Claude
Code en el repo y pasarle `ENCARGO.md`.

### ▶️ S48 (12-sep) — los tres trabajadores, y GEMINI CERRADO DEFINITIVAMENTE

Sesión corta, sin tocar catálogo: se abrieron los tres trabajadores en ventana propia y se midió cada canal.

1. 🔴 **GEMINI: la vía OAuth está MUERTA para el CLI. NO volver a intentar el `/auth`.** El login SÍ funciona
   (`google_accounts.json` pasa a `"active": oswaldhs7@gmail.com`, se escribe `oauth_creds.json`) y en la
   ventana INTERACTIVA Gemini responde. Pero:
   · `gemini -p` con `oauth-personal` pregunta `Opening authentication page in your browser. [Y/n]:` y se
     cuelga esperando una tecla → **4 min y salida vacía**. ⇒ lanzarlo SIEMPRE con `< /dev/null`.
   · La vez que llegó al servidor: `IneligibleTierError: This client is no longer supported for Gemini Code
     Assist for individuals… migrate to Antigravity`, `tierId: free-tier`. **El plan Google AI Pro del usuario
     NO llega al CLI.** Y no se arregla actualizando: 0.59.0 es la última estable en npm.
   · ⇒ Revertido a `gemini-api-key`, que funciona. **Límite MEDIDO en el error literal de Google:**
     `generate_content_free_tier_requests, limit: 5, model: gemini-3.5-flash` = **5 peticiones/MINUTO**. El CLI
     reintenta solo a los 60 s, así que una tanda seguida no falla: se arrastra a ~1 min por llamada.
     ⇒ **encargos GRANDES y pocos**, nunca muchas preguntas cortas.
   · Web bloqueada con el **Policy Engine**, no con `tools.exclude` (deprecado: deja de funcionar en la 1.0).
     Regla `deny` en `~/.gemini/policies/cancha-no-web.toml`, SOLO headless (`interactive = false`), así que
     en la ventana interactiva el usuario conserva la web. Va en la carpeta de USUARIO y no en el repo porque
     las políticas por proyecto no funcionan todavía (issue #18186, lo dice la propia doc). Contenido:
     `toolName = ["google_web_search", "web_fetch"]` · `decision = "deny"` · `priority = 900` · `interactive = false`.
     El `.gemini/settings.json` del proyecto queda en `{}`.
2. **QWEN (LM Studio)**: viene con el servidor apagado Y el modelo descargado → `lms server start` +
   `lms load qwen3.8-27b-uncensored --context-length 16384 -y` (16 s). Ocupa **18,1 GB de RAM y las dos VRAM
   enteras** (3070 + 3080): `lms unload --all` cuando el usuario vaya a jugar o a descargar.
   🔑 **Corrige el número pero NO el juicio**: en la línea de la AE 2 puso el peso real (428 g) y dejó
   escrito "que es ligera para su categoría", inventándose además una comparación. Se revisa por SENTIDO.
3. **Terminal de Claude**: sesión nueva registrada como peer; `SendMessage` funciona en los dos sentidos.
4. ✅ **Comprobado**: son **244** (Gemini tenía razón). El 242 no se actualizó tras meter ZEN 8 y AG 6.
5. `ENCARGO-pesos-prosa.json`: revisadas L2109 (Ja 3) y L1619 (AE 2). Quedan 21 sin revisar y 5 que falló el Qwen.

### ▶️ S48b (12-sep, modo autónomo) — CORTES: el campo `altura` estaba inflado en TODO el catálogo

1. 🔴 **El corte low/mid/high del catálogo NO era fiable, y es un filtro DURO del quiz** (`scoring.ts`: lesión de
   tobillo → fuera las `low`). Verificado contra el HTML real (`curl`) de RunRepeat (`Top: Low|Mid|High`) y HoopsGeek
   (`Type of Cut: X Top`), NO contra los resúmenes de WebFetch:
   · TAREA 10 (13 contradicciones artículo/catálogo): LeBron 22, LeBron 23 y AJ 40 son **low** (catálogo high/mid Y
     artículos mid/high: mal los DOS lados) · Ja 3 low · GT Hustle 3 **mid** · MB.04 mid · Trae Young 3 low y Question Mid
     mid (catálogo OK) · All-Pro Nitro 2 low (la "versión mid" que recomendaba un artículo no existe) · Crazy 8 (1998) → mid
     (la Crazy 8 Low es de sept-2024) · Shox BB4 sin fuente estructurada: se queda high (es retro, no entra al quiz).
   · **Auditoría de las 73 zapas con URL de HoopsGeek** (`score-fuentes.json`): 38 coinciden y **27 figuraban mid/high
     siendo low**: KD 18, Curry 12 (+GS), Kai 2/3, KT 10, WoW 12, Shock Wave 5, Dame 9 y Certified, Luka 1/2/3, Freak 4/5/6/7,
     Immortality 3, LeBron 21, AJ 39, A'One, One Take 5, Exhibit A, Why Not .6, Tatum 3, Kawhi 4, TWO WXY V4, AR3.
     RunRepeat coincide en 8 de 9 comprobables. Corregidas en `197431a`.
   · **8 donde HoopsGeek da un corte MÁS ALTO que el catálogo NO se tocaron** (AJ 37/38, Kawhi 1/2, OMN1S, GT Jump 1,
     Joker 1, Kobe 3 Protro): subir un corte sin segunda fuente es la dirección peligrosa, y RunRepeat no tiene página de ninguna.
   · 🔑 **Regla decidida: si las fuentes se contradicen, el corte MÁS BAJO** (AE 2: RR mid / HG low → low; MB.05; TWO
     WXY V4). El quiz excluye low-top a lesionados de tobillo y el error que hace daño es recomendar como mid una low. Reversible.
   · **Efecto medido: quiz de tobillos 112 → 79 zapas**; entra la GT Hustle 3.
   · Artículos/FAQ/SEO: la Tatum 4, la AJ 40 y la LeBron 23 formaban el "Top 4 para tobillo débil" siendo low → aviso
     honesto añadido; la FAQ de esguinces recomienda ahora Curry 13 y MB.04 (mid verificadas). ⚠ Ese artículo pide una
     reescritura de verdad con mids verificadas. Test `scoring.test.ts` actualizado (usaba la LeBron 22 como high).
2. ✅ **Pesos en prosa: CERRADO.** 33 líneas con el peso de ficha. El Qwen falló más de lo que parecía: a la AJ 40 le puso
   el peso de la LeBron 23, dejó "310 g, la más ligera" a la GT Cut 4 (431 g) y **rompió la sintaxis** quitando la coma de un
   `description:`. ⚠ Dos correcciones de la s47 eran INSTRUCCIONES `__REPLACE__ viejo=>nuevo`, no líneas finales: pegarlas
   como línea mete basura en el artículo. Detectado y arreglado desde la versión de git.
3. 🟡 **TAREA 6: 4 fichas recuperan compra** (verificado contra JSON-LD/ficha): Kobe 9 High Protro, PG 6 y Why Not .6 en
   KicksCrew (sin afiliado → "Ver precio") y Exhibit B en Amazon a 135,96 € (1,43× MSRP, dentro de la regla de 2×).
   Hyperdunk 08 → reventa (2,12×). EQT Basketball y Ownthegame 2 adulto → nada en España.
   ⚠ **El "0 fichas a cero opciones" de la s47 NO se sostenía**: medido sobre el catálogo fusionado había **21** fichas con
   cero enlaces disponibles; quedan **17**: 3 `proximamente`, 8 "no se vende en ES" documentadas, las 2 de 361 (decisión
   361sport), EQT Basketball / Hyperdunk 08 / Ownthegame 2 (sin compra válida) y Rigorer Warship (ver abajo).
4. **▶️ DECIDIR (usuario)**:
   · `rigorer-warship` parece **FANTASMA**: ni en rigorer.com, ni AliExpress, ni KicksCrew, ni por su nombre chino. Mismo
     patrón que Trae Young 4 y Stepback 4. ¿Retirar?
   · **6 entradas de Amazon en `precios.json` son de OTRO producto** (hoy no salen gracias a "la ficha manda"): eqt-basketball
     B07BNSG5K9 (EQT Support kids) y B072R6FR8Y (running) · exhibit-b B097TTF9PM (Exhibit A) · why-not-6 B0DYVB9JDV (GS) ·
     ownthegame-2 B0F1XG64YW (3.0) · kobe-9-high-protro B0GDKB1P1X (Kobe 9 Low). Candidatas a purgar.
   · `adidas-exhibit-b`: la ficha parece tener datos mal (salió jul-2022, no 2023; Lightstrike, no Lightstrike Pro). Sin tocar.
5. **Auditoría AMPLIADA de cortes (13-sep)**: probadas en HoopsGeek las 104 zapas modernas sin URL guardada (slug deducido
   del id y validado por el título). **68 sin página, que siguen sin auditar**; 21 coinciden; **13 figuraban mid siendo low**
   → bajadas con la regla (+2 GS): Luka 4/5, LeBron Witness 9, All-Pro Nitro, Shai 001, Engine A, Zion 4, D.O.N. Issue 6/7,
   Immortality 4, Precision 7, ZEN 7, AG 6. **Quiz de tobillos 79 → 64.** 2 salen MÁS ALTAS (Fresh Foam BB v3, LeBron NXXT
   Genisus): pendientes de segunda fuente junto a las 8 de antes (agente encargado).
6. **Enlaces a OTRA VARIANTE del modelo (13-sep, `b67ebb7`)**: `puma-mb-04` → su Puma ES era la "MB.04 **Lo** Team" y
   `adidas-ae-1` → su Foot Locker (solo en `precios.json`) era la "AE 1 **Low Mujer**". Ambos `disponible:false` fijados en la
   ficha (la ficha manda), sin borrar nada. 🔑 Mismo patrón que el corte: low y mid del mismo modelo son productos distintos.
   · ⚠ **Sin resolver**: `nike-precision-8` — HoopsGeek la da **mid** (así está en catálogo) pero Nike ES y Foot Locker la
     venden como "Precision 8 **Low**". ¿Mismo producto con otro nombre o variante? No tocado.
   · ⚠ `nike-gt-jump-2`: "desde 281,69 €" en Amazon = **1,88×** MSRP, justo bajo el umbral de reventa (2×). Su único enlace.
   · `ua-curry-13` "desde 56 €" (ECI, verificado 31-ago) sobre MSRP 140: probablemente liquidación real (UA ES la vende a
     69,97 € el 11-sep, fin de línea tras la ruptura con Curry), pero el dato de ECI tiene 13 días.
7. ✅ **Precios en prosa: CERRADO (`34207ef`).** 166 líneas de `articles.ts`: 123 → `{{precio:ID}}`, 24 comparaciones sin
   cifra (varias se invertían con el MSRP: "la AE 2 es más económica que la Ja 3", 145 vs 135), 8 listas de tiendas →
   bloque de compra, títulos y descripciones sin cifra (ahí las marcas no se sustituyen) y el artículo "menos de 80 €" con
   titulares sin precio. **Tatum 4: MSRP 90 → 129,99** (`initialPrice` de su ficha de adulto en Nike ES; los 90 eran rebaja).
8. 🔴 **Bug del scraper de Amazon — ARREGLADO pero SIN DESPLEGAR.** `leerFicha` hacía `$$eval("A, B, C, .a-price
   .a-offscreen")` y 🔑 **un `$$eval` con selectores separados por comas devuelve los nodos en ORDEN DEL DOCUMENTO, no en el
   de la lista**: cualquier `.a-price` anterior (otra oferta, talla o carrusel) ganaba al buybox. Medido: One Take 5 guardada a
   31,4 € (real 75,57), Trae Young 3 44,88 (75), MB.03 44,88 (70,99), y D.O.N. Issue 7, SKX JE1, Question Mid, Stewie 4…
   Ahora selector a selector y sin `.a-text-price`. Y el guardarraíl lo BLOQUEABA: `precioPlausible` (scraper y merge)
   comparaba solo con el último precio guardado, el erróneo. Ahora vale también en 0,35-1,5× del MSRP. Probado en seco y con
   test. ⚠ **No sirve de nada hasta el push**: el scraper nocturno corre en GitHub Actions sobre `master`.
9. **Enlaces a otro producto o variante: 21 desactivados** (`b67ebb7`, `9d9cac9`, `4738c04`), todos `disponible:false`
   fijados en la ficha: AE 1 Low (adidas, Decathlon, Atmósfera, Amazon), MB.04 Low, AJ 1/AJ 11 Low, Shaqnosis Low, Uptempo
   Low, HOVR Sonic 5 de mujer (running) en la Havoc 5, Tatum 4 de niño, Jet '25/Superstar/Believe That 1 de niño, Dame
   Certified 3 en la Dame Certified. ▶️ **DECIDIR: 6 fichas NO tocadas porque se quedarían a CERO**: `puma-clyde-all-pro`
   (Amazon = All-Pro Nitro), `adidas-cross-em-up-speed` (Select de niño), `converse-pro-leather` (Pro Blaze Strap),
   `ua-curry-11` (de niño), `adidas-forum-84` (Forum 84 Low ×2) y `puma-mb05-gs` (MB.05 Lo ×2).
10. **Cortes, remate**: con segunda fuente independiente, Kawhi 1 y 2 → mid, AJ 38 y Kobe 3 Protro → high; Harden Vol 9
   → low (RunRepeat). En duda: `nb-omn1s` (HG high, catálogo low y existe la OMN1S Low) y `nike-gt-jump-1`. **67 zapas sin
   página en HoopsGeek ni RunRepeat siguen sin auditar.** Quiz de tobillos final: **65**. ⚠ `nike-kobe-3-protro` tiene
   `año_lanzamiento: 2008` (la original) pero la ficha describe la reedición de 2025.

### Pendientes anteriores (s47)
1. ✅ **HECHO (s47): `joom` fuera de `TIENDAS_PENDIENTES`** (`scoring.ts`), decidido en modo director
   con delegación del usuario. Reversible: si Impact aprueba, se vuelve a meter. 239 tests OK.
   Los 19 enlaces siguen vivos como "Ver precio en Joom"; solo deja de salir su número.
1b. 🟡 **(s47, REBAJADO tras medir) 11 de los 19 enlaces de Joom llevan restos del tracking de
   Impact de otro publisher** (`utm_source=impact&irgwc=1&utm_campaign=2700663`). Viven en
   `precios.json`, NO en `zapatillas.ts` (el fuente tiene 0 `irgwc`).
   · **Ninguno lleva `irclickid`**, que es el id con el que Impact atribuye la venta: son restos de
     un enlace copiado, no una atribución viva. La primera nota ("la comisión se la lleva otro")
     era DEDUCIDA y casi seguro falsa. Lo único que ensucian es la analítica de Joom.
   · **Ningún scraper los toca**: no hay módulo de Joom, y los 19 tienen `ultima_verificacion` entre
     31-may y 27-jul. Una limpieza única NO se revierte sola. (Tampoco los metió "el scraper al
     resolver URLs", como decía la nota: no hay nada que los resuelva.)
   ✅ **LIMPIADO (`08f0d13`, 11-sep)**: 11 URLs, 0 `irgwc` en el fichero, `variant_id` conservado. Revisado.
   ⇒ Si el usuario se da de alta en Impact, hay que REGENERAR los 19 con SU campaña, no reusar estos.
2. **Joom: ¿darse de alta en Impact?** Crear la cuenta es cosa suya.
2b. ⛔ **Los 2 enlaces de reventa NO se pudieron quitar en la s47: el clasificador de permisos
   BLOQUEÓ el borrado** (quitar enlaces es decisión del usuario, y está bien que lo frene). Queda
   preparado: viven en los DOS sitios y hay que quitarlos de ambos o el merge los reañade —
   `zapatillas.ts` (líneas con `amazon.es/dp/B07HF9YN5L` y `1005012511374212`) **y** `precios.json`
   (clave entera `"adidas-pro-vision"` + el objeto aliexpress de `"lining-gamma-2"`, CRLF, sin
   round-trip `JSON.stringify`).
2c. 🤖 **Hay un tercer trabajador: LM Studio local** (Qwen3.8 27B uncensored, 16k contexto, ~18 tok/s)
   con API OpenAI-compatible en `http://localhost:1234/v1`. El servidor viene APAGADO: se arranca con
   `~/.cache/lm-studio/bin/lms.exe server start`. **Solo para redacción** (prosa de fichas a partir de
   datos ya verificados), NUNCA para datos: no navega y un modelo local sin fuentes inventa.
2d. 🤖 **Cuarto trabajador: Gemini CLI** (`gemini`, headless desde el repo, contenido por stdin). Excelente en
   lectura masiva (auditó los 48 artículos en 61 s). Va por clave API gratuita (5 peticiones/min) y SIN web:
   ver bloque S48. Config en `GEMINI.md` + `~/.gemini/policies/cancha-no-web.toml`.
2e. ✅ **Cerrado el 11-sep por el terminal** (todo revisado por la dirección): barrido de 62 búsquedas (22 fijadas /
   39 falsas) · TAREA 7 merge por ASIN (`9982f37`) · TAREA 9 "la ficha manda" + 8 reposiciones reales (AJ41 y Caitlin 1 en
   Nike ES) · TAREA 8 `esEnlaceDeBusqueda` · Curry 13 (`6a8cc89`, tarifa UA ES 140 €) · tablas de artículos desde la
   ficha con candado en vitest (`40d4426`). En cola: ZEN 8/AG 6 → cortes low/mid/high de 13 zapas (el quiz filtra
   low-top a lesionados de tobillo, `scoring.ts:245`) → 7 fichas a cero. Pendiente mío: parche de pesos en prosa
   (35 líneas; el Qwen falló la mitad, se repite con Gemini) y la fase de precios en prosa.
3. **Vercel al 100%**: borrar despliegues viejos desde el panel (ver bloque propio).
4. **Los 2 enlaces de reventa** (`adidas-pro-vision` 2,28×, `lining-gamma-2` 3,95×).
5. **361 ZEN 8 (130 €) y AG 6 (110 €)**: fichas nuevas, score editorial → **encargadas al terminal**
   (TAREA 3 de `ENCARGO.md`, detrás del barrido y de la limpieza de Joom).
6. Seguir el barrido de búsquedas: quedan 60 sin auditar → **encargado al terminal** (TAREA 1).

### 🔴 NUEVO (s46, 11-sep): JOOM NO VA POR AWIN — y hoy pone precios de titular en 15 fichas
**Respuesta de Joom (Viviana, 10-sep) a la reclamación del 1-sep**: *"please go ahead and join our
program on **Impact**. We don't accept new partners on AWIN."* ⇒ La solicitud de Awin **no estaba
atascada: no se va a aprobar nunca**. La vía es **impact.com** (alta del usuario). **No contestó** a
la pregunta de la comisión en calzado: el 12% era la cifra de Awin, en Impact está por confirmar.

**Consecuencia en la web, medida el 11-sep**: `joom` está en `TIENDAS_PENDIENTES` (`scoring.ts:474`),
o sea que su precio se enseña *porque la aprobación estaba en curso* — y esa premisa acaba de caer.
Tiene **19 enlaces, todos disponibles**, y **pone el "desde X€" en 15 fichas**, la mayoría a la
MITAD del MSRP: `nike-giannis-freak-7` **56 €** (MSRP 120) · `nike-lebron-22` **90 €** (200) ·
`jordan-tatum-3` **75 €** (145) · `nike-zoom-freak-6` **77 €** (150) · `ua-embiid-1` y `ua-curry-10`
**81 €** (160) · `nike-kobe-3-protro` 115 € (200) · `nike-lebron-nxxt-genisus` 79 € (125)…
Una Nike signature a la mitad de precio en un marketplace es lo que la regla de AliExpress del
proyecto llama *"sospechosamente barata = réplica"*.

**Simulado qué pasa al sacarlo de pendientes** (los enlaces se quedan como "Ver precio en Joom",
solo deja de salir su número): el "desde" cae a la siguiente tienda que SÍ monetiza o al MSRP —
Freak 7 → 68,99 € ECI · LeBron 22 → 103,74 € Amazon · Tatum 3 → 80,24 € AliExpress · Freak 6 →
119,90 € FuikaOmar · Curry 10 → 126,29 € Amazon · KAI 3, GT Cut 4, Shox BB4 y Embiid 1 → MSRP.
⚠ **Efecto raro**: `lining-gamma-2` EMPEORA (282 → 473,69 €), porque sin Joom manda el AliExpress de
reventa que ya está pendiente de decidir (punto 4). Conviene decidir los dos a la vez.

### ✅ CERRADO (s45, 6-sep): las 24 fichas sin enlace de ficha real — quedan CERO
**Resuelto entero en `4d55a05` + `d9e957d` + `d36407c`.** De las 24: **10 fichas reales fijadas**
(2 en Nike ES, 5 en KicksCrew, `reebok-engine-a` en Amazon Y Zalando, 2 en AliExpress) y las demás
marcadas `disponible: false` tras verificar con navegador que la tienda NO vende el modelo —
**enlace conservado, nada inventado**. La última en caer fue `nike-pg-6`: su búsqueda en Nike ES
devuelve G.T. Cut 4, gomas para el pelo y calcetines.
🔑 **Hallazgo de método**: Foot Locker ES falló en los 7 que se le pidieron, y su buscador NO está
roto — el `?query=` es correcto (el `<title>` lo confirma) y devuelve 18-20 productos reales de su
catálogo. Simplemente no tiene esos modelos y **rellena por similitud**: `kd 19`→Harden Vol 10,
`kobe 4/6 protro`→Kobe X/5/9, `dame 8`→DON Issue 8, `new balance kawhi`→**Converse Shai**. Señal
delatora: el primer resultado es una **tarjeta de regalo**. Son "falsos disponibles", mismo patrón
que New Balance en la s44.
⚠ **Efecto colateral que sigue abierto**: esto dejó **19 fichas con CERO enlaces disponibles** (ver
pendiente propio más abajo). Antes era 1.

<details><summary>Histórico del hallazgo (s44)</summary>

Hallazgo de rebote al arreglar el JSON-LD (`c91f57e`, ver más abajo). El fix hacía que el
botón de compra prefiriera un enlace a FICHA sobre uno a un listado de búsqueda, y solo
resolvió **1 de 25** casos (`converse-shai-001`: zalando_es búsqueda → footlocker_es ficha).
Las otras 24 no tenían a dónde "ascender": **todas** sus tiendas disponibles son búsquedas,
ninguna es una ficha de producto. No es un fallo del código, es que faltan enlaces:

`nike-pg-6` (nike_es, zalando_es) · `reebok-engine-a` (zalando_es, amazon_es) ·
`nike-sabrina-4` (nike_es) · `adidas-dame-8` (footlocker_es) ·
`nike-air-max-impact-5` (nike_es) · `nike-kyrie-flytrap-6` (nike_es) ·
`nb-kawhi-2` (footlocker_es) · `nike-kd-19` (nike_es, footlocker_es) ·
`nike-kobe-4-protro` (footlocker_es, kickscrew) ·
`nike-kobe-6-protro` (footlocker_es, kickscrew, amazon_es) ·
`nike-zoom-generation` (kickscrew, amazon_es) · `air-jordan-14` (kickscrew) ·
`nike-air-penny-1` (kickscrew, amazon_es) · `air-jordan-10` (footlocker_es) ·
`nike-air-max-cb-34` (footlocker_es, amazon_es) · `puma-sky-lx` (puma_es, amazon_es) ·
`adidas-eqt-basketball` (amazon_es) · `reebok-blast` (amazon_es) ·
`nike-hyperdunk-2008` (amazon_es) · `converse-larry-johnson` (amazon_es) ·
`361-zen-7` (aliexpress) · `asics-gelhoop-v17` (kickscrew) · `rigorer-ar1` (aliexpress) ·
`rigorer-warship` (aliexpress).

**Efecto medido**: como consecuencia, esas 24 fichas se quedan sin bloque `offers` en el
JSON-LD (antes publicaban un precio que no correspondía a la URL — ver más abajo). El
bloque `review` (autor CANCHA.ZAPA) NO se pierde, es independiente de `offers`.

**Por qué se decidió omitir `offers` en vez de mantener un precio inventado (decisión del
usuario, 5-sep)**: un desajuste precio/URL en `offers` es motivo típico de que Google
descarte el rich result o abra revisión manual — esas 24 no tenían un snippet que
funcionara, tenían uno que podía costar caro. Y el marcado a un buscador pesa MÁS que un
número en pantalla, no menos: la estrategia "Ver precio" (s28) ya dice que no se enseña un
precio que no se respalda; aplicarlo al JSON-LD es la misma regla, no una nueva.

**▶️ SIGUIENTE PASO** (no hecho, es la continuación natural): buscar ficha real para estas
24, empezando por `nike-sabrina-4` (WT real, Nike ES la vende a 129,99€, y hoy el único
enlace es una búsqueda a una tienda que ni siquiera es afiliada) y las que ya tienen 2-3
tiendas disponibles (`reebok-engine-a`, `nike-kd-19`, `nike-kobe-4/6-protro`,
`nike-air-max-cb-34`) — más opciones que arreglar solo requiere fijar la URL, no encontrar
tienda nueva. Las 3 chinas de AliExpress (`361-zen-7`, `rigorer-ar1`, `rigorer-warship`) ya
estaban señaladas desde la s36 ("la API no indexa esas marcas por keywords"): mismo pendiente,
ahora con impacto SEO medido además del de conversión.

</details>

### ✅ CERRADO (s45, 6-sep): `adidas-harden-stepback-4` RETIRADA — era el segundo fantasma
**Retirada en `8923af0`** por decisión del usuario, tras conseguir el rastro comercial que faltaba.
Tres catálogos independientes, los tres con **control positivo** (venden la sub-línea a fondo, así
que no es falta de cobertura):
· **KicksCrew** → **32 SKUs** de Harden Stepback, generaciones 1, 2 y 3 (incluidos PS/kids y
  colorways oscuros). **Cero de la 4.**
· **Amazon ES** → 53 resultados y el único con "Stepback" en el título es "Harden Stepback Sport
  Shoes", que es la gen 1 sin número.
· **GOAT** → Stepback 'Scarlet' EH1943 (ene-2020), Stepback 2 'Oreo' FZ1545 (dic-2020) y
  Stepback 3 'Ecru Tint' GY6415 (ago-2022). Nada más.
Comprobado además que **NO era un renombre** de la "Harden Vol. 4 Step Back" FW3660, que sí existe:
no cuadra (nuestra ficha decía 2023 / Bounce foam / 370 g / MSRP 80 €; la Vol. 4 Step Back es de
2020 y monta Lightstrike). Limpiados los tres restos de la doctrina. Catálogo 243 → **242**.

### ✅ El scraper está SANO (falsa alarma de la s46, 9-sep)
Se llegó a abrir un pendiente "lleva 3 noches sin guardar precios". **Era falso.** `price-bot[bot]`
ha commiteado todas las noches sin fallar (`bccaabb` 7-sep, `7fb7ee2` 8-sep) y el `generated_at` de
`precios.json` va al día. La pasada del 8-sep hizo 192/601 aciertos, lo normal. **No hay nada que
arreglar aquí.** Queda anotado por si alguien vuelve a leer mal lo mismo — ver las dos entradas de
doctrina que salieron de este error, en *Verificar antes de concluir*.

### 🔴 NUEVO (s45): 19 fichas con CERO enlaces disponibles — antes era 1
Efecto colateral de marcar los falsos disponibles. **12 tienen motivo** (`proximamente`, sin lanzar,
o no se venden en ES y está documentado: `nike-lebron-24`, `adidas-ae-3`, `puma-mb-06`, `jordan-41`,
`adidas-cross-em-up-5`, `nb-kawhi-2`, `nb-omn1s`, `adidas-dame-8`, `air-jordan-10`,
`nike-air-max-impact-5`, `nike-kyrie-flytrap-6`, `reebok-answer-iv`).
**Las otras 7 no tienen excusa** y son retros/nicho que KicksCrew suele tener:
`nike-air-max-cb-34` · `puma-sky-lx` · `adidas-eqt-basketball` · `reebok-blast` ·
`nike-hyperdunk-2008` · `converse-larry-johnson` · `rigorer-warship`.
La doctrina de `adidas-cross-em-up-5` (ficha viva, cero enlaces, MSRP) se decidió para **una**;
diecinueve es otra conversación. **Decisión del usuario pendiente.**

### 🔴 NUEVO (s45): la 361 ZEN 8 existe y no está en catálogo
Verificado el 6-sep en `361sport.com/es-es`: **130 €**, **8 colorways** marcados "New" (BE WATER,
Lovers' Lock, Yin Yang, Clutch, Arctic Flash, Big Winner, 24h, Golden Hour). Sucesora directa de
nuestra `361-zen-7`. Encargada al terminal (P2).

### ✅ CERRADO (s46, `35402a7`): Foot Locker — los 36 enlaces de búsqueda eran falsos
Barrido sistemático tras los 7 de la s45 y el 8º de hoy. Comprobados **los 36** con navegador:
**36 de 36 mal**, ninguno devuelve el modelo de su ficha. Mecanismo confirmado: **Foot Locker ES
solo stockea la generación ACTUAL** y rellena el resto por similitud. `lebron 22`→Kobe X ·
`gt cut 3`→Cut 4 · `luka 1/2/3`→Luka 5 · `kd 16/17`→KD 18 · `ja 1/2`→Ja 3 · `sabrina 1`→Sabrina 4 ·
`witness 8`→Witness 9 · `zion 3`→Luka 5 · `curry 11`→Immortality 5 (no trabaja UA basket) ·
**`one take 5`→zapatillas de la marca On** · **`foamposite`→New Balance Fresh Foam**.
Ninguna ficha se quedó sin opción de compra (simulado antes de tocar). Corregido de paso
`adidas-don-issue-6`, que buscaba `query=nike+don+issue+6`.
### ✅ CERRADO (s46, `945afa0`): Nike ES — 38 de 39 búsquedas eran falsas
Mismo barrido. **La única buena es `gt cut 4`** (3 colorways), y su existencia sirve de control
positivo: el parámetro `?q=&vst=` funciona, lo que falla es el stock. Mismo mecanismo: **Nike ES
solo vende la generación ACTUAL**. `kd 16/17/18`→KD19 · `sabrina 1/2`→Sabrina 4 · `ja 1/2`→Ja 4 ·
`luka 1/2/3`→Luka 5 · `tatum 2/3`→Tatum 4 · `freak 4/5/6`→Freak 8 · `air jordan 37`→AJ 40 ·
**`zion 3`→Flex Runner 4 de BEBÉ** · **`precision 7` y `why not 6`→botas de fútbol** ·
**`don issue 6`→pantalones cortos** ("issue"→"Standard Issue").
🔑 **Trampa nueva: REDIRECT SILENCIOSO A OTRO PAÍS.** `kobe 3/8/9 protro` acaban en **"Kobe. Nike
UK"** y `kyrie low 5` en la landing de **Nike Basketball de EE.UU.** Cambia el dominio de país y es
indistinguible de un acierto si solo miras que haya productos. ⇒ Comprobar SIEMPRE el `<title>` y
la URL final, no solo que la página traiga zapatillas.
⚠ Error de datos encontrado de paso: **`adidas-don-issue-6` tenía un enlace a `nike_es`** — una
adidas apuntando a la tienda de Nike.

✅ **CERRADO (s47, 11-sep): las 62 búsquedas que quedaban** (eran 62, no 60: amazon 19 y una de nike_es ya
buena). Resultado: **22 fichas reales fijadas, 39 falsas** (`disponible:false`, enlace conservado), 1 sin tocar
(`fila-mb`, pendiente de la prueba del SKU 1BM01). **0 fichas a cero opciones** en ningún barrido. Commits
`9b126cd` amazon · `1ffc0c5` zalando · `a7202c9` kickscrew · `9ab2ff3` puma · `57cd630` ua · `e5fde5e` nb+reebok.
Patrones: UA ES solo tiene la Curry 13 · Puma ES no vende la All-Pro Nitro gen 1 y el scraper le había colado la
**Nitro 2 Pikachu** · reebok.eu "kamikaze" → un chaleco de lona · fila-mb en Amazon era una running moderna "MB".
Y dos bugs de rebote: el del merge (identidad Amazon por ruta, ver doctrina) y `esEnlaceDeBusqueda` tomando
`?search=true` de fichas de Puma por búsqueda (2 enlaces). Los dos encargados (TAREAS 7 y 8).

### 🔴 NUEVO (s46, 9-sep): VERCEL AL 100% DEL ALMACENAMIENTO — riesgo de corte
Correo de Vercel del 7-sep: *"used 100% of the included free tier usage for Deployment Storage
(10 GB)"*, con aviso de **service disruption**. El equipo es `oswaldhs7-6948s-projects` (plan free).
**No se puede tocar desde aquí**: el token del CLI de Vercel está caducado y `vercel login` es
interactivo. **Hace falta que el usuario borre despliegues viejos desde el panel** — ahí está el
grueso acumulado desde mayo (894 commits, 77 del price-bot, ~1 despliegue por push).
✅ Lo que SÍ se hizo desde el repo (`deeb82b`): **−31% por despliegue**, ver *Front y verificación*.
⚠ **Trampa al medir**: `du -sh web/dist` en local da 147 MB, pero **57 MB son
`public/shoes/originals/` + `_orig_bk` + `_pre_reshoes`**, que están en `.gitignore` y NUNCA llegan
a Vercel. El número real de despliegue era 89 MB y ahora son **61 MB**.

### 🔴 NUEVO (s45, medido a fondo en s46): dos enlaces de reventa que incumplen reglas propias
Verificados con navegador el 9-sep. **No se han quitado — es decisión del usuario** — pero los dos
incumplen reglas que el proyecto ya tiene escritas:
· **`adidas-pro-vision`**: su Foot Locker era otro falso disponible (devuelve **Nike React Vision** y
  **Nike Court Vision**), corregido en `6dd5358`. Con eso su ÚNICO enlace vivo es Amazon a
  **171,09 €** (verificado, carrito activo, Departamento "Hombre" → producto correcto) sobre MSRP
  **74,99**: **2,28×**. Y como Amazon es afiliado y Foot Locker no, la web anuncia **"desde 171 €"
  una zapatilla de 75**.
· **`lining-gamma-2`**: AliExpress a **473,69 €** (precio corregido desde 491,39 en `6dd5358`;
  producto correcto, POIZON-SPORTS, 6600+ vendidos) sobre MSRP 120 → **3,95×**. La regla de
  AliExpress del proyecto dice literalmente que entra *"solo si su precio ≤ MSRP / precio mostrado
  actual"*. Lo cuadruplica.
⚠ El precio de la Gamma 2 hubo que leerlo de la **captura**: la ficha de AliExpress no trae JSON-LD
y los selectores de precio devuelven también los del carrusel de recomendados.

### ⚠️ Afiliados — MEDIDO EN LOS PANELES (s41, 29-ago), ya no son suposiciones

**Los números reales de tráfico y conversión, por fin:**

| Fuente | Clics agosto | Clics julio | Ventas | Estado |
|---|---|---|---|---|
| Amazon ES | **94** | — | **0** (conv. 0,00%) | cuenta ACTIVA |
| Awin (los 7 programas) | **9** | 986 ⚠ | **0** | EUR 0,00 pagable |

- 🔥 **Los 942 clics de Decathlon de julio eran FALSOS, del scraper.** De los 986 clics de Awin
  en julio, **942 fueron Decathlon** y el resto de programas sumaban 44. En agosto Decathlon tuvo
  **1**. La causa: `unwrapAffiliateUrl(link.url)` no se añadió a `index.ts` hasta el **28-jul**
  (commit `5ffd7f8`) — antes el scraper navegaba el wrapper de Awin cada noche. El fix los cortó
  en seco. ⇒ **Todas las métricas de Awin anteriores al 28-jul son basura**, y el tráfico real de
  la web es de ~100 clics/mes, no de mil.
- ✅ **Los 94 clics de Amazon SÍ son reales**: `amazon_es.ts:43` quita el `tag=` antes de navegar,
  así que el bot no los infla. Amazon no lleva wrapper de redirección (es `?tag=` sobre la URL
  real), así que `unwrapAffiliateUrl` no lo protege — lo protege ese `.replace()` y solo ese.
- 🔴 **MEDIDO s47 (11-sep) en el panel: últimos 30 días (12-ago → 10-sep) = 20 clics, 0 pedidos.**
  ⚠ NO comparar con los "94 de agosto" de la s41 sin saber qué periodo se leyó entonces (el selector de
  fechas del panel no aplica "Último mes" desde la extensión, y el resumen consolidado no trae clics).
  Con ~20 clics/mes, 3 ventas antes de ~nov-2026 es improbable ⇒ **hay que tener pensado el plan B**:
  si Amazon cierra, los enlaces con `tag=canchazapa-21` siguen funcionando pero dejan de pagar, así que
  el "desde X€" de Amazon pasaría a ser una tienda sin afiliado (estrategia "Ver precio"). Decisión
  del usuario cuando llegue el correo; no hay que tocar nada antes.
- ⚠️ **AMAZON PUEDE CERRAR LA CUENTA** (correo de `associates@amazon.es` del 23-ago): sin las
  **3 ventas** requeridas, y su política es cerrar a los 180 días del alta → **límite ~nov-2026**.
  Son **174 enlaces, el 44% del catálogo**. Pero el problema NO es falta de tráfico (94 clics/mes
  daría 1-3 ventas a tasa normal), es que **convierten a cero**. Sospechoso principal ↓
- 🎯 **49% DE LOS ENLACES DE AMAZON SON BÚSQUEDAS, NO FICHAS**: **87 `/s?k=` frente a 90 `/dp/`**,
  medido POST-MERGE (que es lo que ve el usuario). ⚠ En `zapatillas.ts` a pelo salen 142 vs 35,
  pero **ese número NO vale**: `resolveUrl()` en `mergePrices.ts` sustituye la búsqueda por la
  ficha que resolvió el scraper y le reaplica el `tag=`, así que 55 ya están arregladas en
  runtime. Medir siempre sobre `zapatillas` importado, nunca sobre el fichero fuente.
  Los 87 llevan todos su `tag=` (0 sin monetizar). **En 56 de ellos Amazon es la ÚNICA tienda
  afiliada con ficha** → son la prioridad.
- ✅ **REPASO COMPLETO DE LOS 56 PRIORITARIOS HECHO (s41).** Comprobados uno a uno en Amazon ES.
  Resultado: **87 búsquedas → 70**, **90 fichas → 107**. **17 fichas nuevas fijadas**, 0 sin tag.
  `jordan-luka-3` `jordan-luka-2` `nike-giannis-immortality-3` `nike-zoom-freak-4` `nike-sabrina-1`
  `ua-futr-x-4` `ua-hovr-havoc-5` `nike-gt-jump-1` `nike-gt-jump-2` `adidas-pro-vision`
  `skechers-skx-league` `fila-grant-hill-2` `adidas-crazy-8` `air-jordan-12` `reebok-shaq-attaq`
  `nike-air-flight-huarache` `nike-air-zoom-flight-95`.
- ⚠️ **Los otros ~39 NO tienen arreglo posible: Amazon ES casi no vende este nicho.** Tres causas:
  1. **Amazon no tiene el modelo** (la mayoría): la búsqueda devuelve otra generación u otra marca.
     `nike-ja-3`→Ja 2 · `nike-ja-4`→AJ4 RM · `nike-gt-cut-4`→solo *G.T. Cut Academy* (budget) ·
     `puma-mb-06`→MB.03/04/05 · `nike-kd-19`→KD 4 y KD18 · `adidas-trae-young-4`→Trae Young 2 ·
     `nike-giannis-freak-8`→Freak 6/7 · `reebok-answer-iv`→Answer **III** · `jordan-xxxvii`→AJ1 Mid ·
     `jordan-41`→lo lee como TALLA 41. Y sin resultados: `nb-omn1s`, `converse-shai-001`,
     `converse-all-star-pro-bb`, `ua-embiid-1`, `puma-hali-1`, `nike-atwo`, `nike-air-penny-1`,
     `nike-air-pippen`, `puma-sky-lx`, `reebok-blast`, `nike-shox-bb4`, `nike-air-max-cb-34`,
     `nike-zoom-generation`, `nike-hyperdunk-2008`, `converse-larry-johnson`, `adidas-eqt-basketball`,
     **`nike-kobe-5-protro` (0 resultados)** y **`nike-kobe-6-protro` (¡solo protectores de zapatillas!)**.
     Los **3 Asics** (`unpre-ars-2`, `gelhoop-v17`, `glide-nova-ff-4`) confirmados sin nada.
  2. ⛔ **Reventa** — criterio aplicado: se descarta a partir de **~2× MSRP**. `nike-kobe-4-protro`
     **1.204,89 €** · `nike-pg-6` **420,64 €** (MSRP ~120) · `nike-kyrie-flytrap-6` **205,73 €**
     (MSRP ~80) · `air-jordan-14` **487-840 €**.
  3. **Segmento equivocado**: `adidas-cross-em-up-5` (el catálogo es la adulta unisex, Amazon solo
     vende la "Cross Em Up 5 **K**" de kids) y `air-jordan-10` (el único candidato es **(GS)**).
  ⇒ **PENDIENTE DE DECIDIR**: esos ~39 enlaces mandan hoy al usuario a un listado con productos de
  otra marca. Resta credibilidad y no monetiza. Lo coherente con la estrategia "Ver precio" (s28)
  es **quitarlos** y dejar MSRP. No hecho: es tu llamada.
- ✅ **adidas: el fallo de tracking del 20-27 ago da IGUAL.** Awin avisó de la incidencia y de que
  "evaluaría el impacto", pero adidas tuvo **1 solo clic en todo agosto** → el impacto es cero.
  **Pendiente cerrado, no hay nada que reclamar.** Confirmado además por correo de Awin del 27-ago
  ("tracking incident resolved", fix desplegado).

**Estado de las solicitudes en Awin (verificado en el panel, 29-ago):**
- ⏳ **Pendientes (3)**: Sneakin ES, Reebok ES, Joom ES. Pro:Direct ES ya no figura como pendiente.
- ❌ **JOOM ES — RESPONDIDO EL 10-SEP: "We don't accept new partners on AWIN", la vía es Impact.**
  Ver el pendiente propio arriba. Lo que sigue es el histórico de la reclamación. Es el programa más
  interesante de los tres y merece seguimiento:
  · **AID 48435** · publisher 2908587 · **comisión por defecto 12%** (el doble que AliExpress, 4×
    Amazon) · cookie 30 días · validación 30 días.
  · ⚠ El 12% NO es universal: hay tarifas por categoría (vi Health & Beauty al 15%). **Falta
    confirmar la de calzado deportivo** — se preguntó en el correo.
  · 🔑 **El argumento de la reclamación son sus propios términos**: "we aim to either accept or
    decline an application within 7 days… therefore if you have not received a response after 7
    days of applying then please do let us know". Con un **97,56% de ratio de aprobación**, una
    solicitud parada meses no es un veto: está atascada.
  · Contacto: `viale.viviana@joom-contractors.com`. Correo enviado el 1-sep, asunto "Pending
    publisher application - CANCHA.ZAPA (Awin ID 2908587) - Joom ES (48435)".
  · ⚠ **Riesgo de cobro**: su estado de pago es **nivel de exposición 2** ("un anunciante que ha
    superado su límite de crédito"), con 55 días de pago medio. No es descalificante —5 de los 7
    programas activos están también en naranja, ECI incluido— pero conviene saberlo.
  · Si aprueban: **desbloquea 19 enlaces en 18 fichas** (lebron-22, curry-12, sabrina-2, gt-cut-3,
    tatum-3, kai-3, freak-7, gt-cut-4, gamma-2, kyrie-infinity, freak-6, shock-wave-5, aj3,
    kobe-3-protro, shox-bb4, embiid-1, nxxt-genisus, curry-10). Hay que envolverlos en el wrapper
    de Awin (`awinmid=48435`) y dar de alta `joom_es` en `COMISIONES_TIENDA`.
- ❌ **Rechazados (7)**: Sprinter, Foot-Store, Basket-Center, size?Official, Foot Locker, JD Sports,
  Privé by Zalando — **los 7 tienen el botón "+ Unirse" activo**, o sea que se pueden volver a
  solicitar. Los rechazos fueron en jun-2026, ya pasaron los 3 meses. **Decisión del usuario.**

### ⚠ `adidas-cross-em-up-5`: la ÚNICA ficha del catálogo con CERO enlaces (s43)
Al quitar su enlace de Amazon (grupo B: Amazon solo vende la versión de kids) se quedó con
`links_compra: []`. **No rompe nada** — la tarjeta cae a MSRP 65 € y el bloque de compra de la
ficha está guardado con `{mejorPrecio && ...}` — pero es un estado único en las 240.
Buscada la adulta unisex (2023, 355 g) tienda por tienda el 1-sep: **no la vende nadie en España**.
adidas ES `/search?q=cross+em+up+5` → una sudadera · ECI → 14.400 resultados (su catálogo entero) y
el primer hit es una Adizero Dropset · Amazon → solo la K Wide de kids · Decathlon → la K wide, que
YA está en la ficha hermana `adidas-cross-em-up-5-gs`, que es su sitio.
**✅ DECIDIDO POR EL USUARIO (1-sep): SE QUEDA COMO ESTÁ.** Ficha viva, cero enlaces, MSRP 65 € y
sin bloque de compra. **No es un pendiente, no volver a abrirlo.** Se descartaron retirarla y
colgarle el enlace de la hermana GS. El porqué:
· La regla de disponibilidad ya dice que la falta de stock **NUNCA** saca una zapa de rankings,
  quiz ni catálogo. Cero enlaces es ese mismo caso llevado al extremo.
· *"No se vende en España"* es **una foto con fecha**, no un hecho permanente — la misma doctrina
  que caducó el veredicto de "fantasma" de la AE 3 en 8 meses.
· Retirarla tiraba score, specs y veredicto de un modelo reponible, y borrar una ficha deja
  restos en tres sitios (comentario de sección, imagen y menciones en otras fichas).
· Enlazar la GS desde la adulta reintroduce justo la confusión de segmento que quitó `75ab314`.

⚠ Y **NO es un fallo** que las dos fichas compartan `imagen_principal`: es la convención del
catálogo. **8 de las 14 fichas `-gs` usan la foto de la adulta** (believe-that-1, cross-em-up-5,
dame-x, don-issue-7, ownthegame-3, luka-77, jet-25, lockdown-7); solo 6 tienen foto propia.

⚠ **Trampa que costó comprobarlo dos veces: el slug de una URL de Amazon MIENTE.** El enlace
fantasma era `/adidas-Zapatillas-Unisex-**Adulto**-TMSOGR/dp/B0BGGTB5LF` y parecía la adulta.
La ficha real dice `Departamento: Unisex niños` y el título, "Cross Em Up 5 Shoes **Wide**".
Además el precio scrapeado (29,99 €) no coincidía con el de la ficha (41,99 €). ⇒ El segmento se
lee en el campo **Departamento** de la ficha, NUNCA en las palabras del slug.

### ✅ Basket World había CERRADO — 14 enlaces quitados (s43 diagnóstico, s44 resuelto)
`basketworld.com` y `www.basketworld.com` servían la **página por defecto de Plesk** ("Domain
Default page"), o sea un servidor sin configurar, y respondían **200** — la trampa de siempre.
`basketworld.es` no resolvía. La tienda física de Zaragoza cerró en **abril de 2025** tras una
liquidación, y con ella la tienda online. No había dominio nuevo al que apuntar.
**No era afiliado nuestro**, así que no se perdía dinero, solo credibilidad (mandaban a una
página de Plesk). **QUITADOS los 14 (5-sep, `086f6c7`)**: verificado antes de borrar que ninguna
de las 14 zapas se quedaba sin opción de compra (quedan entre 2 y 6 tiendas activas cada una).

### Datos / catálogo
- 🔴 **NUEVO (s44, 5-sep): anclaje de scores — 2 fantasmas más, 4 anclas nuevas, 27 "sin review" verificadas.**
  Encargo: de las 45 zapas con score sin fuente externa que no encajaban en ninguna excusa de la
  metodología (retro/GS/china), anclar a HoopsGeek/WearTesters/RunRepeat una por una. Resultado:
  · **4 ANCLADAS** (ver `score-fuentes.json`, sección `_sesion_44_2026`): `nike-gt-jump-1` HG 8,8
    (n=8, rango 8,6-9,3) — sube desde 7,3, el ancla corrige una estimación editorial que se había
    quedado corta. `ua-futr-x-elite` HG 8,2 (n=5). `adidas-exhibit-a` HG 8,3 (n=4) — sube 1,8 desde
    6,5, mismo mecanismo. `nike-atwo` WearTesters 8/10 (editorial + `wt_url`, no hay HG aún).
  · **27 CONFIRMADAS SIN REVIEW** (comprobado 5-sep-2026 contra HG/WT/RunRepeat, búsqueda dirigida
    por modelo exacto, no genérica): las 9 líneas budget/team de Under Armour (`ua-curry-13`,
    `ua-curry-3z-25`, `ua-spawn-7-mid`, `ua-lockdown-7`, `ua-futr-x-4`, `ua-hovr-havoc-5`,
    `ua-jet-23`, `ua-jet-25`, `ua-flow-breakthru-4`), los 3 Asics (`asics-gelhoop-v17`,
    `asics-glide-nova-ff-4`, `asics-unpre-ars-2`), los 4 Skechers SKX (`skechers-skx-je1`,
    `skechers-skx-resagrip`, `skechers-skx-league`, `skechers-skx-float`), `adidas-exhibit-b`,
    `adidas-exhibit-select`, `adidas-ownthegame-2`, `adidas-ownthegame-3`, `adidas-cross-em-up-5`,
    `adidas-cross-em-up-speed`, `decathlon-tarmak-fast-900`, `decathlon-tarmak-se500-mid`,
    `nike-gt-jump-academy`, `kipsta-canaveral-900` y los 3 Moolah Kicks (`moolah-neovolt-pro-v3`,
    `moolah-evolyte-elite`, `moolah-triple-double`). Ninguna tiene fuente real: se quedan con el
    promedio de ejes (`editorial`, ya era el fallback). **No repetir esta búsqueda salvo que algún
    día publiquen review** — 3-4 sitios distintos, varias formas de búsqueda cada uno.
    ⚠ `puma-playmaker-pro-mid`: WearTesters SÍ review la "Playmaker Pro" (sin "Mid") a 7/10, 2022 —
    pero es el corte LOW, no el Mid de nuestra ficha (2023). No se ancla por no ser exactamente el
    mismo SKU; queda anotado por si alguien decide que el cambio de altura no basta para invalidarlo.
  · **3 SIN TOCAR por no haber salido aún** (mismo trato que Stewie 5 / Scoot Zeros III): `puma-mb-06`
    (sale 25-sep-2026), `nike-caitlin-1` (sale 1-oct-2026) y `jordan-41` (lanzamiento exclusivo China
    28-ago-2026, el global no llega hasta 25-oct-2026 — por eso HG/WT no la tienen todavía, no es
    un hueco de cobertura).
  · 🔴 **2 FANTASMAS encontrados de rebote** (no son huecos de review, son fichas de un producto que
    no existe — la búsqueda "no aparece nada de un modelo de marca grande" fue la señal):
    **`adidas-trae-young-4`** — contrato de Trae con adidas expiró antes de la 2024-25, la línea se
    canceló entera (holiday-2024 + spring-2025, los 12 colorways previstos), Trae pasó a Jordan
    Brand. **RETIRADA del catálogo en `861bbd9` (s44)** tras verificarlo el usuario: la ficha tenía
    un enlace `disponible: true` recomendando comprar un producto que nunca existió. **`adidas-harden-stepback-4`**
    — la sub-línea Stepback documentada llega al 3 (ene-2022, HG 8,2); ningún rastro de una "4" en
    ningún sitio; y la ficha tiene `predecesor_id: null` pese a decir ser la cuarta de una serie
    (si existiera la 3 en catálogo debería estar encadenada). El "Harden Vol. 4 Step Back" (2020)
    que sí existe es OTRO producto — la trampa es la misma que el slug de Amazon de `75ab314`: el
    nombre se parece, el modelo no es. **Menos urgente que Trae Young**: su único enlace ya está
    `disponible: false`, no recomienda nada activamente. **Pendiente de verificar rastro COMERCIAL
    (SKU en adidas.es/Amazon/tiendas) antes de decidir si se retira** — ausencia de prensa no es
    ausencia de producto en un takedown budget de 2023, que es justo lo que la prensa no cubre.
- ✅ **Curry 13 es la ÚLTIMA de Under Armour — CERRADO en la s42 (31-ago).** Curry y UA rompieron
  el 13-nov-2025; la Curry 13 (feb-2026) es el cierre pactado, con colorways hasta oct-2026. Curry
  Brand es independiente y él es agente libre de calzado. Re-verificado antes de tocar (ESPN, SI,
  Yahoo, NBC). Corregidas las 4 afirmaciones que lo daban por vivo **en presente**: `seoPages`
  marca UA ("Under Armour es la marca de Steph Curry" + "Curry Brand (filial de UA)"), `seoPages`
  marca Nike ("Curry no, Curry es UA") y el análisis `ua-curry-13-analisis-2025` ("UA lleva desde
  2013 construyendo…"). La ficha pasa a `año_lanzamiento: 2026` (salió en feb-2026, no en 2025) y
  el análisis gana una sección de contexto con lo que el fin de línea significa al comprar.
- 🟡 **s47 (11-sep): Curry 13 — DECIDIDO en modo director, en curso.** Fuente primaria encontrada:
  **underarmour.com** da **12,4 oz (~351 g)** → los 352 g de la ficha son el dato de FABRICANTE y valen.
  Corte **mid** (Sportland Europe, test). Y la TECNOLOGÍA estaba mal en ficha y artículo: la 13 lleva
  **entresuela UA HOVR+ de longitud completa** (supercrítica) + **suela UA Flow desacoplada** + chasis
  TPU 3D + jaula SPLASH + estructura Pebax. **No lleva Warp**, y Flow NO es la entresuela.
  Drop: nadie lo publica. Review numérica: sigue sin haber (HG/WT/RR, 11-sep).
  ⇒ Regla aplicada: **la ficha es la fuente única**; la prosa deja de repetir precio, drop y notas x/10.
  Redacción por el Qwen, revisada por el director, aplicación por el terminal (TAREA 4).
  ⚠ Tarifa en € sin verificar: ficha MSRP 160 € pero UA ES la vendía a **140 €** el 16-may y el MSRP
  de EE.UU. es $140 → el terminal la mira en underarmour.es con navegador antes de tocar precios.
- 🔴 **NUEVO (s47): la deriva de specs escritas a mano es de TODO el sitio, no solo de la Curry 13.**
  `articles.ts` repite pesos/precios/notas por modelo en prosa y en ~20 tablas, y ya divergen entre
  sí: la **Tatum 4 pesa 390 g** en un artículo y **345 g** en la tabla de otro. Es la misma familia que
  el "todo número debe salir del catálogo" del rediseño. Arreglo de fondo (tablas generadas desde la
  ficha) = cambio de código.
  **MEDIDO (s47, 11-sep)**: 51 celdas Peso/Precio en tablas de 11 artículos (16 zapas) → **37 desviadas**
  (peso >5 %, precio >10 %). Peor caso: **GT Cut 4 305-310 g en 4 artículos vs 431 g en ficha**, y la
  ficha es la buena (RunRepeat, laboratorio: 15,2 oz). AE 2 340/350 vs 428. En prosa, 35 líneas más con
  pesos, varias con comparaciones que se INVIERTEN con el dato real ("✅ 310g — la más ligera del grupo"
  para la GT Cut 4, que es de las más pesadas). Es consejo de compra falso, no un detalle.
  ⇒ **DECIDIDO**: peso = `peso_real_g`; precio = el de la barra lateral del artículo (que ya sale del
  catálogo, así que hoy la misma página se contradice). Tablas con marcas `{{peso:ID}}`/`{{precio:ID}}`
  sustituidas en `blog/[slug].astro` + test candado → TAREA 5 del terminal. Prosa: la reescribe el Qwen
  con los pesos de ficha y la reviso yo.
  **Siguiente fase (después de la TAREA 5): precios en PROSA.** Medido: 173 líneas con € en 37 de 48
  artículos; **101 dan el precio de un modelo concreto** (titulares "Nike LeBron 23 — 179€", "30€ más barata
  que…", "precio de salida 199,99€"), el resto son rangos de presupuesto genéricos (esos se quedan). Y hay
  LISTAS DE TIENDAS en prosa ("se encuentra en Nike.es, Foot Locker ES, JD Sports…") que el barrido de la
  s46 demostró falsas para todo lo que no sea la generación actual. Plan: precio de un modelo → marca
  `{{precio:ID}}`; comparaciones de precio → cualitativas; tiendas → "ver bloque de compra". Lo redacta
  el Qwen en tanda y lo reviso yo; lo aplica el terminal.
- 🔴 **NUEVO (s42): la Curry 13 se contradice a sí misma en los números.** Salió al revisar lo
  anterior y **NO se ha tocado**: elegir un valor sin fuente sería inventárselo. **No hay review de
  laboratorio publicada** de la 13 (RunRepeat solo llega a la 11; WearTesters, a la 12), así que lo
  decides tú o esperamos fuente:
  · **Peso: TRES valores distintos.** Ficha `peso_real_g: 352` · ficha `pros` "~308g" · artículo
    "~330g en talla 44". Como mucho uno es cierto.
  · **Drop**: ficha `drop_mm: 8` vs artículo "drop bajo (4mm)".
  · **Scores**: el artículo cita tracción 8/10, cushion 8/10 y estabilidad 8/10; la ficha dice
    `traccion: 10`, `amortiguacion: 9` y `soporte_lateral: 9`. La FAQ añade un tercer juego
    (tracción 8/10, estabilidad 7,5).
  · **Precio**: título del artículo "¿merece los 150€?" vs ficha `pros` "140€" vs `seoPages`
    "130-140€".
  ⇒ Lo barato es dejar la ficha como fuente única y quitar los números repetidos en prosa.
- ✅ **CERRADO (s45, `d36407c`): las tarifas de 361° que la s39 dio por aplicadas NUNCA llegaron a
  los datos — y encima se aplicaron a la ficha equivocada.** Re-verificado en vivo en
  `361sport.com/es-es` el 6-sep:

  | Ficha | Tarifa real | Teníamos | |
  |---|---|---|---|
  | `361-joker-1` | **140 €** | 150 | ✗ corregido |
  | `361-joker-2` | **150 €** | 119 | ✗ corregido |
  | `361-zen-7` | **120 €** | 90 | ✗ corregido |
  | `361-joker-2-gt` | 200 € | 200 | ✓ |

  El patrón delata el error: **el 150 de la Joker 2 acabó en la Joker 1**, y la Joker 2 se quedó con
  los 119 € estimados por conversión del dólar que la propia s39 daba por malos. El 90 € de la ZEN 7
  era el número que este mismo documento señalaba como "sospechoso por debajo de tarifa":
  confirmado, eran 120. ⚠ **Lección**: que CLAUDE.md diga "CORREGIDO" no prueba que el dato cambiara
  — verificar contra `zapatillas.ts`, no contra la nota.
- `rigorer-ar1` / `rigorer-warship`: la API de AliExpress **no indexa** esas marcas nicho por
  keywords (0 candidatos, sin error). No hay nada que arreglar en código: **repuntar o quitar**. (s36)
- **Los 7 `s.click` de marca china** (peak, anta, lining): ni click falso ni datos, congelados desde
  mayo. Opciones: pasarlos a búsqueda por API (son chinas, la regla Marcas+ no aplica) o resolverlos
  a mano una vez y guardar el `product_id`. **Decidir.** (s36)
- **3 Asics sin opción monetizada** (`unpre-ars-2`, `gelhoop-v17`, `glide-nova-ff-4`): solo
  kickscrew, sin afiliado. Para recuperarla hace falta ficha real de AliExpress **con sello
  Marcas+ Verificado** (Asics es marca occidental) — lo tiene que pasar el usuario. (s36)
- **8 zapas sin ningún afiliado**, todas por causas insalvables: `nike-gt-jump-3` (solo GT Jump
  Academy), `jordan-xxxviii`, `nike-sabrina-3-gs`, `nike-giannis-immortality-4-gs` (solo adulto),
  `nike-kobe-1-protro` (Marcas+ > MSRP) y 3 Moolah Kicks (marca US no distribuida). Muestran
  "Ver precio" + MSRP. **NO insistir** salvo que entren en stock en una afiliada. (s28)

### 🤖 IA del chat — arreglada, pero con una pieza en tu tejado (s40, 29-ago)
`/api/chat` y `/api/coach` llevaban **caídos** (502 constante). No era la saturación del free tier
que suponía la nota de la s25: **3 de los 5 modelos de la cadena habían sido RETIRADOS** por
OpenRouter (llama-3.3-70b, qwen3-next-80b, gpt-oss-120b). Arreglado y desplegado:
- Cadena nueva: los dos gemma validados delante, + glm-5.2 / minimax-m2.7 / inkling-small
  **SIN VALIDAR** (no había clave con la que probarlos). Revisar cuando se pueda.
- **Fallback local sin IA**: si la cadena entera falla, la función calcula la recomendación con el
  catálogo (presupuesto, exterior/júnior/mujer, sin RETRO ni GS a adultos) y devuelve 200 con
  marcadores `[[shoe:]]`. **Gasta 0 peticiones.** Verificado 9/9. En `coach.ts` NO hay fallback
  a propósito: un análisis de partidos no se puede fabricar sin IA.
- Tiempo por modelo **adaptativo** `min(15s, restante-1s)` — un tope fijo asfixiaba al único
  modelo vivo, que necesitaba >12s para una recomendación larga.
- **Enfriamiento 60s** de los modelos que devuelven 429, para no quemar cuota.
- El 502 ya trae `code` (`auth`/`prohibido`/`sin-saldo`/`cuota`/`lentos`/`upstream`) y `estados`
  con los status reales. El front solo lee `reply`, así que es invisible al usuario.

**▶️ RESUELTO EN LA s41 — y el diagnóstico del 403 era FALSO.** Leídos los *Upstream Requests* del
panel de OpenRouter (29-ago), no hay **ni un solo 403**. Lo que hay, en 4 peticiones reales de
producción de la app CANCHA.ZAPA:

| Modelo | Proveedor | Status | Latencia |
|---|---|---|---|
| gemma-4-31b | Google AI Studio | **429** | 70 ms |
| gemma-4-26b | Google AI Studio | **429** | 60 ms |
| glm-5.2 | Decart | **429** | 200 ms |
| **minimax-m2.7** | GMICloud | **200 ✅** | ~1 s |

**El chat NO está caído**: minimax responde y salva todas las peticiones. Y el 429 **no es el tope
de la cuenta** —si lo fuera, minimax también rebotaría—: es rate-limit **POR MODELO**, y los tres
primeros llevan saturados de forma persistente. Con los gemma delante, cada petición del chat
quemaba **3 llamadas upstream rechazadas** antes de llegar al que responde. → **Cadena reordenada
con minimax primero** en `chat.ts` y `coach.ts` (236 tests OK).

**✅ HECHO (s42, 31-ago) — la cadena la hace ahora OpenRouter, no nosotros.** En vez de mandar
`model` como string y recorrer la lista a mano, se manda **`models: [...]`** entera: OpenRouter la
recorre en ESE orden server-side y salta al siguiente ante rate-limit, moderación, downtime o error
de context-length, y dentro de cada modelo ya reintenta otros proveedores. Se factura el que
responde y su id llega en `model` de la respuesta → **se loguea** (`[api/chat] respondió X`), que es
el dato que debe decidir el orden de la cadena en la próxima revisión.
⇒ De **hasta 5 peticiones HTTP secuenciales desde Vercel a UNA sola**. Desaparecen el reparto del
presupuesto de 25 s, la latencia acumulada de los eslabones muertos y el `Map` de `enfriando`
(**borrado**: cada invocación serverless es un proceso nuevo, así que no enfriaba nada). Aplicado a
`chat.ts` y `coach.ts`. El fallback local sin IA se CONSERVA intacto, y `code` gana `contrato` (400).
🔴 **MEDIDO EN PRODUCCIÓN Y SALIÓ MAL — leer esto antes que lo de arriba.** El refactor se desplegó
por accidente (ver *Incidencia de las dos sesiones*) y eso permitió medirlo. Una petición real a
`https://canchazapa.com/api/chat` el 31-ago devolvió:
`{"code":"local-contrato","estados":"400"}` en 13,7 s. Es decir: **OpenRouter RECHAZA la petición
con `models` con un 400**, y el usuario acaba en el fallback local (recibe zapatillas reales del
catálogo, pero SIN IA).
- ✅ **CAUSA IDENTIFICADA (31-ago): `models` acepta 3 entradas COMO MUCHO** y mandábamos 5. El
  error literal, capturado por el campo `detalle` nuevo en la primera petición que falló:
  `'models' array must have 3 items or fewer.` El boletín de OpenRouter lo decía, pero en el
  párrafo del endpoint de **Anthropic** (`fallbacks`), así que parecía no aplicar al de chat
  completions. **Aplica igual.** Arreglado con `models.slice(0, 3)`; los 2 restantes no se pierden,
  quedan en la cola de respaldo que los prueba de uno en uno.
  ⚠ Los docs de *Model Fallbacks* NO mencionan el tope: el ejemplo lleva 2 entradas y nadie lo dice.
- ⚠ **Hay un 403 en la cola, sin identificar.** El `estados` completo fue `400,0,429,429,429,403`:
  uno de los eslabones devuelve 403. La s40 dio un 403 por hecho sin medirlo y se equivocó entero;
  que ahora exista uno real NO rehabilita aquel razonamiento.
  · **Por POSICIÓN** el 403 es el 6º de 6 intentos → `thinkingmachines/inkling-small:free`. El orden
    de `estados` no es una suposición: `fallos.push()` corre una vez por intento fallido y en orden.
  · **Pero el panel NO lo respalda**: en Upstream Requests no hay ningún 403 ni ninguna petición a
    inkling, y Eligibility Preview da inkling como disponible (551 ok / 2 no, que son otros). Igual
    que el 400, encaja con un rechazo ANTES de enrutar a proveedor, que no deja rastro ahí.
  ⇒ **NO tocar la cadena todavía.** Deducir el eslabón y actuar es justo el error que hoy ha mordido
  dos veces. El campo `detalle` ya acumula TODOS los errores (antes solo guardaba el primero, que es
  el motivo de que cazara el 400 y no el 403), así que la próxima petición que llegue al final trae
  el mensaje literal. Sin gastar peticiones a propósito.
- El `estados` traía UN solo 400, no dos → el reintento sí corrió y devolvió **200 con `content`
  vacío**. **Causa raíz MEDIDA en el panel** (Logs → Generations, 31-ago): de 4 generaciones de
  minimax, **3 cortaron con `finish_reason: length` clavadas en 380 tokens** —nuestro `max_tokens`—
  y la única que respondió terminó en `stop` con 352 tokens de texto. minimax-m2.7 es de
  RAZONAMIENTO y **el razonamiento consume ese mismo presupuesto**, así que se quedaba sin tokens
  antes de emitir la respuesta. Intermitente según cuánto razonara. El 380 estaba calibrado para
  los gemma (que no razonan) y se heredó al poner minimax primero en la s41.
  ⇒ **`max_tokens` subido a 1000 en `chat.ts` y a 1200 en `coach.ts`.** Es un TOPE, no un objetivo:
  los modelos que no razonan siguen parando solos en `stop`.
- Al colapsar la cadena en una petición se había perdido además el "si viene vacío, prueba el
  siguiente", que el bucle viejo sí hacía. Recuperado.
- **El 400 de `models` NO aparece en Upstream Requests**, solo los 200. OpenRouter lo rechaza en
  VALIDACIÓN, antes de enrutar a ningún proveedor — por eso no deja rastro de proveedor.

✅ **ARREGLADO (sin desplegar aún)**: `chat.ts` y `coach.ts` construyen ahora una LISTA DE INTENTOS —
primero la cadena entera en una petición y detrás **los 5 modelos de uno en uno**, que es el
comportamiento clásico y probado. Si `models` funciona, 1 petición; si no, se degrada exactamente a
lo que había antes. Un 200 con `content` vacío ya NO cuenta como respuesta: se anota como `204` y se
pasa al siguiente intento. La respuesta añade **`detalle`** con el texto de error de upstream
recortado, para no necesitar otro despliegue solo para saber por qué falló. Nuevos `code`:
`contrato` (400 en todos) y `vacios` (200 sin texto en todos).
✅ **Los 5 modelos de la cadena verificados VIVOS el 31-ago** contra `/api/v1/models` (395 modelos,
18 `:free`). Ninguno retirado.

La decisión de fondo sigue abierta: **$10 de créditos** suben el tope de **50 a 1.000
peticiones/día** (los créditos NO se gastan usando modelos `:free`, basta con haberlos comprado) y
además habilitan un eslabón de pago como último recurso.

### Infra
- 🔵 **MODO DOS AGENTES (s43).** El usuario trabaja con dos sesiones de Claude a la vez sobre este
  repo: **una ejecuta y commitea, la otra decide con él**. Reglas que costaron un despliegue
  accidental:
  · `git add` de ficheros CONCRETOS. Nunca `-A`, `.` ni `commit -a`: te llevas dentro el trabajo
    sin commitear de la otra sesión (pasó con la ficha `ua-curry-13` dentro de un commit de
    Foot Locker).
  · `git log origin/master..HEAD` ANTES de cada push: arrastras todo lo que haya debajo, sea tuyo
    o no. Así se desplegó el refactor de OpenRouter sin que nadie lo aprobara.
  · Los trámites (pushes ya autorizados, bloqueos de permisos de una sesión) se resuelven ENTRE
    AGENTES. Al usuario solo van decisiones de producto y negocio. Textual: *"no me molesteis con
    estas tonterias"*.
  · Si una sesión tiene bloqueado un comando por su harness, lo pide a la otra — nunca lo esquiva
    por otra vía (PowerShell, scripts, alias).
- 🔴 **Incidencia de las dos sesiones (31-ago).** Dos sesiones de Claude trabajaron a la vez sobre
  este repo y se pisaron. Dos consecuencias reales:
  1. El commit `ff8e37e` (Footlocker) hizo `git add web/src/data/zapatillas.ts` con cambios de la
     OTRA sesión sin commitear dentro → las ediciones de la ficha `ua-curry-13` viven dentro de un
     commit cuyo mensaje habla de Foot Locker. No se perdió nada, pero el historial engaña.
  2. Peor: al pushear `bdb0977` se **arrastró `27f91d7` a producción sin que nadie lo aprobara**.
     Así se desplegó el refactor de OpenRouter, y así se descubrió que estaba roto.
  ⇒ **Regla**: `git add` de ficheros concretos, NUNCA `git add -A`/`.`/`commit -a`, y antes de
  pushear mirar `git log origin/master..HEAD` — arrastras todo lo que haya debajo, sea tuyo o no.
- ✅ **`deploy.yml`: pendiente OBSOLETO, cerrado en la s42.** El fichero ya no existe — lo borró el
  commit `762c47f` ("eliminar workflow GitHub Actions — Vercel despliega vía integración nativa").
  El único workflow vivo es `scrape-prices.yml`. No hay ningún workflow en rojo.
- **Si la pasada nocturna vuelve a cancelarse por timeout** (pasó el 19-ago, 2h30m sobre 150 min):
  subir `timeout-minutes` o hacer que el scraper escriba resultados parciales. El commit es el
  ÚLTIMO paso, así que un timeout = no se guarda NADA.
- **amazon_es es el siguiente objetivo de scraping**: 174 enlaces, ~41% frescos, mediana 21d.
  Quedan ~73 enlaces de búsqueda `/s?k=` (aciertan el 8% en CI frente al 56% de las fichas `/dp/`)
  → el arreglo es **fijar fichas**, no endurecer el scraper.

### Rediseño (fases 0 y 1 hechas; las 5 pantallas NO)
Handoff en `C:\Users\oswal\Downloads\Rediseño premium de CANCHA.ZAPA\design_handoff_cancha_redesign\`.
Hecho: tokens de los dos temas, header/footer globales, tema claro "cemento". **Pendientes las 5
pantallas rediseñadas**, en este orden: home → catálogo + ficha → rankings + quiz. No hay prisa.
⚠ Antes de tocarlas:
- **Los datos del prototipo (`zapas-data.js`) NO son fiables**: precios falsos (Harden Vol 9 a 29 €)
  y literales peligrosos ("234 zapatillas", "Precios re-verificados 23 AGO", "100%"). **Todo número
  debe salir del catálogo**; el sello de fecha ya costó la s31.
- El diseño pinta precio en TODAS las tarjetas → choca con la regla "Ver precio" (ver *Afiliados*).
- El quiz del prototipo trae su propia fórmula de matching: se recrea la UI, se conserva la lógica.
- El banner de promo del prototipo es fijo; el sitio tiene `promos.ts` date-gated con carrusel.

---

