import { useProducts } from "../model/useProducts";
import { ProductCard } from "./ProductCard";
import { Spinner } from "@/shared/ui/Spinner";

export function ProductsList() {
  const { products, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Spinner size="sm" />
          <span>Loading products...</span>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <h1 className="mb-4 text-2xl font-bold text-slate-900">Products</h1>
        <div className="max-w-md rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-900">
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main>
      <h1 className="mb-4 text-2xl font-bold text-slate-900">Products</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
