import { useMemo } from "react";
import { useParams } from "react-router-dom";
import {
  useHeatingActivityGroups,
  useHeatingActivityDetail,
} from "@/services/query/heating-ocr";
import { type HeatingField } from "@/services/query/heating-ocr/types";

export interface PlateGroup {
  id: string;
  groupName: string;
  invalidCount: number;
  heatNo: string;
  plateNo: string;
}

export function usePlateGroups() {
  const { id } = useParams<{ id: string }>();

  const { data: activity } = useHeatingActivityDetail(id);
  const { data: groups, isLoading, isFetching } = useHeatingActivityGroups(id);

  const mappedGroups = useMemo<PlateGroup[]>(() => {
    const allFields = activity?.data?.field;

    return (groups || []).map((group: string[], index: number) => {
      const [heatNo, plateNo] = Array.isArray(group) ? group : [group, ""];

      // Safely access fields for the current group index
      // We assume it's HeatingField[][] based on the Plate template structure
      const groupFields = Array.isArray(allFields?.[index])
        ? (allFields[index] as HeatingField[])
        : [];

      const invalidCount = groupFields.filter(
        (f) => f.is_valid === false,
      ).length;

      return {
        id: `${heatNo}-${plateNo}-${index}`,
        groupName: `Group #${index + 1}`,
        invalidCount,
        heatNo: heatNo || "N/A",
        plateNo: plateNo || "N/A",
      };
    });
  }, [groups, activity]);

  const totalInvalidCount = useMemo(
    () => mappedGroups.reduce((acc, g) => acc + g.invalidCount, 0),
    [mappedGroups],
  );

  const isEmpty = !isLoading && mappedGroups.length === 0;

  return {
    activity,
    groups: mappedGroups,
    totalInvalidCount,
    isLoading: isLoading || isFetching,
    isEmpty,
  };
}
