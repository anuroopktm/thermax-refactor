import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  MasterActivitiesItem,
  MasterActivitiesResponse,
  MasterActivityItem,
  MasterActivityResponse,
} from "./types";

export const useMasterActivities = () => {
  return useQuery<
    MasterActivitiesResponse,
    AxiosError<ApiError>,
    MasterActivitiesItem[]
  >({
    queryKey: ["transmitter-ocr", "master-activities"],
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
    queryKey: ["transmitter-ocr", "master-activity", id],
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
    mutationFn: async (formData: FormData) =>
      await transmitterApi.post("/transmitter_ocr/master_activity", formData, {
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

export const useUpdateMasterActivity = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData: FormData) =>
      await transmitterApi.patch(
        `/transmitter_ocr/master_activity/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      ),
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

  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) =>
      await transmitterApi.delete(`/transmitter_ocr/master_activity/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transmitter-ocr", "master-activities"],
      });
    },
  });
};
