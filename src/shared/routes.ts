export const routes = {
  root: "/",
  auth: "/auth",
  products: "/products",
  product: "/products/:id",
  notFound: "*",
} as const;

export const getProductRoute = (id: string | number) =>
  `${routes.products}/${id}`;
