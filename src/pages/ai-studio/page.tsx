import { AppCard } from "./components/app-card";
import { SearchBar } from "./components/search-bar";
import { useApps } from "@/services/query/ai-studio/ai-studio.service";
import { Skeleton } from "@/components/ui/skeleton";

export default function AiStudioPage() {
  const { data: apps, isLoading } = useApps();

  return (
    <main className="h-full overflow-y-auto px-4 py-8 md:px-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold">AI Studio</h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            {isLoading
              ? "Loading apps..."
              : `(${apps?.length} Results of ${apps?.length})`}
          </p>
        </div>
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-[300px] w-full rounded-xl" />
            ))
          : apps?.map((app, index) => (
              <AppCard
                key={index}
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
