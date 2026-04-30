import { PlateGroupsHeader } from "../components/plate-groups/plate-groups-header";
import { PlateGroupsCard } from "../components/plate-groups/plate-groups-card";
import { PlateGroupsFooter } from "../components/plate-groups/plate-groups-footer";

// Mock data based on the image
const MOCK_GROUPS = Array.from({ length: 12 }).map((_, i) => ({
  id: `group-${i + 1}`,
  groupName: `Group #${i + 1}`,
  invalidCount: i % 2 === 0 ? 3 : i % 3 === 0 ? 5 : 4,
  heatNo: "F57725",
  plateNo: `F577251${i}E0`,
}));

export function PlateGroupsView() {
  return (
    <div className="flex flex-col h-full">
      <PlateGroupsHeader totalInvalidCount={23} />

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {MOCK_GROUPS.map((group) => (
            <PlateGroupsCard key={group.id} group={group} />
          ))}
        </div>
      </main>

      {/* Footer Actions */}
      <PlateGroupsFooter totalInvalidCount={23} />
    </div>
  );
}
