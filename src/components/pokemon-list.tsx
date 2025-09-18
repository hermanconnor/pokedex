"use client";

import { useMemo } from "react";
import usePokemon from "@/hooks/usePokemon";
import PokemonCard from "@/components/pokemon-card";
import Pagination from "@/components/pagination";
import { SortOption } from "@/types";
import { useFavorites } from "@/providers/favorites-provider";

interface Props {
  itemsPerPage: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortBy: SortOption;
  showFavoritesOnly: boolean;
  selectedTypes: string[];
  searchQuery: string;
}

const PokemonList = ({
  itemsPerPage,
  currentPage,
  setCurrentPage,
  showFavoritesOnly,
  selectedTypes,
  searchQuery,
  sortBy,
}: Props) => {
  const { data: allPokemon = [] } = usePokemon();
  const { favorites } = useFavorites();

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goToPrev = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  const sortedAndFilteredPokemon = useMemo(() => {
    let filtered = allPokemon;

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((type) => selectedTypes.includes(type.type.name)),
      );
    }

    if (searchQuery.trim()) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    if (showFavoritesOnly) {
      filtered = filtered.filter((pokemon) => favorites.has(pokemon.id));
    }

    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "id-asc":
          return a.id - b.id;
        case "id-desc":
          return b.id - a.id;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "type":
          const aType = a.types[0].type.name || "";
          const bType = b.types[0].type.name || "";
          return aType.localeCompare(bType);
        default:
          return a.id - b.id;
      }
    });

    return sorted;
  }, [
    allPokemon,
    searchQuery,
    selectedTypes,
    sortBy,
    showFavoritesOnly,
    favorites,
  ]);

  const totalPages = Math.ceil(sortedAndFilteredPokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPokemon = sortedAndFilteredPokemon.slice(startIndex, endIndex);

  return (
    <section className="space-y-6">
      <div className="text-muted-foreground text-sm">
        Showing {startIndex + 1}-
        {Math.min(endIndex, sortedAndFilteredPokemon.length)} of{" "}
        {sortedAndFilteredPokemon.length} Pokémon
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {paginatedPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        goToPage={goToPage}
        goToNext={goToNext}
        goToPrev={goToPrev}
      />
    </section>
  );
};

export default PokemonList;
