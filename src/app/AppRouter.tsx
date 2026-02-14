import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Auth } from "@/pages/auth/ui/Auth";
import { Product } from "@/pages/product/ui/Product";
import { Products } from "@/pages/products/ui/Products";
import { withAuth } from "@/shared/hoc/withAuth";
import { routes } from "@/shared/routes";
import { withAnalytics } from "@/shared/hoc/withAnalytics";

const ProtectedProducts = withAuth(Products);
const ProtectedProduct = withAuth(withAnalytics(Product));

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.root}
          element={<Navigate to={routes.products} replace />}
        />
        <Route path={routes.auth} element={<Auth />} />
        <Route path={routes.products} element={<ProtectedProducts />} />
        <Route path={routes.product} element={<ProtectedProduct />} />
        <Route path={routes.notFound} element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
