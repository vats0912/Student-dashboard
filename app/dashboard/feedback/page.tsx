'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function FeedbackForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feedback.trim()) {
      toast({ description: 'Please write some feedback.' });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api1/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: session?.user?.email,
          feedback,
        }),
      });

      if (res.ok) {
        toast({ description: '✅ Thank you for your feedback!' });
        setFeedback('');
        setTimeout(() => router.push('/dashboard'), 1500);
      } else {
        toast({ description: ' Failed to submit feedback.' });
      }
    } catch {
      toast({ description: ' Error submitting feedback.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-xl shadow-lg rounded-2xl border border-gray-500">
        <CardContent className="p-6 space-y-6">
     
          <header>
            <h2 className="text-2xl font-bold text-gray-800"> Submit Feedback</h2>
            <p className="text-sm text-gray-500">
              Help us improve your student dashboard experience.
            </p>
          </header>

         
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="feedback">Your Feedback</Label>
              <Textarea
                id="feedback"
                placeholder="Share your thoughts, suggestions, or report an issue..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                disabled={loading}
                className="h-32"
                aria-label="Feedback text area"
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
              aria-label="Submit feedback"
            >
              {loading ? 'Submitting...' : 'Submit Feedback'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
