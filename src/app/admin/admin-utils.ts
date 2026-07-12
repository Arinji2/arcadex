import type { Registration } from "@/lib/types";

export type RegistrationWithId = Registration & {
  id: string;
  screenshotUrl?: string;
};

export const paymentOptions = [
  { value: "all", label: "All Statuses" },
  { value: "verified", label: "Verified" },
  { value: "review", label: "Under Review" },
  { value: "pending", label: "Pending Payment" },
];

export function uniqueGames(data: RegistrationWithId[]) {
  const games = new Set(
    data.flatMap((r) => r.games?.map((g) => g.game_id) || []),
  );
  if (data.some((r) => r.is_pubg)) {
    games.add("PUBG");
  }
  return [...games].sort();
}

export function uniqueColleges(data: RegistrationWithId[]) {
  return [...new Set(data.map((r) => r.college_name))].sort();
}
