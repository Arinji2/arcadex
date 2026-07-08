"use client";

import { clsx } from "clsx";
import { useState } from "react";

export default function UpiIdCopy({ upiId }: { upiId: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(upiId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy UPI ID", err);
    }
  };

  return (
    <div className="flex w-full flex-col gap-1.5">
      <p className="flex items-center gap-1 font-label-bold text-[12px] text-on-surface-variant uppercase">
        UPI ID
        <span className="material-symbols-outlined text-[14px]">
          account_balance_wallet
        </span>
      </p>
      <div className="flex w-full items-stretch border-thick bg-white shadow-sm transition-shadow focus-within:shadow-[4px_4px_0px_0px_#be000c]">
        <div className="flex grow items-center overflow-hidden text-ellipsis whitespace-nowrap px-3 font-body-sm text-body-sm text-on-background">
          {upiId}
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className={clsx(
            "flex shrink-0 items-center gap-1.5 border-[#222] border-l-4 px-3 py-2 font-label-bold text-[12px] uppercase transition-colors",
            copied
              ? "bg-secondary text-white"
              : "bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-container hover:text-white",
          )}
        >
          <span
            className="material-symbols-outlined text-[18px]"
            style={{ fontVariationSettings: copied ? "'FILL' 1" : "'FILL' 0" }}
          >
            {copied ? "check_circle" : "content_copy"}
          </span>
          <span className="hidden sm:inline">
            {copied ? "Copied!" : "Copy"}
          </span>
        </button>
      </div>
    </div>
  );
}
