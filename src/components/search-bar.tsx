import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const SearchBar = () => {
  return (
    <div className="mx-4 w-full max-w-md min-w-0 flex-1 lg:w-auto">
      <div className="relative">
        <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2 transform" />
        <Input
          placeholder="Search Pokemon..."
          className="bg-card/50 border-border/50 focus:bg-card/80 pl-10 transition-all"
        />
      </div>
    </div>
  );
};

export default SearchBar;
