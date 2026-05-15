import { useSearchParams } from "react-router-dom";
import { UsagePieChart } from "@/components/shared/usage/usage-pie-chart";
import { MONTHS } from "@/components/shared/usage/usage-date-filter";
import { useMasterTokenUsage } from "@/services/query/transmitter-ocr/master-usage.service";

export function TokenUsage() {
  const [searchParams] = useSearchParams();

  const year = searchParams.get("year") || undefined;
  const monthName = searchParams.get("month") || "";
  const monthIndex = MONTHS.indexOf(monthName);
  const month = monthIndex !== -1 ? (monthIndex + 1).toString() : undefined;

  const { data: tokenUsage, isLoading: isTokenLoading } = useMasterTokenUsage(
    year,
    month,
  );

  const pieData = tokenUsage
    ? [
        {
          key: "used",
          value: tokenUsage.used,
          fill: "var(--chart-1)",
        },
        {
          key: "remaining",
          value: tokenUsage.remaining,
          fill: "var(--muted)",
        },
      ]
    : [];

  return (
    <UsagePieChart
      title="Token Usage"
      description="Track tokens used by your team"
      data={pieData}
      centerLabel={`${tokenUsage?.used ?? 0}%`}
      centerSubLabel="Used"
      footerAmount={tokenUsage?.totalSpent.toFixed(4) ?? "0.0000"}
      footerLimit={tokenUsage?.limit.toFixed(2) ?? "0.00"}
      isLoading={isTokenLoading}
    />
  );
}
