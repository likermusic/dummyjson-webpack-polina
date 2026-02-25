import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";

import { Auth } from "@/pages/auth";
import { Product } from "@/pages/product";
import { Products } from "@/pages/products";
import { store } from "@/app/store";
import { getMe } from "@/components/auth-form/api/authApi";
import { routes } from "@/shared/routes";
import { AppLayout } from "@/shared/layouts/AppLayout";
import { PageLayout } from "@/shared/layouts/PageLayout";

const protectedLoader = async () => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    return;
  }

  try {
    await getMe();
    return;
  } catch {
    return redirect(routes.auth);
  }
};

const authLoader = async () => {
  const accessToken = store.getState().auth.accessToken;
  if (accessToken) {
    return redirect(routes.products);
  }

  try {
    await getMe();
    return redirect(routes.products);
  } catch {
    return null;
  }
};

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: routes.root,
        element: <Navigate to={routes.products} replace />,
      },
      {
        path: routes.auth,
        element: <Auth />,
        loader: authLoader,
      },
      {
        element: <PageLayout />,
        loader: protectedLoader,
        children: [
          { path: routes.products, element: <Products /> },
          { path: routes.product, element: <Product /> },
        ],
      },
      { path: routes.notFound, element: <h1>404 Not Found</h1> },
    ],
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
