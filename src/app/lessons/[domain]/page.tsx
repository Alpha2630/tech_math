import { domains, getDomain } from "@/lib/domains";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Clock, Signal, ArrowLeft, BookOpen } from "lucide-react";

export async function generateStaticParams() {
  return domains.map((d) => ({ domain: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain: slug } = await params;
  const domain = getDomain(slug);
  if (!domain) return { title: "Domaine introuvable" };
  return {
    title: domain.name,
    description: domain.description,
  };
}

export default async function DomainPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { domain: slug } = await params;
  const domain = getDomain(slug);
  if (!domain) notFound();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <Link
        href="/lessons"
        className="inline-flex items-center gap-1 text-sm opacity-70 hover:opacity-100 mb-6"
      >
        <ArrowLeft size={16} />
        Tous les domaines
      </Link>

      <div className="mb-10">
        <div className="flex items-center gap-4 mb-3">
          <span className="text-5xl">{domain.icon}</span>
          <div>
            <h1 className="text-3xl font-bold">{domain.name}</h1>
            <p className="text-sm opacity-60">{domain.nameEn}</p>
          </div>
        </div>
        <p className="opacity-80 max-w-2xl">{domain.description}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <BookOpen size={20} className="text-primary" />
        Leçons disponibles
      </h2>

      <div className="space-y-4">
        {domain.lessons.map((lesson, idx) => (
          <Link
            key={lesson.slug}
            href={`/lessons/${domain.slug}/${lesson.slug}`}
            className="card bg-base-200 border border-primary/10 hover:border-primary/40 transition-all group"
          >
            <div className="card-body py-5 flex-row items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold shrink-0">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold group-hover:text-primary transition-colors">
                  {lesson.title}
                </h3>
                <p className="text-sm opacity-60 line-clamp-1">
                  {lesson.description}
                </p>
                <div className="flex gap-3 mt-2 text-xs opacity-50">
                  <span className="flex items-center gap-1">
                    <Signal size={12} />
                    {lesson.level}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} />
                    {lesson.duration}
                  </span>
                </div>
              </div>
              <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
