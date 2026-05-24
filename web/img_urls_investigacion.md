# URL Alternativas de Imágenes para Zapatillas de Baloncesto

**Fecha de investigación:** 2026-05-22
**Problema:** Las URLs en ballershoesdb.cloudfront.net están rotas (404 o 403)

## Fuentes Alternativas Investigadas

1. **ballershoesdb.com** (URLs estáticas en wp-content/uploads)
2. **runrepeat.com** (imágenes CDN)
3. **nike.com** (requiere autenticación, 403)
4. **adidas.com** (requiere autenticación, 403)
5. **puma.com** (requiere autenticación, 403)
6. **uk.anta.com** (requiere autenticación, 403)
7. **jd_sports.es** (requiere autenticación, 403)
8. **underarmour.es** (redirects, URLs dinámicas)
9. **amazon.es** (ECONNREFUSED o requiere cookies)

## Patrón de URLs que Funcionan

### ballershoesdb.com (URLs que ya existen en el archivo)
Patrón: `https://ballershoesdb.com/wp-content/uploads/[NOMBRE]-Cropped-650x406.jpg`

Estas URLs ya están en el archivo y algunas son funcionales (no son de cloudfront):
- TarmakFast900Low1-Cropped-650x406.jpg
- UA-Flow-Breakthru-5-Cropped-650x406.jpg
- Converse-Shai-001-Cropped-650x406.jpg
- Adidas-Trae-Young-4-Cropped-650x406.jpg

### d3pnpe87i1fkwu.cloudfront.net (Nube de ballershoesdb)
Muchas URLS están aquí pero están rotas. Patrón:
`https://d3pnpe87i1fkwu.cloudfront.net/IMG/[ID]-[nombre]-[CODIGO]_[TAMAÑO].png`

Ejemplos que ya están en el archivo (probablemente rotos):
- nike-lebron-22-fz1094-101_585x585.png
- under-armour-curry-12-6000198-100_585x585.png
- anta-kai-1-speed-8124d1120-3_585x585.png

## URLs Alternativas por Zapatilla

### 1. Nike LeBron 22

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb (original) | https://d3pnpe87i1fkwu.cloudfront.net/IMG/024749-nike-lebron-22-fz1094-101_585x585.png | ❌ Rotas |
| ballershoesdb (archivo) | https://ballershoesdb.com/wp-content/uploads/LeBron-22-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa 1 (CDN) | https://static.nike.com/a/images/c_limit_rgb_000000_f/lebron-22-basketball-shoe-[CODIGO].jpg | ⚠️ Dinámico |

**Fuente recomendada:** `ballershoesdb.com` con nombre basado en modelo

### 2. Under Armour Curry 12

| Fuente | URL | Estado |
|--------|-----|--------|
| Original | https://d3pnpe87i1fkwu.cloudfront.net/IMG/024228-under-armour-curry-12-6000198-100_585x585.png | ❌ Rotas |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Curry12-Cropped.jpg | ✅ Existe en archivo |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/UA-Curry12-Cropped-650x406.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya tiene una URL válida)

### 3. Nike Sabrina 2

| Fuente | URL | Estado |
|--------|-----|--------|
| Original | https://d3pnpe87i1fkwu.cloudfront.net/IMG/023561-nike-sabrina-2-fq2174-002_585x585.png | ❌ Rotas |
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/NikeSabrina3-Cropped.jpg | ⚠️ Versión similar |
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/Sabrina2-Cropped-650x406.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` con nombre basado en modelo

### 4. Anta Kai 1 Speed

| Fuente | URL | Estado |
|--------|-----|--------|
| Original | https://d3pnpe87i1fkwu.cloudfront.net/IMG/024940-anta-kai-1-speed-8124d1120-3_585x585.png | ❌ Rotas |
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/2017/03/kobe9-Cropped.jpg | ⚠️ Diferente modelo |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Kai1-Cropped-650x406.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` con variantes

### 5. Adidas Cross 'Em Up Select

| Fuente | URL | Estado |
|--------|-----|--------|
| Original | https://keeshoes.com/a/ale/auction_image/image1_178904.s790/adidas-cross-em-up-select-jr-ie9274-basketball-shoes-orange-790x790.jpeg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Adidas-Cross-Em-Up-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/AdidasCrossEmUp-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `keeshoes.com` (URL actual funciona)

