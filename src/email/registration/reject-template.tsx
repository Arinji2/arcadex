export function registrationRejectionEmail({
  name,
  websiteUrl,
}: {
  name: string;
  websiteUrl: string;
}) {
  return `
<body style="margin:0;padding:32px;background:#fff8f7;font-family:Arial,sans-serif;color:#291715;">
  <table align="center" width="100%" style="max-width:680px;margin:auto;background:#ffffff;border:1px solid #e7bdb7;border-radius:18px;overflow:hidden;box-shadow:0 12px 30px rgba(0,0,0,.08);">
    <tr>
      <td style="background:#222;text-align:center;padding:42px 32px;">
        <div style="color:white;font-size:38px;font-weight:800;letter-spacing:-1px;">ArcadeX</div>
        <div style="color:#ffb4aa;margin-top:8px;font-size:16px;">Action Required</div>
      </td>
    </tr>
    <tr>
      <td style="padding:40px;">
        <h2 style="margin:0;font-size:28px;color:#291715;">Hi ${name},</h2>
        <p style="margin-top:18px;font-size:16px;line-height:1.8;color:#5d3f3b;">
          We recently reviewed your registration for <strong style="color:#be000c;">ArcadeX</strong>. Unfortunately, we were <strong>unable to verify your payment screenshot</strong>.
        </p>
        <p style="margin-top:18px;font-size:16px;line-height:1.8;color:#5d3f3b;">
          As a result, your registration has been canceled and your data has been securely removed from our system.
        </p>
        <table width="100%" style="margin:34px 0;background:#fff0ee;border:1px solid #ffb4aa;border-radius:14px;">
          <tr>
            <td style="padding:24px;">
              <div style="font-size:16px;font-weight:bold;color:#be000c;margin-bottom:10px;">What's next?</div>
              <ul style="margin:0;padding-left:20px;color:#5d3f3b;line-height:1.8;">
                <li>If you did complete the payment but uploaded the wrong screenshot, please re-register at <a href="${websiteUrl}" style="color:#be000c;font-weight:bold;">${websiteUrl}</a>.</li>
                <li>If you believe this is an error and the payment was debited, please reply directly to this email with your transaction ID and a valid screenshot.</li>
              </ul>
            </td>
          </tr>
        </table>
        <div style="margin-top:28px;text-align:center;font-size:20px;font-weight:800;color:#291715;">
          We hope to see you in the tournament!
        </div>
      </td>
    </tr>
  </table>
</body>
  `;
}
