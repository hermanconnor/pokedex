import Link from "next/link";
import Image from "next/image";
import { Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Pokemon } from "@/types";
import { typeColors } from "@/utils/type-colors";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"].front_default ||
    pokemon.sprites.front_default ||
    "/diverse-pokemon-gathering.png";

  return (
    <Card className="group bg-card/50 border-border/50 hover:bg-card/80 animate-fade-in relative backdrop-blur-sm hover:border-teal-500">
      <CardContent>
        <Image src={imageUrl} alt={pokemon.name} width={500} height={500} />

        {/* FAVORITE BUTTON */}
        {/* <Button
          variant="ghost"
          size="sm"
          className="glass-effect hover:bg-background/90 absolute top-5 right-5 cursor-pointer transition-all duration-200"
          onClick={() => toggleFavorite(pokemon.id)}
        >
          <Heart
            className={cn(
              "size-4 transition-all duration-200",
              isFavorite(pokemon.id)
                ? "animate-bounce-subtle animate-bounce-subtle fill-red-500 text-red-500"
                : "text-muted-foreground hover:text-red-400",
            )}
          />
        </Button> */}

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-card-foreground text-lg leading-tight font-bold capitalize">
              {pokemon.name}
            </h3>
            <span className="text-muted-foreground bg-muted/50 rounded-md px-2 py-1 font-mono text-sm">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
          </div>

          {/* TYPES */}
          {pokemon.types && (
            <div className="flex flex-wrap gap-1.5">
              {pokemon.types.map((type) => (
                <Badge
                  key={type.type.name}
                  variant="secondary"
                  className={cn(
                    "px-2.5 py-1 text-xs font-medium text-white capitalize shadow-sm",
                    typeColors[type.type.name] || "bg-gray-400",
                  )}
                >
                  {type.type.name}
                </Badge>
              ))}
            </div>
          )}

          {/* STATS */}
          {pokemon.height && pokemon.weight && (
            <div className="text-muted-foreground grid grid-cols-2 gap-2 pt-1 text-sm">
              <div className="bg-muted/30 rounded-lg p-2 text-center">
                <div className="text-card-foreground font-medium">
                  {pokemon.height / 10}m
                </div>
                <div className="text-xs">Height</div>
              </div>
              <div className="bg-muted/30 rounded-lg p-2 text-center">
                <div className="text-card-foreground font-medium">
                  {pokemon.weight / 10}kg
                </div>
                <div className="text-xs">Weight</div>
              </div>
            </div>
          )}

          <Link
            href={`/pokemon/${pokemon.id}`}
            className="mt-4 block w-full rounded-md bg-teal-500 p-2 text-center text-white transition-all duration-200 hover:bg-teal-400"
          >
            <span className="flex items-center justify-center">
              <Info className="mr-2 size-4" />
              View Details
            </span>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
