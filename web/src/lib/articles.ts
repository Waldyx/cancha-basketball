// ─────────────────────────────────────────────────────────────────────
// Blog articles — CANCHA.ZAPA
// Cada artículo es un objeto con contenido en HTML.
// Rutas: /blog (index) y /blog/[slug] (detalle).
// ─────────────────────────────────────────────────────────────────────

export interface Article {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  fecha: string; // ISO YYYY-MM-DD
  fechaLabel: string; // "25 mayo 2026"
  categoria: string; // "Guías" | "Comparativas" | "Análisis"
  readMinutes: number;
  eyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  body: string; // HTML seguro (sin XSS, contenido editorial nuestro)
  imagen?: string; // URL imagen hero para OG y card
  // Para JSON-LD Article
  author: string;
  // SEO internal links sugeridos
  relatedShoes: string[]; // slugs de zapatillas
  relatedSeoPages: string[]; // slugs de páginas SEO
}

export const ARTICLES: Article[] = [
  // ── Herramienta: estadísticas de baloncesto ─────────────────────────
  {
    slug: "calcular-estadisticas-baloncesto-gratis",
    title: "Cómo calcular tus estadísticas de baloncesto gratis (TS%, valoración y más)",
    metaTitle: "Calcular estadísticas de baloncesto gratis: TS%, eFG%, valoración | CANCHA.ZAPA",
    description:
      "Registra tus partidos y calcula tus estadísticas avanzadas de baloncesto (TS%, eFG%, valoración FIBA) gratis y sin cuentas. Importa tu acta de la FEB, deja que el análisis te diga en qué mejorar y comparte tu temporada.",
    fecha: "2026-07-16",
    fechaLabel: "16 julio 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía · Herramienta gratuita",
    heroTitle: "Calcula tus estadísticas de baloncesto gratis",
    heroSubtitle: "TS%, eFG%, valoración y análisis automático · Sin cuentas, sin humo",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "ua-curry-13", "nike-lebron-23", "adidas-ae-2", "jordan-tatum-4"],
    relatedSeoPages: ["mejores-zapatillas-baloncesto-2025", "zapatillas-baloncesto-calidad-precio"],
    body: `
<p class="art-intro">Los puntos no cuentan toda la verdad. Un 20 puntos con 8/22 en tiros es peor partido que un 14 con 5/8, aunque el marcador diga lo contrario. Para saber de verdad cómo juegas necesitas mirar la <strong>eficiencia</strong>, no solo el volumen. Y eso se calcula — gratis y en un minuto.</p>

<h2>Las estadísticas que de verdad importan</h2>

<h3>TS% — Porcentaje de tiro real</h3>
<p>Es la mejor medida de eficiencia anotadora que existe, porque mete en la misma cuenta los tiros de 2, los de 3 (que valen más) y los tiros libres. Un anotador eficiente ronda el <strong>55%</strong>; por encima de 60% es nivel élite. La fórmula:</p>
<p><strong>TS% = Puntos ÷ (2 × (Tiros de campo intentados + 0,44 × Tiros libres intentados)) × 100</strong></p>

<h3>eFG% — Porcentaje de tiro efectivo</h3>
<p>Como el porcentaje de tiro normal, pero dándole al triple el valor extra que merece (un 3 vale 1,5 veces un 2). Sirve para comparar a un tirador exterior con uno interior de forma justa.</p>
<p><strong>eFG% = (Tiros de campo convertidos + 0,5 × Triples convertidos) ÷ Tiros de campo intentados × 100</strong></p>

<h3>Valoración (estilo FIBA)</h3>
<p>El número que resume tu aporte total en un solo dígito: suma lo bueno (puntos, rebotes, asistencias, robos, tapones) y resta lo malo (tiros fallados, pérdidas, faltas). Es la métrica oficial de la ACB y la FEB.</p>

<h3>Ratio asistencias / pérdidas</h3>
<p>Para bases sobre todo: cuántos balones conviertes en canasta frente a cuántos regalas. Por debajo de 1 es una señal de alarma; por encima de 2, eres un organizador fiable.</p>

<h2>Calcularlas a mano es un rollo. Hazlo gratis en dos clics</h2>
<p>Puedes sacar todo esto con una calculadora y las fórmulas de arriba… o dejar que lo haga la herramienta. En <a href="/estadisticas">la calculadora de estadísticas de CANCHA.ZAPA</a> apuntas tu línea de cada partido (tiros, rebotes, asistencias…) y te devuelve al instante tus medias, tu TS%, tu eFG% y tu valoración, con un gráfico de tu evolución partido a partido. <strong>Gratis, sin cuentas y sin registro</strong>: todo se guarda en tu propio navegador.</p>

<h3>¿Juegas federado? Importa tu acta oficial</h3>
<p>Si juegas en una competición de la <strong>Federación Española (FEB)</strong>, no tienes ni que teclear: pega el enlace de tu partido y la herramienta lee el acta oficial, te muestra el equipo y rellena tu línea sola. Y si juegas en una liga autonómica (Cataluña y otras), puedes pegar la tabla de estadísticas tal cual y la interpreta igual.</p>

<h3>Un análisis que te dice en qué mejorar</h3>
<p>Además de los números, un agente analiza tu temporada y te suelta consejos concretos sin rodeos: si dejas puntos en la línea de tiros libres, si tu triple no es rentable, si pierdes demasiados balones o si tu rendimiento se hunde contra ciertos rivales. Y puedes generar una <strong>tarjeta de tu temporada</strong> lista para compartir.</p>

<h2>Tus estadísticas también dicen qué zapatilla necesitas</h2>
<p>Aquí es donde los números se vuelven útiles de verdad para tu juego. Tu línea revela tu estilo, y tu estilo pide un tipo de zapatilla:</p>
<ul>
  <li><strong>Muchos robos y pocos rebotes</strong> → vives de las manos rápidas y los cambios de dirección. Prioriza <strong>tracción</strong> y una zapa reactiva y baja, tipo <a href="/zapatilla/nike-gt-cut-4">Nike GT Cut 4</a> o <a href="/zapatilla/ua-curry-13">UA Curry 13</a>.</li>
  <li><strong>Muchos rebotes y minutos</strong> → saltas y aterrizas sin parar. Prioriza <strong>amortiguación y estabilidad</strong>, tipo <a href="/zapatilla/nike-lebron-23">Nike LeBron 23</a>.</li>
  <li><strong>Perfil equilibrado de alero</strong> → busca una zapa versátil como la <a href="/zapatilla/jordan-tatum-4">Jordan Tatum 4</a> o la <a href="/zapatilla/adidas-ae-2">adidas AE 2</a>.</li>
</ul>
<p>¿No lo tienes claro? El <a href="/quiz">quiz</a> cruza tu perfil con las 200+ zapatillas del catálogo y te da las 5 más compatibles en menos de un minuto.</p>

<p class="art-outro">Deja de fiarte solo de los puntos. <a href="/estadisticas">Registra tu próximo partido gratis</a> y empieza a ver cómo juegas de verdad.</p>
    `,
  },

  // ── 1. Guía completa ────────────────────────────────────────────────
  {
    slug: "como-elegir-zapatillas-baloncesto-2025",
    title: "Cómo elegir tus zapatillas de baloncesto: guía completa 2025-2026",
    metaTitle: "Cómo elegir zapatillas de baloncesto: guía completa 2025 | CANCHA.ZAPA",
    description:
      "Guía completa para elegir zapatillas de baloncesto según tu posición, peso, cancha y presupuesto. Sin publicidad disfrazada.",
    fecha: "2026-05-20",
    fechaLabel: "20 mayo 2026",
    categoria: "Guías",
    readMinutes: 7,
    eyebrow: "★ Guía editorial · CANCHA.ZAPA",
    heroTitle: "Cómo elegir zapatillas de baloncesto",
    heroSubtitle: "Guía completa 2025-2026 · Sin publicidad disfrazada",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "adidas-ae-2", "ua-curry-13", "nike-lebron-23", "jordan-tatum-4"],
    relatedSeoPages: ["mejor-zapatilla-base", "mejor-zapatilla-pivot", "zapatillas-baloncesto-baratas"],
    body: `
<p class="art-intro">Cada año salen decenas de modelos nuevos, cada uno prometiendo ser "el mejor". La realidad es más sencilla: la mejor zapatilla para ti depende de cuatro variables. Si las entiendes, nunca comprarás mal.</p>

<h2>Las 4 variables que importan</h2>

<h3>1. Tu posición</h3>
<p>La posición es el filtro más importante. Un base necesita zapatillas ligeras y reactivas — cada gramo extra se nota en el sprint. Un pívot necesita lo contrario: máxima amortiguación y soporte lateral para los aterrizajes constantes.</p>
<ul>
  <li><strong>Bases y escoltas:</strong> Prioriza respuesta (score 8+) y ligereza (sub-380g). Low-top o mid-top según historial de tobillos.</li>
  <li><strong>Aleros:</strong> El equilibrio manda. Score 7+ en todos los ejes. Mid-top casi siempre.</li>
  <li><strong>Ala-pívots y pívots:</strong> Amortiguación 8+, estabilidad 8+, altura mid o high. El peso de la zapa importa menos.</li>
</ul>

<h3>2. Tu peso</h3>
<p>Una persona de 100kg aterrizando recibe más de 500kg de impacto en cada salto. La espuma que aguanta eso no es la misma que necesita alguien de 65kg. Regla general: cada 15kg por encima de 70, necesitas un punto más de amortiguación.</p>

<h3>3. La cancha donde juegas</h3>
<p>El asfalto se come las suelas en meses. Lo que dura 2 años en pabellón dura 3 meses fuera. Si juegas outdoor más del 30% del tiempo, mira durabilidad outdoor ≥ 7 como filtro duro. Las zapas reactivas (UA Curry, GT Cut) no son para exterior.</p>

<h3>4. Tu presupuesto real</h3>
<p>Hay tres rangos que tienen sentido:</p>
<ul>
  <li><strong>Hasta 80€:</strong> Para recreativos casuales, junior y primera zapatilla. Decathlon Tarmak, Adidas Cross 'Em Up.</li>
  <li><strong>80-130€:</strong> El sweet spot. Aquí están las mejores relaciones calidad-precio: Nike Ja 3, Adidas AE 2, UA Curry 13.</li>
  <li><strong>130€+:</strong> Para quien juega 3+ veces por semana y nota la diferencia. Nike KD 19, Air Jordan 40, LeBron 23.</li>
</ul>

<h2>Lo que NO importa (tanto como piensas)</h2>

<h3>El nombre del jugador</h3>
<p>Las Kobe 8 Protro no te hacen jugar como Kobe. Las LeBron 23 no te hacen más alto. Son herramientas. Evalúalas por sus specs, no por el logo.</p>

<h3>El precio</h3>
<p>Gastar 200€ no garantiza mejor rendimiento que gastar 130€. En el rango 100-150€ la mejora marginal por euro gastado es enorme. Por encima de 150€, se estabiliza. Muchas de las mejores zapas de 2025 cuestan entre 120€ y 150€.</p>

<h3>El color</h3>
<p>Obvio, pero vale la pena decirlo: no dejes que una colorway bonita te haga comprar una zapa que no encaja con tu perfil.</p>

<h2>Cómo leer una ficha técnica</h2>
<p>En CANCHA.ZAPA puntuamos 8 atributos en escala 1-10:</p>
<ul>
  <li><strong>Tracción:</strong> Agarre en pista. Bajo 7 en parquet interior es un problema.</li>
  <li><strong>Amortiguación:</strong> Protección de impactos. Crítico para jugadores >85kg o con lesiones de rodilla.</li>
  <li><strong>Respuesta:</strong> Court feel y reactividad. Lo que hace que sientas el suelo y reacciones rápido.</li>
  <li><strong>Soporte lateral:</strong> Contención del pie en cortes. Clave si tienes historial de esguinces.</li>
  <li><strong>Estabilidad:</strong> Base sólida sin tambaleo. Importante para jugadores físicos.</li>
  <li><strong>Ligereza:</strong> Inverso del peso. 10 = muy ligera; 5 = pesada pero funcional.</li>
  <li><strong>Durabilidad outdoor:</strong> Qué aguanta en asfalto. Solo si juegas fuera.</li>
  <li><strong>Ventilación:</strong> Qué transpira en partidos largos. Infravaluado.</li>
</ul>

<h2>El proceso de compra</h2>
<p>Si sigues estos cuatro pasos, difícilmente te equivocarás:</p>
<ol>
  <li><strong>Haz el quiz:</strong> 10 preguntas, menos de un minuto. Te damos las 5 más compatibles con tu perfil.</li>
  <li><strong>Lee las fichas de las top 3:</strong> Pros, contras y veredicto honesto. Sin exageración.</li>
  <li><strong>Compara precios:</strong> El mismo modelo puede variar 20-30€ entre tiendas. Compáralo en el bloque de compra de cada ficha, con las tiendas y el precio actualizado.</li>
  <li><strong>Compra, juega, y si no encaja, devuelve:</strong> La mayoría de tiendas admiten devolución en 30 días. Úsalas en pista interior el primer día para no perder el derecho.</li>
</ol>

<p class="art-outro">Si tienes dudas sobre qué modelo concreto elegir, <a href="/quiz">empieza el quiz</a> — en menos de un minuto tienes tu lista personalizada.</p>
    `,
  },

  // ── 2. Comparativa AE 2 vs Ja 3 ─────────────────────────────────────
  {
    slug: "adidas-ae-2-vs-nike-ja-3-2025",
    title: "AE 2 vs Ja 3: ¿cuál es mejor para guards y escoltas en 2025?",
    metaTitle: "Adidas AE 2 vs Nike Ja 3 2025: comparativa completa | CANCHA.ZAPA",
    description:
      "Comparativa técnica entre la Adidas AE 2 (Anthony Edwards) y la Nike Ja 3 (Ja Morant): tracción, amortiguación, horma y precio para guards y escoltas.",
    fecha: "2026-05-22",
    fechaLabel: "22 mayo 2026",
    categoria: "Comparativas",
    readMinutes: 5,
    eyebrow: "★ Comparativa · Guards 2025",
    heroTitle: "AE 2 vs Ja 3",
    heroSubtitle: "La batalla de los guards en 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["adidas-ae-2", "nike-ja-3", "ua-curry-13", "nike-gt-cut-4"],
    relatedSeoPages: ["mejor-zapatilla-base", "mejor-zapatilla-escolta", "zapatillas-reactivas"],
    body: `
<p class="art-intro">2025 tiene dos claros candidatos al trono de los guards: la Adidas AE 2 de Anthony Edwards y la Nike Ja 3 de Ja Morant. La AE 2 está desde {{precio:adidas-ae-2}} y la Ja 3 desde {{precio:nike-ja-3}}; las dos son low-top, y las dos prometen lo mismo. Aquí te decimos cuál vale realmente la pena.</p>

<h2>Resumen rápido</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Atributo</th>
      <th style="padding:8px;text-align:center">Adidas AE 2</th>
      <th style="padding:8px;text-align:center">Nike Ja 3</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Tracción</td>
      <td style="padding:8px;text-align:center">{{nota:adidas-ae-2:traccion}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-ja-3:traccion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Amortiguación</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-ae-2:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-ja-3:amortiguacion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Respuesta</td>
      <td style="padding:8px;text-align:center">{{nota:adidas-ae-2:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-ja-3:respuesta}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Horma</td>
      <td style="padding:8px;text-align:center">Normal</td>
      <td style="padding:8px;text-align:center">Estrecha</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Peso</td>
      <td style="padding:8px;text-align:center">{{peso:adidas-ae-2}}</td>
      <td style="padding:8px;text-align:center">{{peso:nike-ja-3}}</td>
    </tr>
    <tr>
      <td style="padding:8px">Precio</td>
      <td style="padding:8px;text-align:center">{{precio:adidas-ae-2}}</td>
      <td style="padding:8px;text-align:center">{{precio:nike-ja-3}}</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Tracción: {{nota:adidas-ae-2:traccion}} la AE 2 y {{nota:nike-ja-3:traccion}} la Ja 3</h2>
<p>El patrón herringbone de la AE 2 es uno de los mejores del mercado en 2025. Agarra sin necesidad de limpiar cada partido y funciona bien en parquet polvoriento. La Ja 3 también agarra muy bien: en nuestra ficha empatan.</p>
<p><strong>Veredicto:</strong> empate. Decide por amortiguación, horma o precio.</p>

<h2>Amortiguación: {{nota:adidas-ae-2:amortiguacion}} la AE 2 y {{nota:nike-ja-3:amortiguacion}} la Ja 3</h2>
<p>La Ja 3 usa ZoomX full-length — la misma espuma de los Vaporfly de running. Su tacto es distinto al del Light BOOST con Lightstrike de la AE 2. Aun así, en nuestra ficha la AE 2 puntúa un punto más en amortiguación.</p>
<p><strong>Veredicto:</strong> AE 2 si priorizas la amortiguación; Ja 3 si prefieres un tacto más blando.</p>

<h2>Respuesta: empate técnico</h2>
<p>Ambas tienen {{nota:adidas-ae-2:respuesta}} en respuesta en nuestro análisis. La AE 2 tiene un primer paso más agresivo gracias al Light BOOST con Propulsion Plate; la Ja 3 tiene más bounce pero similar tiempo de respuesta. Para guards explosivos, las dos están en el mismo nivel.</p>

<h2>Horma: ninguna de las dos es para pies anchos</h2>
<p>La AE 2 tiene horma normal — ni estrecha ni ancha. La Ja 3 es más ceñida: los análisis la describen como estrecha y con un rodaje inicial, y aconsejan subir media talla si tu pie es ancho. Con pie ancho, pruébate cualquiera de las dos antes de comprar.</p>

<h2>¿Cuál debo comprar?</h2>
<p>Depende de qué priorices:</p>
<ul>
  <li><strong>Elige la AE 2 si:</strong> priorizas tracción sobre todo, juegas en pistas con polvo, tienes pie normal y buscas el menor precio posible.</li>
  <li><strong>Elige la Ja 3 si:</strong> priorizas el cushion y el bounce, pesas más de 80kg o juegas en pistas en buen estado donde la tracción no es problema.</li>
</ul>

<p>Las dos son excelentes zapatillas de guards de 2025. Si te queda duda, <a href="/comparar?slugs=adidas-ae-2,nike-ja-3">compáralas aquí lado a lado</a> con todos los atributos desplegados.</p>

<p class="art-outro">¿Aún no sabes cuál encaja con tu perfil específico? <a href="/quiz">El quiz te da la respuesta en 10 preguntas</a>.</p>
    `,
  },

  // ── 3. Análisis Air Jordan 40 ─────────────────────────────────────────
  {
    slug: "air-jordan-40-analisis-2025",
    title: "Air Jordan 40: análisis completo — ¿la mejor Jordan performance de la historia?",
    metaTitle: "Air Jordan 40 análisis completo 2025 | CANCHA.ZAPA",
    description:
      "Análisis técnico completo de la Air Jordan 40: ZoomX + Zoom Strobel, herringbone de 40°, 6 straps internos. ¿Merece la pena su precio?",
    fecha: "2026-05-24",
    fechaLabel: "24 mayo 2026",
    categoria: "Análisis",
    readMinutes: 6,
    eyebrow: "★ Análisis en profundidad",
    heroTitle: "Air Jordan 40",
    heroSubtitle: "¿La mejor mainline de Jordan Brand en años?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["jordan-40", "jordan-tatum-4", "nike-kd-19", "nike-lebron-23"],
    relatedSeoPages: ["mejores-zapatillas-jordan", "zapatillas-baloncesto-premium", "zapatillas-cushion"],
    body: `
<p class="art-intro">Jordan Brand llevaba años sin innovar de verdad en su línea mainline. La Jordan 38 fue discreta; la 39 mejoró pero sin hito tecnológico. Con la Air Jordan 40, la cosa cambia: es la primera zapatilla de baloncesto en combinar ZoomX foam con Zoom Strobel — tecnología que antes solo existía en los running más caros del mercado.</p>

<h2>La tecnología que la hace especial</h2>

<h3>ZoomX foam full-length</h3>
<p>ZoomX es la espuma de los Vaporfly y Alphafly de Nike, las zapatillas de running más rápidas del planeta. Devuelve el 85% de la energía de cada pisada — el mayor porcentaje de cualquier espuma Nike. En baloncesto, eso se traduce en un bounce distinto a todo lo que habías pisado antes.</p>
<p>La trampa: ZoomX es muy blanda. Sola, sería demasiado inestable para baloncesto. Jordan Brand la combina con Zoom Strobel para añadir firmeza y control.</p>

<h3>Zoom Strobel full-length</h3>
<p>El Zoom Strobel es una bolsa de aire que recorre toda la longitud de la zapatilla, justo encima del ZoomX. Añade responsividad más firme y "pops" en cada zancada. La combinación de ZoomX debajo + Zoom Strobel encima es, técnicamente, el paquete de cushion más avanzado que Jordan Brand ha puesto en una zapatilla de baloncesto.</p>

<h3>6 correas internas de contención</h3>
<p>Para compensar la blandura del ZoomX, la Jordan 40 incorpora seis correas internas que se activan con los cordones. Cuando ajustas, sientes cómo el pie queda contenido lateralmente. El resultado es un equilibrio cushion/soporte que la Jordan 38 y 39 no lograban.</p>

<h3>Herringbone de 40°</h3>
<p>El patrón de suela tiene cantos en ángulos de exactamente 40°, diseñados para los movimientos más frecuentes del baloncesto: arranques, paradas y cambios de dirección a ese ángulo. En pista limpia, la tracción es excelente. El problema: el ZoomX es imán de polvo. En pabellones sucios, la suela pierde agarre rápidamente. Es el principal punto débil de la zapatilla.</p>

<h2>Rendimiento real</h2>

<h3>Para qué tipo de jugador</h3>
<p>La Jordan 40 es ideal para aleros y ala-pívots de 75-100kg que priorizan cushion y bounce. No es para guards puros — es demasiado pesada y el ZoomX (aunque reactivo) no da el mismo primer paso que una AE 2 o una Ja 3.</p>

<h3>Puntuación técnica CANCHA.ZAPA</h3>
<ul>
  <li>Tracción: {{nota:jordan-40:traccion}}</li>
  <li>Amortiguación: <strong>{{nota:jordan-40:amortiguacion}}</strong> — entre las mejores del mercado mainline</li>
  <li>Respuesta: {{nota:jordan-40:respuesta}} (el ZoomX bounce es lo mejor que ofrece)</li>
  <li>Soporte lateral: {{nota:jordan-40:soporte_lateral}} (las 6 correas hacen su trabajo)</li>
  <li>Estabilidad: {{nota:jordan-40:estabilidad}}</li>
  <li>Ligereza: {{nota:jordan-40:peso_score}} ({{peso:jordan-40}})</li>
  <li>Durabilidad outdoor: {{nota:jordan-40:durabilidad_outdoor}} (no la lleves al asfalto)</li>
</ul>

<h2>¿Vale los {{precio:jordan-40}}?</h2>
<p>Esa es la pregunta del millón. La respuesta honesta: <strong>sí, si juegas 3+ veces por semana y priorizas cushion</strong>. El ZoomX + Zoom Strobel es tecnología real que se nota en partidos largos. Para un pívot o ala-pívot que aterriza constantemente, puede hacer una diferencia real en cómo se siente el cuerpo al día siguiente.</p>

<p>Si juegas recreativo o menos de 2 veces por semana, ahorra y compra una Jordan Tatum 4 o una Nike KD 18 — ambas ofrecen 90% del rendimiento de la Jordan 40 a menor precio.</p>

<h2>Disponibilidad en España</h2>
<p>El precio de salida fue 199.99€; en los primeros meses suele haber pequeñas rebajas en colorways específicos. Consulta las tiendas y el precio actualizado en nuestra <a href="/zapatilla/jordan-40">ficha de la Jordan 40</a>.</p>

<p class="art-outro">¿No estás seguro si la Jordan 40 es para ti? <a href="/quiz">Haz el quiz</a> — en función de tu posición, peso y presupuesto te diremos si es tu match o si hay algo más adecuado.</p>
    `,
  },

  // ── 4. Mejores zapatillas para pívots ────────────────────────────────
  {
    slug: "mejores-zapatillas-pivots-2025",
    title: "Mejores zapatillas de baloncesto para pívots en 2025-2026",
    metaTitle: "Mejores zapatillas para pívots 2025-2026 | CANCHA.ZAPA",
    description:
      "Análisis técnico de las mejores zapatillas para pívots en 2025: LeBron 23, KD 19, Jordan 40 y ANTA KT 11. Amortiguación, soporte y estabilidad para el juego interior.",
    fecha: "2026-05-26",
    fechaLabel: "26 mayo 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía por posición · Pívots",
    heroTitle: "Mejores zapas para pívots",
    heroSubtitle: "2025-2026 · Amortiguación, soporte y estabilidad",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-lebron-23", "nike-kd-19", "jordan-40", "anta-kt-11"],
    relatedSeoPages: ["mejor-zapatilla-pivot", "zapatillas-baloncesto-para-rodillas", "zapatillas-cushion"],
    body: `
<p class="art-intro">El pívot es la posición más exigente para una zapatilla. Cada rebote supone cientos de kilos de impacto. Cada bloqueo implica fricción lateral máxima. Y todo eso repetido durante 40 minutos. La zapatilla adecuada marca la diferencia entre aguantar el partido entero o coger el banquillo con las rodillas quemadas.</p>

<h2>Qué necesita un pívot de su zapatilla</h2>

<p>Antes de hablar de modelos, los filtros que importan:</p>
<ul>
  <li><strong>Amortiguación ≥ 8:</strong> Absorción de impactos en aterrizajes. Para jugadores de más de 90kg, prioridad máxima.</li>
  <li><strong>Soporte lateral ≥ 8:</strong> Contención del pie en giros y cargas bajo el aro.</li>
  <li><strong>Caña mid o high:</strong> Protección del tobillo en contactos físicos constantes.</li>
  <li><strong>Estabilidad ≥ 7:</strong> Base sólida para pujar sin tambaleo.</li>
  <li><strong>Tracción en interior ≥ 8:</strong> El asfalto no es tu cancha. La tracción en parquet es lo que cuenta.</li>
</ul>

<p>El peso de la zapatilla importa menos que en otras posiciones. Un pívot no sprint de media cancha cada 20 segundos — puede asumir 380-420g si eso se traduce en mejor protección.</p>

<h2>Los 4 modelos que recomendamos en 2025</h2>

<h3><a href="/zapatilla/nike-lebron-23">Nike LeBron 23 — desde {{precio:nike-lebron-23}}</a></h3>
<p><strong>Para qué perfil:</strong> Pívots y ala-pívots de 85-110kg que necesitan la máxima amortiguación posible sin perder tracción.</p>
<ul>
  <li>✅ ZoomX de longitud completa con Cushlon y placa de carbono: el combo de cushion más potente de Nike en baloncesto.</li>
  <li>✅ Suela de caucho multidireccional: agarre excepcional en parquet limpio y sucio.</li>
  <li>✅ Upper con refuerzos: soporte lateral sólido sin rigidez excesiva.</li>
  <li>❌ 455 g — la más pesada del grupo. Se nota en las ayudas defensivas lentas.</li>
  <li>✅ Horma amable con el pie ancho, aunque el talón va algo estrecho.</li>
</ul>

<h3><a href="/zapatilla/nike-kd-19">Nike KD 19 — desde {{precio:nike-kd-19}}</a></h3>
<p><strong>Para qué perfil:</strong> Ala-pívots más dinámicos, 80-100kg, que no quieren sacrificar velocidad por cushion.</p>
<ul>
  <li>✅ Zoom Strobel + Cushlon 3.0: cushion reactivo, no solo absorbente. Bounce real.</li>
  <li>✅ Upper TPU con dagger-cage: soporte lateral sin peso extra.</li>
  <li>✅ Más barata que la LeBron 23 con rendimiento casi equivalente.</li>
  <li>❌ La amortiguación queda algo por debajo de la LeBron 23 para aterrizajes muy duros.</li>
  <li>❌ Horma algo estrecha en el antepié.</li>
</ul>

<h3><a href="/zapatilla/jordan-40">Air Jordan 40 — desde {{precio:jordan-40}}</a></h3>
<p><strong>Para qué perfil:</strong> Ala-pívots que priorizan el bounce sobre todo y pueden invertir en la opción premium.</p>
<ul>
  <li>✅ ZoomX + Zoom Strobel: la combinación de espuma más avanzada que Jordan Brand ha puesto en baloncesto. Devuelve el 85% de la energía.</li>
  <li>✅ 6 correas internas de contención: soporte lateral excepcional a pesar de la blandura del ZoomX.</li>
  <li>✅ Herringbone 40°: muy buena tracción en pista limpia.</li>
  <li>❌ {{precio:jordan-40}} — precio premium. Solo tiene sentido si juegas 3+ veces por semana.</li>
  <li>❌ El ZoomX atrae el polvo. En pistas sucias, la tracción baja notablemente.</li>
  <li>❌ 439 g — casi tan pesada como la LeBron.</li>
</ul>

<h3><a href="/zapatilla/anta-kt-11">ANTA KT 11 — desde {{precio:anta-kt-11}}</a></h3>
<p><strong>Para qué perfil:</strong> Jugadores de recreativo o junior con presupuesto ajustado que no quieren sacrificar todo el soporte.</p>
<ul>
  <li>✅ Más económica que la KD 19 con soporte más que aceptable para recreativo.</li>
  <li>✅ Tecnología A-Flashfoam: ligera y con cushion decente para su precio.</li>
  <li>✅ Upper malla reforzada con soporte lateral suficiente para partidos casuales.</li>
  <li>❌ La amortiguación no está al nivel de las opciones premium. Dos partidos a la semana: bien. Cuatro: las rodillas lo notarán.</li>
  <li>❌ Durabilidad inferior a largo plazo.</li>
</ul>

<h2>Comparativa rápida</h2>

<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Modelo</th>
      <th style="padding:8px;text-align:center">Amortiguación</th>
      <th style="padding:8px;text-align:center">Soporte</th>
      <th style="padding:8px;text-align:center">Tracción</th>
      <th style="padding:8px;text-align:center">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Nike LeBron 23</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:nike-lebron-23:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-lebron-23:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-lebron-23:traccion}}</td>
      <td style="padding:8px;text-align:center">{{precio:nike-lebron-23}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Nike KD 19</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:nike-kd-19:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-kd-19:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:nike-kd-19:traccion}}</td>
      <td style="padding:8px;text-align:center">{{precio:nike-kd-19}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Air Jordan 40</strong></td>
      <td style="padding:8px;text-align:center">{{nota:jordan-40:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:jordan-40:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:jordan-40:traccion}}</td>
      <td style="padding:8px;text-align:center">{{precio:jordan-40}}</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>ANTA KT 11</strong></td>
      <td style="padding:8px;text-align:center">{{nota:anta-kt-11:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:anta-kt-11:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:anta-kt-11:traccion}}</td>
      <td style="padding:8px;text-align:center">{{precio:anta-kt-11}}</td>
    </tr>
  </tbody>
</table>
</div>

<h2>¿Cuál elegir?</h2>
<ul>
  <li><strong>Si pesas más de 95kg y juegas 3+ veces/semana:</strong> Nike LeBron 23. Su amortiguación (ZoomX + Cushlon) es de las más protectoras del catálogo.</li>
  <li><strong>Si eres ala-pívot dinámico y buscas el mejor equilibrio precio/rendimiento:</strong> Nike KD 19, desde {{precio:nike-kd-19}}.</li>
  <li><strong>Si priorizas el bounce y puedes gastar 200€:</strong> Air Jordan 40. Es la más avanzada tecnológicamente.</li>
  <li><strong>Si eres junior o juegas recreativo con presupuesto ajustado:</strong> ANTA KT 11. Desde {{precio:anta-kt-11}} con soporte honesto.</li>
</ul>

<p class="art-outro">¿Sigues sin decidirte? El <a href="/quiz">quiz de CANCHA.ZAPA</a> cruza tu peso, posición, historial de lesiones y presupuesto para darte los 5 modelos más compatibles contigo. Menos de un minuto.</p>
    `,
  },

  // ── 5. Outdoor ───────────────────────────────────────────────────────
  {
    slug: "mejores-zapatillas-baloncesto-outdoor-2025",
    title: "Mejores zapatillas de baloncesto para outdoor en 2025-2026",
    metaTitle: "Mejores zapatillas de baloncesto outdoor 2025 | CANCHA.ZAPA",
    description:
      "Zapatillas de baloncesto para exterior: las que aguantan el asfalto según las reviews, cuáles evitar (UA Flow, AE 2, GT Cut) y comparativa de durabilidad outdoor.",
    fecha: "2026-10-19",
    fechaLabel: "19 octubre 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía outdoor · Exterior 2026",
    heroTitle: "Zapatillas outdoor 2026",
    heroSubtitle: "Cuáles aguantan el asfalto y cuáles no",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["lining-wow-allcity-14", "anta-shock-wave-5", "jordan-luka-77", "adidas-dame-certified", "nike-precision-7"],
    relatedSeoPages: ["zapatillas-outdoor", "zapatillas-baloncesto-baratas", "mejor-zapatilla-base"],
    body: `
<p class="art-intro">El baloncesto al aire libre es el mayor enemigo de tus zapatillas de interior. El asfalto y el cemento destrozan suelas en cuestión de semanas. Lo que dura 2 temporadas en pabellón puede quedar inutilizable después de 10 partidos en la calle. Antes de comprar, tienes que saber qué buscar — y qué evitar.</p>

<h2>Qué diferencia una zapatilla outdoor de una de interior</h2>
<p>Las zapatillas de interior priorizan tracción delicada en parquet y suelas blandas para máximo court feel. En exterior, esas mismas características se vuelven un problema:</p>
<ul>
  <li><strong>Suela de goma gruesa:</strong> el caucho resistente aguanta la abrasión del asfalto. Sin él, la espuma se destruye en semanas.</li>
  <li><strong>Patrón de tracción profundo:</strong> los tacos planos se lisan rápido. Necesitas cantos profundos que aguanten el desgaste.</li>
  <li><strong>Upper reforzado:</strong> la malla fina se desgarra. Los tejidos más densos o sintéticos aguantan mejor los golpes y la suciedad.</li>
</ul>

<h2>Las que aguantan el exterior en 2026</h2>
<p>Para elegir no nos fiamos de lo que dice la marca: miramos qué parte de los analistas que reseñan cada zapatilla la dan por apta para exterior (las reviews que agrega HoopsGeek) y lo cruzamos con su precio en tiendas españolas. Estas cinco salen bien paradas y se compran en España.</p>

<h3><a href="/zapatilla/lining-wow-allcity-14">Li-Ning Way of Wade All City 14 — desde {{precio:lining-wow-allcity-14}}</a></h3>
<p>La más completa de la lista: rinde como una zapatilla de gama alta en pista cubierta (9/10 en HoopsGeek) y el 80 % de los análisis la da por apta para exterior. Si solo vas a tener un par para dentro y para fuera, es esta.</p>
<ul>
  <li>✅ Nota global de gama alta a precio de gama media</li>
  <li>✅ Suela de goma que aguanta el asfalto</li>
  <li>❌ Se compra en AliExpress: el envío tarda más que en una tienda española</li>
</ul>

<h3><a href="/zapatilla/anta-shock-wave-5">Anta Shock Wave 5 — desde {{precio:anta-shock-wave-5}}</a></h3>
<p>Goma gruesa y flexible con surcos profundos: todos los análisis la consideran apta para exterior y conserva el agarre en pistas rugosas. Es la apuesta segura si juegas casi siempre en la calle.</p>
<ul>
  <li>✅ Apta para exterior en el 100 % de los análisis</li>
  <li>✅ Tracción que no se pierde en superficie rugosa</li>
  <li>❌ También se compra en AliExpress</li>
</ul>

<h3><a href="/zapatilla/jordan-luka-77">Jordan Luka .77 — desde {{precio:jordan-luka-77}}</a></h3>
<p>La versión asequible de la línea de Luka Doncic lleva una suela de goma pensada para la calle: los analistas destacan su durabilidad y una tracción constante en pistas rugosas (92 % la ven apta para exterior).</p>
<ul>
  <li>✅ Suela construida para exterior</li>
  <li>✅ Precio contenido para una Jordan</li>
</ul>

<h3><a href="/zapatilla/adidas-dame-certified">Adidas Dame Certified — desde {{precio:adidas-dame-certified}}</a></h3>
<p>Suela de goma gruesa y una tracción que aguanta el desgaste: el 88 % de los análisis la recomienda para exterior. De las mejores relaciones entre durabilidad y precio del catálogo.</p>
<ul>
  <li>✅ Goma gruesa pensada para pista exterior</li>
  <li>✅ Buena longevidad de la suela</li>
</ul>

<h3><a href="/zapatilla/nike-precision-7">Nike Precision 7 — desde {{precio:nike-precision-7}}</a></h3>
<p>La de presupuesto más ajustado: goma dura con surcos profundos, apta para exterior en todos los análisis y con tracción que se mantiene incluso en pista con polvo. No esperes la amortiguación de una gama alta.</p>
<ul>
  <li>✅ La más barata de las cinco</li>
  <li>✅ Goma dura que aguanta el asfalto</li>
  <li>❌ Amortiguación básica</li>
</ul>

<p>Si buscas algo de gama más alta que también aguante fuera, mira la <a href="/zapatilla/rigorer-ar3">Rigorer AR3</a> (apta para exterior en todos los análisis) o la <a href="/zapatilla/nb-two-wxy-v5">New Balance TWO WXY v5</a> (goma dura con surcos profundos).</p>

<h2>Lo que debes evitar en exterior</h2>
<ul>
  <li><strong>Suelas UA Flow (Curry 12, Curry 13, Curry Fox 2, Flow Breakthru 4):</strong> la suela es la propia espuma, sin goma. Ningún análisis da la Curry 12 por apta para exterior: en asfalto se gasta en semanas.</li>
  <li><strong>Adidas AE 2:</strong> su goma estándar no está pensada para la calle; las reviews coinciden en que se deshilacha y se gasta rápido en pista rugosa.</li>
  <li><strong>Nike GT Cut 3 y GT Cut 4:</strong> tacos estrechos pensados para parquet limpio; solo un 17 % de los análisis da la GT Cut 3 por apta para exterior.</li>
  <li><strong>Gomas finas y blandas</strong> como las de la Zoom Freak 4, la Puma MB.04 o la Air Jordan XXXIX: ningún análisis las recomienda fuera.</li>
</ul>

<h2>Comparativa de durabilidad en exterior</h2>
<p>La columna «Exterior» es la nota de durabilidad de nuestra ficha (1-10); el porcentaje es la parte de los análisis que la ven apta para exterior, a 19 de octubre de 2026.</p>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Modelo</th>
      <th style="padding:8px;text-align:center">Exterior</th>
      <th style="padding:8px;text-align:center">Apta (análisis)</th>
      <th style="padding:8px;text-align:center">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px"><strong>Li-Ning WoW All City 14</strong></td><td style="padding:8px;text-align:center">{{exterior:lining-wow-allcity-14}}</td><td style="padding:8px;text-align:center">80 %</td><td style="padding:8px;text-align:center">{{precio:lining-wow-allcity-14}}</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px"><strong>Anta Shock Wave 5</strong></td><td style="padding:8px;text-align:center">{{exterior:anta-shock-wave-5}}</td><td style="padding:8px;text-align:center">100 %</td><td style="padding:8px;text-align:center">{{precio:anta-shock-wave-5}}</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px"><strong>Jordan Luka .77</strong></td><td style="padding:8px;text-align:center">{{exterior:jordan-luka-77}}</td><td style="padding:8px;text-align:center">92 %</td><td style="padding:8px;text-align:center">{{precio:jordan-luka-77}}</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px"><strong>Adidas Dame Certified</strong></td><td style="padding:8px;text-align:center">{{exterior:adidas-dame-certified}}</td><td style="padding:8px;text-align:center">88 %</td><td style="padding:8px;text-align:center">{{precio:adidas-dame-certified}}</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px"><strong>Nike Precision 7</strong></td><td style="padding:8px;text-align:center">{{exterior:nike-precision-7}}</td><td style="padding:8px;text-align:center">100 %</td><td style="padding:8px;text-align:center">{{precio:nike-precision-7}}</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px"><strong>Adidas AE 2</strong> ❌</td><td style="padding:8px;text-align:center">{{exterior:adidas-ae-2}}</td><td style="padding:8px;text-align:center">0 %</td><td style="padding:8px;text-align:center">{{precio:adidas-ae-2}}</td></tr>
    <tr><td style="padding:8px"><strong>UA Curry 12</strong> ❌</td><td style="padding:8px;text-align:center">{{exterior:ua-curry-12}}</td><td style="padding:8px;text-align:center">0 %</td><td style="padding:8px;text-align:center">{{precio:ua-curry-12}}</td></tr>
  </tbody>
</table>
</div>

<p class="art-outro">¿Juegas tanto en interior como en exterior? El <a href="/quiz">quiz de CANCHA.ZAPA</a> pregunta por tu tipo de cancha y filtra automáticamente los modelos con suficiente durabilidad outdoor para tu uso. 10 preguntas, menos de un minuto.</p>
    `,
  },

  // ── 6. Pie ancho ─────────────────────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-pie-ancho-2025",
    title: "Zapatillas de baloncesto para pie ancho: guía completa 2025",
    metaTitle: "Zapatillas de baloncesto para pie ancho 2025 | CANCHA.ZAPA",
    description:
      "Guía para elegir zapatillas de baloncesto si tienes pie ancho: qué líneas van estrechas, cuáles dan espacio según las reviews, y las 5 que mejor encajan.",
    fecha: "2026-10-19",
    fechaLabel: "19 octubre 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía · Pie ancho 2026",
    heroTitle: "Zapatillas para pie ancho",
    heroSubtitle: "Las que realmente encajan, según las reviews",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-lebron-22", "jordan-luka-1", "ua-curry-13", "nike-kd-17", "nike-sabrina-2"],
    relatedSeoPages: ["zapatillas-baloncesto-pie-ancho", "mejores-zapatillas-baloncesto-2025", "zapatillas-baloncesto-baratas"],
    body: `
<p class="art-intro">La mayoría de marcas diseñan sus zapatillas de baloncesto para un pie estándar o incluso estrecho. Si tienes pie ancho, el mercado juega en tu contra: compras un modelo que en la talla parece correcto, lo pisas en el primer partido, y al cuarto de hora el quinto dedo ya está ardiendo. Esta guía va directo al grano: qué marcas van anchas, cuáles evitar, y los 5 mejores modelos para pie ancho en 2025.</p>

<h2>Cómo saber si tienes pie ancho</h2>
<p>No necesitas ir al podólogo. Estas señales te lo dicen:</p>
<ul>
  <li>Los dedos presionan los laterales de la zapatilla desde el primer día</li>
  <li>Rozaduras o ampollas en el quinto dedo (el meñique) después de pocas horas</li>
  <li>Al ponerte la zapatilla, el antepié se siente comprimido aunque el talón esté bien asentado</li>
  <li>Siempre tienes que subir media talla para tener espacio — señal de que la horma es estrecha, no de que necesitas una talla mayor</li>
</ul>

<h2>Marcas: quién va estrecho y quién da espacio</h2>
<p>Generalizar por marca engaña: dentro de una misma marca hay líneas que van justas y otras que sobran. Lo que sí se repite en las reviews que agrega HoopsGeek:</p>
<ul>
  <li><strong>Nike →</strong> depende de la línea. La LeBron 22 y 23 y la KD 17 dan espacio en el antepié (la Sabrina 2 gana algo de anchura); la KD 19, la Sabrina 3, la Zion, la Ja, las Kobe Protro y la Kyrie van estrechas y con poco volumen.</li>
  <li><strong>Under Armour →</strong> sus últimos modelos (Curry 13, FUTR X Elite) son de los más permisivos con el pie ancho.</li>
  <li><strong>Adidas →</strong> normal, con puntera variable según el modelo: pruébatela antes.</li>
  <li><strong>ANTA →</strong> ajuste de guante (Kai 2, Kai 3, KT 10, Shock Wave 5): con pie ancho, casi siempre media talla más.</li>
  <li><strong>Li-Ning →</strong> tiende a estrecho en la gama alta (la Gamma 2 va justa y con poco volumen).</li>
</ul>

<h2>Las 5 que mejor encajan con pie ancho</h2>

<h3><a href="/zapatilla/nike-lebron-22">Nike LeBron 22 — desde {{precio:nike-lebron-22}}</a></h3>
<p>Las reviews coinciden: talla normal, antepié amplio y buena sujeción tras un rodaje corto. Es la recomendación más segura si tienes pie ancho y además pesas: es de las más protectoras del catálogo.</p>
<ul>
  <li>✅ Antepié amplio sin perder sujeción</li>
  <li>✅ Mucha amortiguación para jugadores pesados</li>
  <li>❌ Los cordones pueden rozar a algunos</li>
</ul>

<h3><a href="/zapatilla/jordan-luka-1">Jordan Luka 1 — desde {{precio:jordan-luka-1}}</a></h3>
<p>Talla normal y, según los análisis, se adapta bien a pies anchos, con algo de espacio extra en el antepié. Y es la más barata de esta lista.</p>
<ul>
  <li>✅ Permisiva con el pie ancho</li>
  <li>✅ Precio contenido</li>
</ul>

<h3><a href="/zapatilla/ua-curry-13">Under Armour Curry 13 — desde {{precio:ua-curry-13}}</a></h3>
<p>Puntera amplia y sujeción tipo botín. Los análisis la recomiendan para pies estrechos y también para los algo anchos, y la destacan para pies planos. Ojo: su suela UA Flow es solo para pista cubierta.</p>
<ul>
  <li>✅ Puntera amplia y fácil de rodar</li>
  <li>✅ Buena para pie plano</li>
  <li>❌ Nada de exterior (suela UA Flow)</li>
</ul>

<h3><a href="/zapatilla/nike-kd-17">Nike KD 17 — desde {{precio:nike-kd-17}}</a></h3>
<p>Talla normal pero algo larga, con volumen extra en el antepié que sienta bien al pie ancho (y puede quedar holgado si lo tienes estrecho).</p>
<ul>
  <li>✅ Volumen extra en el antepié</li>
  <li>❌ Va algo larga: pruébatela</li>
</ul>

<h3><a href="/zapatilla/nike-sabrina-2">Nike Sabrina 2 — desde {{precio:nike-sabrina-2}}</a></h3>
<p>Ganó anchura respecto a la primera y su antepié es más permisivo. Una buena opción ligera si eres base o escolta con pie medio-ancho.</p>
<ul>
  <li>✅ Más ancha que la Sabrina 1</li>
  <li>❌ Algún análisis nota la puntera justa: pruébatela antes</li>
</ul>

<p>Otra que va bien con pie ancho: la <a href="/zapatilla/ua-futr-x-elite">UA FUTR X Elite</a>, que los análisis recomiendan comprar en tu talla si tienes el pie ancho y bajar media si lo tienes estrecho.</p>

<h2>Lo que debes evitar si tienes pie ancho</h2>
<ul>
  <li><strong>Jordan Zion 3 y Zion 4:</strong> van estrechas y con poco volumen. Pese a estar pensadas para jugadores grandes, con pie ancho aprietan.</li>
  <li><strong>Nike Ja 1, Kyrie Low 5 y las Kobe Protro (6 y 9 Elite Low):</strong> horma estrecha y puntera justa.</li>
  <li><strong>Li-Ning Gamma 2 y Nike GT Cut Academy 2:</strong> ajuste estrecho; la Academy con la puntera afilada.</li>
</ul>

<p class="art-outro">El <a href="/quiz">quiz de CANCHA.ZAPA</a> tiene una pregunta específica sobre el ancho de tu pie y filtra los modelos según esa variable. Si seleccionas "pie ancho", los modelos con horma estrecha quedan fuera del resultado automáticamente.</p>
    `,
  },

  // ── 7. Tobillo y esguinces ───────────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-tobillo-esguince-2025",
    title: "Zapatillas de baloncesto para tobillo débil o esguinces: guía 2025",
    metaTitle: "Zapatillas baloncesto tobillo y esguinces 2025 | CANCHA.ZAPA",
    description:
      "Guía para elegir zapatillas de baloncesto si tienes tobillo débil o historial de esguinces. Low vs mid vs high, soporte lateral, top 4 modelos 2025.",
    fecha: "2026-05-26",
    fechaLabel: "26 mayo 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía · Lesiones tobillo",
    heroTitle: "Tobillo débil o esguinces",
    heroSubtitle: "Qué zapatilla te protege de verdad",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-kobe-9-high-protro", "ua-curry-13", "361-joker-1", "puma-mb-04"],
    relatedSeoPages: ["zapatillas-baloncesto-para-tobillos", "zapatillas-baloncesto-baratas", "mejor-zapatilla-pivot"],
    body: `
<p class="art-intro">El esguince de tobillo es la lesión más frecuente en baloncesto. Cada cambio de dirección, cada aterrizaje, cada bloqueo es una oportunidad para torcerte. La zapatilla correcta no elimina el riesgo, pero lo reduce significativamente. Y la incorrecta — una low-top si tienes historial de esguinces — puede mandarte a la baja antes de acabar el primer partido.</p>

<h2>Altura de caña: ¿low, mid o high?</h2>
<p>Es la decisión más importante. No hay elección "correcta" universal — depende de tu historial:</p>
<ul>
  <li><strong>Low-top:</strong> máxima velocidad y agilidad, mínima protección lateral. Para bases sanos sin historial de tobillo. Ejemplos: Nike GT Cut 4, Adidas AE 2.</li>
  <li><strong>Mid-top:</strong> el equilibrio. Cubre la parte baja del tobillo sin restringir el movimiento. La opción más versátil y la recomendada si tienes algún esguince en el historial pero no recurrente. Ejemplos: UA Curry 13, Puma MB.04, Nike GT Hustle 3.</li>
  <li><strong>High-top:</strong> máxima protección, especialmente con correas o collar acolchado. Para jugadores con esguinces recurrentes o que quieran la máxima seguridad. Ojo: hoy quedan pocas high-top de rendimiento; la mayoría de modelos actuales son low o mid.</li>
</ul>
<p><strong>Regla simple:</strong> si has tenido más de un esguince de tobillo, no uses low-top en partidos. Mid o high siempre.</p>

<h2>Otras características que importan</h2>
<ul>
  <li><strong>Soporte lateral ≥ 8:</strong> contención del pie en cortes. Revisa nuestro score en cada ficha.</li>
  <li><strong>TPU heel counter:</strong> bloque rígido en el talón que evita rotaciones bruscas del pie.</li>
  <li><strong>Correas internas:</strong> sistemas de ajuste que abrazan el tobillo. La Air Jordan 40 tiene 6 correas — el mejor sistema del mercado ahora mismo.</li>
  <li><strong>Horma que sujeta:</strong> una zapatilla demasiado larga o ancha no sujeta bien. El pie se mueve dentro y aumenta el riesgo de torcedura.</li>
</ul>

<h2>Top 4 zapatillas para tobillo débil en 2025</h2>

<h3><a href="/zapatilla/nike-kobe-9-high-protro">Nike Kobe 9 High Protro — desde {{precio:nike-kobe-9-high-protro}}</a></h3>
<p>La única high-top real de las cuatro — el propio nombre de fábrica lo dice ("High Protro"). Soporte lateral {{nota:nike-kobe-9-high-protro:soporte_lateral}} y estabilidad {{nota:nike-kobe-9-high-protro:estabilidad}}. El shank de fibra de carbono da rigidez al mediopié y el upper Flyknit sube por encima del tobillo: es la de más caña de la lista.</p>
<ul>
  <li>✅ High-top real: máxima altura de caña de la lista</li>
  <li>✅ Soporte lateral {{nota:nike-kobe-9-high-protro:soporte_lateral}} y estabilidad {{nota:nike-kobe-9-high-protro:estabilidad}}</li>
  <li>❌ Solo disponible en KicksCrew — sin tienda española con stock propio</li>
</ul>

<h3><a href="/zapatilla/ua-curry-13">UA Curry 13 — desde {{precio:ua-curry-13}}</a></h3>
<p>Mid-top pensada para bases y escoltas tiradores. La entresuela UA HOVR+ de longitud completa va montada sobre un chasis de estabilidad en Pebax, y el soporte lateral ({{nota:ua-curry-13:soporte_lateral}}) y la estabilidad ({{nota:ua-curry-13:estabilidad}}) igualan a los de la Kobe 9 High Protro sin renunciar a la agilidad de un corte más bajo. Es además la más fácil de encontrar: cuatro tiendas con stock en España.</p>
<ul>
  <li>✅ Soporte lateral {{nota:ua-curry-13:soporte_lateral}} y estabilidad {{nota:ua-curry-13:estabilidad}} en un corte mid</li>
  <li>✅ La más disponible de las cuatro: El Corte Inglés, Decathlon, UA y Basket4Ballers</li>
  <li>❌ Horma normal — pruébatela antes si tienes el pie ancho</li>
</ul>

<h3><a href="/zapatilla/361-joker-1">361° Joker 1 — desde {{precio:361-joker-1}}</a></h3>
<p>Mid-top pensada para pívots y ala-pívots. La espuma CQT y el shank de plástico, con un talón firme, dan el mismo soporte lateral ({{nota:361-joker-1:soporte_lateral}}) y estabilidad ({{nota:361-joker-1:estabilidad}}) que la Curry 13, con horma normal. Se puede comprar en tres tiendas (AliExpress, Basketball Emotion y Amazon).</p>
<ul>
  <li>✅ Soporte lateral {{nota:361-joker-1:soporte_lateral}} y estabilidad {{nota:361-joker-1:estabilidad}} — igual que la Curry 13</li>
  <li>❌ Ajuste ceñido: con pie ancho, sube media talla</li>
  <li>❌ La más pesada de las cuatro — prioriza protección sobre ligereza</li>
</ul>

<h3><a href="/zapatilla/puma-mb-04">Puma MB.04 — desde {{precio:puma-mb-04}}</a></h3>
<p>Mid-top de LaMelo Ball pensada para bases, escoltas y aleros. Los Nitro foam pucks amortiguan sin perder la rigidez del carrier de EVA que sujeta el mediopié, y el soporte lateral ({{nota:puma-mb-04:soporte_lateral}}) iguala al de la Curry 13 y la Joker 1. La cuarta opción de la lista, con dos tiendas afiliadas en España.</p>
<ul>
  <li>✅ Soporte lateral {{nota:puma-mb-04:soporte_lateral}} en un corte mid, para guards y aleros</li>
  <li>✅ Nitro foam + carrier de EVA: amortiguación sin perder contención lateral</li>
  <li>❌ Estabilidad {{nota:puma-mb-04:estabilidad}} — algo por debajo de las otras tres ({{nota:ua-curry-13:estabilidad}})</li>
</ul>

<h2>Lo que NO hacer si tienes el tobillo débil</h2>
<ul>
  <li><strong>Usar low-top si tienes historial de esguinces</strong> — la velocidad no vale la lesión</li>
  <li><strong>Comprarte una talla grande</strong> — el pie se mueve dentro y eso aumenta el riesgo</li>
  <li><strong>No calentar el tobillo</strong> — los primeros 5 minutos son los de mayor riesgo; círculos de tobillo y bandas elásticas antes de saltar</li>
  <li><strong>Jugar sin tobillera si tienes historial grave</strong> — la zapatilla ayuda, pero no sustituye al vendaje funcional</li>
</ul>

<p class="art-outro">El <a href="/quiz">quiz de CANCHA.ZAPA</a> pregunta directamente por lesiones de tobillo y filtra los modelos según esa variable. Si marcas "tobillos" en la pregunta de lesiones, los low-top sin soporte quedan automáticamente fuera de tus resultados.</p>
    `,
  },

  // ── 8. GT Cut 4 vs Curry 13 vs Kai 2 ────────────────────────────────
  {
    slug: "gt-cut-4-vs-curry-13-vs-kai-2-explosivos-2025",
    title: "GT Cut 4 vs Curry 13 vs ANTA Kai 2: batalla de los explosivos en 2025",
    metaTitle: "Nike GT Cut 4 vs UA Curry 13 vs ANTA Kai 2 comparativa 2025 | CANCHA.ZAPA",
    description:
      "Comparativa técnica de tres zapatillas para guards de 2025: GT Cut 4, Curry 13 y ANTA Kai 2. Tracción, respuesta, precio y para qué tipo de base/escolta.",
    fecha: "2026-05-26",
    fechaLabel: "26 mayo 2026",
    categoria: "Comparativas",
    readMinutes: 5,
    eyebrow: "★ Comparativa · Zapatillas reactivas 2025",
    heroTitle: "GT Cut 4 vs Curry 13 vs Kai 2",
    heroSubtitle: "¿Cuál reacciona más rápido?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "ua-curry-13", "anta-kai-2", "adidas-ae-2"],
    relatedSeoPages: ["zapatillas-reactivas", "mejor-zapatilla-base", "mejor-zapatilla-escolta"],
    body: `
<p class="art-intro">Si priorizas el primer paso explosivo sobre cualquier otra cosa, el mercado de 2025 tiene tres candidatos claros: la Nike GT Cut 4, la Under Armour Curry 13 y la ANTA Kai 2 de Kyrie Irving. La GT Cut 4 y la Kai 2 son low-top y la Curry 13 es mid-top, pero las tres tienen court feel excepcional — y las tres difieren significativamente en precio y en a qué tipo de jugador favorecen más.</p>

<h2>Resumen en números</h2>

<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Atributo</th>
      <th style="padding:8px;text-align:center">GT Cut 4</th>
      <th style="padding:8px;text-align:center">Curry 13</th>
      <th style="padding:8px;text-align:center">Kai 2</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Tracción</td>
      <td style="padding:8px;text-align:center">{{nota:nike-gt-cut-4:traccion}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:ua-curry-13:traccion}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:anta-kai-2:traccion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Respuesta</td>
      <td style="padding:8px;text-align:center">{{nota:nike-gt-cut-4:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:ua-curry-13:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{nota:anta-kai-2:respuesta}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Amortiguación</td>
      <td style="padding:8px;text-align:center">{{nota:nike-gt-cut-4:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:ua-curry-13:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:anta-kai-2:amortiguacion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Horma</td>
      <td style="padding:8px;text-align:center">Estrecha</td>
      <td style="padding:8px;text-align:center">Normal</td>
      <td style="padding:8px;text-align:center">Normal</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Peso</td>
      <td style="padding:8px;text-align:center">{{peso:nike-gt-cut-4}}</td>
      <td style="padding:8px;text-align:center">{{peso:ua-curry-13}}</td>
      <td style="padding:8px;text-align:center">{{peso:anta-kai-2}}</td>
    </tr>
    <tr>
      <td style="padding:8px">Precio</td>
      <td style="padding:8px;text-align:center">{{precio:nike-gt-cut-4}}</td>
      <td style="padding:8px;text-align:center">{{precio:ua-curry-13}}</td>
      <td style="padding:8px;text-align:center">{{precio:anta-kai-2}}</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Nike GT Cut 4: court feel y primer paso</h2>
<p>La GT Cut 4 monta Zoom Air Strobel con una suela de goma dura de patrón multidireccional. Su baza es el court feel: el pie va muy pegado al suelo.</p>
<p><strong>El problema:</strong> la horma es muy estrecha. Si tienes pie ancho o dedos largos, la presión en el antepié puede ser un problema real después de 30 minutos. Pruébatela antes de comprar o sube media talla.</p>
<p><strong>Para quién:</strong> Base o escolta con pie normal o estrecho que juega en interior limpio y prioriza el primer paso sobre cualquier otra cosa.</p>

<h2>Under Armour Curry 13: el mejor equilibrio</h2>

<p><strong>El problema:</strong> sin goma en la suela, la durabilidad en exterior es prácticamente nula. Una sesión en asfalto y la suela queda destruida. Son zapatillas exclusivamente de interior.</p>
<p><strong>Para quién:</strong> Guards de 70-85kg que juegan siempre en pabellón, valoran la sensación de suelo y quieren algo más de cushion que la GT Cut. Horma normal, segura para la mayoría de pies.</p>

<h2>ANTA Kai 2: la sorpresa del año</h2>
<p>Kyrie Irving fichó por ANTA después de salir de Nike, y la Kai 2 es su segunda zapatilla con la marca china. Desde {{precio:anta-kai-2}}, ofrece un rendimiento que avergüenza a zapatillas más caras. La tracción es sólida, la respuesta es rápida gracias a la espuma Nitro Edge, y su ajuste de guante la hace cómoda para la mayoría de pies normales.</p>
<p><strong>El problema:</strong> la respuesta ({{nota:anta-kai-2:respuesta}}) queda un punto por debajo de la Curry 13 ({{nota:ua-curry-13:respuesta}}), aunque por encima de la GT Cut 4 ({{nota:nike-gt-cut-4:respuesta}}). Si buscas la máxima respuesta, la Curry 13 gana.</p>
<p><strong>Para quién:</strong> Bases y escoltas con pie normal o estrecho que buscan máxima relación calidad-precio.</p>

<h2>Veredicto final</h2>
<ul>
  <li><strong>Mejor court feel absoluto → <a href="/zapatilla/nike-gt-cut-4">GT Cut 4</a></strong> — si tu pie encaja y juegas siempre en interior.</li>
  <li><strong>Mejor equilibrio rendimiento-versatilidad → <a href="/zapatilla/ua-curry-13">Curry 13</a></strong> — para guards que valoran el cushion extra.</li>
  <li><strong>Mejor relación calidad-precio → <a href="/zapatilla/anta-kai-2">Kai 2</a></strong> — ajuste de guante y un rendimiento muy cercano al de la Curry 13.</li>
</ul>

<p class="art-outro">¿No tienes claro cuál de las tres encaja con tu perfil específico? <a href="/comparar?slugs=nike-gt-cut-4,ua-curry-13,anta-kai-2">Compáralas aquí con todos los atributos</a> o <a href="/quiz">haz el quiz</a> para obtener tu recomendación personalizada.</p>
    `,
  },

  // ── 9. Guía baratas ──────────────────────────────────────────────────
  {
    slug: "mejores-zapatillas-baloncesto-baratas-2025",
    title: "Mejores zapatillas de baloncesto baratas: las 8 mejores por menos de 80 €",
    metaTitle: "Mejores zapatillas de baloncesto baratas (menos de 80 €) | CANCHA.ZAPA",
    description: "Las 8 zapatillas de baloncesto con mejor relación calidad-precio por menos de 80 €: Li-Ning All City 14, Anta KAI 1 Speed, NB TWO WXY v5, Luka 1 y más, con precio actualizado.",
    fecha: "2026-10-19",
    fechaLabel: "19 octubre 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía editorial · CANCHA.ZAPA",
    heroTitle: "Mejores zapatillas de baloncesto baratas",
    heroSubtitle: "Las 8 mejores opciones por menos de 80 €",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["lining-wow-allcity-14", "anta-kai-1-speed", "nb-two-wxy-v5", "jordan-luka-1", "adidas-dame-certified"],
    relatedSeoPages: ["zapatillas-baloncesto-baratas", "zapatillas-baloncesto-calidad-precio", "zapatillas-baloncesto-junior"],
    imagen: "/shoes/lining-wow-allcity-14.webp",
    body: `
<p class="art-intro">Se puede jugar bien por menos de 80 €, y no solo con modelos básicos: muchas de las mejores relaciones calidad-precio del catálogo son marcas chinas con tecnología de gama alta o modelos de una o dos temporadas atrás que han bajado mucho de precio. Estas son las ocho que hoy merecen la pena, todas a la venta en tiendas que trabajan en España. El precio de cada titular se actualiza solo.</p>

<h2>1. Li-Ning Way of Wade All City 14 — desde {{precio:lining-wow-allcity-14}}</h2>
<p>La mejor valorada del catálogo a este precio: espuma BOOM de longitud completa, placa de muelle de TPU y una suela de goma que además aguanta el exterior. Rinde como una zapatilla de gama alta.</p>
<ul>
  <li>Tecnología de gama alta: BOOM y placa de muelle de TPU</li>
  <li>Vale para interior y exterior</li>
  <li>Se compra en AliExpress: el envío tarda más. Tiendas y tallas en <a href="/zapatilla/lining-wow-allcity-14">su ficha</a></li>
</ul>

<h2>2. Anta KAI 1 Speed — desde {{precio:anta-kai-1-speed}}</h2>
<p>La versión ligera de la primera zapatilla de Kyrie Irving con Anta: espuma Nitro Edge y shank de TPU en el mediopié, con una tracción y una respuesta de las más altas del catálogo. Para bases rápidos que juegan en pista cubierta.</p>
<ul>
  <li>De las más reactivas que vas a encontrar a cualquier precio</li>
  <li>Ojo: suela de interior, no la uses en la calle</li>
</ul>

<h2>3. New Balance TWO WXY v5 — desde {{precio:nb-two-wxy-v5}}</h2>
<p>FuelCell y Fresh Foam X, buena tracción y una goma dura que aguanta el exterior. Una de las más equilibradas del catálogo, y además se compra en una tienda española.</p>
<ul>
  <li>Equilibrada en todo: para casi cualquier posición</li>
  <li>Apta para interior y exterior</li>
</ul>

<h2>4. Jordan Luka 1 — desde {{precio:jordan-luka-1}}</h2>
<p>La primera de Luka Doncic: espuma Formula 23, base ancha y una horma que las reviews describen como permisiva con el pie ancho. Una signature de gama alta de hace dos temporadas a precio de gama baja.</p>
<ul>
  <li>Buena opción si tienes el pie ancho</li>
  <li>Estable gracias a su base ancha</li>
</ul>

<h2>5. Adidas Dame Certified — desde {{precio:adidas-dame-certified}}</h2>
<p>La línea económica de Damian Lillard: suela de goma gruesa con muy buena tracción y una de las más duraderas del catálogo en exterior. La amortiguación (Bounce) es básica.</p>
<ul>
  <li>Una de las mejores para jugar en la calle</li>
  <li>Amortiguación justa para jugadores pesados</li>
</ul>

<h2>6. Jordan Luka .77 — desde {{precio:jordan-luka-77}}</h2>
<p>La versión asequible de la línea de Luka: espuma de doble densidad con Zoom Air en el antepié, mucho soporte y una suela construida para exterior. De las más completas de esta lista para quien juega dentro y fuera.</p>
<ul>
  <li>Muy completa para su precio</li>
  <li>Suela pensada para la calle</li>
</ul>

<h2>7. Adidas Dame X — desde {{precio:adidas-dame-x}}</h2>
<p>La décima de Lillard, con Lightstrike: buena tracción, amortiguación y respuesta. Es de la temporada pasada y por eso se encuentra muy rebajada. Solo para pista cubierta: su goma se gasta rápido fuera.</p>
<ul>
  <li>Gama alta de hace poco a precio de saldo</li>
  <li>No apta para exterior</li>
</ul>

<h2>8. Nike Precision 7 — desde {{precio:nike-precision-7}}</h2>
<p>La más básica de la lista y de las más baratas del catálogo: espuma Phylon sencilla y una goma dura de espiga que aguanta muy bien el exterior. Para jugar de forma recreativa o en la calle sin miedo a gastarla.</p>
<ul>
  <li>Muy duradera en exterior</li>
  <li>Amortiguación básica</li>
</ul>

<h3>¿Cómo elegir la mejor opción para ti?</h3>
<p>Mira tres cosas: <strong>dónde juegas</strong> (las de suela de interior se gastan rápido en asfalto), <strong>tu tobillo</strong> (todas estas son low; si has tenido esguinces, la <a href="/zapatilla/puma-playmaker-pro-mid">Puma Playmaker Pro Mid</a> es mid y barata) y <strong>dónde comprar</strong> (la <a href="/zapatilla/decathlon-tarmak-fast-900">Decathlon Tarmak Fast 900</a> es la única que puedes probarte en una tienda física).</p>

<p>Si juegas en exterior: <a href="/zapatilla/adidas-dame-certified">Dame Certified</a>, <a href="/zapatilla/jordan-luka-77">Luka .77</a> o <a href="/zapatilla/nike-precision-7">Precision 7</a>. Si juegas solo en interior y quieres rendimiento: <a href="/zapatilla/anta-kai-1-speed">KAI 1 Speed</a> o <a href="/zapatilla/adidas-dame-x">Dame X</a>. Para las dos cosas: <a href="/zapatilla/lining-wow-allcity-14">All City 14</a> o <a href="/zapatilla/nb-two-wxy-v5">TWO WXY v5</a>.</p>

<p class="art-outro">No necesitas gastar más de 80 € para jugar bien. ¿No sabes cuál es la tuya? <a href="/quiz">Haz el quiz en 60 segundos</a>: filtra por tu presupuesto, tu posición y dónde juegas.</p>
    `,
  },

  // ── 10. Comparativa marcas chinas ────────────────────────────────────
  {
    slug: "anta-lining-peak-zapatillas-chinas-baloncesto-2025",
    title: "ANTA, Li-Ning y Peak en 2025: ¿merecen la pena las zapatillas chinas de baloncesto?",
    metaTitle: "ANTA vs Li-Ning vs Peak: ¿merecen la pena las zapatillas chinas? 2025 | CANCHA.ZAPA",
    description: "Analizamos si las zapatillas de baloncesto chinas de ANTA, Li-Ning y Peak ofrecen calidad y rendimiento real en 2025.",
    fecha: "2025-06-01",
    fechaLabel: "1 junio 2025",
    categoria: "Comparativas",
    readMinutes: 7,
    eyebrow: "★ Comparativa · CANCHA.ZAPA",
    heroTitle: "ANTA, Li-Ning y Peak en 2025",
    heroSubtitle: "¿Merecen la pena las zapatillas chinas de baloncesto?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["anta-kai-2", "anta-kt-11", "lining-wow-allcity-13", "lining-sonic-12", "peak-taichi-flash"],
    relatedSeoPages: ["zapatillas-baloncesto-calidad-precio", "zapatillas-baloncesto-baratas", "zapatillas-baloncesto-premium"],
    imagen: "https://wowsole.com/wp-content/uploads/2024/01/ANTA-Kai-2-01.jpg",
    body: `
<p class="art-intro">En los últimos años, ANTA, Li-Ning y Peak han pasado de ser marcas desconocidas en España a tener presencia real en las pistas. En 2025, estas marcas chinas ofrecen tecnología propia, colaboraciones con estrellas de la NBA y precios hasta un 40% más bajos que Nike o Adidas. ¿Pero merecen realmente la pena? Lo analizamos sin filtros.</p>

<h2>ANTA — la más consolidada</h2>
<p>ANTA es patrocinadora oficial de la NBA en China y tiene acuerdos de firma con Klay Thompson y Kyrie Irving. Su inversión en I+D ha crecido año tras año, y sus últimos modelos compiten de verdad con la gama media-alta de Nike y Adidas.</p>

<h3>Modelos clave 2025</h3>
<ul>
  <li><strong><a href="/zapatilla/anta-kai-2">ANTA Kai 2</a> (desde {{precio:anta-kai-2}})</strong>: la firma de Kyrie Irving con espuma Nitro Edge y tracción multidireccional. Rendimiento de gama alta a menor precio. La sorpresa del año.</li>
  <li><strong><a href="/zapatilla/anta-kt-11">ANTA KT-11</a> (desde {{precio:anta-kt-11}})</strong>: la firma de Klay Thompson, más asequible. Buena amortiguación y durabilidad outdoor sólida.</li>
</ul>

<h3>Veredicto ANTA</h3>
<p>Si solo puedes probar una marca china, empieza por ANTA. La <a href="/zapatilla/anta-kai-2">Kai 2</a> es genuinamente una de las mejores zapatillas de 2025 en relación calidad-precio, independientemente del origen.</p>

<h2>Li-Ning — la más innovadora</h2>
<p>Li-Ning, fundada por el legendario gimnasta olímpico del mismo nombre, ha apostado por la innovación radical. Tienen acuerdo con Jimmy Butler y desarrollan tecnologías propias que en algunos parámetros superan a Nike Zoom.</p>

<h3>Modelos clave 2025</h3>
<ul>
  <li><strong><a href="/zapatilla/lining-wow-allcity-13">Li-Ning WOW AllCity 13</a> (desde {{precio:lining-wow-allcity-13}})</strong>: espuma Boom de longitud completa con suela de goma de tracción excepcional. Una de las mejor valoradas por los análisis independientes.</li>
  <li><strong><a href="/zapatilla/lining-sonic-12">Li-Ning Sonic 12</a> (desde {{precio:lining-sonic-12}})</strong>: la opción de velocidad — ultraligera, reactiva y con tracción de primer nivel.</li>
</ul>

<h3>Veredicto Li-Ning</h3>
<p>Li-Ning es para jugadores con criterio que no necesitan el logo de Nike para sentirse bien en pista. Si buscas tecnología real a precios honestos, es la marca más interesante del lote.</p>

<h2>Peak — la más accesible</h2>
<p>Peak se ha centrado en crear calzado ligero y funcional para el jugador amateur. Sin colaboraciones de superestrellas, pero con una propuesta técnica sólida a precios muy competitivos.</p>

<h3>Modelos clave 2025</h3>
<ul>
  <li><strong><a href="/zapatilla/peak-taichi-flash">Peak Taichi Flash</a> (desde {{precio:peak-taichi-flash}})</strong>: entresuela con espuma TaiChi y suela de goma con tracción multidireccional. Notable ligereza para ser una zapatilla de baloncesto.</li>
</ul>

<h3>Veredicto Peak</h3>
<p>Peak es la mejor opción si quieres probar una marca china por primera vez sin arriesgar mucho presupuesto. No es la más avanzada, pero cumple bien en casi todos los parámetros.</p>

<h2>¿Dónde comprar en España?</h2>
<p>Este es el talón de Aquiles de las marcas chinas: la disponibilidad. En España, tus mejores opciones son:</p>
<ul>
  <li><strong>Amazon ES</strong>: stock variable, pero suele tener los modelos más populares con envío Prime.</li>
  <li><strong>AliExpress</strong>: más variedad, precio más bajo, pero plazos de entrega de 2-4 semanas. CANCHA.ZAPA enlaza directamente a tiendas oficiales para evitar réplicas.</li>
</ul>

<h2>Comparativa rápida</h2>
<p>Si tienes que elegir una sola y no sabes por dónde empezar:</p>
<ul>
  <li><strong>Mejor rendimiento global por su precio → <a href="/zapatilla/anta-kai-2">ANTA Kai 2</a></strong></li>
  <li><strong>Mejor tracción y tecnología → <a href="/zapatilla/lining-wow-allcity-13">Li-Ning WOW AllCity 13</a></strong></li>
  <li><strong>Mejor precio entrada → <a href="/zapatilla/anta-kt-11">ANTA KT-11</a></strong></li>
</ul>

<p class="art-outro">Las marcas chinas ya no son la segunda opción para quien no puede permitirse Nike. En 2025 son una alternativa real y en muchos casos superior para el jugador amateur español. ¿Quieres ver cómo comparan con modelos de Nike y Adidas de su mismo rango? <a href="/comparar?slugs=anta-kai-2,adidas-ae-2,nike-gt-cut-4">Usa el comparador</a> y juzga tú mismo.</p>
    `,
  },

  // ── 10. Retro ────────────────────────────────────────────────────────
  {
    slug: "mejores-zapatillas-baloncesto-retro-para-jugar-2025",
    title: "Las mejores zapatillas retro para jugar de verdad (2025) | CANCHA.ZAPA",
    metaTitle: "Mejores zapatillas retro de baloncesto para jugar | CANCHA.ZAPA",
    description: "Guía honesta de las mejores zapatillas retro de baloncesto para jugar: Air Jordan, Kobe Protro, Reebok Question, Nike Air Force 1. Puntuaciones reales, no nostalgia.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Guías",
    readMinutes: 8,
    eyebrow: "🏅 Guía retro · CANCHA.ZAPA",
    heroTitle: "Las mejores zapatillas retro para jugar",
    heroSubtitle: "Ranking honesto 2025 · Puntuaciones reales, no solo nostalgia",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["air-jordan-12", "air-jordan-14", "nike-kobe-5-protro", "reebok-question-mid", "nike-air-force-1"],
    relatedSeoPages: ["mejores-zapatillas-baloncesto-2025", "zapatillas-baloncesto-baratas"],
    body: `
<p class="art-intro">Las zapatillas retro de baloncesto tienen un problema: se venden con nostalgia pero se evalúan con specs de 1990. En CANCHA.ZAPA las puntuamos igual que cualquier otra zapatilla. El resultado es honesto y a veces sorprendente: algunas aguantan mejor de lo que piensas.</p>

<h2>Primero lo importante: qué significa "retro jugable"</h2>
<p>No todas las retros son iguales. Hay una diferencia enorme entre:</p>
<ul>
  <li><strong>Retros que puedes jugar:</strong> Kobe Protros, Air Jordan 12, Reebok Question. Tecnología actualizada (Zoom Turbo o React según el modelo, outsoles nuevas) en cuerpos clásicos.</li>
  <li><strong>Retros que SON históricas:</strong> Air Force 1, Chuck Taylor, Converse Weapon, Puma Clyde. Puedes jugar con ellas pero son básicamente museísticas. No las recomendamos para alto rendimiento.</li>
</ul>
<p>Esta guía te dice cuáles son cuáles y por qué.</p>

<h2>Tier 1 — Retros que realmente puedes jugar</h2>

<h3>🥇 Nike Kobe 5 Protro / Kobe 6 Protro — Las mejores retros jugables</h3>
<p>Las Kobe Protros son el mejor argumento de que "retro" no significa "inferior". Nike ha actualizado las outsoles y la amortiguación (Zoom Turbo en el antepié de la 5 y la 6) y ha mantenido el perfil bajo y reactivo que hacía a las originales tan especiales. Las Kobe 5 y 6 Protro consiguen {{score:nike-kobe-5-protro}} (Kobe 5) y {{score:nike-kobe-6-protro}} (Kobe 6) — al nivel de las zapas modernas de gama alta.</p>
<ul>
  <li><strong>Para quién:</strong> Bases y escoltas explosivos que quieren rendimiento real + historia.</li>
  <li><strong>Vs alternativa moderna equivalente:</strong> Nike Ja 2 (desde {{precio:nike-ja-2}}) — similar rendimiento, sin el legado.</li>
  <li><strong>Precio actual:</strong> desde {{precio:nike-kobe-5-protro}} (Kobe 5) y desde {{precio:nike-kobe-6-protro}} (Kobe 6).</li>
</ul>

<h3>🥈 Air Jordan 12 Retro — La mejor Jordan retro para jugar</h3>
<p>La Jordan del Flu Game (1997). Zoom Air completo, herringbone tracción, estructura de cuero sólida. Consigue {{score:air-jordan-12}} — la mejor puntuación de la saga Jordan clásica. La penaliza el peso (440 g) pero si juegas sin velocidad explosiva, ofrece una experiencia sorprendentemente moderna.</p>
<ul>
  <li><strong>Para quién:</strong> Aleros y ala-pívots que juegan equilibrado. No para bases.</li>
  <li><strong>Historia incluida:</strong> El partido donde Jordan jugó con fiebre de 39° y ganó el anillo.</li>
  <li><strong>Precio actual:</strong> desde {{precio:air-jordan-12}}.</li>
</ul>

<h3>🥉 Air Jordan 14 Retro — La mejor low-top Jordan histórica</h3>
<p>El "Last Shot" de 1998 — el tiro que le dio el sexto anillo a MJ. Zoom Air real, peso contenido para ser un retro (415 g) y el perfil más limpio de toda la saga. Se queda por debajo de la Jordan 12 ({{score:air-jordan-12}}) con {{score:air-jordan-14}}, pero ofrece más movilidad al ser low-top.</p>
<ul>
  <li><strong>Ojo:</strong> Low-top significa menos soporte de tobillo. No recomendada si tienes historial de esguinces.</li>
  <li><strong>Historia incluida:</strong> La última imagen icónica de MJ en Bulls.</li>
</ul>

<h2>Tier 2 — Retros icónicas con rendimiento decente</h2>

<h3>Reebok Question Mid / Answer IV — Los zapatos de Iverson</h3>
<p>Allen Iverson cruzó a MJ con la Question Mid y ganó con la Answer IV en las Finales 2001 contra los Lakers. Consiguen {{score:reebok-question-mid}} (Question Mid) y {{score:reebok-answer-iv}} (Answer IV) — mejor de lo esperado para 1996-2001. Tracción de cuero pegajosa y soporte lateral sólido. Limitadas en cushion pero jugables para estilos pausados.</p>

<h3>Nike Air Penny 2 — El zapato de Penny Hardaway</h3>
<p>La primera gran rival de Jordan en los 90s. Max Air en el talón, Zoom Air en el antepié y shank de carbono, perfil mid. {{score:nike-air-penny-2}} — más baja que las Kobe Protro pero aceptable si no buscas velocidad explosiva. Diseño casi futurista para ser de 1996.</p>

<h3>Air Jordan 11 — La más elegante</h3>
<p>La Jordan con lacado de patente negro. Un score de {{score:air-jordan-11}} refleja su amortiguación Air-Sole básica y su peso elevado, pero es la Jordan retro que más se viste fuera de la cancha con credibilidad. Para el coleccionista que también quiere jugar casualmente.</p>

<h2>Tier 3 — Solo para jugar casual o colección</h2>

<h3>Nike Air Force 1 — Madre de todo</h3>
<p>La primera Nike Air de la historia (1982). {{score:nike-air-force-1}} pero su tecnología Air es básica y pesa 460 g. Resistente, tracción sólida, soporte lateral excelente — pero no para correr. Para jugadores potentes que quieren el icono fundacional.</p>

<h3>Air Jordan 1/3/4/6/7/8 — La saga completa</h3>
<p>Scores entre {{score:air-jordan-1}} y {{score:air-jordan-8}}. Las mejores de este grupo son la Jordan 8 (correas, tracción buena) y la Jordan 7. Las Jordan 1, 2 y 3 son para colección — no tienen tecnología de amortiguación real para el juego moderno.</p>

<h3>Reebok Shaq Attaq — El dinosaurio</h3>
<p>La zapatilla de Shaquille O'Neal de 1992. Un honesto {{score:reebok-shaq-attaq}}: pesa 570 g, sin tecnología real, pero el pump Reebok y el perfil high-top tienen su gracia. Para el que quiere saber cómo jugaba el pivot más dominante de la historia.</p>

<h2>Las que NO recomendamos para jugar</h2>
<ul>
  <li><strong>Converse Chuck Taylor (1917):</strong> {{score:converse-chuck-taylor}}. La abuela de todas las zapatillas de baloncesto. Suela plana, cero cushion. Para la foto y la historia, no para cancha.</li>
  <li><strong>Puma Clyde (1973):</strong> {{score:puma-clyde}}. Suede bonito, goma plana. La primera signature de la historia es también la más limitada.</li>
  <li><strong>Nike Air Foamposite One (1997):</strong> {{score:nike-air-foamposite-one}}. Aspecto brutal, ventilación {{nota:nike-air-foamposite-one:ventilacion}}. En verano es un horno. Solo para exterior y bajas temperaturas.</li>
</ul>

<h2>Preguntas frecuentes sobre retros</h2>

<h3>¿Se pueden jugar las Jordan retro de verdad?</h3>
<p>Depende de la Jordan. Las 12 y 14 sí — tienen Zoom Air actualizado y outsoles que aguantan. Las Jordan 1, 2 y 3 son básicamente colección: cuero duro, cushion mínimo y tracción que se deteriora rápido. Para jugar con una Jordan clásica, elige la 12 o la 14.</p>

<h3>¿Vale la pena pagar 200€+ por un retro cuando hay opciones modernas mejores?</h3>
<p>Desde el punto de vista puramente técnico, no. Una Nike Ja 3, desde {{precio:nike-ja-3}}, supera en casi todos los atributos a cualquier retro por encima de 200€. Las retros se compran por historia y cultura, no solo por rendimiento.</p>

<h3>¿Cuál es la mejor zapatilla retro para un jugador amateur que quiere jugar y lucir?</h3>
<p>La Kobe 5 o 6 Protro si priorizas rendimiento, o la Air Jordan 12 si priorizas historia. Las dos tienen ese equilibrio entre cancha y cultura.</p>

<p class="art-outro">¿Quieres ver el catálogo completo de retros con sus puntuaciones? <a href="/zapatillas">Filtra por "Retro"</a> en el catálogo — o usa el chip "🏅 Retro" en el sidebar para ver todas las zapatillas históricas con sus scores reales.</p>
    `,
  },

  // ── 11. Puma MB.04 vs MB.05 ─────────────────────────────────────────
  {
    slug: "puma-mb04-vs-mb05-lamelo-2025",
    title: "Puma MB.04 vs MB.05 — LaMelo Ball 2025: ¿cuál comprar?",
    metaTitle: "Puma MB.04 vs MB.05 (LaMelo Ball 2025): comparativa completa | CANCHA.ZAPA",
    description:
      "Comparativa técnica entre la Puma MB.04 y MB.05 de LaMelo Ball: tracción, Nitro foam, peso y precio. Te decimos cuál vale más la pena en 2025.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Comparativas",
    readMinutes: 5,
    eyebrow: "★ Comparativa · LaMelo Ball 2025",
    heroTitle: "Puma MB.04 vs MB.05",
    heroSubtitle: "LaMelo Ball — ¿cuál es mejor para jugar?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["puma-mb-04", "puma-mb05", "puma-all-pro-nitro-2", "puma-scoot-zeros"],
    relatedSeoPages: ["mejor-zapatilla-base", "zapatillas-reactivas", "mejores-zapatillas-baloncesto-2025"],
    body: `
<p class="art-intro">LaMelo Ball tiene una de las líneas signature más activas del mercado: MB.01, MB.02, MB.03, MB.04 y ya la MB.06 en camino. Aquí nos centramos en las dos más compradas en España en 2025: la MB.04 y la MB.05. ¿Son tan distintas como para justificar el precio extra?</p>

<h2>De un vistazo</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Atributo</th>
      <th style="padding:8px;text-align:center">Puma MB.04</th>
      <th style="padding:8px;text-align:center">Puma MB.05</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Tracción</td>
      <td style="padding:8px;text-align:center">{{nota:puma-mb-04:traccion}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:puma-mb05:traccion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Amortiguación</td>
      <td style="padding:8px;text-align:center">{{nota:puma-mb-04:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:puma-mb05:amortiguacion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Respuesta</td>
      <td style="padding:8px;text-align:center">{{nota:puma-mb-04:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:puma-mb05:respuesta}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Peso</td>
      <td style="padding:8px;text-align:center">{{peso:puma-mb-04}}</td>
      <td style="padding:8px;text-align:center">{{peso:puma-mb05}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Score CANCHA</td>
      <td style="padding:8px;text-align:center">{{score:puma-mb-04}}</td>
      <td style="padding:8px;text-align:center">⭐ {{score:puma-mb05}}</td>
    </tr>
    <tr>
      <td style="padding:8px">Precio (ES)</td>
      <td style="padding:8px;text-align:center">{{precio:puma-mb-04}}</td>
      <td style="padding:8px;text-align:center">{{precio:puma-mb05}}</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Espuma: Nitro en ambas, pero diferente stack</h2>
<p>Ambas usan Nitro foam de Puma, la tecnología de nitrógeno inyectado que caracteriza la línea MB. Sin embargo, la disposición cambia:</p>
<ul>
  <li><strong>MB.04:</strong> Nitrofoam. El resultado es una zapa más reactiva y firme — más court feel, menos amortiguación blanda.</li>
  <li><strong>MB.05:</strong> Nitrofoam con mayor volumen de espuma. Más protección de impactos, especialmente en aterrizajes. Ligeramente menos "snap" que la MB.04.</li>
</ul>
<p><strong>Veredicto espuma:</strong> MB.04 si eres un guard explosivo que necesita primer paso rápido. MB.05 si pesas más de 80kg o necesitas más protección en rodillas.</p>

<h2>Tracción: MB.04 {{nota:puma-mb-04:traccion}} y MB.05 {{nota:puma-mb05:traccion}}</h2>
<p>Las dos agarran bien en parquet limpio. En nuestra ficha la MB.05 ({{nota:puma-mb05:traccion}}) puntúa un punto más que la MB.04 ({{nota:puma-mb-04:traccion}}).</p>
<p><strong>Veredicto:</strong> MB.05 si la tracción es tu prioridad.</p>

<h2>Peso y perfil</h2>
<p>La MB.04 pesa 390 g. La MB.05 sube a 418 g por el stack de espuma adicional. 28 g de diferencia no suenan a mucho, pero en 40 minutos de partido se nota. Para jugadores que valoran la sensación de agilidad, la MB.04 gana.</p>
<p>La MB.05 es <strong>low-top</strong> y la MB.04, <strong>mid</strong> (Puma vende además una MB.04 Low aparte). Si tienes historial de esguinces, de las dos quédate con la MB.04; la UA Curry 13, también mid, es otra alternativa.</p>

<h2>LaMelo brand vs rendimiento</h2>
<p>Seamos honestos: parte del precio de ambas es el nombre LaMelo Ball. Los colorways son los más llamativos del mercado — si quieres hacerte notar en la cancha, estas son las zapatillas. Pero el rendimiento técnico las justifica también: no son zapas de marketing puro.</p>
<p>Comparadas con el equivalente Nike/Jordan al mismo precio, las MB.04/MB.05 suelen ofrecer mejor tracción y similar cushion. La diferencia está en la respuesta: Nike ZoomX o Zoom Strobel tienen más energía de retorno puro. Puma Nitro es más equilibrado.</p>

<h2>¿Cuál debo comprar?</h2>
<ul>
  <li><strong>Elige la MB.04 si:</strong> buscas mejor relación calidad-precio, priorizas tracción y respuesta, eres guard o escolta ligero (menos de 80kg).</li>
  <li><strong>Elige la MB.05 si:</strong> quieres el modelo más nuevo, priorizas cushion sobre respuesta, o pesas más de 80kg y necesitas más protección.</li>
</ul>
<p>En ambos casos, si las encuentras en oferta (Puma tiene promociones frecuentes), merece la pena. A precio completo, compara: la MB.04 está desde {{precio:puma-mb-04}} y la MB.05 desde {{precio:puma-mb05}}.</p>

<p class="art-outro">¿Quieres compararlas lado a lado con todos los atributos? <a href="/comparar?slugs=puma-mb-04,puma-mb05">Usa el comparador →</a>. ¿No sabes si la línea MB encaja con tu perfil? <a href="/quiz">El quiz te lo dice en 10 preguntas</a>.</p>
    `,
  },

  // ── 13. Jordan Tatum 4 vs Adidas AE 2 ───────────────────────────────
  {
    slug: "jordan-tatum-4-vs-adidas-ae-2-aleros-2025",
    title: "Jordan Tatum 4 vs Adidas AE 2: ¿cuál es mejor para aleros en 2025?",
    metaTitle: "Jordan Tatum 4 vs Adidas AE 2 comparativa 2025: aleros y escoltas | CANCHA.ZAPA",
    description:
      "Comparativa completa entre Jordan Tatum 4 y Adidas AE 2: cushion, tracción, precio y para qué perfil de jugador es mejor cada una en 2025.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Comparativas",
    readMinutes: 5,
    eyebrow: "★ Comparativa · Aleros 2025",
    heroTitle: "Tatum 4 vs AE 2",
    heroSubtitle: "Jordan o Adidas — ¿cuál para aleros en 2025?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["jordan-tatum-4", "adidas-ae-2", "nike-gt-cut-4", "jordan-luka-4", "ua-curry-13"],
    relatedSeoPages: ["mejor-zapatilla-alero", "zapatillas-equilibradas", "mejores-zapatillas-jordan"],
    body: `
<p class="art-intro">Jordan Tatum 4 vs Adidas AE 2: dos de los mejores modelos de 2025, ambos para aleros y escoltas, ambos low-top y con horma normal. Pero con filosofías distintas: la Tatum 4 prioriza el cushion y la versatilidad; la AE 2 prioriza la tracción y la respuesta explosiva. Y tiene una sorpresa: la Tatum 4 es más barata.</p>

<h2>Comparativa de un vistazo</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Atributo</th>
      <th style="padding:8px;text-align:center">Jordan Tatum 4</th>
      <th style="padding:8px;text-align:center">Adidas AE 2</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Tracción</td>
      <td style="padding:8px;text-align:center">{{nota:jordan-tatum-4:traccion}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-ae-2:traccion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Amortiguación</td>
      <td style="padding:8px;text-align:center">{{nota:jordan-tatum-4:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-ae-2:amortiguacion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Respuesta</td>
      <td style="padding:8px;text-align:center">{{nota:jordan-tatum-4:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-ae-2:respuesta}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Soporte lateral</td>
      <td style="padding:8px;text-align:center">{{nota:jordan-tatum-4:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-ae-2:soporte_lateral}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Peso</td>
      <td style="padding:8px;text-align:center">{{peso:jordan-tatum-4}}</td>
      <td style="padding:8px;text-align:center">{{peso:adidas-ae-2}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Altura</td>
      <td style="padding:8px;text-align:center">Low-top</td>
      <td style="padding:8px;text-align:center">Low-top</td>
    </tr>
    <tr>
      <td style="padding:8px">Precio</td>
      <td style="padding:8px;text-align:center">⭐ {{precio:jordan-tatum-4}}</td>
      <td style="padding:8px;text-align:center">{{precio:adidas-ae-2}}</td>
    </tr>
  </tbody>
</table>
</div>

<h2>La sorpresa del precio: Jordan por menos que Adidas</h2>
<p>La Jordan Tatum 4 está desde {{precio:jordan-tatum-4}} y la Adidas AE 2 desde {{precio:adidas-ae-2}}. La Tatum 4 es una línea más accesible dentro del catálogo Jordan y la AE 2 es el flagship de Anthony Edwards, así que en precio de salida la AE 2 queda por encima. Si el presupuesto es tu filtro principal, compara el precio actual de las dos.</p>

<h2>Espuma: Zoom Air con Cushlon vs Light BOOST con Lightstrike</h2>
<p><strong>Jordan Tatum 4 — Zoom Air + Cushlon 3.0:</strong> una unidad Zoom Air de gran volumen en el antepié sobre Cushlon 3.0 de longitud completa da respuesta y amortiguación. El resultado: una amortiguación de {{nota:jordan-tatum-4:amortiguacion}} en nuestra ficha, justo por debajo de la {{nota:adidas-ae-2:amortiguacion}} de la AE 2.</p>
<p><strong>Adidas AE 2 — Light BOOST con Lightstrike:</strong> Light BOOST de longitud completa con Lightstrike y una Propulsion Plate en el mediopié. La energía de retorno es superior — lo notas en los saltos y en el primer paso.</p>
<p><strong>Veredicto espuma:</strong> en nuestra ficha la AE 2 gana en las dos, amortiguación ({{nota:adidas-ae-2:amortiguacion}} frente a {{nota:jordan-tatum-4:amortiguacion}}) y respuesta ({{nota:adidas-ae-2:respuesta}} frente a {{nota:jordan-tatum-4:respuesta}}).</p>

<h2>Tracción: ventaja AE 2</h2>
<p>El outsole herringbone de la AE 2 es uno de los mejores del catálogo Adidas en 2025. Más agarre en cortes laterales y mejor respuesta en pistas con algo de polvo. La Tatum 4 tiene buena tracción ({{nota:jordan-tatum-4:traccion}}) pero el patrón es menos agresivo. Si juegas en pistas con polvo frecuente, la AE 2 gana.</p>

<h2>¿Para qué tipo de alero es cada una?</h2>
<ul>
  <li><strong>Jordan Tatum 4 si:</strong> eres alero de 75-100kg que prioriza cushion, juegas tanto en el perímetro como en la pintura, tienes presupuesto ajustado (desde {{precio:jordan-tatum-4}}), o prefieres el branding Jordan.</li>
  <li><strong>Adidas AE 2 si:</strong> eres alero-escolta (<90kg) que prioriza explosividad y tracción, juegas en pistas con polvo, quieres el máximo rendimiento técnico disponible desde {{precio:adidas-ae-2}}, o ya conoces y confías en el Light BOOST de adidas.</li>
</ul>

<h2>¿Y si no soy alero?</h2>
<p>Ambas sirven también para escoltas y, en el caso de la Tatum 4, para pívots ligeros (hasta ~100kg). Ninguna es recomendable para pívots pesados que necesitan más soporte y cushion.</p>
<p>Si eres base explosivo, la <a href="/zapatilla/nike-gt-cut-4">Nike GT Cut 4</a> o la <a href="/zapatilla/ua-curry-13">UA Curry 13</a> son más específicas para ti que cualquiera de estas dos.</p>

<h2>Veredicto final</h2>
<p><strong>Si buscas la mejor relación calidad-precio: Jordan Tatum 4.</strong> Desde {{precio:jordan-tatum-4}} ofrece un paquete técnico que avergüenza a muchas zapas más caras. Cushion sólido, tracción competente, soporte lateral decente. Para casi todos los aleros que no tienen un perfil muy específico, es la compra más inteligente.</p>
<p><strong>Si buscas el máximo rendimiento técnico: Adidas AE 2.</strong> Mejor tracción, mejor respuesta, más explosiva. Vale el precio extra si priorizas rendimiento puro sobre precio.</p>

<p class="art-outro">¿Aún no estás seguro? <a href="/comparar?slugs=jordan-tatum-4,adidas-ae-2,nike-gt-cut-4">Compara estas tres zapatillas con todos los datos aquí</a>, o <a href="/quiz">haz el quiz en 60 segundos</a> para obtener tu recomendación personalizada.</p>
    `,
  },

  // ── 14. Nike GT Cut 4 análisis ───────────────────────────────────────
  {
    slug: "nike-gt-cut-4-analisis-2025",
    title: "Nike GT Cut 4: análisis completo — court feel para guards de pabellón",
    metaTitle: "Nike GT Cut 4 análisis 2025: tracción, cushion y veredicto | CANCHA.ZAPA",
    description:
      "Análisis completo de la Nike Air Zoom GT Cut 4: Zoom Air Strobel, horma estrecha y para qué bases y escoltas encaja.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 6,
    eyebrow: "★ Análisis · Nike GT Cut 4",
    heroTitle: "Nike GT Cut 4",
    heroSubtitle: "Court feel y primer paso para guards de pabellón",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "nike-gt-cut-3", "ua-curry-13", "anta-kai-2", "adidas-ae-2"],
    relatedSeoPages: ["mejor-zapatilla-base", "zapatillas-reactivas", "mejores-zapatillas-baloncesto-2025"],
    body: `
<p class="art-intro">La Nike Air Zoom GT Cut 4 es la zapatilla de baloncesto que más se repite en la lista de deseos de guards y escoltas en 2025. Tracción {{nota:nike-gt-cut-4:traccion}} y Zoom Air Strobel de última generación, aunque no es ligera ({{peso:nike-gt-cut-4}}). Victor Wembanyama la escogió para la temporada NBA 25-26 — un 2,24m que usa una zapatilla de guard te dice todo lo que necesitas saber sobre su court feel.</p>

<h2>Ficha técnica</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Atributo</th>
      <th style="padding:8px;text-align:left">Valor</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px">Tecnología</td><td style="padding:8px">Zoom Air Strobel de longitud completa + ZoomX</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px">Suela</td><td style="padding:8px">Herringbone nueva generación (goma dura)</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px">Altura</td><td style="padding:8px">Low-top</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px">Peso</td><td style="padding:8px">305g (US10)</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px">Drop</td><td style="padding:8px">7mm</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px">Horma</td><td style="padding:8px">Estrecha</td></tr>
    <tr><td style="padding:8px">Precio recomendado</td><td style="padding:8px">170€</td></tr>
  </tbody>
</table>
</div>

<h2>Tracción: pensada para pabellón</h2>
<p>El outsole herringbone de la GT Cut 4 está pensado para pista cubierta. El patrón actualizado añade más canales multidireccionales que la GT Cut 3, lo que mejora el agarre en cortes oblicuos — los más exigentes en juego real.</p>
<p>En parquet limpio, el agarre es inmediato sin necesidad de limpiar la suela. La limitación: la goma es fina para reducir peso, lo que penaliza en exterior (asfalto) donde se desgasta rápido. <strong>Son exclusivamente zapatillas de pabellón.</strong></p>

<h2>Amortiguación: funcional, no espectacular</h2>
<p>La GT Cut 4 no es una zapatilla de cushion — y eso es una elección deliberada. El Zoom Air Strobel (que recorre toda la plantilla) da una respuesta energética inmediata, pero la amortiguación total es moderada: {{nota:nike-gt-cut-4:amortiguacion}} en nuestra escala. Pívots y jugadores de más de 100kg que aterrizan con impacto fuerte encontrarán otras opciones más protectoras.</p>
<p>Para un guard de 70-85kg que hace cortes cortos y cambios de dirección rápidos, es suficiente. Pero si comparas con la Nike LeBron 22 o la Jordan Tatum 4 en cushion puro, la diferencia es notable.</p>

<h2>Respuesta y court feel</h2>
<p>Aquí es donde la GT Cut 4 juega su baza ({{nota:nike-gt-cut-4:respuesta}} en nuestra ficha). El Zoom Air Strobel tiene un retorno de energía casi instantáneo — el pie va muy pegado al suelo. Combinado con el drop de 7mm y la suela fina, obtienes una sensación de contacto directo con el parquet que pocas zapatillas replican.</p>
<p>Es la zapatilla que más se acerca a jugar descalzo sobre parquet — en el buen sentido. Sabes exactamente dónde está tu pie en cada momento.</p>

<h2>Horma y ajuste</h2>
<p>La GT Cut 4 tiene horma estrecha, especialmente en el antepié. Si tienes pie ancho (más de 10cm de anchura en la parte más ancha del pie), sube media talla o busca alternativas como la UA Curry 13, de puntera amplia.</p>
<p>El upper de mesh + TPU se adapta bien al pie después de unas horas de uso. Inicialmente puede sentirse más rígido que otras opciones — dale 2-3 sesiones antes de juzgar el confort final.</p>

<h2>¿Para quién es la GT Cut 4?</h2>
<ul>
  <li><strong>Perfil ideal:</strong> base o escolta de 60-90kg, juega exclusivamente en pabellón interior, prioriza velocidad y primer paso sobre cushion.</li>
  <li><strong>No recomendada para:</strong> pívots, jugadores con historial de esguinces (solo existe en low-top), jugadores con pie ancho, outdoor.</li>
  <li><strong>Talla:</strong> pide tu talla habitual de Nike. Si tienes pie ancho, sube media talla.</li>
</ul>

<h2>Comparativa rápida: GT Cut 4 vs alternativas</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left"></th>
      <th style="padding:8px;text-align:center">GT Cut 4</th>
      <th style="padding:8px;text-align:center">UA Curry 13</th>
      <th style="padding:8px;text-align:center">ANTA Kai 2</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Tracción</td>
      <td style="padding:8px;text-align:center">{{nota:nike-gt-cut-4:traccion}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:ua-curry-13:traccion}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:anta-kai-2:traccion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Respuesta</td>
      <td style="padding:8px;text-align:center">{{nota:nike-gt-cut-4:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:ua-curry-13:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{nota:anta-kai-2:respuesta}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Horma ancha</td>
      <td style="padding:8px;text-align:center">❌ No</td>
      <td style="padding:8px;text-align:center">✅ Normal</td>
      <td style="padding:8px;text-align:center">Normal</td>
    </tr>
    <tr>
      <td style="padding:8px">Precio</td>
      <td style="padding:8px;text-align:center">{{precio:nike-gt-cut-4}}</td>
      <td style="padding:8px;text-align:center">{{precio:ua-curry-13}}</td>
      <td style="padding:8px;text-align:center">{{precio:anta-kai-2}}</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Veredicto</h2>
<p>La Nike GT Cut 4 es una buena opción para guards de pabellón — si encajas en el perfil. Su punto fuerte es el court feel y el primer paso, no las cifras de tracción ({{nota:nike-gt-cut-4:traccion}}) ni de respuesta ({{nota:nike-gt-cut-4:respuesta}}). Pero hay dos condiciones: pie normal o estrecho, y juego exclusivamente indoor. Si se cumplen ambas, es una compra que no te arrepentirás.</p>
<p>Si tienes pie ancho, la <a href="/zapatilla/ua-curry-13">UA Curry 13</a> (puntera amplia) es una alternativa más cómoda; si lo que te falta es cushion, mira la <a href="/zapatilla/anta-kai-2">ANTA Kai 2</a>. Las dos son algo más baratas.</p>

<p class="art-outro">¿Dudas entre la GT Cut 4 y otra zapatilla? <a href="/comparar?slugs=nike-gt-cut-4,ua-curry-13,anta-kai-2">Compáralas con todos los datos aquí</a>. ¿No sabes si es la tuya? <a href="/quiz">El quiz te lo dice en 60 segundos</a>.</p>
    `,
  },

  // ── 14. Zapatillas niños y jóvenes ──────────────────────────────────
  {
    slug: "zapatillas-baloncesto-ninos-jovenes-2025",
    title: "Mejores zapatillas de baloncesto para niños y jóvenes 2025",
    metaTitle: "Mejores zapatillas baloncesto niños y jóvenes 2025 | CANCHA.ZAPA",
    description:
      "Guía completa para padres: las mejores zapatillas de baloncesto para niños y adolescentes en 2025. Qué marcas, qué modelos y cuánto gastar según la edad.",
    fecha: "2026-10-19",
    fechaLabel: "19 octubre 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía para padres · Junior 2026",
    heroTitle: "Zapatillas de baloncesto para niños y jóvenes",
    heroSubtitle: "Lo que nadie te dice antes de comprarlas",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["decathlon-tarmak-fast-900-nba-junior", "adidas-cross-em-up-5-gs", "nike-giannis-immortality-4-gs", "adidas-dame-x-gs", "adidas-don-issue-7-gs"],
    relatedSeoPages: ["zapatillas-baloncesto-junior", "zapatillas-baloncesto-baratas", "mejor-zapatilla-base"],
    body: `
<p class="art-intro">Comprar zapatillas de baloncesto para un niño o adolescente tiene sus propias reglas. Los pies crecen rápido, el presupuesto es limitado y el rendimiento debe acompañar el nivel de juego. Esta guía responde las preguntas que todo padre hace antes de comprar.</p>

<h2>Lo primero: ¿cuánto debo gastar?</h2>
<p>La tentación de comprar las mismas zapatillas que usa el jugador favorito de tu hijo existe, pero no siempre tiene sentido. Aquí va una guía práctica según el nivel:</p>
<ul>
  <li><strong>Iniciación (6-10 años):</strong> 30-50€. Los niños crecen muy rápido — una zapatilla básica dura 1 temporada. Prioriza comodidad y amortiguación básica. La Decathlon Tarmak Fast 900 NBA Junior y la UA Jet '25 en versión de niño son las opciones más inteligentes.</li>
  <li><strong>Escuela/Club (10-14 años):</strong> 50-80€. Ya tiene sentido invertir algo más — la zapa dura más y el niño empieza a desarrollar su técnica. Adidas Cross Em Up 5, Nike Giannis Immortality 4 y Adidas Dame X, todas en versión de niño, son las mejores opciones de este rango.</li>
  <li><strong>Federado/Cadete (14-18 años):</strong> 80-130€. A esta edad, el rendimiento importa. El pie ya está más estabilizado (menos crecimiento por año) y vale la pena invertir en modelos con tecnología seria: Adidas D.O.N. Issue 7, AE 2 o Puma MB.05, que también existen en tallaje GS.</li>
</ul>

<h2>Tallas: GS (Grade School) y diferencias clave</h2>
<p>La mayoría de zapatillas de rendimiento de Nike, Adidas y Jordan están disponibles en <strong>tallas GS (Grade School)</strong>, que cubren aproximadamente EU 35.5 hasta EU 40. Estas son versiones reducidas del modelo adulto con la misma tecnología pero adaptadas al perfil del pie infantil.</p>
<p><strong>Atención:</strong> algunas zapatillas premium solo están disponibles en tallas adulto (EU 40+). Verifica siempre la disponibilidad en GS antes de comprometerte con un modelo concreto.</p>
<p>Para medir correctamente: mide el pie en centímetros por la tarde (cuando está más hinchado) y suma 1cm para espacio en punta. Los niños en crecimiento pueden necesitar 1-1.5cm de espacio adicional — pero no más, porque el pie se mueve demasiado dentro de la zapatilla.</p>

<h2>Los mejores modelos junior</h2>
<p>Todas estas se venden en tallaje de niño (GS) en tiendas que trabajan en España; el precio de hoy de cada una está en su ficha.</p>

<h3>1. <a href="/zapatilla/decathlon-tarmak-fast-900-nba-junior">Decathlon Tarmak Fast 900 NBA Junior</a> — iniciación</h3>
<p>La opción más sensata para un niño que empieza y aún no sabes si seguirá: barata, cómoda y la única que puedes probarle en una tienda física. La amortiguación es básica, pero para iniciación no hace falta más.</p>

<h3>2. <a href="/zapatilla/adidas-cross-em-up-5-gs">Adidas Cross Em Up 5</a> — iniciación y escuela</h3>
<p>Caña media para dar algo más de sujeción al tobillo y una suela de goma que aguanta también la pista exterior del colegio. Hay una versión hermana, la <a href="/zapatilla/adidas-cross-em-up-select">Cross 'Em Up Select</a>, con el mismo planteamiento.</p>

<h3>3. <a href="/zapatilla/nike-giannis-immortality-4-gs">Nike Giannis Immortality 4</a> — club</h3>
<p>Para niños de 10 a 14 años que juegan en club: espuma Renew, buena tracción de espiga y un precio contenido. El tirón de Giannis Antetokounmpo ayuda con la motivación.</p>

<h3>4. <a href="/zapatilla/adidas-dame-x-gs">Adidas Dame X</a> — rendimiento de gama alta a precio bajo</h3>
<p>La versión de niño de la décima de Damian Lillard: Lightstrike con muy buena tracción, amortiguación y respuesta, y suele encontrarse rebajada. Es de pista cubierta: en exterior su goma se gasta rápido.</p>

<h3>5. <a href="/zapatilla/adidas-don-issue-7-gs">Adidas D.O.N. Issue 7</a> — cadetes que compiten</h3>
<p>La mejor valorada de las versiones de niño del catálogo: Lightstrike con Lightstrike Pro en el antepié, mucho soporte y tracción. Para jugadores federados que ya notan la diferencia. Otras de ese nivel: la <a href="/zapatilla/adidas-ae-2-gs">AE 2</a> y la <a href="/zapatilla/ua-curry-12-gs">UA Curry 12</a>, también en tallaje GS y también solo para interior.</p>

<h2>¿Low, mid o high para un niño?</h2>
<p>Para niños sin historial de esguinces: cualquier altura funciona. Para niños con tobillos débiles o historial de torceduras: prioriza mid o high. La diferencia en protección entre low y mid es real en jugadores en formación cuya musculatura de tobillo aún se está desarrollando.</p>
<p>Si tu hijo juega en posición 1-2 (base/escolta) y es ágil, low-top está bien. Para posiciones 4-5 (ala-pívot/pívot), una mid o high ofrece más protección en los contactos de la pintura.</p>

<h2>¿Interior o exterior?</h2>
<p>La mayoría de equipos junior entrenan y juegan en pabellón. Si tu hijo también juega en parque o cancha exterior (streetball), necesita una zapatilla con suela de goma robusta. Las Adidas Cross Em Up y la UA Jet '25 llevan una goma que aguanta bien fuera. Las zapatillas premium de competición (GT Cut, Curry 13) NO son para exterior.</p>

<h2>Dónde comprar las mejores zapatillas junior</h2>
<p>Para iniciación: Decathlon es la mejor opción — puedes probarlas en tienda, tienen buena política de devolución y el precio es imbatible. Para modelos Nike y Adidas en tallaje de niño: tiendas como Forum Sport, Atmósfera, El Corte Inglés o la propia Adidas, y Amazon si el vendedor es oficial. Fíjate en que la devolución sea fácil: es clave cuando el niño crece rápido o la talla no queda bien.</p>

<p class="art-outro">¿Tu hijo ya tiene un nivel de juego claro y quieres la recomendación exacta para su posición, peso y presupuesto? <a href="/quiz">El quiz funciona igual para adultos que para jóvenes</a> — introduce sus datos y obtén las 5 zapatillas más compatibles con su perfil.</p>
    `,
  },

  // ── 12. Zapatillas pie plano ─────────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-pie-plano-2026",
    title: "Zapatillas de baloncesto para pie plano: guía 2025-2026",
    metaTitle: "Zapatillas baloncesto pie plano 2026: cuáles elegir | CANCHA.ZAPA",
    description:
      "Guía completa para elegir zapatillas de baloncesto con pie plano o pronación. Qué buscar en soporte de arco, estabilidad y cushion. Las 5 mejores opciones.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía · Pie plano y pronación",
    heroTitle: "Zapatillas de baloncesto para pie plano",
    heroSubtitle: "Guía 2025-2026 — sin BS, sin ventas disfrazadas",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["ua-curry-13", "nike-lebron-22", "anta-kai-2", "adidas-ae-2", "nike-gt-cut-4"],
    relatedSeoPages: ["zapatillas-baloncesto-pie-plano", "zapatillas-cushion", "zapatillas-equilibradas"],
    body: `
<p class="art-intro">El pie plano (o pronación excesiva) afecta aproximadamente al 20-30% de los jugadores de baloncesto. La buena noticia: con la zapatilla correcta, no es una desventaja real. La mala: la mayoría de guías de zapatillas ignoran este tema. Aquí lo abordamos en serio.</p>

<h2>¿Qué es el pie plano en el contexto del baloncesto?</h2>
<p>El pie plano significa que el arco interno del pie toca el suelo casi por completo al estar de pie. En baloncesto, esto implica <strong>pronación excesiva</strong>: el tobillo tiende a girar hacia dentro en cada zancada y aterrizaje. El resultado puede ser:</p>
<ul>
  <li>Mayor estrés en rodillas y caderas</li>
  <li>Mayor riesgo de fascitis plantar</li>
  <li>Inestabilidad lateral en cortes rápidos</li>
  <li>Fatiga más rápida si la zapa no ofrece soporte</li>
</ul>
<p><strong>Importante:</strong> si tienes pie plano severo y dolor crónico, consulta a un podólogo antes de comprar zapatillas. A veces las plantillas ortopédicas son más efectivas que la zapatilla en sí.</p>

<h2>Qué buscar en una zapatilla para pie plano</h2>

<h3>1. Estabilidad 8+</h3>
<p>El atributo más crítico. Una puntuación de estabilidad alta indica que la zapatilla tiene refuerzos laterales, TPU en el talón y base ancha que contrarrestan la pronación. En nuestro catálogo, puedes filtrar por estabilidad en las fichas individuales.</p>

<h3>2. Soporte lateral 7+</h3>
<p>Diferente a la estabilidad pero relacionado. El soporte lateral es la capacidad de contener el pie en movimientos laterales — cortes, cambios de dirección. Para pie plano, soporte lateral alto compensa la inestabilidad natural del arco.</p>

<h3>3. Amortiguación media-alta</h3>
<p>El arco plano transfiere más impacto a rodilla y cadera. Un cushion de 7+ ayuda a absorber parte de ese impacto. Ojo: más cushion blando no siempre es mejor — demasiado foam blando crea inestabilidad. Busca cushion firme y reactivo, no solo mucho foam.</p>

<h3>4. Plataforma ancha</h3>
<p>Una base ancha da más punto de apoyo. Modelos como el LeBron 22 o la UA Curry 13 tienen geometría de suela más ancha que zapatillas tipo "racing" como la Kobe 8 Protro. Evita los modelos más estrechos y con perfil bajo radical.</p>

<h3>5. Talón con contrafuerte rígido</h3>
<p>El contrafuerte es la zona rígida alrededor del talón. Para pie plano, un contrafuerte firme ayuda a controlar la pronación desde el punto de mayor impacto. Las zapatillas de categoría "balanced" o "cushion-focused" suelen tenerlo mejor.</p>

<h2>Las 5 mejores opciones para pie plano</h2>

<h3>1. Nike LeBron 22 — la mejor amortiguación + estabilidad</h3>
<p>Zoom Air en talón y antepié, plataforma ancha, estabilidad {{nota:nike-lebron-22:estabilidad}}. El LeBron está diseñado para jugadores físicos de 100kg+ — la misma ingeniería que protege a un jugador de ese tamaño protege perfectamente a un jugador con pie plano a cualquier peso. Precio: desde {{precio:nike-lebron-22}}.</p>

<h3>2. ANTA Kai 2 — estabilidad y cushion</h3>
<p>Estabilidad {{nota:anta-kai-2:estabilidad}}, soporte lateral {{nota:anta-kai-2:soporte_lateral}} y amortiguación {{nota:anta-kai-2:amortiguacion}}, con entresuela Nitro Edge enjaulada y suela de goma completa. Horma normal. Una opción versátil para guards y aleros con pie plano. Precio: desde {{precio:anta-kai-2}}.</p>

<h3>3. UA Curry 13 — court feel con soporte</h3>
<p>Sorprendentemente buena para pie plano: UA Flow con geometría de suela estabilizadora, soporte lateral {{nota:ua-curry-13:soporte_lateral}}, estabilidad {{nota:ua-curry-13:estabilidad}}. Más reactiva que el LeBron, ideal si eres guard con pie plano. El UA Flow actúa como una plantilla extra al ser la espuma de suela directo al suelo. Precio: desde {{precio:ua-curry-13}}.</p>

<h3>4. Adidas AE 2 — más accesible que las de gama tope</h3>
<p>Si el presupuesto importa, la AE 2 ofrece estabilidad {{nota:adidas-ae-2:estabilidad}} y soporte lateral {{nota:adidas-ae-2:soporte_lateral}} desde {{precio:adidas-ae-2}}. Light BOOST con Lightstrike, herringbone tracción. No llega al LeBron ni en cushion ({{nota:adidas-ae-2:amortiguacion}} frente a {{nota:nike-lebron-22:amortiguacion}}) ni en soporte ({{nota:adidas-ae-2:soporte_lateral}} frente a {{nota:nike-lebron-22:soporte_lateral}}). Para jugadores de hasta 85kg con pie plano, es suficiente.</p>

<h3>5. Nike GT Hustle 3 — soporte de tobillo + pie plano</h3>
<p>Si tienes pie plano <em>y</em> historial de esguinces, la GT Hustle 3, de corte mid, es la solución. Estabilidad {{nota:nike-gt-hustle-3:estabilidad}}, soporte lateral {{nota:nike-gt-hustle-3:soporte_lateral}}, collar de tobillo reforzado. Más pesada que la GT Cut, pero para un jugador con problemas combinados de pie plano + tobillo débil, es la opción más segura del mercado.</p>

<h2>Lo que debes evitar</h2>
<ul>
  <li><strong>Zapatillas tipo "racing":</strong> La Kobe 8 Protro (340 g), la GT Cut 4 (431 g) o cualquier low-profile extremo no tiene la plataforma de soporte que necesita un pie plano. Excelentes zapatillas, pero no para este perfil.</li>
  <li><strong>Zapatillas con cushion excesivamente blando:</strong> Foam muy blando (algunas versiones de Nike React) crea una base inestable que empeora la pronación. Busca cushion firme, no solo abundante.</li>
  <li><strong>Horma muy estrecha:</strong> El pie plano tiende a ser más ancho cuando el arco no lo levanta. Horma estrecha crea puntos de presión. Modelos Nike con horma estrecha (muchos Kyrie) son problemáticos para este perfil.</li>
</ul>

<h2>¿Vale la pena una plantilla ortopédica?</h2>
<p>Para pronación leve, una buena zapatilla es suficiente. Para pronación moderada o severa, una plantilla ortopédica <em>plus</em> una zapatilla de soporte es la mejor combinación. Las plantillas personalizadas de podólogo cuestan 100-200€ pero duran años y se transfieren entre zapatillas. No veas ese gasto como uno extra — es la solución real al problema, no un parche.</p>

<p>Si optas por plantillas, necesitas una zapatilla con plantilla removible (la mayoría lo son) y espacio interior suficiente. El LeBron 22 tiene más espacio interior que la GT Cut, por ejemplo.</p>

<h2>Preguntas frecuentes</h2>

<h3>¿El pie plano empeora con el baloncesto?</h3>
<p>El baloncesto no causa pie plano pero sí puede agravar los síntomas sin el calzado adecuado. Con buena zapatilla y posiblemente plantilla, puedes jugar sin limitaciones.</p>

<h3>¿Qué diferencia hay entre pie plano y pie pronador?</h3>
<p>Técnicamente el pie plano (arco bajo estructuralmente) y el pie pronador (que colapsa en movimiento) son distintos pero comparten recomendaciones similares: soporte de arco, estabilidad, cushion firme.</p>

<h3>¿Puedo usar zapatillas de running con soporte de pronación para baloncesto?</h3>
<p>No. Las zapatillas de running con soporte de pronación están diseñadas para movimientos en línea recta, no para los cortes laterales del baloncesto. Usar running en cancha aumenta el riesgo de lesión, especialmente de tobillo.</p>

<p class="art-outro">Si tienes pie plano y dudas sobre qué zapatilla específica elegir para tu perfil, <a href="/quiz">usa el quiz</a> — en 10 preguntas te damos las 5 más compatibles con tu peso, posición y tipo de juego.</p>
    `,
  },

  // ── 17. Adidas AE 2 análisis ─────────────────────────────────────────
  {
    slug: "adidas-ae-2-analisis-2025",
    title: "Adidas AE 2 análisis completo: la mejor zapatilla de baloncesto de 2025",
    metaTitle: "Adidas AE 2 análisis 2025: tracción, cushion, precio | CANCHA.ZAPA",
    description:
      "Análisis técnico completo de las Adidas AE 2 (Anthony Edwards): tracción, amortiguación, ajuste y comparativa con GT Cut 4 y Curry 13. ¿Vale la pena su precio?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 6,
    eyebrow: "★ Análisis técnico · Adidas AE 2",
    heroTitle: "Adidas AE 2 análisis",
    heroSubtitle: "La zapatilla de Anthony Edwards — ¿realmente la mejor del mercado?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["adidas-ae-2", "nike-gt-cut-4", "ua-curry-13", "anta-kai-2", "jordan-tatum-4"],
    relatedSeoPages: ["zapatillas-traccion", "zapatillas-reactivas", "mejor-zapatilla-base"],
    body: `
<p class="art-intro">La Adidas AE 2 lleva varios meses en el tope de nuestros rankings. Tracción {{nota:adidas-ae-2:traccion}}, respuesta excepcional, horma versátil. Pero ¿por qué exactamente? Este análisis desmonta la zapatilla atributo por atributo para que entiendas qué la hace tan buena y si encaja con tu perfil.</p>

<h2>Contexto: Anthony Edwards y la línea AE</h2>
<p>Anthony Edwards firmó con Adidas en 2023 y la AE 2 es el tercer modelo de su línea signature. Edwards es un escolta explosivo, potente y con un primer paso brutal — su zapatilla refleja exactamente eso: tracción y respuesta por encima de todo. Adidas montó Light BOOST con Lightstrike y una Propulsion Plate en el mediopié.</p>
<p>La AE 2 se lanzó a <strong>~145€</strong>, un precio razonable para la tecnología que incluye. Es un escalón por debajo del precio aspiracional de Jordan y Nike (150-180€) con rendimiento comparable o superior en la mayoría de atributos.</p>

<h2>Tracción: la mejor del mercado en indoor</h2>
<p>El patrón herringbone de la AE 2 es uno de los mejores que hemos probado en pabellón en 2025. La goma agarra en todas las direcciones — cambios de dirección laterales, arranques, paradas — sin un solo deslizamiento. En polvo de la cancha funciona bien; en suelo muy sucio (pabellones mal barridos) necesitas limpiar con regularidad, como cualquier zapatilla indoor.</p>
<ul>
  <li><strong>Indoor:</strong> excepcional ({{nota:adidas-ae-2:traccion}})</li>
  <li><strong>Outdoor:</strong> no recomendable — la goma se desgasta rápido en asfalto</li>
  <li><strong>Patrón:</strong> herringbone full-length con variaciones en talón y antepié</li>
</ul>

<h2>Amortiguación: reactiva, no máxima</h2>
<p>La AE 2 lleva <strong>Light BOOST</strong> de longitud completa, con Lightstrike y una Propulsion Plate en el mediopié. El resultado es un cushion reactivo y devolutivo — sientes el suelo pero con protección suficiente. No es la zapatilla de máxima amortiguación del mercado (ese papel lo juegan la LeBron 22 o la LeBron 23), pero tampoco es minimal.</p>
<p>Para jugadores de 60-85 kg que no buscan cushion de pívot, es más que suficiente. Para jugadores de 90+ kg o con rodillas sensibles, considera alternativas con más stack de cushion.</p>

<h2>Respuesta y court feel</h2>
<p>Aquí la AE 2 destaca especialmente. El Light BOOST con la Propulsion Plate devuelve energía de forma eficiente — cuando aceleras, la midsole "empuja" en lugar de absorber pasivamente. Es la característica que más aprecia Edwards (cuyo juego se basa en primeros pasos) y que más notable resulta en cancha.</p>
<p>El court feel es excelente para una zapatilla con cushion de este nivel. No es tan "al suelo" como la GT Cut 4, pero tampoco parece que estás sobre un cojín.</p>

<h2>Ajuste y horma</h2>
<p>La AE 2 tiene una horma <strong>normal</strong>, más generosa que la GT Cut 4 (estrecha) y más estrecha que la LeBron 22 (ancha). Para la mayoría de pies normales, encaja perfectamente en talla habitual. Algunos usuarios con pie muy ancho suben media talla.</p>
<p>El upper textil ligero y sintético ofrece un ajuste ceñido pero sin puntos de presión. El collar de tobillo está bien acolchado. No hay historial de rozaduras en el talón en la AE 2, un problema que sí afecta a algunos usuarios de la GT Cut 4.</p>

<h2>Soporte y estabilidad</h2>
<p>La AE 2 ofrece soporte lateral sólido ({{nota:adidas-ae-2:soporte_lateral}}) para un zapato low-top. El counter de talón es rígido y el midfoot shank controla el torsional. Para guards y escoltas que hacen muchos cortes, el soporte es más que suficiente. No es el zapato para un pívot de 100 kg que necesita máxima estabilidad — ahí manda el LeBron 22 o la Jordan Tatum 4.</p>

<h2>Peso</h2>
<p>La AE 2 pesa <strong>428 g</strong> en talla 44 (US 10), que la coloca entre las pesadas de su categoría: está a la par de la GT Cut 4 (431 g) y muy por encima de una Curry 13 (352 g) o una Tatum 4 (351 g). Si buscas ligereza, no es tu zapatilla; si vienes de un modelo de este peso, la diferencia no la vas a notar.</p>

<h2>Comparativa directa</h2>
<table style="border-collapse:collapse;width:100%;font-size:13px;margin:16px 0">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left;color:var(--cz-text)">Atributo</th>
      <th style="padding:8px;text-align:center;color: var(--cz-accent-text)">AE 2</th>
      <th style="padding:8px;text-align:center;color:#e4e4e7">GT Cut 4</th>
      <th style="padding:8px;text-align:center;color:#e4e4e7">Curry 13</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px;color:var(--cz-fg3)">Tracción</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:adidas-ae-2:traccion}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:nike-gt-cut-4:traccion}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:ua-curry-13:traccion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px;color:var(--cz-fg3)">Cushion</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:adidas-ae-2:amortiguacion}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:nike-gt-cut-4:amortiguacion}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:ua-curry-13:amortiguacion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px;color:var(--cz-fg3)">Respuesta</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:adidas-ae-2:respuesta}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:nike-gt-cut-4:respuesta}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:ua-curry-13:respuesta}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px;color:var(--cz-fg3)">Soporte lateral</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:adidas-ae-2:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:nike-gt-cut-4:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:ua-curry-13:soporte_lateral}}</td>
    </tr>
    <tr>
      <td style="padding:8px;color:var(--cz-fg3)">Precio</td>
      <td style="padding:8px;text-align:center;color:#e4e4e7">{{precio:adidas-ae-2}}</td>
      <td style="padding:8px;text-align:center;color:#e4e4e7">{{precio:nike-gt-cut-4}}</td>
      <td style="padding:8px;text-align:center;color:#e4e4e7">{{precio:ua-curry-13}}</td>
    </tr>
  </tbody>
</table>

<h2>¿Para quién es la AE 2?</h2>
<p>La AE 2 es el zapato más versátil de la gama premium de 2025. Funciona para:</p>
<ul>
  <li><strong>Guards (1-2):</strong> tracción y respuesta ideales para un juego explosivo</li>
  <li><strong>Escoltas (2-3):</strong> polivalencia y horma que encaja en pies medios</li>
  <li><strong>Aleros (3):</strong> suficiente cushion y estabilidad para posiciones mixtas</li>
</ul>
<p>No es ideal para:</p>
<ul>
  <li>Pívots que necesitan máxima amortiguación (90 kg+)</li>
  <li>Jugadores outdoor: su goma blanda se gasta rápido en asfalto; para la calle, mejor una <a href="/zapatilla/adidas-dame-certified">Dame Certified</a> o una <a href="/zapatilla/jordan-luka-77">Luka .77</a></li>
  <li>Pies muy anchos — considera la UA Curry 13 o la LeBron 22</li>
</ul>

<h2>¿Dónde comprar?</h2>
<p>Consulta las tiendas y el precio actualizado en <a href="/zapatilla/adidas-ae-2">su ficha</a>. Si no has probado la horma antes, elige una tienda con devolución en 30 días. Para pies anchos, recomendamos probarla primero en una tienda física.</p>

<p class="art-outro">La Adidas AE 2 es nuestra zapatilla más recomendada de 2025 para jugadores entre 60-85 kg sin necesidades especiales de cushion máximo. Si tienes dudas sobre si encaja con tu perfil específico, <a href="/quiz">el quiz te da las 5 más compatibles en menos de un minuto</a>.</p>
    `,
  },

  // ── 18. UA Curry 13 análisis ─────────────────────────────────────────
  {
    slug: "ua-curry-13-analisis-2025",
    title: "Under Armour Curry 13 análisis: ¿merece la pena?",
    metaTitle: "UA Curry 13 análisis 2025: tracción, cushion y ajuste | CANCHA.ZAPA",
    description:
      "Análisis técnico de las Under Armour Curry 13 (Stephen Curry): tecnología UA Flow, cushion, tracción y comparativa con AE 2 y GT Cut 4. ¿Vale la pena?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis técnico · Under Armour Curry 13",
    heroTitle: "Under Armour Curry 13",
    heroSubtitle: "El zapato de Stephen Curry — análisis técnico honesto 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["ua-curry-13", "adidas-ae-2", "nike-gt-cut-4", "anta-kai-2", "jordan-tatum-4"],
    relatedSeoPages: ["zapatillas-reactivas", "mejor-zapatilla-base", "zapatillas-traccion"],
    body: `
<p class="art-intro">Stephen Curry es el mejor tirador de la historia de la NBA y Under Armour pasó doce años, desde 2013, construyendo zapatillas alrededor de su estilo de juego: velocidad sin balón, cambios de dirección sin perder equilibrio, y un primer paso que descoloca defensas. La Curry 13 lleva esa filosofía al límite — y cierra la saga, porque es la última que firman juntos. ¿Vale la pena frente a la AE 2?</p>

<h2>Contexto: la Curry 13 es la última Curry de Under Armour</h2>
<p>Es el dato que cambia cómo hay que leer este análisis. El <strong>13 de noviembre de 2025</strong> Stephen Curry y Under Armour anunciaron su separación tras doce años juntos. La Curry 13 salió en <strong>febrero de 2026</strong> como cierre pactado de la línea, con colorways y colecciones de ropa previstos hasta <strong>octubre de 2026</strong>. <strong>No habrá Curry 14 de Under Armour.</strong></p>
<p>Curry conserva la propiedad de Curry Brand y de sus logos (incluido el "Splash"), y a día de hoy es agente libre de calzado buscando un nuevo socio. Traducido a lo que te importa como comprador:</p>
<ul>
  <li><strong>No esperes una sucesora.</strong> Si te encaja la horma de la línea Curry, esta es la última oportunidad de comprarla nueva dentro del catálogo de UA.</li>
  <li><strong>Es razonable esperar descuentos</strong> según se agote el stock a lo largo de 2026: es fin de línea, no un modelo en plena vida comercial.</li>
  <li><strong>Nada de esto afecta al rendimiento en cancha</strong>, que es lo que analizamos abajo. La zapatilla es la misma se llame como se llame lo que venga después.</li>
</ul>

<h2>Tecnología: UA HOVR+ y Flow</h2>
<p>La Curry 13 usa dos tecnologías clave:</p>
<ul>
  <li><strong>Entresuela UA HOVR+ de longitud completa:</strong> espuma supercrítica más ligera y blanda, con retorno de energía.</li>
  <li><strong>Suela UA Flow desacoplada:</strong> da court feel y agarre en parquet. El inconveniente: se desgasta rápido en asfalto.</li>
</ul>
<p>La combinación de HOVR+ y Flow hace que la Curry 13 tenga un feel único en cancha: muy pegada al suelo, más responsiva y con buen agarre.</p>

<h2>Tracción: consistente pero no excepcional</h2>
<p>La tracción de la Curry 13 es buena, pero no llega a la excelencia de la GT Cut 4 o la AE 2 en superficies perfectas. El patrón multidireccional funciona bien en pabellones limpios.</p>
<p>El UA Flow sin goma en el antepié es más deslizante en surfaces no ideales que un patrón herringbone clásico. Si tu pabellón no se barre bien, considera la AE 2 o la GT Cut 4 como alternativas más fiables.</p>

<h2>Cushion y protección</h2>
<p>La entresuela UA HOVR+ ofrece un cushion generoso para una zapatilla tan reactiva. No es el nivel de stack de la LeBron 22, pero protege bien para el juego de Curry: aterrizajes controlados de un guard de 86 kg que rara vez domina la pintura. Para pívots o jugadores de 90 kg+, puede quedarse corta en sesiones largas.</p>

<h2>Soporte y estabilidad: el punto fuerte</h2>
<p>Aquí la Curry 13 destaca claramente sobre sus rivales directos. El chasis de TPU moldeado en 3D, la jaula SPLASH y la estructura de Pebax sujetan el pie en los cortes, y el corte mid suma algo de protección de tobillo. Ideal para jugadores con historial leve de esguinces que no quieren renunciar a la libertad de movimiento.</p>
<p>Si compararas la Curry 13 con la AE 2 en estabilidad lateral, la Curry gana claramente. Si la comparas con la Tatum 4, la Tatum gana. Para la mayoría de guards con tobillos razonablemente estables, la Curry 13 ofrece más que suficiente.</p>

<h2>Peso y comfort</h2>
<p>La Curry 13 pesa <strong>unos 350 g</strong> (12,4 oz según Under Armour). La comodidad general es alta desde el primer uso: la lengüeta acolchada y el collar de tobillo bien acabado se notan desde el día uno.</p>

<h2>AE 2 vs Curry 13: ¿cuál elegir?</h2>
<p>Son los dos mejores zapatos de guard de 2025 y la elección depende de tu perfil:</p>
<ul>
  <li><strong>Elige la AE 2 si:</strong> priorizas la tracción, juegas en pabellones con polvo, tienes pie normal, o tu presupuesto llega a {{precio:adidas-ae-2}}</li>
  <li><strong>Elige la Curry 13 si:</strong> priorizas estabilidad lateral y court feel, juegas en pabellones limpios, o tienes historial leve de esguinces</li>
  <li><strong>Si tienes 90 kg+:</strong> ninguna de las dos es tu primera opción — considera la LeBron 22, la LeBron 23 o la KD 19</li>
</ul>

<h2>¿Dónde comprar la Curry 13?</h2>
<p>Las tiendas y el precio actual de la Curry 13 están en el bloque de compra de su ficha. Al ser la última de la saga, algunos colores ya aparecen con descuento. Las ediciones especiales como Splash Zone suelen tener disponibilidad limitada.</p>

<p class="art-outro">La Curry 13 es una zapatilla premium que justifica su precio para guards que buscan estabilidad y court feel por encima de cushion máximo — y, al ser el punto final de la saga con Under Armour, la última de su estirpe. Si tienes dudas sobre si encaja con tu perfil, <a href="/quiz">el quiz de CANCHA.ZAPA te da las 5 más compatibles en 60 segundos</a>.</p>
    `,
  },

  // ── 19. Jordan Tatum 4 análisis ──────────────────────────────────────
  {
    slug: "jordan-tatum-4-analisis-2025",
    title: "Jordan Tatum 4 análisis: la zapatilla más versátil de 2025",
    metaTitle: "Jordan Tatum 4 análisis 2025: cushion, tracción, precio | CANCHA.ZAPA",
    description:
      "Análisis técnico completo de las Jordan Tatum 4 (Jayson Tatum): cushion, soporte lateral, ajuste y comparativa con AE 2, Curry 13 y GT Cut 4. ¿La zapatilla más versátil del mercado?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 6,
    eyebrow: "★ Análisis técnico · Jordan Tatum 4",
    heroTitle: "Jordan Tatum 4 análisis",
    heroSubtitle: "La zapatilla de Jayson Tatum — ¿la más versátil de 2025?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["jordan-tatum-4", "adidas-ae-2", "ua-curry-13", "nike-gt-cut-4", "nike-lebron-23"],
    relatedSeoPages: ["zapatillas-cushion", "zapatillas-equilibradas", "mejor-zapatilla-alero"],
    body: `
<p class="art-intro">Jayson Tatum es el alero completo de la era moderna: anota, rebota, defiende y corre la pista entera. Su zapatilla tiene que hacer lo mismo. La Jordan Tatum 4 es nuestra zapatilla más equilibrada de 2025 — no es la mejor en ningún atributo individual, pero no falla en ninguno. Para la mayoría de jugadores amateurs, eso es exactamente lo que necesitan.</p>

<h2>Contexto: Jayson Tatum y la línea Tatum</h2>
<p>Jayson Tatum (Boston Celtics, All-Star, campeón NBA 2024) es el prototipo del alero moderno. Su juego combina explosividad, finesse y versatilidad defensiva. La línea Tatum nació en 2022 y la Tatum 4 es la evolución más madura: más cushion, mejor soporte, construcción más premium.</p>
<p>El precio de salida en España es 129,99€, por debajo de la AE 2, la LeBron 22 o la Nike GT Cut 4.</p>

<h2>Tecnología: Zoom Air + Cushlon 3.0</h2>
<p>La Jordan Tatum 4 usa una combinación de:</p>
<ul>
  <li><strong>Zoom Air en el antepié:</strong> proporciona respuesta rápida y court feel. La misma unidad que ves en muchas zapas Nike de performance.</li>
  <li><strong>Cushlon 3.0 de longitud completa:</strong> espuma blanda que protege los aterrizajes desde el poste o rebotes.</li>
</ul>
<p>La combinación Zoom Air + Cushlon 3.0 es equilibrada: el Zoom del antepié da respuesta y el Cushlon, amortiguación. Para un alero que hace de todo, es el compromiso perfecto.</p>

<h2>Cushion: uno de los mejores del mercado en su segmento</h2>
<p>Con Zoom Air y Cushlon 3.0, la Tatum 4 protege bien en todas las situaciones. En aterrizajes desde el aro, contactos en la pintura y partidos de 40+ minutos, el nivel de cushion es más que suficiente para jugadores hasta 95 kg. Para pívots de 100 kg+, la LeBron 22 o la LeBron 23 tienen aún más amortiguación.</p>
<p>El cushion no sacrifica el court feel gracias al Zoom en el antepié. Otros zapatos con tanto cushion (LeBron 22, Witness) se sienten "esponjosos" — la Tatum 4 mantiene conexión con el suelo.</p>

<h2>Tracción</h2>
<p>El patrón multidireccional de la Tatum 4 es sólido ({{nota:jordan-tatum-4:traccion}}) aunque no excepcional. En pabellones limpios, agarra en todas las direcciones sin problema. En suelo con polvo, necesitas limpiar la suela con regularidad. No llega al nivel de la AE 2 o la GT Cut 4 en tracción pura, pero tampoco decepciona.</p>

<h2>Soporte lateral y estabilidad</h2>
<p>Aquí conviene ajustar expectativas: la Tatum 4 es low-top y RunRepeat la descarta como opción para soporte de tobillo, porque apenas lleva elementos estabilizadores más allá de la plataforma baja y la copa de TPU. Con tobillos sanos cumple; si vienes de esguinces, mira antes una mid o una high.</p>
<p>Con tobillos sanos, la Tatum 4 ofrece un soporte lateral correcto sin llegar al extremo restrictivo de los LeBron 22 más altos. Score: <strong>{{nota:jordan-tatum-4:soporte_lateral}}</strong>.</p>

<h2>Ajuste y horma</h2>
<p>La Tatum 4 tiene horma <strong>media</strong>, ligeramente más estrecha que la LeBron 22 pero más generosa que la GT Cut 4 o la Kyrie. Para la mayoría de pies normales, encaja perfectamente en talla habitual. Los que tienen pie ancho pueden necesitar media talla más — en talla habitual el antepié puede quedar justo.</p>
<p>El upper construido en materiales sintéticos de alta densidad es sólido pero transpira menos que el upper de la AE 2. Para sesiones largas o pabellones calurosos, la ventilación es un punto débil.</p>

<h2>Peso: uno de sus puntos fuertes</h2>
<p>La Tatum 4 pesa 12,4 oz (unos <strong>351 g</strong>) según el laboratorio de RunRepeat: más de una onza por debajo de la media de su categoría y la Jordan de baloncesto más ligera hasta la fecha. Pesa bastante menos que la AE 2 (428 g) o la GT Cut 4 (431 g) y prácticamente lo mismo que la Curry 13 (352 g). Para una zapatilla de alero con este nivel de cushion y soporte, es una ventaja clara.</p>

<h2>¿Para quién es la Jordan Tatum 4?</h2>
<p>La Tatum 4 es perfecta para:</p>
<ul>
  <li><strong>Aleros (posición 3):</strong> el usuario principal. Equilibrio ideal entre cushion, soporte y versatilidad para un juego de todo el campo.</li>
  <li><strong>Ala-pívots (posición 4):</strong> suficiente cushion y soporte para las posiciones interiores sin el peso extremo de un zapato de pívot.</li>
  <li><strong>Escoltas versátiles (posición 2):</strong> si juegas una gran parte del tiempo en posiciones mixtas y no eres un guard puro explosivo, la Tatum 4 es excelente.</li>
</ul>
<p>No es ideal para:</p>
<ul>
  <li>Bases explosivos que buscan el máximo primer paso — usa la GT Cut 4 o la Curry 13</li>
  <li>Pívots puros de 100 kg+ — la LeBron 22 o la LeBron 23 tienen más cushion</li>
  <li>Jugadores outdoor — su suela no está optimizada para asfalto</li>
</ul>

<h2>Comparativa rápida</h2>
<table style="border-collapse:collapse;width:100%;font-size:13px;margin:16px 0">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left;color:var(--cz-text)">Atributo</th>
      <th style="padding:8px;text-align:center;color: var(--cz-accent-text)">Tatum 4</th>
      <th style="padding:8px;text-align:center;color:#e4e4e7">AE 2</th>
      <th style="padding:8px;text-align:center;color:#e4e4e7">Curry 13</th>
      <th style="padding:8px;text-align:center;color:#e4e4e7">GT Cut 4</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px;color:var(--cz-fg3)">Cushion</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:jordan-tatum-4:amortiguacion}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:adidas-ae-2:amortiguacion}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:ua-curry-13:amortiguacion}}</td>
      <td style="padding:8px;text-align:center;color:#fb923c">{{nota:nike-gt-cut-4:amortiguacion}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px;color:var(--cz-fg3)">Soporte lateral</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:jordan-tatum-4:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:adidas-ae-2:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:ua-curry-13:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:nike-gt-cut-4:soporte_lateral}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px;color:var(--cz-fg3)">Tracción</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:jordan-tatum-4:traccion}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:adidas-ae-2:traccion}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-amber-text)">{{nota:ua-curry-13:traccion}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{nota:nike-gt-cut-4:traccion}}</td>
    </tr>
    <tr>
      <td style="padding:8px;color:var(--cz-fg3)">Peso</td>
      <td style="padding:8px;text-align:center;color:#fb923c">{{peso:jordan-tatum-4}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{peso:adidas-ae-2}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{peso:ua-curry-13}}</td>
      <td style="padding:8px;text-align:center;color:var(--cz-green)">{{peso:nike-gt-cut-4}}</td>
    </tr>
  </tbody>
</table>

<h2>¿Dónde comprar?</h2>
<p>Consulta las tiendas y el precio actualizado en <a href="/zapatilla/jordan-tatum-4">su ficha</a>. Si vas a probar la horma por primera vez, elige una tienda con devolución en 30 días. Algunas colorways limitadas (los "PE" o ediciones especiales de Boston Celtics) tienen distribución selectiva.</p>

<p class="art-outro">La Jordan Tatum 4 es nuestra recomendación número uno para aleros y jugadores versátiles que no quieren comprometerse entre cushion, soporte y respuesta. Si quieres ver si encaja exactamente con tu perfil, <a href="/quiz">el quiz te da las 5 más compatibles en menos de un minuto</a>.</p>
    `,
  },
  // ── 20. Nike LeBron 22 análisis ──────────────────────────────────────
  {
    slug: "nike-lebron-22-analisis-2025",
    title: "Nike LeBron 22 análisis: el tope de cushion de 2025",
    metaTitle: "Nike LeBron 22 análisis 2025: cushion, tracción, peso | CANCHA.ZAPA",
    description:
      "Análisis técnico completo de las Nike LeBron 22 (LeBron James): Air Zoom + Cushlon, 442 g, low-top. ¿Es la mejor zapatilla para pívots y jugadores pesados de 2025?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis técnico · Nike LeBron 22",
    heroTitle: "Nike LeBron 22",
    heroSubtitle: "El Rolls Royce del cushion — análisis honesto 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-lebron-22", "jordan-tatum-4", "nb-fresh-foam-bb-v3", "ua-curry-13", "adidas-ae-2"],
    relatedSeoPages: ["zapatillas-cushion", "zapatillas-baloncesto-para-rodillas", "mejor-zapatilla-pivot"],
    body: `
<p class="art-intro">LeBron James es el jugador más dominante de la historia por volumen y longevidad. Con 39 años, sigue jugando al máximo nivel — y su zapatilla refleja esa filosofía: más protección, más soporte, más cushion. La LeBron 22 no es para todos. Es para jugadores pesados, pívots, y cualquiera que priorice la protección sobre la ligereza.</p>

<h2>La filosofía LeBron: fuerza por encima de velocidad</h2>
<p>La línea LeBron siempre ha priorizado el cushion y la estabilidad sobre la ligereza y el court feel. LeBron (2.06m, 113kg) necesita una zapatilla que absorba los impactos de décadas de juego profesional. El resultado es una zapatilla que pesa 442 g, apenas por encima de la GT Cut 4 (431 g) o la AE 2 (428 g). Pero ese peso no es un defecto; es la consecuencia de un sistema de cushion genuinamente premium.</p>

<h2>Tecnología: Air Zoom + Cushlon 3.0</h2>
<p>La LeBron 22 combina:</p>
<ul>
  <li><strong>Unidades Zoom Air apiladas:</strong> bajo el pie, con respuesta rápida en el despegue desde el antepié.</li>
  <li><strong>Cushlon 3.0 en el talón:</strong> espuma de alta densidad que absorbe los impactos de aterrizajes. Para un jugador de más de 90kg que aterriza desde el aro decenas de veces por partido, este talón hace una diferencia real a largo plazo.</li>
</ul>
<p>El resultado es la nota de amortiguación más alta de nuestra ficha, empatada con la LeBron 23 y la KD 19. Si tienes rodillas sensibles o pesas más de 90kg, ninguna otra zapatilla te protegerá mejor.</p>

<h2>El gran trade-off: respuesta y peso</h2>
<p>Toda esa protección tiene un coste. La LeBron 22 tiene una respuesta de {{nota:nike-lebron-22:respuesta}} en nuestra ficha, pero toda esa protección se paga en peso ({{peso:nike-lebron-22}}) y en court feel: es una zapatilla que absorbe el impacto más que lo devuelve. Si eres un guard que vive de los primeros pasos y las carreras de transición, la LeBron 22 no es tu zapatilla. Pero si eres un ala-pívot o pívot que prioriza la protección en la pintura, ese court feel "apagado" es completamente aceptable.</p>
<p>El peso de 442 g es notable. En 40 minutos de partido, la diferencia de unos 90 g respecto a zapatillas ligeras como la Tatum 4 (351 g) o la Curry 13 (352 g) se acumula. Para guards: descartada. Para pívots y jugadores de más de 95 kg: justificada.</p>

<h2>Tracción y soporte: excelente</h2>
<p>La tracción es excelente ({{nota:nike-lebron-22:traccion}}) con un patrón multidireccional que funciona bien en pabellones limpios. En suelo con polvo hay que limpiar la suela como en cualquier zapatilla indoor, pero es más que suficiente para el 90% de pabellones españoles.</p>
<p>El soporte lateral es excepcional ({{nota:nike-lebron-22:soporte_lateral}}): la base ancha y el collar con espuma densa sujetan bien el pie en los contactos bajo el aro. Pero ojo con un dato que se repite mal por ahí: <strong>la LeBron 22 es low-top</strong> (así la clasifican TheHoopsGeek y RunRepeat). Estabilidad lateral no es lo mismo que sujeción de tobillo: si tienes historial de esguinces graves, busca una mid.</p>

<h2>¿Para quién es la LeBron 22?</h2>
<ul>
  <li><strong>Pívots (posición 5):</strong> el usuario ideal. El cushion y el soporte compensan el peso extra.</li>
  <li><strong>Ala-pívots pesados (85-100+ kg):</strong> si pesas más de 90kg y no eres un guard puro explosivo, la LeBron 22 te protege mejor que cualquier alternativa del mercado.</li>
  <li><strong>Jugadores con rodillas sensibles:</strong> el stack de cushion más alto del mercado reducirá el estrés en tus articulaciones.</li>
</ul>
<p>No recomendada para:</p>
<ul>
  <li>Jugadores con historial de esguinces de tobillo (es low-top)</li>
  <li>Guards y escoltas que necesitan velocidad máxima</li>
  <li>Jugadores outdoor (la suela se desgasta rápido en asfalto)</li>
  <li>Jugadores ligeros (sub-75kg) — el cushion es excesivo para ese perfil</li>
</ul>

<h2>Precio: ¿vale la pena?</h2>
<p>La LeBron 22 cotiza a <strong>200€ MSRP</strong>, el precio más alto de nuestra comparativa. Para un jugador que va a usar la zapatilla 3-4 veces por semana durante una temporada completa, 200€ dividido entre 40 semanas son 5€ por semana de la mejor protección del mercado. Así analizado, el precio se justifica. Consulta las tiendas y el precio actualizado en <a href="/zapatilla/nike-lebron-22">su ficha</a>.</p>
<p>Si el presupuesto es limitado, la Nike LeBron Witness 9 (desde {{precio:nike-lebron-witness-9}}) es la versión accesible de la filosofía LeBron: menos cushion, menos soporte, pero la misma orientación hacia la protección. Para los que pueden permitirse el gasto, la LeBron 22 es la referencia absoluta en cushion 2025.</p>

<p class="art-outro">La LeBron 22 es la mejor zapatilla de 2025 para jugadores que priorizan cushion y soporte por encima de todo. Si no estás seguro de si tu perfil encaja, <a href="/quiz">el quiz de CANCHA.ZAPA te da las 5 más compatibles en 60 segundos</a>.</p>
    `,
  },

  // ── 21. Guía aleros ─────────────────────────────────────────────────
  {
    slug: "mejores-zapatillas-aleros-2025",
    title: "Mejores zapatillas de baloncesto para aleros en 2025-2026",
    metaTitle: "Mejores zapatillas para aleros 2025-2026 | CANCHA.ZAPA",
    description:
      "Guía de las mejores zapatillas para aleros en 2025: Jordan Tatum 4, Harden Vol 9, KD 17 y más. Qué buscar en equilibrio, soporte y versatilidad.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía por posición · Aleros 2025",
    heroTitle: "Mejores zapas para aleros",
    heroSubtitle: "2025-2026 · Equilibrio, soporte y versatilidad",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["jordan-tatum-4", "adidas-harden-vol-9", "nike-kd-17", "ua-flow-breakthru-4", "jordan-luka-4"],
    relatedSeoPages: ["mejor-zapatilla-alero", "zapatillas-equilibradas", "zapatillas-baloncesto-130-euros"],
    body: `
<p class="art-intro">El alero es la posición más exigente para una zapatilla porque no tiene perfil único. Un día defiendes al base más rápido del equipo rival; al siguiente, estás en la zona pugnando por rebotes con el pívot. Necesitas una zapatilla que no te falle en ninguno de esos escenarios — y eso significa equilibrio real, no marketinig.</p>

<h2>Qué necesita un alero de su zapatilla</h2>

<p>A diferencia de bases (priorizan reactividad) y pívots (priorizan cushion), el alero necesita el balance correcto:</p>
<ul>
  <li><strong>Score medio ≥ 7 en todos los ejes:</strong> ningún atributo por debajo de 6 — eso significa que falla en algún escenario.</li>
  <li><strong>Cushion 7-8:</strong> defiendes jugadas aéreas y recibes contacto. Suficiente protección sin el peso de las zapas de pívot.</li>
  <li><strong>Soporte lateral 7+:</strong> los cortes y cambios de defensa a ataque son los momentos de mayor riesgo.</li>
  <li><strong>Mid-top casi siempre:</strong> el alero necesita protección lateral que la low-top no da, pero no la rigidez extrema de la high-top.</li>
  <li><strong>Tracción 7+:</strong> juegas en todas las condiciones, interior y ocasionalmente exterior.</li>
</ul>

<h2>Los 5 mejores modelos para alero en 2025</h2>

<h3><a href="/zapatilla/jordan-tatum-4">Jordan Tatum 4 — desde {{precio:jordan-tatum-4}}</a></h3>
<p><strong>El mejor equilibrio del mercado.</strong> Jayson Tatum es el prototipo del alero moderno: defiende del 1 al 5, mete cortes, tira de tres y postea. La Tatum 4 está diseñada para eso: score 7+ en casi todos los ejes (la durabilidad outdoor es {{nota:jordan-tatum-4:durabilidad_outdoor}}) con cushion Zoom Air + Cushlon 3.0 para los aterrizajes.</p>
<ul>
  <li>✅ Cushion 8 + respuesta 8: el mejor equilibrio technico del grupo</li>
  <li>✅ Ligera: 12,4 oz según RunRepeat, de las más ligeras del grupo</li>
  <li>✅ Horma normal: encaja con la mayoría de pies</li>
  <li>❌ Low-top con poco soporte de tobillo y suela fina que se desgasta rápido en exterior (RunRepeat, HoopsGeek)</li>
</ul>

<h3><a href="/zapatilla/adidas-harden-vol-9">Adidas Harden Vol 9 — desde {{precio:adidas-harden-vol-9}}</a></h3>
<p><strong>Para aleros con perfil físico que postean.</strong> James Harden es técnicamente un escolta/alero con juego de pívot — la Vol 9 refleja eso. La combinación Boost + Lightstrike da cushion generoso. La opción si juegas media cancha más que medio campo.</p>
<ul>
  <li>✅ Boost + Lightstrike: cushion alto con bounce reactivo</li>
  <li>✅ Base ancha: estabilidad sólida en contactos laterales</li>
  <li>✅ Rendimiento similar al de la Tatum 4</li>
  <li>❌ Respuesta algo por debajo: para cortes explosivos, la Tatum gana</li>
</ul>

<h3><a href="/zapatilla/nike-kd-17">Nike KD 17 — desde {{precio:nike-kd-17}}</a></h3>
<p><strong>Para aleros que salen mucho al perímetro.</strong> Kevin Durant es el alero/pívot que más tira de tres del mercado. La KD 17 combina Zoom Air en el antepié y un Strobel con Air en el talón, con un shank en el antepié.</p>
<ul>
  <li>✅ Zoom Air en el antepié y Strobel con Air en el talón: cushion protector</li>
  <li>✅ Upper de malla con refuerzos de plástico</li>
  <li>✅ Score equilibrado — ningún punto débil destacado</li>
  <li>❌ Va algo larga y con volumen extra en el antepié: puede quedar holgada si tu pie es estrecho</li>
</ul>

<h3><a href="/zapatilla/ua-flow-breakthru-4">Under Armour Flow Breakthru 4 — desde {{precio:ua-flow-breakthru-4}}</a></h3>
<p><strong>Para aleros dinámicos que priorizan la sensación de suelo.</strong> UA Flow sin capa de goma da un court feel diferente — más en contacto con el suelo, más reactivo. Para aleros que juegan más el uno contra uno y los cortes que el juego de poste.</p>
<ul>
  <li>✅ UA Flow: court feel excepcional para un alero</li>
  <li>✅ Ligera para su cushion — ventaja en las ayudas defensivas</li>
  <li>❌ No usar en exterior — sin goma, la suela se destruye en asfalto</li>
  <li>❌ Molde femenino de talón estrecho: pruébala antes si tienes el pie ancho</li>
</ul>

<h3><a href="/zapatilla/jordan-luka-4">Jordan Luka 4 — desde {{precio:jordan-luka-4}}</a></h3>
<p><strong>Para aleros grandes o ala-pívots con juego de poste.</strong> Luka Doncic es técnicamente un base/alero, pero su zapatilla está diseñada para jugadores potentes: cushion alto, base ancha y soporte lateral extra.</p>
<ul>
  <li>✅ Cushion Zoom Air para aterrizajes de jugadores >90kg</li>
  <li>✅ Base ancha — la más estable del grupo</li>
  <li>✅ Horma normal — sirve para la mayoría de pies</li>
  <li>❌ No es la más reactiva — para aleros dinámicos, la Tatum 4 o la KD son mejores</li>
</ul>

<h2>Comparativa rápida</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Modelo</th>
      <th style="padding:8px;text-align:center">Cushion</th>
      <th style="padding:8px;text-align:center">Respuesta</th>
      <th style="padding:8px;text-align:center">Soporte</th>
      <th style="padding:8px;text-align:center">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Jordan Tatum 4</strong></td>
      <td style="padding:8px;text-align:center">{{nota:jordan-tatum-4:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:jordan-tatum-4:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{nota:jordan-tatum-4:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center">{{precio:jordan-tatum-4}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Adidas Harden Vol 9</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-harden-vol-9:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-harden-vol-9:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-harden-vol-9:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center">{{precio:adidas-harden-vol-9}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Nike KD 17</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:nike-kd-17:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-kd-17:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:nike-kd-17:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center">{{precio:nike-kd-17}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>UA Flow Breakthru 4</strong></td>
      <td style="padding:8px;text-align:center">{{nota:ua-flow-breakthru-4:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:ua-flow-breakthru-4:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{nota:ua-flow-breakthru-4:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center">{{precio:ua-flow-breakthru-4}}</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>Jordan Luka 4</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:jordan-luka-4:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:jordan-luka-4:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:jordan-luka-4:soporte_lateral}}</td>
      <td style="padding:8px;text-align:center">{{precio:jordan-luka-4}}</td>
    </tr>
  </tbody>
</table>
</div>

<h2>¿Cuál elegir?</h2>
<ul>
  <li><strong>Si juegas un juego equilibrado (cortes, tiros, contacto):</strong> Jordan Tatum 4. El mejor equilibrio del mercado para el alero completo.</li>
  <li><strong>Si juegas con potencia y posteas:</strong> Adidas Harden Vol 9. Cushion alto a precio razonable.</li>
  <li><strong>Si eres alero-tirador y pesas >85kg:</strong> Nike KD 17. El Zoom Air del antepié da el bounce que necesitas en aterrizajes de tiro.</li>
  <li><strong>Si priorizas el court feel y juegas solo en interior:</strong> UA Flow Breakthru 4. La más reactiva del grupo.</li>
  <li><strong>Si eres alero grande o ala-pívot:</strong> Jordan Luka 4. La base más estable del grupo para jugadores físicos.</li>
</ul>

<p class="art-outro">¿No estás seguro de cuál encaja con tu juego? El <a href="/quiz">quiz de CANCHA.ZAPA</a> filtra por posición, peso, tipo de cancha y presupuesto para darte las 5 más compatibles con tu perfil en menos de un minuto.</p>
    `,
  },

  // ── 22. Análisis Nike Ja 3 ──────────────────────────────────────────
  {
    slug: "nike-ja-3-analisis-2025",
    title: "Nike Ja 3: análisis completo — la mejor zapatilla de Ja Morant vale lo que cuesta",
    metaTitle: "Nike Ja 3 análisis completo 2025 | CANCHA.ZAPA",
    description:
      "Análisis técnico completo de la Nike Ja 3: ZoomX full-length, suela outdoor, horma ajustada. ¿Es la mejor zapatilla para guards de 2025?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis en profundidad · Guards 2025",
    heroTitle: "Nike Ja 3",
    heroSubtitle: "¿La mejor zapatilla de guard de 2025?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-ja-3", "nike-ja-2", "adidas-ae-2", "ua-curry-13", "nike-gt-cut-4"],
    relatedSeoPages: ["mejor-zapatilla-base", "mejor-zapatilla-escolta", "mejores-zapatillas-nike"],
    body: `
<p class="art-intro">Ja Morant tiene el primer paso más explosivo de la NBA en 2025. Y por primera vez desde la Kobe 8 Protro, hay una zapatilla de guard que realmente está diseñada para ese tipo de atletismo: ligera, reactiva, con la espuma más avanzada de Nike y una suela de goma completa que también vale para el exterior.</p>

<h2>La tecnología que la define</h2>

<h3>ZoomX foam full-length</h3>
<p>La Ja 3 lleva una entresuela de ZoomX enjaulada — la espuma de los Vaporfly de running que devuelve el 85% de la energía de cada pisada. En una zapatilla de guard, el resultado es un bounce notablemente superior a cualquier Zoom Air clásico.</p>

<h3>Suela de goma completa (diferencia con la Curry 13)</h3>
<p>A diferencia de la Under Armour Curry 13 (que usa UA Flow sin capa de goma), la Ja 3 sí tiene suela de goma completa. Eso significa dos cosas: tracción más consistente y durabilidad outdoor real. Puedes llevar la Ja 3 al asfalto de vez en cuando sin destruirla — algo que la Curry 13 no puede decir.</p>

<h3>Horma ajustada: como casi todo en Nike</h3>
<p>Nike tradicionalmente fabrica sus zapatillas de baloncesto con horma estrecha o normal-estrecha, y la Ja 3 sigue esa línea: los análisis la describen como estrecha y ajustada, con un rodaje inicial, y avisan de que con pie ancho conviene subir media talla. Eso sí, es algo menos ceñida que la Ja 1 y la Ja 2.</p>

<h2>Puntuación técnica CANCHA.ZAPA</h2>
<ul>
  <li>Tracción: <strong>{{nota:nike-ja-3:traccion}}</strong> — sólida en parquet limpio, aguanta algo de polvo</li>
  <li>Amortiguación: <strong>{{nota:nike-ja-3:amortiguacion}}</strong> — el ZoomX da cushion excepcional para low-top</li>
  <li>Respuesta: <strong>{{nota:nike-ja-3:respuesta}}</strong> — bounce reactivo, primer paso rápido</li>
  <li>Soporte lateral: <strong>{{nota:nike-ja-3:soporte_lateral}}</strong> — aceptable para guard, no es su punto fuerte</li>
  <li>Estabilidad: <strong>{{nota:nike-ja-3:estabilidad}}</strong> — el ZoomX es algo blando bajo carga extrema</li>
  <li>Ligereza: <strong>{{nota:nike-ja-3:peso_score}}</strong> — {{peso:nike-ja-3}}, peso medio para una zapatilla con tanto cushion</li>
  <li>Durabilidad outdoor: <strong>{{nota:nike-ja-3:durabilidad_outdoor}}</strong> — goma completa, aguanta asfalto moderado</li>
  <li>Ventilación: <strong>{{nota:nike-ja-3:ventilacion}}</strong></li>
</ul>

<h2>¿Cómo se compara con sus rivales?</h2>

<h3>vs Adidas AE 2 (desde {{precio:adidas-ae-2}})</h3>
<p>La AE 2 y la Ja 3 empatan en tracción ({{nota:adidas-ae-2:traccion}} frente a {{nota:nike-ja-3:traccion}}). En cushion la ficha da {{nota:adidas-ae-2:amortiguacion}} a la AE 2 y {{nota:nike-ja-3:amortiguacion}} a la Ja 3 (Light BOOST frente a ZoomX). Si priorizas el cushion: AE 2.</p>

<h3>vs Under Armour Curry 13 (desde {{precio:ua-curry-13}})</h3>
<p>La Curry 13 tiene mejor court feel (UA Flow directo al suelo). La Ja 3 tiene mejor durabilidad outdoor y la Curry 13 una puntera más amplia. Si juegas siempre en interior limpio o tienes pie ancho: Curry 13. Si juegas ocasionalmente fuera: Ja 3.</p>

<h3>vs Nike GT Cut 4 (desde {{precio:nike-gt-cut-4}})</h3>
<p>La Ja 3 es más reactiva ({{nota:nike-ja-3:respuesta}} frente a {{nota:nike-gt-cut-4:respuesta}} en respuesta) y además pesa bastante menos ({{peso:nike-ja-3}} frente a {{peso:nike-gt-cut-4}}). También puntúa más en amortiguación ({{nota:nike-ja-3:amortiguacion}} frente a {{nota:nike-gt-cut-4:amortiguacion}}). En nuestra ficha la Ja 3 gana a la GT Cut 4 en casi todo.</p>

<h2>¿Para quién es la Ja 3?</h2>
<p>Es el mejor match para:</p>
<ul>
  <li>Bases y escoltas de <strong>70-90kg</strong></li>
  <li>Jugadores que quieren una Nike con <strong>ZoomX</strong> completo y suela de goma completa</li>
  <li>Quien juega tanto en <strong>interior como exterior</strong> y quiere una sola zapatilla</li>
  <li>Quien prioriza <strong>cushion reactivo</strong> sobre court feel extremo</li>
</ul>

<p><strong>No es para ti si:</strong> tienes pie ancho, o si buscas el court feel ultra-bajo de la Curry 13 o la GT Cut 4.</p>

<h2>Disponibilidad y precio</h2>
<p>El precio de salida fue 135€, el más competitivo del grupo. Para una zapatilla con ZoomX full-length, 135€ es una propuesta seria. Consulta las tiendas y el precio actualizado en <a href="/zapatilla/nike-ja-3">su ficha</a>.</p>

<p class="art-outro">¿No sabes si la Ja 3 encaja con tu perfil? <a href="/quiz">El quiz de CANCHA.ZAPA</a> filtra por posición, peso, tipo de pie y tipo de juego para darte las 5 más compatibles en menos de un minuto.</p>
    `,
  },

  // ── 23. Guía rodillas ────────────────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-rodillas-guia-2025",
    title: "Zapatillas de baloncesto para problemas de rodilla: guía completa 2025",
    metaTitle: "Zapatillas baloncesto rodillas 2025: guía completa | CANCHA.ZAPA",
    description:
      "Guía para elegir zapatillas de baloncesto si tienes problemas de rodilla. Qué cushion necesitas, qué evitar, y el top 5 de modelos para 2025.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía · Lesiones rodilla 2025",
    heroTitle: "Rodilla y baloncesto",
    heroSubtitle: "Qué zapatilla protege tus rodillas de verdad",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-lebron-23", "jordan-40", "nike-kd-19", "jordan-tatum-4", "ua-flow-breakthru-4"],
    relatedSeoPages: ["zapatillas-baloncesto-para-rodillas", "zapatillas-cushion", "mejor-zapatilla-pivot"],
    body: `
<p class="art-intro">El dolor de rodilla es la segunda queja más frecuente en jugadores de baloncesto amateur después de los esguinces de tobillo. Y a diferencia del tobillo, donde la caña alta ayuda directamente, la protección de rodilla viene principalmente de una variable: el cushion. La zapatilla correcta no cura nada — pero puede reducir significativamente el impacto acumulado partido a partido.</p>

<h2>Por qué el cushion importa para las rodillas</h2>
<p>En baloncesto, cada aterrizaje de un salto genera un impacto entre 3 y 8 veces el peso corporal sobre las rodillas. En 40 minutos de partido, eso son centenares de impactos. La entresuela de la zapatilla actúa como primer amortiguador antes de que ese impacto llegue a la articulación.</p>
<p>Las variables que más importan:</p>
<ul>
  <li><strong>Amortiguación ≥ 8:</strong> el filtro mínimo si tienes antecedentes de rodilla.</li>
  <li><strong>Espuma que no colapsa:</strong> una espuma demasiado blanda bajo tu peso no amortigua — se aplana. El cushion tiene que mantenerse partido tras partido.</li>
  <li><strong>Estabilidad lateral:</strong> un aterrizaje desestabilizado pone más carga sobre el menisco. Estabilidad 7+ es necesaria.</li>
  <li><strong>Peso razonable:</strong> una zapatilla pesada fuerza más los ligamentos en la deceleración. Sub-420g idealmente.</li>
</ul>

<h2>Lo que no funciona</h2>
<ul>
  <li><strong>Zapas ultra-reactivas sin cushion (GT Cut 4, Curry 13):</strong> excelentes para rendimiento, pero la espuma muy firme transmite más impacto a la rodilla. Para jugadores con problemas, no son la opción.</li>
  <li><strong>Espumas baratas que se aplanan:</strong> las zapatillas sub-60€ tienen espumas que pierden amortiguación después de 20-30 partidos. Dos meses después, no amortiguan nada.</li>
  <li><strong>Talla grande "para que no apriete":</strong> el pie se mueve dentro, los aterrizajes son inestables, y eso perjudica más a la rodilla.</li>
</ul>

<h2>Top 5 zapatillas para rodilla en 2025</h2>

<h3><a href="/zapatilla/jordan-40">Air Jordan 40 — desde {{precio:jordan-40}} — Una de las mejores cushion del mercado</a></h3>
<p>ZoomX + Zoom Strobel full-length: la combinación de espumas más avanzada disponible en 2025. El ZoomX devuelve el 85% de la energía con bounce real, mientras el Strobel añade firmeza para que la espuma no colapse. Para pívots y ala-pívots con problemas de rodilla, es el techo tecnológico del mercado.</p>
<ul>
  <li>✅ Amortiguación {{nota:jordan-40:amortiguacion}} — la combinación de espumas más avanzada disponible</li>
  <li>✅ 6 correas internas: estabilidad extra en aterrizajes</li>
  <li>❌ {{precio:jordan-40}} y 439 g — de las más caras del grupo y de las más pesadas</li>
</ul>

<h3><a href="/zapatilla/nike-lebron-23">Nike LeBron 23 — desde {{precio:nike-lebron-23}} — ZoomX + Cushlon para jugadores pesados</a></h3>
<p>ZoomX de longitud completa con Cushlon y placa de carbono: una amortiguación blanda pero protectora, pensada para jugadores de 90-110kg. LeBron James ha tenido problemas de rodilla durante su carrera, y la LeBron line refleja ese diseño.</p>
<ul>
  <li>✅ ZoomX + Cushlon: blando y protector bajo cargas pesadas</li>
  <li>✅ Placa de carbono: aporta rigidez bajo el pie</li>
  <li>✅ Horma amable con el pie ancho (el talón va algo estrecho)</li>
</ul>

<h3><a href="/zapatilla/nike-kd-19">Nike KD 19 — desde {{precio:nike-kd-19}} — El equilibrio precio/cushion</a></h3>
<p>Zoom Strobel + Cushlon 3.0 a un precio por debajo de la LeBron 23 o la Jordan 40. Kevin Durant jugó con rodilla operada durante años — el KD 19 tiene cushion pensado para eso. Para ala-pívots que necesitan protección seria sin el precio top.</p>
<ul>
  <li>✅ Cushion {{nota:nike-kd-19:amortiguacion}} a precio razonable</li>
  <li>✅ Bounce reactivo (Strobel) además de amortiguación</li>
  <li>❌ No llega a la amortiguación de la LeBron para jugadores >100kg</li>
</ul>

<h3><a href="/zapatilla/jordan-tatum-4">Jordan Tatum 4 — desde {{precio:jordan-tatum-4}} — El mejor para aleros con rodilla</a></h3>
<p>Zoom Air de gran volumen en el antepié sobre Cushlon 3.0 de longitud completa. Para aleros de 80-95kg con problemas de rodilla, es la mejor opción de la gama media.</p>
<ul>
  <li>✅ Cushlon 3.0: espuma blanda de longitud completa</li>
  <li>✅ Cushion {{nota:jordan-tatum-4:amortiguacion}} con soporte lateral {{nota:jordan-tatum-4:soporte_lateral}}</li>
  <li>❌ No está orientada a jugadores >100kg — ahí la LeBron gana</li>
</ul>

<h3><a href="/zapatilla/ua-flow-breakthru-4">Under Armour Flow Breakthru 4 — desde {{precio:ua-flow-breakthru-4}} — Para aleros que priorizan suavidad</a></h3>
<p>UA Flow ofrece un cushion suave y reactivo. No llega al nivel de la Jordan 40 o la LeBron, pero para jugadores de 70-85kg con molestias ligeras de rodilla es suficiente — y de las más económicas del grupo.</p>
<ul>
  <li>✅ De las más accesibles del grupo, con cushion {{nota:ua-flow-breakthru-4:amortiguacion}}</li>
  <li>✅ Suave sin ser imprecisa</li>
  <li>❌ Para jugadores >90kg o con problemas serios de rodilla, el cushion no es suficiente</li>
</ul>

<h2>Regla de oro</h2>
<p>Si tienes diagnóstico médico de condromalacia rotuliana, tendinitis rotuliana o problemas de menisco, consulta a tu médico o fisioterapeuta antes de decidir qué zapatilla usar. La zapatilla es un complemento, no un tratamiento.</p>
<p>Pero como regla práctica: <strong>si pesas <85kg → Jordan Tatum 4 o KD 19; si pesas 85-100kg → LeBron 23; si pesas >100kg → Jordan 40 o LeBron 23.</strong></p>

<p class="art-outro">El <a href="/quiz">quiz de CANCHA.ZAPA</a> pregunta directamente por lesiones de rodilla y filtra automáticamente los modelos según tu peso, posición y presupuesto. Si marcas "rodillas" en la sección de lesiones, los modelos con cushion bajo quedan fuera de tus resultados.</p>
    `,
  },

  // ── 24. Comparativa New Balance vs ANTA ─────────────────────────────
  {
    slug: "new-balance-vs-anta-baloncesto-2025",
    title: "New Balance vs ANTA: ¿cuál es mejor para baloncesto en 2025?",
    metaTitle: "New Balance vs ANTA baloncesto 2025: comparativa completa | CANCHA.ZAPA",
    description:
      "Comparativa entre New Balance y ANTA en baloncesto: qué marca da más por menos dinero en 2025. Rendimiento, horma, durabilidad y precio analizados.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Comparativas",
    readMinutes: 5,
    eyebrow: "★ Comparativa · Marcas presupuesto 2025",
    heroTitle: "New Balance vs ANTA",
    heroSubtitle: "¿Cuál da más por tu dinero?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nb-two-wxy-v5", "nb-two-wxy-v4", "nb-kawhi-4", "anta-kai-2", "anta-kt-11"],
    relatedSeoPages: ["mejores-zapatillas-new-balance", "mejores-zapatillas-anta", "zapatillas-baloncesto-baratas"],
    body: `
<p class="art-intro">Si tu presupuesto es ajustado o simplemente no quieres pagar el sobreprecio de Nike y Jordan, tienes dos marcas que en 2025 ofrecen rendimiento serio a precio razonable: New Balance y ANTA. Son perfiles muy distintos — y la mejor para ti depende de qué tipo de juego tienes.</p>

<h2>Filosofías de diseño completamente distintas</h2>
<p>Antes de comparar modelos concretos, hay que entender que New Balance y ANTA tienen enfoques diferentes:</p>
<ul>
  <li><strong>New Balance:</strong> espumas propias (Fresh Foam, FuelCell) heredadas del running. Más orientada a jugadores que priorizan comodidad y amortiguación. Influenciada por sus atletas signature (Kawhi Leonard, Darius Garland).</li>
  <li><strong>ANTA:</strong> espumas propias (Nitro Edge en la Kai 2, espuma de nitrógeno en la KT 11) y court feel directo. Marcas de calzado chino con contratos de Kyrie Irving y Klay Thompson. Mejor relación rendimiento/precio en el mercado.</li>
</ul>

<h2>Duelo por categorías</h2>

<h3>Tracción</h3>
<p>ANTA gana. El patrón multidireccional de la Kai 2 y la KT 11 ofrece agarre consistente en parquet limpio y moderado. New Balance tiene tracción sólida: en nuestra ficha la TWO WXY V5 da {{nota:nb-two-wxy-v5:traccion}} frente al {{nota:anta-kai-2:traccion}} de la Kai 2.</p>

<h3>Cushion</h3>
<p>ANTA gana en nuestra ficha. La Kai 2 tiene {{nota:anta-kai-2:amortiguacion}} y la KT 11 {{nota:anta-kt-11:amortiguacion}}, frente al {{nota:nb-two-wxy-v4:amortiguacion}} de la TWO WXY V4 y la V5. La excepción es la Kawhi 4, con FuelCell, que llega a {{nota:nb-kawhi-4:amortiguacion}}.</p>

<h3>Respuesta y court feel</h3>
<p>Depende del modelo. La Kawhi 4 ({{nota:nb-kawhi-4:respuesta}}) y la Kai 2 ({{nota:anta-kai-2:respuesta}}) están arriba; la TWO WXY V5 se queda en {{nota:nb-two-wxy-v5:respuesta}}.</p>

<h3>Horma</h3>
<p>Empate. New Balance es la referencia en anchos para running (tallas "2E" y "4E"), pero en nuestra ficha sus zapatillas de baloncesto actuales son de horma normal, igual que la Kai 2 y la KT 11. Si tienes pie muy ancho, mira nuestra <a href="/blog/zapatillas-baloncesto-pie-ancho-2025">guía de pie ancho</a>.</p>

<h3>Durabilidad outdoor</h3>
<p>ANTA gana ligeramente: la KT 11 tiene {{exterior:anta-kt-11}} y la Kai 2 {{exterior:anta-kai-2}}, frente al {{exterior:nb-two-wxy-v5}} de la TWO WXY V5. La Kawhi 4 ({{exterior:nb-kawhi-4}}) es solo de pabellón.</p>

<h3>Precio</h3>
<p>Compara: la Kai 2 (desde {{precio:anta-kai-2}}) y la KT 11 (desde {{precio:anta-kt-11}}) frente a la NB TWO WXY V4 (desde {{precio:nb-two-wxy-v4}}) o la Kawhi 4 (desde {{precio:nb-kawhi-4}}).</p>

<h2>Resumen por tipo de jugador</h2>

<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Perfil</th>
      <th style="padding:8px;text-align:center">Mejor opción</th>
      <th style="padding:8px;text-align:center">Modelo</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Guard explosivo</td>
      <td style="padding:8px;text-align:center">⭐ ANTA</td>
      <td style="padding:8px;text-align:center">Kai 2 (desde {{precio:anta-kai-2}})</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Jugador pesado (&gt;90kg) con rodillas</td>
      <td style="padding:8px;text-align:center">⭐ New Balance</td>
      <td style="padding:8px;text-align:center">Kawhi 4 (desde {{precio:nb-kawhi-4}})</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Junior / primeras zapatillas</td>
      <td style="padding:8px;text-align:center">⭐ ANTA</td>
      <td style="padding:8px;text-align:center">KT 11 (desde {{precio:anta-kt-11}})</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px">Alero equilibrado</td>
      <td style="padding:8px;text-align:center">⭐ New Balance</td>
      <td style="padding:8px;text-align:center">TWO WXY V4 (desde {{precio:nb-two-wxy-v4}})</td>
    </tr>
    <tr>
      <td style="padding:8px">Exterior / outdoor frecuente</td>
      <td style="padding:8px;text-align:center">⭐ ANTA</td>
      <td style="padding:8px;text-align:center">KT 11 (mejor suela)</td>
    </tr>
  </tbody>
</table>
</div>

<h2>El veredicto</h2>
<p>Si tuviéramos que elegir una: <strong>ANTA gana en relación calidad-precio</strong>. La Kai 2, desde {{precio:anta-kai-2}}, ofrece un rendimiento que avergüenza a zapatillas más caras de marcas mainstream. La tracción, la amortiguación y la respuesta están al nivel de modelos premium.</p>

<p>Si pesas más de 90kg y juegas en pabellón, la <strong>Kawhi 4</strong> es la New Balance a mirar: iguala a la Kai 2 en amortiguación y la supera en respuesta.</p>

<p class="art-outro">¿Todavía tienes dudas sobre qué marca encaja con tu perfil? <a href="/quiz">El quiz de CANCHA.ZAPA</a> no filtra por marca — filtra por tus necesidades reales y te da las 5 más compatibles. A veces el resultado sorprende.</p>
    `,
  },

  // ── 25. Guía bases ──────────────────────────────────────────────────
  {
    slug: "mejores-zapatillas-bases-2025",
    title: "Mejores zapatillas de baloncesto para bases en 2025-2026",
    metaTitle: "Mejores zapatillas para bases baloncesto 2025-2026 | CANCHA.ZAPA",
    description:
      "Guía completa: las mejores zapatillas para bases en 2025. Reactividad, ligereza y tracción. Top 5 con análisis técnico, comparativa y veredicto honesto.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía por posición · Bases 2025",
    heroTitle: "Mejores zapas para bases",
    heroSubtitle: "2025-2026 · Reactividad, ligereza y primer paso",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "ua-curry-13", "adidas-ae-2", "anta-kai-2", "nike-ja-3"],
    relatedSeoPages: ["mejor-zapatilla-base", "zapatillas-reactivas", "zapatillas-baloncesto-baratas"],
    body: `
<p class="art-intro">El base lleva el juego. Cada posesión empieza con el balón en tus manos y los primeros pasos determinan si el equipo abre el campo o se queda bloqueado. La zapatilla de un base tiene una misión clara: darte ventaja en el primer paso, darte agarre cuando frenas, y no pesarte cuando llegas al último cuarto. No hay sitio para concesiones.</p>

<h2>Qué busca un base en su zapatilla</h2>

<p>Tres atributos dominan la selección para un base. Todo lo demás es secundario:</p>
<ul>
  <li><strong>Respuesta 8+:</strong> el primer paso explosivo sale de la espuma que devuelve energía. Espumas blandas que absorben → lentitud. Espumas firmes y reactivas → ventaja.</li>
  <li><strong>Ligereza (sub-380g):</strong> cada 50g extra se traduce en fatiga acumulada en los últimos 10 minutos. Los bases hacen más sprints por partido que cualquier otra posición.</li>
  <li><strong>Tracción 8+:</strong> si no agarras cuando frenas, el primer paso no vale de nada. El patrón de suela es más importante que la marca.</li>
</ul>

<p>Lo que importa menos para un base:</p>
<ul>
  <li>Cushion máximo — sacrifica respuesta. Un cushion 6-7 es suficiente para la mayoría de bases sub-85kg.</li>
  <li>Caña alta — limita la velocidad. Low o mid-top según tu historial de tobillo.</li>
</ul>

<h2>Top 5 zapatillas para bases en 2025</h2>

<h3><a href="/zapatilla/nike-gt-cut-4">Nike GT Cut 4 — desde {{precio:nike-gt-cut-4}}</a></h3>
<p><strong>Court feel excepcional y primer paso rápido en 2025.</strong> Suela de goma dura multidireccional con tracción {{nota:nike-gt-cut-4:traccion}} y court feel absolutamente excepcional. No es ligera ({{peso:nike-gt-cut-4}}). Si tu pie encaja (horma estrecha) y juegas siempre en interior limpio, encaja bien.</p>
<ul>
  <li>❌ Respuesta {{nota:nike-gt-cut-4:respuesta}} — la más baja de las cinco, aunque con court feel excepcional</li>
  <li>✅ Tracción {{nota:nike-gt-cut-4:traccion}} — herringbone</li>
  <li>❌ {{peso:nike-gt-cut-4}} — la más pesada del grupo</li>
  <li>❌ Horma muy estrecha — pie normal o estrecho únicamente</li>
  <li>❌ Solo interior — la suela se destruye en asfalto</li>
</ul>

<h3><a href="/zapatilla/ua-curry-13">Under Armour Curry 13 — desde {{precio:ua-curry-13}}</a></h3>
<p><strong>El mejor court feel del mercado.</strong> UA Flow sin goma en la suela significa que el antepié toca directamente la espuma — el feeling más cercano al suelo que puedes tener en una zapatilla de baloncesto. Para bases que priorizan sentir la cancha, es insuperable. Cushion algo mayor que la GT Cut 4 — mejor para bases de 75-90kg.</p>
<ul>
  <li>✅ Court feel único — el más cercano al suelo del mercado</li>
  <li>✅ Tracción {{nota:ua-curry-13:traccion}} en parquet limpio</li>
  <li>✅ Horma normal — más segura para la mayoría de pies</li>
  <li>❌ Sin goma → no outdoor. Una sesión en asfalto destruye la suela</li>
  <li>❌ Tracción baja en pistas con polvo (sin goma que raspa)</li>
</ul>

<h3><a href="/zapatilla/adidas-ae-2">Adidas AE 2 — desde {{precio:adidas-ae-2}}</a></h3>
<p><strong>El mejor equilibrio precio/rendimiento para bases.</strong> Herringbone {{nota:adidas-ae-2:traccion}} que funciona en parquet limpio y sucio. Light BOOST reactivo pero con algo más de cushion que la GT Cut 4. 428 g, horma normal. Para bases que juegan en diferentes canchas y no quieren pagar el precio premium de la GT Cut 4.</p>
<ul>
  <li>✅ Tracción {{nota:adidas-ae-2:traccion}} — aguanta pistas con polvo</li>
  <li>✅ Respuesta {{nota:adidas-ae-2:respuesta}} — primer paso rápido</li>
  <li>✅ Más económica que la GT Cut 4</li>
  <li>❌ Peso: {{peso:adidas-ae-2}}, de las más pesadas del grupo</li>
</ul>

<h3><a href="/zapatilla/anta-kai-2">ANTA Kai 2 — desde {{precio:anta-kai-2}}</a></h3>
<p><strong>La mejor relación calidad-precio del mercado.</strong> El ajuste es ceñido, tipo guante. Nitro Edge reactivo, tracción competente y suela que aguanta exterior moderado. Para bases que no quieren gastar de más, es la elección clara.</p>
<ul>
  <li>✅ 90% del rendimiento de la AE 2</li>
  <li>✅ Ajuste de guante, sin deslizamiento de talón para la mayoría</li>
  <li>✅ Outdoor moderado — suela de goma más resistente que la Curry 13</li>
  <li>❌ Respuesta algo por debajo de la Curry 13 ({{nota:anta-kai-2:respuesta}} frente a {{nota:ua-curry-13:respuesta}})</li>
</ul>

<h3><a href="/zapatilla/nike-ja-3">Nike Ja 3 — desde {{precio:nike-ja-3}}</a></h3>
<p><strong>La alternativa Nike a la GT Cut 4 para bases.</strong> ZoomX full-length da un bounce excepcional para su precio. Suela de goma que aguanta outdoor moderado.</p>
<ul>
  <li>✅ ZoomX full-length: cushion + bounce excepcional para un guard</li>
  <li>✅ Ajuste ceñido y seguro, con rodaje inicial</li>
  <li>✅ Outdoor moderado — goma completa</li>
  <li>❌ No llega al court feel de la Curry 13 o la GT Cut 4</li>
</ul>

<h2>Comparativa rápida</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Modelo</th>
      <th style="padding:8px;text-align:center">Respuesta</th>
      <th style="padding:8px;text-align:center">Tracción</th>
      <th style="padding:8px;text-align:center">Peso</th>
      <th style="padding:8px;text-align:center">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Nike GT Cut 4</strong></td>
      <td style="padding:8px;text-align:center">{{nota:nike-gt-cut-4:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-gt-cut-4:traccion}}</td>
      <td style="padding:8px;text-align:center">{{peso:nike-gt-cut-4}}</td>
      <td style="padding:8px;text-align:center">{{precio:nike-gt-cut-4}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>UA Curry 13</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:ua-curry-13:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:ua-curry-13:traccion}}</td>
      <td style="padding:8px;text-align:center">{{peso:ua-curry-13}}</td>
      <td style="padding:8px;text-align:center">{{precio:ua-curry-13}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Adidas AE 2</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-ae-2:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-ae-2:traccion}}</td>
      <td style="padding:8px;text-align:center">{{peso:adidas-ae-2}}</td>
      <td style="padding:8px;text-align:center">{{precio:adidas-ae-2}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>ANTA Kai 2</strong></td>
      <td style="padding:8px;text-align:center">{{nota:anta-kai-2:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:anta-kai-2:traccion}}</td>
      <td style="padding:8px;text-align:center">{{peso:anta-kai-2}}</td>
      <td style="padding:8px;text-align:center">{{precio:anta-kai-2}}</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>Nike Ja 3</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:nike-ja-3:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:nike-ja-3:traccion}}</td>
      <td style="padding:8px;text-align:center">{{peso:nike-ja-3}}</td>
      <td style="padding:8px;text-align:center">{{precio:nike-ja-3}}</td>
    </tr>
  </tbody>
</table>
</div>

<h2>¿Cuál elegir?</h2>
<ul>
  <li><strong>Court feel máximo, pie estrecho, interior siempre → <a href="/zapatilla/nike-gt-cut-4">GT Cut 4</a></strong></li>
  <li><strong>Máximo court feel, juegas solo en interior, horma normal → <a href="/zapatilla/ua-curry-13">Curry 13</a></strong></li>
  <li><strong>Mejor equilibrio precio/rendimiento, interior y outdoor → <a href="/zapatilla/adidas-ae-2">AE 2</a></strong></li>
  <li><strong>Presupuesto ajustado → <a href="/zapatilla/anta-kai-2">ANTA Kai 2</a></strong></li>
  <li><strong>Quieres Nike con ZoomX, outdoor ocasional → <a href="/zapatilla/nike-ja-3">Ja 3</a></strong></li>
</ul>

<p class="art-outro">¿Sigues con dudas? El <a href="/quiz">quiz de CANCHA.ZAPA</a> filtra por posición, peso, tipo de pie y tipo de cancha para darte las 5 más compatibles con tu perfil exacto. Menos de un minuto.</p>
    `,
  },

  // ── 26. Guía escoltas ───────────────────────────────────────────────
  {
    slug: "mejores-zapatillas-escoltas-2025",
    title: "Mejores zapatillas de baloncesto para escoltas en 2025-2026",
    metaTitle: "Mejores zapatillas para escoltas baloncesto 2025-2026 | CANCHA.ZAPA",
    description:
      "Las mejores zapatillas para escoltas en 2025: estabilidad lateral, cortes sin balón y tiro. Top 5 con análisis técnico honesto.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía por posición · Escoltas 2025",
    heroTitle: "Mejores zapas para escoltas",
    heroSubtitle: "2025-2026 · Estabilidad, cortes y tiro de confianza",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["adidas-ae-2", "nike-kobe-8-protro", "ua-curry-13", "jordan-tatum-4", "nike-gt-cut-4"],
    relatedSeoPages: ["mejor-zapatilla-escolta", "zapatillas-equilibradas", "zapatillas-baloncesto-130-euros"],
    body: `
<p class="art-intro">El escolta es la posición más infravalorada cuando se trata de elegir zapatilla. Muchos escoltas copian a los bases y van a la más reactiva del mercado — y se dan cuenta en el primer partido que su juego pide más. El escolta corre sin balón (necesita ligereza), frena en seco para tirar (necesita estabilidad lateral), y defiende a jugadores más rápidos (necesita tracción constante). No es lo mismo que jugar de base.</p>

<h2>El perfil del escolta moderno</h2>
<p>El escolta en 2025 tiene dos variantes:</p>
<ul>
  <li><strong>Escolta-tirador (Klay Thompson, Devin Booker):</strong> mucho movimiento sin balón, paradas bruscas para el tiro, necesita estabilidad lateral 8+ para esos cambios de dirección. Puede permitirse algo más de cushion porque sus aterrizajes son frecuentes en el tiro.</li>
  <li><strong>Escolta-creador (Shai Gilgeous-Alexander, Devin Booker):</strong> más parecido a un base, necesita respuesta alta para las penetraciones. Puede funcionar con casi las mismas zapatillas que un base.</li>
</ul>

<h2>Top 5 zapatillas para escoltas en 2025</h2>

<h3><a href="/zapatilla/adidas-ae-2">Adidas AE 2 — desde {{precio:adidas-ae-2}}</a></h3>
<p><strong>La opción más completa del mercado para el perfil escolta-creador.</strong> El herringbone de {{nota:adidas-ae-2:traccion}} da agarre en cualquier condición; el Light BOOST da respuesta suficiente para las penetraciones sin sacrificar el cushion. Horma normal, precio competitivo. Para escoltas que juegan en diferentes canchas y no saben si van a interior o exterior.</p>
<ul>
  <li>✅ Tracción {{nota:adidas-ae-2:traccion}} — el mejor herringbone del mercado para exterior moderado</li>
  <li>✅ Respuesta {{nota:adidas-ae-2:respuesta}} — primer paso competitivo para escolta-creador</li>
  <li>✅ El precio más equilibrado del grupo</li>
  <li>❌ No el cushion más alto — para escoltas >90kg, considera la Tatum 4</li>
</ul>

<h3><a href="/zapatilla/nike-kobe-8-protro">Nike Kobe 8 Protro — desde {{precio:nike-kobe-8-protro}}</a></h3>
<p><strong>Para el escolta-tirador puro.</strong> La Kobe 8 Protro es la referencia histórica para el perfil escolta: ultra-reactiva (respuesta {{nota:nike-kobe-8-protro:respuesta}}), la más ligera del grupo (340 g) y con el court feel más bajo del mercado. Kobe Bryant era el tirador perfecto — su zapatilla lo refleja. El problema: la horma es muy estrecha y el precio alto.</p>
<ul>
  <li>✅ Respuesta {{nota:nike-kobe-8-protro:respuesta}} — al nivel de la AE 2 y la Curry 13</li>
  <li>✅ 340 g — la más ligera del grupo</li>
  <li>✅ Court feel excepcional para sentir la planta antes del tiro</li>
  <li>❌ {{precio:nike-kobe-8-protro}} — la más cara del grupo</li>
  <li>❌ Horma muy estrecha — pie normal o estrecho únicamente</li>
</ul>

<h3><a href="/zapatilla/ua-curry-13">Under Armour Curry 13 — desde {{precio:ua-curry-13}}</a></h3>
<p><strong>Para escoltas que priorizan el court feel y el tiro perimetral.</strong> UA Flow da la sensación de suelo más directa del mercado. Para el tirador que necesita sentir exactamente cuándo va a soltar el balón y qué tiene bajo los pies, la Curry 13 es el referente. Steph Curry es el mejor tirador de la historia — su zapatilla está diseñada para eso.</p>
<ul>
  <li>✅ Court feel único — ideal para tiradores de posición fija</li>
  <li>✅ Tracción {{nota:ua-curry-13:traccion}} en parquet limpio</li>
  <li>✅ Horma normal — segura para la mayoría de pies</li>
  <li>❌ Sin goma → exclusivamente interior. Outdoor la destruye</li>
</ul>

<h3><a href="/zapatilla/jordan-tatum-4">Jordan Tatum 4 — desde {{precio:jordan-tatum-4}}</a></h3>
<p><strong>Para el escolta-alero que juega físico.</strong> Jayson Tatum es técnicamente un alero, pero muchos escoltas físicos (6'5"+) se identifican con su perfil: defiende al base del rival, mete cortes, juega en el poste bajo a veces. La Tatum 4 ofrece una estabilidad lateral correcta y cushion para los aterrizajes de esos momentos físicos.</p>
<ul>
  <li>✅ Soporte lateral {{nota:jordan-tatum-4:soporte_lateral}} — correcto para escoltas físicos</li>
  <li>✅ Cushion {{nota:jordan-tatum-4:amortiguacion}} — protege bien en aterrizajes de corte y rebote</li>
  <li>✅ Plataforma baja y copa de TPU: estable en los apoyos</li>
  <li>❌ Prioriza cushion y versatilidad: no es la más reactiva para escoltas de velocidad pura</li>
</ul>

<h3><a href="/zapatilla/nike-gt-cut-4">Nike GT Cut 4 — desde {{precio:nike-gt-cut-4}}</a></h3>
<p><strong>Para el escolta-base que quiere court feel y un primer paso rápido.</strong> Si tu juego de escolta es más parecido al de un base (Shai Gilgeous-Alexander, por ejemplo), la GT Cut 4 te da el mismo primer paso explosivo con algo más de estabilidad que en configuración de base puro.</p>
<ul>
  <li>❌ Respuesta {{nota:nike-gt-cut-4:respuesta}} y tracción {{nota:nike-gt-cut-4:traccion}}, por debajo de la AE 2 y la Curry 13</li>
  <li>❌ {{peso:nike-gt-cut-4}}: no es ligera</li>
  <li>❌ Horma muy estrecha — solo si tu pie lo admite</li>
  <li>❌ No outdoor — solo interior limpio</li>
</ul>

<h2>¿Cuál elegir?</h2>
<ul>
  <li><strong>Escolta-creador con juego de penetración → <a href="/zapatilla/adidas-ae-2">AE 2</a></strong> (mejor equilibrio precio/rendimiento)</li>
  <li><strong>Tirador puro de posición fija → <a href="/zapatilla/nike-kobe-8-protro">Kobe 8 Protro</a></strong> o <strong><a href="/zapatilla/ua-curry-13">Curry 13</a></strong> (court feel para el tiro)</li>
  <li><strong>Escolta físico, 85kg+, juego por dentro → <a href="/zapatilla/jordan-tatum-4">Tatum 4</a></strong> (estabilidad y cushion)</li>
  <li><strong>Escolta muy rápido, pie estrecho → <a href="/zapatilla/nike-gt-cut-4">GT Cut 4</a></strong> (court feel)</li>
</ul>

<p class="art-outro">¿Escolta pero no sabes cuál de estos perfiles es el tuyo? El <a href="/quiz">quiz de CANCHA.ZAPA</a> tiene una pregunta sobre estilo de juego que distingue entre escolta-tirador y escolta-creador para darte la recomendación más ajustada a tu juego.</p>
    `,
  },

  // ── 27. Guía ala-pívots ─────────────────────────────────────────────
  {
    slug: "mejores-zapatillas-ala-pivots-2025",
    title: "Mejores zapatillas de baloncesto para ala-pívots en 2025-2026",
    metaTitle: "Mejores zapatillas para ala-pívots baloncesto 2025-2026 | CANCHA.ZAPA",
    description:
      "Guía de las mejores zapatillas para ala-pívots en 2025: cushion, estabilidad y movilidad. Top 5 con análisis técnico y comparativa completa.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía por posición · Ala-pívots 2025",
    heroTitle: "Mejores zapas para ala-pívots",
    heroSubtitle: "2025-2026 · Cushion, estabilidad y movilidad de 4 moderno",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-lebron-23", "nike-kd-19", "jordan-luka-4", "adidas-harden-vol-9", "jordan-40"],
    relatedSeoPages: ["mejor-zapatilla-ala-pivot", "zapatillas-cushion", "zapatillas-baloncesto-130-euros"],
    body: `
<p class="art-intro">El ala-pívot moderno es la posición más exigente del juego contemporáneo. Juegas como pivot en la pintura y como alero en el perímetro. Saltas para rebotes, corres contraataques, defiedes al base en el pick-and-roll y aguantas los bloqueos del pívot contrario. La zapatilla de un 4 moderno tiene que hacer todo eso — y hacerlo 40 minutos.</p>

<h2>Qué necesita un ala-pívot de su zapatilla</h2>

<p>El ala-pívot es la posición que más tensión pone sobre la zapatilla. Los filtros que importan:</p>
<ul>
  <li><strong>Cushion 7-9:</strong> aterrizas en rebotes como un pívot pero tienes más movilidad. Cushion alto protege las articulaciones sin el exceso de peso de las zapas de pívot puro.</li>
  <li><strong>Estabilidad 8+:</strong> los contactos laterales en la pintura y el juego de cara al aro requieren una base estable. La espuma blanda sin soporte lateral te pone en riesgo.</li>
  <li><strong>Soporte lateral 7+:</strong> mid-top casi siempre. High-top si tienes historial de esguinces.</li>
  <li><strong>Respuesta 6-8:</strong> no necesitas la reactividad de un base, pero tampoco quieres una zapa que te lastre en el contraataque. El 4 moderno corre el campo.</li>
  <li><strong>Peso razonable (sub-420g):</strong> puede asumir más peso que un guard, pero demasiado y el último cuarto se vuelve eterno.</li>
</ul>

<h2>Top 5 zapatillas para ala-pívots en 2025</h2>

<h3><a href="/zapatilla/nike-lebron-23">Nike LeBron 23 — desde {{precio:nike-lebron-23}}</a></h3>
<p><strong>La referencia para ala-pívots de 90kg+.</strong> ZoomX de longitud completa con Cushlon y placa de carbono. LeBron James es el prototipo del 4 moderno que juega todo el campo — su zapatilla está diseñada para ese perfil. Para ala-pívots de alto impacto físico, su amortiguación ZoomX + Cushlon es de las más protectoras.</p>
<ul>
  <li>✅ ZoomX + Cushlon: amortiguación protectora para >90kg</li>
  <li>✅ Placa de carbono: rigidez y retorno bajo el pie</li>
  <li>✅ Exterior: solo ocasional ({{exterior:nike-lebron-23}})</li>
  <li>❌ 455 g — la más pesada del grupo, y de las más caras</li>
  <li>✅ Horma amable con el pie ancho (el talón va algo estrecho)</li>
</ul>

<h3><a href="/zapatilla/nike-kd-19">Nike KD 19 — desde {{precio:nike-kd-19}}</a></h3>
<p><strong>Para ala-pívots dinámicos de 80-100kg.</strong> Kevin Durant es el ala-pívot más móvil de la historia — el KD 19 refleja eso: Zoom Strobel + Cushlon 3.0 da bounce reactivo sin el peso de la LeBron. Para el 4 que sale al perímetro, defiende al 2 y necesita respuesta suficiente para eso.</p>
<ul>
  <li>✅ Zoom Strobel: bounce reactivo para el 4 dinámico</li>
  <li>✅ Más barata que la LeBron con rendimiento muy cercano</li>
  <li>✅ TPU dagger-cage: soporte lateral sólido sin peso extra</li>
  <li>❌ Cushion algo menor que la LeBron para ala-pívots >100kg</li>
</ul>

<h3><a href="/zapatilla/jordan-luka-4">Jordan Luka 4 — desde {{precio:jordan-luka-4}}</a></h3>
<p><strong>Para ala-pívots con mucho juego de poste y pick-and-pop.</strong> Luka Doncic es técnicamente un base/escolta pero tiene el perfil físico de un 4 pesado. La Luka 4 tiene la base más ancha del grupo y cushion generoso para los aterrizajes del jugador que posta y sale al tres. Horma normal, precio razonable.</p>
<ul>
  <li>✅ Base ancha: la más estable del grupo en contactos laterales</li>
  <li>✅ Cushion Zoom Air para los aterrizajes frecuentes</li>
  <li>✅ Horma normal — sirve para la mayoría de pies</li>
  <li>❌ Respuesta algo menor — para el 4 que necesita mucha explosividad perimetral, considera la KD 19</li>
</ul>

<h3><a href="/zapatilla/adidas-harden-vol-9">Adidas Harden Vol 9 — desde {{precio:adidas-harden-vol-9}}</a></h3>
<p><strong>La mejor relación calidad-precio del grupo para ala-pívots medianos.</strong> James Harden juega de escolta pero tiene el perfil físico de un 4 — la Harden Vol 9 está pensada para jugadores potentes con movilidad. La combinación Boost + Lightstrike da cushion {{nota:adidas-harden-vol-9:amortiguacion}} con bounce reactivo por menos que la LeBron 23.</p>
<ul>
  <li>✅ Boost + Lightstrike: cushion {{nota:adidas-harden-vol-9:amortiguacion}} a precio competitivo</li>
  <li>✅ Cushion de gama alta por menos que la LeBron 23</li>
  <li>✅ Respuesta suficiente para el 4 que sale al perímetro</li>
  <li>❌ No llega a la estabilidad lateral de la LeBron o la Luka para juego de poste muy físico</li>
</ul>

<h3><a href="/zapatilla/jordan-40">Air Jordan 40 — desde {{precio:jordan-40}}</a></h3>
<p><strong>Para el ala-pívot que prioriza el bounce por encima de todo.</strong> ZoomX + Zoom Strobel es la combinación de espumas más avanzada de 2025. Si eres un 4 moderno que vive en el perímetro (tres puntos, pick-and-pop, post-fade) y valoras ese bounce en cada aterrizaje, la Jordan 40 no tiene rival. El problema: es cara, pesada y atrae el polvo.</p>
<ul>
  <li>✅ ZoomX + Strobel: el bounce más avanzado del mercado</li>
  <li>✅ 6 correas internas: soporte lateral excepcional pese al cushion blando</li>
  <li>❌ {{precio:jordan-40}} y 439 g — precio premium para lo que es</li>
  <li>❌ ZoomX atrae el polvo: tracción baja en pistas sucias</li>
</ul>

<h2>Comparativa rápida</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Modelo</th>
      <th style="padding:8px;text-align:center">Cushion</th>
      <th style="padding:8px;text-align:center">Estabilidad</th>
      <th style="padding:8px;text-align:center">Respuesta</th>
      <th style="padding:8px;text-align:center">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Nike LeBron 23</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:nike-lebron-23:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-lebron-23:estabilidad}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-lebron-23:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{precio:nike-lebron-23}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Nike KD 19</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:nike-kd-19:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-kd-19:estabilidad}}</td>
      <td style="padding:8px;text-align:center">{{nota:nike-kd-19:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{precio:nike-kd-19}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Jordan Luka 4</strong></td>
      <td style="padding:8px;text-align:center">{{nota:jordan-luka-4:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:jordan-luka-4:estabilidad}}</td>
      <td style="padding:8px;text-align:center">{{nota:jordan-luka-4:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{precio:jordan-luka-4}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Adidas Harden Vol 9</strong></td>
      <td style="padding:8px;text-align:center">{{nota:adidas-harden-vol-9:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:adidas-harden-vol-9:estabilidad}}</td>
      <td style="padding:8px;text-align:center">{{nota:adidas-harden-vol-9:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{precio:adidas-harden-vol-9}}</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>Air Jordan 40</strong></td>
      <td style="padding:8px;text-align:center">{{nota:jordan-40:amortiguacion}}</td>
      <td style="padding:8px;text-align:center">{{nota:jordan-40:estabilidad}}</td>
      <td style="padding:8px;text-align:center">⭐ {{nota:jordan-40:respuesta}}</td>
      <td style="padding:8px;text-align:center">{{precio:jordan-40}}</td>
    </tr>
  </tbody>
</table>
</div>

<h2>¿Cuál elegir?</h2>
<ul>
  <li><strong>Si pesas >90kg y juegas físico en la pintura → <a href="/zapatilla/nike-lebron-23">LeBron 23</a></strong> (ZoomX con Cushlon: de las de más amortiguación del catálogo)</li>
  <li><strong>Si eres 4 dinámico, 80-100kg, juegas en el perímetro → <a href="/zapatilla/nike-kd-19">KD 19</a></strong> (mejor equilibrio precio/rendimiento)</li>
  <li><strong>Si juegas mucho poste y pick-and-pop → <a href="/zapatilla/jordan-luka-4">Luka 4</a></strong> (la base más estable del grupo)</li>
  <li><strong>Si buscas la mejor relación calidad-precio → <a href="/zapatilla/adidas-harden-vol-9">Harden Vol 9</a></strong> (cushion {{nota:adidas-harden-vol-9:amortiguacion}} desde {{precio:adidas-harden-vol-9}})</li>
  <li><strong>Si priorizas el bounce y puedes gastar 200€ → <a href="/zapatilla/jordan-40">Air Jordan 40</a></strong> (el techo tecnológico de 2025)</li>
</ul>

<p class="art-outro">El <a href="/quiz">quiz de CANCHA.ZAPA</a> filtra específicamente para la posición ala-pívot teniendo en cuenta tu peso, tipo de juego y presupuesto. En menos de un minuto tienes las 5 más compatibles con tu perfil exacto.</p>
    `,
  },

  // ── 28. Guía espumas ────────────────────────────────────────────────
  {
    slug: "espumas-baloncesto-ua-flow-zooomx-max-air-lightstrike-2025",
    title: "UA Flow vs ZoomX vs Max Air vs Lightstrike: guía de espumas de baloncesto 2025",
    metaTitle: "UA Flow vs ZoomX vs Max Air vs Lightstrike Pro: ¿cuál es mejor? | CANCHA.ZAPA",
    description:
      "Guía técnica de las espumas de baloncesto en 2025: UA Flow, ZoomX, Max Air, Lightstrike Pro. Cuál da más cushion, cuál más respuesta y para qué jugador.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía técnica · Espumas 2025",
    heroTitle: "UA Flow vs ZoomX vs Max Air",
    heroSubtitle: "Guía técnica de espumas de baloncesto 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["ua-curry-13", "jordan-40", "nike-lebron-23", "adidas-ae-2", "nike-ja-3"],
    relatedSeoPages: ["zapatillas-cushion", "zapatillas-reactivas", "mejores-zapatillas-baloncesto-2025"],
    body: `
<p class="art-intro">La entresuela es el componente más importante de una zapatilla de baloncesto. Es lo que determina si sientes el suelo o flotas sobre él, si tus rodillas se resienten al tercer partido o aguantan toda la temporada. En 2025, cada marca tiene su tecnología propia — y entender sus diferencias te ayuda a elegir sin dejarte llevar por el marketing.</p>

<h2>Las 4 espumas protagonistas de 2025</h2>

<h3>UA Flow (Under Armour)</h3>
<p><strong>Qué es:</strong> Una espuma de poliuretano que actúa directamente como suela sin necesidad de capa de goma adicional. Under Armour unió la entresuela y la outsole en un solo material.</p>
<p><strong>Cómo se siente:</strong> El court feel más directo del mercado. Sientes el suelo a través de la espuma de forma que ninguna otra tecnología puede replicar. Para guards que necesitan saber exactamente dónde tienen los pies, es insuperable.</p>
<p><strong>El problema:</strong> Sin goma en la suela, la durabilidad outdoor es prácticamente nula. Una sola sesión en asfalto puede dañar irreversiblemente la espuma. La UA Flow es exclusivamente para interior.</p>
<p><strong>Modelos que la usan:</strong> UA Curry 12, UA Curry 13, UA Flow Breakthru.</p>
<p><strong>Puntuación relativa:</strong> Respuesta 9/10 · Cushion 7/10 · Durabilidad outdoor 2/10</p>

<h3>ZoomX (Nike)</h3>
<p><strong>Qué es:</strong> Espuma de PEBA (polyether block amide) que Nike desarrolló originalmente para las zapatillas de running más rápidas del mundo (Vaporfly, Alphafly). Devuelve el 85% de la energía de cada pisada — el porcentaje más alto de cualquier espuma de baloncesto en 2025.</p>
<p><strong>Cómo se siente:</strong> Un bounce notable y diferente. El ZoomX es suave pero energético — la pisada devuelve energía como si el suelo te empujara hacia arriba. La primera vez que pisas una zapatilla con ZoomX full-length (Jordan 40, Ja 3) se nota inmediatamente.</p>
<p><strong>El problema:</strong> El ZoomX es demasiado blando para estabilidad máxima. Solo, colapsaría bajo un aterrizaje lateral fuerte. Nike lo combina siempre con otro elemento (Zoom Strobel, TPU plates) para añadir firmeza.</p>
<p><strong>Modelos que la usan:</strong> Air Jordan 40 (ZoomX + Zoom Strobel), Nike Ja 3 (ZoomX full-length).</p>
<p><strong>Puntuación relativa:</strong> Respuesta 9/10 · Cushion 9/10 · Estabilidad 6/10 (solo ZoomX)</p>

<h3>Max Air (Nike)</h3>
<p><strong>Qué es:</strong> Una cámara de aire de alta presión con unidades de aire visibles en el talón. No es una espuma, sino una tecnología de amortiguación por cámara de aire.</p>
<p><strong>Cómo se siente:</strong> El cushion más "seguro" del mercado. No colapsa bajo cargas extremas — está diseñado para jugadores de 95-110kg que aterrizan con toda esa masa partido tras partido. El bounce es menor que el ZoomX, pero la protección bajo carga máxima no tiene rival.</p>
<p><strong>El problema:</strong> No da el bounce reactivo del ZoomX. Es un cushion absorbente más que energético. Para guards que necesitan respuesta, no es la opción.</p>
<p><strong>Modelos que la usan:</strong> Nike LeBron Witness 8.</p>
<p><strong>Puntuación relativa:</strong> Respuesta 6/10 · Cushion 10/10 · Estabilidad 8/10</p>

<h3>Lightstrike Pro (Adidas)</h3>
<p><strong>Qué es:</strong> La espuma premium de Adidas para baloncesto y atletismo. Una espuma de TPU modificado que equilibra cushion y respuesta. Más firme que el ZoomX pero más reactiva que el Bounce foam convencional de Adidas.</p>
<p><strong>Cómo se siente:</strong> El equilibrio más honesto del mercado. No es la que más cushion da (Max Air la supera) ni la más reactiva (ZoomX o UA Flow la superan), pero tiene un score medio muy alto en todos los atributos. Para jugadores que no quieren extremos, es la referencia.</p>
<p><strong>El problema:</strong> Es cara de fabricar, por eso aparece solo en modelos premium de Adidas, como el antepié de las D.O.N. Issue 6 y 7. Las versiones económicas de Adidas usan Bounce, que es inferior.</p>
<p><strong>Modelos que la usan:</strong> Adidas D.O.N. Issue 6 y D.O.N. Issue 7 (en el antepié).</p>
<p><strong>Puntuación relativa:</strong> Respuesta 8/10 · Cushion 8/10 · Estabilidad 8/10</p>

<h2>Comparativa directa</h2>

<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Espuma</th>
      <th style="padding:8px;text-align:center">Respuesta</th>
      <th style="padding:8px;text-align:center">Cushion</th>
      <th style="padding:8px;text-align:center">Court feel</th>
      <th style="padding:8px;text-align:center">Outdoor</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>UA Flow</strong></td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">❌ 2/10</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>ZoomX</strong></td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">7/10*</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Max Air</strong></td>
      <td style="padding:8px;text-align:center">6/10</td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">5/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>Lightstrike Pro</strong></td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
    </tr>
  </tbody>
</table>
</div>
<p style="font-size:12px;color:var(--cz-fg5)">*ZoomX tiene capa de goma en modelos como la Ja 3; sin goma (como en otras configuraciones) no aguanta outdoor.</p>

<h2>¿Cuál es para ti?</h2>
<ul>
  <li><strong>Base o escolta que prioriza court feel y plays en interior → UA Flow</strong> (UA Curry 13). No hay nada como sentir el suelo directamente.</li>
  <li><strong>Guard o alero que quiere bounce con cushion decente → ZoomX</strong> (Nike Ja 3, Air Jordan 40). El mejor equilibrio cushion-respuesta del mercado.</li>
  <li><strong>Pívot o ala-pívot de 90kg+ que necesita protección máxima → Cushion máximo (ZoomX / Zoom Air)</strong> (Nike LeBron 22/23). El cushion que no colapsa.</li>
  <li><strong>Cualquier posición que busca el mejor equilibrio sin extremos → Lightstrike Pro</strong> (Adidas D.O.N. Issue 7, con Lightstrike Pro en el antepié). El sweet spot del mercado.</li>
</ul>

<p class="art-outro">¿No sabes qué espuma encaja con tu perfil? El <a href="/quiz">quiz de CANCHA.ZAPA</a> usa tus respuestas de posición, peso y estilo de juego para filtrarte automáticamente las zapatillas con la espuma más adecuada para ti.</p>
    `,
  },

  // ── 29. Puma MB.05 análisis ──────────────────────────────────────────
  {
    slug: "puma-mb05-analisis-lamelo-2025",
    title: "Puma MB.05 análisis: ¿la firma de LaMelo Ball merece la pena en 2025?",
    metaTitle: "Puma MB.05 análisis completo 2025 | CANCHA.ZAPA",
    description:
      "Análisis técnico completo de la Puma MB.05 de LaMelo Ball: Nitro foam, tracción y veredicto honesto. ¿Mejor que la MB.04? ¿Merece la pena su precio?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis en profundidad · LaMelo 2025",
    heroTitle: "Puma MB.05",
    heroSubtitle: "¿La mejor Puma de baloncesto de 2025?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["puma-mb05", "puma-mb-04", "puma-mb03", "adidas-ae-2", "ua-curry-13"],
    relatedSeoPages: ["mejores-zapatillas-puma", "mejor-zapatilla-base", "mejores-zapatillas-baloncesto-2025"],
    body: `
<p class="art-intro">LaMelo Ball es el jugador más estiloso de la NBA en 2025 y eso se nota en su línea de calzado. Las MB.03 y MB.04 generaron mucha expectación — algunas la amaron, otras la odiaron. La MB.05 llega en 2025 como la más madura de la serie. ¿Cumple las expectativas?</p>

<h2>Diseño y primeras impresiones</h2>
<p>La MB.05 es estéticamente la más discreta de la línea Ball — y eso, paradójicamente, es un punto a favor para quien quiere llevarla en cancha sin que el diseño distraiga. El upper de malla multidireccional con refuerzos de TPU da un aspecto más funcional que las versiones anteriores. Puma ha escuchado las críticas sobre la excentricidad del diseño y ha equilibrado.</p>

<h2>La tecnología: Nitrofoam</h2>
<p>La MB.05 usa Nitrofoam, la espuma de nitrógeno de Puma. El resultado:</p>
<ul>
  <li><strong>Bounce mayor que la MB.04:</strong> el Nitrofoam de la MB.05 se siente blando, con respuesta en el antepié. En los primeros pasos se nota la diferencia — hay más energía de retorno.</li>
  <li><strong>Cushion {{nota:puma-mb05:amortiguacion}}:</strong> al nivel de la AE 2 ({{nota:adidas-ae-2:amortiguacion}}), con un tacto más suave que el del Light BOOST. Para un guard de 75-90kg es suficiente y protector.</li>
  <li><strong>Ligereza:</strong> la MB.05 pesa 418 g, en la línea de la AE 2 (428 g) y la GT Cut 4 (431 g). No es ligera, pero para su nivel de cushion es un peso razonable.</li>
</ul>

<h2>Tracción</h2>
<p>El patrón de suela de la MB.05 ha sido siempre el punto más criticado de la línea Ball. El problema no es el agarre en sí (es decente en parquet limpio) sino la consistencia: en pistas con algo de polvo, la suela de la MB.05 pierde tracción más rápido que la AE 2 o la Curry 13. El patrón es bonito pero no tan funcional como el herringbone clásico.</p>
<p><strong>Tracción en limpio: {{nota:puma-mb05:traccion}}. En pistas con polvo baja de forma notable.</strong> Si tu pista está impecable, bien. Si es de las pistas de barrio que no se limpian desde el miércoles, el agarre flojea.</p>

<h2>Soporte lateral y tobillo</h2>
<p>La MB.05 es low-top con un collar de espuma que cubre el tobillo sin llegar a mid-top. El soporte lateral está en {{nota:puma-mb05:soporte_lateral}} gracias a los refuerzos de TPU en el upper. Para un guard de 70-85kg sin historial de tobillos, es suficiente. Para jugadores más físicos o con esguinces previos, considera una mid-top.</p>

<h2>¿Mejora a la MB.04?</h2>
<p>Sí en tracción y respuesta (la ficha da 9 frente al 8 de la MB.04); en soporte lateral queda por debajo ({{nota:puma-mb05:soporte_lateral}} frente a {{nota:puma-mb-04:soporte_lateral}}):</p>
<ul>
  <li>Foco de espuma en el antepié</li>
  <li>Upper más contenido — menos llamativo pero más funcional</li>
  <li>Ajuste de la horma más consistente — la MB.04 tenía problemas de talla</li>
  <li>El punto débil (tracción en pistas sucias) sigue siendo el mismo</li>
</ul>

<h2>Puntuación técnica CANCHA.ZAPA</h2>
<ul>
  <li>Tracción: <strong>{{nota:puma-mb05:traccion}}</strong></li>
  <li>Amortiguación: <strong>{{nota:puma-mb05:amortiguacion}}</strong> — el Nitrofoam da cushion cómodo</li>
  <li>Respuesta: <strong>{{nota:puma-mb05:respuesta}}</strong> — bounce notable para un guard</li>
  <li>Soporte lateral: <strong>{{nota:puma-mb05:soporte_lateral}}</strong> — suficiente para guard sin historial</li>
  <li>Estabilidad: <strong>{{nota:puma-mb05:estabilidad}}</strong> — aceptable, no es su punto fuerte</li>
  <li>Ligereza: <strong>{{nota:puma-mb05:peso_score}}</strong> — {{peso:puma-mb05}}, razonable para su cushion</li>
  <li>Durabilidad outdoor: <strong>{{nota:puma-mb05:durabilidad_outdoor}}</strong> — suela de goma aguanta outdoor moderado</li>
</ul>

<h2>¿Vale los {{precio:puma-mb05}}?</h2>
<p>Su precio (desde {{precio:puma-mb05}}) la pone en competencia directa con la Adidas AE 2 (desde {{precio:adidas-ae-2}}) y la UA Curry 13 (desde {{precio:ua-curry-13}}). Mi veredicto honesto:</p>
<ul>
  <li>Si tienes la pista siempre limpia: <strong>sí, la MB.05 vale lo que cuesta</strong>. El Nitrofoam es una espuma cómoda y el conjunto es muy competitivo.</li>
  <li>Si juegas en pistas con polvo frecuente: elige la <strong>AE 2</strong> — la tracción herringbone es más consistente.</li>
  <li>Si priorizas el court feel y juegas solo en interior: elige la <strong>Curry 13</strong> — la UA Flow da una sensación que el Nitrofoam no puede replicar.</li>
</ul>

<h2>Disponibilidad en España</h2>
<p>Consulta las tiendas y el precio actualizado en <a href="/zapatilla/puma-mb05">su ficha</a>.</p>

<p class="art-outro">¿Te interesan las Puma para baloncesto? Visita nuestra <a href="/mejores-zapatillas-puma">guía completa de las mejores Puma de baloncesto</a> o <a href="/quiz">haz el quiz</a> para saber si la MB.05 encaja con tu perfil específico.</p>
    `,
  },

  // ── 30. Análisis Kobe 8 Protro ──────────────────────────────────────
  {
    slug: "nike-kobe-8-protro-analisis-2025",
    title: "Nike Kobe 8 Protro análisis: la mejor zapatilla para tiradores en 2025",
    metaTitle: "Nike Kobe 8 Protro análisis completo 2025 | CANCHA.ZAPA",
    description:
      "Análisis técnico de la Nike Kobe 8 Protro: la zapatilla más reactiva para escoltas y tiradores en 2025. Ligera y con un court feel único. ¿Merece la pena su precio?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis · La zapa del tirador",
    heroTitle: "Nike Kobe 8 Protro",
    heroSubtitle: "La referencia para tiradores en 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-kobe-8-protro", "nike-gt-cut-4", "ua-curry-13", "adidas-ae-2", "nike-kobe-9-elite-low-protro"],
    relatedSeoPages: ["mejor-zapatilla-escolta", "zapatillas-reactivas", "mejores-zapatillas-nike"],
    body: `
<p class="art-intro">Kobe Bryant no necesitaba una zapatilla de moda. Necesitaba la que le diera ventaja en décimas de segundo. La Kobe 8 Protro es la reedición de la zapatilla que Kobe usó durante la temporada 2012-13 — y en 2025 sigue siendo una de las más reactivas del mercado. Esto no es nostalgia. Es ingeniería que aguanta el paso del tiempo.</p>

<h2>¿Por qué la Kobe 8 Protro sigue siendo relevante?</h2>
<p>La mayoría de zapatillas retro Protro son lifestyle disfrazadas de performance. La Kobe 8 Protro es diferente: Nike sustituyó el Lunarlon original por un drop-in de React, mantiene el perfil ultra-bajo y la suela herringbone original. El resultado es una zapatilla de 2012 con la tecnología de 2025.</p>
<p>Para tiradores y escoltas, específicamente, la Kobe 8 Protro ofrece algo que ningún modelo nuevo 2025 replica exactamente: el perfil más bajo del mercado combinado con un drop-in de React de perfil bajo.</p>

<h2>Lo que la hace especial técnicamente</h2>

<h3>Perfil ultra-bajo (low-profile)</h3>
<p>La Kobe 8 Protro tiene la distancia suelo-pie más baja de cualquier zapatilla de baloncesto en producción. Eso significa que cuando plantas el pie para tirar, sientes exactamente dónde estás. Para tiradores de posición fija (spot-up shooters), esa información es crítica. La zapatilla "desaparece" bajo el pie — que es exactamente lo que un tirador necesita.</p>

<h3>Drop-in de React</h3>
<p>El drop-in de React es fino y de perfil bajo: prioriza el court feel sobre la protección. Sus 340 g tampoco frenan la respuesta.</p>

<h3>Suela herringbone</h3>
<p>El patrón herringbone de la Kobe 8 es uno de los diseños más copiados de la historia del baloncesto. No en vano: en parquet limpio, la tracción es excepcional. El problema: en pistas con polvo o suciedad, la goma fina se desliza antes que la goma más gruesa de la GT Cut 4 o la AE 2.</p>

<h2>Puntuación técnica CANCHA.ZAPA</h2>
<ul>
  <li>Tracción: <strong>{{nota:nike-kobe-8-protro:traccion}}</strong> (conviene limpiar la suela en pistas con polvo)</li>
  <li>Amortiguación: <strong>{{nota:nike-kobe-8-protro:amortiguacion}}</strong> — el drop-in de React es fino y de perfil bajo</li>
  <li>Respuesta: <strong>{{nota:nike-kobe-8-protro:respuesta}}</strong> — de las más reactivas del catálogo, al nivel de la AE 2 y la Curry 13</li>
  <li>Soporte lateral: <strong>{{nota:nike-kobe-8-protro:soporte_lateral}}</strong> — buen soporte para un low-top</li>
  <li>Estabilidad: <strong>{{nota:nike-kobe-8-protro:estabilidad}}</strong> — la base ancha compensa el upper bajo</li>
  <li>Ligereza: <strong>{{nota:nike-kobe-8-protro:peso_score}}</strong> — 340 g, de las más ligeras del catálogo</li>
  <li>Durabilidad outdoor: <strong>{{nota:nike-kobe-8-protro:durabilidad_outdoor}}</strong> — goma fina, no la lleves al asfalto</li>
</ul>

<h2>Comparativa con rivales</h2>

<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Modelo</th>
      <th style="padding:8px;text-align:center">Respuesta</th>
      <th style="padding:8px;text-align:center">Court feel</th>
      <th style="padding:8px;text-align:center">Peso</th>
      <th style="padding:8px;text-align:center">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Nike Kobe 8 Protro</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:nike-kobe-8-protro:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">{{peso:nike-kobe-8-protro}}</td>
      <td style="padding:8px;text-align:center">{{precio:nike-kobe-8-protro}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>Nike GT Cut 4</strong></td>
      <td style="padding:8px;text-align:center">{{nota:nike-gt-cut-4:respuesta}}</td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">{{peso:nike-gt-cut-4}}</td>
      <td style="padding:8px;text-align:center">{{precio:nike-gt-cut-4}}</td>
    </tr>
    <tr style="border-bottom:1px solid var(--cz-elev)">
      <td style="padding:8px"><strong>UA Curry 13</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:ua-curry-13:respuesta}}</td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">{{peso:ua-curry-13}}</td>
      <td style="padding:8px;text-align:center">{{precio:ua-curry-13}}</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>Adidas AE 2</strong></td>
      <td style="padding:8px;text-align:center">⭐ {{nota:adidas-ae-2:respuesta}}</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">{{peso:adidas-ae-2}}</td>
      <td style="padding:8px;text-align:center">{{precio:adidas-ae-2}}</td>
    </tr>
  </tbody>
</table>
</div>

<h2>¿Para quién es la Kobe 8 Protro?</h2>
<p>Para un tipo de jugador muy específico:</p>
<ul>
  <li>Escoltas y bases que priorizan el primer paso y el court feel sobre todo lo demás</li>
  <li>Tiradores de posición fija que necesitan sentir el suelo antes del tiro</li>
  <li>Jugadores con pie estrecho o normal que no necesitan horma ancha</li>
  <li>Jugadores que juegan siempre en pabellón con pista bien mantenida</li>
</ul>

<p><strong>No es para ti si:</strong> pesas más de 90kg (el cushion no es suficiente para esos impactos), tienes pie ancho (la horma es estrecha), juegas en exterior o en pistas con polvo.</p>

<h2>¿Vale los {{precio:nike-kobe-8-protro}}?</h2>
<p>La pregunta del millón. Mi respuesta: sí, para el perfil correcto, sí vale. La Kobe 8 Protro ofrece algo que la GT Cut 4 (desde {{precio:nike-gt-cut-4}}) no tiene: el perfil más bajo del mercado con {{nota:nike-kobe-8-protro:respuesta}} en respuesta y 340 g. Para un tirador puro, esa diferencia se nota en cada tiro. Para el resto de jugadores, la GT Cut 4 o la AE 2 son decisiones más inteligentes.</p>

<p class="art-outro">¿La Kobe 8 Protro es para tu perfil? El <a href="/quiz">quiz de CANCHA.ZAPA</a> evalúa tu posición, estilo de juego y tipo de pie para decirte si es tu match o si hay algo más adecuado. Sin ambigüedades.</p>
    `,
  },

  // ── 28. Calcetines de baloncesto ─────────────────────────────────────
  {
    slug: "mejores-calcetines-baloncesto",
    title: "Mejores calcetines de baloncesto 2025-2026: guía completa",
    metaTitle: "Mejores calcetines de baloncesto 2025: Nike, Adidas, Under Armour | CANCHA.ZAPA",
    description: "Guía de los mejores calcetines técnicos para baloncesto: Nike Elite, Adidas Cushioned, Under Armour Playmaker, Stance NBA. Cuál elegir según tu zapatilla y estilo de juego.",
    fecha: "2026-05-28",
    fechaLabel: "28 mayo 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía de accesorios · CANCHA.ZAPA",
    heroTitle: "Mejores calcetines de baloncesto",
    heroSubtitle: "2025-2026 · Nike, Adidas, UA, Stance — cuál te toca",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "adidas-ae-2", "ua-curry-13", "nike-ja-3"],
    relatedSeoPages: ["zapatillas-baloncesto-retro", "zapatillas-baloncesto-baratas"],
    body: `
<p class="art-intro">Un buen calcetín técnico mejora la tracción, la amortiguación y la prevención de ampollas. Suena exagerado hasta que llevas años con calcetines de algodón y pruebas unos Nike Elite por primera vez. La diferencia es real y cuesta 12-16€.</p>

<h2>Por qué importan los calcetines en baloncesto</h2>
<p>En baloncesto, el pie trabaja bajo tres tipos de estrés específicos que un calcetín técnico está diseñado para gestionar:</p>
<ul>
  <li><strong>Impacto en saltos y aterrizajes:</strong> Un calcetín con cushion en talón y antepié absorbe parte del impacto antes de que llegue a la entresuela. Con zapas de cushion básico (zapatillas económicas, retros), la diferencia es especialmente notable.</li>
  <li><strong>Fricción en cortes laterales:</strong> El pie se desliza dentro de la zapatilla en cada cambio de dirección. El calcetín técnico tiene zonas de agarre (generalmente en el arco) que anclan el pie a la plantilla y reducen ampollas.</li>
  <li><strong>Termorregulación:</strong> Las mallas sintéticas de los calcetines técnicos evacúan el sudor mejor que el algodón, reduciendo el riesgo de hongos y manteniendo el pie seco en partidos largos.</li>
</ul>

<h2>Los mejores calcetines de 2025: análisis por marca</h2>

<h3>Nike Elite Cushioned Crew — la referencia</h3>
<p>La Nike Elite es el calcetín técnico más vendido del mundo en baloncesto, y lo merece. Tiene Dri-FIT en toda la superficie, cushion específico en talón y antepié (Swoosh-shaped), y una zona de arco sin costuras que reduce ampollas. Cañero medio. Disponible en crew y no-show.</p>
<p><strong>Mejor para:</strong> zapatillas de cushion (LeBron, Fresh Foam BB), pívots, jugadores con rodillas o pies sensibles.</p>
<p><strong>Precio:</strong> ~15€ · <a href="https://www.amazon.es/s?k=nike+elite+cushioned+basketball+crew&tag=canchazapa-21" target="_blank" rel="noopener noreferrer sponsored">Ver en Amazon →</a></p>

<h3>Nike Elite Lightweight Crew — para guards explosivos</h3>
<p>Mismo sistema Dri-FIT pero con un perfil de cushion mucho más fino. Diseñado para jugadores que quieren máximo court feel — sentir el suelo a través de la zapatilla. Low-top compatible. Más transpirable que la versión cushioned.</p>
<p><strong>Mejor para:</strong> zapatillas reactivas (GT Cut 4, Kobe 8 Protro), guards y bases que priorizan la sensación.</p>
<p><strong>Precio:</strong> ~13€ · <a href="https://www.amazon.es/s?k=nike+elite+lightweight+crew+calcetines+baloncesto&tag=canchazapa-21" target="_blank" rel="noopener noreferrer sponsored">Ver en Amazon →</a></p>

<h3>Adidas Cushioned Crew 3-Pack — la relación calidad-precio</h3>
<p>Adidas ofrece sus calcetines técnicos en pack de 3, lo que baja el coste por par a ~4€. El tejido es Climalite (equivalente al Dri-FIT de Nike), el cushion es sólido aunque menos específico que la Elite, y la horma encaja especialmente bien con las zapas Adidas (AE 2, Harden, Dame).</p>
<p><strong>Mejor para:</strong> jugadores con zapas Adidas, presupuesto ajustado, entrenadores que necesitan muchos pares.</p>
<p><strong>Precio:</strong> ~12€ el pack · <a href="https://www.amazon.es/s?k=adidas+cushioned+crew+calcetines+baloncesto+pack&tag=canchazapa-21" target="_blank" rel="noopener noreferrer sponsored">Ver en Amazon →</a></p>

<h3>Under Armour Playmaker Mid Crew — para caño alto</h3>
<p>La UA Playmaker tiene el cañero más alto de esta lista — ideal para zapas high-top donde el calcetín interactúa con el collar. Tiene UA HeatGear (tejido frío en verano), cushion en zona de talón y una cinta de compresión en el arco que es notablemente buena para jugadores con pronación moderada.</p>
<p><strong>Mejor para:</strong> zapas de caño alto (Kobe 9 High Protro, Nike GT Jump 1), jugadores con historial de esguinces, cualquiera que prefiera el cañero largo.</p>
<p><strong>Precio:</strong> ~12€ · <a href="https://www.amazon.es/s?k=under+armour+playmaker+mid+crew+calcetines&tag=canchazapa-21" target="_blank" rel="noopener noreferrer sponsored">Ver en Amazon →</a></p>

<h3>Stance NBA Performance Crew — la opción premium</h3>
<p>Stance es el calcetín oficial de la NBA. La versión Performance tiene un tejido compuesto de algodón combed y nylon con lycra, cushion en L-R (pie derecho e izquierdo anatómicamente distintos), y costuras planas en la punta. El más cómodo de la lista — y el más caro.</p>
<p><strong>Mejor para:</strong> jugadores que invierten en sus materiales y quieren el máximo confort posible.</p>
<p><strong>Precio:</strong> ~16€ · <a href="https://www.amazon.es/s?k=stance+nba+performance+crew+calcetines&tag=canchazapa-21" target="_blank" rel="noopener noreferrer sponsored">Ver en Amazon →</a></p>

<h2>Tabla comparativa</h2>
<div style="overflow-x:auto;margin:24px 0">
<table style="width:100%;border-collapse:collapse;font-size:13px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:10px;text-align:left">Calcetín</th>
      <th style="padding:10px;text-align:center">Cushion</th>
      <th style="padding:10px;text-align:center">Cañero</th>
      <th style="padding:10px;text-align:center">Precio</th>
      <th style="padding:10px;text-align:left">Mejor con</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px"><strong>Nike Elite Cushioned</strong></td><td style="padding:8px;text-align:center">⭐⭐⭐</td><td style="padding:8px;text-align:center">Medio</td><td style="padding:8px;text-align:center">~15€</td><td style="padding:8px">LeBron, Fresh Foam, pívots</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px"><strong>Nike Elite Lightweight</strong></td><td style="padding:8px;text-align:center">⭐</td><td style="padding:8px;text-align:center">Bajo</td><td style="padding:8px;text-align:center">~13€</td><td style="padding:8px">GT Cut 4, Kobe Protro, guards</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px"><strong>Adidas Cushioned 3pk</strong></td><td style="padding:8px;text-align:center">⭐⭐</td><td style="padding:8px;text-align:center">Medio</td><td style="padding:8px;text-align:center">~12€</td><td style="padding:8px">Zapas Adidas, uso diario</td></tr>
    <tr style="border-bottom:1px solid var(--cz-elev)"><td style="padding:8px"><strong>UA Playmaker Mid</strong></td><td style="padding:8px;text-align:center">⭐⭐</td><td style="padding:8px;text-align:center">Alto</td><td style="padding:8px;text-align:center">~12€</td><td style="padding:8px">High-tops, esguinces recurrentes</td></tr>
    <tr><td style="padding:8px"><strong>Stance NBA Perf.</strong></td><td style="padding:8px;text-align:center">⭐⭐</td><td style="padding:8px;text-align:center">Medio</td><td style="padding:8px;text-align:center">~16€</td><td style="padding:8px">Cualquier zapa, máximo confort</td></tr>
  </tbody>
</table>
</div>

<h2>¿Qué talla pedir?</h2>
<p>Los calcetines técnicos de baloncesto suelen ir en rangos. Pide siempre el tope del rango si estás en el límite — por ejemplo, si calcas un 42 y el rango es 40-42, pide el siguiente (43-46). Los calcetines apretatados en la punta generan ampollas rápidamente.</p>

<p class="art-outro">¿Quieres saber qué calcetín combina mejor con tu zapatilla concreta? En cada ficha de zapatilla de CANCHA.ZAPA encontrarás la recomendación específica en la sección "Combina con →". También puedes consultar la <a href="/blog/mejores-plantillas-baloncesto">guía de plantillas</a> si buscas mejorar el cushion o el soporte de arco.</p>
    `,
  },

  // ── 29. Plantillas de baloncesto ─────────────────────────────────────
  {
    slug: "mejores-plantillas-baloncesto",
    title: "Mejores plantillas para zapatillas de baloncesto 2025-2026",
    metaTitle: "Mejores plantillas para zapatillas de baloncesto 2025 | CANCHA.ZAPA",
    description: "Guía de plantillas técnicas para baloncesto: Superfeet Green, Sof Sole Athlete, Bauerfeind Sports, Currex SupportST. Cuándo y por qué añadir una plantilla a tu zapatilla.",
    fecha: "2026-05-28",
    fechaLabel: "28 mayo 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía de accesorios · CANCHA.ZAPA",
    heroTitle: "Mejores plantillas para baloncesto",
    heroSubtitle: "2025-2026 · Superfeet, Sof Sole, Bauerfeind, Currex",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["fila-grant-hill-1", "adidas-crazy-8", "nike-shox-bb4", "nike-air-penny-2"],
    relatedSeoPages: ["zapatillas-baloncesto-retro", "zapatillas-baloncesto-para-rodillas"],
    body: `
<p class="art-intro">La plantilla de fábrica que viene en la mayoría de zapatillas es, en el mejor caso, mediocre. Sustituirla por una plantilla técnica de 18-45€ puede mejorar el soporte, reducir el impacto en rodillas y alargar la vida útil de la zapatilla. Especialmente útil en zapas retro y modelos de entrada.</p>

<h2>¿Cuándo tiene sentido añadir una plantilla?</h2>
<p>No siempre. Las zapatillas premium modernas (Nike LeBron 23, Air Jordan 40, UA Curry 13) tienen plantillas integradas bien diseñadas. Añadir una encima puede comprimir el espacio interno y generar incomodidad. Los casos donde sí merece la pena:</p>
<ul>
  <li><strong>Zapatillas retro:</strong> Las reediciones de clásicos (Jordan retros, Crazy 8, Shox BB4, Grant Hill) tienen plantillas básicas. Una plantilla de cushion mejora significativamente la amortiguación.</li>
  <li><strong>Zapatillas de entrada (sub-80€):</strong> Modelos como la Decathlon Tarmak o la Nike Precision tienen plantillas de espuma básica. Una Sof Sole Athlete las mejora notablemente.</li>
  <li><strong>Pronación o pie plano:</strong> Si tienes estas condiciones, una plantilla con soporte de arco (Superfeet, Currex) puede corregir la biomecánica incluso si la zapatilla no la corrige sola.</li>
  <li><strong>Lesiones de tobillo o rodilla recurrentes:</strong> Una plantilla médica (Bauerfeind) puede complementar el trabajo de la zapatilla en la prevención de recaídas.</li>
</ul>

<h2>Las 4 mejores plantillas de 2025</h2>

<h3>Superfeet Green Premium — la de soporte de arco</h3>
<p>Superfeet Green es la plantilla con el soporte de arco más alto del mercado de consumo. Rígida, con un talón cup profundo que estabiliza el pie. Diseñada originalmente para senderismo pero adoptada masivamente en deportes de pista por podólogos deportivos.</p>
<p><strong>Para quién:</strong> jugadores con pie plano, pronación moderada-severa, o fascia plantar. Pívots y jugadores pesados que aterrizan constantemente.</p>
<p><strong>No para quién:</strong> pie neutro sin problemas biomecánicos — el arco puede resultar molesto si no lo necesitas.</p>
<p><strong>Precio:</strong> ~38€ · <a href="https://www.amazon.es/s?k=superfeet+green+plantillas+deporte&tag=canchazapa-21" target="_blank" rel="noopener noreferrer sponsored">Ver en Amazon →</a></p>

<h3>Sof Sole Athlete Full Length — la de cushion extra</h3>
<p>Sof Sole Athlete es la plantilla de cushion más versátil del mercado. Espuma Hydrologix (antibacteriana, no retiene humedad) con gel en talón y antepié. Perfil neutro de arco — no corrige pronación pero añade amortiguación real. La plantilla perfecta para retros y zapatillas de entrada.</p>
<p><strong>Para quién:</strong> jugadores con zapatillas retro, modelos de entrada, o cualquier zapa con cushion score por debajo de 7. También útil en zapas muy reactivas (GT Cut) para reducir el impacto en sesiones largas.</p>
<p><strong>Precio:</strong> ~18€ · <a href="https://www.amazon.es/s?k=sof+sole+athlete+full+length+plantillas&tag=canchazapa-21" target="_blank" rel="noopener noreferrer sponsored">Ver en Amazon →</a></p>

<h3>Bauerfeind Sports Basketball — la médica</h3>
<p>Bauerfeind es una empresa alemana especializada en productos ortopédicos y de rehabilitación. Sus plantillas deportivas tienen un nivel de soporte que supera las opciones de consumo estándar: metatarsal pad integrado, soporte de talón con cápsula de gel, y compresión de arco dinámica.</p>
<p><strong>Para quién:</strong> jugadores con historial de esguinces de tobillo, tendinitis, fascitis plantar, o que se recuperan de lesiones en el pie o la rodilla.</p>
<p><strong>No para quién:</strong> jugadores sin problemas específicos — el coste de 45€ no se justifica si no tienes una necesidad clara.</p>
<p><strong>Precio:</strong> ~45€ · <a href="https://www.amazon.es/s?k=bauerfeind+sports+plantillas+baloncesto&tag=canchazapa-21" target="_blank" rel="noopener noreferrer sponsored">Ver en Amazon →</a></p>

<h3>Currex SupportST — el equilibrio</h3>
<p>Currex diseña sus plantillas con perfiles de arco bajo, medio y alto — elige según tu tipo de arco. El sistema SupportST tiene una capa de amortiguación dinámica que se activa con el impacto (no es espuma pasiva) y una cubierta de tejido transpirable. Muy popular entre jugadores con pie neutro-bajo que quieren soporte sin rigidez.</p>
<p><strong>Para quién:</strong> jugadores con arco bajo o neutro que quieren soporte sin la rigidez de la Superfeet. Buena opción si la Green te resulta demasiado rígida.</p>
<p><strong>Precio:</strong> ~40€ · <a href="https://www.amazon.es/s?k=currex+supportst+plantillas+deporte&tag=canchazapa-21" target="_blank" rel="noopener noreferrer sponsored">Ver en Amazon →</a></p>

<h2>Cómo elegir la tuya</h2>
<div style="background:var(--cz-card2);border:1px solid var(--cz-fg6);border-radius:4px;padding:20px 24px;margin:24px 0">
  <ul style="margin:0;padding:0 0 0 16px;color:var(--cz-fg3);font-size:14px;line-height:2">
    <li><strong style="color:#e4e4e7">Pie plano o pronación</strong> → Superfeet Green</li>
    <li><strong style="color:#e4e4e7">Zapatilla retro o barata</strong> → Sof Sole Athlete</li>
    <li><strong style="color:#e4e4e7">Historial de lesiones tobillo/rodilla</strong> → Bauerfeind Sports</li>
    <li><strong style="color:#e4e4e7">Pie neutro, quieres algo entre rigidez y flexibilidad</strong> → Currex SupportST</li>
    <li><strong style="color:#e4e4e7">Zapatilla premium moderna (LeBron, AE 2, Curry 13)</strong> → No necesitas plantilla</li>
  </ul>
</div>

<h2>¿Afecta la plantilla al ajuste de la zapatilla?</h2>
<p>Sí. Si añades una plantilla gruesa (Sof Sole, Superfeet), el pie sube dentro de la zapatilla y puede apretar más el empeine. Lo más seguro: retira la plantilla de fábrica antes de poner la nueva. Si la plantilla de fábrica es muy fina o de espuma básica (el caso de los retros), puedes sacarla sin problema. En zapas premium, la plantilla puede estar integrada y no ser extraíble — en ese caso, no añadas otra encima.</p>

<p class="art-outro">En cada ficha de zapatilla de CANCHA.ZAPA encontrarás la plantilla recomendada para ese modelo específico en la sección "Combina con →". Para los calcetines técnicos, consulta también la <a href="/blog/mejores-calcetines-baloncesto">guía de calcetines</a>.</p>
    `,
  },

  // ── 30. Adidas Crazy 8 / Kobe Bryant ────────────────────────────────
  {
    slug: "adidas-crazy-8-kobe-bryant",
    title: "Las zapatillas de Kobe Bryant con Adidas: la era KB8 (1996-2002)",
    metaTitle: "Adidas Crazy 8 Kobe Bryant: historia y análisis de la KB8 | CANCHA.ZAPA",
    description: "La historia de Kobe Bryant con Adidas, la era KB8 y por qué la Crazy 8 sigue siendo una de las zapatillas retro más buscadas del baloncesto.",
    fecha: "2026-05-28",
    fechaLabel: "28 mayo 2026",
    categoria: "Análisis",
    readMinutes: 6,
    eyebrow: "🏅 Retro · Análisis · CANCHA.ZAPA",
    heroTitle: "Kobe Bryant y Adidas",
    heroSubtitle: "La era KB8 (1996-2002) · Historia de las Crazy 8",
    author: "Editorial CANCHA.ZAPA",
    imagen: "/shoes/adidas-crazy-8.webp",
    relatedShoes: ["adidas-crazy-8"],
    relatedSeoPages: ["mejores-zapatillas-adidas", "zapatillas-baloncesto-retro"],
    body: `
<p class="art-intro">Antes de ser una leyenda de Nike, Kobe Bryant fue el fichaje más ambicioso de Adidas. Durante seis años, la marca alemana apostó por el joven de Lower Merion como su respuesta a Michael Jordan. Lo que siguió fue uno de los capítulos más interesantes — y mal documentados — de la historia del calzado de baloncesto.</p>

<h2>El fichaje que cambió la industria</h2>
<p>En 1996, Kobe Bryant tenía 17 años, había sido seleccionado en el puesto 13 del Draft por los Charlotte Hornets (y enviado inmediatamente a Los Ángeles), y Adidas le ofreció 48 millones de dólares por seis años. Era el contrato más alto jamás firmado por un jugador sin un solo minuto en la NBA.</p>
<p>Adidas apostaba por el futuro. La premisa era simple: Jordan era Nike, Kobe sería Adidas. El problema era que Jordan llevaba una década de ventaja y una mitología que ningún contrato podía comprar de la noche a la mañana.</p>

<h2>KB8 I — El comienzo (1997)</h2>
<p>La primera zapatilla signature de Kobe con Adidas se lanzó en 1997 como la <strong>KB8 I</strong> (el "8" era el número de Kobe en esa época). Fue un diseño audaz para su tiempo: upper de cuero y malla, mediasuela de Adiprene con amortiguación visible en el talón, y una suela de herringbone que ofrecía tracción sólida en interior.</p>
<p>Las ventas fueron correctas. No fue el bombazo esperado, pero Kobe estaba ganando sus primeros campeonatos y la zapatilla ganaba visibilidad orgánica. El verdadero problema era la imagen: Adidas era percibida como la marca del pasado, la de los Superstars y los tres rayas de los 80. Competir con el swoosh era casi imposible en términos culturales.</p>

<h2>KB8 II — La Crazy 8 (1998)</h2>
<p>La segunda iteración, la <strong>KB8 II</strong> — comercializada hoy como <strong>Crazy 8</strong> en los retros — es la más icónica de la era. Diseño más limpio, peso reducido, mismo herringbone agresivo, y una paleta de colores que aprovechaba el morado y dorado de los Lakers.</p>
<p>La Crazy 8 tuvo un momento cultural importante: Kobe Bryant la llevaba cuando ganó el Slam Dunk Contest en el All-Star de 1997 con 18 años, la noche que muchos ven como el primer gran anuncio al mundo de lo que vendría.</p>

<div style="background:var(--cz-card2);border:1px solid var(--cz-fg6);border-radius:4px;padding:20px 24px;margin:24px 0">
  <p style="margin:0 0 12px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;color: var(--cz-accent-text)">Ficha técnica — Adidas Crazy 8 (KB8 II)</p>
  <ul style="margin:0;padding:0 0 0 16px;color:var(--cz-fg3);font-size:14px;line-height:1.8">
    <li><strong style="color:#e4e4e7">Tecnología:</strong> Adiprene cushion · Herringbone outsole</li>
    <li><strong style="color:#e4e4e7">Altura:</strong> Mid-top</li>
    <li><strong style="color:#e4e4e7">Lanzamiento original:</strong> 1998</li>
    <li><strong style="color:#e4e4e7">Precio retro actual:</strong> desde {{precio:adidas-crazy-8}}</li>
    <li><strong style="color:#e4e4e7">Score jugabilidad:</strong> {{score:adidas-crazy-8}} (interior)</li>
  </ul>
</div>

<h2>KB8 III — La Crazy 1 (1999)</h2>
<p>La tercera generación fue donde Adidas decidió arriesgarlo todo en términos de diseño. La <strong>KB8 III</strong> — conocida hoy como <strong>Crazy 1</strong> — tenía un upper con forma de hoz, como un espolón que envolvía el tobillo. El diseñador fue Yohji Yamamoto. Era totalmente inusual para la época.</p>
<p>El mercado reaccionó con confusión. Kobe la llevó, pero fue demasiado vanguardista para las masas. Hoy es la más cara de toda la era en el mercado secundario — precisamente por lo polarizante de su diseño.</p>

<h2>Por qué Kobe se fue a Nike</h2>
<p>En 2002, el contrato con Adidas expiró y Kobe no renovó. Las razones exactas nunca se confirmaron oficialmente, pero la narrativa era clara: Kobe quería más control sobre el diseño, más marketing enfocado en él, y sentía que Adidas no había dado el salto cultural necesario para competir con Jordan Brand.</p>
<p>Nike firmó a Kobe en 2003 y el resto es historia. La línea Nike Kobe se convirtió en una de las más técnicamente avanzadas de la historia — low-top, perfil ultraligero, Zoom Air reactivo. Todo lo contrario del enfoque más clásico de Adidas.</p>

<h2>¿Merecen la pena las Crazy 8 hoy para jugar?</h2>
<p>La respuesta honesta: depende. El herringbone outsole de la Crazy 8 sigue siendo uno de los mejores patrones de tracción jamás diseñados — funciona perfectamente en parqué interior limpio. El cushion de Adiprene es modesto comparado con espumas modernas, pero más que suficiente para sesiones recreativas.</p>
<p>Lo que no tiene sentido es comprarlas esperando el rendimiento de una AE 2 o una GT Cut. Son zapatillas retro con tecnología de 1998. La propuesta correcta es: si te gusta el estilo, si eres fan de la era Kobe-Adidas, o si simplemente quieres algo distinto en pista, son una opción válida. Para rendimiento puro, mira el catálogo moderno.</p>

<p class="art-outro">¿Quieres comparar las Crazy 8 con las mejores zapatillas actuales? El <a href="/rankings">ranking de CANCHA.ZAPA</a> incluye la pestaña Retro para que veas exactamente dónde se posicionan frente a los clásicos de la era.</p>
    `,
  },

  // ── 29. FILA Grant Hill 1 ────────────────────────────────────────────
  {
    slug: "fila-grant-hill-zapatilla-que-casi-destrona-jordan",
    title: "FILA Grant Hill 1: la zapatilla que casi destrona a Jordan en 1995",
    metaTitle: "FILA Grant Hill 1 (1995): la zapatilla que venció a Jordan en ventas | CANCHA.ZAPA",
    description: "En 1995, la FILA Grant Hill 1 fue la zapatilla más vendida de la NBA, superando al Air Jordan. La historia del jugador y la marca que casi destronan a Michael Jordan.",
    fecha: "2026-05-28",
    fechaLabel: "28 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "🏅 Retro · Análisis · CANCHA.ZAPA",
    heroTitle: "FILA Grant Hill 1",
    heroSubtitle: "La zapatilla más vendida de 1995 · La amenaza real a Jordan",
    author: "Editorial CANCHA.ZAPA",
    imagen: "/shoes/fila-grant-hill-1.webp",
    relatedShoes: ["fila-grant-hill-1"],
    relatedSeoPages: ["mejores-zapatillas-fila", "zapatillas-baloncesto-retro"],
    body: `
<p class="art-intro">En 1995 había un jugador en la NBA que recibió más votos de los aficionados para el All-Star Game que Michael Jordan. En 1995 había una zapatilla de baloncesto que vendió más que el Air Jordan. Ese jugador era Grant Hill. Esa zapatilla era la FILA Grant Hill 1. Esta es la historia que casi nadie recuerda.</p>

<h2>Grant Hill: el heredero que no llegó a serlo</h2>
<p>Cuando Grant Hill llegó a los Detroit Pistons en 1994 como cuarta selección del Draft, la prensa ya lo había bautizado: el sucesor de Michael Jordan. No era solo hype. Hill era el jugador más completo de su generación: 1.98m, elegante, capaz de jugar todas las posiciones del 1 al 4, con un CI baloncestístico extraordinario y una imagen pública impecable — Duke, hijo de un jugador de la NFL, perfectamente articulado.</p>
<p>En su primera temporada, los aficionados le votaron al All-Star Game con <strong>1.289.583 votos</strong>, por delante de Michael Jordan (1.054.844). No era un error estadístico — era la señal de que alguien había encontrado la grieta en la armadura de Jordan.</p>

<h2>Por qué FILA en lugar de Nike o Adidas</h2>
<p>Hill firmó con FILA antes de su temporada rookie. En ese momento, FILA era una marca italiana con fuerte presencia en tenis (Monica Seles, Björn Borg) pero marginal en baloncesto. La apuesta fue enorme para ambas partes.</p>
<p>El contrato le dio a Hill control significativo sobre el diseño y el marketing. Quería una zapatilla que reflejara su juego: técnica, limpia, sin excesos. La FILA Grant Hill 1 fue el resultado.</p>

<h2>La Grant Hill 1: técnica e historia</h2>
<p>Lanzada en 1995, la Grant Hill 1 tenía todo lo que un jugador de su perfil necesitaba:</p>
<ul>
  <li><strong>Upper de cuero genuino de alta calidad</strong> — uno de los mejores de la época</li>
  <li><strong>Alta caña</strong> para soporte de tobillo máximo (Hill tenía ya antecedentes de problemas)</li>
  <li><strong>Herringbone outsole</strong> con tracción excepcional en interior</li>
  <li><strong>FILA foam midsole</strong> — cushion sólido para la tecnología de 1995</li>
</ul>
<p>El resultado: la zapatilla más vendida de la NBA en la temporada 1994-95. Por encima del Air Jordan. El dato se menciona poco en la historia oficial del calzado deportivo, pero es verificable.</p>

<div style="background:var(--cz-card2);border:1px solid var(--cz-fg6);border-radius:4px;padding:20px 24px;margin:24px 0">
  <p style="margin:0 0 12px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;color: var(--cz-accent-text)">Ficha técnica — FILA Grant Hill 1 (1995)</p>
  <ul style="margin:0;padding:0 0 0 16px;color:var(--cz-fg3);font-size:14px;line-height:1.8">
    <li><strong style="color:#e4e4e7">Tecnología:</strong> FILA foam · Cuero premium · Herringbone</li>
    <li><strong style="color:#e4e4e7">Altura:</strong> High-top</li>
    <li><strong style="color:#e4e4e7">Lanzamiento:</strong> 1995</li>
    <li><strong style="color:#e4e4e7">Precio retro actual:</strong> desde {{precio:fila-grant-hill-1}}</li>
    <li><strong style="color:#e4e4e7">Score jugabilidad:</strong> {{score:fila-grant-hill-1}} (interior)</li>
  </ul>
</div>

<h2>El tobillo que lo cambió todo</h2>
<p>Grant Hill parecía destinado a dominar la NBA durante una década. Lo que nadie podía prever era lo que ocurriría en el año 2000: una grave lesión de tobillo (estafilococo que requirió múltiples cirugías) que le robó prácticamente cinco temporadas y afectó permanentemente a su explosividad.</p>
<p>Cuando regresó con los Phoenix Suns en 2007, seguía siendo un buen jugador — inteligente, útil, profesional — pero ya no era "el sucesor de Jordan". La ventana se había cerrado.</p>

<h2>FILA: la historia de la marca que pudo ser</h2>
<p>Tras Grant Hill, FILA no encontró otro jugador con ese nivel de impacto cultural. La marca fue perdiendo terreno en baloncesto performance y se reorientó hacia el lifestyle. Hoy, FILA tiene una presencia muy limitada en el baloncesto de alto rendimiento.</p>
<p>Lo que sí tiene FILA es una de las siluetas retro más puras del mercado. La Grant Hill 1 reedición mantiene el cuero, el alto del caño y el herringbone. Para coleccionistas y aficionados a la historia del baloncesto de los 90, es una adquisición que tiene sentido. Para rendimiento moderno, el mercado ha pasado por delante.</p>

<h2>¿Vale la pena para jugar hoy?</h2>
<p>La Grant Hill 1 retro sirve perfectamente para baloncesto recreativo en interior. La tracción herringbone es todavía competitiva en parqué limpio, el soporte de tobillo del caño alto es real, y el cuero aguanta bien. No esperes la respuesta de una zapatilla moderna con Zoom Air o Lightstrike Pro — el cushion es básico para los estándares actuales.</p>
<p>La propuesta correcta: si la historia te importa y juegas de forma casual, la Grant Hill 1 es una pieza con narrativa real. Si juegas 3+ veces por semana a nivel federado, mira las opciones técnicas de 2025.</p>

<p class="art-outro">¿Quieres explorar todas las opciones retro que todavía son jugables? <a href="/zapatillas-baloncesto-retro">La guía de retros de CANCHA.ZAPA</a> analiza 30 clásicos con puntuaciones técnicas actualizadas.</p>
    `,
  },

  // ── 30. Nike Shox BB4 ────────────────────────────────────────────────
  {
    slug: "nike-shox-bb4-vince-carter-sydney-2000",
    title: "Nike Shox BB4: el dunk imposible de Vince Carter en Sydney 2000",
    metaTitle: "Nike Shox BB4: Vince Carter y el dunk más famoso de la historia | CANCHA.ZAPA",
    description: "La Nike Shox BB4 de Vince Carter y el dunk entre las piernas de Frédéric Weis en los JJ.OO. de Sydney 2000. Historia, tecnología Shox y por qué el BB4 sigue siendo un ícono.",
    fecha: "2026-05-28",
    fechaLabel: "28 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "🏅 Retro · Análisis · CANCHA.ZAPA",
    heroTitle: "Nike Shox BB4",
    heroSubtitle: "Sydney 2000 · El dunk entre las piernas de Vince Carter",
    author: "Editorial CANCHA.ZAPA",
    imagen: "/shoes/nike-shox-bb4.webp",
    relatedShoes: ["nike-shox-bb4"],
    relatedSeoPages: ["zapatillas-baloncesto-retro", "mejores-zapatillas-nike"],
    body: `
<p class="art-intro">El 25 de septiembre de 2000, en los Juegos Olímpicos de Sydney, Vince Carter recibió un pase en el lado izquierdo del poste, cogió impulso, y se metió literalmente entre las piernas de Frédéric Weis, un pivot francés de 2.18 metros, para ejecutar lo que muchos consideran el dunk más imposible de la historia. Las zapatillas que llevaba eran las Nike Shox BB4.</p>

<h2>Vince Carter en el año 2000</h2>
<p>El año 2000 fue el apogeo de Vince Carter. En febrero, ganó el Slam Dunk Contest del All-Star en Oakland con una actuación que todavía se cita como la mejor de la historia — 360° entre piernas, el "elbow in the rim", cada mate perfectamente ejecutado. En septiembre, hizo ese mate en Sydney. Era el jugador más explosivo y espectacular del planeta.</p>
<p>Y todo ese año lo hizo con las Nike Shox BB4 en los pies.</p>

<h2>La tecnología Shox: columnas de elastómero</h2>
<p>La Nike Shox fue un concepto radical cuando apareció en 2000. En lugar de espuma convencional, el sistema Shox usaba <strong>columnas de elastómero</strong> en el talón — cilindros de goma sintética que comprimían bajo el impacto y rebotaban. La idea era crear un efecto de resorte mecánico que la espuma sola no podía replicar.</p>
<p>El resultado en la práctica era una sensación de aterrizaje completamente diferente a cualquier zapatilla anterior. Muy firme al principio, luego un rebote marcado. Polarizante: o te encantaba o te incomodaba. Carter claramente la necesitaba para el tipo de aterrizajes que ejecutaba.</p>

<div style="background:var(--cz-card2);border:1px solid var(--cz-fg6);border-radius:4px;padding:20px 24px;margin:24px 0">
  <p style="margin:0 0 12px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;color: var(--cz-accent-text)">Ficha técnica — Nike Shox BB4 (2000)</p>
  <ul style="margin:0;padding:0 0 0 16px;color:var(--cz-fg3);font-size:14px;line-height:1.8">
    <li><strong style="color:#e4e4e7">Tecnología:</strong> Nike Shox (columnas elastómero) · Herringbone outsole</li>
    <li><strong style="color:#e4e4e7">Lanzamiento:</strong> 2000</li>
    <li><strong style="color:#e4e4e7">Precio retro actual:</strong> desde {{precio:nike-shox-bb4}}</li>
    <li><strong style="color:#e4e4e7">Score jugabilidad:</strong> {{score:nike-shox-bb4}} (interior)</li>
  </ul>
</div>

<h2>El dunk que inmortalizó la zapatilla</h2>
<p>La secuencia fue así: Estados Unidos jugaba contra Francia en cuartos de final. Carter recibe en penetración, Frédéric Weis — el pivot del Real Madrid en esa época — sale a bloquear. Carter no esquiva al jugador. Carter salta sobre él. Sus piernas pasan a ambos lados de la cabeza de Weis, el balón baja por el aro, y Carter aterriza al otro lado.</p>
<p>Los franceses lo llaman "le dunk de la mort" — el dunk de la muerte. Para el espectador neutral es simplemente lo más imposible que alguien ha hecho en una pista de baloncesto. Y esa imagen, reproducida millones de veces, tiene de fondo la silueta inconfundible de las Shox BB4.</p>

<h2>Por qué Shox no se quedó</h2>
<p>La tecnología Shox tuvo su momento — Jordan Brand la adoptó brevemente, Vince Carter la llevó, y Nike la extendió a running. Pero tenía un problema fundamental: con el uso, las columnas de elastómero se degradaban de forma desigual, creando una sensación de inestabilidad lateral que las espumas convencionales no sufrían.</p>
<p>Nike discontinuó la tecnología Shox en basketball en 2010, aunque mantiene reediciones retro de las silhouettes más icónicas. Las columnas Shox en los retros actuales son principalmente cosméticas — la función real la hace una entresuela de espuma convencional.</p>

<h2>¿Merece la pena para jugar hoy?</h2>
<p>Las Shox BB4 retro en 2025 son una zapatilla de interior con tracción herringbone funcional y un cushion que, en versión retro, ya no depende exclusivamente de las columnas. Para juego recreativo en parqué limpio, funcionan. Para alto rendimiento o exterior, no son la elección correcta.</p>
<p>El valor real de las BB4 es narrativo: cada vez que las llevas a pista, estás llevando la zapatilla del mate más imposible de la historia.</p>

<p class="art-outro">¿Quieres explorar todos los retros jugables de nuestra base de datos? Visita el <a href="/rankings">ranking Retro de CANCHA.ZAPA</a> — 30 clásicos evaluados con puntuaciones técnicas actualizadas para 2025.</p>
    `,
  },
  // ── 33. Calcetines cortos, medios o largos ───────────────────────────
  {
    slug: "calcetines-baloncesto-cortos-medios-o-largos",
    title: "Calcetines de baloncesto: ¿cortos, medios o largos? Guía definitiva 2025",
    metaTitle: "Calcetines baloncesto cortos, medios o largos — ¿cuál elegir? | CANCHA.ZAPA",
    description: "¿Calcetines de baloncesto cortos, medios o largos? Descubre qué altura elegir según tu zapatilla, posición y estilo de juego. Guía con recomendaciones concretas.",
    fecha: "2026-05-28",
    fechaLabel: "28 mayo 2026",
    categoria: "Guías",
    readMinutes: 4,
    eyebrow: "★ Guía de accesorios · CANCHA.ZAPA",
    heroTitle: "Calcetines de baloncesto",
    heroSubtitle: "¿Cortos, medios o largos? — guía definitiva",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-kobe-4-protro", "nike-ja-3", "air-jordan-11", "ua-curry-13"],
    relatedSeoPages: ["calcetines-baloncesto", "zapatillas-baloncesto-para-tobillos"],
    body: `
<p class="art-intro">La altura del calcetín no es solo estética. Afecta al ajuste dentro de la zapatilla, a la fricción, al soporte del tobillo y a cómo responde tu pie durante un cambio de dirección brusco. La buena noticia: la elección correcta es más sencilla de lo que parece.</p>

<h2>Los tres tipos de altura</h2>
<p>En baloncesto existen tres alturas principales. Cada una tiene un uso diferente y ninguna es universalmente mejor — depende de tu zapatilla y tu estilo:</p>

<div style="background:var(--cz-card2);border:1px solid var(--cz-fg6);border-radius:4px;padding:20px 24px;margin:24px 0">
  <div style="display:grid;gap:16px">
    <div>
      <p style="margin:0 0 4px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color: var(--cz-accent-text)">CORTO — Ankle / No-Show</p>
      <p style="margin:0;color:var(--cz-fg3);font-size:14px;line-height:1.7">Termina al nivel o por debajo del tobillo. Máximo court feel — sientes cada movimiento del pie dentro de la zapatilla. El preferido de los bases explosivos que usan low-tops. <strong style="color:#e4e4e7">Ejemplo:</strong> Nike Elite No-Show (~12€).</p>
    </div>
    <div>
      <p style="margin:0 0 4px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color: var(--cz-accent-text)">MEDIO — Crew / Mid-Calf</p>
      <p style="margin:0;color:var(--cz-fg3);font-size:14px;line-height:1.7">Llega a la mitad de la pantorrilla. El más popular en pista — equilibrio entre soporte, comodidad y protección ante abrasión. Funciona con mid-top y high-top. <strong style="color:#e4e4e7">Ejemplo:</strong> UA Playmaker Mid Crew (~12€).</p>
    </div>
    <div>
      <p style="margin:0 0 4px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color: var(--cz-accent-text)">LARGO — Over-the-Calf / Knee</p>
      <p style="margin:0;color:var(--cz-fg3);font-size:14px;line-height:1.7">Llega hasta debajo de la rodilla. Look NBA clásico de los 80-90. Añade compresión en pantorrilla — beneficioso para jugadores con historial de esguinces o que prefieren el soporte adicional. <strong style="color:#e4e4e7">Ejemplo:</strong> Stance NBA Over-the-Calf (~16€).</p>
    </div>
  </div>
</div>

<h2>¿Qué altura va con cada zapatilla?</h2>
<p>La regla general es sencilla: la altura del calcetín no debería superar la caña de la zapatilla. Con un low-top, un calcetín largo queda raro y puede generar puntos de presión. Con un high-top, un calcetín corto deja espacio sin soporte entre el calcetín y el borde de la bota.</p>

<ul>
  <li><strong>Low-top</strong> (Kobe 4/5/6, Ja 3, GT Cut 4): calcetín <strong>corto o medio</strong>.</li>
  <li><strong>Mid-top</strong> (Curry 13, Puma MB.04, GT Hustle 3): calcetín <strong>medio</strong> — el más natural.</li>
  <li><strong>High-top</strong> (sobre todo retros, como la Air Jordan 1 o la Reebok Shaq Attaq): calcetín <strong>medio o largo</strong>.</li>
</ul>

<h2>El factor posición</h2>
<p>La posición en pista también influye. Los bases y escoltas acostumbran a preferir calcetines cortos o medios — priman la movilidad y el court feel. Los pívots y ala-pívots, que absorben más impactos verticales, suelen ir con medio o largo para la compresión extra en pantorrilla.</p>
<p>Los aleros son el grupo más variado: depende de si priorizan explosividad lateral (corto) o soporte en drives al aro (medio/largo).</p>

<h2>¿Importa la marca?</h2>
<p>La altura es lo primero. La marca viene después. Dicho esto, no todos los calcetines del mismo precio rinden igual:</p>
<ul>
  <li><strong>Nike Elite</strong> (todas las alturas): el estándar en NBA, buena amortiguación en talón y antepié, talla fiel.</li>
  <li><strong>Under Armour Playmaker</strong> (medio): grip interno excelente, no se mueve dentro de la zapatilla.</li>
  <li><strong>Stance NBA</strong> (largo): la opción premium de la liga, hilo Royale con mayor durabilidad.</li>
  <li><strong>Kiprun Decathlon</strong> (medio): la opción económica — 6€ que rinden mejor que cualquier calcetín de algodón.</li>
</ul>

<h2>Un apunte sobre el grosor</h2>
<p>Separado de la altura, el grosor del calcetín afecta al ajuste. Si tu zapatilla queda justa, un calcetín más grueso (cushioned) puede causar rozaduras. Si queda con holgura, un calcetín más grueso puede mejorar el ajuste. La mayoría de los Nike Elite cushioned están calculados para ser el estándar — con uno de esos, el ajuste que probaste en tienda es el ajuste que tendrás en pista.</p>

<p class="art-outro">En cada ficha de zapatilla de CANCHA.ZAPA encontrarás el calcetín recomendado por altura en la sección "Combina con →". Puedes ver todas las opciones en nuestra <a href="/calcetines-baloncesto">guía de calcetines de baloncesto</a> o comparar zapatillas por altura en el <a href="/comparar">comparador</a>.</p>
    `,
  },

  // ── 37. Cómo limpiar y cuidar zapatillas ────────────────────────────
  {
    slug: "como-limpiar-cuidar-zapatillas-baloncesto",
    title: "Cómo limpiar y cuidar tus zapatillas de baloncesto (sin cargártelas)",
    metaTitle: "Cómo limpiar zapatillas de baloncesto: guía paso a paso | CANCHA.ZAPA",
    description:
      "Cómo limpiar, secar y guardar tus zapatillas de baloncesto para que la tracción y la espuma duren más. Errores que cargan la suela y la mediasuela.",
    fecha: "2026-05-30",
    fechaLabel: "30 mayo 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía de mantenimiento · CANCHA.ZAPA",
    heroTitle: "Cómo limpiar y cuidar tus zapatillas",
    heroSubtitle: "Que la tracción y la espuma duren más · Sin mitos",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "adidas-ae-2", "ua-curry-13", "jordan-tatum-4"],
    relatedSeoPages: ["zapatillas-outdoor", "zapatillas-baloncesto-baratas"],
    body: `
<p class="art-intro">Una zapatilla de baloncesto se juega, no se exhibe. Pero unos cuidados básicos marcan la diferencia entre que la tracción te dure una temporada o dos, y entre una mediasuela que aguanta o una que se descompone antes de tiempo. Aquí va lo que sí importa y lo que es mito.</p>

<h2>La regla número uno: la suela limpia es tracción</h2>
<p>El 90% de los resbalones en pista no son culpa de la zapatilla, son culpa del polvo. La goma agarra por contacto directo con el suelo; una capa fina de polvo actúa como rodamientos. Por eso los profesionales se tocan la suela constantemente.</p>
<ul>
  <li><strong>En pista:</strong> pásate la mano húmeda o una toallita por la suela cada pocos minutos. Recupera el grip al instante.</li>
  <li><strong>En casa:</strong> cepillo de cerdas blandas + agua tibia sobre el patrón de la suela. Quita el polvo incrustado en el herringbone.</li>
  <li><strong>Outdoor:</strong> si juegas en asfalto, límpiala más a menudo — la arenilla además desgasta la goma.</li>
</ul>

<h2>Cómo limpiar el upper según el material</h2>
<h3>Mesh y tejidos (knit)</h3>
<p>Lo más común hoy. Paño húmedo con un poco de jabón neutro, movimientos suaves, y secar con un trapo. Nada de meterlas en la lavadora: el centrifugado deforma la horma y puede despegar la mediasuela.</p>
<h3>Sintético / TPU</h3>
<p>Aguanta más. Paño húmedo y listo. Para manchas, un cepillo de dientes viejo con agua jabonosa.</p>
<h3>Cuero y nubuck (retros)</h3>
<p>Aquí cuidado: nada de empapar. Paño apenas húmedo y, si es nubuck, cepillo específico en seco. El exceso de agua mancha el cuero para siempre.</p>

<h2>El secado: donde se cargan más zapatillas</h2>
<p>El calor es el enemigo número uno de la espuma. La mayoría de mediasuelas modernas (EVA, Boost, Nitro, espumas supercríticas) pierden propiedades con el calor directo.</p>
<ul>
  <li><strong>NUNCA</strong> las pongas al sol directo, sobre un radiador ni con secador. La espuma se reseca, amarillea y pierde rebote.</li>
  <li>Sécalas a la sombra, a temperatura ambiente, con papel de periódico dentro para absorber humedad y mantener la forma.</li>
  <li>Si están empapadas, saca la plantilla y los cordones para que aireen por dentro.</li>
</ul>

<h2>Guardado y rotación</h2>
<p>La espuma necesita "descomprimirse" entre sesiones. Si juegas a diario, tener dos pares y alternarlos no es lujo: alarga la vida de ambos porque la mediasuela recupera su altura entre usos. Guárdalas en sitio fresco y seco, nunca en una bolsa cerrada y húmeda (criadero de hongos y de olor).</p>

<h2>Mitos que puedes ignorar</h2>
<ul>
  <li><strong>"Cremas y sprays milagro":</strong> para una zapatilla de rendimiento no aportan nada. Agua, jabón neutro y un cepillo bastan.</li>
  <li><strong>"Congelarlas para el olor":</strong> el frío no mata las bacterias del olor. Lo que funciona es secarlas bien y airearlas.</li>
  <li><strong>"Arroz para secarlas":</strong> sirve para el móvil, no para una zapatilla. Papel de periódico es más eficaz.</li>
</ul>

<p class="art-outro">Cuidar la zapatilla es la mitad; la otra mitad es saber <a href="/blog/cada-cuanto-cambiar-zapatillas-baloncesto">cuándo toca cambiarla</a>. Y si buscas un modelo nuevo, filtra por lo que necesitas en el <a href="/zapatillas">catálogo</a> o compáralas en el <a href="/comparar">comparador</a>.</p>
    `,
  },

  // ── 38. Cada cuánto cambiar zapatillas ──────────────────────────────
  {
    slug: "cada-cuanto-cambiar-zapatillas-baloncesto",
    title: "¿Cada cuánto hay que cambiar las zapatillas de baloncesto?",
    metaTitle: "¿Cada cuánto cambiar zapatillas de baloncesto? Señales claras | CANCHA.ZAPA",
    description:
      "Cuánto duran las zapatillas de baloncesto, las señales de que toca cambiarlas y por qué jugar con la mediasuela muerta es jugar lesionado.",
    fecha: "2026-05-30",
    fechaLabel: "30 mayo 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía editorial · CANCHA.ZAPA",
    heroTitle: "¿Cada cuánto cambiar las zapatillas?",
    heroSubtitle: "Señales claras de que la mediasuela está muerta",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-lebron-23", "ua-curry-13", "nike-gt-cut-4", "adidas-ae-2"],
    relatedSeoPages: ["zapatillas-baloncesto-para-rodillas", "zapatillas-baloncesto-baratas"],
    body: `
<p class="art-intro">No hay un número mágico de meses, pero sí hay señales objetivas. La clave no es cómo se ven por fuera — es lo que ha pasado con la mediasuela y la tracción por dentro. Jugar con una zapatilla "muerta" es la forma más tonta de acabar con dolor de rodillas o un tobillo torcido.</p>

<h2>La cifra de referencia: horas, no meses</h2>
<p>Una mediasuela de rendimiento aguanta de media entre <strong>80 y 120 horas de juego intenso</strong> antes de perder buena parte de su capacidad de absorber impactos. Traducido:</p>
<ul>
  <li><strong>Si juegas 2-3 veces por semana:</strong> piensa en cambiarlas cada 8-12 meses.</li>
  <li><strong>Si juegas a diario o compites:</strong> pueden quedarse cortas en 4-6 meses.</li>
  <li><strong>Outdoor:</strong> el asfalto desgasta la suela mucho antes que el impacto mate la espuma — ahí manda la tracción.</li>
</ul>
<p>Por eso tener dos pares en rotación no solo es más cómodo: reparte las horas y retrasa el momento de tirar dinero.</p>

<h2>Las 5 señales de que toca cambiar</h2>
<h3>1. La tracción ya no agarra (y la suela está limpia)</h3>
<p>Si has limpiado bien la suela y aún resbalas, el patrón está liso por desgaste. En outdoor es lo primero que muere.</p>
<h3>2. Sientes el suelo "duro"</h3>
<p>Cuando la espuma se compacta, dejas de notar el colchón en los aterrizajes. Si al caer notas el impacto seco en las articulaciones, la mediasuela ya no protege.</p>
<h3>3. Arrugas profundas en la mediasuela</h3>
<p>Líneas marcadas y permanentes en la espuma (creasing) indican que ha perdido densidad. No vuelven.</p>
<h3>4. El upper ya no sujeta</h3>
<p>Si el pie se desliza dentro de la zapatilla en los cambios de dirección aunque aprietes los cordones, el soporte lateral está vencido — riesgo directo de torcedura.</p>
<h3>5. Dolores nuevos sin cambiar nada más</h3>
<p>Molestias nuevas en rodillas, fascia o tobillos sin otra explicación suelen ser la zapatilla pidiendo el relevo.</p>

<h2>Por qué no merece la pena estirarlas</h2>
<p>Una zapatilla de 120&euro; "muerta" no te ahorra dinero: te lo cuesta en fisioterapia. La amortiguación es, literalmente, lo que separa tus articulaciones del suelo. Cuando se va, se va — y ninguna plantilla nueva recupera una mediasuela compactada.</p>

<p class="art-outro">Si notas varias de estas señales, es momento de buscar relevo. Filtra por amortiguación y soporte en el <a href="/zapatillas">catálogo</a>, mira las mejores en <a href="/rankings">rankings</a>, o repasa antes <a href="/blog/como-limpiar-cuidar-zapatillas-baloncesto">cómo cuidarlas</a> para que las próximas duren más.</p>
    `,
  },

  // ── 39. Baloncesto vs running ───────────────────────────────────────
  {
    slug: "zapatillas-baloncesto-vs-running",
    title: "Zapatillas de baloncesto vs running: ¿puedo usar unas por otras?",
    metaTitle: "Zapatillas de baloncesto vs running: ¿sirven? | CANCHA.ZAPA",
    description:
      "Por qué no debes jugar al baloncesto con zapatillas de running (ni correr con las de basket). Las diferencias reales en suela, soporte y riesgo de lesión.",
    fecha: "2026-05-30",
    fechaLabel: "30 mayo 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía editorial · CANCHA.ZAPA",
    heroTitle: "Baloncesto vs running",
    heroSubtitle: "¿Puedo usar unas por otras? La respuesta corta: no",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "adidas-ae-2", "nike-precision-7", "ua-curry-13"],
    relatedSeoPages: ["zapatillas-baloncesto-baratas", "zapatillas-outdoor"],
    body: `
<p class="art-intro">Es una de las preguntas más repetidas, sobre todo a la hora de ahorrar: "tengo unas de running buenas, ¿me valen para jugar?". La respuesta honesta es no, y no es por venderte otra zapatilla — es por cómo está diseñada cada una y por tu integridad física.</p>

<h2>Movimientos opuestos, diseños opuestos</h2>
<p>Correr es un movimiento lineal y repetitivo hacia delante. El baloncesto es lo contrario: arrancadas, frenadas, saltos y, sobre todo, <strong>movimiento lateral</strong> constante. Cada zapatilla está construida para su patrón.</p>

<h3>La suela</h3>
<ul>
  <li><strong>Running:</strong> suela pensada para rodar de talón a punta. Poca tracción lateral y, muchas veces, una base estrecha y curva (rocker) que en un cambio de dirección te hace rodar el tobillo.</li>
  <li><strong>Baloncesto:</strong> patrón (herringbone) multidireccional, base plana y ancha para frenar en seco hacia los lados sin resbalar.</li>
</ul>

<h3>El soporte lateral</h3>
<p>Aquí está el riesgo real. Una zapatilla de running no tiene contención lateral: en un primer paso explosivo o al caer de un salto torcido, el pie se sale de la base. Las de baloncesto llevan refuerzos, contrafuertes y a menudo más altura precisamente para evitar el esguince de tobillo.</p>

<h3>La amortiguación</h3>
<p>La espuma de running está optimizada para impactos verticales repetidos de baja intensidad. La de baloncesto tiene que absorber aterrizajes mucho más violentos desde altura. Son perfiles de impacto distintos.</p>

<h2>¿Y al revés? ¿Correr con las de basket?</h2>
<p>Tampoco es buena idea. Una zapatilla de baloncesto pesa más, es más rígida y su amortiguación no está pensada para kilómetros continuos. Para una carrera larga acabarás con el pie cargado. Para un trote corto de calentamiento, no pasa nada — pero no las uses como zapatilla de running.</p>

<h2>La excepción: las cross-training y el uso casual</h2>
<p>Para gimnasio variado o uso de calle, una zapatilla de baloncesto low-top moderna funciona perfectamente. Y si tu presupuesto es ajustado y solo juegas pachangas ocasionales, mejor unas de basket baratas que unas de running caras: la seguridad lateral no se negocia.</p>

<p class="art-outro">Si vas a jugar de verdad, usa la herramienta adecuada. Tienes opciones para cada bolsillo en el <a href="/zapatillas">catálogo</a>, las más económicas en <a href="/zapatillas-baloncesto-baratas">zapatillas baratas</a>, y si dudas qué modelo encaja contigo, prueba el <a href="/quiz">quiz</a>.</p>
    `,
  },

  // ── 40. Altura: low vs mid vs high ──────────────────────────────────
  {
    slug: "altura-zapatillas-baloncesto-low-mid-high",
    title: "Low, mid o high: qué altura de zapatilla de baloncesto te conviene",
    metaTitle: "Zapatillas baloncesto low, mid o high: cuál elegir | CANCHA.ZAPA",
    description:
      "Low-top, mid-top o high-top: qué dice la ciencia sobre el soporte del tobillo y cómo elegir la altura según tu posición, peso e historial de lesiones.",
    fecha: "2026-05-30",
    fechaLabel: "30 mayo 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía editorial · CANCHA.ZAPA",
    heroTitle: "Low, mid o high",
    heroSubtitle: "Qué altura de zapatilla te conviene de verdad",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "jordan-tatum-4", "nike-lebron-23", "ua-curry-13"],
    relatedSeoPages: ["zapatillas-baloncesto-para-tobillos", "mejor-zapatilla-base"],
    body: `
<p class="art-intro">"Las altas protegen más el tobillo." Es la creencia más extendida del baloncesto, y la ciencia lleva años matizándola. La altura importa, pero no como crees. Aquí va lo que de verdad cambia entre low, mid y high.</p>

<h2>El mito del high-top y lo que dicen los estudios</h2>
<p>Varios estudios no han encontrado que un high-top reduzca por sí solo la incidencia de esguinces frente a un low-top. Lo que de verdad protege el tobillo es la fuerza propioceptiva, un buen soporte lateral en la mediasuela y una base ancha y estable — no la tela que sube por encima del maléolo.</p>
<p>Dicho esto, un collar alto sí aporta una sensación de sujeción y un punto de contención psicológica que muchos jugadores valoran. No es inútil; simplemente no es la varita mágica que se vende.</p>

<h2>Low-top: velocidad y libertad</h2>
<p>Es la tendencia dominante en la NBA actual (Kobe lo popularizó). Menos peso, máxima movilidad de tobillo, mejor para cambios de dirección explosivos.</p>
<ul>
  <li><strong>Ideal para:</strong> bases y escoltas rápidos, jugadores ligeros, tobillos sanos.</li>
  <li><strong>Piénsatelo si:</strong> tienes historial de esguinces y no compensas con tobilleras o trabajo de fuerza.</li>
</ul>

<h2>Mid-top: el equilibrio</h2>
<p>La altura más versátil. Sujeción extra sin sacrificar apenas movilidad. La mayoría de modelos de rendimiento actuales son mid.</p>
<ul>
  <li><strong>Ideal para:</strong> aleros y la mayoría de jugadores recreativos. La opción segura si dudas.</li>
</ul>

<h2>High-top: contención y confianza</h2>
<p>Más material alrededor del tobillo, más peso, sensación de "bota". Aporta confianza en los aterrizajes.</p>
<ul>
  <li><strong>Ideal para:</strong> ala-pívots y pívots, jugadores potentes y pesados, o quien viene de un esguince y quiere apoyo psicológico extra.</li>
  <li><strong>Coste:</strong> algo más de peso y menos libertad en el primer paso.</li>
</ul>

<h2>Cómo decidir en 10 segundos</h2>
<ul>
  <li>Base/escolta ligero y rápido, tobillos sanos → <strong>low</strong>.</li>
  <li>No lo tienes claro o eres alero → <strong>mid</strong>.</li>
  <li>Interior pesado o vuelves de lesión → <strong>high</strong> (+ trabaja la fuerza del tobillo igualmente).</li>
</ul>
<p>Y recuerda: ninguna altura sustituye al fortalecimiento del tobillo. Si te preocupan los esguinces, la altura es el complemento, no la solución.</p>

<p class="art-outro">En el <a href="/comparar">comparador</a> puedes filtrar y ver la altura de cada modelo de un vistazo. Si tu prioridad es el tobillo, mira nuestra selección en <a href="/zapatillas-baloncesto-para-tobillos">zapatillas para tobillos</a>, y para encontrar tu altura ideal según tu juego, haz el <a href="/quiz">quiz</a>.</p>
    `,
  },

  // ── 41. Heel lock / atado ───────────────────────────────────────────
  {
    slug: "como-atar-zapatillas-baloncesto-heel-lock",
    title: "Cómo atarte las zapatillas para que no se te salga el talón (heel lock)",
    metaTitle: "Heel lock: cómo atar zapatillas de baloncesto correctamente | CANCHA.ZAPA",
    description:
      "El nudo heel lock (lace lock) que fija el talón y evita rozaduras y deslizamientos. Paso a paso, más trucos de atado para ganar sujeción gratis.",
    fecha: "2026-05-30",
    fechaLabel: "30 mayo 2026",
    categoria: "Guías",
    readMinutes: 4,
    eyebrow: "★ Truco de pista · CANCHA.ZAPA",
    heroTitle: "El nudo que fija el talón",
    heroSubtitle: "Heel lock: más sujeción gratis, en 20 segundos",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "adidas-ae-2", "ua-curry-13", "jordan-tatum-4"],
    relatedSeoPages: ["zapatillas-baloncesto-para-tobillos", "zapatillas-baloncesto-pie-ancho"],
    body: `
<p class="art-intro">Tu zapatilla puede sujetar mucho mejor sin gastar un euro. La mayoría de jugadores ignoran el último par de ojales y el nudo heel lock — justamente los que fijan el talón y eliminan el deslizamiento interno que causa rozaduras y pérdida de control.</p>

<h2>Qué es el heel lock (lace lock)</h2>
<p>Es una técnica de atado que usa los dos ojales superiores de la zapatilla (esos que parecen "de más" y casi nadie usa) para crear un anclaje que bloquea el talón contra el contrafuerte. Resultado: el pie deja de moverse dentro de la zapatilla en frenadas y cambios de dirección.</p>

<h2>Paso a paso</h2>
<ol>
  <li>Ata los cordones de forma normal hasta el penúltimo ojal de cada lado.</li>
  <li>En vez de cruzar, mete cada cordón en el <strong>último ojal de su mismo lado</strong>, dejando un pequeño bucle por fuera.</li>
  <li>Cruza cada cordón y pásalo <strong>por el bucle del lado contrario</strong>.</li>
  <li>Tira de ambos hacia arriba y hacia los lados: notarás cómo el talón se ancla.</li>
  <li>Ata el nudo normal. Listo.</li>
</ol>
<p>La primera vez cuesta un minuto; luego sale solo. Es el mismo truco que usan los corredores, y en baloncesto marca aún más diferencia por los movimientos laterales.</p>

<h2>Otros trucos de atado útiles</h2>
<ul>
  <li><strong>Pie ancho:</strong> salta el ojal central de la zona del empeine (no lo uses) para liberar presión sobre el puente.</li>
  <li><strong>Empeine alto:</strong> usa el atado en paralelo (window lacing) en la zona que te aprieta.</li>
  <li><strong>Tensión por zonas:</strong> aprieta más la zona del tobillo y deja algo más suelta la del antepié para combinar sujeción y comodidad.</li>
</ul>

<h2>Cuándo el problema no es el atado</h2>
<p>Si por mucho heel lock que hagas el talón sigue bailando, puede que la zapatilla te quede grande o que el contrafuerte esté vencido por desgaste. En ese caso el atado solo es un parche.</p>

<p class="art-outro">Un buen atado mejora cualquier zapatilla, pero parte de una buena base. Si tienes el pie ancho, mira <a href="/zapatillas-baloncesto-pie-ancho">opciones de horma ancha</a>; si te preocupa el tobillo, <a href="/zapatillas-baloncesto-para-tobillos">estas con más soporte</a>; y para acertar con la talla, revisa la <a href="/guia-tallas">guía de tallas</a>.</p>
    `,
  },

  // ── 42. Cómo elegir un balón ────────────────────────────────────────
  {
    slug: "como-elegir-balon-baloncesto-2026",
    title: "Cómo elegir un balón de baloncesto (y los mejores de 2026)",
    metaTitle: "Cómo elegir balón de baloncesto: talla, material y terreno | CANCHA.ZAPA",
    description:
      "Guía para elegir balón de baloncesto: talla 5, 6 o 7, cuero vs composite vs goma, indoor vs outdoor y presión correcta. Con los mejores balones recomendados.",
    fecha: "2026-05-30",
    fechaLabel: "30 mayo 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Equipamiento · CANCHA.ZAPA",
    heroTitle: "Cómo elegir un balón de baloncesto",
    heroSubtitle: "Talla, material y terreno · Y los mejores de 2026",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: [],
    relatedSeoPages: ["zapatillas-outdoor", "zapatillas-baloncesto-junior"],
    body: `
<p class="art-intro">Un balón malo arruina cualquier entrenamiento: resbala, no bota recto o se pela en dos semanas. Elegir bien es fácil si entiendes tres cosas — talla, material y dónde vas a jugar. Aquí va la guía, y al final tienes nuestros balones recomendados con dónde comprarlos.</p>

<h2>1. La talla: 5, 6 o 7</h2>
<p>Es lo primero y lo que más gente falla. No es por gusto: cada talla es la oficial para un grupo.</p>
<ul>
  <li><strong>Talla 7</strong> (75 cm, 600-650 g): oficial masculina, a partir de ~13 años. La estándar para hombre adulto.</li>
  <li><strong>Talla 6</strong> (72 cm, 510-567 g): oficial femenina y categorías mixtas/juveniles (~11-13 años).</li>
  <li><strong>Talla 5</strong> (70 cm, 470-500 g): mini-basket, para niños hasta ~11 años.</li>
</ul>
<p>Jugar con la talla equivocada estropea la mecánica de tiro — sobre todo en niños. Si compras para un peque, ve a su talla, no a la 7 "para que le dure".</p>

<h2>2. El material: cuero, composite o goma</h2>
<h3>Cuero (sintético o natural)</h3>
<p>El mejor tacto y grip, pero <strong>solo para interior</strong>. En cemento se destroza en días. Es lo que usan FIBA, ACB y NBA. Para parquet, insuperable.</p>
<h3>Composite</h3>
<p>El equilibrio. Aguanta interior y exterior suave, buen tacto, precio medio. Si juegas en sitios variados, es tu material.</p>
<h3>Goma (rubber)</h3>
<p>El más duro y barato. Tacto inferior pero <strong>indestructible en asfalto</strong>. Para la pista de la calle, es lo único que aguanta.</p>

<h2>3. El terreno manda</h2>
<ul>
  <li><strong>Solo pabellón/parquet:</strong> cuero. No lo saques al asfalto.</li>
  <li><strong>Solo calle/cemento:</strong> goma. Olvídate del cuero.</li>
  <li><strong>De todo un poco:</strong> composite híbrido — la opción más versátil.</li>
</ul>
<p>Regla de oro: un balón de interior en cemento dura semanas; uno de exterior raya el parquet. No los mezcles.</p>

<h2>4. El detalle que casi nadie cuida: la presión</h2>
<p>Un balón mal inflado bota mal aunque sea excelente. La presión correcta es de <strong>0,5 a 0,6 bar</strong> (7-9 PSI). Prueba sencilla: déjalo caer desde la altura de tu cara (1,80 m); debe rebotar hasta la cintura. Si rebota poco, fáltale aire; si rebota a la altura del pecho, tiene de más.</p>

<h2>Nuestros balones recomendados</h2>
<p>Hemos analizado los mejores por terreno y precio, del Wilson Evolution de parquet al Spalding Streetball de calle, puntuando grip, rebote, durabilidad y control sin marketing de por medio.</p>

<p class="art-outro">Mira la selección completa con scores y dónde comprarlos en nuestra sección de <a href="/balones">balones de baloncesto</a>. Y si lo que buscas son zapatillas a juego, filtra por terreno en el <a href="/zapatillas">catálogo</a> o por las mejores <a href="/blog/mejores-zapatillas-baloncesto-outdoor-2025">para exterior</a>.</p>
    `,
  },
  {
    slug: "zapatillas-baloncesto-mas-buscadas-2026",
    title: "Las zapatillas de baloncesto mas buscadas en 2026 (lista trending)",
    metaTitle: "Zapatillas de baloncesto mas buscadas 2026: lista trending | CANCHA.ZAPA",
    description:
      "Las zapatillas de baloncesto que mas se buscan y se agotan en 2026: del hype de AE 2, Sabrina 3 y Ja 3 a las joyas asiaticas. Lista trending actualizada.",
    fecha: "2026-06-12",
    fechaLabel: "12 junio 2026",
    categoria: "Guias",
    readMinutes: 7,
    eyebrow: "Radar CANCHA.ZAPA",
    heroTitle: "Las mas buscadas de 2026",
    heroSubtitle: "El hype real de pistas y redes - Lista trending",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["adidas-ae-2", "nike-sabrina-3", "ua-curry-12", "lining-wow-12", "361-joker-1"],
    relatedSeoPages: ["mejores-zapatillas-baloncesto-2025", "zapatillas-baloncesto-retro"],
    body: `
<p class="art-intro">Cada temporada hay un punado de modelos que dominan las busquedas, vuelan de las tiendas y monopolizan TikTok e Instagram. No siempre son las mejores en una review tecnica, son las que la gente quiere. Esta es nuestra lista <strong>trending de 2026</strong>, la misma que puedes filtrar en el <a href="/zapatillas?trending=1">catalogo con el chip Trending</a> o ver ordenada por nota en <a href="/rankings">Rankings</a>.</p>
<h2>Los reyes del hype</h2>
<ul>
  <li><a href="/zapatilla/adidas-ae-2">Adidas AE 2</a> el diseno mas futurista del mercado y el iman de SEO numero uno (Anthony Edwards).</li>
  <li><a href="/zapatilla/nike-sabrina-3">Nike Sabrina 3</a> corte bajo y traccion que muerde el parquet. Cabecera del baloncesto federado en Espana.</li>
  <li><a href="/zapatilla/nike-ja-3">Nike Ja 3</a> para jugadores electricos. Por fin estabilizo la amortiguacion del talon.</li>
  <li><a href="/zapatilla/puma-mb05">Puma MB.05</a> colores chillones, Nitrofoam comoda y sello LaMelo Ball.</li>
  <li><a href="/zapatilla/jordan-luka-4">Jordan Luka 4</a> de base ancha, ultraestable para el step-back y contencion lateral mejorada.</li>
</ul>
<h2>Las firmas de elite (gama premium)</h2>
<ul>
  <li><a href="/zapatilla/nike-lebron-23">Nike LeBron 23</a> el tanque de Nike. Maxima amortiguacion para pivots y aleros pesados.</li>
  <li><a href="/zapatilla/ua-curry-12">Under Armour Curry 12</a> tecnologia Flow, ligereza insuperable y court feel para tiradores.</li>
  <li><a href="/zapatilla/jordan-tatum-3">Jordan Tatum 3</a> de las mas ligeras del Jumpman, minimalista y flexible.</li>
  <li><a href="/zapatilla/nike-kd-18">Nike KD 18</a> probablemente la mas equilibrada de Nike. Gusta a bases y pivots.</li>
  <li><a href="/zapatilla/adidas-harden-vol-9">Adidas Harden Vol. 9</a> entresuela Boost + Lightstrike y buen agarre lateral para cambios de ritmo.</li>
</ul>
<h2>El mercado sibarita (marcas asiaticas y emergentes)</h2>
<ul>
  <li><a href="/zapatilla/lining-wow-allcity-14">Way of Wade All City 14</a> rendimiento pro a precio de gama media (espuma Boom).</li>
  <li><a href="/zapatilla/lining-wow-12">Way of Wade 12</a> placa de carbono vista y materiales aeroespaciales. Puro estatus.</li>
  <li><a href="/zapatilla/rigorer-ar3">Rigorer AR3</a> perfil bajo, traccion extrema en interior y estetica cuidada.</li>
  <li><a href="/zapatilla/361-joker-1">361 Joker 1</a> el modelo del MVP Nikola Jokic. Estabilidad y precio competitivo.</li>
  <li><a href="/zapatilla/skechers-skx-float">Skechers SKX Float</a> amortiguacion Hyper Burst, pensada para proteger rodillas.</li>
</ul>
<h2>Rendimiento especializado y volumen</h2>
<ul>
  <li><a href="/zapatilla/nike-book-2">Nike Book 2</a> estetica retro/skate que rinde en pista y vale para vestir.</li>
  <li><a href="/zapatilla/nike-giannis-freak-7">Nike Zoom Freak 7</a> transiciones rapidas y soporte brutal en el antepie.</li>
  <li><a href="/zapatilla/adidas-don-issue-7">Adidas DON Issue 7</a> la signature de Donovan Mitchell, ideal para cambios de ritmo.</li>
  <li><a href="/zapatilla/nike-giannis-immortality-5">Nike Giannis Immortality 5</a> el rey de las baratas (desde {{precio:nike-giannis-immortality-5}}) y durabilidad para exterior.</li>
</ul>
<h2>Como usar esta lista</h2>
<p class="art-outro">El hype es un buen punto de partida, pero no compres solo por moda. Filtra el <a href="/zapatillas">catalogo</a> por tu posicion y presupuesto, contrasta la nota en <a href="/rankings">Rankings</a> y, si dudas, haz el <a href="/quiz">quiz</a>: te decimos cual encaja con tu juego. Sin sesgo de marca, sin BS.</p>
`,
  },

  // ── Guía: zapatillas de baloncesto para mujer ──────────────────────
  {
    slug: "zapatillas-baloncesto-mujer-unisex-vs-horma-femenina-2026",
    title: "Zapatillas de baloncesto para mujer: unisex vs horma 100% femenina (2026)",
    metaTitle: "Zapatillas de baloncesto para mujer 2026: unisex vs horma femenina | CANCHA.ZAPA",
    description:
      "La guía honesta de zapatillas de baloncesto para mujer: diferencia real entre signatures unisex (Sabrina, Stewie, Heir Series) y moldes 100% femeninos (Moolah, UA Flow Breakthru, Adidas Exhibit Select).",
    fecha: "2026-06-13",
    fechaLabel: "13 junio 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía editorial · Baloncesto femenino",
    heroTitle: "Zapatillas de baloncesto para mujer",
    heroSubtitle: "Unisex vs horma 100% femenina · Guía 2026",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-sabrina-3", "jordan-heir-series", "ua-flow-breakthru-4", "adidas-exhibit-select", "moolah-neovolt-pro-v3", "puma-stewie-4"],
    relatedSeoPages: ["zapatillas-baloncesto-mujer", "zapatillas-baloncesto-junior", "mejores-zapatillas-baloncesto-2025"],
    body: `
<p class="art-intro">Durante años, "zapatilla de baloncesto para mujer" significaba coger un modelo de hombre, pintarlo de rosa y hacerlo en tallas pequeñas. Eso se acabó. El boom de la WNBA ha empujado a las marcas a diseñar de verdad para el pie femenino. Pero hay un matiz que casi ninguna tienda explica: <strong>no todas las "de mujer" son iguales</strong>. Aquí te lo aclaramos.</p>

<h2>Por qué el pie femenino necesita otra horma</h2>
<p>No es marketing: hay diferencias biomecánicas reales que cambian cómo debería construirse la zapatilla.</p>
<ul>
  <li><strong>Talón más estrecho:</strong> la mujer suele tener el talón proporcionalmente más estrecho respecto al antepié. Con una horma de hombre, el pie "baila" y se desliza hacia arriba al saltar.</li>
  <li><strong>Arco y ángulo Q:</strong> la alineación cadera-rodilla (ángulo Q) es distinta, lo que cambia cómo se absorbe el impacto al caer de un rebote. Un soporte de arco adaptado ayuda a prevenir lesiones (el cruzado anterior es más común en el básquet femenino).</li>
  <li><strong>Menos masa estructural:</strong> a igual estatura, menor peso medio. No hace falta una placa de torsión tan rígida ni una espuma tan dura para no hundir la mediasuela.</li>
</ul>

<h2>Las dos familias (y por qué importa la diferencia)</h2>

<h3>1. Signatures unisex con ADN femenino</h3>
<p>Llevan el nombre de una estrella de la WNBA, pero se venden en <strong>tallaje completo</strong> porque los hombres también las quieren por su rendimiento. Ajuste ceñido, con horma de normal a estrecha. Son las más vendidas del planeta:</p>
<ul>
  <li><strong>Nike Sabrina 3 (Sabrina Ionescu):</strong> el mayor éxito reciente de Nike. Low-top, ligera, agarre salvaje. Estilo "Kobe". La opción nº1 de muchas jugadoras.</li>
  <li><strong>Nike A'One (A'ja Wilson):</strong> debut de la MVP. Más enfocada a amortiguación y estabilidad para juego todoterreno.</li>
  <li><strong>Puma Stewie 3/4 (Breanna Stewart):</strong> Puma fue pionera en recuperar este mercado. Nitro foam, comodidad brutal y horma polivalente.</li>
  <li><strong>Jordan Heir Series:</strong> la primera silueta de Jordan Brand creada con insights de jugadoras WNBA. Low-to-ground, cortante. WearTesters la nombró la mejor Jordan de baloncesto de 2024-25 (8/10).</li>
</ul>
<p>Si juegas y no te obsesiona la horma anatómica, aquí tienes el mejor rendimiento. Funcionan perfectamente para mujer.</p>

<h3>2. Horma 100% femenina (molde biométrico)</h3>
<p>No comparten molde con ningún modelo de hombre. Se construyen sobre bases anatómicas exclusivas del pie de mujer: talón ultra estrecho, arco elevado, menos volumen en empeine. Un hombre con su talla equivalente notaría el talón demasiado apretado.</p>
<ul>
  <li><strong>Moolah Kicks (Neovolt Pro V3, Evolyte Elite, Triple Double):</strong> la única marca dedicada 100% al básquet femenino. Filón para quien busca el ajuste anatómico real. En España hay que importarla (moolahkicks.com), pero su review es justo lo que buscas si vas a comprarla.</li>
  <li><strong>Under Armour Flow Breakthru 4:</strong> horma biométrica femenina + suela UA Flow (sin goma, solo espuma al suelo): de las más ligeras del mercado. Y se compra en España (Amazon) a precio de ganga.</li>
  <li><strong>Adidas Exhibit Select:</strong> desarrollada con mapas de presión de atletas WNBA. Bootie de neopreno, Bounce flexible desde el minuto uno, horma estrecha. Tiendas y precio en <a href="/zapatilla/adidas-exhibit-select">su ficha</a>.</li>
</ul>

<h2>¿Cuál eliges?</h2>
<p>Depende de qué priorices:</p>
<ul>
  <li><strong>Rendimiento puro y disponibilidad fácil →</strong> una signature: Sabrina 3, Heir Series o Stewie. Las compras en cualquier sitio y rinden a tope.</li>
  <li><strong>Ajuste anatómico femenino real →</strong> UA Flow Breakthru 4 o Adidas Exhibit Select (compra en España), o Moolah Kicks (importando) si quieres lo más especializado.</li>
  <li><strong>Talón que se te escapa con hormas de hombre →</strong> ve directa a la familia 100% femenina: el talón estrecho lo soluciona.</li>
</ul>

<h2>Lo que viene</h2>
<p>El mercado femenino es el que más rápido crece. La <strong>Nike Caitlin 1</strong> (Caitlin Clark), prevista para finales de 2026, apunta a reventar ventas por su impacto mediático. La iremos añadiendo en cuanto haya datos reales.</p>

<p class="art-outro">¿Quieres ver de un vistazo todo el arsenal para jugadoras? Filtra el catálogo con el chip <a href="/zapatillas?mujer=1">♀ Mujer</a> — te salen tanto los moldes 100% femeninos como las signatures con ADN WNBA. O <a href="/quiz">haz el quiz</a> para una recomendación a tu medida.</p>
`,
  },

  {
    slug: "zapatillas-baloncesto-junior-gs-2026",
    title: "Zapatillas de baloncesto junior/GS 2026: la signature de tu hijo a mitad de precio",
    metaTitle: "Zapatillas de baloncesto júnior (GS) 2026: signatures a mitad de precio | CANCHA.ZAPA",
    description:
      "Las mejores zapatillas de baloncesto júnior/GS 2026: las signatures de la NBA (Curry, AE, MB.05, DON) en tallaje niño a mitad de precio. Guía y precios.",
    fecha: "2026-06-13",
    fechaLabel: "13 junio 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía editorial · Júnior / GS",
    heroTitle: "Zapatillas de baloncesto júnior (GS)",
    heroSubtitle: "La signature de tu hijo a mitad de precio · 2026",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["ua-curry-12-gs","adidas-ae-2-gs","puma-mb05-gs","adidas-don-issue-7-gs","nike-giannis-immortality-4-gs","adidas-believe-that-1-gs"],
    relatedSeoPages: ["zapatillas-baloncesto-junior","zapatillas-baloncesto-baratas","mejores-zapatillas-baloncesto-2025"],
    body: `
<p class="art-intro">Las zapatillas signature de la NBA cuestan 130-200€. Pero casi todas tienen una versión "GS" (Grade School, tallaje júnior) con <strong>la misma tecnología, la misma suela y el mismo diseño</strong>, a menudo por la mitad de precio. Si tu hijo (o tú, si calzas hasta una EU 40) juega en serio, este es el secreto peor guardado del básquet.</p>

<h2>¿Qué significa "GS" exactamente?</h2>
<p>GS = Grade School. Es el tallaje júnior, que suele llegar hasta una <strong>EU 40 aprox.</strong> (US 7Y). No es una zapatilla "de niño" de peor calidad: en la mayoría de signatures, la GS comparte midsole, tracción y upper con la versión adulta. Cambia el tallaje y, a veces, baja un poco el peso. Por eso heredan prácticamente el mismo rendimiento — y el mismo score técnico.</p>
<p>Ojo: una GS no es para un adulto de pie grande. Si calzas más de una EU 40-41, necesitas la versión adulta. La GS es para júnior, adolescentes y adultos de pie pequeño.</p>

<h2>Las mejores signatures en versión GS (2026)</h2>
<ul>
  <li><strong>UA Curry 12 GS (desde {{precio:ua-curry-12-gs}}):</strong> la misma suela UA Flow (sin goma, súper ligera y reactiva) que la adulta (desde {{precio:ua-curry-12}}). La signature premium del júnior tirador.</li>
  <li><strong>Adidas AE 1 / AE 2 GS (desde {{precio:adidas-ae-1-gs}} / {{precio:adidas-ae-2-gs}}):</strong> la zapa de Anthony Edwards, la más aspiracional ahora mismo, en talla niño a precio de ganga.</li>
  <li><strong>Puma MB.05 GS (desde {{precio:puma-mb05-gs}}):</strong> el estilo y el Nitrofoam de LaMelo Ball para los más jóvenes.</li>
  <li><strong>Adidas D.O.N. Issue 7 GS (desde {{precio:adidas-don-issue-7-gs}}):</strong> Lightstrike con Lightstrike Pro en el antepié: cushion premium.</li>
  <li><strong>Nike Giannis Immortality 4 GS (desde {{precio:nike-giannis-immortality-4-gs}}):</strong> resistente al asfalto y baratísima. La mejor budget para el júnior interior.</li>
  <li><strong>Adidas Believe That 1 GS (desde {{precio:adidas-believe-that-1-gs}}):</strong> Dreamstrike y herringbone multidireccional; de las GS que mejor aguantan el outdoor ({{exterior:adidas-believe-that-1-gs}}).</li>
</ul>

<h2>¿Y las budget puras?</h2>
<p>Si el presupuesto es muy ajustado o es la primera zapatilla, no hace falta una signature:</p>
<ul>
  <li><strong>Adidas OwnTheGame 3 GS (desde {{precio:adidas-ownthegame-3-gs}}) / Dame X GS (desde {{precio:adidas-dame-x-gs}}):</strong> iniciación y gama media de adidas en talla niño.</li>
  <li><strong>UA Jet '25 GS / Lockdown 7 GS (desde {{precio:ua-jet-25-gs}} / {{precio:ua-lockdown-7-gs}}):</strong> confort y durabilidad de iniciación.</li>
  <li><strong>Decathlon Tarmak Fast 900 NBA Junior (desde {{precio:decathlon-tarmak-fast-900-nba-junior}}):</strong> ligera, licencia NBA oficial, para llevar los colores del equipo favorito.</li>
</ul>

<h2>Cómo elegir para tu hijo</h2>
<ol>
  <li><strong>Comprueba la talla:</strong> que entre en el tallaje GS (hasta ~EU 40). Si se le queda pequeña pronto, mejor budget.</li>
  <li><strong>Mira dónde juega:</strong> si es mucho outdoor, prioriza durabilidad (Believe That 1 GS, Immortality 4 GS, OwnTheGame 3 GS). Para pabellón, cualquier signature.</li>
  <li><strong>No pagues de más en pies que crecen:</strong> un júnior cambia de talla cada temporada. La GS te da rendimiento real sin gastar 160€.</li>
</ol>

<p class="art-outro">Filtra todo el segmento júnior con el chip <a href="/zapatillas?junior=1">👟 Junior (GS)</a> del catálogo, o <a href="/quiz">haz el quiz</a> marcando el perfil júnior para una recomendación a medida.</p>
`,
  },

  {
    slug: "moolah-kicks-review-marca-mujer-2026",
    title: "Moolah Kicks: review de la única marca 100% femenina (¿merece importarla?)",
    metaTitle: "Moolah Kicks review 2026: la marca de baloncesto 100% mujer | CANCHA.ZAPA",
    description:
      "Review de Moolah Kicks, la única marca de baloncesto dedicada 100% al pie femenino: gama (Neovolt Pro V3, Evolyte Elite, Triple Double), horma, importación y veredicto.",
    fecha: "2026-06-13",
    fechaLabel: "13 junio 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis · Marca 100% mujer",
    heroTitle: "Moolah Kicks",
    heroSubtitle: "La única marca 100% femenina · ¿merece importarla?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["moolah-neovolt-pro-v3","moolah-evolyte-elite","moolah-triple-double","ua-flow-breakthru-4","adidas-exhibit-select"],
    relatedSeoPages: ["zapatillas-baloncesto-mujer","zapatillas-baloncesto-premium"],
    body: `
<p class="art-intro">Si buscas en Google "zapatillas de baloncesto solo para mujer", tarde o temprano aparece <strong>Moolah Kicks</strong>: la única marca del mundo dedicada 100% al básquet femenino. Pero en España no se ven en tiendas físicas, así que la duda es real: ¿merece la pena importarlas? Esto es lo que tienes que saber antes de pagar aduanas.</p>

<h2>Qué es Moolah Kicks (y por qué es distinta)</h2>
<p>Moolah no coge una zapatilla de hombre y la "feminiza". Diseña desde cero sobre bases biométricas exclusivas del pie de mujer. Su <em>Signature Female Fit</em> incluye:</p>
<ul>
  <li><strong>Talón ultra estrecho:</strong> evita que el pie se deslice hacia arriba al saltar — el problema nº1 de las jugadoras con hormas de hombre.</li>
  <li><strong>Arco elevado y ancho más slim:</strong> adaptados a la anatomía femenina media.</li>
  <li><strong>Lateral rebajado:</strong> para court feel y cambios de dirección.</li>
</ul>
<p>Un hombre con su talla equivalente notaría el talón demasiado apretado. No es marketing: es un molde diferente.</p>

<h2>La gama (2026)</h2>
<ul>
  <li><strong>Neovolt Pro V3 (desde {{precio:moolah-neovolt-pro-v3}}):</strong> el modelo performance de referencia. Equilibrada, reactiva, con cushion mejorado. La que recomendamos para empezar con la marca.</li>
  <li><strong>Evolyte Elite (desde {{precio:moolah-evolyte-elite}}):</strong> el tope de gama. Modelo de gama alta de Moolah con cushion premium. Para la exterior ultra rápida.</li>
  <li><strong>Triple Double (desde {{precio:moolah-triple-double}}):</strong> la "todoterreno": high-top pensada, según Moolah, para aleros y pívots.</li>
</ul>

<h2>El pero: importación</h2>
<p>Aquí está el freno. Moolah se vende sobre todo en <strong>moolahkicks.com y Amazon.com (EE.UU.)</strong>. En España toca importar, con el coste y los plazos que eso implica. Por eso, si quieres horma 100% femenina <em>comprable aquí</em>, hay dos alternativas serias: la <strong>UA Flow Breakthru 4</strong> y la <strong>Adidas Exhibit Select</strong>, ambas con molde femenino y disponibles en Amazon España.</p>

<h2>Veredicto: ¿merece importarla?</h2>
<p><strong>Sí, si:</strong> ya has probado hormas de mujer y notas que ninguna otra te sujeta el talón, o si quieres la marca más especializada del mercado y no te importa esperar/pagar el envío.</p>
<p><strong>No, si:</strong> es tu primera zapatilla "de mujer" o quieres probar el concepto sin complicarte. Empieza por la Flow Breakthru 4 o la Exhibit Select aquí, y si te enganchas, das el salto a Moolah.</p>

<p class="art-outro">Mira las Moolah y el resto del arsenal femenino con el chip <a href="/zapatillas?mujer=1">♀ Mujer</a>, o lee nuestra <a href="/blog/zapatillas-baloncesto-mujer-unisex-vs-horma-femenina-2026">guía de unisex vs horma femenina</a> para entender la diferencia completa.</p>
`,
  },

  {
    slug: "sabrina-3-vs-jordan-heir-vs-ua-flow-breakthru-mujer-2026",
    title: "Sabrina 3 vs Jordan Heir Series vs UA Flow Breakthru 4: las 3 puntas del básquet femenino",
    metaTitle: "Sabrina 3 vs Jordan Heir vs UA Flow Breakthru 4: comparativa mujer 2026 | CANCHA.ZAPA",
    description:
      "Comparativa de las 3 mejores zapatillas de baloncesto femenino 2026: Nike Sabrina 3, Jordan Heir Series y UA Flow Breakthru 4. Tracción, cushion, ajuste y cuál elegir.",
    fecha: "2026-06-13",
    fechaLabel: "13 junio 2026",
    categoria: "Comparativas",
    readMinutes: 5,
    eyebrow: "★ Comparativa · Baloncesto femenino",
    heroTitle: "Sabrina 3 vs Heir Series vs Flow Breakthru 4",
    heroSubtitle: "Las 3 puntas del básquet femenino · 2026",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-sabrina-3","jordan-heir-series","ua-flow-breakthru-4"],
    relatedSeoPages: ["zapatillas-baloncesto-mujer","zapatillas-reactivas","zapatillas-outdoor"],
    body: `
<p class="art-intro">Son las tres puntas de lanza del baloncesto femenino actual, pero responden a filosofías distintas: una signature unisex que arrasa, la primera mujer-signature de Jordan, y un molde 100% femenino. Si juegas y dudas entre ellas, esta comparativa te la resuelve.</p>

<h2>De un vistazo</h2>
<ul>
  <li><strong>Nike Sabrina 3 — la superventas (score {{score:nike-sabrina-3}}):</strong> unisex, pero LA opción de muchas jugadoras. Low-top, tracción salvaje, ligera, estilo "Kobe". Horma estrecha y ceñida.</li>
  <li><strong>Jordan Heir Series — la cortante (score 8,0, WT 8/10):</strong> primera silueta de Jordan creada con insights de jugadoras WNBA. Low-to-ground, reactiva, pensada para velocidad y cambios de ritmo.</li>
  <li><strong>UA Flow Breakthru 4 — la anatómica (score {{score:ua-flow-breakthru-4}}):</strong> horma 100% femenina (talón estrecho) + suela UA Flow sin goma: súper ligera ({{peso:ua-flow-breakthru-4}}), la más ligera de las tres.</li>
</ul>

<h2>Tracción</h2>
<p>La <strong>Sabrina 3</strong> manda en pista limpia (tracción de las mejores del mercado). La <strong>Heir</strong> tiene un herringbone fiable pero sensible al polvo (hay que limpiar la suela). La <strong>Flow Breakthru</strong> es la única que agarra igual de bien dentro y fuera gracias al compound Flow.</p>

<h2>Cushion y respuesta</h2>
<p>Ninguna es una "nube": las tres son de perfil bajo y reactivo. La <strong>Sabrina 3</strong> ofrece el mejor equilibrio cushion/respuesta. La <strong>Heir</strong> es la más cortante y baja al suelo (Cushlon 3.0 fino: poca protección de impacto). La <strong>Flow Breakthru</strong> prioriza ligereza y durabilidad sobre amortiguación.</p>

<h2>Ajuste (lo que las diferencia de verdad)</h2>
<p>Aquí está la clave. Sabrina y Heir son <strong>unisex</strong>: horma ceñida, de normal a estrecha, válida para pies normales y estrechos. La <strong>Flow Breakthru 4 es 100% femenina</strong>: si tienes el talón estrecho y se te escapa con otras zapatillas, esta lo soluciona. No hay versión de hombre.</p>

<h2>¿Cuál eliges?</h2>
<ul>
  <li><strong>Rendimiento puro en pabellón y la más vendida →</strong> Nike Sabrina 3.</li>
  <li><strong>Juego rápido, cortante, perfil bajo →</strong> Jordan Heir Series (desde {{precio:jordan-heir-series}}).</li>
  <li><strong>Ajuste anatómico femenino real y juego dentro/fuera →</strong> UA Flow Breakthru 4.</li>
</ul>

<p class="art-outro">¿Sigues sin decidirte? <a href="/comparar?slugs=nike-sabrina-3,jordan-heir-series,ua-flow-breakthru-4">Compáralas cara a cara</a> con sus 8 atributos, o filtra el <a href="/zapatillas?mujer=1">catálogo de mujer</a>.</p>
`,
  },

  // ── Torneos 3x3 / triangulares ──────────────────────────────────────
  {
    slug: "organizar-torneo-3x3-baloncesto-paso-a-paso",
    title: "Cómo organizar un torneo 3x3 de baloncesto (o un triangular) paso a paso",
    metaTitle: "Organizar un torneo 3x3 de baloncesto paso a paso | CANCHA.ZAPA",
    description:
      "Cómo montar un torneo 3x3 o un triangular: reglas básicas de FIBA 3x3, formatos, grupos, horario por pistas, desempates y calendario para compartir.",
    fecha: "2026-10-18",
    fechaLabel: "18 octubre 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Entrenadores · Torneos",
    heroTitle: "Cómo organizar un torneo 3x3 paso a paso",
    heroSubtitle: "Reglas FIBA 3x3, formatos, horarios por pista y desempates · Para 3x3, campus y triangulares",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: [],
    relatedSeoPages: ["zapatillas-outdoor", "zapatillas-indoor"],
    body: `
<p class="art-intro">Un 3x3 de fiestas, un campus de verano o el triangular de pretemporada del club tienen el mismo problema: veinte cosas pequeñas que, si no están decididas antes, se resuelven a gritos en mitad de la pista. Esta guía ordena esas decisiones, resume las reglas básicas del 3x3 oficial y te enseña a sacar el calendario en un minuto.</p>

<h2>1. Decide qué reglas vais a usar</h2>
<p>Lo primero es avisar a los equipos de si se juega con el reglamento oficial de FIBA 3x3 o con una versión adaptada. Las reglas básicas del 3x3 oficial, según las páginas de FIBA, son estas:</p>
<ul>
  <li><strong>Pista y equipos:</strong> una sola canasta y media pista. Cada equipo lleva tres jugadores en pista y uno suplente; los tres tienen que estar en la pista para empezar.</li>
  <li><strong>Duración:</strong> 10 minutos de juego, con el reloj parado en balón muerto. Gana quien llegue antes a 21 puntos si lo consigue antes de que se acabe el tiempo; si no, gana quien tenga más puntos al final.</li>
  <li><strong>Puntuación:</strong> 1 punto por canasta dentro del arco y por cada tiro libre, 2 puntos por canasta desde fuera del arco.</li>
  <li><strong>Reloj de posesión:</strong> 12 segundos para intentar un tiro; si se agota sin tirar, la posesión pasa al rival.</li>
  <li><strong>Prórroga:</strong> si hay empate al final, se juega una prórroga sin tiempo y gana el primero que anota 2 puntos.</li>
  <li><strong>Inicio y reanudaciones:</strong> la defensa pasa el balón al ataque para empezar o reanudar el juego. Tras canasta, el equipo que no ha anotado saca el balón desde debajo del aro y lo lleva fuera del arco.</li>
  <li><strong>Cambios:</strong> solo con balón muerto, entrando por detrás de la línea de fondo opuesta a la canasta y tocando al compañero que sale.</li>
  <li><strong>Balón:</strong> en los eventos oficiales se usa un balón del número 6.</li>
</ul>
<p>Para pachangas, FIBA indica que se puede jugar a 3, 7, 9, 15 o 21 puntos. Si juegas con categorías de base, acorta el tiempo o los puntos si hace falta, pero dilo por escrito antes de empezar, no durante el torneo.</p>

<h2>2. Cuenta equipos y pistas</h2>
<p>Estos dos números mandan sobre todo lo demás. Cada equipo debería inscribirse con cuatro jugadores (tres en pista y un suplente). Con pocos equipos, una liga a una vuelta es la opción más justa: un <strong>triangular</strong> son solo tres partidos y cada equipo juega dos. Con más equipos, grupos y fase final. Cuantas más pistas tengas, más partidos a la vez; con una sola pista, los partidos van uno detrás de otro y el día se alarga.</p>

<h2>3. Monta el calendario con la herramienta</h2>
<p>El <a href="/torneo/">organizador de torneos</a> de CANCHA.ZAPA hace el trabajo pesado y es gratis, sin registro. Escribes los equipos, uno por línea, y eliges entre siete formatos: liga, liga con final, liga con semifinales, dos grupos con final o semifinales, y cuatro grupos con semifinales o con cuartos. Admite hasta 32 equipos y hasta 8 pistas.</p>
<ul>
  <li><strong>Reparto en serpiente:</strong> si escribes los equipos del más fuerte al más flojo, cada grupo recibe uno de arriba y uno de abajo, y los grupos quedan equilibrados.</li>
  <li><strong>Horario por pistas:</strong> indicas la hora de inicio, los minutos por partido y el descanso entre partidos. La herramienta reparte los partidos por pista y hora, llena todas las pistas, nunca pone a un equipo en dos partidos a la vez y, cuando se puede, da descanso a quien acaba de jugar.</li>
  <li><strong>Cruces automáticos:</strong> al acabar la fase de grupos, los cruces se rellenan solos con los clasificados. Si luego corriges un resultado y cambia quién pasa, el resultado de ese cruce se vacía.</li>
</ul>
<p>Un detalle práctico: el reloj del 3x3 se para en balón muerto, así que un partido de 10 minutos de juego dura más que 10 minutos en la pared. Prueba el primer partido con un cronómetro y ajusta los minutos por partido antes de generar el calendario definitivo.</p>

<h2>4. Que el desempate no sea una discusión</h2>
<p>Comunica antes cómo se desempata. La clasificación de la herramienta cuenta victorias; si hay empate a victorias, mira los partidos entre los equipos empatados (victorias y diferencia de puntos); si aun así quedan dos empatados, decide el partido entre ellos, y si no, la diferencia y los puntos a favor de todo el grupo. Además, un resultado empatado no cuenta: en baloncesto no hay empate, así que la herramienta lo marca en rojo y lo avisa hasta que metas el resultado de la prórroga.</p>

<h2>5. Lo que se olvida siempre</h2>
<ul>
  <li><strong>Mesa y árbitros:</strong> como mínimo, alguien al cronómetro y alguien al reloj de posesión por pista, además de quien arbitra. Si no hay reloj de posesión, decidid antes si lo usáis.</li>
  <li><strong>Inscripción:</strong> pide nombre del equipo, un responsable con teléfono y la lista de jugadores. Cierra la inscripción antes de generar el calendario.</li>
  <li><strong>Categorías:</strong> no mezcles edades muy distintas en el mismo grupo; mejor un cuadro por categoría.</li>
  <li><strong>Calzado y suelo:</strong> si juegas en cemento, avisa a los jugadores. El agarre y el desgaste cambian mucho entre pista exterior y parquet; en nuestras guías hay <a href="/zapatillas-outdoor/">zapatillas para exterior</a> y <a href="/zapatillas-indoor/">para pabellón</a>.</li>
</ul>

<h2>6. Comparte y guarda</h2>
<p>El calendario se imprime con un botón. También puedes copiar un enlace que lleva todo dentro (equipos y resultados): quien lo abre ve la foto del momento en que lo copiaste, así que vuelve a copiarlo cuando haya resultados nuevos. Quien lo recibe puede guardar una copia para editarla. El torneo se guarda en tu navegador y el enlace no pasa por ningún servidor.</p>

<p class="art-outro">¿Tienes ya los equipos? <a href="/torneo/">Genera el calendario de tu torneo</a> en un minuto, gratis y sin registro.</p>
`,
  },

  // ── Tests físicos ───────────────────────────────────────────────────
  {
    slug: "tests-fisicos-baloncesto-formacion",
    title: "Tests físicos en baloncesto de formación: cuáles pasar y cómo hacerlo bien",
    metaTitle: "Tests físicos en baloncesto base: cuáles y cómo | CANCHA.ZAPA",
    description:
      "Qué tests físicos pasar a tus jugadores de base (velocidad, agilidad, saltos, Course Navette), cómo hacerlos bien y seguir la evolución de cada uno.",
    fecha: "2026-10-18",
    fechaLabel: "18 octubre 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Entrenadores · Preparación física",
    heroTitle: "Tests físicos en baloncesto de formación",
    heroSubtitle: "Qué pasar, cómo hacerlo bien y por qué no comparar a unos niños con otros",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: [],
    relatedSeoPages: ["zapatillas-baloncesto-junior", "zapatillas-reactivas"],
    body: `
<p class="art-intro">Pasar tests físicos a un equipo de base sirve para una sola cosa: saber si cada jugador mejora respecto a sí mismo. No sirve para hacer un ranking de niños ni para decidir quién juega. Con esa idea clara, una batería sencilla pasada dos o tres veces por temporada te da información útil sin complicarte la vida.</p>

<h2>La regla de oro: cada jugador, contra sí mismo</h2>
<p>A estas edades dos chicos de la misma edad pueden estar en momentos de crecimiento muy distintos. Comparar sus números no mide el trabajo ni el talento; mide, sobre todo, quién se ha desarrollado antes. Por eso no publiques tablas ordenadas ni los pegues en el vestuario. Lo que sí tiene sentido es ver que Marc ha mejorado su salto respecto a octubre, o la media del grupo respecto a la sesión anterior. En esta guía no encontrarás baremos por edad: no damos valores de referencia que no podamos respaldar.</p>

<h2>Las pruebas de la batería</h2>
<p>La herramienta de <a href="/tests-fisicos/">tests físicos</a> de CANCHA.ZAPA incluye seis pruebas con este protocolo:</p>
<ul>
  <li><strong>Velocidad 20 m:</strong> salida parada a 0,5 m de la línea. Se anota el mejor de dos intentos.</li>
  <li><strong>Agilidad 5-10-5:</strong> desde el centro, 5 m a un lado, 10 m al otro y 5 m de vuelta, tocando cada línea. Mejor de dos.</li>
  <li><strong>Salto vertical:</strong> marca de pie con el brazo estirado y marca en el salto, contra la pared; el resultado es la diferencia. Mejor de tres.</li>
  <li><strong>Salto horizontal:</strong> pies juntos, sin carrerilla, midiendo hasta el talón más atrasado. Mejor de dos.</li>
  <li><strong>Course Navette:</strong> 20 m de ida y vuelta al ritmo de la grabación, que empieza a 8,5 km/h y sube 0,5 cada minuto. Se anota el último palier completado.</li>
  <li><strong>Lanzamiento de balón medicinal:</strong> a dos manos desde el pecho, sentado o de pie. Siempre con el mismo peso de balón, que conviene anotar en la sesión. Mejor de dos.</li>
</ul>
<p>No hace falta pasarlas todas siempre. Elige las que respondan a lo que estás trabajando, pero repite exactamente las mismas en cada sesión.</p>

<h2>Cómo hacerlo bien para que los números valgan</h2>
<ul>
  <li><strong>Mismas condiciones:</strong> misma pista, mismo tipo de calzado y, si puedes, mismo momento del día. Si cambia el suelo, el resultado no es comparable. En la sesión puedes dejar una nota con el balón, la pista y el calzado.</li>
  <li><strong>Calienta antes:</strong> un calentamiento general y unas repeticiones suaves de cada prueba. Empezar a sprintar o saltar en frío no es buena idea.</li>
  <li><strong>Mismo protocolo para todos:</strong> explica y demuestra cada prueba, deja un intento de prueba y cuenta los intentos que marca el protocolo.</li>
  <li><strong>Orden sensato:</strong> deja la Course Navette para el final, porque deja a todos cansados y falsearía las demás pruebas.</li>
  <li><strong>Estación por estación:</strong> monta una zona por prueba y rota a los jugadores. Todos hacen lo mismo y tú apuntas con el móvil en la mano.</li>
  <li><strong>Dos o tres veces por temporada:</strong> al inicio, a mitad y al final. Más a menudo quita tiempo de entreno.</li>
  <li><strong>Sin lesionados:</strong> quien tiene una molestia o está enfermo no hace la prueba; ya habrá otra sesión.</li>
</ul>

<h2>VO2máx estimado: orientativo, no clínico</h2>
<p>Con la Course Navette, la herramienta calcula un VO2máx estimado con la ecuación de Léger y colaboradores de 1988, que usa la edad; para adultos, el propio artículo indica usarla con la edad fija en 18 años. Para eso pides una edad media del grupo en la sesión. Es una estimación de campo a partir del último palier, no una medida de laboratorio, y como usa una edad media común, conviene mirar su tendencia en cada jugador más que el valor exacto.</p>

<h2>Anota, compara y no te obsesiones</h2>
<p>Escribes la marca de cada jugador y pulsas Intro para pasar al siguiente; la sesión se guarda sola. En cada prueba ves la marca anterior y si ha mejorado, teniendo en cuenta que en los tiempos mejor es menos y en las distancias, más. También verás la media del grupo y la evolución de cada jugador a lo largo de la temporada. Puedes descargar un CSV de la sesión.</p>
<p>Los nombres y las marcas se guardan solo en tu navegador: nada sale de tu dispositivo, algo importante cuando son datos de menores. Imprimir una ficha por jugador es una función Pro, gratis durante la beta.</p>

<p class="art-outro">¿Empiezas la temporada? Crea tu primera sesión en <a href="/tests-fisicos/">Tests físicos</a> y deja la referencia de cada jugador anotada desde el principio. Gratis y sin registro.</p>
`,
  },

  // ── Evaluación sin notas ────────────────────────────────────────────
  {
    slug: "evaluar-jugadores-baloncesto-base-sin-notas",
    title: "Cómo evaluar a tus jugadores de baloncesto base sin ponerles nota",
    metaTitle: "Evaluar a jugadores de base sin ponerles nota | CANCHA.ZAPA",
    description:
      "Evalúa a tus jugadores de baloncesto base por niveles y no con notas: 12 criterios de técnica, juego y actitud, su evolución y un informe en positivo.",
    fecha: "2026-10-18",
    fechaLabel: "18 octubre 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Entrenadores · Equipo",
    heroTitle: "Evaluar a tus jugadores de base sin ponerles nota",
    heroSubtitle: "Niveles en lugar de números, 12 criterios y un informe en positivo para las familias",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: [],
    relatedSeoPages: ["zapatillas-baloncesto-junior", "zapatillas-baloncesto-calidad-precio"],
    body: `
<p class="art-intro">Decirle a un niño de nueve años que tiene un 4 sobre 10 en tiro no le ayuda a tirar mejor. Le dice dónde está en una escala que no entiende y le compara con los demás. En baloncesto de base conviene evaluar para orientar el trabajo, no para puntuar. Esta guía propone una forma de hacerlo por niveles, con criterios claros y sin ranking.</p>

<h2>Por qué mejor niveles que notas</h2>
<p>Una nota numérica invita a comparar y a quedarse con el número. Un nivel describe en qué punto del aprendizaje está el jugador. En la herramienta de <a href="/evaluacion/">evaluación</a> de CANCHA.ZAPA hay cuatro niveles. Esta es una forma práctica de interpretarlos:</p>
<ul>
  <li><strong>1 · Empezando:</strong> todavía no lo hace con regularidad.</li>
  <li><strong>2 · En progreso:</strong> lo hace a veces y mejora.</li>
  <li><strong>3 · Lo consigue:</strong> lo hace bien de forma habitual.</li>
  <li><strong>4 · Destaca:</strong> lo hace muy bien y con claridad; es un punto fuerte.</li>
</ul>
<p>Puedes dejar un criterio sin valorar y volver a tocar el nivel marcado para quitarlo: es preferible no valorar algo que no has visto bien que poner un nivel por cumplir.</p>

<h2>Doce criterios en tres áreas</h2>
<p>La herramienta evalúa lo que se entrena de verdad, dividido en tres áreas:</p>
<ul>
  <li><strong>Técnica:</strong> bote, pase, tiro, entrada a canasta y juego de pies.</li>
  <li><strong>Juego:</strong> lectura del juego, juego sin balón, defensa y rebote.</li>
  <li><strong>Actitud:</strong> esfuerzo, compañerismo, y escucha y aprendizaje.</li>
</ul>
<p>Cada criterio lleva una pista de qué mirar. Por ejemplo, en bote: con las dos manos, sin mirar el balón y protegiéndolo. Esa pista importa más de lo que parece: sirve para que dos entrenadores del mismo club valoren lo mismo y para que tú mismo seas consistente de una evaluación a otra.</p>

<h2>Cuándo y cómo evaluar</h2>
<ul>
  <li><strong>Dos o tres veces por temporada:</strong> al principio, a mitad y al final. Más a menudo es ruido y menos no te deja ver la evolución.</li>
  <li><strong>Evalúa lo observado en partidos y entrenos</strong>, no lo que recuerdas de un día. Si dudas, deja el criterio en blanco.</li>
  <li><strong>Una sentada por evaluación:</strong> valorar a todos el mismo día y con la misma pista de cada criterio hace que sean comparables entre sí las evaluaciones del mismo jugador.</li>
  <li><strong>Comentario del entrenador:</strong> añade unas líneas por jugador, lo que ha avanzado y en qué debe fijarse (hasta 600 caracteres).</li>
</ul>

<h2>Compara con la evaluación anterior, no con el compañero</h2>
<p>Al valorar a un jugador, la herramienta te enseña a la vista el nivel que tenía en cada criterio en la evaluación anterior y resume lo que ha mejorado. El resumen está pensado para no engañar: los puntos fuertes salen solo desde el nivel «Lo consigue», y lo que conviene trabajar solo aparece cuando está por debajo de ese nivel. Así una hoja nunca presenta como «lo mejor» algo que todavía está flojo. Además hay una tabla del equipo por áreas, para ver dónde reforzar los entrenos del grupo. Es para ti: no la repartas entre jugadores ni familias.</p>

<h2>Cómo contarlo a las familias</h2>
<p>La ficha imprimible de cada jugador, con el escudo del club, resume sus niveles y su comentario. Imprimir fichas es una función Pro, gratis durante la beta.</p>
<p>Aparte, si llevas las estadísticas del equipo, el <a href="/familias/">informe para las familias</a> genera una hoja por jugador con su temporada, y siempre en positivo: sus números, un mejor partido, la gráfica de puntos y tu comentario. Solo habla de puntos fuertes frente a la media del equipo sin nombrar a nadie, y solo señala que ha ido a más cuando es verdad. Si un jugador apenas ha jugado, el texto usa una frase neutra en vez de darle una lista vacía.</p>
<p>Los dos documentos cumplen la misma idea: la familia ve el progreso de su hijo o hija, no una clasificación del equipo.</p>

<h2>Una nota sobre los datos</h2>
<p>Las valoraciones y los nombres son datos de menores. En estas herramientas se guardan solo en el navegador del entrenador y no se suben a ningún servidor: si cambias de ordenador o borras los datos del navegador, los pierdes, así que conviene imprimir o guardar en PDF lo que vayas a conservar.</p>

<p class="art-outro">Prueba el método con tu equipo: crea la primera evaluación en <a href="/evaluacion/">Evaluación de jugadores</a> y, cuando termines la temporada, prepara el <a href="/familias/">informe para las familias</a>. Gratis y sin registro.</p>
`,
  },

  // ── Scouting con el informe del rival ───────────────────────────────
  {
    slug: "preparar-partido-informe-rival-scouting-baloncesto-base",
    title: "Cómo preparar un partido con el informe del rival (scouting en baloncesto base)",
    metaTitle: "Preparar un partido con el informe del rival | CANCHA.ZAPA",
    description:
      "Cómo preparar un partido en baloncesto base con el informe del rival: importar actas, qué pistas da la herramienta y cómo contárselo al equipo sin saturar.",
    fecha: "2026-10-19",
    fechaLabel: "19 octubre 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Entrenadores · Rival",
    heroTitle: "Preparar un partido con el informe del rival",
    heroSubtitle: "Qué mirar en las actas, qué pistas da la herramienta y cómo contárselo a tu equipo en tres ideas",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: [],
    relatedSeoPages: ["zapatillas-indoor", "zapatillas-baloncesto-calidad-precio"],
    body: `
<p class="art-intro">En baloncesto de base, preparar un partido no es llenar una libreta de números. Es llegar con dos o tres ideas claras que tus jugadores puedan recordar en plena pista. Los números sirven para elegir bien esas ideas, y el informe del rival de CANCHA.ZAPA los junta a partir de las actas de los últimos partidos del equipo que te toca. Esta guía explica qué calcula de verdad, qué pistas da y cómo convertirlo en un mensaje corto.</p>

<h2>1. De dónde salen los datos</h2>
<p>En el <a href="/rival/">informe del rival</a> creas el equipo con su nombre y le añades partidos de dos maneras:</p>
<ul>
  <li><strong>Acta de la FEB:</strong> pegas el enlace del partido (baloncestoenvivo.feb.es) o su número y pulsas Importar. La herramienta busca cuál de los dos equipos es tu rival por el nombre y, si no lo tiene claro, te pregunta. Solo importa partidos terminados: un acta en directo todavía cambia.</li>
  <li><strong>Acta pegada:</strong> sirve para la FCBQ u otra federación. Copias la tabla de estadísticas del rival con su fila de cabecera (Min, Punts, T2, T3, TL…) y la pegas. Añades la fecha, contra quién jugó y, si quieres que salga el balance de victorias, el marcador.</li>
</ul>
<p>Puedes juntar varios partidos del mismo rival, quitar el que no quieras y volver a consultarlo cuando lo necesites. Un partido es gratis; juntar varios es una función Pro, gratis durante la beta.</p>

<h2>2. Qué calcula</h2>
<p>Con los partidos añadidos, el informe te da una fila de datos del equipo: balance de victorias y derrotas (solo en los partidos con marcador), puntos a favor y en contra de media, porcentaje de triples con sus intentos por partido, porcentaje de tiros de 2 y de tiros libres, y pérdidas y faltas por partido. Debajo, una tabla por jugador con sus medias por partido (minutos, puntos, acierto en 2, triples, tiros libres, rebotes, asistencias y faltas), de más a menos puntos. Las fórmulas son las del modo Equipo de <a href="/estadisticas/">estadísticas</a>.</p>

<h2>3. Las pistas automáticas y sus umbrales</h2>
<p>La herramienta añade unas frases sencillas, calculadas con reglas fijas. No son un análisis: son una forma de que el ojo se vaya a lo importante. Estas son, con sus umbrales:</p>
<ul>
  <li><strong>Anotador principal:</strong> siempre sale, con sus puntos por partido y el porcentaje de los puntos del equipo que pone. Te dice cuánto depende el rival de una persona.</li>
  <li><strong>Tirador de tres:</strong> al menos 4 triples intentados en total, 1,5 o más por partido y un 33 % o más de acierto.</li>
  <li><strong>Cargado de faltas:</strong> 3,5 o más por partido.</li>
  <li><strong>Falla libres yendo mucho a la línea:</strong> 3 o más intentos por partido y menos de un 60 % de acierto.</li>
  <li><strong>Rebote ofensivo:</strong> 3 o más por partido.</li>
  <li><strong>De equipo:</strong> un 35 % o más de sus puntos en triples, tiros libres por debajo del 60 % o 15 o más pérdidas por partido.</li>
</ul>
<p>De cada tipo salen como mucho dos jugadores, para que la lista no se convierta en ruido.</p>

<h2>4. Cómo leerlo sin engañarte</h2>
<ul>
  <li><strong>Pocos partidos, pocas conclusiones:</strong> con dos actas, un 4 de 10 en triples es una anécdota, no una tendencia. Los umbrales piden un mínimo de intentos, pero eso es un filtro, no una garantía.</li>
  <li><strong>Los niños cambian rápido:</strong> un jugador que crece o gana confianza puede no parecerse a su acta de hace dos meses. Da más peso a lo reciente y quita lo antiguo.</li>
  <li><strong>El acta no cuenta cómo juegan:</strong> no dice si defienden en zona, si corren o si bloquean bien. Si puedes ver un partido o un vídeo, usa los números para confirmar lo que ves.</li>
  <li><strong>Sin triple, sin esas pistas:</strong> en categorías sin línea de triple, las pistas de tiradores no aparecerán, y es lo normal.</li>
</ul>

<h2>5. Cómo contárselo al equipo sin saturar</h2>
<ul>
  <li><strong>Tres ideas como máximo:</strong> una de defensa, una de ataque y una sobre vosotros. Más no se recuerda en un tiempo muerto.</li>
  <li><strong>Acciones, no estadísticas:</strong> en vez de «su 7 mete un 38 % de triples», di «el 7 no recibe solo en el perímetro». El jugador tiene que saber qué hacer, no cuánto acierta el rival.</li>
  <li><strong>Antes del partido, pocos minutos:</strong> las ideas en el entrenamiento previo y una frase corta para repetir en el vestuario.</li>
  <li><strong>No enseñes la tabla:</strong> el informe es para ti. Puedes imprimirlo para el banquillo, pero no lo repartas: son datos de otros niños.</li>
  <li><strong>Que lo vuestro pese más:</strong> en base, lo que aprenden los tuyos importa más que anular a un rival. Si el plan de partido te obliga a dejar de hacer lo que estáis trabajando, probablemente sobra.</li>
</ul>
<p>Para pasar esas ideas a limpio, el <a href="/plan-partido/">plan de partido</a> trae las claves del informe con el dorsal de cada rival en vez de su nombre, y las junta con tus objetivos, los emparejamientos y las jugadas de tu pizarra en una hoja y en un mensaje para el grupo del equipo.</p>
<p>Si en tu competición hay normas de participación, el jugador clave del rival tampoco estará siempre en pista. Puedes ver cómo se reparten los minutos en la herramienta de <a href="/minutos/">control de minutos</a>.</p>

<h2>6. Una nota sobre los datos</h2>
<p>Los rivales, las actas y los nombres se guardan solo en tu navegador. Para importar de la FEB, la web pide el acta pública a la federación, pero el informe que construyes no se sube a ningún servidor. Si borras los datos del navegador o cambias de dispositivo, tendrás que volver a añadir los partidos.</p>

<p class="art-outro">¿Tienes ya a tu próximo rival? Crea su ficha en el <a href="/rival/">informe del rival</a>, añade sus últimos partidos y quédate con tres ideas. Gratis y sin registro.</p>
`,
  },

  // ── Rutina de tiro para jugadores ───────────────────────────────────
  {
    slug: "rutina-de-tiro-baloncesto-entrenar-solo-medir-mejora",
    title: "Rutina de tiro para jugadores: cómo entrenar el tiro solo y medir si mejoras",
    metaTitle: "Rutina de tiro: entrena solo y mide si mejoras | CANCHA.ZAPA",
    description:
      "Rutina de tiro para jugadores jóvenes: libres, media distancia y triples por puestos, cómo apuntar anotados e intentos y cómo leer tu evolución sesión a sesión.",
    fecha: "2026-10-19",
    fechaLabel: "19 octubre 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Jugadores · Entrenamiento",
    heroTitle: "Rutina de tiro para entrenar solo",
    heroSubtitle: "Puestos, constancia y un registro sencillo para saber si de verdad mejoras",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: [],
    relatedSeoPages: ["zapatillas-outdoor", "zapatillas-baloncesto-junior", "zapatillas-baloncesto-calidad-precio"],
    body: `
<p class="art-intro">Tirar solo en la pista del barrio o en el pabellón es la mejor manera de coger confianza con el tiro, pero tiene un problema: si no apuntas nada, no sabes si estás mejorando o solo te lo parece. Esta guía propone una rutina sencilla para jugadores jóvenes y te enseña a medirla con el plan de tiro de CANCHA.ZAPA: un toque por tiro, un porcentaje por sesión y una gráfica de cómo evolucionas.</p>

<h2>1. Antes de tirar: el gesto, con prudencia</h2>
<p>No hay una mecánica única, y si tu entrenador te ha corregido algo, hazle caso a él antes que a cualquier guía. Dicho esto, hay ideas que casi todos los entrenadores repiten y que te sirven de lista de comprobación:</p>
<ul>
  <li><strong>Base estable:</strong> pies cómodos, mirando al aro, con las rodillas ligeramente flexionadas.</li>
  <li><strong>Mirada al aro,</strong> no al balón.</li>
  <li><strong>Codo debajo del balón</strong> y alineado con la canasta.</li>
  <li><strong>Acabar el gesto:</strong> brazo estirado, muñeca suelta y mantener la posición un instante tras soltar.</li>
</ul>
<p>Una regla práctica para la distancia: tira desde donde puedas repetir el mismo gesto, no desde donde tengas que lanzar con todo el cuerpo. Si cambias tu mecánica para llegar al aro, todavía estás demasiado lejos. Calienta unos minutos antes (muñecas, hombros y piernas) y, si algo te duele, para.</p>

<h2>2. Las cuatro rutinas del plan</h2>
<p>El <a href="/plan-tiro/">plan de tiro</a> ofrece cuatro rutinas por puestos. Los tiros por puesto son orientativos: puedes hacer más o menos.</p>
<ul>
  <li><strong>Tiros libres:</strong> 25 tiros desde la línea.</li>
  <li><strong>Media distancia:</strong> 5 puestos por 10 tiros: las dos esquinas, las dos alas y el frontal, a unos 4,5 metros del aro.</li>
  <li><strong>Triples:</strong> 5 puestos por 10 tiros, con la misma distribución. Los puestos están a 7,1 metros del aro, algo por fuera de la línea de 6,75 metros de FIBA para que ningún tiro sea dudoso, y las esquinas van junto a la banda.</li>
  <li><strong>Completa:</strong> los 11 puestos (media, triples y libres) a 5 tiros cada uno, 55 en total.</li>
</ul>
<p>Si juegas en minibasket, que no tiene triple, quédate con libres y media distancia.</p>

<h2>3. Cómo apuntar sin perder el ritmo</h2>
<p>Eliges la rutina y, tras cada tiro, tocas ✓ si entra o ✗ si no en el puesto donde estás. Verás los anotados y los intentos de cada puesto y el total de la sesión. Tres hábitos que hacen que el registro valga:</p>
<ul>
  <li><strong>Apunta todos los tiros,</strong> también los fallos. No vale repetir un tiro ni quitar los malos: el porcentaje solo sirve si es honesto.</li>
  <li><strong>Deshacer último</strong> corrige un toque equivocado. Ojo: recuerda lo que has apuntado desde que abriste la página; si la recargas, ya no puede deshacerlo.</li>
  <li><strong>Si cierras la pestaña a mitad,</strong> la sesión en curso se conserva. «Empezar de cero» la borra (te pide confirmación), y si cambias de rutina a mitad te avisa antes de borrar los tiros de puestos que la nueva no tiene. Al terminar, pulsa Guardar sesión: se guarda con la fecha de hoy, y no deja guardar una sesión sin tiros.</li>
</ul>

<h2>4. Cómo leer tu evolución</h2>
<p>En «Tu evolución» puedes ver todos tus tiros o un puesto concreto. Con dos sesiones guardadas aparece la gráfica del porcentaje de cada sesión, con una línea gris en el 50 %. Debajo, una media pista pinta el porcentaje acumulado de cada puesto en verde, ámbar o rojo, y un historial te deja borrar una sesión si te equivocaste al apuntarla.</p>
<ul>
  <li><strong>Mira tendencias, no sesiones sueltas:</strong> con 10 tiros por puesto, un solo tiro cambia mucho el porcentaje. Una mala tarde no dice nada; tres semanas seguidas, sí.</li>
  <li><strong>Compara lo comparable:</strong> misma rutina, mismo número de tiros y, si puedes, la misma pista y el mismo balón.</li>
  <li><strong>Usa el mapa para decidir:</strong> el puesto más flojo es el que más te puede dar, pero no abandones el resto.</li>
</ul>

<h2>5. Constancia mejor que maratón</h2>
<p>Tres sesiones cortas a la semana rinden más que una larga el domingo, y una sesión de 20 o 30 minutos con la mente puesta en cada tiro vale más que 200 tiros por inercia. Cambia de puesto cuando termines los tiros previstos, no cuando te canses de fallar, y acaba siempre con algo que te salga bien.</p>

<h2>6. Del entrenamiento al partido</h2>
<p>Cuando tengas un entrenador o un familiar con ganas, el <a href="/tiro/">mapa de tiro</a> hace lo mismo en partido: marca en la pista dónde se tira y si entra, y calcula tiros de campo, triples, puntos y el eFG por jugador y por zona (zona, media distancia, triple de esquina y triple frontal). Ver toda la temporada es una función Pro, gratis durante la beta. No esperes el mismo porcentaje que en tu rutina: en partido hay defensor, cansancio y presión. Úsalo para ver desde qué zonas tiras de verdad.</p>

<h2>Una nota sobre los datos</h2>
<p>Tus sesiones se guardan solo en este navegador y no se suben a ningún servidor. Si borras los datos del navegador o cambias de móvil, empezarás de cero. Si eres menor, no hace falta que compartas tus números con nadie.</p>

<p class="art-outro">¿Listo para la primera sesión? Abre el <a href="/plan-tiro/">plan de tiro</a>, elige una rutina y apunta tus primeros 25 tiros. Gratis y sin registro.</p>
`,
  },

  // ── Asistencia y convocatorias ──────────────────────────────────────
  {
    slug: "asistencia-convocatorias-equipo-baloncesto-base",
    title: "Asistencia y convocatorias: cómo organizar tu equipo de base sin perder la cabeza",
    metaTitle: "Asistencia y convocatorias en un equipo de base | CANCHA.ZAPA",
    description:
      "Pasa lista en cada entrenamiento, calcula el porcentaje de asistencia y prepara la convocatoria para WhatsApp. Guía para entrenadores de baloncesto base.",
    fecha: "2026-10-19",
    fechaLabel: "19 octubre 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Entrenadores · Equipo",
    heroTitle: "Asistencia y convocatorias sin perder la cabeza",
    heroSubtitle: "Pasar lista con un toque, entender el porcentaje y enviar la convocatoria a las familias",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: [],
    relatedSeoPages: ["zapatillas-baloncesto-junior", "zapatillas-baloncesto-calidad-precio"],
    body: `
<p class="art-intro">Quien entrena a un equipo de base sabe que el baloncesto es lo fácil. Lo que desgasta es quién viene el martes, a quién convocas el sábado y que todos sepan la hora de quedada. Esta guía propone una forma ordenada de llevar la asistencia a los entrenamientos y preparar la convocatoria con la herramienta de <a href="/asistencia/">asistencia y convocatorias</a>, y cómo cruzarla con el control de minutos.</p>

<h2>1. Empieza por la plantilla</h2>
<p>En el apartado «Jugadores» escribes uno por línea, con el formato que prefieras (por ejemplo, «4 Laia»). Admite hasta 30. Dos consejos:</p>
<ul>
  <li><strong>Escribe solo lo que quieras que aparezca en el grupo:</strong> la convocatoria usa esas líneas tal cual, así que mejor nombre de pila o dorsal que apellidos completos.</li>
  <li><strong>Si ya tienes un equipo</strong> creado en el modo Equipo de <a href="/estadisticas/">estadísticas</a>, la herramienta te deja cargarlo y no tienes que escribir a nadie dos veces.</li>
</ul>

<h2>2. Pasar lista en cada entrenamiento</h2>
<p>Creas el entrenamiento con su fecha (por defecto, hoy; si ya existe uno de esa fecha, se abre ese). Después tocas a cada jugador y su estado cambia en este orden: ✓ ha venido, ✗ falta, J falta justificada, y vuelta a vacío. Hay un botón «Todos presentes» para el caso habitual: marca a los que estén sin marcar y respeta las faltas que ya hayas puesto.</p>
<p>Hazlo siempre en el mismo momento, por ejemplo al terminar el calentamiento; si lo dejas para luego, acabarás apuntando de memoria.</p>

<h2>3. Qué significa el porcentaje</h2>
<p>La tabla de la temporada muestra, por jugador, los ✓, los ✗, las J y un porcentaje. El cálculo es: veces que vino, dividido entre las veces que vino más las que faltó sin justificar. Las faltas justificadas no cuentan en contra, y un entrenamiento en el que no marcas a un jugador no cuenta para él. Un ejemplo: 8 ✓, 2 ✗ y 3 J dan un 80 %. Si aún no hay datos, aparece un guion.</p>
<ul>
  <li><strong>Úsalo para hablar, no para castigar:</strong> si a un jugador le sale un 50 %, lo útil es preguntar qué pasa, no sentarlo.</li>
  <li><strong>No lo publiques:</strong> es información para ti. Un ranking de asistencia entre niños no motiva a nadie.</li>
  <li><strong>Marca a todos:</strong> lo que dejas en blanco no cuenta ni a favor ni en contra, así que un porcentaje con huecos engaña. Lo más cómodo es pulsar «Todos presentes» y corregir solo las faltas.</li>
</ul>

<h2>4. La convocatoria para WhatsApp</h2>
<p>En la columna de convocatoria rellenas el equipo, el rival, la fecha, la hora del partido, la hora de quedada, la equipación, el lugar y unas notas (hasta 300 caracteres). Todos los jugadores aparecen marcados como convocados y desmarcas a quien no va. La herramienta compone el mensaje con el formato de WhatsApp: título en negrita, partido, lugar, hora de quedada, equipación, lista de convocados con su número y tus notas.</p>
<p>Lo copias con un botón o, en el móvil, lo compartes directamente con el menú de tu teléfono. Un truco: pon en las notas lo que siempre se olvida (agua, calzado de pabellón) y te ahorrarás mensajes de aclaración.</p>
<p>Lo que escribes en la convocatoria también se queda guardado en tu navegador: si cierras la página a medias, al volver sigue ahí.</p>

<h2>5. Cruza la asistencia con el control de minutos</h2>
<p>Antes de decidir a quién convocas, mira la asistencia, y antes del partido mira los minutos. La herramienta de <a href="/minutos/">control de minutos</a> te deja marcar quién sale de inicio en cada período (I) y quién entra con el período empezado (E), y te avisa en directo de quién cumple, a quién le falta un inicio y quién ha llegado al máximo.</p>
<p>Trae dos normas ya cargadas, ambas de la FCBQ: minibasket (8 períodos de 6 minutos) y passarel·la (8 períodos de 5 minutos), y una opción personalizada donde fijas tú los períodos, los jugadores en pista y los mínimos y máximos. Con la norma elegida, un botón «Proponer rotación» (función Pro, gratis durante la beta) reparte los inicios para que se cumpla. Avisa también si con el número de jugadores que has escrito la norma no se puede cumplir.</p>
<p>Ojo: esas normas son las que implementa la herramienta, basadas en un resumen de reglamentos de la FCBQ que puede estar desfasado, y cada competición puede tener las suyas. Confirma siempre la normativa vigente con la federación de tu competición o con el club antes de fiarte de los avisos, y usa la opción personalizada si la tuya es distinta.</p>

<h2>6. Una rutina de semana que funciona</h2>
<ul>
  <li><strong>En cada entrenamiento:</strong> pasa lista al empezar.</li>
  <li><strong>Dos días antes del partido:</strong> revisa la asistencia y decide la lista.</li>
  <li><strong>El día anterior:</strong> envía la convocatoria con hora de quedada, lugar y equipación.</li>
  <li><strong>Antes del partido:</strong> abre minutos, comprueba la norma y marca la rotación prevista.</li>
</ul>

<h2>Una nota sobre los datos</h2>
<p>Los nombres, las listas de asistencia y las marcas son datos de menores. En estas herramientas se guardan solo en el navegador del entrenador y no se suben a ningún servidor. El mensaje de la convocatoria solo sale de aquí si tú lo copias o lo compartes. Si cambias de ordenador o borras los datos del navegador, los pierdes.</p>

<p class="art-outro">Empieza por lo sencillo: escribe tu plantilla en <a href="/asistencia/">Asistencia y convocatorias</a> y pasa lista en el próximo entrenamiento. Gratis y sin registro.</p>
`,
  },

  // ── Plan de partido ─────────────────────────────────────────────────
  {
    slug: "plan-de-partido-baloncesto-base-que-tu-equipo-lo-recuerde",
    title: "Cómo hacer un plan de partido en baloncesto base (y que tu equipo lo recuerde)",
    metaTitle: "Plan de partido en baloncesto base, en una hoja | CANCHA.ZAPA",
    description:
      "Cómo preparar un plan de partido en baloncesto base: pocas ideas, claves del rival con dorsales, emparejamientos y jugadas dibujadas, en una hoja y un mensaje.",
    fecha: "2026-10-19",
    fechaLabel: "19 octubre 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Entrenadores · Partido",
    heroTitle: "Cómo hacer un plan de partido que tu equipo recuerde",
    heroSubtitle: "Pocas ideas, acciones concretas y una hoja que cabe en el banquillo",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: [],
    relatedSeoPages: ["zapatillas-indoor", "zapatillas-baloncesto-junior", "zapatillas-baloncesto-calidad-precio"],
    body: `
<p class="art-intro">Un plan de partido que no se recuerda no sirve de nada. En baloncesto base el problema rara vez es que falte información: es que sobra. Diez claves del rival, cinco jugadas y tres defensas distintas no caben en la cabeza de un jugador de 12 años en mitad de un partido. Esta guía propone cómo decidir qué entra en el plan y montarlo con el <a href="/plan-partido/">plan de partido</a> de CANCHA.ZAPA, que junta en una hoja lo que ya tienes en el navegador: las claves del rival, tus jugadas y tu plantilla.</p>

<h2>1. Elige poco y hazlo concreto</h2>
<p>Una regla práctica: dos o tres objetivos, una idea clara para atacar, una para defender y una situación especial para el final del partido. Lo que no cabe ahí, se trabaja en el entrenamiento pero no va al plan.</p>
<ul>
  <li><strong>Acciones, no deseos:</strong> «cerrar el rebote defensivo» es una acción; «jugar mejor» no lo es. «No dejar tirar al 7» se entiende.</li>
  <li><strong>Lo que controláis vosotros:</strong> en formación pesa más lo que tu equipo aprende que anular al rival.</li>
  <li><strong>Una frase por línea:</strong> cada punto debe poder decirse en un tiempo muerto sin mirar el papel.</li>
</ul>

<h2>2. Qué trae la hoja</h2>
<p>El plan tiene estas secciones, y solo salen las que rellenas:</p>
<ul>
  <li><strong>El partido:</strong> rival, fecha, hora y lugar.</li>
  <li><strong>Objetivos, En ataque y En defensa:</strong> una idea por línea.</li>
  <li><strong>Claves del rival:</strong> se escriben a mano o se traen del informe del rival.</li>
  <li><strong>Emparejamientos:</strong> hasta 12 filas con tu jugador, el rival y una nota.</li>
  <li><strong>Jugadas:</strong> hasta 6, elegidas de tu pizarra.</li>
  <li><strong>Situaciones especiales:</strong> último ataque, presión, cuándo pedir tiempo muerto.</li>
</ul>
<p>Puedes guardar hasta 20 planes, uno por partido.</p>

<h2>3. Claves del rival, con dorsales</h2>
<p>Si ya has añadido actas del rival en el <a href="/rival/">informe del rival</a>, el plan te deja elegirlo en un desplegable y trae sus claves de golpe. Al traerlas, el plan cambia el nombre de cada jugador por su dorsal («Su anotador principal es #7: …»). Si el acta no trae dorsal, usa las iniciales («P. R.») y nunca el nombre completo. Es lo que se dice en pista y, de paso, el mensaje al grupo no lleva nombres de niños de otro equipo.</p>
<p>Si añades partidos al informe, el botón «Traer del informe del rival» refresca las claves (te pregunta antes de sustituir lo escrito). Y si cambias de rival, te pregunta si quieres sustituir las claves escritas por las del nuevo.</p>
<p>Las claves salen de reglas fijas sobre las actas (anotador principal, tiradores, faltas…): quédate solo con las que cambien lo que vais a hacer. Con pocas actas, son una pista, no una verdad.</p>

<h2>4. Emparejamientos que se entienden</h2>
<p>En cada fila escribes tu jugador, el dorsal del rival y, si quieres, una nota corta («negarle el balón»). Mientras escribes, la herramienta te ofrece como sugerencia los dorsales del rival elegido y los jugadores de tu equipo, si tienes uno creado en el modo Equipo de <a href="/estadisticas/">estadísticas</a>. En la hoja salen como «tu jugador → rival (nota)».</p>
<p>Marca solo los que importan, normalmente el anotador del rival. El resto, defensa normal.</p>

<h2>5. Jugadas de tu pizarra</h2>
<p>Las jugadas que has guardado en la <a href="/pizarra/">pizarra</a> aparecen como casillas para marcar, con su categoría al lado (hasta 6 por plan). En el mensaje para el grupo salen solo con su nombre; en la hoja impresa, con su dibujo. Si borras una jugada de la pizarra, el plan la quita y te avisa. Elige las que vuestro equipo ya ejecuta bien: un plan no es el sitio para estrenar jugadas.</p>

<h2>6. Del plan a la semana de entrenamiento</h2>
<ul>
  <li><strong>Inicio de semana:</strong> prepara el plan y decide las dos o tres ideas.</li>
  <li><strong>Entrenamientos:</strong> unos minutos para cada idea, con las jugadas elegidas. Si no se puede entrenar, quizá no debería estar en el plan.</li>
  <li><strong>El día antes:</strong> manda el mensaje al grupo del equipo.</li>
  <li><strong>El día del partido:</strong> repetid las ideas en el vestuario con las mismas palabras del plan.</li>
</ul>

<h2>7. El mensaje del grupo y la hoja del banquillo</h2>
<p>El cuadro «Para el equipo» compone solo el texto, con el formato de WhatsApp (títulos en negrita y viñetas), y se actualiza mientras escribes. Lo puedes copiar o compartir con el menú del móvil. Léelo antes de enviarlo: lleva también las claves del rival, con sus cifras.</p>
<p>«Imprimir plan» genera una hoja A4 con las secciones en dos columnas, las jugadas con su dibujo y el escudo y el nombre de tu club arriba, si los has guardado en la pizarra (Biblioteca, «Escudo y colores del club»). La hoja impresa con escudo es una función Pro, gratis durante la beta. Llévala al banquillo para tener a mano quién defiende a quién y qué hacer en el último ataque.</p>

<h2>Una nota sobre los datos</h2>
<p>El plan, el informe del rival y la pizarra se guardan solo en el navegador de tu dispositivo y no se suben a ningún servidor. Si borras los datos del navegador o cambias de móvil u ordenador, tendrás que empezar de nuevo.</p>

<p class="art-outro">Empieza por lo pequeño: abre el <a href="/plan-partido/">plan de partido</a>, elige a tu próximo rival y escribe tres líneas. Si aún no has preparado su ficha, hazlo primero en el <a href="/rival/">informe del rival</a>. Gratis y sin registro.</p>
`,
  },

  // ── Pizarra táctica ─────────────────────────────────────────────────
  {
    slug: "pizarra-tactica-online-baloncesto-dibujar-animar-compartir",
    title: "Pizarra táctica online para baloncesto: cómo dibujar, animar y compartir jugadas",
    metaTitle: "Pizarra táctica online de baloncesto: guía | CANCHA.ZAPA",
    description:
      "Guía de la pizarra táctica online de CANCHA.ZAPA: dibuja jugadas por pasos, anímalas, comparte por enlace o QR y prepara sesiones por edad. Gratis en tu móvil.",
    fecha: "2026-10-19",
    fechaLabel: "19 octubre 2026",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Entrenadores · Pizarra",
    heroTitle: "Pizarra táctica online: dibujar, animar y compartir",
    heroSubtitle: "Un flujo de principio a fin para entrenadores de base, con lo que es gratis y lo que es Pro",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: [],
    relatedSeoPages: ["zapatillas-indoor", "zapatillas-baloncesto-junior", "zapatillas-baloncesto-calidad-precio"],
    body: `
<p class="art-intro">Una jugada en un papel se explica; una que se mueve paso a paso se entiende. La <a href="/pizarra/">pizarra táctica</a> de CANCHA.ZAPA funciona en el navegador, sin registro, en el móvil o la tableta, y guarda todo en tu dispositivo. Esta guía recorre lo que hace, en el orden en que lo usa un entrenador de base, e indica qué es Pro (gratis durante la beta).</p>

<h2>1. Elige la pista y coloca las piezas</h2>
<p>Primero eliges el tipo de pista: FIBA o minibasket (aro a 2,60 m), en media pista o completa, y puedes girarla y cambiar el color. Después colocas atacantes, defensores, balón, conos, jugadores neutros, entrenador y filas de jugadores esperando turno.</p>
<p>Para el movimiento hay una herramienta por acción: pase (discontinua), bote (zigzag), corte (continua), bloqueo (línea en T), tiro, y rotación para indicar adónde va el jugador después. Si empiezas de cero, las «Formaciones» colocan en un paso la formación que elijas, como 1-3-1, 2-3, cuernos, individual, zona 2-3 o presión 1-2-1-1, y se pueden deshacer.</p>

<h2>2. Divide la jugada en pasos</h2>
<p>Una jugada es una secuencia de pasos. Al añadir un paso, parte de donde acabaron los jugadores del anterior, y solo dibujas lo que cambia. Puedes duplicar o borrar pasos y escribir una nota por paso («el 5 sube a bloquear»).</p>
<ul>
  <li><strong>Numera las líneas</strong> de un paso para marcar el orden: se ve un número en cada flecha.</li>
  <li><strong>Pon nombre a los jugadores:</strong> carga la plantilla de un equipo que ya tengas en el modo Equipo de <a href="/estadisticas/">estadísticas</a>, o quítalos.</li>
  <li><strong>Reproduce la jugada</strong> a velocidad de 0,5× a 2× para comprobar que se entiende.</li>
</ul>

<h2>3. No empieces de cero si no hace falta</h2>
<p>La biblioteca trae cinco plantillas (pick and roll, cuernos, saque de fondo en caja, contraataque 3 contra 2 y zona 2-3) y doce ejercicios de entrenamiento: rueda de bandejas, tres hombres, 3c2 y 2c1 continuo, mikan, 1c1 con salida desde el aro, tiro en estrella, tiro con rebote y pase, zig-zag defensivo, cierre de rebote, 2c2 de bloqueo directo, pase y corte y la concha defensiva 4c4. Las abres, las cambias y las guardas con tu nombre y una categoría (ataque, defensa, saques, contraataque, presión o ejercicio).</p>

<h2>4. Lecturas: qué pasa si el defensor hace otra cosa (Pro)</h2>
<p>Con «+ Lectura» creas una alternativa que sale de un paso, por ejemplo «si pasa por detrás», con sus propios pasos. Hasta 6 por jugada. Crearlas es Pro.</p>

<h2>5. Guardar, y no perderlo todo</h2>
<p>Guardas la jugada en tu biblioteca, con búsqueda y filtro por categoría. Hay copia de seguridad y restauración, y conviene usarla: si borras los datos del navegador, cambias de dispositivo o usas una ventana de incógnito, las jugadas se pierden.</p>

<h2>6. Compartir: seis maneras</h2>
<ul>
  <li><strong>Enlace:</strong> la jugada viaja dentro de la dirección, sin subirse a ningún servidor. Si es muy largo, la herramienta avisa y propone imagen o archivo.</li>
  <li><strong>Imagen o PDF:</strong> PNG del paso o hoja con todos los pasos, e impresión de una jugada o de todo el playbook.</li>
  <li><strong>Modo jugador y código QR (Pro):</strong> un enlace de solo ver que abre la jugada en bucle, con las notas y sin herramientas de edición. El QR sirve para proyectarlo o ponerlo en la tableta.</li>
  <li><strong>GIF o vídeo WebM (Pro):</strong> el GIF se ve en WhatsApp, incluido iPhone; el vídeo WebM no funciona en Safari. Hacen falta al menos dos pasos.</li>
  <li><strong>Archivo .json:</strong> de una jugada o de todo el playbook.</li>
  <li><strong>Hoja de banquillo:</strong> 4 o 6 jugadas por folio, con el nombre grande y los pasos superpuestos o solo el último. Es gratis y para llevar al partido.</li>
</ul>
<p>Quien recibe un enlace puede guardarlo en su biblioteca o editar una copia. Y para el partido, el botón «Tiempo muerto» deja una pizarra limpia a pantalla completa en la que mover piezas y dibujar flechas.</p>

<h2>7. Sesiones de entrenamiento (Pro)</h2>
<p>El botón «Sesión» monta un plan con bloques, minutos, notas y material. Trae cinco sesiones listas por etapa: Premini (6–8 años), Mini (9–11), Infantil (12–13), Cadete (14–15) y Júnior/Sénior (16+). Son una base editable. Antes de crearla puedes elegir el objetivo (general, tiro, defensa o transición), la duración y cuántos jugadores tienes, de 4 a 24: reparte los minutos y añade una nota de organización a los bloques que la admiten (tríos, parejas, número de canastas). Se imprime en una o dos hojas A4.</p>

<h2>8. Club y escudo</h2>
<p>Un coordinador puede compartir toda su biblioteca, jugadas y sesiones, con el nombre del club, por enlace o archivo, sin los nombres de sus jugadores. Compartir es Pro; recibirlo es gratis, y una versión nueva sustituye a la anterior sin tocar lo tuyo. El nombre, el color y el escudo del club salen arriba del playbook, la hoja de banquillo y las sesiones; guardarlos es Pro.</p>

<h2>Un flujo de principio a fin</h2>
<ul>
  <li><strong>Lunes:</strong> abre una plantilla o un ejercicio, adáptala y guárdala.</li>
  <li><strong>Entrenamiento:</strong> proyecta el QR o enseña la animación y explica la jugada en dos minutos.</li>
  <li><strong>Entre semana:</strong> manda el GIF o el enlace de solo ver.</li>
  <li><strong>Partido:</strong> imprime la hoja de banquillo y usa el tiempo muerto.</li>
</ul>
<p>Cuando quieras llevar las jugadas a un partido concreto, el <a href="/plan-partido/">plan de partido</a> las junta con los objetivos y las claves del <a href="/rival/">informe del rival</a>.</p>

<p class="art-outro">¿Listo? Abre la <a href="/pizarra/">pizarra táctica</a>, carga una plantilla y dibuja tu primera jugada. Gratis y sin registro.</p>
`,
  },
];

// ─────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────
export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getAllArticles(): Article[] {
  return [...ARTICLES].sort((a, b) => b.fecha.localeCompare(a.fecha));
}
