import "@tanstack/react-table";
import { ColumnDefTemplate } from "@tanstack/react-table";

declare module "@tanstack/react-table" {
  interface ColumnMeta<TData extends RowData, TValue> {
    newColumn: ColumnDefTemplate<{
      isLoading: boolean;
    }>;
    newColumnDefaultValue: TValue;
  }
}
