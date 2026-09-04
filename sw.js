/* Network-first for the app shell — phones/PWA always fetch fresh index.html */
const BUILD = "2026.08.24.2";

self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isAppShell =
    req.mode === "navigate" ||
    url.pathname.endsWith(".html") ||
    url.pathname.endsWith("/") ||
    /\/index\.html?$/.test(url.pathname);

  if (!isAppShell) return;

  event.respondWith(
    fetch(req).catch(() => caches.match(req))
  );
});
