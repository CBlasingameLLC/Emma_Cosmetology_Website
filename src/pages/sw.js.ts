import type { APIRoute } from 'astro';
import emmaChair from '../assets/emma-chair.jpg';
import emmaPortrait from '../assets/emma-portrait.jpg';

export const prerender = true;

/**
 * Generated (not copied verbatim) so the offline shell list can reference
 * the real hashed asset URLs Astro emits for the hero/about photos, instead
 * of guessing filenames. Network-first for documents, cache-first (with
 * background refresh) for everything else — see design/README.md §PWA.
 */
export const GET: APIRoute = () => {
  const shell = JSON.stringify(['/', '/manifest.json', emmaChair.src, emmaPortrait.src, '/assets/icon-192.png', '/assets/icon-512.png']);

  const body = `const CACHE = 'bb-v1';
const SHELL = ${shell};

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL).catch(() => {})).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;

  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req).then((hit) => hit || caches.match('/')))
    );
    return;
  }

  e.respondWith(
    caches.match(req).then((hit) => hit || fetch(req).then((res) => {
      const copy = res.clone();
      caches.open(CACHE).then((c) => c.put(req, copy));
      return res;
    }).catch(() => hit))
  );
});
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/javascript; charset=utf-8' },
  });
};
