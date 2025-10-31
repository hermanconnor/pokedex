import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  value: number;
  onChange: (value: string) => void;
}

const LimitSelector = ({ value, onChange }: Props) => {
  return (
    <div className="flex items-center gap-3">
      <Label
        htmlFor="limit-select"
        className="text-sm font-medium whitespace-nowrap"
      >
        Pokémon per page:
      </Label>
      <Select value={value.toString()} onValueChange={onChange}>
        <SelectTrigger id="limit-select" className="w-[100px] cursor-pointer">
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
  );
};

export default LimitSelector;
