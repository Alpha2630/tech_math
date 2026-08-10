"use server";

import { markLessonComplete as markComplete } from "@/lib/progress";
import { revalidatePath } from "next/cache";

export async function markLessonCompleteAction(
  domain: string,
  slug: string,
  quizScore?: number,
  quizTotal?: number
) {
  await markComplete(domain, slug, quizScore, quizTotal);
  revalidatePath(`/lessons/${domain}/${slug}`);
}