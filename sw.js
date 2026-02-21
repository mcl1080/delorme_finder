const CACHE_NAME = 'delorme-cache-v1';
const CORE_ASSETS = [
    './',
    './index.html',
    './manifest.json',
    './maps/states.json' 
];

// 1. INSTALL
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CORE_ASSETS))
            .then(() => self.skipWaiting())
    );
});

// 2. ACTIVATE
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        )).then(() => self.clients.claim())
    );
});

// 3. FETCH (Corrected Logic)
self.addEventListener('fetch', event => {
    // Only handle http/https requests (ignores chrome-extension schemes)
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then(cachedResponse => {
            
            // Create a network request to update the cache in the background
            const fetchPromise = fetch(event.request).then(networkResponse => {
                
                // Check if we received a valid response
                if (!networkResponse || networkResponse.status !== 200) {
                    return networkResponse;
                }

                // IMPORTANT: Clone the response IMMEDIATELY.
                // We need one copy for the browser (networkResponse)
                // and one copy for the cache (responseToCache).
                const responseToCache = networkResponse.clone();

                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, responseToCache);
                });

                return networkResponse;
            }).catch(err => {
                // Network failed. If we have a cached response, the code below handles it.
                // If we don't have a cached response, this request simply fails.
            });

            // Return the cached response immediately if we have it, 
            // otherwise wait for the network request to finish.
            return cachedResponse || fetchPromise;
        })
    );
});
