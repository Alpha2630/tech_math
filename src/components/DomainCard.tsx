import Link from "next/link";
import type { Domain } from "@/lib/domains";

export default function DomainCard({ domain }: { domain: Domain }) {
  return (
    <Link
      href={`/lessons/${domain.slug}`}
      className="card bg-base-200 border border-primary/10 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 group arc-border"
    >
      <div className="card-body">
        <div className="flex items-start justify-between">
          <span className="text-4xl mb-2 group-hover:scale-110 transition-transform">
            {domain.icon}
          </span>
          <span className="badge badge-outline badge-sm opacity-70">
            {domain.lessons.length} leçon{domain.lessons.length > 1 ? "s" : ""}
          </span>
        </div>
        <h2 className="card-title text-lg group-hover:text-primary transition-colors">
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
