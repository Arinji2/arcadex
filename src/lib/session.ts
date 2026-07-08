"use server";

import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";

export async function getUID({ create = true }: { create?: boolean } = {}) {
  const cookieStore = await cookies();
  let createdCookie = false;

  let uid = cookieStore.get("uid")?.value;

  if (!uid) {
    if (!create) return { uid: null, createdCookie: false };
    uid = randomUUID();

    cookieStore.set("uid", uid, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
    });
    createdCookie = true;
  }

  return {
    uid,
    createdCookie,
  };
}
