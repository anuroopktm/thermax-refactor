import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig, loadEnv } from "vite"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      allowedHosts: [
        "shgzb-103-141-54-142.run.pinggy-free.link",
        "gpamp-103-141-54-142.run.pinggy-free.link",
      ],
      proxy: {
        "/api": {
          target: env.VITE_API_AI_STUDIO_URL,
          changeOrigin: true,
          secure: false,
          headers: {
            "x-pinggy-no-warning": "true",
            "User-Agent": "curl/7.64.1",
          },
        },
        "/tbwes-api": {
          target: env.VITE_API_TBWES_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/tbwes-api/, ""),
          headers: {
            "x-pinggy-no-warning": "true",
            "User-Agent": "curl/7.64.1",
          },
        },
      },
    },
  };
});