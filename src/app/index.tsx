import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { AppRouter } from "@/app/AppRouter";
import { store } from "@/app/store";
import "@/app/style.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root element '#root' was not found");
}

createRoot(root).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
);
