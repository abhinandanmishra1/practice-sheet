import { useParams, useNavigate } from 'react-router-dom';
import { useSheetById, useSheets } from '@/hooks/useSheets';
import { Table } from '@/components/Table';
import { useProblemsTable } from '@/hooks/useProblemsTable';
import { Loader } from '@/components/Loader';
import { Button } from '@/components/ui/button';

export const SheetProblems = () => {
  const { sheetId } = useParams<{ sheetId: string }>();
  const navigate = useNavigate();

  const { data: sheet, isLoading: isSheetLoading, error: sheetError } = useSheetById(sheetId);

  if (!sheetId) {
    return (
      <div className="container mx-auto py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sheet not found</h1>
          <Button onClick={() => navigate('/')}>
            Go Back to Sheets
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{sheet?.name}</h1>
        </div>
        <Button onClick={() => navigate('/')}>
          Back to Sheets
        </Button>
      </div>
      <Table sheetId={sheetId} />
    </div>
  );
};