import React from "react";
import { useProblemTableContext } from "../../context/ProblemsTableContext/ProblemsTableContext";

interface PaginationProps {
  setTablePageIndex: (_: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  pageCount: number;
}

export const Pagination = ({
  setTablePageIndex,
  previousPage,
  nextPage,
  pageCount,
}: PaginationProps) => {
  const { setPageIndex, pageIndex } = useProblemTableContext();
  const activeClassName =
    "flex items-center justify-center px-4 h-10 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
  const inactiveClassName =
    "flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  return (
    <nav className="mt-4">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li>
          <button
            onClick={() => {
              previousPage();
              setPageIndex((pageIndex) => Math.max(pageIndex - 1, 0));
            }}
            disabled={pageIndex === 0}
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 1 1 5l4 4"
              />
            </svg>
          </button>
        </li>
        {Array.from({ length: pageCount }, (_, i) => (
          <li key={crypto.randomUUID()}>
            <button
              onClick={() => {
                setTablePageIndex(i);
                setPageIndex((_) => i);
              }}
              className={i === pageIndex ? activeClassName : inactiveClassName}
            >
              {i + 1}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={() => {
              setPageIndex((pageIndex: number) =>
                Math.min(pageCount - 1, pageIndex + 1)
              );
              nextPage();
            }}
            disabled={pageIndex === pageCount - 1}
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-3 h-3 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 6 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 9 4-4-4-4"
              />
            </svg>
          </button>
        </li>
      </ul>
    </nav>
  );
};
