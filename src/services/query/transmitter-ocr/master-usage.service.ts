import { useQuery } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  CostUsageItem,
  TokenUsage,
  TopUsersUsage,
  TopUsersItem,
  StatsUsage,
  StatsItem,
  CostUsageResponse,
  ActivityUsageResponse,
} from "./types";
import {
  mapCostUsageData,
  extractResult,
  mapActivityUsageData,
} from "@/pages/transmitter-ocr/lib/transmitter-mappers";
import dayjs from "dayjs";
import type { StatusItem } from "@/components/shared/usage/usage-status-card";

export const useMasterCostUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<
    CostUsageResponse,
    AxiosError<ApiError>,
    { label: string; value: number }[]
  >({
    queryKey: ["transmitter-ocr", "master-cost-usage", year, month],
    queryFn: async () => {
      const parsedYear = Number(year);
      const parsedMonth = Number(month);

      console.log("montthththt", parsedMonth, month);

      const { data } = await transmitterApi.post("/master_usage/cost", null, {
        params: { year: parsedYear, month: parsedMonth },
      });

      return data;
    },
    select: (data) => mapCostUsageData(data),
  });
};

export const useMasterActivityUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<
    ActivityUsageResponse,
    AxiosError<ApiError>,
    { label: string; value: number }[]
  >({
    queryKey: ["transmitter-ocr", "master-detailed-activity", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get("/master_usage/activity", {
        params: { year, month },
      });

      return data;
    },
    select: (data) => mapActivityUsageData(data),
  });
};

//////////////////////////////////////////////////////////

export const useMasterTokenUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<TokenUsage, AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "master-token-usage", year, month],
    queryFn: async () => {
      const parsedYear = Number(year);
      const parsedMonth = Number(month);

      console.log("montthththt", parsedMonth);

      const [limitRes, costRes] = await Promise.all([
        transmitterApi.get<{ limit: number }>("/usage/cost/limit"),

        transmitterApi.post<{ total: number }>("/master_usage/cost", {
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

export const useMasterActivityStats = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<StatsUsage, AxiosError<ApiError>, StatusItem[]>({
    queryKey: ["transmitter-ocr", "master-activity-stats", year, month],
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        "/master_usage/activity/stats",
        { params: { year, month } },
      );

      return data;
    },
    select: (data) =>
      data?.result.map((item) => ({
        name: item.stat.replaceAll("_", " "),
        value: item.activity_count,
      })),
  });
};

export const useMasterTopUsers = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<TopUsersUsage, AxiosError<ApiError>, StatusItem[]>({
    queryKey: ["transmitter-ocr", "master-top-users", year, month],
    queryFn: async () => {
      const parsedYear = Number(year);
      const parsedMonth = Number(month);

      console.log("dedewdew", year, month);

      const { data } = await transmitterApi.get("/master_usage/activity/top", {
        params: {
          year: parsedYear,
          month: parsedMonth,
        },
      });

      return data;
    },
    select: (data) =>
      data?.result.map((item) => ({
        name: item.name,
        value: item.activity,
      })),
  });
};
