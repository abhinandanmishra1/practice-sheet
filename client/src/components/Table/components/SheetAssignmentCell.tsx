import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useSheets, useProblemSheets, useAddProblemToSheet, useRemoveProblemFromSheet } from '@/hooks/useSheets';
import { Sheet } from '@/types/sheets';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';

interface SheetAssignmentCellProps {
  problemId: string;
}

export const SheetAssignmentCell: React.FC<SheetAssignmentCellProps> = ({ problemId }) => {
  const { data: sheetsData } = useSheets();
  const { data: problemSheetsData } = useProblemSheets(problemId);
  const addToSheet = useAddProblemToSheet();
  const removeFromSheet = useRemoveProblemFromSheet();

  const assignedSheetIds = new Set(problemSheetsData?.data.map(sheet => sheet._id));

  const handleSheetToggle = async (sheet: Sheet) => {
    try {
      if (assignedSheetIds.has(sheet._id)) {
        await removeFromSheet.mutateAsync({ sheetId: sheet._id, problemId });
      } else {
        await addToSheet.mutateAsync({ sheetId: sheet._id, problemId });
      }
    } catch (error) {
      console.error('Error toggling sheet assignment:', error);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            Assign to Sheets ({assignedSheetIds.size})
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign to Sheets</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {sheetsData?.data.map(sheet => (
                <div key={sheet._id} className="flex items-center space-x-2">
                  <Checkbox
                    id={sheet._id}
                    checked={assignedSheetIds.has(sheet._id)}
                    onCheckedChange={() => handleSheetToggle(sheet)}
                    disabled={addToSheet.isLoading || removeFromSheet.isLoading}
                  />
                  <Label htmlFor={sheet._id}>{sheet.name}</Label>
                </div>
              ))}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};
