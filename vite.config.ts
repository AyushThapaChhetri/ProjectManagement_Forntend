// // Importing Vite's defineConfig helper to enable type support and config definition
// import { defineConfig } from "vite";

// // Importing the React plugin for Vite to handle JSX, Fast Refresh, etc.
// import react from "@vitejs/plugin-react";

// // These are Node.js built-ins for working with file paths in ES Modules
// import { fileURLToPath } from "url"; // Converts import.meta.url to a file path
// import path from "path"; // Node.js utility for resolving and manipulating file paths

// // These two lines are needed because __dirname is not available in ES modules
// const __filename = fileURLToPath(import.meta.url); // Get the current file's full path
// const __dirname = path.dirname(__filename); // Get the directory name of the current file

// // Exporting the Vite configuration object
// export default defineConfig({
//   plugins: [react()], // Registering the React plugin for Vite
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"), // Creating a path alias: "@" maps to the "src" directory
//     },
//   },
// });

// Import Vite helpers
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Handle __dirname in ESM
import { fileURLToPath } from "url";
import path from "path";

// Simulate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export config using defineConfig
export default defineConfig(({ mode }) => {
  // Load env variables based on mode (e.g., development/production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
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
