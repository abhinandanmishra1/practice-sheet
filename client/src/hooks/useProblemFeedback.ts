import { useMutation, useQueryClient } from "react-query";
import { useProblemFeedbackApi } from "../api/feedback";
import { FeedbackUpdateData } from "../types/feedback";

export const useUpdateProblemFeedback = (problemId: string) => {
    const queryClient = useQueryClient();
    const api = useProblemFeedbackApi();

    return useMutation({
        mutationFn: (data: FeedbackUpdateData) => api.updateProblemFeedback(problemId, data),
        onSuccess: () => {
            queryClient.invalidateQueries(["problem-feedback", problemId]);
        },
    });
}
