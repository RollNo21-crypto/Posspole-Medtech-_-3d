// POSSPOLE MEDTECH Service Worker
// Advanced Caching Strategy for Killer SEO Performance

const CACHE_NAME = 'posspole-medtech-v1.0.0';
const STATIC_CACHE = 'posspole-static-v1';
const DYNAMIC_CACHE = 'posspole-dynamic-v1';
const IMAGE_CACHE = 'posspole-images-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/src/index.css',
  '/src/main.tsx',
  '/assets/posspole.png',
  '/assets/posspolelogbg.png',
  '/manifest.json',
  '/performance-optimization.js'
];

// Dynamic content patterns
const DYNAMIC_PATTERNS = [
  /\/api\//,
  /\/news\//,
  /\/blog\//
];

// Image patterns
const IMAGE_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/i
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('POSSPOLE MEDTECH SW: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then(cache => {
        console.log('POSSPOLE MEDTECH SW: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('POSSPOLE MEDTECH SW: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE) {
              console.log('POSSPOLE MEDTECH SW: Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Take control of all pages
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip external requests (except for fonts and analytics)
  if (url.origin !== location.origin && 
      !url.hostname.includes('fonts.googleapis.com') &&
      !url.hostname.includes('fonts.gstatic.com') &&
      !url.hostname.includes('googletagmanager.com')) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Main request handler with different strategies
async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Strategy 1: Cache First for static assets
    if (isStaticAsset(url.pathname)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Strategy 2: Stale While Revalidate for images
    if (isImage(url.pathname)) {
      return await staleWhileRevalidate(request, IMAGE_CACHE);
    }
    
    // Strategy 3: Network First for dynamic content
    if (isDynamicContent(url.pathname)) {
      return await networkFirst(request, DYNAMIC_CACHE);
    }
    
    // Strategy 4: Cache First for HTML pages
    if (isHTMLPage(request)) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Default: Network First
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('POSSPOLE MEDTECH SW: Request failed:', error);
    return await handleOffline(request);
  }
}

// Cache First Strategy
async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Update cache in background
    updateCacheInBackground(request, cache);
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Network First Strategy
async function networkFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  // Always try to update from network
  const networkResponsePromise = fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
  }).catch(() => null);
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Otherwise wait for network
  return await networkResponsePromise;
}

// Update cache in background
function updateCacheInBackground(request, cache) {
  fetch(request).then(response => {
    if (response.ok) {
      cache.put(request, response.clone());
    }
  }).catch(() => {
    // Silently fail background updates
  });
}

// Handle offline scenarios
async function handleOffline(request) {
  const url = new URL(request.url);
  
  // Try to find cached version in any cache
  const cacheNames = await caches.keys();
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
  }
  
  // Return offline page for HTML requests
  if (isHTMLPage(request)) {
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>POSSPOLE MEDTECH - Offline</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
          }
          .offline-container {
            max-width: 400px;
            padding: 2rem;
          }
          .logo {
            width: 100px;
            height: 100px;
            margin: 0 auto 2rem;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            color: #667eea;
            font-weight: bold;
          }
          h1 { margin: 0 0 1rem; }
          p { margin: 0 0 2rem; opacity: 0.9; }
          button {
            background: white;
            color: #667eea;
            border: none;
            padding: 1rem 2rem;
            border-radius: 50px;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.2s;
          }
          button:hover { transform: translateY(-2px); }
        </style>
      </head>
      <body>
        <div class="offline-container">
          <div class="logo">PM</div>
          <h1>POSSPOLE MEDTECH</h1>
          <p>You're currently offline. Please check your internet connection and try again.</p>
          <button onclick="window.location.reload()">Try Again</button>
        </div>
      </body>
      </html>
    `, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'no-cache'
      }
    });
  }
  
  // Return generic offline response
  return new Response('Offline', {
    status: 503,
    statusText: 'Service Unavailable'
  });
}

// Helper functions
function isStaticAsset(pathname) {
  return pathname.includes('/assets/') ||
         pathname.includes('/src/') ||
         pathname.endsWith('.css') ||
         pathname.endsWith('.js') ||
         pathname.endsWith('.json') ||
         pathname.endsWith('.xml') ||
         pathname.endsWith('.txt');
}

function isImage(pathname) {
  return IMAGE_PATTERNS.some(pattern => pattern.test(pathname));
}

function isDynamicContent(pathname) {
  return DYNAMIC_PATTERNS.some(pattern => pattern.test(pathname));
}

function isHTMLPage(request) {
  return request.headers.get('Accept')?.includes('text/html');
}

// Background sync for analytics
self.addEventListener('sync', event => {
  if (event.tag === 'analytics-sync') {
    event.waitUntil(syncAnalytics());
  }
});

// Sync analytics data when back online
async function syncAnalytics() {
  try {
    // Send any queued analytics data
    const analyticsData = await getStoredAnalytics();
    
    if (analyticsData.length > 0) {
      for (const data of analyticsData) {
        await fetch('/api/analytics', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      }
      
      // Clear stored data after successful sync
      await clearStoredAnalytics();
    }
  } catch (error) {
    console.error('POSSPOLE MEDTECH SW: Analytics sync failed:', error);
  }
}

// Helper functions for analytics storage
async function getStoredAnalytics() {
  // Implementation would depend on IndexedDB or other storage
  return [];
}

async function clearStoredAnalytics() {
  // Implementation would depend on IndexedDB or other storage
}

// Push notification handling
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const data = event.data.json();
  
  const options = {
    body: data.body || 'New update from POSSPOLE MEDTECH',
    icon: '/assets/posspole.png',
    badge: '/assets/posspole.png',
    tag: 'posspole-notification',
    data: data.url || '/',
    actions: [
      {
        action: 'open',
        title: 'Open',
        icon: '/assets/posspole.png'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification(
      data.title || 'POSSPOLE MEDTECH',
      options
    )
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    const url = event.notification.data || '/';
    
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

console.log('POSSPOLE MEDTECH Service Worker: Loaded successfully');