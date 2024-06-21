import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ToastProvider } from "./hooks/ToastMessage/ToastContext.tsx";
import ToastMessage from "./hooks/ToastMessage/ToastMessage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <ToastMessage />
      <App />
    </ToastProvider>
  </React.StrictMode>
);
