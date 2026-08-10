import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join(process.cwd(), "src/content");

export function getLessonContent(domain: string, slug: string) {
  const filePath = path.join(contentDir, domain, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    frontmatter: data as {
      title: string;
      description: string;
      level: string;
      duration: string;
    },
    content,
  };
}

export function getAllLessonPaths() {
  const paths: { domain: string; slug: string }[] = [];
  if (!fs.existsSync(contentDir)) return paths;

  const domains = fs.readdirSync(contentDir);
  for (const domain of domains) {
    const domainPath = path.join(contentDir, domain);
    if (!fs.statSync(domainPath).isDirectory()) continue;
    const files = fs.readdirSync(domainPath).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      paths.push({ domain, slug: file.replace(/\.mdx$/, "") });
    }
  }
  return paths;
}
