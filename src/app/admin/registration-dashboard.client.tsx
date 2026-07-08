"use client";

import { useMemo, useState } from "react";
import { GAMES } from "@/games";
import type { RegistrationWithId } from "./admin-utils";
import ExportButtons from "./export-buttons.client";
import Filters from "./filters.client";
import RegistrationTable from "./registration-table.client";
import Stats from "./stats";

type Props = {
  registrations: RegistrationWithId[];
};

export default function RegistrationDashboard({ registrations }: Props) {
  const [search, setSearch] = useState("");
  const [payment, setPayment] = useState("all");
  const [game, setGame] = useState("all");

  const filtered = useMemo(() => {
    const q = search.toLowerCase();

    return registrations.filter((r) => {
      if (payment !== "all" && r.payment_status !== payment) {
        return false;
      }

      if (game !== "all" && !r.games.some((g) => g.game_id === game)) {
        return false;
      }

      if (!q) {
        return true;
      }

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
    <div className="mx-auto max-w-7xl space-y-8 p-8">
      <Stats registrations={filtered} />
      <div className="rounded-xl border border-outline-variant bg-surface-container p-5">
        <h2 className="mb-3 font-bold text-lg">Game IDs</h2>

        <div className="flex flex-wrap gap-3">
          {GAMES.map((game) => (
            <div
              key={game.id}
              className="rounded-lg border border-outline-variant bg-surface px-4 py-2"
            >
              <span className="font-bold">{game.id}</span>

              <span className="mx-2 text-outline">→</span>

              <span>{game.title}</span>
            </div>
          ))}
        </div>
      </div>
      <Filters
        registrations={registrations}
        search={search}
        setSearch={setSearch}
        payment={payment}
        setPayment={setPayment}
        game={game}
        setGame={setGame}
      />

      <ExportButtons registrations={filtered} />

      <RegistrationTable registrations={filtered} />
    </div>
  );
}
