"use client";

import { sortParser } from "@/features/catalog/model/search-params";
import { useQueryState } from "nuqs";

export default function CatalogSort() {
  const [sort, setSort] = useQueryState("sort", sortParser);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
  };

  return (
    <div>
      <label htmlFor="catalog-sort">
        <span>Sort by:</span>
        <select
          name="sort"
          id="catalog-sort"
          onChange={handleOnChange}
          defaultValue={sort}
        >
          <option value="">Default</option>

          <option value="name:asc">Name (A to Z)</option>
          <option value="name:desc">Name (Z to A)</option>

          <option value="price:asc">Price (Low to High)</option>
          <option value="price:desc">Price (High to Low)</option>

          <option value="rating:asc">Rating (Low to High)</option>
          <option value="rating:desc">Rating (High to Low)</option>

          <option value="category:asc">Category (A to Z)</option>
          <option value="category:desc">Category (Z to A)</option>
        </select>
      </label>
    </div>
  );
}
