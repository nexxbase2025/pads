
self.addEventListener('install', (e) => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  console.log('Service Worker activado');
  return self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  // Puedes añadir caché aquí si quieres
});
