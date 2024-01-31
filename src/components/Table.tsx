import React from "react";

import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  TableOptions,
  Updater,
} from "@tanstack/react-table";
import { IoChevronDown, IoChevronUp } from "react-icons/io5";

interface TableProps<D extends object> {
  columns: {
    header: string | (() => string);
    accessorKey: string;
    cell?: (cell: any) => any;
  }[];
  data: D[];
  sorting?: SortingState;
  setSorting?: (updater: Updater<SortingState>) => void;
}

export default function Table<D extends object>({
  columns,
  data,
  sorting,
  setSorting,
}: TableProps<D>) {
  const options: TableOptions<D> = {
    data,
    columns,
    state: {},
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  };
  if (sorting && options.state) {
    options.state.sorting = sorting;
  }
  if (setSorting) {
    options.onSortingChange = setSorting;
  }
  const table = useReactTable(options);

  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-left rtl:text-right text-tableNeutralMedium ">
        <thead className="text-tableNeutralDark uppercase bg-tableNeutralLight ">
          {table.getHeaderGroups().map((headerGroup) => {
            return (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header: any) => {
                  return (
                    <th key={header.id} scope="col" className="px-6 py-3">
                      {header.isPlaceholder ? null : (
                        <div
                          {...{
                            className: header.column.getCanSort()
                              ? "cursor-pointer select-none flex justify-between items-center"
                              : "",
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <IoChevronUp />,
                            desc: <IoChevronDown />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </th>
                  );
                })}
              </tr>
            );
          })}
        </thead>
        <tbody>
          {table?.getRowModel().rows.map((row) => {
            return (
              <tr key={row.id} className="bg-white border-b ">
                {row.getVisibleCells().map((cell) => {
                  return (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-tableNeutralDark  dark:text-white"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
    </div>
  );
}
