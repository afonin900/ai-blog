import type { PostMeta } from "./posts";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://ai-blog.vercel.app";

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? "AI Blog";
export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ??
  "Материалы об искусственном интеллекте, LLM и инструментах для разработчиков.";

export function postUrl(slug: string): string {
  return `${SITE_URL}/blog/${slug}`;
}

export function buildArticleJsonLd(post: PostMeta) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url: postUrl(post.slug),
    author: {
      "@type": "Person",
      name: post.author ?? SITE_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    ...(post.image && { image: post.image }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl(post.slug),
    },
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
  };
}
