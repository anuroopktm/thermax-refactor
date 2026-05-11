import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { heatingApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  ActivityUsage,
  CostUsage,
  ActivityYearUsage,
  CostUsageByYear,
  ActivityUsageStatusStats,
  ActivityUsageTopUser,
  Limit,
} from "./types";

export const useHeatingCostUsage = (year: number, month: number) => {
  return useQuery<CostUsage, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "usage", "cost", year, month],
    queryFn: async () => {
      const { data } = await heatingApi.post<CostUsage>(
        "/api/heating_ocr/usage/cost",
        null,
        { params: { year, month } },
      );
      return data;
    },
    retry: (_, error) => error?.response?.status !== 404,
  });
};

export const useHeatingActivityUsage = (year: number, month: number) => {
  return useQuery<ActivityUsage, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "usage", "activity", year, month],
    queryFn: async () => {
      const { data } = await heatingApi.get<ActivityUsage>(
        "/api/heating_ocr/usage/activity",
        { params: { year, month } },
      );
      return data;
    },
    retry: (_, error) => error?.response?.status !== 404,
  });
};

export const useHeatingCostUsageByYear = (year: number) => {
  return useQuery<CostUsageByYear, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "usage", "cost-year", year],
    queryFn: async () => {
      const { data } = await heatingApi.get<CostUsageByYear>(
        "/api/heating_ocr/usage/year-cost",
        { params: { year } },
      );
      return data;
    },
  });
};

export const useHeatingActivityUsageByYear = (year: number) => {
  return useQuery<ActivityYearUsage, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "usage", "activity-year", year],
    queryFn: async () => {
      const { data } = await heatingApi.get<ActivityYearUsage>(
        "/api/heating_ocr/usage/year-activity",
        { params: { year } },
      );
      return data;
    },
  });
};

export const useHeatingActivityStats = (year: number, month: number) => {
  return useQuery<ActivityUsageStatusStats, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "usage", "stats", year, month],
    queryFn: async () => {
      const { data } = await heatingApi.get<ActivityUsageStatusStats>(
        "/api/heating_ocr/usage/activity/stats",
        { params: { year, month } },
      );
      return data;
    },
    retry: (_, error) => error?.response?.status !== 404,
  });
};

export const useHeatingTopUsers = (
  year: number,
  month: number,
  limit: number = 5,
) => {
  return useQuery<ActivityUsageTopUser, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "usage", "top-users", year, month, limit],
    queryFn: async () => {
      const { data } = await heatingApi.get<ActivityUsageTopUser>(
        "/api/heating_ocr/usage/activity/top",
        { params: { year, month, limit } },
      );
      return data;
    },
    retry: (_, error) => error?.response?.status !== 404,
  });
};

export const useHeatingUsageLimit = () => {
  return useQuery<Limit, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "usage", "limit"],
    queryFn: async () => {
      const { data } = await heatingApi.get<Limit>(
        "/api/heating_ocr/usage/cost/limit",
      );
      return data;
    },
    retry: (_, error) => error?.response?.status !== 404,
  });
};

export const useHeatingUpdateUsageLimit = () => {
  const queryClient = useQueryClient();
  return useMutation<Limit, AxiosError<ApiError>, number>({
    mutationFn: async (limit: number) => {
      const { data } = await heatingApi.patch<Limit>(
        "/api/heating_ocr/usage/cost/limit",
        null,
        { params: { limit } },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["heating-ocr", "usage", "limit"],
      });
    },
  });
};
