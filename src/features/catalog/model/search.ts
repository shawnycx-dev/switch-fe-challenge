import type { Product } from "@/entities/product/model/types";

export function searchProducts(products: Product[], query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return products;

  return products.filter((p) => {
    if (!q) return true;
    return `${p.name} ${p.description}`.toLowerCase().includes(q);
  });
}
