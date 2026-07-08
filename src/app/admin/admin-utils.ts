import type { Registration } from "@/lib/types";

export type RegistrationWithId = Registration & {
  id: string;
};

export const paymentOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "paid",
    label: "Paid",
  },
  {
    value: "pending",
    label: "Pending",
  },
];

export function uniqueGames(data: RegistrationWithId[]) {
  return [
    ...new Set(data.flatMap((r) => r.games.map((g) => g.game_id))),
  ].sort();
}

export function uniqueColleges(data: RegistrationWithId[]) {
  return [...new Set(data.map((r) => r.college_name))].sort();
}
