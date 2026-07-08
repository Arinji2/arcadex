"use client";

import clsx from "clsx";
import { useMemo, useState } from "react";
import type { RegistrationWithId } from "./admin-utils";
import ExportButtons from "./export-buttons.client";
import Filters from "./filters.client";
import RegistrationTable from "./registration-table.client";
import Stats from "./stats";
import VerificationTab from "./verification.client";

type Props = {
  registrations: RegistrationWithId[];
};

export default function RegistrationDashboard({ registrations }: Props) {
  const [activeTab, setActiveTab] = useState<"overview" | "verification">(
    "overview",
  );
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState("all");
  const [game, setGame] = useState("all");

  const unverifiedCount = registrations.filter(
    (r) => r.payment_status === "paid" && !r.verified,
  ).length;

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return registrations.filter((r) => {
      // Handle the 3 new states (verified, review, pending)
      if (payment === "verified" && !r.verified) return false;
      if (payment === "review" && (r.verified || r.payment_status !== "paid"))
        return false;
      if (payment === "pending" && r.payment_status !== "pending") return false;

      if (game !== "all" && !r.games.some((g) => g.game_id === game)) {
        return false;
      }

      if (!q) return true;

      return (
        r.name.toLowerCase().includes(q) ||
        r.email.toLowerCase().includes(q) ||
        r.mobile_num.includes(q) ||
        r.discord_id.toLowerCase().includes(q) ||
        r.college_name.toLowerCase().includes(q) ||
        r.games.some(
          (g) =>
            g.ign.toLowerCase().includes(q) ||
            g.game_id.toLowerCase().includes(q),
        )
      );
    });
  }, [registrations, search, payment, game]);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="mb-2 font-headline-xl text-headline-xl text-primary uppercase">
            Admin Console
          </h1>
          <p className="font-body-md text-on-surface-variant">
            Manage registrations, verify payments, and export details.
          </p>
        </div>

        <div className="flex w-fit gap-2 rounded-xl border-thick bg-surface-container-high p-2">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={clsx(
              "rounded-lg px-6 py-2 font-label-bold uppercase transition-all",
              activeTab === "overview"
                ? "bg-primary text-white shadow-hard"
                : "bg-transparent text-on-surface hover:bg-surface-variant",
            )}
          >
            Overview
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("verification")}
            className={clsx(
              "relative rounded-lg px-6 py-2 font-label-bold uppercase transition-all",
              activeTab === "verification"
                ? "bg-primary text-white shadow-hard"
                : "bg-transparent text-on-surface hover:bg-surface-variant",
            )}
          >
            Verification
            {unverifiedCount > 0 && (
              <span className="-right-2 -top-2 absolute flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#222] bg-tertiary-fixed text-black text-xs">
                {unverifiedCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {activeTab === "overview" ? (
        <div className="fade-in slide-in-from-bottom-4 animate-in space-y-8 duration-300">
          <Stats registrations={registrations} />

          <div className="rounded-xl border-thick bg-surface-container p-6 shadow-hard">
            <Filters
              registrations={registrations}
              search={search}
              setSearch={setSearch}
              payment={payment}
              setPayment={setPayment}
              game={game}
              setGame={setGame}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border-thick bg-surface-container p-6 shadow-hard">
            <h2 className="font-headline-lg-mobile text-xl uppercase">
              Export Data
            </h2>
            <ExportButtons registrations={filtered} />
          </div>

          <RegistrationTable registrations={filtered} />
        </div>
      ) : (
        <div className="fade-in slide-in-from-bottom-4 animate-in duration-300">
          <VerificationTab registrations={registrations} />
        </div>
      )}
    </div>
  );
}
