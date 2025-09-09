import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pokemon } from "@/types";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const imageUrl =
    pokemon.sprites.other?.["official-artwork"].front_default ||
    pokemon.sprites.front_default ||
    "/diverse-pokemon-gathering.png";

  return (
    <Card className="group bg-card/50 border-border/50 hover:bg-card/80 backdrop-blur-sm hover:border-teal-500">
      <CardContent>
        <Image src={imageUrl} alt={pokemon.name} width={500} height={500} />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-card-foreground text-lg leading-tight font-bold capitalize">
              {pokemon.name}
            </h3>
            <span className="text-muted-foreground bg-muted/50 rounded-md px-2 py-1 font-mono text-sm">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
          </div>
        </div>

        {pokemon.types && (
          <div className="flex flex-wrap gap-1.5">
            {pokemon.types.map((type) => (
              <Badge></Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
