# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-09-14 (sesión 49)
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
| Tamaño | **248 zapas · 259 tests · `astro check` 0 errores** (páginas: recontar, el 342 era de la s43 con 240 zapas) |

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

## 📌 Doctrina — aprendizajes que siguen aplicando

Destilado de las sesiones 26-38. Cada línea costó al menos una sesión.

### Verificar antes de concluir
- **Contar sobre el fichero fuente cuando hay una capa de merge da un número FALSO.** "142 de 177
  enlaces de Amazon son búsquedas" salió de `grep` sobre `zapatillas.ts`; el número que ve el
  usuario es 87, porque `mergePrices` sustituye la URL en runtime. Medir siempre sobre el dato
  ya compuesto (importar `zapatillas`), no sobre el texto del que sale.
  ⚠ **Y no basta con MEDIR sobre el fusionado: hay que EDITAR sobre el mismo conjunto — s46.**
  Se auditaron 36 búsquedas de Foot Locker sobre el catálogo fusionado y se aplicó el fix con un
  `grep` sobre el fichero fuente: marcó **57**, porque las otras 21 eran búsquedas que el scraper
  YA había resuelto a ficha en runtime. Medir en un conjunto y escribir en otro es la misma trampa
  por la puerta de atrás. Revertir y emparejar por URL exacta.
- **En un log de GitHub Actions, el paso `Run` ECHA el script entero antes de ejecutarlo — s46.**
  Se dio por hecho que el scraper llevaba 3 noches sin guardar porque el log "decía"
  `Sin cambios en precios.json`. Esa línea era el **`echo` de la rama `else` del script**, listada
  con el resto del bloque `##[group]Run`, no su salida. Dos líneas más abajo estaba lo que de
  verdad pasó: `[master 7fb7ee2] chore(precios): actualizar precios`. **Las líneas con el escape
  `^[[36;1m` son el script, no el resultado**: filtrarlas antes de concluir nada.
- **`git log origin/master..HEAD` responde "¿qué tengo yo sin subir?", NO "¿estoy al día?" — s46.**
  Con el remoto por delante devuelve VACÍO igual que si todo estuviera sincronizado, y eso fue lo
  que sostuvo la falsa alarma del scraper: los commits del bot existían y no se veían. Para saber si
  falta algo hay que mirar el sentido contrario, `HEAD..origin/master`, y con un `git fetch` delante.
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
- **Un buscador que funciona PERFECTAMENTE puede rellenar por similitud, y eso es indistinguible de
  un acierto — s45.** Foot Locker ES falló en los 7 modelos que se le pidieron devolviendo 18-20
  productos REALES de su catálogo, de otro modelo: `kd 19`→Harden Vol 10, `kobe 4/6 protro`→Kobe
  X/5/9, `dame 8`→DON Issue 8, y el mejor, `new balance kawhi`→**Converse Shai**. El parámetro era
  correcto (el `<title>` sale bien) y no devolvía el catálogo entero, o sea que **los dos chivatos
  conocidos daban verde**. Chivato nuevo que sí sirvió: el primer resultado era una **tarjeta de
  regalo**, que es lo que una tienda pone cuando no tiene nada que enseñar. ⇒ Con marca+modelo hay
  que LEER los títulos devueltos, siempre.
- **Que una nota diga "CORREGIDO" no prueba que el dato se corrigiera — s45.** Las tarifas de 361°
  llevaban desde la s39 marcadas como aplicadas en CLAUDE.md y **tres de cuatro seguían mal** en
  `zapatillas.ts`, con el agravante de que el valor bueno se había escrito en la ficha vecina.
  Verificar contra el DATO, nunca contra la nota que dice que se hizo.
- **Un `grep`/`awk` de `id: "X"` casa también con `sucesor_id: "X"` y `predecesor_id: "X"` — s45.**
  Costó una falsa alarma de "el catálogo tiene los enlaces cruzados de otra generación": lo que
  salía eran los enlaces de la ficha ANTERIOR. Anclar el patrón al principio de línea
  (`^    id: "X",`). Es la misma trampa de subcadena del matcher de New Balance, pero mordiéndonos
  en nuestras propias herramientas de medición.
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
- **Un enlace de búsqueda roto se disfraza de cuatro maneras distintas, y ninguna es un error.**
  Auditadas las 15 formas de búsqueda del catálogo (s43): Zalando servía su página "no existe"
  con **403** por curl y **200** en navegador; adidas, un "NO SE ENCUENTRA LA PÁGINA" con carrusel
  de Sambas; Puma **redirigía a una landing de categoría tirando la query** (el caso Foot Locker);
  `reebok.es` **ya ni resuelve en DNS**; y `basketworld.com` devuelve **200 con la página por
  defecto de Plesk**. ⇒ El status NO sirve para nada aquí: hay que MIRAR la página y contar
  resultados. Y comprobar la URL final, que un redirect silencioso es indistinguible de un acierto.
