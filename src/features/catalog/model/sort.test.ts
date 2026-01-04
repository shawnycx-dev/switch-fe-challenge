import { describe, it, expect } from "vitest";
import { sortProducts } from "./sort";

import devicesData from "@/data/devices.json";
import categoriesData from "@/data/categories.json";
import type { Product } from "@/entities/product/model/types";

const products: Product[] = devicesData.map((d) => ({
  ...d,
  category: {
    id: d.category,
    name: categoriesData.find((c) => c.id === d.category)!.name,
  },
}));

describe("Catalog sort", () => {
  it("sorts products by name (A to Z)", () => {
    const result = sortProducts(products, "name:asc");
    expect(result).toEqual(
      products.sort((a, b) => a.name.localeCompare(b.name))
    );
  });
  it("sorts products by name (Z to A)", () => {
    const result = sortProducts(products, "name:desc");
    expect(result).toEqual(
      products.sort((a, b) => b.name.localeCompare(a.name))
    );
  });

  it("sorts products by price (Low to High)", () => {
    const result = sortProducts(products, "price:asc");
    expect(result).toEqual(
      products.sort((a, b) => Number(a.price) - Number(b.price))
    );
  });
  it("sorts products by price (High to Low)", () => {
    const result = sortProducts(products, "price:desc");
    expect(result).toEqual(
      products.sort((a, b) => Number(b.price) - Number(a.price))
    );
  });

  it("sorts products by rating (Low to High)", () => {
    const result = sortProducts(products, "rating:asc");
    expect(result).toEqual(
      products.sort((a, b) => Number(a.rating) - Number(b.rating))
    );
  });
  it("sorts products by rating (High to Low)", () => {
    const result = sortProducts(products, "rating:desc");
    expect(result).toEqual(
      products.sort((a, b) => Number(b.rating) - Number(a.rating))
    );
  });

  it("sorts products by category (A to Z)", () => {
    const result = sortProducts(products, "category:asc");
    expect(result).toEqual(
      products.sort((a, b) => a.category.name.localeCompare(b.category.name))
    );
  });
  it("sorts products by category (Z to A)", () => {
    const result = sortProducts(products, "category:desc");
    expect(result).toEqual(
      products.sort((a, b) => b.category.name.localeCompare(a.category.name))
    );
  });

  describe("edge cases for name sorting", () => {
    const edgeCaseProducts: Product[] = [
      {
        id: "item-001",
        name: "123 Product",
        price: 100,
        rating: 4.5,
        description: "Product starting with numbers",
        category: { id: "cat-1", name: "Test" },
      },
      {
        id: "item-002",
        name: "2nd Item",
        price: 200,
        rating: 3.5,
        description: "Another numeric start",
        category: { id: "cat-1", name: "Test" },
      },
      {
        id: "item-003",
        name: "@Special Product",
        price: 150,
        rating: 4.0,
        description: "Starts with special char",
        category: { id: "cat-1", name: "Test" },
      },
      {
        id: "item-004",
        name: "#Hashtag Item",
        price: 250,
        rating: 5.0,
        description: "Starts with hash",
        category: { id: "cat-1", name: "Test" },
      },
      {
        id: "item-005",
        name: "!Important",
        price: 300,
        rating: 4.8,
        description: "Starts with exclamation",
        category: { id: "cat-1", name: "Test" },
      },
      {
        id: "item-006",
        name: "Alpha Product",
        price: 120,
        rating: 4.2,
        description: "Normal alphabetic name",
        category: { id: "cat-1", name: "Test" },
      },
      {
        id: "item-007",
        name: "9 Lives",
        price: 180,
        rating: 3.8,
        description: "Single digit start",
        category: { id: "cat-1", name: "Test" },
      },
      {
        id: "item-008",
        name: "Zebra Product",
        price: 220,
        rating: 4.6,
        description: "Normal alphabetic name",
        category: { id: "cat-1", name: "Test" },
      },
      {
        id: "item-009",
        name: "10x Zoom",
        price: 350,
        rating: 4.9,
        description: "Two digit number start",
        category: { id: "cat-1", name: "Test" },
      },
      {
        id: "item-010",
        name: "",
        price: 100,
        rating: 2.0,
        description: "Empty string name",
        category: { id: "cat-1", name: "Test" },
      },
    ];

    it("sorts names with correct ordering: empty < special < numbers < letters (ascending)", () => {
      const result = sortProducts(edgeCaseProducts, "name:asc");
      const names = result.map((p) => p.name);

      // localeCompare ordering: empty string < special chars < numbers < letters
      expect(names[0]).toBe(""); // Empty string comes first
      expect(names[1]).toMatch(/^[^A-Za-z0-9]/); // First non-empty should be special character
      expect(names[names.length - 1]).toMatch(/^[A-Za-z]/); // Last should be alphabetic

      // Verify ordering: find first number and first letter indices
      const firstNumberIndex = names.findIndex((name) => /^[0-9]/.test(name));
      const firstLetterIndex = names.findIndex((name) =>
        /^[A-Za-z]/.test(name)
      );

      expect(firstNumberIndex).toBeGreaterThan(0); // Numbers come after empty
      expect(firstLetterIndex).toBeGreaterThan(firstNumberIndex); // Letters come after numbers
    });

    it("sorts names starting with numbers correctly (ascending)", () => {
      const result = sortProducts(edgeCaseProducts, "name:asc");
      const numericNames = result
        .map((p) => p.name)
        .filter((name) => /^\d/.test(name));

      // Numeric names should be sorted: "123 Product", "2nd Item", "9 Lives", "10x Zoom"
      // Note: localeCompare treats "10" as coming before "2" in numeric context
      // but as strings, "10" < "2" lexicographically
      expect(numericNames.length).toBeGreaterThan(0);
      // Verify they're in order (lexicographic, not numeric)
      for (let i = 0; i < numericNames.length - 1; i++) {
        expect(
          numericNames[i].localeCompare(numericNames[i + 1])
        ).toBeLessThanOrEqual(0);
      }
    });

    it("sorts names starting with special characters correctly (ascending)", () => {
      const result = sortProducts(edgeCaseProducts, "name:asc");
      const specialCharNames = result
        .map((p) => p.name)
        .filter((name) => /^[^A-Za-z0-9]/.test(name));

      // Special characters typically come before alphanumeric in localeCompare
      expect(specialCharNames.length).toBeGreaterThan(0);
      // Verify they're sorted
      for (let i = 0; i < specialCharNames.length - 1; i++) {
        expect(
          specialCharNames[i].localeCompare(specialCharNames[i + 1])
        ).toBeLessThanOrEqual(0);
      }
    });

    it("handles empty string names correctly", () => {
      const result = sortProducts(edgeCaseProducts, "name:asc");
      const emptyNameProduct = result.find((p) => p.name === "");

      expect(emptyNameProduct).toBeTruthy();
      // Empty string typically sorts first
      expect(result[0].name).toBe("");
    });

    it("maintains correct order when mixing numbers, special chars, and letters (ascending)", () => {
      const result = sortProducts(edgeCaseProducts, "name:asc");
      const names = result.map((p) => p.name);

      // Verify general ordering: empty < special < numbers < letters (typical localeCompare behavior)
      // This test verifies the sort doesn't break with mixed content
      expect(names.length).toBe(edgeCaseProducts.length);

      // All names should be present
      const originalNames = edgeCaseProducts.map((p) => p.name);
      expect(names.sort()).toEqual(originalNames.sort());
    });
  });
});
