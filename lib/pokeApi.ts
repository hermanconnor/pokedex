import { NamedAPIResourceList, Pokemon } from "@/types";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(
  limit = 20,
  offset = 0,
): Promise<NamedAPIResourceList> {
  const res = await fetch(
    `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
    {
      next: { revalidate: 3600 }, // Cache for 1 hour
    },
  );

  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon list");
  }

  return res.json();
}

// Fetch individual Pokemon details
export async function getPokemonDetails(url: string): Promise<Pokemon> {
  const res = await fetch(url, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error("Failed to fetch Pokemon details");
  }

  return res.json();
}

// Fetch detailed Pokemon data
export async function getPokemonByNameOrId(
  nameOrId: string | number,
): Promise<Pokemon | undefined> {
  const res = await fetch(`${BASE_URL}/pokemon/${nameOrId}`, {
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) return undefined;

  return res.json();
}
