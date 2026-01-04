import {
  filterProductsByCategory,
  searchProducts,
} from "@/features/catalog/model/filters";
import { getCatalogData } from "@/features/catalog/model/repo";
import { loadCatalogSearchParams } from "@/features/catalog/model/search-params";
import { sortProducts } from "@/features/catalog/model/sort";
import CatalogFilters from "@/features/catalog/ui/catalog-filters";
import CatalogGrid from "@/features/catalog/ui/catalog-grid";
import CatalogSearchForm from "@/features/catalog/ui/catalog-search";
import CatalogSort from "@/features/catalog/ui/catalog-sort";
import type { SearchParams } from "nuqs";

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { category, q, sort } = await loadCatalogSearchParams(searchParams);
  const { categories, products } = await getCatalogData();

  const filteredProducts = filterProductsByCategory(products, category);
  const searchedProducts = searchProducts(filteredProducts, q);
  const sortedProducts = sortProducts(searchedProducts, sort);

  const totalProducts = searchedProducts.length;

  return (
    <main>
      <div className="p-4 w-full">
        <h1 className="text-4xl font-bold mb-4">Devices ({totalProducts})</h1>
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-2 mb-2">
          <CatalogFilters categories={categories} selectedCategory={category} />

          <div className="md:ml-auto flex flex-col md:flex-row gap-4 items-start md:items-center">
            <CatalogSort />
            <CatalogSearchForm />
          </div>
        </div>
        <CatalogGrid categories={categories} products={sortedProducts} />
      </div>
    </main>
  );
}
