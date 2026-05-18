import { PieChart, Pie, Label as RechartsLabel } from "recharts";
import { memo, useMemo, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PieChartIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UsageObject {
  used: number;
  remaining: number;
  limit: number;
  totalSpent: number;
}

interface ChartModel {
  key: string;
  value: number;
  fill: string;
}

interface Props {
  data?: ChartModel[] | UsageObject;
  isLoading?: boolean;
  isUpdating?: boolean;
  showEditButton?: boolean;
  onUpdateLimit?: (newLimit: number) => Promise<void> | void;
}

const CONFIG = {
  used: {
    label: "Used",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "Remaining",
    color: "var(--muted)",
  },
};

export function TokenUsage({
  data,
  isLoading,
  isUpdating,
  showEditButton = true,
  onUpdateLimit,
}: Props) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newLimit, setNewLimit] = useState("");

  const usage = useMemo(() => {
    if (data && !Array.isArray(data)) return data as UsageObject;
    return null;
  }, [data]);

  const chartData = useMemo((): ChartModel[] | undefined => {
    if (!data) return undefined;

    if (Array.isArray(data)) return data;

    if (usage) {
      return [
        { key: "used", value: usage.used, fill: CONFIG.used.color },
        {
          key: "remaining",
          value: usage.remaining,
          fill: CONFIG.remaining.color,
        },
      ];
    }

    return undefined;
  }, [data, usage]);

  const limit = usage?.limit ?? 0;
  const totalSpent = usage?.totalSpent ?? 0;
  const remaining = usage?.remaining ?? 0;

  const hasData = !!chartData;

  const formattedLimit = useMemo(() => limit.toFixed(2), [limit]);

  const openDialog = () => {
    setNewLimit(String(limit));
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();

    const value = Number(newLimit);
    if (isNaN(value) || !onUpdateLimit) return;

    await onUpdateLimit(value);
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Usage Limit</CardTitle>
          <CardDescription>Track costs used by your team</CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col justify-center min-h-[250px]">
          {isLoading ? (
            <Skeleton className="mx-auto aspect-square w-full max-w-[250px] rounded-full" />
          ) : hasData ? (
            <ChartContainer
              config={CONFIG}
              className="mx-auto aspect-square w-full max-w-[250px]"
            >
              <PieChart>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="key"
                  innerRadius={80}
                  outerRadius={110}
                  strokeWidth={5}
                  startAngle={90}
                  endAngle={-270}
                >
                  <ChartLabel value={totalSpent} />
                </Pie>
              </PieChart>
            </ChartContainer>
          ) : (
            <EmptyState />
          )}
        </CardContent>

        <CardFooter className="flex-col gap-4 text-center">
          {isLoading ? (
            <div className="space-y-2 w-full flex flex-col items-center">
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-3 w-32" />
            </div>
          ) : hasData ? (
            <div className="space-y-1">
              <div className="text-3xl font-bold tracking-tight">
                ${remaining}
              </div>
              <div className="text-xs text-muted-foreground">
                of ${formattedLimit} limit
              </div>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="text-3xl font-bold tracking-tight">$0.00</div>
              <div className="text-xs text-muted-foreground">
                No limit available
              </div>
            </div>
          )}

          {showEditButton && hasData && (
            <Button
              className="cursor-pointer w-full"
              disabled={isLoading || isUpdating}
              onClick={openDialog}
            >
              Increase Limit
            </Button>
          )}
        </CardFooter>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Update Limit</DialogTitle>
            <DialogDescription>
              Set a new usage limit for your account.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="limit">New Limit ($)</Label>
              <Input
                id="limit"
                type="number"
                step="0.01"
                value={newLimit}
                onChange={(e) => setNewLimit(e.target.value)}
                placeholder="Enter new limit"
                autoFocus
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isUpdating}>
                Update Limit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

/* ---------------- EMPTY STATE ---------------- */

const EmptyState = memo(() => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <PieChartIcon className="size-6" />
        </EmptyMedia>
        <EmptyTitle>No data available</EmptyTitle>
        <EmptyDescription>
          There’s no activity for the selected period.
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
});

EmptyState.displayName = "EmptyState";

/* ---------------- CHART LABEL ---------------- */

const ChartLabel = memo(({ value }: { value: string | number }) => (
  <RechartsLabel
    content={({ viewBox }) => {
      if (!viewBox || !("cx" in viewBox) || !("cy" in viewBox)) return null;

      return (
        <text
          x={viewBox.cx}
          y={viewBox.cy}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <tspan
            x={viewBox.cx}
            y={viewBox.cy}
            className="fill-foreground text-xl font-semibold"
          >
            {value}
          </tspan>
          <tspan
            x={viewBox.cx}
            y={(viewBox.cy || 0) + 24}
            className="fill-muted-foreground text-xs"
          >
            Used
          </tspan>
        </text>
      );
    }}
  />
));

ChartLabel.displayName = "ChartLabel";
