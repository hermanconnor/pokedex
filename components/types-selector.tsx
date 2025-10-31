import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import POKEMON_TYPES from "@/utils/pokemon-types";
import { typeColors } from "@/utils/type-colors";
import { Label } from "./ui/label";

interface Props {
  selectedTypes: string[];
  onClearTypes: () => void;
  onChangeTypes: (type: string) => void;
}

const TypesSelector = ({
  selectedTypes,
  onClearTypes,
  onChangeTypes,
}: Props) => {
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <Button variant="outline" className="gap-2 bg-transparent">
          <Filter className="size-4" />
          Types
          {selectedTypes.length > 0 && (
            <Badge variant="secondary" className="ml-1 rounded-full px-2">
              {selectedTypes.length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="start">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold">Filter by Type</h4>
            {selectedTypes.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearTypes}
                className="h-auto cursor-pointer p-1 text-xs"
              >
                Clear
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            {POKEMON_TYPES.map((type) => (
              <div key={type} className="flex items-center gap-2">
                <Checkbox
                  id={`type-${type}`}
                  checked={selectedTypes.includes(type)}
                  onCheckedChange={() => onChangeTypes(type)}
                />
                <Label
                  htmlFor={`type-${type}`}
                  className="flex cursor-pointer items-center gap-2 text-sm"
                >
                  <span
                    className={`h-3 w-3 rounded-full ${typeColors[type]}`}
                  />
                  <span className="capitalize">{type}</span>
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default TypesSelector;
