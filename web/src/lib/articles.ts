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
    relatedSeoPages: ["mejor-zapatilla-base", "mejor-zapatilla-pivot", "zapatillas-baratas"],
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
    relatedSeoPages: ["mejores-zapatillas-jordan", "zapatillas-premium", "zapatillas-cushion"],
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
    relatedSeoPages: ["mejor-zapatilla-pivot", "zapatillas-cushion", "zapatillas-premium"],
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

<h3><a href="/zapatilla/nike-lebron-23">Nike LeBron 23 — 179€</a></h3>
<p><strong>Para qué perfil:</strong> Pívots y ala-pívots de 85-110kg que necesitan la máxima amortiguación posible sin perder tracción.</p>
<ul>
  <li>✅ Max Air en talón + React en toda la entresuela: el combo de cushion más potente de Nike en baloncesto.</li>
  <li>✅ Suela de caucho multidireccional: agarre excepcional en parquet limpio y sucio.</li>
  <li>✅ Upper Flyknit reforzado: soporte lateral sólido sin rigidez excesiva.</li>
  <li>❌ 395g — la más pesada del grupo. Se nota en las ayudas defensivas lentas.</li>
  <li>❌ La horma estrecha de Nike no encaja bien en pies anchos.</li>
</ul>

<h3><a href="/zapatilla/nike-kd-19">Nike KD 19 — 149€</a></h3>
<p><strong>Para qué perfil:</strong> Ala-pívots más dinámicos, 80-100kg, que no quieren sacrificar velocidad por cushion.</p>
<ul>
  <li>✅ Zoom Strobel + Cushlon 3.0: cushion reactivo, no solo absorbente. Bounce real.</li>
  <li>✅ Upper TPU con dagger-cage: soporte lateral sin peso extra.</li>
  <li>✅ 30€ más barata que la LeBron 23 con rendimiento casi equivalente.</li>
  <li>❌ La amortiguación no llega al nivel Max Air para aterrizajes muy duros.</li>
  <li>❌ Horma algo estrecha en el antepié.</li>
</ul>

<h3><a href="/zapatilla/jordan-40">Air Jordan 40 — 199€</a></h3>
<p><strong>Para qué perfil:</strong> Ala-pívots que priorizan el bounce sobre todo y pueden invertir en la opción premium.</p>
<ul>
  <li>✅ ZoomX + Zoom Strobel: la combinación de espuma más avanzada que Jordan Brand ha puesto en baloncesto. Devuelve el 85% de la energía.</li>
  <li>✅ 6 correas internas de contención: soporte lateral excepcional a pesar de la blandura del ZoomX.</li>
  <li>✅ Herringbone 40°: muy buena tracción en pista limpia.</li>
  <li>❌ 199€ — la más cara del grupo. Solo tiene sentido si juegas 3+ veces por semana.</li>
  <li>❌ El ZoomX atrae el polvo. En pistas sucias, la tracción baja notablemente.</li>
  <li>❌ 395g — tan pesada como la LeBron.</li>
</ul>

<h3><a href="/zapatilla/anta-kt-11">ANTA KT 11 — ~80€ (AliExpress)</a></h3>
<p><strong>Para qué perfil:</strong> Jugadores de recreativo o junior con presupuesto ajustado que no quieren sacrificar todo el soporte.</p>
<ul>
  <li>✅ 80€ — la mitad que la KD 19 con soporte más que aceptable para recreativo.</li>
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
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Nike LeBron 23</strong></td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">179€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Nike KD 19</strong></td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">149€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Air Jordan 40</strong></td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">199€</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>ANTA KT 11</strong></td>
      <td style="padding:8px;text-align:center">6/10</td>
      <td style="padding:8px;text-align:center">6/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">~80€</td>
    </tr>
  </tbody>
</table>
</div>

