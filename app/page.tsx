import { Suspense } from "react";
import PokemonGrid from "@/components/pokemon-grid";
import { getPokemonDetails, getPokemonList } from "@/lib/pokeApi";
import PokemonGridSkeleton from "@/components/pokemon-grid-skeleton";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const currentPage = Number(params.page) || 1;
  const itemsPerPage = Number(params.limit) || 20;
  const offset = (currentPage - 1) * itemsPerPage;

  const sortOption = (params.sort || "id-asc") as string;
  const typesParam = params.types;
  const selectedTypes =
    typeof typesParam === "string"
      ? typesParam.split(",").filter(Boolean)
      : Array.isArray(typesParam)
        ? typesParam.filter(Boolean)
        : [];

  const pokemonList = await getPokemonList(itemsPerPage, offset);
  const pokemonDetailsPromises = pokemonList.results.map((pokemon) =>
    getPokemonDetails(pokemon.url),
  );
  const pokemonDetailsResults = Promise.all(pokemonDetailsPromises);

  const totalPages = Math.ceil(pokemonList.count / itemsPerPage);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-foreground mb-2 text-4xl font-bold">Pokédex</h1>
        <p className="text-muted-foreground text-lg">
          Discover and explore the world of Pokémon
        </p>
      </div>

      <Suspense fallback={<PokemonGridSkeleton />}>
        <PokemonGrid
          initialPokemon={pokemonDetailsResults}
          sortOption={sortOption}
          itemsPerPage={itemsPerPage}
          selectedTypes={selectedTypes}
          currentPage={currentPage}
        />
      </Suspense>
    </div>
  );
}
