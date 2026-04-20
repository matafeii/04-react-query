import "modern-normalize";
import "./style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App/App";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const root = document.getElementById("app");

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
