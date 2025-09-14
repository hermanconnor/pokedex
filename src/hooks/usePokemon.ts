import { getPokemonList } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";

const usePokemon = () => {
  return useQuery({
    queryKey: ["pokemon-list"],
    queryFn: () => getPokemonList(1000),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export default usePokemon;
