import { useMutation, useQuery, useQueryClient } from "react-query";
import { useProblemsApi } from "../api/problems";
import { useProblemTableContext } from "../context/ProblemsTableContext/ProblemsTableContext";
import { useUser } from "@clerk/clerk-react";

export const useFetchProblems = () => {
  const { user } = useUser();
  const { limit, offset } = useProblemTableContext();
  const api = useProblemsApi();

  const problemsQuery = useQuery({
    queryKey: ["problems", limit, offset],
    queryFn: () => api.fetchProblems(offset, limit),
    onError: (error) => {
      console.error("Error fetching problems:", error);
    },
    enabled: !!user,
  });


  return {
    ...problemsQuery,
  };
};

export const useToggleProblemSolved = () => {
  const queryClient = useQueryClient();
  const api = useProblemsApi();

  return useMutation({
    mutationFn: api.toggleProblemSolved,
    onSuccess: () => {
      // Invalidate and refetch solved problems
      queryClient.invalidateQueries(["solved-problems"]);
    },
  });
};
