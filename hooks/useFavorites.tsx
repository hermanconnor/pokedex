"use client";

import { useEffect, useState } from "react";

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [hasLoaded, setHasLoaded] = useState(false);

  // Load favorites from localStorage after hydration
  useEffect(() => {
    const savedFavorites = localStorage.getItem("pokemon-favorites");

    // Run state updates asynchronously to satisfy React 19 effect rules
    Promise.resolve().then(() => {
      if (savedFavorites) {
        try {
          const favoritesArray = JSON.parse(savedFavorites);
          setFavorites(new Set(favoritesArray));
        } catch (error) {
          console.error("Failed to load favorites from local storage:", error);
        }
      }
      setHasLoaded(true);
    });
  }, []);

  // Save favorites to localStorage whenever it changes (after load)
  useEffect(() => {
    if (!hasLoaded) return;

    localStorage.setItem(
      "pokemon-favorites",
      JSON.stringify(Array.from(favorites)),
    );
  }, [favorites, hasLoaded]);

  const toggleFavorite = (pokemonId: number): void => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);

      if (newFavorites.has(pokemonId)) {
        newFavorites.delete(pokemonId);
      } else {
        newFavorites.add(pokemonId);
      }

      return newFavorites;
    });
  };

  const isFavorite = (pokemonId: number) => favorites.has(pokemonId);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    favoritesCount: favorites.size,
    hasLoaded,
  };
};

export default useFavorites;
