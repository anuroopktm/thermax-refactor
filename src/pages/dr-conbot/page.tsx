import { SidebarProvider } from "@/components/ui/sidebar";
import { PATHS } from "@/routes/constants/routes";
import { ChatInterface } from "@/components/shared/chat/chat-interface";
import {
  useDrConbotChat as useDrConbotChatList,
  useDrConbotUpdateChat,
  useDrConbotDeleteChat,
  useDrConbotClearHistory,
} from "@/services/query/dr-conbot/chat.service";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useDrConbotChat } from "./hooks/use-dr-conbot-chat";
import { ChatSidebar } from "@/components/shared/chat/sidebar/chat-sidebar";
import { ChatActionsWrapper } from "@/components/shared/chat/actions/chat-actions-wrapper";

export default function DrConbotPage() {
  const navigate = useNavigate();

  const { chatId } = useParams();

  const { data: chats, isLoading: isChatsLoading } = useDrConbotChatList();
  const { messages, isLoading, isTyping, sendMessage, isCreating } =
    useDrConbotChat(chatId);

  const updateChat = useDrConbotUpdateChat();
  const deleteChat = useDrConbotDeleteChat();
  const clearHistory = useDrConbotClearHistory();

  const handleNewChat = () => navigate(PATHS.DR_CONBOT.ROOT, { replace: true });

  const handleUpdateChat = async (chatId: number, title: string) => {
    toast.promise(
      updateChat.mutateAsync({
        chatId,
        payload: { title },
      }),
      {
        loading: "Renaming chat...",
        success: "Chat renamed successfully",
        error: "Failed to rename chat",
      },
    );
  };

  const handleDeleteChat = async (chatIdToDelete: number) => {
    toast.promise(deleteChat.mutateAsync(chatIdToDelete), {
      loading: "Deleting chat...",
      success: () => {
        if (String(chatIdToDelete) === String(chatId)) {
          navigate(PATHS.DR_CONBOT.ROOT);
        }
        return "Chat deleted successfully";
      },
      error: "Failed to delete chat",
    });
  };

  const handleClearHistory = async () => {
    toast.promise(clearHistory.mutateAsync(), {
      loading: "Clearing conversations...",
      success: () => {
        navigate(PATHS.DR_CONBOT.ROOT);
        return "All conversations cleared";
      },
      error: "Failed to clear conversations",
    });
  };

  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <ChatSidebar
          chats={chats}
          isLoading={isChatsLoading}
          isCreating={isCreating}
          isClearing={clearHistory.isPending}
          onNewChat={handleNewChat}
          onClearHistory={handleClearHistory}
          onChatSelect={(chat) =>
            navigate(`${PATHS.DR_CONBOT.ROOT}/${chat.id}`)
          }
          onSettingsClick={() => navigate(PATHS.DR_CONBOT.SETTINGS.ROOT)}
          activeChatId={chatId}
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

        <ChatInterface
          messages={messages}
          isLoading={isLoading}
          isTyping={isTyping}
          onSend={sendMessage}
          fileSupport={false}
          modelSupport={false}
          disclaimer="Dr. Conbot can make mistakes. Check important info."
        />
      </div>
    </SidebarProvider>
  );
}
