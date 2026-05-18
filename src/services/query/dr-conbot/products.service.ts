import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { conbotApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import { drConbotKeys } from "./keys";
import {
  normalizeProducts,
  normalizeProduct,
  normalizeProductDocuments,
} from "@/pages/dr-conbot/lib/settings-mappers";
import {
  type DrConbotProductsResponse,
  type DrConbotProductResponse,
  type ProductCreatePayload,
  type ProductUpdatePayload,
  type DrConbotProductDocumentsResponse,
  type ProductModel,
  type ProductFileModel,
  type ProductDocumentLinkResponse,
} from "./types";

export const useDrConbotProducts = (
  skip = 0,
  limit = 100,
  searchTerm?: string,
) => {
  return useQuery<
    DrConbotProductsResponse,
    AxiosError<ApiError>,
    ProductModel[]
  >({
    queryKey: drConbotKeys.products.list({ skip, limit, searchTerm }),
    queryFn: async () => {
      const { data } = await conbotApi.get("/doctor_conbot/product", {
        params: { skip, limit, search_term: searchTerm },
      });
      return data;
    },
    select: (data) => normalizeProducts(data.result),
  });
};

export const useDrConbotProductDetails = (productId: number) => {
  return useQuery<DrConbotProductResponse, AxiosError<ApiError>, ProductModel>({
    queryKey: drConbotKeys.products.detail(productId),
    queryFn: async () => {
      const { data } = await conbotApi.get(
        `/doctor_conbot/product/${productId}`,
      );
      return data;
    },
    select: (data) => normalizeProduct(data),
  });
};

export const useCreateDrConbotProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    DrConbotProductResponse,
    AxiosError<ApiError>,
    ProductCreatePayload
  >({
    mutationFn: async (payload) => {
      const { data } = await conbotApi.post("/doctor_conbot/product", payload);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.products.all });
    },
  });
};

export const useUpdateDrConbotProduct = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation<
    DrConbotProductResponse,
    AxiosError<ApiError>,
    ProductUpdatePayload
  >({
    mutationFn: async (payload) => {
      const { data } = await conbotApi.patch(
        `/doctor_conbot/product/${productId}`,
        payload,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.products.all });
    },
  });
};

export const useDeleteDrConbotProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (productId) => {
      await conbotApi.delete(`/doctor_conbot/product/${productId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.products.all });
    },
  });
};

export const useDrConbotProductDocuments = (
  productId: number,
  skip = 0,
  limit = 100,
  searchTerm?: string,
) => {
  return useQuery<
    DrConbotProductDocumentsResponse,
    AxiosError<ApiError>,
    ProductFileModel[]
  >({
    queryKey: drConbotKeys.products.documents(productId),
    queryFn: async () => {
      const { data } = await conbotApi.get(
        `/doctor_conbot/product/${productId}/document`,
        {
          params: { skip, limit, search_term: searchTerm },
        },
      );
      return data;
    },
    select: (data) => normalizeProductDocuments(data.result),
    enabled: !!productId,
  });
};

export const useCreateDrConbotProductDocument = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation<any, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData) => {
      const { data } = await conbotApi.post(
        `/doctor_conbot/product/${productId}/document`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.products.all });
    },
  });
};

export const useDeleteDrConbotProductDocument = (productId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, number>({
    mutationFn: async (documentId) => {
      await conbotApi.delete(
        `/doctor_conbot/product/${productId}/document/${documentId}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: drConbotKeys.products.all });
    },
  });
};

export const useGetProductDocumentLink = (
  productId: number,
  documentId: number,
) => {
  return useQuery<ProductDocumentLinkResponse, AxiosError<ApiError>, string>({
    queryKey: [
      ...drConbotKeys.products.detail(productId),
      "document",
      documentId,
      "link",
    ],
    queryFn: async () => {
      const { data } = await conbotApi.get(
        `/doctor_conbot/product/${productId}/document/${documentId}/link`,
      );
      return data;
    },
    select: (data) => data.link,
    enabled: false,
  });
};
