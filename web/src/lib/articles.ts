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
    relatedShoes: ["nike-precision-8", "adidas-cross-em-up-select", "decathlon-tarmak-fast-900", "adidas-ownthegame-3", "ua-lockdown-7"],
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

<h2>3. Decathlon Tarmak Fast 900 — ~50 €</h2>
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

<p>Si juegas en exterior: <a href="/zapatilla/decathlon-tarmak-fast-900">Tarmak Fast 900</a> o <a href="/zapatilla/nike-precision-8">Nike Precision 8</a>. Si juegas solo en interior: <a href="/zapatilla/adidas-cross-em-up-select">Cross-Em Up Select</a>. Si tienes problemas de tobillo: <a href="/zapatilla/puma-playmaker-pro-mid">Playmaker Pro Mid</a>.</p>

<p class="art-outro">En 2025 no necesitas gastar más de 80€ para jugar bien. La Adidas Cross-Em Up Select, la Nike Precision 8 y la Tarmak Fast 900 cubren la mayoría de perfiles. ¿No sabes cuál es la tuya? <a href="/quiz">Haz el quiz en 60 segundos</a> y te damos la recomendación exacta para tu juego.</p>
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
    relatedShoes: ["nike-precision-8", "adidas-cross-em-up-select", "decathlon-tarmak-fast-900", "nike-giannis-immortality-5", "ua-lockdown-7"],
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

<h3><a href="/zapatilla/jordan-tatum-4">Jordan Tatum 4 — 150€</a></h3>
<p><strong>El mejor equilibrio del mercado.</strong> Jayson Tatum es el prototipo del alero moderno: defiende del 1 al 5, mete cortes, tira de tres y postea. La Tatum 4 está diseñada para eso: score 7+ en todos los ejes con cushion Zoom Air + Impact Plate para los aterrizajes.</p>
<ul>
  <li>✅ Cushion 8 + respuesta 8: el mejor equilibrio technico del grupo</li>
  <li>✅ High-top: máxima protección lateral para el alero que juega físico</li>
  <li>✅ Horma normal-ancha: encaja con la mayoría de pies</li>
  <li>❌ No es la más ligera (390g) — se nota si juegas de base en emergencia</li>
</ul>

<h3><a href="/zapatilla/adidas-harden-vol-9">Adidas Harden Vol 9 — 129€</a></h3>
<p><strong>Para aleros con perfil físico que postean.</strong> James Harden es técnicamente un escolta/alero con juego de pívot — la Vol 9 refleja eso. Lightstrike Pro foam da cushion generoso sin exceso de peso. La opción si juegas media cancha más que medio campo.</p>
<ul>
  <li>✅ Lightstrike Pro: cushion alto con bounce reactivo</li>
  <li>✅ Base ancha: estabilidad sólida en contactos laterales</li>
  <li>✅ 30€ más barata que la Tatum 4 con rendimiento similar</li>
  <li>❌ Respuesta algo por debajo: para cortes explosivos, la Tatum gana</li>
</ul>

<h3><a href="/zapatilla/nike-kd-17">Nike KD 17 — 149€</a></h3>
<p><strong>Para aleros que salen mucho al perímetro.</strong> Kevin Durant es el alero/pívot que más tira de tres del mercado. La KD 17 tiene Zoom Strobel full-length para el bounce que necesitas cuando aterrizas de un tres, más upper TPU que soporta los contactos.</p>
<ul>
  <li>✅ Zoom Strobel full-length: cushion reactivo para jugadores >85kg</li>
  <li>✅ Upper de TPU: soporte estructural sin peso extra</li>
  <li>✅ Score equilibrado — ningún punto débil destacado</li>
  <li>❌ Horma algo estrecha en el antepié para pie ancho</li>
</ul>

<h3><a href="/zapatilla/ua-flow-breakthru-4">Under Armour Flow Breakthru 4 — ~110€</a></h3>
<p><strong>Para aleros dinámicos que priorizan la sensación de suelo.</strong> UA Flow sin capa de goma da un court feel diferente — más en contacto con el suelo, más reactivo. Para aleros que juegan más el uno contra uno y los cortes que el juego de poste.</p>
<ul>
  <li>✅ UA Flow: court feel excepcional para un alero</li>
  <li>✅ Ligera para su cushion — ventaja en las ayudas defensivas</li>
  <li>❌ No usar en exterior — sin goma, la suela se destruye en asfalto</li>
  <li>❌ Horma algo estrecha para pie ancho</li>
</ul>

<h3><a href="/zapatilla/jordan-luka-4">Jordan Luka 4 — 145€</a></h3>
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
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Jordan Tatum 4</strong></td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">⭐ 8/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">150€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Adidas Harden Vol 9</strong></td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">⭐ 129€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Nike KD 17</strong></td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">149€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>UA Flow Breakthru 4</strong></td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">⭐ 120€</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>Jordan Luka 4</strong></td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">145€</td>
    </tr>
  </tbody>
</table>
</div>

