import { Lightbulb } from "lucide-react";
import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarSeparator,
} from "@/components/ui/sidebar";

export function SimilarQuestions() {
  const questions = [
    "What are the key benefits of Thermax chillers?",
    "How to install the latest cooling system?",
    "Service maintenance schedule for solar panels",
  ];

  // const questions = []

  return (
    <aside className="hidden w-80 flex-col border-l border-border bg-background lg:flex">
      <SidebarHeader className="h-16 px-4 flex-row items-center">
        <Lightbulb className="size-5 text-primary" />
        Similar Questions
      </SidebarHeader>
      <SidebarSeparator />

      {/* Content */}
      <SidebarContent>
        {questions.length > 0 ? (
          <SidebarGroup>
            <SidebarMenu className="gap-2">
              {questions.map((q, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuButton className="h-auto min-h-9 cursor-pointer transition hover:bg-muted text-foreground">
                    {q}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
            <Lightbulb className="size-10 text-primary mb-4" />
            <h4 className="font-medium text-foreground mb-1.5">
              No similar questions
            </h4>
            <p className="text-[13px] text-muted-foreground max-w-60">
              Ask a question in the chat to see related queries here.
            </p>
          </div>
        )}
      </SidebarContent>
    </aside>
  );
}
