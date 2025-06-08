"use client";

import { LinkData } from "@/types/LinkData";
import { CellContext, ColumnDef } from "@tanstack/react-table";
import { ClickableInput } from "../components/ClickableInput";
import { Checkbox } from "@/components/ui/checkbox";
import { intlFormat } from "date-fns";
import {
  cn,
  flattenZodErrors,
  FLATTENED_ZOD_ROOT,
  mapAndStripNullable,
} from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Check, Link, Loader2, Plus, Trash2, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { ReactNode, useState, useTransition } from "react";
import { deleteLink, updateLink } from "../serverActions";
import { SortIcon } from "@/components/SortIcon";
import { getLocale, localeCompare, trimHttp } from "./columns.utils";
import { Tooltip } from "@/components/ui/tooltip";
import { Formik, Form } from "formik";
import { CheckboxField, InputField } from "@/components/Field";
import { getSlugValidator, urlValidator } from "../validators";
import { ZodEffects, ZodString } from "zod";
import { useGracefulTransition } from "@/lib/useGracefulTransition";
import { closeToast, openToast } from "@/components/Toaster/Toaster.hooks";
import { APOSTROPHE, CLOSE_QUOTE, NBSP, OPEN_QUOTE } from "@/lib/text";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Awaitable } from "@/lib/awaitable";
import { useClientValue } from "@/lib/useClientValue";

