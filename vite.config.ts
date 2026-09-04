import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => ({
  base: "/Portfolio/",

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          particles: [
            "@tsparticles/engine",
            "@tsparticles/react",
            "@tsparticles/slim",
          ],
          gsap: ["gsap"],
        },
      },
    },
  },
}));