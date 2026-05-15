import { useQuery } from "@tanstack/react-query";
import { salesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { CostItem, ActivityItem, TokenUsage, TopUser } from "./types";

export const useCostData = (month: string, year: string) => {
  return useQuery<CostItem[], AxiosError<ApiError>>({
    queryKey: ["sales-usage", "cost", month, year],
    queryFn: async () => {
      const { data } = await salesApi.get("/usage/cost", {
        params: { month, year },
      });
      return data;
    },
  });
};

export const useActivityData = (month: string, year: string) => {
  return useQuery<ActivityItem[], AxiosError<ApiError>>({
    queryKey: ["sales-usage", "activity", month, year],
    queryFn: async () => {
      const { data } = await salesApi.get("/usage/activity", {
        params: { month, year },
      });
      return data;
    },
  });
};

export const useTokenUsage = () => {
  return useQuery<TokenUsage, AxiosError<ApiError>>({
    queryKey: ["sales-usage", "tokens"],
    queryFn: async () => {
      const { data } = await salesApi.get("/usage/tokens");
      return data;
    },
  });
};

export const useTopUsers = () => {
  return useQuery<TopUser[], AxiosError<ApiError>>({
    queryKey: ["sales-usage", "top-users"],
    queryFn: async () => {
      const { data } = await salesApi.get("/usage/top-users");
      return data;
    },
  });
};