export const columns: ColumnDef<LinkData, any>[] = [
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <div className="w-[200px]">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Slug
          <SortIcon isSorted={column.getIsSorted()} className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: (context) => {
      const currentValue = context.getValue<LinkData["slug"]>();
      const usedSlugs = mapAndStripNullable(
        context.table.getRowModel().rows,
        (r) => {
          const value = r.getValue<LinkData["slug"]>("slug");

          if (value === currentValue) {
            return null;
          }

          return value;
        }
      );

      return getInputCell(
        "slug",
        getSlugValidator(usedSlugs),
        "w-[200px]"
      )(context);
    },
    meta: {
      newColumn: () => (
        <div className="w-[200px]">
          <InputField name="slug" />
        </div>
      ),
      newColumnDefaultValue: "",
    },
  },
  {
    accessorKey: "url",
    sortingFn: (a, b, columnId) =>
      localeCompare(
        trimHttp(a.getValue<string>(columnId)),
        trimHttp(b.getValue<string>(columnId))
      ),
    header: ({ column }) => (
      <div className="w-[700px]">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          URL
          <SortIcon isSorted={column.getIsSorted()} className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: getInputCell("url", urlValidator),
    meta: {
      newColumn: () => <InputField name="url" />,
      newColumnDefaultValue: "",
    },
  },
  {
    accessorKey: "active",
    filterFn: (row, columnId, filterValue: string) => {
      if (filterValue === "true") {
        return row.getValue(columnId);
      }

      if (filterValue === "false") {
        return !row.getValue(columnId);
      }

      if (filterValue === "both") {
        return true;
      }

      return true;
    },
    header: ({ column }) => (
      <div className="text-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="min-w-[100px]">
              Active
              {column.getFilterValue() === "true" && (
                <Check className="ml-2 h-4 w-4" />
              )}
              {column.getFilterValue() === "false" && (
                <X className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <div className="w-60">
              <ToggleGroup
                type="single"
                className="grid w-full grid-cols-3"
                value={(column.getFilterValue() as string) ?? "both"}
                onValueChange={(v) => column.setFilterValue(v)}
              >
                <ToggleGroupItem value="true">Active</ToggleGroupItem>
                <ToggleGroupItem value="false">Inactive</ToggleGroupItem>
                <ToggleGroupItem value="both">Both</ToggleGroupItem>
              </ToggleGroup>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
    cell: getCheckboxCell("active"),
    meta: {
      newColumn: ({ isLoading }) => {
        return (
          <div className="text-center relative">
            <div
              className={cn(
                "abs-center z-10 opacity-100 transition-opacity duration-200",
                {
                  "opacity-0": !isLoading,
                  "pointer-events-none": !isLoading,
                }
              )}
            >
              <Loader2 className="h-4 w-4 mt-[2px] text-muted-foreground animate-spin animate-duration-500" />
            </div>
            <CheckboxField
              name="active"
              disabled={isLoading}
              className={cn(
                "mt-[6px] opacity-100 transition-opacity duration-200",
                {
                  "opacity-0 disabled:opacity-0": isLoading,
                  "pointer-events-none": isLoading,
                }
              )}
            />
          </div>
        );
      },
      newColumnDefaultValue: true,
    },
  },
  {
    accessorKey: "date",
    sortDescFirst: true,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Created
          <SortIcon isSorted={column.getIsSorted()} className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ getValue, column }) => {
      const value = getValue<LinkData["date"]>();
      const locale = undefined;
      // const locale = useClientValue(getLocale, undefined);

      return (
        <div
          className={cn(
            "inline-flex items-center whitespace-nowrap text-sm justify-start text-left font-normal px-4 tabular-nums"
          )}
        >
          <span suppressHydrationWarning>
            {formatDateForCell(value, locale)}
          </span>
        </div>
      );
    },
    sortingFn: (a, b, columnId) => {
      const aValue = a.getValue<Date>(columnId);
      const bValue = b.getValue<Date>(columnId);

      const diff = aValue.getTime() - bValue.getTime();
      if (diff !== 0) {
        return diff;
      }

      return localeCompare(
        trimHttp(b.getValue<string>("slug")),
        trimHttp(a.getValue<string>("slug"))
      );
    },
    meta: {
      newColumn: () => {
        const locale = undefined;
        // const locale = useClientValue(getLocale, undefined);
        return (
          <div
            className={cn(
              "inline-flex items-center whitespace-nowrap text-sm text-muted-foreground justify-start text-left font-normal px-4 tabular-nums"
            )}
          >
            <span suppressHydrationWarning>
              {formatDateForCell(new Date(), locale)}
            </span>
          </div>
        );
      },
      newColumnDefaultValue: new Date(),
    },
  },
  {
    id: "actions",
    cell: getDeleteCell(),
    meta: {
      newColumn: ({ isLoading }) => {
        return (
          <Button
            variant="create"
            disabled={isLoading}
            size="sm"
            type="submit"
            className={cn({ "cursor-wait!": isLoading })}
          >
            Add
            {isLoading ? (
              <Loader2 className="h-4 w-4 ml-1 animate-spin" />
            ) : (
              <Plus className="h-4 w-4 ml-1" />
            )}
          </Button>
        );
      },
      newColumnDefaultValue: null,
    },
  },
];

function getCheckboxCell<
  T extends {
    [K in keyof LinkData]: LinkData[K] extends boolean ? K : never;
  }[keyof LinkData]
>(dataKey: T) {
  return function ActiveCell({
    getValue,
    row,
  }: CellContext<LinkData, boolean>) {
    const [isLoading, startTransition] = useTransition();
    const slug = row.getValue<string>("slug");
    const value = getValue();

    return (
      <div className="text-center relative">
        <div
          className={cn(
            "abs-center z-10 opacity-100 transition-opacity duration-200",
            {
              "opacity-0": !isLoading,
              "pointer-events-none": !isLoading,
            }
          )}
        >
          <Loader2 className="h-4 w-4 mt-[2px] text-muted-foreground animate-spin animate-duration-500" />
        </div>
        <Checkbox
          disabled={isLoading}
          checked={value}
          onCheckedChange={(active: boolean) => {
            startTransition(async () => {
              await updateLink({ slug, data: { active } });
            });
          }}
          className={cn(
            "mt-[6px] opacity-100 transition-opacity duration-200",
            {
              "opacity-0 disabled:opacity-0": isLoading,
              "pointer-events-none": isLoading,
            }
          )}
        />
      </div>
    );
  };
}

function getInputCell<
  T extends {
    [K in keyof LinkData]: LinkData[K] extends string ? K : never;
  }[keyof LinkData],
  U extends ZodString | ZodEffects<ZodString, any, any>
>(dataKey: T, validator: U, className?: string) {
  return function InputCell({
    getValue,
    row,
    table,
  }: CellContext<LinkData, string>) {
    const [isLoading, startTransition] = useGracefulTransition();
    const slug = row.getValue<string>("slug");
    const defaultValue = getValue();

    return (
      <Formik<Record<string, string>>
        initialValues={{ [dataKey]: defaultValue }}
        onSubmit={async (values, actions) => {
          const currentValue = values[dataKey];
          await startTransition(async () =>
            updateLink({ slug, data: { [dataKey]: currentValue } })
          );

          actions.resetForm({ values });
        }}
        validate={(data) => {
          const result = validator.safeParse(data[dataKey]);

          if (result.success) {
            return undefined;
          }

          const errors = flattenZodErrors(result.error);
          return { [dataKey]: errors[FLATTENED_ZOD_ROOT] };
        }}
      >
        {({ values, initialValues, isValid }) => {
          return (
            <Form className={cn("relative", className)}>
              <InputField
                component={ClickableInput}
                name={dataKey}
                showErrorWhenTouched={false}
              />
              <Button
                className={cn(
                  "absolute right-[5px] top-1/2 -translate-y-1/2 opacity-0 invisible transition-[visibility,opacity]",
                  {
                    "opacity-100 visible":
                      values[dataKey] !== initialValues[dataKey] && isValid,
                  }
                )}
                disabled={isLoading}
                size="xs"
                variant="black"
                type="submit"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Save"
                )}
              </Button>
            </Form>
          );
        }}
      </Formik>
    );
  };
}

