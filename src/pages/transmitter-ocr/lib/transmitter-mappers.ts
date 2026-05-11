import {
  type ActivityUsageItem,
  type ChildActivityItem,
  type CostUsageItem,
} from "@/services/query/transmitter-ocr/types";
import { type ActivityItem } from "@/components/shared/ocr/activity-card";

/**
 * Extracts result array from paginated API response
 */
export function extractResult<T>(data: any): T[] {
  if (Array.isArray(data)) return data;
  return data?.result || [];
}

/**
 * Maps MasterActivityItem to Shared ActivityItem
 */
export function mapMasterToActivityCard(
  item: MasterActivityItem,
): ActivityItem {
  return {
    ...item,
    id: item.id,
    title: item.title || `Master Activity #${item.id}`,
    createdAt: item.created_on || "N/A",
    status: item.status || "Completed",
    userInitials: "MA", // Mock initials
  };
}

/**
 * Maps ChildActivityItem to Shared ActivityItem
 */
export function mapChildToActivityCard(item: ChildActivityItem): ActivityItem {
  return {
    ...item,
    id: item.id,
    title: item.title || `Child Activity #${item.id}`,
    createdAt: item.created_on || "N/A",
    status: item.status || "Completed",
    userInitials: "CA", // Mock initials
  };
}

/**
 * Maps API response for Child Activities
 */
export function mapChildActivitiesResponse(data: any) {
  const result = extractResult<ChildActivityItem>(data);
  return result.map(mapChildToActivityCard);
}
/**
 * Maps API response for Master Activity Records to UI model
 */
export function mapMasterDataRecords(data: any): MasterDataRecord[] {
  const records = data?.master_data || [];
  return records.map((item: any, index: number) => ({
    serialNo: index + 1,
    tagNumber: item["Tag number"] || "",
    modelNumber: item["Model number"] || "",
    lowerRange: String(item["Lower Calibration Range"] ?? ""),
    upperRange: String(item["Upper Calibration Range"] ?? ""),
    unit: item["Calibration Range Unit"] || "",
  }));
}

/**
 * Maps API response for Cost Usage to UI model
 * Handles both parallel arrays { month: [], cost: [] } and array of objects
 */
export function mapCostUsageData(
  data: CostUsageItem,
): { label: string; value: number }[] {
  if (!data?.day) return [];

  return data.day.map((dayNum: number, i: number) => ({
    label: String(dayNum),
    value: data.cost?.[i] || 0,
  }));
}

/**
 * Maps API response for Activity Usage to UI model
 */
export function mapActivityUsageData(
  data: ActivityUsageItem,
): { label: string; value: number }[] {
  if (!data?.day) return [];

  return data.day.map((dayNum: number, i: number) => ({
    label: String(dayNum),
    value: data.activity?.[i] || 0,
  }));
}
