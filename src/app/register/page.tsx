"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  RegistrationLocalStorageKey,
  type RegistrationLocalStorageType,
} from "@/constants";
import { type GameItem, useCart } from "@/context/CartContext";
import type { Registration } from "@/lib/types";
import { EmailAction } from "./email.action";
import { LoginAction } from "./login.action";

export default function Register() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const { items, total } = useCart();

  const [formData, setFormData] = useState<RegistrationLocalStorageType>({
    fullName: "",
    collegeName: "",
    mobileNo: "",
    discordId: "",
    email: "",
    igns: {},
  });

  useEffect(() => {
    const savedData = localStorage.getItem(RegistrationLocalStorageKey);
    if (savedData) {
      try {
        setFormData(JSON.parse(savedData));
      } catch (error) {
        console.error("Failed to parse local storage data:", error);
      }
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(RegistrationLocalStorageKey, JSON.stringify(formData));
  }, [formData, loaded]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleIgnChange = (gameId: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      igns: {
        ...prev.igns,
        [gameId]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    const registrationData: Registration = {
      name: formData.fullName,
      email: formData.email,
      mobile_num: formData.mobileNo,
      discord_id: formData.discordId,
      college_name: formData.collegeName,
      games: items.map((item) => ({
        game_id: item.id,
        ign: formData.igns[item.id] || "",
      })),
      payment_status: "pending",
      cash_free_order_id: undefined,
    };

    await LoginAction({ registrationData: registrationData });

    await EmailAction();

    localStorage.removeItem(RegistrationLocalStorageKey);
    router.push("/register/success");
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-4xl grow flex-col items-center justify-center space-y-8 px-container-margin py-12">
      <header className="relative z-10 mb-4 w-full text-center">
        <div className="-skew-x-6 mb-4 inline-block transform border-thick bg-tertiary-fixed px-8 py-4 shadow-hard">
          <h1 className="m-0 font-headline-xl text-headline-lg-mobile text-on-tertiary-fixed uppercase md:text-headline-xl">
            REGISTRATION
          </h1>
        </div>
        <p className="mt-4 font-headline-lg-mobile text-headline-lg-mobile text-primary">
          ARCADEX TOURNAMENT
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full space-y-8 border-thick bg-surface p-6 shadow-hard md:p-10"
      >
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor="fullName"
            >
              Full Name <span className="text-primary">*</span>
            </label>
            <input
              required
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id="fullName"
              placeholder="e.g. John Doe"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor="collegeName"
            >
              College Name <span className="text-primary">*</span>
            </label>
            <input
              required
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id="collegeName"
              placeholder="e.g. DYPSST"
              type="text"
              value={formData.collegeName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor="mobileNo"
            >
              Mobile No <span className="text-primary">*</span>
            </label>
            <input
              required
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id="mobileNo"
              placeholder="e.g. 9876543210"
              type="tel"
              value={formData.mobileNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor="discordId"
            >
              Discord ID <span className="text-primary">*</span>
            </label>
            <input
              required
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id="discordId"
              placeholder="e.g. JohnDoe"
              type="text"
              value={formData.discordId}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 border-thick border-dashed bg-surface-container-high p-6">
          <h3 className="flex items-center gap-2 font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant uppercase">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              contact_mail
            </span>
            Contact Details
          </h3>
          <div className="flex flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor="email"
            >
              Email <span className="text-primary">*</span>
            </label>
            <input
              required
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center space-y-6 border-[#222222] border-t-4 border-dashed pt-8">
          <p className="font-headline-lg text-headline-lg text-on-surface-variant leading-tight">
            GAME DETAILS
          </p>
          {items.length === 0 ? (
            <Link
              href="/games"
              className="w-full py-12 text-center font-label-mono text-on-surface-variant"
            >
              NO ITEMS DETECTED. RETURN TO STAGE SELECT.
            </Link>
          ) : (
            <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
              {items.map((item) => (
                <GameCard
                  key={item.id}
                  game={item}
                  ignValue={formData.igns[item.id] || ""}
                  onIgnChange={(val) => handleIgnChange(item.id, val)}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-8 flex flex-col items-center space-y-6 border-[#222222] border-t-4 border-dashed pt-8">
          <p className="font-headline-lg text-headline-lg text-on-surface-variant leading-tight">
            TOTAL ₹{total}
          </p>
        </div>
        <div className="mt-8 flex flex-col items-center space-y-6 border-[#222222] border-t-4 border-dashed pt-8">
          <label className="group flex max-w-2xl cursor-pointer items-start gap-4">
            <div className="relative mt-1 shrink-0">
              <input type="checkbox" required className="peer sr-only" />
              <div className="flex h-8 w-8 items-center justify-center border-thick bg-white transition-colors peer-checked:bg-primary">
                <span className="material-symbols-outlined font-bold text-white opacity-0 peer-checked:opacity-100">
                  check
                </span>
              </div>
            </div>
            <span className="font-body-md text-body-md text-on-surface-variant leading-tight">
              I confirm that I am ready to crash out. I accept the{" "}
              <a
                href="/rules"
                className="font-bold text-primary underline hover:text-primary-container"
              >
                Terms of Play
              </a>{" "}
              and understand whining about lag is strictly prohibited.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "w-full border-thick bg-primary px-12 py-4 font-headline-lg-mobile text-headline-lg-mobile text-white uppercase transition-all duration-200 md:w-auto",
              loading
                ? "translate-x-1 translate-y-1 cursor-not-allowed opacity-70"
                : "shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
            )}
          >
            {loading ? "PROCESSING..." : "GO TO PAYMENT"}
          </button>
        </div>
      </form>
    </div>
  );
}

function GameCard({
  game,
  ignValue,
  onIgnChange,
}: {
  game: GameItem;
  ignValue?: string;
  onIgnChange?: (val: string) => void;
}) {
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
            <input
              required
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id={`${game.id}-ign`}
              type="text"
              placeholder={`${game.title} IGN`}
              value={ignValue || ""}
              onChange={(e) => onIgnChange?.(e.target.value)}
            />
          </div>
        </div>
      )}
    </article>
  );
}
