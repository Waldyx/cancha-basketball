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
    relatedSeoPages: ["zapatillas-baloncesto-para-tobillos", "zapatillas-baloncesto-baratas", "mejor-zapatilla-pivot"],
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

  // ── 9. Guía baratas ──────────────────────────────────────────────────
  {
    slug: "mejores-zapatillas-baloncesto-baratas-2025",
    title: "Mejores zapatillas de baloncesto baratas de 2025: las 8 mejores opciones por menos de 80€",
    metaTitle: "Mejores zapatillas de baloncesto baratas 2025 (menos de 80€) | CANCHA.ZAPA",
    description: "Descubre las 8 zapatillas de baloncesto con mejor relación calidad-precio de 2025, todas por menos de 80 €.",
    fecha: "2025-05-20",
    fechaLabel: "20 mayo 2025",
    categoria: "Guías",
    readMinutes: 6,
    eyebrow: "★ Guía editorial · CANCHA.ZAPA",
    heroTitle: "Mejores zapatillas de baloncesto baratas",
    heroSubtitle: "Las 8 mejores opciones por menos de 80€ en 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-precision-8", "adidas-cross-em-up-select", "decathlon-tarmak-voltzy-500", "adidas-ownthegame-3", "ua-lockdown-7"],
    relatedSeoPages: ["zapatillas-baloncesto-baratas", "zapatillas-baloncesto-junior"],
    imagen: "https://ballershoesdb.com/wp-content/uploads/NikePrecision8-Cropped-650x406.jpg",
    body: `
<p class="art-intro">Encontrar una zapatilla de baloncesto que combine buen rendimiento, estilo y un precio asequible no es fácil, pero en 2025 el mercado español ofrece varias opciones por debajo de los 80 €. Aquí tienes un análisis de las ocho mejores alternativas para que puedas jugar sin vaciar tu cartera.</p>

<h2>1. Nike Precision 8 — ~75 €</h2>
<p>La <strong>Nike Precision 8</strong> sigue la línea de la popular Precision 7, pero con una construcción más ligera y una suela de goma de alta tracción. Su parte superior de malla transpirable mantiene los pies frescos durante todo el partido. La opción más versátil del rango: válida para interior y exterior sin sacrificar demasiado.</p>
<ul>
  <li>Tracción excelente en ambas superficies</li>
  <li>Amortiguación básica pero funcional</li>
  <li>Disponible en todas las tallas en Amazon ES</li>
</ul>

<h2>2. Adidas Cross-Em Up Select — ~60 €</h2>
<p>Pensada para jugadores que buscan velocidad y control. El refuerzo de TPU en el talón aporta estabilidad sin añadir peso. La suela de goma Continental ofrece una tracción sorprendente para su precio.</p>
<ul>
  <li>Suela Continental — tracción de gama alta a precio bajo</li>
  <li>Ligera y reactiva — ideal para guards</li>
  <li>Una de las mejores opciones sub-65€ del mercado</li>
</ul>

<h2>3. Decathlon Tarmak Voltzy 500 — ~50 €</h2>
<p>Decathlon ha mejorado su línea Tarmak con la Voltzy 500, que incorpora una entresuela de espuma EVA de densidad media y una malla reforzada. La sorpresa del año en términos de relación calidad-precio — supera en durabilidad outdoor a modelos que cuestan tres veces más.</p>
<ul>
  <li>Relación calidad-precio imbatible</li>
  <li>Durabilidad outdoor destacable para su rango</li>
  <li>Disponible en tiendas Decathlon con posibilidad de probar antes</li>
</ul>

<h2>4. Adidas OwnTheGame 3 — ~70 €</h2>
<p>La tercera generación de la OwnTheGame mantiene la estética urbana-deportiva y añade una entresuela mejorada con mayor retorno de energía. Una de las zapas más cómodas de este rango para partidos largos.</p>
<ul>
  <li>Comodidad excepcional para uso prolongado</li>
  <li>Diseño moderno que funciona dentro y fuera de la pista</li>
  <li>Build quality típico de Adidas</li>
</ul>

<h2>5. Under Armour Lockdown 7 — ~65 €</h2>
<p>Con una parte superior de malla y refuerzos sintéticos, la <strong>Lockdown 7</strong> ofrece una sensación de segunda piel y buen soporte lateral. La suela de goma con patrón multidireccional aguanta bien en parqué.</p>
<ul>
  <li>Gran estabilidad lateral para su rango de precio</li>
  <li>Ajuste ceñido — ideal para pies normales o estrechos</li>
  <li>La opción UA más accesible con buen rendimiento</li>
</ul>

<h2>6. Puma Playmaker Pro Mid — ~75 €</h2>
<p>La Playmaker Pro Mid ofrece altura mid-top con soporte de tobillo y entresuela ProFoam. Buena opción para jugadores que necesitan protección extra sin disparar el presupuesto.</p>
<ul>
  <li>Mid-top — más soporte de tobillo que las low</li>
  <li>ProFoam con cushion decente para el rango</li>
  <li>Buena para jugadores con historial leve de esguinces</li>
</ul>

<h2>7. Nike Air Zoom Crossover 2 — ~75 €</h2>
<p>Versión de entrada de la línea Zoom, con una cámara de aire básica en el antepié. Ofrece un paso por encima de la Precision 8 en amortiguación a un precio similar.</p>
<ul>
  <li>Zoom Air básico — notablemente mejor que espuma EVA estándar</li>
  <li>Tracción sólida en interior</li>
  <li>Buena horma — sirve para pie normal y ancho</li>
</ul>

<h2>8. Reebok Answer IV — ~70 €</h2>
<p>Reebok revive el clásico de Allen Iverson con materiales modernizados. La suela de goma ofrece tracción y durabilidad, y el diseño retro es uno de los más llamativos de este rango.</p>
<ul>
  <li>Diseño icónico — el más estético de la lista</li>
  <li>Tracción clásica herringbone — funciona bien en interior</li>
  <li>Una zapatilla con historia real detrás</li>
</ul>

<h3>¿Cómo elegir la mejor opción para ti?</h3>
<p>Al buscar zapatillas baratas, ten en cuenta tres factores: <strong>tracción</strong> (lo que más afecta al rendimiento), <strong>altura</strong> (low si juegas rápido, mid si tienes dudas con el tobillo) y <strong>disponibilidad</strong> (Decathlon es la única que puedes probar en tienda física antes de comprar).</p>

<p>Si juegas en exterior: <a href="/zapatilla/decathlon-tarmak-voltzy-500">Tarmak Voltzy 500</a> o <a href="/zapatilla/nike-precision-8">Nike Precision 8</a>. Si juegas solo en interior: <a href="/zapatilla/adidas-cross-em-up-select">Cross-Em Up Select</a>. Si tienes problemas de tobillo: <a href="/zapatilla/puma-playmaker-pro-mid">Playmaker Pro Mid</a>.</p>

<p class="art-outro">En 2025 no necesitas gastar más de 80€ para jugar bien. La Adidas Cross-Em Up Select, la Nike Precision 8 y la Tarmak Voltzy 500 cubren la mayoría de perfiles. ¿No sabes cuál es la tuya? <a href="/quiz">Haz el quiz en 60 segundos</a> y te damos la recomendación exacta para tu juego.</p>
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
    relatedSeoPages: ["zapatillas-baloncesto-baratas", "zapatillas-baloncesto-premium"],
    imagen: "https://wowsole.com/wp-content/uploads/2024/01/ANTA-Kai-2-01.jpg",
    body: `
<p class="art-intro">En los últimos años, ANTA, Li-Ning y Peak han pasado de ser marcas desconocidas en España a tener presencia real en las pistas. En 2025, estas marcas chinas ofrecen tecnología propia, colaboraciones con estrellas de la NBA y precios hasta un 40% más bajos que Nike o Adidas. ¿Pero merecen realmente la pena? Lo analizamos sin filtros.</p>

<h2>ANTA — la más consolidada</h2>
<p>ANTA es patrocinadora oficial de la NBA en China y tiene acuerdos de firma con Klay Thompson y Kyrie Irving. Su inversión en I+D ha crecido año tras año, y sus últimos modelos compiten de verdad con la gama media-alta de Nike y Adidas.</p>

<h3>Modelos clave 2025</h3>
<ul>
  <li><strong><a href="/zapatilla/anta-kai-2">ANTA Kai 2</a> (~119 €)</strong>: la firma de Kyrie Irving con tecnología BoostX y tracción multidireccional. Rendimiento de 150€ a menor precio. La sorpresa del año.</li>
  <li><strong><a href="/zapatilla/anta-kt-11">ANTA KT-11</a> (~95 €)</strong>: la firma de Klay Thompson, más asequible. Buena amortiguación y durabilidad outdoor sólida.</li>
</ul>

<h3>Veredicto ANTA</h3>
<p>Si solo puedes probar una marca china, empieza por ANTA. La <a href="/zapatilla/anta-kai-2">Kai 2</a> es genuinamente una de las mejores zapatillas de 2025 por debajo de 130€, independientemente del origen.</p>

<h2>Li-Ning — la más innovadora</h2>
<p>Li-Ning, fundada por el legendario gimnasta olímpico del mismo nombre, ha apostado por la innovación radical. Tienen acuerdo con Jimmy Butler y desarrollan tecnologías propias que en algunos parámetros superan a Nike Zoom.</p>