<h2>¿Cuál elegir?</h2>
<ul>
  <li><strong>Si pesas más de 95kg y juegas 3+ veces/semana:</strong> Nike LeBron 23. El cushion Max Air es insustituible.</li>
  <li><strong>Si eres ala-pívot dinámico y buscas el mejor equilibrio precio/rendimiento:</strong> Nike KD 19 a 149€.</li>
  <li><strong>Si priorizas el bounce y puedes gastar 200€:</strong> Air Jordan 40. Es la más avanzada tecnológicamente.</li>
  <li><strong>Si eres junior o juegas recreativo con presupuesto ajustado:</strong> ANTA KT 11. 80€ con soporte honesto.</li>
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
      "Guía de zapatillas de baloncesto para exterior en 2025: qué modelos aguantan el asfalto, cuáles evitar (UA Flow se destruye) y comparativa de durabilidad outdoor.",
    fecha: "2026-05-26",
    fechaLabel: "26 mayo 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía outdoor · Exterior 2025",
    heroTitle: "Zapatillas outdoor 2025",
    heroSubtitle: "Cuáles aguantan el asfalto y cuáles no",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-ja-3", "adidas-ae-3", "anta-kai-2", "nike-lebron-23", "ua-curry-13"],
    relatedSeoPages: ["zapatillas-baratas", "mejor-zapatilla-base"],
    body: `
<p class="art-intro">El baloncesto al aire libre es el mayor enemigo de tus zapatillas de interior. El asfalto y el cemento destrozan suelas en cuestión de semanas. Lo que dura 2 temporadas en pabellón puede quedar inutilizable después de 10 partidos en la calle. Antes de comprar, tienes que saber qué buscar — y qué evitar.</p>

<h2>Qué diferencia una zapatilla outdoor de una de interior</h2>
<p>Las zapatillas de interior priorizan tracción delicada en parquet y suelas blandas para máximo court feel. En exterior, esas mismas características se vuelven un problema:</p>
<ul>
  <li><strong>Suela de goma gruesa:</strong> el caucho resistente aguanta la abrasión del asfalto. Sin él, la espuma se destruye en semanas.</li>
  <li><strong>Patrón de tracción profundo:</strong> los tacos planos se lisan rápido. Necesitas cantos profundos que aguanten el desgaste.</li>
  <li><strong>Upper reforzado:</strong> la malla fina se desgarra. Los tejidos más densos o sintéticos aguantan mejor los golpes y la suciedad.</li>
</ul>

<h2>Los 5 modelos más duraderos en exterior en 2025</h2>

<h3><a href="/zapatilla/nike-ja-3">Nike Ja 3 — 135€</a></h3>
<p>La Ja 3 tiene una de las suelas de goma más gruesas de Nike en 2025. El patrón multidireccional funciona bien tanto en parquet como en asfalto limpio, y el upper de malla densa resiste mejor que el mesh fino de otros modelos. La excepción positiva dentro de Nike para outdoor.</p>
<ul>
  <li>✅ Suela duradera — aguanta exterior sin degradarse rápido</li>
  <li>✅ Tracción sólida en asfalto seco</li>
  <li>❌ En asfalto muy húmedo la tracción baja bastante</li>
</ul>

<h3><a href="/zapatilla/adidas-ae-3">Adidas AE 3 — 130€</a></h3>
<p>El herringbone de la AE 3 es uno de los patrones más resistentes al desgaste en asfalto. Los cantos son profundos y la goma es de dureza media-alta. Para jugadores que alternan interior y exterior, es la opción más equilibrada del mercado.</p>
<ul>
  <li>✅ Herringbone aguanta exterior mejor que la mayoría</li>
  <li>✅ Upper robusto — resiste suciedad y golpes</li>
  <li>❌ No está diseñada para exterior puro — en uso intensivo outdoor se nota el desgaste</li>
</ul>

<h3>Under Armour Curry 13 ❌ <strong>NO OUTDOOR</strong></h3>
<p>La Curry 13 usa tecnología UA Flow — espuma sin capa de goma que contacta directamente con el suelo. Es perfecta para parquet porque maximiza el court feel. En asfalto, es un desastre: la espuma se desgasta en semanas y la tracción desaparece. <strong>Una sesión outdoor puede arruinar la suela.</strong> Úsala solo en pabellón.</p>

<h3><a href="/zapatilla/anta-kai-2">ANTA Kai 2 — ~119€</a></h3>
<p>La Kai 2 es la sorpresa. La marca china ha apostado por una goma de caucho gruesa y un patrón agresivo que aguanta el exterior mejor de lo esperado. Para su precio, es la mejor opción outdoor del mercado en 2025.</p>
<ul>
  <li>✅ Goma gruesa — la más duradera de las opciones económicas</li>
  <li>✅ Tracción en asfalto muy competente</li>
  <li>❌ Upper menos refinado que las opciones premium</li>
</ul>

<h3><a href="/zapatilla/nike-lebron-23">Nike LeBron 23 — 179€</a></h3>
<p>La LeBron tiene suela Max Air con caucho de alta densidad. Para outdoor moderado (2-3 sesiones al mes en asfalto), aguanta bien. Para uso intensivo exterior, el precio no se justifica — la Ja 3 o la AE 3 son más inteligentes.</p>
<ul>
  <li>✅ Suela Max Air robusta para jugadores pesados</li>
  <li>❌ 179€ para outdoor es excesivo — existen mejores opciones por menos</li>
</ul>

<h2>Lo que debes evitar en outdoor</h2>
<ul>
  <li><strong>UA Flow (Curry 12, Curry 13):</strong> sin goma = destrucción garantizada en asfalto</li>
  <li><strong>Suelas de espuma directa:</strong> cualquier zapatilla con "foam outsole" en las especificaciones</li>
  <li><strong>Nike GT Cut 3/4:</strong> diseñadas para pista interior limpia, la suela no aguanta el asfalto</li>
  <li><strong>New Balance con suelas ultra-delgadas:</strong> los modelos de foam directo tienen la misma debilidad que el UA Flow</li>
</ul>

<h2>Comparativa de durabilidad outdoor</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Modelo</th>
      <th style="padding:8px;text-align:center">Durabilidad outdoor</th>
      <th style="padding:8px;text-align:center">Precio</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Nike Ja 3</strong></td>
      <td style="padding:8px;text-align:center">⭐ 8/10</td>
      <td style="padding:8px;text-align:center">135€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Adidas AE 3</strong></td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">130€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>ANTA Kai 2</strong></td>
      <td style="padding:8px;text-align:center">⭐ 8/10</td>
      <td style="padding:8px;text-align:center">~119€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Nike LeBron 23</strong></td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">179€</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>UA Curry 13</strong></td>
      <td style="padding:8px;text-align:center">❌ 2/10</td>
      <td style="padding:8px;text-align:center">140€</td>
    </tr>
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
      "Guía para elegir zapatillas de baloncesto si tienes pie ancho. Qué marcas van estrechas, cuáles anchas, y el top 5 de modelos que mejor encajan en 2025.",
    fecha: "2026-05-26",
    fechaLabel: "26 mayo 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía · Pie ancho 2025",
    heroTitle: "Zapatillas para pie ancho",
    heroSubtitle: "Las que realmente encajan — guía 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-ja-3", "adidas-ae-3", "anta-kai-2", "ua-curry-13", "nike-lebron-23"],
    relatedSeoPages: ["mejores-zapatillas-baloncesto-2025", "zapatillas-baratas"],
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

<h2>Marcas: quién va estrecho y quién va ancho</h2>
<ul>
  <li><strong>Nike →</strong> Estrecho como norma. Casi todos los modelos de performance van ajustados. Pocas excepciones.</li>
  <li><strong>Adidas →</strong> Normal-ancho. Mejor opción general para pie medio-ancho.</li>
  <li><strong>Under Armour →</strong> Normal. Suficiente para pie medio pero no para pie muy ancho.</li>
  <li><strong>ANTA →</strong> Ancho. La marca que más espacio da en el antepié. La mejor para pies anchos.</li>
  <li><strong>Li-Ning →</strong> Variable por modelo. Consultar por modelo.</li>
</ul>

<h2>Top 5 zapatillas para pie ancho en 2025</h2>

<h3><a href="/zapatilla/anta-kai-2">ANTA Kai 2 — la mejor para pie muy ancho</a></h3>
<p>La firma de Kyrie Irving con ANTA tiene la horma más generosa del mercado mainstream en 2025. El antepié es amplio, hay espacio para todos los dedos y el calce no aprieta. Para pie ancho o extra-ancho, es la recomendación clara.</p>
<ul>
  <li>✅ La horma más ancha entre las opciones de 2025</li>
  <li>✅ Precio accesible (~119€)</li>
  <li>❌ Respuesta no llega al nivel de la GT Cut 4 o Curry 13</li>
</ul>

<h3><a href="/zapatilla/nike-ja-3">Nike Ja 3 — la excepción en Nike</a></h3>
<p>Ja Morant tiene pie ancho y su firma lo refleja. La Ja 3 es la zapatilla Nike de baloncesto con más espacio en el antepié de las actuales en producción. Si tienes pie ancho y quieres Nike, esta es la única opción segura.</p>
<ul>
  <li>✅ Horma ancha — rara en Nike</li>
  <li>✅ Buen cushion ZoomX</li>
  <li>❌ Más pesada que otros modelos low-top de guards</li>
</ul>

<h3><a href="/zapatilla/adidas-ae-3">Adidas AE 3 — equilibrio para pie normal-ancho</a></h3>
<p>La AE 3 no es ancha como la Kai 2, pero tiene más espacio en el antepié que la mayoría de Nike. Para pie normal-ancho (no extra ancho), encaja sin problemas. Anthony Edwards tiene pie grande y eso ha influido en el diseño.</p>
<ul>
  <li>✅ Más espacio en antepié que la media del mercado</li>
  <li>✅ Excelente tracción herringbone</li>
  <li>❌ No suficiente para pie muy ancho o extra-ancho</li>
</ul>

<h3><a href="/zapatilla/ua-curry-13">Under Armour Curry 13 — normal, suficiente para medio-ancho</a></h3>
<p>La Curry 13 tiene horma normal. No está pensada para pie ancho, pero tampoco va estrecha. Para jugadores con pie medio-ancho (no extra ancho), suele encajar sin problemas. Pruébatela antes de comprar si tienes pie muy ancho.</p>
<ul>
  <li>✅ Horma normal — no aprieta en pie medio</li>
  <li>❌ No apta para pie muy ancho o extra-ancho</li>
</ul>

<h3><a href="/zapatilla/nike-lebron-23">Nike LeBron 23 — ancha para ser Nike</a></h3>
<p>LeBron James tiene pie grande y la LeBron line tradicionalmente va algo más ancha que la media Nike. No es la mejor para pie ancho, pero es más permisiva que otras líneas Nike. Mid-top con más volumen interior.</p>
<ul>
  <li>✅ Más espacio que otras Nike</li>
  <li>❌ Sigue siendo estrecha comparada con ANTA o Adidas</li>
  <li>❌ 179€ — cara para ser la quinta opción</li>
</ul>

<h2>Lo que debes evitar si tienes pie ancho</h2>
<ul>
  <li><strong>Nike GT Cut 4:</strong> extremadamente estrecha. Diseñada para pie estrecho-normal. Pie ancho = dolor desde el calentamiento.</li>
  <li><strong>Nike KD 19:</strong> upper TPU ajustado — poco margen lateral. No recomendada para pie ancho.</li>
  <li><strong>Jordan Brand en general:</strong> la línea retro Jordan va estrecha. Las performance (Jordan 40) van mejor pero siguen siendo justas para pie ancho.</li>
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
    relatedShoes: ["jordan-tatum-4", "nike-lebron-23", "jordan-40", "anta-kt-11"],
    relatedSeoPages: ["zapatillas-baratas", "mejor-zapatilla-pivot"],
    body: `
