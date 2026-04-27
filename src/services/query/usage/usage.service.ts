import { useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  ActivityItem,
  TopUser,
  CostItem,
  TokenUsage,
} from "./usage.types";

export const useActivityData = (month: string, year: string) => {
  return useQuery<ActivityItem[], AxiosError<ApiError>>({
    queryKey: ["usage", "activity", month, year],
    queryFn: async () => {
      const { data } = await api.get<ActivityItem[]>("/usage/activity", {
        params: { month, year },
      });
      return data;
    },
  });
};

export const useTopUsers = () => {
  return useQuery<TopUser[], AxiosError<ApiError>>({
    queryKey: ["usage", "top-users"],
    queryFn: async () => {
      const { data } = await api.get<TopUser[]>("/usage/top-users");
      return data;
    },
  });
};

export const useCostData = (month: string, year: string) => {
  return useQuery<CostItem[], AxiosError<ApiError>>({
    queryKey: ["usage", "cost", month, year],
    queryFn: async () => {
      const { data } = await api.get<CostItem[]>("/usage/cost", {
        params: { month, year },
      });
      return data;
    },
  });
};

export const useTokenUsage = () => {
  return useQuery<TokenUsage, AxiosError<ApiError>>({
    queryKey: ["usage", "token-usage"],
    queryFn: async () => {
      const { data } = await api.get<TokenUsage>("/usage/token-usage");
      return data;
    },
  });
};
