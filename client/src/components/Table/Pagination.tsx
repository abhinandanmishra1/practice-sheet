import React from "react";
import { useProblemTableContext } from "../../context/ProblemsTableContext/ProblemsTableContext";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  const handlePrevious = () => {
    previousPage();
    setPageIndex((current) => Math.max(current - 1, 0));
  };

  const handleNext = () => {
    nextPage();
    setPageIndex((current: number) => Math.min(pageCount - 1, current + 1));
  };

  const handlePageClick = (index: number) => {
    setTablePageIndex(index);
    setPageIndex((_) => index);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-6 bg-gray-50/50 rounded-b-xl">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Page {pageIndex + 1} of {pageCount}</span>
      </div>
      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handlePrevious}
          disabled={pageIndex === 0}
          className="h-9 w-9 border-gray-200 hover:bg-gray-100"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Previous page</span>
        </Button>
        <div className="flex items-center gap-1">
          {Array.from({ length: pageCount }, (_, i) => {
            // Show first page, last page, and pages around the current page
            const shouldShow =
              i === 0 ||
              i === pageCount - 1 ||
              Math.abs(i - pageIndex) <= 1;

            if (!shouldShow && Math.abs(i - pageIndex) === 2) {
              return <span key={i} className="px-1 text-gray-400">...</span>;
            }

            if (!shouldShow) return null;

            const isActive = i === pageIndex;
            return (
              <Button
                key={i}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageClick(i)}
                className={`h-9 w-9 text-sm font-medium ${
                  isActive 
                    ? "bg-indigo-500 text-white hover:bg-indigo-600" 
                    : "border-gray-200 text-gray-600 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </Button>
            );
          })}
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNext}
          disabled={pageIndex === pageCount - 1}
          className="h-9 w-9 border-gray-200 hover:bg-gray-100"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Next page</span>
        </Button>
      </div>
    </div>
  );
};
