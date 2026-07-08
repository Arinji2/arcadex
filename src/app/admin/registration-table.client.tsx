"use client";

import { Fragment, useMemo, useState } from "react";
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
          av = a.payment_status;
          bv = b.payment_status;
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

  const rows = useMemo(() => {
    return sorted.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);
  }, [page, sorted]);

  function toggleSort(column: "name" | "college" | "status") {
    if (column === sortBy) {
      setAscending(!ascending);
      return;
    }

    setSortBy(column);
    setAscending(true);
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-outline-variant bg-surface-container shadow-sm">
      <table className="w-full border-collapse">
        <thead className="bg-surface-container-high">
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

            <th className="px-5 py-4 text-left">Games</th>

            <Header
              title="Status"
              active={sortBy === "status"}
              asc={ascending}
              onClick={() => toggleSort("status")}
            />
          </tr>
        </thead>

        <tbody>
          {rows.map((registration) => (
            <Fragment key={registration.id}>
              <tr
                key={registration.id}
                className="cursor-pointer border-outline-variant border-t transition hover:bg-surface-container-high"
                onClick={() =>
                  setExpanded((x) =>
                    x === registration.id ? null : registration.id,
                  )
                }
              >
                <td className="px-5 py-4">
                  <div className="font-semibold">{registration.name}</div>

                  <div className="mt-1 text-outline text-sm">
                    {registration.email}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div>{registration.college_name}</div>

                  <div className="mt-1 text-outline text-sm">
                    {registration.mobile_num}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-wrap gap-2">
                    {registration.games.map((game) => (
                      <span
                        key={game.game_id}
                        className="rounded-full bg-secondary-container px-3 py-1 font-medium text-on-secondary-container text-sm"
                      >
                        {game.game_id}
                      </span>
                    ))}
                  </div>
                </td>

                <td className="px-5 py-4">
                  <span
                    className={
                      registration.payment_status === "paid"
                        ? "rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700 text-sm"
                        : "rounded-full bg-red-100 px-3 py-1 font-semibold text-red-700 text-sm"
                    }
                  >
                    {registration.payment_status}
                  </span>
                </td>
              </tr>

              {expanded === registration.id && (
                <tr>
                  <td
                    colSpan={4}
                    className="border-outline-variant border-t bg-surface p-6"
                  >
                    <div className="grid grid-cols-2 gap-8">
                      <Info label="Discord" value={registration.discord_id} />

                      <Info
                        label="Cashfree Order"
                        value={registration.cash_free_order_id ?? "-"}
                      />

                      <div>
                        <div className="mb-2 font-semibold">Games</div>

                        <div className="space-y-2">
                          {registration.games.map((game) => (
                            <div
                              key={game.game_id}
                              className="rounded-lg border border-outline-variant p-3"
                            >
                              <div className="font-medium">{game.game_id}</div>

                              <div className="text-outline text-sm">
                                IGN: {game.ign}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>

      <div className="flex items-center justify-between border-outline-variant border-t bg-surface-container-high px-5 py-4">
        <div className="text-outline text-sm">
          Showing {Math.min(page * PAGE_SIZE + 1, sorted.length)}-
          {Math.min(page * PAGE_SIZE + PAGE_SIZE, sorted.length)} of{" "}
          {sorted.length}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            disabled={page === 0}
            onClick={() => setPage((p) => p - 1)}
            className="rounded-lg border border-outline px-4 py-2 disabled:opacity-40"
          >
            Previous
          </button>

          <button
            type="button"
            disabled={page >= pageCount - 1}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-outline px-4 py-2 disabled:opacity-40"
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
      className="cursor-pointer select-none px-5 py-4 text-left font-semibold"
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
      <div className="mb-1 text-outline text-sm">{label}</div>

      <div className="font-medium">{value}</div>
    </div>
  );
}
