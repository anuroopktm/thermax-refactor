import { PieChart, Pie, Label } from "recharts";
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
import {
  useTokenUsage,
  useUpdateUsageLimit,
} from "@/services/query/sales-enablement/usage.service";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

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

export function TokenUsage() {
  const { data: tokenUsage, isLoading: isTokenLoading } = useTokenUsage();
  const updateLimit = useUpdateUsageLimit();

  const handleIncreaseLimit = () => {
    const currentLimit = tokenUsage?.limit || 1000;
    const input = prompt(
      `Enter new token usage budget limit in USD (current: $${currentLimit}):`,
      String(currentLimit + 500),
    );
    if (input === null) return;
    const newLimit = parseFloat(input);
    if (isNaN(newLimit) || newLimit <= 0) {
      toast.error("Please enter a valid positive number");
      return;
    }

    toast.promise(updateLimit.mutateAsync(newLimit), {
      loading: "Updating limit...",
      success: "Usage limit updated successfully",
      error: "Failed to update limit",
    });
  };

  const pieData = tokenUsage
    ? [
        {
          key: "used",
          label: "Used",
          value: tokenUsage.used,
          fill: "var(--chart-1)",
        },
        {
          key: "remaining",
          label: "Remaining",
          value: tokenUsage.remaining,
          fill: "var(--muted)",
        },
      ]
    : [];

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Token Usage</CardTitle>
        <CardDescription>Track tokens used by your team</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center min-h-[250px]">
        {isTokenLoading ? (
          <Skeleton className="mx-auto aspect-square w-full max-w-[250px] rounded-full" />
        ) : (
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
                innerRadius={80}
                outerRadius={110}
                strokeWidth={5}
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
                            {tokenUsage?.used}%
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
        )}
      </CardContent>
      <CardFooter className="flex-col gap-4 text-center">
        {isTokenLoading ? (
          <div className="space-y-2 w-full flex flex-col items-center">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-3 w-32" />
          </div>
        ) : (
          <div className="space-y-1">
            <div className="text-3xl font-bold tracking-tight">
              ${tokenUsage?.totalSpent.toFixed(4)}
            </div>
            <div className="text-xs text-muted-foreground">
              of ${tokenUsage?.limit.toFixed(2)} limit
            </div>
          </div>
        )}
        <Button
          className="cursor-pointer"
          disabled={isTokenLoading || updateLimit.isPending}
          onClick={handleIncreaseLimit}
        >
          Increase Limit
        </Button>
      </CardFooter>
    </Card>
  );
}
