import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";

import "highlight.js/styles/github-dark.css";

import { ThinkingIndicator } from "./thinking-indicator";

interface AssistantMessageProps {
  content: string;
  isThinking?: boolean;
}

export function AssistantMessage({
  content,
  isThinking,
}: AssistantMessageProps) {
  if (isThinking) {
    return <AssistantThinking />;
  }

  return (
    <div className="max-w-[85%]">
      <div className="overflow-hidden px-4 py-3">
        <MarkdownContent content={content} />
      </div>
    </div>
  );
}

/* ---------------- MARKDOWN RENDER VIEW ---------------- */

function MarkdownContent({ content }: { content: string }) {
  return (
    <div
      className="
        prose prose-neutral dark:prose-invert
        max-w-none wrap-break-word

        prose-p:my-3
        prose-p:leading-7

        prose-headings:mb-3
        prose-headings:mt-6
        prose-headings:font-semibold

        prose-ul:my-3
        prose-ol:my-3
        prose-li:my-1

        prose-blockquote:my-4
        prose-blockquote:border-l-4
        prose-blockquote:border-border
        prose-blockquote:pl-4
        prose-blockquote:italic
        prose-blockquote:text-muted-foreground

        prose-hr:my-6
        prose-hr:border-border

        prose-table:my-4

        prose-pre:my-4
        prose-pre:overflow-x-auto
        prose-pre:rounded-xl
        prose-pre:border
        prose-pre:border-border
        prose-pre:bg-muted/40
        prose-pre:p-4

        prose-code:rounded-md
        prose-code:bg-muted
        prose-code:px-1.5
        prose-code:py-0.5
        prose-code:text-[0.875em]
        prose-code:before:content-none
        prose-code:after:content-none

        prose-a:text-primary
        prose-a:underline
        prose-a:underline-offset-4
      "
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          a: MarkdownLink,
          code: MarkdownCode,
          hr: MarkdownHr,
          table: MarkdownTable,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

/* ---------------- ASSISTANT THINKING STATE ---------------- */

function AssistantThinking() {
  return (
    <div className="max-w-[85%]">
      <ThinkingIndicator />
    </div>
  );
}

/* ---------------- MARKDOWN LINK ---------------- */

function MarkdownLink(props: React.ComponentProps<"a">) {
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}

/* ---------------- MARKDOWN CODE ---------------- */

function MarkdownCode({
  className,
  children,
  ...props
}: React.ComponentProps<"code">) {
  const isInline = !className;

  if (isInline) {
    return <code {...props}>{children}</code>;
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

/* ---------------- MARKDOWN HORIZONTAL RULE ---------------- */

function MarkdownHr() {
  return <hr className="my-6 border-border" />;
}

/* ---------------- MARKDOWN TABLE ---------------- */

function MarkdownTable(props: React.ComponentProps<"table">) {
  return (
    <div className="overflow-x-auto">
      <table {...props} />
    </div>
  );
}
