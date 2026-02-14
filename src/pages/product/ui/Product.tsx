import { Link, useParams } from "react-router-dom";
import { routes } from "@/shared/routes";

export function Product() {
  const { id } = useParams();

  return (
    <main>
      <h1>Product Details</h1>
      <p>Product ID: {id}</p>
      <Link to={routes.products}>Back to all products</Link>
    </main>
  );
}
