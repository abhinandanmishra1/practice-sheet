export interface Problem {
  name: string;
  link: string;
  completed: boolean;
  problemLink: string;
}

export interface ProblemResponse {
  problems: Problem[];
  page: {
    limit: number;
    total: number;
  };
}

export interface TableCellProps {
  isCompleted: boolean;
  problemLink: string;
  value: string;
  onToggle?: () => void;
}

export interface PaginationProps {
  setTablePageIndex: (_: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  pageCount: number;
}