<h2>¿Cuál elegir?</h2>
<ul>
  <li><strong>Si juegas un juego equilibrado (cortes, tiros, contacto):</strong> Jordan Tatum 4. El mejor equilibrio del mercado para el alero completo.</li>
  <li><strong>Si juegas con potencia y posteas:</strong> Adidas Harden Vol 9. Cushion alto a precio razonable.</li>
  <li><strong>Si eres alero-tirador y pesas >85kg:</strong> Nike KD 17. El Zoom Strobel da el bounce que necesitas en aterrizajes de tiro.</li>
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
      "Análisis técnico completo de la Nike Ja 3: ZoomX full-length, suela outdoor, horma ancha. ¿Es la mejor zapatilla para guards de 2025?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis en profundidad · Guards 2025",
    heroTitle: "Nike Ja 3",
    heroSubtitle: "¿La mejor zapatilla de guard de 2025?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-ja-3", "nike-ja-2", "adidas-ae-3", "ua-curry-13", "nike-gt-cut-4"],
    relatedSeoPages: ["mejor-zapatilla-base", "mejor-zapatilla-escolta", "mejores-zapatillas-nike"],
    body: `
<p class="art-intro">Ja Morant tiene el primer paso más explosivo de la NBA en 2025. Y por primera vez desde la Kobe 8 Protro, hay una zapatilla de guard que realmente está diseñada para ese tipo de atletismo: ligera, reactiva, con la espuma más avanzada de Nike y una horma ancha que rompe el molde Nike clásico.</p>

<h2>La tecnología que la define</h2>

<h3>ZoomX foam full-length</h3>
<p>La Ja 3 es la primera zapatilla de guard de Nike con ZoomX full-length — la espuma de los Vaporfly de running que devuelve el 85% de la energía de cada pisada. Antes de la Ja 3, el ZoomX solo aparecía en modelos de pívot o alero (Jordan 40). En una zapatilla de guard, el resultado es un bounce notablemente superior a cualquier Zoom Air clásico.</p>

<h3>Suela de goma completa (diferencia con la Curry 13)</h3>
<p>A diferencia de la Under Armour Curry 13 (que usa UA Flow sin capa de goma), la Ja 3 sí tiene suela de goma completa. Eso significa dos cosas: tracción más consistente y durabilidad outdoor real. Puedes llevar la Ja 3 al asfalto de vez en cuando sin destruirla — algo que la Curry 13 no puede decir.</p>

<h3>Horma ancha: la excepción en Nike</h3>
<p>Nike tradicionalmente fabrica sus zapatillas de baloncesto con horma estrecha o normal-estrecha. La Ja 3 rompe esa tendencia: Ja Morant tiene pie ancho y la firma lo refleja. Es la zapatilla Nike de baloncesto con más espacio en el antepié de las actuales en producción. Para jugadores que venían de frustrarse con Nike, esto es un cambio de juego.</p>

<h2>Puntuación técnica CANCHA.ZAPA</h2>
<ul>
  <li>Tracción: <strong>8/10</strong> — sólida en parquet limpio, aguanta algo de polvo</li>
  <li>Amortiguación: <strong>8/10</strong> — el ZoomX da cushion excepcional para low-top</li>
  <li>Respuesta: <strong>9/10</strong> — bounce reactivo, primer paso rápido</li>
  <li>Soporte lateral: <strong>7/10</strong> — aceptable para guard, no es su punto fuerte</li>
  <li>Estabilidad: <strong>7/10</strong> — el ZoomX es algo blando bajo carga extrema</li>
  <li>Ligereza: <strong>8/10</strong> — 326g, una de las más ligeras del grupo con cushion</li>
  <li>Durabilidad outdoor: <strong>8/10</strong> — goma completa, aguanta asfalto moderado</li>
  <li>Ventilación: <strong>7/10</strong> — malla densa, algo cálida en verano</li>
</ul>

<h2>¿Cómo se compara con sus rivales?</h2>

<h3>vs Adidas AE 3 (130€)</h3>
<p>La AE 3 gana en tracción (herringbone 9/10 vs 8/10) y es más económica. La Ja 3 gana en cushion (ZoomX vs Lightstrike Pro) y es mejor para pie ancho. Para jugadores de 70-85kg en pistas algo sucias: AE 3. Para jugadores con pie ancho o que priorizan el cushion: Ja 3.</p>

<h3>vs Under Armour Curry 13 (140€)</h3>
<p>La Curry 13 tiene mejor court feel (UA Flow directo al suelo). La Ja 3 tiene mejor durabilidad outdoor y horma más fácil para pie ancho. Si juegas siempre en interior limpio: Curry 13. Si juegas ocasionalmente fuera o tienes pie ancho: Ja 3.</p>

<h3>vs Nike GT Cut 4 (150€)</h3>
<p>La GT Cut 4 es más reactiva (10/10 respuesta, 310g). La Ja 3 tiene mejor cushion y horma más ancha. Para bases con pie normal o estrecho que buscan el máximo primer paso: GT Cut 4. Para bases con pie ancho o que priorizan cushion+outdoor: Ja 3.</p>

<h2>¿Para quién es la Ja 3?</h2>
<p>Es el mejor match para:</p>
<ul>
  <li>Bases y escoltas de <strong>70-90kg</strong></li>
  <li>Jugadores con <strong>pie ancho</strong> que querían Nike pero no encajaban</li>
  <li>Quien juega tanto en <strong>interior como exterior</strong> y quiere una sola zapatilla</li>
  <li>Quien prioriza <strong>cushion reactivo</strong> sobre court feel extremo</li>
</ul>

<p><strong>No es para ti si:</strong> tienes pie muy estrecho y prefieres lockdown máximo, o si buscas el court feel ultra-bajo de la Curry 13 o la GT Cut 4.</p>

<h2>Disponibilidad y precio</h2>
<p>La Ja 3 se vende en Nike.es, Foot Locker ES, JD Sports ES y Amazon ES. El precio de salida fue 135€ — actualmente el más competitivo del grupo (AE 3 a 130€, Curry 13 a 140€, GT Cut 4 a 150€). Para una zapatilla con ZoomX full-length, 135€ es una propuesta seria.</p>

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

<h3><a href="/zapatilla/jordan-40">Air Jordan 40 — 199€ — La mejor cushion del mercado</a></h3>
<p>ZoomX + Zoom Strobel full-length: la combinación de espumas más avanzada disponible en 2025. El ZoomX devuelve el 85% de la energía con bounce real, mientras el Strobel añade firmeza para que la espuma no colapse. Para pívots y ala-pívots con problemas de rodilla, es el techo tecnológico del mercado.</p>
<ul>
  <li>✅ Amortiguación 10/10 — el cushion más avanzado disponible</li>
  <li>✅ 6 correas internas: estabilidad extra en aterrizajes</li>
  <li>❌ 199€ y 395g — la más cara y pesada del grupo</li>
</ul>

<h3><a href="/zapatilla/nike-lebron-23">Nike LeBron 23 — 179€ — Max Air para jugadores pesados</a></h3>
<p>Max Air en talón + React foam en midsole. El Max Air es una cámara de aire de alta presión que no se aplana bajo cargas extremas — especialmente eficaz para jugadores de 90-110kg. LeBron James ha tenido problemas de rodilla durante su carrera, y la LeBron line refleja ese diseño.</p>
<ul>
  <li>✅ Max Air: el cushion que mejor aguanta bajo cargas pesadas</li>
  <li>✅ React foam: cushion extra en toda la entresuela</li>
  <li>❌ Horma algo estrecha — incómoda para pie ancho</li>
</ul>

<h3><a href="/zapatilla/nike-kd-19">Nike KD 19 — 149€ — El equilibrio precio/cushion</a></h3>
<p>Zoom Strobel + Cushlon 3.0 a un precio 30-50€ por debajo de la LeBron 23 o la Jordan 40. Kevin Durant jugó con rodilla operada durante años — el KD 19 tiene cushion pensado para eso. Para ala-pívots que necesitan protección seria sin el precio top.</p>
<ul>
  <li>✅ Cushion 8/10 a precio razonable</li>
  <li>✅ Bounce reactivo (Strobel) además de amortiguación</li>
  <li>❌ No llega al nivel Max Air de la LeBron para jugadores >100kg</li>
</ul>

<h3><a href="/zapatilla/jordan-tatum-4">Jordan Tatum 4 — 150€ — El mejor para aleros con rodilla</a></h3>
<p>Zoom Air + Impact Plate en la zona del antepié. El Impact Plate distribuye el impacto de los aterrizajes en tres puntos en lugar de concentrarlo, reduciendo el pico de presión en la rótula. Para aleros de 80-95kg con problemas de rodilla, es la mejor opción de la gama media.</p>
<ul>
  <li>✅ Impact Plate: tecnología de distribución de impacto única</li>
  <li>✅ Cushion 8/10 con soporte lateral 9/10</li>
  <li>❌ No está orientada a jugadores >100kg — ahí la LeBron gana</li>
</ul>

<h3><a href="/zapatilla/ua-flow-breakthru-4">Under Armour Flow Breakthru 4 — ~110€ — Para aleros que priorizan suavidad</a></h3>
<p>UA Flow con UA Micro G foam ofrece un cushion suave y reactivo. No llega al nivel de la Jordan 40 o la LeBron, pero para jugadores de 70-85kg con molestias ligeras de rodilla es suficiente — y la más económica del grupo.</p>
<ul>
  <li>✅ Precio más accesible del grupo con cushion 7/10</li>
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
    relatedShoes: ["nb-fresh-foam-bb-v3", "nb-two-wxy-v4", "nb-kawhi-2", "anta-kai-2", "anta-kt-11"],
    relatedSeoPages: ["mejores-zapatillas-new-balance", "mejores-zapatillas-anta", "zapatillas-baloncesto-baratas"],
    body: `
<p class="art-intro">Si tu presupuesto es ajustado o simplemente no quieres pagar el sobreprecio de Nike y Jordan, tienes dos marcas que en 2025 ofrecen rendimiento serio a precio razonable: New Balance y ANTA. Son perfiles muy distintos — y la mejor para ti depende de qué tipo de juego tienes.</p>

