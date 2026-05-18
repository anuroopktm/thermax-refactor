import { useState } from "react";
import { FeedbackHeader } from "../components/feedback/feedback-header";
import { FeedbackList } from "../components/feedback/feedback-list";
import { AddFaqDialog } from "../components/feedback/add-faq-dialog";
import { useDrConbotFaqs } from "@/services/query/dr-conbot/faq.service";
import { Loader2 } from "lucide-react";

export function FeedbackView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);

  const { data: faqs = [], isLoading } = useDrConbotFaqs(0, 100, searchQuery);

  return (
    <div className="space-y-6">
      <FeedbackHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        count={faqs.length}
        onUploadClick={() => setIsUploadDialogOpen(true)}
      />

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="size-8 animate-spin text-primary" />
        </div>
      ) : (
        <FeedbackList feedbackItems={faqs} />
      )}

      <AddFaqDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />
    </div>
  );
}
