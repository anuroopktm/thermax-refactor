import { useSearchParams } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import dayjs from "dayjs";

export const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function UsageDateFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const year = parseInt(searchParams.get("year") || dayjs().year().toString());
  const month = searchParams.get("month") || dayjs().month().toString();
  const monthIndex =
    MONTHS.indexOf(month) !== -1 ? MONTHS.indexOf(month) : dayjs().month();

  const handleYearChange = (delta: number) => {
    setSearchParams((prev) => {
      prev.set("year", (year + delta).toString());
      return prev;
    });
  };

  const handleMonthChange = (delta: number) => {
    let nextIndex = monthIndex + delta;
    if (nextIndex < 0) nextIndex = 11;
    if (nextIndex > 11) nextIndex = 0;
    setSearchParams((prev) => {
      prev.set("month", MONTHS[nextIndex]);
      return prev;
    });
  };

  return (
    <div className="flex items-center gap-2">
      {/* Year Selector */}
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 cursor-pointer"
          onClick={() => handleYearChange(-1)}
        >
          <ChevronLeft />
        </Button>
        <span className="px-3 text-sm font-medium w-14 text-center">
          {year}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 cursor-pointer"
          onClick={() => handleYearChange(1)}
        >
          <ChevronRight />
        </Button>
      </div>

      {/* Month Selector */}
      <div className="flex items-center border rounded-md">
        <Button
          variant="ghost"
          size="icon"
          className="size-8 cursor-pointer"
          onClick={() => handleMonthChange(-1)}
        >
          <ChevronLeft />
        </Button>
        <span className="px-3 text-sm font-medium w-24 text-center">
          {MONTHS[monthIndex]}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 cursor-pointer"
          onClick={() => handleMonthChange(1)}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
}
