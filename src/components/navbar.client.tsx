"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { items, setSidebarOpen, jiggle } = useCart();

  const isTransactional = pathname.includes("/register");

  const navLinks = [
    { label: "Levels", href: "/" },
    { label: "Games", href: "/games" },
    { label: "Rules", href: "/rules" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-[#222222] border-b-4 bg-surface shadow-[0px_4px_0px_0px_rgba(186,26,26,1)] dark:bg-surface-dim">
      <div
        className={clsx(
          "mx-auto flex h-20 w-full max-w-7xl items-center px-container-margin",
          isTransactional ? "justify-between" : "justify-between",
        )}
      >
        <Link href="/" className="group flex flex-col">
          <span className="-mb-1 font-label-bold text-label-bold text-on-surface-variant uppercase">
            DYPSST IEEE SB presents
          </span>
          <span className="font-headline-lg text-headline-lg text-primary uppercase italic tracking-tighter transition-transform group-hover:scale-105">
            ArcadeX
          </span>
        </Link>

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
      </div>
    </header>
  );
}
