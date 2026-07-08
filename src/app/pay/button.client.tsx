"use client";

import { clsx } from "clsx";
import { useRef, useState } from "react";
import { EmailAction } from "./email.action";
import { PayAction } from "./pay.action";

// Native browser compression using Canvas
const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(file);

        const MAX_SIZE = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height && width > MAX_SIZE) {
          height *= MAX_SIZE / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width *= MAX_SIZE / height;
          height = MAX_SIZE;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Compress to JPEG at 70% quality
        canvas.toBlob(
          (blob) => {
            if (!blob) return resolve(file);
            const compressedFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".jpg"),
              { type: "image/jpeg" },
            );
            resolve(compressedFile);
          },
          "image/jpeg",
          0.7,
        );
      };
      img.onerror = (e) => reject(e);
    };
    reader.onerror = (e) => reject(e);
  });
};

export default function PayForm() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  // Explicitly calculate boolean to avoid React 19 hydration mismatch on forms
  const isDisabled = loading || file === null;

  return (
    <form
      action={async (formData) => {
        setLoading(true);
        const originalFile = formData.get("screenshot") as File;
        if (originalFile && originalFile.size > 0) {
          const compressedFile = await compressImage(originalFile);
          formData.set("screenshot", compressedFile);
        }
        await PayAction(formData);
        await EmailAction();
      }}
      className="flex w-full flex-col gap-4"
    >
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="screenshot"
          className="flex items-center gap-1 font-label-bold text-[12px] text-on-surface-variant uppercase"
        >
          Upload Screenshot <span className="text-error">*</span>
        </label>

        <input
          id="screenshot"
          type="file"
          name="screenshot"
          accept="image/*"
          required
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-between border-thick bg-white px-3 py-2 transition-all hover:bg-surface-variant focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
        >
          <span
            className={clsx(
              "max-w-50 truncate font-body-sm",
              file ? "text-on-background" : "text-outline",
            )}
          >
            {file ? file.name : "Select image..."}
          </span>
          <span className="material-symbols-outlined text-[20px] text-primary">
            {file ? "check_circle" : "upload_file"}
          </span>
        </button>
      </div>

      <button
        type="submit"
        suppressHydrationWarning
        disabled={isDisabled ? true : undefined}
        className={clsx(
          "interactive-btn mt-2 flex w-full items-center justify-center gap-2 border-thick bg-primary px-6 py-3 font-headline-lg-mobile text-white text-xl uppercase transition-all duration-200",
          isDisabled
            ? "translate-x-1 translate-y-1 cursor-not-allowed opacity-70 shadow-none"
            : "shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
        )}
      >
        {loading ? (
          <>
            <span className="material-symbols-outlined animate-spin text-[24px]">
              refresh
            </span>
            UPLOADING...
          </>
        ) : (
          <>
            <span
              className="material-symbols-outlined text-[24px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              task_alt
            </span>
            I HAVE PAID
          </>
        )}
      </button>
    </form>
  );
}
