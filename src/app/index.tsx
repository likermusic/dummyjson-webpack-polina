import { createRoot } from "react-dom/client";
import { AppRouter } from "@/app/AppRouter";
import "@/app/style.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element '#root' was not found");
}

createRoot(root).render(<AppRouter />);
