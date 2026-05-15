import { useQuery } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  ChildActivityItem,
  ChildActivityResponse,
  ChildActivitiesResponse,
} from "./types";
import { mapChildActivitiesResponse } from "@/pages/transmitter-ocr/lib/transmitter-mappers";
import { type ActivityItem } from "@/components/shared/ocr/activity-card";
import { transmitterOcrKeys } from "./keys";

export const useChildActivities = (masterId?: string | number) => {
  return useQuery<
    ChildActivitiesResponse,
    AxiosError<ApiError>,
    ActivityItem[]
  >({
    queryKey: transmitterOcrKeys.child.activities.list(),
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        "/transmitter_ocr/child_activity",
        {
          params: { masterId },
        },
      );
      return data;
    },
    select: mapChildActivitiesResponse,
  });
};

export const useActivityItemDetail = (id?: string | number) => {
  return useQuery<
    ChildActivityResponse,
    AxiosError<ApiError>,
    ChildActivityItem
  >({
    queryKey: transmitterOcrKeys.child.activities.detail(id),
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        `/transmitter_ocr/child_activity/${id}`,
      );
      return data;
    },
    enabled: !!id,
  });
};
