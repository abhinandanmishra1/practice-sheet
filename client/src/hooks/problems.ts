import { useMutation, useQuery, useQueryClient } from "react-query";
import { useProblemsApi } from "../api/problems";
import { useProblemTableContext } from "../context/ProblemsTableContext/ProblemsTableContext";
import { useUser } from "@clerk/clerk-react";

interface UseFetchProblemsProps {
  sheetId?: string;
}

export const useFetchProblems = ({ sheetId }: UseFetchProblemsProps = {}) => {
  const { user } = useUser();
  const { limit, offset } = useProblemTableContext();
  const api = useProblemsApi();

  const problemsQuery = useQuery({
    queryKey: ["problems", limit, offset, sheetId],
    queryFn: () => api.fetchProblems(offset, limit, sheetId),
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
  const { limit, offset } = useProblemTableContext();
  const queryClient = useQueryClient();
  const api = useProblemsApi();

  return useMutation({
    mutationFn: api.toggleProblemSolved,
    onSuccess: () => {
      queryClient.refetchQueries(["problems", limit, offset])
    },
  });
};
