import { useSignIn } from "@/services/query/auth/auth.service";
import { Button } from "@base-ui/react";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
      className="h-16 w-full cursor-pointer text-lg"
      onClick={handleLogin}
      disabled={isPending}
    >
      {isPending ? (
        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
      ) : (
        <svg
          viewBox="0 0 23 23"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-2 h-5 w-5"
        >
          <path fill="currentColor" d="M1 1h10v10H1z" />
          <path fill="currentColor" d="M12 1h10v10H12z" />
          <path fill="currentColor" d="M1 12h10v10H1z" />
          <path fill="currentColor" d="M12 12h10v10H12z" />
        </svg>
      )}
      {isPending ? "Signing in..." : "Sign in with Microsoft"}
    </Button>
  );
}
