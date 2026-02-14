import { routes } from "@/shared/routes";
import { Link } from "react-router-dom";

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
            <Link to={`${product.id}`}>{product.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
