import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return { title: `Тег: ${tag}` };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);
  if (posts.length === 0) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-10">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link href="/tags" className="hover:text-foreground transition-colors">
            ← Теги
          </Link>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight">
          #{tag}{" "}
          <span className="text-muted-foreground font-normal text-xl">
            ({posts.length})
          </span>
        </h1>
      </header>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="group">
            <article>
              <time className="text-sm text-muted-foreground">{post.date}</time>
              <h2 className="text-xl font-semibold mt-1 mb-2 group-hover:underline">
                <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>
              <p className="text-muted-foreground">{post.description}</p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {post.tags.map((t) => (
                  <Link
                    key={t}
                    href={`/tags/${t}`}
                    className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                      t === tag
                        ? "bg-foreground text-background"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                    }`}
                  >
                    {t}
                  </Link>
                ))}
                {post.author && (
                  <Link
                    href={`/authors/${post.author}`}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors ml-auto"
                  >
                    {post.author}
                  </Link>
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
    </main>
  );
}
