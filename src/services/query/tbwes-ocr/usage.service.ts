import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tbwesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  CostUsageResponse,
  ActivityUsageResponse,
  ActivityUsageTopUserResponse,
  ActivityUsageStatusStatsResponse,
  LimitResponse,
  CostUsageModel,
  ActivityUsageModel,
  LimitModel,
} from "./types/usage.types";
import {
  mapCostUsageData,
  mapActivityUsageData,
  mapTopUsersData,
  mapActivityStatsData,
} from "@/pages/tbwes-ocr/lib/tbwes-mappers";
import { tbwesOcrKeys } from "./keys";

export const useTbwesCostUsage = (year: number, month: number) => {
  return useQuery<CostUsageResponse, AxiosError<ApiError>, CostUsageModel[]>({
    queryKey: tbwesOcrKeys.usage.cost.list({ year, month }),
    queryFn: async () => {
      const { data } = await tbwesApi.post("/api/tbwes_ocr/usage/cost", {
        year,
        month,
      });
      return data;
    },
    select: mapCostUsageData,
  });
};

export const useTbwesActivityUsage = (year: number, month: number) => {
  return useQuery<
    ActivityUsageResponse,
    AxiosError<ApiError>,
    ActivityUsageModel[]
  >({
    queryKey: tbwesOcrKeys.usage.activity.list({ year, month }),
    queryFn: async () => {
      const { data } = await tbwesApi.get("/api/tbwes_ocr/usage/activity", {
        params: { year, month },
      });
      return data;
    },
    select: mapActivityUsageData,
  });
};

export const useTbwesTopUsers = (year: number, month: number) => {
  return useQuery<
    ActivityUsageTopUserResponse,
    AxiosError<ApiError>,
    { name: string; value: number }[]
  >({
    queryKey: tbwesOcrKeys.usage.activity.top({ year, month }),
    queryFn: async () => {
      const { data } = await tbwesApi.get("/api/tbwes_ocr/usage/activity/top", {
        params: { year, month },
      });
      return data;
    },
    select: mapTopUsersData,
  });
};

export const useTbwesActivityStats = (year: number, month: number) => {
  return useQuery<
    ActivityUsageStatusStatsResponse,
    AxiosError<ApiError>,
    { name: string; value: number }[]
  >({
    queryKey: tbwesOcrKeys.usage.activity.stats({ year, month }),
    queryFn: async () => {
      const { data } = await tbwesApi.get(
        "/api/tbwes_ocr/usage/activity/stats",
        {
          params: { year, month },
        },
      );
      return data;
    },
    select: mapActivityStatsData,
  });
};

export const useTbwesUsageLimit = () => {
  return useQuery<LimitResponse, AxiosError<ApiError>, LimitModel>({
    queryKey: tbwesOcrKeys.usage.cost.limit(),
    queryFn: async () => {
      const { data } = await tbwesApi.get("/api/tbwes_ocr/usage/cost/limit");
      return data;
    },
    select: (data) => ({ limit: data.limit }),
  });
};

export const useTbwesUpdateUsageLimit = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (limit: number) => {
      await tbwesApi.patch("/api/tbwes_ocr/usage/cost/limit", {
        limit,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: tbwesOcrKeys.usage.cost.all,
      });
    },
  });
};
