/* FLORSIMINTEX · service worker — funcționează offline (util în zone fără semnal).
   Precache esențialul; restul cache-first cu reîmprospătare în fundal. */
const CACHE = 'flx-v4';
const CORE = [
  './',
  'index.html',
  'css/base.css',
  'css/components.css',
  'css/theme-industrial.css',
  'js/app.js',
  'manifest.webmanifest',
  'assets/fonts/anton-latin.woff2',
  'assets/fonts/pjs-400-latin.woff2',
  'assets/fonts/pjs-700-latin.woff2',
  'assets/images/hero-tractare-800.avif',
  'assets/images/hero-tractare-1600.avif'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      Promise.allSettled(CORE.map((u) => c.add(u)))
    ).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // navigări: network-first, fallback la pagina cache-uită (offline)
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).catch(() => caches.match('index.html') || caches.match('./'))
    );
    return;
  }

  // doar same-origin: cache-first + revalidare în fundal
  if (url.origin !== location.origin) return;
  e.respondWith(
    caches.match(req).then((hit) => {
      const net = fetch(req).then((res) => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy));
        }
        return res;
      }).catch(() => hit);
      return hit || net;
    })
  );
});