<p class="art-intro">El esguince de tobillo es la lesión más frecuente en baloncesto. Cada cambio de dirección, cada aterrizaje, cada bloqueo es una oportunidad para torcerte. La zapatilla correcta no elimina el riesgo, pero lo reduce significativamente. Y la incorrecta — una low-top si tienes historial de esguinces — puede mandarte a la baja antes de acabar el primer partido.</p>

<h2>Altura de caña: ¿low, mid o high?</h2>
<p>Es la decisión más importante. No hay elección "correcta" universal — depende de tu historial:</p>
<ul>
  <li><strong>Low-top:</strong> máxima velocidad y agilidad, mínima protección lateral. Para bases sanos sin historial de tobillo. Ejemplos: Nike GT Cut 4, Adidas AE 3, UA Curry 13.</li>
  <li><strong>Mid-top:</strong> el equilibrio. Cubre la parte baja del tobillo sin restringir el movimiento. La opción más versátil y la recomendada si tienes algún esguince en el historial pero no recurrente. Ejemplos: Nike LeBron 23, ANTA KT 11.</li>
  <li><strong>High-top:</strong> máxima protección, especialmente con correas o collar acolchado. Para jugadores con esguinces recurrentes o que quieran la máxima seguridad. Ejemplos: Jordan Tatum 4, Air Jordan 40.</li>
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

