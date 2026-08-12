import { createClient } from "@/lib/supabase/server";
import { getAllProgress } from "@/lib/progress";
import { redirect } from "next/navigation";
import Link from "next/link";
import { domains, getDomain, getLesson } from "@/lib/domains";
import { getDomainIcon } from "@/lib/domain-icons";
import { BookOpen, Trophy, Flame, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "Dashboard",
};

function calculateStreak(dates: string[]): number {
  if (dates.length === 0) return 0;

  const daySet = new Set(dates.map((d) => new Date(d).toISOString().slice(0, 10)));
  const cursor = new Date();
  let streak = 0;

  const todayKey = cursor.toISOString().slice(0, 10);
  if (!daySet.has(todayKey)) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (daySet.has(cursor.toISOString().slice(0, 10))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const progress = await getAllProgress();
  const completed = progress.filter((p) => p.completed);
  const completedKeys = new Set(completed.map((p) => `${p.domain}/${p.slug}`));

  const totalLessons = domains.reduce((acc, d) => acc + d.lessons.length, 0);
  const completedCount = completed.length;
  const percent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const streak = calculateStreak(
    completed.filter((p) => p.completed_at).map((p) => p.completed_at as string)
  );

  const recentCompleted = [...completed]
    .sort((a, b) => (b.completed_at ?? "").localeCompare(a.completed_at ?? ""))
    .slice(0, 3);

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
          <div className="stat-title">Leçons complétées</div>
          <div className="stat-value text-2xl">
            {completedCount}/{totalLessons}
          </div>
        </div>
        <div className="stat bg-base-200 rounded-xl border border-primary/10">
          <div className="stat-figure text-accent">
            <Flame size={28} />
          </div>
          <div className="stat-title">Série</div>
          <div className="stat-value text-2xl">{streak}</div>
          <div className="stat-desc">jours</div>
        </div>
        <div className="stat bg-base-200 rounded-xl border border-primary/10">
          <div className="stat-title">Progression</div>
          <div className="stat-value text-2xl">{percent}%</div>
          <div className="stat-desc">
            {percent === 0 ? "Commence une leçon !" : "Continue comme ça !"}
          </div>
        </div>
      </div>

      {recentCompleted.length > 0 && (
        <div className="mb-12">
          <h2 className="text-xl font-bold mb-4">Récemment terminé</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {recentCompleted.map((p) => {
              const domain = getDomain(p.domain);
              const lesson = getLesson(p.domain, p.slug);
              if (!domain || !lesson) return null;
              return (
                <Link
                  key={`${p.domain}/${p.slug}`}
                  href={`/lessons/${p.domain}/${p.slug}`}
                  className="card bg-base-200 border border-success/20 hover:border-success/50 transition-all"
                >
                  <div className="card-body py-4">
                    <div className="flex items-center gap-2 text-success text-xs font-semibold mb-1">
                      <CheckCircle2 size={14} />
                      {p.quiz_score !== null ? `${p.quiz_score}/${p.quiz_total}` : "Terminé"}
                    </div>
                    <h3 className="font-semibold text-sm">{lesson.title}</h3>
                    <p className="text-xs opacity-60">{domain.name}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <h2 className="text-xl font-bold mb-4">Tes domaines</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map((domain) => {
          const Icon = getDomainIcon(domain.icon);
          const domainCompleted = domain.lessons.filter((l) =>
            completedKeys.has(`${domain.slug}/${l.slug}`)
          ).length;

          return (
            <Link
              key={domain.slug}
              href={`/lessons/${domain.slug}`}
              className="card bg-base-200 border border-primary/10 hover:border-primary/40 transition-all group"
            >
              <div className="card-body py-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg bg-gradient-to-br ${domain.color} flex items-center justify-center shrink-0`}
                  >
                    <Icon size={20} className="text-white" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold group-hover:text-primary transition-colors">
                      {domain.name}
                    </h3>
                    <p className="text-xs opacity-60">
                      {domainCompleted}/{domain.lessons.length} leçon
                      {domain.lessons.length > 1 ? "s" : ""} complétée
                      {domainCompleted > 1 ? "s" : ""}
                    </p>
                  </div>
                  <ArrowRight
                    size={18}
                    className="opacity-40 group-hover:opacity-100 group-hover:text-primary transition-all"
                  />
                </div>
                <div className="w-full bg-base-300 rounded-full h-1.5 mt-3">
                  <div
                    className="bg-primary h-1.5 rounded-full transition-all"
                    style={{
                      width: `${
                        domain.lessons.length > 0
                          ? (domainCompleted / domain.lessons.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
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