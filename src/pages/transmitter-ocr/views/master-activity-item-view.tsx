import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { MasterActivityItemHeader } from "../components/activity-item/master/master-activity-item-header";
import { MasterDataTable } from "../components/activity-item/master/master-data-table";
import {
  useMasterActivityRecords,
  useMasterActivity,
} from "@/services/query/transmitter-ocr";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { type MasterDataRecord } from "@/services/query/transmitter-ocr/types";

interface FormValues {
  records: MasterDataRecord[];
}

export function MasterActivityItemView() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: activity } = useMasterActivity(id);
  const { data: initialRecords, isLoading } = useMasterActivityRecords(id);

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
    if (initialRecords) {
      reset({ records: initialRecords });
    }
  }, [initialRecords, reset]);

  const handleGlobalUnitChange = (unit: string | null) => {
    const currentRecords = getValues("records");
    currentRecords.forEach((_, index) => {
      if (unit) {
        setValue(`records.${index}.unit`, unit);
      }
    });
  };

  const handleSave = (data: FormValues) => {
    console.log("Saving records:", data.records);
    // Here you would call your API to save the data
  };

  const itemName = activity?.title || "Loading...";

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
