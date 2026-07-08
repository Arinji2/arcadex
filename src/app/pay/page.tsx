import Image from "next/image";
import { redirect } from "next/navigation";
import { GAMES } from "@/games";
import db from "@/lib/db";
import { PaymentMap } from "@/lib/payment-map";
import { getUID } from "@/lib/session";
import PayForm from "./button.client";
import UpiIdCopy from "./upi-id.client";

export default async function Pay() {
  const { uid } = await getUID({
    create: false,
  });

  if (!uid) redirect("/");

  const snapshot = await db.registrations.doc(uid).get();
  const registrationData = snapshot.data();

  if (!registrationData || registrationData.games.length === 0) {
    redirect("/");
  }

  const totalGames = registrationData.games.length;
  const originalTotal = totalGames * 60;
  const discount = totalGames >= 4 ? totalGames * 10 : 0;
  const finalTotal = originalTotal - discount;
  const paymentImage = PaymentMap[finalTotal.toString()];

  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-4xl flex-col items-center gap-8 px-container-margin py-8 md:py-12">
      <header className="relative z-10 flex w-full flex-col items-center text-center">
        <div className="-skew-x-6 inline-block transform border-thick bg-tertiary-fixed px-6 py-2 shadow-hard">
          <h1 className="m-0 font-headline-lg text-headline-lg-mobile text-on-tertiary-fixed uppercase">
            CHECKOUT
          </h1>
        </div>
        <p className="mt-4 max-w-xl border-thick bg-surface-container-high px-4 py-3 font-body-sm text-body-sm text-on-surface shadow-hard">
          Scan the QR or copy the UPI ID below. Upload your screenshot to secure
          your slot.
        </p>
      </header>

      <div className="flex w-full flex-col items-stretch justify-center gap-6 md:flex-row">
        <div className="flex w-full flex-col gap-6 md:w-5/12">
          <div className="relative h-fit border-thick bg-surface p-5 shadow-hard">
            <div className="-top-3 -left-3 -rotate-3 absolute transform border-thick bg-secondary-fixed px-3 py-1 font-label-bold text-[12px] text-on-secondary-fixed uppercase shadow-hard">
              Order Summary
            </div>

            <div className="mt-2 flex flex-col gap-3 border-[#222] border-b-2 border-dashed pb-4 font-body-sm text-body-sm">
              {registrationData.games.map((game) => {
                const gameInfo = GAMES.find((g) => g.id === game.game_id);
                return (
                  <div
                    key={game.game_id}
                    className="flex items-center justify-between"
                  >
                    <span className="truncate pr-2 font-label-bold text-on-surface-variant uppercase">
                      {gameInfo?.title || game.game_id}
                    </span>
                    <span className="font-label-bold">₹60</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-2 pt-4 font-body-sm text-body-sm">
              <div className="flex justify-between font-bold text-on-surface-variant">
                <span>Subtotal</span>
                <span>₹{originalTotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between font-bold text-tertiary">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      local_offer
                    </span>
                    Discount
                  </span>
                  <span>-₹{discount}</span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between border-[#222] border-t-4 pt-3">
              <span className="font-headline-lg-mobile text-on-surface text-xl uppercase">
                TOTAL
              </span>
              <span className="font-headline-lg-mobile text-2xl text-primary">
                ₹{finalTotal}
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-col items-center border-thick bg-surface-container p-5 shadow-hard md:w-7/12">
          <div className="-top-3 -right-3 absolute rotate-3 transform border-thick bg-primary-fixed px-3 py-1 font-label-bold text-[12px] text-on-primary-fixed uppercase shadow-hard">
            Pay Here
          </div>

          <div className="mt-2 flex w-full max-w-sm flex-col items-center justify-center border-thick bg-white p-3 shadow-hard">
            <div className="relative aspect-square w-full">
              <Image
                src={paymentImage}
                alt={`QR code for ₹${finalTotal}`}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-2 font-headline-lg-mobile text-primary text-xl">
              ₹{finalTotal}
            </div>
          </div>

          <div className="mt-6 w-full space-y-5 border-[#222] border-t-2 border-dashed pt-6">
            <UpiIdCopy upiId="fernandezallen234@oksbi" />
            <PayForm />
          </div>
        </div>
      </div>
    </div>
  );
}
