import { useQuery } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  TokenUsageModel,
  TopUsersUsageResponse,
  StatsUsageResponse,
  CostUsageResponse,
  ActivityUsageResponse,
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

export const useMasterCostUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<CostUsageResponse, AxiosError<ApiError>, CostUsageModel[]>({
    queryKey: transmitterOcrKeys.master.usage.cost({ year, month }),
    queryFn: async () => {
      const parsedYear = Number(year);
      const parsedMonth = Number(month);

      const { data } = await transmitterApi.post(
        "/transmitter_ocr/master_usage/cost",
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

export const useMasterActivityUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<
    ActivityUsageResponse,
    AxiosError<ApiError>,
    ActivityUsageModel[]
  >({
    queryKey: transmitterOcrKeys.master.usage.activity({ year, month }),
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        "/transmitter_ocr/master_usage/activity",
        {
          params: { year, month },
        },
      );

      return data;
    },
    select: mapActivityUsageData,
  });
};

export const useMasterTokenUsage = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<TokenUsageModel, AxiosError<ApiError>>({
    queryKey: transmitterOcrKeys.master.usage.tokens({ year, month }),
    queryFn: async () => {
      const parsedYear = Number(year);
      const parsedMonth = Number(month);

      const [limitRes, costRes] = await Promise.all([
        transmitterApi.get<{ limit: number }>(
          "/transmitter_ocr/usage/cost/limit",
        ),

        transmitterApi.post<{ total: number }>(
          "/transmitter_ocr/master_usage/cost",
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

export const useMasterActivityStats = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<StatsUsageResponse, AxiosError<ApiError>, StatsModel[]>({
    queryKey: transmitterOcrKeys.master.usage.stats({ year, month }),
    queryFn: async () => {
      const { data } = await transmitterApi.get(
        "/transmitter_ocr/master_usage/activity/stats",
        { params: { year, month } },
      );

      return data;
    },
    select: mapActivityStatsData,
  });
};

export const useMasterTopUsers = (
  year: string = dayjs().year().toString(),
  month: string = dayjs().month().toString(),
) => {
  return useQuery<TopUsersUsageResponse, AxiosError<ApiError>, TopUserModel[]>({
    queryKey: transmitterOcrKeys.master.usage.top({ year, month }),
    queryFn: async () => {
      const parsedYear = Number(year);
      const parsedMonth = Number(month);

      const { data } = await transmitterApi.get(
        "/transmitter_ocr/master_usage/activity/top",
        {
          params: {
            year: parsedYear,
            month: parsedMonth,
          },
        },
      );

      return data;
    },
    select: mapTopUsersData,
  });
};
