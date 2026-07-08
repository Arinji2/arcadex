"use server";
import { randomUUID } from "node:crypto";
import { cookies } from "next/headers";
import db from "@/lib/db";
import type { Registration } from "@/lib/types";

export async function LoginAction({
  registrationData,
}: {
  registrationData: Registration;
}) {
  const uid = randomUUID();
  await db.registrations.doc(uid).set(registrationData);

  const cookieStore = await cookies();
  cookieStore.set("uid", uid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return;
}
