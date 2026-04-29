import { useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  ActivitySummaryItem,
  MasterActivityItem,
  ChildActivityItem,
  ActivityItemDetail,
} from "./transmitter-ocr.types";

export const useActivitySummary = () => {
  return useQuery<ActivitySummaryItem[], AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "activity-summary"],
    queryFn: async () => {
      const { data } = await api.get<ActivitySummaryItem[]>(
        "/transmitter-ocr/activity-summary",
      );
      return data;
    },
  });
};

export const useMasterActivities = () => {
  return useQuery<MasterActivityItem[], AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "master-activities"],
    queryFn: async () => {
      const { data } = await api.get<MasterActivityItem[]>(
        "/transmitter-ocr/master-activities",
      );
      return data;
    },
  });
};

export const useChildActivities = () => {
  return useQuery<ChildActivityItem[], AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "child-activities"],
    queryFn: async () => {
      const { data } = await api.get<ChildActivityItem[]>(
        "/transmitter-ocr/child-activities",
      );
      return data;
    },
  });
};

export const useActivityItemDetail = (id?: string) => {
  return useQuery<ActivityItemDetail, AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "activity-item", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await api.get<ActivityItemDetail>(
        `/transmitter-ocr/activity-item/${id}`,
      );
      return data;
    },
  });
};
