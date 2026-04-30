import { useSignIn } from "@/services/query/auth/auth.service";
import { Button } from "@/components/ui/button";
import { LoaderPinwheel } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const { mutate: signIn, isPending } = useSignIn();

  const handleLogin = () => {
    signIn(
      { email: "admin@thermax.com", password: "password123" },
      {
        onSuccess: () => {
          navigate("/dashboard");
        },
      },
    );
  };

  return (
    <Button
      className="h-16 w-full cursor-pointer text-lg font-bold"
      onClick={handleLogin}
      disabled={isPending}
    >
      {isPending ? (
        <LoaderPinwheel className="size-6 animate-spin" />
      ) : (
        <MicrosoftLogo />
      )}
      {isPending ? "Signing in..." : "Sign in with Microsoft"}
    </Button>
  );
}
