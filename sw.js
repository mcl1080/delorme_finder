const CACHE_NAME = 'delorme-cache-v1';
const CORE_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './maps/states.json' 
];

// 1. INSTALL: Cache the "skeleton" of the app immediately
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// 2. ACTIVATE: Clean up old caches if you update version number
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        )).then(() => self.clients.claim())
    );
});

// 3. FETCH: The "Offline Strategy"
// Strategy: Stale-While-Revalidate
// Try to serve from cache first (fastest/offline). 
// Then try network to update the cache for next time.
self.addEventListener('fetch', event => {
    // Only handle http/https requests
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            // Even if we have it in cache, try to fetch a fresh version in background
            const fetchPromise = fetch(event.request).then(networkResponse => {
                // Save the fresh copy to cache
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, networkResponse.clone());
                });
                return networkResponse;
            }).catch(() => {
                // Network failed? That's fine, we return cachedResponse later.
            });

            // Return cached response immediately if available, else wait for network
            return cachedResponse || fetchPromise;
        })
    );
});
