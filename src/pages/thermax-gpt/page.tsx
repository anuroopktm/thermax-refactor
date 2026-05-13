import { SidebarProvider } from "@/components/ui/sidebar";
import { PATHS } from "@/routes/constants/routes";
import { ChatInterface } from "@/components/shared/chat/chat-interface";
import {
  useThermaxGptChat,
  useThermaxGptUpdateChat,
  useThermaxGptDeleteChat,
  useThermaxGptClearHistory,
} from "@/services/query/thermax-gpt/chat.service";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useThermaxChat } from "./hooks/use-thermax-chat";
import { ChatSidebar } from "@/components/shared/chat/sidebar/chat-sidebar";
import { ChatActionsWrapper } from "@/components/shared/chat/actions/chat-actions-wrapper";

export default function ThermaxGptPage() {
  const navigate = useNavigate();

  const { chatId } = useParams();

  const { data: chats, isLoading: isChatsLoading } = useThermaxGptChat();
  const { messages, isLoading, isTyping, sendMessage, isCreating } =
    useThermaxChat(chatId);

  const updateChat = useThermaxGptUpdateChat();
  const deleteChat = useThermaxGptDeleteChat();
  const clearHistory = useThermaxGptClearHistory();

  const handleNewChat = () => navigate(PATHS.THERMAX_GPT.ROOT);

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
          navigate(PATHS.THERMAX_GPT.ROOT);
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
        navigate(PATHS.THERMAX_GPT.ROOT);
        return "All conversations cleared";
      },
      error: "Failed to clear conversations",
    });
  };

  console.log("messages", messages);

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
            navigate(`${PATHS.THERMAX_GPT.ROOT}/${chat.id}`)
          }
          onSettingsClick={() => navigate(PATHS.THERMAX_GPT.SETTINGS.ROOT)}
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
        />
      </div>
    </SidebarProvider>
  );
}
