import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Props {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const SearchBar = ({ searchQuery, onSearchChange }: Props) => {
  return (
    <div className="w-full max-w-md min-w-0">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />
        <Input
          type="search"
          placeholder="Search Pokémon..."
          className="bg-card/50 border-border/50 focus:bg-card/80 pl-10 transition-all"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
