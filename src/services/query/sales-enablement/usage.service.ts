import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { salesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  CostUsageResponse,
  ActivityUsageResponse,
  CostModel,
  ActivityModel,
  TopUserModel,
  TokenUsageModel,
  TokenUsageResponse,
  ActivityUsageTopUserResponse,
} from "./types";
import { salesEnablementKeys } from "./keys";
import {
  mapCostData,
  mapActivityData,
  mapTopUsersData,
  mapTokenUsage,
} from "@/pages/sales-enablement-tool/lib/sales-mappers";

export const useCostData = (month: number, year: number) => {
  return useQuery<CostUsageResponse, AxiosError<ApiError>, CostModel[]>({
    queryKey: salesEnablementKeys.usage.cost.list({ month, year }),
    queryFn: async () => {
      const { data } = await salesApi.get("/sales/usage/cost", {
        params: { month, year },
      });

      return data;
    },
    select: mapCostData,
  });
};

export const useActivityData = (month: number, year: number) => {
  return useQuery<ActivityUsageResponse, AxiosError<ApiError>, ActivityModel[]>(
    {
      queryKey: salesEnablementKeys.usage.activity.list({ month, year }),
      queryFn: async () => {
        const { data } = await salesApi.get("/sales/usage/activity", {
          params: { month, year },
        });

        return data;
      },
      select: mapActivityData,
    },
  );
};

export const useTokenUsage = () => {
  return useQuery<TokenUsageResponse, AxiosError<ApiError>, TokenUsageModel>({
    queryKey: salesEnablementKeys.usage.tokens(),
    queryFn: async () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      // 1. Fetch current month total cost
      // 2. Fetch configured usage limit
      const [costRes, limitRes] = await Promise.all([
        salesApi.get("/sales/usage/cost", { params: { month, year } }),
        salesApi.get("/sales/usage/cost/limit"),
      ]);

      const totalSpent = costRes.data?.total || 0;
      const limit = limitRes.data?.limit || 1000;
      const used =
        limit > 0 ? Math.min(100, Math.round((totalSpent / limit) * 100)) : 0;
      const remaining = 100 - used;

      return {
        used,
        remaining,
        totalSpent,
        limit,
      };
    },
    select: mapTokenUsage,
  });
};

export const useTopUsers = (month: number, year: number) => {
  return useQuery<
    ActivityUsageTopUserResponse,
    AxiosError<ApiError>,
    TopUserModel[]
  >({
    queryKey: salesEnablementKeys.usage.activity.top({ month, year }),
    queryFn: async () => {
      const { data } = await salesApi.get("/sales/usage/activity/top", {
        params: { month, year, n: 10 },
      });

      return data;
    },
    select: mapTopUsersData,
  });
};

export const useUpdateUsageLimit = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (limit: number) => {
      await salesApi.patch("/sales/usage/cost/limit", null, {
        params: { limit },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: salesEnablementKeys.usage.tokens(),
      });
    },
  });
};
