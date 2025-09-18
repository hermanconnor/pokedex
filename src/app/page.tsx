"use client";

import { useState } from "react";
import PokemonList from "@/components/pokemon-list";
import { SortOption } from "@/types";
import PokemonFilters from "@/components/pokemon-filters";

export default function Home() {
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<SortOption>("id-asc");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedTypes([]);
    setShowFavoritesOnly(false);
  };

  const handleToggleFavoritesOnly = () => {
    setShowFavoritesOnly((prev) => !prev);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-foreground mb-2 text-4xl font-bold">Pokédex</h1>
        <p className="text-muted-foreground text-lg">
          Discover and explore the world of Pokémon
        </p>
      </div>

      <PokemonFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedTypes={selectedTypes}
        onTypeToggle={handleTypeToggle}
        onClearFilters={handleClearFilters}
        sortBy={sortBy}
        onSortChange={setSortBy}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={handleToggleFavoritesOnly}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />

      <PokemonList
        itemsPerPage={itemsPerPage}
        selectedTypes={selectedTypes}
        searchQuery={searchQuery}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sortBy={sortBy}
        showFavoritesOnly={showFavoritesOnly}
      />
    </div>
  );
}
