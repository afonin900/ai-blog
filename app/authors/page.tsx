import Link from "next/link";
import { getAllAuthors, getPostsByAuthor } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Авторы" };

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <header className="mb-10">
        <nav className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground transition-colors">
            ← Все статьи
          </Link>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight">Авторы</h1>
      </header>

      {authors.length === 0 ? (
        <p className="text-muted-foreground">Авторы не найдены.</p>
      ) : (
        <ul className="space-y-4">
          {authors.map((author) => {
            const count = getPostsByAuthor(author).length;
            return (
              <li key={author}>
                <Link
                  href={`/authors/${author}`}
                  className="flex items-center justify-between px-4 py-3 rounded-lg border border-border hover:bg-secondary transition-colors"
                >
                  <span className="font-medium">{author}</span>
                  <span className="text-sm text-muted-foreground">
                    {count} {count === 1 ? "статья" : count < 5 ? "статьи" : "статей"}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
