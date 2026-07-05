import { baseApi } from "@/shared/api/baseApi";
import type { Product, ProductsResponse } from "../types";

type GetProductsParams = {
  limit?: number;
  skip?: number;
};

export const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ProductsResponse, GetProductsParams | void>({
      query: (params) => ({
        url: "/products",
        params: {
          limit: params?.limit ?? 12,
          skip: params?.skip ?? 0,
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.products.map(({ id }) => ({
                type: "Products" as const,
                id,
              })),
              { type: "Products", id: "LIST" },
            ]
          : [{ type: "Products", id: "LIST" }],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_, __, id) => [{ type: "Products", id }],
    }),
  }),
});

export const { useGetProductQuery, useGetProductsQuery } = productsApi;
