import { clsx } from "clsx";
import Image from "next/image";
import type { GameItem } from "@/context/CartContext";
import { GAMES } from "@/games";

const data = {
  name: "Arinjii",
  email: "arinjay@gmail.com",
  discordID: "arinjay#1234",
  gamesSelected: [
    {
      id: "g1",
      ign: "Arinjii",
    },
    {
      id: "g2",
      ign: "Arinjii",
    },

    {
      id: "g3",
      ign: "Arinjii",
    },
  ],
};
export function SelectedGames() {
  return (
    <div className="flex w-full max-w-2xl flex-col items-center justify-center gap-4">
      <h2 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile text-primary uppercase">
        Selected Games
      </h2>
      <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
        {data.gamesSelected.map((game) => {
          const gameData = GAMES.find((g) => g.id === game.id);
          if (!gameData) return null;
          return <GameCard key={game.id} game={gameData} ignValue={game.ign} />;
        })}
      </div>
    </div>
  );
}

function GameCard({ game, ignValue }: { game: GameItem; ignValue?: string }) {
  const dayNum = game.id[game.id.length - 1];
  return (
    <article
      key={game.id}
      className="group relative flex h-fit flex-col border-thick bg-surface-container p-5 shadow-hard transition-colors hover:bg-surface-variant"
    >
      <div className="-top-4 -left-4 -rotate-6 absolute z-10 transform border-thick bg-tertiary-fixed px-3 py-1 font-label-bold text-label-bold text-on-tertiary-fixed">
        Day {dayNum} • {game.date}
      </div>
      <div
        className={clsx(
          "relative mb-4 aspect-video w-full overflow-hidden border-thick",
        )}
      >
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mb-1 font-headline-lg-mobile text-headline-lg-mobile">
        {game.title}
      </h3>
      <p className="mb-6 flex items-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
        <span className="material-symbols-outlined text-[16px]">schedule</span>{" "}
        {game.time}
      </p>

      {game.details && (
        <ul className="mb-4 flex list-disc flex-col gap-2 pl-4 font-body-sm text-body-sm text-on-surface-variant">
          {game.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      )}
      {game.ignRequired && (
        <div className="mt-auto flex items-center justify-between">
          <div className="flex w-full flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor={`${game.id}-ign`}
            >
              IGN <span className="text-primary">*</span>
            </label>
            <div
              className="w-full font-body-md text-body-md text-on-surface transition-all"
              id={`${game.id}-ign`}
            >
              {ignValue || ""}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
