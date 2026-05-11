import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  MasterActivitiesItem,
  MasterActivitiesResponse,
  MasterActivity,
  MasterActivityResponse,
} from "./types/master-activities.types";

export const useMasterActivities = () => {
  return useQuery<
    MasterActivitiesResponse,
    AxiosError<ApiError>,
    MasterActivitiesItem[]
  >({
    queryKey: ["transmitter-ocr", "master-activities"],
    queryFn: async () => {
      const { data } = await transmitterApi.get("/master_activity");
      return data;
    },
    select: ({ result }) => result,
  });
};

export const useMasterActivity = (id?: string) => {
  return useQuery<MasterActivityResponse, AxiosError<ApiError>, MasterActivity>(
    {
      queryKey: ["transmitter-ocr", "master-activity", id],
      queryFn: async () => {
        const { data } = await transmitterApi.get(`/master_activity/${id}`);
        return data;
      },
      enabled: !!id,
    },
  );
};

export const useCreateMasterActivity = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData: FormData) =>
      await transmitterApi.post("/master_activity", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
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
    mutationFn: async (formData: FormData) =>
      await transmitterApi.patch(`/master_activity/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
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
    mutationFn: async (id: string) =>
      await transmitterApi.delete(`/master_activity/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transmitter-ocr", "master-activities"],
      });
    },
  });
};
