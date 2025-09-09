import { NamedAPIResourceList, Pokemon } from "@/types";

export const getPokemonList = async (limit = 500): Promise<Pokemon[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`,
  );

  if (!response.ok) throw new Error("Failed to fetch Pokemon list");

  const data: NamedAPIResourceList = await response.json();

  const detailedPokemon = await Promise.all(
    data.results.map(async (p) => {
      const res = await fetch(p.url);
      if (!res.ok) throw new Error(`Failed to fetch ${p.name}`);

      return res.json();
    }),
  );

  return detailedPokemon;
};
