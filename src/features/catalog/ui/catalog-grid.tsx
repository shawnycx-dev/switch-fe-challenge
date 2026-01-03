import type { Category } from "@/entities/category/model/types";
import type { Product } from "@/entities/product/model/types";
import ProductCard from "@/entities/product/ui/product-card";

function EmptyCatalogState() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h2 className="text-2xl font-bold">No products found</h2>
      <p className="text-gray-600">Try different search or filter options</p>
    </div>
  );
}

export default function CatalogGrid(props: {
  categories: Category[];
  products: Product[];
}) {
  if (props.products.length === 0) {
    return <EmptyCatalogState />;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {props.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
