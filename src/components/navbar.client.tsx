"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const pathname = usePathname();
  const { items, setSidebarOpen } = useCart();

  const isTransactional = pathname.includes("/register");

  const navLinks = [
    { label: "Levels", href: "/" },
    { label: "Games", href: "/games" },
    { label: "Rules", href: "/rules" },
    { label: "Register", href: "/register" },
  ];

  return (
    <header className="w-full top-0 sticky border-b-[4px] border-[#222222] shadow-[0px_4px_0px_0px_rgba(186,26,26,1)] bg-surface dark:bg-surface-dim z-50">
      <div
        className={clsx(
          "flex items-center w-full px-container-margin h-20 max-w-7xl mx-auto",
          isTransactional ? "justify-center" : "justify-between",
        )}
      >
        <Link href="/" className="flex flex-col group">
          {!isTransactional && (
            <span className="font-label-bold text-label-bold text-on-surface-variant uppercase mb-[-4px]">
              DYPSST IEEE SB presents
            </span>
          )}
          <span className="font-headline-lg text-headline-lg text-primary uppercase italic tracking-tighter group-hover:scale-105 transition-transform">
            ArcadeX
          </span>
        </Link>

        {!isTransactional && (
          <>
            <nav className="hidden md:flex gap-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={clsx(
                    "font-headline-lg text-headline-lg uppercase transition-colors",
                    pathname === link.href
                      ? "text-primary border-b-4 border-primary pb-1"
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
              className="interactive-btn relative flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 rounded-lg border-thick shadow-hard font-label-bold text-label-bold uppercase"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shopping_cart
              </span>
              <span className="hidden sm:inline">Cart</span>
              {items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white w-6 h-6 flex items-center justify-center rounded-full border-thick text-xs">
                  {items.length}
                </span>
              )}
            </button>
          </>
        )}
      </div>
    </header>
  );
}
