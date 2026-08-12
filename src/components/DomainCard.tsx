import Link from "next/link";
import type { Domain } from "@/lib/domains";
import { getDomainIcon } from "@/lib/domain-icons";

export default function DomainCard({ domain }: { domain: Domain }) {
  const Icon = getDomainIcon(domain.icon);

  return (
    <Link
      href={`/lessons/${domain.slug}`}
      className="card bg-base-200 arc-border transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group"
    >
      <div className="card-body">
        <div className="flex items-start justify-between">
          <div
            className={`w-12 h-12 rounded-xl bg-gradient-to-br ${domain.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
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
        <p className="text-sm opacity-70 line-clamp-2">{domain.description}</p>
        <div className="card-actions justify-end mt-2">
          <span className="text-primary text-sm font-medium group-hover:underline">
            Explorer →
          </span>
        </div>
      </div>
    </Link>
  );
}