import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  MasterActivitiesItem,
  MasterActivitiesResponse,
  MasterActivityItem,
  MasterActivityResponse,
  MasterDataItem,
} from "./types";
import { transmitterOcrKeys } from "./keys";

export const useMasterActivities = () => {
  return useQuery<
    MasterActivitiesResponse,
    AxiosError<ApiError>,
    MasterActivitiesItem[]
  >({
    queryKey: transmitterOcrKeys.master.activities.list(),
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        "/transmitter_ocr/master_activity",
      );
      return data;
    },
    select: ({ result }) => result,
  });
};

export const useMasterActivity = (id?: string | number) => {
  return useQuery<
    MasterActivityResponse,
    AxiosError<ApiError>,
    MasterActivityItem
  >({
    queryKey: transmitterOcrKeys.master.activities.detail(id),
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        `/transmitter_ocr/master_activity/${id}`,
      );
      return data;
    },
    enabled: !!id,
  });
};

export const useCreateMasterActivity = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData: FormData) => {
      await transmitterApi.post("/transmitter_ocr/master_activity", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transmitterOcrKeys.master.activities.all,
      });
    },
  });
};

export const useUpdateMasterActivity = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData: FormData) => {
      await transmitterApi.patch(
        `/transmitter_ocr/master_activity/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transmitterOcrKeys.master.activities.all,
      });
    },
  });
};

export const useDeleteMasterActivity = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await transmitterApi.delete(`/transmitter_ocr/master_activity/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transmitterOcrKeys.master.activities.all,
      });
    },
  });
};

export const useUpdateMasterData = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<ApiError>,
    { records: Record<string, MasterDataItem>[] }
  >({
    mutationFn: async (data: { records: Record<string, MasterDataItem>[] }) => {
      await transmitterApi.patch(`/transmitter_ocr/master_activity/${id}`, {
        master_data: data.records,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transmitterOcrKeys.master.activities.detail(id),
      });
    },
  });
};
