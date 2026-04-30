import { SidebarProvider } from "@/components/ui/sidebar";
import { HeatingSidebar } from "./components/sidebar/heating-sidebar";
import { Outlet } from "react-router-dom";

export default function HeatingOcrPage() {
  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <HeatingSidebar />
        <main className="flex-1 flex flex-col overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
