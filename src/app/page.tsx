import { filterProductsByCategory } from "@/features/catalog/model/filters";
import { getCatalogData } from "@/features/catalog/model/repo";
import CatalogFilters from "@/features/catalog/ui/catalog-filters";
import CatalogGrid from "@/features/catalog/ui/catalog-grid";

interface HomeProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const { categories, products } = await getCatalogData();

  const filteredProducts = filterProductsByCategory(products, params.category);

  return (
    <main>
      <div className="p-4 w-full">
        <h1 className="text-4xl font-bold mb-4">Mini Catalog</h1>
        <CatalogFilters
          categories={categories}
          selectedCategory={params.category}
        />
        <CatalogGrid categories={categories} products={filteredProducts} />
      </div>
    </main>
  );
}
