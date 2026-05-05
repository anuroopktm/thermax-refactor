import { useQuery } from "@tanstack/react-query";
import { tbwesApi } from "@/services/interceptor";
import type { BaanResponse } from "./types";

export const useTbwesBaan = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
}) => {
  return useQuery({
    queryKey: ["tbwes-ocr", "baan", params],
    queryFn: async () => {
      const { data } = await tbwesApi.get<BaanResponse>("/api/tbwes_ocr/baan", {
        params,
      });
      return data;
    },
  });
};
