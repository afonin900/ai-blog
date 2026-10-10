import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-12">
        <h1 className="text-4xl font-bold tracking-tight mb-3">AI-блог</h1>
        <p className="text-muted-foreground text-lg">
          Практическое применение искусственного интеллекта
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted-foreground">Статьи скоро появятся.</p>
      ) : (
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
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/70 transition-colors"
                    >
                      {tag}
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
                {post.draft && (
                  <span className="mt-2 inline-block text-xs px-2 py-0.5 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                    черновик
                  </span>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-16 flex gap-4">
        <Link href="/tags" className={cn(buttonVariants({ variant: "outline" }), "text-sm")}>
          Все теги
        </Link>
        <Link href="/authors" className={cn(buttonVariants({ variant: "outline" }), "text-sm")}>
          Авторы
        </Link>
      </div>
    </main>
  );
}
