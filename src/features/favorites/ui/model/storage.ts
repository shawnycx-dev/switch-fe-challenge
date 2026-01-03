const FAVORITES_KEY = "catalog:favorites:v0.01";
const isServerSide = typeof window === "undefined";

export function getFavorites(key: string = FAVORITES_KEY) {
  if (isServerSide) return [];

  try {
    const raw = localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item) => typeof item === "string");
  } catch (error) {
    return [];
  }
}

export function addFavorite(ids: string[], key: string = FAVORITES_KEY) {
  if (isServerSide) return;

  try {
    const val = JSON.stringify(ids);
    localStorage.setItem(key, val);
  } catch (error) {
    // ignore errors
  }
}
