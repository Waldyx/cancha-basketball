# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-08-07 (sesión 35)
> Para Claude: lee esto al empezar una sesión nueva. Cubre todo lo importante.

---

## Estado actual (sesión 35) — API de AliExpress + bug de precio en el merge + enlaces muertos

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
duplicadas, rutas que la tienda ya retiró, wrappers de redes que no cubren esa tienda, **destinos
que no son calzado** (añadido el 14-ago) y zapas sin ninguna opción disponible. `RUTAS_MUERTAS`,
`SIN_PROGRAMA` y `NO_ES_CALZADO` quedan escritas dentro **a propósito**: cada una costó una sesión
descubrirla.
- Estado 14-ago: **715 enlaces · 0 anidados · 0 duplicados · 0 mal envueltos · 0 fuera de calzado**,
  y los 4 de ECI como único hallazgo. 2 zapas con enlaces pero ninguno disponible
  (`reebok-answer-iv`, `nb-omn1s`) — correcto, nadie las stockea.

### ▶️ SIGUIENTE PASO (retomar aquí)
1. **El alta de desarrollador de AliExpress está HECHA (7-ago), contestan en 2-3 días.** Cuando
   llegue: secrets `ALIEXPRESS_APP_KEY` / `ALIEXPRESS_APP_SECRET` en GitHub y **pasada solo de
   AliExpress** para ver si la firma va a la primera. Comprobar que el scope **Affiliate** esté
   concedido: si está pendiente, la key existe pero `aliexpress.affiliate.*` da error de permisos
   — NO confundirlo con un bug nuestro.
2. ~~**13-14 ago: reconfirmar la frescura**~~ **HECHO el 14-ago: 49%, se confirma** (ver abajo).
3. **Los 7 `s.click` sin id**: decidir si se resuelven a mano (conserva el listado elegido) o se
   dejan ir por búsqueda de la API (más barato, pero el listado puede cambiar). Todos marca china.

### ✅ CERRADO (14-ago) — adidas Superstar: mostrábamos el precio de unas MALLAS
Era el bug abierto del 9-ago. **La causa real NO era la que decía la nota**, ojo al releerla:
- El scraper de adidas **nunca pide la URL del enlace**: ignora la que le pasa `index.ts` y se
  construye su propia `/search?q=`. Así que lo de "rechazar la página de error 404-con-200" **no
  aplicaba aquí** (sí a Snipes). No había página muerta que rechazar.
- Lo que pasaba: buscando "adidas superstar", la tarjeta más barata que emparejaba era
  **"Mallas cortas deportivas adidas Originals Superstar"** a 50 €. Marca ✔, modelo ✔, precio
  dentro del rango plausible → el scraper la daba por buena, `resolveUrl` **fijaba la URL de las
  mallas** en `precios.json` y la ficha enseñaba 50 € con el botón de compra apuntando a ropa.
  Cada noche encontraba otra colorway de mallas (KT6964 el 10-ago, KT6965 el 14).
- Fix (1) **`matcher.ts`: guardarraíl `NO_ES_CALZADO`** (mallas, camiseta, sudadera, pantalón,
  mochila, gorra, calcetines…), hermano del `OTRO_DEPORTE` de la s34. Aplica a TODAS las tiendas,
  que todas venden ropa con el nombre del modelo. ⚠ **"top" NO puede entrar** (la adidas **Top Ten**
  es una zapatilla del catálogo) y "balón" solo con `\b` (si no, se come "baloncesto"). Hay test.
- Fix (2) **borradas las 2 entradas de mallas de `precios.json`**. La Superstar se queda con el
  enlace editorial `/search?q=superstar` (100 €) + Amazon 85 €, y el "desde" pasa de **50 € falsos
  a 85 € reales**. La pasada de esta noche debería repuntarlo solo a una ficha de verdad.
- Fix (3) **`audit-enlaces.ts` vigila el destino**: nuevo bloque "El destino NO es calzado". El
  matcher impide que vuelva a entrar; esto detecta lo que ya esté escrito en datos.
