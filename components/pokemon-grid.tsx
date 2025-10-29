"use client";

import { useState } from "react";
import { Pokemon } from "@/types";
import PokemonCard from "./pokemon-card";

interface Props {
  initialPokemon: Pokemon[];
}

const PokemonGrid = ({ initialPokemon }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon[]>(initialPokemon);

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {pokemon.map((p) => (
        <PokemonCard key={p.id} pokemon={p} />
      ))}
    </div>
  );
};

export default PokemonGrid;
