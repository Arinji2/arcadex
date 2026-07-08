"use client";

import clsx from "clsx";
import { useState } from "react";
import { LoginAction } from "./login.action";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoading(true);

    console.log(password);

    try {
      await LoginAction(password);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-80px)] max-w-lg flex-col items-center justify-center px-container-margin py-12">
      <header className="mb-8 text-center">
        <div className="-skew-x-6 inline-block border-thick bg-primary px-8 py-4 shadow-hard">
          <h1 className="font-headline-xl text-headline-lg-mobile text-white uppercase md:text-headline-xl">
            ADMIN
          </h1>
        </div>

        <p className="mt-4 font-headline-lg-mobile text-headline-lg-mobile text-primary">
          ArcadeX Dashboard
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="w-full space-y-8 border-thick bg-surface p-8 shadow-hard"
      >
        <div className="flex flex-col space-y-2">
          <label
            htmlFor="password"
            className="font-label-bold text-label-bold uppercase"
          >
            Password
          </label>

          <div className="relative">
            <span className="material-symbols-outlined -translate-y-1/2 absolute top-1/2 left-4 text-outline">
              lock
            </span>

            <input
              id="password"
              required
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-thick bg-white py-3 pr-4 pl-14 font-body-md transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={clsx(
            "w-full border-thick bg-primary py-4 font-headline-lg-mobile text-headline-lg-mobile text-white uppercase transition-all",
            loading
              ? "translate-x-1 translate-y-1 cursor-not-allowed opacity-70"
              : "shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
          )}
        >
          {loading ? "AUTHENTICATING..." : "LOGIN"}
        </button>
      </form>
    </main>
  );
}
