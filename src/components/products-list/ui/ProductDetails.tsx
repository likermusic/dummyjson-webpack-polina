import { Link } from "react-router-dom";

import { formatPrice } from "@/shared/lib/formatPrice";
import { routes } from "@/shared/routes";
import { Spinner } from "@/shared/ui/Spinner";
import { useProduct } from "../model/useProduct";

type ProductDetailsProps = {
  id: string | undefined;
};

export function ProductDetails({ id }: ProductDetailsProps) {
  const { product, isLoading, error } = useProduct(id);

  if (error) {
    return (
      <main className="mx-auto max-w-5xl">
        <Link
          className="mb-6 inline-flex text-sm font-medium text-emerald-700 hover:text-emerald-800"
          to={routes.products}
        >
          Back to all products
        </Link>
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-rose-900">
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (isLoading || !product) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Spinner size="sm" />
          <span>Loading product...</span>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl">
      <Link
        className="mb-6 inline-flex text-sm font-medium text-emerald-700 hover:text-emerald-800"
        to={routes.products}
      >
        Back to all products
      </Link>

      <article className="grid gap-8 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[minmax(0,420px)_1fr]">
        <img
          className="aspect-square w-full rounded-xl bg-slate-100 object-contain"
          src={product.thumbnail}
          alt={product.title}
        />

        <div className="flex flex-col justify-center">
          <span className="mb-3 w-fit rounded-full bg-slate-100 px-3 py-1 text-xs font-medium uppercase text-slate-500">
            {product.category}
          </span>
          <h1 className="text-3xl font-bold text-slate-950">
            {product.title}
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            {product.description}
          </p>

          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium uppercase text-slate-500">
                Price
              </dt>
              <dd className="mt-1 text-xl font-bold text-emerald-700">
                {formatPrice(product.price)}
              </dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium uppercase text-slate-500">
                Rating
              </dt>
              <dd className="mt-1 text-xl font-bold text-slate-950">
                {product.rating.toFixed(1)}
              </dd>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <dt className="text-xs font-medium uppercase text-slate-500">
                Stock
              </dt>
              <dd className="mt-1 text-xl font-bold text-slate-950">
                {product.stock}
              </dd>
            </div>
          </dl>
        </div>
      </article>
    </main>
  );
}
