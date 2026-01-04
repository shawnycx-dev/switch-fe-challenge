import Link from "next/link";

import type { Product } from "@/entities/product/model/types";
import ProductRatings from "@/entities/product/ui/product-ratings";

import { formatCurrency } from "@/shared/lib/currency";
import FavoriteButton from "@/features/favorites/ui/favorite-button";

export default function ProductCard(product: Product) {
  return (
    <Link
      className="border rounded-md shadow-md"
      key={product.id}
      href={`/products/${product.id}`}
    >
      <div className="p-4">
        <span className="text-xs text-gray-500 dark:text-gray-300">{product.category.name}</span>
        <h2 className="text-lg">{product.name}</h2>
        <ProductRatings rating={product.rating} />
        <p className="text-lg font-bold">{formatCurrency(product.price)}</p>
        <FavoriteButton id={product.id} />
      </div>
      <span className="sr-only">View product</span>
    </Link>
  );
}
