import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-80px)] grow items-center justify-center overflow-hidden p-container-margin">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: "radial-gradient(#222 2px, transparent 2px)",
          backgroundSize: "32px 32px",
        }}
      ></div>

      <div className="md:-rotate-2 relative w-full max-w-2xl transform transition-transform duration-300 hover:rotate-0">
        <div className="absolute inset-0 translate-x-3 translate-y-3 bg-on-background md:translate-x-4 md:translate-y-4"></div>

        <div className="relative z-10 flex flex-col items-center border-thick bg-surface-container-highest p-6 text-center md:p-10">
          <div className="relative mb-8 flex h-24 w-24 items-center justify-center rounded-full border-4 border-[#222] bg-primary-container shadow-[4px_4px_0px_0px_#222] md:h-32 md:w-32">
            <span
              className="material-symbols-outlined font-bold text-5xl text-white md:text-7xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              wifi_off
            </span>
            <div className="-bottom-2 -right-2 absolute flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#222] bg-tertiary-fixed">
              <span className="material-symbols-outlined font-bold text-[#222]">
                priority_high
              </span>
            </div>
          </div>

          <h1
            className="mb-4 font-headline-xl text-headline-lg-mobile text-primary uppercase italic md:text-headline-xl"
            style={{ textShadow: "2px 2px 0px #222" }}
          >
            GAME OVER
          </h1>

          <p className="mb-6 font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant">
            Looks like your connection hit a pipe.
          </p>

          <div className="mb-8 w-full border-thick bg-surface p-4 text-left shadow-[4px_4px_0px_0px_#291715]">
            <div className="mb-2 flex items-center gap-2 border-[#222] border-b-2 pb-2">
              <span className="material-symbols-outlined text-error">
                terminal
              </span>
              <span className="font-label-bold text-label-bold text-on-background uppercase">
                System Log
              </span>
            </div>
            <code className="block whitespace-pre-wrap font-mono text-on-surface-variant text-sm">
              ERROR_CODE: 0xDEADBEEF{"\n"}
              MESSAGE: Registration request timed out.{"\n"}
              STATUS: HP critically low.{"\n"}
              SUGGESTION: Check your connection and try jumping back in.
            </code>
          </div>

          <div className="flex w-full flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/register"
              className="interactive-btn flex flex-1 items-center justify-center gap-2 border-thick bg-secondary-container px-8 py-4 font-label-bold text-label-bold text-on-secondary-container uppercase tracking-wide shadow-hard"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                replay
              </span>
              TRY AGAIN
            </Link>
            <Link
              href="/"
              className="interactive-btn flex flex-1 items-center justify-center gap-2 border-thick bg-tertiary-container px-8 py-4 font-label-bold text-label-bold text-on-tertiary-container uppercase tracking-wide shadow-hard"
            >
              <span className="material-symbols-outlined">home</span>
              HOME SCREEN
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