<h3>Modelos clave 2025</h3>
<ul>
  <li><strong><a href="/zapatilla/lining-wow-allcity-13">Li-Ning WOW AllCity 13</a> (~100 €)</strong>: Cloud Foam de alta densidad con suela de goma de tracción excepcional. Una de las mejor valoradas por los análisis independientes.</li>
  <li><strong><a href="/zapatilla/lining-sonic-12">Li-Ning Sonic 12</a> (~85 €)</strong>: la opción de velocidad — ultraligera, reactiva y con tracción de primer nivel.</li>
</ul>

<h3>Veredicto Li-Ning</h3>
<p>Li-Ning es para jugadores con criterio que no necesitan el logo de Nike para sentirse bien en pista. Si buscas tecnología real a precios honestos, es la marca más interesante del lote.</p>

<h2>Peak — la más accesible</h2>
<p>Peak se ha centrado en crear calzado ligero y funcional para el jugador amateur. Sin colaboraciones de superestrellas, pero con una propuesta técnica sólida a precios muy competitivos.</p>

<h3>Modelos clave 2025</h3>
<ul>
  <li><strong><a href="/zapatilla/peak-taichi-flash">Peak Taichi Flash</a> (~90 €)</strong>: entresuela de espuma reactiva "Flash Foam" y suela de goma con tracción multidireccional. Notable ligereza para ser una zapatilla de baloncesto.</li>
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
  <li><strong>Mejor rendimiento global bajo 130€ → <a href="/zapatilla/anta-kai-2">ANTA Kai 2</a></strong></li>
  <li><strong>Mejor tracción y tecnología → <a href="/zapatilla/lining-wow-allcity-13">Li-Ning WOW AllCity 13</a></strong></li>
  <li><strong>Mejor precio entrada → <a href="/zapatilla/anta-kt-11">ANTA KT-11</a></strong></li>
</ul>

<p class="art-outro">Las marcas chinas ya no son la segunda opción para quien no puede permitirse Nike. En 2025 son una alternativa real y en muchos casos superior para el jugador amateur español. ¿Quieres ver cómo comparan con modelos de Nike y Adidas de su mismo rango? <a href="/comparar?slugs=anta-kai-2,adidas-ae-3,nike-gt-cut-4">Usa el comparador</a> y juzga tú mismo.</p>
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
  <li><strong>Retros que puedes jugar:</strong> Kobe Protros, Air Jordan 11/12/14, Reebok Question. Tecnología actualizada (Zoom Air real, outsoles nuevas) en cuerpos clásicos.</li>
  <li><strong>Retros que SON históricas:</strong> Air Force 1, Chuck Taylor, Converse Weapon, Puma Clyde. Puedes jugar con ellas pero son básicamente museísticas. No las recomendamos para alto rendimiento.</li>
</ul>
<p>Esta guía te dice cuáles son cuáles y por qué.</p>

<h2>Tier 1 — Retros que realmente puedes jugar</h2>

<h3>🥇 Nike Kobe 5 Protro / Kobe 6 Protro — Las mejores retros jugables</h3>
<p>Las Kobe Protros son el mejor argumento de que "retro" no significa "inferior". Nike ha actualizado las outsoles, aplicado Zoom Air moderno y mantenido el perfil bajo y reactivo que hacía a las originales tan especiales. Las Kobe 5 y 6 Protro consiguen scores de 6.6-6.7/10 — dentro del rango de zapas modernas de rango medio.</p>
<ul>
  <li><strong>Para quién:</strong> Bases y escoltas explosivos que quieren rendimiento real + historia.</li>
  <li><strong>Vs alternativa moderna equivalente:</strong> Nike Ja 2 (~130€) — similar rendimiento, sin el legado.</li>
  <li><strong>Precio actual:</strong> 175-200€ en retros recientes.</li>
</ul>

<h3>🥈 Air Jordan 12 Retro — La mejor Jordan retro para jugar</h3>
<p>La Jordan del Flu Game (1997). Zoom Air completo, herringbone tracción, estructura de cuero sólida. Consigue 6.1/10 — la mejor puntuación de la saga Jordan clásica. La penaliza el peso (440g) pero si juegas sin velocidad explosiva, ofrece una experiencia sorprendentemente moderna.</p>
<ul>
  <li><strong>Para quién:</strong> Aleros y ala-pívots que juegan equilibrado. No para bases.</li>
  <li><strong>Historia incluida:</strong> El partido donde Jordan jugó con fiebre de 39° y ganó el anillo.</li>
  <li><strong>Precio actual:</strong> 220-250€ en retros recientes.</li>
</ul>

<h3>🥉 Air Jordan 14 Retro — La mejor low-top Jordan histórica</h3>
<p>El "Last Shot" de 1998 — el tiro que le dio el sexto anillo a MJ. Zoom Air real, peso contenido para ser un retro (415g) y el perfil más limpio de toda la saga. Empata con la Jordan 12 en 6.1/10 pero ofrece más movilidad al ser low-top.</p>
<ul>
  <li><strong>Ojo:</strong> Low-top significa menos soporte de tobillo. No recomendada si tienes historial de esguinces.</li>
  <li><strong>Historia incluida:</strong> La última imagen icónica de MJ en Bulls.</li>
</ul>

<h2>Tier 2 — Retros icónicas con rendimiento decente</h2>

<h3>Reebok Question Mid / Answer IV — Los zapatos de Iverson</h3>
<p>Allen Iverson cruzó a MJ con la Question Mid y ganó con la Answer IV en las Finales 2001 contra los Lakers. Ambas consiguen scores entre 6.2-6.4/10 — mejor de lo esperado para 1996-2001. Tracción de cuero pegajosa y soporte lateral sólido. Limitadas en cushion pero jugables para estilos pausados.</p>

<h3>Nike Air Penny 2 — El zapato de Penny Hardaway</h3>
<p>La primera gran rival de Jordan en los 90s. Foamposite parcial, Zoom Air, perfil mid. 5.7/10 — más baja que las Kobe Protro pero aceptable si no buscas velocidad explosiva. Diseño casi futurista para ser de 1996.</p>

<h3>Air Jordan 11 — La más elegante</h3>
<p>La Jordan con lacado de patente negro. Un score de 5.4/10 refleja su Zoom Air básico y peso elevado, pero es la Jordan retro que más se viste fuera de la cancha con credibilidad. Para el coleccionista que también quiere jugar casualmente.</p>

<h2>Tier 3 — Solo para jugar casual o colección</h2>

<h3>Nike Air Force 1 — Madre de todo</h3>
<p>La primera Nike Air de la historia (1982). 5.5/10 pero su tecnología Air es básica y pesa 460g. Resistente, tracción sólida, soporte lateral excelente — pero no para correr. Para jugadores potentes que quieren el icono fundacional.</p>

<h3>Air Jordan 1/3/4/6/7/8 — La saga completa</h3>
<p>Scores entre 3.8 y 5.8/10. Las mejores de este grupo son la Jordan 8 (correas, tracción buena) y la Jordan 6 (la del primer anillo). Las Jordan 1, 2 y 3 son para colección — no tienen tecnología de amortiguación real para el juego moderno.</p>

<h3>Reebok Shaq Attaq — El dinosaurio</h3>
<p>La zapatilla de Shaquille O'Neal de 1992. Un honesto 4.4/10: pesa 570g, sin tecnología real, pero el pump Reebok y el perfil high-top tienen su gracia. Para el que quiere saber cómo jugaba el pivot más dominante de la historia.</p>

<h2>Las que NO recomendamos para jugar</h2>
<ul>
  <li><strong>Converse Chuck Taylor (1917):</strong> 3.5/10. La abuela de todas las zapatillas de baloncesto. Suela plana, cero cushion. Para la foto y la historia, no para cancha.</li>
  <li><strong>Puma Clyde (1973):</strong> 4.6/10. Suede bonito, goma plana. La primera signature de la historia es también la más limitada.</li>
  <li><strong>Nike Air Foamposite One (1997):</strong> 4.6/10. Aspecto brutal, ventilación 1/10. En verano es un horno. Solo para exterior y bajas temperaturas.</li>
</ul>

<h2>Preguntas frecuentes sobre retros</h2>

<h3>¿Se pueden jugar las Jordan retro de verdad?</h3>
<p>Depende de la Jordan. Las 11, 12 y 14 sí — tienen Zoom Air actualizado y outsoles que aguantan. Las Jordan 1, 2 y 3 son básicamente colección: cuero duro, cushion mínimo y tracción que se deteriora rápido. Para jugar con una Jordan clásica, elige la 12 o la 14.</p>

<h3>¿Vale la pena pagar 200€+ por un retro cuando hay opciones modernas mejores?</h3>
<p>Desde el punto de vista puramente técnico, no. Una Nike Ja 3 a 130€ supera en casi todos los atributos a cualquier retro por encima de 200€. Las retros se compran por historia y cultura, no solo por rendimiento.</p>

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
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Tracción</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">8.5/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Amortiguación</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">⭐ 8/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Respuesta</td>
      <td style="padding:8px;text-align:center">⭐ 8.5/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Peso</td>
      <td style="padding:8px;text-align:center">⭐ 355g</td>
      <td style="padding:8px;text-align:center">370g</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Score CANCHA</td>
      <td style="padding:8px;text-align:center">⭐ 7.9/10</td>
      <td style="padding:8px;text-align:center">7.6/10</td>
    </tr>
    <tr>
      <td style="padding:8px">Precio (ES)</td>
      <td style="padding:8px;text-align:center">⭐ ~130€</td>
      <td style="padding:8px;text-align:center">~150€</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Espuma: Nitro en ambas, pero diferente stack</h2>
