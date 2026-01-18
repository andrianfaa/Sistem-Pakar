"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const secretKey = process.env.SECRET_KEY as string;
const encodedKey = new TextEncoder().encode(secretKey);

export interface SessionPayload extends JWTPayload {
  userId: string;
  username: string;
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"]
    });
    return payload;
  } catch (_) {
    console.log("Failed to verify session");
  }
}

export async function generateRefreshToken() {
  return new SignJWT({}).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("30d").sign(encodedKey);
}

export async function createSession(userId: string, username: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, username, expiresAt });
  const refreshToken = await generateRefreshToken();
  const cookieStore = await cookies();

  cookieStore.set({
    name: "session",
    value: session,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  });
  cookieStore.set({
    name: "refreshToken",
    value: refreshToken,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    sameSite: "lax",
    path: "/"
  });
}

export async function checkSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return null;

  const payload = await decrypt(session);
  if (!payload) return null;

  const expiresAt = new Date(payload.exp! * 1000);
  const now = new Date();
  const fiveDaysInMs = 5 * 24 * 60 * 60 * 1000;

  if (expiresAt.getTime() - now.getTime() < fiveDaysInMs) {
    await updateSession();
  }

  return payload as SessionPayload;
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  if (!session) return;

  const payload = await decrypt(session);
  if (!payload) return;

  const newSession = await encrypt({
    userId: payload.userId as string,
    username: payload.username as string,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

  cookieStore.set({
    name: "session",
    value: newSession,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/"
  });
}

export async function deleteSession() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
  cookieStore.delete("refreshToken");
}
