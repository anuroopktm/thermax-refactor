import { useQuery } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { ChildActivityItem, ChildActivityResponse } from "./types";
import { mapChildActivitiesResponse } from "@/pages/transmitter-ocr/lib/transmitter-mappers";
import { type ActivityItem } from "@/components/shared/ocr/activity-card";

export const useChildActivities = (masterId?: string) => {
  return useQuery<ChildActivityItem[], AxiosError<ApiError>, ActivityItem[]>({
    queryKey: ["transmitter-ocr", "child-activities", masterId],
    queryFn: async () => {
      const { data } = await transmitterApi.get("/child_activity", {
        params: { masterId },
      });
      return data;
    },
    select: mapChildActivitiesResponse,
  });
};

export const useActivityItemDetail = (id?: string) => {
  return useQuery<
    ChildActivityResponse,
    AxiosError<ApiError>,
    ChildActivityItem
  >({
    queryKey: ["transmitter-ocr", "activity-item", id],
    queryFn: async () => {
      const { data } = await transmitterApi.get<any>(`/child_activity/${id}`);
      return data;
    },
    enabled: !!id,
  });
};
