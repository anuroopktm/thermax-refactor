import { useQuery } from "@tanstack/react-query";
import { ssoApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { AppItem, AppListResponse } from "./types";

const appMetadata: Record<string, { imageUrl: string; path: string }> = {
  "Sales Enablement Tool": {
    imageUrl: "/assets/ai-studio/sales-enablement.png",
    path: "/sales-enablement",
  },
  "TBWES OCR": {
    imageUrl: "/assets/ai-studio/tbwes-ocr.png",
    path: "/tbwes-ocr",
  },
  "Edge Bot": {
    imageUrl: "/assets/ai-studio/edge-bot.png",
    path: "/edge-bot",
  },
  "Document Translator": {
    imageUrl: "/assets/ai-studio/document-translator.png",
    path: "/document-translator",
  },
  "Thermax-GPT": {
    imageUrl: "/assets/ai-studio/thermax-gpt.png",
    path: "/thermax-gpt",
  },
  "Dr. ConBot": {
    imageUrl: "/assets/ai-studio/dr-conbot.png",
    path: "/dr-conbot",
  },
  "Smart Troubleshooting App": {
    imageUrl: "/assets/ai-studio/troubleshooting.png",
    path: "/troubleshooting",
  },
  CyberBuddy: {
    imageUrl: "/assets/ai-studio/cyberbuddy.png",
    path: "/cyberbuddy",
  },
  "Heating OCR": {
    imageUrl: "/assets/ai-studio/heating-ocr.png",
    path: "/heating-ocr",
  },
  "Transmitter OCR": {
    imageUrl: "/assets/ai-studio/transmitter-ocr.png",
    path: "/transmitter-ocr",
  },
};

export const useApps = (searchTerm?: string) => {
  return useQuery<AppListResponse, AxiosError<ApiError>, AppItem[]>({
    queryKey: ["ai-studio", "apps", searchTerm],
    queryFn: async () => {
      const { data } = await ssoApi.get("/service", {
        params: {
          search_term: searchTerm,
        },
      });

      return data;
    },
    select: (data) =>
      data.result.map((item) => ({
        title: item.title,
        description: item.description,
        imageUrl:
          appMetadata[item.title]?.imageUrl || "/assets/ai-studio/default.png",
        path: appMetadata[item.title]?.path || "#",
      })),
  });
};
