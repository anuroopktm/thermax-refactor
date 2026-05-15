import { useQuery } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  CostUsageResponse,
  ActivityUsageResponse,
  TopUsersUsageResponse,
  StatsUsageResponse,
  TokenUsageModel,
  CostUsageModel,
  ActivityUsageModel,
  StatsModel,
  TopUserModel,
} from "./types/usage.types";
import {
  mapCostUsageData,
  mapActivityUsageData,
  mapActivityStatsData,
  mapTopUsersData,
} from "@/pages/transmitter-ocr/lib/transmitter-mappers";
import dayjs from "dayjs";
import { transmitterOcrKeys } from "./keys";

export const useChildCostUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<CostUsageResponse, AxiosError<ApiError>, CostUsageModel[]>({
    queryKey: transmitterOcrKeys.child.usage.cost({ year, month }),
    queryFn: async () => {
      const parsedYear = Number(year);
      const parsedMonth = Number(month);

      const { data } = await transmitterApi.post(
        "/transmitter_ocr/child_usage/cost",
        null,
        {
          params: { year: parsedYear, month: parsedMonth },
        },
      );

      return data;
    },
    select: mapCostUsageData,
  });
};

export const useChildActivityUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<
    ActivityUsageResponse,
    AxiosError<ApiError>,
    ActivityUsageModel[]
  >({
    queryKey: transmitterOcrKeys.child.usage.activity({ year, month }),
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        "/transmitter_ocr/child_usage/activity",
        {
          params: { year, month },
        },
      );
      return data;
    },
    select: mapActivityUsageData,
  });
};

export const useChildTokenUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<TokenUsageModel, AxiosError<ApiError>>({
    queryKey: transmitterOcrKeys.child.usage.tokens({ year, month }),
    queryFn: async () => {
      const parsedYear = Number(year);
      const parsedMonth = Number(month);

      const [limitRes, costRes] = await Promise.all([
        transmitterApi.get<{ limit: number }>(
          "/transmitter_ocr/usage/cost/limit",
        ),

        transmitterApi.post<{ total: number }>(
          "/transmitter_ocr/child_usage/cost",
          {
            year: parsedYear,
            month: parsedMonth,
          },
        ),
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
  return useQuery<StatsUsageResponse, AxiosError<ApiError>, StatsModel[]>({
    queryKey: transmitterOcrKeys.child.usage.stats({ year, month }),
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        "/transmitter_ocr/child_usage/activity/stats",
        {
          params: { year, month },
        },
      );

      return data;
    },
    select: mapActivityStatsData,
  });
};

export const useChildTopUsers = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<TopUsersUsageResponse, AxiosError<ApiError>, TopUserModel[]>({
    queryKey: transmitterOcrKeys.child.usage.top({ year, month }),
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        "/transmitter_ocr/child_usage/activity/top",
        {
          params: { year, month },
        },
      );

      return data;
    },
    select: mapTopUsersData,
  });
};
