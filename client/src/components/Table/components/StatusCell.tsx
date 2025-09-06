import { CheckCircle2, Circle } from "lucide-react";
import { TableCellProps } from "@/types/problems";

export const StatusCell = ({ isCompleted, onToggle }: TableCellProps) => (
  <div className="h-full flex justify-center items-center">
    <button
      onClick={onToggle}
      className="transition-colors duration-200"
    >
      {isCompleted ? (
        <CheckCircle2 className="w-6 h-6 text-green-500 hover:text-green-600" />
      ) : (
        <Circle className="w-6 h-6 text-gray-300 hover:text-gray-400" />
      )}
    </button>
  </div>
);
