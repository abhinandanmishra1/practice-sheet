import { useMemo } from "react";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Problem } from "@/types/problems";
import { StatusCell } from "@/components/Table/components/StatusCell";
import { ProblemNameCell } from "@/components/Table/components/ProblemNameCell";
import { ActionCell } from "@/components/Table/components/ActionCell";
import { PAGE_LIMIT } from "@/constants/table";

export const useProblemsTable = (problems: Problem[], totalPages: number) => {
  if (!problems) return;
  const columnHelper = createColumnHelper<Problem>();

  const toggleComplete = (problemLink: string) => {
    const isChecked = localStorage.getItem(problemLink) || "false";
    localStorage.setItem(problemLink, isChecked === "false" ? "true" : "false");
  };

  const columns = useMemo(
    () => [
      columnHelper.accessor("completed", {
        header: "Status",
        cell: (info) => {
          const isCompleted = Boolean(localStorage.getItem(info.row.original.problemLink));
          return (
            <StatusCell
              isCompleted={isCompleted}
              onToggle={() => toggleComplete(info.row.original.problemLink)}
              problemLink={info.row.original.problemLink}
              value=""
            />
          );
        },
      }),
      columnHelper.accessor("name", {
        header: "Problem Name",
        cell: (info) => {
          const isCompleted = Boolean(localStorage.getItem(info.row.original.problemLink));
          return (
            <ProblemNameCell
              isCompleted={isCompleted}
              problemLink={info.row.original.problemLink}
              value={info.getValue()}
            />
          );
        },
      }),
      columnHelper.accessor("problemLink", {
        header: "Action",
        cell: (info) => (
          <ActionCell
            isCompleted={false}
            problemLink={info.getValue()}
            value=""
          />
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: problems,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    pageCount: Math.ceil(totalPages / PAGE_LIMIT) || 20,
  });

  return table;
};
