import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function AuthFooter() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-4">
        <Button
          variant="link"
          render={<Link to="#">Terms of Use</Link>}
          nativeButton={false}
        />
        <Button
          variant="link"
          render={<Link to="#">Privacy Policy</Link>}
          nativeButton={false}
        />
      </div>
      <p className="my-8 font-medium text-muted-foreground">
        © 2024 Thermax Limited. All rights reserved.
      </p>
    </div>
  );
}
