import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-base-200 text-base-content p-8 border-t border-primary/10 mt-auto">
      <aside>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-primary text-2xl">⚡</span>
          <span className="font-bold text-lg">
            Tech<span className="text-primary">Math</span>Guide
          </span>
        </div>
        <p className="text-sm opacity-70 max-w-md">
          Comprendre le lien réel entre Mathématiques, Anglais technique et
          Technologie. Pour les développeurs curieux de 2026.
        </p>
        <p className="text-xs opacity-50 mt-4">
          © {new Date().getFullYear()} TechMathGuide — Projet éducatif open
          source
        </p>
      </aside>
      <nav className="grid grid-flow-col gap-4 text-sm">
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
    </footer>
  );
}
