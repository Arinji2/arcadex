"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { registrationRejectionEmail } from "@/email/registration/reject-template";
import db from "@/lib/db";
import { transporter } from "@/lib/email";
import { storage } from "@/lib/firebase-admin";

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

  // Attempt to delete screenshot
  if (data.payment_screenshot) {
    try {
      const bucketName = process.env.FB_STORAGE_BUCKET;
      const bucket = bucketName ? storage.bucket(bucketName) : storage.bucket();
      await bucket.file(data.payment_screenshot).delete();
    } catch (e) {
      console.error("Could not delete screenshot or it doesn't exist", e);
    }
  }

  // Send rejection email
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

  // Delete document
  await db.registrations.doc(uid).delete();
  revalidatePath("/admin");
}
