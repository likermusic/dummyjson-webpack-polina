import { api } from "@/shared/api/client";
import type { Product, ProductsResponse } from "../types";

type GetProductsParams = {
  limit?: number;
  skip?: number;
};

export const getProducts = async ({
  limit = 12,
  skip = 0,
}: GetProductsParams = {}) => {
  const response = await api.get<ProductsResponse>("/products", {
    params: { limit, skip },
  });

  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await api.get<Product>(`/products/${id}`);

  return response.data;
};
