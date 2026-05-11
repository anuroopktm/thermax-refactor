import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  MasterActivityItem,
  ChildActivityItem,
  ActivityItemDetail,
  MasterDataRecord,
} from "./types";
import {
  mapMasterActivitiesResponse,
  mapChildActivitiesResponse,
  mapMasterDataRecords,
  extractResult,
} from "@/pages/transmitter-ocr/lib/transmitter-mappers";
import { type ActivityItem } from "@/components/shared/ocr/activity-card";

export const useMasterActivities = () => {
  return useQuery<MasterActivityItem[], AxiosError<ApiError>, ActivityItem[]>({
    queryKey: ["transmitter-ocr", "master-activities"],
    queryFn: async () => {
      const { data } = await transmitterApi.get("/master_activity");
      return data;
    },
    select: mapMasterActivitiesResponse,
  });
};

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
  return useQuery<ActivityItemDetail, AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "activity-item", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await transmitterApi.get<any>(
        `/child_activity/${id}/details`,
      );
      return data.result?.[0] || data.result || data;
    },
  });
};

export const useMasterActivity = (id?: string) => {
  return useQuery<MasterActivityItem, AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "master-activity", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await transmitterApi.get(`/master_activity/${id}`);
      return data;
    },
  });
};

export const useMasterActivityRecords = (masterId?: string) => {
  return useQuery<MasterDataRecord[], AxiosError<ApiError>, MasterDataRecord[]>(
    {
      queryKey: ["transmitter-ocr", "master-activity-records", masterId],
      enabled: !!masterId,
      queryFn: async () => {
        const { data } = await transmitterApi.get(
          `/master_activity/${masterId}`,
        );
        return data;
      },
      select: mapMasterDataRecords,
    },
  );
};

export const useCreateMasterActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData: FormData) => {
      await transmitterApi.post("/master_activity", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transmitter-ocr", "master-activities"],
      });
    },
  });
};

export const useUpdateMasterActivity = (id: string) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData: FormData) => {
      await transmitterApi.patch(`/master_activity/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transmitter-ocr", "master-activities"],
      });
      queryClient.invalidateQueries({
        queryKey: ["transmitter-ocr", "master-activity", id],
      });
    },
  });
};

export const useDeleteMasterActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string>({
    mutationFn: async (id: string) => {
      await transmitterApi.delete(`/master_activity/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transmitter-ocr", "master-activities"],
      });
    },
  });
};
