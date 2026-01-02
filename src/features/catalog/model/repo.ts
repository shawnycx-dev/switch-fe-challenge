import categoriesData from "@/data/categories.json";
import devicesData from "@/data/devices.json";
import { Product } from "@/entities/product/model/types";
import { Category } from "@/entities/category/model/types";

interface CatalogSnapshot {
  categories: Category[];
  products: Product[];
}

export async function getCatalogSnapshot(): Promise<CatalogSnapshot> {
  // Swap for real catalog api call in a real application

  return {
    categories: categoriesData as Category[],
    products: devicesData as Product[],
  };
}
