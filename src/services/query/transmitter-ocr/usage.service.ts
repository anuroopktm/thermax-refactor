import { useQuery } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  ActivitySummaryItem,
  CostUsageItem,
  ActivityStats,
  TokenUsage,
} from "./types";
import {
  mapCostUsageData,
  extractResult,
} from "@/pages/transmitter-ocr/lib/transmitter-mappers";

export const useActivitySummary = (childId?: string) => {
  return useQuery<ActivitySummaryItem[], AxiosError<ApiError>, any>({
    queryKey: ["transmitter-ocr", "activity-summary", childId],
    queryFn: async () => {
      const { data } = await transmitterApi.get("/child_usage/activity", {
        params: { childId },
      });
      return data;
    },
    select: (data) => extractResult<ActivitySummaryItem>(data),
  });
};

export const useMasterCostUsage = (year: string = "2026") => {
  return useQuery<CostUsageItem[], AxiosError<ApiError>, any>({
    queryKey: ["transmitter-ocr", "master-cost-usage", year],
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        "/master_usage/year-master-cost",
        {
          params: { year },
        },
      );
      return data;
    },
    select: mapCostUsageData,
  });
};

export const useChildCostUsage = (year: string = "2026") => {
  return useQuery<CostUsageItem[], AxiosError<ApiError>, any>({
    queryKey: ["transmitter-ocr", "child-cost-usage", year],
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        "/child_usage/year-child-cost",
        {
          params: { year },
        },
      );
      return data;
    },
    select: mapCostUsageData,
  });
};

export const useMasterActivityStats = (year?: string, month?: string) => {
  return useQuery<ActivityStats, AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "master-activity-stats", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get<ActivityStats>(
        "/master_usage/activity/stats",
        { params: { year, month } },
      );
      return data;
    },
  });
};

export const useMasterDetailedActivity = (year?: string, month?: string) => {
  return useQuery<any[], AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "master-detailed-activity", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get<any>("/master_usage/activity", {
        params: { year, month },
      });
      return extractResult<any>(data);
    },
  });
};

export const useMasterTopUsers = (year?: string, month?: string) => {
  return useQuery<any[], AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "master-top-users", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get<any>(
        "/master_usage/activity/top",
        { params: { year, month } },
      );
      return extractResult<any>(data);
    },
  });
};

export const useChildActivityStats = (year?: string, month?: string) => {
  return useQuery<ActivityStats, AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "child-activity-stats", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get<ActivityStats>(
        "/child_usage/activity/stats",
        { params: { year, month } },
      );
      return data;
    },
  });
};

export const useChildDetailedActivity = (year?: string, month?: string) => {
  return useQuery<any[], AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "child-detailed-activity", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get<any>("/child_usage/activity", {
        params: { year, month },
      });
      return extractResult<any>(data);
    },
  });
};

export const useChildTopUsers = (year?: string, month?: string) => {
  return useQuery<any[], AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "child-top-users", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get<any>(
        "/child_usage/activity/top",
        { params: { year, month } },
      );
      return extractResult<any>(data);
    },
  });
};

export const useTokenUsage = (year: string = "2026", month: string = "4") => {
  return useQuery<TokenUsage, AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "token-usage", year, month],
    queryFn: async () => {
      const [limitRes, costRes] = await Promise.all([
        transmitterApi.get<{ limit: number }>("/usage/cost/limit"),
        transmitterApi.post<{ total: number }>("/master_usage/cost", {
          year: parseInt(year),
          month: parseInt(month),
        }),
      ]);

      const limit = limitRes.data.limit || 0;
      const totalSpent = costRes.data.total || 0;

      const usedPercentage = limit > 0 ? (totalSpent / limit) * 100 : 0;
      const remainingPercentage = Math.max(0, 100 - usedPercentage);

      return {
        used: parseFloat(usedPercentage.toFixed(2)),
        remaining: parseFloat(remainingPercentage.toFixed(2)),
        totalSpent,
        limit,
      };
    },
  });
};