<p>Ambas usan Nitro foam de Puma, la tecnología de nitrógeno inyectado que caracteriza la línea MB. Sin embargo, la disposición cambia:</p>
<ul>
  <li><strong>MB.04:</strong> Nitro Elite en el talón y Nitro en el antepié. El resultado es una zapa más reactiva y firme — más court feel, menos amortiguación blanda.</li>
  <li><strong>MB.05:</strong> Nitro full-length con mayor volumen de espuma. Más protección de impactos, especialmente en aterrizajes. Ligeramente menos "snap" que la MB.04.</li>
</ul>
<p><strong>Veredicto espuma:</strong> MB.04 si eres un guard explosivo que necesita primer paso rápido. MB.05 si pesas más de 80kg o necesitas más protección en rodillas.</p>

<h2>Tracción: ventaja MB.04</h2>
<p>El outsole de la MB.04 con patrón multidireccional es uno de los mejores del catálogo Puma en 2025. Agarra sin necesidad de limpiar en parquet y tolera bien pistas con algo de polvo. La MB.05 tiene buena tracción también (8.5/10), pero el patrón es ligeramente menos agresivo — se nota en cortes rápidos.</p>
<p><strong>Veredicto:</strong> MB.04 claramente si la tracción es tu prioridad.</p>

<h2>Peso y perfil</h2>
<p>La MB.04 pesa 355g (US9) — ligera para ser una low-cut de baloncesto. La MB.05 sube a 370g por el stack de espuma adicional. 15g de diferencia no suenan a mucho, pero en 40 minutos de partido se nota. Para jugadores que valoran la sensación de agilidad, la MB.04 gana.</p>
<p>Ambas son <strong>low-top</strong>. Si tienes historial de esguinces, considera las Puma All-Pro Nitro 2 en versión mid o las UA Curry 13 mid que ofrecen más soporte.</p>

<h2>LaMelo brand vs rendimiento</h2>
<p>Seamos honestos: parte del precio de ambas es el nombre LaMelo Ball. Los colorways son los más llamativos del mercado — si quieres hacerte notar en la cancha, estas son las zapatillas. Pero el rendimiento técnico las justifica también: no son zapas de marketing puro.</p>
<p>Comparadas con el equivalente Nike/Jordan al mismo precio, las MB.04/MB.05 suelen ofrecer mejor tracción y similar cushion. La diferencia está en la respuesta: Nike ZoomX o Zoom Strobel tienen más energía de retorno puro. Puma Nitro es más equilibrado.</p>

<h2>¿Cuál debo comprar?</h2>
<ul>
  <li><strong>Elige la MB.04 si:</strong> buscas mejor relación calidad-precio, priorizas tracción y respuesta, eres guard o escolta ligero (menos de 80kg).</li>
  <li><strong>Elige la MB.05 si:</strong> quieres el modelo más nuevo, priorizas cushion sobre respuesta, o pesas más de 80kg y necesitas más protección.</li>
</ul>
<p>En ambos casos, si las encuentras en oferta (Puma tiene promociones frecuentes), merece la pena. A precio completo, la MB.04 a ~130€ tiene mejor value que la MB.05 a ~150€.</p>

<p class="art-outro">¿Quieres compararlas lado a lado con todos los atributos? <a href="/comparar?slugs=puma-mb-04,puma-mb05">Usa el comparador →</a>. ¿No sabes si la línea MB encaja con tu perfil? <a href="/quiz">El quiz te lo dice en 10 preguntas</a>.</p>
    `,
  },

  // ── 13. Jordan Tatum 4 vs Adidas AE 3 ───────────────────────────────
  {
    slug: "jordan-tatum-4-vs-adidas-ae-3-aleros-2025",
    title: "Jordan Tatum 4 vs Adidas AE 3: ¿cuál es mejor para aleros en 2025?",
    metaTitle: "Jordan Tatum 4 vs Adidas AE 3 comparativa 2025: aleros y escoltas | CANCHA.ZAPA",
    description:
      "Comparativa completa entre Jordan Tatum 4 y Adidas AE 3: cushion, tracción, precio y para qué perfil de jugador es mejor cada una en 2025.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Comparativas",
    readMinutes: 5,
    eyebrow: "★ Comparativa · Aleros 2025",
    heroTitle: "Tatum 4 vs AE 3",
    heroSubtitle: "Jordan o Adidas — ¿cuál para aleros en 2025?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["jordan-tatum-4", "adidas-ae-3", "nike-gt-cut-4", "jordan-luka-4", "ua-curry-13"],
    relatedSeoPages: ["mejor-zapatilla-alero", "zapatillas-equilibradas", "mejores-zapatillas-jordan"],
    body: `
<p class="art-intro">Jordan Tatum 4 vs Adidas AE 3: dos de los mejores modelos de 2025, ambos para aleros y escoltas, ambos low-top y con horma normal. Pero con filosofías distintas: la Tatum 4 prioriza el cushion y la versatilidad; la AE 3 prioriza la tracción y la respuesta explosiva. Y tiene una sorpresa: la Tatum 4 es más barata.</p>

<h2>Comparativa de un vistazo</h2>
<div style="overflow-x:auto">
<table style="width:100%;border-collapse:collapse;font-size:14px">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left">Atributo</th>
      <th style="padding:8px;text-align:center">Jordan Tatum 4</th>
      <th style="padding:8px;text-align:center">Adidas AE 3</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Tracción</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Amortiguación</td>
      <td style="padding:8px;text-align:center">⭐ 8/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Respuesta</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Soporte lateral</td>
      <td style="padding:8px;text-align:center">⭐ 8/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Peso</td>
      <td style="padding:8px;text-align:center">345g</td>
      <td style="padding:8px;text-align:center">⭐ 340g</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Altura</td>
      <td style="padding:8px;text-align:center">Low-top</td>
      <td style="padding:8px;text-align:center">Low-top</td>
    </tr>
    <tr>
      <td style="padding:8px">Precio</td>
      <td style="padding:8px;text-align:center">⭐ ~90€</td>
      <td style="padding:8px;text-align:center">~130€</td>
    </tr>
  </tbody>
</table>
</div>

<h2>La sorpresa del precio: Jordan por menos que Adidas</h2>
<p>La Jordan Tatum 4 cuesta ~90€ mientras que la Adidas AE 3 ronda los 130€ — una diferencia de 40€ que es inusual porque Jordan Brand suele estar por encima de Adidas en precio. ¿Por qué? La Tatum 4 es una línea más accesible dentro del catálogo Jordan, mientras la AE 3 es el flagship de Anthony Edwards. Si el presupuesto es tu filtro principal, la Tatum 4 gana sin duda.</p>

<h2>Espuma: Zoom Strobel vs Lightstrike Pro</h2>
<p><strong>Jordan Tatum 4 — Zoom Air Strobel + React foam:</strong> el Zoom Strobel full-length da una respuesta energética directa en todo el pie. El React foam bajo añade amortiguación extra. El resultado: el cushion más generoso de las dos zapatillas. Para aleros de 80-100kg que aterrizan con impacto (fintas, rebotes), la Tatum 4 protege mejor.</p>
<p><strong>Adidas AE 3 — Lightstrike Pro:</strong> la espuma signature de Adidas es más firme y reactiva que el React de Nike. La energía de retorno es superior — lo notas en los saltos y en el primer paso. Pero hay menos "cushion puro": si aterrizas fuerte, la AE 3 transmite más impacto que la Tatum 4.</p>
<p><strong>Veredicto espuma:</strong> Tatum 4 para más cushion y protección. AE 3 para más reactividad.</p>

<h2>Tracción: ventaja AE 3</h2>
<p>El outsole herringbone de la AE 3 es uno de los mejores del catálogo Adidas en 2025. Más agarre en cortes laterales y mejor respuesta en pistas con algo de polvo. La Tatum 4 tiene buena tracción (8/10) pero el patrón es menos agresivo. Si juegas en pistas con polvo frecuente, la AE 3 gana.</p>

<h2>¿Para qué tipo de alero es cada una?</h2>
<ul>
  <li><strong>Jordan Tatum 4 si:</strong> eres alero de 75-100kg que prioriza cushion, juegas tanto en el perímetro como en la pintura, tienes presupuesto ajustado (~90€), o prefieres el branding Jordan.</li>
  <li><strong>Adidas AE 3 si:</strong> eres alero-escolta (<90kg) que prioriza explosividad y tracción, juegas en pistas con polvo, quieres el máximo rendimiento técnico disponible a 130€, o ya conoces y confías en Lightstrike Pro.</li>
</ul>

<h2>¿Y si no soy alero?</h2>
<p>Ambas sirven también para escoltas y, en el caso de la Tatum 4, para pívots ligeros (hasta ~100kg). Ninguna es recomendable para pívots pesados que necesitan más soporte y cushion.</p>
<p>Si eres base explosivo, la <a href="/zapatilla/nike-gt-cut-4">Nike GT Cut 4</a> o la <a href="/zapatilla/ua-curry-13">UA Curry 13</a> son más específicas para ti que cualquiera de estas dos.</p>

