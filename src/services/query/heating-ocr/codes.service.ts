import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { heatingApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type {
  MakerCode,
  MakerCodeCreateInput,
  ProcessCode,
  ProcessCodeCreateInput,
} from "./types";

/* ---------------- Maker Codes ---------------- */

export const useHeatingMakerCodes = (params?: {
  search?: string | null;
  label?: string | null;
  value?: string | null;
  is_active?: boolean;
}) => {
  return useQuery<MakerCode[], AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "maker-codes", params],
    queryFn: async () => {
      const { data } = await heatingApi.get<MakerCode[]>(
        "/api/heating_ocr/maker_code/",
        { params },
      );
      return data;
    },
  });
};

export const useHeatingCreateMakerCode = () => {
  const queryClient = useQueryClient();
  return useMutation<MakerCode, AxiosError<ApiError>, MakerCodeCreateInput>({
    mutationFn: async (input: MakerCodeCreateInput) => {
      const { data } = await heatingApi.post<MakerCode>(
        "/api/heating_ocr/maker_code/",
        input,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["heating-ocr", "maker-codes"],
      });
    },
  });
};

/* ---------------- Process Codes ---------------- */

export const useHeatingProcessCodes = (params?: {
  search?: string | null;
  label?: string | null;
  value?: string | null;
  is_active?: boolean;
}) => {
  return useQuery<ProcessCode[], AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "process-codes", params],
    queryFn: async () => {
      const { data } = await heatingApi.get<ProcessCode[]>(
        "/api/heating_ocr/process_code/",
        { params },
      );
      return data;
    },
  });
};

export const useHeatingCreateProcessCode = () => {
  const queryClient = useQueryClient();
  return useMutation<ProcessCode, AxiosError<ApiError>, ProcessCodeCreateInput>(
    {
      mutationFn: async (input: ProcessCodeCreateInput) => {
        const { data } = await heatingApi.post<ProcessCode>(
          "/api/heating_ocr/process_code/",
          input,
        );
        return data;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["heating-ocr", "process-codes"],
        });
      },
    },
  );
};
