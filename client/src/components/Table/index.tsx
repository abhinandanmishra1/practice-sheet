import { flexRender } from "@tanstack/react-table";
import { useFetchProblems } from "@/hooks/problems";
import { useProblemsTable } from "@/hooks/useProblemsTable";
import { Loader } from "@/components/Loader";
import { Pagination } from "./Pagination";
import { Card } from "@/components/ui/card";
import { Table as ShadTable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TABLE_STYLES } from "@/constants/table";

export const Table = () => {
  const { data, isLoading, error } = useFetchProblems();
  const problems = data?.problems || [];
  const page = data?.page || { limit: 10, total: 0 };
  
  const table = useProblemsTable(problems, page.total);
  
  if (!table) return null;

  if (error) {
    return (
      <Card className="p-6 text-center text-red-500">
        <p>Error loading problems. Please try again later.</p>
      </Card>
    );
  }

  return (
    <div className={TABLE_STYLES.container}>
      <Card className={TABLE_STYLES.card}>
        <div className={TABLE_STYLES.cardContent}>
          <ShadTable>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className={TABLE_STYLES.headerRow}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} className={TABLE_STYLES.headerCell}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            {!isLoading && (
              <TableBody>
                {table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className={TABLE_STYLES.row}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        className={TABLE_STYLES.cell}
                      >
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            )}
          </ShadTable>
          {isLoading && (
            <div className={TABLE_STYLES.loadingContainer}>
              <Loader />
            </div>
          )}
          {!isLoading && table.getRowModel().rows.length === 0 && (
            <div className={TABLE_STYLES.emptyState}>
              <p>No problems found</p>
            </div>
          )}

          <Pagination
            setTablePageIndex={table.setPageIndex}
            previousPage={table.previousPage}
            nextPage={table.nextPage}
            pageCount={Math.ceil(page.total / 10) || 20}
          />
        </div>
      </Card>
    </div>
  );
};
