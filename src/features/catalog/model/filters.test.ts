import { describe, it, expect } from "vitest";
import devicesData from "@/data/devices.json";
import categoriesData from "@/data/categories.json";
import type { Product } from "@/entities/product/model/types";
import { filterProductsByCategory, searchProducts } from "./filters";

const products: Product[] = devicesData.map((d) => ({
  ...d,
  category: {
    id: d.category,
    name: categoriesData.find((c) => c.id === d.category)!.name,
  },
}));

describe("catalog filters", () => {
  it("matches name or description (case-insensitive) in search", () => {
    expect(searchProducts(products, "Lamp").map((p) => p.id)).toEqual([
      "item-013",
    ]);
    expect(searchProducts(products, "Tracker").map((p) => p.id)).toEqual([
      "item-015",
      "item-035",
    ]);
  });

  it("trims query and is case-insensitive", () => {
    const a = searchProducts(products, "lamp").map((p) => p.id);
    const b = searchProducts(products, "   LaMp   ").map((p) => p.id);
    expect(b).toEqual(a);
  });

  it("does not mutate the input array", () => {
    const original = [...products];
    searchProducts(products, "lamp");
    expect(products).toEqual(original);
  });

  it("matches when query appears in description (not just name)", () => {
    // Pick a product and search using a token from its description to avoid hardcoding IDs.
    const withDescription = products.find((p) => p.description?.trim().length);
    expect(withDescription).toBeTruthy();

    const token = withDescription!.description.trim().split(/\s+/)[0];
    const matches = searchProducts(products, token);
    expect(matches.some((p) => p.id === withDescription!.id)).toBe(true);
  });

  it("returns all when query is empty", () => {
    expect(searchProducts(products, "").length).toBe(devicesData.length);
    expect(searchProducts(products, "   ").length).toBe(devicesData.length);
  });

  it("filters by category", () => {
    expect(filterProductsByCategory(products, "Audio").length).toBe(22);
    expect(filterProductsByCategory(products, "Peripherals").length).toBe(22);
    expect(filterProductsByCategory(products, "Displays").length).toBe(14);
    expect(filterProductsByCategory(products, "Accessories").length).toBe(21);
    expect(filterProductsByCategory(products, "Gadgets").length).toBe(21);
  });

  it("returns all products when category is undefined or empty string", () => {
    // Note: current implementation treats only falsy values as 'no filter'
    expect(filterProductsByCategory(products, undefined)).toBe(products); // same reference
    expect(filterProductsByCategory(products, "")).toBe(products); // same reference
  });

  it("is case-insensitive when matching category name", () => {
    const a = filterProductsByCategory(products, "Audio").map((p) => p.id);
    const b = filterProductsByCategory(products, "aUdIo").map((p) => p.id);
    expect(b).toEqual(a);
  });

  it("returns an empty array when category does not exist", () => {
    expect(filterProductsByCategory(products, "__no_such_category__")).toEqual(
      []
    );
  });

  it("does not mutate the input array", () => {
    const original = [...products];
    filterProductsByCategory(products, "Audio");
    expect(products).toEqual(original);
  });
});
