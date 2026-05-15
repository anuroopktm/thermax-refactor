import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { transmitterApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { Member as TransmitterMember } from "./types";
import { type MemberForm } from "@/lib/validations/members.schema";
import {
  normalizeTransmitterMembers,
  normalizeTransmitterMember,
} from "@/pages/transmitter-ocr/lib/transmitter-mappers";
import { type Member } from "@/services/query/shared/types/members.types";
import { transmitterOcrKeys } from "./keys";

export const useTransmitterMembers = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
  role?: string | null;
}) => {
  return useQuery<unknown, AxiosError<ApiError>, Member[]>({
    queryKey: transmitterOcrKeys.members.list(params),
    queryFn: async () => {
      const { data } = await transmitterApi.get("/transmitter_ocr/member", {
        params,
      });
      return data;
    },
    select: normalizeTransmitterMembers,
  });
};

export const useTransmitterCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      await transmitterApi.post("/transmitter_ocr/member", null, {
        params: member,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transmitterOcrKeys.members.all,
      });
    },
  });
};

export const useTransmitterUpdateMember = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { email, ...updateData } = member;
      await transmitterApi.patch(`/transmitter_ocr/member/${id}`, null, {
        params: updateData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transmitterOcrKeys.members.all,
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
        queryKey: transmitterOcrKeys.members.all,
      });
    },
  });
};

export const useTransmitterCurrentMember = () => {
  return useQuery<TransmitterMember, AxiosError<ApiError>, Member>({
    queryKey: transmitterOcrKeys.members.me(),
    queryFn: async () => {
      const { data } = await transmitterApi.get("/transmitter_ocr/member/me");
      return data;
    },
    select: normalizeTransmitterMember,
    retry: (_, error) => error?.response?.status !== 404,
  });
};
