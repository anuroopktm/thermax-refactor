import AIStudioLogo from "@/assets/brand/ai-studio.svg";

export function BrandLogo() {
  return (
    <div className="h-20 w-fit">
      <img
        className="w-full h-full object-contain"
        src={AIStudioLogo}
        alt="AI Studio Logo"
      />
    </div>
  );
}
