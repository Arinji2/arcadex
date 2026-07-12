"use client";

import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginAction } from "@/app/register/login.action";
import type { Registration } from "@/lib/types";

export default function PubgRegister() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [teamSize, setTeamSize] = useState<number>(4);

  const [formData, setFormData] = useState({
    fullName: "",
    collegeName: "",
    mobileNo: "",
    discordId: "",
    email: "",
    ign1: "",
    ign2: "",
    ign3: "",
    ign4: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setLoading(true);

    const igns = [formData.ign1];
    if (teamSize >= 2) igns.push(formData.ign2);
    if (teamSize >= 3) igns.push(formData.ign3);
    if (teamSize >= 4) igns.push(formData.ign4);

    const registrationData: Registration = {
      name: formData.fullName,
      email: formData.email,
      mobile_num: formData.mobileNo,
      discord_id: formData.discordId ?? "",
      college_name: formData.collegeName,
      games: [],
      payment_status: "pending",
      verified: false,
      is_pubg: true,
      pubg_igns: igns,
    };

    await LoginAction({ registrationData });
    router.push("/pay");
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-4xl grow flex-col items-center justify-center space-y-8 px-container-margin py-12">
      <header className="relative z-10 mb-4 w-full text-center">
        <div className="-skew-x-6 mb-4 inline-block transform border-thick bg-tertiary-fixed px-8 py-4 shadow-hard">
          <h1 className="m-0 font-headline-xl text-headline-lg-mobile text-on-tertiary-fixed uppercase md:text-headline-xl">
            PUBG REGISTRATION
          </h1>
        </div>
        <p className="mt-4 font-headline-lg-mobile text-headline-lg-mobile text-primary">
          ARCADEX SQUAD TOURNAMENT
        </p>
      </header>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 w-full space-y-8 border-thick bg-surface p-6 shadow-hard md:p-10"
      >
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          {/* Squad Lead Details */}
          <div className="flex flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor="fullName"
            >
              Squad Leader Name <span className="text-primary">*</span>
            </label>
            <input
              required
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id="fullName"
              placeholder="e.g. John Doe"
              type="text"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor="collegeName"
            >
              College Name <span className="text-primary">*</span>
            </label>
            <input
              required
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id="collegeName"
              placeholder="e.g. DYPSST"
              type="text"
              value={formData.collegeName}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor="mobileNo"
            >
              Mobile No <span className="text-primary">*</span>
            </label>
            <input
              required
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id="mobileNo"
              placeholder="e.g. 9876543210"
              type="tel"
              value={formData.mobileNo}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor="discordId"
            >
              Discord ID (Optional)
            </label>
            <input
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id="discordId"
              placeholder="e.g. JohnDoe"
              type="text"
              value={formData.discordId}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex w-full flex-col gap-6 border-thick border-dashed bg-surface-container-high p-6">
          <h3 className="flex items-center gap-2 font-headline-lg-mobile text-headline-lg-mobile text-on-surface-variant uppercase">
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              contact_mail
            </span>
            Contact Details
          </h3>
          <div className="flex flex-col space-y-2">
            <label
              className="font-label-bold text-label-bold text-on-surface uppercase"
              htmlFor="email"
            >
              Email <span className="text-primary">*</span>
            </label>
            <input
              required
              className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
              id="email"
              type="email"
              placeholder="johndoe@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col space-y-6 border-[#222222] border-t-4 border-dashed pt-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <p className="font-headline-lg text-headline-lg text-on-surface-variant uppercase leading-tight">
              Squad Details
            </p>
            <div className="flex items-center gap-2">
              <label className="font-label-bold text-label-bold uppercase">
                Team Size:
                <select
                  className="cursor-pointer border-thick bg-white p-2 font-label-bold outline-none"
                  value={teamSize}
                  onChange={(e) => setTeamSize(Number(e.target.value))}
                >
                  <option value={1}>Solo (1)</option>
                  <option value={2}>Duo (2)</option>
                  <option value={3}>Trio (3)</option>
                  <option value={4}>Squad (4)</option>
                </select>
              </label>
            </div>
          </div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <div className="flex flex-col space-y-2">
              <label
                className="font-label-bold text-label-bold text-on-surface uppercase"
                htmlFor="ign1"
              >
                Player 1 IGN (Leader) <span className="text-primary">*</span>
              </label>
              <input
                required
                className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
                id="ign1"
                type="text"
                placeholder="IGN"
                value={formData.ign1}
                onChange={handleInputChange}
              />
            </div>
            {teamSize >= 2 && (
              <div className="flex flex-col space-y-2">
                <label
                  className="font-label-bold text-label-bold text-on-surface uppercase"
                  htmlFor="ign2"
                >
                  Player 2 IGN <span className="text-primary">*</span>
                </label>
                <input
                  required
                  className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
                  id="ign2"
                  type="text"
                  placeholder="IGN"
                  value={formData.ign2}
                  onChange={handleInputChange}
                />
              </div>
            )}
            {teamSize >= 3 && (
              <div className="flex flex-col space-y-2">
                <label
                  className="font-label-bold text-label-bold text-on-surface uppercase"
                  htmlFor="ign3"
                >
                  Player 3 IGN <span className="text-primary">*</span>
                </label>
                <input
                  required
                  className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
                  id="ign3"
                  type="text"
                  placeholder="IGN"
                  value={formData.ign3}
                  onChange={handleInputChange}
                />
              </div>
            )}
            {teamSize >= 4 && (
              <div className="flex flex-col space-y-2">
                <label
                  className="font-label-bold text-label-bold text-on-surface uppercase"
                  htmlFor="ign4"
                >
                  Player 4 IGN <span className="text-primary">*</span>
                </label>
                <input
                  required
                  className="w-full border-thick bg-white p-3 font-body-md text-body-md text-on-surface transition-all focus:shadow-[4px_4px_0px_0px_#be000c] focus:outline-none"
                  id="ign4"
                  type="text"
                  placeholder="IGN"
                  value={formData.ign4}
                  onChange={handleInputChange}
                />
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center space-y-6 border-[#222222] border-t-4 border-dashed pt-8">
          <p className="font-headline-lg text-headline-lg text-on-surface-variant leading-tight">
            TOTAL ₹200
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center space-y-6 border-[#222222] border-t-4 border-dashed pt-8">
          <label className="group flex max-w-2xl cursor-pointer items-start gap-4">
            <div className="relative mt-1 shrink-0">
              <input type="checkbox" required className="peer sr-only" />
              <div className="flex h-8 w-8 items-center justify-center border-thick bg-white transition-colors peer-checked:bg-primary">
                <span className="material-symbols-outlined font-bold text-white opacity-0 peer-checked:opacity-100">
                  check
                </span>
              </div>
            </div>
            <span className="font-body-md text-body-md text-on-surface-variant leading-tight">
              I confirm that I am ready to crash out. I accept the{" "}
              <a
                href="/rules"
                className="font-bold text-primary underline hover:text-primary-container"
              >
                Terms of Play
              </a>{" "}
              and understand whining about lag is strictly prohibited.
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={clsx(
              "w-full border-thick bg-primary px-12 py-4 font-headline-lg-mobile text-headline-lg-mobile text-white uppercase transition-all duration-200 md:w-auto",
              loading
                ? "translate-x-1 translate-y-1 cursor-not-allowed opacity-70"
                : "shadow-hard hover:translate-x-1 hover:translate-y-1 hover:shadow-none",
            )}
          >
            {loading ? "PROCESSING..." : "GO TO PAYMENT"}
          </button>
        </div>
      </form>
    </div>
  );
}
