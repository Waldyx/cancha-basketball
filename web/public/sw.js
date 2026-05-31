// CANCHA.ZAPA — Service Worker
// Estrategia: network-first para navegación (páginas siempre frescas, con
// fallback offline) y cache-first para assets estáticos (CSS/JS hasheados,
// imágenes, fuentes). Habilita la instalación PWA (Add to Home Screen).

const CACHE = "cz-cache-v1";
const PRECACHE = ["/", "/favicon.svg", "/manifest.json", "/offline.html"];

self.addEventListener("install", (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(PRECACHE)).catch(() => {})
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  // Dejar pasar peticiones cross-origin (Google Fonts, analytics, afiliados…)
  if (url.origin !== self.location.origin) return;

  // Navegación (páginas): network-first → siempre lo más nuevo, offline como respaldo
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((r) => r || caches.match("/offline.html") || caches.match("/")))
    );
    return;
  }

  // Assets estáticos: cache-first con actualización en segundo plano
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached);
      return cached || network;
    })
  );
});
