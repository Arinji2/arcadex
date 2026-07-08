"use server";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { registrationRejectionEmail } from "@/email/registration/reject-template";
import db from "@/lib/db";
import { transporter } from "@/lib/email";
import { s3Client } from "@/lib/s3";

async function verifyAdmin() {
  const cookieStore = await cookies();
  if (cookieStore.get("admin")?.value !== process.env.ADMIN_COOKIE) {
    throw new Error("Unauthorized");
  }
}

export async function approveRegistration(uid: string) {
  await verifyAdmin();
  await db.registrations.doc(uid).update({ verified: true });
  revalidatePath("/admin");
}

export async function rejectRegistration(uid: string) {
  await verifyAdmin();
  const doc = await db.registrations.doc(uid).get();
  const data = doc.data();
  if (!data) return;

  if (data.payment_screenshot) {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME!,
          Key: data.payment_screenshot,
        }),
      );
    } catch (e) {
      console.error("Could not delete screenshot from MinIO", e);
    }
  }

  try {
    await transporter.sendMail({
      from: `"ArcadeX" <${process.env.EMAIL_USER}>`,
      to: data.email,
      subject: "Action Required: ArcadeX Payment Verification Failed",
      html: registrationRejectionEmail({
        name: data.name,
        websiteUrl: process.env.NEXT_PUBLIC_URL!,
      }),
    });
  } catch (error) {
    console.error("Failed to send rejection email", error);
  }

  await db.registrations.doc(uid).delete();
  revalidatePath("/admin");
}
