import { createLoader, parseAsString } from "nuqs/server";

export const categoryParser = parseAsString.withDefault("");
export const queryParser = parseAsString.withDefault("").withOptions({
  shallow: false,
});
export const sortParser = parseAsString.withDefault("").withOptions({
  shallow: false,
});

export const catalogSearchParams = {
  // Single category filter ?category=..., we could convert this into parseAsArrayOf to support multiple
  category: categoryParser,

  // Search query ?q=...
  q: queryParser,

  // Sort by ?sort=...
  sort: sortParser,
};

export const loadCatalogSearchParams = createLoader(catalogSearchParams);
