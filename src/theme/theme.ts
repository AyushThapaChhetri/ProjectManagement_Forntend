import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    breakpoints: {
      mobileSm: "320px", // Small mobile
      mobile: "375px", // Mobile base
      mobileLg: "425px", // Large mobile

      tabletSm: "600px", // Small tablets (portrait)
      tablet: "768px", // Tablets (portrait)
      tabletLg: "992px", // Tablets (landscape)

      laptopSm: "1024px", // Small laptops
      desktop: "1200px", // Standard desktop
      wide: "1400px", // Wide screen
      ultra: "1600px", // Very large displays
      ultraHd: "1920px", // 1080p Full HD
      fourK: "2560px", // 4K
    },
    tokens: {
      colors: {
        // Add your custom colors (won't override defaults)
        primary: { value: "#3498db" },
        secondary: { value: "#2ecc71" },

        // Define base colors for light/dark modes
        white: { value: "#ffffff" },
        black: { value: "#1a202c" },
        gray: {
          800: { value: "#1a202c" },
        },
      },
      fonts: {
        italic: { value: "'Italianno', cursive" },
      },
      // Add other custom tokens (fonts, sizes etc) here
    },
    semanticTokens: {
      colors: {
        // Theme-aware colors
        background: {
          value: {
            default: "{colors.white}",
            _dark: "{colors.gray.800}",
          },
        },
        text: {
          value: {
            default: "{colors.black}",
            _dark: "{colors.white}",
          },
        },
        // Custom semantic tokens
        primary: {
          solid: { value: "{colors.primary.500}" },
          subtle: { value: "{colors.primary.100}" },
        },
      },
    },
  },
});

// Merge with default config
// export default createSystem(defaultConfig, customConfig);

export const system = createSystem(defaultConfig, customConfig);
