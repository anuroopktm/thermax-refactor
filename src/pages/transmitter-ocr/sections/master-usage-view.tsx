import { useSearchParams } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { CostTab } from "../components/master-usage/cost/cost-tab";
import { ActivityTab } from "../components/master-usage/activity/activity-tab";
import { UsageDateFilter } from "../components/master-usage/usage-date-filter";

const USAGE_TABS = [
  { value: "cost", label: "Cost" },
  { value: "activity", label: "Activity" },
];

const MODELS = [
  { value: "all", label: "All Models" },
  { value: "gpt4", label: "GPT-4" },
  { value: "gpt35", label: "GPT-3.5" },
];

export function MasterUsageView() {
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
    <div className="space-y-6 px-4 py-8 md:px-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Usage</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Monitor cost and activity across your workspace
          </p>
        </div>

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
      </div>

      {/* Controls & Content */}
      <Tabs value={activeTab} onValueChange={onTabChange} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className="h-10! gap-6">
            {USAGE_TABS.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="cursor-pointer w-40 data-active:after:bg-primary data-active:text-primary data-active:ring-1 data-active:ring-ring hover:text-primary"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <UsageDateFilter />
        </div>

        <TabsContent value="cost" className="mt-0 outline-none">
          <CostTab />
        </TabsContent>

        <TabsContent value="activity" className="mt-0 outline-none">
          <ActivityTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}
