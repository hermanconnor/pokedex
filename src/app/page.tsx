"use client";

import { useState } from "react";
import PokemonList from "@/components/pokemon-list";

export default function Home() {
  const [itemsPerPage, setItemsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-foreground mb-2 text-4xl font-bold">Pokédex</h1>
        <p className="text-muted-foreground text-lg">
          Discover and explore the world of Pokémon
        </p>
      </div>

      <PokemonList
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
