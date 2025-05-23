self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('technducts-v1').then(cache =>
      cache.addAll(['/', '/manifest.json'])
    )
  )
})
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
  )
})