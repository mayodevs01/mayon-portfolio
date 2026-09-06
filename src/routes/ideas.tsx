import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ArrowUp,
  Clock3,
  Flame,
  Lightbulb,
  Plus,
  Share2,
  Sparkles,
  Trophy,
} from "lucide-react";
import { toast } from "sonner";

import { Nav } from "@/components/portfolio/Nav";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type SortMode = "top" | "rising" | "new";
type Category =
  "Work" | "Creator" | "Money" | "Health" | "Education" | "Everyday" | "Other";

type Idea = {
  id: string;
  title: string;
  problem: string;
  category: Category;
  authorName: string;
  createdAt: string;
  votes: number;
  voted: boolean;
};

type IdeasResponse = {
  ideas: Idea[];
  leaderboard: Idea[];
};

const categories: Array<"All" | Category> = [
  "All",
  "Work",
  "Creator",
  "Money",
  "Health",
  "Education",
  "Everyday",
  "Other",
];

const demoIdeas: Idea[] = [
  {
    id: "demo-1",
    title:
      "A client feedback tool that turns messy voice notes into clear tasks",
    problem:
      "Clients send feedback across WhatsApp, email, and calls. I lose hours turning it into a clean revision list and still miss context.",
    category: "Work",
    authorName: "A freelance designer",
    createdAt: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    votes: 48,
    voted: false,
  },
  {
    id: "demo-2",
    title: "Know if a SaaS idea already has real demand before building it",
    problem:
      "I can find competitors, but I cannot quickly see what their users repeatedly complain about or what they would pay to fix.",
    category: "Creator",
    authorName: "Weekend builder",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    votes: 31,
    voted: false,
  },
  {
    id: "demo-3",
    title: "One place to understand every college deadline",
    problem:
      "Assignments, exam forms, fee dates, and club events arrive in different groups. Important deadlines disappear in the noise.",
    category: "Education",
    authorName: "First-year student",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    votes: 19,
    voted: false,
  },
];

export const Route = createFileRoute("/ideas")({
  head: () => ({
    meta: [
      { title: "Idea Board — MayoDevs" },
      {
        name: "description",
        content:
          "Share a problem worth solving, upvote the strongest ideas, and help decide what MayoDevs builds next.",
      },
      { property: "og:title", content: "What should MayoDevs build next?" },
      {
        property: "og:description",
        content:
          "Post a problem, vote on the strongest ideas, and move the best ones toward a real product.",
      },
      { name: "twitter:title", content: "What should MayoDevs build next?" },
      {
        name: "twitter:description",
        content:
          "Post a problem. Upvote the ones worth solving. Help choose the next MayoDevs product.",
      },
    ],
  }),
  component: IdeasPage,
});

async function getIdeas(
  sort: SortMode,
  category: string,
): Promise<IdeasResponse> {
  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 180));
    const visible =
      category === "All"
        ? demoIdeas
        : demoIdeas.filter((idea) => idea.category === category);
    const ideas = [...visible].sort((a, b) => {
      if (sort === "new")
        return Date.parse(b.createdAt) - Date.parse(a.createdAt);
      return b.votes - a.votes;
    });
    return {
      ideas,
      leaderboard: [...demoIdeas].sort((a, b) => b.votes - a.votes),
    };
  }

  const response = await fetch(
    `/api/ideas?sort=${sort}&category=${encodeURIComponent(category)}`,
  );
  if (!response.ok) throw new Error("The board could not be loaded.");
  return response.json();
}

