import { getCatalogData } from "@/features/catalog/model/repo";
import CatalogGrid from "@/features/catalog/ui/catalog-grid";

export default async function Home() {
  const { categories, products } = await getCatalogData();

  return (
    <main>
      <div className="p-4 w-full">
        <h1 className="text-4xl font-bold mb-4">Mini Catalog</h1>
        <CatalogGrid categories={categories} products={products} />
      </div>
    </main>
  );
}
