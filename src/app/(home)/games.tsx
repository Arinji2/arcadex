import Image from "next/image";
import type { GameItem } from "@/context/CartContext";
import { GAMES } from "@/games";

export function GamesSection() {
  return (
    <section className="border-[#222222] border-b-8 bg-surface-container-lowest px-container-margin py-20">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-12 text-center font-headline-xl text-headline-xl text-primary uppercase drop-shadow-[2px_2px_0px_#222]">
          Upcoming Quests
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {GAMES.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </div>
    </section>
  );
}

function GameCard({ game }: { game: GameItem }) {
  const dayNum = game.id[game.id.length - 1];
  return (
    <div className="group relative rounded-xl border-thick bg-tertiary-container p-block-padding shadow-hard transition-transform hover:translate-y-1">
      <div className="-top-4 -right-4 absolute rotate-12 rounded-full border-thick bg-primary px-3 py-1 font-label-bold text-label-bold text-on-primary shadow-hard">
        DAY {dayNum}
      </div>
      <h3 className="mb-2 font-headline-lg text-headline-lg text-on-tertiary-container">
        {game.title}
      </h3>
      <p className="mb-4 inline-block rounded border-2 border-[#222] bg-surface-container-lowest/50 px-2 py-1 font-body-md text-body-md text-on-tertiary-container">
        {game.time}
      </p>
      <div className="relative h-48 w-full rounded-lg border-[#222] border-thick">
        <Image
          src={game.image}
          alt={game.title}
          fill
          className="object-cover"
        />
      </div>
    </div>
  );
}
