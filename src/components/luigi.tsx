/** biome-ignore-all lint/performance/noImgElement: Easter Egg Shenanigans */
/** biome-ignore-all lint/a11y/useMediaCaption: Easter Egg Shenanigans */
"use client";

import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

function LuigiEasterEggContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [callState, setCallState] = useState<"idle" | "ringing" | "missed">(
    "idle",
  );

  const ringingAudioRef = useRef<HTMLAudioElement | null>(null);
  const runningAudioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const showEasterEggRef = useRef(showEasterEgg);
  useEffect(() => {
    showEasterEggRef.current = showEasterEgg;
  }, [showEasterEgg]);

  useEffect(() => {
    if (callState === "ringing") {
      if (ringingAudioRef.current) {
        ringingAudioRef.current.currentTime = 0;
        ringingAudioRef.current
          .play()
          .catch((e) => console.log("Audio blocked:", e));
      }
    } else {
      ringingAudioRef.current?.pause();
    }
  }, [callState]);

  useEffect(() => {
    if (callState === "missed") {
      if (runningAudioRef.current) {
        runningAudioRef.current.currentTime = 0;
        runningAudioRef.current
          .play()
          .catch((e) => console.log("Audio blocked:", e));
      }
    } else {
      runningAudioRef.current?.pause();
    }
  }, [callState]);

  const closeModal = useCallback(
    (updateUrl = true) => {
      setShowEasterEgg(false);
      setCallState("idle");
      if (timerRef.current) clearTimeout(timerRef.current);

      if (ringingAudioRef.current) ringingAudioRef.current.pause();
      if (runningAudioRef.current) runningAudioRef.current.pause();

      if (updateUrl) {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.delete("luigi");
        router.replace(`${pathname}?${newParams.toString()}`, {
          scroll: false,
        });
      }
    },
    [searchParams, router, pathname],
  );

  useEffect(() => {
    const isLuigiParam = searchParams.get("luigi") === "true";

    if (isLuigiParam && !showEasterEggRef.current) {
      setShowEasterEgg(true);
      setCallState("ringing");

      timerRef.current = setTimeout(() => {
        setCallState("missed");
      }, 5000);
    } else if (!isLuigiParam && showEasterEggRef.current) {
      closeModal(false);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [searchParams, closeModal]);

  if (!showEasterEgg) return null;

  return (
    <>
      <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
        <div className="relative z-10 w-full max-w-md overflow-hidden border-thick bg-surface p-8 text-center shadow-hard-lg">
          <button
            type="button"
            onClick={() => closeModal(true)}
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center border-thick bg-surface-container-highest text-on-surface transition-colors hover:bg-error hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {callState === "ringing" ? (
            <div className="flex flex-col items-center gap-6">
              <h2 className="animate-pulse font-headline-lg-mobile text-headline-lg-mobile text-primary uppercase">
                Calling Luigi...
              </h2>
              <Image
                preload
                width={32}
                height={32}
                src="/luigi/telephone.webp"
                alt="Telephone ringing"
                className="h-32 w-32 border-thick bg-white object-contain p-2 shadow-hard"
              />
              <p className="font-body-md text-body-md text-on-surface-variant">
                Attempting to connect to the Mansion... Please hold.
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-6">
              <h2 className="font-headline-lg-mobile text-error text-headline-lg-mobile uppercase">
                No one picked up!
              </h2>
              <div className="relative flex h-32 w-32 items-center justify-center border-thick bg-surface-container-highest p-3 shadow-hard">
                <Image
                  src="/luigi/mario-sad.gif"
                  alt="Mario Sad"
                  fill
                  preload
                />
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Wait, what is that sound? Is someone running?
              </p>
            </div>
          )}
        </div>

        {/* Running Animation Across the Screen */}
        {callState === "missed" && (
          <>
            <img
              src="/luigi/luigi-run.gif"
              alt="Luigi running away from monsters"
              className="pointer-events-none fixed bottom-10 z-101 h-32 w-auto animate-character-run md:h-48"
            />
            <img
              src="/luigi/goomba-run.gif"
              alt="Goomba chasing Luigi"
              className="pointer-events-none fixed bottom-10 z-100 h-24 w-auto animate-character-run-behind md:h-32"
            />
          </>
        )}
      </div>

      <audio ref={ringingAudioRef} loop src="/sounds/ring.mp3" />
      <audio ref={runningAudioRef} loop src="/sounds/run.mp3" />
    </>
  );
}

export default function LuigiEasterEgg() {
  return (
    <Suspense fallback={null}>
      <LuigiEasterEggContent />
    </Suspense>
  );
}
