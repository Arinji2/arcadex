export default function RulesPage() {
  return (
    <div className="mx-auto flex w-full max-w-7xl grow flex-col gap-12 px-container-margin py-12 md:gap-16">
      <section className="relative mt-4 flex w-full justify-center md:mt-8">
        <div className="-skew-x-6 relative z-10 mx-auto w-full max-w-4xl transform border-thick bg-[#ffcc00] px-6 py-6 text-center shadow-hard md:px-12 md:py-8">
          <h1 className="skew-x-6 transform font-headline-xl text-black text-headline-lg-mobile uppercase tracking-tight md:text-headline-xl">
            Tournament Protocol
          </h1>
        </div>
        <div className="-top-4 md:-top-6 absolute right-0 z-20 rotate-3 transform border-thick bg-primary-container px-4 py-2 font-label-bold text-label-bold text-white uppercase shadow-hard md:right-10">
          Read Carefully!
        </div>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-12">
          <h2 className="mb-6 inline-block border-primary border-b-4 pb-2 font-headline-lg text-headline-lg-mobile uppercase md:text-headline-lg">
            Universal Rules
          </h2>
        </div>

        <div className="group relative flex flex-col items-start gap-4 overflow-hidden border-thick bg-surface-container-high p-6 shadow-hard transition-colors hover:bg-surface-variant md:col-span-4 md:gap-6">
          <div className="-right-4 -top-4 absolute text-[120px] text-primary-container opacity-10 transition-transform group-hover:scale-110">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              gavel
            </span>
          </div>
          <div className="shrink-0 border-thick bg-primary-container p-3 text-white">
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              gavel
            </span>
          </div>
          <div className="relative z-10">
            <h3 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile text-xl uppercase">
              Fair Play Directive
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Zero tolerance for cheating, exploiting bugs, or using third-party
              software. Violators will face immediate banishment from the
              ArcadeX realm. Keep it clean, play hard.
            </p>
          </div>
        </div>

        <div className="group relative flex flex-col justify-between border-thick bg-secondary-container p-6 shadow-hard transition-colors hover:bg-secondary-fixed md:col-span-8">
          <div className="mb-4 w-max border-thick bg-black p-2 text-secondary-fixed">
            <span
              className="material-symbols-outlined text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              schedule
            </span>
          </div>
          <div>
            <h3 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile text-xl uppercase">
              Timings
            </h3>
            <p className="font-body-md text-body-md text-on-secondary-container">
              All games will be played from 4PM-5PM and will not change under
              any circumstance. Please join the respective google meets
              15minutes before the games starts to be on time.Late entry will
              not be allowed.
            </p>
          </div>
        </div>

        <div className="group relative border-thick bg-tertiary-container p-6 shadow-hard transition-colors hover:bg-tertiary-fixed md:col-span-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="border-thick bg-black p-2 text-tertiary-fixed">
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                dns
              </span>
            </div>
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-on-tertiary-container text-xl uppercase">
              Online
            </h3>
          </div>
          <p className="font-body-md text-body-md text-on-tertiary-container">
            ArcadeX will be run fully online. Please make sure you go over the
            installation instructions mentioned below and all your games are
            ready before the event.
          </p>
        </div>

        <div className="group relative border-thick bg-surface-container-high p-6 shadow-hard transition-colors hover:bg-surface-variant md:col-span-6">
          <div className="mb-4 flex items-center gap-4">
            <div className="border-thick bg-error p-2 text-white">
              <span
                className="material-symbols-outlined text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                sports_esports
              </span>
            </div>
            <h3 className="font-headline-lg-mobile text-headline-lg-mobile text-xl uppercase">
              Sportsmanship
            </h3>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Respect opponents, admins, and staff. Trash talk is part of the
            game, but slurs or personal attacks result in instant DQ.
          </p>
        </div>
      </section>

      <section className="mt-4 md:mt-8">
        <h2 className="mb-6 inline-block border-secondary border-b-4 pb-2 font-headline-lg text-headline-lg-mobile uppercase md:mb-8 md:text-headline-lg">
          Game Setups
        </h2>
        <div className="flex flex-col gap-6">
          <details className="group border-thick bg-surface shadow-hard [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between border-transparent border-b-4 bg-surface-container-highest p-4 transition-colors hover:bg-[#ffcc00] group-open:border-[#222222] md:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center border-thick bg-primary font-bold font-rubik text-white md:h-12 md:w-12">
                  C
                </div>
                <span className="font-headline-lg-mobile text-headline-lg-mobile text-xl uppercase md:text-2xl">
                  CHESS
                </span>
              </div>
              <span className="material-symbols-outlined text-3xl transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="flex flex-col gap-4 border-[#222] border-t-4 bg-surface p-4 md:p-6">
              <div className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined mt-1 text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_box
                </span>
                <span className="font-body-md text-body-md">
                  Join the official Discord and link your Riot ID.
                </span>
              </div>
              <div className="flex items-start gap-3">
                <span
                  className="material-symbols-outlined mt-1 text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check_box
                </span>
                <span className="font-body-md text-body-md">
                  Map Vetos happen in the lobby chat 10 mins before start.
                </span>
              </div>
              <button
                type="button"
                className="interactive-btn mt-4 w-max border-thick bg-primary-container px-6 py-3 font-label-bold text-label-bold text-white uppercase shadow-hard"
              >
                Download Config
              </button>
            </div>
          </details>

          <details className="group border-thick bg-surface shadow-hard [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer items-center justify-between border-transparent border-b-4 bg-surface-container-highest p-4 transition-colors hover:bg-secondary-container group-open:border-[#222222] md:p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center border-thick bg-secondary font-bold font-rubik text-white md:h-12 md:w-12">
                  B
                </div>
                <span className="font-headline-lg-mobile text-headline-lg-mobile text-xl uppercase md:text-2xl">
                  BGMI
                </span>
              </div>
              <span className="material-symbols-outlined text-3xl transition-transform group-open:rotate-180">
                expand_more
              </span>
            </summary>
            <div className="flex flex-col gap-4 border-[#222] border-t-4 bg-surface p-4 md:p-6">
              <p className="font-body-md text-body-md text-on-surface-variant">
                Mobile setups must be verified by admins. Emulators strictly
                prohibited.
              </p>
            </div>
          </details>
        </div>
      </section>
    </div>
  );
}
