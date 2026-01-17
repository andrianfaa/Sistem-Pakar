// Data Access Layer (DAL) for managing authentication state
"use server";

import { cookies } from "next/headers";
import { cache } from "react";
import { decrypt } from "./session";

export const verifySession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value;
  const decrypted = token ? await decrypt(token) : null;

  return {
    isAuthenticated: !!decrypted,
    session: decrypted || null
  };
});
