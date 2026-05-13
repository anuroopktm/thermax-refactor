import { useSearchParams } from "react-router-dom";
import { TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { TabbedContentLayout } from "@/components/layout/tabbed-content-layout";
import { CostTab } from "../components/usage/cost/cost-tab";
import { ActivityTab } from "../components/usage/activity/activity-tab";
import { UsageDateFilter } from "@/components/shared/usage/usage-date-filter";

const USAGE_TABS = [
  { value: "cost", label: "Cost" },
  { value: "activity", label: "Activity" },
];

const MODELS = [
  { value: "all", label: "All Models" },
  { value: "gpt4", label: "GPT-4" },
  { value: "gpt35", label: "GPT-3.5" },
];

export function UsageView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "cost";
  const model = searchParams.get("model") || "all";

  const onModelChange = (value: string | null) => {
    if (value) {
      setSearchParams((prev) => {
        prev.set("model", value);
        return prev;
      });
    }
  };

  const onTabChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("tab", value);
      return prev;
    });
  };

  return (
    <FeaturePageLayout
      title="Usage"
      description="Monitor cost and activity across your workspace"
      actions={
        <Select value={model} onValueChange={onModelChange}>
          <SelectTrigger className="w-[180px] h-9 cursor-pointer">
            <SelectValue placeholder="Model Type" />
          </SelectTrigger>
          <SelectContent>
            {MODELS.map((m) => (
              <SelectItem
                key={m.value}
                value={m.value}
                className="cursor-pointer"
              >
                {m.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      }
    >
      <TabbedContentLayout
        tabs={USAGE_TABS}
        activeTab={activeTab}
        onTabChange={onTabChange}
        extraActions={<UsageDateFilter />}
      >
        <TabsContent value="cost" className="mt-0 outline-none">
          <CostTab />
        </TabsContent>

        <TabsContent value="activity" className="mt-0 outline-none">
          <ActivityTab />
        </TabsContent>
      </TabbedContentLayout>
    </FeaturePageLayout>
  );
}
