import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { MasterActivityItemHeader } from "../components/activity-item/master/master-activity-item-header";
import { MasterDataTable } from "../components/activity-item/master/master-data-table";
import {
  useMasterActivity,
  useUpdateMasterData,
} from "@/services/query/transmitter-ocr/master-activities.service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import type { MasterDataItem } from "@/services/query/transmitter-ocr/types";
import { toast } from "sonner";

interface FormValues {
  records: Record<string, MasterDataItem>[];
}

export function MasterActivityItemView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useMasterActivity(id);
  const { mutateAsync } = useUpdateMasterData(id || 0);

  const { control, register, reset, setValue, getValues } = useForm<FormValues>(
    {
      defaultValues: {
        records: [],
      },
    },
  );

  const { fields } = useFieldArray({
    control,
    name: "records",
  });

  useEffect(() => {
    if (data?.master_data) {
      reset({ records: data.master_data });
    }
  }, [data?.master_data, reset]);

  const handleGlobalUnitChange = (unit: string | null) => {
    const currentRecords = getValues("records");
    currentRecords.forEach((record, index) => {
      const key = Object.keys(record)[0];

      if (unit && key) {
        setValue(`records.${index}.${key}.Calibration Range Unit`, unit);
      }
    });
  };

  const handleSave = (data: FormValues) => {
    toast.promise(mutateAsync(data), {
      loading: "Saving...",
      success: "Saved successfully",
      error: "Failed to save",
    });
  };

  const itemName = data?.title || "Loading...";

  return (
    <>
      <MasterActivityItemHeader
        itemName={itemName}
        onGlobalUnitChange={handleGlobalUnitChange}
        onSave={() => handleSave(getValues())}
        onBack={() => navigate(-1)}
      />

      <div className="p-4 md:p-8 space-y-6">
        {/* Alert */}
        <Alert className="bg-amber-50 border-amber-200 text-amber-800">
          <AlertTriangle className="size-4 text-amber-600" />
          <AlertDescription className="font-medium">
            Verify data accuracy before creating child activity.
          </AlertDescription>
        </Alert>

        {/* Table */}
        <MasterDataTable
          fields={fields}
          register={register}
          isLoading={isLoading}
        />
      </div>
    </>
  );
}
