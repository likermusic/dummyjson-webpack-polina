import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/app/store";
import {
  fetchProducts,
  selectProducts,
  selectProductsError,
  selectProductsStatus,
} from "./productsSlice";

export function useProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector(selectProducts);
  const status = useSelector(selectProductsStatus);
  const error = useSelector(selectProductsError);

  useEffect(() => {
    if (status === "idle") {
      void dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return {
    products,
    isLoading: status === "loading",
    error,
  };
}
