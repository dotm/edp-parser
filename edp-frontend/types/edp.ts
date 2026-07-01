export interface EpdExtraction {
  products: Product[];
}

export interface Product {
  id?: string;
  manufacturer: string | null;
  product_name: string | null;
  manufacturing_location: string | null;
  compressive_strength_mpa: number | null;
  gwp_total: GwpTotal;
}

export interface GwpTotal {
  A1: number | null;
  A2: number | null;
  A3: number | null;
  A1_A3: number | null;
  A4: number | null;
  A5: number | null;
  B1: number | null;
  B2: number | null;
  B3: number | null;
  B4: number | null;
  B5: number | null;
  B6: number | null;
  B7: number | null;
  C1: number | null;
  C2: number | null;
  C3: number | null;
  C4: number | null;
  D: number | null;
}