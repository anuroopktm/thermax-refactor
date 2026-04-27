import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Label,
} from "recharts";
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
  type ChartConfig,
} from "@/components/ui/chart";

const barChartConfig = {
  cost: { label: "Cost", color: "var(--chart-1)" },
} satisfies ChartConfig;

const pieData = [
  {
    key: "used",
    label: "Used",
    value: 10.61,
    fill: "var(--chart-1)",
  },
  {
    key: "remaining",
    label: "Remaining",
    value: 89.39,
    fill: "var(--muted)",
  },
];

const pieChartConfig = {
  used: {
    label: "Used",
    color: "var(--chart-1)",
  },
  remaining: {
    label: "Remaining",
    color: "var(--muted)",
  },
} satisfies ChartConfig;

export function CostTab() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || "2026";
  const month = searchParams.get("month") || "April";

  const dailyData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      cost: Math.random() * 0.05,
    }));
  }, [year, month]);

  const usedPercentage = useMemo(() => {
    return pieData.find((d) => d.key === "used")?.value || 0;
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      {/* Main Chart Card */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader>
          <CardTitle>Monthly Spend</CardTitle>
          <CardDescription>
            Workspace expenses for {month} {year}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
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
                // tickFormatter={(value) => `$${value.toFixed(2)}`}
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
              <Bar dataKey="cost" fill="var(--color-cost)" radius={8} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Right Panel Card */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Token Usage</CardTitle>
          <CardDescription>Track tokens used by your team</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex flex-col justify-center">
          <ChartContainer
            config={pieChartConfig}
            className="mx-auto aspect-square w-full max-w-[250px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="key"
                innerRadius={55}
                outerRadius={80}
                startAngle={90}
                endAngle={-270}
              >
                <Label
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
                            {usedPercentage}%
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
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-4 text-center">
          <div className="space-y-1">
            <div className="text-3xl font-bold tracking-tight">$0.2192</div>
            <div className="text-xs text-muted-foreground">
              of $200.00 limit
            </div>
          </div>
          <Button className="cursor-pointer">Increase Limit</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
