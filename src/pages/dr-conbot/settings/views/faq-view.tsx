import { useState, useMemo } from "react";
import debounce from "lodash.debounce";

import { FeaturePageLayout } from "@/components/layout/feature-page-layout";
import { useDrConbotFaqs } from "@/services/query/dr-conbot/faq.service";

// Local faq components
import { FaqHeader } from "../components/faq/faq-header";
import { FaqList } from "../components/faq/faq-list";
import { AddFaqDialog } from "../components/faq/add-faq-dialog";

export function FaqView() {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
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

  const {
    data: faqs = [],
    isLoading,
    isFetching,
  } = useDrConbotFaqs(0, 100, debouncedSearch || undefined);

  const resultText =
    faqs.length === 1
      ? "(1 Result of 1)"
      : `(${faqs.length} Results of ${faqs.length})`;

  return (
    <FeaturePageLayout
      title="FAQ Documents"
      description={isLoading ? "Loading results..." : resultText}
      actions={
        <FaqHeader
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          onAdd={() => setIsUploadDialogOpen(true)}
        />
      }
    >
      <FaqList faqs={faqs} isLoading={isLoading || isFetching} />

      <AddFaqDialog
        open={isUploadDialogOpen}
        onOpenChange={setIsUploadDialogOpen}
      />
    </FeaturePageLayout>
  );
}
