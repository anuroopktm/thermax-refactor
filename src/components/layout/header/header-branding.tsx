import { Link } from "react-router-dom";
import AIStudionLogo from "@/assets/brand/ai-studio.svg";

export function HeaderBranding() {
  return (
    <div className="h-10 min-w-60 flex items-center">
      <Link to="/dashboard" className="inline-flex items-center">
        <img
          src={AIStudionLogo}
          alt="Thermax AI Studio"
          className="h-10 w-auto object-contain"
        />
      </Link>
    </div>
  );
}