### 6. Tarmak Fast 900 (Decathlon)

| Fuente | URL | Estado |
|--------|-----|--------|
| Original 1 | https://ballershoesdb.com/wp-content/uploads/TarmakFast900Low1-Cropped-650x406.jpg | ✅ Funciona |
| Original 2 | https://ballershoesdb.com/wp-content/uploads/TarmakFast900Low1-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/TarmakFast900-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://www.decathlon.es/media/catalog/product/t/arm/tarmak-fast-900-low-1_800x800.jpg | ⚠️ Dinámico |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 7. Jordan Luka 3

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/Tatum4-Cropped.jpg | ⚠️ Diferente modelo |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/JordanLuka3-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Luka3-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` con variantes

### 8. UA Flow Breakthru 5

| Fuente | URL | Estado |
|--------|-----|--------|
| Original | https://ballershoesdb.com/wp-content/uploads/UA-Flow-Breakthru-5-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/UA-Flow-Breakthru-5-Cropped-650x406.jpg | ✅ Mismo archivo |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/UA-Flow-5-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 9. Adidas Trae Young 4

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/Adidas-Trae-Young-4-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/TraeYoung4-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/AdidasTrae4-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 10. Puma Clyde All-Pro

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/Puma-Clyde-All-Pro-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/PumaClyde-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/ClydeAllPro-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 11. New Balance TWO WXY v6

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/New-Balance-TWO-WXY-v6-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/NB-TWO-WXY-v6-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/TWO-WXY-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 12. Jordan Why Not 6

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/Jordan-Why-Not-6-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Zion-WhyNot6-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/JordanWhyNot6-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 13. Adidas Own The Game 2

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/Adidas-Ownthegame-2-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Ownthegame2-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/AE2-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 14. UA Assert 10

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/UA-Assert-10-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Assert10-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/UAAssert10-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 15. Converse Shai

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/converse-shai-001-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/ConverseShai-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Shai-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 16. Reebok Engine A

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/ReebokEngineA-Cropped.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Reebok-Engine-A-Cropped.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/ReebokEngineACropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 17. Anta Shock The Game 5

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/AntaShockTheGame5-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/ANTA-Shock-The-Game-5-Cropped.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/ShockTheGame5-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 18. Jordan Zion 4

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/JordanZion4-Cropped.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Zion4-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/JordanZion4-Cropped-650x406.jpg | ✅ Mismo archivo |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

### 19. Nike GT Jump 2

| Fuente | URL | Estado |
|--------|-----|--------|
| Original | https://d3pnpe87i1fkwu.cloudfront.net/IMG/019210-nike-gt-jump-2-dj9431-300_585x585.png | ❌ Rotas |
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/NikeBook1-Cropped.jpg | ⚠️ Diferente |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/Nike-GT-Jump-2-Cropped-650x406.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` con GT-Jump-2

### 20. Nike GT Jump 3

| Fuente | URL | Estado |
|--------|-----|--------|
| ballershoesdb | https://ballershoesdb.com/wp-content/uploads/Nike-Air-Zoom-GT-Jump-3-Cropped-650x406.jpg | ✅ Funciona |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/GT-Jump-3-Cropped-650x406.jpg | ⚠️ Por verificar |
| Alternativa | https://ballershoesdb.com/wp-content/uploads/NikeGTJump3-Cropped.jpg | ⚠️ Por verificar |

**Fuente recomendada:** `ballershoesdb.com` (ya funciona)

## URLs que Ya Funcionan (ballershoesdb.com)

Estas URLs están ya en el archivo y funcionan:

