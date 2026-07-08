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
      {
        header: "Name",
        key: "name",
        width: 25,
      },
      {
        header: "Email",
        key: "email",
        width: 32,
      },
      {
        header: "Mobile",
        key: "mobile",
        width: 18,
      },
      {
        header: "College",
        key: "college",
        width: 30,
      },
      {
        header: "Discord",
        key: "discord",
        width: 24,
      },
      {
        header: "Payment",
        key: "payment",
        width: 12,
      },
      {
        header: "Games",
        key: "games",
        width: 32,
      },
      {
        header: "IGNs",
        key: "igns",
        width: 32,
      },
      {
        header: "Cashfree Order ID",
        key: "cashfree",
        width: 34,
      },
    ];

    sheet.getRow(1).font = {
      bold: true,
      color: {
        argb: "FFFFFFFF",
      },
    };

    sheet.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: {
        argb: "FFBE000C",
      },
    };

    sheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];

    rows.forEach((registration) => {
      sheet.addRow({
        name: registration.name,
        email: registration.email,
        mobile: registration.mobile_num,
        college: registration.college_name,
        discord: registration.discord_id,
        payment: registration.payment_status,
        games: registration.games.map((g) => g.game_id).join(", "),
        igns: registration.games.map((g) => g.ign).join(", "),
        cashfree: registration.cash_free_order_id ?? "",
      });
    });

    sheet.eachRow((row) => {
      row.alignment = {
        vertical: "middle",
      };
    });

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(new Blob([buffer]), filename);
  }

  async function exportAll() {
    await downloadWorkbook(registrations, "registrations.xlsx");
  }

  async function exportPaid() {
    await downloadWorkbook(
      registrations.filter((r) => r.payment_status === "paid"),
      "paid.xlsx",
    );
  }

  async function exportPending() {
    await downloadWorkbook(
      registrations.filter((r) => r.payment_status === "pending"),
      "pending.xlsx",
    );
  }

  async function exportGame(gameId: string) {
    const workbook = new ExcelJS.Workbook();

    const sheet = workbook.addWorksheet(gameId);

    sheet.columns = [
      { header: "Name", key: "name", width: 25 },
      { header: "Email", key: "email", width: 30 },
      { header: "Mobile", key: "mobile", width: 18 },
      { header: "College", key: "college", width: 30 },
      { header: "Discord", key: "discord", width: 22 },
      { header: "IGN", key: "ign", width: 24 },
      { header: "Payment", key: "payment", width: 12 },
    ];

    registrations
      .filter((r) => r.games.some((g) => g.game_id === gameId))
      .forEach((registration) => {
        const game = registration.games.find((g) => g.game_id === gameId)!;

        sheet.addRow({
          name: registration.name,
          email: registration.email,
          mobile: registration.mobile_num,
          college: registration.college_name,
          discord: registration.discord_id,
          ign: game.ign,
          payment: registration.payment_status,
        });
      });

    const buffer = await workbook.xlsx.writeBuffer();

    saveAs(new Blob([buffer]), `${gameId}.xlsx`);
  }

  return (
    <div className="flex flex-wrap gap-3">
      <button
        type="button"
        onClick={exportAll}
        className="rounded-lg bg-primary px-5 py-3 font-medium text-white hover:opacity-90"
      >
        Export All
      </button>

      <button
        type="button"
        onClick={exportPaid}
        className="rounded-lg bg-secondary px-5 py-3 font-medium text-white"
      >
        Paid
      </button>

      <button
        type="button"
        onClick={exportPending}
        className="rounded-lg border border-outline px-5 py-3"
      >
        Pending
      </button>

      {GAMES.filter((game) =>
        registrations.some((r) => r.games.some((g) => g.game_id === game.id)),
      ).map((game) => (
        <button
          type="button"
          key={game.id}
          onClick={() => exportGame(game.id)}
          className="rounded-lg border border-outline px-5 py-3"
        >
          {game.title}
        </button>
      ))}
    </div>
  );
}
