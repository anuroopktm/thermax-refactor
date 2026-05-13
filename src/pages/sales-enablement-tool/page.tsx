import { ChatSidebar } from "@/components/shared/chat/chat-sidebar";
import { ChatInterface } from "@/components/shared/chat/chat-interface";
import { SimilarQuestions } from "@/components/shared/chat/similar-questions";
import { SidebarProvider } from "@/components/ui/sidebar";
import { PATHS } from "@/routes/constants/routes";

export default function SalesEnablementPage() {
  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <ChatSidebar
          basePath={PATHS.SALES_ENABLEMENT.ROOT}
          settingsPath={PATHS.SALES_ENABLEMENT.SETTINGS.ROOT}
        />

        <div className="flex flex-1 overflow-hidden">
          <ChatInterface />
          <SimilarQuestions />
        </div>
      </div>
    </SidebarProvider>
  );
}
