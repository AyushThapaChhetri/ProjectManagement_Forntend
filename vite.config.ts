// Import Vite helpers
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Handle __dirname in ESM
import { fileURLToPath } from "url";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export config using defineConfig
export default defineConfig(({ mode }) => {
  // Load env variables based on mode (e.g., development/production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: true,
      port: 5173,
      strictPort: true,
      cors: true,
      proxy: {
        "/api": {
          target: env.VITE_API_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path,
        },
      },
    },
  };
});

// //vercel.json
// {
//   "rewrites": [
//     {
//       "source": "/(.*)",        //   This matches any path the user tries to access (like /about, /dashboard, etc.)
//       "destination": "/"        // This makes Vercel always serve your main index.html, allowing React Router (or any SPA) to handle the route in the browser.
//     }
//   ]
// }
