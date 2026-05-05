import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tbwesApi } from "@/services/interceptor";
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

export const useTbwesCostUsage = (year: number, month: number) => {
  return useQuery<CostUsage, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "cost", year, month],
    queryFn: async () => {
      const { data } = await tbwesApi.post<CostUsage>(
        "/api/tbwes_ocr/usage/cost",
        null,
        { params: { year, month } },
      );
      return data;
    },
    retry: (_, error) => error?.response.status !== 404,
  });
};

export const useTbwesActivityUsage = (year: number, month: number) => {
  return useQuery<ActivityUsage, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "activity", year, month],
    queryFn: async () => {
      const { data } = await tbwesApi.get<ActivityUsage>(
        "/api/tbwes_ocr/usage/activity",
        { params: { year, month } },
      );
      return data;
    },
    retry: (_, error) => error?.response.status !== 404,
  });
};

export const useTbwesCostUsageByYear = (year: number) => {
  return useQuery<CostUsageByYear, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "cost-year", year],
    queryFn: async () => {
      const { data } = await tbwesApi.get<CostUsageByYear>(
        "/api/tbwes_ocr/usage/year-cost",
        { params: { year } },
      );
      return data;
    },
  });
};

export const useTbwesActivityUsageByYear = (year: number) => {
  return useQuery<ActivityYearUsage, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "activity-year", year],
    queryFn: async () => {
      const { data } = await tbwesApi.get<ActivityYearUsage>(
        "/api/tbwes_ocr/usage/year-usage",
        { params: { year } },
      );
      return data;
    },
  });
};

export const useTbwesActivityStats = (year: number, month: number) => {
  return useQuery<ActivityUsageStatusStats, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "stats", year, month],
    queryFn: async () => {
      const { data } = await tbwesApi.get<ActivityUsageStatusStats>(
        "/api/tbwes_ocr/usage/activity/stats",
        { params: { year, month } },
      );
      return data;
    },
    retry: (_, error) => error?.response.status !== 404,
  });
};

export const useTbwesTopUsers = (
  year: number,
  month: number,
  n: number = 5,
) => {
  return useQuery<ActivityUsageTopUser, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "top-users", year, month, n],
    queryFn: async () => {
      const { data } = await tbwesApi.get<ActivityUsageTopUser>(
        "/api/tbwes_ocr/usage/activity/top",
        { params: { year, month, n } },
      );
      return data;
    },
    retry: (_, error) => error?.response.status !== 404,
  });
};

export const useTbwesUsageLimit = () => {
  return useQuery<Limit, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "limit"],
    queryFn: async () => {
      const { data } = await tbwesApi.get<Limit>(
        "/api/tbwes_ocr/usage/cost/limit",
      );
      return data;
    },
    retry: (_, error) => error?.response.status !== 404,
  });
};

export const useTbwesUpdateUsageLimit = () => {
  const queryClient = useQueryClient();
  return useMutation<Limit, AxiosError<ApiError>, number>({
    mutationFn: async (limit: number) => {
      const { data } = await tbwesApi.patch<Limit>(
        "/api/tbwes_ocr/usage/cost/limit",
        null,
        { params: { limit } },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tbwes-ocr", "usage", "limit"],
      });
    },
  });
};
