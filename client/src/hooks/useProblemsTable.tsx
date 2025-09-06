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

  const columns = useMemo(
    () => [
      columnHelper.accessor("solved", {
        header: "Status",
        cell: (info) => {
          return (
            <StatusCell
              problemId={info.row.original.id}
              isSolved={info.getValue()}
            />
          );
        },
      }),
      columnHelper.accessor("name", {
        header: "Problem Name",
        cell: (info) => {
          return (
            <ProblemNameCell
              isSolved={info.row.original.solved}
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
            isSolved={info.row.original.solved}
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
