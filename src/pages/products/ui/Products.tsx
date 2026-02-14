import { Link } from "react-router-dom";
import { getProductRoute } from "@/shared/routes";

const demoProducts = [
  { id: 1, title: "Laptop" },
  { id: 2, title: "Phone" },
  { id: 3, title: "Headphones" },
];

export function Products() {
  return (
    <main>
      <h1>Products</h1>
      <ul>
        {demoProducts.map((product) => (
          <li key={product.id}>
            <Link to={getProductRoute(product.id)}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
