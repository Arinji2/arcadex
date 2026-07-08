"use server";

import { redirect } from "next/navigation";
import db from "@/lib/db";
import { storage } from "@/lib/firebase-admin";
import { getUID } from "@/lib/session";

export async function PayAction(formData: FormData) {
  const { uid } = await getUID({ create: false });
  if (!uid) {
    throw new Error("Unauthorized");
  }

  const file = formData.get("screenshot") as File;
  if (!file || file.size === 0) {
    throw new Error("Screenshot is required");
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  const safeFilename = file.name.replace(/[^a-zA-Z0-9.\-_]/g, "");
  const fileName = `payments/${uid}-${Date.now()}-${safeFilename}`;

  const bucketName = process.env.FB_STORAGE_BUCKET;
  const bucket = bucketName ? storage.bucket(bucketName) : storage.bucket();
  const fileRef = bucket.file(fileName);

  await fileRef.save(buffer, {
    contentType: file.type,
  });

  await db.registrations.doc(uid).update({
    payment_screenshot: fileName,
    payment_status: "paid",
  });

  redirect("/register/success");
}
