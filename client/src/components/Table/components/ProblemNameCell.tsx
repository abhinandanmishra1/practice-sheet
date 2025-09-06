import { TableCellProps } from "@/types/problems";
import { TABLE_STYLES } from "@/constants/table";

export const ProblemNameCell = ({ isSolved, problemLink, value }: TableCellProps) => (
  <div className="w-full text-left">
    <a
      href={problemLink}
      target="_blank"
      className={`${TABLE_STYLES.link} ${isSolved ? TABLE_STYLES.completedLink : ""}`}
    >
      {value}
    </a>
  </div>
);
