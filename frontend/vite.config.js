import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jsconfigPaths from "vite-jsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    proxy: {
      // All requests starting with /api will be forwarded to backend
      // protect from CORS error
      // It tells Vite:
      // “Whenever the frontend makes a request to something starting with /api, forward it to my backend at port 5000.”
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
