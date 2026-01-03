import { createLoader, parseAsString } from "nuqs/server";

export const catalogSearchParams = {
  category: parseAsString.withDefault(""),
};

export const loadCatalogSearchParams = createLoader(catalogSearchParams);
