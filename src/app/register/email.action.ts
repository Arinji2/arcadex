//This will later change to a api route once cashfreee is integrated
"use server";

import path from "node:path/posix";
import type { GameItem } from "@/context/CartContext";
import { registrationConfirmationEmail } from "@/email/registration/template";
import { GAMES } from "@/games";
import db from "@/lib/db";
import { transporter } from "@/lib/email";
import { getUID } from "@/lib/session";

export async function EmailAction() {
  const { uid, createdCookie } = await getUID();
  if (createdCookie) return;

  const snapshot = await db.registrations.doc(uid).get();
  const registrationData = snapshot.data();

  if (!registrationData) return;

  const gamesFinal: GameItem[] = [];

  registrationData.games.forEach((game) => {
    const gameItem = GAMES.find((item) => item.id === game.game_id);
    if (gameItem) {
      gamesFinal.push({
        ...gameItem,
      });
    }
  });
  console.log(`SENDING EMAIL TO ${registrationData.email}`);
  await transporter.sendMail({
    from: `"ArcadeX" <${process.env.EMAIL_USER}>`,
    to: registrationData.email,
    subject: "ArcadeX Registration Confirmation",
    html: registrationConfirmationEmail({
      registrationData: {
        ...registrationData,
        games: gamesFinal,
      },
      whatsappLink: process.env.NEXT_PUBLIC_WHATSAPP_URL!,
      websiteUrl: process.env.NEXT_PUBLIC_URL!,
    }),
    attachments: [
      {
        filename: "ieee-logo.png",
        path: path.join(process.cwd(), "public", "logo.png"),
        cid: "ieee-logo",
      },
    ],
  });

  return;
}
