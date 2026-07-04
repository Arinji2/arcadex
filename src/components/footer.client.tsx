import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto flex w-full flex-col items-center justify-between gap-4 border-[#222222] border-t-8 bg-on-background px-container-margin py-10 md:flex-row">
      <div className="font-headline-xl text-headline-xl text-primary uppercase tracking-tighter">
        ArcadeX
      </div>
      <div className="font-body-sm text-body-sm text-surface-container-highest">
        © 2024 ArcadeX | JULY 19 - JULY 25
      </div>
      <nav className="flex flex-wrap justify-center gap-6 font-label-bold text-label-bold">
        <Link
          className="text-surface-variant transition-all duration-200 hover:scale-105 hover:text-primary-fixed-dim"
          href="#"
        >
          Privacy Warp
        </Link>
        <Link
          className="text-surface-variant transition-all duration-200 hover:scale-105 hover:text-primary-fixed-dim"
          href="/rules"
        >
          Terms of Play
        </Link>
        <Link
          className="text-surface-variant transition-all duration-200 hover:scale-105 hover:text-primary-fixed-dim"
          href="#"
        >
          Contact Luigi
        </Link>
      </nav>
    </footer>
  );
}
