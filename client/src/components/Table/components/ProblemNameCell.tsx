import { TableCellProps } from "@/types/problems";
import { TABLE_STYLES } from "@/constants/table";

export const ProblemNameCell = ({ isCompleted, problemLink, value }: TableCellProps) => (
  <div className="w-full text-left">
    <a
      href={problemLink}
      target="_blank"
      className={`${TABLE_STYLES.link} ${isCompleted ? TABLE_STYLES.completedLink : ""}`}
    >
      {value}
    </a>
  </div>
);
