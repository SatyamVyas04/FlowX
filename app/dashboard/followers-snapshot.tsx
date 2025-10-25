"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

import type { getFollowers } from "@/lib/twitter";

type FollowersResponse = {
  followers: Awaited<ReturnType<typeof getFollowers>>;
  meta: {
    source: "cache" | "live";
    cachedAt: string;
    count: number;
  };
};

const fetchFollowers = async (): Promise<FollowersResponse> => {
  const response = await fetch("/api/followers", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Unable to load followers");
  }

  return response.json();
};

export default function FollowersSnapshot() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["followers"],
    queryFn: fetchFollowers,
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  const followerCount = data?.meta.count ?? 0;
  const meta = data?.meta;

  return (
    <div className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-6 space-y-4 text-left shadow-sm">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <p className="text-sm uppercase tracking-wide text-primary font-semibold">
            Follower Snapshot
          </p>
          <p className="text-xs text-muted-foreground">
            Synced with TanStack Query · key{" "}
            <span className="font-mono text-muted-foreground/80">
              {`["followers"]`}
            </span>
          </p>
        </div>
        {meta && (
          <span className="text-xs font-medium text-foreground/80 bg-muted px-3 py-1 rounded-full">
            {meta.source === "cache" ? "Cached" : "Live"} ·{" "}
            {new Date(meta.cachedAt).toLocaleTimeString()}
          </span>
        )}
      </div>

      {isLoading && (
        <p className="text-muted-foreground">Loading your follower graph…</p>
      )}

      {!isLoading && !isError && (
        <div className="space-y-3">
          <p className="text-2xl font-semibold text-foreground">
            {followerCount.toLocaleString()} followers mapped
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The latest follower dataset is cached server-side for five minutes
            to stay within X rate limits. Inspect the full payload with
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">
              {`queryClient.getQueryData(["followers"])`}
            </code>
            or by opening React Query Devtools.
          </p>
          <p className="text-sm text-muted-foreground">
            Finished tasks: data fetch + caching. Next UI pass will read from
            this query—preview the response in your devtools to plan the layout.
          </p>
          <p className="text-sm text-muted-foreground">
            API endpoint:
            <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-xs">
              {`GET /api/followers`}
            </code>
            exposes the same cached payload plus meta{" "}
            {`{source, cachedAt, count}`}.
          </p>
        </div>
      )}

      {isError && (
        <div className="space-y-2">
          <p className="text-destructive">
            We couldn’t load your followers right now.
          </p>
          <Button onClick={() => refetch()} size="sm" variant="outline">
            Try again
          </Button>
        </div>
      )}
    </div>
  );
}
