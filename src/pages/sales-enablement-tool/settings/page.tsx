import { SidebarProvider } from "@/components/ui/sidebar";
import { SettingsSidebar } from "../components/settings/components/sidebar/settings-sidebar";
import { Outlet } from "react-router-dom";

export default function SalesEnablementSettingsPage() {
  return (
    <SidebarProvider>
      <div className="flex h-[calc(100vh-4rem)] w-full">
        <SettingsSidebar />
        <main className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
