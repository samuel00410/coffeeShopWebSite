import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 開發環境使用根路徑，生產環境使用 GitHub Pages 子路徑
  const base = mode === "production" ? "/coffeeShopWebSite/" : "/";

  return {
    base,
    plugins: [vue(), tailwindcss()],
  };
});
