import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { SignInFormValues } from "@/pages/sign-in/validations/sign-in.schema";
import type { SignInResponse, UserMeResponse } from "./auth.types";

export const useSignIn = () => {
  return useMutation<SignInResponse, AxiosError<ApiError>, SignInFormValues>({
    mutationFn: async (user: SignInFormValues) => {
      const params = new URLSearchParams();
      params.append("username", user.email);
      params.append("password", user.password);

      const { data } = await api.post<SignInResponse>(
        "/api/login/access-token",
        params,
      );

      // Save token to localStorage
      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.removeItem("chat_id");
      }

      return data;
    },
  });
};

export const useAuthUrl = () => {
  return useMutation<string, AxiosError<ApiError>>({
    mutationFn: async () => {
      const { data } = await api.get<string>("/api/microsoft/login", {
        params: { redirect: "/ai-studio" },
      });
      return data;
    },
  });
};

export const useExchangeCode = () => {
  return useMutation<SignInResponse, AxiosError<ApiError>, string>({
    mutationFn: async (params: string) => {
      const { data } = await api.get<SignInResponse>(
        `/api/login/access-token?${params}`,
      );

      if (data.access_token) {
        localStorage.setItem("access_token", data.access_token);
        localStorage.removeItem("chat_id");
      }

      return data;
    },
  });
};

export const useMe = () => {
  return useQuery<UserMeResponse, AxiosError<ApiError>>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await api.get<UserMeResponse>("/api/user/me/");
      return response.data;
    },
  });
};
