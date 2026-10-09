// 2C Security — service worker
// Caches the app shell (splash, icons) so the app opens instantly and can show
// its offline screen. The portal itself always loads live from Google.
// Bump VERSION whenever you change index.html or the icons.
const VERSION = 'v4';
const CACHE = '2c-security-' + VERSION;
const SHELL = [
  './',
  './index.html',
  './manifest.webmanifest',
  './logo.png',
  './icon-192.png',
  './icon-512.png',
  './maskable-192.png',
  './maskable-512.png',
  './apple-touch-icon.png',
  './favicon-32.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('2c-security-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return; // never touch Google traffic

  if (req.mode === 'navigate') {
    // Network first so updates show up; fall back to the cached shell offline.
    e.respondWith(
      fetch(req)
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put('./index.html', copy)); return res; })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Icons, manifest: cache first, refresh in the background.
  e.respondWith(
    caches.match(req).then(hit => {
      const net = fetch(req).then(res => { if (res.ok) caches.open(CACHE).then(c => c.put(req, res.clone())); return res; }).catch(() => hit);
      return hit || net;
    })
  );
});
