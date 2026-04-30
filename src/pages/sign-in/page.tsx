import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useExchangeCode } from "@/services/query/auth/auth.service";
import { toast } from "sonner";

import { BrandLogo } from "./components/brand-logo";
import { WelcomeHeader } from "./components/welcome-header";
import { MicrosoftSignInButton } from "./components/microsoft-signin-button";
import { AuthFooter } from "./components/auth-footer";
import { IndustrialHero } from "./components/industrial-hero";

export default function SignInPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const state = searchParams.get("state") || "/ai-studio";
  const code = searchParams.get("code");

  const { mutateAsync: exchangeCode } = useExchangeCode();

  useEffect(() => {
    if (code) {
      toast.promise(exchangeCode(searchParams.toString()), {
        loading: "Logging you in...",
        success: () => {
          navigate(state, { replace: true });
          return "Welcome back!";
        },
        error: (err) => {
          console.error("OAuth error:", err);
          return "Login failed. Please try again.";
        },
      });
    }
  }, [code, state, exchangeCode, navigate, searchParams]);

  return (
    <div className="grid min-h-svh w-full grid-cols-1 sm:grid-cols-2">
      {/* Left Column */}
      <div className="flex flex-col justify-between px-8 py-12 md:px-16 lg:px-24">
        <BrandLogo />

        <div className="space-y-8 py-8">
          <WelcomeHeader />
          <MicrosoftSignInButton />
        </div>

        <AuthFooter />
      </div>

      {/* Right Column */}
      <IndustrialHero />
    </div>
  );
}
