"use client";

import type { Product } from "@/types/edp";

type CompareProductsSectionProps = {
  comparedProducts: Product[];
  onRemoveFromComparedProductList: (productId: string) => void;
};

const formatValue = (value: string | number | null | undefined) =>
  value === null || value === undefined || value === "" ? "-" : value;

const fields: Array<{
  key: keyof Product | "gwp_total";
  label: string;
}> = [
  { key: "manufacturer", label: "Manufacturer" },
  { key: "product_name", label: "Product name" },
  { key: "manufacturing_location", label: "Manufacturing location" },
  { key: "compressive_strength_mpa", label: "Compressive strength (MPa)" },
  { key: "gwp_total", label: "GWP A1" },
  { key: "gwp_total", label: "GWP A2" },
  { key: "gwp_total", label: "GWP A3" },
  { key: "gwp_total", label: "GWP A1-A3" },
  { key: "gwp_total", label: "GWP A4" },
  { key: "gwp_total", label: "GWP A5" },
  { key: "gwp_total", label: "GWP B1" },
  { key: "gwp_total", label: "GWP B2" },
  { key: "gwp_total", label: "GWP B3" },
  { key: "gwp_total", label: "GWP B4" },
  { key: "gwp_total", label: "GWP B5" },
  { key: "gwp_total", label: "GWP B6" },
  { key: "gwp_total", label: "GWP B7" },
  { key: "gwp_total", label: "GWP C1" },
  { key: "gwp_total", label: "GWP C2" },
  { key: "gwp_total", label: "GWP C3" },
  { key: "gwp_total", label: "GWP C4" },
  { key: "gwp_total", label: "GWP D" },
];

export default function CompareProductsSection({
  comparedProducts,
  onRemoveFromComparedProductList,
}: CompareProductsSectionProps) {
  if (comparedProducts.length === 0) {
    return (
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-xl font-semibold">Compared products</h2>
        <div className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">No product selected.</div>
      </section>
    );
  }

  const gridTemplateColumns = `220px repeat(${comparedProducts.length}, minmax(220px, 1fr))`;

  return (
    <section className="overflow-x-auto rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <h2 className="text-xl font-semibold">Compared products</h2>
      <div className="mt-6 min-w-max">
        <div
          className="grid border border-b-0 border-zinc-200 text-left text-sm dark:border-zinc-800"
          style={{ gridTemplateColumns }}
        >
          <div className="bg-zinc-50 p-3 font-semibold dark:bg-zinc-900">Field</div>
          {comparedProducts.map((product) => (
            <div
              key={product.id}
              className="border-l border-zinc-200 p-3 font-semibold dark:border-zinc-800"
            >
              {formatValue(product.product_name)}
            </div>
          ))}
        </div>

        {fields.map((field, index) => (
          <div
            key={`${field.label}-${index}`}
            className="grid border-x border-b border-zinc-200 dark:border-zinc-800"
            style={{ gridTemplateColumns }}
          >
            <div className="bg-zinc-50 p-3 font-semibold dark:bg-zinc-900">{field.label}</div>
            {comparedProducts.map((product) => {
              const value =
                field.label === "GWP A1"
                  ? product.gwp_total.A1
                  : field.label === "GWP A2"
                  ? product.gwp_total.A2
                  : field.label === "GWP A3"
                  ? product.gwp_total.A3
                  : field.label === "GWP A1-A3"
                  ? product.gwp_total.A1_A3
                  : field.label === "GWP A4"
                  ? product.gwp_total.A4
                  : field.label === "GWP A5"
                  ? product.gwp_total.A5
                  : field.label === "GWP B1"
                  ? product.gwp_total.B1
                  : field.label === "GWP B2"
                  ? product.gwp_total.B2
                  : field.label === "GWP B3"
                  ? product.gwp_total.B3
                  : field.label === "GWP B4"
                  ? product.gwp_total.B4
                  : field.label === "GWP B5"
                  ? product.gwp_total.B5
                  : field.label === "GWP B6"
                  ? product.gwp_total.B6
                  : field.label === "GWP B7"
                  ? product.gwp_total.B7
                  : field.label === "GWP C1"
                  ? product.gwp_total.C1
                  : field.label === "GWP C2"
                  ? product.gwp_total.C2
                  : field.label === "GWP C3"
                  ? product.gwp_total.C3
                  : field.label === "GWP C4"
                  ? product.gwp_total.C4
                  : field.label === "GWP D"
                  ? product.gwp_total.D
                  : (product[field.key] as string | number | null | undefined);

              return (
                <div
                  key={`${product.id}-${field.key}-${index}`}
                  className="border-l border-zinc-200 p-3 dark:border-zinc-800"
                >
                  {formatValue(value)}
                </div>
              );
            })}
          </div>
        ))}

        <div
          className="grid border-x border-b border-zinc-200 dark:border-zinc-800"
          style={{ gridTemplateColumns }}
        >
          <div className="bg-zinc-50 p-3 font-semibold dark:bg-zinc-900">Actions</div>
          {comparedProducts.map((product) => (
            <div
              key={`${product.id}-actions`}
              className="border-l border-zinc-200 p-3 dark:border-zinc-800"
            >
              <button
                type="button"
                onClick={() => product.id && onRemoveFromComparedProductList(product.id)}
                className="rounded-full bg-slate-950 px-3 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
