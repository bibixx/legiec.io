import "@tanstack/react-table";
import { ColumnDefTemplate } from "@tanstack/react-table";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    newColumn: ColumnDefTemplate<{
      isLoading: boolean;
    }>;
    newColumnDefaultValue: TValue;
  }
}
