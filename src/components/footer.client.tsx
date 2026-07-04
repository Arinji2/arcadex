import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t-[8px] border-[#222222] bg-on-background flex flex-col md:flex-row justify-between items-center px-container-margin py-10 gap-4 mt-auto">
      <div className="text-primary font-headline-xl text-headline-xl uppercase tracking-tighter">
        ArcadeX
      </div>
      <div className="font-body-sm text-body-sm text-surface-container-highest">
        © 2024 ArcadeX | JULY 19 - JULY 25
      </div>
      <nav className="flex flex-wrap justify-center gap-6 font-label-bold text-label-bold">
        <Link
          className="text-surface-variant hover:text-primary-fixed-dim hover:scale-105 transition-all duration-200"
          href="#"
        >
          Privacy Warp
        </Link>
        <Link
          className="text-surface-variant hover:text-primary-fixed-dim hover:scale-105 transition-all duration-200"
          href="/rules"
        >
          Terms of Play
        </Link>
        <Link
          className="text-surface-variant hover:text-primary-fixed-dim hover:scale-105 transition-all duration-200"
          href="#"
        >
          Contact Luigi
        </Link>
      </nav>
    </footer>
  );
}
