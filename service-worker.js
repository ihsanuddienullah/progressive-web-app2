const CACHE_NAME = 'premierleague-v1';
const urlsToCache = [
  '/',
  '/club.html',
  '/index.html',
  '/manifest.json',
  '/nav.html',
  '/pages/about.html',
  '/pages/contact.html',
  '/pages/home.html',
  '/pages/saved.html',
  '/css/materialize.min.css',
  '/css/style.css',
  '/font/radikal.woff',
  '/img/256.png',
  '/img/384.png',
  '/img/512.png',
  '/img/bg.jpg',
  '/img/intro.png',
  '/img/logo.png',
  '/js/api.js',
  '/js/db.js',
  '/js/idb.js',
  '/js/materialize.min.js',
  '/js/nav.js',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.gstatic.com/s/materialicons/v54/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
];


self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    }),
  );
});

self.addEventListener('fetch', function (event) {
  let baseUrl = 'https://api.football-data.org/v2/';
  if (event.request.url.indexOf(baseUrl) > -1) {
    event.respondWith(
      caches.open(CACHE_NAME).then(function (cache) {
        return fetch(event.request).then(function (response) {
          cache.put(event.request.url, response.clone());
          return response;
        });
      }),
    );
  } else {
    event.respondWith(
      caches
        .match(event.request, {
          ignoreSearch: true,
        })
        .then(function (response) {
          return response || fetch(event.request);
        }),
    );
  }
});

self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log('ServiceWorker: cache ' + cacheName + ' dihapus');
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});

self.addEventListener('push', function (event) {
  var body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push message no payload';
  }
  var options = {
    body: body,
    icon: 'img/logo.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(self.registration.showNotification('Push Notification', options));
});
