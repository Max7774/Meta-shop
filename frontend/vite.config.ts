import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default () => {
  const env = loadEnv("all", process.cwd());
  const port = env.VITE_PORT;

  return defineConfig({
    plugins: [react()],
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
    server: {
      port: parseInt(port),
    },
  });
};
