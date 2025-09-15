import { ArrowUpDown, Filter, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import SearchBar from "@/components/search-bar";
import sortOptions from "@/utils/sort-options";
import { cn } from "@/lib/utils";

import { SortOption } from "@/types";
import pokemonTypes from "@/utils/pokemon-types";

interface Props {
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  onClearFilters: () => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  itemsPerPage: number;
  setItemsPerPage: (items: number) => void;
}

const PokemonFilters = ({
  selectedTypes,
  onTypeToggle,
  onClearFilters,
  sortBy,
  onSortChange,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  itemsPerPage,
  setItemsPerPage,
}: Props) => {
  const favoritesCount = 0;

  return (
    <div className="my-6 flex flex-col flex-wrap items-center justify-between space-x-4 gap-y-6 md:flex-row">
      {/* SEARCH */}
      <SearchBar />
      {/* ACTIONS */}
      <div className="flex items-center gap-3">
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
          <span className="hidden sm:inline">Favorites</span>
          {favoritesCount > 0 && (
            <Badge
              variant={showFavoritesOnly ? "secondary" : "default"}
              className="ml-2 h-5 min-w-5 text-xs"
            >
              {favoritesCount}
            </Badge>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-card/50 hover:bg-card/80 border-border/50 cursor-pointer"
            >
              <ArrowUpDown className="size-4 sm:mr-2" />
              <span className="hidden sm:inline">Sort</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="glass-effect w-48" align="end">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuRadioGroup
              value={sortBy}
              onValueChange={(value) => onSortChange(value as SortOption)}
            >
              {sortOptions.map((option) => (
                <DropdownMenuRadioItem key={option.value} value={option.value}>
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="bg-card/50 hover:bg-card/80 border-border/50 cursor-pointer"
            >
              <Filter className="mr-2 size-4" />
              <span className="hidden sm:inline">Filter</span>
              {selectedTypes.length > 0 && (
                <Badge
                  variant="secondary"
                  className="animate-bounce-subtle ml-2 h-5 min-w-5 text-xs"
                >
                  {selectedTypes.length}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="glass-effect max-h-80 w-56 overflow-y-auto"
            align="end"
          >
            <DropdownMenuLabel>Filter by Type</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="grid grid-cols-2 gap-1 p-2">
              {pokemonTypes.map((type) => (
                <DropdownMenuCheckboxItem
                  key={type}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => onTypeToggle(type)}
                  className="text-sm capitalize"
                >
                  {type}
                </DropdownMenuCheckboxItem>
              ))}
            </div>
            {selectedTypes.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                  onClick={onClearFilters}
                >
                  Clear All Filters
                </Button>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm">Items per page:</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PokemonFilters;
