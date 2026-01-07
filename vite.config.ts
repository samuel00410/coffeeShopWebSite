import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  // 設定 base 路徑，請將 'coffeeShopWebsite' 改成你的 GitHub repo 名稱
  // 如果是部署到 username.github.io（主頁），則設為 '/'
  base: "/coffeeShopWebSite/",
  plugins: [vue(), tailwindcss()],
});
