"use client";

import { queryParser } from "@/features/catalog/model/search-params";
import { Input } from "@/shared/ui/input";
import { debounce, useQueryState } from "nuqs";

// Checkout nuqs debounce documentation for further setup information
// https://nuqs.dev/docs/options#debounce
export default function CatalogSearchForm() {
  const [searchQuery, setSearchQuery] = useQueryState("q", queryParser);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value, {
      limitUrlUpdates: e.target.value === "" ? undefined : debounce(250),
    });
  };

  return (
    <Input
      type="text"
      placeholder="Search"
      name="q"
      defaultValue={searchQuery}
      onChange={handleOnChange}
    />
  );
}