<h2>Veredicto final</h2>
<p><strong>Si buscas la mejor relación calidad-precio: Jordan Tatum 4.</strong> A ~90€ ofrece un paquete técnico que avergüenza a muchas zapas de 120€. Cushion sólido, tracción competente, soporte lateral decente. Para casi todos los aleros que no tienen un perfil muy específico, es la compra más inteligente.</p>
<p><strong>Si buscas el máximo rendimiento técnico: Adidas AE 3.</strong> Mejor tracción, mejor respuesta, más explosiva. Vale los 40€ extra si priorizas rendimiento puro sobre precio.</p>

<p class="art-outro">¿Aún no estás seguro? <a href="/comparar?slugs=jordan-tatum-4,adidas-ae-3,nike-gt-cut-4">Compara estas tres zapatillas con todos los datos aquí</a>, o <a href="/quiz">haz el quiz en 60 segundos</a> para obtener tu recomendación personalizada.</p>
    `,
  },

  // ── 14. Nike GT Cut 4 análisis ───────────────────────────────────────
  {
    slug: "nike-gt-cut-4-analisis-2025",
    title: "Nike GT Cut 4: análisis completo — la zapatilla más reactiva de 2025",
    metaTitle: "Nike GT Cut 4 análisis 2025: tracción, cushion y veredicto | CANCHA.ZAPA",
    description:
      "Análisis completo de la Nike Air Zoom GT Cut 4: tracción 10/10, Zoom Air Strobel, horma estrecha y por qué es la mejor zapatilla para bases y escoltas en 2025.",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 6,
    eyebrow: "★ Análisis · Nike GT Cut 4",
    heroTitle: "Nike GT Cut 4",
    heroSubtitle: "La zapatilla más reactiva del mercado en 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-gt-cut-4", "nike-gt-cut-3", "ua-curry-13", "anta-kai-2", "adidas-ae-3"],
    relatedSeoPages: ["mejor-zapatilla-base", "zapatillas-reactivas", "mejores-zapatillas-baloncesto-2025"],
    body: `
<p class="art-intro">La Nike Air Zoom GT Cut 4 es la zapatilla de baloncesto que más se repite en la lista de deseos de guards y escoltas en 2025. Tracción 10/10, Zoom Air Strobel de última generación y solo 305g. Victor Wembanyama la escogió para la temporada NBA 25-26 — un 2,24m que usa una zapatilla de guard te dice todo lo que necesitas saber sobre su court feel.</p>

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
    <tr style="border-bottom:1px solid #27272a"><td style="padding:8px">Tecnología</td><td style="padding:8px">Zoom Air Strobel + React foam</td></tr>
    <tr style="border-bottom:1px solid #27272a"><td style="padding:8px">Suela</td><td style="padding:8px">Herringbone nueva generación (goma dura)</td></tr>
    <tr style="border-bottom:1px solid #27272a"><td style="padding:8px">Altura</td><td style="padding:8px">Low-top</td></tr>
    <tr style="border-bottom:1px solid #27272a"><td style="padding:8px">Peso</td><td style="padding:8px">305g (US10)</td></tr>
    <tr style="border-bottom:1px solid #27272a"><td style="padding:8px">Drop</td><td style="padding:8px">7mm</td></tr>
    <tr style="border-bottom:1px solid #27272a"><td style="padding:8px">Horma</td><td style="padding:8px">Normal (tirando a estrecha)</td></tr>
    <tr><td style="padding:8px">Precio recomendado</td><td style="padding:8px">~160-170€</td></tr>
  </tbody>
</table>
</div>

<h2>Tracción: la mejor del mercado</h2>
<p>El outsole herringbone de la GT Cut 4 es la referencia en tracción de pista cubierta en 2025. El patrón actualizado añade más canales multidireccionales que la GT Cut 3, lo que mejora el agarre en cortes oblicuos — los más exigentes en juego real.</p>
<p>En parquet limpio, el agarre es inmediato sin necesidad de limpiar la suela. En pistas con algo de polvo, aguanta mejor que la mayoría de competidoras. La única limitación: la goma es fina para reducir peso, lo que penaliza en exterior (asfalto) donde se desgasta rápido. <strong>Son exclusivamente zapatillas de pabellón.</strong></p>

<h2>Amortiguación: funcional, no espectacular</h2>
<p>La GT Cut 4 no es una zapatilla de cushion — y eso es una elección deliberada. El Zoom Air Strobel (que recorre toda la plantilla) da una respuesta energética inmediata, pero la amortiguación total es moderada: 7/10 en nuestra escala. Pívots y jugadores de más de 100kg que aterrizan con impacto fuerte encontrarán otras opciones más protectoras.</p>
<p>Para un guard de 70-85kg que hace cortes cortos y cambios de dirección rápidos, es suficiente. Pero si comparas con la Nike LeBron 22 o la Jordan Tatum 4 en cushion puro, la diferencia es notable.</p>

<h2>Respuesta y court feel</h2>
<p>Aquí es donde la GT Cut 4 destruye a la competencia. El Zoom Air Strobel tiene un retorno de energía casi instantáneo — pisas y recuperas energía en menos de 20ms según las pruebas de Nike. Combinado con el drop de 7mm y la suela fina, obtienes una sensación de contacto directo con el parquet que pocas zapatillas replican.</p>
<p>Es la zapatilla que más se acerca a jugar descalzo sobre parquet — en el buen sentido. Sabes exactamente dónde está tu pie en cada momento.</p>

<h2>Horma y ajuste</h2>
<p>La GT Cut 4 tiene horma normal tirando a estrecha, especialmente en el antepié. Si tienes pie ancho (más de 10cm de anchura en la parte más ancha del pie), sube media talla o busca alternativas como la ANTA Kai 2 que tiene horma más generosa.</p>
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
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Tracción</td>
      <td style="padding:8px;text-align:center">⭐ 10</td>
      <td style="padding:8px;text-align:center">9</td>
      <td style="padding:8px;text-align:center">8</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Respuesta</td>
      <td style="padding:8px;text-align:center">⭐ 9</td>
      <td style="padding:8px;text-align:center">9</td>
      <td style="padding:8px;text-align:center">8</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Horma ancha</td>
      <td style="padding:8px;text-align:center">❌ No</td>
      <td style="padding:8px;text-align:center">✅ Normal</td>
      <td style="padding:8px;text-align:center">⭐ Ancha</td>
    </tr>
    <tr>
      <td style="padding:8px">Precio</td>
      <td style="padding:8px;text-align:center">~160€</td>
      <td style="padding:8px;text-align:center">~140€</td>
      <td style="padding:8px;text-align:center">⭐ ~119€</td>
    </tr>
  </tbody>
</table>
</div>

