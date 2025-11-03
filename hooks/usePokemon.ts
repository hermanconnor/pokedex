import { getPokemonList } from "@/lib/pokeApi";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const usePokemon = () => {
  return useQuery({
    queryKey: ["pokemon-list"],
    queryFn: () => getPokemonList(2000, 0),
    staleTime: 60 * 60 * 1000, // 1 hour
    placeholderData: keepPreviousData,
  });
};

export default usePokemon;
