"use client";

import { Fragment, useMemo, useState } from "react";
import { GAMES } from "@/games";
import type { RegistrationWithId } from "./admin-utils";

type Props = {
  registrations: RegistrationWithId[];
};

const PAGE_SIZE = 15;

export default function RegistrationTable({ registrations }: Props) {
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"name" | "college" | "status">("name");
  const [ascending, setAscending] = useState(true);

  const sorted = useMemo(() => {
    const arr = [...registrations];

    arr.sort((a, b) => {
      let av = "";
      let bv = "";

      switch (sortBy) {
        case "college":
          av = a.college_name;
          bv = b.college_name;
          break;
        case "status":
          av = a.payment_status + (a.verified ? "1" : "0");
          bv = b.payment_status + (b.verified ? "1" : "0");
          break;
        default:
          av = a.name;
          bv = b.name;
      }

      const result = av.localeCompare(bv);
      return ascending ? result : -result;
    });

    return arr;
  }, [registrations, sortBy, ascending]);

  const pageCount = Math.ceil(sorted.length / PAGE_SIZE);
  const rows = sorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function toggleSort(column: "name" | "college" | "status") {
    if (column === sortBy) {
      setAscending(!ascending);
      return;
    }
    setSortBy(column);
    setAscending(true);
  }

  return (
    <div className="overflow-hidden rounded-xl border-thick bg-surface shadow-hard">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead className="border-[#222] border-b-4 bg-surface-container-high">
            <tr>
              <Header
                title="Name"
                active={sortBy === "name"}
                asc={ascending}
                onClick={() => toggleSort("name")}
              />
              <Header
                title="College"
                active={sortBy === "college"}
                asc={ascending}
                onClick={() => toggleSort("college")}
              />
              <th className="p-4 font-label-bold text-on-surface uppercase">
                Games
              </th>
              <Header
                title="Status"
                active={sortBy === "status"}
                asc={ascending}
                onClick={() => toggleSort("status")}
              />
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-dashed divide-[#222]">
            {rows.map((registration) => {
              const isVerified = registration.verified;
              const isPending = registration.payment_status === "pending";

              return (
                <Fragment key={registration.id}>
                  <tr
                    className="cursor-pointer transition hover:bg-surface-container"
                    onClick={() =>
                      setExpanded((x) =>
                        x === registration.id ? null : registration.id,
                      )
                    }
                  >
                    <td className="p-4">
                      <div className="font-bold text-on-surface">
                        {registration.name}
                      </div>
                      <div className="text-outline text-sm">
                        {registration.email}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-on-surface">
                        {registration.college_name}
                      </div>
                      <div className="text-outline text-sm">
                        {registration.mobile_num}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-1">
                        {registration.is_pubg ? (
                          <span className="rounded border border-[#222] bg-surface px-2 py-1 font-bold text-xs">
                            PUBG
                          </span>
                        ) : (
                          (registration.games || []).map((game) => {
                            const gameName =
                              GAMES.find((g) => g.id === game.game_id)?.title ||
                              game.game_id;
                            return (
                              <span
                                key={game.game_id}
                                className="rounded border border-[#222] bg-surface px-2 py-1 font-bold text-xs"
                              >
                                {`${gameName} (${game.game_id})`}
                              </span>
                            );
                          })
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      {isVerified ? (
                        <span className="rounded bg-secondary-container px-3 py-1 font-bold text-on-secondary-container text-xs uppercase">
                          Verified
                        </span>
                      ) : isPending ? (
                        <span className="rounded bg-surface-container-highest px-3 py-1 font-bold text-on-surface text-xs uppercase">
                          Pending
                        </span>
                      ) : (
                        <span className="rounded bg-tertiary-fixed px-3 py-1 font-bold text-on-tertiary-fixed text-xs uppercase">
                          Reviewing
                        </span>
                      )}
                    </td>
                  </tr>

                  {expanded === registration.id && (
                    <tr className="bg-surface-container-lowest">
                      <td colSpan={4} className="border-[#222] border-t-2 p-6">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                          <div className="space-y-4">
                            <Info
                              label="Discord ID"
                              value={registration.discord_id}
                            />
                            <div>
                              <div className="mb-2 font-label-bold text-outline uppercase">
                                IGNs
                              </div>
                              <div className="space-y-2">
                                {registration.is_pubg
                                  ? registration.pubg_igns?.map((ign, i) => (
                                      <div
                                        key={ign}
                                        className="flex items-center justify-between rounded border-2 border-[#222] bg-white p-2 text-sm"
                                      >
                                        <span className="font-bold">
                                          Player {i + 1}
                                        </span>
                                        <span>{ign}</span>
                                      </div>
                                    ))
                                  : (registration.games || []).map((game) => {
                                      const gameName =
                                        GAMES.find((g) => g.id === game.game_id)
                                          ?.title || game.game_id;
                                      return (
                                        <div
                                          key={game.game_id}
                                          className="flex items-center justify-between rounded border-2 border-[#222] bg-white p-2 text-sm"
                                        >
                                          <span className="font-bold">
                                            {gameName}
                                          </span>
                                          <span>{game.ign || "-"}</span>
                                        </div>
                                      );
                                    })}
                              </div>
                            </div>
                          </div>

                          {registration.screenshotUrl && (
                            <div>
                              <div className="mb-2 font-label-bold text-outline uppercase">
                                Screenshot
                              </div>
                              <a
                                href={registration.screenshotUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="block max-w-xs overflow-hidden rounded border-2 border-[#222]"
                              >
                                {/** biome-ignore lint/performance/noImgElement: false positive */}
                                <img
                                  src={registration.screenshotUrl}
                                  alt="Screenshot"
                                  className="w-full object-cover"
                                />
                              </a>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-[#222] border-t-4 bg-surface-container-high p-4">
        <div className="font-body-sm font-bold text-outline">
          {sorted.length > 0
            ? `Showing ${page * PAGE_SIZE + 1}-${Math.min((page + 1) * PAGE_SIZE, sorted.length)} of ${sorted.length}`
            : "No registrations found"}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="rounded border-2 border-[#222] bg-white px-4 py-2 font-label-bold uppercase disabled:opacity-40"
          >
            Prev
          </button>
          <button
            type="button"
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => p + 1)}
            className="rounded border-2 border-[#222] bg-white px-4 py-2 font-label-bold uppercase disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

function Header({
  title,
  active,
  asc,
  onClick,
}: {
  title: string;
  active: boolean;
  asc: boolean;
  onClick(): void;
}) {
  return (
    <th
      onClick={onClick}
      className="cursor-pointer select-none p-4 font-label-bold text-on-surface uppercase hover:bg-surface-variant"
    >
      <div className="flex items-center gap-2">
        {title}
        {active && (asc ? "▲" : "▼")}
      </div>
    </th>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 font-label-bold text-outline uppercase">{label}</div>
      <div className="font-medium">{value || "-"}</div>
    </div>
  );
}