<h2>Veredicto</h2>
<p>La Nike GT Cut 4 es la mejor zapatilla de baloncesto para guards en 2025 — si encajas en el perfil. La tracción y la respuesta son el techo del mercado. Pero hay dos condiciones: pie normal o estrecho, y juego exclusivamente indoor. Si se cumplen ambas, es una compra que no te arrepentirás.</p>
<p>Si tienes pie ancho o necesitas más cushion, la <a href="/zapatilla/ua-curry-13">UA Curry 13</a> o la <a href="/zapatilla/anta-kai-2">ANTA Kai 2</a> son alternativas más cómodas y algo más baratas.</p>

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
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Guías",
    readMinutes: 5,
    eyebrow: "★ Guía para padres · Junior 2025",
    heroTitle: "Zapatillas de baloncesto para niños y jóvenes",
    heroSubtitle: "Lo que nadie te dice antes de comprarlas",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-precision-8", "adidas-cross-em-up-select", "decathlon-tarmak-voltzy-500", "nike-giannis-immortality-5", "ua-lockdown-7"],
    relatedSeoPages: ["zapatillas-baloncesto-junior", "zapatillas-baloncesto-baratas", "mejor-zapatilla-base"],
    body: `
<p class="art-intro">Comprar zapatillas de baloncesto para un niño o adolescente tiene sus propias reglas. Los pies crecen rápido, el presupuesto es limitado y el rendimiento debe acompañar el nivel de juego. Esta guía responde las preguntas que todo padre hace antes de comprar.</p>

<h2>Lo primero: ¿cuánto debo gastar?</h2>
<p>La tentación de comprar las mismas zapatillas que usa el jugador favorito de tu hijo existe, pero no siempre tiene sentido. Aquí va una guía práctica según el nivel:</p>
<ul>
  <li><strong>Iniciación (6-10 años):</strong> 30-50€. Los niños crecen muy rápido — una zapatilla básica dura 1 temporada. Prioriza comodidad y amortiguación básica. Decathlon Tarmak y Nike Precision son las opciones más inteligentes.</li>
  <li><strong>Escuela/Club (10-14 años):</strong> 50-80€. Ya tiene sentido invertir algo más — la zapa dura más y el niño empieza a desarrollar su técnica. Nike Precision 8, Adidas Cross-Em Up Select y UA Lockdown 7 son las mejores opciones de este rango.</li>
  <li><strong>Federado/Cadete (14-18 años):</strong> 80-130€. A esta edad, el rendimiento importa. El pie ya está más estabilizado (menos crecimiento por año) y vale la pena invertir en modelos con tecnología seria: Adidas AE 3, Nike Zoom Freak, Puma MB.04.</li>
</ul>

<h2>Tallas: GS (Grade School) y diferencias clave</h2>
<p>La mayoría de zapatillas de rendimiento de Nike, Adidas y Jordan están disponibles en <strong>tallas GS (Grade School)</strong>, que cubren aproximadamente EU 35.5 hasta EU 40. Estas son versiones reducidas del modelo adulto con la misma tecnología pero adaptadas al perfil del pie infantil.</p>
<p><strong>Atención:</strong> algunas zapatillas premium solo están disponibles en tallas adulto (EU 40+). Verifica siempre la disponibilidad en GS antes de comprometerte con un modelo concreto.</p>
<p>Para medir correctamente: mide el pie en centímetros por la tarde (cuando está más hinchado) y suma 1cm para espacio en punta. Los niños en crecimiento pueden necesitar 1-1.5cm de espacio adicional — pero no más, porque el pie se mueve demasiado dentro de la zapatilla.</p>

<h2>Los mejores modelos junior en 2025</h2>

<h3>1. Nike Precision 8 GS (~55€)</h3>
<p>La mejor opción para iniciación y nivel escolar. Disponible en tallas desde EU 35.5, con la misma suela de tracción herringbone que el modelo adulto. Buena amortiguación básica, upper de malla transpirable. La zapatilla que más veces aparece en pistas escolares en España — y con razón.</p>

<h3>2. Adidas Cross-Em Up Select Kids (~45€)</h3>
<p>Suela Continental a un precio muy bajo. Para la edad de iniciación, la tracción Continental de Adidas en una zapatilla de 45€ es una ventaja real. La horma es algo estrecha — ideal para pies normales o estrechos.</p>

<h3>3. Decathlon Tarmak Fast 500 (~35€)</h3>
<p>La opción más económica con rendimiento real. Perfecta para niños que están probando el baloncesto y aún no sabes si seguirán. La Tarmak es durable, cómoda y aguanta exterior e interior. A 35€, si el niño crece dos tallas en una temporada, no duele tanto el gasto.</p>

<h3>4. Nike Giannis Immortality 5 GS (~70€)</h3>
<p>Para adolescentes de 12-16 años que juegan en club. El Giannis Immortality ofrece amortiguación de gama media y buena estabilidad a un precio razonable. El atractivo del jugador (Giannis Antetokounmpo) añade un plus de motivación para el chaval.</p>

<h3>5. Jordan Tatum 2 o 3 GS (~80-90€)</h3>
<p>Para jugadores cadetes con nivel federado que buscan rendimiento real. La línea Tatum tiene un cushion serio y tracción competente en un paquete que funciona para aleros y escoltas junior. La Tatum 2 a menudo la encuentras en oferta — buena opción de relación calidad-precio.</p>

<h2>¿Low, mid o high para un niño?</h2>
<p>Para niños sin historial de esguinces: cualquier altura funciona. Para niños con tobillos débiles o historial de torceduras: prioriza mid o high. La diferencia en protección entre low y mid es real en jugadores en formación cuya musculatura de tobillo aún se está desarrollando.</p>
<p>Si tu hijo juega en posición 1-2 (base/escolta) y es ágil, low-top está bien. Para posiciones 4-5 (ala-pívot/pívot), una mid o high ofrece más protección en los contactos de la pintura.</p>

<h2>¿Interior o exterior?</h2>
<p>La mayoría de equipos junior entrenan y juegan en pabellón. Si tu hijo también juega en parque o cancha exterior (streetball), necesita una zapatilla con suela de goma robusta. La Nike Precision 8 y la Decathlon Tarmak son buenas opciones "todo terreno". Las zapatillas premium de competición (GT Cut, Curry 13) NO son para exterior.</p>

<h2>Dónde comprar las mejores zapatillas junior</h2>
<p>Para iniciación: Decathlon es la mejor opción — puedes probarlas en tienda, tienen buena política de devolución y el precio es imbatible. Para modelos Nike/Adidas/Jordan: Amazon ES con vendedor oficial ofrece devolución en 30 días, lo que es clave cuando el niño crece rápido o la talla no queda bien.</p>

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
    relatedShoes: ["ua-curry-13", "nike-lebron-22", "jordan-tatum-4", "adidas-ae-3", "nike-gt-cut-4"],
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
<p>Zoom Air en talón y antepié, plataforma ancha, estabilidad 8.5/10. El LeBron está diseñado para jugadores físicos de 100kg+ — la misma ingeniería que protege a un jugador de ese tamaño protege perfectamente a un jugador con pie plano a cualquier peso. Precio: ~160-190€.</p>

<h3>2. Jordan Tatum 4 — balanced con soporte real</h3>
<p>Estabilidad 8.5/10, soporte lateral 8/10, Zoom Air full-length. La Tatum es una de las zapatillas más equilibradas del mercado — no brilla en ningún atributo específico pero no falla en ninguno. Perfecta para aleros con pie plano que necesitan versatilidad. Precio: ~140-160€.</p>

<h3>3. UA Curry 13 — court feel con soporte</h3>
<p>Sorprendentemente buena para pie plano: UA Flow con geometría de suela estabilizadora, soporte lateral 8/10, estabilidad 7.5/10. Más reactiva que el LeBron, ideal si eres guard con pie plano. El UA Flow actúa como una plantilla extra al ser la espuma de suela directo al suelo. Precio: ~140-160€.</p>

<h3>4. Adidas AE 3 — la más accesible</h3>
<p>Si el presupuesto importa, la AE 3 ofrece estabilidad 7.5/10 y soporte lateral 8/10 a ~120-130€. Lightstrike Pro firme, herringbone tracción. No llega al LeBron en cushion pero sí en soporte. Para jugadores de hasta 85kg con pie plano, es suficiente.</p>

<h3>5. Nike GT Hustle 3 — soporte de tobillo + pie plano</h3>
<p>Si tienes pie plano <em>y</em> historial de esguinces, la GT Hustle 3 en versión mid-top es la solución. Estabilidad 8/10, soporte lateral 7.5/10, collar de tobillo reforzado. Más pesada que la GT Cut, pero para un jugador con problemas combinados de pie plano + tobillo débil, es la opción más segura del mercado.</p>

<h2>Lo que debes evitar</h2>
<ul>
  <li><strong>Zapatillas ultraligeras tipo "racing":</strong> La Kobe 8 Protro (295g), la GT Cut 4 (315g) o cualquier low-profile extremo no tiene la plataforma de soporte que necesita un pie plano. Excelentes zapatillas, pero no para este perfil.</li>
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

  // ── 17. Adidas AE 3 análisis ─────────────────────────────────────────
  {
    slug: "adidas-ae-3-analisis-2025",
    title: "Adidas AE 3 análisis completo: la mejor zapatilla de baloncesto de 2025",
    metaTitle: "Adidas AE 3 análisis 2025: tracción, cushion, precio | CANCHA.ZAPA",
    description:
      "Análisis técnico completo de las Adidas AE 3 (Anthony Edwards): tracción, amortiguación, ajuste y comparativa con GT Cut 4 y Curry 13. ¿Vale la pena a 130€?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 6,
    eyebrow: "★ Análisis técnico · Adidas AE 3",
    heroTitle: "Adidas AE 3 análisis",
    heroSubtitle: "La zapatilla de Anthony Edwards — ¿realmente la mejor del mercado?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["adidas-ae-3", "nike-gt-cut-4", "ua-curry-13", "anta-kai-2", "jordan-tatum-4"],
    relatedSeoPages: ["zapatillas-traccion", "zapatillas-reactivas", "mejor-zapatilla-base"],
    body: `
<p class="art-intro">La Adidas AE 3 lleva varios meses en el tope de nuestros rankings. Tracción 9/10, respuesta excepcional, horma versátil. Pero ¿por qué exactamente? Este análisis desmonta la zapatilla atributo por atributo para que entiendas qué la hace tan buena y si encaja con tu perfil.</p>

<h2>Contexto: Anthony Edwards y la línea AE</h2>
<p>Anthony Edwards firmó con Adidas en 2023 y la AE 3 es el tercer modelo de su línea signature. Edwards es un escolta explosivo, potente y con un primer paso brutal — su zapatilla refleja exactamente eso: tracción y respuesta por encima de todo. Adidas metió Lightstrike Pro en el modelo, la misma tecnología de las zapatillas de élite de atletismo.</p>
<p>La AE 3 se lanzó a <strong>~130€</strong>, un precio razonable para la tecnología que incluye. Es un escalón por debajo del precio aspiracional de Jordan y Nike (150-180€) con rendimiento comparable o superior en la mayoría de atributos.</p>

<h2>Tracción: la mejor del mercado en indoor</h2>
<p>El patrón herringbone de la AE 3 es uno de los mejores que hemos probado en pabellón en 2025. La goma agarra en todas las direcciones — cambios de dirección laterales, arranques, paradas — sin un solo deslizamiento. En polvo de la cancha funciona bien; en suelo muy sucio (pabellones mal barridos) necesitas limpiar con regularidad, como cualquier zapatilla indoor.</p>
<ul>
  <li><strong>Indoor:</strong> excepcional (9/10)</li>
  <li><strong>Outdoor:</strong> no recomendable — la goma se desgasta rápido en asfalto</li>
  <li><strong>Patrón:</strong> herringbone full-length con variaciones en talón y antepié</li>
</ul>

