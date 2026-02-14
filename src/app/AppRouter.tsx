import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { Auth } from "@/pages/auth/ui/Auth";
import { Product } from "@/pages/product/ui/Product";
import { Products } from "@/pages/products/ui/Products";
import { isAuthenticated } from "@/shared/lib/auth";
import { routes } from "@/shared/routes";

function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to={routes.auth} replace />;
  }

  return <Outlet />;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={routes.root}
          element={<Navigate to={routes.products} replace />}
        />
        <Route
          path={routes.auth}
          element={
            isAuthenticated() ? (
              <Navigate to={routes.products} replace />
            ) : (
              <Auth />
            )
          }
        />
        <Route element={<ProtectedRoute />}>
          <Route path={routes.products} element={<Products />} />
          <Route path={routes.product} element={<Product />} />
        </Route>
        <Route path={routes.notFound} element={<h1>404 Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
