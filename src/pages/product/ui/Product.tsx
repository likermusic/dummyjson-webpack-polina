import { useParams } from "react-router-dom";

import { ProductDetails } from "@/components/products-list";

export function Product() {
  const { id } = useParams();

  return <ProductDetails id={id} />;
}