<h2>Amortiguación: reactiva, no máxima</h2>
<p>La AE 3 lleva <strong>Lightstrike Pro</strong> en el antepié y una capa de Lightstrike base en el talón. El resultado es un cushion reactivo y devolutivo — sientes el suelo pero con protección suficiente. No es la zapatilla de máxima amortiguación del mercado (ese papel lo juegan LeBron 22 o Fresh Foam BB v3), pero tampoco es minimal. Score: 7.5/10.</p>
<p>Para jugadores de 60-85 kg que no buscan cushion de pívot, es más que suficiente. Para jugadores de 90+ kg o con rodillas sensibles, considera alternativas con más stack de cushion.</p>

<h2>Respuesta y court feel</h2>
<p>Aquí la AE 3 destaca especialmente. El Lightstrike Pro devuelve energía de forma eficiente — cuando aceleras, la midsole "empuja" en lugar de absorber pasivamente. Es la característica que más aprecia Edwards (cuyo juego se basa en primeros pasos) y que más notable resulta en cancha.</p>
<p>El court feel es excelente para una zapatilla con cushion de este nivel. No es tan "al suelo" como la GT Cut 4, pero tampoco parece que estás sobre un cojín.</p>

<h2>Ajuste y horma</h2>
<p>La AE 3 tiene una horma <strong>media-ancha</strong>, más generosa que la GT Cut 4 (estrecha) y más estrecha que la LeBron 22 (ancha). Para la mayoría de pies normales a ligeramente anchos, encaja perfectamente en talla habitual. Algunos usuarios con pie muy ancho suben media talla.</p>
<p>El upper en flyknit estructurado ofrece un ajuste ceñido pero sin puntos de presión. El collar de tobillo está bien acolchado. No hay historial de rozaduras en el talón en la AE 3, un problema que sí afecta a algunos usuarios de la GT Cut 4.</p>

<h2>Soporte y estabilidad</h2>
<p>La AE 3 ofrece soporte lateral sólido (7.5/10) para un zapato low-top. El counter de talón es rígido y el midfoot shank controla el torsional. Para guards y escoltas que hacen muchos cortes, el soporte es más que suficiente. No es el zapato para un pívot de 100 kg que necesita máxima estabilidad — ahí manda el LeBron 22 o la Jordan Tatum 4.</p>

<h2>Peso</h2>
<p>La AE 3 pesa aproximadamente <strong>350g</strong> en talla 44 (US 10), que es ligera para su categoría. No llega a la ligereza extrema de la GT Cut 4 (~305g), pero la diferencia no es apreciable en cancha. Para un jugador amateur, el peso no es un factor diferencial en este rango.</p>

<h2>Comparativa directa</h2>
<table style="border-collapse:collapse;width:100%;font-size:13px;margin:16px 0">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left;color:#fff">Atributo</th>
      <th style="padding:8px;text-align:center;color:#f97316">AE 3</th>
      <th style="padding:8px;text-align:center;color:#e4e4e7">GT Cut 4</th>
      <th style="padding:8px;text-align:center;color:#e4e4e7">Curry 13</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px;color:#a1a1aa">Tracción</td>
      <td style="padding:8px;text-align:center;color:#4ade80">9/10</td>
      <td style="padding:8px;text-align:center;color:#4ade80">10/10</td>
      <td style="padding:8px;text-align:center;color:#4ade80">8/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px;color:#a1a1aa">Cushion</td>
      <td style="padding:8px;text-align:center;color:#facc15">7.5/10</td>
      <td style="padding:8px;text-align:center;color:#facc15">6/10</td>
      <td style="padding:8px;text-align:center;color:#facc15">8/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px;color:#a1a1aa">Respuesta</td>
      <td style="padding:8px;text-align:center;color:#4ade80">9/10</td>
      <td style="padding:8px;text-align:center;color:#4ade80">9/10</td>
      <td style="padding:8px;text-align:center;color:#4ade80">8/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px;color:#a1a1aa">Soporte lateral</td>
      <td style="padding:8px;text-align:center;color:#facc15">7.5/10</td>
      <td style="padding:8px;text-align:center;color:#facc15">7/10</td>
      <td style="padding:8px;text-align:center;color:#4ade80">8/10</td>
    </tr>
    <tr>
      <td style="padding:8px;color:#a1a1aa">Precio</td>
      <td style="padding:8px;text-align:center;color:#e4e4e7">~130€</td>
      <td style="padding:8px;text-align:center;color:#e4e4e7">~165€</td>
      <td style="padding:8px;text-align:center;color:#e4e4e7">~150€</td>
    </tr>
  </tbody>
</table>

<h2>¿Para quién es la AE 3?</h2>
<p>La AE 3 es el zapato más versátil de la gama premium de 2025. Funciona para:</p>
<ul>
  <li><strong>Guards (1-2):</strong> tracción y respuesta ideales para un juego explosivo</li>
  <li><strong>Escoltas (2-3):</strong> polivalencia y horma que encaja en pies medios</li>
  <li><strong>Aleros (3):</strong> suficiente cushion y estabilidad para posiciones mixtas</li>
</ul>
<p>No es ideal para:</p>
<ul>
  <li>Pívots que necesitan máxima amortiguación (90 kg+)</li>
  <li>Jugadores outdoor — usa la Precision 8 o KD 17 para asfalto</li>
  <li>Pies muy anchos — considera la ANTA KAI 2 o la LeBron 22</li>
</ul>

<h2>¿Dónde comprar?</h2>
<p>La AE 3 está disponible en Amazon ES (vendedor oficial Adidas), Adidas.es y JD Sports. Amazon suele ser el más barato con devolución en 30 días — ideal si no has probado la horma antes. Algunas colorways limitadas solo están en Adidas.es. Para pies anchos, recomendamos probar primero en tienda si tienes Foot Locker cerca.</p>

<p class="art-outro">La Adidas AE 3 es nuestra zapatilla más recomendada de 2025 para jugadores entre 60-85 kg sin necesidades especiales de cushion máximo. Si tienes dudas sobre si encaja con tu perfil específico, <a href="/quiz">el quiz te da las 5 más compatibles en menos de un minuto</a>.</p>
    `,
  },

  // ── 18. UA Curry 13 análisis ─────────────────────────────────────────
  {
    slug: "ua-curry-13-analisis-2025",
    title: "Under Armour Curry 13 análisis: ¿merece los 150€?",
    metaTitle: "UA Curry 13 análisis 2025: tracción, cushion y ajuste | CANCHA.ZAPA",
    description:
      "Análisis técnico de las Under Armour Curry 13 (Stephen Curry): tecnología UA Flow, cushion, tracción y comparativa con AE 3 y GT Cut 4. ¿Vale la pena?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis técnico · Under Armour Curry 13",
    heroTitle: "Under Armour Curry 13",
    heroSubtitle: "El zapato de Stephen Curry — análisis técnico honesto 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["ua-curry-13", "adidas-ae-3", "nike-gt-cut-4", "anta-kai-2", "jordan-tatum-4"],
    relatedSeoPages: ["zapatillas-reactivas", "mejor-zapatilla-base", "zapatillas-traccion"],
    body: `
<p class="art-intro">Stephen Curry es el mejor tirador de la historia de la NBA y Under Armour lleva desde 2013 construyendo zapatillas alrededor de su estilo de juego: velocidad sin balón, cambios de dirección sin perder equilibrio, y un primer paso que descoloca defensas. La Curry 13 lleva esa filosofía al límite. ¿Pero a 150€ vale la pena frente a la AE 3 a 130€?</p>

<h2>Tecnología: UA Flow y Warp</h2>
<p>La Curry 13 usa dos tecnologías clave:</p>
<ul>
  <li><strong>UA Flow midsole:</strong> espuma sin goma exterior en el antepié. Esto significa que la midsole contacta directamente con el suelo — más court feel, más respuesta, menos peso. El inconveniente: más desgaste en outdoor y en pistas muy abrasivas.</li>
  <li><strong>UA Warp:</strong> sistema de correas internas en el upper que distribuyen la tensión del lacado de forma más uniforme que los ojales tradicionales. El resultado es un ajuste más personalizado y una sujeción superior en los cortes.</li>
</ul>
<p>La combinación de Flow + Warp hace que la Curry 13 tenga un feel único en cancha: muy pegada al suelo, muy responsiva, pero con buena protección en el antepié.</p>

<h2>Tracción: consistente pero no excepcional</h2>
<p>La tracción de la Curry 13 es buena (8/10) pero no llega a la excelencia de la GT Cut 4 o la AE 3 en superficies perfectas. El patrón multidireccional funciona bien en pabellones limpios. En pistas con polvo o ligeramente húmedas, la Curry 13 aguanta mejor que la media gracias al compuesto de goma de UA.</p>
<p>El UA Flow sin goma en el antepié es más deslizante en surfaces no ideales que un patrón herringbone clásico. Si tu pabellón no se barre bien, considera la AE 3 o la GT Cut 4 como alternativas más fiables.</p>

<h2>Cushion y protección</h2>
<p>La midsole ofrece un cushion <strong>8/10</strong> — generosa para una zapatilla tan reactiva. No es el nivel de stack de la LeBron 22, pero protege bien para el juego de Curry: aterrizajes controlados de un guard de 86 kg que rara vez domina la pintura. Para pívots o jugadores de 90 kg+, puede quedarse corta en sesiones largas.</p>
<p>Dato importante: la Curry 13 tiene un drop bajo (4mm), que da un feel más natural pero puede suponer un período de adaptación si vienes de zapatillas con drop alto (8-10mm). En 2-3 sesiones el cuerpo se adapta.</p>

