import {
  useRouteError,
  isRouteErrorResponse,
  useNavigate,
} from "react-router-dom";
import { AlertCircle, Home, RefreshCcw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let title = "Something went wrong";
  let message = "An unexpected error occurred.";

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`;
    message = error.statusText || error.data?.message || message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="h-6 w-6" />
      </div>

      <h1 className="text-xl font-semibold">{title}</h1>

      <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>

      <div className="mt-6 flex gap-4">
        <Button
          size="lg"
          className="cursor-pointer"
          onClick={() => window.location.reload()}
        >
          <RefreshCcw />
          Retry
        </Button>

        <Button
          size="lg"
          variant="outline"
          className="cursor-pointer"
          onClick={() => navigate("/")}
        >
          <Home />
          Go home
        </Button>
      </div>
    </div>
  );
}
