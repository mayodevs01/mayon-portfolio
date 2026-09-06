export type D1Statement = {
  bind: (...values: unknown[]) => D1Statement;
  first: <T = Record<string, unknown>>() => Promise<T | null>;
  all: <T = Record<string, unknown>>() => Promise<{ results: T[] }>;
  run: () => Promise<unknown>;
};

export type D1Database = {
  prepare: (query: string) => D1Statement;
  batch: (statements: D1Statement[]) => Promise<unknown[]>;
};

export type CommunityEnv = { DB: D1Database };

const COOKIE_NAME = "mayo_visitor";

export function getVisitor(request: Request) {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${COOKIE_NAME}=([^;]+)`));
  if (match?.[1] && /^[a-f0-9-]{36}$/.test(match[1])) {
    return { id: match[1], isNew: false };
  }
  return { id: crypto.randomUUID(), isNew: true };
}

export function json(
  data: unknown,
  status = 200,
  visitor?: { id: string; isNew: boolean },
) {
  const headers = new Headers({
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff",
  });
  if (visitor?.isNew) {
    headers.append(
      "set-cookie",
      `${COOKIE_NAME}=${visitor.id}; Path=/; Max-Age=31536000; HttpOnly; Secure; SameSite=Lax`,
    );
  }
  return new Response(JSON.stringify(data), { status, headers });
}

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}

export const allowedCategories = new Set([
  "Work",
  "Creator",
  "Money",
  "Health",
  "Education",
  "Everyday",
  "Other",
]);

