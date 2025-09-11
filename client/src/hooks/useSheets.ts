import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSheetsApi } from "../api/sheets";
import { useUser } from "@clerk/clerk-react";
import { useProblemTableContext } from "@/context/ProblemsTableContext/ProblemsTableContext";

export const useSheets = () => {
  const { user } = useUser();
  const api = useSheetsApi();

  return useQuery({
    queryKey: ["sheets"],
    queryFn: () => api.getSheets(),
    enabled: !!user,
  });
};

export const useSheetProblems = (sheetId: string) => {
  const { user } = useUser();
  const { limit, offset } = useProblemTableContext();
  const api = useSheetsApi();

  return useQuery({
    queryKey: ["sheet-problems", sheetId, limit, offset],
    queryFn: () => api.getSheetProblems(sheetId, limit, offset),
    enabled: !!user && !!sheetId,
    retry: false,
  });
};

export const useProblemSheets = (problemId: string) => {
  const { user } = useUser();
  const api = useSheetsApi();

  return useQuery({
    queryKey: ["problem-sheets", problemId],
    queryFn: () => api.getProblemSheets(problemId),
    enabled: !!user && !!problemId,
  });
};

export const useAddProblemToSheet = () => {
  const queryClient = useQueryClient();
  const api = useSheetsApi();

  return useMutation({
    mutationFn: ({ sheetId, problemId }: { sheetId: string; problemId: string }) =>
      api.addProblemToSheet(sheetId, problemId),
    onSuccess: (_, { sheetId, problemId }) => {
      queryClient.invalidateQueries(["sheet-problems", sheetId]);
      queryClient.invalidateQueries(["problem-sheets", problemId]);
    },
  });
};

export const useSheetById = (sheetId?: string) => {
  const api = useSheetsApi();

  return useQuery({
    queryKey: ["sheet-by-id", sheetId],
    queryFn: () => api.getSheetById(sheetId as string),
    enabled: !!sheetId,
    retry: false,
  });
};

export const useRemoveProblemFromSheet = () => {
  const queryClient = useQueryClient();
  const api = useSheetsApi();

  return useMutation({
    mutationFn: ({ sheetId, problemId }: { sheetId: string; problemId: string }) =>
      api.removeProblemFromSheet(sheetId, problemId),
    onSuccess: (_, { sheetId, problemId }) => {
      queryClient.invalidateQueries(["sheet-problems", sheetId]);
      queryClient.invalidateQueries(["problem-sheets", problemId]);
    },
  });
};