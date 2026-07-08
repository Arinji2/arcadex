import type { RegistrationWithId } from "./admin-utils";

type Props = {
  registrations: RegistrationWithId[];
};

export default function Stats({ registrations }: Props) {
  const paid = registrations.filter((r) => r.payment_status === "paid").length;

  const pending = registrations.length - paid;

  const totalGames = registrations.reduce((acc, r) => acc + r.games.length, 0);

  return (
    <div className="grid grid-cols-4 gap-4">
      <Card title="Registrations" value={registrations.length} />
      <Card title="Paid" value={paid} />
      <Card title="Pending" value={pending} />
      <Card title="Game Entries" value={totalGames} />
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="rounded-xl border border-outline-variant bg-surface-container p-6">
      <div className="text-body-sm text-outline">{title}</div>

      <div className="mt-2 font-black text-headline-lg">{value}</div>
    </div>
  );
}
