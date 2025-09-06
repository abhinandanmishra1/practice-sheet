import { ExternalLink } from "lucide-react";
import { TableCellProps } from "@/types/problems";
import { TABLE_STYLES } from "@/constants/table";

export const ActionCell = ({ problemLink }: TableCellProps) => (
  <div className="flex justify-center">
    <a
      href={problemLink}
      target="_blank"
      rel="noopener noreferrer"
      className={TABLE_STYLES.actionButton}
    >
      <ExternalLink className="w-4 h-4" />
      Solve
    </a>
  </div>
);
