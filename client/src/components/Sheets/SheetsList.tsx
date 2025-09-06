import { useNavigate } from 'react-router-dom';
import { useSheets } from '@/hooks/useSheets';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';

export const SheetsList = () => {
  const { data: sheets, isLoading, error } = useSheets();
  const navigate = useNavigate();

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">
      <Loader />
    </div>;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error loading sheets. Please try again later.</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Practice Sheets</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sheets?.map((sheet) => (
          <Card key={sheet.id} className="p-6">
            <h2 className="text-xl font-semibold mb-2">{sheet.name}</h2>
            <p className="text-gray-600 mb-4 line-clamp-2">{sheet.description}</p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">
                Created: {new Date(sheet.createdAt).toLocaleDateString()}
              </span>
            </div>
            <Button 
              onClick={() => navigate(`/sheets/${sheet.id}`)}
              className="w-full"
            >
              View Problems
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
