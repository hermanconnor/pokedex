"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface FavoritesContextType {
  favorites: Set<number>;
  toggleFavorite: (pokemonId: number) => void;
  isFavorite: (pokemonId: number) => boolean;
  favoritesCount: number;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem("pokemon-favorites");

    if (savedFavorites) {
      try {
        const favoritesArray = JSON.parse(savedFavorites);
        setFavorites(new Set(favoritesArray));
      } catch (error) {
        console.error("Failed to load favorites from local storage:", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(
      "pokemon-favorites",
      JSON.stringify(Array.from(favorites)),
    );
  }, [favorites]);

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

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        favoritesCount: favorites.size,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);

  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }

  return context;
};
