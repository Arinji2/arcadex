import type { GameItem } from "@/context/CartContext";
import type { Registration } from "@/lib/types";

type RegistrationEmailProps = Omit<Registration, "games"> & {
  games?: GameItem[];
};

export function registrationConfirmationEmail({
  registrationData,
  whatsappLink,
  websiteUrl,
}: {
  registrationData: RegistrationEmailProps;
  whatsappLink: string;
  websiteUrl: string;
}) {
  const { name, is_pubg } = registrationData;
  const gamesTotal = registrationData.games ? registrationData.games.length : 0;
  const amountPaid = is_pubg
    ? 200
    : gamesTotal >= 4
      ? gamesTotal * 50
      : gamesTotal * 60;

  return `
<body
  style="
    margin:0;
    padding:32px;
    background:#fff8f7;
    font-family:Arial,Helvetica,sans-serif;
    color:#291715;
  "
>
  <table
    align="center"
    cellpadding="0"
    cellspacing="0"
    width="100%"
    style="
      max-width:680px;
      margin:auto;
      background:#ffffff;
      border:1px solid #e7bdb7;
      border-radius:18px;
      overflow:hidden;
      box-shadow:0 12px 30px rgba(0,0,0,.08);
    "
  >
    <tr>
      <td
        style="
          background:#be000c;
          background:linear-gradient(135deg,#be000c,#e52521);
          text-align:center;
          padding:42px 32px;
        "
      >
        <img
          src="cid:ieee-logo"
          alt="IEEE DYPSST"
          width="110"
          height="110"
          style="
            display:block;
            margin:0 auto 22px;
            border-radius:50%;
            border:4px solid rgba(255,255,255,.2);
          "
        />

        <div
          style="
            color:white;
            font-size:38px;
            font-weight:800;
            letter-spacing:-1px;
          "
        >
          ArcadeX
        </div>

        <div
          style="
            color:#ffdad5;
            margin-top:8px;
            font-size:16px;
          "
        >
          Registration Confirmed
        </div>
      </td>
    </tr>

    <tr>
      <td style="padding:40px;">
        <h2
          style="
            margin:0;
            font-size:28px;
            color:#291715;
          "
        >
          Hi ${name},
        </h2>

        <p
          style="
            margin-top:18px;
            font-size:16px;
            line-height:1.8;
            color:#5d3f3b;
          "
        >
          Thank you for registering for
          <strong style="color:#be000c;">ArcadeX</strong>!
          <br /><br />
          Your registration has been successfully confirmed.
          We can't wait to see you compete and have an amazing time.
        </p>

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            margin:34px 0;
            background:#fff0ee;
            border:1px solid #ffb4aa;
            border-radius:14px;
          "
        >
          <tr>
            <td style="padding:24px;">
              <div
                style="
                  font-size:14px;
                  color:#926f6a;
                  text-transform:uppercase;
                  letter-spacing:1px;
                "
              >
                Amount Paid
              </div>

              <div
                style="
                  margin-top:10px;
                  color:#be000c;
                  font-size:42px;
                  font-weight:bold;
                "
              >
                ₹${amountPaid.toFixed(2)}
              </div>

              <div
                style="
                  margin-top:10px;
                  color:#5d3f3b;
                  font-size:14px;
                "
              >
                Payment received successfully.
              </div>
            </td>
          </tr>
        </table>

        <h3
          style="
            margin-bottom:18px;
            color:#291715;
            font-size:22px;
          "
        >
          ${is_pubg ? "PUBG Squad Details" : "Registered Games"}
        </h3>

        ${
          is_pubg
            ? `
        <table
          width="100%"
          cellpadding="14"
          cellspacing="0"
          style="
            border-collapse:collapse;
            border:1px solid #e7bdb7;
            border-radius:12px;
            overflow:hidden;
          "
        >
          <tr
            style="
              background:#be000c;
              color:white;
            "
          >
            <th align="left">Player</th>
            <th align="left">IGN</th>
          </tr>

          ${(registrationData.pubg_igns || [])
            .map(
              (ign, idx) => `
              <tr style="background:#ffffff;">
                <td style="border-top:1px solid #f4d3ce;font-weight:600;">
                  Player ${idx + 1}
                </td>
                <td style="border-top:1px solid #f4d3ce;">
                  ${ign}
                </td>
              </tr>
            `,
            )
            .join("")}
        </table>
        `
            : `
        <table
          width="100%"
          cellpadding="14"
          cellspacing="0"
          style="
            border-collapse:collapse;
            border:1px solid #e7bdb7;
            border-radius:12px;
            overflow:hidden;
          "
        >
          <tr
            style="
              background:#be000c;
              color:white;
            "
          >
            <th align="left">Game</th>
            <th align="left">Date</th>
            <th align="left">Time</th>
          </tr>

          ${(registrationData.games || [])
            .map(
              (game) => `
              <tr style="background:#ffffff;">
                <td style="border-top:1px solid #f4d3ce;font-weight:600;">
                  ${game.title}
                </td>

                <td style="border-top:1px solid #f4d3ce;">
                  ${game.date}
                </td>

                <td style="border-top:1px solid #f4d3ce;">
                  ${game.time}
                </td>
              </tr>
            `,
            )
            .join("")}
        </table>
        `
        }

        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          style="
            margin-top:36px;
            background:#ffe9e6;
            border-left:6px solid #be000c;
            border-radius:12px;
          "
        >
          <tr>
            <td style="padding:24px;">
              <div
                style="
                  font-size:20px;
                  font-weight:bold;
                  color:#291715;
                  margin-bottom:18px;
                "
              >
                Before the Event
              </div>

              <ol
                style="
                  margin:0;
                  padding-left:20px;
                  color:#5d3f3b;
                  line-height:2;
                "
              >
                <li>
                  Join our WhatsApp community for announcements and further
                  instructions.
                  <br />
                  <a
                    href="${whatsappLink}"
                    style="
                      color:#be000c;
                      font-weight:bold;
                      text-decoration:none;
                    "
                  >
                    ${whatsappLink}
                  </a>
                </li>

                <li>
                  Please join your game lobby
                  <strong>15 minutes before</strong>
                  your scheduled game time.
                </li>

                <li>
                  Visit our website for tournament rules, schedules and updates.
                  <br />
                  <a
                    href="${websiteUrl}"
                    style="
                      color:#be000c;
                      font-weight:bold;
                      text-decoration:none;
                    "
                  >
                    ${websiteUrl}
                  </a>
                </li>
              </ol>
            </td>
          </tr>
        </table>

        <hr
          style="
            margin:42px 0 30px;
            border:none;
            border-top:1px solid #e7bdb7;
          "
        />

        <div
          style="
            text-align:center;
            color:#926f6a;
            font-size:14px;
            line-height:1.8;
          "
        >
          This is an automated confirmation email from
          <strong style="color:#be000c;">ArcadeX</strong>.
          <br />
          Please keep this email until the event concludes.
        </div>

        <div
          style="
            margin-top:28px;
            text-align:center;
            font-size:28px;
            font-weight:800;
            color:#be000c;
          "
        >
          See you at ArcadeX!
        </div>
      </td>
    </tr>
  </table>
</body>
`;
}
