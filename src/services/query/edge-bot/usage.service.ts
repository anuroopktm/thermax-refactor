import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { edgeApi } from "@/services/interceptor";
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
import { edgeBotKeys } from "./keys";
import {
  mapCostData,
  mapActivityData,
  mapTopUsersData,
  mapTokenUsage,
} from "@/pages/edge-bot/lib/edge-mappers";

export const useCostData = (month: number, year: number) => {
  return useQuery<CostUsageResponse, AxiosError<ApiError>, CostModel[]>({
    queryKey: edgeBotKeys.usage.cost.list({ month, year }),
    queryFn: async () => {
      const { data } = await edgeApi.get("/edgeagent-playground/usage/cost", {
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
      queryKey: edgeBotKeys.usage.activity.list({ month, year }),
      queryFn: async () => {
        const { data } = await edgeApi.get(
          "/edgeagent-playground/usage/activity",
          {
            params: { month, year },
          },
        );

        return data;
      },
      select: mapActivityData,
    },
  );
};

export const useTokenUsage = () => {
  return useQuery<TokenUsageResponse, AxiosError<ApiError>, TokenUsageModel>({
    queryKey: edgeBotKeys.usage.tokens(),
    queryFn: async () => {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;

      // 1. Fetch current month total cost
      // 2. Fetch configured usage limit
      const [costRes, limitRes] = await Promise.all([
        edgeApi.get("/edgeagent-playground/usage/cost", {
          params: { month, year },
        }),
        edgeApi.get("/edgeagent-playground/usage/cost/limit"),
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
    queryKey: edgeBotKeys.usage.activity.top({ month, year }),
    queryFn: async () => {
      const { data } = await edgeApi.get(
        "/edgeagent-playground/usage/activity/top",
        {
          params: { month, year, n: 10 },
        },
      );

      return data;
    },
    select: mapTopUsersData,
  });
};

export const useUpdateUsageLimit = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (limit: number) => {
      await edgeApi.patch("/edgeagent-playground/usage/cost/limit", null, {
        params: { limit },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.usage.tokens(),
      });
    },
  });
};
