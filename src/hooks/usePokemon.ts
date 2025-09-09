import { getPokemonList } from "@/lib/data";
import { useQuery } from "@tanstack/react-query";

const usePokemon = () => {
  const {
    data: allPokemon = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["pokemon-list"],
    queryFn: () => getPokemonList(1000),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });

  return { allPokemon, isLoading, error };
};

export default usePokemon;
