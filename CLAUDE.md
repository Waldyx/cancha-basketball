# CANCHA.ZAPA — Contexto del proyecto

> Última actualización: 2026-05-19
> Para Claude: lee esto al empezar una sesión nueva. Cubre todo lo importante.

---

## ¿Qué es esto?

Web de catálogo y recomendación de zapatillas de baloncesto para el mercado español.
Stack: **Astro + TypeScript + Tailwind CSS**, desplegado en **Vercel** vía GitHub Actions.

**Repo**: `C:\Users\oswal\Desktop\AI\Proyectos\Basketball Shoe Tracker`
**Web**: `C:\Users\oswal\Desktop\AI\Proyectos\Basketball Shoe Tracker\web`
**Dev server**: `localhost:4321`
**Vercel**: auto-deploy en cada push a `master`

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
10. Uso (competicion/entrenamiento/ambos) ← añadido en esta sesión

---

## Catálogo — marcas cubiertas (124 zapas)

Nike, Jordan, Adidas, New Balance, Under Armour, Puma, Converse, Reebok, Li-Ning, Anta, Peak, Tarmak (Decathlon)

### Últimas añadidas (esta sesión)
- Nike Ja 1, Adidas Trae Young 3, NB TWO WXY v5, Nike GT Hustle 3
- NB Kawhi 2, Adidas Trae Young 4, Jordan Tatum 2, Jordan Zion 3
- UA Curry 11, Puma Clyde All-Pro, Nike LeBron NXXT Gen
- Jordan Luka 3, Nike GT Jump 3, Adidas Harden Vol 9

---

## Flujo de trabajo con Mike (LLM local)

**Mike** = qwen3.5:9b corriendo en OpenClaw Control (`http://127.0.0.1:18789`)
- Override: **max** (máximo thinking budget)
- **Solo investiga y entrega datos** — nunca edita archivos
- **Claude revisa y corrige** antes de implementar

### Reglas de validación
- Rechazar modelos inventados (Kyrie 9 no existe, AE 4 no tiene datos fiables)
- Corregir años (Mike suele retrasar 1-2 años)
- Corregir altura (el Kobe 8 es LOW, no mid/high)
- Corregir cushion (Harden Vol 9 usa Lightstrike Pro, no Bounce)
- Verificar que el modelo exista realmente antes de añadirlo

### Formato que usa Mike
```
MODELO: Nike GT Hustle 3
AÑO:
PRECIO_USD:
PESO_G:
ALTURA: low/mid/high
HORMA: estrecha/normal/ancha
CUSHION_TECH:
TRACCION_DESC:
MATERIAL_UPPER:
IDEAL_PARA:
```

---

## Imágenes

Fuente principal: **ballershoesdb.com**
Patrón URL: `https://ballershoesdb.com/wp-content/uploads/[NombreModelo]-Cropped-650x406.jpg`
- Fondo oscuro, producto recortado
- Si 404 → mostrar placeholder

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
- **Badge NUEVA**: `bottom-2 left-2` (no top, para no tapar badge de categoría)

---

## Pendiente / ideas futuras

- [ ] Imagen de Voltzy 500 mid (usa imagen incorrecta de Tarmak)
- [ ] Motor de recomendación usar nuevo campo `uso` del quiz
- [ ] Más zapas: Kyrie Flytrap 6, UA Breakthru 5, Adidas Exhibit B, KD 17, NB TWO WXY v6 (Mike investigando)
- [ ] Precios reales via scraper (actualmente son editoriales)
