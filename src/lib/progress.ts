import { createClient } from "@/lib/supabase/server";

export type LessonProgress = {
  domain: string;
  slug: string;
  completed: boolean;
  quiz_score: number | null;
  quiz_total: number | null;
  completed_at: string | null;
};

export async function getLessonProgress(
  domain: string,
  slug: string
): Promise<LessonProgress | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;

  const { data } = await supabase
    .from("lesson_progress")
    .select("domain, slug, completed, quiz_score, quiz_total, completed_at")
    .eq("user_id", user.id)
    .eq("domain", domain)
    .eq("slug", slug)
    .maybeSingle();

  return data;
}

export async function getAllProgress(): Promise<LessonProgress[]> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return [];

  const { data } = await supabase
    .from("lesson_progress")
    .select("domain, slug, completed, quiz_score, quiz_total, completed_at")
    .eq("user_id", user.id);

  return data ?? [];
}

export async function markLessonComplete(
  domain: string,
  slug: string,
  quizScore?: number,
  quizTotal?: number
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  const { error } = await supabase.from("lesson_progress").upsert(
    {
      user_id: user.id,
      domain,
      slug,
      completed: true,
      quiz_score: quizScore ?? null,
      quiz_total: quizTotal ?? null,
      completed_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    { onConflict: "user_id,domain,slug" }
  );

  if (error) throw error;
}