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
  // Para JSON-LD Article
  author: string;
  // SEO internal links sugeridos
  relatedShoes: string[]; // slugs de zapatillas
  relatedSeoPages: string[]; // slugs de páginas SEO
}

export const ARTICLES: Article[] = [
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
    relatedShoes: ["nike-gt-cut-4", "adidas-ae-3", "ua-curry-13", "nike-lebron-23", "jordan-tatum-4"],
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
  <li><strong>80-130€:</strong> El sweet spot. Aquí están las mejores relaciones calidad-precio: Nike Ja 3, Adidas AE 3, UA Curry 13.</li>
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
  <li><strong>Compara precios:</strong> El mismo modelo puede variar 20-30€ entre tiendas. Amazon ES, Foot Locker y Nike.es suelen tener los mejores precios en distintos momentos.</li>
  <li><strong>Compra, juega, y si no encaja, devuelve:</strong> La mayoría de tiendas admiten devolución en 30 días. Úsalas en pista interior el primer día para no perder el derecho.</li>
</ol>

<p class="art-outro">Si tienes dudas sobre qué modelo concreto elegir, <a href="/quiz">empieza el quiz</a> — en menos de un minuto tienes tu lista personalizada.</p>
    `,
  },

  // ── 2. Comparativa AE 3 vs Ja 3 ─────────────────────────────────────
  {
    slug: "adidas-ae-3-vs-nike-ja-3-2025",
    title: "AE 3 vs Ja 3: ¿cuál es mejor para guards y escoltas en 2025?",
    metaTitle: "Adidas AE 3 vs Nike Ja 3 2025: comparativa completa | CANCHA.ZAPA",
    description:
      "Comparativa técnica entre la Adidas AE 3 (Anthony Edwards) y la Nike Ja 3 (Ja Morant): tracción, amortiguación, horma y precio para guards y escoltas.",
    fecha: "2026-05-22",
    fechaLabel: "22 mayo 2026",
    categoria: "Comparativas",
    readMinutes: 5,
    eyebrow: "★ Comparativa · Guards 2025",
    heroTitle: "AE 3 vs Ja 3",
    heroSubtitle: "La batalla de los guards en 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["adidas-ae-3", "nike-ja-3", "ua-curry-13", "nike-gt-cut-4"],
    relatedSeoPages: ["mejor-zapatilla-base", "mejor-zapatilla-escolta", "zapatillas-reactivas"],
    body: `
<p class="art-intro">2025 tiene dos claros candidatos al trono de los guards: la Adidas AE 3 de Anthony Edwards y la Nike Ja 3 de Ja Morant. Ambas cuestan alrededor de 130€, las dos son low-top, y las dos prometen lo mismo. Aquí te decimos cuál vale realmente la pena.</p>

<h2>Resumen rápido</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Atributo</th>
      <th style="padding:8px;text-align:center">Adidas AE 3</th>
      <th style="padding:8px;text-align:center">Nike Ja 3</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Tracción</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Amortiguación</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">⭐ 8/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Respuesta</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Horma</td>
      <td style="padding:8px;text-align:center">Normal</td>
      <td style="padding:8px;text-align:center">⭐ Ancha</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Peso</td>
      <td style="padding:8px;text-align:center">340g</td>
      <td style="padding:8px;text-align:center">⭐ 326g</td>
    </tr>
    <tr>
      <td style="padding:8px">Precio</td>
      <td style="padding:8px;text-align:center">⭐ ~130€</td>
      <td style="padding:8px;text-align:center">~135€</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Tracción: ventaja clara para la AE 3</h2>
<p>El patrón herringbone de la AE 3 es uno de los mejores del mercado en 2025. Agarra sin necesidad de limpiar cada partido y funciona bien en parquet polvoriento. La Ja 3 también tiene buena tracción, pero en condiciones sucias la AE 3 gana por un margen notable.</p>
<p><strong>Veredicto:</strong> AE 3 si juegas en pistas con polvo frecuente.</p>

<h2>Amortiguación: Ja 3 va un paso por delante</h2>
<p>La Ja 3 usa ZoomX full-length — la misma espuma de los Vaporfly de running. Eso se nota: el bounce es superior al Lightstrike Pro de la AE 3, que es más firme y reactivo pero con menor retorno energético puro. Para un guard de más de 85kg, la Ja 3 protege mejor las rodillas.</p>
<p><strong>Veredicto:</strong> Ja 3 si priorizas el cushion o pesas más de 80kg.</p>

<h2>Respuesta: empate técnico</h2>
<p>Ambas tienen 9/10 en respuesta en nuestro análisis. La AE 3 tiene un primer paso más agresivo gracias al Lightstrike Pro firme; la Ja 3 tiene más bounce pero similar tiempo de respuesta. Para guards explosivos, las dos están en el mismo nivel.</p>

<h2>Horma: ventaja Ja 3 para pies anchos</h2>
<p>La AE 3 tiene horma normal — ni estrecha ni ancha. La Ja 3 tiene una horma más generosa, especialmente en el antepié. Si tu pie es ancho o has tenido problemas con Nike en el pasado (muchos modelos van estrechos), la Ja 3 es más segura.</p>

<h2>¿Cuál debo comprar?</h2>
<p>Depende de qué priorices:</p>
<ul>
  <li><strong>Elige la AE 3 si:</strong> priorizas tracción sobre todo, juegas en pistas con polvo, tienes pie normal y buscas el menor precio posible.</li>
  <li><strong>Elige la Ja 3 si:</strong> priorizas el cushion y el bounce, tienes pie ancho, pesas más de 80kg o juegas en pistas en buen estado donde la tracción no es problema.</li>
</ul>

<p>Las dos son excelentes zapatillas de guards de 2025. Si te queda duda, <a href="/comparar?slugs=adidas-ae-3,nike-ja-3">compáralas aquí lado a lado</a> con todos los atributos desplegados.</p>

<p class="art-outro">¿Aún no sabes cuál encaja con tu perfil específico? <a href="/quiz">El quiz te da la respuesta en 10 preguntas</a>.</p>
    `,
  },

  // ── 3. Análisis Air Jordan 40 ─────────────────────────────────────────
  {
    slug: "air-jordan-40-analisis-2025",
    title: "Air Jordan 40: análisis completo — ¿la mejor Jordan performance de la historia?",
    metaTitle: "Air Jordan 40 análisis completo 2025 | CANCHA.ZAPA",
    description:
      "Análisis técnico completo de la Air Jordan 40: ZoomX + Zoom Strobel, herringbone de 40°, 6 straps internos. ¿Vale los 200€?",
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
<p>La Jordan 40 es ideal para aleros y ala-pívots de 75-100kg que priorizan cushion y bounce. No es para guards puros — es demasiado pesada y el ZoomX (aunque reactivo) no da el mismo primer paso que una AE 3 o una Ja 3.</p>

<h3>Puntuación técnica CANCHA.ZAPA</h3>
<ul>
  <li>Tracción: 8/10 (baja a 6 si no limpias la suela)</li>
  <li>Amortiguación: <strong>10/10</strong> — la mejor del mercado mainline</li>
  <li>Respuesta: 9/10 (el ZoomX bounce es lo mejor que ofrece)</li>
  <li>Soporte lateral: 8/10 (las 6 correas hacen su trabajo)</li>
  <li>Estabilidad: 7/10 (ligera inestabilidad en el antepié con carga extrema)</li>
  <li>Ligereza: 6/10 (395g — no es ligera)</li>
  <li>Durabilidad outdoor: 6/10 (no la lleves al asfalto)</li>
</ul>

<h2>¿Vale los 200€?</h2>
<p>Esa es la pregunta del millón. La respuesta honesta: <strong>sí, si juegas 3+ veces por semana y priorizas cushion</strong>. El ZoomX + Zoom Strobel es tecnología real que se nota en partidos largos. Para un pívot o ala-pívot que aterriza constantemente, puede hacer una diferencia real en cómo se siente el cuerpo al día siguiente.</p>

<p>Si juegas recreativo o menos de 2 veces por semana, ahorra 50-70€ y compra una Jordan Tatum 4 o una Nike KD 18 — ambas ofrecen 90% del rendimiento de la Jordan 40 a menor precio.</p>

<h2>Disponibilidad en España</h2>
<p>La Jordan 40 se encuentra en Nike.es, Foot Locker ES, JD Sports ES y Amazon ES. El precio de salida fue 199.99€; en los primeros meses suele haber pequeñas rebajas en colorways específicos. Sigue el precio en nuestra <a href="/zapatilla/jordan-40">ficha de la Jordan 40</a>.</p>

<p class="art-outro">¿No estás seguro si la Jordan 40 es para ti? <a href="/quiz">Haz el quiz</a> — en función de tu posición, peso y presupuesto te diremos si es tu match o si hay algo más adecuado.</p>
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
