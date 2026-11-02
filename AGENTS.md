# CANCHA.ZAPA — Guía para agentes (Codex y Claude)

Web de catálogo y recomendación de zapatillas de baloncesto (mercado español) + herramientas para
entrenadores. Astro + TypeScript + Tailwind en `web/`, desplegada en Vercel con push a `master`.
El contexto completo y la doctrina viven en `CLAUDE.md` (léelo si necesitas detalle; es largo).

## Trabajo en paralelo con otro agente

Hay DOS agentes sobre este repo a la vez: **Codex** y **Claude**. El usuario quiere que trabajéis en
paralelo sin pisaros y conociendo lo que hace el otro.

**Al empezar cada sesión y antes de cada tarea:**
1. Lee `trabajo/HANDOFF.md` (zonas, ficheros reclamados, relevos pendientes).
2. `git fetch` y `git status`. Mira `git log HEAD..origin/master` (el bot de precios commitea cada noche).
3. Reclama en `HANDOFF.md` los ficheros que vas a tocar ANTES de editarlos. Si ya están reclamados
   por el otro, no los toques: anota lo que necesitas en la sección de relevos.

**Zonas por defecto (por tipo de trabajo, no solo por carpeta):**
- **Codex — código acotado con criterio comprobable**: lector de «Jugades» y de actas
  (`web/src/lib/jugadesFCBQ.ts`, `actaIA.ts`, `actaImportUI.ts`), lógica de las herramientas de entrenador
  (`web/src/lib/*`), tests, bugs reproducibles y cambios mecánicos en muchos ficheros.
- **Claude — lo que depende de la doctrina del proyecto o de fuentes externas**: catálogo (`zapatillas.ts`,
  `precios.json`, `score-fuentes.json`), verificación en tiendas con navegador, scraper, afiliados y
  correo, `articles.ts`/`seoPages.ts`, auditorías, decisiones de producto, `CLAUDE.md`.
- Lo que no esté claro: pregunta en `HANDOFF.md` o reclámalo antes.

**Revisión cruzada (el que no lo escribió, y solo aquí, para no gastar de más):**
- Lógica de dinero o de recomendación: `scoring.ts`, `mergePrices.ts`, el scraper y `web/api/`.
- Código de Codex que dependa de una norma o un dato del proyecto: Claude comprueba la norma.
- Datos o prosa de Claude que afecten al código: Codex pasa tests y build.
- Pide la revisión en la sección de relevos de `HANDOFF.md`, con el commit.

**Antes de afirmar algo sobre el estado del repo, compruébalo con `git log`/`git status`**, no desde lo que
recuerdes de la sesión. Ninguna nota, tampoco las de este fichero, sustituye a mirar el dato.

**Git:**
- El usuario AUTORIZA commits a los dos agentes. Mensajes en español, estilo del historial.
- `git add` de ficheros CONCRETOS. Nunca `git add -A`, `git add .` ni `git commit -a`.
- Commit solo de lo tuyo. No toques ni commitees el trabajo sin commitear del otro.
- Antes de pushear: `git fetch`, `git pull --rebase` y `git log origin/master..HEAD` para ver qué subes.
  Pushes AGRUPADOS (Vercel tiene el almacenamiento casi lleno; cada push a `web/` es un despliegue).
- No commitear: `web/api/_catalog.json` (se regenera solo), `web/public/_t/` (grabaciones de prueba),
  `trabajo/`, ficheros `web/_*`.
- Nada destructivo (reset --hard, push --force, borrar ramas/despliegues) sin permiso expreso del usuario.

**Al terminar:** anota en `HANDOFF.md` qué hiciste, el commit, y qué queda a medias. Libera tus
ficheros reclamados.

## Reglas de edición

1. Cambios quirúrgicos: edita solo lo que pide la tarea. No refactorices ni reformatees lo que funciona.
2. Simplicidad: el mínimo código que resuelve lo pedido.
3. Si algo es ambiguo, di tus suposiciones y pregunta.
4. Objetivos verificables: comprueba que funciona (tests, navegador) antes de decir que está hecho.
5. En `zapatillas.ts` edita haciendo match del `id:`, nunca de las líneas de comentario (box-drawing).
6. Todo número de la web sale del catálogo; no escribas precios, pesos ni notas a mano en la prosa.
7. Los datos de usuario (estadísticas, pizarra) viven solo en el navegador. Nada de backend con
   datos de menores.
8. Prohibido esquivar CAPTCHAs/antibot o acceder a `basquetcatala.cat` (su robots.txt veta a los agentes de IA).

## Comprobaciones

Desde `web/`: `npx vitest run` (regenera `api/_catalog.json` antes), `npx astro check`, build con `npm run build`.
Dev server en `localhost:4321` (el service worker y el dev server mienten con el CSS: verifica contra
`astro preview`). Mide el catálogo importando `zapatillas`, nunca con grep sobre el fichero fuente.

## Secretos

Las claves (OpenRouter, AliExpress, etc.) están en Vercel/GitHub, nunca en el repo. No las pegues en ningún fichero.
