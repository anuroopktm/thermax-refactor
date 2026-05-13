import type { UseFormReturn } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import type { FeedbackForm } from "@/pages/thermax-gpt/settings/validations/feedback.schema";

interface Feedback {
  id: number;
  user: string;
  question: string;
  answer: string;
  status: string;
  source?: string;
}

interface ReviewTabProps {
  form: UseFormReturn<FeedbackForm>;
  feedback: Feedback;
}

export function ReviewTab({ form, feedback }: ReviewTabProps) {
  return (
    <TabsContent value="review" className="space-y-6">
      <FieldGroup>
        <Field>
          <FieldLabel className="text-base font-semibold">
            Edit question
          </FieldLabel>
          <Textarea
            {...form.register("question")}
            className="min-h-[120px] resize-none"
            placeholder="Enter question..."
          />
        </Field>

        <Field>
          <FieldLabel className="text-base font-semibold">
            Edit answer
          </FieldLabel>
          <Textarea
            {...form.register("answer")}
            className="min-h-[120px] resize-none"
            placeholder="Enter answer..."
          />
        </Field>
      </FieldGroup>

      <div className="flex items-center gap-2">
        <span className="font-semibold text-sm">Source:</span>
        <Badge variant="outline" className="block">
          {feedback.source || "None"}
        </Badge>
      </div>
    </TabsContent>
  );
}
