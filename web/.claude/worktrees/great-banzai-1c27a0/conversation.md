# Basketball Shoe Tracker - Conversación Inicial

**Fecha:** 13/05/2026  
**Origen:** Webchat directo con Waldy

---

## Contexto

Waldy quiere empezar un proyecto como hobby para generar ingresos. Tiene conocimientos de gaming, hardware y mucho de baloncesto (NBA, camisetas, zapatillas).

## Discusión

### Opciones planteadas
1. Micro-SaaS / herramientas web simples
2. Blog + afiliados en nicho concreto
3. Productos digitales
4. Herramientas con IA

### Ideas concretas para el nicho
1. **Sneaker/Shoe Tracker para Basketball Shoes** — base de datos comunitaria de reviews de rendimiento
2. **NBA Jersey/Swap Marketplace** — comprar/vender/intercambiar camisetas
3. **Hardware + Gaming Performance DB** — comparador de hardware gaming
4. **Combo: Shoe + Jersey Finder**

### Decisión
El **Basketball Shoe Tracker** se decide como el que tiene más potencial porque:
- Nicho con demanda pero casi sin competencia directa
- Audiencia dispuesta a pagar (basketeros invierten $100-$250/par)
- Construible como hobby, empieza con 20-30 modelos
- Escala natural: web → app móvil
- Mercado hispanohablante completamente vacío

## Investigación de mercado (13/05/2026)

### Competidores en inglés (modelo validado)
| Sitio | Qué hace | Monetización | Debilidad |
|---|---|---|---|
| WearTesters | Reviews editoriales en profundidad + YouTube | Afiliados | No es BD filtrable; solo staff |
| The Hoops Geek | BD de 395 zapas, 2.138 reviews agregadas, scores 1-10 en 6 ejes | Afiliados | Solo agrega reviews de "críticos aprobados"; sin comunidad; sin filtro por posición |
| RunRepeat | BD enorme + lab tests (SATRA TM144 para tracción) | Afiliados | Generalista, poca comunidad |
| Schwollo | Reviews técnicas muy respetadas | Mínima | Sin actividad desde 2020, sin BD |
| Baller Shoes DB | BD enfocada a basket | Afiliados | UX antigua, sin métricas avanzadas |
| YouTube (Jacques Slade, Sole Brothers) | Video reviews | Ads + sponsorships + afiliados | Efímero, no buscable como BD |
| r/BBallShoes | Comunidad activa con ~267 reviews catalogadas | No monetizado | Caótico, no estructurado |

**Conclusión:** modelo validado. Hueco real = **BD comunitaria estructurada + reviews curadas + filtros avanzados** combinado.

### Competidores en español (el hueco es real)
- **WearTesters en Español** (YouTube/podcast/TikTok) — el competidor más serio, pero es contenido, no BD.
- **basket-mag.com, pruebafinal.es, basketcountry.es, odioentrenar.com** — guías/listas SEO tipo "mejores zapatillas 2026", no BD filtrable.
- **fuikaomar.es, basketworld.com, 24segons.es** — tiendas con blog (reviews sesgadas hacia inventario propio).
- **Aircriss** (YouTube) — basket + 2K, no especializado en performance.
- **RunRepeat ES** — traducción automática, no es competidor serio en español.

**Veredicto:** no existe BD estructurada filtrable en español. El hueco es real. Lo que hay: (a) tiendas con blog, (b) YouTubers individuales, (c) listas SEO genéricas.

### Volumen e interés
- "Basketball shoes review" tiene ~10-20x más volumen global que "review zapatillas baloncesto", pero el término en ES tiene **tendencia estable y poca competencia SEO seria** (top SERPs son tiendas, no especialistas).
- Subreddits hispanos (r/baloncesto, r/nbaspain) existen pero pequeños y no concentran discusión de zapatillas → oportunidad para ser el hub.
- TikTok ES tiene cuentas activas (@zapatillasysneakers ~88k) pero enfocadas a reventa/streetwear, no a performance basketball.

