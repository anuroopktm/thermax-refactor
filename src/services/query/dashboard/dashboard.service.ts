import { useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { AppItem } from "./dashboard.types";

export const useApps = () => {
  return useQuery<AppItem[], AxiosError<ApiError>>({
    queryKey: ["dashboard", "apps"],
    queryFn: async () => {
      const { data } = await api.get<AppItem[]>("/dashboard/apps");
      return data;
    },
  });
};
