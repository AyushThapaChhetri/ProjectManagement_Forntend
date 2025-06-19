import { StrictMode } from "react";

import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ToastContainer, Bounce } from "react-toastify";
import { Provider } from "./components/ui/provider.tsx";
import { BrowserRouter } from "react-router";
import AppProvider from "./provider/AppProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <BrowserRouter>
        <AppProvider>
          <App />
          {/* <Route path="/" element={<App />} /> */}
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </AppProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
