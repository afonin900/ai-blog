import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { Button } from "@/components/ui/button";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <nav className="mb-8">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">← Все статьи</Link>
        </Button>
      </nav>

      <article>
        <header className="mb-10">
          <time className="text-sm text-muted-foreground">{post.date}</time>
          <h1 className="text-3xl font-bold tracking-tight mt-2 mb-4">{post.title}</h1>
          {post.description && (
            <p className="text-lg text-muted-foreground">{post.description}</p>
          )}
          {post.tags.length > 0 && (
            <div className="mt-4 flex gap-2 flex-wrap">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  );
}
