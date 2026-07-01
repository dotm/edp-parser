import fs from "fs";
import path from "path";
import HomePageClient from "@/components/homepage-client";
import type { Product } from "@/types/edp";

const dataDirectory = path.join(process.cwd(), "..", "data");

const parseProductsFromFile = (fileName: string): Product[] => {
  const filePath = path.join(dataDirectory, fileName);
  const rawFile = fs.readFileSync(filePath, "utf8");
  const parsed = JSON.parse(rawFile) as { products?: Product[] };

  return (parsed.products ?? []).map((product) => ({
    ...product,
    id: `${fileName}_${product.product_name ?? "unknown"}_${product.manufacturing_location ?? "unknown"}`,
  }));
};

export default function Home() {
  const productFiles = fs.existsSync(dataDirectory)
    ? fs.readdirSync(dataDirectory).filter((file) => file.toLowerCase().endsWith(".json"))
    : [];

  const initialProducts = productFiles.flatMap(parseProductsFromFile);

  return <HomePageClient initialProducts={initialProducts} />;
}
