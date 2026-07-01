"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/types/edp";
import CompareProductsSection from "./compare-products-section";
import ProductList from "./product-list";
import SortFilterSearch from "./sort-filter-search";

type HomePageClientProps = {
  initialProducts: Product[];
};

const sortByName = (a: Product, b: Product) => {
  const nameA = a.product_name?.toLowerCase() ?? "";
  const nameB = b.product_name?.toLowerCase() ?? "";
  if (!nameA && !nameB) return 0;
  if (!nameA) return 1;
  if (!nameB) return -1;
  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
};

export default function HomePageClient({ initialProducts }: HomePageClientProps) {
  const [productList] = useState<Product[]>(initialProducts);
  const [comparedProductList, setComparedProductList] = useState<Product[]>([]);
  const [manufacturerSearch, setManufacturerSearch] = useState("");
  const [productNameSearch, setProductNameSearch] = useState("");
  const [manufacturingLocationSearch, setManufacturingLocationSearch] = useState("");
  const [compressiveStrengthStartRange, setCompressiveStrengthStartRange] = useState("");
  const [compressiveStrengthEndRange, setCompressiveStrengthEndRange] = useState("");

  const addToComparedProductList = (product: Product) => {
    if (!product.id) return;
    setComparedProductList((current) =>
      current.some((item) => item.id === product.id) ? current : [...current, product]
    );
  };

  const removeFromComparedProductList = (productId: string) => {
    setComparedProductList((current) => current.filter((item) => item.id !== productId));
  };

  const filteredProducts = useMemo(() => {
    const startValue = compressiveStrengthStartRange.trim();
    const endValue = compressiveStrengthEndRange.trim();
    const start = startValue === "" ? null : Number(startValue);
    const end = endValue === "" ? null : Number(endValue);

    return productList
      .filter((product) => {
        const manufacturer = product.manufacturer?.toLowerCase() ?? "";
        const productName = product.product_name?.toLowerCase() ?? "";
        const manufacturingLocation = product.manufacturing_location?.toLowerCase() ?? "";

        if (
          manufacturerSearch &&
          !manufacturer.includes(manufacturerSearch.toLowerCase())
        ) {
          return false;
        }

        if (
          productNameSearch &&
          !productName.includes(productNameSearch.toLowerCase())
        ) {
          return false;
        }

        if (
          manufacturingLocationSearch &&
          !manufacturingLocation.includes(manufacturingLocationSearch.toLowerCase())
        ) {
          return false;
        }

        if (start !== null) {
          if (
            product.compressive_strength_mpa === null ||
            product.compressive_strength_mpa < start
          ) {
            return false;
          }
        }

        if (end !== null) {
          if (product.compressive_strength_mpa === null || product.compressive_strength_mpa > end) {
            return false;
          }
        }

        return true;
      })
      .sort(sortByName);
  }, [
    productList,
    manufacturerSearch,
    productNameSearch,
    manufacturingLocationSearch,
    compressiveStrengthStartRange,
    compressiveStrengthEndRange,
  ]);

  return (
    <div className="min-h-screen bg-zinc-50 px-4 py-8 text-slate-900 dark:bg-black dark:text-zinc-50 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-8">
        <CompareProductsSection
          comparedProducts={comparedProductList}
          onRemoveFromComparedProductList={removeFromComparedProductList}
        />

        <SortFilterSearch
          manufacturerSearch={manufacturerSearch}
          onManufacturerSearchChange={setManufacturerSearch}
          productNameSearch={productNameSearch}
          onProductNameSearchChange={setProductNameSearch}
          manufacturingLocationSearch={manufacturingLocationSearch}
          onManufacturingLocationSearchChange={setManufacturingLocationSearch}
          compressiveStrengthStartRange={compressiveStrengthStartRange}
          onCompressiveStrengthStartRangeChange={setCompressiveStrengthStartRange}
          compressiveStrengthEndRange={compressiveStrengthEndRange}
          onCompressiveStrengthEndRangeChange={setCompressiveStrengthEndRange}
        />

        <ProductList products={filteredProducts} onAddToComparedProductList={addToComparedProductList} />
      </div>
    </div>
  );
}
