import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FeedbackResponse, FeedbackUpdateData, ProblemFeedback } from '@/types/feedback';
import { useUpdateProblemFeedback } from '@/hooks/useProblemFeedback';
import { StarFilledIcon, StarIcon, BookmarkIcon, BookmarkFilledIcon } from '@radix-ui/react-icons';

interface ProblemFeedbackActionsProps {
  problemId: string;
  feedbackData?: ProblemFeedback;
}

export const ProblemFeedbackActions: React.FC<ProblemFeedbackActionsProps> = ({ problemId, feedbackData }) => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const updateFeedback = useUpdateProblemFeedback(problemId);
  const [formData, setFormData] = useState<FeedbackUpdateData>({
    bookmarked: feedbackData?.bookmarked || false,
    rating: feedbackData?.rating,
    hint: feedbackData?.hint || '',
    best_time_complexity: feedbackData?.best_time_complexity || '',
  });

  const handleToggleBookmark = async () => {
    if (!user?.id) return;
    try {
      const newBookmarked = !formData.bookmarked;
      setFormData(prev => ({ ...prev, bookmarked: newBookmarked }));
      await updateFeedback.mutateAsync({
        bookmarked: newBookmarked,
      });
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.id) return;
    try {
      await updateFeedback.mutateAsync(formData);
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => setFormData(prev => ({ ...prev, rating: i + 1 }))}
        className="text-yellow-400 hover:scale-110 transition-transform"
      >
        {i < (formData.rating || 0) ? <StarFilledIcon /> : <StarIcon />}
      </button>
    ));
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleBookmark}
        disabled={updateFeedback.isLoading}
        className={formData.bookmarked ? 'text-blue-500' : ''}
      >
        {formData.bookmarked ? <BookmarkFilledIcon /> : <BookmarkIcon />}
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm" disabled={!formData.bookmarked}>
            Details
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Problem Feedback</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="flex gap-1">{renderStars()}</div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="hint">Hint</Label>
              <Input
                id="hint"
                value={formData.hint}
                onChange={e => setFormData(prev => ({ ...prev, hint: e.target.value }))}
                placeholder="Add a helpful hint..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="timeComplexity">Best Time Complexity</Label>
              <Input
                id="timeComplexity"
                value={formData.best_time_complexity}
                onChange={e => setFormData(prev => ({ ...prev, best_time_complexity: e.target.value }))}
                placeholder="e.g., O(n log n)"
              />
            </div>

            <Button type="submit" disabled={updateFeedback.isLoading}>
              Save Changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};