import {
  getVisitor,
  isSameOrigin,
  json,
  type CommunityEnv,
} from "../../../lib/community";

type Context = {
  request: Request;
  env: CommunityEnv;
  params: { id: string };
};

export async function onRequestPost({ request, env, params }: Context) {
  const visitor = getVisitor(request);
  if (!isSameOrigin(request))
    return json({ error: "Request blocked." }, 403, visitor);

  const id = String(params.id ?? "");
  const idea = await env.DB.prepare(
    "SELECT id FROM ideas WHERE id = ? AND status = 'published'",
  )
    .bind(id)
    .first<{ id: string }>();
  if (!idea)
    return json({ error: "That idea is no longer available." }, 404, visitor);

  const existing = await env.DB.prepare(
    "SELECT 1 AS found FROM votes WHERE idea_id = ? AND voter_id = ?",
  )
    .bind(id, visitor.id)
    .first<{ found: number }>();

  if (existing) {
    await env.DB.prepare("DELETE FROM votes WHERE idea_id = ? AND voter_id = ?")
      .bind(id, visitor.id)
      .run();
  } else {
    await env.DB.prepare(
      "INSERT OR IGNORE INTO votes (idea_id, voter_id) VALUES (?, ?)",
    )
      .bind(id, visitor.id)
      .run();
  }

  const count = await env.DB.prepare(
    "SELECT COUNT(*) AS votes FROM votes WHERE idea_id = ?",
  )
    .bind(id)
    .first<{ votes: number }>();

  return json(
    { id, votes: Number(count?.votes ?? 0), voted: !existing },
    200,
    visitor,
  );
}

export function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: { allow: "POST, OPTIONS" },
  });
}

