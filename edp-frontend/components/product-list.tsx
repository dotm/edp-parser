"use client";

import type { Product } from "@/types/edp";
import ProductListDetail from "./product-list-detail";

type ProductListProps = {
  products: Product[];
  onAddToComparedProductList: (product: Product) => void;
};

export default function ProductList({ products, onAddToComparedProductList }: ProductListProps) {
  if (products.length === 0) {
    return (
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-xl font-semibold">Product List</h2>
        <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">No products match the selected filters.</p>
      </section>
    );
  }

  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-xl font-semibold">Product List ({products.length})</h2>
      <div className="mt-6 space-y-6">
        {products.map((product) => (
          <ProductListDetail key={product.id} product={product} onAddToComparedProductList={() => onAddToComparedProductList(product)} />
        ))}
      </div>
    </section>
  );
}
