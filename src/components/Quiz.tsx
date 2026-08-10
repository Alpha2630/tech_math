"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { markLessonCompleteAction } from "@/app/lessons/actions";

interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
}

interface QuizProps {
  domain: string;
  slug: string;
  questions: QuizQuestion[];
}

export default function Quiz({ domain, slug, questions }: QuizProps) {
  const [answers, setAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  );
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<"auth" | "other" | null>(null);

  const score = answers.reduce<number>(
    (acc, a, i) => (a === questions[i].correct ? acc + 1 : acc),
    0
  );

  const selectAnswer = (qIndex: number, optIndex: number) => {
    if (submitted) return;
    const next = [...answers];
    next[qIndex] = optIndex;
    setAnswers(next);
  };

  const submit = async () => {
    setSubmitted(true);
    setSaving(true);
    setSaveError(null);
    try {
      await markLessonCompleteAction(domain, slug, score, questions.length);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setSaveError(message.includes("authentifié") ? "auth" : "other");
    } finally {
      setSaving(false);
    }
  };

  const allAnswered = answers.every((a) => a !== null);

  return (
    <div className="my-8 rounded-xl border border-primary/20 bg-base-300 p-5">
      <h3 className="text-lg font-semibold mb-4">Quiz</h3>

      {questions.map((q, qIndex) => (
        <div key={qIndex} className="mb-5">
          <p className="font-medium mb-2">{q.question}</p>
          <div className="flex flex-col gap-2">
            {q.options.map((opt, optIndex) => {
              const isSelected = answers[qIndex] === optIndex;
              const isCorrect = optIndex === q.correct;
              let style = "border-primary/20 hover:bg-primary/5";
              if (submitted && isSelected && isCorrect)
                style = "border-success bg-success/10";
              else if (submitted && isSelected && !isCorrect)
                style = "border-error bg-error/10";
              else if (submitted && isCorrect)
                style = "border-success/50 bg-success/5";

              return (
                <button
                  key={optIndex}
                  onClick={() => selectAnswer(qIndex, optIndex)}
                  className={`text-left px-3 py-2 rounded-lg border text-sm flex items-center justify-between ${style}`}
                >
                  {opt}
                  {submitted && isSelected && isCorrect && (
                    <CheckCircle2 size={16} className="text-success" />
                  )}
                  {submitted && isSelected && !isCorrect && (
                    <XCircle size={16} className="text-error" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={submit}
          disabled={!allAnswered}
          className="btn btn-primary btn-sm"
        >
          Valider mes réponses
        </button>
      ) : (
        <div className="text-sm">
          <div className="font-medium">
            Score : {score}/{questions.length}{" "}
            {saving && <span className="opacity-60">(sauvegarde…)</span>}
          </div>
          {saveError === "auth" && (
            <div className="mt-2 opacity-80">
              <Link href="/login" className="link link-primary">
                Connecte-toi
              </Link>{" "}
              pour sauvegarder ce score et ta progression.
            </div>
          )}
          {saveError === "other" && (
            <div className="mt-2 text-error">
              Erreur lors de la sauvegarde, réessaie plus tard.
            </div>
          )}
        </div>
      )}
    </div>
  );
}