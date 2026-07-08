import type { RegistrationWithId } from "./admin-utils";

type Props = {
  registrations: RegistrationWithId[];
};

export default function Stats({ registrations }: Props) {
  const verified = registrations.filter((r) => r.verified).length;
  const underReview = registrations.filter(
    (r) => r.payment_status === "paid" && !r.verified,
  ).length;
  const pending = registrations.filter(
    (r) => r.payment_status === "pending",
  ).length;

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <Card
        title="Total Users"
        value={registrations.length}
        color="bg-primary"
      />
      <Card title="Verified Slots" value={verified} color="bg-secondary" />
      <Card
        title="Under Review"
        value={underReview}
        color="bg-tertiary-fixed text-black"
      />
      <Card
        title="Pending Payment"
        value={pending}
        color="bg-surface-container-highest text-black"
      />
    </div>
  );
}

function Card({
  title,
  value,
  color,
}: {
  title: string;
  value: number;
  color: string;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-xl border-thick p-6 shadow-hard ${color}`}
    >
      <div className="inherit-text-color font-label-bold text-white/80 uppercase">
        {title}
      </div>
      <div className="inherit-text-color mt-2 font-headline-xl text-5xl text-white">
        {value}
      </div>
      <style>{`
        .inherit-text-color { color: inherit; }
      `}</style>
    </div>
  );
}
