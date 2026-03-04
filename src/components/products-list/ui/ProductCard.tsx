import { Link } from "react-router-dom";

import { formatPrice } from "@/shared/lib/formatPrice";
import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <Link className="block h-full" to={`${product.id}`}>
        <img
          className="h-44 w-full bg-slate-100 object-cover"
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
        />
        <div className="space-y-2 p-4">
          <div className="flex items-start justify-between gap-2">
            <h2 className="line-clamp-1 text-lg font-semibold text-slate-900">
              {product.title}
            </h2>
            <span className="shrink-0 text-sm font-bold text-emerald-700">
              {formatPrice(product.price)}
            </span>
          </div>
          <p className="line-clamp-2 text-sm text-slate-600">
            {product.description}
          </p>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="rounded-full bg-slate-100 px-2 py-1">
              {product.category}
            </span>
            <span>Rating: {product.rating.toFixed(1)}</span>
          </div>
        </div>
      </Link>
    </article>
  );
}
