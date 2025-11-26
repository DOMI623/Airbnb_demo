import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/router"; // Importa tu componente router

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppRouter />
  </React.StrictMode>
);
