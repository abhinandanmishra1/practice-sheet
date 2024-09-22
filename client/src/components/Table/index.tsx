import { useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useFetchProblems } from "../../hooks/problems";
import { getProblemLink } from "../../helpers/main";
import { Loader } from "../Loader";
import { Problem } from "../../types";
import { Pagination } from "./Pagination";

interface IProblem {
  name: string;
  link: string;
  completed: boolean;
  problemLink: string;
}

const PAGE_LIMIT = 10;

export const Table = () => {
  const { data, isLoading, error } = useFetchProblems();

  const problems = data?.problems || [];

  const page = data?.page || { limit: 10, total: 0 };

  const columnHelper = createColumnHelper<IProblem>();

  const toggleComplete = (problemLink: string) => {
    const isChecked = localStorage.getItem(problemLink) || "false";
    localStorage.setItem(problemLink, isChecked == "false" ? "true" : "false");
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Name",
        cell: (info) => (
          <div className="w-full pl-2">
            <a
              href={info.row.getValue("link")}
              target="_blank"
              className="text-[#BDBFC2]"
            >
              {info.getValue()}
            </a>
          </div>
        ),
      }),
      columnHelper.accessor("link", {
        header: "Problem Link",
        cell: (info) => (
          <div className="flex justify-center">
            <a href={info.getValue()} target="_blank" className="text-blue-500">
              Open
            </a>
          </div>
        ),
      }),
      columnHelper.accessor("completed", {
        header: "Completed",
        cell: (info) => {
          return <div className="w-full h-full flex justify-center">
            <input onClick={() => toggleComplete(info.row.original.problemLink)} className="w-4 h-4 text-green-600 bg-gray-100 accent-green-500 rounded" type="checkbox" defaultChecked={Boolean(localStorage.getItem(info.row.original.problemLink))} />
          </div>
        }
        ,
      }),
    ],

    []
  );

  const pageCount = Math.ceil(page.total / PAGE_LIMIT) || 20;

  const table = useReactTable({
    data: problems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount,
  });

  if (error) {
    return <p>Error </p>;
  }

  return (
    <div className="flex flex-col justify-between items-center h-full relative">
      <table className="h-full w-full ">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {!isLoading && (
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        )}
        {isLoading && <Loader />}
      </table>

      <Pagination
        setTablePageIndex={table.setPageIndex}
        previousPage={table.previousPage}
        nextPage={table.nextPage}
        pageCount={pageCount}
      />
    </div>
  );
};
