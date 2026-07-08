import Image from "next/image";

export function Hero() {
  return (
    <section className="relative flex h-[100svh] w-full items-center justify-center overflow-hidden border-[#222222] border-b-8 bg-pixel-sky px-container-margin py-20">
      <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
        <div className="absolute top-20 left-10 h-26 w-42">
          <Image
            src="/cloud.svg"
            alt="Cloud"
            fill
            className="rotate-[-13deg] drop-shadow-hard"
          />
        </div>
        <div className="absolute top-10 right-20 h-34 w-58">
          <Image
            src="/cloud.svg"
            alt="Cloud"
            fill
            className="rotate-[-13deg] drop-shadow-hard"
          />
        </div>
        <div className="absolute bottom-32 left-1/4 h-32 w-44">
          <Image
            src="/cloud.svg"
            alt="Cloud"
            fill
            className="rotate-[-13deg] drop-shadow-hard"
          />
        </div>
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <div className="-rotate-2 scale-[.80] rounded-xl border-thick bg-surface px-8 py-4 shadow-hard-lg">
          <h1 className="font-headline-xl text-headline-xl text-primary uppercase drop-shadow-[2px_2px_0px_#222]">
            ARCADEX
          </h1>
        </div>

        <div className="scale-[.80] rounded-xl border-thick bg-surface px-8 py-4 shadow-hard-lg">
          <p className="font-headline-lg text-headline-lg text-primary">
            Website is under maintenance and will be back online by 12pm today
          </p>
        </div>

        <p className="rotate-1 transform rounded-lg border-thick bg-on-background px-6 py-2 font-headline-lg text-headline-lg text-on-secondary shadow-hard">
          JULY 19 - JULY 25
        </p>

        {/* <Link */}
        {/*   className="interactive-btn mt-8 flex items-center gap-3 rounded-xl border-thick bg-secondary px-8 py-4 font-headline-lg text-headline-lg text-on-secondary shadow-hard-lg" */}
        {/*   href="/games" */}
        {/* > */}
        {/*   <span */}
        {/*     className="material-symbols-outlined text-[40px]" */}
        {/*     data-icon="play_arrow" */}
        {/*   > */}
        {/*     play_arrow */}
        {/*   </span> */}
        {/*   ENTER STAGE */}
        {/* </Link> */}

        <div className="mt-4 flex flex-col gap-4 sm:flex-row md:hidden">
          <div className="-rotate-3 rounded border-thick bg-primary px-4 py-2 font-label-bold text-label-bold text-on-primary shadow-hard">
            Prizes: ₹250/₹150/₹100
          </div>
          <div className="rotate-3 rounded border-thick bg-tertiary-fixed px-4 py-2 font-label-bold text-label-bold text-on-tertiary-fixed shadow-hard">
            Entry: ₹60
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 flex h-16 w-full items-center border-[#222222] border-t-8 bg-primary-container">
        <div className="h-4 w-full border-[#222222] border-b-4 bg-tertiary-fixed"></div>
      </div>
    </section>
  );
}
