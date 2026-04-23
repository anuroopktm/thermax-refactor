import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { BrowserRouter } from "react-router-dom";
import SignInPage from "./pages/sign-in/pages.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <SignInPage />
    </BrowserRouter>
  </StrictMode>,
);