### Monetización viable (orden de prioridad)
| Programa | Comisión | Notas |
|---|---|---|
| Amazon Associates ES/MX | ~3-4% en calzado | Volumen alto, cookie 24h, base segura |
| Decathlon ES (vía Awin) | 3-9% según categoría | Aceptación fácil, ideal para empezar |
| Nike Affiliate | hasta ~11% (variable) | Mejor tasa, aprobación selectiva, cookie 7-14 días |
| Foot Locker | ~2% | Bajo pero buena conversión |
| FlexOffers / Awin / Impact | Varios retailers | Agregadores |

**Otras vías:** ads display (con tráfico), patrocinios de marcas emergentes (Rigorer, Way of Wade, Peak — pagan por reviews porque las grandes no las ven), Patreon/membresía con BD premium (comparador avanzado, alertas de precio).

---

## Propuesta mejorada (v2)

**Posicionamiento:** *"La primera base de datos comunitaria de zapatillas de basket en español, con métricas estandarizadas y enfoque en jugadores reales — desde la pista municipal hasta el parquet."*

### Diferenciadores concretos
1. **Filtros que nadie tiene bien:** posición (base/escolta/alero/ala-pívot/pívot), peso del jugador (<70 / 70-90 / >90 kg), tipo de cancha (parquet, pista municipal, asfalto exterior), ancho de pie.
2. **Métricas estandarizadas 1-10:** tracción, amortiguación, soporte lateral, peso real medido, durabilidad outdoor, ventilación.
3. **Reviews híbridas:** score editorial curado + reviews comunitarias verificadas con "horas jugadas" como meta-dato de credibilidad.
4. **Comparador lado-a-lado** (2-3 zapas con métricas + precio actual).
5. **Enfoque LatAm/España real:** conversión de tallaje US/EU, disponibilidad por país, alertas de precio en Amazon ES/MX/AR, Decathlon, Basket World.
6. **Ranking "zapatilla de pista de barrio"** — durabilidad outdoor, muy demandado en LatAm.
7. **Glosario técnico traducido** (herringbone → espina de pez, etc.) — sirve también para SEO.

### MVP v0.1 (2-4 semanas como hobby)
**Alcance:** 30-50 zapatillas top del momento con métricas curadas.

**Features:**
- Catálogo con ficha completa (imagen, specs, score, pros/cons, links afiliados Amazon ES + Decathlon).
- Filtros básicos (posición, presupuesto, indoor/outdoor).
- Comparador de 2 zapas.
- SEO desde día 1: URLs limpias, schema.org Product+Review, sitemap.

**Stack recomendado (simple, aprendible):**
- **Astro** + Tailwind (estático, SEO de fábrica, curva suave).
- Datos iniciales como **JSON/CSV** committeado al repo — sin BD todavía.
- Deploy gratis en **Vercel** o **Netlify**.

**Lo que NO va en MVP:** app móvil, sistema de cuentas, gamificación, scraping en tiempo real. Vienen en v0.2+.

### v0.2 (cuando haya tráfico)
- Auth + reviews comunitarias (Supabase).
- Alertas de precio.
- Wishlist por usuario.

### Riesgos identificados
- **WearTesters en Español** puede pivotar a BD si lo ve funcionar → ventaja de ser primero.
- Mantener 50+ fichas actualizadas requiere disciplina → empezar con 30 y crecer despacio es mejor que 100 desactualizadas.
- **Scope creep:** la tentación de meter también jerseys/hardware desde el inicio → no. Foco primero.

---

---

## Iteración v3 — De BD filtrable a asistente personalizado

A propuesta de Waldy, la visión del producto se afila. Deja de ser "BD con filtros para explorar" y pasa a ser un **asistente de decisión personalizado**: el user rellena un quiz corto, recibe 5 recomendaciones explicadas, las compara y se va a comprar a la tienda con mejor precio.

### Flujo del usuario

1. Llega al site → CTA único: "Encuentra tu zapatilla ideal".
2. Rellena un quiz de 7 preguntas obligatorias + 1 opcional (~60 segundos).
3. Ve 5 zapatillas recomendadas ordenadas por % de match, con explicación humana de por qué cada una encaja.
4. Compara lado a lado (tabla con 8 métricas).
5. Filtros visuales post-resultado para refinar (low-top only, colorways, etc.).
6. Click en "Comprar al mejor precio" → sale a la tienda con la oferta más barata (afiliado).

### El quiz (v1)