function getDeleteCell() {
  return function InputCell({ row }: CellContext<LinkData, string>) {
    const [isLoading, startTransition] = useTransition();
    const slug = row.getValue<string>("slug");
    const target = row.getValue<string>("url");

    const urlAsString = useClientValue(() => {
      const url = new URL(new URL(window.location.href).origin);
      url.pathname = slug;
      return url.toString();
    }, "");

    const onCopy = () => {
      navigator.clipboard.writeText(urlAsString).then(
        () => {
          const toastId = openToast({
            title: `${OPEN_QUOTE}${slug}${CLOSE_QUOTE} URL copied to clipboard`,
            description: (
              <>
                Or open it now:{" "}
                <a
                  href={urlAsString}
                  className="text-primary underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => closeToast(toastId)}
                >
                  {urlAsString}
                </a>
              </>
            ),
            size: "full",
          });
        },
        () => {
          const toastId = openToast({
            title: `Oops! Something went wrong`,
            description: (
              <>
                Couldn{APOSTROPHE}t copy URL to clipboard.
                <br />
                Try copying it manually:{NBSP}
                <a
                  href={urlAsString}
                  className="underline underline-offset-4"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => closeToast(toastId)}
                >
                  {urlAsString}
                </a>
              </>
            ),
            variant: "destructive",
          });
        }
      );
    };

    return (
      <div className="flex justify-center">
        <ConfirmDialog
          onConfirm={() => {
            startTransition(async () => {
              await deleteLink({ slug });
            });
          }}
          description={
            <>
              This action cannot be undone. This will permanently delete the
              redirection from{" "}
              <a
                href={urlAsString}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline text-primary underline-offset-4"
              >
                {urlAsString}
              </a>{" "}
              to{" "}
              <a
                href={target}
                target="_blank"
                rel="noreferrer"
                className="font-bold underline text-primary underline-offset-4 break-all"
              >
                {target}
              </a>
              .
            </>
          }
        >
          <div>
            <Tooltip content="Delete" side="bottom">
              <Button
                variant="destructiveGhost"
                disabled={isLoading}
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Delete</span>
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </Tooltip>
          </div>
        </ConfirmDialog>

        <Tooltip content="Copy" side="bottom">
          <Button
            variant="ghost"
            disabled={isLoading}
            className="h-8 w-8 p-0"
            onClick={onCopy}
          >
            <span className="sr-only">Copy</span>
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Link className="h-4 w-4" />
            )}
          </Button>
        </Tooltip>
      </div>
    );
  };
}

function formatDateForCell(value: Date | null, locale: string | undefined) {
  if (value == null) {
    return "None";
  }

  return intlFormat(
    value,
    {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    },
    {
      locale,
    }
  );
}

interface ConfirmDialogProps {
  onConfirm: () => Awaitable<boolean | void>;
  children: ReactNode;
  description: ReactNode;
}
const ConfirmDialog = ({
  children,
  description,
  onConfirm,
}: ConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={async () => {
              const result = await onConfirm();
              if (result === false) {
                return;
              }

              setIsOpen(false);
            }}
          >
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
