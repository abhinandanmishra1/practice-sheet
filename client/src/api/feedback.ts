import { useAxios } from '@/axiosClient';
import { FeedbackResponse, FeedbackUpdateData } from '../types/feedback';

export const useProblemFeedbackApi = () => {
  const axios = useAxios();

  const getProblemFeedback = async (userId: string, problemId: string): Promise<FeedbackResponse> => {
    try {
      const response = await axios.get(`/feedback/${userId}/${problemId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const updateProblemFeedback = async (
    problemId: string,
    data: FeedbackUpdateData
  ): Promise<FeedbackResponse> => {
    try {
      const response = await axios.put(`/feedback/${problemId}`, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  return {
    getProblemFeedback,
    updateProblemFeedback,
  }
}
