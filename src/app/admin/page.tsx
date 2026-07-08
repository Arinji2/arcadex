import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { storage } from "@/lib/firebase-admin";
import type { RegistrationWithId } from "./admin-utils";
import RegistrationDashboard from "./registration-dashboard.client";

export const dynamic = "force-dynamic";

export default async function Page() {
  const cookieStore = await cookies();
  const admin = cookieStore.get("admin")?.value;
  if (!admin || admin !== process.env.ADMIN_COOKIE) {
    redirect("/admin/login");
  }

  const snapshot = await db.registrations.get();

  const bucketName = process.env.FB_STORAGE_BUCKET;
  const bucket = bucketName ? storage.bucket(bucketName) : storage.bucket();

  const registrations: RegistrationWithId[] = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      let screenshotUrl: string | undefined;

      if (data.payment_screenshot) {
        try {
          const file = bucket.file(data.payment_screenshot);
          const [url] = await file.getSignedUrl({
            action: "read",
            expires: Date.now() + 1000 * 60 * 60 * 24, // 24 hours
          });
          screenshotUrl = url;
        } catch (error) {
          console.error("Failed to generate signed url:", error);
        }
      }

      return {
        id: doc.id,
        ...data,
        screenshotUrl,
      };
    }),
  );

  return (
    <main className="min-h-screen bg-surface px-container-margin py-12">
      <RegistrationDashboard registrations={registrations} />
    </main>
  );
}
