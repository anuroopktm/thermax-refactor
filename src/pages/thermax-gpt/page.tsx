import { SidebarProvider } from "@/components/ui/sidebar";
import { PATHS } from "@/routes/constants/routes";
import { ChatSidebar } from "./components/chat/chat-sidebar";
import { ChatInterface } from "./components/chat/chat-interface";
import { SimilarQuestions } from "./components/chat/similar-questions";
import {
  useThermaxGptChat,
  useThermaxGptCreateChat,
  useSimilarQuestions,
  useThermaxGptChatMessages,
  useThermaxGptCreateChatHistory,
  useThermaxGptChatHistoryStream,
} from "@/services/query/thermax-gpt/chat.service";
import type { NormalizedMessage } from "@/services/query/thermax-gpt/chat.types";
import { useNavigate, useParams } from "react-router-dom";
import { useMemo, useState } from "react";

const useThermaxChat = (chatId?: string) => {
  const navigate = useNavigate();

  const [streamingMessage, setStreamingMessage] =
    useState<NormalizedMessage | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const { data: history = [], isLoading } = useThermaxGptChatMessages(chatId);
  const sendMessageMutation = useThermaxGptCreateChatHistory();
  const createChatMutation = useThermaxGptCreateChat();

  const messages = useMemo(() => {
    return streamingMessage ? [...history, streamingMessage] : history;
  }, [history, streamingMessage]);

  const sendMessage = async (message: string) => {
    if (!message.trim()) return;

    try {
      setIsTyping(true);

      let currentChatId = chatId;

      if (!currentChatId) {
        const newChat = await createChatMutation.mutateAsync({
          title: message.trim(),
          type: "",
        });

        currentChatId = newChat.id;

        navigate(`${PATHS.THERMAX_GPT.ROOT}/${currentChatId}`, {
          replace: true,
        });
      }

      const historyItem = await sendMessageMutation.mutateAsync({
        chatId: currentChatId,
        human: message.trim(),
      });

      setStreamingMessage({
        id: `${crypto.randomUUID()}-ai`,
        role: "assistant",
        content: "",
        isThinking: true,
      });

      await useThermaxGptChatHistoryStream(currentChatId, historyItem.id, {
        onChunk: (_, fullText) => {
          setStreamingMessage({
            id: `${crypto.randomUUID()}-ai`,
            role: "assistant",
            content: fullText,
            isThinking: true,
          });
        },

        onEnd: (fullText) => {
          setStreamingMessage({
            id: `${crypto.randomUUID()}-ai`,
            role: "assistant",
            content: fullText,
          });

          setIsTyping(false);
        },

        onError: () => {
          setIsTyping(false);
          setStreamingMessage(null);
        },
      });
    } catch (error) {
      setIsTyping(false);
      setStreamingMessage(null);

      console.error(error);
    }
  };
  return {
    messages,
    isLoading,
    isTyping,
    sendMessage,
    isSending: sendMessageMutation.isPending,
  };
};

export default function ThermaxGptPage() {
  const navigate = useNavigate();

  const { chatId } = useParams();

  const { data: chats, isLoading: isChatsLoading } = useThermaxGptChat();

  const createChat = useThermaxGptCreateChat();

  const { messages, isLoading, isTyping, sendMessage } = useThermaxChat(chatId);

  const { data: questions, isLoading: isQuestionsLoading } =
    useSimilarQuestions();

  const handleNewChat = async () => {
    try {
      const newChat = await createChat.mutateAsync({
        title: "New Chat",
        type: "",
      });

      navigate(`${PATHS.THERMAX_GPT.ROOT}/${newChat.id}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <ChatSidebar
          chats={chats}
          isLoading={isChatsLoading}
          isCreating={createChat.isPending}
          onNewChat={handleNewChat}
          onChatSelect={(chat) =>
            navigate(`${PATHS.THERMAX_GPT.ROOT}/${chat.id}`)
          }
          onSettingsClick={() => navigate(PATHS.THERMAX_GPT.SETTINGS.ROOT)}
          activeChatId={chatId}
        />

        <div className="flex flex-1 overflow-hidden">
          <ChatInterface
            messages={messages}
            isLoading={isLoading}
            isTyping={isTyping}
            onSend={sendMessage}
          />

          <SimilarQuestions
            questions={questions}
            isLoading={isQuestionsLoading}
            onQuestionClick={sendMessage}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
