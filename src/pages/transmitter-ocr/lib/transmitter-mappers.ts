import {
  type ChildActivityItem,
  type MasterActivityItem,
  type MasterDataRecord,
  type Member as TransmitterMember,
  type ActivitySummaryModel,
  type RemarkModel,
  type MasterDataItem,
} from "@/services/query/transmitter-ocr/types";
import { type Member } from "@/services/query/shared/types/members.types";
import {
  type ActivityUsageResponse,
  type ActivityUsageModel,
  type CostUsageResponse,
  type CostUsageModel,
  type StatsUsageResponse,
  type StatsModel,
  type TopUsersUsageResponse,
  type TopUserModel,
} from "@/services/query/transmitter-ocr/types/usage.types";
import { type ActivityItem } from "@/components/shared/ocr/activity-card";

/**
 * Maps raw API Member to UI model
 */
export function normalizeTransmitterMember(m: TransmitterMember): Member {
  return {
    id: m.id,
    name: m.name,
    email: m.email,
    role: m.role,
  };
}

export function normalizeTransmitterMembers(data: any): Member[] {
  const result = data.result || [];
  return result.map(normalizeTransmitterMember);
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
export function mapChildActivitiesResponse(data: any): ActivityItem[] {
  const result = data.result || [];
  return result.map(mapChildToActivityCard);
}

/**
 * Maps API response for Master Activity Records to UI model
 */
export function mapMasterDataRecords(data: unknown): MasterDataRecord[] {
  const masterData = (data as MasterActivityItem)?.master_data || [];
  return masterData.map(
    (item: Record<string, MasterDataItem>, index: number) => {
      // master_data is Record<string, MasterDataItem>[]
      // But mapMasterDataRecords expects a flat array of records.
      // Based on previous implementation:
      const record = Object.values(item)[0] as MasterDataItem;
      return {
        serialNo: index + 1,
        tagNumber: record["Tag number"] || "",
        modelNumber: record["Model number"] || "",
        lowerRange: String(record["Lower Calibration Range"] ?? ""),
        upperRange: String(record["Upper Calibration Range"] ?? ""),
        unit: record["Calibration Range Unit"] || "",
      };
    },
  );
}

/**
 * Maps API response for Cost Usage to UI model
 */
export function mapCostUsageData(data: CostUsageResponse): CostUsageModel[] {
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
  data: ActivityUsageResponse,
): ActivityUsageModel[] {
  if (!data?.day) return [];

  return data.day.map((dayNum: number, i: number) => ({
    label: String(dayNum),
    value: data.activity?.[i] || 0,
  }));
}

/**
 * Maps API response for Activity Stats to UI model
 */
export function mapActivityStatsData(data: StatsUsageResponse): StatsModel[] {
  return (
    data?.result.map((item) => ({
      name: item.stat.replaceAll("_", " "),
      value: item.activity_count,
    })) || []
  );
}

/**
 * Maps API response for Top Users to UI model
 */
export function mapTopUsersData(data: TopUsersUsageResponse): TopUserModel[] {
  return (
    data?.result.map((item) => ({
      name: item.name,
      value: item.activity,
    })) || []
  );
}

/**
 * Parses a raw remark string from the API into a structured object
 */
export function parseRemark(remark: string): RemarkModel {
  const isError = remark.includes("No value") || remark.includes("Invalid");

  const [rawKey, ...valueParts] = remark.split(":");
  const key = rawKey?.trim();
  const value = valueParts.join(":")?.trim();

  return { key, value, isError };
}

/**
 * Maps API response for Activity Summary to UI model
 */
export function mapActivitySummary(data: any): ActivitySummaryModel[] {
  const result = data.result || [];

  return result.map((item: ChildActivityItem) => {
    const activityData = (item.data?.activity as Record<string, string>) || {};

    return {
      id: item.id,
      serialNo: Number(activityData["Serial No."]) || 0,
      tagNumber: activityData["Tag Number"] || "-",
      date: item.created_on || "N/A",
      modelNumber: activityData["Model Number"] || "-",
      unit: activityData["Calibration Range Unit"] || "-",
      lowerRange: String(activityData["Lower Calibration Range"] || "-"),
      upperRange: String(activityData["Upper Calibration Range"] || "-"),
      status: item.status || "N/A",
      remarks: (item.remarks || []).map(parseRemark),
    };
  });
}
