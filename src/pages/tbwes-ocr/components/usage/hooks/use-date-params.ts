import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { getDateParams } from "../utils/usage.utils";

export function useDateParams() {
  const [searchParams] = useSearchParams();

  return useMemo(() => getDateParams(searchParams), [searchParams]);
}
