import { useState, useMemo } from "react";
import { useTbwesBaan } from "@/services/query/tbwes-ocr";
import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { BaanTable } from "../components/baan/baan-table";
import { BaanHeader } from "../components/baan/baan-header";
import debounce from "lodash.debounce";

export function BaanView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const debouncedSetSearch = useMemo(
    () => debounce((value: string) => setDebouncedSearch(value), 500),
    [],
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedSetSearch(value);
  };

  const { data, isLoading, isFetching } = useTbwesBaan({
    search_term: debouncedSearch || undefined,
  });

  return (
    <FeaturePageLayout
      title="BAAN"
      description={
        data?.total !== undefined
          ? `(${data.result.length} Results of ${data.total})`
          : "Loading results..."
      }
      actions={
        <BaanHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
        />
      }
    >
      <BaanTable
        data={data?.result || []}
        isLoading={isLoading || isFetching}
      />
    </FeaturePageLayout>
  );
}
