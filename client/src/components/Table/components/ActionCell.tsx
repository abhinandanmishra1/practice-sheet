import { ExternalLink } from "lucide-react";
import { TableCellProps } from "@/types/problems";
import { TABLE_STYLES } from "@/constants/table";
import { ProblemFeedbackActions } from "./ProblemFeedbackActions";

export const ActionCell = ({ problemLink, problemId, feedbackData }: TableCellProps) => (
  <div className="flex justify-center gap-2">
    <a
      href={problemLink}
      target="_blank"
      rel="noopener noreferrer"
      className={TABLE_STYLES.actionButton}
    >
      <ExternalLink className="w-4 h-4" />
      Solve
    </a>
    <ProblemFeedbackActions problemId={problemId as string} feedbackData={feedbackData} />
  </div>
);
