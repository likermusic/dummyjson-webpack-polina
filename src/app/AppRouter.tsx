import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { Auth } from "@/pages/auth";
import { Product } from "@/pages/product";
import { Products } from "@/pages/products";
import type { RootState } from "@/app/store";
import { routes } from "@/shared/routes";

function ProtectedRoute() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);
  if (!isAuth) {
    return <Navigate to={routes.auth} replace />;
  }

  return <Outlet />;
}

export function AppRouter() {
  const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

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
            isAuth ? <Navigate to={routes.products} replace /> : <Auth />
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
