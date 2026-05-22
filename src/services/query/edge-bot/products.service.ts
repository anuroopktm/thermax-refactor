import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { edgeApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import { edgeBotKeys } from "./keys";
import {
  mapProductsList,
  mapProductDocuments,
} from "@/pages/edge-bot/lib/edge-mappers";
import type {
  ProductResponse,
  ProductDocumentResponse,
  ProductDocumentModel,
  ProductModel,
} from "./types";
import type { ProductForm } from "@/lib/validations/products.schema";

export const useProducts = ({
  skip = 0,
  limit = 100,
  search_term,
}: {
  skip?: number;
  limit?: number;
  search_term?: string;
} = {}) => {
  return useQuery<ProductResponse[], AxiosError<ApiError>, ProductModel[]>({
    queryKey: edgeBotKeys.products.list({ skip, limit, search_term }),
    queryFn: async () => {
      const { data } = await edgeApi.get("/edgeagent-playground/product", {
        params: { skip, limit, search_term },
      });

      return data.result;
    },
    select: mapProductsList,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, ProductForm>({
    mutationFn: async (product: ProductForm) => {
      await edgeApi.post("/edgeagent-playground/product", [], {
        params: {
          title: product.title,
          short_title: product.short_title,
          description: product.description,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.products.all,
      });
    },
  });
};

export const useUpdateProduct = (id: string | number) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, ProductForm>({
    mutationFn: async (product: ProductForm) => {
      await edgeApi.patch(`/edgeagent-playground/product/${id}`, [], {
        params: {
          title: product.title,
          short_title: product.short_title,
          description: product.description,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.products.all,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await edgeApi.delete(`/edgeagent-playground/product/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.products.all,
      });
    },
  });
};

export const useProductDocuments = (productId: string | number) => {
  return useQuery<
    ProductDocumentResponse[],
    AxiosError<ApiError>,
    ProductDocumentModel[]
  >({
    queryKey: edgeBotKeys.products.documents(productId),
    queryFn: async () => {
      const { data } = await edgeApi.get(
        `/edgeagent-playground/product/${productId}/document`,
      );

      return data.result;
    },
    enabled: !!productId,
    select: mapProductDocuments,
  });
};

export const useUploadProductDocument = (productId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    AxiosError<ApiError>,
    { file: File; description: string; kind: string }
  >({
    mutationFn: async ({ file, description, kind }) => {
      const formData = new FormData();
      formData.append("document", file);

      await edgeApi.post(
        `/edgeagent-playground/product/${productId}/document`,
        formData,
        {
          params: {
            description,
            kind,
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.products.documents(productId),
      });
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.products.all,
      });
    },
  });
};

export const useDeleteProductDocument = (productId: string | number) => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (documentId: string | number) => {
      await edgeApi.delete(
        `/edgeagent-playground/product/${productId}/document/${documentId}`,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.products.documents(productId),
      });
      queryClient.invalidateQueries({
        queryKey: edgeBotKeys.products.all,
      });
    },
  });
};

export const fetchProductDocumentLink = async (
  productId: string | number,
  documentId: string | number,
): Promise<string> => {
  const { data } = await edgeApi.get(
    `/edgeagent-playground/product/${productId}/document/${documentId}/link`,
  );
  return data.link || "";
};