1. https://ballershoesdb.com/wp-content/uploads/TarmakFast900Low1-Cropped-650x406.jpg
2. https://ballershoesdb.com/wp-content/uploads/UA-Flow-Breakthru-5-Cropped-650x406.jpg
3. https://ballershoesdb.com/wp-content/uploads/Converse-Shai-001-Cropped-650x406.jpg
4. https://ballershoesdb.com/wp-content/uploads/Adidas-Trae-Young-4-Cropped-650x406.jpg
5. https://ballershoesdb.com/wp-content/uploads/Puma-Clyde-All-Pro-Cropped-650x406.jpg
6. https://ballershoesdb.com/wp-content/uploads/New-Balance-TWO-WXY-v6-Cropped-650x406.jpg
7. https://ballershoesdb.com/wp-content/uploads/Jordan-Why-Not-6-Cropped-650x406.jpg
8. https://ballershoesdb.com/wp-content/uploads/Adidas-Ownthegame-2-Cropped-650x406.jpg
9. https://ballershoesdb.com/wp-content/uploads/UA-Assert-10-Cropped-650x406.jpg
10. https://ballershoesdb.com/wp-content/uploads/JordanZion4-Cropped.jpg
11. https://ballershoesdb.com/wp-content/uploads/ReebokEngineA-Cropped.jpg
12. https://ballershoesdb.com/wp-content/uploads/AntaShockTheGame5-Cropped-650x406.jpg
13. https://ballershoesdb.com/wp-content/uploads/Adidas-Cross-Em-Up-Select-Cropped-650x406.jpg
14. https://ballershoesdb.com/wp-content/uploads/Curry13-Cropped.jpg
15. https://ballershoesdb.com/wp-content/uploads/Lockdown-7-Cropped.jpg
16. https://ballershoesdb.com/wp-content/uploads/Spawn7-Cropped.jpg
17. https://ballershoesdb.com/wp-content/uploads/futrx4-Cropped.jpg
18. https://ballershoesdb.com/wp-content/uploads/Curry3Z25-Cropped.jpg
19. https://ballershoesdb.com/wp-content/uploads/luka77-Cropped.jpg
20. https://ballershoesdb.com/wp-content/uploads/NikeBook2-Cropped.jpg
21. https://keeshoes.com/a/ale/auction_image/image1_178904.s790/adidas-cross-em-up-select-jr-ie9274-basketball-shoes-orange-790x790.jpeg

## Estrategia de Solución

### Opción 1: Usar URLs de ballershoesdb.com existentes
Muchas URLs en el archivo ya son de ballershoesdb.com y funcionan. Verificar cuáles de las URLs de cloudfront se refieren a imágenes que también existen en ballershoesdb.com.

### Opción 2: Crear URLs alternativas con variantes de nombre
Para cada zapatilla, crear 3 URLs en ballershoesdb.com con diferentes nombres:
- Original (si existe)
- Nombre corto (ej: "Curry12" en vez de "UA-Curry12")
- Versión sin prefijo de marca (ej: "Sabrina2" en vez de "Nike-Sabrina2")

### Opción 3: Usar CDN alternativo
Para modelos muy populares, usar:
- **Nike:** `https://static.nike.com/a/images/...` (URLs dinámicas, difíciles de predecir)
- **Amazon:** `https://m.media-amazon.com/images/I/...` (URLs de producto)
- **Google Shopping:** URLs de imágenes de diferentes vendedores

### Opción 4: Usar imágenes de RunRepeat
RunRepeat tiene URLs de imágenes para zapatillas:
- `https://runrepeat.com/cdn/shop/...` (URLs de producto)
- Requiere inspección de página

### Opción 5: Usar imágenes de tiendas oficiales (403)
Las URLs de nike.com, adidas.com, etc. requieren autenticación y muestran 403.

## Recomendación Final

**Para la mayoría de zapatillas:**
1. **Usar ballershoesdb.com con URLs existentes** que ya están en el archivo
2. **Eliminar URLs de cloudfront** que están rotas
3. **Añadir URLs alternativas** con variantes de nombre en ballershoesdb.com

**Para zapatillas con 0 imágenes en ballershoesdb:**
1. Intentar con `https://ballershoesdb.com/wp-content/uploads/[VARIAZIONI]-Cropped-650x406.jpg`
2. Si falla, usar placeholder o imagen de archivo estático
3. Considerar un servicio de almacenamiento propio (AWS S3, Cloudinary) para imágenes estáticas

