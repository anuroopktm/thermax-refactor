import { SidebarProvider } from "@/components/ui/sidebar";
import { TbwesSidebar } from "./components/sidebar/tbwes-sidebar";
import { Outlet } from "react-router-dom";

export default function TbwesOcrPage() {
  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <TbwesSidebar />
        <main className="flex-1 flex flex-col overflow-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
