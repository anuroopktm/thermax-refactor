import React, { useState, memo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import { Copy, Check } from "lucide-react";

import { cn } from "@/lib/utils";

import "highlight.js/styles/github-dark.css";

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent = memo(function MarkdownContent({
  content,
}: MarkdownContentProps) {
  return (
    <div className="max-w-none wrap-break-word">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          p: MarkdownP,
          h1: MarkdownH1,
          h2: MarkdownH2,
          h3: MarkdownH3,
          h4: MarkdownH4,
          h5: MarkdownH5,
          h6: MarkdownH6,
          ul: MarkdownUl,
          ol: MarkdownOl,
          li: MarkdownLi,
          blockquote: MarkdownBlockquote,
          a: MarkdownLink,
          pre: MarkdownPre,
          code: MarkdownCode,
          hr: MarkdownHr,
          table: MarkdownTable,
          thead: MarkdownThead,
          tbody: MarkdownTbody,
          tr: MarkdownTr,
          th: MarkdownTh,
          td: MarkdownTd,
          strong: MarkdownStrong,
          em: MarkdownEm,
          del: MarkdownDel,
          b: MarkdownStrong,
          i: MarkdownEm,
          img: MarkdownImg,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});

/* ---------------- TYPOGRAPHY ELEMENTS ---------------- */

const MarkdownP = memo(function MarkdownP({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return <p className={cn("leading-7 not-first:mt-6", className)} {...props} />;
});

const MarkdownH1 = memo(function MarkdownH1({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn(
        "font-heading mt-2 scroll-m-20 text-4xl font-bold",
        className,
      )}
      {...props}
    />
  );
});

const MarkdownH2 = memo(function MarkdownH2({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "font-heading mt-12 scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0",
        className,
      )}
      {...props}
    />
  );
});

