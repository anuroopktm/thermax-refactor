import { useMemo, useState } from "react";
import debounce from "lodash.debounce";
import { Loader2 } from "lucide-react";

import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { useFeedbacks } from "@/services/query/sales-enablement/feedback.service";

import { FeedbackHeader } from "../components/feedback/feedback-header";
import { FeedbackList } from "../components/feedback/feedback-list";

export function FeedbackView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { data: feedbacks = [], isLoading } = useFeedbacks({
    search_term: debouncedSearch || undefined,
    skip: 0,
    limit: 100,
  });

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 500),
    [],
  );

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    debouncedSetSearch(value);
  };

  if (isLoading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <FeaturePageLayout
      className="p-0!"
      title="Feedback"
      description={
        isLoading
          ? "Loading feedbacks..."
          : `Showing ${feedbacks?.length ?? 0} feedbacks`
      }
      actions={
        <FeedbackHeader
          searchTerm={searchQuery}
          onSearchChange={handleSearchChange}
        />
      }
    >
      <FeedbackList feedbackItems={feedbacks} />
    </FeaturePageLayout>
  );
}
