import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FeedbackCard } from "./feedback-card";
import { type FaqModel } from "@/services/query/dr-conbot/types";

interface FeedbackListProps {
  feedbackItems: FaqModel[];
}

export function FeedbackList({ feedbackItems }: FeedbackListProps) {
  const notReviewed = feedbackItems.filter((f) => f.status === "Not Specified");
  const inReview = feedbackItems.filter((f) => f.status === "in-review");
  const approved = feedbackItems.filter((f) => f.status === "approved");
  const rejected = feedbackItems.filter((f) => f.status === "rejected");

  return (
    <Tabs defaultValue="approved" className="w-full space-y-6">
      <TabsList className="h-10! gap-6 bg-transparent">
        <TabsTrigger
          value="approved"
          className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary font-semibold"
        >
          Processed
          <Badge
            variant="secondary"
            className="ml-2 block font-bold rounded-sm"
          >
            {approved.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="in-review"
          className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary font-semibold"
        >
          Processing
          <Badge
            variant="secondary"
            className="ml-2 block font-bold rounded-sm"
          >
            {inReview.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="rejected"
          className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary font-semibold"
        >
          Failed
          <Badge
            variant="secondary"
            className="ml-2 block font-bold rounded-sm"
          >
            {rejected.length}
          </Badge>
        </TabsTrigger>
        <TabsTrigger
          value="not-reviewed"
          className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary font-semibold"
        >
          Other
          <Badge variant="secondary" className="rounded-sm">
            {notReviewed.length}
          </Badge>
        </TabsTrigger>
      </TabsList>

      <TabsContent value="approved" className="space-y-4">
        {approved.map((item) => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
        {approved.length === 0 && (
          <EmptyState message="No processed FAQ documents." />
        )}
      </TabsContent>

      <TabsContent value="in-review" className="space-y-4">
        {inReview.map((item) => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
        {inReview.length === 0 && (
          <EmptyState message="No documents are currently processing." />
        )}
      </TabsContent>

      <TabsContent value="rejected" className="space-y-4">
        {rejected.map((item) => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
        {rejected.length === 0 && (
          <EmptyState message="No failed FAQ documents." />
        )}
      </TabsContent>

      <TabsContent value="not-reviewed" className="space-y-4">
        {notReviewed.map((item) => (
          <FeedbackCard key={item.id} feedback={item} />
        ))}
        {notReviewed.length === 0 && (
          <EmptyState message="No other FAQ documents." />
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
