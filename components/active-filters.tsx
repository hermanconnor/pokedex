import { Heart, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Props {
  selectedTypes: string[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onToggleType: (type: string) => void;
  onClearFilters: () => void;
}

const ActiveFilters = ({
  selectedTypes,
  searchQuery,
  onSearchChange,
  onToggleType,
  onClearFilters,
}: Props) => {
  const hasActiveFilters = selectedTypes.length > 0 || searchQuery.length > 0;

  return (
    <div>
      {/* ACTIVE FILTERS */}
      {hasActiveFilters && (
        <div className="animate-slide-up my-4 flex flex-wrap items-center gap-2">
          <span className="text-muted-foreground text-sm font-medium">
            Active Filters:
          </span>
          {searchQuery && (
            <Badge variant="outline" className="bg-card/50 gap-1">
              <Search className="size-3" />
              &quot;{searchQuery}&quot;
              <Button
                variant="ghost"
                size="sm"
                className="size-4 cursor-pointer p-0 hover:bg-transparent"
                onClick={() => onSearchChange("")}
              >
                <X className="size-3" />
              </Button>
            </Badge>
          )}

          {/* {showFavoritesOnly && (
            <Badge variant="outline" className="bg-card/50 gap-1">
              <Heart className="size-3 fill-current text-red-500" />
              Favorites Only
              <Button
                variant="ghost"
                size="sm"
                className="size-4 cursor-pointer p-0 hover:bg-transparent"
                onClick={onToggleFavoritesOnly}
              >
                <X className="size-3" />
              </Button>
            </Badge>
          )} */}

          {selectedTypes.map((type) => (
            <Badge
              key={type}
              variant="outline"
              className="bg-card/50 gap-1 capitalize"
            >
              {type}
              <Button
                variant="ghost"
                size="sm"
                className="size-4 cursor-pointer p-0 hover:bg-transparent"
                onClick={() => onToggleType(type)}
              >
                <X className="size-3" />
              </Button>
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground cursor-pointer transition-colors duration-200"
            onClick={onClearFilters}
          >
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActiveFilters;
