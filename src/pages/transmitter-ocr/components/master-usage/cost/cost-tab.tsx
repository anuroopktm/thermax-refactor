import { CostChart } from "./cost-chart";
import { TokenUsage } from "./token-usage";

export function CostTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
      <CostChart />
      <TokenUsage />
    </div>
  );
}
