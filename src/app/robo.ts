import { MetadataRoute } from "next";

const BASE_URL = "https://techmathguide.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/auth", "/login"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}