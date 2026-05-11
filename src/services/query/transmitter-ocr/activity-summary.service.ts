import { useQuery } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { ActivitySummaryItem } from "./types/usage.types";
import { extractResult } from "@/pages/transmitter-ocr/lib/transmitter-mappers";

export const useActivitySummary = (childId?: string) => {
  return useQuery<ActivitySummaryItem[], AxiosError<ApiError>, any>({
    queryKey: ["transmitter-ocr", "activity-summary", childId],
    queryFn: async () => {
      const { data } = await transmitterApi.get("/child_usage/activity", {
        params: { childId },
      });
      return data;
    },
    select: (data) => extractResult<ActivitySummaryItem>(data),
  });
};
