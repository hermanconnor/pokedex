import { Suspense } from "react";
import PokemonGrid from "@/components/pokemon-grid";
import { getPokemonDetails, getPokemonList } from "@/lib/pokeApi";
import { Pokemon } from "@/types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pokemonPerPage = 20;
  const offset = (currentPage - 1) * pokemonPerPage;

  const pokemonList = await getPokemonList(pokemonPerPage, offset);

  const pokemonDetailsPromises = pokemonList.results.map((pokemon) =>
    getPokemonDetails(pokemon.url),
  );
  const pokemonDetailsResults = await Promise.all(pokemonDetailsPromises);
  const pokemonDetails = pokemonDetailsResults.filter(
    (p): p is Pokemon => p !== null,
  );

  const totalPages = Math.ceil(pokemonList.count / pokemonPerPage);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-foreground mb-2 text-4xl font-bold">Pokédex</h1>
        <p className="text-muted-foreground text-lg">
          Discover and explore the world of Pokémon
        </p>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <PokemonGrid initialPokemon={pokemonDetails} />
      </Suspense>
    </div>
  );
}
