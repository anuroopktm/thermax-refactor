import type { UseFormReturn } from "react-hook-form";
import { TabsContent } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import type { FeedbackForm } from "@/pages/sales-enablement-tool/settings/validations/feedback.schema";

interface ReviewTabProps {
  form: UseFormReturn<FeedbackForm>;
}

export function ReviewTab({ form }: ReviewTabProps) {
  return (
    <TabsContent value="review">
      <FieldGroup>
        <Field>
          <FieldLabel>Edit question</FieldLabel>
          <Textarea
            {...form.register("question")}
            className="h-[15vh] resize-none"
            placeholder="Enter question..."
          />
        </Field>

        <Field>
          <FieldLabel>Edit answer</FieldLabel>
          <Textarea
            {...form.register("answer")}
            className="h-[40vh] resize-none"
            placeholder="Enter answer..."
          />
        </Field>
      </FieldGroup>
    </TabsContent>
  );
}
