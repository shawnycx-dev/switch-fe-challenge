import type { Product } from "@/entities/product/model/types";

const SORT_FIELDS = ["name", "price", "rating", "category"] as const;
const SORT_DIRECTIONS = ["asc", "desc"] as const;

// Parse sort param from URL (e.g., "name:asc" or "price:desc")
export function parseSortParam(sortParam: string): {
  field: (typeof SORT_FIELDS)[number];
  direction: (typeof SORT_DIRECTIONS)[number];
} | null {
  if (!sortParam.trim()) return null;

  const [field, direction] = sortParam.split(":");

  // Valid field guard
  if (!field || !SORT_FIELDS.includes(field as (typeof SORT_FIELDS)[number]))
    return null;

  return {
    field: field as (typeof SORT_FIELDS)[number],
    direction: (direction as (typeof SORT_DIRECTIONS)[number]) || "asc",
  };
}

export function sortProducts(products: Product[], sortParam: string) {
  const parsedSortParam = parseSortParam(sortParam);
  if (!parsedSortParam) return products;

  switch (parsedSortParam.field) {
    case "price":
    case "rating":
      return products.sort((a, b) =>
        parsedSortParam.direction === "asc"
          ? Number(a[parsedSortParam.field]) - Number(b[parsedSortParam.field])
          : Number(b[parsedSortParam.field]) - Number(a[parsedSortParam.field])
      );
    case "name":
      return products.sort((a, b) =>
        parsedSortParam.direction === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    case "category":
      return products.sort((a, b) =>
        parsedSortParam.direction === "asc"
          ? a.category.name.localeCompare(b.category.name)
          : b.category.name.localeCompare(a.category.name)
      );
    default:
      return products;
  }
}
