import { useParams } from "react-router-dom";
import { memo, useMemo } from "react";
import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";

import {
  useHeatingActivityDetail,
  useHeatingUpdateActivity,
  useHeatingSubmitRejectActivity,
} from "@/services/query/heating-ocr";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { ActivityItemHeader } from "@/components/shared/ocr/activity-item-header";
import { ActivityPdfViewer } from "@/components/shared/ocr/activity-pdf-viewer";
import { ActivityItemForm } from "../components/activity-item/activity-item-form";

import {
  activityItemSchema,
  type ActivityItemFormValues,
} from "../validations/activity-item.schema";

import { deriveDefaultValues } from "@/lib/ocr-logic";
import {
  mapHeatingToFields,
  mapFieldsToHeatingUpdate,
} from "../lib/heating-mappers";
import {
  type HeatingActivityModel,
  type HeatingActivityUpdatePayload,
} from "@/services/query/heating-ocr/types";
import { type DynamicField } from "@/services/query/transmitter-ocr/types";

interface ActivityActionsProps {
  activity?: HeatingActivityModel;
  isUpdating: boolean;
  onStatusUpdate: (status: string) => void;
  onToggleActive: (value: string | null) => void;
}

interface ActivityContentProps {
  isLoading: boolean;
  fields: DynamicField[];
  form: UseFormReturn<ActivityItemFormValues>;
}

interface UseActivityActionsParams {
  activity?: HeatingActivityModel;
  form: UseFormReturn<ActivityItemFormValues>;
  updateActivity: (
    input: HeatingActivityUpdatePayload & { is_active?: boolean },
  ) => Promise<any>;
  submitRejectActivity: (status: string) => Promise<any>;
}

/* ---------------- Main View ---------------- */

export function ActivityItemView() {
  const { id } = useParams<{ id: string }>();

  const {
    data: activity,
    isLoading,
    isFetching,
  } = useHeatingActivityDetail(id);

  const { mutateAsync: updateActivity, isPending: isUpdating } =
    useHeatingUpdateActivity(id!);

  const { mutateAsync: submitRejectActivity } = useHeatingSubmitRejectActivity(
    id!,
  );

  const fields = useMemo(() => mapHeatingToFields(activity), [activity]);

  const defaultValues = useMemo(() => deriveDefaultValues(fields), [fields]);

  const form = useForm<ActivityItemFormValues>({
    resolver: zodResolver(activityItemSchema),
    values: defaultValues as ActivityItemFormValues,
  });

  const { handleStatusUpdate, handleToggleActive } = useActivityActions({
    activity,
    form,
    updateActivity,
    submitRejectActivity,
  });

  const title = activity?.title ?? "Loading...";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ActivityItemHeader
        title={title}
        onBack={() => {}}
        actions={
          <ActivityActions
            activity={activity}
            isUpdating={isUpdating}
            onStatusUpdate={handleStatusUpdate}
            onToggleActive={handleToggleActive}
          />
        }
      />

      <div className="flex-1 flex min-h-0 overflow-hidden">
        {/* PDF */}
        <div className="flex-[0.65] min-w-0 h-full border-r">
          <ActivityPdfViewer />
        </div>

        {/* Form */}
        <ActivityContent
          isLoading={isLoading || isFetching}
          fields={fields}
          form={form}
        />
      </div>
    </div>
  );
}

/* ---------------- Actions Hook ---------------- */

function useActivityActions({
  activity,
  form,
  updateActivity,
  submitRejectActivity,
}: UseActivityActionsParams) {
  const getPayload = () => mapFieldsToHeatingUpdate(activity, form.getValues());

  const handleStatusUpdate = async (status: string) => {
    try {
      await submitRejectActivity(status);
      toast.success(`Activity ${status.toLowerCase()} successfully`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleToggleActive = async (value: string | null) => {
    if (!value) return;
    try {
      await updateActivity({
        ...getPayload(),
        is_active: value === "enable",
      });
      toast.success(`Annotation ${value}d successfully`);
    } catch {
      toast.error("Failed to update annotation");
    }
  };

  return {
    handleStatusUpdate,
    handleToggleActive,
  };
}

/* ---------------- HEADER ACTIONS ---------------- */

const ANNOTATION_OPTIONS = [
  { label: "Enable", value: "enable" },
  { label: "Disable", value: "disable" },
];

const ActivityActions = memo(
  ({
    activity,
    isUpdating,
    onStatusUpdate,
    onToggleActive,
  }: ActivityActionsProps) => {
    return (
      <div className="flex items-center gap-6">
        {/* Annotation */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-muted-foreground">
            Annotation:
          </span>

          <Select
            value={activity?.is_active ? "enable" : "disable"}
            onValueChange={onToggleActive}
          >
            <SelectTrigger className="min-w-24 h-8 cursor-pointer">
              <SelectValue placeholder="Select">
                {(value) =>
                  ANNOTATION_OPTIONS.find((opt) => opt.value === value)
                    ?.label ?? value
                }
              </SelectValue>
            </SelectTrigger>

            <SelectContent className="min-w-24">
              {ANNOTATION_OPTIONS.map((opt) => (
                <SelectItem
                  key={opt.value}
                  value={opt.value}
                  className="cursor-pointer"
                >
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-muted-foreground">
            Status:
          </span>

          <Badge variant="warning" className="border-border h-8 rounded-lg">
            <Info />
            Invalid
          </Badge>
        </div>

        {/* Actions */}
        <Button
          onClick={() => onStatusUpdate("SUBMITTED")}
          disabled={isUpdating}
          className="cursor-pointer"
        >
          Submit
        </Button>

        <Button
          variant="destructive"
          onClick={() => onStatusUpdate("REJECTED")}
          disabled={isUpdating}
          className="cursor-pointer"
        >
          Reject
        </Button>
      </div>
    );
  },
);

ActivityActions.displayName = "ActivityActions";

/* ---------------- CONTENT ---------------- */

const ActivityContent = memo(
  ({ isLoading, fields, form }: ActivityContentProps) => {
    return (
      <div className="flex-[0.35] h-full flex flex-col bg-background">
        <ScrollArea className="flex-1 h-full">
          <div className="p-6 md:p-8">
            {isLoading ? (
              <SkeletonComponent />
            ) : (
              <ActivityItemForm fields={fields} form={form} />
            )}
          </div>
        </ScrollArea>
      </div>
    );
  },
);

ActivityContent.displayName = "ActivityContent";

/* ---------------- SKELETON ---------------- */

const SkeletonComponent = memo(() => {
  return (
    <div className="space-y-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
});

SkeletonComponent.displayName = "SkeletonComponent";
