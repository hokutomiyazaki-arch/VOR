const CACHE_NAME = 'vor-training-v1';
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  'https://hokutomiyazaki-arch.github.io/VOR/FNT512.png',
  'https://hokutomiyazaki-arch.github.io/VOR/FNT_color2.png',
  'https://hokutomiyazaki-arch.github.io/VOR/1.png',
  'https://hokutomiyazaki-arch.github.io/VOR/2.png',
  'https://hokutomiyazaki-arch.github.io/VOR/3.png',
  'https://hokutomiyazaki-arch.github.io/VOR/4.png',
  'https://hokutomiyazaki-arch.github.io/VOR/5.png',
  'https://hokutomiyazaki-arch.github.io/VOR/6.png',
  'https://hokutomiyazaki-arch.github.io/VOR/7.png',
  'https://hokutomiyazaki-arch.github.io/VOR/8.png'
];

// インストール時にキャッシュ
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// フェッチ時にキャッシュから返す
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});

// 古いキャッシュの削除
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
