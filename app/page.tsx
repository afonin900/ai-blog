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
                  <Link href={`/posts/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className="text-muted-foreground">{post.description}</p>
                <div className="mt-3 flex gap-2 flex-wrap">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-16">
        <Button variant="outline" asChild>
          <Link href="/posts/hello-world">Читать первую статью →</Link>
        </Button>
      </div>
    </main>
  );
}
