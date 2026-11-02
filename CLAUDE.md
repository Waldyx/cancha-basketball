# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-11-02 (CLAUDE.md recortado: lo cerrado pasó al historial)
> Para Claude: lee esto al empezar una sesión nueva. **Solo contiene lo vivo**: estado, reglas,
> doctrina, afiliados, arquitectura y pendientes.
>
> 📚 El histórico completo de las sesiones 17→57 (diagnósticos, bugs cerrados, decisiones ya
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
| Tamaño | **258 zapas (51 OCULTAS, 207 visibles) · 682 tests · `astro check` 0 errores · 381 páginas** |

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

## ▶️ Estado actual (2-nov)

- **Dos agentes en paralelo: Claude y Codex** (decidido por el usuario, 2-nov). Reglas y reparto en `AGENTS.md`;
  coordinación en `trabajo/HANDOFF.md` (local). Leer el HANDOFF al empezar y reclamar ficheros antes de tocarlos.
  Claude trabaja en el worktree `.claude/worktrees/claude` (rama `claude/trabajo`), no en la carpeta principal, que es de Codex.
- Web y scraper sanos a 2-nov: la web da 200 y `price-bot` commitea cada noche.
- **Trabajo a medias: lector de «Jugades»** (`lib/jugadesFCBQ.ts`, zona de Codex, último commit `cd2f2a4`, 24-oct).
  Cabecera y marcador final bien con 2 grabaciones reales (`web/public/_t/v1.mp4` y `v2.mp4`, NO commitear).
  🔴 Solo lee ~45 de 60 y ~41 de 55 puntos: fallo de OCR, sobre todo en la tarjeta resaltada (turquesa con marcador
  amarillo) y con letra de 576 px. Ampliar el fotograma a 1000 px EMPEORA. Ideas: pedir el vídeo como «Documento» y
  avisar por cuarto con los parciales de la cabecera. Diagnóstico: `localStorage cz.debug.acta=1` → `window.__actaDebug`.
- Detalle de todo lo cerrado: `docs/historial-sesiones.md` (buscar `S57`, `S54`, `s43`…).

---

## 🔴 Pendientes abiertos

### ▶️ Decisiones del usuario
1. **El «desde» de 8 fichas sale de una afiliada más cara que una tienda sin afiliado** (medido 22-oct): KD 18 Amazon 132
   vs BE 96 · A'One FuikaOmar 110 vs BE 77 · JB4 AliExpress 145 vs BE 99 · LeBron 23 ECI 140 vs BE 120 · WoW 12 AliExpress
   227 vs BE 170 · Joker 1 AliExpress 101 vs BE 90 · AJ 40 Decathlon 155 vs Nike ES 140 · Tatum 4 ECI 91 vs BE 90.
   Opciones: dejarlo, apagar esas afiliadas o enseñar el número de BE (contradice la estrategia «Ver precio»).
2. **«Tendencia» incluye generaciones ya superadas** (Curry 12, KD 18, Sabrina 3, Ja 3, Freak 7, MB.05, Harden 9, AE 2,
   Joker 1, D.O.N. 7…). Pasarla a las sucesoras refresca, pero muchas solo se venden en Nike ES, sin comisión.
3. **¿El sello POIZON «Authenticity Verified» cuenta como Marcas+?** Rescataría 5 ocultas (Fresh Foam BB v3, Kawhi 2,
   Unpre ARS 2, Glide Nova FF 4, Embiid 1). Recomendación anterior para Nike: no.
4. **Afiliado de 361sport**: GoAffPro, self-service, hasta 5 %. Crear la cuenta es cosa del usuario.
5. **7 programas rechazados de Awin** con «+ Unirse» activo: Sprinter, Foot-Store, Basket-Center, size?, Foot Locker,
   JD Sports, Privé by Zalando.
6. **Joom**: Impact volvió a rechazar el Marketplace el 21-oct por falta de tráfico. Borrador a hello@joom.com SIN enviar.
   FlexOffers y Admitad piden cuenta nueva, y el usuario no quiere cuentas nuevas.
7. **Sin fuente**: MSRP 80 € de `decathlon-tarmak-se500-mid` (descatalogada) · `FICHA_DUDA` de tecnología en KT 11, Trae
   Young 3 y Kobe 9 High Protro.

### Plazos y cosas que mirar
- **Amazon Afiliados**: sin 3 ventas, puede cerrar la cuenta hacia **nov-2026** (política de 180 días). Mirar el panel. Si
  cierra, los enlaces siguen funcionando pero no pagan: Amazon pasaría a «Ver precio». Desde el 22-sep los clics suben por
  un cambio de medición, no por tráfico nuevo.
- **Tatum 5 y Witness X** (2-nov, nota editorial 7,5 sin reseñas, peso de la X ESTIMADO): revisar cuando las reseñen.
- **Nike LeBron 24 sale el 17-nov** (`proximamente`, peso ESTIMADO, «KingKnit» es afirmación de Nike). Quitar la marca y
  buscar compra afiliada. **adidas Harden Vol 11**: dic-2026, entra entonces.
- **Search Console, medido el 2-nov** (propiedad `sc-domain:canchazapa.com`, se lee desde el Chrome del usuario sin contraseña):
  **1 indexada, 789 sin indexar** (431 rastreadas sin indexar, 295 descubiertas sin indexar), 7 clics y 20 impresiones en 28 días,
  sitemap leído el 25-oct (328 páginas, correcto). Robots y canonical bien en producción. **Amazon, medido el 2-nov**: 14 clics
  y 0 € en 30 días; lo mismo se lee desde ese Chrome. El 15-oct había 6 indexadas de 485 y 0 enlaces externos.
  El cuello de botella es la autoridad. La sesión de Google del navegador integrado caducó: la abre el usuario.
- **Primeros enlaces**: 4 borradores en catalán en Gmail, SIN ENVIAR (AB Premià, Consell Esportiu Maresme, Ràdio Premià,
  La Clau). Enviar solo cuando el usuario lo diga. Objetivos en `trabajo/w30-enlaces-objetivos.md`.
- **Vercel**: 100 % de almacenamiento el 22-oct. Hay `ignoreCommand` en `web/vercel.json` (probado) y retención de 1 semana.
  **Pushes agrupados.** Borrar despliegues lo decide el usuario.
- **Cadena gratuita de OpenRouter**: se muere cada pocas semanas. `npx tsx scripts/audit-ia.ts` al empezar sesión y
  2-3 consultas reales (última medición: 22-oct).
- **Sin verificar con un entrenador**: medidas de minibasket (tiro libre) y normas FCBQ de minutos (Comunicat 1-1415).
- Contador de Pro: necesita un Redis de Upstash en Vercel (acción del usuario). Bing Webmaster Tools sin dar de alta.

### Catálogo: reabrir cuando cambien los hechos
- **Anclas de HoopsGeek**: 44 adultas visibles sin ancla, repasado el 2-nov sin reseñas nuevas (Freak 8, MB.06, Stewie 5, Scoot Zeros III, Immortality 5, KT 11…). AJ 41: WearTesters 9/10.
  Repetir el cruce con el sitemap de HG.
- **Pesos estimados**: actualizar cuando RunRepeat los mida (repasado el 2-nov: 11 corregidos con su catálogo, `/catalog/basketball-shoes?page=N`). LeBron 24 y AJ 41 siguen estimados.
- **Sin afiliada que las venda, no se crean**: G.T. Future, ST Charge, Kobe 11 Protro, Heir
  Series 2, NXXT Gen by JuJu, P400 de NB, Ja Twelve Time, Jordan Triangle, Air Rev, Curry Series 7. NB Kawhi V: no se vende en España.
- **Repuntar a afiliada** las de Nike ES / Puma ES cuando ECI, Atmósfera, Snipes o FuikaOmar las tengan. GT Cut Academy 2: ver si ECI repone.
- **Barrido por tienda** (el que más rinde): Forum Sport el 21-oct; FuikaOmar, Atmósfera y ECI repetidos el 2-nov (entran AJ 5, AJ 1 High, Trae Unlimited 2, Freak 8, Tatum 5 y Witness X); Snipes y Decathlon no compensan.
- `nike_es`, `ua_es`, `nb_es` y `reebok_es` no leen stock: revisar a mano los de Nike (último: 2-nov). Para programarlo
  hay que comparar con una ficha AGOTADA de Nike. Las filas de Amazon también van a mano (`AMAZON_MARCA_AGOTADO = false`).
- Kobe 9 High Protro y Superstar sin MSRP aplicado (no se sabe qué versión es la ficha). Shock Wave 5, JB4 y Rigorer: su
  tarifa en $ es de importación a EE. UU.; no tocar sin tarifa europea.

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

## ⛔ Decisiones cerradas (no reabrir salvo que cambien los hechos)

- **Negocio**: freemium. Zapatillas gratis siempre (embudo SEO y afiliados); herramientas de entrenador = Pro, gratis
  durante la beta con el código visible (`lib/pro.ts`, `ProGate.astro`). Licencia de club. Para cobrar: Lemon Squeezy/Paddle y gestor.
- **Sin créditos de IA**: *«NO VOY A PONER CREDITOS DE IA»*. Ni OpenRouter ni Gemini de pago. El chat conserva la calidad
  aunque tarde: nada de `reasoning: low` a costa de recomendar peor.
- **Datos de usuario solo en el navegador**: nada de backend con datos de menores. Siempre aviso de pérdida + copia.
- **FCBQ**: `basquetcatala.cat` veta a los agentes de IA en robots.txt y usa reCAPTCHA ⇒ NO acceder, ni API oculta, ni
  2Captcha. No publica estadística por jugador. La vía es el pegado o la grabación del entrenador, o pedírselo a la FCBQ.
  Ideas «ya veremos» (no empezar sin el usuario): anotar en directo por dorsal, Open Data para el club.
- **Solo enlaces afiliados** (s51): si la zapa tiene afiliado, fuera lo demás. Si no, solo la tienda oficial de la marca.
  Excepciones: Basketball Emotion (no tiene afiliados, va directo; no perseguirlo) y Joom.
- **Catálogo oculto** (s54): sin compra afiliada ⇒ `oculto: true`, salvo las excepciones de marca y `proximamente`.
  `zapatillasTodas` = todo; `zapatillas` = lo visible. Ficha oculta: 200 con `noindex`, fuera del sitemap. Rescatar = añadir
  compra y quitar `oculto`. `audit-enlaces.ts` lista las rescatables. `disponible: false` NO saca a una zapa de ningún listado.
- **Un enlace afiliado no entra** si pasa a ser el «desde» y es más caro que una tienda no afiliada ya enlazada (s55).
- **Precio oculto**: por encima de 1,5× MSRP no se enseña el número (se queda «Ver precio» + MSRP), ni en JSON-LD. Enlaces
  de búsqueda, igual (`esEnlaceDeBusqueda`). DISPLAY solo: el orden usa `findMejorPrecio`.
- **Reventa ≥ ~2× MSRP**: no se enlaza si hay alternativa. **Barridos**: mínimo 4 tallas.
- **`msrpComparable`**: sin «−X %» para Li-Ning, Anta, Peak y Rigorer. **Gamma 2** es tope de gama (MSRP 370 €).
- **`adidas-cross-em-up-5`** se queda sin enlaces. **`adidas-cross-em-up-select`** es de niño (`gs`). **Shaqnosis**: no se
  enlaza la Low. **Precision 8 Mid** (IH1105, la de la reseña de HG): no se vende en España. IH1104 es la Low, con ficha propia. **Decathlon SE500**: no se retira.
- **Retiradas por fantasma**: Trae Young 4, Harden Stepback 4, Cross Em Up Speed, Air Max Impact 5, Rigorer Warship.
- **Kobe Protro** (usuario, 22-oct): las renovadas con tecnología actual NO son retro (1, 3, 5, 6, 8, 9 High, 9 Elite Low);
  la 4 sí.
- **Corte**: es identidad de producto. Si las fuentes se contradicen, el MÁS BAJO; subirlo exige dos fuentes.
- **Horma**: la ficha solo se mueve hacia MÁS estrecha, y solo va en «ancha» si una fuente la ve holgada. La coletilla
  «wide footers, half size up» no cuenta.
- **`peso_score` = f(`peso_real_g`)**: 10 con ≤300 g y −1 cada 25 g, con test candado. **Exterior**: corregido con el % de HG.
  Tracción, cushion y soporte de HG NO se aplican (otra escala).
- **Merge**: la ficha manda; un scrape no resucita un `disponible:false`. Una `ultima_verificacion` editorial posterior manda
  también en precio y agotado. Identidad de producto = ASIN o `/item/<id>`, nunca la URL.
- **Prosa**: sin números a mano. Marcas `{{precio:ID}}`, `{{peso:ID}}`, `{{nota:ID:eje}}`, `{{score:ID}}`, `{{exterior:ID}}`
  (solo en `body`, no en `description` ni `title`). Las FAQ de `seoPages` no las resuelven.

---

## 🔑 Métodos que costó encontrar

- **HoopsGeek** (`thehoopsgeek.com`): índice en `page-sitemap.xml`. La tabla es una comparativa de 6 columnas y solo vale la
  PRIMERA (puede estar vacía). «Category Performance Ratings» da notas y % de exterior. Un slug plausible puede ser otro modelo
  (`nike-gt-cut-3` es la Turbo). **WearTesters**: `/category/basketball/performance-reviews/page/N/`, nota en `"ratingValue"`.
  **sneakerjagers**: tarifa en `Retail price</dt><dd …>€X`.
- **AliExpress**: la ficha es CSR, `curl` no sirve. Búsqueda por SKU (`/w/wholesale-<SKU>.html?SortType=price_asc`); la SKU sale
  de los nombres de imagen de HG; títulos en el HTML como `"productId"…"displayTitle"`. `fetch('/item/ID.html')` da `og:title`.
  Los `s.click` no se abren: clic falso de afiliado. La API devuelve producto para items retirados.
- **Amazon**: `fetch('/dp/ASIN')` desde amazon.es en el navegador integrado. El segmento se lee en **Departamento**, no en el
  slug. `#outOfStock` con selector de talla solo habla de la talla por defecto: pedir los `li[data-asin]`. `curl` a `/s?k=`
  necesita cookie jar.
- **Barrido de categoría**: ECI `/deportes/baloncesto/zapatillas/N/` con `fetch` desde la página (entrar antes por la home);
  Atmósfera `/baloncesto-zapatillas-hombre-242`, `-ninos-244`, `/outlet-baloncesto-3704`; FuikaOmar `/zapatillas-baloncesto/?page=`.
  Revisar a mano: `matchesShoe` casa de más. **Basketball Emotion**: su buscador da 500; cruzar por sitemap (`/comprar/zapatillas/`,
  `/zapatilla/`, `/sneakers/`). **Foot Locker y Nike ES** solo tienen la generación actual y rellenan por similitud.
- **adidas.es**: carga en el navegador integrado, `curl` da 403. **361sport**: tallas en `/products/<handle>.js`. **Forum**:
  `.size-item.js-select-size` (`off` = no hay). **New Balance**: casa subcadenas; necesita navegador real.
- **Chrome del usuario**: Google entra sin contraseña (elegir cuenta y «Continuar»). Impact: `app.impact.com/secure/member/home/mview.ihtml`.
- **Bash en esta máquina**: el heredoc convierte `\\` en `\`; scripts con regex, con Write. **Trabajadores**: subagentes
  Sonnet (`Agent`) en background.

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
- **Una sola consulta de prueba NO valida un fallo intermitente — s53.** El chat se dio por
  "validado en producción" el 21-sep con una consulta que salió bien, y 2 de cada 3 devolvían la
  cadena de pensamiento del modelo en inglés. Con un fallo que depende de qué modelo de la cadena
  conteste, una muestra de uno no mide nada: hay que repetir hasta ver la variación, y mirar el
  CONTENIDO, no que llegue un 200 con texto.
- **Que el camino feliz diga QUIÉN contestó, no solo el error por qué falló — s53.** La doctrina del
  502 opaco (s40) se había aplicado solo a los fallos. El escape de razonamiento se pudo reproducir
  pero no atribuir a ningún modelo sin desplegar otra vez; una cabecera `X-CZ-Model` en la respuesta
  buena lo resolvió en la primera petición. Si una función depende de un tercero, su respuesta debe
  decir quién la sirvió.
- **Concluir desde la AUSENCIA de una señal es distinto de leer una señal — s53b.** El scraper de
  Amazon daba por agotado todo lo que no tuviera `#add-to-cart-button`, y una noche apagó 25 fichas
  que Amazon sí vendía. La regla buena es: **el estado malo exige una señal POSITIVA** (`#outOfStock`,
  un `OutOfStock` en el JSON-LD); si no hay ni una cosa ni la otra, el scrape es **inconcluyente** y
  no debe tocar el dato editorial. Las otras 6 tiendas ya lo hacían así y ninguna falló.
- **Si un dato se mueve todo en la misma dirección de golpe, el fallo es tuyo — s53b.** 25 fichas
  perdieron la opción de compra en una sola noche y NINGUNA la recuperó. Ni una tienda entera se
  queda sin stock a la vez, ni deja de reponer: **la asimetría es la señal, mucho antes que el
  número**. Con un cambio bidireccional habría que mirar caso a caso; con uno de un solo sentido,
  sospecha primero de tu propio código.
- **Un `InStock` no dice cuántas TALLAS quedan — s53c.** La AG 6 "Black Mamba" figuraba como
  disponible a 110 € y lo estaba… con **2 tallas de 16**. Otro colorway al mismo precio tenía 9.
  Un `availability: InStock` del JSON-LD es un booleano de producto, no de surtido: para una
  opción de compra real hay que pedir la curva de tallas (en Shopify, `/products/<handle>.js`).
- **Al cambiar lo que la página MUESTRA, mirar si el marcado estructurado sigue diciendo lo mismo
  — s53c.** Al dejar de anunciar los precios de reventa, la ficha pasó a enseñar "Ver precio" y el
  MSRP mientras el JSON-LD le seguía diciendo a Google "485,39 €". Datos estructurados que no
  coinciden con el contenido visible es justo lo que Google penaliza, y no lo ve ningún test: se ve
  leyendo el HTML del build.
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
- **Un eje editorial puede estar inflado en bloque sin que se note** — s57. La durabilidad en exterior se puso a ojo y
  casi todas salían ≥ 5, así que el filtro de exterior del quiz no filtraba. Se vio comparando con una fuente que mide
  OTRA cosa parecida (% de analistas que la ven apta para la calle). Al corregir un eje con una fuente externa, hacerlo
  solo si la escala es comparable; si no, se crea un sesgo entre las zapas medidas y las que no.
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

- **`web/src/data/zapatillas.ts`** — array `_rawZapatillas` con las 245 zapas. Exporta `zapatillas`,
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
- **`scripts/audit-ia.ts`**: comprueba contra `/api/v1/models` (sin clave) que los modelos `:free` de `chat.ts`,
  `coach.ts` y `sesion.ts` siguen existiendo. **Pasarlo al empezar sesión**: la cadena se muere cada pocas semanas.
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
| Entrada por público: Jugadores · Entrenadores · Clubs | `/jugadores/` `/entrenadores/` `/clubs/` |
| Herramientas de entrenador: Pizarra · Control de minutos · Mapa de tiro · Informe del rival · Asistencia · Plan de partido · Evaluación · Tests físicos · Informe para familias · Etiquetas de vídeo · Torneos | `/pizarra/` `/minutos/` `/tiro/` `/rival/` `/plan-partido/` `/asistencia/` `/evaluacion/` `/tests-fisicos/` `/familias/` `/video/` `/torneo/` |

**Nav** (desde el 15-oct): `Zapatillas ▾ (Catálogo, Quiz, Rankings, Comparar, Calculadora, Accesorios) | Jugadores | Entrenadores | Clubs | Blog | ♥ Mis zapas`
(lo pone `Header.astro` desde `Base.astro`; el activo sale de `Astro.url.pathname`).
**Footer global**: columnas Explora · Herramientas · Entrenadores (las 11 herramientas + clubs) · El proyecto.
**Pro** (beta gratis, `lib/pro.ts` + `ProGate.astro`): basta `data-pro="<id>"` en un botón o formulario. Ids hoy: pizarra-sesiones,
pizarra-jugador, pizarra-animacion, pizarra-lecturas, pizarra-club, pizarra-marca, stats-equipo, stats-agente, minutos-rotacion,
tiro-temporada, rival-varios, familias-informe, video-clips, evaluacion-fichas, tests-fichas, plan-partido. Al añadir uno: `FUNCIONES_PRO` y la lista de `api/pro-uso.ts`.

### Quiz — 10 pasos
perfil · posición · peso · estilo · cancha · lesiones (multi, auto-avance 700 ms) · prioridad ·
presupuesto · ancho de pie · uso (auto-submit 400 ms).

### Serverless (`web/api/`, ESM puro, SIN bundling)
⚠ **Los imports deben llevar extensión** o revientan con `ERR_MODULE_NOT_FOUND`. Las funciones son
**autocontenidas**: no importan el catálogo, leen `_catalog.json`.
- `chat.ts` — asistente IA. Cadena gratuita de OpenRouter: los 3 primeros en `models` de una petición y
  detrás de uno en uno. A 19-oct: `gemma-4-31b-it` → `nemotron-3-super-120b` → `minimax-m3.1-flash` →
  `gemma-4-26b` → `nemotron-3.5-super-vl` → `nemotron-3-ultra-550b` (los 3 últimos de esa lista, SIN validar).
  `maxDuration: 60`, hasta 40 s por intento. `formatoVisible` arregla en el stream el formato de catálogo
  que copia nemotron (slug suelto → `[[shoe:]]`, fila cruda fuera).
  `OPENROUTER_API_KEY` en Vercel, **NUNCA en el repo**. ⚠ `deepseek-v4-flash:free` NO existe (404).
- `coach.ts` — agente de estadísticas (misma cadena, mismo `models`).
- `sesion.ts` — generador de sesiones de la pizarra (misma cadena; plan JSON validado en servidor).
- `acta.ts` — lector de actas con IA (texto anonimizado o foto con consentimiento; `normalizarActa` valida). Ver *Lector de actas*.
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
- **Tests**: `npx vitest run` → 679 (regenera `api/_catalog.json` antes, ver `vitest.config.ts`).
