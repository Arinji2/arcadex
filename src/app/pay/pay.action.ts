"use server";

import { PutObjectCommand } from "@aws-sdk/client-s3";
import db from "@/lib/db";
import { s3Client } from "@/lib/s3";
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

  await s3Client.send(
    new PutObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: fileName,
      Body: buffer,
      ContentType: file.type,
    }),
  );

  await db.registrations.doc(uid).update({
    payment_screenshot: fileName,
    payment_status: "paid",
  });

  return { success: true };
}