<h2>Soporte y estabilidad: el punto fuerte</h2>
<p>Aquí la Curry 13 destaca claramente sobre sus rivales directos. El sistema Warp distribuye las fuerzas de los cortes de forma más uniforme, y la geometría del talón con el counter rígido ofrece una estabilidad lateral excepcional para un zapato low-top (8/10). Ideal para jugadores con historial leve de esguinces que no quieren renunciar a la libertad de movimiento del low-top.</p>
<p>Si compararas la Curry 13 con la AE 3 en estabilidad lateral, la Curry gana claramente. Si la comparas con un mid-top como la Tatum 4, la Tatum gana. Para la mayoría de guards con tobillos razonablemente estables, la Curry 13 ofrece más que suficiente.</p>

<h2>Peso y comfort</h2>
<p>La Curry 13 pesa <strong>~330g</strong> en talla 44, ligeramente menos que la AE 3 (~350g). El comfort general es alto desde el primer uso — el sistema Warp evita los puntos de presión comunes en zapatos con upper rígido. La lengüeta acolchada y el collar de tobillo bien acabado se notan desde el día uno.</p>

<h2>AE 3 vs Curry 13: ¿cuál elegir?</h2>
<p>Son los dos mejores zapatos de guard de 2025 y la elección depende de tu perfil:</p>
<ul>
  <li><strong>Elige la AE 3 si:</strong> priorizas la tracción, juegas en pabellones con polvo, tienes pie medio-ancho, o tu presupuesto es 130€</li>
  <li><strong>Elige la Curry 13 si:</strong> priorizas estabilidad lateral y court feel, juegas en pabellones limpios, quieres el mejor ajuste customizable, o tienes historial leve de esguinces</li>
  <li><strong>Si tienes 90 kg+:</strong> ninguna de las dos es tu primera opción — considera la LeBron 22, Jordan Tatum 4 o Fresh Foam BB v3</li>
</ul>

<h2>¿Dónde comprar la Curry 13?</h2>
<p>La Curry 13 está disponible en Amazon ES (vendedor oficial UA), UA.com/es y JD Sports. El precio habitual es 150€, aunque algunas colorways o modelos del año anterior se encuentran entre 100-120€ en Amazon con descuento. Las versiones especiales "Splash Zone" o ediciones limitadas suben de precio.</p>

<p class="art-outro">La Curry 13 es una zapatilla premium que justifica su precio para guards que buscan estabilidad y court feel por encima de cushion máximo. Si tienes dudas sobre si encaja con tu perfil, <a href="/quiz">el quiz de CANCHA.ZAPA te da las 5 más compatibles en 60 segundos</a>.</p>
    `,
  },

  // ── 19. Jordan Tatum 4 análisis ──────────────────────────────────────
  {
    slug: "jordan-tatum-4-analisis-2025",
    title: "Jordan Tatum 4 análisis: la zapatilla más versátil de 2025",
    metaTitle: "Jordan Tatum 4 análisis 2025: cushion, tracción, precio | CANCHA.ZAPA",
    description:
      "Análisis técnico completo de las Jordan Tatum 4 (Jayson Tatum): cushion, soporte lateral, ajuste y comparativa con AE 3, Curry 13 y GT Cut 4. ¿La zapatilla más versátil del mercado?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 6,
    eyebrow: "★ Análisis técnico · Jordan Tatum 4",
    heroTitle: "Jordan Tatum 4 análisis",
    heroSubtitle: "La zapatilla de Jayson Tatum — ¿la más versátil de 2025?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["jordan-tatum-4", "adidas-ae-3", "ua-curry-13", "nike-gt-cut-4", "nike-lebron-23"],
    relatedSeoPages: ["zapatillas-cushion", "zapatillas-equilibradas", "mejor-zapatilla-alero"],
    body: `
<p class="art-intro">Jayson Tatum es el alero completo de la era moderna: anota, rebota, defiende y corre la pista entera. Su zapatilla tiene que hacer lo mismo. La Jordan Tatum 4 es nuestra zapatilla más equilibrada de 2025 — no es la mejor en ningún atributo individual, pero no falla en ninguno. Para la mayoría de jugadores amateurs, eso es exactamente lo que necesitan.</p>

<h2>Contexto: Jayson Tatum y la línea Tatum</h2>
<p>Jayson Tatum (Boston Celtics, All-Star, campeón NBA 2024) es el prototipo del alero moderno. Su juego combina explosividad, finesse y versatilidad defensiva. La línea Tatum nació en 2022 y la Tatum 4 es la evolución más madura: más cushion, mejor soporte, construcción más premium.</p>
<p>El precio MSRP es ~140-150€, situándola en el segmento premium-accessible — por encima de la AE 3 (130€) pero por debajo de la LeBron 22 (180€) o la Nike GT Cut 4 (165€).</p>

<h2>Tecnología: Zoom Air + React</h2>
<p>La Jordan Tatum 4 usa una combinación de:</p>
<ul>
  <li><strong>Zoom Air en el antepié:</strong> proporciona respuesta rápida y court feel. La misma unidad que ves en muchas zapas Nike de performance.</li>
  <li><strong>React foam en el talón:</strong> mayor stack de cushion, más suave y protector para aterrizajes desde el poste o rebotes.</li>
</ul>
<p>La combinación Zoom + React es la más versátil de Nike — más cushion que solo Zoom (como la GT Cut 4) y más respuesta que solo React (como la LeBron 22). Para un alero que hace de todo, es el compromiso perfecto.</p>

<h2>Cushion: uno de los mejores del mercado en su segmento</h2>
<p>Con un score de amortiguación <strong>8.5/10</strong>, la Tatum 4 protege bien en todas las situaciones. En aterrizajes desde el aro, contactos en la pintura y partidos de 40+ minutos, el nivel de cushion es más que suficiente para jugadores hasta 95 kg. Para pívots de 100 kg+, el LeBron 22 o la Fresh Foam BB v3 tienen aún más stack.</p>
<p>El cushion no sacrifica el court feel gracias al Zoom en el antepié. Otros zapatos con tanto cushion (LeBron 22, Witness) se sienten "esponjosos" — la Tatum 4 mantiene conexión con el suelo.</p>

<h2>Tracción</h2>
<p>El patrón multidireccional de la Tatum 4 es sólido (8/10) aunque no excepcional. En pabellones limpios, agarra en todas las direcciones sin problema. En suelo con polvo, necesitas limpiar la suela con regularidad. No llega al nivel de la AE 3 o la GT Cut 4 en tracción pura, pero tampoco decepciona.</p>

<h2>Soporte lateral y estabilidad: el punto diferencial</h2>
<p>Aquí la Tatum 4 destaca sobre sus rivales más explosivos (AE 3, GT Cut 4, Curry 13). La construcción high-top ofrece soporte real de tobillo — no solo estético. El collar acolchado está diseñado para contener el tobillo en los cortes laterales sin restringir el movimiento vertical.</p>
<p>Para jugadores con historial de esguinces leves o que simplemente quieren más seguridad en los cortes, la Tatum 4 ofrece el mejor soporte lateral de la gama sin llegar al extremo restrictivo de los LeBron 22 más altos. Score: <strong>9/10</strong>.</p>

<h2>Ajuste y horma</h2>
<p>La Tatum 4 tiene horma <strong>media</strong>, ligeramente más estrecha que la LeBron 22 pero más generosa que la GT Cut 4 o la Kyrie. Para la mayoría de pies normales, encaja perfectamente en talla habitual. Los que tienen pie ancho pueden necesitar media talla más — en talla habitual el antepié puede quedar justo.</p>
<p>El upper construido en materiales sintéticos de alta densidad es sólido pero transpira menos que el flyknit de la AE 3. Para sesiones largas o pabellones calurosos, la ventilación es un punto débil.</p>

<h2>Peso: el único punto negativo</h2>
<p>La Tatum 4 pesa aproximadamente <strong>390g</strong> en talla 44 — más que la AE 3 (350g), la Curry 13 (330g) o la GT Cut 4 (305g). Para una zapatilla de alero versátil, ese peso se nota en sesiones largas. No es un dealbreaker para jugadores de posición 3-4, pero si eres un base que necesita máxima agilidad, el peso es un factor.</p>

<h2>¿Para quién es la Jordan Tatum 4?</h2>
<p>La Tatum 4 es perfecta para:</p>
<ul>
  <li><strong>Aleros (posición 3):</strong> el usuario principal. Equilibrio ideal entre cushion, soporte y versatilidad para un juego de todo el campo.</li>
  <li><strong>Ala-pívots (posición 4):</strong> suficiente cushion y soporte para las posiciones interiores sin el peso extremo de un zapato de pívot.</li>
  <li><strong>Escoltas versátiles (posición 2):</strong> si juegas una gran parte del tiempo en posiciones mixtas y no eres un guard puro explosivo, la Tatum 4 es excelente.</li>
  <li><strong>Jugadores con historial de esguinces:</strong> el soporte high-top es uno de los mejores del mercado para prevención de lesiones sin renunciar a rendimiento.</li>
</ul>
<p>No es ideal para:</p>
<ul>
  <li>Bases explosivos que necesitan ligereza máxima — usa la GT Cut 4 o la Curry 13</li>
  <li>Pívots puros de 100 kg+ — el LeBron 22 o la Fresh Foam BB v3 tienen más cushion</li>
  <li>Jugadores outdoor — su suela no está optimizada para asfalto</li>
</ul>