<h3><a href="/zapatilla/jordan-tatum-4">Jordan Tatum 4 — 150€</a></h3>
<p>High-top con collar de espuma acolchado que envuelve el tobillo sin restringir el movimiento. Jayson Tatum tiene historial de problemas de tobillo y el calzado está diseñado con eso en mente. Soporte lateral 9/10, estabilidad sólida.</p>
<ul>
  <li>✅ High-top con el mejor collar del mercado en su precio</li>
  <li>✅ Soporte lateral excepcional para un forward</li>
  <li>❌ No es para guards puros — algo pesada para los primeros pasos</li>
</ul>

<h3><a href="/zapatilla/jordan-40">Air Jordan 40 — 199€</a></h3>
<p>Las 6 correas internas que se activan con los cordones son el sistema de lockdown más avanzado disponible en baloncesto en 2025. Cada vez que atas, las correas abrazan el antepié y el tobillo. Especialmente útil para jugadores que necesitan máxima contención.</p>
<ul>
  <li>✅ 6 correas internas: el mejor lockdown del mercado</li>
  <li>✅ Soporte lateral 9/10 pese a la blandura del ZoomX</li>
  <li>❌ 199€ — la opción más cara. Solo si juegas mucho</li>
  <li>❌ El ZoomX atrae polvo — en pistas sucias la tracción baja</li>
