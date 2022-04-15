/* eslint-disable prettier/prettier */
const cacheName = '::myServiceWorker';
const version = 'v0.0.1';
const cacheList = [];

self.addEventListener('install', function (event) {
  console.log('Hello world from the Service Worker 🤙');
});

// 네트워크 fetch 시
self.addEventListener('fetch', e => {
  // 응답을 수정한다
  e.respondWith(
    // 요청에 대한 응답을 캐싱한 적이 있는지 확인한다
    caches.match(e.request).then(r => {
      // 캐싱된 데이터가 있으면 그것을 반환한다
      if (r) {
        return r;
      }

      const fetchRequest = e.request.clone();

      // 캐싱된 데이터가 없으면 원래의 요청을 보낸다
      return fetch(fetchRequest).then(response => {
        if (!response) {
          return response;
        }

        const requestUrl = e.request.url || '';

        const responseToCache = response.clone();
        // POST 요청에 대한 응답이나 chrome extension에 대한 응답은 캐싱 불가능하다.
        if (!requestUrl.startsWith('chrome-extension') && e.request.method !== 'POST')
          // 캐싱 가능한 응답이면 캐시에 요청에 대한 응답을 저장한다.
          caches.open(version + cacheName).then(cache => {
            cache.put(e.request, responseToCache);
          });

        // 요청을 반환한다.
        return response;
      });
    }),
  );
});
