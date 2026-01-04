"use client";

import { Product } from "@/entities/product/model/types";
import { useFavorites } from "@/features/favorites/ui/model/useFavorites";

export default function FavoriteButton({ id }: { id: Product["id"] }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const isMarkedFavorite = isFavorite(id);

  const handleOnClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };

  return (
    <button
      className="bg-gray-900 dark:bg-gray-300 text-white dark:text-gray-800 px-4 py-2 rounded-md hover:cursor-pointer"
      type="button"
      onClick={handleOnClick}
    >
      {isMarkedFavorite ? "♥ Remove from Favorites" : "♡ Add to Favorites"}
    </button>
  );
}
