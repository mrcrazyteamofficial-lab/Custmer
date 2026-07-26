self.addEventListener('install', (e) => {
  self.skipWaiting();
});
self.addEventListener('activate', (e) => {
  e.waitUntil(clients.claim());
});
self.addEventListener('push', (e) => {
  let data = { title: 'MrCrazy Customer', body: 'New notification from admin' };
  try {
    if (e.data) data = e.data.json();
  } catch (err) {
    try { data.body = e.data.text(); } catch(e2) {}
  }
  e.waitUntil(
    self.registration.showNotification(data.title || 'MrCrazy', {
      body: data.body || '',
      icon: 'https://via.placeholder.com/192/12877f/ffffff?text=MC',
      badge: 'https://via.placeholder.com/96/12877f/ffffff?text=MC',
      vibrate: [120, 60, 120],
      data: data.data || {},
      requireInteraction: false,
      tag: 'mrcrazy-' + Date.now()
    })
  );
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow('./index.html');
    })
  );
});
