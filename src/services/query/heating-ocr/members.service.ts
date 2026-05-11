import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { heatingApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { Member, MemberWithCount } from "./types";
import { type MemberForm } from "@/validations/members.schema";
import { mapHeatingMembersResponse } from "@/pages/heating-ocr/lib/heating-mappers";

export const useHeatingMembers = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
  role?: string | null;
}) => {
  return useQuery({
    queryKey: ["heating-ocr", "members", params],
    queryFn: async () => {
      const { data } = await heatingApi.get<MemberWithCount>(
        "/api/heating_ocr/member",
        { params },
      );
      return data;
    },
    select: mapHeatingMembersResponse,
  });
};

export const useHeatingCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { data } = await heatingApi.post("/api/heating_ocr/member", null, {
        params: member,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heating-ocr", "members"] });
    },
  });
};

export const useHeatingUpdateMember = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { email, ...updateData } = member;
      const { data } = await heatingApi.patch(
        `/api/heating_ocr/member/${id}`,
        null,
        {
          params: updateData,
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["heating-ocr", "members"] });
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
      queryClient.invalidateQueries({ queryKey: ["heating-ocr", "members"] });
    },
  });
};

export const useHeatingCurrentMember = () => {
  return useQuery<Member, AxiosError<ApiError>>({
    queryKey: ["heating-ocr", "members", "me"],
    queryFn: async () => {
      const { data } = await heatingApi.get<Member>(
        "/api/heating_ocr/member/me",
      );
      return data;
    },
    retry: (_, error) => error?.response?.status !== 404,
  });
};
