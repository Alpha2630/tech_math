import Link from "next/link";
import { domains } from "@/lib/domains";
import DomainCard from "@/components/DomainCard";
import WarpGrid from "@/components/WarpGrid";
import {
  ArrowRight,
  BookOpen,
  Code2,
  Languages,
  Calculator,
  Sparkles,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      {/* Hero */}
      <section className="relative px-4 py-20 lg:py-28 max-w-6xl mx-auto text-center">
        <WarpGrid />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm mb-6">
          <Sparkles size={14} />
          Maths × Anglais × Tech — Edition 2026
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          Comprendre vraiment{" "}
          <span className="text-primary glow-text">comment ça marche</span>
        </h1>

        <p className="text-lg sm:text-xl opacity-80 max-w-2xl mx-auto mb-10 leading-relaxed">
          TechMathGuide t&apos;explique clairement le lien entre les{" "}
          <strong className="text-primary">mathématiques</strong>, l&apos;
          <strong className="text-secondary">anglais technique</strong> et la{" "}
          <strong className="text-accent">technologie</strong> — avec des
          exemples concrets, du code et des exercices.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="btn btn-primary btn-lg glow-primary gap-2"
          >
            Commencer maintenant
            <ArrowRight size={20} />
          </Link>
          <Link href="/lessons" className="btn btn-outline btn-lg gap-2">
            <BookOpen size={20} />
            Voir les domaines
          </Link>
        </div>
      </section>

      {/* Value props */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="card bg-base-200 arc-border overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <figure className="h-44 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop"
                alt="Maths en contexte"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ filter: "saturate(0.4) brightness(0.75) hue-rotate(10deg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-base-200/20 to-primary/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent" />
              <div className="absolute bottom-3 left-3 w-11 h-11 rounded-xl bg-primary/15 backdrop-blur-sm border border-primary/30 flex items-center justify-center">
                <Calculator className="text-primary" size={22} />
              </div>
            </figure>
            <div className="card-body items-center text-center pt-5">
              <h3 className="card-title text-lg">Maths en contexte</h3>
              <p className="text-sm opacity-70">
                Plus de formules abstraites. On montre exactement où et pourquoi
                les maths interviennent dans le code et les systèmes réels.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 arc-border overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <figure className="h-44 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&h=400&fit=crop"
                alt="Anglais technique"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ filter: "saturate(0.4) brightness(0.75) hue-rotate(10deg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-base-200/20 to-secondary/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent" />
              <div className="absolute bottom-3 left-3 w-11 h-11 rounded-xl bg-secondary/15 backdrop-blur-sm border border-secondary/30 flex items-center justify-center">
                <Languages className="text-secondary" size={22} />
              </div>
            </figure>
            <div className="card-body items-center text-center pt-5">
              <h3 className="card-title text-lg">Anglais technique</h3>
              <p className="text-sm opacity-70">
                Vocabulaire essentiel mis en évidence : documentation,
                interviews, papers, et communication dans les équipes tech
                internationales.
              </p>
            </div>
          </div>

          <div className="card bg-base-200 arc-border overflow-hidden group transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
            <figure className="h-44 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop"
                alt="Pratique interactive"
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ filter: "saturate(0.4) brightness(0.75) hue-rotate(10deg)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-base-200 via-base-200/20 to-accent/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent" />
              <div className="absolute bottom-3 left-3 w-11 h-11 rounded-xl bg-accent/15 backdrop-blur-sm border border-accent/30 flex items-center justify-center">
                <Code2 className="text-accent" size={22} />
              </div>
            </figure>
            <div className="card-body items-center text-center pt-5">
              <h3 className="card-title text-lg">Pratique interactive</h3>
              <p className="text-sm opacity-70">
                Éditeur de code intégré + exécution Python dans le navigateur.
                Apprends en expérimentant, pas seulement en lisant.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Domains preview */}
      <section className="px-4 py-16 max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">
            Domaines couverts
          </h2>
          <p className="opacity-70 max-w-xl mx-auto">
            Chaque parcours relie les concepts mathématiques, le vocabulaire
            anglais et des exemples de code concrets.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {domains.map((domain) => (
            <DomainCard key={domain.slug} domain={domain} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="px-4 py-20">
        <div className="max-w-3xl mx-auto text-center rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/5 to-transparent p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Prêt à connecter les points ?
          </h2>
          <p className="opacity-75 mb-8">
            Crée un compte gratuit pour accéder à toutes les leçons, suivre ta
            progression et expérimenter avec le code.
          </p>
          <Link
            href="/login"
            className="btn btn-primary btn-lg glow-primary gap-2"
          >
            Créer mon compte
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}