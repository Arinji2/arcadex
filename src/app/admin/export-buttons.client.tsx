"use client";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { GAMES } from "@/games";
import type { RegistrationWithId } from "./admin-utils";

type Props = {
  registrations: RegistrationWithId[];
};

export default function ExportButtons({ registrations }: Props) {
  async function downloadWorkbook(
    rows: RegistrationWithId[],
    filename: string,
  ) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "ArcadeX";
    workbook.created = new Date();

    const sheet = workbook.addWorksheet("Registrations");

    sheet.columns = [
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 32 },
      { header: "Mobile", key: "mobile", width: 18 },
      { header: "College", key: "college", width: 30 },
      { header: "Discord", key: "discord", width: 24 },
      { header: "Payment", key: "payment", width: 12 },
      { header: "Games", key: "games", width: 32 },
      { header: "IGNs", key: "igns", width: 32 },
    ];

    sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFBE000C" },
    };
    sheet.views = [{ state: "frozen", ySplit: 1 }];

    rows.forEach((registration) => {
      sheet.addRow({
        name: registration.name || "Unknown",
        email: registration.email || "-",
        mobile: registration.mobile_num || "-",
        college: registration.college_name || "-",
        discord: registration.discord_id || "-",
        payment: registration.verified
          ? "Verified"
          : registration.payment_status,
        games: registration.is_pubg
          ? "PUBG Squad"
          : (registration.games || []).map((g) => g.game_id).join(", "),
        igns: registration.is_pubg
          ? (registration.pubg_igns || []).join(", ")
          : (registration.games || []).map((g) => g.ign || "-").join(", "),
      });
    });

    sheet.eachRow((row) => {
      row.alignment = { vertical: "middle" };
    });
    const buffer = await workbook.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), filename);
  }

  async function exportGame(gameId: string) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = "ArcadeX";
    workbook.created = new Date();
    const sheet = workbook.addWorksheet(gameId);

    if (gameId === "PUBG") {
      sheet.columns = [
        { header: "Name (Lead)", key: "name", width: 25 },
        { header: "Email", key: "email", width: 30 },
        { header: "Mobile", key: "mobile", width: 18 },
        { header: "College", key: "college", width: 30 },
        { header: "Discord", key: "discord", width: 22 },
        { header: "IGN 1", key: "ign1", width: 24 },
        { header: "IGN 2", key: "ign2", width: 24 },
        { header: "IGN 3", key: "ign3", width: 24 },
        { header: "IGN 4", key: "ign4", width: 24 },
      ];

      sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      sheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFBE000C" },
      };
      sheet.views = [{ state: "frozen", ySplit: 1 }];

      const gameRegistrations = registrations.filter(
        (r) => r.verified && r.is_pubg,
      );
      gameRegistrations.forEach((registration) => {
        sheet.addRow({
          name: registration.name || "Unknown",
          email: registration.email || "-",
          mobile: registration.mobile_num || "-",
          college: registration.college_name || "-",
          discord: registration.discord_id || "-",
          ign1: registration.pubg_igns?.[0] || "-",
          ign2: registration.pubg_igns?.[1] || "-",
          ign3: registration.pubg_igns?.[2] || "-",
          ign4: registration.pubg_igns?.[3] || "-",
        });
      });
    } else {
      sheet.columns = [
        { header: "Name", key: "name", width: 25 },
        { header: "Email", key: "email", width: 30 },
        { header: "Mobile", key: "mobile", width: 18 },
        { header: "College", key: "college", width: 30 },
        { header: "Discord", key: "discord", width: 22 },
        { header: "IGN", key: "ign", width: 24 },
      ];

      sheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
      sheet.getRow(1).fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FFBE000C" },
      };
      sheet.views = [{ state: "frozen", ySplit: 1 }];

      const gameRegistrations = registrations.filter(
        (r) =>
          r.verified &&
          !r.is_pubg &&
          (r.games || []).some((g) => g.game_id === gameId),
      );

      gameRegistrations.forEach((registration) => {
        const game = (registration.games || []).find(
          (g) => g.game_id === gameId,
        );

        sheet.addRow({
          name: registration.name || "Unknown",
          email: registration.email || "-",
          mobile: registration.mobile_num || "-",
          college: registration.college_name || "-",
          discord: registration.discord_id || "-",
          ign: game?.ign || "-",
        });
      });
    }

    sheet.eachRow((row) => {
      row.alignment = { vertical: "middle" };
    });
    const buffer = await workbook.xlsx.writeBuffer();

    const gameInfo =
      gameId === "PUBG"
        ? { title: "PUBG" }
        : GAMES.find((g) => g.id === gameId);
    const safeTitle = (gameInfo?.title || gameId).replace(/[^a-zA-Z0-9]/g, "");

    saveAs(new Blob([buffer]), `ArcadeX_${safeTitle}_Roster.xlsx`);
  }

  async function exportAll() {
    await downloadWorkbook(registrations, "registrations_all.xlsx");
  }
  async function exportVerified() {
    await downloadWorkbook(
      registrations.filter((r) => r.verified),
      "registrations_verified.xlsx",
    );
  }

  const verifiedGameIds = new Set(
    registrations
      .filter((r) => r.verified)
      .flatMap((r) => {
        if (r.is_pubg) return ["PUBG"];
        return (r.games || []).map((g) => g.game_id);
      }),
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={exportAll}
          className="hover:-translate-y-1 rounded border-2 border-[#222] bg-white px-4 py-2 font-label-bold uppercase shadow-sm transition-transform hover:shadow-hard"
        >
          Export All
        </button>

        <button
          type="button"
          onClick={exportVerified}
          className="hover:-translate-y-1 rounded border-2 border-[#222] bg-secondary-container px-4 py-2 font-label-bold text-on-secondary-container uppercase shadow-sm transition-transform hover:shadow-hard"
        >
          Export Verified
        </button>
      </div>

      {verifiedGameIds.size > 0 && (
        <div className="mt-2 flex flex-col gap-3 border-[#222] border-t-2 border-dashed pt-4">
          <span className="font-label-bold text-outline text-sm uppercase">
            Rosters (Verified Users Only):
          </span>
          <div className="flex flex-wrap gap-2">
            {Array.from(verifiedGameIds).map((gameId) => {
              const title =
                gameId === "PUBG"
                  ? "PUBG"
                  : GAMES.find((g) => g.id === gameId)?.title || gameId;
              return (
                <button
                  key={gameId}
                  type="button"
                  onClick={() => exportGame(gameId)}
                  className="hover:-translate-y-1 rounded border-2 border-[#222] bg-surface px-3 py-1.5 font-label-bold text-sm uppercase shadow-sm transition-transform hover:bg-surface-container-highest hover:shadow-hard"
                >
                  {title}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
