"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function LoginAction(password: string) {
  console.log(process.env.ADMIN_PASSWORD);
  console.log(password);
  if (password !== process.env.ADMIN_PASSWORD) {
    redirect("/");
  }

  const cookieStore = await cookies();
  cookieStore.set("admin", process.env.ADMIN_COOKIE!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });

  redirect("/admin");
}
