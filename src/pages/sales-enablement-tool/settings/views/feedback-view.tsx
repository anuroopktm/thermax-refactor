import { useState } from "react";
import { FeedbackHeader } from "../components/feedback/feedback-header";
import { FeedbackList } from "../components/feedback/feedback-list";
import { useFeedbacks } from "@/services/query/sales-enablement/feedback.service";
import { Loader2 } from "lucide-react";

export function FeedbackView() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: feedbacks = [], isLoading } = useFeedbacks();

  const filteredFeedback = feedbacks.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <FeedbackHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        count={filteredFeedback.length}
      />

      <FeedbackList feedbackItems={filteredFeedback} />
    </div>
  );
}
