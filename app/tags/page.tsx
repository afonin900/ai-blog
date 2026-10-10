import Link from "next/link";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Теги" };

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-10">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← Все статьи
          </Link>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight">Теги</h1>
      </header>

      {tags.length === 0 ? (
        <p className="text-muted-foreground">Теги не найдены.</p>
      ) : (
        <ul className="flex flex-wrap gap-3">
          {tags.map((tag) => {
            const count = getPostsByTag(tag).length;
            return (
              <li key={tag}>
                <Link
                  href={`/tags/${tag}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm hover:bg-secondary transition-colors"
                >
                  {tag}
                  <span className="text-xs text-muted-foreground">{count}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
