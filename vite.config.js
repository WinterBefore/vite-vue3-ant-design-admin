import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // 配置别名
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    paths: {
      "@/*": ["src/*"],
      "@typings/*": ["src/typings/*"],
      "@components/*": ["src/components/*"],
      "@style/*": ["src/style/*"],
      "@utils/*": ["src/utils/*"],
      "@router/*": ["src/router/*"],
      "@store/*": ["src/store/*"],
    },
  },
  server: {
    open: true, //启动项目自动弹出浏览器
    port: "3000",
    proxy: {
      "/api": {
        target: "http://localhost:8080/flower/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 不可以省略rewrite
      },
    },
  },
});
