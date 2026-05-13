import { Skeleton } from "@/components/ui/skeleton";
import { SidebarMenuItem } from "@/components/ui/sidebar";

export function ChatSidebarLoading() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <SidebarMenuItem key={i}>
          <Skeleton className="h-9 w-full rounded-md" />
        </SidebarMenuItem>
      ))}
    </>
  );
}
