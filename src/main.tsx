import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Router } from "./router";
import { ToastContainer } from "react-toastify";
import axios from 'axios';

// Configurar axios para enviar cookies en todas las solicitudes
axios.defaults.withCredentials = true;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastContainer />
    <RouterProvider router={Router} />
  </StrictMode>
);
