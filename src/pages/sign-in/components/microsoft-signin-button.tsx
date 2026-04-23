import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function MicrosoftSignInButton() {
  const navigate = useNavigate();

  return (
    <Button
      className="h-16 w-full cursor-pointer text-lg"
      onClick={() => navigate("/dashboard")}
    >
      <svg viewBox="0 0 23 23" xmlns="http://www.w3.org/2000/svg">
        <path fill="currentColor" d="M1 1h10v10H1z" />
        <path fill="currentColor" d="M12 1h10v10H12z" />
        <path fill="currentColor" d="M1 12h10v10H1z" />
        <path fill="currentColor" d="M12 12h10v10H12z" />
      </svg>
      Sign in with Microsoft
    </Button>
  );
}
