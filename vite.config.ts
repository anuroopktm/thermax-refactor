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
        "byfzo-103-141-54-142.run.pinggy-free.link",
        "toamc-103-141-54-142.run.pinggy-free.link",
        "rfozy-103-141-54-142.run.pinggy-free.link",
        "egdbu-103-141-54-142.run.pinggy-free.link"
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
        "/heating-api": {
          target: env.VITE_API_HEATING_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/heating-api/, "/api3"),
          headers: {
            "x-pinggy-no-warning": "true",
            "User-Agent": "curl/7.64.1",
          },
        },
        "/transmitter-api": {
          target: env.VITE_API_TRANSMITTER_OCR_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(/^\/transmitter-api/, "/api/transmitter_ocr"),
          headers: {
            "x-pinggy-no-warning": "true",
            "User-Agent": "curl/7.64.1",
          },
        },
      },
    },
  };
});