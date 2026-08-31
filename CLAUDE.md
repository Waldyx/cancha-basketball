# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-08-30 (sesión 41)
> Para Claude: lee esto al empezar una sesión nueva. **Solo contiene lo vivo**: estado, reglas,
> doctrina, afiliados, arquitectura y pendientes.
>
> 📚 El histórico completo de las sesiones 17→38 (diagnósticos, bugs cerrados, decisiones ya
> aplicadas) está archivado en **`docs/historial-sesiones.md`**. No se carga por defecto:
> ábrelo solo si necesitas el detalle de una sesión concreta.

---

## ¿Qué es esto?

Web de catálogo y recomendación de zapatillas de baloncesto para el mercado español.
Stack: **Astro + TypeScript + Tailwind CSS**, desplegado en **Vercel**.

| | |
|---|---|
| Repo | `C:\Users\oswal\Desktop\AI\Proyectos\Basketball Shoe Tracker` |
| Web (código) | `…\Basketball Shoe Tracker\web` |
| Dev server | `localhost:4321` (⚠ ver aviso de verificación en *Diseño y front*) |
| Producción | `https://canchazapa.com` ✅ LIVE (apex sin-www es el dominio PRIMARIO en Vercel) |
| Deploy | auto en cada push a `master` (integración Git de Vercel) |
| Tamaño | **240 zapas · 342 páginas · 236 tests · `astro check` 0 errores** |

**Nombre/logo**: `CANCHA<span class="text-orange-500">.</span>ZAPA` — blanco, punto naranja, blanco.

---

## Reglas de edición (para Claude)

1. **Cambios quirúrgicos**: edita SOLO lo que pide la tarea. No "mejores" código, comentarios ni
   formato no relacionados. No refactorices lo que funciona. Respeta el estilo existente.
   En `zapatillas.ts`, edita haciendo match del `id:`/código, **NUNCA de las líneas de comentario**
   (llevan box-drawing chars que rompen el match).
2. **Simplicidad**: el mínimo código que resuelve lo pedido. Sin features especulativas.
3. **Piensa antes**: si algo es ambiguo, di tus suposiciones y pregunta. Propón la alternativa
   más simple antes de lanzarte.
