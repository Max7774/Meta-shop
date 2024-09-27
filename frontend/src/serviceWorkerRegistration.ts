export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => {
          console.log(
            "Service Worker зарегистрирован с областью:",
            registration.scope
          );
        })
        .catch((error) => {
          console.error("Ошибка при регистрации Service Worker:", error);
        });
    });
  }
}

export function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready
      .then((registration: ServiceWorkerRegistration) => {
        registration.unregister();
      })
      .catch((error: Error) => {
        console.error("Ошибка при отмене регистрации Service Worker:", error);
      });
  }
}
