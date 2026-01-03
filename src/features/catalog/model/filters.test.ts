import { describe, it, expect } from "vitest";
import devicesData from "@/data/devices.json";
import categoriesData from "@/data/categories.json";
import type { Product } from "@/entities/product/model/types";
import { searchProducts } from "./filters";

const products: Product[] = devicesData.map((d) => ({
  ...d,
  category: {
    id: d.category,
    name: categoriesData.find((c) => c.id === d.category)!.name,
  },
}));

describe("catalog filters", () => {
  it("matches name or description (case-insensitive)", () => {
    expect(searchProducts(products, "Lamp").map((p) => p.id)).toEqual([
      "item-013",
    ]);
    expect(searchProducts(products, "Tracker").map((p) => p.id)).toEqual([
      "item-015",
      "item-035",
    ]);
  });

  it("returns all when query is empty", () => {
    expect(searchProducts(products, "").length).toBe(devicesData.length);
    expect(searchProducts(products, "   ").length).toBe(devicesData.length);
  });
});
