import { useGetProductsQuery } from "../api/productsApi";

export function useProducts() {
  const { data, isLoading, isFetching, error } = useGetProductsQuery();

  return {
    products: data?.products ?? [],
    isLoading: isLoading || isFetching,
    error: error ? "Failed to load products. Please try again." : null,
  };
}