<h2>Comparativa rápida</h2>
<table style="border-collapse:collapse;width:100%;font-size:13px;margin:16px 0">
  <thead>
    <tr style="border-bottom:2px solid #f97316">
      <th style="padding:8px;text-align:left;color:#fff">Atributo</th>
      <th style="padding:8px;text-align:center;color:#f97316">Tatum 4</th>
      <th style="padding:8px;text-align:center;color:#e4e4e7">AE 3</th>
      <th style="padding:8px;text-align:center;color:#e4e4e7">Curry 13</th>
      <th style="padding:8px;text-align:center;color:#e4e4e7">GT Cut 4</th>
    </tr>
  </thead>
  <tbody>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px;color:#a1a1aa">Cushion</td>
      <td style="padding:8px;text-align:center;color:#4ade80">8.5/10</td>
      <td style="padding:8px;text-align:center;color:#facc15">7.5/10</td>
      <td style="padding:8px;text-align:center;color:#facc15">8/10</td>
      <td style="padding:8px;text-align:center;color:#fb923c">6/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px;color:#a1a1aa">Soporte lateral</td>
      <td style="padding:8px;text-align:center;color:#4ade80">9/10</td>
      <td style="padding:8px;text-align:center;color:#facc15">7.5/10</td>
      <td style="padding:8px;text-align:center;color:#4ade80">8/10</td>
      <td style="padding:8px;text-align:center;color:#facc15">7/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px;color:#a1a1aa">Tracción</td>
      <td style="padding:8px;text-align:center;color:#facc15">8/10</td>
      <td style="padding:8px;text-align:center;color:#4ade80">9/10</td>
      <td style="padding:8px;text-align:center;color:#facc15">8/10</td>
      <td style="padding:8px;text-align:center;color:#4ade80">10/10</td>
    </tr>
    <tr>
      <td style="padding:8px;color:#a1a1aa">Peso</td>
      <td style="padding:8px;text-align:center;color:#fb923c">390g</td>
      <td style="padding:8px;text-align:center;color:#4ade80">350g</td>
      <td style="padding:8px;text-align:center;color:#4ade80">330g</td>
      <td style="padding:8px;text-align:center;color:#4ade80">305g</td>
    </tr>
  </tbody>
</table>

<h2>¿Dónde comprar?</h2>
<p>La Jordan Tatum 4 está disponible en Amazon ES (vendedor oficial Nike/Jordan), JD Sports, Foot Locker ES y Nike.es. Recomendamos Amazon por la política de devolución en 30 días — útil si vas a probar la horma por primera vez. Algunas colorways limitadas (los "PE" o ediciones especiales de Boston Celtics) solo están disponibles en Nike SNKRS o stockistas selectivos.</p>

<p class="art-outro">La Jordan Tatum 4 es nuestra recomendación número uno para aleros y jugadores versátiles que no quieren comprometerse entre cushion, soporte y respuesta. Si quieres ver si encaja exactamente con tu perfil, <a href="/quiz">el quiz te da las 5 más compatibles en menos de un minuto</a>.</p>
    `,
  },
  // ── 20. Nike LeBron 22 análisis ──────────────────────────────────────
  {
    slug: "nike-lebron-22-analisis-2025",
    title: "Nike LeBron 22 análisis: el tope de cushion de 2025",
    metaTitle: "Nike LeBron 22 análisis 2025: cushion, tracción, peso | CANCHA.ZAPA",
    description:
      "Análisis técnico completo de las Nike LeBron 22 (LeBron James): Air Zoom + Cushlon, 425g, high-top. ¿Es la mejor zapatilla para pívots y jugadores pesados de 2025?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis técnico · Nike LeBron 22",
    heroTitle: "Nike LeBron 22",
    heroSubtitle: "El Rolls Royce del cushion — análisis honesto 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-lebron-22", "jordan-tatum-4", "nb-fresh-foam-bb-v3", "ua-curry-13", "adidas-ae-3"],
    relatedSeoPages: ["zapatillas-cushion", "zapatillas-baloncesto-para-rodillas", "mejor-zapatilla-pivot"],
    body: `
<p class="art-intro">LeBron James es el jugador más dominante de la historia por volumen y longevidad. Con 39 años, sigue jugando al máximo nivel — y su zapatilla refleja esa filosofía: más protección, más soporte, más cushion. La LeBron 22 no es para todos. Es para jugadores pesados, pívots, y cualquiera que priorice la protección sobre la ligereza.</p>

<h2>La filosofía LeBron: fuerza por encima de velocidad</h2>
<p>La línea LeBron siempre ha priorizado el cushion y la estabilidad sobre la ligereza y el court feel. LeBron (2.06m, 113kg) necesita una zapatilla que absorba los impactos de décadas de juego profesional. El resultado es una zapatilla que pesa 425g — bastante más que la GT Cut 4 (305g) o la AE 3 (350g). Pero ese peso no es un defecto; es la consecuencia de un sistema de cushion genuinamente premium.</p>

<h2>Tecnología: Air Zoom + Cushlon 3.0</h2>
<p>La LeBron 22 combina:</p>
<ul>
  <li><strong>Air Zoom Strobel full-length:</strong> unidad de aire de longitud completa bajo el pie. La presión del aire en el antepié ofrece respuesta rápida en el despegue. Es la misma tecnología que LeBron lleva usando desde las LeBron 19.</li>
  <li><strong>Cushlon 3.0 en el talón:</strong> espuma de alta densidad que absorbe los impactos de aterrizajes. Para un jugador de más de 90kg que aterriza desde el aro decenas de veces por partido, este talón hace una diferencia real a largo plazo.</li>
</ul>
<p>El resultado es un score de amortiguación <strong>9/10</strong> — el más alto de nuestra base de datos junto con la New Balance Fresh Foam BB v3. Si tienes rodillas sensibles o pesas más de 90kg, ninguna otra zapatilla te protegerá mejor.</p>

<h2>El gran trade-off: respuesta y peso</h2>
<p>Toda esa protección tiene un coste. La LeBron 22 tiene la respuesta más baja de los modelos premium (5/10) — es una zapatilla que absorbe el impacto más que lo devuelve. Si eres un guard que vive de los primeros pasos y las carreras de transición, la LeBron 22 no es tu zapatilla. Pero si eres un ala-pívot o pívot que prioriza la protección en la pintura, ese court feel "apagado" es completamente aceptable.</p>
<p>El peso de 425g en talla 44 es notable. En 40 minutos de partido, esa diferencia de 75-120g respecto a una zapatilla ligera se acumula. Para guards: descartada. Para pívots y jugadores de más de 95kg: justificada.</p>

<h2>Tracción y soporte: excelente</h2>
<p>La tracción es sólida (8/10) con un patrón multidireccional que funciona bien en pabellones limpios. No es la mejor en suelo con polvo (la AE 3 o la GT Cut 4 la superan), pero es más que suficiente para el 90% de pabellones españoles.</p>
<p>El soporte lateral del high-top es excepcional (9/10). El collar de tobillo con espuma densa bloquea la inversión lateral de forma efectiva. Para pívots que hacen contactos constantes bajo el aro, o para cualquier jugador con historial de esguinces graves, este soporte marca una diferencia real. No es solo marketing — la construcción high-top de la LeBron 22 es genuinamente protectora.</p>

<h2>¿Para quién es la LeBron 22?</h2>
<ul>
  <li><strong>Pívots (posición 5):</strong> el usuario ideal. El cushion y el soporte compensan el peso extra.</li>
  <li><strong>Ala-pívots pesados (85-100+ kg):</strong> si pesas más de 90kg y no eres un guard puro explosivo, la LeBron 22 te protege mejor que cualquier alternativa del mercado.</li>
  <li><strong>Jugadores con rodillas sensibles:</strong> el stack de cushion más alto del mercado reducirá el estrés en tus articulaciones.</li>
  <li><strong>Jugadores con historial de esguinces graves:</strong> el high-top ofrece el mejor soporte de tobillo disponible.</li>
</ul>
<p>No recomendada para:</p>
<ul>
  <li>Guards y escoltas que necesitan velocidad máxima</li>
  <li>Jugadores outdoor (la suela se desgasta rápido en asfalto)</li>
  <li>Jugadores ligeros (sub-75kg) — el cushion es excesivo para ese perfil</li>
</ul>

<h2>Precio: ¿vale la pena?</h2>
<p>La LeBron 22 cotiza a <strong>~180€ MSRP</strong>, el precio más alto de nuestra comparativa. En Amazon ES se encuentra a veces a 150-165€ en colorways menos populares. Para un jugador que va a usar la zapatilla 3-4 veces por semana durante una temporada completa, 180€ dividido entre 40 semanas son 4,5€ por semana de la mejor protección del mercado. Así analizado, el precio se justifica.</p>
<p>Si el presupuesto es limitado, la Nike LeBron Witness 9 (~90€) es la versión accesible de la filosofía LeBron: menos cushion, menos soporte, pero la misma orientación hacia la protección. Para los que pueden permitirse el gasto, la LeBron 22 es la referencia absoluta en cushion 2025.</p>

<p class="art-outro">La LeBron 22 es la mejor zapatilla de 2025 para jugadores que priorizan cushion y soporte por encima de todo. Si no estás seguro de si tu perfil encaja, <a href="/quiz">el quiz de CANCHA.ZAPA te da las 5 más compatibles en 60 segundos</a>.</p>
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
