import { usePlateGroups, type PlateGroup } from "../hooks/use-plate-groups";
import { PlateGroupsHeader } from "../components/plate-groups/plate-groups-header";
import { PlateGroupsCard } from "../components/plate-groups/plate-groups-card";
import { PlateGroupsFooter } from "../components/plate-groups/plate-groups-footer";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyHeader,
  EmptyTitle,
  EmptyDescription,
  EmptyMedia,
} from "@/components/ui/empty";
import { LayoutGrid } from "lucide-react";

export function PlateGroupsView() {
  const { activity, groups, totalInvalidCount, isLoading, isEmpty } =
    usePlateGroups();

  return (
    <div className="flex flex-col h-full">
      <PlateGroupsHeader
        title={activity?.title}
        totalInvalidCount={totalInvalidCount}
      />

      <main className="flex-1 overflow-auto p-4 md:p-6">
        <PlateGroupsContent
          isLoading={isLoading}
          isEmpty={isEmpty}
          groups={groups}
        />
      </main>

      {!isEmpty && <PlateGroupsFooter totalInvalidCount={totalInvalidCount} />}
    </div>
  );
}

/* ---------------- Content Renderer ---------------- */

function PlateGroupsContent({
  isLoading,
  isEmpty,
  groups,
}: {
  isLoading: boolean;
  isEmpty: boolean;
  groups: PlateGroup[];
}) {
  if (isLoading) return <PlateGroupsSkeleton />;
  if (isEmpty) return <PlateGroupsEmpty />;

  return <PlateGroupsGrid groups={groups} />;
}

/* ---------------- Loading ---------------- */

function PlateGroupsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Skeleton key={i} className="h-48 w-full rounded-xl" />
      ))}
    </div>
  );
}

/* ---------------- Empty ---------------- */

function PlateGroupsEmpty() {
  return (
    <div className="h-full flex items-center justify-center">
      <Empty className="border-none">
        <EmptyHeader>
          <EmptyMedia>
            <LayoutGrid className="size-10 text-muted-foreground" />
          </EmptyMedia>
          <EmptyTitle>No Plate Groups Found</EmptyTitle>
          <EmptyDescription>
            This activity doesn't contain any identified plate groups.
          </EmptyDescription>
        </EmptyHeader>
      </Empty>
    </div>
  );
}

/* ---------------- Card Grid ---------------- */

function PlateGroupsGrid({ groups }: { groups: PlateGroup[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {groups.map((group) => (
        <PlateGroupsCard key={group.id} group={group} />
      ))}
    </div>
  );
}
