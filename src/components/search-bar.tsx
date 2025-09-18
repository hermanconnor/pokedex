import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
          placeholder="Search Pokemon..."
          className="bg-card/50 border-border/50 focus:bg-card/80 pl-10 transition-all"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="sm"
            className="hover:bg-muted/50 absolute top-1/2 right-1 size-6 -translate-y-1/2 transform p-0"
            onClick={() => onSearchChange("")}
          >
            <X className="size-3" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
