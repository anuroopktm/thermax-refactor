import { ChatSidebar } from "@/components/shared/chat/sidebar/chat-sidebar";
import { ChatInterface } from "@/components/shared/chat/chat-interface";
import { SimilarQuestions } from "@/components/shared/chat/similar-questions";
import { SidebarProvider } from "@/components/ui/sidebar";
import salesEnablementImg from "@/assets/ai-studio/sales-enablement.png";

export default function SalesEnablementPage() {
  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <ChatSidebar
          chats={[]}
          isLoading={false}
          onNewChat={() => {}}
          onSettingsClick={() => {}}
        />

        <div className="flex-1 flex overflow-hidden">
          <ChatInterface
            messages={[]}
            onSend={() => {}}
            isLoading={false}
            isTyping={false}
            disclaimer="Sales Enablement Tool can make mistakes. Check important info."
            emptyStateImage={salesEnablementImg}
            emptyStateTitle="Sales Enablement Tool"
            emptyStateDescription="Your advanced intelligence engine for processing tender documents, specifications, and sales insights."
          />
          <SimilarQuestions questions={[]} isLoading={false} />
        </div>
      </div>
    </SidebarProvider>
  );
}
