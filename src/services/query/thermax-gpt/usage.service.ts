import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gptApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  CostUsage,
  ActivityUsage,
  ActivityUsageTopUserResponse,
  UsageLimit,
  UserDownloadRequest,
} from "./types";

import {
  mapActivityChartData,
  mapTopUsersData,
  type ActivityChartItem,
  type TopUserItem,
} from "@/pages/thermax-gpt/settings/components/usage/utils/activity.utils";

export const useThermaxCostUsage = (
  year: string,
  month: number,
  type = "All",
) => {
  return useQuery<CostUsage, AxiosError<ApiError>>({
    queryKey: ["thermax-gpt", "usage", "cost", year, month, type],
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/usage/cost", {
        params: { year, month, type },
      });

      return data;
    },
  });
};

export const useThermaxActivityUsage = (
  year: string,
  month: number,
  type = "All",
) => {
  return useQuery<ActivityUsage, AxiosError<ApiError>, ActivityChartItem[]>({
    queryKey: ["thermax-gpt", "usage", "activity", year, month, type],
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/usage/activity", {
        params: { year, month, type },
      });

      return data;
    },
    select: mapActivityChartData,
  });
};

export const useThermaxTopUsers = (
  year: string,
  month: number,
  type = "All",
  skip = 0,
  limit = 5,
) => {
  return useQuery<
    ActivityUsageTopUserResponse,
    AxiosError<ApiError>,
    TopUserItem[]
  >({
    queryKey: [
      "thermax-gpt",
      "usage",
      "activity",
      "top",
      year,
      month,
      type,
      skip,
      limit,
    ],
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/usage/activity/top", {
        params: { year, month, type, skip, limit },
      });

      return data;
    },
    select: mapTopUsersData,
  });
};

export const useThermaxUsageLimit = () => {
  return useQuery<UsageLimit, AxiosError<ApiError>>({
    queryKey: ["thermax-gpt", "usage", "cost", "limit"],
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/usage/cost/limit");

      return data;
    },
  });
};

export const useUpdateThermaxUsageLimit = () => {
  const queryClient = useQueryClient();

  return useMutation<UsageLimit, AxiosError<ApiError>, number>({
    mutationFn: async (limit) => {
      const { data } = await gptApi.patch(
        "/thermax_gpt/usage/cost/limit",
        null,
        {
          params: { limit },
        },
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["thermax-gpt", "usage", "cost", "limit"],
      });
    },
  });
};

export const useDownloadThermaxUsage = () => {
  return useMutation<string, AxiosError<ApiError>, UserDownloadRequest>({
    mutationFn: async (payload) => {
      const { data } = await gptApi.post(
        "/thermax_gpt/usage/download",
        payload,
        {
          responseType: "blob",
        },
      );
      return data;
    },
  });
};
