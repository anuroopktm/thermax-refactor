import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { Member } from "./types";
import { type MemberForm } from "@/validations/members.schema";
import { extractResult } from "@/pages/transmitter-ocr/lib/transmitter-mappers";

export const useTransmitterMembers = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
  role?: string | null;
}) => {
  return useQuery({
    queryKey: ["transmitter-ocr", "members", params],
    queryFn: async () => {
      const { data } = await transmitterApi.get("/transmitter_ocr/member", {
        params,
      });
      return data;
    },
    select: (data) => extractResult<Member>(data),
  });
};

export const useTransmitterCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { data } = await transmitterApi.post(
        "/transmitter_ocr/member",
        null,
        {
          params: member,
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transmitter-ocr", "members"],
      });
    },
  });
};

export const useTransmitterUpdateMember = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { email, ...updateData } = member;
      const { data } = await transmitterApi.patch(
        `/transmitter_ocr/member/${id}`,
        null,
        {
          params: updateData,
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transmitter-ocr", "members"],
      });
    },
  });
};

export const useTransmitterDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await transmitterApi.delete(`/transmitter_ocr/member/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["transmitter-ocr", "members"],
      });
    },
  });
};

export const useTransmitterCurrentMember = () => {
  return useQuery<Member, AxiosError<ApiError>>({
    queryKey: ["transmitter-ocr", "members", "me"],
    queryFn: async () => {
      const { data } = await transmitterApi.get<Member>(
        "/transmitter_ocr/member/me",
      );
      return data;
    },
    retry: (_, error) => error?.response?.status !== 404,
  });
};
