export interface ProblemFeedback {
  _id?: string;
  user_id: string;
  problem_id: string;
  bookmarked: boolean;
  rating?: number;
  hint?: string;
  best_time_complexity?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface FeedbackUpdateData {
  bookmarked?: boolean;
  rating?: number;
  hint?: string;
  best_time_complexity?: string;
}

export interface FeedbackResponse {
  success: boolean;
  data: ProblemFeedback | null;
  message?: string;
}
