import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch } from "@/app/store";
import {
  fetchProductById,
  selectSelectedProduct,
  selectSelectedProductError,
  selectSelectedProductStatus,
} from "./productsSlice";

export function useProduct(id: string | undefined) {
  const dispatch = useDispatch<AppDispatch>();
  const product = useSelector(selectSelectedProduct);
  const status = useSelector(selectSelectedProductStatus);
  const error = useSelector(selectSelectedProductError);
  const productId = Number(id);
  const isValidProductId = Number.isInteger(productId) && productId > 0;

  useEffect(() => {
    if (isValidProductId && product?.id !== productId) {
      void dispatch(fetchProductById(productId));
    }
  }, [dispatch, isValidProductId, product?.id, productId]);

  return {
    product,
    isLoading: status === "loading" || status === "idle",
    error: isValidProductId
      ? error
      : "Invalid product id. Please go back to the products list.",
  };
}
