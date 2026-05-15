import {
  type ActivityUsage,
  type ActivityUsageTopUserResponse,
} from "@/services/query/dr-conbot/types";

export interface ActivityChartItem {
  label: number;
  value: number;
}

export interface TopUserItem {
  name: string;
  value: number;
  email: string;
}

export function mapActivityChartData(
  activityData?: ActivityUsage,
): ActivityChartItem[] {
  if (!activityData) return [];

  return activityData.day.map((day, i) => ({
    label: day,
    value: activityData.question[i] ?? 0,
  }));
}

export function mapTopUsersData(
  topUsersData?: ActivityUsageTopUserResponse,
): TopUserItem[] {
  if (!topUsersData) return [];

  return topUsersData.result.map((user) => ({
    name: user.name,
    value: user.question,
    email: user.email,
  }));
}
