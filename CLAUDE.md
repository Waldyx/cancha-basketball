# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-05-24 (sesión 3)
> Para Claude: lee esto al empezar una sesión nueva. Cubre todo lo importante.

---

## ¿Qué es esto?

Web de catálogo y recomendación de zapatillas de baloncesto para el mercado español.
Stack: **Astro + TypeScript + Tailwind CSS**, desplegado en **Vercel** vía GitHub Actions.

**Repo**: `C:\Users\oswal\Desktop\AI\Proyectos\Basketball Shoe Tracker`
**Web**: `C:\Users\oswal\Desktop\AI\Proyectos\Basketball Shoe Tracker\web`
**Dev server**: `localhost:4321`
**Vercel**: auto-deploy en cada push a `master`
**URL actual Vercel**: `https://web-puce-chi-60.vercel.app` (pendiente dominio real)

---

## Nombre del proyecto

**CANCHA.ZAPA** — el logo se renderiza como:
```html
CANCHA<span class="text-orange-500">.</span>ZAPA
```
"CANCHA" blanco, punto naranja, "ZAPA" blanco.

---

## Arquitectura de datos

### Archivo principal: `web/src/data/zapatillas.ts`
- Array `_rawZapatillas` con ~124 zapas
- Función `mergePricesIntoShoes()` fusiona precios del scraper
- Exporta `zapatillas`, `getZapatillaBySlug()`, `getAllZapatillas()`

### Tipos: `web/src/lib/types.ts`
- `Zapatilla` — entidad principal
- `RespuestasQuiz` — respuestas del quiz (10 preguntas)
- `Recomendacion` — resultado del motor
- Tipos: `Posicion`, `Estilo`, `Lesion`, `PesoJugador`, `Cancha`, `Prioridad`, `AnchoPie`, `Uso`

---

## Páginas principales

| Página | Ruta | Estado |
|--------|------|--------|
| Home / Hero | `/` | ✅ |
| Catálogo | `/zapatillas` | ✅ 124 modelos |
| Quiz | `/quiz` | ✅ 10 pasos |
| Resultados | `/resultados` | ✅ |
| Detalle zapatilla | `/zapatilla/[slug]` | ✅ |
| Comparador | `/comparar` | ✅ |
| Rankings | `/rankings` | ✅ |
| Metodología | `/metodologia` | ✅ |
| Financiación | `/financiacion` | ✅ |
| FAQ | `/faq` | ✅ |
| Guía de tallas | `/guia-tallas` | ✅ |
| 404 | `/404` | ✅ |

---

## Quiz — 10 pasos

1. Perfil (hombre/mujer/junior)
2. Posición (base/escolta/alero/ala-pivot/pivot)
3. Peso (menos-70 / 70-85 / 85-100 / mas-100 kg)
4. Estilo (explosivo/equilibrado/potente/tirador)
5. Cancha (interior/exterior/mixto)
6. Lesiones (rodillas/tobillos/fascia — multi-select)
7. Prioridad (proteccion/reactividad/soporte-tobillo/durabilidad/precio)
8. Presupuesto (80/130/180/null €)
9. Ancho de pie (normal/ancho/no-se)
10. Uso (competicion/entrenamiento/ambos)

---

## Design System — COMPLETADO en sesión 3

Se implementó el design system de `C:\Users\oswal\Desktop\AI\Proyectos\CANCHA.ZAPA Design System`.

### CSS: `web/src/styles/cancha-redesign.css`
Importado en `web/src/styles/global.css` → disponible en TODAS las páginas via `Base.astro`.

### Clases principales
- **Header**: `cz-strip` (franja naranja top) + `cz-header` + `cz-header-inner` + `cz-logo` + `cz-nav`
- **Cards**: `cz-card`, `cz-card-img`, `cz-card-body`, `cz-badge`
- **Sidebar**: `cz-sidebar`
- **Shell**: `.shell` (contenedor max-width centrado)

### Estado de headers por página
✅ TODAS las páginas usan ya el nuevo header `cz-*`:
- index, quiz, resultados, zapatillas, zapatilla/[slug], comparar, rankings
- metodologia, financiacion, faq, guia-tallas, 404

El header viejo (`px-6 py-5 border-b border-zinc-800/60 bg-[#0c0c0c]/80`) fue eliminado de todas.

---

## Fixes críticos aplicados en sesión 3

### Quiz (`web/src/pages/quiz.astro`)
- `data-value="planta"` → `"fascia"` (paso 6 lesiones)
- `data-value="soporte"` → `"soporte-tobillo"` (paso 7 prioridad)
- `data-value="estrecho"` → `"no-se"`, label → "No lo sé" (paso 9 ancho)
- Eliminado carácter chino `值` del paso presupuesto
- `<main class="quiz-main">` → `<section>` (nested main inválido)
- **Flujo quiz → resultados**: ahora guarda en sessionStorage con mapping correcto:
  ```js
  sessionStorage.setItem("cancha-quiz-respuestas", JSON.stringify({
    posicion, peso, estilo, cancha,
    lesiones: answers.lesiones.filter(l => l !== 'ninguna'),
    prioridad,
    presupuesto_max_eur: (!answers.presupuesto || answers.presupuesto === 'null') ? null : parseInt(answers.presupuesto, 10),
    ancho_pie: answers.ancho,
    perfil, uso
  }));
  location.href = "/resultados";
  ```

