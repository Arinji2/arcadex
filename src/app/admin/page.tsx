import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import RegistrationDashboard from "./registration-dashboard.client";

export default async function Page() {
  const cookieStore = await cookies();
  const admin = cookieStore.get("admin")?.value;
  if (!admin) {
    redirect("/admin/login");
  }

  if (admin !== process.env.ADMIN_COOKIE) {
    redirect("/admin/login");
  }
  const snapshot = await db.registrations.get();

  const registrations = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <main className="min-h-screen bg-surface">
      <RegistrationDashboard registrations={registrations} />
    </main>
  );
}
