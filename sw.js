
const CACHE = 'db-pads-v1';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.webmanifest',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './assets/logo-256.png'
];

self.addEventListener('install', (e)=>{
  e.waitUntil(caches.open(CACHE).then(c=> c.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', (e)=>{
  e.waitUntil(caches.keys().then(keys=> Promise.all(keys.filter(k=>k!==CACHE).map(k=> caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener('fetch', (e)=>{
  const url = new URL(e.request.url);
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then(res => res || fetch(e.request).then(resp => {
        // Cache new GET requests
        if (e.request.method === 'GET') {
          const copy = resp.clone();
          caches.open(CACHE).then(c=> c.put(e.request, copy)).catch(()=>{});
        }
        return resp;
      }).catch(()=> caches.match('./')))
    );
  }
});
