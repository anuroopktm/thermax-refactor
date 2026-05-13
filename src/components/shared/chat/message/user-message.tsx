interface UserMessageProps {
  content: string;
}

export function UserMessage({ content }: UserMessageProps) {
  return (
    <div className="max-w-[80%] rounded-xl bg-primary px-3 py-2 text-primary-foreground">
      <p className="wrap-break-word whitespace-pre-wrap text-sm leading-relaxed">
        {content}
      </p>
    </div>
  );
}