- ⚠ Revisado el resto de adidas: **los otros 17 enlaces son todos `zapatilla-*` / `d.o.n.-*`**,
  ninguno más apuntaba a ropa.

### ✅ CERRADO (14-ago) — el hueco de los modelos de UNA LETRA (venía de la s34)
La s34 lo dejó anotado como "necesita su propia pasada con cuidado". Hecho.
- `significantWords` tiraba los tokens de 1 carácter, así que **"Dame X" se quedaba en ["dame"]**
  y cualquier Dame emparejaba. Medido antes del fix: **"adidas Dame 9" colaba como Dame X**,
  **"Exhibit B" colaba como Exhibit A** (son dos zapas DISTINTAS del catálogo) y "Kamikaze II"
  como Kamikaze I. Con precio ajeno, que es lo grave.
- No se podía arreglar dejando pasar la letra suelta —lo que frenó a la s34—: la **"x" de las
  colaboraciones** ("Dame 9 x Wale") habría casado con Dame X. La solución es exigir el **PAR
  adyacente** palabra+letra: "dame x" existe en "dame x rojo" y NO en "dame 9 x wale".
- Se acepta también el arábigo ("Dame 10") por si la tienda lo escribe así.
- ⚠ El par se busca **sin unir iniciales** (`normalize(t, false)`): Forum Sport rotula la junior
  como **"Dame X J"** y `unirIniciales` fundiría "x j" → "xj", cargándose el ÚNICO enlace que
  verifica esa zapa. Hay test que lo blinda.
- Modelos afectados (9): Dame X, Dame X GS, Exhibit A, Exhibit B, Kamikaze I, Engine A,
  FUTR X Elite, FUTR X 4, Team Hustle D 12.
- ⚠ **A VIGILAR en la pasada de mañana**: 4 de esos enlaces son de Amazon y **no se pudo
  comprobar su título real** (amazon.es está bloqueado desde el entorno de trabajo, 403 del proxy).
  Si el título no escribe la letra, esos enlaces pasarán a NO verificarse: `reebok-engine-a`,
  `reebok-kamikaze-1`, `ua-futr-x-elite`, `nike-team-hustle-d-12`. Es el lado seguro del fallo
  (precio viejo con fecha vieja, en vez de precio de otra zapatilla), pero **si caen, hay que
  mirar el título en Amazon y decidir**: puede ser que el listado sea de verdad otra generación.

### ✅ CERRADO (14-ago) — 9 zapas mostraban un precio VIEJO que ya no existía
Salió tirando del hilo de la acumulación de colorways en `precios.json`.
- `precios.json` **fusiona**: cada noche que el scraper encuentra otra colorway se queda **una
  entrada más** para la misma tienda (35 grupos tienda+zapa con 2-3 entradas). Cuando el enlace
  editorial no identifica un producto concreto, `elegirScrape` cogía el **mínimo de TODAS**, así
  que ganaba una colorway rancia que ya no se vende.
- Medido: **9 zapas**. `jordan-tatum-4` enseñaba **90,99 € del día 12** cuando nike.es ese mismo
  día daba 129,99. Igual `adidas-harden-vol-10` (75 → 100), `adidas-ae-1` (109,99 → 139,99),
  `nike-air-force-1` (100 → 119,99) en Foot Locker.
- Fix en `mergePrices.ts`: al fallback del más barato **solo se presentan las entradas de la
  verificación más reciente de esa tienda**. El scraper vuelve a buscar cada noche y devuelve la
  más barata que encuentra: si hoy la ha dado a 129,99, la de 90,99 **ya no está**. Entre las de
  la misma pasada sigue ganando la más barata (que es la semántica del sitio). 2 tests nuevos.
- **NO se tocó la escritura** (`output.ts`) a propósito: caducar ahí las entradas superadas
  desharía el arreglo del 9-ago (conservar las que fallaron esta noche, que costó 29 entradas
  perdidas descubrir). Con el arreglo de lectura, las viejas ya no hacen daño y caducan solas a
  los 30 días.

