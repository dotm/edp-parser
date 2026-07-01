"use client";

import type { ChangeEvent } from "react";

type SortFilterSearchProps = {
  manufacturerSearch: string;
  onManufacturerSearchChange: (value: string) => void;
  productNameSearch: string;
  onProductNameSearchChange: (value: string) => void;
  manufacturingLocationSearch: string;
  onManufacturingLocationSearchChange: (value: string) => void;
  compressiveStrengthStartRange: string;
  onCompressiveStrengthStartRangeChange: (value: string) => void;
  compressiveStrengthEndRange: string;
  onCompressiveStrengthEndRangeChange: (value: string) => void;
};

export default function SortFilterSearch({
  manufacturerSearch,
  onManufacturerSearchChange,
  productNameSearch,
  onProductNameSearchChange,
  manufacturingLocationSearch,
  onManufacturingLocationSearchChange,
  compressiveStrengthStartRange,
  onCompressiveStrengthStartRangeChange,
  compressiveStrengthEndRange,
  onCompressiveStrengthEndRangeChange,
}: SortFilterSearchProps) {
  return (
    <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-xl font-semibold">Filter and search</h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <label className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <span>Manufacturer</span>
          <input
            type="text"
            value={manufacturerSearch}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onManufacturerSearchChange(event.target.value)
            }
            className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-800"
            placeholder="Search manufacturer"
          />
        </label>

        <label className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <span>Product name</span>
          <input
            type="text"
            value={productNameSearch}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onProductNameSearchChange(event.target.value)
            }
            className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-800"
            placeholder="Search product name"
          />
        </label>

        <label className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
          <span>Manufacturing location</span>
          <input
            type="text"
            value={manufacturingLocationSearch}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              onManufacturingLocationSearchChange(event.target.value)
            }
            className="w-full rounded-2xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-800"
            placeholder="Search manufacturing location"
          />
        </label>

        <div className="space-y-2">
          <span className="text-sm text-zinc-700 dark:text-zinc-300">
            Compressive strength (MPa)
          </span>

          <div className="grid grid-cols-[96px_auto_96px] items-center gap-2">
            <input
              type="number"
              value={compressiveStrengthStartRange}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onCompressiveStrengthStartRangeChange(event.target.value)
              }
              className="rounded-2xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-800"
              placeholder="Min"
            />

            <span className="text-center text-sm text-zinc-500 dark:text-zinc-400">
              to
            </span>

            <input
              type="number"
              value={compressiveStrengthEndRange}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onCompressiveStrengthEndRangeChange(event.target.value)
              }
              className="rounded-2xl border border-zinc-300 bg-zinc-50 px-3 py-2 text-sm text-zinc-900 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-200 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-200 dark:focus:ring-zinc-800"
              placeholder="Max"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
