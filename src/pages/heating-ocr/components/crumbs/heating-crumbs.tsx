import { useHeatingActivityDetail } from "@/services/query/heating-ocr/activities.service";
import { useParams } from "react-router-dom";

export function ActivityCrumb() {
  const { id } = useParams<{ id: string }>();
  const { data: activity } = useHeatingActivityDetail(id);

  if (!activity) return "Loading...";
  return activity.title || `HeatingActivityModel #${id}`;
}

export function PlateGroupCrumb() {
  const { groupId } = useParams<{ groupId: string }>();

  // If groupId is not available or doesn't contain the info, fallback
  if (!groupId) return "Plate Details";

  // groupId is currently format: `${heatNo}-${plateNo}-${index}`
  // We can try to extract names or just show Group #
  const parts = groupId.split("-");
  const index = parts[parts.length - 1];

  if (!isNaN(Number(index))) {
    return `Group #${Number(index) + 1}`;
  }

  return "Plate Details";
}
