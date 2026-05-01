import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not your real password)
  },
});

export async function sendTokenEmail({ email, token, plan, expiresAt }) {
  const expireDate = new Date(expiresAt).toLocaleDateString('en-IN', {
    day:   'numeric',
    month: 'long',
    year:  'numeric',
  });

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
</head>
<body style="margin:0;padding:0;background:#060609;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:40px 24px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:32px;">
      <div style="font-size:28px;font-weight:900;letter-spacing:2px;color:white;">
        <span style="color:#00FFB2;">Tool</span>Site
      </div>
      <div style="font-size:12px;color:#6b7280;margin-top:4px;letter-spacing:.1em;text-transform:uppercase;">
        Premium Access Activated
      </div>
    </div>

    <!-- Card -->
    <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(0,255,178,0.20);border-radius:16px;padding:32px;margin-bottom:24px;">
      <div style="color:#00FFB2;font-size:12px;letter-spacing:.12em;text-transform:uppercase;margin-bottom:8px;">
        ✅ Payment Successful
      </div>
      <div style="color:white;font-size:22px;font-weight:700;margin-bottom:20px;">
        Your ${plan.name} is Ready!
      </div>

      <!-- Token Box -->
      <div style="background:#0a0a12;border:1px dashed rgba(0,255,178,0.30);border-radius:12px;padding:20px;text-align:center;margin-bottom:20px;">
        <div style="color:#6b7280;font-size:11px;letter-spacing:.1em;text-transform:uppercase;margin-bottom:8px;">
          Your Access Token
        </div>
        <div style="color:#00FFB2;font-size:22px;font-weight:700;letter-spacing:3px;font-family:'Courier New',monospace;">
          ${token}
        </div>
        <div style="color:#6b7280;font-size:11px;margin-top:8px;">
          Valid until ${expireDate}
        </div>
      </div>

      <!-- Plan Details -->
      <table style="width:100%;border-collapse:collapse;">
        ${[
          ['Plan',         plan.name],
          ['Duration',     `${plan.days} days`],
          ['Generations',  `${plan.requests} per day`],
          ['Expires',      expireDate],
        ].map(([label, value]) => `
          <tr>
            <td style="padding:8px 0;color:#6b7280;font-size:13px;border-bottom:1px solid rgba(255,255,255,0.05);">${label}</td>
            <td style="padding:8px 0;color:white;font-size:13px;font-weight:600;text-align:right;border-bottom:1px solid rgba(255,255,255,0.05);">${value}</td>
          </tr>
        `).join('')}
      </table>
    </div>

    <!-- How to Use -->
    <div style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:12px;padding:20px;margin-bottom:24px;">
      <div style="color:white;font-size:14px;font-weight:700;margin-bottom:12px;">How to Use Your Token</div>
      ${[
        'Go to TooL Void Story Generator',
        'Click "Have a token? Enter here"',
        `Enter your token: <span style="color:#00FFB2;font-family:'Courier New';font-weight:700;">${token}</span>`,
        'Enjoy 5 generations per day!',
      ].map((step, i) => `
        <div style="display:flex;align-items:flex-start;gap:10px;margin-bottom:8px;">
          <div style="width:20px;height:20px;border-radius:50%;background:rgba(0,255,178,0.10);border:1px solid rgba(0,255,178,0.20);display:flex;align-items:center;justify-content:center;flex-shrink:0;color:#00FFB2;font-size:10px;font-weight:700;text-align:center;line-height:20px;">${i+1}</div>
          <div style="color:#9ca3af;font-size:13px;line-height:1.5;">${step}</div>
        </div>
      `).join('')}
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/story"
         style="display:inline-block;background:#00FFB2;color:#000;padding:14px 32px;border-radius:12px;font-weight:700;font-size:14px;text-decoration:none;letter-spacing:.05em;">
        Start Generating Stories ⚡
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;color:#374151;font-size:11px;line-height:1.7;">
      <div>Save this email — your token is here for reference.</div>
      <div>Need help? Reply to this email.</div>
      <div style="margin-top:8px;">© 202 TooL Void · Free tools for creators</div>
    </div>

  </div>
</body>
</html>
  `;

  await transporter.sendMail({
    from:    `"TooL Void" <${process.env.GMAIL_USER}>`,
    to:      email,
    subject: `🔑 Your TooL Void ${plan.name} Token — ${token}`,
    html,
  });
}