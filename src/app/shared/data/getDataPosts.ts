export type PostAuthor = {
  name: string;
  username: string;
  avatarFallback: string;
};

export type PostMeta = {
  reacts: number;
  comments: number;
  createdAt: string;
};

export type Post = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  author: PostAuthor;
  meta: PostMeta;
};

export type FeedTab = "forYou" | "latest" | "trending";

const POSTS: Post[] = [
  {
    id: "p1",
    title: "JavaScript learning: do básico ao avançado",
    description: "Aprenda JavaScript de forma eficaz e prática",
    tags: ["javascript", "react", "nextjs", "typescript"],
    author: { name: "Malik", username: "testuser", avatarFallback: "M" },
    meta: {
      reacts: 12,
      comments: 3,
      createdAt: "2026-01-20",
    },
  },
  {
    id: "p2",
    title: "Next.js App Router na prática (com next-intl)",
    description: "Aprenda a usar o Next.js App Router com next-intl",
    tags: ["nextjs", "app-router", "i18n", "next-intl"],
    author: { name: "Victor", username: "victorzarzar", avatarFallback: "V" },
    meta: {
      reacts: 31,
      comments: 9,
      createdAt: "2026-01-24",
    },
  },
  {
    id: "p3",
    title: "Prisma + Docker + Postgres: workflow real de dev",
    description:
      "Aprenda a usar o Prisma + Docker + Postgres para desenvolvimento real",
    tags: ["prisma", "docker", "postgres", "devops"],
    author: { name: "Ana", username: "anadev", avatarFallback: "A" },
    meta: {
      reacts: 18,
      comments: 4,
      createdAt: "2026-01-26",
    },
  },
];

function byLatest(a: Post, b: Post) {
  return (
    new Date(b.meta.createdAt).getTime() - new Date(a.meta.createdAt).getTime()
  );
}

function byTrending(a: Post, b: Post) {
  const scoreA = a.meta.reacts * 2 + a.meta.comments * 3;
  const scoreB = b.meta.reacts * 2 + b.meta.comments * 3;
  return scoreB - scoreA;
}

export function getDataPosts(tab: FeedTab = "forYou"): Post[] {
  const list = [...POSTS];

  if (tab === "latest") return list.sort(byLatest);
  if (tab === "trending") return list.sort(byTrending);

  return list;
}
