"use client";

import { useState, useCallback, useRef } from "react";
import Editor from "@monaco-editor/react";
import { Play, RotateCcw, Loader2 } from "lucide-react";

interface CodeEditorProps {
  initialCode?: string;
  language?: string;
  height?: string;
  runnable?: boolean;
  children?: string; // permet d'écrire le code entre les balises en MDX
}

// Cache Pyodide instance
let pyodideInstance: any = null;
let pyodideLoading: Promise<any> | null = null;

async function loadPyodideOnce() {
  if (pyodideInstance) return pyodideInstance;
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
  // Priorité : children (MDX) > initialCode > défaut
  const defaultCode =
    (typeof children === "string" ? children.trim() : "") ||
    initialCode ||
    "# Écris ton code ici\nprint('Hello TechMathGuide!')";

  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState<string>("");
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isRunning = useRef(false);

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

  return (
    <div className="rounded-xl overflow-hidden border border-primary/20 bg-base-300 shadow-lg my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-base-200 border-b border-primary/10">
        <div className="flex items-center gap-2">
          <span className="badge badge-primary badge-sm">{language}</span>
          <span className="text-xs opacity-60">Éditeur interactif</span>
        </div>
        <div className="flex gap-2">
          <button onClick={reset} className="btn btn-ghost btn-xs gap-1" title="Réinitialiser">
            <RotateCcw size={14} />
            Reset
          </button>
          {runnable && (
            <button
              onClick={runCode}
              disabled={running}
              className="btn btn-primary btn-xs gap-1 glow-primary-sm"
            >
              {running ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Exécution...
                </>
              ) : (
                <>
                  <Play size={14} />
                  Exécuter
                </>
              )}
            </button>
          )}
        </div>
      </div>

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

      {(output || error) && (
        <div className="border-t border-primary/10">
          <div className="px-4 py-1.5 bg-base-200 text-xs font-semibold uppercase tracking-wider opacity-70">
            Output
          </div>
          <pre
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