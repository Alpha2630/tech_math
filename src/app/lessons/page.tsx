import { domains } from "@/lib/domains";
import DomainCard from "@/components/DomainCard";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Leçons",
  description: "Tous les domaines et leçons de TechMathGuide",
};

export default async function LessonsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?redirect=/lessons");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Tous les domaines</h1>
        <p className="opacity-70 max-w-2xl">
          Choisis un domaine pour explorer les leçons. Chaque leçon combine
          concepts mathématiques, vocabulaire anglais technique et exemples de
          code interactifs.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {domains.map((domain) => (
          <DomainCard key={domain.slug} domain={domain} />
        ))}
      </div>
    </div>
  );
}
