"use client";

import type { Product } from "@/types/edp";

type ProductListDetailProps = {
  product: Product;
  onAddToComparedProductList: () => void;
};

const formatValue = (value: string | number | null | undefined) =>
  value === null || value === undefined || value === "" ? "-" : value;

export default function ProductListDetail({ product, onAddToComparedProductList }: ProductListDetailProps) {
  const gwpStages = Object.entries(product.gwp_total).filter(
    ([, value]) => value !== null
  );

  return (
    <article className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
        <div className="space-y-3">
          <div>
            <div className="text-sm text-zinc-400">Manufacturer</div>
            <div className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{formatValue(product.manufacturer)}</div>
          </div>

          <div>
            <div className="text-sm text-zinc-400">Product name</div>
            <div className="text-base font-semibold text-zinc-950 dark:text-zinc-50">{formatValue(product.product_name)}</div>
          </div>

          <div>
            <div className="text-sm text-zinc-400">Manufacturing location</div>
            <div>{formatValue(product.manufacturing_location)}</div>
          </div>

          <div>
            <div className="text-sm text-zinc-400">Compressive strength (MPa)</div>
            <div>{formatValue(product.compressive_strength_mpa)}</div>
          </div>

          <div>
            <div className="text-sm text-zinc-400">GWP Total</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {gwpStages.map(([stage, value]) => (
                <span
                  key={stage}
                  className="rounded-full bg-zinc-200 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
                >
                  {stage.replaceAll("_", "-")}: {value}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-start justify-end sm:justify-center">
          <button
            type="button"
            className="rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
            onClick={onAddToComparedProductList}
          >
            Compare
          </button>
        </div>
      </div>
    </article>
  );
}