</ul>

<h3><a href="/zapatilla/nike-lebron-23">Nike LeBron 23 — 179€</a></h3>
<p>Mid-top robusto con upper Flyknit reforzado que da contención sin la rigidez de un high. LeBron James tiene el tobillo más famoso del baloncesto moderno y sus zapatillas lo reflejan. Para ala-pívots que quieren protección sin renunciar a la movilidad.</p>
<ul>
  <li>✅ Mid-top con excelente soporte lateral</li>
  <li>✅ Max Air en talón: amortiguación que protege también los tobillos en aterrizajes</li>
  <li>❌ Horma estrecha — incómoda si tienes pie ancho</li>
</ul>

<h3><a href="/zapatilla/anta-kt-11">ANTA KT 11 — ~80€</a></h3>
<p>La opción económica más honesta para tobillo débil. Mid-top con refuerzo de nylon y espuma en el collar. No llega al nivel de las opciones premium, pero para recreativo 2-3 veces por semana da protección más que suficiente a la mitad del precio.</p>
<ul>
  <li>✅ 80€ — la mejor opción presupuesto para tobillo débil</li>
  <li>✅ Mid-top con collar acolchado y soporte lateral decente</li>
  <li>❌ Para uso muy intensivo (4+ partidos/semana), considera invertir más</li>
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
      "Comparativa técnica entre las tres zapatillas más reactivas de 2025: GT Cut 4, Curry 13 y ANTA Kai 2. Tracción, respuesta, precio y para qué tipo de base/escolta.",
    fecha: "2026-05-26",
    fechaLabel: "26 mayo 2026",
    categoria: "Comparativas",
    readMinutes: 5,
    eyebrow: "★ Comparativa · Zapatillas reactivas 2025",
    heroTitle: "GT Cut 4 vs Curry 13 vs Kai 2",
    heroSubtitle: "¿Cuál reacciona más rápido?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "ua-curry-13", "anta-kai-2", "adidas-ae-3"],
    relatedSeoPages: ["zapatillas-reactivas", "mejor-zapatilla-base", "mejor-zapatilla-escolta"],
    body: `
<p class="art-intro">Si priorizas el primer paso explosivo sobre cualquier otra cosa, el mercado de 2025 tiene tres candidatos claros: la Nike GT Cut 4, la Under Armour Curry 13 y la ANTA Kai 2 de Kyrie Irving. Las tres son low-top, las tres tienen court feel excepcional — y las tres difieren significativamente en precio y en a qué tipo de jugador favorecen más.</p>

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
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Tracción</td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Respuesta</td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">9/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Amortiguación</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">⭐ 8/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Horma</td>
      <td style="padding:8px;text-align:center">Estrecha</td>
      <td style="padding:8px;text-align:center">Normal</td>
      <td style="padding:8px;text-align:center">⭐ Ancha</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Peso</td>
      <td style="padding:8px;text-align:center">⭐ 310g</td>
      <td style="padding:8px;text-align:center">345g</td>
      <td style="padding:8px;text-align:center">330g</td>
    </tr>
    <tr>
      <td style="padding:8px">Precio</td>
      <td style="padding:8px;text-align:center">150€</td>
      <td style="padding:8px;text-align:center">140€</td>
      <td style="padding:8px;text-align:center">⭐ 119€</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Nike GT Cut 4: la más explosiva del mercado</h2>
<p>La GT Cut 4 tiene el Zoom Air más reactivo que Nike fabrica actualmente en baloncesto. Combinado con una suela de goma dura de patrón multidireccional, el resultado es la zapatilla con mejor court feel de 2025 — y posiblemente de los últimos 5 años.</p>
<p><strong>El problema:</strong> la horma es muy estrecha. Si tienes pie ancho o dedos largos, la presión en el antepié puede ser un problema real después de 30 minutos. Pruébatela antes de comprar o sube media talla.</p>
<p><strong>Para quién:</strong> Base o escolta con pie normal o estrecho que juega en interior limpio y prioriza el primer paso sobre cualquier otra cosa.</p>

<h2>Under Armour Curry 13: el mejor equilibrio</h2>
<p>La Curry 13 tiene UA Flow foam en toda la entresuela — una espuma sin goma en la suela que contacta directamente con el suelo. Eso le da un court feel único: sientes el parquet más que en ninguna otra zapatilla, pero con algo más de cushion que la GT Cut 4.</p>
<p><strong>El problema:</strong> sin goma en la suela, la durabilidad en exterior es prácticamente nula. Una sesión en asfalto y la suela queda destruida. Son zapatillas exclusivamente de interior.</p>
<p><strong>Para quién:</strong> Guards de 70-85kg que juegan siempre en pabellón, valoran la sensación de suelo y quieren algo más de cushion que la GT Cut. Horma normal, segura para la mayoría de pies.</p>

<h2>ANTA Kai 2: la sorpresa del año</h2>
<p>Kyrie Irving fichó por ANTA después de salir de Nike, y la Kai 2 es su segunda zapatilla con la marca china. A 119€, ofrece un rendimiento que avergüenza a zapatillas de 150€. La tracción es sólida, la respuesta es rápida gracias a la espuma A-Flashfoam 2.0, y la horma ancha la hace la más accesible para pies normales y anchos.</p>
<p><strong>El problema:</strong> la respuesta no llega al nivel de la GT Cut 4 o la Curry 13. La diferencia no es enorme, pero existe. Si buscas el máximo rendimiento sin importar el precio, las otras dos ganan.</p>
<p><strong>Para quién:</strong> Bases y escoltas con cualquier tipo de pie que buscan máxima relación calidad-precio. También la mejor opción si tu pie es ancho.</p>

<h2>Veredicto final</h2>
<ul>
  <li><strong>Mejor court feel absoluto → <a href="/zapatilla/nike-gt-cut-4">GT Cut 4</a></strong> — si tu pie encaja y juegas siempre en interior.</li>
  <li><strong>Mejor equilibrio rendimiento-versatilidad → <a href="/zapatilla/ua-curry-13">Curry 13</a></strong> — para guards que valoran el cushion extra.</li>
  <li><strong>Mejor relación calidad-precio y pie ancho → <a href="/zapatilla/anta-kai-2">Kai 2</a></strong> — 30€ menos que la Curry 13 con un 90% del rendimiento.</li>
</ul>

<p class="art-outro">¿No tienes claro cuál de las tres encaja con tu perfil específico? <a href="/comparar?slugs=nike-gt-cut-4,ua-curry-13,anta-kai-2">Compáralas aquí con todos los atributos</a> o <a href="/quiz">haz el quiz</a> para obtener tu recomendación personalizada.</p>
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
