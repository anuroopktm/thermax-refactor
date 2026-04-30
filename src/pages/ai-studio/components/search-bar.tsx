import { Search } from "lucide-react";
import debounce from "lodash.debounce";
import { useEffect, useMemo, useState } from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface SearchBarProps {
  onChange: (value: string) => void;
  defaultValue?: string;
}

export function SearchBar({ onChange, defaultValue = "" }: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);

  const debouncedOnChange = useMemo(
    () => debounce((newValue: string) => onChange(newValue), 500),
    [onChange],
  );

  // ✅ Sync with URL param changes
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedOnChange(newValue);
  };

  return (
    <InputGroup className="max-w-xs h-10">
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
  );
}
