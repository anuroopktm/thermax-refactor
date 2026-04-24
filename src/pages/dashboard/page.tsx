import { useNavigate } from "react-router-dom";
import { AppCard } from "./components/app-card";
import { SearchBar } from "./components/search-bar";

const apps = [
  {
    title: "TBWES OCR",
    description:
      "Enable smart data extraction from complex engineering drawings and technical specifications. Streamline your documentation process with automated field recognition.",
    imageUrl: "/assets/dashboard/tbwes-ocr.png",
    path: "#",
  },
  {
    title: "Dr. ConBot",
    description:
      "Your intelligent site companion for real-time query resolution. Access FAQs, operation manuals, and safety guidelines instantly through a conversational AI interface.",
    imageUrl: "/assets/dashboard/dr-conbot.png",
    path: "#",
  },
  {
    title: "Smart Troubleshooting App",
    description:
      "Minimize equipment downtime with our predictive diagnostic engine. Get step-by-step guidance to identify and resolve machinery issues using real-time data.",
    imageUrl: "/assets/dashboard/troubleshooting.png",
    path: "#",
  },
  {
    title: "Transmitter OCR",
    description:
      "Automate the reading of field transmitter displays and nameplates. Capture critical equipment parameters directly into maintenance logs with high accuracy.",
    imageUrl: "/assets/dashboard/transmitter-ocr.png",
    path: "#",
  },
  {
    title: "Sales Enablement Tool",
    description:
      "Empower your sales team with real-time access to technical data, case studies, and competitor analysis. Accelerate the sales cycle with AI-driven insights.",
    imageUrl: "/assets/dashboard/sales-enablement.png",
    path: "/sales-enablement",
  },
];

export default function DashboardPage() {
  const navigate = useNavigate();

  return (
    <main className="h-full overflow-y-auto px-4 py-8 md:px-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-4xl font-bold">AI Studio</h1>
          <p className="mt-1 text-sm font-medium text-muted-foreground">
            ({apps.length} Results of {apps.length})
          </p>
        </div>
        <SearchBar />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {apps.map((app, index) => (
          <AppCard
            key={index}
            title={app.title}
            description={app.description}
            imageUrl={app.imageUrl}
            onClick={() => navigate(app.path)}
          />
        ))}
      </div>
    </main>
  );
}