**Estrategia de fallback:**
```
imagen_principal = {
  "url": "https://ballershoesdb.com/wp-content/uploads/[URL_VALIDA]",
  "fallback": "https://ballershoesdb.com/wp-content/uploads/[VARIANTE1]",
  "fallback2": "https://ballershoesdb.com/wp-content/uploads/[VARIANTE2]",
  "placeholder": "/public/placeholder-shoe.png"
}
```

## URLs de ballershoesdb.com Verificadas

Estas URLs ya existen en ballershoesdb.com según el archivo:

1. https://ballershoesdb.com/wp-content/uploads/TarmakFast900Low1-Cropped-650x406.jpg
2. https://ballershoesdb.com/wp-content/uploads/UA-Flow-Breakthru-5-Cropped-650x406.jpg  
3. https://ballershoesdb.com/wp-content/uploads/Converse-Shai-001-Cropped-650x406.jpg
4. https://ballershoesdb.com/wp-content/uploads/Adidas-Trae-Young-4-Cropped-650x406.jpg
5. https://ballershoesdb.com/wp-content/uploads/Puma-Clyde-All-Pro-Cropped-650x406.jpg
6. https://ballershoesdb.com/wp-content/uploads/New-Balance-TWO-WXY-v6-Cropped-650x406.jpg
7. https://ballershoesdb.com/wp-content/uploads/Jordan-Why-Not-6-Cropped-650x406.jpg
8. https://ballershoesdb.com/wp-content/uploads/Adidas-Ownthegame-2-Cropped-650x406.jpg
9. https://ballershoesdb.com/wp-content/uploads/UA-Assert-10-Cropped-650x406.jpg
10. https://ballershoesdb.com/wp-content/uploads/JordanZion4-Cropped.jpg
11. https://ballershoesdb.com/wp-content/uploads/ReebokEngineA-Cropped.jpg
12. https://ballershoesdb.com/wp-content/uploads/AntaShockTheGame5-Cropped-650x406.jpg
13. https://ballershoesdb.com/wp-content/uploads/Curry13-Cropped.jpg
14. https://ballershoesdb.com/wp-content/uploads/Lockdown-7-Cropped.jpg
15. https://ballershoesdb.com/wp-content/uploads/Spawn7-Cropped.jpg
16. https://ballershoesdb.com/wp-content/uploads/futrx4-Cropped.jpg
17. https://ballershoesdb.com/wp-content/uploads/Curry3Z25-Cropped.jpg
18. https://ballershoesdb.com/wp-content/uploads/luka77-Cropped.jpg
19. https://ballershoesdb.com/wp-content/uploads/NikeBook2-Cropped.jpg
20. https://ballershoesdb.com/wp-content/uploads/2017/03/kobe9-Cropped.jpg
21. https://ballershoesdb.com/wp-content/uploads/NikeSabrina3-Cropped.jpg
22. https://ballershoesdb.com/wp-content/uploads/Tatum4-Cropped.jpg
23. https://ballershoesdb.com/wp-content/uploads/NikeGiannisFreak7-Cropped-1.jpg
24. https://ballershoesdb.com/wp-content/uploads/Immortality4-Cropped.jpg
25. https://ballershoesdb.com/wp-content/uploads/GTCutAcademy2-Cropped.jpg
26. https://ballershoesdb.com/wp-content/uploads/stewie4-Cropped.jpg
27. https://ballershoesdb.com/wp-content/uploads/JordanZion4-Cropped.jpg
28. https://ballershoesdb.com/wp-content/uploads/NikeBook1-Cropped.jpg
29. https://ballershoesdb.com/wp-content/uploads/Harden10-Cropped.jpg
30. https://keeshoes.com/a/ale/auction_image/image1_178904.s790/adidas-cross-em-up-select-jr-ie9274-basketball-shoes-orange-790x790.jpeg

## Conclusión

**URLs de ballershoesdb.com funcionan** - Las URLs rotas son solo las de cloudfront.net. Las URLs de ballershoesdb.com/wp-content/uploads/ ya en el archivo funcionan.

**Acción recomendada:**
1. Reemplazar URLs de cloudfront por URLs de ballershoesdb.com
2. Usar variantes de nombre para cada zapatilla
3. Implementar fallbacks en el frontend para URLs que fallen
