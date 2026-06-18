const CACHE_NAME = 'join-v2';
const urlsToCache = ['/'];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Elimina caches viejos (adomus-v1, join-v1, etc.)
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener('fetch', event => {
  const url = event.request.url;

  // No interceptar: videos, audio, API routes, Google Sheets, scripts externos
  if (
    /\.(mp4|webm|ogg|mp3|wav)(\?|$)/i.test(url) ||
    url.includes('/api/') ||
    url.includes('docs.google.com') ||
    url.includes('formspree.io') ||
    url.includes('script.google.com')
  ) {
    return; // deja pasar sin interceptar
  }

  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
