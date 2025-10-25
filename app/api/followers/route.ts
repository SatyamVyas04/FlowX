import { cookies } from "next/headers";
import { NextResponse } from "next/server";

import {
  getCurrentUserId,
  getFollowers,
  getTokenFromCookies,
  refreshToken,
} from "@/lib/twitter";

export const dynamic = "force-dynamic";

const FOLLOWERS_CACHE_TTL = 5 * 60 * 1000; // 5 minutes

type FollowersEntry = Awaited<ReturnType<typeof getFollowers>>;

type FollowersCacheValue = {
  followers: FollowersEntry;
  cachedAt: number;
  expiresAt: number;
};

const followersCache = new Map<string, FollowersCacheValue>();

export async function GET() {
  const cookieStore = await cookies();
  const token = await getTokenFromCookies();

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const sendResponse = (
    followers: FollowersEntry,
    source: "cache" | "live",
    cachedAt: number,
  ) => {
    const response = NextResponse.json({
      followers,
      meta: {
        source,
        cachedAt: new Date(cachedAt).toISOString(),
        count: followers.length,
      },
    });
    response.headers.set(
      "Cache-Control",
      "private, max-age=60, stale-while-revalidate=120",
    );
    return response;
  };

  const getUserId = async () => {
    const existing = cookieStore.get("userId");
    if (existing?.value) {
      return existing.value;
    }

    const userId = await getCurrentUserId(token);

    cookieStore.set("userId", userId, {
      httpOnly: true,
      secure: true,
    });

    return userId;
  };

  const loadFollowers = async (authToken: typeof token, userId: string) => {
    const cacheKey = userId;
    const entry = followersCache.get(cacheKey);
    const now = Date.now();

    if (entry && entry.expiresAt > now) {
      return sendResponse(entry.followers, "cache", entry.cachedAt);
    }

    const followers = await getFollowers(authToken, userId);
    followersCache.set(cacheKey, {
      followers,
      cachedAt: now,
      expiresAt: now + FOLLOWERS_CACHE_TTL,
    });
    return sendResponse(followers, "live", now);
  };

  try {
    const userId = await getUserId();
    return await loadFollowers(token, userId);
  } catch (error) {
    try {
      const refreshed = await refreshToken(token);

      if (!refreshed.token) {
        throw error;
      }

      cookieStore.set("token", JSON.stringify(refreshed.token), {
        httpOnly: true,
        secure: true,
      });

      const userId = await getUserId();
      return await loadFollowers(refreshed.token, userId);
    } catch (refreshError) {
      return NextResponse.json(
        {
          error:
            refreshError instanceof Error
              ? refreshError.message
              : "Failed to load followers",
        },
        { status: 500 },
      );
    }
  }
}