async function submitIdea(payload: {
  title: string;
  problem: string;
  category: Category;
  authorName: string;
  website: string;
}): Promise<Idea> {
  if (import.meta.env.DEV) {
    return {
      id: crypto.randomUUID(),
      title: payload.title,
      problem: payload.problem,
      category: payload.category,
      authorName: payload.authorName || "Anonymous builder",
      createdAt: new Date().toISOString(),
      votes: 1,
      voted: true,
    };
  }
  const response = await fetch("/api/ideas", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const body = await response.json();
  if (!response.ok)
    throw new Error(body.error || "Your idea could not be posted.");
  return body.idea;
}

async function toggleVote(
  id: string,
): Promise<{ id: string; votes: number; voted: boolean }> {
  if (import.meta.env.DEV) {
    const idea = demoIdeas.find((item) => item.id === id);
    return { id, votes: (idea?.votes ?? 0) + 1, voted: true };
  }
  const response = await fetch(`/api/ideas/${id}/vote`, { method: "POST" });
  const body = await response.json();
  if (!response.ok)
    throw new Error(body.error || "Your vote could not be saved.");
  return body;
}

function IdeasPage() {
  const queryClient = useQueryClient();
  const [sort, setSort] = useState<SortMode>("top");
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [dialogOpen, setDialogOpen] = useState(false);

  const ideasQuery = useQuery({
    queryKey: ["ideas", sort, category],
    queryFn: () => getIdeas(sort, category),
  });

  const voteMutation = useMutation({
    mutationFn: toggleVote,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["ideas"] });
      const snapshots = queryClient.getQueriesData<IdeasResponse>({
        queryKey: ["ideas"],
      });
      queryClient.setQueriesData<IdeasResponse>(
        { queryKey: ["ideas"] },
        (old) => {
          if (!old) return old;
          const update = (idea: Idea) =>
            idea.id === id
              ? {
                  ...idea,
                  voted: !idea.voted,
                  votes: Math.max(0, idea.votes + (idea.voted ? -1 : 1)),
                }
              : idea;
          return {
            ideas: old.ideas.map(update),
            leaderboard: old.leaderboard.map(update),
          };
        },
      );
      return { snapshots };
    },
    onError: (error, _id, context) => {
      context?.snapshots.forEach(([key, data]) =>
        queryClient.setQueryData(key, data),
      );
      toast.error(
        error instanceof Error
          ? error.message
          : "Your vote could not be saved.",
      );
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["ideas"] }),
  });

  const postMutation = useMutation({
    mutationFn: submitIdea,
    onSuccess: (idea) => {
      queryClient.setQueriesData<IdeasResponse>(
        { queryKey: ["ideas"] },
        (old) =>
          old
            ? {
                ideas: [idea, ...old.ideas],
                leaderboard: [...old.leaderboard, idea],
              }
            : old,
      );
      setDialogOpen(false);
      toast.success("Your problem is live. Let the internet vote.");
      queryClient.invalidateQueries({ queryKey: ["ideas"] });
    },
    onError: (error) =>
      toast.error(
        error instanceof Error
          ? error.message
          : "Your idea could not be posted.",
      ),
  });

  const ideas = ideasQuery.data?.ideas ?? [];
  const leaderboard = (ideasQuery.data?.leaderboard ?? []).slice(0, 5);

  return (
    <div className="grain-overlay min-h-screen bg-background text-foreground">
      <Nav />
      <main className="mx-auto w-full max-w-[1500px] px-5 pb-24 pt-28 sm:px-8 md:px-12 md:pt-36">
        <section className="relative overflow-hidden border-y border-border py-10 md:py-14">
          <div className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-accent/10 blur-[110px]" />
          <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="mb-5 flex items-center gap-3 text-[0.72rem] font-medium uppercase tracking-[0.32em] text-accent">
                <span className="h-px w-10 bg-accent" /> Community signal board
              </div>
              <h1 className="text-display max-w-5xl text-[clamp(3.6rem,8vw,8.5rem)] leading-[0.88] text-foreground">
                WHAT SHOULD
                <br />
                <span className="text-accent">EXIST NEXT?</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
                Drop a problem you keep running into. The strongest signals
                rise, and the best ones may become the next MayoDevs product.
              </p>
            </div>
            <IdeaDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              submitting={postMutation.isPending}
              onSubmit={(payload) => postMutation.mutate(payload)}
            />
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] xl:gap-12">
          <div className="min-w-0">
            <div className="flex flex-col gap-5 border-b border-border pb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex rounded-full border border-border bg-card/60 p-1">
                  {(
                    [
                      ["top", "Top", Trophy],
                      ["rising", "Rising", Flame],
                      ["new", "New", Clock3],
                    ] as const
                  ).map(([value, label, Icon]) => (
                    <button
                      key={value}
                      onClick={() => setSort(value)}
                      className={cn(
                        "flex min-h-10 items-center gap-2 rounded-full px-4 text-sm font-medium transition",
                        sort === value
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4" /> {label}
                    </button>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {ideas.length} {ideas.length === 1 ? "problem" : "problems"}{" "}
                  on the board
                </span>
              </div>
              <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={cn(
                      "shrink-0 border px-3.5 py-2 text-[0.72rem] font-medium uppercase tracking-[0.16em] transition",
                      category === item
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-border text-muted-foreground hover:border-foreground/30 hover:text-foreground",
                    )}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="divide-y divide-border">
              {ideasQuery.isLoading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <IdeaSkeleton key={index} />
                ))
              ) : ideasQuery.isError ? (
                <EmptyState
                  title="THE SIGNAL DROPPED."
                  copy="The board could not load right now. Give it another shot."
                  action={
                    <Button onClick={() => ideasQuery.refetch()}>
                      Try again
                    </Button>
                  }
                />
              ) : ideas.length === 0 ? (
                <EmptyState
                  title="NO PROBLEMS HERE YET."
                  copy="That is either excellent news or your chance to post the first one."
                  action={
                    <Button onClick={() => setDialogOpen(true)}>
                      Post the first problem
                    </Button>
                  }
                />
              ) : (
                ideas.map((idea, index) => (
                  <IdeaCard
                    key={idea.id}
                    idea={idea}
                    rank={index + 1}
                    onVote={() => voteMutation.mutate(idea.id)}
                  />
                ))
              )}
            </div>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border bg-card/50">
              <div className="flex items-center justify-between border-b border-border px-5 py-4">
                <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em]">
                  <Trophy className="h-4 w-4 text-accent" /> Leaderboard
                </div>
                <span className="text-xs text-muted-foreground">All time</span>
              </div>
              <div className="divide-y divide-border">
                {leaderboard.length ? (
                  leaderboard.map((idea, index) => (
                    <div
                      key={idea.id}
                      className="grid grid-cols-[2rem_1fr_auto] gap-3 px-5 py-4"
                    >
                      <span
                        className={cn(
                          "text-display text-2xl",
                          index < 3 ? "text-accent" : "text-muted-foreground",
                        )}
                      >
                        #{index + 1}
                      </span>
                      <div className="min-w-0">
                        <p className="line-clamp-2 text-sm font-medium leading-snug">
                          {idea.title}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {idea.category}
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-accent">
                        {idea.votes}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="px-5 py-8 text-sm leading-relaxed text-muted-foreground">
                    The first ideas will set the pace.
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5 border-l-2 border-accent bg-accent/5 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                The rule
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Post the problem, not your pitch. The clearest pain points make
                the strongest products.
              </p>
            </div>
          </aside>
        </section>
      </main>
    </div>
  );
}

function IdeaCard({
  idea,
  rank,
  onVote,
}: {
  idea: Idea;
  rank: number;
  onVote: () => void;
}) {
  const shareUrl =
    typeof window === "undefined"
      ? "https://mayon.lol/ideas"
      : window.location.href;
  const shareText = `This problem deserves a product: “${idea.title}”\n\nVote on what @MayoDevs should build next:`;

  return (
    <article className="group grid grid-cols-[4.25rem_1fr] gap-4 py-7 sm:grid-cols-[5rem_1fr] sm:gap-6 sm:py-9">
      <button
        onClick={onVote}
        aria-label={
          idea.voted ? `Remove vote from ${idea.title}` : `Upvote ${idea.title}`
        }
        aria-pressed={idea.voted}
        className={cn(
          "flex h-[5.25rem] w-full flex-col items-center justify-center gap-1 border transition-all",
          idea.voted
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border bg-card/50 text-muted-foreground hover:border-accent hover:text-accent",
        )}
      >
        <ArrowUp className="h-5 w-5" />
        <span className="text-base font-semibold tabular-nums">
          {idea.votes}
        </span>
      </button>
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.7rem] uppercase tracking-[0.14em] text-muted-foreground">
          <span className="text-accent">#{String(rank).padStart(2, "0")}</span>
          <span className="border border-border px-2 py-1">
            {idea.category}
          </span>
          <span>by {idea.authorName}</span>
          <span>{timeAgo(idea.createdAt)}</span>
        </div>
        <h2 className="mt-4 max-w-4xl text-xl font-semibold leading-tight transition-colors group-hover:text-accent sm:text-2xl">
          {idea.title}
        </h2>
        <p className="mt-3 max-w-4xl text-[0.95rem] leading-7 text-muted-foreground sm:text-base">
          {idea.problem}
        </p>
        <a
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground transition hover:text-foreground"
        >
          <Share2 className="h-3.5 w-3.5" /> Share on X
        </a>
      </div>
    </article>
  );
}

function IdeaDialog({
  open,
  onOpenChange,
  submitting,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  submitting: boolean;
  onSubmit: (payload: {
    title: string;
    problem: string;
    category: Category;
    authorName: string;
    website: string;
  }) => void;
}) {
  const [category, setCategory] = useState<Category>("Work");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    onSubmit({
      title: String(data.get("title") ?? "").trim(),
      problem: String(data.get("problem") ?? "").trim(),
      category,
      authorName: String(data.get("authorName") ?? "").trim(),
      website: String(data.get("website") ?? ""),
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="h-14 rounded-none bg-accent px-7 text-sm font-semibold uppercase tracking-[0.16em] text-accent-foreground hover:bg-accent/90">
          <Plus className="h-4 w-4" /> Post a problem
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-none border-border bg-background p-0 sm:max-w-2xl">
        <div className="border-b border-border bg-card/60 px-6 py-6 sm:px-8">
          <DialogHeader>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.22em] text-accent">
              <Lightbulb className="h-4 w-4" /> Add signal
            </div>
            <DialogTitle className="text-display text-4xl font-normal sm:text-5xl">
              WHAT KEEPS GETTING IN YOUR WAY?
            </DialogTitle>
            <DialogDescription className="pt-2 text-base leading-relaxed">
              Describe a real recurring problem. Skip the solution — that is
              where the interesting work begins.
            </DialogDescription>
          </DialogHeader>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6 sm:px-8">
          <div className="space-y-2">
            <label htmlFor="idea-title" className="text-sm font-medium">
              Give the problem a clear title
            </label>
            <Input
              id="idea-title"
              name="title"
              minLength={8}
              maxLength={100}
              required
              placeholder="e.g. Client feedback gets lost across five different apps"
              className="h-12 rounded-none border-border bg-card/40"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="idea-problem" className="text-sm font-medium">
              What happens, and who feels it?
            </label>
            <Textarea
              id="idea-problem"
              name="problem"
              minLength={30}
              maxLength={1200}
              required
              placeholder="Tell us when it happens, why it is frustrating, and what you do today..."
              className="min-h-36 rounded-none border-border bg-card/40 leading-relaxed"
            />
            <p className="text-xs text-muted-foreground">
              30–1,200 characters. No links or sales pitches.
            </p>
          </div>
          <div className="space-y-3">
            <span className="text-sm font-medium">Where does it belong?</span>
            <div className="flex flex-wrap gap-2">
              {categories.slice(1).map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item as Category)}
                  className={cn(
                    "border px-3.5 py-2 text-xs uppercase tracking-[0.14em] transition",
                    category === item
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-border text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="idea-author" className="text-sm font-medium">
              Your name{" "}
              <span className="font-normal text-muted-foreground">
                (optional)
              </span>
            </label>
            <Input
              id="idea-author"
              name="authorName"
              maxLength={40}
              placeholder="Anonymous builder"
              className="h-12 rounded-none border-border bg-card/40"
            />
          </div>
          <input
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />
          <DialogFooter className="items-center border-t border-border pt-6 sm:justify-between">
            <p className="text-xs leading-relaxed text-muted-foreground">
              By posting, you agree to keep it useful and respectful.
            </p>
            <Button
              disabled={submitting}
              type="submit"
              className="h-11 rounded-none bg-accent px-6 uppercase tracking-[0.14em] text-accent-foreground hover:bg-accent/90"
            >
              {submitting ? "Posting…" : "Post problem"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EmptyState({
  title,
  copy,
  action,
}: {
  title: string;
  copy: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center px-5 text-center">
      <Sparkles className="mb-5 h-6 w-6 text-accent" />
      <h2 className="text-display text-4xl">{title}</h2>
      <p className="mb-6 mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {copy}
      </p>
      {action}
    </div>
  );
}

function IdeaSkeleton() {
  return (
    <div className="grid animate-pulse grid-cols-[4.25rem_1fr] gap-4 py-8 sm:grid-cols-[5rem_1fr] sm:gap-6">
      <div className="h-[5.25rem] bg-muted" />
      <div>
        <div className="h-3 w-48 bg-muted" />
        <div className="mt-5 h-6 w-4/5 bg-muted" />
        <div className="mt-4 h-4 w-full bg-muted" />
        <div className="mt-2 h-4 w-2/3 bg-muted" />
      </div>
    </div>
  );
}

function timeAgo(value: string) {
  const seconds = Math.max(
    1,
    Math.floor((Date.now() - Date.parse(value)) / 1000),
  );
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

