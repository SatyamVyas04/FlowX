"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth, Client } from "twitter-api-sdk";
import { OAuth2UserOptions } from "twitter-api-sdk/dist/OAuth2User";

const getTwitterClients = (token?: OAuth2UserOptions["token"]) => {
  const authClient = new auth.OAuth2User({
    client_id: process.env.X_CLIENT_ID ?? "",
    client_secret: process.env.X_CLIENT_SECRET ?? "",
    callback: "http://localhost:3000/callback",
    scopes: [
      "tweet.write",
      "users.read",
      "tweet.read",
      "follows.read",
      "offline.access",
    ],
    token,
  });

  const client = new Client(authClient);

  return { authClient, client };
};

const getTwitterTokenFromCookies = async (): Promise<
  OAuth2UserOptions["token"] | undefined
> => {
  const savedToken = (await cookies()).get("token");
  return savedToken ? JSON.parse(savedToken.value) : undefined;
};

export const getTokenFromCookies = getTwitterTokenFromCookies;

const generateAuthURL = (authClient: auth.OAuth2User) => {
  return authClient.generateAuthURL({
    state: process.env.X_STATE_STRING ?? "",
    code_challenge_method: "plain",
    code_challenge: process.env.X_CODE_CHALLENGE ?? "",
  });
};

export const login = async (): Promise<void> => {
  const token = await getTwitterTokenFromCookies();
  const { authClient } = getTwitterClients(token);
  const url = generateAuthURL(authClient);

  if (url) {
    redirect(url);
  }
};

export const requestAccessToken = async (code: string, state: string) => {
  if (state !== process.env.X_STATE_STRING) {
    throw new Error("State isn't matching!");
  }

  const token = await getTwitterTokenFromCookies();
  const { authClient } = getTwitterClients(token);

  generateAuthURL(authClient);

  return authClient.requestAccessToken(code);
};

export const refreshToken = async (token?: OAuth2UserOptions["token"]) => {
  const { authClient } = getTwitterClients(token);
  return authClient.refreshAccessToken();
};

export const logout = async () => {
  const token = await getTwitterTokenFromCookies();
  const { authClient } = getTwitterClients(token);
  await authClient.revokeAccessToken();
  (await cookies()).delete("token");
  redirect("/");
};

export const getCurrentUserId = async (token: OAuth2UserOptions["token"]) => {
  const { client } = getTwitterClients(token);

  const res = await client.users.findMyUser();

  if (res.errors) {
    throw new Error(res.errors.map((error) => error.detail).join(", "));
  }

  if (!res.data?.id) {
    throw new Error("User ID not found");
  }

  return res.data.id;
};

export const getFollowers = async (
  token: OAuth2UserOptions["token"],
  userId: string,
) => {
  const { client } = getTwitterClients(token);
  const res = await client.users.usersIdFollowers(userId, {
    max_results: 1000,
  });

  if (res.errors) {
    throw new Error(res.errors.map((error) => error.detail).join(", "));
  }

  return res.data ?? [];
};
