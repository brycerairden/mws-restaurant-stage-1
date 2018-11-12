console.log('Service Worker Active, no need for additional pylons');

let staticCacheName = 'restaurant-list-v1';
const cachedItems = [
  '/',
  '/index.html',
  '/restaurant.html',
  '/css/styles.css',
  '/js/dbhelper.js',
  '/js/restaurant_info.js',
  '/data/restaurants.json',
  '/img/1.jpg',
  '/img/2.jpg',
  '/img/3.jpg',
  '/img/4.jpg',
  '/img/5.jpg',
  '/img/6.jpg',
  '/img/7.jpg',
  '/img/8.jpg',
  '/img/9.jpg',
  '/img/10.jpg'
];

self.addEventListener('install', function(event) {
  event.waitUntil(
	caches.open(staticCacheName)
	.then(function(cache) {
	  return cache.addAll(cachedItems);
	})
	.then(self.skipWaiting())
  );
});

self.addEventListener("activate", function(event) {
  event.waitUntil(
	caches.keys().then(function(cacheName){
	  Promise.all(cacheName.map(function(cache) {
		if (cache !== staticCacheName) {
		  console.log("Removing files from", cache);
		  return caches.delete(cache);
		}
	  }))
	})
  )
})

self.addEventListener('fetch', function(event){
  event.respondWith(
	caches.match(event.request).then(function(response) {
	  if(response) {
		return response;
	  } else {
		console.log('No cache')
		return fetch(event.request)
	  }
	})
  );
});