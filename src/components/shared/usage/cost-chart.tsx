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
  type ChartConfig,
} from "@/components/ui/chart";
import { Skeleton } from "@/components/ui/skeleton";

const barChartConfig = {
  cost: { label: "Cost", color: "var(--chart-1)" },
} satisfies ChartConfig;

interface CostChartProps {
  data?: any[];
  isLoading?: boolean;
  month?: string;
  year?: string;
}

export function CostChart({
  data,
  isLoading,
  month = "April",
  year = "2026",
}: CostChartProps) {
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
        ) : (
          <ChartContainer
            config={barChartConfig}
            className="h-[300px] sm:h-[350px] lg:h-[400px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={data}
              margin={{ top: 10, right: 10, left: 20, bottom: 30 }}
            >
              <CartesianGrid vertical={false} />
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
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                label={{
                  value: "Day",
                  position: "insideBottom",
                  offset: -25,
                  className: "text-xs font-bold",
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="cost" fill="var(--color-cost)" radius={3} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
