import { useSignIn, useAuthUrl } from "@/services/query/auth/auth.service";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

function MicrosoftLogo() {
  return (
    <svg
      viewBox="0 0 23 23"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5 shrink-0"
    >
      <path fill="currentColor" d="M1 1h10v10H1z" />
      <path fill="currentColor" d="M12 1h10v10H12z" />
      <path fill="currentColor" d="M1 12h10v10H1z" />
      <path fill="currentColor" d="M12 12h10v10H12z" />
    </svg>
  );
}

export function MicrosoftSignInButton() {
  const navigate = useNavigate();

  const ENABLE_SSO = import.meta.env.VITE_ENABLE_SSO === "true";
  const FIRST_USER_EMAIL = import.meta.env.VITE_FIRST_USER_EMAIL;
  const DEFAULT_PASSWORD = import.meta.env.VITE_DEFAULT_PASSWORD;

  const { mutateAsync: signIn, isPending: isSigningIn } = useSignIn();
  const { mutateAsync: getAuthUrl, isPending: isGettingUrl } = useAuthUrl();

  const isPending = isSigningIn || isGettingUrl;

  const handleLogin = async () => {
    if (isPending) return;

    if (ENABLE_SSO) {
      toast.promise(getAuthUrl(), {
        loading: "Redirecting to Microsoft...",
        success: (url: string) => {
          window.location.href = url;
          return "Redirecting...";
        },
        error: () => "Failed to get authentication URL.",
      });
    } else {
      if (!FIRST_USER_EMAIL || !DEFAULT_PASSWORD) {
        toast.error("Missing fallback credentials");
        return;
      }

      toast.promise(
        signIn({
          email: FIRST_USER_EMAIL,
          password: DEFAULT_PASSWORD,
        }),
        {
          loading: "Signing in...",
          success: () => {
            navigate("/ai-studio", { replace: true });
            return "Signed in successfully!";
          },
          error: (err) =>
            err?.response?.data?.message ||
            "Failed to sign in. Please try again.",
        },
      );
    }
  };

  return (
    <Button
      className="h-16 w-full cursor-pointer text-lg font-bold"
      onClick={handleLogin}
      disabled={isPending}
    >
      <MicrosoftLogo />

      {isPending
        ? "Processing..."
        : ENABLE_SSO
          ? "Sign in with Microsoft"
          : "Sign in with Credentials"}
    </Button>
  );
}
