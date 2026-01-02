import type { Category } from "@/entities/category/model/types";
import type { Product } from "@/entities/product/model/types";
import ProductCard from "@/entities/product/ui/product-card";

export default function CatalogGrid(props: {
  categories: Category[];
  products: Product[];
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {props.products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
