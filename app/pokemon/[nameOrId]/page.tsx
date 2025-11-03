import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Ruler, Weight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PokemonDetailTabs from "@/components/pokemon-detail-tabs";
import FavoriteButton from "./favorite-button";
import { getPokemonByNameOrId, getPokemonSpecies } from "@/lib/pokeApi";
import { cn } from "@/lib/utils";
import { typeColors } from "@/utils/type-colors";

interface Props {
  params: Promise<{ nameOrId: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { nameOrId } = await params;
  const pokemon = await getPokemonByNameOrId(nameOrId);

  if (!pokemon) {
    return {
      title: "Pokemon Not Found",
      description: `No details found for the pokemon with Name or ID: ${nameOrId}`,
    };
  }

  return {
    title: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
    description: `Details for the pokemon ${pokemon?.name}`,
  };
}

export default async function PokemonDetailsPage({ params }: Props) {
  const { nameOrId } = await params;

  const pokemon = await getPokemonByNameOrId(nameOrId);
  if (!pokemon) notFound();

  const species = await getPokemonSpecies(pokemon.species.url);

  const imageUrl =
    pokemon.sprites.other?.["official-artwork"].front_default ||
    pokemon.sprites.front_default ||
    "/diverse-pokemon-gathering.png";

  const genus =
    species.genera.find((g) => g.language.name === "en")?.genus || "Pokemon";

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        <div className="mb-8 flex items-center justify-end gap-4">
          <FavoriteButton pokemon={pokemon} />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <Card className="border-border/50">
              <CardContent className="p-8">
                <div className="space-y-4 text-center">
                  <div className="relative">
                    <Image
                      src={imageUrl}
                      alt={pokemon.name}
                      width={500}
                      height={500}
                      className="mx-auto size-64"
                    />
                  </div>

                  <div>
                    <h1 className="text-foreground mb-2 text-4xl font-bold capitalize">
                      {pokemon.name}
                    </h1>
                    <p className="text-muted-foreground mb-1 text-lg">
                      {genus}
                    </p>
                    <p className="text-muted-foreground font-mono text-sm">
                      #{pokemon.id.toString().padStart(3, "0")}
                    </p>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {pokemon.types.map((type) => (
                      <Badge
                        key={type.type.name}
                        className={cn(
                          "px-3 py-1 font-medium text-white capitalize",
                          typeColors[type.type.name] || "bg-gray-400",
                        )}
                      >
                        {type.type.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* PHYSICAL STATS */}
            <Card className="border-border/50 glass-effect">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ruler className="size-5" />
                  Physical Attributes
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <Ruler className="text-muted-foreground size-4" />
                    <span className="text-muted-foreground text-sm">
                      Height
                    </span>
                  </div>
                  <div className="text-2l font-bold">
                    {pokemon.height / 10}m
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 text-center">
                  <div className="mb-2 flex items-center justify-center gap-2">
                    <Weight className="text-muted-foreground size-4" />
                    <span className="text-muted-foreground text-sm">
                      Weight
                    </span>
                  </div>
                  <div className="text-2l font-bold">
                    {pokemon.weight / 10}kg
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <PokemonDetailTabs pokemon={pokemon} species={species} />
          </div>
        </div>
      </div>
    </div>
  );
}
