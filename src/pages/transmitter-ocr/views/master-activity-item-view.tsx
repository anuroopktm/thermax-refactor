import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { MasterActivityItemHeader } from "../components/master-activity-item/master-activity-item-header";
import { MasterDataTable } from "../components/master-activity-item/master-data-table";
import { useMasterActivityRecords } from "@/services/query/transmitter-ocr/transmitter-ocr.service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { type MasterDataRecord } from "@/services/query/transmitter-ocr/transmitter-ocr.types";

interface FormValues {
  records: MasterDataRecord[];
}

export function MasterActivityItemView() {
  const { id } = useParams<{ id: string }>();
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

  const handleGlobalUnitChange = (unit: string) => {
    const currentRecords = getValues("records");
    currentRecords.forEach((_, index) => {
      setValue(`records.${index}.unit`, unit);
    });
  };

  const handleSave = (data: FormValues) => {
    console.log("Saving records:", data.records);
    // Here you would call your API to save the data
  };

  const itemName = initialRecords?.[0]
    ? "Gauges Test 1 27-04-26"
    : "Loading..."; // Mock title for now

  return (
    <>
      <MasterActivityItemHeader
        itemName={itemName}
        onGlobalUnitChange={handleGlobalUnitChange}
        onSave={() => handleSave(getValues())}
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
