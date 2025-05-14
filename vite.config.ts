// Importing Vite's defineConfig helper to enable type support and config definition
import { defineConfig } from "vite";

// Importing the React plugin for Vite to handle JSX, Fast Refresh, etc.
import react from "@vitejs/plugin-react";

// These are Node.js built-ins for working with file paths in ES Modules
import { fileURLToPath } from "url"; // Converts import.meta.url to a file path
import path from "path"; // Node.js utility for resolving and manipulating file paths

// These two lines are needed because __dirname is not available in ES modules
const __filename = fileURLToPath(import.meta.url); // Get the current file's full path
const __dirname = path.dirname(__filename); // Get the directory name of the current file

// Exporting the Vite configuration object
export default defineConfig({
  plugins: [react()], // Registering the React plugin for Vite
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Creating a path alias: "@" maps to the "src" directory
    },
  },
});