**Atributos puntuados en cada zapa (1-10):** tracción, amortiguación, respuesta, soporte_lateral, estabilidad, peso (más ligero = más alto), durabilidad_outdoor, ventilación. Más metadatos: precio, altura (low/mid/high-top), horma (normal/ancha).

| # | Pregunta | Opciones | Efecto en scoring |
|---|---|---|---|
| 1 | Posición de juego | Base / Escolta / Alero / Ala-pívot / Pívot | Base-Escolta: ↑ respuesta, ↑ peso ligero, ↑ tracción. Pívot: ↑ amortiguación, ↑ soporte, ↑ estabilidad |
| 2 | Peso del jugador | <70 / 70-85 / 85-100 / >100 kg | Más peso → ↑↑ amortiguación, ↑↑ estabilidad |
| 3 | Estilo de juego | Explosivo / Equilibrado / Potente / Tirador | Explosivo: ↑↑ respuesta. Potente: ↑↑ amortiguación, ↑↑ estabilidad |
| 4 | Dónde juegas | Interior / Exterior / Mezclo | Exterior: filtro duro durabilidad_outdoor ≥ 5 |
| 5 | Molestias / lesiones (multi) | Rodillas / Tobillos / Fascia / Ninguna | Rodillas: filtro duro cushion ≥ 6. Tobillos: filtro duro high-top + ↑↑ soporte |
| 6 | Prioridad única | Protección / Reactividad / Soporte tobillo / Durabilidad / Precio | Multiplica x1.5 el peso del atributo correspondiente |
| 7 | Presupuesto | <80 / 80-130 / 130-180 / 180+ / Sin tope | Filtro duro de precio |
| 8 (opc.) | Pie ancho | Normal / Ancho / No sé | Si ancho: ↑↑ zapas con horma ancha conocida |

### Lógica de scoring (sin IA)

```
Por cada zapa en la BD:
  1. Aplica filtros duros (precio, durabilidad outdoor, high-top según lesiones).
     Si no pasa → fuera.
  2. Calcula: score = Σ(atributo × peso) / Σ(pesos).
  3. Ordena descendente.
  4. Aplica regla de diversidad: máximo 2 zapas de la misma marca en el top 5.
  5. Muestra top 5 con % de match + 3 razones humanas de por qué encaja.
```

### Por qué 5 resultados (no 3)

El quiz no captura preferencia estética. Con 3 se corre el riesgo de que las 3 sean técnicamente perfectas pero ninguna le guste visualmente al user. Con 5 se le da margen para que coincida match técnico y "me gusta cómo se ve". Más de 5 = parálisis de decisión.

Para evitar que las 5 se parezcan demasiado entre sí, se aplica regla de diversidad: máx. 2 zapas de la misma marca y, si es posible, mezcla de categorías (cushion-focused / responsive / balanced).

---

## Principios editoriales

Estos principios son **inquebrantables** y guían cualquier decisión de producto, copy, comparador y política de patrocinios.

### 1. Fidelidad al usuario, no al afiliado
El scoring NUNCA se ajusta por comisión. Si la zapa que mejor encaja paga menos comisión, sale arriba igualmente.

### 2. El comparador muestra el mejor precio, no el mejor afiliado
Si Basket World tiene la zapa más barata aunque pague 2% y Amazon paga 4%, Basket World va arriba con el badge "Mejor precio".

### 3. Tiendas sin afiliado también aparecen
Si la mejor oferta está en una tienda sin programa de afiliados, se muestra igualmente (texto o link normal). El user gana siempre.

### 4. Si una zapa es mala, lo decimos
Editorial line directa. Sin eufemismos. "Esta zapa tiene cushion 4/10, no la recomendamos si pesas más de 80kg".

### 5. Transparencia explícita
Página visible "Cómo nos financiamos": *"Cobramos comisión solo si compras a través de nuestros links, pero NUNCA influye en qué te recomendamos."*

### 6. Patrocinios solo etiquetados y sin alterar el score
Si en el futuro una marca paga por una review, va etiquetada como "Patrocinado" de forma muy visible, y el score se aplica con los mismos criterios que cualquier otra zapa.

