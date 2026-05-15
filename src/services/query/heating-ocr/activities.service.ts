import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { heatingApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  HeatingActivityModel,
  HeatingActivityResponse,
  HeatingActivityUpdatePayload,
} from "./types";
import { mapHeatingActivitiesResponse } from "@/pages/heating-ocr/lib/heating-mappers";

export const useHeatingActivities = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
  status?: string | null;
  user_status?: string | null;
}) => {
  return useQuery({
    queryKey: ["heating-ocr", "activities", params],
    queryFn: async () => {
      const { data } = await heatingApi.get<HeatingActivityResponse>(
        "/api/heating_ocr/activity",
        { params },
      );
      return data;
    },
    select: mapHeatingActivitiesResponse,
  });
};

export const useHeatingActivityDetail = (id?: string | number) => {
  return useQuery<HeatingActivityModel, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "activity", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await heatingApi.get<HeatingActivityModel>(
        `/api/heating_ocr/activity/${id}`,
      );
      return data;
    },
  });
};

export const useHeatingCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData: FormData) => {
      await heatingApi.post("/api/heating_ocr/activity", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["heating-ocr", "activities"],
      });
    },
  });
};

export const useHeatingUpdateActivity = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, HeatingActivityUpdatePayload>({
    mutationFn: async (input: HeatingActivityUpdatePayload) => {
      await heatingApi.patch<HeatingActivityModel>(
        `/api/heating_ocr/activity/${id}`,
        input,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["heating-ocr", "activity", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["heating-ocr", "activities"],
      });
    },
  });
};

export const useHeatingDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await heatingApi.delete(`/api/heating_ocr/activity/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["heating-ocr", "activities"],
      });
    },
  });
};

export const useHeatingSubmitRejectActivity = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string>({
    mutationFn: async (status: string) => {
      await heatingApi.post(`/api/heating_ocr/activity/${id}`, null, {
        params: { status },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["heating-ocr", "activity", id],
      });
      queryClient.invalidateQueries({
        queryKey: ["heating-ocr", "activities"],
      });
    },
  });
};

export const useHeatingActivityGroups = (id?: string | number) => {
  return useQuery<string[][], AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "activity-groups", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await heatingApi.get<string[][]>(
        `/api/heating_ocr/activity/${id}/groups`,
      );
      return data;
    },
  });
};

export const useHeatingMappedActivityData = (
  id?: string | number,
  group?: string[],
) => {
  return useQuery<HeatingActivityModel, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "mapped-activity", id, group],
    enabled: !!id && !!group,
    queryFn: async () => {
      const { data } = await heatingApi.get<HeatingActivityModel>(
        `/api/heating_ocr/activity/${id}/mapped-activity`,
        { params: { group: JSON.stringify(group) } },
      );
      return data;
    },
  });
};

export const useHeatingActivityDocumentLink = (id?: string | number) => {
  return useQuery<{ link: string }, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "activity", id, "link"],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await heatingApi.get<{ link: string }>(
        `/api/heating_ocr/activity/${id}/link`,
      );
      return data;
    },
  });
};
