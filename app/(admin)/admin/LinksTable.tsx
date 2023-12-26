"use client";

import { LinkData } from "@/types/LinkData";
import { columns } from "./table/columns";
import { createLink } from "./serverActions";
import { DataTable } from "@/components/ui/data-table";
import { useCallback } from "react";
import { Result } from "@/lib/utils";

interface LinksTableProps {
  links: LinkData[];
}
export function LinksTable({ links }: LinksTableProps) {
  const onCreate = useCallback(
    async (data: LinkData): Promise<Result<void>> => createLink({ data }),
    []
  );

  return <DataTable columns={columns} links={links} onCreate={onCreate} />;
}
