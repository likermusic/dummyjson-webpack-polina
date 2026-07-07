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
                type: "Product" as const,
                id,
              })),
              { type: "Product", id: "LIST" },
            ]
          : [{ type: "Product", id: "LIST" }],
    }),
    getProduct: builder.query<Product, number>({
      query: (id) => `/products/${id}`,
      providesTags: (_, __, id) => [{ type: "Product", id }],
    }),
  }),
});

export const { useGetProductQuery, useGetProductsQuery } = productsApi;
