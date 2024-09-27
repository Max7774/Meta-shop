const CACHE_NAME = "api-cache-v1";
const API_URLS = [
  "/login",
  "/register",
  "/phone-register",
  "/verify/",
  "/verify-token",
  "/login/access-token",
  "/reset-password",
  "/reset",
  "/users/all",
  "/products",
  "/products/by-slug/",
  "/products/by-category/",
  "/categories",
  // Добавь другие API эндпоинты по необходимости
];

// Функция для проверки, является ли запрос API
const isApiRequest = (url) => {
  return API_URLS.some((endpoint) => url.includes(endpoint));
};

self.addEventListener("install", (event) => {
  // Предварительное кэширование, если необходимо
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Можно добавить статические ресурсы для кэширования
      return cache.addAll([
        "/", // Главная страница
        "/index.html",
        // Другие статические файлы
      ]);
    })
  );
});

self.addEventListener("activate", (event) => {
  // Очистка старых кэшей, если версия изменилась
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  if (isApiRequest(url.pathname) && request.method === "GET") {
    event.respondWith(
      caches.open(CACHE_NAME).then(async (cache) => {
        try {
          const networkResponse = await fetch(request);
          // Кэшируем свежий ответ
          cache.put(request, networkResponse.clone());
          return networkResponse;
        } catch (error) {
          // В случае ошибки возвращаем кэшированный ответ, если он есть
          const cachedResponse = await cache.match(request);
          if (cachedResponse) {
            return cachedResponse;
          }
          // Можно вернуть fallback ответ или ошибку
          return new Response(
            JSON.stringify({
              error: "Network error and no cached data available.",
            }),
            {
              status: 503,
              headers: { "Content-Type": "application/json" },
            }
          );
        }
      })
    );
  } else {
    // Для остальных запросов используем стандартное поведение
    event.respondWith(
      caches.match(request).then((response) => {
        return response || fetch(request);
      })
    );
  }
});
