import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { gptApi } from "@/services/interceptor";
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
} from "@/pages/thermax-gpt/lib/settings-mappers";
import { thermaxGptKeys } from "./keys";

export const useThermaxCostUsage = (
  year: string,
  month: number,
  type = "All",
) => {
  return useQuery<CostUsageResponse, AxiosError<ApiError>, CostUsageModel[]>({
    queryKey: thermaxGptKeys.usage.cost.list({ year, month, type }),
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/usage/cost", {
        params: { year, month, type },
      });

      return data;
    },
    select: mapCostUsageData,
  });
};

export const useThermaxActivityUsage = (
  year: string,
  month: number,
  type = "All",
) => {
  return useQuery<
    ActivityUsageResponse,
    AxiosError<ApiError>,
    ActivityUsageModel[]
  >({
    queryKey: thermaxGptKeys.usage.activity.list({ year, month, type }),
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/usage/activity", {
        params: { year, month, type },
      });

      return data;
    },
    select: mapActivityUsageData,
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
    TopUserModel[]
  >({
    queryKey: thermaxGptKeys.usage.activity.top({
      year,
      month,
      type,
      skip,
      limit,
    }),
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/usage/activity/top", {
        params: { year, month, type, skip, limit },
      });

      return data;
    },
    select: (data) => mapTopUsersData(data.result),
  });
};

export const useThermaxUsageLimit = () => {
  return useQuery<UsageLimitResponse, AxiosError<ApiError>, UsageLimitModel>({
    queryKey: thermaxGptKeys.usage.cost.limit(),
    queryFn: async () => {
      const { data } = await gptApi.get("/thermax_gpt/usage/cost/limit");

      return data;
    },
    select: (data) => ({ limit: data.limit }),
  });
};

export const useUpdateThermaxUsageLimit = () => {
  const queryClient = useQueryClient();

  return useMutation<UsageLimitResponse, AxiosError<ApiError>, number>({
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
        queryKey: thermaxGptKeys.usage.cost.limit(),
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
