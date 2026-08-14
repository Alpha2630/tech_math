"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Loader2, ArrowLeft, Zap } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/dashboard";
  const supabase = createClient();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        });
        if (error) throw error;
        setMessage({
          type: "success",
          text: "Compte créé ! Vérifie ton email pour confirmer (si la confirmation est activée).",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push(redirect);
        router.refresh();
      }
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : "Une erreur est survenue";
      setMessage({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async () => {
    if (!email) {
      setMessage({ type: "error", text: "Entre ton email d'abord" });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?redirect=${redirect}`,
        },
      });
      if (error) throw error;
      setMagicLinkSent(true);
      setMessage({
        type: "success",
        text: "Lien magique envoyé ! Vérifie ta boîte mail.",
      });
    } catch (err: unknown) {
      const text = err instanceof Error ? err.message : "Erreur lors de l'envoi";
      setMessage({ type: "error", text });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm opacity-70 hover:opacity-100 mb-6"
        >
          <ArrowLeft size={16} />
          Retour à l&apos;accueil
        </Link>

        <div className="card bg-base-200 border border-primary/20 shadow-xl">
          <div className="card-body">
            <div className="text-center mb-4">
              <Zap
                size={36}
                className="text-primary mx-auto"
                style={{ filter: "drop-shadow(0 0 6px rgba(0, 212, 255, 0.6))" }}
                fill="currentColor"
              />
              <h1 className="text-2xl font-bold mt-2">
                {isSignUp ? "Créer un compte" : "Connexion"}
              </h1>
              <p className="text-sm opacity-70 mt-1">
                Accède aux leçons et suis ta progression
              </p>
            </div>

            {message && (
              <div
                className={`alert ${
                  message.type === "error" ? "alert-error" : "alert-success"
                } text-sm`}
              >
                <span>{message.text}</span>
              </div>
            )}

            {!magicLinkSent && (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 focus-within:border-primary">
                    <Mail size={16} className="opacity-50" />
                    <input
                      type="email"
                      className="grow"
                      placeholder="toi@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Mot de passe</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2 focus-within:border-primary">
                    <Lock size={16} className="opacity-50" />
                    <input
                      type="password"
                      className="grow"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn btn-primary w-full glow-primary-sm"
                >
                  {loading ? (
                    <Loader2 className="animate-spin" size={18} />
                  ) : isSignUp ? (
                    "Créer mon compte"
                  ) : (
                    "Se connecter"
                  )}
                </button>
              </form>
            )}

            <div className="divider text-xs opacity-50">OU</div>

            <button
              onClick={handleMagicLink}
              disabled={loading || magicLinkSent}
              className="btn btn-outline w-full"
            >
              {magicLinkSent ? "Email envoyé ✓" : "Recevoir un lien magique"}
            </button>

            <p className="text-center text-sm mt-4">
              {isSignUp ? "Déjà un compte ?" : "Pas encore de compte ?"}{" "}
              <button
                type="button"
                className="link link-primary"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setMessage(null);
                }}
              >
                {isSignUp ? "Se connecter" : "S'inscrire"}
              </button>
            </p>
          </div>
        </div>

        <p className="text-center text-xs opacity-50 mt-6">
          En te connectant, tu acceptes d&apos;utiliser TechMathGuide à des fins
          éducatives.
        </p>
      </div>
    </div>
  );
}