**Trade-off asumido:** se deja dinero corto plazo sobre la mesa, a cambio de construir confianza, retorno de usuarios, SEO orgánico y la posibilidad de modelos de ingreso premium (membresía, newsletter de pago) más adelante. Modelo inspirado en Wirecutter y RTINGS.

---

---

## Investigación profunda y decisiones finales (13/05/2026)

### Stack tecnológico final

| Capa | Elección | Razón |
|---|---|---|
| Framework | **Astro 5** + Tailwind | Cero JS por defecto → SEO perfecto. Islands Architecture deja meter Svelte/React solo en el quiz. Curva más suave que Next.js. |
| Datos (MVP) | **JSON estático** en repo | Versionado por git, sin BD, sin coste. Migrar a Turso cuando pasemos de 100 fichas. |
| CDN imágenes | **ImageKit free** | 20 GB/mes bandwidth + 3 GB storage + transformaciones ilimitadas. Permanente, no caduca. |
| Analytics | **Plausible Cloud** (€9/mes) o Umami self-hosted | RGPD-friendly, sin cookies. Evitar GA4. |
| Deploy | **Cloudflare Pages** o Vercel | Gratis, HTTPS automático, CI/CD desde GitHub. |
| Afiliados | JSON manual en MVP | Cuando pasemos de 50 fichas, evaluar Lasso. |

### Estrategia de afiliados (orden de prioridad)

