import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Paint from "./views/Paint/Paint.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Paint />
  </StrictMode>
);
