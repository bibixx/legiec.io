"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { PromiseWithResolvers, Result, flattenZodErrors } from "@/lib/utils";
import { LinkData } from "@/types/LinkData";
import {
  Column,
  ColumnDefTemplate,
  ColumnMeta,
  Renderable,
  Table,
  flexRender,
} from "@tanstack/react-table";
import { Formik } from "formik";
import { useTransition } from "react";
import { getLinkDataValidator } from "../validators";
import { FakeForm } from "@/components/FakeForm";
import { useGracefulTransition } from "@/lib/useGracefulTransition";

type GetContext<T> = T extends ColumnDefTemplate<infer R>
  ? T extends string
    ? never
    : R
  : never;

type NewColumnContext<TData, TValue> = GetContext<
  ColumnMeta<TData, TValue>["newColumn"]
>;

interface CreateRowProps {
  table: Table<LinkData>;
  onCreate: (data: LinkData) => Promise<Result<void>>;
}
export function CreateRow({ table, onCreate }: CreateRowProps) {
  const columns = table.getAllFlatColumns() as Column<LinkData>[];
  const [isLoading, startTransition] = useGracefulTransition();
  const onSubmit = (data: LinkData) =>
    startTransition(async () => onCreate(data));

  return (
    <Formik<LinkData>
      initialValues={getDefaultData(columns)}
      onSubmit={async (values, actions) => {
        const result = await onSubmit(values);
        actions.resetForm();

        return result;
      }}
      validate={(data) => {
        const alreadyUsedSlugs = table
          .getRowModel()
          .rows.map((r) => r.getValue<LinkData["slug"]>("slug"));

        const result = getLinkDataValidator(alreadyUsedSlugs).safeParse(data);
        if (!result.success) {
          return flattenZodErrors(result.error);
        }

        return undefined;
      }}
    >
      <FakeForm>
        <TableRow>
          {columns.map((column) => {
            type Context = NewColumnContext<LinkData, keyof LinkData>;
            const newColumn = column.columnDef.meta?.newColumn as
              | Renderable<Context>
              | undefined;
            const columnContext: Context = {
              isLoading,
            };

            return (
              <TableCell key={column.id}>
                {newColumn == null
                  ? null
                  : flexRender(newColumn, columnContext)}
              </TableCell>
            );
          })}
        </TableRow>
      </FakeForm>
    </Formik>
  );
}

function getDefaultData<TData, TValue>(
  columns: Column<TData, TValue>[]
): LinkData {
  return Object.fromEntries(
    columns.map((c) => [c.id, c.columnDef.meta?.newColumnDefaultValue])
  ) as any;
}
