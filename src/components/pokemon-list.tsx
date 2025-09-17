"use client";

import { useMemo } from "react";
import usePokemon from "@/hooks/usePokemon";
import PokemonCard from "@/components/pokemon-card";
import Pagination from "@/components/pagination";
import { SortOption } from "@/types";

interface Props {
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
}

const PokemonList = ({ itemsPerPage, currentPage, setCurrentPage }: Props) => {
  const { data: allPokemon = [] } = usePokemon();

  const totalPages = Math.ceil(allPokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPokemon = allPokemon.slice(startIndex, endIndex);

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

  

  return (
    <section className="space-y-6">
      <div className="text-muted-foreground text-sm">
        Showing {startIndex + 1}-{Math.min(endIndex, allPokemon.length)} of{" "}
        {allPokemon.length} Pokémon
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
