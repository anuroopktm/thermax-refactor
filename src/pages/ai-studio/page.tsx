import { AppCard } from "./components/app-card";
import { SearchBar } from "./components/search-bar";
import { useApps } from "@/services/query/ai-studio/ai-studio.service";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchParams } from "react-router-dom";

export default function AiStudioPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get("q") ?? "";

  const handleSearch = (value: string) => {
    if (value) {
      setSearchParams({ q: value }, { replace: true });
    } else {
      setSearchParams({}, { replace: true });
    }
  };

  const { data: apps, isLoading, isFetching } = useApps(searchQuery);

  return (
    <main className="h-full overflow-y-auto px-4 py-8 md:px-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold">AI Studio</h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {isLoading ? "Loading apps..." : `(${apps?.length || 0} Results)`}
          </p>
        </div>

        <SearchBar onChange={handleSearch} defaultValue={searchQuery} />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading || isFetching
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
            ))
          : apps?.map((app) => (
              <AppCard
                key={app.path}
                title={app.title}
                description={app.description}
                imageUrl={app.imageUrl}
                path={app.path}
              />
            ))}
      </div>
    </main>
  );
}
