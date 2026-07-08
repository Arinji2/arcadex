import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import db from "@/lib/db";
import UserAvatar from "./avatar.client";
import { SelectedGames } from "./games";

export default async function SuccessPage() {
  const cookieStore = await cookies();
  const uid = cookieStore.get("uid")?.value;

  if (!uid) {
    redirect("/");
  }

  const snapshot = await db.registrations.doc(uid).get();
  const registrationData = snapshot.data();

  if (!registrationData) {
    redirect("/");
  }

  return (
    <div className="relative flex min-h-[calc(100vh-80px)] grow flex-col items-center justify-center gap-8 overflow-hidden p-container-margin">
      {/* Background & Decorators */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#222 2px, transparent 2px)",
          backgroundSize: "32px 32px",
        }}
      ></div>
      <div className="float-anim absolute top-10 left-10 hidden text-tertiary-fixed-dim md:block">
        <span
          className="material-symbols-outlined text-6xl!"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          star
        </span>
      </div>
      <div
        className="float-anim absolute right-10 bottom-20 hidden animate-pulse text-secondary-fixed md:block"
        style={{ animationDelay: "1s" }}
      >
        <span
          className="material-symbols-outlined text-6xl!"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          trophy
        </span>
      </div>

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center space-y-8 border-thick bg-surface p-6 text-center shadow-hard md:p-10">
        <header className="space-y-4">
          <div className="-rotate-2 inline-block transform border-thick bg-tertiary-fixed-dim px-6 py-2">
            <h1 className="font-headline-xl text-headline-lg-mobile text-on-tertiary-container uppercase italic tracking-tighter md:text-headline-xl">
              ENTRY CONFIRMED!
            </h1>
          </div>
          <p className="mx-auto max-w-md font-body-md text-body-md text-on-surface-variant">
            You're officially locked into the next ArcadeX tournament stage.
            Prepare your setup.
          </p>
        </header>

        {/* Player Profile Box */}
        <div className="relative w-full overflow-hidden border-thick bg-tertiary-fixed p-6 text-left shadow-hard">
          <div className="absolute top-0 right-0 border-[#222] border-b-4 border-l-4 bg-tertiary-container p-2">
            <span className="material-symbols-outlined text-on-tertiary-container">
              person
            </span>
          </div>
          <h2 className="mb-4 font-label-bold text-label-bold text-on-tertiary-container uppercase opacity-80">
            Player Profile
          </h2>

          <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
            <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-full border-thick bg-white">
              <UserAvatar seed={registrationData.name} />
            </div>
            <div className="w-full space-y-4">
              <div>
                <div className="mb-1 font-body-sm text-body-sm text-on-tertiary-container opacity-80">
                  Name
                </div>
                <div className="font-headline-lg-mobile text-headline-lg-mobile text-on-tertiary-container uppercase tracking-tight">
                  {registrationData.name}
                </div>
              </div>
              <div>
                <div className="mb-1 font-body-sm text-body-sm text-on-tertiary-container opacity-80">
                  Email
                </div>
                <div className="font-body-md text-body-md text-on-tertiary-container tracking-tight">
                  {registrationData.email}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NEW: WhatsApp Community Box */}
        <div className="relative w-full overflow-hidden border-thick bg-secondary-container p-6 text-left shadow-hard">
          <div className="absolute top-0 right-0 border-[#222] border-b-4 border-l-4 bg-secondary p-2">
            <span className="material-symbols-outlined text-white">forum</span>
          </div>
          <h2 className="mb-4 font-label-bold text-label-bold text-on-secondary-container uppercase opacity-80">
            Next Steps
          </h2>
          <div className="flex flex-col gap-5">
            <p className="font-body-md text-on-secondary-container">
              To get important announcements, match codes, and support from
              admins, you <strong>must</strong> join our official WhatsApp
              Community.
            </p>
            <a
              href={process.env.NEXT_PUBLIC_WHATSAPP_URL || "#"}
              target="_blank"
              rel="noreferrer"
              className="interactive-btn flex w-full items-center justify-center gap-2 border-thick bg-secondary px-6 py-4 font-label-bold text-label-bold text-white uppercase tracking-wide shadow-hard transition-all md:w-fit"
            >
              <span className="material-symbols-outlined">chat</span>
              JOIN WHATSAPP
            </a>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex w-full flex-col gap-4 md:flex-row">
          <Link
            href="/"
            className="interactive-btn flex flex-1 items-center justify-center gap-2 border-thick bg-surface-variant px-6 py-4 font-label-bold text-label-bold text-on-surface uppercase tracking-wide shadow-hard transition-all"
          >
            <span className="material-symbols-outlined">home</span>
            RETURN TO BASE
          </Link>
        </div>
      </div>

      <SelectedGames games={registrationData.games} />
    </div>
  );
}
