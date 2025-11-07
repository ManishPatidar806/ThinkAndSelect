import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(() => {

  return {
    build: {
      outDir: "build",
    },
    
    plugins: [react()],
    server: {
        port: 8000, // Or any other desired port
      },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
