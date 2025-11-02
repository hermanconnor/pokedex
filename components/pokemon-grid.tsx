"use client";

import { use, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "@/components/pokemon-card";
import LimitSelector from "@/components/limit-selector";
import SortSelector from "@/components/sort-selector";
import TypesSelector from "@/components/types-selector";
import SearchBar from "@/components/search-bar";
import ActiveFilters from "@/components/active-filters";
import { Pokemon } from "@/types";
import useFavorites from "@/hooks/useFavorites";
import FavoritesSelector from "./favorites-selector";

interface Props {
  initialPokemon: Promise<Pokemon[]>;
  sortOption: string;
  itemsPerPage: number;
  selectedTypes: string[];
  currentPage: number;
}

const PokemonGrid = ({
  initialPokemon,
  sortOption,
  itemsPerPage,
  selectedTypes,
  currentPage,
}: Props) => {
  const allPokemon = use(initialPokemon);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { favorites, favoritesCount, isFavorite, toggleFavorite } =
    useFavorites();

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
      switch (sortOption) {
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
    sortOption,
    favorites,
    showFavoritesOnly,
  ]);

  const totalPages = Math.ceil(sortedAndFilteredPokemon.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedPokemon = sortedAndFilteredPokemon.slice(startIndex, endIndex);

  const updateUrlParams = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      params.set(key, value);
    });

    router.push(`?${params.toString()}`);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);

    if (currentPage !== 1) {
      updateUrlParams({ page: "1" });
    }
  };

  const handleSortChange = (value: string) => {
    updateUrlParams({ sort: value, page: "1" });
  };

  const handleLimitChange = (value: string) => {
    updateUrlParams({ limit: value, page: "1" });
  };

  const handleTypesChange = (type: string) => {
    const newTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    updateUrlParams({
      types: newTypes.join(","),
      page: "1",
    });
  };

  const handleClearTypes = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("types");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    setSearchQuery("");
    setShowFavoritesOnly(false);
    params.delete("types");
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  const handleToggleFavoritesOnly = () => {
    setShowFavoritesOnly((prev) => !prev);
  };

  return (
    <section className="space-y-6">
      <div className="my-6 flex flex-col flex-wrap items-center justify-between space-x-4 gap-y-6 md:flex-row">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
        />
        <div className="flex items-center gap-3">
          <FavoritesSelector
            favoritesCount={favoritesCount}
            showFavoritesOnly={showFavoritesOnly}
            onToggleFavoritesOnly={handleToggleFavoritesOnly}
          />
          <SortSelector value={sortOption} onChange={handleSortChange} />
          <TypesSelector
            selectedTypes={selectedTypes}
            onClearTypes={handleClearTypes}
            onChangeTypes={handleTypesChange}
          />
        </div>
      </div>

      <ActiveFilters
        selectedTypes={selectedTypes}
        searchQuery={searchQuery}
        onSearchChange={handleSortChange}
        onToggleType={handleTypesChange}
        onClearFilters={handleClearFilters}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={handleToggleFavoritesOnly}
      />

      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-muted-foreground text-sm">
          Showing {startIndex + 1}-
          {Math.min(endIndex, sortedAndFilteredPokemon.length)} of{" "}
          {sortedAndFilteredPokemon.length} Pokémon
        </p>

        <div>
          <LimitSelector value={itemsPerPage} onChange={handleLimitChange} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {paginatedPokemon.map((p) => (
          <PokemonCard
            key={p.id}
            pokemon={p}
            isFavorite={isFavorite}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </section>
  );
};

export default PokemonGrid;
