import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getDomain, getLesson } from "@/lib/domains";
import { getLessonContent, getAllLessonPaths } from "@/lib/lessons";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/MDXComponents";
import { ArrowLeft, Clock, Signal } from "lucide-react";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

export async function generateStaticParams() {
  return getAllLessonPaths();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>;
}) {
  const { domain, slug } = await params;
  const lesson = getLesson(domain, slug);
  const domainData = getDomain(domain);
  if (!lesson || !domainData) return { title: "Leçon introuvable" };

  const url = `https://techmathguide.com/lessons/${domain}/${slug}`;

  return {
    title: lesson.title,
    description: lesson.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${lesson.title} | TechMathGuide`,
      description: lesson.description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${lesson.title} | TechMathGuide`,
      description: lesson.description,
    },
  };
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ domain: string; slug: string }>;
}) {
  const { domain: domainSlug, slug } = await params;
  const domain = getDomain(domainSlug);
  const lessonMeta = getLesson(domainSlug, slug);
  const lessonData = getLessonContent(domainSlug, slug);

  if (!domain || !lessonMeta || !lessonData) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: lessonData.frontmatter.title || lessonMeta.title,
    description: lessonData.frontmatter.description || lessonMeta.description,
    educationalLevel: lessonMeta.level,
    timeRequired: lessonMeta.duration,
    inLanguage: "fr",
    isPartOf: {
      "@type": "Course",
      name: domain.name,
      description: domain.description,
    },
    url: `https://techmathguide.com/lessons/${domainSlug}/${slug}`,
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link
        href={`/lessons/${domainSlug}`}
        className="inline-flex items-center gap-1 text-sm opacity-70 hover:opacity-100 mb-6"
      >
        <ArrowLeft size={16} />
        {domain.name}
      </Link>

      <header className="mb-10">
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="badge badge-primary badge-outline">
            {domain.icon} {domain.name}
          </span>
          <span className="badge badge-ghost gap-1">
            <Signal size={12} />
            {lessonMeta.level}
          </span>
          <span className="badge badge-ghost gap-1">
            <Clock size={12} />
            {lessonMeta.duration}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
          {lessonData.frontmatter.title || lessonMeta.title}
        </h1>
        <p className="mt-3 opacity-70 text-lg">
          {lessonData.frontmatter.description || lessonMeta.description}
        </p>
      </header>

      {!user && (
        <div className="mb-8 p-4 rounded-lg border border-primary/20 bg-primary/5 text-sm flex items-center justify-between gap-4">
          <span className="opacity-80">
            Connecte-toi pour sauvegarder ta progression et tes scores de quiz.
          </span>
          <Link href="/login" className="btn btn-primary btn-xs shrink-0">
            Se connecter
          </Link>
        </div>
      )}

      <article className="prose prose-invert max-w-none">
        <MDXRemote
          source={lessonData.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkMath],
              rehypePlugins: [rehypeKatex],
            },
          }}
        />
      </article>

      <div className="mt-16 pt-8 border-t border-primary/20">
        <Link
          href={`/lessons/${domainSlug}`}
          className="btn btn-outline btn-sm gap-2"
        >
          <ArrowLeft size={16} />
          Retour aux leçons de {domain.name}
        </Link>
      </div>
    </div>
  );
}