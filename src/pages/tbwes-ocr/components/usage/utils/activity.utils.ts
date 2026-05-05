import type {
  ActivityUsage,
  ActivityUsageStatusStats,
  ActivityUsageTopUser,
} from "@/services/query/tbwes-ocr/types";

export function mapActivityChartData(activityData?: ActivityUsage) {
  if (!activityData) return [];

  return activityData.day.map((day, i) => ({
    day,
    activity: activityData.activity[i] ?? 0,
  }));
}

export function mapTopUsersData(topUsersData?: ActivityUsageTopUser) {
  if (!topUsersData) return [];

  return topUsersData.result.map((user) => ({
    name: user.name,
    value: user.activity,
  }));
}

export function mapActivityStatsData(statsData?: ActivityUsageStatusStats) {
  if (!statsData) return [];

  return statsData.result.map((stat) => ({
    name: stat.stat.replaceAll("_", " "),
    value: stat.activity_count,
  }));
}
