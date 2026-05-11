import { useSearchParams } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import debounce from "lodash.debounce";

const userFilterOptions = [
  { label: "All", value: "ALL" },
  { label: "By Me", value: "BY_ME" },
  { label: "By Others", value: "BY_OTHERS" },
];

const statusFilterOptions = [
  { label: "All", value: "ALL" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Submitted", value: "SUBMITTED" },
  { label: "Rejected", value: "REJECTED" },
  { label: "Waiting for approval", value: "SUBMITTED_WAITING" },
  { label: "Failed", value: "SUBMITTED_FAILED" },
];

export function ActivityFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get("q") || "";
  const user = searchParams.get("user") || "ALL";
  const status = searchParams.get("status") || "ALL";

  const [value, setValue] = useState(q);
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const next = new URLSearchParams(searchParams);
        if (value) {
          next.set("q", value);
        } else {
          next.delete("q");
        }
        setSearchParams(next, { replace: true });
      }, 500),
    [searchParams, setSearchParams],
  );

  useEffect(() => {
    setValue(q);
  }, [q]);

  const updateParam = (key: string, value: string | null) => {
    if (!value) return;
    const next = new URLSearchParams(searchParams);
    if (value === "ALL") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    setSearchParams(next, { replace: true });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    debouncedSearch(val);
  };

  return (
    <div className="flex items-center gap-3">
      {/* USER FILTER */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-muted-foreground">User:</span>

        <Select value={user} onValueChange={(val) => updateParam("user", val)}>
          <SelectTrigger className="w-30 h-9 cursor-pointer">
            <SelectValue placeholder="Select User">
              {(value) =>
                userFilterOptions.find((opt) => opt.value === value)?.label ??
                value
              }
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="min-w-30">
            {userFilterOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="cursor-pointer"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* STATUS FILTER */}
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold text-muted-foreground">Status:</span>

        <Select
          value={status}
          onValueChange={(val) => updateParam("status", val)}
        >
          <SelectTrigger className="w-44 h-9! cursor-pointer">
            <SelectValue placeholder="Select Status">
              {(value) =>
                statusFilterOptions.find((opt) => opt.value === value)?.label ??
                value
              }
            </SelectValue>
          </SelectTrigger>

          <SelectContent className="min-w-30">
            {statusFilterOptions.map((opt) => (
              <SelectItem
                key={opt.value}
                value={opt.value}
                className="cursor-pointer"
              >
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/*SEARCH FILTER*/}
      <InputGroup className="max-w-xs h-9">
        <InputGroupInput
          type="search"
          placeholder="Search..."
          value={value}
          onChange={handleChange}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}