4. **Objetivos verificables**: convierte tareas vagas en criterios comprobables ("el scraper saca
   un precio > 0") e itera hasta cumplirlos.

---

## ▶️ Estado actual (sesión 41, 29-ago) — Sesión de PANELES: los números reales, por fin

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
| Joker 2 (y "Denver" Alto) | **150 €** | 119 € estimados por conversión → **CORREGIDO** |
| Joker 1 | **140 €** | 119 € |
| ZEN 7 | **120 €** | 90 € (y la API de AliExpress decía 156,99 €) |
| Big3 4.0 Quick | **124 €** | — |

⚠ **Ojo, el precio NO es final**: *"361Sport.com no es responsable de los impuestos de importación"*
→ envía desde fuera de la UE sin IOSS aparente, así que el cliente paga IVA (21%) + gestión al
recibir. Unos 150 € de tarifa salen por ~185 € reales. **Por eso AliExpress (IVA incluido y
afiliado al 7%) sigue siendo la mejor opción de compra**, no un mal menor.

**▶️ DECIDIR**: meter `361sport` como `Tienda` nueva. No le conocemos programa de afiliados, así
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
- ⏳ **Pendientes (3)**: Sneakin ES, Reebok ES, Joom ES. Siguen sin resolver. Pro:Direct ES ya no
  figura como pendiente.
- ❌ **Rechazados (7)**: Sprinter, Foot-Store, Basket-Center, size?Official, Foot Locker, JD Sports,
  Privé by Zalando — **los 7 tienen el botón "+ Unirse" activo**, o sea que se pueden volver a
  solicitar. Los rechazos fueron en jun-2026, ya pasaron los 3 meses. **Decisión del usuario.**

### Datos / catálogo
- ✅ **Curry 13 es la ÚLTIMA de Under Armour — CERRADO en la s42 (31-ago).** Curry y UA rompieron
  el 13-nov-2025; la Curry 13 (feb-2026) es el cierre pactado, con colorways hasta oct-2026. Curry
  Brand es independiente y él es agente libre de calzado. Re-verificado antes de tocar (ESPN, SI,
  Yahoo, NBC). Corregidas las 4 afirmaciones que lo daban por vivo **en presente**: `seoPages`
  marca UA ("Under Armour es la marca de Steph Curry" + "Curry Brand (filial de UA)"), `seoPages`
  marca Nike ("Curry no, Curry es UA") y el análisis `ua-curry-13-analisis-2025` ("UA lleva desde
  2013 construyendo…"). La ficha pasa a `año_lanzamiento: 2026` (salió en feb-2026, no en 2025) y
  el análisis gana una sección de contexto con lo que el fin de línea significa al comprar.
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
- `361-zen-7`: **156,99 € (API AliExpress) vs 90 € (catálogo)**. ¿Cuál es el bueno? (s36)
  → **Dato nuevo (s39)**: la tarifa oficial en `361sport.com/es-es` es **120 €**. Ninguno de los dos
  la clava, pero deja el 90 € del catálogo como el sospechoso (por debajo de tarifa) más que el 156,99.
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
- La forma del body es la que mandan los docs (ejemplo `fetch` de *Model Fallbacks*: `models` como
  array y SIN `model`), así que **la causa está sin identificar**. Hipótesis no comprobadas: un tope
  no documentado de entradas (la API de Anthropic acepta 3 como mucho y nosotros mandamos 5), o que
  los `:free` no valgan en `models`. **No se puede reproducir en local**: no hay clave.
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

## 📌 Doctrina — aprendizajes que siguen aplicando

Destilado de las sesiones 26-38. Cada línea costó al menos una sesión.

### Verificar antes de concluir
- **Contar sobre el fichero fuente cuando hay una capa de merge da un número FALSO.** "142 de 177
  enlaces de Amazon son búsquedas" salió de `grep` sobre `zapatillas.ts`; el número que ve el
  usuario es 87, porque `mergePrices` sustituye la URL en runtime. Medir siempre sobre el dato
  ya compuesto (importar `zapatillas`), no sobre el texto del que sale.
- **Un código de error DEDUCIDO no es un código de error MEDIDO.** La s40 concluyó "403 = permiso
  vetado" razonando desde fuera; el panel de OpenRouter no tenía ni un 403, tenía 429 por modelo.
  Media sesión de hipótesis que se resuelve en un minuto **mirando el panel del proveedor**. Antes
  de teorizar sobre un tercero, abrir su panel: casi todos tienen un log de peticiones.
- **Una hipótesis elegante que el tooltip desmiente, se tira.** "El toggle de publish-prompts veta
  los modelos" encajaba perfecto hasta que el proveedor puso *"Private: does not train on prompts"*.
  Encajar no es ser cierto.
- **Antes de leer un gráfico de panel, comprobar qué barra es qué periodo.** El dashboard de Awin
  daba "982 clics" en agosto; el informe por anunciante daba 9. La barra grande era JULIO. Un dato
  mal leído del panel iba camino de convertirse en un diagnóstico entero al revés.
- **Un pico de tráfico sin ventas es sospechoso de ser tuyo.** 942 clics a Decathlon en julio y 1
  en agosto no era estacionalidad: era el propio scraper antes del fix del 28-jul.
- **"Ese modelo no existe" es una foto con fecha, no un hecho permanente.** El veredicto de la s26
  sobre la AE 3 era correcto y caducó en 8 meses. Antes de reusar una nota de "fantasma", mirar
  cuándo se escribió.
- **Re-verificar antes de borrar salva datos.** De 15 enlaces de adidas dados por muertos, 2 estaban
  vivos. **Un 403 no es un enlace muerto**, es un anti-bot; solo un 404 real justifica borrar.
- **Un enlace que responde 200 puede ser una 404**: Snipes y adidas sirven su página de error con
  status 200. Comprobar el CONTENIDO (que exista `Product` en el JSON-LD), nunca el status.
- **Verificar la disponibilidad en ES, no deducirla del lanzamiento global.** La AJ 41 lleva desde
  julio en el mercado y no está ni en Nike ES ni en Amazon ES.
- **Un resultado no vacío no es un resultado correcto**: "air jordan 41" en Amazon devuelve AJ1 y
  AJ4 sueltas.
- **Antes de dar por bueno un fallo de scraping, separar agotado / no-match / enlace muerto.**
  De 15 "fallos" de Snipes, 7 eran agotados correctos, 4 matcher y 4 enlaces muertos.
- **No celebrar una mejora con una sola noche de datos.** AliExpress 3→11 parecía éxito y era ruido
  (volvió a 5). Confirmar con una semana.
- **Al leer un % de frescura, mirar también el número de enlaces**: quitar enlaces sube el % sin
  verificar nada nuevo.

### Scraper y matcher
- **Nunca scrapear un enlace de afiliado**: no devuelve el HTML de la tienda y genera un CLICK
  FALSO que hunde el EPC. `unwrapAffiliateUrl()` antes de navegar; el merge reaplica el wrapper.
- **Una protección en una capa no protege si la capa de abajo hace lo contrario.** La API evitaba el
  click falso devolviendo null, y ese null mandaba al navegador a hacerlo.
- **Un guard que impide navegar también impide RE-verificar.** Al prohibir una forma de URL, mirar
  quién la ESCRIBE, no solo quién la lee: nuestro propio merge la estaba escribiendo.
- **Al escribir un guard por HOST, distinguir el host del wrapper del host de la tienda.**
  `deals.fuikaomar.es` (wrapper) vs `www.fuikaomar.es` (tienda) — un regex de dominio entero
  congeló 30 enlaces.
- **Emparejar SIEMPRE contra el título del producto, nunca contra el bloque que lo rodea.** La
  tarjeta de resultado lleva precio, valoración y talla: para un modelo que se llama por un número,
  cualquier "40,00 €" lo validaba (26% de falsos positivos en Amazon). La tarjeta PROPONE, la ficha
  DECIDE.
- **Validar SIEMPRE de qué contenedor sale el precio.** En la ficha de adidas hay 53
  `[data-testid="main-price"]` y TODOS son del carrusel de recomendados (misma trampa que Snipes).
- **Quedarse siempre con el objeto JSON-LD de PRIMER nivel**: el producto anida otros con sus
  propios precios (`isSimilarTo`, `hasVariant`).
- **Un buscador puede responder con una FICHA** cuando hay un único resultado. Si el scraper solo
  sabe leer listados, el caso más inequívoco es justo el que falla.
- **Coger "el primero que empareja" es una decisión de precio disfrazada.** Con 10 colorways de 70 a
  130 €, en un comparador toca **el más barato**.
- **El buscador de cada tienda habla su idioma comercial**, no el del catálogo: adidas no entiende
  "gs" ni "ae 1". Si una búsqueda da 0 resultados para algo que la tienda vende, sospechar de la
  consulta.
- **Un parámetro de búsqueda equivocado no da error: da el catálogo ENTERO.** `footlocker.es/es/search?q=puma+mb+06`
  devolvía "Mostrando 8177 resultados" (el sitio entero) porque Foot Locker usa **`?query=`**, no
  `?q=`. 22 enlaces del catálogo llevaban así desde siempre, mandando al usuario a un listado
  gigante en vez de a su modelo. El número de resultados es el chivato más fiable; el título de la
  página también cambia con el parámetro bueno ("puma mb | Foot Locker Spain").
- **Un filtro defensivo puede volverse un muro**: "descarta lo junior" hacía imposibles las GS.
  Comparar con el segmento que se BUSCA, no aplicar a ciegas.
- **Un invariante que compara el sistema consigo mismo no ve los sesgos compartidos.** El símbolo `°`
  de "361°" estaba en los dos lados del test; ninguna tienda lo escribe.
- **Un fix del matcher puede abrir un agujero nuevo** (el de las siglas coló una zapatilla de
  fútbol). Medir SIEMPRE contra fichas reales, no solo correr los tests.
- **Un header inyectado "inofensivo" es deuda de fingerprint.** El `Accept-Language` por CDP convivió
  meses con Akamai hasta que empezó a dar 403. Si el navegador stealth ya emite el header nativo
  (`locale`), NO sobreescribirlo.
- **"Funciona en local, falla en CI" no siempre es la IP.** Comprobarlo con una pasada local completa
  antes de perseguir esa hipótesis. La bisección de opciones de contexto es barata y concluyente.
- **Un fallo silencioso y uno ruidoso piden arreglos opuestos.** Hasta que el log no distinguió
  "8 de la API, 0 emparejan" / "0 de la API" / "ApiCallLimit", los tres eran "no encontrado".
- **Muchos `$eval` por tarjeta = fallos intermitentes** si la página re-renderiza. Leer todo en un
  `$$eval`.
- **En `page.evaluate` con tsx/esbuild**, las funciones con nombre revientan con `__name is not
  defined`: pasar el snippet **como string**. Y ojo con `\s` dentro de un template literal (colapsa
  a `s` y borra todas las eses).
- **Un scraper "que corre" no es un scraper que funciona**: mirar los commits del `price-bot` y las
  fechas de `ultima_verificacion`, no que el workflow salga verde.

### Servicios externos y free tiers
- **Que el body sea el de los docs NO garantiza que el proveedor lo acepte.** El ejemplo `fetch` de
  *Model Fallbacks* manda `models` como array y sin `model`; copiado tal cual, OpenRouter devolvió
  **400** en producción (31-ago). Los docs describen el caso feliz: la única prueba es una petición
  real. Corolario: **al sustituir un mecanismo propio y probado por uno del proveedor, se conserva
  el viejo detrás** hasta haber medido el nuevo contra producción — si no, el día que el proveedor
  diga que no, te quedas sin las dos cosas.
- **Un 200 con el cuerpo vacío no es un éxito.** Los modelos de RAZONAMIENTO se gastan los
  `max_tokens` pensando y devuelven `message.content` vacío con el texto en `message.reasoning`.
  Si el código trata "200" como "ya está", se sirve una respuesta en blanco. Validar el CONTENIDO,
  no el status — la misma trampa que los 200 de Snipes/adidas sirviendo una 404.
- **Antes de programar un fallback a mano, mirar si el proveedor ya lo ofrece.** La cadena de
  modelos de `chat.ts` (bucle, presupuesto de tiempo, enfriamiento, 5 peticiones HTTP) replica algo
  que OpenRouter da con un parámetro: `models: [...]`. Costó varias sesiones de tuning. Leer los
  docs de routing del proveedor antes de escribir el bucle.
- **El 429 de un free tier puede ser POR MODELO, no por cuenta.** La doctrina previa daba por hecho
  que el tope de OpenRouter era de cuenta y compartido, así que "la cadena no lo esquiva". Falso:
  medido el 29-ago, tres modelos daban 429 y un cuarto devolvía 200 en la misma petición. Si un
  eslabón responde mientras otros rebotan, el límite NO es de cuenta → **la cadena sí sirve, y el
  ORDEN importa mucho**: los eslabones muertos de delante se cobran una llamada upstream cada uno.
- **Ordenar la cadena por calidad ESTIMADA en vez de por éxito MEDIDO sale caro.** Los dos gemma
  iban primeros por "validados en jun-2026" y llevaban meses devolviendo 429: 3 llamadas
  desperdiciadas por petición. El orden lo decide el log del proveedor, no el recuerdo.
- **Un catálogo de modelos gratis CADUCA.** La cadena de OpenRouter se validó en vivo en jun-2026 y
  en ago-2026 tenía 3 de 5 modelos retirados, con el chat entero caído. Que un modelo funcionara
  hace tres meses no dice nada de hoy: `curl -s https://openrouter.ai/api/v1/models | grep ':free'`.
- ⚠ **[CORREGIDO en la s41 — leer con la entrada de arriba]** "Diversificar por PROVEEDOR no
  esquiva el tope de la CUENTA": se escribió sin medir y es falso en el caso general. OpenRouter
  SÍ tiene un tope de cuenta para los `:free` (50/día sin créditos) y cuando ESE se agota rebotan
  los 5 eslabones a la vez, pero eso no es lo que estaba pasando: el 429 habitual es por modelo y
  la cadena sí lo esquiva. Distinguir los dos casos mirando si ALGÚN eslabón devuelve 200.
- **Distinguir SIEMPRE 401 / 402 / 403 / 429.** Meterlos en un saco de "error de auth" manda a
  regenerar una clave que está perfectamente viva. 401 = clave muerta · 402 = sin saldo ·
  403 = permiso vetado a ESE modelo · 429 = cuota. Solo el 401 justifica tocar la clave.
- **Un fallo instantáneo y uno lento piden arreglos OPUESTOS.** 5 modelos fallando en 0,6s = los
  rechazan. Uno fallando en 11s = se atasca. Al segundo hay que darle MÁS tiempo, no menos:
  repartir el presupuesto a partes iguales asfixiaba al único que respondía.
- **Un 502 opaco cuesta una sesión entera.** Si una función depende de un tercero, que diga POR QUÉ
  falló en la propia respuesta (códigos HTTP, nada sensible). Los logs de Vercel no se miran.
- **Ante un tercero que se cae, la red de seguridad es no depender de él.** El fallback local del
  chat responde con el catálogo que ya está en memoria, sin gastar cuota. Lo que se puede calcular
  en local no debería morir porque un free tier se agote.
- **Medir contra producción consume la cuota que estás midiendo.** Cada petición de prueba dispara
  hasta 5 llamadas; con un tope de 50/día, un rato de diagnóstico lo agota y contamina la siguiente
  medición. Sondear poco y espaciado.

### Datos y precios
- **`precios.json` FUSIONA, no reescribe**, y además **pisa** al editorial (misma tienda) o
  **reañade** la tienda. Al revisar una zapa, mirar SIEMPRE las dos fuentes. Una entrada rancia no
  caduca sola nunca.
- **Antes de borrar un dato, mirar SI VIVE EN OTRO SITIO.** Los 4 de Snipes se borraron porque el
  editorial ya los tenía; los 14 de Basketball Emotion NO, porque 11 solo existían en `precios.json`
  y borrarlos habría quitado la opción de compra.
- **Indexar por tienda asume una tienda = un producto.** Es falso en marketplaces: la clave del
  merge es el **PRODUCTO** (host+ruta sin wrapper ni query); si no se identifica, el **más barato**.
- **Un precio "fresco" puede venir de una URL que no es de ningún producto** (3 Asics compartían un
  `s.click` que apuntaba a la home promocional de AliExpress y daba 3 precios distintos).
- **Al borrar una ficha quedan restos en tres sitios**: el comentario de sección en `zapatillas.ts`,
  la imagen en `public/shoes/` y las MENCIONES en el texto de otras fichas. Los tres sobreviven años.
- **`web/api/_catalog.json` se regenera en cada build local (prebuild) → sale como modificado.
  NO commitear**: trae churn de precios ajeno al cambio. Vercel lo regenera.
- **Regla de disponibilidad**: `disponible: false` solo afecta al botón de compra en la ficha
  individual. **NUNCA** debe excluir una zapa de rankings, editor's pick ni catálogo.

### SEO y marcado estructurado
- **Nuestro score NO es una valoración de usuarios.** Las fichas emitían `AggregateRating` con
  `ratingCount: z.fuentes.length` — el nº de FUENTES consultadas, no de valoraciones. Con 201 de
  240 fichas declarando `ratingCount: 1` y 118 con score de evaluación propia, era una opinión
  editorial disfrazada de agregado. Corregido a `Review` con `author: Organization CANCHA.ZAPA`
  (commit `0c8b611`, 29-ago).
- **La regla de las reseñas "auto-servidas" prohíbe reseñarte A TI MISMO**, no reseñar productos
  de terceros. Un medio analizando una zapatilla es crítica editorial y sí puede marcarse; lo que
  Google dejó de mostrar en 2019 son las estrellas que una web se pone a sí misma
  (`Organization`/`LocalBusiness`).
- **Google prohíbe agregar valoraciones de otras webs** en el marcado. Nuestro score sale de
  WearTesters / RunRepeat / HoopsGeek → no puede ir como `aggregateRating` nunca.
- **No habrá reseñas de usuarios en Google.** `Google Business Profile` exige contacto cara a cara
  con clientes y excluye explícitamente blogs, sitios de afiliados y webs informativas. Si algún
  día se quieren opiniones, tiene que ser un sistema propio (necesita BD + moderación); con poco
  tráfico una ficha con "0 opiniones" resta más que suma.
- ⚠ Google endureció el "Review snippet" el **24-jul-2026**. Antes de tocar marcado de reseñas,
  releer las guías: cambian.

### Front y verificación visual
- **El dev server y el service worker MIENTEN al verificar CSS.** El SW sirve el CSS viejo
  cache-first y el dev server resuelve mal los estilos con scope de Astro. Verificar contra
  `astro preview` del build y desregistrar el SW (`cz-cache-v*`). El SW se registra **por origen**:
  limpiar el de :4321 no limpia el de :4322.
- **`getComputedStyle` a través del puente del navegador puede devolver valores obsoletos.** Ante la
  duda, **la captura manda sobre el DOM**.
- **Si el fondo es un vídeo o una imagen, MÍDELO, no supongas el peor caso.** Muestrear fotogramas a
  un canvas dio mediana 86 de luminancia; el panel podía ser 3× más transparente de lo estimado.
- **Un token que funciona "por casualidad" se rompe al añadir un tema.** Los tokens deben nombrar el
  PAPEL (`--cz-ink`), no el valor.
- **Un color de marca tiene dos usos con reglas opuestas**: como relleno es igual en los dos temas;
  como TEXTO necesita versión propia (el naranja sobre cemento da 1,88:1).
- **Aplicar el umbral WCAG correcto**: 4,5:1 texto normal, **3:1 texto grande** (≥24px, o ≥18,66px
  en negrita).
- **Un componente puede traer su propia familia de tokens dentro** (`--chat-*`). Al barrer para un
  tema nuevo, buscar `--[a-z]+-`, no solo `--cz-`.
- **Un asset puede traer su propio tema dentro** (`bg-court.svg` lleva un degradado oscuro): hay que
  invertirlo con `filter` en un elemento que no arrastre a sus hermanos.
- **Cambiar el tamaño de un contenedor cambia en silencio a los hijos que dependen de él en %.**
  Desacoplar (`62vw`) es mejor que corregir el valor.
- **Para imágenes de producto, la portada del artículo NO sirve**: son banners con marca de agua o
  collages. Las buenas están en los artículos de **colorway individual** y en `static.nike.com`.
  Hay que MIRARLAS una a una (de 7 descargadas, 3 eran inservibles).

---

## Afiliados

### Estrategia "Ver precio" (s28) — IMPORTANTE
Solo mostramos **precio numérico** donde monetizamos. Las tiendas rechazadas/sin programa muestran
**"Ver precio en [tienda]"** sin número (no mantenemos un precio que se pudre). El "desde X€" sale
de tiendas afiliadas/pendientes; si no hay ninguna disponible, MSRP oficial.
- Helpers en `scoring.ts`: `mostramosPrecio(link)` y `findMejorPrecioMostrado(links)`.
  `TIENDAS_PENDIENTES` (joom, reebok_es…) también muestran precio.
- Aplicado en DISPLAY, **no** en la lógica de orden/filtro: el orden del catálogo y el editor's pick
  siguen usando `findMejorPrecio` (precio real más barato).
- Para volver a mostrar el precio de una tienda: activar su afiliado o meterla en `TIENDAS_PENDIENTES`.

### Amazon ✅ — ID `canchazapa-21`
`https://www.amazon.es/…?tag=canchazapa-21` · Panel: afiliados.amazon.es · Comisión 3%.

### Awin ✅ — Publisher ID `2908587`
**Wrapper**: `https://www.awin1.com/cread.php?awinmid=AID&awinaffid=2908587&ued=URL_ENCODED`

| Programa | AID | Nota |
|---|---|---|
| adidas ES | 77008 | |
| AliExpress ES | 11640 | preferido sobre Portals (cookie 30 d) |
| Forum Sport ES | 23805 | ⚠ catálogo de básquet FINO, solo gama media/budget. NO añadir search-links |
| Decathlon ES | 105405 | |
| Atmósfera Sport ES | 26255 | |
| Snipes EU | 122628 | |
| El Corte Inglés ES | 13075 | 🔥 EPC €13.99, comisión 6%. NO permite Cashback |

**⏳ Pendientes**: Joom ES (desbloquea 19 links ya en BD), Sneakin ES, Pro:Direct ES, Reebok ES (5 links).
**❌ Rechazados** (reintentar en 3-6 meses): Foot Locker, JD Sports, Sprinter, Foot-Store,
size?Official, Privé by Zalando, Basket-Center. ⚠ Zalando (27 links) y size? (1) pasaron de
pendientes a rechazados → son peso muerto, tratar como "Ver precio".

**🔑 Navegar ECI con Claude-in-Chrome**: ECI mete un bucle de "Challenge Validation" si navegas
DIRECTO a una búsqueda o ficha sin sesión. Solución: **1º la home** `https://www.elcorteingles.es/`
(crea cookies), **2º ya funcionan** las búsquedas (`/search-nwx/?s=QUERY`) y las fichas.
⚠ `get_page_text` en el grid solo devuelve el 1er producto (lazy-load) → leer por screenshots.
⚠ La ruta vieja `/deportes/buscar/?term=` **ya no existe**, y su buscador **ignora el modelo**.

### TradeTracker ✅ — User ID `334982`
- ✅ **FuikaOmar** #37834, 5% → `https://deals.fuikaomar.es/c?c=37834&m=12&a=511170&r=&u=URL_ENCODED`
- ✅ Fútbol Emotion #35939, 3.5% — ⚠ SOLO `futbolemotion.com`. NO cubre baloncesto.
- ⛔ **Basketball Emotion NO tiene programa de afiliados** (confirmado por ticket, 16-jun-2026).
  Los ~23 enlaces `basketballemotion_es` van como **URL directa con `tiene_afiliado:false`**.
  **NO volver a perseguir esto** ni a envolverlos en `tc.tradetracker.net`.

### AliExpress Portals ✅ — Tracking ID `default`
- **Marcas chinas** (Anta, Li-Ning, Peak, Way of Wade, 361°, Rigorer): SIEMPRE permitido.
- **Marcas occidentales** (Nike/Jordan/adidas): **SOLO con el sello `Marcas+ Verificado`** (canal
  autenticado POIZON/Dewu, el SKU debe coincidir). NUNCA un listado Nike/Jordan suelto: son réplicas.
- **Y solo si su precio ≤ MSRP / precio mostrado actual** (si no, empeora el "desde X€").
- ⚠ **NO usar AliExpress para RETROS hiper-demandados**: las legítimas salen más caras que Amazon y
  las sospechosamente baratas (AJ4 a 85 €) son réplicas aunque pongan Marcas+.
- Búsqueda: `es.aliexpress.com/w/wholesale-QUERY.html?SortType=price_asc`.

### CJ — Publisher 7969834
❌ Puma EU (#5569379) rechazado (2026-06). Hay **11 links `puma_es`** esperando.

### Comisiones (`COMISIONES_TIENDA` en `scoring.ts`)
```
aliexpress: 7%   decathlon: 6%   elcorteingles_es: 6%   puma_es: 6%   reebok_es: 6%
snipes_eu: 5%    fuikaomar_es: 5%   ua_es/nb_es/nike_es/adidas_es/jd_sports_es: 5%
zalando_es/sprinter_es/basket_world/kickscrew: 5%
footlocker_es/basket4ballers_es/manelsanchez_es: 4%    amazon_es: 3%    idealo_es: 0%
```
Ordenación: **precio primero**, desempate por comisión dentro de ±0,50 €.

---

## Arquitectura de datos

- **`web/src/data/zapatillas.ts`** — array `_rawZapatillas` con las 238 zapas. Exporta `zapatillas`,
  `getZapatillaBySlug()`, `getAllZapatillas()`. `mergePricesIntoShoes()` fusiona los precios del
  scraper.
- **`web/src/data/precios.json`** — salida del scraper (CRLF). ⚠ Ver doctrina: fusiona y pisa.
  Para borrar entradas: script node por rango de líneas respetando CRLF (**NO** round-trip
  `JSON.stringify`, reformatea todo el archivo).
- **`web/src/data/score-fuentes.json`** — anclas de score por fuente externa (120 zapas).
- **`web/src/data/promos.ts`** — promos date-gated (activación **en cliente**, la web es estática).
  `?promo=preview` fuerza mostrarlas. Banner superior en carrusel (rota cada 5 s) + aviso contextual
  en ficha **solo si la promo tiene código**.
- **`web/src/lib/types.ts`** — `Zapatilla`, `LinkCompra`, `Tienda`, `RespuestasQuiz`.
- **`web/src/lib/scoring.ts`** — comisiones, `mostramosPrecio`, `findMejorPrecio*`,
  `fechaVerificacionMasReciente()` (el sello "Precios re-verificados X" sale de la verificación real
  más reciente, **nunca** de `new Date()`).
- **`web/api/_catalog.json`** — catálogo compacto para el chat, generado por `gen-chat-catalog` en
  `prebuild`. **No commitear.**

### Metodología de SCORES (regla del usuario)
- **WT-verificado** 🟢: contrastar con WearTesters / RunRepeat / TheHoopsGeek.
- **Estimación editorial** 🟡: budget/team/nicho/chinas/GS sin review → `fuentes: evaluacion-propia`,
  fundamentada en specs oficiales. Las GS heredan el score del adulto (ya WT-calibrado).
- SIEMPRE avisar al usuario del estado del score al crear ficha nueva.
- Verificar SIEMPRE modelo + generación exactos antes de meter un enlace (Curry 12 ≠ 13 ≠ GS).
- ⚠ `scoreFuentes` no tiene clave `wt` numérica: una zapa con review de WearTesters pero sin
  HoopsGeek se registra como `editorial` + `wt_url`. El score sale bien, la etiqueta de confianza se
  queda corta. Si molesta, es 1 rama en `scoreFuentes.ts`.

---

## Scraper de precios

- Workflow `.github/workflows/scrape-prices.yml`, nocturno, `timeout-minutes: 150` (~1h20-1h40).
- Módulos por tienda en `stores/`: amazon_es, aliexpress (+`aliexpress_api.ts`), adidas_es,
  elcorteingles_es, decathlon, fuikaomar_es, atmosfera_sport, snipes_eu, forumsport_es.
  **Ya no queda ninguna tienda afiliada sin scraper.**
- **API de AliExpress**: gateway `https://api-sg.aliexpress.com/sync`, firma **sha256** (hex
  mayúsculas), siempre POST. Secrets `ALIEXPRESS_APP_KEY` / `ALIEXPRESS_APP_SECRET` en GitHub.
  ⚠ Si se añade otra credencial, acordarse de exportarla en el paso "Ejecutar scraper" del workflow.
- `matcher.ts` centraliza: romanos→arábigos, sinónimos (junior/jr/grade school→gs, niño/niña/kids→gs,
  Volume→vol, Anthony Edwards→ae), siglas punteadas ("g t"→"gt"), `°`→espacio, `NO_ES_CALZADO`/
  `esPrenda()`, guardarraíl de otros deportes (⚠ **"tenis" NO puede entrar**: en español de América
  es como se llaman las zapatillas), `unwrapAffiliateUrl()`, `esRedirectOpaco()`.
- Herramientas: `scripts/audit-frescura.ts` (frescura por tienda), `scripts/audit-enlaces.ts`
  (wrappers anidados, duplicados, rutas muertas, zapas sin opción disponible — **no pide ni una
  página**), `scripts/audit-affiliates.ts`, `scripts/review-by-score.ts`.
- **Hueco LATENTE del matcher**: en "Dame X GS" la "X" se descarta por tener 1 carácter, así que el
  modelo no exige generación. Hacer que valga rompería los títulos con "x" de colaboración
  ("Dame 9 x Wale"). Necesita su propia pasada.

---

## Páginas y contenido

| Página | Ruta |
|---|---|
| Home · Catálogo · Quiz (10 pasos) · Resultados | `/` `/zapatillas` `/quiz` `/resultados` |
| Ficha | `/zapatilla/[slug]` (JSON-LD Product completo) |
| Comparador · Rankings (8 categorías) · Mis zapas | `/comparar` `/rankings` `/mis-zapas` |
| Calculadora coste/partido · Estadísticas personales | `/calculadora` `/estadisticas` |
| Blog (31 artículos) · SEO pages (34) · Accesorios | `/blog` `/blog/[slug]` · `/balones` |
| FAQ (43) · Metodología · Financiación · Privacidad · Guía de tallas · 404 | |

**Nav**: `Quiz | Comparar | Rankings | Catálogo | Calculadora | Stats | Accesorios | Blog | ♥ Mis zapas`
(lo pone `Header.astro` desde `Base.astro`; el activo sale de `Astro.url.pathname`).
**Footer global**: FAQ | Metodología | Financiación | Privacidad.

### Quiz — 10 pasos
perfil · posición · peso · estilo · cancha · lesiones (multi, auto-avance 700 ms) · prioridad ·
presupuesto · ancho de pie · uso (auto-submit 400 ms).

### Serverless (`web/api/`, ESM puro, SIN bundling)
⚠ **Los imports deben llevar extensión** o revientan con `ERR_MODULE_NOT_FOUND`. Las funciones son
**autocontenidas**: no importan el catálogo, leen `_catalog.json`.
- `chat.ts` — asistente IA. Cadena gratuita de OpenRouter (mejor→peor), enviada ENTERA en el
  parámetro `models` de UNA sola petición (s42, ver *IA del chat*): `minimax/minimax-m2.7:free` →
  `google/gemma-4-31b-it:free` → `google/gemma-4-26b-a4b-it:free` → `z-ai/glm-5.2:free` →
  `thinkingmachines/inkling-small:free`. Presupuesto 25 s para la petición completa.
  `OPENROUTER_API_KEY` en Vercel, **NUNCA en el repo**. ⚠ `deepseek-v4-flash:free` NO existe (404).
- `coach.ts` — agente de estadísticas (misma cadena, mismo `models`).
- `feb.ts` — importador de actas FEB: saca el JWT de `#_ctl0_token` y llama a
  `https://intrafeb.feb.es/LiveStats.API/api/v1/BoxScore/{id}`.
  ⛔ **FCBQ/Cataluña NO es accesible**: `basquetcatala.cat` protege toda la web con reCAPTCHA y su
  Open Data es de pago. La vía legítima es el **importador por pegado**, ya hecho. NO reintentar.
- ⚠ El service worker hace **bypass de `/api/`** (antes cacheaba los GET para siempre).

---

## Diseño y front

- **Colores**: naranja `#f97316`, amarillo `#facc15`. Tipografía **Barlow Condensed** bold/black
  uppercase. Estética **cuadrada** (sin border-radius).
- **Dos temas por tokens** en `styles/global.css`: rampa oscura (`#0c0c0c`) y clara "cemento".
  Canales sueltos `--cz-*-rgb` para los ~300 `rgba()`. El tema se aplica **en `<head>` antes de
  pintar** (script inline que lee `localStorage` `cz-tema`); si no, hay flash en cada navegación.
- **El hero de la home se queda OSCURO en los dos temas** (los tokens se redeclaran en
  `:root[data-cz-theme="claro"] .home-hero`). El vídeo es **vertical 540×960** en un hero apaisado:
  a sangre completa solo se ve el 24%; el compromiso actual es `min(1000px, 62vw)` → 45%.
  ⚠ Nada de `backdrop-filter` en el panel del radar: con el vídeo detrás es contraproducente.
- **El sitio no usa ni una utilidad de color de Tailwind**: todo va por el design system propio.
- **CSS**: `styles/cancha-redesign.css` importado desde `global.css` (⚠ el `@import` debe ir **antes**
  de Tailwind). Clases: `cz-strip`, `cz-header`, `cz-logo`, `cz-nav` (+`.active`), `cz-card`,
  `cz-badge`, `cz-breadcrumbs`, `seo-*`, `rk-*`.
- **PWA**: `public/sw.js` (network-first páginas, cache assets, `offline.html`). Al tocar assets,
  subir la versión de caché `cz-cache-v*`.
- ⚠ **`calculadora.astro` tiene DUPLICADA la lógica de `CosteBlock.astro`.** Si tocas una, mira la otra.

### Imágenes
- Van a `web/public/shoes/{slug}.jpg|webp`. `scripts/optimize-images.mjs` **capa a 600px de ancho a
  propósito** (WebP q82) — las de ~460-600px son por DISEÑO, no baja calidad. **NO subir resolución**:
  el optimizador lo revierte.
- Flujo: descargar el `og:image` del listado → `sharp` resize 600px webp q82 → mismo path.
- Fuentes que funcionan: `static.nike.com`, CDN de adidas, KicksCrew (shopify), mediadecathlon.
  ⚠ `ballershoesdb.com` bloquea el hotlinking (403) → descargar en local.
- Placeholder legítimo: solo el de modelos no revelados.

---

## Deploy, analítica y storage

- **Vercel**: Root Directory = `web`. Auto-deploy en push a `master`. Dominio primario = **apex
  sin-www**; `www` → 308 → apex. Si algún día se toca, mantener el apex como primario.
- **Analítica**: **Cloudflare Web Analytics** (beacon en `Analytics.astro`, sin cookies, token
  `4052ed0c20a7494895e7111141ce38b5`). ⚠ **NO soporta eventos custom**: todos los
  `window.plausible(...)` repartidos por el sitio son **no-op**. Solo se miden páginas vistas.
  Para medir adopción real haría falta un contador propio o Plausible de pago.
- **`robots.txt`** lleva `Disallow: /api/` (Googlebot rastreaba `/api/chat` con GET y recibía 405).
- **localStorage**: `cz.favs` · `cz.cookies.v1` · `cz.pricealerts` · `cz-tema` · `cz.stats.v1` ·
  `cancha-quiz-respuestas` (sessionStorage).
- **Scripts de mantenimiento**: `update-images.js`, `fix-encoding.js`, `optimize-images.mjs`,
  `gen-chat-catalog.ts`, y los `audit-*` listados arriba.
- **Tests**: `npx vitest run` → 236.
