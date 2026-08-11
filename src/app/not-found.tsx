import Link from "next/link";
import { Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="max-w-lg mx-auto px-4 py-24 text-center">
      <Compass size={48} className="mx-auto mb-6 text-primary opacity-60" />
      <h1 className="text-3xl font-bold mb-3">Page introuvable</h1>
      <p className="opacity-70 mb-8">
        Cette page n'existe pas ou a été déplacée. Retourne explorer les
        leçons disponibles.
      </p>
      <Link href="/lessons" className="btn btn-primary">
        Voir les leçons
      </Link>
    </div>
  );
}