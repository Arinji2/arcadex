"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <footer className="mt-auto flex w-full flex-col items-center justify-between gap-4 border-[#222222] border-t-8 bg-on-background px-container-margin py-10 md:flex-row">
      <div className="font-headline-xl text-headline-xl text-primary uppercase tracking-tighter">
        ArcadeX
      </div>
      <div className="flex h-fit w-fit flex-col items-center justify-center gap-2">
        <div className="font-body-sm text-body-sm text-surface-container-highest">
          © 2026 ArcadeX | JULY 19 - JULY 25
        </div>
        <Link
          target="_blank"
          className="font-body-md text-body-md text-surface-container-highest underline"
          href="https://www.arinji.com"
        >
          Made with ❤ by Arinji
        </Link>
      </div>
      <nav className="flex flex-wrap justify-center gap-6 font-label-bold text-label-bold">
        <Link
          className="text-surface-variant transition-all duration-200 hover:scale-105 hover:text-primary-fixed-dim"
          href="/rules"
        >
          Terms of Play
        </Link>
        <Link
          className="text-surface-variant transition-all duration-200 hover:scale-105 hover:text-primary-fixed-dim"
          href={`${pathname}?luigi=true`}
          scroll={false}
        >
          Contact Luigi
        </Link>
        <Link
          className="text-surface-variant transition-all duration-200 hover:scale-105 hover:text-primary-fixed-dim"
          href={"https://github.com/Arinji2/arcadex"}
          target="_blank"
          scroll={false}
        >
          GitHub
        </Link>
      </nav>
    </footer>
  );
}
