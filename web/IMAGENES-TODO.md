# Imágenes del catálogo — TODO de sourcing HD

> Objetivo: catálogo uniforme look-tienda (fondo blanco, una sola zapa, nítida).
> El borrado de fondo automático NO funciona con estas fuentes (fotos on-foot,
> baja resolución, sombras). La vía buena: conseguir imagen HD limpia por zapa.
> Pipeline de IA descartado (sesión 16) — ver git: revert de commit 5262770.

## Prioridad ALTA — foto on-foot (calcetines/piernas), hay que reemplazar (~32)
adidas-cross-em-up-select · adidas-dame-9 · adidas-dame-8 · adidas-trae-young-3
adidas-trae-young-4 · adidas-ae-1-5 · adidas-harden-vol-8 · nike-precision-7
nike-lebron-witness-8 · nike-ja-1 · nike-ja-2 · nike-giannis-immortality-4
nike-giannis-immortality-5 · nike-sabrina-1 · nike-gt-cut-3 · nike-gt-hustle-3
nike-kd-16 · nike-kd-17 · nike-lebron-nxxt-gen · jordan-luka-1 · jordan-luka-3
jordan-tatum-2 · jordan-zion-3 · ua-curry-11 · ua-curry-12 · nb-fresh-foam-bb-v3
nb-two-wxy-v5 · nb-two-wxy-v6 · nb-kawhi-2 · reebok-answer-iv · puma-all-pro-nitro-2

## Casos especiales
- `converse-shai-001` — la foto es de una PERSONA con bolso, no la zapa.
- `jordan-luka-4` — glitch (bloques negros) tras procesado; foto original servible.
- `adidas-ae-3` — glitch similar.
- `nike-precision-8` — foto ok pero bordes duros.
- `puma-all-pro-nitro` (gen 1) — usa foto de la **gen 2**. Necesita foto real de la gen 1.

## Plan
1. Empezar por las más vistas (top ventas/clicks).
2. Imagen HD fondo blanco, lateral, una zapa. Guardar en `public/shoes/{slug}.webp`.
3. Actualizar `imagen_principal` en `zapatillas.ts` si cambia extensión.
4. Ir ampliando por lotes. Calidad > cantidad.
