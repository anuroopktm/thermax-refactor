import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { salesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  CostItemResponse,
  ActivityItemResponse,
  TopUserResponse,
  CostModel,
  ActivityModel,
  TopUserModel,
  TokenUsageModel,
} from "./types";
import { salesEnablementKeys } from "./keys";
import {
  mapCostData,
  mapActivityData,
  mapTopUsersData,
} from "@/pages/sales-enablement-tool/lib/sales-mappers";
import { MONTHS } from "@/components/shared/usage/usage-date-filter";

// Helper to map month string/index to 1-based integer
const getMonthNumber = (monthStr: string): number => {
  const index = MONTHS.indexOf(monthStr);
  if (index !== -1) {
    return index + 1;
  }
  const parsed = parseInt(monthStr);
  if (!isNaN(parsed)) {
    return parsed;
  }
  return new Date().getMonth() + 1;
};

export const useCostData = (month: string, year: string) => {
  const monthNum = getMonthNumber(month);
  const yearNum = parseInt(year) || new Date().getFullYear();

  return useQuery<CostItemResponse[], AxiosError<ApiError>, CostModel[]>({
    queryKey: salesEnablementKeys.usage.cost.list({ month, year }),
    queryFn: async () => {
      const { data } = await salesApi.get("/sales/usage/cost", {
        params: { month: monthNum, year: yearNum },
      });
      // The API returns CostUsage: { day: number[], cost: number[], total: number }
      // We map this into an array of CostItemResponse: { label: string, value: number }
      const days = data?.day || [];
      const costs = data?.cost || [];
      return days.map((dayNum: number, idx: number) => ({
        label: String(dayNum),
        value: costs[idx] || 0,
      }));
    },
    select: mapCostData,
  });
};

export const useActivityData = (month: string, year: string) => {
  const monthNum = getMonthNumber(month);
  const yearNum = parseInt(year) || new Date().getFullYear();

  return useQuery<
    ActivityItemResponse[],
    AxiosError<ApiError>,
    ActivityModel[]
  >({
    queryKey: salesEnablementKeys.usage.activity.list({ month, year }),
    queryFn: async () => {
      const { data } = await salesApi.get("/sales/usage/activity", {
        params: { month: monthNum, year: yearNum },
      });
      // The API returns ActivityUsage: { day: number[], question: number[], total: number }
      // We map this into an array of ActivityItemResponse: { label: string, questions: number }
      const days = data?.day || [];
      const questions = data?.question || [];
      return days.map((dayNum: number, idx: number) => ({
        label: String(dayNum),
        questions: questions[idx] || 0,
      }));
    },
    select: mapActivityData,
  });
};

export const useTokenUsage = () => {
  return useQuery<TokenUsageModel, AxiosError<ApiError>, TokenUsageModel>({
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
  });
};

export const useTopUsers = (month: string = "April", year: string = "2026") => {
  const monthNum = getMonthNumber(month);
  const yearNum = parseInt(year) || new Date().getFullYear();

  return useQuery<TopUserResponse[], AxiosError<ApiError>, TopUserModel[]>({
    queryKey: salesEnablementKeys.usage.activity.top({ month, year }),
    queryFn: async () => {
      const { data } = await salesApi.get("/sales/usage/activity/top", {
        params: { month: monthNum, year: yearNum, n: 10 },
      });
      // The API returns ActivityUsageTopUser: { result: TopUser[] }
      // where TopUser is { name, email, question }
      const users = data?.result || [];
      return users.map((u: TopUserResponse) => ({
        name: u.name,
        email: u.email,
        initial: u.name.substring(0, 2).toUpperCase(),
        value: u.question || 0,
      }));
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
