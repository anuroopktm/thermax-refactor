import { SidebarProvider } from "@/components/ui/sidebar";
import { TransmitterSidebar } from "./components/sidebar/transmitter-sidebar";
import { Outlet } from "react-router-dom";

export default function TransmitterOcrPage() {
  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <TransmitterSidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
