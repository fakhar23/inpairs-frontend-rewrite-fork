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
import type { ColumnDef } from "@tanstack/react-table";

interface TableProps<D extends object> {
  className?: string;
  columns: ColumnDef<D>[];
  data: D[];
  sorting?: SortingState;
  setSorting?: (updater: Updater<SortingState>) => void;
}

export default function Table<D extends object>({
  className,
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
    <div className={`relative overflow-x-auto ${className}`}>
      <table className="w-full text-left rtl:text-right text-neutral-500 ">
        <thead className="text-neutral-700 uppercase bg-neutral-100 ">
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
                            header.getContext(),
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
                      className="px-6 py-4 text-neutral-900  dark:text-white"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
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
                        header.getContext(),
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
