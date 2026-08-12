import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center gap-6 bg-base-200 text-base-content p-8 border-t border-primary/10 mt-auto text-center">
      <div className="px-4 max-w-md">
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-primary text-2xl">⚡</span>
          <span className="font-bold text-lg">
            Tech<span className="text-primary">Math</span>Guide
          </span>
        </div>
        <p className="text-sm opacity-70">
          Comprendre le lien réel entre Mathématiques, Anglais technique et
          Technologie. Pour les développeurs curieux de 2026.
        </p>
        <p className="text-xs opacity-50 mt-4">
          © {new Date().getFullYear()} TechMathGuide — Projet éducatif open
          source
        </p>
      </div>

      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm px-4">
        <Link href="/" className="link link-hover">
          Accueil
        </Link>
        <Link href="/lessons" className="link link-hover">
          Leçons
        </Link>
        <Link href="/dashboard" className="link link-hover">
          Dashboard
        </Link>
      </nav>

      <nav className="flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs opacity-60 px-4">
        <Link href="/mentions-legales" className="link link-hover">
          Mentions légales
        </Link>
        <Link href="/confidentialite" className="link link-hover">
          Confidentialité
        </Link>
        <Link href="/cgu" className="link link-hover">
          CGU
        </Link>
      </nav>
    </footer>
  );
}