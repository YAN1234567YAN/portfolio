'use strict';
const CACHE = 'xuhao-portfolio-20261010-polish-1';
const prefix = 'xuhao-portfolio-';
const scopeURL = new URL(self.registration.scope);
const isAsset = url => url.origin === scopeURL.origin && url.pathname.startsWith(scopeURL.pathname) && !url.pathname.includes('/documents/') && !url.pathname.includes('/demos/') && /\.(css|js|woff2|webp|png|svg)$/.test(url.pathname);
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil((async () => {
  const keys = await caches.keys();
  await Promise.all(keys.filter(key => key.startsWith(prefix) && key !== CACHE).map(key => caches.delete(key)));
  await self.clients.claim();
})()));
self.addEventListener('message', event => {
  if (event.data?.type !== 'CACHE_VISITED_ASSETS' || !Array.isArray(event.data.urls)) return;
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    // The first visit happens before this worker controls navigation.
    if (typeof event.data.page === 'string') {
      try {
        const page = new URL(event.data.page);
        const isPage = page.origin === scopeURL.origin && page.pathname.startsWith(scopeURL.pathname) && !page.pathname.includes('/demos/') && (/\.html$/.test(page.pathname) || page.pathname.endsWith('/'));
        if (isPage && !(await cache.match(page.href))) {
          const response = await fetch(page.href);
          if (response.ok) await cache.put(page.href, response);
        }
      } catch { /* The page remains available online. */ }
    }
    const urls = event.data.urls.slice(0, 40).filter(value => {
      try { return isAsset(new URL(value)); } catch { return false; }
    });
    // Keep background caching serial so it cannot compete with the next page.
    for (const url of urls) {
      if (!(await cache.match(url))) {
        try { const response = await fetch(url); if (response.ok) await cache.put(url, response); } catch { /* No offline copy yet. */ }
      }
    }
  })());
});
self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== scopeURL.origin || !url.pathname.startsWith(scopeURL.pathname)) return;
  if (isAsset(url)) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      const cached = await cache.match(request);
      if (cached) return cached;
      const response = await fetch(request);
      if (response.ok) await cache.put(request, response.clone());
      return response;
    })());
  } else if (request.mode === 'navigate' && !url.pathname.includes('/demos/')) {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE);
      try {
        const response = await fetch(request);
        if (response.ok) await cache.put(request, response.clone());
        return response;
      } catch (error) {
        const cached = await cache.match(request);
        if (cached) return cached;
        throw error;
      }
    })());
  }
});
