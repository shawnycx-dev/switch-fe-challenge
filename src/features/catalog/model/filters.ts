import { Product } from "@/entities/product/model/types";

export function filterProductsByCategory(
  products: Product[],
  category?: string
) {
  if (!category) return products;

  const filteredProducts = [...products].filter(
    (p) => p.category.name.toLowerCase() === category.toLowerCase()
  );

  return filteredProducts;
}
