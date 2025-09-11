import { useAxios } from '@/axiosClient';
import { SheetResponse, SheetProblemsResponse, ProblemSheetsResponse, AddRemoveProblemResponse, Sheet } from '@/types/sheets';

export const useSheetsApi = () => {
  const axios = useAxios();

  const getSheets = async (): Promise<SheetResponse> => {
    const response = await axios.get('/sheets');
    return response.data;
  };

  const getSheetById = async (sheetId: string): Promise<Sheet> => {
    const response = await axios.get(`/sheets/${sheetId}`);
    return response.data;
  };

  const getSheetProblems = async (sheetId: string, limit: number, offset: number): Promise<SheetProblemsResponse> => {
    const response = await axios.get(`/sheets/${sheetId}/problems`, {
      params: {
        limit,
        offset,
      },
    });
    return response.data;
  };

  const getProblemSheets = async (problemId: string): Promise<ProblemSheetsResponse> => {
    const response = await axios.get(`/sheets/problem/${problemId}`);
    return response.data;
  };

  const addProblemToSheet = async (sheetId: string, problemId: string): Promise<AddRemoveProblemResponse> => {
    const response = await axios.post(`/sheets/${sheetId}/problems/${problemId}`);
    return response.data;
  };

  const removeProblemFromSheet = async (sheetId: string, problemId: string): Promise<AddRemoveProblemResponse> => {
    const response = await axios.delete(`/sheets/${sheetId}/problems/${problemId}`);
    return response.data;
  };

  return {
    getSheets,
    getSheetById,
    getSheetProblems,
    getProblemSheets,
    addProblemToSheet,
    removeProblemFromSheet,
  };
};