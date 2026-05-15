import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { heatingApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { Member as HeatingMember } from "./types";
import { type MemberForm } from "@/lib/validations/members.schema";
import {
  mapHeatingMembersResponse,
  mapToMember,
} from "@/pages/heating-ocr/lib/heating-mappers";
import { heatingOcrKeys } from "./keys";
import { type Member } from "@/services/query/shared/types/members.types";

export const useHeatingMembers = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
  role?: string | null;
}) => {
  return useQuery({
    queryKey: heatingOcrKeys.members.list(params),
    queryFn: async () => {
      const { data } = await heatingApi.get("/api/heating_ocr/member", {
        params,
      });
      return data;
    },
    select: mapHeatingMembersResponse,
  });
};

export const useHeatingCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      await heatingApi.post("/api/heating_ocr/member", null, {
        params: member,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: heatingOcrKeys.members.all });
    },
  });
};

export const useHeatingUpdateMember = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { email, ...updateData } = member;
      await heatingApi.patch(`/api/heating_ocr/member/${id}`, null, {
        params: updateData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: heatingOcrKeys.members.all });
    },
  });
};

export const useHeatingDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await heatingApi.delete(`/api/heating_ocr/member/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: heatingOcrKeys.members.all });
    },
  });
};

export const useHeatingCurrentMember = () => {
  return useQuery<HeatingMember, AxiosError<ApiError>, Member>({
    queryKey: heatingOcrKeys.members.me(),
    queryFn: async () => {
      const { data } = await heatingApi.get("/api/heating_ocr/member/me");
      return data;
    },
    select: mapToMember,
    retry: (_, error) => error?.response?.status !== 404,
  });
};
