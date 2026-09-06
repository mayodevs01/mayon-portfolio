import {
  allowedCategories,
  getVisitor,
  isSameOrigin,
  json,
  type CommunityEnv,
} from "../../lib/community";

type Context = { request: Request; env: CommunityEnv };

type IdeaRow = {
  id: string;
  title: string;
  problem: string;
  category: string;
  author_name: string;
  created_at: string;
  votes: number;
  voted: number;
};

function serialize(row: IdeaRow) {
  return {
    id: row.id,
    title: row.title,
    problem: row.problem,
    category: row.category,
    authorName: row.author_name,
    createdAt: row.created_at,
    votes: Number(row.votes),
    voted: Boolean(row.voted),
  };
}

export async function onRequestGet({ request, env }: Context) {
  const visitor = getVisitor(request);
  const url = new URL(request.url);
  const sort = url.searchParams.get("sort") ?? "top";
  const requestedCategory = url.searchParams.get("category") ?? "All";
  const category =
    requestedCategory === "All" || allowedCategories.has(requestedCategory)
      ? requestedCategory
      : "All";
  const orderBy =
    sort === "new"
      ? "i.created_at DESC"
      : sort === "rising"
        ? "((COUNT(v.voter_id) + 1.0) / (1.0 + (julianday('now') - julianday(i.created_at)) * 24.0)) DESC, i.created_at DESC"
        : "COUNT(v.voter_id) DESC, i.created_at ASC";

  const baseSelect = `
    SELECT i.id, i.title, i.problem, i.category, i.author_name, i.created_at,
      COUNT(v.voter_id) AS votes,
      MAX(CASE WHEN v.voter_id = ? THEN 1 ELSE 0 END) AS voted
    FROM ideas i
    LEFT JOIN votes v ON v.idea_id = i.id
    WHERE i.status = 'published'
  `;

  const ideasStatement = env.DB.prepare(
    `
    ${baseSelect}
      AND (? = 'All' OR i.category = ?)
    GROUP BY i.id
    ORDER BY ${orderBy}
    LIMIT 100
  `,
  ).bind(visitor.id, category, category);

  const leaderboardStatement = env.DB.prepare(
    `
    ${baseSelect}
    GROUP BY i.id
    ORDER BY COUNT(v.voter_id) DESC, i.created_at ASC
    LIMIT 5
  `,
  ).bind(visitor.id);

  const [ideasResult, leaderboardResult] = await Promise.all([
    ideasStatement.all<IdeaRow>(),
    leaderboardStatement.all<IdeaRow>(),
  ]);

  return json(
    {
      ideas: ideasResult.results.map(serialize),
      leaderboard: leaderboardResult.results.map(serialize),
    },
    200,
    visitor,
  );
}

export async function onRequestPost({ request, env }: Context) {
  const visitor = getVisitor(request);
  if (!isSameOrigin(request))
    return json({ error: "Request blocked." }, 403, visitor);

  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "Invalid submission." }, 400, visitor);
  }

  if (payload.website)
    return json({ error: "Invalid submission." }, 400, visitor);

  const title = String(payload.title ?? "").trim();
  const problem = String(payload.problem ?? "").trim();
  const category = String(payload.category ?? "");
  const authorName =
    String(payload.authorName ?? "").trim() || "Anonymous builder";

  if (title.length < 8 || title.length > 100) {
    return json(
      { error: "Use a title between 8 and 100 characters." },
      400,
      visitor,
    );
  }
  if (problem.length < 30 || problem.length > 1200) {
    return json(
      { error: "Describe the problem in 30 to 1,200 characters." },
      400,
      visitor,
    );
  }
  if (!allowedCategories.has(category)) {
    return json({ error: "Choose a valid category." }, 400, visitor);
  }
  if (authorName.length > 40) {
    return json({ error: "Keep your name under 40 characters." }, 400, visitor);
  }

  const recent = await env.DB.prepare(
    `
    SELECT COUNT(*) AS count
    FROM ideas
    WHERE visitor_id = ? AND created_at >= datetime('now', '-1 hour')
  `,
  )
    .bind(visitor.id)
    .first<{ count: number }>();

  if (Number(recent?.count ?? 0) >= 3) {
    return json(
      { error: "You can post up to three problems per hour." },
      429,
      visitor,
    );
  }

  const id = crypto.randomUUID();
  await env.DB.batch([
    env.DB.prepare(
      `
      INSERT INTO ideas (id, title, problem, category, author_name, visitor_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
    ).bind(id, title, problem, category, authorName, visitor.id),
    env.DB.prepare(
      `
      INSERT INTO votes (idea_id, voter_id)
      VALUES (?, ?)
    `,
    ).bind(id, visitor.id),
  ]);

  return json(
    {
      idea: {
        id,
        title,
        problem,
        category,
        authorName,
        createdAt: new Date().toISOString(),
        votes: 1,
        voted: true,
      },
    },
    201,
    visitor,
  );
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { allow: "GET, POST, OPTIONS" },
  });
}

