import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { heatingApi } from "@/services/interceptor";
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
} from "@/pages/heating-ocr/lib/heating-mappers";
import { heatingOcrKeys } from "./keys";

export const useHeatingCostUsage = (year: number, month: number) => {
  return useQuery<CostUsageResponse, AxiosError<ApiError>, CostUsageModel[]>({
    queryKey: heatingOcrKeys.usage.cost.list({ year, month }),
    queryFn: async () => {
      const { data } = await heatingApi.post(
        "/api/heating_ocr/usage/cost",
        null,
        { params: { year, month } },
      );
      return data;
    },
    select: mapCostUsageData,
    retry: (_, error) => error?.response?.status !== 404,
  });
};

export const useHeatingActivityUsage = (year: number, month: number) => {
  return useQuery<
    ActivityUsageResponse,
    AxiosError<ApiError>,
    ActivityUsageModel[]
  >({
    queryKey: heatingOcrKeys.usage.activity.list({ year, month }),
    queryFn: async () => {
      const { data } = await heatingApi.get("/api/heating_ocr/usage/activity", {
        params: { year, month },
      });
      return data;
    },
    select: mapActivityUsageData,
    retry: (_, error) => error?.response?.status !== 404,
  });
};

export const useHeatingActivityStats = (year: number, month: number) => {
  return useQuery<
    ActivityUsageStatusStatsResponse,
    AxiosError<ApiError>,
    { name: string; value: number }[]
  >({
    queryKey: heatingOcrKeys.usage.activity.stats({ year, month }),
    queryFn: async () => {
      const { data } = await heatingApi.get(
        "/api/heating_ocr/usage/activity/stats",
        { params: { year, month } },
      );
      return data;
    },
    select: mapActivityStatsData,
    retry: (_, error) => error?.response?.status !== 404,
  });
};

export const useHeatingTopUsers = (
  year: number,
  month: number,
  limit: number = 5,
) => {
  return useQuery<
    ActivityUsageTopUserResponse,
    AxiosError<ApiError>,
    { name: string; value: number }[]
  >({
    queryKey: heatingOcrKeys.usage.activity.top({ year, month, limit }),
    queryFn: async () => {
      const { data } = await heatingApi.get(
        "/api/heating_ocr/usage/activity/top",
        { params: { year, month, limit } },
      );
      return data;
    },
    select: mapTopUsersData,
    retry: (_, error) => error?.response?.status !== 404,
  });
};

export const useHeatingUsageLimit = () => {
  return useQuery<LimitResponse, AxiosError<ApiError>, LimitModel>({
    queryKey: heatingOcrKeys.usage.cost.limit(),
    queryFn: async () => {
      const { data } = await heatingApi.get(
        "/api/heating_ocr/usage/cost/limit",
      );
      return data;
    },
    select: (data) => ({ limit: data.limit }),
    retry: (_, error) => error?.response?.status !== 404,
  });
};

export const useHeatingUpdateUsageLimit = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (limit: number) => {
      await heatingApi.patch("/api/heating_ocr/usage/cost/limit", null, {
        params: { limit },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: heatingOcrKeys.usage.cost.all,
      });
    },
  });
};
