"use client";

import { use } from "react";
import { Pokemon } from "@/types";
import PokemonCard from "./pokemon-card";

interface Props {
  initialPokemon: Promise<Pokemon[]>;
}

const PokemonGrid = ({ initialPokemon }: Props) => {
  const allPokemon = use(initialPokemon);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {allPokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
};

export default PokemonGrid;
