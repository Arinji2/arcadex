"use client";
import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { RegistrationLocalStorageKey } from "@/constants";
import { type GameItem, useCart } from "@/context/CartContext";
import { GAMES } from "@/games";
import { DiscountCard } from "./discount";

export default function GamesPage() {
  const { items, addToCart } = useCart();
  const [animatingBtn, setAnimatingBtn] = useState<string | null>(null);

  const handleAdd = (game: GameItem) => {
    addToCart(game);
    setAnimatingBtn(game.id);
    localStorage.removeItem(RegistrationLocalStorageKey);
    setTimeout(() => setAnimatingBtn(null), 1000);
  };

  return (
    <div className="relative z-10 mx-auto flex w-full max-w-7xl grow flex-col gap-8 px-container-margin py-8 md:py-12">
      <header className="mb-4">
        <h1 className="-rotate-2 mb-4 inline-block border-thick bg-primary-fixed px-4 py-2 font-headline-xl text-headline-xl text-primary uppercase shadow-hard">
          Select Stage
        </h1>
        <p className="mt-4 max-w-2xl font-body-md text-body-md text-on-surface">
          Join the ultimate 7-day gaming marathon. Build your schedule and crash
          out the competition in ArcadeX.
        </p>
      </header>
      <DiscountCard />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {GAMES.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            items={items}
            animatingBtn={animatingBtn}
            handleAdd={handleAdd}
          />
        ))}
      </div>
    </div>
  );
}

function GameCard({
  items,
  handleAdd,
  game,
  animatingBtn,
}: {
  game: GameItem;
  items: GameItem[];
  animatingBtn: string | null;
  handleAdd: (game: GameItem) => void;
}) {
  const isAdded = items.some((i) => i.id === game.id);
  const isAnimating = animatingBtn === game.id;
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
      <div className="mt-auto flex items-center justify-between">
        <div className="flex items-baseline gap-2">
          {items.length >= 4 ? (
            <>
              <span className="font-headline-sm-mobile text-muted-foreground line-through">
                ₹{game.price}
              </span>
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
                ₹{game.price - 10}
              </span>
            </>
          ) : (
            <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary">
              ₹{game.price}
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => handleAdd(game)}
          disabled={isAdded}
          className={clsx(
            "border-thick px-4 py-2 font-label-bold text-label-bold uppercase shadow-hard transition-all",
            isAdded
              ? "translate-x-1 translate-y-1 cursor-not-allowed bg-tertiary-fixed text-on-tertiary-fixed shadow-none"
              : "bg-secondary text-on-secondary hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
            isAnimating && "bg-tertiary-fixed text-on-tertiary-fixed",
          )}
        >
          {isAnimating ? "ADDED!" : isAdded ? "IN CART" : "ADD"}
        </button>
      </div>
    </article>
  );
}
