export const PAGE_LIMIT = 10;

export const TABLE_STYLES = {
  container: "min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-6 min-w-full",
  card: "w-full bg-white/80 backdrop-blur-sm shadow-xl",
  cardContent: "flex flex-col justify-between h-full relative space-y-6 w-full",
  headerRow: "bg-gray-50/50",
  headerCell: "text-center font-semibold text-gray-700",
  row: "hover:bg-gray-50/50 transition-colors duration-200",
  cell: "text-center py-4",
  link: "text-lg font-medium hover:text-indigo-600 transition-colors",
  completedLink: "text-gray-500 line-through",
  actionButton: "flex items-center gap-2 px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors duration-200 text-sm font-medium",
  loadingContainer: "w-full flex justify-center p-12",
  emptyState: "text-center py-12 text-gray-500"
} as const;
