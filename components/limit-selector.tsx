"use client";

import { useRouter, useSearchParams } from "next/navigation";
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
}

const LimitSelector = ({ value }: Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleLimitChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", value);
    // Reset to page 1 when changing limit
    params.set("page", "1");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-3">
      <Label
        htmlFor="limit-select"
        className="text-sm font-medium whitespace-nowrap"
      >
        Pokémon per page:
      </Label>
      <Select value={value.toString()} onValueChange={handleLimitChange}>
        <SelectTrigger id="limit-select" className="w-[100px]">
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
