import { useSearchParams } from "react-router-dom";
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
import { useActivityData } from "@/services/query/usage/usage.service";
import { Skeleton } from "@/components/ui/skeleton";

const barChartConfig = {
  questions: { label: "Questions", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ActivityChart() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || "2026";
  const month = searchParams.get("month") || "April";

  const { data: dailyData, isLoading: isActivityLoading } = useActivityData(
    month,
    year,
  );

  return (
    <Card className="lg:col-span-2 flex flex-col">
      <CardHeader>
        <CardTitle>Monthly Activity</CardTitle>
        <CardDescription>
          Questions asked in {month} {year}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 min-h-[300px]">
        {isActivityLoading ? (
          <Skeleton className="h-full w-full rounded-lg" />
        ) : (
          <ChartContainer
            config={barChartConfig}
            className="h-[300px] sm:h-[350px] lg:h-[400px] w-full"
          >
            <BarChart
              accessibilityLayer
              data={dailyData}
              margin={{ top: 10, right: 10, left: 20, bottom: 30 }}
            >
              <CartesianGrid vertical={false} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                label={{
                  value: "Questions",
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
              <Bar
                dataKey="questions"
                fill="var(--color-questions)"
                radius={3}
              />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
