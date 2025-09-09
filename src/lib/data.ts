import { NamedAPIResourceList, Pokemon } from "@/types";

export const getPokemon = async (
  limit = 100,
  offset = 0,
): Promise<NamedAPIResourceList> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }

  return response.json();
};

export const getDetailedPokemon = async (): Promise<Pokemon[]> => {
  const data = await getPokemon();

  const detailedPokemon = await Promise.all(
    data.results.map(async (p) => {
      const response = await fetch(p.url);
      return response.json();
    }),
  );

  return detailedPokemon;
};
