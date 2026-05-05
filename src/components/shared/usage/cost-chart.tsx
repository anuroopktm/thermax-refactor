import { memo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

import { BarChart3 } from "lucide-react";

interface ChartRow {
  day: string | number;
  cost: number;
}

interface Props {
  data?: ChartRow[];
  isLoading?: boolean;
  month?: string;
  year?: string;
}

const CONFIG = {
  cost: {
    label: "Cost",
    color: "var(--chart-1)",
  },
};

export function CostChart({
  data,
  isLoading,
  month = "April",
  year = "2026",
}: Props) {
  const hasData = !!data?.length;

  return (
    <Card className="lg:col-span-2 flex flex-col">
      <CardHeader>
        <CardTitle>Monthly Spend</CardTitle>
        <CardDescription>
          Workspace expenses for {month} {year}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 min-h-[300px]">
        {isLoading ? (
          <Skeleton className="h-full w-full rounded-lg" />
        ) : hasData ? (
          <ChartContainer
            config={CONFIG}
            className="h-[300px] sm:h-[350px] lg:h-[400px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={data}
              margin={{ top: 10, right: 10, left: 20, bottom: 30 }}
            >
              <CartesianGrid vertical={false} />

              <XAxisComponent />
              <YAxisComponent />

              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />

              <Bar dataKey="cost" fill="var(--color-cost)" radius={3} />
            </BarChart>
          </ChartContainer>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
}

/* ---------------- EMPTY STATE ---------------- */

const EmptyState = memo(() => {
  return (
    <Empty className="h-full">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <BarChart3 className="size-8" />
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

/* ---------------- AXIS COMPONENTS ---------------- */

const XAxisComponent = memo(() => {
  return (
    <XAxis
      dataKey="day"
      axisLine={false}
      tickLine={false}
      tickMargin={10}
      label={{
        value: "Day",
        position: "insideBottom",
        offset: -25,
        className: "text-xs font-bold",
      }}
    />
  );
});

XAxisComponent.displayName = "XAxisComponent";

const YAxisComponent = memo(() => {
  return (
    <YAxis
      axisLine={false}
      tickLine={false}
      tickMargin={10}
      label={{
        value: "Spend ($)",
        angle: -90,
        position: "insideLeft",
        offset: -10,
        className: "text-xs font-bold",
      }}
    />
  );
});

YAxisComponent.displayName = "YAxisComponent";
