import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/shared/chat/sidebar/chat-sidebar";
import { ChatInterface } from "@/components/shared/chat/chat-interface";
import { SimilarQuestions } from "@/components/shared/chat/similar-questions";
import { ChatActionsWrapper } from "@/components/shared/chat/actions/chat-actions-wrapper";
import { PATHS } from "@/routes/constants/routes";
import { toast } from "sonner";
import salesEnablementImg from "@/assets/ai-studio/sales-enablement.png";
import {
  useChats,
  useCreateChat,
  useUpdateChat,
  useDeleteChat,
  useChatHistory,
  useSendChatMessage,
  useClearChats,
  useSimilarQuestions,
} from "@/services/query/sales-enablement/chat.service";

export default function SalesEnablementPage() {
  const navigate = useNavigate();
  const [activeChatId, setActiveChatId] = useState<number | undefined>(
    undefined,
  );
  const [latestQuestion, setLatestQuestion] = useState<string>("");

  const { data: chats = [], isLoading: isChatsLoading } = useChats();
  const { data: messages = [], isLoading: isHistoryLoading } =
    useChatHistory(activeChatId);

  const createChat = useCreateChat();
  const updateChat = useUpdateChat();
  const deleteChat = useDeleteChat();
  const sendChatMessage = useSendChatMessage();
  const clearChats = useClearChats();

  const { data: similarQuestions = [], isLoading: isSimilarLoading } =
    useSimilarQuestions(latestQuestion);

  // Automatically select the first chat if none is selected and chats exist
  useEffect(() => {
    if (!activeChatId && chats.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveChatId(chats[0].id);
    }
  }, [chats, activeChatId]);

  const handleNewChat = () => {
    setActiveChatId(undefined);
  };

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    setLatestQuestion(content);

    try {
      let chatId = activeChatId;

      // 1. If no active chat session, create one first
      if (!chatId) {
        const title =
          content.length > 25 ? content.substring(0, 25) + "..." : content;
        const newChat = await createChat.mutateAsync(title);
        chatId = newChat.id;
        setActiveChatId(chatId);
      }

      // 2. Send the message
      await sendChatMessage.mutateAsync({ chatId, messageText: content });
    } catch {
      toast.error("Failed to send message");
    }
  };

  const handleUpdateChat = async (chatId: number, title: string) => {
    toast.promise(updateChat.mutateAsync({ chatId, title }), {
      loading: "Renaming chat...",
      success: "Chat renamed successfully",
      error: "Failed to rename chat",
    });
  };

  const handleDeleteChat = async (idToDelete: number) => {
    toast.promise(deleteChat.mutateAsync(idToDelete), {
      loading: "Deleting chat...",
      success: () => {
        if (activeChatId === idToDelete) {
          setActiveChatId(undefined);
        }
        return "Chat deleted successfully";
      },
      error: "Failed to delete chat",
    });
  };

  const handleClearHistory = async () => {
    toast.promise(clearChats.mutateAsync(), {
      loading: "Clearing history...",
      success: () => {
        setActiveChatId(undefined);
        return "All history cleared";
      },
      error: "Failed to clear history",
    });
  };

  const isTyping = sendChatMessage.isPending;
  const isLoading = isChatsLoading || (!!activeChatId && isHistoryLoading);

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <ChatSidebar
          chats={chats}
          isLoading={isChatsLoading}
          isCreating={createChat.isPending}
          isClearing={clearChats.isPending}
          onNewChat={handleNewChat}
          onClearHistory={handleClearHistory}
          onChatSelect={(chat) => setActiveChatId(chat.id)}
          onSettingsClick={() => navigate(PATHS.SALES_ENABLEMENT.SETTINGS.ROOT)}
          activeChatId={activeChatId}
          renderChatActions={(chat) => (
            <ChatActionsWrapper
              chat={chat}
              onUpdate={(title) => handleUpdateChat(chat.id, title)}
              onDelete={() => handleDeleteChat(chat.id)}
              isUpdating={updateChat.isPending}
              isDeleting={deleteChat.isPending}
            />
          )}
        />

        <div className="flex-1 flex overflow-hidden">
          <ChatInterface
            messages={messages}
            isLoading={isLoading}
            isTyping={isTyping}
            onSend={handleSend}
            fileSupport={false}
            modelSupport={false}
            disclaimer="Sales Enablement Tool can make mistakes. Please verify important information."
            emptyStateImage={salesEnablementImg}
            emptyStateTitle="Sales Enablement Tool"
            emptyStateDescription="Empowering sales teams with smart documents diagnostics, Q&A support, and technical breakdowns."
          />

          <SimilarQuestions
            questions={similarQuestions}
            isLoading={isSimilarLoading}
            onQuestionClick={handleSend}
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
