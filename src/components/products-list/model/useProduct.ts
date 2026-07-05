import { skipToken } from "@reduxjs/toolkit/query";

import { useGetProductQuery } from "../api/productsApi";

export function useProduct(id: string | undefined) {
  const productId = Number(id);
  const isValidProductId = Number.isInteger(productId) && productId > 0;
  const { data, isLoading, isFetching, error } = useGetProductQuery(
    isValidProductId ? productId : skipToken,
  );

  return {
    product: data ?? null,
    isLoading: isLoading || isFetching,
    error: isValidProductId
      ? error
        ? "Failed to load product. Please try again."
        : null
      : "Invalid product id. Please go back to the products list.",
  };
}
