import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default () => {
  const env = loadEnv("all", process.cwd());
  const port = env.VITE_PORT;

  return defineConfig({
    plugins: [
      react(),
      VitePWA({
        registerType: "autoUpdate",
        manifest: {
          name: "Agro Zakup KZ",
          short_name: "AgroZakupKZ",
          description:
            "Заказывайте свежие и качественные продукты прямо от фермеров. Натуральные продукты питания с быстрой доставкой к вашей двери.",
          theme_color: "#ffffff",
          icons: [
            {
              src: "/images/android-chrome-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "/images/android-chrome-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src/"),
        "@api": path.resolve(__dirname, "src/api/"),
        "@UI": path.resolve(__dirname, "src/main/UI/"),
        "@Providers": path.resolve(__dirname, "src/main/Providers/"),
        "@Screens": path.resolve(__dirname, "src/main/Screens/"),
        "@Components": path.resolve(__dirname, "src/main/Components/"),
        "@Modules": path.resolve(__dirname, "src/main/Modules/"),
        "@constants": path.resolve(__dirname, "src/constants/"),
        "@Assets": path.resolve(__dirname, "src/assets/"),
        "@hooks": path.resolve(__dirname, "src/hooks/"),
        "@store": path.resolve(__dirname, "src/store/"),
        "@utils": path.resolve(__dirname, "src/utils/"),
        "@services": path.resolve(__dirname, "src/services/"),
        "@enums": path.resolve(__dirname, "src/enums/"),
        "@interfaces": path.resolve(__dirname, "src/interfaces/"),
        "@types": path.resolve(__dirname, "src/types/"),
        "@Pages": path.resolve(__dirname, "src/main/Pages/"),
      },
    },
    build: {
      outDir: "build",
      minify: "terser",
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "axios"],
            ui: ["@nextui-org/react"],
          },
        },
      },
    },
    server: {
      port: parseInt(port),
    },
  });
};
