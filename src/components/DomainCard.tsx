import Link from "next/link";
import type { Domain } from "@/lib/domains";
import { getDomainIcon } from "@/lib/domain-icons";

export default function DomainCard({ domain }: { domain: Domain }) {
  const Icon = getDomainIcon(domain.icon);

  return (
    <Link
      href={`/lessons/${domain.slug}`}
      className="relative card bg-base-200 arc-border overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 group"
    >
      {/* Barre d'accent en haut, couleur propre au domaine */}
      <div className={`h-1 w-full bg-gradient-to-r ${domain.color}`} />

      {/* Glow radial discret derrière l'icône au survol */}
      <div
        className={`pointer-events-none absolute -top-10 -left-10 w-40 h-40 rounded-full bg-gradient-to-br ${domain.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}
      />

      <div className="card-body relative">
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
          >
            <Icon size={24} className="text-white" strokeWidth={2} />
          </div>
          <span className="badge badge-outline badge-sm opacity-70">
            {domain.lessons.length} leçon{domain.lessons.length > 1 ? "s" : ""}
          </span>
        </div>
        <h2 className="card-title text-lg group-hover:text-primary transition-colors mt-3">
          {domain.name}
        </h2>
        <p className="text-sm opacity-70 line-clamp-3">{domain.description}</p>
        <div className="card-actions justify-end mt-2">
          <span className="text-primary text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
            Explorer
            <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}