import dayjs from "dayjs";

import { MONTHS } from "@/components/shared/usage/usage-date-filter";

/**
 * Resolves search parameters into standardized year and month representations.
 * Returns a 1-based month index (1-12) and year both as string and number.
 */
export function getDateParams(searchParams: URLSearchParams) {
  const yearStr = searchParams.get("year") ?? dayjs().year().toString();
  const year = parseInt(yearStr, 10) || dayjs().year();

  // Use month name as the fallback to avoid parsing number-string index bugs
  const monthName = searchParams.get("month") ?? MONTHS[dayjs().month()];

  const index = MONTHS.indexOf(monthName);
  const monthIndex = index !== -1 ? index + 1 : dayjs().month() + 1;

  return { year, yearStr, monthName, monthIndex };
}
