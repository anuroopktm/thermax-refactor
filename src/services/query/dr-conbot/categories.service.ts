import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { conbotApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import { drConbotKeys } from "./keys";
import {
  normalizeCategories,
  normalizeCategory,
  normalizeCategoryDocuments,
} from "@/pages/dr-conbot/lib/settings-mappers";
import {
  type DrConbotCategoriesResponse,
  type DrConbotCategoryResponse,
  type DrConbotCategoryDocumentsResponse,
  type CategoryModel,
  type CategoryFileModel,
  type CategoryDocumentLinkResponse,
  type CategoryCreatePayload,
  type CategoryUpdatePayload,
} from "./types";

export const useDrConbotCategories = (
  skip = 0,
  limit = 100,
  searchTerm?: string,
) => {
  return useQuery<
    DrConbotCategoriesResponse,
    AxiosError<ApiError>,
    CategoryModel[]
  >({
    queryKey: drConbotKeys.categories.list({ skip, limit, searchTerm }),
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/category", {
        params: { skip, limit, search_term: searchTerm },
      });
      return data;
    },
    select: (data) => normalizeCategories(data.result),
  });
};

export const useDrConbotCategoryDetails = (categoryId: number) => {
  return useQuery<
    DrConbotCategoryResponse,
    AxiosError<ApiError>,
    CategoryModel
  >({
    queryKey: drConbotKeys.categories.detail(categoryId),
    queryFn: async () => {
      const { data } = await conbotApi.get(
        `/doctor_conbot/category/${categoryId}`,
      );
      return data;
    },
    select: (data) => normalizeCategory(data),
  });
};

export const useCreateDrConbotCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DrConbotCategoryResponse,
    AxiosError<ApiError>,
    CategoryCreatePayload
  >({
    mutationFn: async (payload) => {
      const { data } = await conbotApi.post(
        "/doctor_conbot/category/",
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.categories.all });
    },
  });
};

export const useUpdateDrConbotCategory = (categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    DrConbotCategoryResponse,
    AxiosError<ApiError>,
    CategoryUpdatePayload
  >({
    mutationFn: async (payload) => {
      const { data } = await conbotApi.patch(
        `/doctor_conbot/category/${categoryId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.categories.all });
    },
  });
};

export const useDeleteDrConbotCategory = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (categoryId) => {
      await conbotApi.delete(`/doctor_conbot/category/${categoryId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.categories.all });
    },
  });
};

export const useDrConbotCategoryDocuments = (
  categoryId: number,
  skip = 0,
  limit = 100,
  searchTerm?: string,
) => {
  return useQuery<
    DrConbotCategoryDocumentsResponse,
    AxiosError<ApiError>,
    CategoryFileModel[]
  >({
    queryKey: drConbotKeys.categories.documents(categoryId),
    queryFn: async () => {
      const { data } = await conbotApi.get(
        `/doctor_conbot/category/${categoryId}/document`,
        {
          params: { skip, limit, search_term: searchTerm },
        },
      );
      return data;
    },
    select: (data) => normalizeCategoryDocuments(data.result),
    enabled: !!categoryId,
  });
};

export const useCreateDrConbotCategoryDocument = (categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData) => {
      const { data } = await conbotApi.post(
        `/doctor_conbot/category/${categoryId}/document/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: drConbotKeys.categories.documents(categoryId),
      });
      queryClient.invalidateQueries({
        queryKey: drConbotKeys.categories.all,
      });
    },
  });
};

export const useDeleteDrConbotCategoryDocument = (categoryId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (documentId) => {
      await conbotApi.delete(
        `/doctor_conbot/category/${categoryId}/document/${documentId}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.categories.all });
    },
  });
};

export const useGetCategoryDocumentLink = (
  categoryId: number,
  documentId: number,
) => {
  return useQuery<CategoryDocumentLinkResponse, AxiosError<ApiError>, string>({
    queryKey: [
      ...drConbotKeys.categories.detail(categoryId),
      "document",
      documentId,
      "link",
    ],
    queryFn: async () => {
      const { data } = await conbotApi.get(
        `/doctor_conbot/category/${categoryId}/document/${documentId}/link`,
      );
      return data;
    },
    select: (data) => data.link,
    enabled: false,
  });
};
