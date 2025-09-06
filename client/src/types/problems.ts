export interface Problem {
  name: string;
  link: string;
  solved: boolean;
  problemLink: string;
  id: string;
  sheet: string;
}

export interface ProblemResponse {
  problems: Problem[];
  page: {
    limit: number;
    total: number;
  };
}

export interface TableCellProps {
  problemLink?: string;
  value?: string;
  problemId?: string;
  isSolved?: boolean;
}

export interface PaginationProps {
  setTablePageIndex: (_: number) => void;
  previousPage: () => void;
  nextPage: () => void;
  pageCount: number;
}
