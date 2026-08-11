"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <AlertTriangle size={48} className="mx-auto mb-6 text-error opacity-70" />
      <h1 className="text-3xl font-bold mb-3">Une erreur est survenue</h1>
      <p className="opacity-70 mb-8">
        Quelque chose s'est mal passé de notre côté. Réessaie, ou reviens
        plus tard si le problème persiste.
      </p>
      <div className="flex gap-3 justify-center">
        <button onClick={reset} className="btn btn-primary">
          Réessayer
        </button>
        <Link href="/" className="btn btn-outline">
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}