| Programa | Red | Comisión calzado | Cookie | Notas |
|---|---|---|---|---|
| **Awin** (Decathlon + Nike EU + JD Sports) | Awin | Decathlon 3-9%, Nike ~7%, JD ~5% | 7-30 días | **Cuenta única que cubre 3 retailers clave**. Empezar aquí. |
| **Amazon Associates ES** | Propia | 3-4% deportes | **24h** | Cuidado: si no haces 3 ventas en 180 días, te expulsan. PA-API necesaria para imágenes (3 ventas previas requisito circular). |
| **Impact** (Foot Locker EU) | Impact | 2-8% | 30 días | Aprobación más fácil que Nike directo. |
| **AliExpress Portals** | Propia | 4-9% | 30 días | Esencial para marcas chinas (Anta, Peak, Way of Wade) en LatAm. |
| **Basket World** | Sin programa | — | — | Link orgánico sin afiliado (principio editorial #3 = transparencia). |

**Acción inmediata:** abrir cuenta Awin + Amazon Associates ES desde el día 1.

### Estrategia de imágenes

- **Vía recomendada:** press kits oficiales (Nike News, Adidas press, comunicados de marcas chinas en Weibo/Sina).
- **Fair use editorial** sólido si: review crítico + atribución + baja resolución (~800px) + sin uso publicitario.
- **NO** rehostear imágenes de Amazon sin PA-API aprobada.
- Servir todo desde ImageKit con `f_auto,q_auto` (WebP/AVIF automático).
- Pie de foto: "© [Marca] / Cortesía del fabricante".

### Metodología de scoring (cómo derivar nuestros 1-10)

Cada atributo se calcula combinando 2-3 fuentes públicas. Fórmula concreta:

```
tracción          = round((RunRepeat_friction × 10 + HoopsGeek_traction + WT_traction) / 3)
amortiguación     = round((RunRepeat_SA_heel/15 + HoopsGeek_cushion + WT_cushion) / 3)
respuesta         = round((10 - HG_cushion_plushness + WT_responsiveness) / 2)
soporte_lateral   = round((HG_support + WT_support) / 2)
estabilidad       = round((HG_support × 0.6 + HG_fit × 0.4 + WT_fit) / 2)
peso_score        = 10 - ((peso_gramos - 350) / 30)   // 350g→10, 650g→0
durabilidad_outdoor = WT_durability + (grosor_goma_mm > 4 ? +1 : 0)
ventilación       = inferencia_material + consenso_reviewers
```

Cuando falten datos de laboratorio, usar solo HoopsGeek + WearTesters (ambos ya en escala 1-10). **Cada zapa documenta sus fuentes en el campo `fuentes[]` de la BD** (principio #5: transparencia).

Fuentes confirmadas:
- **TheHoopsGeek**: 5 ejes (cushion, traction, material, support, fit) 1-10, agregado de 2.141 reviews.
- **WearTesters**: 5 ejes cualitativos + durability bonus.
- **RunRepeat**: lab tests (SATRA TM144 para tracción, shock absorption, peso medido en talla US 9, drop, flexibilidad).

### Estrategia SEO en español

12 keywords de oro identificadas (alto volumen + baja competencia actual):

1. mejores zapatillas baloncesto exterior 2026
2. zapatillas baloncesto rodillas / pivots pesados
3. Anta KAI 1 review español
4. Way of Wade España dónde comprar
5. zapatillas baloncesto pista calle
6. [modelo] vs [modelo] español (long-tail)
7. zapatillas baloncesto base bajo / alero
8. Decathlon Tarmak SE900 opinión
9. Curry 12 talla España
10. zapatillas baloncesto tobillo débil
11. tenis de basquetbol baratos MX (captura LatAm)
12. Nike LeBron 22 review en español

**Regionalización LatAm/España:** contenido dual. Title España usa "zapatillas de baloncesto", intro menciona "tenis de basquetbol" para MX/AR. Implementar `hreflang` cuando haya tráfico segmentado.

### Monitoreo de precios (escalado por fase)

- **Mes 1-3 (MVP):** actualización **manual mensual** en JSON (30 zapas × 4 tiendas = ~2h/mes). Suficiente.
- **Mes 4+:** scripts Node + Playwright en GitHub Actions (gratis), corren semanalmente, alertan cambios >10%.
- **Mes 12+:** Keepa API para Amazon (€49/mes) + scrapers propios para resto.

### Errores comunes a evitar (datos de afiliados que fracasan)

1. **Nicho demasiado amplio** → quedarnos solo en basket, no expandir a "deportes".
2. **Stuffing de afiliados sin valor** → 1 review profunda > 10 listicles refritados.
3. **Dependencia de una sola fuente de tráfico** → SEO + newsletter + redes desde día 1.
4. **Falta de paciencia** → asumir 6-12 meses sin ingresos serios.
5. **Ignorar la fiscalidad ES** → alta autónomo si ingresas >€1000/mes recurrente. Antes: declaración IRPF trimestral.
6. **No diversificar afiliados** → Amazon ES cancela si no haces 3 ventas en 180 días. Mantener Awin/Impact activos como backup.
7. **Métricas vanidosas** → medir EPC (earnings per click), no pageviews. 1.000 visitas × 5% CTR × €3 EPC > 10.000 visitas × €0.30 EPC.

---

## Esquema de datos final (v2)

Con las 5 decisiones de organización cerradas:

1. **Colorways:** una entrada por modelo. Foto principal + galería de colorways. Las métricas no cambian entre colorways del mismo modelo.
2. **GS (kids):** incluir con flag `genero: "gs"`. Muchos adultos pequeños las usan a mejor precio.
3. **Versiones anteriores:** cada generación = entrada independiente. Campos `predecesor_id` y `sucesor_id` para enlazarlas.
4. **Fuente inicial de scoring:** combinación documentada de WearTesters + HoopsGeek + RunRepeat. Evaluación propia se añade cuando se prueba la zapa físicamente.
5. **Campos añadidos:** `signature_player`, `tecnologia_clave` (Zoom Air, Boost, Lightstrike Pro, Cushlon, Boom...), `tipo_cierre` y `material_superior` quedan opcionales (no bloquean MVP).

```json
{
  "id": "nike-lebron-22",
  "slug": "nike-lebron-22",
  "marca": "Nike",
  "modelo": "LeBron 22",
  "generacion": 22,
  "año_lanzamiento": 2025,
  "genero": "unisex",                    // unisex | women | gs
  "signature_player": "LeBron James",
  "tecnologia_clave": ["Zoom Air", "Cushlon 3.0"],
  "predecesor_id": "nike-lebron-21",
  "sucesor_id": null,

  "peso_real_g": 425,                    // medido en US 9 (estándar WT/RunRepeat)
  "altura": "mid",                       // low | mid | high
  "horma": "ancha",                      // estrecha | normal | ancha
  "drop_mm": 10,
  "tipo_cierre": "cordones",             // opcional
  "material_superior": "mesh+tpu",       // opcional

  "puntuaciones": {
    "traccion": 8,
    "amortiguacion": 9,
    "respuesta": 6,
    "soporte_lateral": 8,
    "estabilidad": 9,
    "peso_score": 5,
    "durabilidad_outdoor": 7,
    "ventilacion": 6
  },

  "categoria_principal": "cushion-focused",
  "tags": ["signature", "moderno", "alta-gama"],

  "ideal_para": {
    "posiciones": ["pivot", "ala-pivot"],
    "peso_jugador_kg": [85, 110],
    "estilos": ["potente", "equilibrado"],
    "lesiones_compatibles": ["rodillas"]
  },
  "no_recomendada_para": {
    "posiciones": ["base"],
    "estilos": ["explosivo-rapido"]
  },

  "resumen": "Tope de gama para jugadores grandes que priorizan protección...",
  "pros": ["Cushioning líder", "Estabilidad excelente >90kg"],
  "contras": ["Pesada", "Precio elevado"],
  "veredicto": "Recomendada con reservas — solo si encajas en el perfil",

  "imagen_principal": "https://ik.imagekit.io/.../lebron-22-main.webp",
  "imagenes": ["...", "..."],
  "video_review_url": "https://youtube.com/...",

  "fuentes": [
    { "tipo": "weartesters", "url": "...", "score_original": "B+" },
    { "tipo": "hoops-geek", "url": "...", "score_original": 8.4 },
    { "tipo": "runrepeat-lab", "url": "...", "datos": "peso 425g, friction 0.82" }
  ],
  "ultima_actualizacion": "2026-05-13",

  "precio_msrp_eur": 200,
  "links_compra": [
    {
      "tienda": "amazon_es",
      "url": "...",
      "precio_actual": 189.99,
      "disponible": true,
      "tiene_afiliado": true,
      "ultima_verificacion": "2026-05-13"
    }
    // ... más tiendas
  ]
}
```

---

## Lista inicial de 30 zapatillas para el MVP

Selección balanceada que cubre todos los perfiles del quiz.

### Tope de gama (€140+) — 9 modelos
| # | Marca | Modelo | Año | MSRP | Perfil ideal |
|---|---|---|---|---|---|
| 1 | Nike | LeBron 22 | 2025 | €200 | Alas potentes, pesos. Mejor cushion en lab |
| 2 | Nike | KD 18 | 2025 | €150 | Tiradores altos. Tracción top |
| 3 | Nike | Kobe 8 Protro | 2024 | €180 | Bases explosivos, slashers |
| 4 | Nike | Luka 5 | 2025 | €150 | Bases pesados, step-back |
| 5 | Nike | GT Cut 3 / Turbo | 2024 | €170 | Guardias rápidos |
| 6 | UA | Curry 12 | 2024 | €160 | Tiradores ágiles, ligera |
| 7 | Jordan | Tatum 3 | 2025 | €140 | Forwards versátiles |
| 8 | Nike | Ja 2 | 2024 | €120 | Hyper-atléticos, dunkers |
| 9 | LiNing | Way of Wade All City 13 | 2025 | €140 | All-around premium |

### Gama media (€80-140) — 11 modelos
| # | Marca | Modelo | MSRP | Perfil ideal |
|---|---|---|---|---|
| 10 | Nike | Sabrina 2 | €120 | Bases ligeros, tiradoras |
| 11 | Nike | Kyrie Low 5 | €110 | Bases con cambios de dirección |
| 12 | Anta | KAI 1 Speed | €115 | Bases técnicos (oficial Kyrie) |
| 13 | Anta | KAI 2 | €115 | Bases all-around |
| 14 | Anta | KT 10 (Klay) | €120 | Tiradores rápidos |
| 15 | Jordan | Luka 3 | €130 | Bases pesados outdoor |
| 16 | LiNing | Way of Wade 12 | €135 | Premium outdoor |
| 17 | New Balance | Fresh Foam BB v3 | €120 | Pesos, cushioning |
| 18 | Adidas | Harden Vol 9 | €130 | Bases pivotes |
| 19 | Adidas | Dame Certified | €110 | Tiradores outdoor |
| 20 | Puma | MB.04 (LaMelo) | €130 | Híbridos creativos |

### Presupuesto (<€80) — 10 modelos
| # | Marca | Modelo | MSRP | Perfil ideal |
|---|---|---|---|---|
| 21 | Nike | Precision 8 | €75 | Iniciación, lockdown |
| 22 | Nike | LeBron Witness 9 | €80 | Pesos jóvenes |
| 23 | Adidas | Dame 9 | €75 | Tiradores casual |
| 24 | Adidas | Cross 'Em Up Select | €60 | Iniciación outdoor |
| 25 | Jordan | One Take 6 | €80 | Híbridos polivalentes |
| 26 | Decathlon | Tarmak Fast 900 | €65 | Recreativo, mejor compra Europa |
| 27 | Decathlon | Tarmak 500 mid | €40 | Niños/principiantes |
| 28 | Peak | Lou Williams Underground | €60 | Bases outdoor |
| 29 | AND1 | Attack 3.0 | €55 | Streetball |
| 30 | Anta | Shock The Game 5.0 | €70 | All-around budget |

**Cobertura del quiz:**
- Explosivos: #3, #5, #8
- Potentes: #1, #17, #1 + zapas premium
- Tiradores: #2, #6, #10, #14, #19
- Outdoor durables: #9, #15, #16, #26, #28
- Problemas de rodilla (cushion alto): #1, #17, #26
- Problemas de tobillo (mid/high-top): #4, #20, #27
- Bajo presupuesto: #24-30

---

## Candidatos de nombre de dominio

Necesitan verificación de disponibilidad (.com y .es). Mi ranking subjetivo:

| # | Nombre | Pros | Contras |
|---|---|---|---|
| 1 | **CanchaShoes** | Bilingüe (cancha + shoes), corto, memorable, transmite enfoque | "Shoes" en inglés puede chocar |
| 2 | **ZapaMatch** | "zapa" jerga ES, "match" = funcionalidad core (quiz), pega con LatAm | Suena un poco genérico |
| 3 | **MiBasket.shoes** | Personal, directo, dominio raro disponible | TLD `.shoes` menos conocido |
| 4 | **PistaBasket** | Muy ES, fácil pronunciar | Suena más a info que a producto |
| 5 | **BasketID** | "tu identidad de jugador → tu zapatilla" | Genérico, puede confundir |
| 6 | **TuZapaBasket** | Personal, claro | Más largo |
| 7 | **CanchaFit** | "fit" en doble sentido (encaje + ajuste) | "Fit" inglés |
| 8 | **HooperFit** | Cómo se llaman los baloncestistas, "fit" doble | Más anglo |

**Mi voto: CanchaShoes**. Bilingüe pero claro, cancha es universal en hispanohablante, "shoes" es palabra global, corto, marca-able. Verificar disponibilidad en namecheap.com o porkbun.com antes de cerrar.

---

## Estado actual y próximos pasos concretos

### Decidido y cerrado
- ✅ Producto: asistente de decisión (quiz → 5 recomendaciones → comparador → mejor precio).
- ✅ Quiz v1 (7 preguntas + 1 opcional).
- ✅ Principios editoriales (fidelidad al usuario, no al afiliado).
- ✅ Stack: Astro 5 + Tailwind + JSON + ImageKit + Plausible/Umami + Cloudflare Pages.
- ✅ Esquema de datos final.
- ✅ Lista inicial de 30 zapatillas seleccionadas.
- ✅ Estrategia de afiliados (Awin + Amazon ES + Impact + AliExpress).
- ✅ Metodología de scoring (fórmula concreta combinando WT + HG + RunRepeat).
- ✅ 12 keywords SEO de oro.

### Pendiente de decisión
- ⏳ Elegir nombre de dominio + comprarlo.
- ⏳ Confirmar/ajustar la fórmula de scoring con la primera zapa real.

### Próximos pasos concretos (orden recomendado)
1. **Elegir nombre + comprar dominio** (~€10-15/año en porkbun o namecheap).
2. **Abrir cuentas:** Amazon Associates ES + Awin (gratuitas).
3. **Setup repo + Astro inicial** (1-2 sesiones).
4. **Empezar con 5 zapatillas** del top de la lista para validar el esquema antes de hacer las 30.
5. **Construir el quiz** (formulario + lógica de scoring) con esas 5 zapas.
6. **Iterar:** completar a 30, pulir UI, publicar v0.1.
