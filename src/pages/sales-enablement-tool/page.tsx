import { ChatSidebar } from "./components/chat-sidebar";
import { ChatInterface } from "./components/chat-interface";
import { SimilarQuestions } from "./components/similar-questions";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function SalesEnablementPage() {
  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <ChatSidebar />

        <div className="flex flex-1 overflow-hidden">
          <ChatInterface />
          <SimilarQuestions />
        </div>
      </div>
    </SidebarProvider>
  );
}
