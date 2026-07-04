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
          "fixed top-0 right-0 h-full w-full sm:w-[400px] bg-surface z-[100] border-l-[4px] border-[#222222] transition-transform duration-300 ease-in-out flex flex-col shadow-[-8px_0px_0px_0px_rgba(34,34,34,0.1)]",
          isSidebarOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <div className="bg-primary-fixed border-b-[4px] border-[#222222] p-4 flex justify-between items-center">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-primary-fixed flex items-center gap-2">
            <span className="material-symbols-outlined text-[32px]">
              shopping_cart
            </span>{" "}
            Loadout
          </h2>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-on-primary-fixed hover:bg-primary-container hover:text-white p-1 border-2 border-transparent hover:border-[#222222] transition-colors flex"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-grow p-4 overflow-y-auto flex flex-col gap-3">
          {items.length === 0 ? (
            <div className="text-center font-body-md text-body-md text-on-surface-variant mt-10">
              Your cart is empty. <br /> Select stages to play!
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-white p-3 border-thick flex justify-between items-center"
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
                  onClick={() => removeFromCart(item.id)}
                  className="text-error hover:bg-error-container p-2 border-2 border-transparent hover:border-[#222222] transition-colors flex items-center"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    delete
                  </span>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="bg-surface-container-high border-t-[4px] border-[#222222] p-6 flex flex-col gap-4">
          <div className="flex justify-between font-body-md text-body-md">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>

          {discount > 0 && (
            <div className="bg-tertiary-fixed border-thick p-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary">
                local_offer
              </span>
              <div className="flex flex-col flex-grow">
                <span className="font-label-bold text-label-bold text-on-tertiary-fixed">
                  {discountPercent}% Multi-Game Discount!
                </span>
              </div>
              <span className="font-body-sm text-body-sm font-bold text-tertiary">
                -₹{discount}
              </span>
            </div>
          )}

          <div className="flex justify-between font-headline-lg-mobile text-headline-lg-mobile mt-2 pt-4 border-t-[2px] border-dashed border-[#222222]">
            <span>Total</span>
            <span className="text-primary">₹{finalTotal}</span>
          </div>

          <Link
            href="/register"
            className="w-full text-center bg-primary text-white py-4 border-thick shadow-hard hover:translate-y-1 hover:translate-x-1 hover:shadow-none font-headline-lg-mobile text-headline-lg-mobile uppercase mt-4 transition-all"
            onClick={() => setSidebarOpen(false)}
          >
            Checkout
          </Link>
        </div>
      </div>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[90] backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
