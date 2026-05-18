import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { conbotApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import { drConbotKeys } from "./keys";
import { normalizeFaqs } from "@/pages/dr-conbot/lib/settings-mappers";
import {
  type DrConbotFaqsResponse,
  type DrConbotFaqResponse,
  type FaqModel,
  type FaqUpdatePayload,
  type CategoryDocumentLinkResponse,
} from "./types";

export const useDrConbotFaqs = (skip = 0, limit = 100, searchTerm?: string) => {
  return useQuery<DrConbotFaqsResponse, AxiosError<ApiError>, FaqModel[]>({
    queryKey: drConbotKeys.faqs.list({ skip, limit, searchTerm }),
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/faq", {
        params: { skip, limit, search_term: searchTerm },
      });
      return data;
    },
    select: (data) => normalizeFaqs(data.result),
  });
};

export const useCreateDrConbotFaq = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DrConbotFaqResponse,
    AxiosError<ApiError>,
    { formData: FormData; description: string; kind: string }
  >({
    mutationFn: async ({ formData, description, kind }) => {
      const { data } = await conbotApi.post("/doctor_conbot/faq", formData, {
        params: { description, kind },
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.faqs.all });
    },
  });
};

export const useUpdateDrConbotFaq = (faqId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    DrConbotFaqResponse,
    AxiosError<ApiError>,
    FaqUpdatePayload
  >({
    mutationFn: async (payload) => {
      const { data } = await conbotApi.patch(
        `/doctor_conbot/faq/${faqId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.faqs.all });
    },
  });
};

export const useDeleteDrConbotFaq = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (faqId) => {
      await conbotApi.delete(`/doctor_conbot/faq/${faqId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.faqs.all });
    },
  });
};

export const useGetFaqDocumentLink = (faqId: number) => {
  return useQuery<CategoryDocumentLinkResponse, AxiosError<ApiError>, string>({
    queryKey: [...drConbotKeys.faqs.all, faqId, "link"],
    queryFn: async () => {
      const { data } = await conbotApi.get(`/doctor_conbot/faq/${faqId}/link`);
      return data;
    },
    select: (data) => data.link,
    enabled: false,
  });
};
