import { useSearchParams } from "react-router-dom";
import { TabsContent } from "@/components/ui/tabs";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { TabbedContentLayout } from "@/components/layout/tabbed-content-layout";
import { CostTab } from "../components/usage/cost/cost-tab";
import { ActivityTab } from "../components/usage/activity/activity-tab";
import { UsageDateFilter } from "@/components/shared/usage/usage-date-filter";

const USAGE_TABS = [
  { value: "cost", label: "Cost" },
  { value: "activity", label: "Activity" },
];

export function UsageView() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "cost";

  const onTabChange = (value: string) => {
    setSearchParams((prev) => {
      prev.set("tab", value);
      return prev;
    });
  };

  return (
    <FeaturePageLayout title="Usage" description="Monitor cost and activity">
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
