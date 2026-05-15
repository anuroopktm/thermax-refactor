import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tbwesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { Member as TbwesMember } from "./types";
import { type MemberForm } from "@/lib/validations/members.schema";
import {
  mapTbwesMembersResponse,
  mapToMember,
} from "@/pages/tbwes-ocr/lib/tbwes-mappers";
import { tbwesOcrKeys } from "./keys";
import { type Member } from "@/services/query/shared/types";

export const useTbwesMembers = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
  role?: string | null;
}) => {
  return useQuery({
    queryKey: tbwesOcrKeys.members.list(params),
    queryFn: async () => {
      const { data } = await tbwesApi.get("/api/tbwes_ocr/member", { params });
      return data;
    },
    select: mapTbwesMembersResponse,
  });
};

export const useTbwesCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      await tbwesApi.post("/api/tbwes_ocr/member", null, {
        params: member,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tbwesOcrKeys.members.all });
    },
  });
};

export const useTbwesUpdateMember = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { email, ...updateData } = member;
      await tbwesApi.patch(`/api/tbwes_ocr/member/${id}`, null, {
        params: updateData,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tbwesOcrKeys.members.all });
    },
  });
};

export const useTbwesDeleteMember = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await tbwesApi.delete(`/api/tbwes_ocr/member/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tbwesOcrKeys.members.all });
    },
  });
};

export const useTbwesCurrentMember = () => {
  return useQuery<TbwesMember, AxiosError<ApiError>, Member>({
    queryKey: tbwesOcrKeys.members.me(),
    queryFn: async () => {
      const { data } = await tbwesApi.get("/api/tbwes_ocr/member/me");
      return data;
    },
    select: mapToMember,
    retry: (_, error) => error?.response?.status !== 404,
  });
};
