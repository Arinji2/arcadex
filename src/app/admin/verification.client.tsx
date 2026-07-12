"use client";

import Image from "next/image";
import { useState } from "react";
import { GAMES } from "@/games";
import { approveRegistration, rejectRegistration } from "./admin.action";
import type { RegistrationWithId } from "./admin-utils";

export default function VerificationTab({
  registrations,
}: {
  registrations: RegistrationWithId[];
}) {
  const [loading, setLoading] = useState<string | null>(null);

  const pendingVerifications = registrations.filter(
    (r) => r.payment_status === "paid" && !r.verified,
  );

  const handleApprove = async (uid: string) => {
    setLoading(uid);
    try {
      await approveRegistration(uid);
    } finally {
      setLoading(null);
    }
  };

  const handleReject = async (uid: string) => {
    if (
      !confirm(
        "Are you sure you want to REJECT and DELETE this user? An email will be sent to them automatically.",
      )
    )
      return;
    setLoading(uid);
    try {
      await rejectRegistration(uid);
    } finally {
      setLoading(null);
    }
  };

  if (pendingVerifications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-thick border-dashed bg-surface-container-high py-20 text-center">
        <span className="material-symbols-outlined mb-4 text-6xl text-primary">
          verified
        </span>
        <h3 className="font-headline-lg text-headline-lg-mobile text-on-surface-variant">
          All Caught Up!
        </h3>
        <p className="font-body-md text-on-surface-variant">
          There are no pending payments to verify right now.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {pendingVerifications.map((r) => {
        const gamesTotal = r.games?.length || 0;
        const expectedAmount = r.is_pubg
          ? 200
          : gamesTotal >= 4
            ? gamesTotal * 50
            : gamesTotal * 60;
        const isActionLoading = loading === r.id;

        return (
          <div
            key={r.id}
            className="flex flex-col overflow-hidden rounded-xl border-thick bg-surface shadow-hard"
          >
            <div className="relative aspect-3/4 w-full bg-surface-container-lowest">
              {r.screenshotUrl ? (
                <Image
                  src={r.screenshotUrl}
                  alt={`Screenshot from ${r.name}`}
                  fill
                  className="object-contain"
                />
              ) : (
                <div className="flex h-full items-center justify-center font-body-md text-outline">
                  No Screenshot Attached
                </div>
              )}
            </div>

            <div className="flex grow flex-col p-4">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-label-bold text-lg uppercase">
                    {r.name}
                  </h3>
                  <a
                    href={`mailto:${r.email}`}
                    className="text-outline text-sm hover:underline"
                  >
                    {r.email}
                  </a>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-headline-lg-mobile text-primary text-xl">
                    ₹{expectedAmount}
                  </span>
                  <span className="font-bold text-outline text-xs uppercase">
                    {r.is_pubg ? "PUBG Squad" : `${gamesTotal} Games`}
                  </span>
                </div>
              </div>

              <div className="mb-4 flex flex-wrap gap-1">
                {r.is_pubg ? (
                  <span className="rounded bg-secondary-container px-2 py-0.5 font-bold text-on-secondary-container text-xs">
                    PUBG Squad
                  </span>
                ) : (
                  (r.games || []).map((g) => {
                    const title =
                      GAMES.find((x) => x.id === g.game_id)?.title || g.game_id;
                    return (
                      <span
                        key={g.game_id}
                        className="rounded bg-secondary-container px-2 py-0.5 font-bold text-on-secondary-container text-xs"
                      >
                        {title}
                      </span>
                    );
                  })
                )}
              </div>

              <div className="mt-auto grid grid-cols-2 gap-3 pt-4">
                <button
                  type="button"
                  disabled={isActionLoading}
                  onClick={() => handleReject(r.id)}
                  className="rounded border-thick bg-surface-container-high py-2 font-label-bold text-error uppercase transition-colors hover:bg-error hover:text-white disabled:opacity-50"
                >
                  Reject
                </button>
                <button
                  type="button"
                  disabled={isActionLoading}
                  onClick={() => handleApprove(r.id)}
                  className="rounded border-thick bg-secondary py-2 font-label-bold text-white uppercase transition-transform hover:translate-y-0.5 disabled:opacity-50"
                >
                  {isActionLoading ? "..." : "Approve"}
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
