import { useState } from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { EditFeedbackDialog } from "./edit-feedback-dialog";
import { getInitials } from "@/lib/utils";

interface FeedbackItem {
  id: number;
  user: string;
  question: string;
  answer: string;
  status: string;
  source?: string;
}

interface FeedbackCardProps {
  feedback: FeedbackItem;
}

export function FeedbackCard({ feedback }: FeedbackCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Card
        className="cursor-pointer hover:bg-muted transition-colors"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardContent className="flex items-start gap-4">
          <Avatar className="size-10">
            <AvatarFallback className="font-medium">
              {getInitials(feedback.user)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-base font-medium line-clamp-2">
              {feedback.question}
            </p>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {feedback.answer}
            </p>
          </div>
        </CardContent>
      </Card>

      <EditFeedbackDialog
        feedback={feedback}
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
}
