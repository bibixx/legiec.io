import { SortDirection } from "@tanstack/react-table";
import { ArrowDownRight, ArrowUpDown, ArrowUpRight } from "lucide-react";

interface SortIconProps {
  isSorted: false | SortDirection;
  className?: string;
}
export const SortIcon = ({ isSorted, className }: SortIconProps) => {
  if (isSorted === "asc") {
    return <ArrowUpRight className={className} />;
  }

  if (isSorted === "desc") {
    return <ArrowDownRight className={className} />;
  }

  return <ArrowUpDown className={className} />;
};
