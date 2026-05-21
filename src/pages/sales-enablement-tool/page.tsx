import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ChatSidebar } from "@/components/shared/chat/sidebar/chat-sidebar";
import { ChatInterface } from "@/components/shared/chat/chat-interface";
import { ChatActionsWrapper } from "@/components/shared/chat/actions/chat-actions-wrapper";
import { PATHS } from "@/routes/constants/routes";
import {
  useChats,
  useUpdateChat,
  useDeleteChat,
  useClearChats,
} from "@/services/query/sales-enablement/chat.service";
import salesEnablementImg from "@/assets/ai-studio/sales-enablement.png";
import { useSalesEnablementChat } from "./hooks/use-sales-enablement-chat";

export default function SalesEnablementPage() {
  const navigate = useNavigate();
  const { chatId } = useParams<{ chatId?: string }>();

  const { data: chats = [], isLoading: isChatsLoading } = useChats();
  const updateChat = useUpdateChat();
  const deleteChat = useDeleteChat();
  const clearChats = useClearChats();

  const {
    messages,
    isLoading,
    isTyping,
    sendMessage,
    isCreating,
    similarQuestions,
    isSimilarLoading,
  } = useSalesEnablementChat(chatId);

  const handleNewChat = () => {
    navigate(PATHS.SALES_ENABLEMENT.ROOT);
  };

  const handleUpdateChat = async (targetId: number, title: string) => {
    toast.promise(updateChat.mutateAsync({ chatId: targetId, title }), {
      loading: "Renaming chat...",
      success: "Chat renamed successfully",
      error: "Failed to rename chat",
    });
  };

  const handleDeleteChat = async (idToDelete: string) => {
    toast.promise(deleteChat.mutateAsync(idToDelete), {
      loading: "Deleting chat...",
      success: () => {
        if (chatId === idToDelete) {
          navigate(PATHS.SALES_ENABLEMENT.ROOT);
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
        navigate(PATHS.SALES_ENABLEMENT.ROOT);
        return "All history cleared";
      },
      error: "Failed to clear history",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <ChatSidebar
          chats={chats}
          isLoading={isChatsLoading}
          isCreating={isCreating}
          isClearing={clearChats.isPending}
          onNewChat={handleNewChat}
          onClearHistory={handleClearHistory}
          onChatSelect={(chat) =>
            navigate(`${PATHS.SALES_ENABLEMENT.ROOT}/${chat.id}`)
          }
          onSettingsClick={() => navigate(PATHS.SALES_ENABLEMENT.SETTINGS.ROOT)}
          activeChatId={chatId}
          renderChatActions={(chat) => (
            <ChatActionsWrapper
              chat={chat}
              onUpdate={(title) => handleUpdateChat(chat.id, title)}
              onDelete={() => handleDeleteChat(String(chat.id))}
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
            onSend={sendMessage}
            fileSupport={false}
            modelSupport={false}
            suggestions={similarQuestions}
            isSuggestionsLoading={isSimilarLoading}
            disclaimer="Sales Enablement Tool can make mistakes. Please verify important information."
            emptyStateImage={salesEnablementImg}
            emptyStateTitle="Sales Enablement Tool"
            emptyStateDescription="Empowering sales teams with smart documents diagnostics, Q&A support, and technical breakdowns."
          />
        </div>
      </div>
    </SidebarProvider>
  );
}
