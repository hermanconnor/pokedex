import { getDetailedPokemon } from "@/lib/data";
import PokemonCard from "./pokemon-card";

const PokemonList = async () => {
  const detailedPokemon = await getDetailedPokemon();

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {detailedPokemon.map((pokemon) => (
        <PokemonCard key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
