"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Play, RotateCcw, Loader2 } from "lucide-react";

const Editor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-base-300 text-sm opacity-50">
      Chargement de l'éditeur…
    </div>
  ),
});

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  height?: string;
  runnable?: boolean;
  children?: string;
}

let pyodideInstance: any = null;
let pyodideLoading: Promise<any> | null = null;

function loadPyodideOnce() {
  if (pyodideInstance) return Promise.resolve(pyodideInstance);
  if (pyodideLoading) return pyodideLoading;

  pyodideLoading = (async () => {
    if (!(window as any).loadPyodide) {
      await new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js";
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Impossible de charger Pyodide"));
        document.head.appendChild(script);
      });
    }

    const loadPyodide = (window as any).loadPyodide;
    pyodideInstance = await loadPyodide({
      indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.4/full/",
    });
    return pyodideInstance;
  })();

  return pyodideLoading;
}

export default function CodeEditor({
  initialCode,
  language = "python",
  height = "320px",
  runnable = true,
  children,
}: CodeEditorProps) {
  const defaultCode =
    (typeof children === "string" ? children.trim() : "") ||
    initialCode ||
    "# Écris ton code ici\nprint('Hello TechMathGuide!')";

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pyodideReady, setPyodideReady] = useState(false);
  const isRunning = useRef(false);

  useEffect(() => {
    if (language !== "python") return;

    const idle =
      (window as any).requestIdleCallback?.(() => {
        loadPyodideOnce().then(() => setPyodideReady(true));
      }) ?? setTimeout(() => {
        loadPyodideOnce().then(() => setPyodideReady(true));
      }, 300);

    return () => {
      if ((window as any).cancelIdleCallback && typeof idle === "number") {
        (window as any).cancelIdleCallback(idle);
      } else {
        clearTimeout(idle as any);
      }
    };
  }, [language]);

  const runCode = useCallback(async () => {
    if (language !== "python") {
      setOutput("Exécution disponible uniquement pour Python (via Pyodide).");
      return;
    }

    if (isRunning.current) return;
    isRunning.current = true;

    setRunning(true);
    setError(null);
    setOutput("");

    try {
      const pyodide = await loadPyodideOnce();
      setPyodideReady(true);

      pyodide.runPython(`
import sys
from io import StringIO
sys.stdout = StringIO()
      `);

      await pyodide.runPythonAsync(code);

      const stdout = pyodide.runPython("sys.stdout.getvalue()");
      setOutput(stdout || "(aucun output)");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setRunning(false);
      isRunning.current = false;
    }
  }, [code, language]);

  const reset = () => {
    setCode(defaultCode);
    setOutput("");
    setError(null);
  };

  const runLabel = running
    ? pyodideReady
      ? "Exécution..."
      : "Chargement de Python…"
    : "Exécuter";

  return (
    <div className="rounded-xl overflow-hidden border border-primary/20 bg-base-300 shadow-lg my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-base-200 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <span className="badge badge-primary badge-sm">{language}</span>
          <span className="text-xs opacity-60">Éditeur interactif</span>
          {language === "python" && !pyodideReady && (
            <span className="text-xs opacity-40">(préparation en cours…)</span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="btn btn-ghost btn-xs gap-1"
            aria-label="Réinitialiser le code"
          >
            <RotateCcw size={14} aria-hidden="true" />
            Reset
          </button>
          {runnable && (
            <button
              onClick={runCode}
              disabled={running}
              className="btn btn-primary btn-xs gap-1 glow-primary-sm"
              aria-label={running ? runLabel : "Exécuter le code"}
              aria-busy={running}
            >
              {running ? (
                <>
                  <Loader2 size={14} className="animate-spin" aria-hidden="true" />
                  {runLabel}
                </>
              ) : (
                <>
                  <Play size={14} aria-hidden="true" />
                  {runLabel}
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <div aria-label="Zone de code" role="group">
        <Editor
          height={height}
          language={language}
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value ?? "")}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            padding: { top: 12 },
            fontFamily: "JetBrains Mono, Fira Code, monospace",
          }}
        />
      </div>

      {(output || error) && (
        <div className="border-t border-primary/10">
          <div className="px-4 py-1.5 bg-base-200 text-xs font-semibold uppercase tracking-wider opacity-70">
            Output
          </div>
          <pre
            role="status"
            aria-live="polite"
            className={`p-4 text-sm font-mono overflow-x-auto max-h-48 ${
              error ? "text-error bg-error/10" : "text-success bg-success/5"
            }`}
          >
            {error || output}
          </pre>
        </div>
      )}
    </div>
  );
}