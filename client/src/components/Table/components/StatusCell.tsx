import { CheckCircle2, Circle } from "lucide-react";
import { TableCellProps } from "@/types/problems";
import { useToggleProblemSolved } from "@/hooks/problems";
import { useState } from "react";

export const StatusCell = ({ problemId, isSolved }: TableCellProps) => {
  const [solved, setSolved] = useState(isSolved);
  const toggleProblemSolveMutation = useToggleProblemSolved();

  const onToggle = () => {
    if (!problemId) return;

    toggleProblemSolveMutation.mutate(problemId);
    setSolved(!solved);
  }

  return <div className="h-full flex justify-center items-center">
    <button
      onClick={onToggle}
      className="transition-colors duration-200"
    >
      {solved ? (
        <CheckCircle2 className="w-6 h-6 text-green-500 hover:text-green-600" />
      ) : (
        <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
      )}
    </button>
  </div>
}