### ✅ CERRADO (14-ago) — Foot Locker verificaba 5 zapatillas EQUIVOCADAS cada noche
El hallazgo más gordo del día, y salió barriendo el catálogo en busca de más casos como el de las
mallas. **Los 5 se habían "verificado" ese mismo día:**
| Zapa | El enlace era |
|---|---|
| Zoom Freak 5 | Nike Zoom **Vomero** 5 (running) |
| HOVR Havoc 5 | UA HOVR **Sonic** 5 mujer (running) |
| All Star Pro BB | Converse **Chuck Taylor** All Star Hi |
| Shox BB4 | Nike Shox **R4** |
| Air Pippen 1 | **Air Jordan 1 Low** (y las 2 noches antes, Air Max Tuned 1 y Air Max 1) |
- **Causa**: `footlocker_es.ts` matchea con `minScore` **0.5** — la MITAD de las palabras del
  modelo—, y esa mitad era la **tecnología compartida**: "zoom", "air", "hovr", "all star". Los 5
  puntuaban exactamente 0.5. El 0.5 estaba puesto por una razón legítima (el catálogo dice "Air
  Zoom G.T. Cut 4" y FL "Nike G.T. Cut 4"), pero abría la puerta a cualquier cosa de la marca.
- **Fix en `matcher.ts`, no en el scraper** (aplica a todas las tiendas y no rompe el caso que el
  0.5 protegía):
  1. **La palabra que IDENTIFICA el modelo es obligatoria** — la última que no es sufijo de versión
     ("Zoom **Freak** 5", "HOVR **Havoc** 5", "Cross Em Up **Speed**"). Es lo que separa la Freak 5
     de la Vomero 5. Se acepta abreviada (Amazon escribe "NXXT **Gen** Ampd" por "Genisus"), con 3
     caracteres mínimo: con 2 pasaría cualquier cosa y hay modelos que se llaman "BB".
  2. **La tecnología del principio y el sufijo de versión NO puntúan** (`air`, `zoom`, `fresh`,
     `foam` / `retro`, `og`, `low`, `high`, `se`, `ep`). Las tiendas los ponen y los quitan.
- **Cazó 4 más en Amazon**, que sí monetizan: `nb-fresh-foam-bb-v3` → **Fresh Foam Arishi**
  (running), `nike-air-max-impact-5` → **Air Max Alpha**, `nike-gt-cut-academy-2` → **Phantom
  Academy** (fútbol), `adidas-cross-em-up-speed` → Cross Em Up **Select** (una palabra de
  diferencia, y a **15,99 €** — un precio así distorsiona el ranking de precio/calidad).
- **Datos**: borradas las 11 entradas erróneas de `precios.json`. Vivían SOLO ahí, y el editorial
  conserva su URL de búsqueda → **no se pierde ninguna opción de compra** y el enlace se auto-repara.
- **Nuevo bloque en `audit-enlaces.ts`**: "La URL no menciona el modelo — REVISAR a mano" (usa
  `faltaPalabraDistintiva`). Es lista de REVISIÓN, no de defectos: hoy salen 25 y la mayoría son
  slugs recortados por la tienda ("adidas Harden JR2506" para la Harden Vol 9). Merece un repaso
  con calma: ahí dentro puede quedar algún caso real.
- Medido que el cambio **no endurece el matcher en general**: sobre los 308 slugs descriptivos del
  catálogo, los no-emparejados bajan de 78 a 76.

### ✅ CERRADO (14-ago) — el SEGMENTO solo se comprobaba en un sentido
Salió repasando la lista de revisión del apartado anterior.
- Que una zapa GS exija el token "gs" ya estaba. **Al revés no**: una ficha JUNIOR colaba como
  adulta, y la junior es **más barata**, así que ganaba el "desde X €". Medido: la ficha ADULTA de
  `adidas-believe-that-1` apuntaba a un listado de Amazon rotulado **"adidas Unisex niños Believe
  Shoes" a 61,94 €**. Es la misma regla que el scraper de adidas aplica desde la s34, subida al
  `matcher` para que valga en TODAS las tiendas. Entrada borrada de `precios.json` (el editorial
  tiene su búsqueda; la opción de Amazon se conserva a 100 €).
- **"infantil" era el único marcador de junior que no reconocíamos** (Atmósfera rotula
  "Believe That 1 J azul infantil"). Ese enlace no emparejaba NUNCA y es el único de esa zapa que
  se puede verificar en esa tienda. Añadido a `PHRASE_SYNONYMS`.
- Efecto neto de TODO lo del matcher de hoy: sobre los slugs del catálogo, los no-emparejados
  **bajan de 78 a 68** — o sea, el matcher rechaza los productos equivocados y a la vez empareja
  MÁS. No es un endurecimiento.

### 🟡 LISTA DE REVISIÓN (necesita Chrome — 23 enlaces)
`npx tsx scripts/audit-enlaces.ts` los saca. **La mayoría son slugs recortados por la tienda y NO
están mal** — comprobado: `adidas-harden-vol-9 → "adidas Harden JR2506"` lleva el código de estilo
real de la Vol 9 (el enlace de Forum Sport de esa misma zapa dice `harden-volume-9-jr2506`).
Zalando nunca pone el modelo en el slug (usa color + código), y las de Decathlon marketplace y
Converse tampoco. **Los que SÍ merecen mirarse con Chrome** (todos de Amazon, todos monetizan):
- `nike-lebron-nxxt-gen` → el enlace es una **NXXT AMPD**, que es otro modelo. Ojo: el catálogo
  tiene además `nike-lebron-nxxt-genisus` y su propio resumen dice que "NXXT Gen se renombró a
  NXXT Genisus" → hay que decidir si son 2 fichas o 3 modelos distintos.
- `lining-wow-12` → slug sin modelo ("Li Ning Profesionales Baloncesto Antideslizantes").
- `puma-mb03` → slug sin modelo ("PUMA Zapatos baloncesto Dorados").
- `fila-mb` → slug sin modelo ("Zapatillas Fashion hombre negro Orange").
- `ua-curry-12-gs` → sigue el caso de la s33 (apunta a "Curry 12 Dub Nation", sin marca de junior).
⚠ **No se pudo verificar ninguno**: en el entorno de trabajo remoto la política de red BLOQUEA
todas las tiendas (amazon, decathlon, adidas, ECI, footlocker, atmósfera, fuikaomar, aliexpress
dan 403 en el proxy). Solo hay salida a GitHub/npm. Para verificar enlaces hace falta Chrome local.

### 📊 Frescura RECONFIRMADA con una semana (14-ago)
**394 enlaces · 192 frescos (49%)**, contra el 51% de la noche del 7 y el 29% de la s32. O sea:
**la mejora de las s33-s35 es real**, no era la variación que engañó en la s33.
| Tienda | s32 | 7-ago | 14-ago | Mediana |
|---|---|---|---|---|
| amazon_es | 29% | 41% | **42%** | 13d (era 46d) |
| aliexpress | 6% | 15% | **17%** | 52d |
| elcorteingles_es | 74% | 71% | **50%** | 6d |
| decathlon | 81% | 72% | **66%** | 1d |
| fuikaomar_es | 0% | 77% | **77%** | 1d |
| adidas_es | 41% | 44% | **33%** | 75d |
| atmosfera_sport | 4% | 93% | **93%** | 3d |
| forumsport_es | 1 | 69% | **77%** | 1d |
| snipes_eu | 0% | 57% | **60%** | 1d |
Las 4 tiendas nuevas de s33/s34 aguantan arriba. **AliExpress sigue muerto** (espera la API) y
**adidas baja al 33%** por las 15 búsquedas `/search?q=` que nunca emparejan (ver abajo).
Scraper: 6 noches seguidas en verde, ~1h35m de los 150 min.

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
- ~~**Hueco LATENTE del matcher con los modelos de una sola letra**~~ **ARREGLADO el 14-ago**
  (ver el bloque de la sesión 36 arriba): no se resolvió haciendo valer la "x" suelta —eso sí
  habría roto "Dame 9 x Wale"— sino exigiendo el PAR adyacente "dame x".
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
- **PENDIENTES de aprobación (5) — al 2026-06-29**:
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
