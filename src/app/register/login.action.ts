"use server";
import db from "@/lib/db";
import { getUID } from "@/lib/session";
import type { Registration } from "@/lib/types";

export async function LoginAction({
  registrationData,
}: {
  registrationData: Registration;
}) {
  const { uid, createdCookie } = await getUID();
  if (!createdCookie) return;
  await db.registrations.doc(uid).set(registrationData);
  return;
}
