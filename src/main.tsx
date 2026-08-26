import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WRytmieApp } from "@/components/w-rytmie/app";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WRytmieApp />
  </StrictMode>,
);