### zapatillas.ts
- Corregido encoding UTF-8: `aÃ±o_lanzamiento` → `año_lanzamiento` en 127 entradas
  (causaba error de build en esbuild)

---

## Imágenes — Estado actual

### Fuente principal
`https://ballershoesdb.com/wp-content/uploads/[NombreModelo]-Cropped-650x406.jpg`

### Problema
~33 zapas tienen URLs rotas de `d3pnpe87i1fkwu.cloudfront.net` que devuelven 404/403.
Las imágenes rotas se ocultan con `onerror="this.style.display='none'"` (no rompen la UI).

### TAREA PENDIENTE — Arreglar imágenes rotas
Hay que hacer HEAD requests a ballershoesdb.com para encontrar las URLs correctas de estas zapas:

```
nike-lebron-22, ua-curry-12, nike-sabrina-2, anta-kai-1-speed, nike-kd-18,
jordan-luka-3, jordan-tatum-3, nike-kyrie-low-5, jordan-one-take-5,
nike-zoom-freak-4, nike-zoom-freak-5, nike-zoom-freak-6, puma-mb03,
adidas-ae-1, nb-two-wxy-v4, jordan-luka-2, nike-pg-6, nike-pg-7,
nike-don-issue-6, puma-scoot-zeros-3, nike-kyrie-infinity-2, ua-jet-23,
nike-air-max-impact-5, li-ning-sonic-12, nike-gt-run-2, nike-gt-jump-2,
nike-kyrie-flytrap-6, ua-hovr-havoc-5, nike-air-zoom-crossover-2,
li-ning-yu-shuai-18, converse-all-star-pro-bb, nb-kawhi-1, anta-shock-wave-5
```

**Cómo resolverlo**: escribir un script Python que haga HEAD requests a variantes de URL
en ballershoesdb.com y guarde las que devuelven 200. Luego actualizar `zapatillas.ts`.

Variantes a probar por slug:
- `https://ballershoesdb.com/wp-content/uploads/[slug]-Cropped-650x406.jpg`
- `https://ballershoesdb.com/wp-content/uploads/[NombreFormateado]-Cropped-650x406.jpg`
- `https://ballershoesdb.com/wp-content/uploads/[NombreFormateado]-Cropped.jpg`

---

## TAREA PENDIENTE — Dominio

`astro.config.mjs` tiene `site: 'https://web-puce-chi-60.vercel.app'` (URL provisional).

Cuando el usuario conecte el dominio real (probablemente `cancha.shoes`):
1. Actualizar `site:` en `web/astro.config.mjs`
2. Actualizar sitemap URL en `web/public/robots.txt`
3. Las referencias hardcodeadas `cancha.shoes` en `faq.astro` y `guia-tallas.astro` ya están bien

---

## Flujo de trabajo con Mike (LLM local)

**Mike** = modelo LLM corriendo en OpenClaw Control (`http://127.0.0.1:18789`)
UI: abrir `http://127.0.0.1:18789` en el navegador

### Modelos disponibles (OpenRouter free)
- **GPT-OSS 120B (Free)** → `openai/gpt-oss-120b:free` ← usar este primero
- **Gemini 2.0 Flash (Free)** → `google/gemini-2.0-flash-exp:free`
- **DeepSeek R1 (Free)** → `deepseek/deepseek-r1:free`
- **DeepSeek V3 (Free)** → `deepseek/deepseek-chat-v3-0324:free`
- **DeepSeek V4 Flash (Free)** → `deepseek/deepseek-v4-flash:free` ← puede dar 402 (quota)
- **qwen3.5:9b** → local via Ollama (fallback sin internet)

### API key OpenRouter (para llamar directamente desde Claude)
```
sk-or-v1-[REDACTED — ver ~/.openclaw/openclaw.json]
```
Headers necesarios: `HTTP-Referer: http://127.0.0.1:18789` y `X-Title: OpenClaw Control`

### Reglas de validación (para Claude al revisar datos de Mike)
- Rechazar modelos inventados (Kyrie 9 no existe, AE 4 no tiene datos fiables)
- Corregir años (Mike suele retrasar 1-2 años)
- Verificar rangos de precio: budget $60-100 / mid $90-135 / premium $150-250
- Verificar que el modelo exista realmente

---

## Deploy

```yaml
# .github/workflows/deploy.yml
on: push → master
working-directory: web
steps: npm ci → npx vercel --prod
```
Secrets en GitHub: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`

---

## Diseño

- **Colores**: fondo `#09090b` / naranja `#f97316` / amarillo `#facc15`
- **Tipografía**: bold/black uppercase, tracking tight
- **Hero**: fondo SVG con líneas de cancha (`/public/bg-court.svg`)
- **Tarjetas de zapas**: fondo dark gradient `from-zinc-800 to-zinc-900`
- **Badge NUEVA**: `bottom-2 left-2`

---

## Pendiente prioritario

1. **🔴 Imágenes rotas** — script Python HEAD requests → actualizar zapatillas.ts (ver sección imágenes)
2. **🔴 Dominio** — conectar dominio real a Vercel y actualizar astro.config.mjs
3. **🟡 Motor de recomendación** — usar campo `uso` del quiz en scoring.ts
4. **🟡 Precios reales** — scraper no activo, precios son editoriales
5. **🟢 Más zapas** — LeBron Witness 8, Precision 7, Why Not .6 (usar Mike para investigar)

---

Último push: 2026-05-24
Design System completado. Quiz → Resultados funcionando. Headers unificados.
