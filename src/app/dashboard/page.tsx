import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { domains } from "@/lib/domains";
import { BookOpen, Trophy, Flame, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // In a real app we would fetch progress from Supabase tables
  // For now we show a clean overview
  const totalLessons = domains.reduce((acc, d) => acc + d.lessons.length, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">
          Bonjour{user.email ? `, ${user.email.split("@")[0]}` : ""} 👋
        </h1>
        <p className="opacity-70">
          Continue ton parcours. Chaque leçon relie maths, anglais tech et code.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        <div className="stat bg-base-200 rounded-xl border border-primary/10">
          <div className="stat-figure text-primary">
            <BookOpen size={28} />
          </div>
          <div className="stat-title">Domaines</div>
          <div className="stat-value text-2xl">{domains.length}</div>
        </div>
        <div className="stat bg-base-200 rounded-xl border border-primary/10">
          <div className="stat-figure text-secondary">
            <Trophy size={28} />
          </div>
          <div className="stat-title">Leçons dispo</div>
          <div className="stat-value text-2xl">{totalLessons}</div>
        </div>
        <div className="stat bg-base-200 rounded-xl border border-primary/10">
          <div className="stat-figure text-accent">
            <Flame size={28} />
          </div>
          <div className="stat-title">Série</div>
          <div className="stat-value text-2xl">0</div>
          <div className="stat-desc">jours</div>
        </div>
        <div className="stat bg-base-200 rounded-xl border border-primary/10">
          <div className="stat-title">Progression</div>
          <div className="stat-value text-2xl">0%</div>
          <div className="stat-desc">Commence une leçon !</div>
        </div>
      </div>

      {/* Domains quick access */}
      <h2 className="text-xl font-bold mb-4">Tes domaines</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map((domain) => (
          <Link
            key={domain.slug}
            href={`/lessons/${domain.slug}`}
            className="card bg-base-200 border border-primary/10 hover:border-primary/40 transition-all group"
          >
            <div className="card-body py-5">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{domain.icon}</span>
                <div className="flex-1">
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {domain.name}
                  </h3>
                  <p className="text-xs opacity-60">
                    {domain.lessons.length} leçon
                    {domain.lessons.length > 1 ? "s" : ""}
                  </p>
                </div>
                <ArrowRight
                  size={18}
                  className="opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12 p-6 rounded-xl border border-primary/20 bg-primary/5">
        <h3 className="font-semibold mb-2">💡 Conseil du jour</h3>
        <p className="text-sm opacity-80">
          Commence par la leçon{" "}
          <Link
            href="/lessons/ai-ml/linear-algebra-ml"
            className="link link-primary"
          >
            Algèbre linéaire pour le ML
          </Link>{" "}
          — c&apos;est le fondement de presque tout en IA moderne. Les maths y
          sont expliquées de façon visuelle et concrète.
        </p>
      </div>
    </div>
  );
}
