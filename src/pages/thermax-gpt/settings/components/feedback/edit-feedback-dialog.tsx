import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  feedbackSchema,
  type FeedbackForm,
} from "@/pages/thermax-gpt/settings/validations/feedback.schema";
import { FeedbackTab } from "./components/feedback-tab";
import { ReviewTab } from "./components/review-tab";
import { EditFeedbackFooter } from "./components/edit-feedback-footer";

export interface Feedback {
  id: number;
  user: string;
  question: string;
  answer: string;
  status: string;
  source?: string;
}

interface EditFeedbackDialogProps {
  feedback: Feedback;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditFeedbackDialog({
  feedback,
  open,
  onOpenChange,
}: EditFeedbackDialogProps) {
  const [activeTab, setActiveTab] = useState("feedback");

  const form = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      question: feedback.question,
      answer: feedback.answer,
      status: feedback.status,
      source: feedback.source || "",
    },
  });

  const onSubmit = (data: FeedbackForm) => {
    console.log("Saving feedback:", data);
    // Here you would typically call an API to update the feedback
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Feedback</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="h-10! gap-6 bg-transparent">
            <TabsTrigger
              value="feedback"
              className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary"
            >
              Feedback
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary"
            >
              Review
            </TabsTrigger>
          </TabsList>

          <form id="edit-feedback-form" onSubmit={form.handleSubmit(onSubmit)}>
            <FeedbackTab form={form} feedback={feedback} />
            <ReviewTab form={form} feedback={feedback} />
          </form>
        </Tabs>
        <EditFeedbackFooter
          activeTab={activeTab}
          onNext={() => setActiveTab("review")}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
