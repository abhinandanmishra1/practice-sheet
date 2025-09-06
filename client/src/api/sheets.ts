import { useAxios } from "@/axiosClient";
import { Sheet } from "@/types/sheets";

export const useSheetsApi = () => {
    const axios = useAxios();

    const fetchSheets = async () => {
        try {
            const { data } = await axios.get<Sheet[]>("/sheets");
            return data;
        } catch (error) {
            throw new Error("There was some error in loading the sheets.");
        }
    };

    const getSheetById = async (id: string) => {
        try {
            const { data } = await axios.get<Sheet>(`/sheets/${id}`);
            return data;
        } catch (error) {
            throw new Error("There was some error in loading the sheet.");
        }
    };

    return {
        fetchSheets,
        getSheetById
    }
}
