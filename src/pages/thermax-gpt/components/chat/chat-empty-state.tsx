import PlaceholderImg from "@/assets/illustrations/start-new-chat.png";

export function ChatEmptyState() {
  return (
    <div className="w-full text-center space-y-4 py-12">
      <div className="flex flex-col items-center justify-center gap-4">
        <img
          src={PlaceholderImg}
          alt="Start New Chat"
          className="aspect-square h-80 w-auto object-contain"
        />
        <h1 className="text-4xl font-semibold">Start New Chat</h1>
      </div>
    </div>
  );
}
