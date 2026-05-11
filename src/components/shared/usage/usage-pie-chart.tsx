import { PieChart, Pie, Label as RechartsLabel } from "recharts";
import { memo, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { PieChart as PieChartIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface UsagePieChartItem {
  key: string;
  value: number;
  fill: string;
}

interface UsagePieChartProps {
  title: string;
  description?: string;
  data?: UsagePieChartItem[];
  centerLabel?: string | number;
  centerSubLabel?: string;
  footerAmount?: string | number;
  footerLimit?: string | number;
  isLoading?: boolean;
  className?: string;
}

const DEFAULT_CONFIG = {
  used: {
    label: "Used",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "Remaining",
    color: "var(--muted)",
  },
} satisfies ChartConfig;

export function UsagePieChart({
  title,
  description,
  data,
  centerLabel,
  centerSubLabel = "Used",
  footerAmount,
  footerLimit,
  isLoading,
  className,
}: UsagePieChartProps) {
  const hasData = useMemo(() => !!data && data.length > 0, [data]);

  return (
    <Card className={cn("flex flex-col", className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center min-h-[250px]">
        {isLoading ? (
          <Skeleton className="mx-auto aspect-square w-full max-w-[250px] rounded-full" />
        ) : hasData ? (
          <ChartContainer
            config={DEFAULT_CONFIG}
            className="mx-auto aspect-square w-full max-w-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="key"
                innerRadius={80}
                outerRadius={110}
                strokeWidth={5}
                startAngle={90}
                endAngle={-270}
              >
                <RechartsLabel
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
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
                            {centerLabel}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground text-xs"
                          >
                            {centerSubLabel}
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        ) : (
          <EmptyState />
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 text-center pt-0">
        {isLoading ? (
          <div className="space-y-2 w-full flex flex-col items-center">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        ) : hasData ? (
          <div className="space-y-1">
            <div className="text-3xl font-bold tracking-tight">
              {footerAmount}
            </div>
            <div className="text-xs text-muted-foreground">
              of {footerLimit} limit
            </div>
          </div>
        ) : (
          <div className="text-xs text-muted-foreground">No data available</div>
        )}
      </CardFooter>
    </Card>
  );
}

const EmptyState = memo(() => (
  <Empty className="h-full">
    <EmptyHeader>
      <EmptyMedia variant="icon">
        <PieChartIcon className="size-8 text-muted-foreground" />
      </EmptyMedia>
      <EmptyTitle>No data</EmptyTitle>
      <EmptyDescription>No usage data found for this period.</EmptyDescription>
    </EmptyHeader>
  </Empty>
));

EmptyState.displayName = "EmptyState";
