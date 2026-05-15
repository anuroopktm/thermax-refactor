import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { conbotApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  CostUsageResponse,
  ActivityUsageResponse,
  ActivityUsageTopUserResponse,
  UsageLimitResponse,
  UserDownloadRequest,
  CostUsageModel,
  ActivityUsageModel,
  TopUserModel,
  UsageLimitModel,
} from "./types/usage.types";

import {
  mapCostUsageData,
  mapActivityUsageData,
  mapTopUsersData,
} from "@/pages/dr-conbot/lib/settings-mappers";
import { drConbotKeys } from "./keys";

export const useDrConbotCostUsage = (
  year: string,
  month: number,
  type = "All",
) => {
  return useQuery<CostUsageResponse, AxiosError<ApiError>, CostUsageModel[]>({
    queryKey: drConbotKeys.usage.cost.list({ year, month, type }),
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/usage/cost", {
        params: { year, month, type },
      });

      return data;
    },
    select: mapCostUsageData,
  });
};

export const useDrConbotActivityUsage = (
  year: string,
  month: number,
  type = "All",
) => {
  return useQuery<
    ActivityUsageResponse,
    AxiosError<ApiError>,
    ActivityUsageModel[]
  >({
    queryKey: drConbotKeys.usage.activity.list({ year, month, type }),
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/usage/activity", {
        params: { year, month, type },
      });

      return data;
    },
    select: mapActivityUsageData,
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
    TopUserModel[]
  >({
    queryKey: drConbotKeys.usage.activity.top({
      year,
      month,
      type,
      skip,
      limit,
    }),
    queryFn: async () => {
      const { data } = await conbotApi.get(
        "/doctor_conbot/usage/activity/top",
        {
          params: { year, month, type, skip, limit },
        },
      );

      return data;
    },
    select: (data) => mapTopUsersData(data.result),
  });
};

export const useDrConbotUsageLimit = () => {
  return useQuery<UsageLimitResponse, AxiosError<ApiError>, UsageLimitModel>({
    queryKey: drConbotKeys.usage.cost.limit(),
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/usage/cost/limit");

      return data;
    },
    select: (data) => ({ limit: data.limit }),
  });
};

export const useUpdateDrConbotUsageLimit = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (limit) => {
      await conbotApi.patch("/doctor_conbot/usage/cost/limit", null, {
        params: { limit },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: drConbotKeys.usage.cost.limit(),
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
