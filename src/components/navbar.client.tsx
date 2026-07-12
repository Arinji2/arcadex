"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { items, setSidebarOpen, jiggle } = useCart();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTransactional = pathname.includes("/pay");

  const navLinks = [
    { label: "Levels", href: "/" },
    { label: "Games", href: "/games" },
    { label: "PUBG", href: "/pubg" },
    { label: "Rules", href: "/rules" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-[#222222] border-b-4 bg-surface shadow-[0px_4px_0px_0px_rgba(186,26,26,1)] dark:bg-surface-dim">
      <div
        className={clsx(
          "mx-auto flex h-20 w-full max-w-7xl items-center px-container-margin",
          isTransactional ? "justify-center" : "justify-between",
        )}
      >
        <Link
          href="/"
          className="group flex flex-col"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span className="-mb-1 font-label-bold text-label-bold text-on-surface-variant uppercase">
            DYPSST IEEE SB presents
          </span>
          <span className="font-headline-lg text-headline-lg text-primary uppercase italic tracking-tighter transition-transform group-hover:scale-105">
            ArcadeX
          </span>
        </Link>

        {!isTransactional && (
          <>
            <nav className="hidden items-center gap-6 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "font-headline-lg text-headline-lg uppercase transition-colors",
                    pathname === link.href
                      ? "border-primary border-b-4 pb-1 text-primary"
                      : "text-on-surface hover:text-primary",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className={clsx(
                  "interactive-btn relative flex items-center gap-2 rounded-lg border-thick bg-primary-container px-4 py-2 font-label-bold text-label-bold text-on-primary-container uppercase shadow-hard transition-transform",
                  {
                    "animate-cart-jiggle": jiggle,
                  },
                )}
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shopping_cart
                </span>
                <span className="hidden sm:inline">Cart</span>
                {items.length > 0 && (
                  <span className="-top-2 -right-2 absolute flex h-6 w-6 items-center justify-center rounded-full border-thick bg-primary text-white text-xs">
                    {items.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                className="interactive-btn flex items-center justify-center rounded-lg border-thick bg-surface-container-high p-2 text-on-surface shadow-hard md:hidden"
                aria-label="Toggle Menu"
              >
                <span className="material-symbols-outlined text-[24px]">
                  {isMobileMenuOpen ? "close" : "menu"}
                </span>
              </button>
            </div>
          </>
        )}
      </div>

      {!isTransactional && isMobileMenuOpen && (
        <nav className="absolute top-full left-0 flex w-full flex-col border-[#222222] border-b-4 bg-surface shadow-hard md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={clsx(
                "border-[#222222] border-b-2 border-dashed p-5 font-headline-lg-mobile text-headline-lg-mobile uppercase transition-colors last:border-b-0",
                pathname === link.href
                  ? "bg-primary-container text-white"
                  : "text-on-surface hover:bg-surface-variant",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