const MarkdownH3 = memo(function MarkdownH3({
  className,
  ...props
}: React.ComponentProps<"h3">) {
  return (
    <h3
      className={cn(
        "font-heading mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
});

const MarkdownH4 = memo(function MarkdownH4({
  className,
  ...props
}: React.ComponentProps<"h4">) {
  return (
    <h4
      className={cn(
        "font-heading mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
});

const MarkdownH5 = memo(function MarkdownH5({
  className,
  ...props
}: React.ComponentProps<"h5">) {
  return (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
});

const MarkdownH6 = memo(function MarkdownH6({
  className,
  ...props
}: React.ComponentProps<"h6">) {
  return (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
});

/* ---------------- INLINE MARKDOWN STYLES ---------------- */

const MarkdownStrong = memo(function MarkdownStrong(
  props: React.ComponentProps<"strong">,
) {
  return <strong className="font-semibold text-foreground" {...props} />;
});

const MarkdownEm = memo(function MarkdownEm(props: React.ComponentProps<"em">) {
  return <em className="italic text-foreground/95" {...props} />;
});

const MarkdownDel = memo(function MarkdownDel(
  props: React.ComponentProps<"del">,
) {
  return <span className="line-through text-muted-foreground/80" {...props} />;
});

/* ---------------- LIST ELEMENTS ---------------- */

const MarkdownUl = memo(function MarkdownUl({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />;
});

const MarkdownOl = memo(function MarkdownOl({
  className,
  ...props
}: React.ComponentProps<"ol">) {
  return <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />;
});

const MarkdownLi = memo(function MarkdownLi({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return <li className={cn("mt-2", className)} {...props} />;
});

/* ---------------- BLOCKQUOTE ---------------- */

const MarkdownBlockquote = memo(function MarkdownBlockquote({
  className,
  ...props
}: React.ComponentProps<"blockquote">) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    />
  );
});

/* ---------------- MARKDOWN LINK ---------------- */

const MarkdownLink = memo(function MarkdownLink({
  className,
  ...props
}: React.ComponentProps<"a">) {
  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    />
  );
});

/* ---------------- CODE ELEMENTS ---------------- */

const CodeBlock = memo(function CodeBlock({
  code,
  language,
}: {
  code: string;
  language: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="my-5 overflow-hidden rounded-xl border border-zinc-800 bg-[#0d1117] shadow-sm group/code">
      {/* Header bar */}
      <div className="flex items-center justify-between bg-zinc-900/90 px-4 py-1.5 text-xs font-mono text-zinc-400 select-none border-b border-zinc-800/40">
        <span className="font-semibold text-zinc-400 lowercase">
          {language}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded px-2.5 py-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-all active:scale-95 duration-150"
        >
          {copied ? (
            <>
              <Check className="size-3.5 text-green-500" />
              <span className="text-green-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="size-3.5" />
              <span>Copy code</span>
            </>
          )}
        </button>
      </div>
      {/* Code body */}
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-[#c9d1d9] bg-transparent my-0">
        <code
          className={`language-${language} block bg-transparent p-0 text-inherit`}
        >
          {code}
        </code>
      </pre>
    </div>
  );
});

const MarkdownPre = memo(function MarkdownPre(
  props: React.ComponentProps<"pre">,
) {
  const children = props.children;
  let codeText = "";
  let language = "code";

  if (React.isValidElement(children)) {
    const codeProps = children.props as {
      children?: React.ReactNode;
      className?: string;
    };
    if (codeProps) {
      if (typeof codeProps.children === "string") {
        codeText = codeProps.children;
      } else if (Array.isArray(codeProps.children)) {
        codeText = codeProps.children.join("");
      }
      const className = codeProps.className || "";
      const match = /language-(\w+)/.exec(className);
      if (match) {
        language = match[1];
      }
    }
  }

  // If there's no code inside or it's standard formatting, render default pre fallback
  if (!codeText) {
    return (
      <pre
        className={cn(
          "mb-4 mt-6 max-h-[650px] overflow-x-auto rounded-lg border bg-zinc-950 py-4 dark:bg-zinc-900",
          props.className,
        )}
        {...props}
      />
    );
  }

  return <CodeBlock code={codeText.trim()} language={language} />;
});

interface MarkdownCodeProps extends React.ComponentProps<"code"> {
  inline?: boolean;
}

const MarkdownCode = memo(function MarkdownCode({
  inline,
  className,
  children,
  ...props
}: MarkdownCodeProps) {
  const isInline = inline || !className;

  if (isInline) {
    return (
      <code
        className={cn(
          "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
          className,
        )}
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code
      className={cn(
        "block font-mono text-[13px] bg-transparent p-0 text-inherit",
        className,
      )}
      {...props}
    >
      {children}
    </code>
  );
});

/* ---------------- MARKDOWN HORIZONTAL RULE ---------------- */

const MarkdownHr = memo(function MarkdownHr(props: React.ComponentProps<"hr">) {
  return <hr className={cn("my-4 md:my-8", props.className)} {...props} />;
});

/* ---------------- MARKDOWN IMAGE ---------------- */

const MarkdownImg = memo(function MarkdownImg({
  className,
  alt,
  ...props
}: React.ComponentProps<"img">) {
  return (
    <img
      className={cn("rounded-md", className)}
      alt={alt || "Markdown Image"}
      {...props}
    />
  );
});

/* ---------------- MARKDOWN TABLE ---------------- */

const MarkdownTable = memo(function MarkdownTable({
  className,
  ...props
}: React.ComponentProps<"table">) {
  return (
    <div className="my-6 w-full overflow-y-auto rounded-md">
      <table
        className={cn(
          "relative w-full text-sm rounded-lg ring-1 ring-border",
          className,
        )}
        {...props}
      />
    </div>
  );
});

const MarkdownThead = memo(function MarkdownThead(
  props: React.ComponentProps<"thead">,
) {
  return <thead {...props} />;
});

const MarkdownTbody = memo(function MarkdownTbody(
  props: React.ComponentProps<"tbody">,
) {
  return <tbody {...props} />;
});

const MarkdownTr = memo(function MarkdownTr({
  className,
  ...props
}: React.ComponentProps<"tr">) {
  return <tr className={cn("m-0 border-t", className)} {...props} />;
});

const MarkdownTh = memo(function MarkdownTh({
  className,
  ...props
}: React.ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [[align=center]]:text-center [[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  );
});

const MarkdownTd = memo(function MarkdownTd({
  className,
  ...props
}: React.ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "border px-4 py-2 text-left [[align=center]]:text-center [[align=right]]:text-right",
        className,
      )}
      {...props}
    />
  );
});
