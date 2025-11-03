"use client";

import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import useFavorites from "@/hooks/useFavorites";
import { Pokemon } from "@/types";

const FavoriteButton = ({ pokemon }: { pokemon: Pokemon }) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  return (
    <Button
      onClick={() => toggleFavorite(pokemon.id)}
      variant="outline"
      size="sm"
      className="hover:bg-background/90 cursor-pointer"
    >
      <Heart
        className={cn(
          "mr-2 size-4",
          isFavorite(pokemon.id)
            ? "fill-red-500 text-red-500"
            : "text-muted-foreground",
        )}
      />
      {isFavorite(pokemon.id) ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  );
};

export default FavoriteButton;
