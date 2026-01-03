import { filterProductsByCategory } from "@/features/catalog/model/filters";
import { getCatalogData } from "@/features/catalog/model/repo";
import { loadCatalogSearchParams } from "@/features/catalog/model/search-params";
import CatalogFilters from "@/features/catalog/ui/catalog-filters";
import CatalogGrid from "@/features/catalog/ui/catalog-grid";
import type { SearchParams } from "nuqs";

interface HomeProps {
  searchParams: Promise<SearchParams>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { category } = await loadCatalogSearchParams(searchParams);
  const { categories, products } = await getCatalogData();

  const filteredProducts = filterProductsByCategory(products, category);

  return (
    <main>
      <div className="p-4 w-full">
        <h1 className="text-4xl font-bold mb-4">Mini Catalog</h1>
        <CatalogFilters categories={categories} selectedCategory={category} />
        <CatalogGrid categories={categories} products={filteredProducts} />
      </div>
    </main>
  );
}
