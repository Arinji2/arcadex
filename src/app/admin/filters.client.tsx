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
    <div className="flex flex-wrap gap-4">
      <div className="relative min-w-70 flex-1">
        <span className="material-symbols-outlined -translate-y-1/2 absolute top-1/2 left-3 text-outline">
          search
        </span>
        <input
          className="w-full rounded border-2 border-[#222] bg-white py-3 pr-4 pl-10 font-body-md focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Search players, discord, IGNs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        value={payment}
        onChange={(e) => setPayment(e.target.value)}
        className="rounded border-2 border-[#222] bg-white px-4 py-3 font-label-bold uppercase outline-none focus:ring-2 focus:ring-primary"
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
        className="rounded border-2 border-[#222] bg-white px-4 py-3 font-label-bold uppercase outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="all">ALL GAMES</option>
        {games.map((g) => (
          <option key={g} value={g}>
            {g === "PUBG" ? "PUBG SQUAD" : g}
          </option>
        ))}
      </select>
    </div>
  );
}
