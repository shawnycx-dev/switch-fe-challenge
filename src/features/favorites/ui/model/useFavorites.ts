"use client";

import {
  addFavorite,
  getFavorites,
} from "@/features/favorites/ui/model/storage";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useFavorites = () => {
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const items = getFavorites();
    setFavoriteIds(items);
  }, []);

  const memoFavorites = useMemo(() => new Set(favoriteIds), [favoriteIds]);

  const isFavorite = useCallback(
    (id: string) => memoFavorites.has(id),
    [memoFavorites]
  );

  const toggleFavorite = useCallback((id: string) => {
    setFavoriteIds((prev) => {
      const newIds = new Set(prev);
      newIds.has(id) ? newIds.delete(id) : newIds.add(id);
      const newIdsArray = [...newIds];
      addFavorite(newIdsArray);
      return newIdsArray;
    });
  }, []);

  return {
    isFavorite,
    toggleFavorite,
    favoriteIds,
  };
};
