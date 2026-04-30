import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { tbwesApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import { getInitials } from "@/lib/utils";
import dayjs from "dayjs";
import type {
  Activity,
  ActivityWithCount,
  ActivityUpdateInput,
  MemberWithCount,
  ActivityUsage,
  CostUsage,
  ActivityYearUsage,
  CostUsageByYear,
  ActivityUsageStatusStats,
  ActivityUsageTopUser,
} from "./tbwes-ocr.types";
import { type MemberForm } from "@/validations/members.schema";

/**
 * Activities
 */

export const useTbwesActivities = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
  status?: string | null;
  user_status?: "ALL" | "BY_ME" | "BY_OTHERS";
}) => {
  return useQuery({
    queryKey: ["tbwes-ocr", "activities", params],
    queryFn: async () => {
      const { data } = await tbwesApi.get<ActivityWithCount>(
        "/api/tbwes_ocr/activity",
        { params },
      );
      return data;
    },
    select: (data) => ({
      ...data,
      result: data.result.map((activity) => ({
        ...activity,
        // Map to SharedActivityCard format
        id: String(activity.id),
        title: activity.title,
        createdAt: dayjs(activity.created_on).format("DD/MM/YYYY"),
        status: activity.status.replace(/_/g, " "),
        userInitials: getInitials(activity.user?.name),
      })),
    }),
  });
};

export const useTbwesActivityDetail = (id?: string | number) => {
  return useQuery<Activity, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "activity", id],
    enabled: !!id,
    queryFn: async () => {
      const { data } = await tbwesApi.get<Activity>(
        `/api/tbwes_ocr/activity/${id}`,
      );
      return data;
    },
  });
};

export const useTbwesCreateActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<Activity, AxiosError<ApiError>, FormData>({
    mutationFn: async (formData: FormData) => {
      const { data } = await tbwesApi.post<Activity>(
        "/api/tbwes_ocr/activity",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "activities"] });
    },
  });
};

export const useTbwesUpdateActivity = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<Activity, AxiosError<ApiError>, ActivityUpdateInput>({
    mutationFn: async (input: ActivityUpdateInput) => {
      const { data } = await tbwesApi.patch<Activity>(
        `/api/tbwes_ocr/activity/${id}`,
        input,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tbwes-ocr", "activity", id],
      });
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "activities"] });
    },
  });
};

export const useTbwesDeleteActivity = () => {
  const queryClient = useQueryClient();
  return useMutation<void, AxiosError<ApiError>, string | number>({
    mutationFn: async (id: string | number) => {
      await tbwesApi.delete(`/api/tbwes_ocr/activity/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "activities"] });
    },
  });
};

/**
 * Members
 */

export const useTbwesMembers = (params?: {
  skip?: number;
  limit?: number;
  search_term?: string | null;
}) => {
  return useQuery({
    queryKey: ["tbwes-ocr", "members", params],
    queryFn: async () => {
      const { data } = await tbwesApi.get<MemberWithCount>(
        "/api/tbwes_ocr/member",
        { params },
      );
      return data;
    },
    select: (data) => ({
      ...data,
      result: data.result.map((member) => ({
        ...member,
        id: String(member.id),
        role: member.role.toUpperCase() as "OWNER" | "MEMBER" | "VIEWER",
      })),
    }),
  });
};

export const useTbwesCreateMember = () => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { data } = await tbwesApi.post("/api/tbwes_ocr/member", member);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "members"] });
    },
  });
};

export const useTbwesUpdateMember = (id: string | number) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ApiError>, MemberForm>({
    mutationFn: async (member: MemberForm) => {
      const { email, ...updateData } = member;
      const { data } = await tbwesApi.patch(
        `/api/tbwes_ocr/member/${id}`,
        updateData,
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "members"] });
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
      queryClient.invalidateQueries({ queryKey: ["tbwes-ocr", "members"] });
    },
  });
};

/**
 * Usage
 */

export const useTbwesCostUsage = (year: number, month: number) => {
  return useQuery<CostUsage, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "cost", year, month],
    queryFn: async () => {
      const { data } = await tbwesApi.post<CostUsage>(
        "/api/tbwes_ocr/usage/cost",
        null,
        { params: { year, month } },
      );
      return data;
    },
  });
};

export const useTbwesActivityUsage = (year: number, month: number) => {
  return useQuery<ActivityUsage, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "activity", year, month],
    queryFn: async () => {
      const { data } = await tbwesApi.get<ActivityUsage>(
        "/api/tbwes_ocr/usage/activity",
        { params: { year, month } },
      );
      return data;
    },
  });
};

export const useTbwesCostUsageByYear = (year: number) => {
  return useQuery<CostUsageByYear, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "cost-year", year],
    queryFn: async () => {
      const { data } = await tbwesApi.get<CostUsageByYear>(
        "/api/tbwes_ocr/usage/year-cost",
        { params: { year } },
      );
      return data;
    },
  });
};

export const useTbwesActivityUsageByYear = (year: number) => {
  return useQuery<ActivityYearUsage, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "activity-year", year],
    queryFn: async () => {
      const { data } = await tbwesApi.get<ActivityYearUsage>(
        "/api/tbwes_ocr/usage/year-usage",
        { params: { year } },
      );
      return data;
    },
  });
};

export const useTbwesActivityStats = (year: number, month: number) => {
  return useQuery<ActivityUsageStatusStats, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "stats", year, month],
    queryFn: async () => {
      const { data } = await tbwesApi.get<ActivityUsageStatusStats>(
        "/api/tbwes_ocr/usage/activity/stats",
        { params: { year, month } },
      );
      return data;
    },
  });
};

export const useTbwesTopUsers = (
  year: number,
  month: number,
  n: number = 5,
) => {
  return useQuery<ActivityUsageTopUser, AxiosError<ApiError>>({
    queryKey: ["tbwes-ocr", "usage", "top-users", year, month, n],
    queryFn: async () => {
      const { data } = await tbwesApi.get<ActivityUsageTopUser>(
        "/api/tbwes_ocr/usage/activity/top",
        { params: { year, month, n } },
      );
      return data;
    },
  });
};
