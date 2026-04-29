import type { ReactNode } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface TabOption {
  value: string;
  label: string;
}

interface TabbedContentLayoutProps {
  tabs: TabOption[];
  activeTab: string;
  onTabChange: (value: string) => void;
  extraActions?: ReactNode;
  children: ReactNode;
  tabsClassName?: string;
}

export function TabbedContentLayout({
  tabs,
  activeTab,
  onTabChange,
  extraActions,
  children,
  tabsClassName,
}: TabbedContentLayoutProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <TabsList className={cn("h-10! gap-6", tabsClassName)}>
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {extraActions}
          </div>
          <div className="mt-6">{children}</div>
        </Tabs>
      </div>
    </div>
  );
}
