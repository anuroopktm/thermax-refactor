import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { conbotApi } from "@/services/interceptor";
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
} from "@/pages/dr-conbot/settings/components/usage/utils/activity.utils";

export const useDrConbotCostUsage = (
  year: string,
  month: number,
  type = "All",
) => {
  return useQuery<CostUsage, AxiosError<ApiError>>({
    queryKey: ["dr-conbot", "usage", "cost", year, month, type],
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/usage/cost", {
        params: { year, month, type },
      });

      return data;
    },
  });
};

export const useDrConbotActivityUsage = (
  year: string,
  month: number,
  type = "All",
) => {
  return useQuery<ActivityUsage, AxiosError<ApiError>, ActivityChartItem[]>({
    queryKey: ["dr-conbot", "usage", "activity", year, month, type],
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/usage/activity", {
        params: { year, month, type },
      });

      return data;
    },
    select: mapActivityChartData,
  });
};

export const useDrConbotTopUsers = (
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
      "dr-conbot",
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
      const { data } = await conbotApi.get(
        "/doctor_conbot/usage/activity/top",
        {
          params: { year, month, type, skip, limit },
        },
      );

      return data;
    },
    select: mapTopUsersData,
  });
};

export const useDrConbotUsageLimit = () => {
  return useQuery<UsageLimit, AxiosError<ApiError>>({
    queryKey: ["dr-conbot", "usage", "cost", "limit"],
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/usage/cost/limit");

      return data;
    },
  });
};

export const useUpdateDrConbotUsageLimit = () => {
  const queryClient = useQueryClient();

  return useMutation<UsageLimit, AxiosError<ApiError>, number>({
    mutationFn: async (limit) => {
      const { data } = await conbotApi.patch(
        "/doctor_conbot/usage/cost/limit",
        null,
        {
          params: { limit },
        },
      );

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dr-conbot", "usage", "cost", "limit"],
      });
    },
  });
};

export const useDownloadDrConbotUsage = () => {
  return useMutation<string, AxiosError<ApiError>, UserDownloadRequest>({
    mutationFn: async (payload) => {
      const { data } = await conbotApi.post(
        "/doctor_conbot/usage/download",
        payload,
        {
          responseType: "blob",
        },
      );
      return data;
    },
  });
};
