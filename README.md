# AI-блог

Платформа AI-блога: Next.js 16 (App Router) + TypeScript strict + Tailwind CSS v4 + shadcn/ui + MDX.

## Стек

- **Next.js 16** (App Router)
- **TypeScript** (strict mode)
- **Tailwind CSS v4** (dark/light тема)
- **shadcn/ui** (компоненты)
- **MDX** (статьи через `next-mdx-remote`)
- **Bun** (пакетный менеджер и рантайм)

## Запуск локально

```bash
bun install
bun dev
```

Открыть: http://localhost:3000

## Структура

```
content/posts/     # MDX-статьи
app/               # Next.js App Router
app/posts/[slug]/  # Страница статьи
components/ui/     # shadcn/ui компоненты
lib/posts.ts       # Утилиты для работы со статьями
```

## Добавить статью

Создать файл `content/posts/slug-статьи.mdx`:

```mdx
---
title: "Заголовок статьи"
date: "2026-05-24"
description: "Краткое описание"
tags: ["ai", "tag"]
---

# Содержание
```

## Деплой на Vercel

### Вариант А: через Vercel Dashboard (рекомендуется)

1. Зайти на [vercel.com](https://vercel.com) → **Add New Project**
2. Импортировать репозиторий `afonin900/ai-blog` из GitHub
3. Vercel автоматически определит Next.js и настроит деплой
4. Нажать **Deploy** — готово

После подключения:
- **Production deploy** — на каждый push в `main`
- **Preview deploy** — на каждый Pull Request (URL в комментарии PR)

### Вариант Б: через GitHub Actions (если нужен CI-контроль)

Требует трёх секретов в GitHub repo → Settings → Secrets:

| Секрет | Где взять |
|--------|-----------|
| `VERCEL_TOKEN` | [vercel.com/account/tokens](https://vercel.com/account/tokens) |
| `VERCEL_ORG_ID` | Vercel → Settings → General → Team ID |
| `VERCEL_PROJECT_ID` | Vercel → Project → Settings → General → Project ID |

Workflow уже настроен в `.github/workflows/deploy.yml`.

### Переменные окружения

Добавлять через Vercel Dashboard → Project → Settings → Environment Variables.

Пример `.env.local`:

```bash
# Пример - реальные значения добавлять только через Vercel Dashboard
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

## Локальная сборка

```bash
bun run build
bun start
```
