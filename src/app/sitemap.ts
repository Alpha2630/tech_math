import { MetadataRoute } from "next";
import { domains } from "@/lib/domains";

const BASE_URL = "https://techmathguide.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/lessons`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const domainRoutes: MetadataRoute.Sitemap = domains.map((d) => ({
    url: `${BASE_URL}/lessons/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const lessonRoutes: MetadataRoute.Sitemap = domains.flatMap((d) =>
    d.lessons.map((l) => ({
      url: `${BASE_URL}/lessons/${d.slug}/${l.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...domainRoutes, ...lessonRoutes];
}