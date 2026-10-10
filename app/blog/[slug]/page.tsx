import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { SITE_URL, SITE_NAME, postUrl, postCanonical, buildArticleJsonLd } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const canonical = postCanonical(post);
  const ogImage = `${SITE_URL}/blog/${slug}/opengraph-image`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical,
    },
    openGraph: {
      type: "article",
      url: postUrl(post.slug),
      title: post.title,
      description: post.description,
      siteName: SITE_NAME,
      locale: "ru_RU",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = buildArticleJsonLd(post);
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="mx-auto w-full max-w-3xl px-6 py-16">
        <article>
          <header className="mb-10">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
              {formattedDate && <time dateTime={post.date}>{formattedDate}</time>}
              {post.author && <span>{post.author}</span>}
              {post.tags && post.tags.length > 0 && (
                <ul className="flex gap-2" aria-label="Теги">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs dark:bg-zinc-800"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </header>
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <MDXRemote source={post.content} />
          </div>
        </article>
      </main>
    </>
  );
}
