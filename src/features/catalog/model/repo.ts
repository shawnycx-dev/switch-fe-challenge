import categoriesData from "@/data/categories.json";
import devicesData from "@/data/devices.json";
import { DeviceJson, Product } from "@/entities/product/model/types";
import { Category } from "@/entities/category/model/types";

interface CatalogSnapshot {
  categories: Category[];
  products: Product[];
}

export async function getCatalogData(): Promise<CatalogSnapshot> {
  // Swap for real catalog api call in a real application
  const categories = categoriesData as Category[];

  const categoryMap = new Map(categories.map((c) => [c.id, c]));

  const products: Product[] = (devicesData as DeviceJson[]).map((d) => ({
    ...d,
    category: {
      id: d.category,
      name: categoryMap.get(d.category)!.name, // Making an assumption that the category will always be found
    },
  }));

  return {
    categories,
    products,
  };
}
