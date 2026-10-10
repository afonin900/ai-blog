import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";
import { SITE_NAME } from "@/lib/seo";

export const runtime = "nodejs";
export const alt = "Post OG image";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PostOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  const title = post?.title ?? SITE_NAME;
  const description = post?.description ?? "";
  const date = post?.date
    ? new Date(post.date).toLocaleDateString("ru-RU", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: "#64748b",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {SITE_NAME}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div
            style={{
              fontSize: 60,
              fontWeight: 700,
              color: "#f8fafc",
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            {title}
          </div>
          {description && (
            <div
              style={{
                fontSize: 26,
                color: "#94a3b8",
                maxWidth: 800,
              }}
            >
              {description}
            </div>
          )}
          {date && (
            <div style={{ fontSize: 20, color: "#64748b" }}>{date}</div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
