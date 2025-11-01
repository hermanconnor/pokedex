import { Activity } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Pokemon, PokemonSpecies } from "@/types";
import statIcons from "@/utils/stat-icons";

interface Props {
  pokemon: Pokemon;
  species: PokemonSpecies;
}

const PokemonDetailTabs = ({ pokemon, species }: Props) => {
  const description =
    species.flavor_text_entries
      .find((entry) => entry.language.name === "en")
      ?.flavor_text.replace(/\f/g, " ") || "No description available.";

  const maxStat = Math.max(...pokemon.stats.map((stat) => stat.base_stat));

  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="glass-effect grid w-full grid-cols-3">
        <TabsTrigger value="about" className="cursor-pointer">
          About
        </TabsTrigger>
        <TabsTrigger value="stats" className="cursor-pointer">
          Stats
        </TabsTrigger>
        <TabsTrigger value="moves" className="cursor-pointer">
          Moves
        </TabsTrigger>
      </TabsList>

      <TabsContent value="about" className="space-y-6">
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {description}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle>Abilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pokemon.abilities.map((ability, index) => (
                <div
                  key={index}
                  className="bg-muted/30 flex items-center justify-between rounded-lg p-3"
                >
                  <span className="font-medium capitalize">
                    {ability.ability.name.replace("-", " ")}
                  </span>
                  {ability.is_hidden && (
                    <Badge variant="secondary" className="text-xs">
                      Hidden
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="stats" className="space-y-6">
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle>Base Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pokemon.stats.map((stat) => {
              const StatIcon = statIcons[stat.stat.name] || Activity;
              const percentage = (stat.base_stat / maxStat) * 100;

              return (
                <div key={stat.stat.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <StatIcon className="text-muted-foreground size-4" />
                      <span className="text-sm font-medium capitalize">
                        {stat.stat.name.replace("-", " ")}
                      </span>
                    </div>
                    <span className="text-sm font-bold">{stat.base_stat}</span>
                  </div>
                  <Progress value={percentage} className="h-2 *:bg-teal-500" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="moves" className="space-y-6">
        <Card className="glass-effect border-border/50">
          <CardHeader>
            <CardTitle>Moves ({pokemon.moves.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="custom-scrollbar grid max-h-96 grid-cols-1 gap-2 overflow-y-auto sm:grid-cols-2">
              {pokemon.moves.slice(0, 20).map((move, index) => (
                <div
                  key={index}
                  className="bg-muted/30 rounded-md p-2 text-sm capitalize"
                >
                  {move.move.name.replace("-", " ")}
                </div>
              ))}
              {pokemon.moves.length > 20 && (
                <div className="text-muted-foreground col-span-full py-2 text-center text-sm">
                  And {pokemon.moves.length - 20} more moves...
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default PokemonDetailTabs;
