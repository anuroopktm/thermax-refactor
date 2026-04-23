import { DashboardHeader } from "./components/dashboard-header";
import { AppCard } from "./components/app-card";
import { SearchBar } from "./components/search-bar";

const apps = [
  {
    title: "TBWES OCR",
    description:
      "Enable smart data extraction from complex engineering drawings and technical specifications. Streamline your documentation process with automated field recognition.",
    imageUrl: "/assets/dashboard/tbwes-ocr.png",
  },
  {
    title: "Dr. ConBot",
    description:
      "Your intelligent site companion for real-time query resolution. Access FAQs, operation manuals, and safety guidelines instantly through a conversational AI interface.",
    imageUrl: "/assets/dashboard/dr-conbot.png",
  },
  {
    title: "Smart Troubleshooting App",
    description:
      "Minimize equipment downtime with our predictive diagnostic engine. Get step-by-step guidance to identify and resolve machinery issues using real-time data.",
    imageUrl: "/assets/dashboard/troubleshooting.png",
  },
  {
    title: "Transmitter OCR",
    description:
      "Automate the reading of field transmitter displays and nameplates. Capture critical equipment parameters directly into maintenance logs with high accuracy.",
    imageUrl: "/assets/dashboard/transmitter-ocr.png",
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <DashboardHeader />

      <main className="px-4 py-8 md:px-8">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <div>
            <h1 className="text-4xl font-bold">AI Studio</h1>
            <p className="mt-1 text-sm font-medium text-muted-foreground">
              (4 Results of 4)
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
            />
          ))}
        </div>
      </main>
    </div>
  );
}
