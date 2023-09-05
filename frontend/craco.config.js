const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@api": path.resolve(__dirname, "src/api/"),
      "@UI": path.resolve(__dirname, "src/Components/UI/"),
      "@Pages": path.resolve(__dirname, "src/Components/Pages/"),
      "@Providers": path.resolve(__dirname, "src/Components/Providers/"),
      "@constants": path.resolve(__dirname, "src/constants/"),
      "@hooks": path.resolve(__dirname, "src/hooks/"),
      "@types": path.resolve(__dirname, "src/types/"),
      "@store": path.resolve(__dirname, "src/store/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      "@services": path.resolve(__dirname, "src/services/"),
      "@interfaces": path.resolve(__dirname, "src/interfaces/"),
    },
  },
};
