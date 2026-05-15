import { useQuery } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError, PaginatedResponse } from "../../api.types";
import type { ActivitySummaryModel } from "./types/usage.types";
import type { ChildActivityItem } from "./types/child-activities.types";
import { mapActivitySummary } from "@/pages/transmitter-ocr/lib/transmitter-mappers";
import { transmitterOcrKeys } from "./keys";

export const useActivitySummary = (childId?: string) => {
  return useQuery<
    PaginatedResponse<ChildActivityItem>,
    AxiosError<ApiError>,
    ActivitySummaryModel[]
  >({
    queryKey: transmitterOcrKeys.summary.list({ childId }),
    queryFn: async () => {
      const { data } = await transmitterApi.get<
        PaginatedResponse<ChildActivityItem>
      >("/transmitter_ocr/child_usage/activity", {
        params: { childId },
      });
      return data;
    },
    select: mapActivitySummary,
  });
};
