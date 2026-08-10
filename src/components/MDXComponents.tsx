import CodeEditor from "./CodeEditor";
import "katex/dist/katex.min.css";
import katex from "katex";

function Math({ children, display = false }: { children: string; display?: boolean }) {
  const html = katex.renderToString(children, {
    throwOnError: false,
    displayMode: display,
  });
  return (
    <span
      className={display ? "block my-4 overflow-x-auto" : "inline"}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function Vocab({ children }: { children: React.ReactNode }) {
  return <span className="vocab">{children}</span>;
}

function Callout({
  type = "info",
  title,
  children,
}: {
  type?: "info" | "tip" | "warning" | "math";
  title?: string;
  children: React.ReactNode;
}) {
  const styles = {
    info: "border-info/40 bg-info/10",
    tip: "border-success/40 bg-success/10",
    warning: "border-warning/40 bg-warning/10",
    math: "border-primary/40 bg-primary/10",
  };

  const icons = {
    info: "ℹ️",
    tip: "💡",
    warning: "⚠️",
    math: "📐",
  };

  return (
    <div className={`my-6 rounded-lg border p-4 ${styles[type]}`}>
      {(title || type) && (
        <div className="font-semibold mb-2 flex items-center gap-2">
          <span>{icons[type]}</span>
          {title || type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      )}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}

export const mdxComponents = {
  Math,
  Vocab,
  Callout,
  CodeEditor,
  h1: (props: any) => (
    <h1 className="text-3xl font-bold text-primary mt-8 mb-4" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-2xl font-bold text-primary/90 mt-8 mb-3" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-xl font-semibold text-secondary mt-6 mb-2" {...props} />
  ),
  p: (props: any) => (
    <p className="my-4 leading-relaxed text-base-content/90" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-inside my-4 space-y-1" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-inside my-4 space-y-1" {...props} />
  ),
  a: (props: any) => (
    <a className="text-primary underline hover:text-secondary" {...props} />
  ),
  code: (props: any) => {
    const isInline = !props.className;
    if (isInline) {
      return (
        <code className="bg-base-300 text-accent px-1.5 py-0.5 rounded text-sm" {...props} />
      );
    }
    return <code {...props} />;
  },
  pre: (props: any) => (
    <pre className="bg-base-300 border border-primary/20 rounded-lg p-4 overflow-x-auto my-4 text-sm" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote
      className="border-l-4 border-primary pl-4 my-4 italic opacity-90 bg-primary/5 py-2 rounded-r"
      {...props}
    />
  ),
  table: (props: any) => (
    <div className="overflow-x-auto my-6">
      <table className="table table-zebra table-sm" {...props} />
    </div>
  ),
};
