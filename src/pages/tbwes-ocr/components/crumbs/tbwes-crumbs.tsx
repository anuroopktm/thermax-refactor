import { useParams } from "react-router-dom";
import { useTbwesActivityDetail } from "@/services/query/tbwes-ocr/activities.service";

export function TbwesActivityCrumb() {
  const { id } = useParams<{ id: string }>();
  const { data: activity } = useTbwesActivityDetail(id);

  if (!activity) return "Loading...";
  return activity.title || `Activity #${id}`;
}