<h2>Filosofías de diseño completamente distintas</h2>
<p>Antes de comparar modelos concretos, hay que entender que New Balance y ANTA tienen enfoques diferentes:</p>
<ul>
  <li><strong>New Balance:</strong> cushion generoso, horma ancha, espumas propias (Fresh Foam, FuelCell). Más orientada a jugadores que priorizan comodidad y amortiguación. Influenciada por sus atletas signature (Kawhi Leonard, Darius Garland).</li>
  <li><strong>ANTA:</strong> tecnología reactiva (A-Flashfoam), court feel más directo, horma muy ancha. Marcas de calzado chino con contratos de Kyrie Irving y Klay Thompson. Mejor relación rendimiento/precio en el mercado.</li>
</ul>

<h2>Duelo por categorías</h2>

<h3>Tracción</h3>
<p>ANTA gana. El patrón multidireccional de la Kai 2 y la KT 11 ofrece agarre consistente en parquet limpio y moderado. New Balance tiene tracción sólida pero menos agresiva — la Fresh Foam BB V3 resbala algo más en pistas con polvo.</p>

<h3>Cushion</h3>
<p>New Balance gana. Fresh Foam y FuelCell son espumas maduras con años de I+D en running. El cushion de la NB Fresh Foam BB V3 o la TWO WXY V4 es suave y duradera. ANTA A-Flashfoam es buena para su precio pero no llega al nivel NB en absorción pura.</p>

<h3>Respuesta y court feel</h3>
<p>ANTA gana. La Kai 2 tiene un court feel más directo y reactivo que cualquier NB de baloncesto actual. Para guards y jugadores explosivos, ANTA da mejor primer paso.</p>

<h3>Horma</h3>
<p>Empate, ambas anchas. ANTA y New Balance son las dos marcas con mejor horma para pie ancho en baloncesto. New Balance históricamente ha sido la referencia para pies anchos (sus tallas "2E" y "4E" son estándar en running). ANTA también va ancha, especialmente la Kai 2. Si tienes pie muy ancho, ambas son seguras.</p>

<h3>Durabilidad outdoor</h3>
<p>ANTA gana ligeramente. La Kai 2 tiene suela de goma más gruesa y resistente al asfalto. La Fresh Foam BB V3 aguanta exterior moderado pero se gasta antes en uso intensivo outdoor.</p>

<h3>Precio</h3>
<p>ANTA gana claramente. La Kai 2 (~119€) y la KT 11 (~80€) están significativamente por debajo de la NB TWO WXY V4 (~130€) o la Kawhi 2 (~140€). Para el mismo nivel de rendimiento básico, ANTA da más por menos.</p>

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
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Guard explosivo, pie ancho</td>
      <td style="padding:8px;text-align:center">⭐ ANTA</td>
      <td style="padding:8px;text-align:center">Kai 2 (~119€)</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Jugador pesado (&gt;90kg) con rodillas</td>
      <td style="padding:8px;text-align:center">⭐ New Balance</td>
      <td style="padding:8px;text-align:center">Fresh Foam BB V3</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Junior / primeras zapatillas</td>
      <td style="padding:8px;text-align:center">⭐ ANTA</td>
      <td style="padding:8px;text-align:center">KT 11 (~80€)</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px">Alero equilibrado, pie ancho</td>
      <td style="padding:8px;text-align:center">⭐ New Balance</td>
      <td style="padding:8px;text-align:center">TWO WXY V4 (~130€)</td>
    </tr>
    <tr>
      <td style="padding:8px">Exterior / outdoor frecuente</td>
      <td style="padding:8px;text-align:center">⭐ ANTA</td>
      <td style="padding:8px;text-align:center">Kai 2 (mejor suela)</td>
    </tr>
  </tbody>
</table>
</div>

<h2>El veredicto</h2>
<p>Si tuviéramos que elegir una: <strong>ANTA gana en relación calidad-precio</strong>. La Kai 2 a ~119€ ofrece un rendimiento que avergüenza a zapatillas de 150€ de marcas mainstream. La tracción, la horma ancha y la respuesta están al nivel de modelos premium.</p>

<p>Pero si priorizas cushion puro o pesas más de 90kg, <strong>New Balance es la elección más inteligente</strong>. Fresh Foam da una protección articular que ANTA no iguala en ese rango de precio.</p>

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
    relatedShoes: ["nike-gt-cut-4", "ua-curry-13", "adidas-ae-3", "anta-kai-2", "nike-ja-3"],
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

<h3><a href="/zapatilla/nike-gt-cut-4">Nike GT Cut 4 — 150€</a></h3>
<p><strong>La más explosiva del mercado en 2025.</strong> El Zoom Air de la GT Cut 4 es el más reactivo que Nike fabrica para baloncesto. 310g, suela de goma dura multidireccional con tracción 10/10, court feel absolutamente exceptional. Si tu pie encaja (horma estrecha) y juegas siempre en interior limpio, no hay nada mejor en 2025.</p>
<ul>
  <li>✅ Respuesta 10/10 — la más reactiva del grupo</li>
  <li>✅ Tracción 10/10 — herringbone de carbono</li>
  <li>✅ 310g — la más ligera del grupo</li>
  <li>❌ Horma muy estrecha — pie normal o estrecho únicamente</li>
  <li>❌ Solo interior — la suela se destruye en asfalto</li>
</ul>

<h3><a href="/zapatilla/ua-curry-13">Under Armour Curry 13 — 140€</a></h3>
<p><strong>El mejor court feel del mercado.</strong> UA Flow sin goma en la suela significa que el antepié toca directamente la espuma — el feeling más cercano al suelo que puedes tener en una zapatilla de baloncesto. Para bases que priorizan sentir la cancha, es insuperable. Cushion algo mayor que la GT Cut 4 — mejor para bases de 75-90kg.</p>
<ul>
  <li>✅ Court feel único — el más cercano al suelo del mercado</li>
  <li>✅ Tracción 9/10 en parquet limpio</li>
  <li>✅ Horma normal — más segura para la mayoría de pies</li>
  <li>❌ Sin goma → no outdoor. Una sesión en asfalto destruye la suela</li>
  <li>❌ Tracción baja en pistas con polvo (sin goma que raspa)</li>
</ul>

<h3><a href="/zapatilla/adidas-ae-3">Adidas AE 3 — 130€</a></h3>
<p><strong>El mejor equilibrio precio/rendimiento para bases.</strong> Herringbone 9/10 que funciona en parquet limpio y sucio. Lightstrike Pro reactivo pero con algo más de cushion que la GT Cut 4. 340g, horma normal. Para bases que juegan en diferentes canchas y no quieren pagar el precio premium de la GT Cut 4.</p>
<ul>
  <li>✅ Tracción 9/10 — aguanta pistas con polvo</li>
  <li>✅ Respuesta 9/10 — primer paso rápido</li>
  <li>✅ La más económica del top 3</li>
  <li>❌ No llega al nivel de respuesta pura de la GT Cut 4</li>
</ul>

<h3><a href="/zapatilla/anta-kai-2">ANTA Kai 2 — ~119€</a></h3>
<p><strong>La mejor relación calidad-precio del mercado + horma ancha.</strong> Kyrie Irving tiene uno de los pies más exigentes del baloncesto (ancho, con historial de tobillo) y la Kai 2 lo refleja. A-Flashfoam reactivo, tracción competente y suela que aguanta exterior moderado. Para bases con pie ancho o que no quieren gastar más de 120€, es la elección clara.</p>
<ul>
  <li>✅ Precio: 30€ menos que la AE 3 con 90% del rendimiento</li>
  <li>✅ Horma ancha — la mejor para pies anchos del grupo</li>
  <li>✅ Outdoor moderado — suela de goma más resistente que la Curry 13</li>
  <li>❌ Respuesta algo por debajo de GT Cut 4 y Curry 13</li>
</ul>

