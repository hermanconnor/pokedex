import { SortOption } from "@/types";

const sortOptions: Array<{ value: SortOption; label: string }> = [
  { value: "id-asc", label: "ID (Low to High)" },
  { value: "id-desc", label: "ID (High to Low)" },
  { value: "name-asc", label: "Name (A to Z)" },
  { value: "name-desc", label: "Name (Z to A)" },
  { value: "type", label: "Type" },
];

export default sortOptions;
