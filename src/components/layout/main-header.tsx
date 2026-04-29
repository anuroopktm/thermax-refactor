import { HeaderBranding } from "./header/header-branding";
import { HeaderBreadcrumbs } from "./header/header-breadcrumbs";
import { UserNav } from "./header/user-nav";

interface MainHeaderProps {
  breadcrumbs?: { label: React.ReactNode; href?: string }[];
}

export function MainHeader({ breadcrumbs }: MainHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background px-4 py-3 md:px-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-8">
          <HeaderBranding />
          <HeaderBreadcrumbs breadcrumbs={breadcrumbs} />
        </div>

        <UserNav />
      </div>
    </header>
  );
}
