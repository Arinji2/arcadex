import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import { s3Client } from "@/lib/s3";
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

  const registrations: RegistrationWithId[] = await Promise.all(
    snapshot.docs.map(async (doc) => {
      const data = doc.data();
      let screenshotUrl: string | undefined;

      if (data.payment_screenshot) {
        try {
          const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME!,
            Key: data.payment_screenshot,
          });
          screenshotUrl = await getSignedUrl(s3Client, command, {
            expiresIn: 86400,
          });
        } catch (error) {
          console.error("Failed to generate MinIO signed url:", error);
        }
      }

      return {
        id: doc.id,
        ...data,
        games: data.games || [],
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
