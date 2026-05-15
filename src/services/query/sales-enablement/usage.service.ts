import { useQuery } from "@tanstack/react-query";
import { salesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  CostItemResponse,
  ActivityItemResponse,
  TokenUsageResponse,
  TopUserResponse,
  CostModel,
  ActivityModel,
  TokenUsageModel,
  TopUserModel,
} from "./types/usage.types";
import { salesEnablementKeys } from "./keys";
import {
  mapCostData,
  mapActivityData,
  mapTopUsersData,
} from "@/pages/sales-enablement-tool/lib/sales-mappers";

export const useCostData = (month: string, year: string) => {
  return useQuery<CostItemResponse[], AxiosError<ApiError>, CostModel[]>({
    queryKey: salesEnablementKeys.usage.cost.list({ month, year }),
    queryFn: async () => {
      const { data } = await salesApi.get("/usage/cost", {
        params: { month, year },
      });
      return data;
    },
    select: mapCostData,
  });
};

export const useActivityData = (month: string, year: string) => {
  return useQuery<
    ActivityItemResponse[],
    AxiosError<ApiError>,
    ActivityModel[]
  >({
    queryKey: salesEnablementKeys.usage.activity.list({ month, year }),
    queryFn: async () => {
      const { data } = await salesApi.get("/usage/activity", {
        params: { month, year },
      });
      return data;
    },
    select: mapActivityData,
  });
};

export const useTokenUsage = () => {
  return useQuery<TokenUsageResponse, AxiosError<ApiError>, TokenUsageModel>({
    queryKey: salesEnablementKeys.usage.tokens(),
    queryFn: async () => {
      const { data } = await salesApi.get("/usage/tokens");
      return data;
    },
  });
};

export const useTopUsers = () => {
  return useQuery<TopUserResponse[], AxiosError<ApiError>, TopUserModel[]>({
    queryKey: salesEnablementKeys.usage.activity.top(),
    queryFn: async () => {
      const { data } = await salesApi.get("/usage/top-users");
      return data;
    },
    select: mapTopUsersData,
  });
};
