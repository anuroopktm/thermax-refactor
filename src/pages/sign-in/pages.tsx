import { BrandLogo } from "./components/brand-logo";
import { WelcomeHeader } from "./components/welcome-header";
import { MicrosoftSignInButton } from "./components/microsoft-signin-button";
import { AuthFooter } from "./components/auth-footer";
import { IndustrialHero } from "./components/industrial-hero";

export default function SignInPage() {
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
