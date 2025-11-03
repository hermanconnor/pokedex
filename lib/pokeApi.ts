import { NamedAPIResourceList, Pokemon, PokemonSpecies } from "@/types";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(
  limit = 20,
  offset = 0,
): Promise<Pokemon[]> {
  const response = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  );

  if (!response.ok) throw new Error("Failed to fetch Pokemon list");

  const data: NamedAPIResourceList = await response.json();

  const detailedPokemon = await Promise.all(
    data.results.map((p) => getPokemonDetails(p.url)),
  );

  return detailedPokemon;
}

async function getPokemonDetails(url: string): Promise<Pokemon> {
  const res = await fetch(url);

  if (!res.ok) throw new Error("Failed to fetch Pokemon details");

  return res.json();
}

export async function getPokemonByNameOrId(
  nameOrId: string | number,
): Promise<Pokemon | undefined> {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) return undefined;

  return res.json();
}

export async function getPokemonSpecies(
  speciesUrl: string,
): Promise<PokemonSpecies> {
  const response = await fetch(speciesUrl);

  if (!response.ok) throw new Error("Species not found");

  return response.json();
}
