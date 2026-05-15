import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useTopUsers } from "@/services/query/sales-enablement/usage.service";
import { Skeleton } from "@/components/ui/skeleton";
import type { TopUserModel } from "@/services/query/sales-enablement/types/usage.types";

export function TopUsersList() {
  const { data: topUsers = [], isLoading: isTopUsersLoading } = useTopUsers();

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Top Users</CardTitle>
        <CardDescription>Track questions asked by your team</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 space-y-4 overflow-y-auto max-h-[400px] lg:max-h-none">
        {isTopUsersLoading ? (
          <SkeletonGrid />
        ) : (
          <TopUsersGrid data={topUsers} />
        )}
      </CardContent>
    </Card>
  );
}

/* ---------------- Skeleton Grid ---------------- */

function SkeletonGrid() {
  return Array.from({ length: 4 }).map((_, i) => (
    <div key={i} className="flex items-center gap-3">
      <Skeleton className="size-9 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-2 w-full" />
      </div>
    </div>
  ));
}

/* ----------------Top Users Grid ---------------- */

function TopUsersGrid({ data }: { data: TopUserModel[] }) {
  return data?.map((user, idx) => (
    <div key={idx} className="flex items-center gap-3">
      <Avatar className="size-8">
        <AvatarFallback className="text-xs">{user.initial}</AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex justify-between text-sm font-medium">
          {user.name}
        </div>

        <div className="text-xs text-muted-foreground truncate">
          {user.email}
        </div>

        <Progress
          className="mt-1.25 bg-muted rounded-full h-1.5 [&>div]:h-1.5"
          value={user.value}
        />
      </div>
    </div>
  ));
}