<h3><a href="/zapatilla/nike-ja-3">Nike Ja 3 — 135€</a></h3>
<p><strong>La mejor opción para bases con pie ancho dentro de Nike.</strong> ZoomX full-length da un bounce excepcional para su precio. Horma más ancha que cualquier otra Nike en producción. Suela de goma que aguanta outdoor moderado. Para bases que querían Nike pero no encajaban en la GT Cut 4, la Ja 3 es la respuesta.</p>
<ul>
  <li>✅ ZoomX full-length: cushion + bounce excepcional para un guard</li>
  <li>✅ Horma ancha (raro en Nike)</li>
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
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Nike GT Cut 4</strong></td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">⭐ 310g</td>
      <td style="padding:8px;text-align:center">150€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>UA Curry 13</strong></td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">345g</td>
      <td style="padding:8px;text-align:center">140€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Adidas AE 3</strong></td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">340g</td>
      <td style="padding:8px;text-align:center">⭐ 130€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>ANTA Kai 2</strong></td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">330g</td>
      <td style="padding:8px;text-align:center">⭐ 119€</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>Nike Ja 3</strong></td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">326g</td>
      <td style="padding:8px;text-align:center">135€</td>
    </tr>
  </tbody>
</table>
</div>

<h2>¿Cuál elegir?</h2>
<ul>
  <li><strong>Máximo rendimiento, pie normal o estrecho, interior siempre → <a href="/zapatilla/nike-gt-cut-4">GT Cut 4</a></strong></li>
  <li><strong>Máximo court feel, juegas solo en interior, horma normal → <a href="/zapatilla/ua-curry-13">Curry 13</a></strong></li>
  <li><strong>Mejor equilibrio precio/rendimiento, interior y outdoor → <a href="/zapatilla/adidas-ae-3">AE 3</a></strong></li>
  <li><strong>Presupuesto ajustado o pie ancho → <a href="/zapatilla/anta-kai-2">ANTA Kai 2</a></strong></li>
  <li><strong>Pie ancho, quieres Nike, outdoor ocasional → <a href="/zapatilla/nike-ja-3">Ja 3</a></strong></li>
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
    relatedShoes: ["adidas-ae-3", "nike-kobe-8-protro", "ua-curry-13", "jordan-tatum-4", "nike-gt-cut-4"],
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

<h3><a href="/zapatilla/adidas-ae-3">Adidas AE 3 — 130€</a></h3>
<p><strong>La opción más completa del mercado para el perfil escolta-creador.</strong> El herringbone de 9/10 da agarre en cualquier condición; el Lightstrike Pro da respuesta suficiente para las penetraciones sin sacrificar el cushion. Horma normal, precio competitivo. Para escoltas que juegan en diferentes canchas y no saben si van a interior o exterior.</p>
<ul>
  <li>✅ Tracción 9/10 — el mejor herringbone del mercado para exterior moderado</li>
  <li>✅ Respuesta 9/10 — primer paso competitivo para escolta-creador</li>
  <li>✅ El precio más equilibrado del grupo</li>
  <li>❌ No el cushion más alto — para escoltas >90kg, considera la Tatum 4</li>
</ul>

<h3><a href="/zapatilla/nike-kobe-8-protro">Nike Kobe 8 Protro — 180€</a></h3>
<p><strong>Para el escolta-tirador puro.</strong> La Kobe 8 Protro es la referencia histórica para el perfil escolta: ultra-reactiva (respuesta 10/10), ligerísima (280g) y con el court feel más bajo del mercado. Kobe Bryant era el tirador perfecto — su zapatilla lo refleja. El problema: la horma es muy estrecha y el precio alto.</p>
<ul>
  <li>✅ Respuesta 10/10 — la segunda más explosiva tras la GT Cut 4</li>
  <li>✅ 280g — la más ligera del grupo</li>
  <li>✅ Court feel excepcional para sentir la planta antes del tiro</li>
  <li>❌ 180€ — la más cara del grupo</li>
  <li>❌ Horma muy estrecha — pie normal o estrecho únicamente</li>
</ul>

<h3><a href="/zapatilla/ua-curry-13">Under Armour Curry 13 — 140€</a></h3>
<p><strong>Para escoltas que priorizan el court feel y el tiro perimetral.</strong> UA Flow da la sensación de suelo más directa del mercado. Para el tirador que necesita sentir exactamente cuándo va a soltar el balón y qué tiene bajo los pies, la Curry 13 es el referente. Steph Curry es el mejor tirador de la historia — su zapatilla está diseñada para eso.</p>
<ul>
  <li>✅ Court feel único — ideal para tiradores de posición fija</li>
  <li>✅ Tracción 9/10 en parquet limpio</li>
  <li>✅ Horma normal — segura para la mayoría de pies</li>
  <li>❌ Sin goma → exclusivamente interior. Outdoor la destruye</li>
</ul>

