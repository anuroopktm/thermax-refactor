import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Progress } from "@/components/ui/progress";

// Mock Data for Activity
const topUsers = [
  {
    name: "Lakshmi Prasad",
    email: "Lakshmi.Prasad@thermaxglobal.com",
    value: 85,
    initial: "LP",
  },
  {
    name: "Kirti Panamootil",
    email: "Kirti.Panamootil@thermaxglobal.com",
    value: 65,
    initial: "KP",
  },
  {
    name: "Srikanta Panda",
    email: "Srikanta.Panda@thermaxglobal.com",
    value: 45,
    initial: "SP",
  },
  {
    name: "Sneha Bharane",
    email: "Sneha.Bharane@thermaxglobal.com",
    value: 30,
    initial: "SB",
  },
];

const barChartConfig = {
  questions: { label: "Questions", color: "var(--chart-1)" },
} satisfies ChartConfig;

export function ActivityTab() {
  const [searchParams] = useSearchParams();
  const year = searchParams.get("year") || "2026";
  const month = searchParams.get("month") || "April";

  const dailyData = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      questions: Math.floor(Math.random() * 30) + 5,
    }));
  }, [year, month]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      {/* Main Chart Card */}
      <Card className="lg:col-span-2 flex flex-col">
        <CardHeader>
          <CardTitle>Monthly Activity</CardTitle>
          <CardDescription>
            Questions asked in {month} {year}
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
                radius={8}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Right Panel Card (Top Users) */}
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle>Top Users</CardTitle>
          <CardDescription>Track questions asked by your team</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-4 overflow-y-auto max-h-[400px] lg:max-h-none">
          {topUsers.map((user, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <Avatar className="size-9">
                <AvatarFallback className="text-xs">
                  {user.initial}
                </AvatarFallback>
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
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
