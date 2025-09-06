import { useAxios } from "../axiosClient";

export const useProblemsApi = () => {
  const axios = useAxios();

  const fetchProblems = async (offset = 0, limit = 20) => {
    try {
      const { data } = await axios.get("/problems", {
        params: {
          limit,
          offset,
        },
      });
      return data;
    } catch (error) {
      throw new Error("There was some error in loading the problems.");
    }
  };

  const toggleProblemSolved = async (problemId: string) => {
    try {
      const { data } = await axios.post("/solved/toggle", { problemId });
      return data;
    } catch (error) {
      throw new Error("Failed to update problem status");
    }
  };

  return {
    fetchProblems,
    toggleProblemSolved,
  };
};
