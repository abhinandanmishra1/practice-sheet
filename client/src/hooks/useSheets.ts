import { useSheetsApi } from "@/api/sheets";
import { useQuery } from "react-query";

export const useSheets = () => {
  const sheetsApi = useSheetsApi();

  return useQuery({
    queryKey: ['sheets'],
    queryFn: sheetsApi.fetchSheets
  });
};

export const useSheetById = (id?: string) => {
  const sheetsApi = useSheetsApi();

  return useQuery({
    queryKey: ['sheet', id],
    queryFn: () => sheetsApi.getSheetById(id!),
    enabled: !!id
  });
};
