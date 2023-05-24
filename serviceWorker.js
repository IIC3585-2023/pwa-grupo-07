importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js'
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js'
);

const CACHE_NAME = 'version-1';

const firebaseConfig = {
  apiKey: 'AIzaSyDk8dFJAtLs14m9i-DaCW23SuhGlZz1X8I',
  authDomain: 'pwa-g07.firebaseapp.com',
  projectId: 'pwa-g07',
  storageBucket: 'pwa-g07.appspot.com',
  messagingSenderId: '412146753821',
  appId: '1:412146753821:web:7b9368976e416db82781f4',
  measurementId: 'G-CSDHV0SX4V',
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(messaging, (payload) => {
  const notificationOptions = {
    body: payload.data.body,
    icon: payload.data.icon,
  };
  return self.registration.showNotification(
    payload.data.title,
    notificationOptions
  );
});

const staticAssets = [
  './',
  './styles.css',
  './js/createTransaction.js',
  './js/createEvent.js',
  './js/home.js',
  './js/navbar.js',
  './js/materialize.js',
  './js/payments.js',
  './js/ui.js',
  './css/materialize.min.css',
  './css/overview.css',
  './css/styles.css',
  './img/app_iphone-01257beede6ace304f3f63c839669e18.png',
  './img/works_everywhere.jpg',
  './new_transaction.html',
  './new.html',
  './home.html',
  './navbar.html',
];

self.addEventListener('install', async (event) => {
  const cache = await caches.open(CACHE_NAME);
  cache.addAll(staticAssets);
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  if (url.origin === location.origin) {
    event.respondWith(cacheData(request));
  } else {
    event.respondWith(networkFirst(request));
  }
});

async function cacheData(request) {
  const cachedResponse = await caches.match(request);
  console.log(cachedResponse);
  return cachedResponse || fetch(request);
}

async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);

  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch (error) {
    return await cache.match(request, { ignoreVary: true });
  }
}
