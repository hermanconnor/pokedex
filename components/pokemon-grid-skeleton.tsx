import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "./ui/card";

const PokemonGridSkeleton = () => {
  return (
    <div>
      <div className="my-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton className="h-5 w-64" />
        <Skeleton className="h-9 w-16" />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <Card
            key={i}
            className="bg-card/50 border-border/50 backdrop-blur-sm"
          >
            <CardContent>
              <Skeleton className="h-[230.4px] w-[230.4px]" />

              <div className="my-2 flex items-center justify-between">
                <Skeleton className="h-[22.5px] w-[83.88px]" />
                <Skeleton className="h-[28px] w-[49.6px] rounded-md" />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <Skeleton className="h-[51.99px] w-[111.2px] rounded-lg" />
                <Skeleton className="h-[51.99px] w-[111.2px] rounded-lg" />
              </div>

              <Skeleton className="mt-4 h-[40px] w-[230.4px] rounded-md" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PokemonGridSkeleton;
