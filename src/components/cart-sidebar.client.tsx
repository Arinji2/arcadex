"use client";
import clsx from "clsx";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartSidebar() {
  const { items, removeFromCart, isSidebarOpen, setSidebarOpen, total } =
    useCart();

  let discount = 0;
  let discountPercent = 0;

  if (items.length >= 5) {
    discountPercent = 20;
    discount = total * 0.2;
  } else if (items.length >= 3) {
    discountPercent = 10;
    discount = total * 0.1;
  }
  const finalTotal = total - discount;

  return (
    <>
      <div
        className={clsx(
          "fixed top-0 right-0 z-100 flex h-full w-full flex-col border-[#222222] border-l-4 bg-surface shadow-[-8px_0px_0px_0px_rgba(34,34,34,0.1)] transition-transform duration-300 ease-in-out sm:w-100",
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-[#222222] border-b-4 bg-primary-fixed p-4">
          <h2 className="flex items-center gap-2 font-headline-lg-mobile text-headline-lg-mobile text-on-primary-fixed">
            <span className="material-symbols-outlined text-[32px]">
              shopping_cart
            </span>{" "}
            Loadout
          </h2>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="flex border-2 border-transparent p-1 text-on-primary-fixed transition-colors hover:border-[#222222] hover:bg-primary-container hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex grow flex-col gap-3 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="mt-10 text-center font-body-md text-body-md text-on-surface-variant">
              Your cart is empty. <br /> Select stages to play!
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-thick bg-white p-3"
              >
                <div>
                  <div className="font-label-bold text-label-bold">
                    {item.title}
                  </div>
                  <div className="font-body-sm text-body-sm text-primary">
                    ₹{item.price}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center border-2 border-transparent p-2 text-error transition-colors hover:border-[#222222] hover:bg-error-container"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    delete
                  </span>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="flex flex-col gap-4 border-[#222222] border-t-4 bg-surface-container-high p-6">
          <div className="flex justify-between font-body-md text-body-md">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          {discount > 0 && (
            <div className="flex items-center gap-2 border-thick bg-tertiary-fixed p-3">
              <span className="material-symbols-outlined text-tertiary">
                local_offer
              </span>
              <div className="flex grow flex-col">
                <span className="font-label-bold text-label-bold text-on-tertiary-fixed">
                  {discountPercent}% Multi-Game Discount!
                </span>
              </div>
              <span className="font-body-sm font-bold text-body-sm text-tertiary">
                -₹{discount}
              </span>
            </div>
          )}

          <div className="mt-2 flex justify-between border-[#222222] border-t-2 border-dashed pt-4 font-headline-lg-mobile text-headline-lg-mobile">
            <span>Total</span>
            <span className="text-primary">₹{finalTotal}</span>
          </div>

          <Link
            href="/register"
            className="mt-4 w-full border-thick bg-primary py-4 text-center font-headline-lg-mobile text-headline-lg-mobile text-white uppercase shadow-hard transition-all hover:translate-x-1 hover:translate-y-1 hover:shadow-none"
            onClick={() => setSidebarOpen(false)}
          >
            Checkout
          </Link>
        </div>
      </div>

      {isSidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-90 bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