<h3><a href="/zapatilla/jordan-tatum-4">Jordan Tatum 4 — 150€</a></h3>
<p><strong>Para el escolta-alero que juega físico.</strong> Jayson Tatum es técnicamente un alero, pero muchos escoltas físicos (6'5"+) se identifican con su perfil: defiende al base del rival, mete cortes, juega en el poste bajo a veces. La Tatum 4 ofrece la mayor estabilidad lateral del grupo y cushion para los aterrizajes de esos momentos físicos.</p>
<ul>
  <li>✅ Soporte lateral 9/10 — el mayor del grupo para escoltas físicos</li>
  <li>✅ Cushion 8/10 — protege bien en aterrizajes de corte y rebote</li>
  <li>✅ High-top: seguridad extra en el tobillo para el juego físico</li>
  <li>❌ 390g y high-top — no para escoltas que priorizan la velocidad pura</li>
</ul>

<h3><a href="/zapatilla/nike-gt-cut-4">Nike GT Cut 4 — 150€</a></h3>
<p><strong>Para el escolta-base que quiere la máxima reactividad.</strong> Si tu juego de escolta es más parecido al de un base (Shai Gilgeous-Alexander, por ejemplo), la GT Cut 4 te da el mismo primer paso explosivo con algo más de estabilidad que en configuración de base puro.</p>
<ul>
  <li>✅ Respuesta 10/10 y tracción 10/10 — el techo del mercado</li>
  <li>✅ 310g — ligereza excepcional</li>
  <li>❌ Horma muy estrecha — solo si tu pie lo admite</li>
  <li>❌ No outdoor — solo interior limpio</li>
</ul>

<h2>¿Cuál elegir?</h2>
<ul>
  <li><strong>Escolta-creador con juego de penetración → <a href="/zapatilla/adidas-ae-3">AE 3</a></strong> (mejor equilibrio precio/rendimiento)</li>
  <li><strong>Tirador puro de posición fija → <a href="/zapatilla/nike-kobe-8-protro">Kobe 8 Protro</a></strong> o <strong><a href="/zapatilla/ua-curry-13">Curry 13</a></strong> (court feel para el tiro)</li>
  <li><strong>Escolta físico, 85kg+, juego por dentro → <a href="/zapatilla/jordan-tatum-4">Tatum 4</a></strong> (estabilidad y cushion)</li>
  <li><strong>Escolta muy rápido, pie normal/estrecho → <a href="/zapatilla/nike-gt-cut-4">GT Cut 4</a></strong> (máxima reactividad)</li>
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

<h3><a href="/zapatilla/nike-lebron-23">Nike LeBron 23 — 179€</a></h3>
<p><strong>La referencia para ala-pívots de 90kg+.</strong> Max Air en talón + React foam en toda la entresuela. LeBron James es el prototipo del 4 moderno que juega todo el campo — su zapatilla está diseñada para ese perfil. Para ala-pívots de alto impacto físico, el Max Air es el cushion más resistente bajo cargas extremas.</p>
<ul>
  <li>✅ Max Air: el cushion más duro bajo cargas extremas (>90kg)</li>
  <li>✅ React foam en toda la entresuela: bounce además de absorción</li>
  <li>✅ Suela XDR: aguanta outdoor moderado</li>
  <li>❌ 395g y 179€ — la más pesada y cara del grupo</li>
  <li>❌ Horma algo estrecha — problemas para pie muy ancho</li>
</ul>

<h3><a href="/zapatilla/nike-kd-19">Nike KD 19 — 149€</a></h3>
<p><strong>Para ala-pívots dinámicos de 80-100kg.</strong> Kevin Durant es el ala-pívot más móvil de la historia — el KD 19 refleja eso: Zoom Strobel + Cushlon 3.0 da bounce reactivo sin el peso de la LeBron. Para el 4 que sale al perímetro, defiende al 2 y necesita respuesta suficiente para eso.</p>
<ul>
  <li>✅ Zoom Strobel: bounce reactivo para el 4 dinámico</li>
  <li>✅ 30€ más barata que la LeBron con rendimiento muy cercano</li>
  <li>✅ TPU dagger-cage: soporte lateral sólido sin peso extra</li>
  <li>❌ Cushion algo menor que la LeBron para ala-pívots >100kg</li>
</ul>

<h3><a href="/zapatilla/jordan-luka-4">Jordan Luka 4 — 145€</a></h3>
<p><strong>Para ala-pívots con mucho juego de poste y pick-and-pop.</strong> Luka Doncic es técnicamente un base/escolta pero tiene el perfil físico de un 4 pesado. La Luka 4 tiene la base más ancha del grupo y cushion generoso para los aterrizajes del jugador que posta y sale al tres. Horma normal, precio razonable.</p>
<ul>
  <li>✅ Base ancha: la más estable del grupo en contactos laterales</li>
  <li>✅ Cushion Zoom Air para los aterrizajes frecuentes</li>
  <li>✅ Horma normal — sirve para la mayoría de pies</li>
  <li>❌ Respuesta algo menor — para el 4 que necesita mucha explosividad perimetral, considera la KD 19</li>
</ul>

<h3><a href="/zapatilla/adidas-harden-vol-9">Adidas Harden Vol 9 — 129€</a></h3>
<p><strong>La mejor relación calidad-precio del grupo para ala-pívots medianos.</strong> James Harden juega de escolta pero tiene el perfil físico de un 4 — la Harden Vol 9 está pensada para jugadores potentes con movilidad. Lightstrike Pro foam da cushion 9/10 con bounce reactivo a 40€ menos que la LeBron 23.</p>
<ul>
  <li>✅ Lightstrike Pro: cushion 9/10 a precio competitivo</li>
  <li>✅ La más económica del grupo con cushion de gama alta</li>
  <li>✅ Respuesta suficiente para el 4 que sale al perímetro</li>
  <li>❌ No llega a la estabilidad lateral de la LeBron o la Luka para juego de poste muy físico</li>
</ul>

<h3><a href="/zapatilla/jordan-40">Air Jordan 40 — 199€</a></h3>
<p><strong>Para el ala-pívot que prioriza el bounce por encima de todo.</strong> ZoomX + Zoom Strobel es la combinación de espumas más avanzada de 2025. Si eres un 4 moderno que vive en el perímetro (tres puntos, pick-and-pop, post-fade) y valoras ese bounce en cada aterrizaje, la Jordan 40 no tiene rival. El problema: es cara, pesada y atrae el polvo.</p>
<ul>
  <li>✅ ZoomX + Strobel: el bounce más avanzado del mercado</li>
  <li>✅ 6 correas internas: soporte lateral excepcional pese al cushion blando</li>
  <li>❌ 199€ y 395g — precio premium para lo que es</li>
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
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Nike LeBron 23</strong></td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">179€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Nike KD 19</strong></td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">⭐ 8/10</td>
      <td style="padding:8px;text-align:center">149€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Jordan Luka 4</strong></td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">145€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Adidas Harden Vol 9</strong></td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">⭐ 129€</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>Air Jordan 40</strong></td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">199€</td>
    </tr>
  </tbody>
</table>
</div>

<h2>¿Cuál elegir?</h2>
<ul>
  <li><strong>Si pesas >90kg y juegas físico en la pintura → <a href="/zapatilla/nike-lebron-23">LeBron 23</a></strong> (Max Air insustituible para cargas extremas)</li>
  <li><strong>Si eres 4 dinámico, 80-100kg, juegas en el perímetro → <a href="/zapatilla/nike-kd-19">KD 19</a></strong> (mejor equilibrio precio/rendimiento)</li>
  <li><strong>Si juegas mucho poste y pick-and-pop → <a href="/zapatilla/jordan-luka-4">Luka 4</a></strong> (la base más estable del grupo)</li>
  <li><strong>Si buscas la mejor relación calidad-precio → <a href="/zapatilla/adidas-harden-vol-9">Harden Vol 9</a></strong> (cushion 9/10 a 129€)</li>
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
    relatedShoes: ["ua-curry-13", "jordan-40", "nike-lebron-23", "adidas-ae-3", "nike-ja-3"],
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
<p><strong>Qué es:</strong> Una cámara de aire de alta presión con unidades de aire visibles en el talón. No es una espuma, sino una tecnología de amortiguación por cámara de aire. Nike la usa en la línea LeBron desde la LeBron 1.</p>
<p><strong>Cómo se siente:</strong> El cushion más "seguro" del mercado. No colapsa bajo cargas extremas — está diseñado para jugadores de 95-110kg que aterrizan con toda esa masa partido tras partido. El bounce es menor que el ZoomX, pero la protección bajo carga máxima no tiene rival.</p>
<p><strong>El problema:</strong> No da el bounce reactivo del ZoomX. Es un cushion absorbente más que energético. Para guards que necesitan respuesta, no es la opción.</p>
<p><strong>Modelos que la usan:</strong> Nike LeBron 22, Nike LeBron 23, Nike LeBron Witness.</p>
<p><strong>Puntuación relativa:</strong> Respuesta 6/10 · Cushion 10/10 · Estabilidad 8/10</p>

<h3>Lightstrike Pro (Adidas)</h3>
<p><strong>Qué es:</strong> La espuma premium de Adidas para baloncesto y atletismo. Una espuma de TPU modificado que equilibra cushion y respuesta. Más firme que el ZoomX pero más reactiva que el Bounce foam convencional de Adidas.</p>
<p><strong>Cómo se siente:</strong> El equilibrio más honesto del mercado. No es la que más cushion da (Max Air la supera) ni la más reactiva (ZoomX o UA Flow la superan), pero tiene un score medio muy alto en todos los atributos. Para jugadores que no quieren extremos, es la referencia.</p>
<p><strong>El problema:</strong> Es cara de fabricar, por eso aparece solo en los modelos signature premium de Adidas (AE 3, Harden Vol 9). Las versiones económicas de Adidas usan Bounce, que es inferior.</p>
<p><strong>Modelos que la usan:</strong> Adidas AE 3, Adidas Harden Vol 9, Adidas Trae Young 3.</p>
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
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>UA Flow</strong></td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">7/10</td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">❌ 2/10</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>ZoomX</strong></td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">⭐ 9/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">7/10*</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
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
<p style="font-size:12px;color:#52525b">*ZoomX tiene capa de goma en modelos como la Ja 3; sin goma (como en otras configuraciones) no aguanta outdoor.</p>

<h2>¿Cuál es para ti?</h2>
<ul>
  <li><strong>Base o escolta que prioriza court feel y plays en interior → UA Flow</strong> (UA Curry 13). No hay nada como sentir el suelo directamente.</li>
  <li><strong>Guard o alero que quiere bounce con cushion decente → ZoomX</strong> (Nike Ja 3, Air Jordan 40). El mejor equilibrio cushion-respuesta del mercado.</li>
  <li><strong>Pívot o ala-pívot de 90kg+ que necesita protección máxima → Max Air</strong> (Nike LeBron 22/23). El cushion que no colapsa.</li>
  <li><strong>Cualquier posición que busca el mejor equilibrio sin extremos → Lightstrike Pro</strong> (Adidas AE 3, Harden Vol 9). El sweet spot del mercado.</li>
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
      "Análisis técnico completo de la Puma MB.05 de LaMelo Ball: Nitro foam, tracción y veredicto honesto. ¿Mejor que la MB.04? ¿Vale los 139€?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis en profundidad · LaMelo 2025",
    heroTitle: "Puma MB.05",
    heroSubtitle: "¿La mejor Puma de baloncesto de 2025?",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["puma-mb05", "puma-mb-04", "puma-mb03", "adidas-ae-3", "ua-curry-13"],
    relatedSeoPages: ["mejores-zapatillas-puma", "mejor-zapatilla-base", "mejores-zapatillas-baloncesto-2025"],
    body: `
<p class="art-intro">LaMelo Ball es el jugador más estiloso de la NBA en 2025 y eso se nota en su línea de calzado. Las MB.03 y MB.04 generaron mucha expectación — algunas la amaron, otras la odiaron. La MB.05 llega en 2025 como la más madura de la serie. ¿Cumple las expectativas?</p>

<h2>Diseño y primeras impresiones</h2>
<p>La MB.05 es estéticamente la más discreta de la línea Ball — y eso, paradójicamente, es un punto a favor para quien quiere llevarla en cancha sin que el diseño distraiga. El upper de malla multidireccional con refuerzos de TPU da un aspecto más funcional que las versiones anteriores. Puma ha escuchado las críticas sobre la excentricidad del diseño y ha equilibrado.</p>

<h2>La tecnología: Nitro Elite foam</h2>
<p>La MB.05 usa Nitro Elite foam — la versión avanzada del Nitro que Puma también usa en sus zapatillas de running de alta gama. Es una espuma de PEBA modificado, similar en concepto al ZoomX de Nike pero con una formulación propia. El resultado:</p>
<ul>
  <li><strong>Bounce mayor que la MB.04:</strong> el Nitro Elite es más reactivo que el Nitro estándar de la MB.04. En los primeros pasos se nota la diferencia — hay más energía de retorno.</li>
  <li><strong>Cushion 8/10:</strong> más suave que la AE 3 (Lightstrike Pro más firme) pero menos que el ZoomX. Para un guard de 75-90kg es suficiente y protector.</li>
  <li><strong>Ligereza:</strong> la MB.05 pesa alrededor de 330g — similar a la AE 3, más que la GT Cut 4. Para su nivel de cushion, es un peso muy competitivo.</li>
</ul>

<h2>Tracción: el punto débil de la serie</h2>
<p>El patrón de suela de la MB.05 ha sido siempre el punto más criticado de la línea Ball. El problema no es el agarre en sí (es decente en parquet limpio) sino la consistencia: en pistas con algo de polvo, la suela de la MB.05 pierde tracción más rápido que la AE 3 o la Curry 13. El patrón es bonito pero no tan funcional como el herringbone clásico.</p>
<p><strong>Tracción en limpio: 8/10. En pistas con polvo: 6/10.</strong> Si tu pista está impecable, bien. Si es de las pistas de barrio que no se limpian desde el miércoles, el agarre flojea.</p>

<h2>Soporte lateral y tobillo</h2>
<p>La MB.05 es low-top con un collar de espuma que cubre el tobillo sin llegar a mid-top. El soporte lateral está en 7/10 gracias a los refuerzos de TPU en el upper. Para un guard de 70-85kg sin historial de tobillos, es suficiente. Para jugadores más físicos o con esguinces previos, considera una mid-top.</p>

<h2>¿Mejora a la MB.04?</h2>
<p>Sí, en todos los atributos relevantes:</p>
<ul>
  <li>Nitro Elite > Nitro en bounce y cushion</li>
  <li>Upper más contenido — menos llamativo pero más funcional</li>
  <li>Ajuste de la horma más consistente — la MB.04 tenía problemas de talla</li>
  <li>El punto débil (tracción en pistas sucias) sigue siendo el mismo</li>
</ul>

<h2>Puntuación técnica CANCHA.ZAPA</h2>
<ul>
  <li>Tracción: <strong>7/10</strong> (8 en limpio, 6 con polvo)</li>
  <li>Amortiguación: <strong>8/10</strong> — Nitro Elite da cushion serio</li>
  <li>Respuesta: <strong>8/10</strong> — bounce notable para un guard</li>
  <li>Soporte lateral: <strong>7/10</strong> — suficiente para guard sin historial</li>
  <li>Estabilidad: <strong>7/10</strong> — aceptable, no es su punto fuerte</li>
  <li>Ligereza: <strong>8/10</strong> — 330g, muy competitivo para su cushion</li>
  <li>Durabilidad outdoor: <strong>7/10</strong> — suela de goma aguanta outdoor moderado</li>
</ul>

<h2>¿Vale los 139€?</h2>
<p>El precio de 139€ la pone en competencia directa con la Adidas AE 3 (130€) y la UA Curry 13 (140€). Mi veredicto honesto:</p>
<ul>
  <li>Si tienes la pista siempre limpia: <strong>sí, la MB.05 vale 139€</strong>. El Nitro Elite es una espuma premium y el conjunto es muy competitivo.</li>
  <li>Si juegas en pistas con polvo frecuente: elige la <strong>AE 3</strong> — la tracción herringbone es más consistente.</li>
  <li>Si priorizas el court feel y juegas solo en interior: elige la <strong>Curry 13</strong> — la UA Flow da una sensación que el Nitro Elite no puede replicar.</li>
</ul>

<h2>Disponibilidad en España</h2>
<p>La MB.05 se vende principalmente en Puma.com y en tiendas Puma físicas. En Amazon ES y JD Sports el stock varía por colorway. El precio de salida fue 139€ y suele mantenerse estable en los primeros meses.</p>

<p class="art-outro">¿Te interesan las Puma para baloncesto? Visita nuestra <a href="/mejores-zapatillas-puma">guía completa de las mejores Puma de baloncesto</a> o <a href="/quiz">haz el quiz</a> para saber si la MB.05 encaja con tu perfil específico.</p>
    `,
  },

  // ── 30. Análisis Kobe 8 Protro ──────────────────────────────────────
  {
    slug: "nike-kobe-8-protro-analisis-2025",
    title: "Nike Kobe 8 Protro análisis: la mejor zapatilla para tiradores en 2025",
    metaTitle: "Nike Kobe 8 Protro análisis completo 2025 | CANCHA.ZAPA",
    description:
      "Análisis técnico de la Nike Kobe 8 Protro: la zapatilla más reactiva para escoltas y tiradores en 2025. Respuesta 10/10, 280g, court feel único. ¿Vale los 180€?",
    fecha: "2026-05-27",
    fechaLabel: "27 mayo 2026",
    categoria: "Análisis",
    readMinutes: 5,
    eyebrow: "★ Análisis · La zapa del tirador",
    heroTitle: "Nike Kobe 8 Protro",
    heroSubtitle: "La referencia para tiradores en 2025",
    author: "Editorial CANCHA.ZAPA",
    relatedShoes: ["nike-kobe-8-protro", "nike-gt-cut-4", "ua-curry-13", "adidas-ae-3", "nike-kobe-9-low-protro"],
    relatedSeoPages: ["mejor-zapatilla-escolta", "zapatillas-reactivas", "mejores-zapatillas-nike"],
    body: `
<p class="art-intro">Kobe Bryant no necesitaba una zapatilla de moda. Necesitaba la que le diera ventaja en décimas de segundo. La Kobe 8 Protro es la reedición de la zapatilla que Kobe usó durante la temporada 2012-13 — y en 2025 sigue siendo una de las más reactivas del mercado. Esto no es nostalgia. Es ingeniería que aguanta el paso del tiempo.</p>

<h2>¿Por qué la Kobe 8 Protro sigue siendo relevante?</h2>
<p>La mayoría de zapatillas retro Protro son lifestyle disfrazadas de performance. La Kobe 8 Protro es diferente: Nike actualizó la entresuela con Zoom Air Strobel full-length, mantiene el perfil ultra-bajo y la suela herringbone original. El resultado es una zapatilla de 2012 con la tecnología de 2025.</p>
<p>Para tiradores y escoltas, específicamente, la Kobe 8 Protro ofrece algo que ningún modelo nuevo 2025 replica exactamente: el perfil más bajo del mercado combinado con el Zoom Air más reactivo que Nike fabrica en ese volumen.</p>

<h2>Lo que la hace especial técnicamente</h2>

<h3>Perfil ultra-bajo (low-profile)</h3>
<p>La Kobe 8 Protro tiene la distancia suelo-pie más baja de cualquier zapatilla de baloncesto en producción. Eso significa que cuando plantas el pie para tirar, sientes exactamente dónde estás. Para tiradores de posición fija (spot-up shooters), esa información es crítica. La zapatilla "desaparece" bajo el pie — que es exactamente lo que un tirador necesita.</p>

<h3>Zoom Air Strobel full-length</h3>
<p>El Zoom Air Strobel recorre toda la longitud de la zapatilla. En la Protro, está configurado para firmeza máxima — más reactivo que cushion absorbente. Cuando saltas y aterrizas en tiro, el Strobel devuelve energía rápido. Los 280g que pesa la zapatilla tampoco ayudan a frenar ese retorno.</p>

<h3>Suela herringbone de carbon</h3>
<p>El patrón herringbone de carbono de la Kobe 8 es uno de los diseños más copiados de la historia del baloncesto. No en vano: en parquet limpio, la tracción es excepcional. El problema: en pistas con polvo o suciedad, la goma fina se desliza antes que la goma más gruesa de la GT Cut 4 o la AE 3.</p>

<h2>Puntuación técnica CANCHA.ZAPA</h2>
<ul>
  <li>Tracción: <strong>9/10</strong> (baja a 7 en pistas con polvo)</li>
  <li>Amortiguación: <strong>7/10</strong> — el Strobel firma pero no es Max Air</li>
  <li>Respuesta: <strong>10/10</strong> — empatada con la GT Cut 4 como la más reactiva del mercado</li>
  <li>Soporte lateral: <strong>6/10</strong> — low-top con upper de malla: poco soporte</li>
  <li>Estabilidad: <strong>7/10</strong> — la base ancha compensa el upper bajo</li>
  <li>Ligereza: <strong>10/10</strong> — 280g, la más ligera del mercado con Zoom Air</li>
  <li>Durabilidad outdoor: <strong>6/10</strong> — goma fina, no la lleves al asfalto</li>
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
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Nike Kobe 8 Protro</strong></td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">⭐ 280g</td>
      <td style="padding:8px;text-align:center">180€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>Nike GT Cut 4</strong></td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">310g</td>
      <td style="padding:8px;text-align:center">150€</td>
    </tr>
    <tr style="border-bottom:1px solid #27272a">
      <td style="padding:8px"><strong>UA Curry 13</strong></td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">⭐ 10/10</td>
      <td style="padding:8px;text-align:center">345g</td>
      <td style="padding:8px;text-align:center">140€</td>
    </tr>
    <tr>
      <td style="padding:8px"><strong>Adidas AE 3</strong></td>
      <td style="padding:8px;text-align:center">9/10</td>
      <td style="padding:8px;text-align:center">8/10</td>
      <td style="padding:8px;text-align:center">340g</td>
      <td style="padding:8px;text-align:center">130€</td>
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

<h2>¿Vale los 180€?</h2>
<p>La pregunta del millón. Mi respuesta: sí, para el perfil correcto, sí vale. La Kobe 8 Protro ofrece algo que la GT Cut 4 a 150€ no tiene: el perfil más bajo del mercado con 10/10 en respuesta y 280g. Para un tirador puro, esa diferencia se nota en cada tiro. Para el resto de jugadores, la GT Cut 4 o la AE 3 son decisiones más inteligentes.</p>

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
    relatedShoes: ["nike-gt-cut-4", "adidas-ae-3", "ua-curry-13", "nike-ja-3"],
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
<p>Adidas ofrece sus calcetines técnicos en pack de 3, lo que baja el coste por par a ~4€. El tejido es Climalite (equivalente al Dri-FIT de Nike), el cushion es sólido aunque menos específico que la Elite, y la horma encaja especialmente bien con las zapas Adidas (AE 3, Harden, Dame).</p>
<p><strong>Mejor para:</strong> jugadores con zapas Adidas, presupuesto ajustado, entrenadores que necesitan muchos pares.</p>
<p><strong>Precio:</strong> ~12€ el pack · <a href="https://www.amazon.es/s?k=adidas+cushioned+crew+calcetines+baloncesto+pack&tag=canchazapa-21" target="_blank" rel="noopener noreferrer sponsored">Ver en Amazon →</a></p>

<h3>Under Armour Playmaker Mid Crew — para caño alto</h3>
<p>La UA Playmaker tiene el cañero más alto de esta lista — ideal para zapas high-top donde el calcetín interactúa con el collar. Tiene UA HeatGear (tejido frío en verano), cushion en zona de talón y una cinta de compresión en el arco que es notablemente buena para jugadores con pronación moderada.</p>
<p><strong>Mejor para:</strong> zapas de caño alto (LeBron 23, Jordan Tatum 4), jugadores con historial de esguinces, cualquiera que prefiera el cañero largo.</p>
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
    <tr style="border-bottom:1px solid #27272a"><td style="padding:8px"><strong>Nike Elite Cushioned</strong></td><td style="padding:8px;text-align:center">⭐⭐⭐</td><td style="padding:8px;text-align:center">Medio</td><td style="padding:8px;text-align:center">~15€</td><td style="padding:8px">LeBron, Fresh Foam, pívots</td></tr>
    <tr style="border-bottom:1px solid #27272a"><td style="padding:8px"><strong>Nike Elite Lightweight</strong></td><td style="padding:8px;text-align:center">⭐</td><td style="padding:8px;text-align:center">Bajo</td><td style="padding:8px;text-align:center">~13€</td><td style="padding:8px">GT Cut 4, Kobe Protro, guards</td></tr>
    <tr style="border-bottom:1px solid #27272a"><td style="padding:8px"><strong>Adidas Cushioned 3pk</strong></td><td style="padding:8px;text-align:center">⭐⭐</td><td style="padding:8px;text-align:center">Medio</td><td style="padding:8px;text-align:center">~12€</td><td style="padding:8px">Zapas Adidas, uso diario</td></tr>
    <tr style="border-bottom:1px solid #27272a"><td style="padding:8px"><strong>UA Playmaker Mid</strong></td><td style="padding:8px;text-align:center">⭐⭐</td><td style="padding:8px;text-align:center">Alto</td><td style="padding:8px;text-align:center">~12€</td><td style="padding:8px">High-tops, esguinces recurrentes</td></tr>
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
    relatedSeoPages: ["zapatillas-baloncesto-retro", "zapatillas-baloncesto-rodillas"],
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
<div style="background:#18181b;border:1px solid #3f3f46;border-radius:4px;padding:20px 24px;margin:24px 0">
  <ul style="margin:0;padding:0 0 0 16px;color:#a1a1aa;font-size:14px;line-height:2">
    <li><strong style="color:#e4e4e7">Pie plano o pronación</strong> → Superfeet Green</li>
    <li><strong style="color:#e4e4e7">Zapatilla retro o barata</strong> → Sof Sole Athlete</li>
    <li><strong style="color:#e4e4e7">Historial de lesiones tobillo/rodilla</strong> → Bauerfeind Sports</li>
    <li><strong style="color:#e4e4e7">Pie neutro, quieres algo entre rigidez y flexibilidad</strong> → Currex SupportST</li>
    <li><strong style="color:#e4e4e7">Zapatilla premium moderna (LeBron, AE 3, Curry 13)</strong> → No necesitas plantilla</li>
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

<div style="background:#18181b;border:1px solid #3f3f46;border-radius:4px;padding:20px 24px;margin:24px 0">
  <p style="margin:0 0 12px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;color:#f97316">Ficha técnica — Adidas Crazy 8 (KB8 II)</p>
  <ul style="margin:0;padding:0 0 0 16px;color:#a1a1aa;font-size:14px;line-height:1.8">
    <li><strong style="color:#e4e4e7">Tecnología:</strong> Adiprene cushion · Herringbone outsole</li>
    <li><strong style="color:#e4e4e7">Altura:</strong> Mid-top</li>
    <li><strong style="color:#e4e4e7">Lanzamiento original:</strong> 1998</li>
    <li><strong style="color:#e4e4e7">Precio retro actual:</strong> 100-160€</li>
    <li><strong style="color:#e4e4e7">Score jugabilidad:</strong> 7.5/10 (interior)</li>
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
<p>Lo que no tiene sentido es comprarlas esperando el rendimiento de una AE 3 o una GT Cut. Son zapatillas retro con tecnología de 1998. La propuesta correcta es: si te gusta el estilo, si eres fan de la era Kobe-Adidas, o si simplemente quieres algo distinto en pista, son una opción válida. Para rendimiento puro, mira el catálogo moderno.</p>

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

<div style="background:#18181b;border:1px solid #3f3f46;border-radius:4px;padding:20px 24px;margin:24px 0">
  <p style="margin:0 0 12px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;color:#f97316">Ficha técnica — FILA Grant Hill 1 (1995)</p>
  <ul style="margin:0;padding:0 0 0 16px;color:#a1a1aa;font-size:14px;line-height:1.8">
    <li><strong style="color:#e4e4e7">Tecnología:</strong> FILA foam · Cuero premium · Herringbone</li>
    <li><strong style="color:#e4e4e7">Altura:</strong> High-top</li>
    <li><strong style="color:#e4e4e7">Lanzamiento:</strong> 1995</li>
    <li><strong style="color:#e4e4e7">Precio retro actual:</strong> 120-160€</li>
    <li><strong style="color:#e4e4e7">Score jugabilidad:</strong> 7/10 (interior)</li>
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

<div style="background:#18181b;border:1px solid #3f3f46;border-radius:4px;padding:20px 24px;margin:24px 0">
  <p style="margin:0 0 12px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;color:#f97316">Ficha técnica — Nike Shox BB4 (2000)</p>
  <ul style="margin:0;padding:0 0 0 16px;color:#a1a1aa;font-size:14px;line-height:1.8">
    <li><strong style="color:#e4e4e7">Tecnología:</strong> Nike Shox (columnas elastómero) · Herringbone outsole</li>
    <li><strong style="color:#e4e4e7">Altura:</strong> Mid-top</li>
    <li><strong style="color:#e4e4e7">Lanzamiento:</strong> 2000</li>
    <li><strong style="color:#e4e4e7">Precio retro actual:</strong> 140-180€</li>
    <li><strong style="color:#e4e4e7">Score jugabilidad:</strong> 6.5/10 (interior)</li>
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

<div style="background:#18181b;border:1px solid #3f3f46;border-radius:4px;padding:20px 24px;margin:24px 0">
  <div style="display:grid;gap:16px">
    <div>
      <p style="margin:0 0 4px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#f97316">CORTO — Ankle / No-Show</p>
      <p style="margin:0;color:#a1a1aa;font-size:14px;line-height:1.7">Termina al nivel o por debajo del tobillo. Máximo court feel — sientes cada movimiento del pie dentro de la zapatilla. El preferido de los bases explosivos que usan low-tops. <strong style="color:#e4e4e7">Ejemplo:</strong> Nike Elite No-Show (~12€).</p>
    </div>
    <div>
      <p style="margin:0 0 4px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#f97316">MEDIO — Crew / Mid-Calf</p>
      <p style="margin:0;color:#a1a1aa;font-size:14px;line-height:1.7">Llega a la mitad de la pantorrilla. El más popular en pista — equilibrio entre soporte, comodidad y protección ante abrasión. Funciona con mid-top y high-top. <strong style="color:#e4e4e7">Ejemplo:</strong> UA Playmaker Mid Crew (~12€).</p>
    </div>
    <div>
      <p style="margin:0 0 4px;font-size:12px;font-weight:900;text-transform:uppercase;letter-spacing:0.1em;color:#f97316">LARGO — Over-the-Calf / Knee</p>
      <p style="margin:0;color:#a1a1aa;font-size:14px;line-height:1.7">Llega hasta debajo de la rodilla. Look NBA clásico de los 80-90. Añade compresión en pantorrilla — beneficioso para jugadores con historial de esguinces o que prefieren el soporte adicional. <strong style="color:#e4e4e7">Ejemplo:</strong> Stance NBA Over-the-Calf (~16€).</p>
    </div>
  </div>
</div>

<h2>¿Qué altura va con cada zapatilla?</h2>
<p>La regla general es sencilla: la altura del calcetín no debería superar la caña de la zapatilla. Con un low-top, un calcetín largo queda raro y puede generar puntos de presión. Con un high-top, un calcetín corto deja espacio sin soporte entre el calcetín y el borde de la bota.</p>

<ul>
  <li><strong>Low-top</strong> (Kobe 4/5/6, Ja 3, GT Cut 4): calcetín <strong>corto o medio</strong>.</li>
  <li><strong>Mid-top</strong> (AE 3, Curry 13, LeBron 22): calcetín <strong>medio</strong> — el más natural.</li>
  <li><strong>High-top</strong> (Air Jordan 11, Reebok Question, Trae Young): calcetín <strong>medio o largo</strong>.</li>
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
    relatedShoes: ["nike-gt-cut-4", "adidas-ae-3", "ua-curry-13", "jordan-tatum-4"],
    relatedSeoPages: ["zapatillas-baloncesto-outdoor", "zapatillas-baloncesto-baratas"],
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
    relatedShoes: ["nike-lebron-23", "ua-curry-13", "nike-gt-cut-4", "adidas-ae-3"],
    relatedSeoPages: ["zapatillas-baloncesto-rodillas", "zapatillas-baloncesto-baratas"],
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
    relatedShoes: ["nike-gt-cut-4", "adidas-ae-3", "nike-precision-7", "ua-curry-13"],
    relatedSeoPages: ["zapatillas-baloncesto-baratas", "zapatillas-baloncesto-outdoor"],
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
    relatedShoes: ["nike-gt-cut-4", "adidas-ae-3", "ua-curry-13", "jordan-tatum-4"],
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
    relatedSeoPages: ["zapatillas-baloncesto-outdoor", "zapatillas-baloncesto-junior"],
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
