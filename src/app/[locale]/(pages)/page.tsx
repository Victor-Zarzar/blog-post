"use client";

import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import type { FeedTab } from "@/app/shared/data/getDataPosts";
import { getDataPosts } from "@/app/shared/data/getDataPosts";
import {
  calculateReadingTime,
  formatReadingTime,
} from "@/app/shared/helpers/reading-time";
import { Button } from "@/app/shared/ui/button";

export default function HomePage() {
  const [tab, setTab] = useState<FeedTab>("forYou");
  const locale = useLocale();
  const t = useTranslations("PagesLayout");
  const posts = useMemo(() => getDataPosts(tab), [tab]);

  const tabClass = (active: boolean) =>
    active
      ? "font-semibold text-foreground"
      : "text-muted-foreground hover:text-foreground";

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-6 border-b pb-3 text-sm">
        <Button
          variant="link"
          className={tabClass(tab === "forYou")}
          onClick={() => setTab("forYou")}
        >
          {t("footer.forYou")}
        </Button>

        <Button
          variant="link"
          className={tabClass(tab === "latest")}
          onClick={() => setTab("latest")}
        >
          {t("footer.latest")}
        </Button>

        <Button
          variant="link"
          className={tabClass(tab === "trending")}
          onClick={() => setTab("trending")}
        >
          {t("footer.trending")}
        </Button>
      </div>

      {posts.map((post) => {
        const readingMinutes = calculateReadingTime(
          `${post.title}\n${post.description}`,
        );
        const readingTime = formatReadingTime(readingMinutes, locale);

        return (
          <article key={post.id} className="rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-8 w-8 place-items-center rounded-full bg-muted text-xs font-semibold">
                {post.author.avatarFallback}
              </div>

              <div className="text-sm">
                <div className="font-medium">{post.author.name}</div>
                <div className="text-xs text-muted-foreground">
                  @{post.author.username}
                </div>
              </div>

              <div className="ml-auto text-xs text-muted-foreground">
                {readingTime} • {post.meta.createdAt}
              </div>
            </div>

            <h2 className="mt-3 text-2xl font-bold leading-tight">
              {post.title}
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              {post.description}
            </p>

            <div className="mt-2 flex flex-wrap gap-2 text-xs text-muted-foreground">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="cursor-pointer hover:text-foreground"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
              <span>{post.meta.reacts} Reacts</span>
              <span>{post.meta.comments} Comments</span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
