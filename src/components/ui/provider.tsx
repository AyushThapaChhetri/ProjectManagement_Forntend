// import { ChakraProvider } from "@chakra-ui/react";
// // import { ThemeProvider } from "next-themes";
// import system from "../../theme/theme";

// export function Provider({ children }: { children: React.ReactNode }) {
//   return (
//     <ChakraProvider value={system}>
//       {/* <ThemeProvider attribute="class" enableSystem={true}> */}
//       {children}
//       {/* </ThemeProvider> */}
//     </ChakraProvider>
//   );
// }

// "use client";

// import { ColorModeProvider } from "@/components/ui/color-mode";
// import { ChakraProvider, defaultSystem } from "@chakra-ui/react";

// export function Provider(props) {
//   return (
//     <ChakraProvider value={defaultSystem}>
//       <ColorModeProvider {...props} />
//     </ChakraProvider>
//   );
// }

// import { ChakraProvider } from "@chakra-ui/react";
// import { system } from "@chakra-ui/react/preset";
// import { ThemeProvider } from "next-themes";

// export function Provider({ children }: { children: React.ReactNode }) {
//   return (
//     <ChakraProvider value={system}>
//       <ThemeProvider attribute="class">{children}</ThemeProvider>
//     </ChakraProvider>
//   );
// }
"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
// import { system } from "@chakra-ui/react/preset";
import { system } from "@/theme/theme";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider value={system}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem={false}
      >
        {children}
      </ThemeProvider>
    </ChakraProvider>
  );
}
