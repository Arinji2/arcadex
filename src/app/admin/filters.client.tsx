"use client";

import {
  paymentOptions,
  type RegistrationWithId,
  uniqueGames,
} from "./admin-utils";

type Props = {
  registrations: RegistrationWithId[];

  search: string;
  setSearch(v: string): void;

  payment: string;
  setPayment(v: string): void;

  game: string;
  setGame(v: string): void;
};

export default function Filters({
  registrations,
  search,
  setSearch,
  payment,
  setPayment,
  game,
  setGame,
}: Props) {
  const games = uniqueGames(registrations);

  return (
    <div className="flex flex-wrap gap-4 rounded-xl border border-outline-variant bg-surface-container p-5">
      <input
        className="min-w-72 flex-1 rounded-lg border-outline px-4 py-3"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
        className="rounded-lg border-outline px-4 py-3"
      >
        {paymentOptions.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>

      <select
        value={game}
        onChange={(e) => setGame(e.target.value)}
        className="rounded-lg border-outline px-4 py-3"
      >
        <option value="all">All Games</option>

        {games.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
    </div>
  );
}
