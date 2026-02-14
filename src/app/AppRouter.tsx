import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "@/pages/auth/ui/Auth";
import { Product } from "@/pages/product/ui/Product";
import { Products } from "@/pages/products/ui/Products";
import { routes } from "@/shared/routes";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.root}
          element={<Navigate to={routes.products} replace />}
        />
        <Route path={routes.auth} element={<Auth />} />
        <Route path={routes.products} element={<Products />} />
        <Route path={routes.product} element={<Product />} />
        <Route path={routes.notFound} element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
