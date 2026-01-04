import type { Product } from "@/entities/product/model/types";
import ProductRatings from "@/entities/product/ui/product-ratings";
import FavoriteButton from "@/features/favorites/ui/favorite-button";
import { formatCurrency } from "@/shared/lib/currency";

interface ProductPageProps {
  product: Product;
}

export function ProductPage({ product }: ProductPageProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs text-gray-600 dark:text-gray-300">
        {product.category.name}
      </span>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <ProductRatings rating={product.rating} />
      </div>
      <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
      <p className="text-2xl font-bold">{formatCurrency(product.price)}</p>
      <FavoriteButton id={product.id} />
    </div>
  );
}
