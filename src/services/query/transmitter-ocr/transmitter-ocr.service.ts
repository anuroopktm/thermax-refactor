import { useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  ActivitySummaryItem,
  MasterActivityItem,
  ChildActivityItem,
  ActivityItemDetail,
  MasterDataRecord,
} from "./transmitter-ocr.types";

export const useActivitySummary = (childId?: string) => {
  return useQuery<ActivitySummaryItem[], AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "activity-summary", childId],
    queryFn: async () => {
      const { data } = await api.get<ActivitySummaryItem[]>(
        "/transmitter-ocr/activity-summary",
        { params: { childId } },
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

export const useChildActivities = (masterId?: string) => {
  return useQuery<ChildActivityItem[], AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "child-activities", masterId],
    queryFn: async () => {
      const { data } = await api.get<ChildActivityItem[]>(
        "/transmitter-ocr/child-activities",
        { params: { masterId } },
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

export const useMasterActivityRecords = (masterId?: string) => {
  return useQuery<MasterDataRecord[], AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "master-activity-records", masterId],
    enabled: !!masterId,
    queryFn: async () => {
      const { data } = await api.get<MasterDataRecord[]>(
        `/transmitter-ocr/master-activity-records/${masterId}`,
      );
      return data;
    },
  });
};
