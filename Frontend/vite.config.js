import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const url = env.VITE_API_URL;

  return {
    server: {
      proxy: {
        "/path": {
          target: "https://thinkandselectbackend.onrender.com",
          changeOrigin: true,
          rewrite: (p) => p.replace(/^\/path/, ""),
        },
      },
    },
    build: {
      outDir: "build",
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
