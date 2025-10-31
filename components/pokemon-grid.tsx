"use client";

import { use, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "@/components/pokemon-card";
import LimitSelector from "@/components/limit-selector";
import SortSelector from "@/components/sort-selector";
import { Pokemon } from "@/types";
import TypesSelector from "./types-selector";

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

  const router = useRouter();
  const searchParams = useSearchParams();

  // const currentPage = Number(searchParams.get("page")) || 1;
  // const sortOption = (searchParams.get("sort") || "id-asc") as SortOption;
  // const itemsPerPage = Number(searchParams.get("perPage")) || 20;
  // const selectedTypes =
  //   searchParams.get("types")?.split(",").filter(Boolean) || [];

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
  }, [allPokemon, searchQuery, selectedTypes, sortOption]);

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

  return (
    <section className="space-y-6">
      <div className="flex gap-2">
        <SortSelector value={sortOption} onChange={handleSortChange} />
        <TypesSelector
          selectedTypes={selectedTypes}
          onClearTypes={handleClearTypes}
          onChangeTypes={handleTypesChange}
        />
      </div>

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
          <PokemonCard key={p.id} pokemon={p} />
        ))}
      </div>
    </section>
  );
};

export default PokemonGrid;
