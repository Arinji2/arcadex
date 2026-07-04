import Link from "next/link";

export function HomeInfo() {
  return (
    <section className="bg-surface-container-low px-container-margin py-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="relative col-span-1 overflow-hidden rounded-2xl border-thick bg-surface-container-high p-6 shadow-hard-lg md:p-8 lg:col-span-8">
          <div className="absolute top-0 right-0 flex h-24 w-24 items-center justify-center rounded-bl-full border-[#222] border-b-4 border-l-4 bg-primary md:h-32 md:w-32">
            <span className="material-symbols-outlined text-[48px] text-on-primary md:text-[64px]">
              emoji_events
            </span>
          </div>
          <h2 className="mb-6 font-headline-xl text-headline-xl text-primary">
            Loot Pool
          </h2>
          <ul className="space-y-4 font-headline-lg text-headline-lg-mobile text-on-surface md:text-headline-lg">
            <li className="flex items-center gap-4 rounded-xl border-2 border-[#222] bg-surface p-4 shadow-hard">
              <span
                className="material-symbols-outlined text-[32px] text-tertiary-container"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                star
              </span>
              1st Place: ₹250{" "}
            </li>
            <li className="flex items-center gap-4 rounded-xl border-2 border-[#222] bg-surface p-4 shadow-hard">
              <span className="material-symbols-outlined text-[32px] text-outline">
                military_tech
              </span>
              2nd Place: ₹150{" "}
            </li>
            <li className="flex items-center gap-4 rounded-xl border-2 border-[#222] bg-surface p-4 shadow-hard">
              <span className="material-symbols-outlined text-[32px] text-primary">
                workspace_premium
              </span>
              3rd Place: ₹100{" "}
            </li>
          </ul>
        </div>

        <div className="relative col-span-1 mt-8 rounded-b-xl border-thick bg-secondary pt-16 shadow-hard-lg lg:col-span-4 lg:mt-0">
          <div className="-top-6 -left-2 -right-2 absolute z-10 flex h-12 items-center justify-center rounded-lg border-thick bg-secondary shadow-hard">
            <span className="font-headline-lg text-headline-lg-mobile text-on-secondary uppercase">
              Entry Coin
            </span>
          </div>
          <div className="p-6 text-center text-on-secondary">
            <div className="mb-4 font-headline-xl text-headline-xl">₹60</div>
            <p className="rounded-lg border-2 border-[#222] bg-secondary-fixed-dim/20 p-2 font-body-md text-body-md">
              Per Tournament
            </p>
            <Link
              href="/games"
              className="interactive-btn mt-6 block w-full rounded-lg border-thick bg-tertiary-fixed-dim py-4 font-label-bold text-label-bold text-on-background shadow-hard"
            >
              Insert Coin
            </Link>
          </div>
        </div>

        <div className="col-span-1 flex flex-col items-center gap-6 rounded-xl border-thick bg-surface-variant p-6 shadow-hard md:flex-row md:gap-8 md:p-8 lg:col-span-12">
          <div className="shrink-0 rotate-[-10deg] rounded-full border-thick bg-primary-container p-6 shadow-hard">
            <span
              className="material-symbols-outlined text-[48px] text-on-primary-container"
              data-icon="gamepad"
            >
              gamepad
            </span>
          </div>
          <div className="text-center md:text-left">
            <h3 className="mb-2 font-headline-lg text-headline-lg text-primary">
              Level Up! (How to Play)
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Solo, single elimination rounds. Join the Google Meet links by
              3:45pm to be on time. For more information make sure to join our
              Whatsapp Community{" "}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
