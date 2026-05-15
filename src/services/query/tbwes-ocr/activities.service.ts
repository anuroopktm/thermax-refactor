import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tbwesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  TbwesActivityModel,
  TbwesActivityResponse,
  TbwesActivityUpdatePayload,
} from "./types";
import { mapTbwesActivitiesResponse } from "@/pages/tbwes-ocr/lib/tbwes-mappers";

export const useTbwesActivities = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
  status?: string | null;
  user_status?: string | null;
}) => {
  return useQuery({
    queryKey: ["tbwes-ocr", "activities", params],
    queryFn: async () => {
      const { data } = await tbwesApi.get<TbwesActivityResponse>(
        "/api/tbwes_ocr/activity",
        { params },
      );
      return data;
    },
    select: mapTbwesActivitiesResponse,
  });
};

export const useTbwesActivityDetail = (id?: string | number) => {
  return useQuery<TbwesActivityModel, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "activity", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await tbwesApi.get<TbwesActivityModel>(
        `/api/tbwes_ocr/activity/${id}`,
      );
      return data;
    },
  });
};

export const useTbwesCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<TbwesActivityModel, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData: FormData) => {
      const { data } = await tbwesApi.post<TbwesActivityModel>(
        "/api/tbwes_ocr/activity",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "activities"] });
    },
  });
};

export const useTbwesUpdateActivity = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<
    TbwesActivityModel,
    AxiosError<ApiError>,
    TbwesActivityUpdatePayload
  >({
    mutationFn: async (input: TbwesActivityUpdatePayload) => {
      const { data } = await tbwesApi.patch<TbwesActivityModel>(
        `/api/tbwes_ocr/activity/${id}`,
        input,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tbwes-ocr", "activity", id],
      });
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "activities"] });
    },
  });
};

export const useTbwesDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await tbwesApi.delete(`/api/tbwes_ocr/activity/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "activities"] });
    },
  });
};
