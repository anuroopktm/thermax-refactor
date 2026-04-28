import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FeedbackCard } from "./feedback-card";

interface FeedbackItem {
  id: number;
  user: string;
  question: string;
  answer: string;
  status: string;
  source?: string;
}

interface FeedbackListProps {
  feedbackItems: FeedbackItem[];
}

export function FeedbackList({ feedbackItems }: FeedbackListProps) {
  const notReviewed = feedbackItems.filter((f) => f.status === "Not Specified");
  const inReview = feedbackItems.filter((f) => f.status === "in-review");
  const approved = feedbackItems.filter((f) => f.status === "approved");
  const rejected = feedbackItems.filter((f) => f.status === "rejected");

  return (
    <Tabs defaultValue="not-reviewed" className="w-full space-y-6">
      <TabsList className="h-10! gap-6 bg-transparent">
        <TabsTrigger
          value="not-reviewed"
          className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary font-semibold"
        >
          Not Reviewed
          <Badge variant="secondary" className="rounded-sm">
            {notReviewed.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="in-review"
          className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary font-semibold"
        >
          In Review
          <Badge
            variant="secondary"
            className="ml-2 block font-bold rounded-sm"
          >
            {inReview.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="approved"
          className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary font-semibold"
        >
          Approved
          <Badge
            variant="secondary"
            className="ml-2 block font-bold rounded-sm"
          >
            {approved.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="rejected"
          className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary font-semibold"
        >
          Rejected
          <Badge
            variant="secondary"
            className="ml-2 block font-bold rounded-sm"
          >
            {rejected.length}
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="not-reviewed" className="space-y-4">
        {notReviewed.map((item) => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
        {notReviewed.length === 0 && <EmptyState message="No feedback yet." />}
      </TabsContent>

      <TabsContent value="in-review">
        {inReview.map((item) => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
        {inReview.length === 0 && (
          <EmptyState message="No feedback in review." />
        )}
      </TabsContent>

      <TabsContent value="approved">
        {approved.map((item) => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
        {approved.length === 0 && (
          <EmptyState message="No approved feedback." />
        )}
      </TabsContent>

      <TabsContent value="rejected">
        {rejected.map((item) => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
        {rejected.length === 0 && (
          <EmptyState message="No rejected feedback." />
        )}
      </TabsContent>
    </Tabs>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="py-20 text-center border-2 border-dashed rounded-xl border-muted">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
}