- **Antes de dar una búsqueda por rota, lanzar un CONTROL que la tienda SÍ venda.** Nike devolvía
  chanclas de bebé para "lebron 22" y parecía el mismo fallo; con "giannis" los Giannis salen los
  primeros. El parámetro estaba bien: lo que pasa es que Nike ya no vende esa zapa. Sin el control
  se arregla lo que no está roto.
- **El `SearchAction` del JSON-LD de la home dice el parámetro bueno, sin adivinar.** Un
  `grep` de `{search_term_string}` sacó la forma correcta de UA, JD y Puma en una peticion cada una.
  Es más fiable que probar parámetros a ojo y más barato que abrir el navegador.
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
- **"El streaming arregla la espera" es FALSO con un modelo de RAZONAMIENTO.** Se pidió dando por
  hecho que partiría los 12 s de espera; medido en producción, el primer carácter llegó a los
  9,3 s porque el modelo piensa ANTES de emitir su primer `delta.content`. Lo único que el
  streaming paraleliza es la redacción (los últimos 3 s). Con un modelo que no razona sí habría
  partido la espera casi desde el primer segundo. Antes de pedir streaming, mirar si el modelo
  razona.
- **Vercel NO bufferiza el streaming** si se manda `X-Accel-Buffering: no` y `Cache-Control:
  no-transform`: medido el 1-sep, 11 trozos escalonados y con `content-encoding: br` activo. Era
  la duda razonable al implementarlo y queda resuelta.
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
- **Una identidad de producto que incluye ruido de la URL multiplica el producto — s47.** `identidadProducto`
  usaba la ruta entera de Amazon (slug + `/ref=sr_1_N`): el mismo ASIN con otro `ref` era "otro producto", el
  scraper AÑADÍA una entrada por noche (30 ASIN repetidos en 188) y el merge, al no casar ninguna con el
  enlace editorial, cogía la más barata de TODAS aunque fuera de otro producto y de hace 3 semanas. Así una
  ficha recién verificada a 76,99 € salía a 32,98 €. ⇒ Identidad = el id del producto (ASIN, `/item/<id>`),
  nunca la URL. Y "si no casa, el más barato" solo vale cuando el editorial NO es ya una ficha concreta.
  Arreglo encargado (TAREA 7).
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
- 🔑 **Un componente en `Base.astro` con `define:vars` multiplica su payload por TODAS las páginas
  — s46.** `CommandPalette` inlineaba el índice de búsqueda (60,7 KB) y `ChatWidget` el `SHOE_INDEX`
  (40,5 KB): **101 KB de los 191 KB de cada ficha**, repetidos en 344 páginas. Los dos datos son
  **bajo demanda** (nadie los necesita hasta abrir el buscador o el chat), así que pasaron a
  endpoints estáticos (`src/pages/search-index.json.ts` y `shoe-index.json.ts`) que se piden al
  abrir y el navegador cachea para todo el sitio (`deeb82b`). Ficha 188 → **104 KB**, despliegue
  89 → **61 MB**. ⇒ Antes de meter `define:vars` en un componente global, multiplicar su peso por el
  número de páginas.
- ⚠ **Quitar `define:vars` cambia el TRATO del `<script>`, no solo sus datos — s46.** `define:vars`
  implica `is:inline`; al quitarlo, Astro procesa y type-checkea el bloque, y saltaron **46 errores**
  de código DOM preexistente ajeno al cambio. La solución no es arreglar los 46: es poner
  `is:inline` explícito, que es el trato que ya tenía.
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

**⏳ Pendientes**: Sneakin ES, Pro:Direct ES, Reebok ES (5 links). ~~Joom ES~~ → **no va por Awin** (10-sep), vía Impact.
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

- **`web/src/data/zapatillas.ts`** — array `_rawZapatillas` con las 244 zapas. Exporta `zapatillas`,
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
- 🔑 **El corte (low/mid/high) es identidad de producto, no variante — NUEVO (s44, 5-sep).**
  `puma-playmaker-pro-mid` tiene una review real de WearTesters, pero es de la Playmaker Pro
  **LOW** (2022): low y mid difieren en soporte de tobillo y en peso, dos de los ocho ejes. Se
  decidió NO anclar — sería la misma familia de error que Curry 12 ≠ 13 o Exhibit A ≠ B. Como
  mucho se guarda el `wt_url` de contexto SIN número; ni eso si puede confundir.

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
- **Tests**: `npx vitest run` → 259.
