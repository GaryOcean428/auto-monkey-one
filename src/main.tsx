import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import { TempoDevtools } from "tempo-devtools";
import { registerCleanup } from "./lib/cleanup";

// Initialize Tempo devtools after DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  TempoDevtools.init();
  registerCleanup();
});

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
