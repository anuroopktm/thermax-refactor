import { useQuery } from "@tanstack/react-query";
import { ssoApi } from "@/services/interceptor";
import type { AxiosError } from "axios";
import type { ApiError } from "../../api.types";
import type { AppItem, AppListResponse } from "./types";

import salesEnablementImg from "@/assets/ai-studio/sales-enablement.png";
import tbwesOcrImg from "@/assets/ai-studio/tbwes-ocr.png";
import edgeBotImg from "@/assets/ai-studio/edge-bot.png";
import documentTranslatorImg from "@/assets/ai-studio/document-translator.png";
import thermaxGptImg from "@/assets/ai-studio/thermax-gpt.png";
import drConbotImg from "@/assets/ai-studio/dr-conbot.png";
import troubleshootingImg from "@/assets/ai-studio/troubleshooting.png";
import cyberbuddyImg from "@/assets/ai-studio/cyberbuddy.png";
import heatingOcrImg from "@/assets/ai-studio/heating-ocr.png";
import transmitterOcrImg from "@/assets/ai-studio/transmitter-ocr.png";

const appMetadata: Record<string, { imageUrl: string; path: string }> = {
  "Sales Enablement Tool": {
    imageUrl: salesEnablementImg,
    path: "/sales-enablement",
  },
  "TBWES OCR": {
    imageUrl: tbwesOcrImg,
    path: "/tbwes-ocr",
  },
  "Edge Bot": {
    imageUrl: edgeBotImg,
    path: "/edge-bot",
  },
  "Document Translator": {
    imageUrl: documentTranslatorImg,
    path: "/document-translator",
  },
  "Thermax-GPT": {
    imageUrl: thermaxGptImg,
    path: "/thermax-gpt",
  },
  "Dr. ConBot": {
    imageUrl: drConbotImg,
    path: "/dr-conbot",
  },
  "Smart Troubleshooting App": {
    imageUrl: troubleshootingImg,
    path: "/troubleshooting",
  },
  CyberBuddy: {
    imageUrl: cyberbuddyImg,
    path: "/cyberbuddy",
  },
  "Heating OCR": {
    imageUrl: heatingOcrImg,
    path: "/heating-ocr",
  },
  "Transmitter OCR": {
    imageUrl: transmitterOcrImg,
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
        imageUrl: appMetadata[item.title]?.imageUrl || thermaxGptImg,
        path: appMetadata[item.title]?.path || "#",
      })),
  });
};
