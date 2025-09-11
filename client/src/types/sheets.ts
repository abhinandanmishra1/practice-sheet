import { Problem } from './problems';

export interface Sheet {
  _id: string;
  name: string;
  description?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface SheetResponse {
  success: boolean;
  data: Sheet[];
  message?: string;
}

export interface SheetProblemsResponse {
  success: boolean;
  page: {
    total: number;
    limit: number;
  };
  data: Problem[];
  message?: string;
}

export interface ProblemSheetsResponse {
  success: boolean;
  data: Sheet[];
  message?: string;
}

export interface AddRemoveProblemResponse {
  success: boolean;
  message: string;
}