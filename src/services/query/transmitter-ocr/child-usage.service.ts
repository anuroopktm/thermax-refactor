import { useQuery } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  CostUsageResponse,
  ActivityUsageResponse,
  TopUsersUsage,
  TopUsersItem,
  StatsUsage,
  StatsItem,
  TokenUsage,
} from "./types";
import {
  mapCostUsageData,
  extractResult,
  mapActivityUsageData,
} from "@/pages/transmitter-ocr/lib/transmitter-mappers";
import dayjs from "dayjs";

export const useChildCostUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<
    CostUsageResponse,
    AxiosError<ApiError>,
    { label: string; value: number }[]
  >({
    queryKey: ["transmitter-ocr", "child-cost-usage", year, month],
    queryFn: async () => {
      const parsedYear = Number(year);
      const parsedMonth = Number(month);

      const { data } = await transmitterApi.post("/child_usage/cost", null, {
        params: { year: parsedYear, month: parsedMonth },
      });

      return data;
    },
    select: (data) => mapCostUsageData(data),
  });
};

export const useChildActivityUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<
    ActivityUsageResponse,
    AxiosError<ApiError>,
    { label: string; value: number }[]
  >({
    queryKey: ["transmitter-ocr", "child-detailed-activity", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get("/child_usage/activity", {
        params: { year, month },
      });
      return data;
    },
    select: (data) => mapActivityUsageData(data),
  });
};

///////////////////////////////////////////////////////////////////

export const useChildTokenUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<TokenUsage, AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "child-token-usage", year, month],
    queryFn: async () => {
      const parsedYear = Number(year);
      const parsedMonth = Number(month);

      const [limitRes, costRes] = await Promise.all([
        transmitterApi.get<{ limit: number }>("/usage/cost/limit"),

        transmitterApi.post<{ total: number }>("/child_usage/cost", {
          year: parsedYear,
          month: parsedMonth,
        }),
      ]);

      const limit = limitRes.data.limit ?? 0;
      const totalSpent = costRes.data.total ?? 0;

      const used =
        limit > 0 ? Number(((totalSpent / limit) * 100).toFixed(2)) : 0;

      return {
        used,
        remaining: Number((100 - used).toFixed(2)),
        totalSpent,
        limit,
      };
    },
  });
};

export const useChildActivityStats = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<StatsUsage, AxiosError<ApiError>, StatsItem[]>({
    queryKey: ["transmitter-ocr", "child-activity-stats", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get("/child_usage/activity/stats", {
        params: { year, month },
      });

      return data;
    },
    select: (data) => data?.result,
  });
};

export const useChildTopUsers = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<TopUsersUsage, AxiosError<ApiError>, TopUsersItem[]>({
    queryKey: ["transmitter-ocr", "child-top-users", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get("/child_usage/activity/top", {
        params: { year, month },
      });

      return data;
    },
    select: (data) => data?.result,
  });
};
