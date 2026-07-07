"use client";
import { clsx } from "clsx";
import Image from "next/image";
import { type GameItem, useCart } from "@/context/CartContext";
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
  const { addToCart, items, removeFromCart } = useCart();
  const isInCart = items.some((item) => item.id === game.id);
  const dayNum = game.id[game.id.length - 1];
  return (
    <div className="group relative rounded-xl border-thick bg-tertiary-container p-block-padding shadow-hard transition-transform hover:translate-y-1">
      <div className="-top-4 -right-4 absolute rotate-12 rounded-full border-thick bg-primary px-3 py-1 font-label-bold text-label-bold text-on-primary shadow-hard">
        DAY {dayNum}
      </div>
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex w-fit flex-col items-start justify-center gap-2">
          <h3 className="mb-2 font-headline-lg text-headline-lg text-on-tertiary-container">
            {game.title}
          </h3>
          <p className="mb-4 inline-block rounded border-2 border-[#222] bg-surface-container-lowest/50 px-2 py-1 font-body-md text-body-md text-on-tertiary-container">
            {game.time}
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            if (isInCart) removeFromCart(game.id);
            else addToCart(game);
          }}
          className={clsx(
            "interactive-btn h-fit w-fit rounded-lg border-[#222] border-thick p-3 shadow-hard",
            isInCart ? "bg-primary-container" : "bg-secondary-container",
          )}
        >
          <h2
            className={clsx(
              "flex items-center gap-2 font-headline-lg-mobile text-headline-lg-mobile",
              isInCart
                ? "text-on-primary-container"
                : "text-on-secondary-container",
            )}
          >
            {isInCart ? (
              <span className="material-symbols-outlined text-[28px]! md:text-[32px]!">
                delete
              </span>
            ) : (
              <span className="material-symbols-outlined text-[28px]! md:text-[32px]!">
                shopping_cart
              </span>
            )}
          </h2>
        </button>
      </div>
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
