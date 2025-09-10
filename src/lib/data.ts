import { NamedAPIResourceList, Pokemon, PokemonSpecies } from "@/types";

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

export const getPokemonDetails = async (
  nameOrId: string | number,
): Promise<Pokemon> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId}`);
  if (!response.ok) throw new Error("Pokemon not found");

  return response.json();
};

export const getPokemonSpecies = async (
  speciesUrl: string,
): Promise<PokemonSpecies> => {
  const response = await fetch(speciesUrl);
  if (!response.ok) throw new Error("Species not found");

  return response.json();
};
