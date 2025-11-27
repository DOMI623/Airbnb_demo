import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/router";
import AuthProvider from "./context/AuthContext"; // ← ahora sí existe
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);
