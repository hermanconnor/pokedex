import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  favoritesCount: number;
}

const FavoritesSelector = ({
  showFavoritesOnly,
  onToggleFavoritesOnly,
  favoritesCount,
}: Props) => {
  return (
    <Button
      variant={showFavoritesOnly ? "default" : "outline"}
      size="sm"
      onClick={onToggleFavoritesOnly}
      className={cn(
        "flex cursor-pointer items-center justify-center text-center transition-all duration-200",
        showFavoritesOnly
          ? "bg-primary hover:bg-primary/90 shadow-lg"
          : "bg-card/50 hover:bg-card/80 border-border/50",
      )}
    >
      <Heart
        className={`size-4 transition-all duration-200 sm:mr-2 ${showFavoritesOnly ? "animate-bounce-subtle fill-current" : ""}`}
      />
      <span>Favorites</span>
      {favoritesCount > 0 && (
        <Badge
          variant={showFavoritesOnly ? "secondary" : "default"}
          className="ml-2 h-5 min-w-5 text-xs"
        >
          {favoritesCount}
        </Badge>
      )}
    </Button>
  );
};

export default FavoritesSelector;
