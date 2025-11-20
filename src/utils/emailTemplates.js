export function passwordResetTemplate({ name, resetLink }) {
  return `
 <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Reset Your Haaflah Password</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    body { 
      margin: 0; 
      padding: 0; 
      background-color: #f8fafc; 
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 32px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
      padding: 40px 24px;
      text-align: center;
      color: white;
    }
    .logo {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      border-radius: 16px;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 28px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 12px 0 0;
      opacity: 0.9;
      font-size: 16px;
    }
    .content {
      padding: 40px 32px;
      color: #334155;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1e293b;
    }
    .message {
      font-size: 16px;
      color: #475569;
      margin-bottom: 32px;
    }
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
      color: white;
      padding: 14px 32px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
      transition: all 0.2s;
    }
    .security-note {
      background: #f1f5f9;
      padding: 20px;
      border-radius: 12px;
      font-size: 14px;
      color: #64748b;
      margin: 24px 0;
      border-left: 4px solid #7c3aed;
    }
    .footer {
      background: #f8fafc;
      padding: 32px;
      text-align: center;
      color: #94a3b8;
      font-size: 14px;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #7c3aed;
      text-decoration: none;
    }
    @media (max-width: 480px) {
      .container { margin: 16px; border-radius: 12px; }
      .content { padding: 32px 24px; }
      .header { padding: 32px 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">H</div>
      <h1>Password Reset</h1>
      <p>Secure your Haaflah account</p>
    </div>
    
    <div class="content">
      <div class="greeting">Hi ${name},</div>
      <div class="message">
        We received a request to reset your Haaflah password. Click the button below to create a new one.
      </div>
      
      <div class="button-container">
        <a href="${resetLink}" class="button">Reset Your Password</a>
      </div>
      
      <div class="security-note">
        <strong>This link expires in 1 hour</strong> for your security. If you didn't request this password reset, please ignore this email or contact us immediately.
      </div>
      
      <p>Thanks,<br><strong>The Haaflah Team</strong></p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} Haaflah. All rights reserved.</p>
      <p><a href="https://haaflah.com">haaflah.com</a> • <a href="#">Help Center</a></p>
    </div>
  </div>


</body>

</html>
  `;
}

export function welcomeEmailTemplate({ name }) {
  return `
 
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to Haaflah!</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 32px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
      padding: 40px 24px;
      text-align: center;
      color: white;
    }
    .logo {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      border-radius: 16px;
      background: rgba(egde,255,255,0.2);
      backdrop-filter: blur(10px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 28px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 12px 0 0;
      opacity: 0.9;
      font-size: 16px;
    }
    .content {
      padding: 40px 32px;
      color: #334155;
      text-align: center;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1e293b;
    }
    .message {
      font-size: 16px;
      color: #475569;
      margin-bottom: 32px;
    }
    .features {
      background: #f8fafc;
      padding: 24px;
      border-radius: 12px;
      margin: 32px 0;
      text-align: left;
      border: 1px solid #e2e8f0;
    }
    .features ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .features li {
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
      font-size: 15px;
      color: #334155;
    }
    .features li:last-child {
      border-bottom: none;
    }
    .features li::before {
      content: "✓";
      color: #7c3aed;
      font-weight: bold;
      margin-right: 12px;
    }
    .button-container {
      text-align: center;
      margin: 40px 0 32px;
    }
    .button {
      display: inline-block;
      background: linear-gradient(135deg, #7c3aed 0%, #5b21b6 100%);
      color: white;
      padding: 14px 32px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
      transition: all 0.2s;
    }
    .footer {
      background: #f8fafc;
      padding: 32px;
      text-align: center;
      color: #94a3b8;
      font-size: 14px;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #7c3aed;
      text-decoration: none;
    }
    @media (max-width: 480px) {
      .container { margin: 16px; border-radius: 12px; }
      .content { padding: 32px 24px; }
      .header { padding: 32px 20px; }
      .features { padding: 20px; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">H</div>
      <h1>Welcome to Haaflah</h1>
      <p>Your journey to better events starts now</p>
    </div>
    
    <div class="content">
      <div class="greeting">Hey ${name}!</div>
      <div class="message">
        Welcome to <strong>Haaflah</strong> — the all-in-one platform to create, manage, and enjoy unforgettable events.
      </div>

      <div class="features">
        <ul>
          <li>Create beautiful event pages in minutes — no coding needed</li>
          <li>Check in attendees instantly with Face ID recognition</li>
          <li>Go live with built-in streaming for virtual participants</li>
        </ul>
      </div>

      <div class="button-container">
        <a href="${process.env.FRONTEND_URL}/dashboard" class="button">
          Go to Your Dashboard
        </a>
      </div>

      <p style="margin-top: 32px; color: #64748b;">
        We’re thrilled to have you on board. Your first event is waiting to be created!
      </p>

      <p style="margin-top: 32px;">
        Let’s make something amazing,<br>
        <strong>The Haaflah Team</strong>
      </p>
    </div>
    
    <div class="footer">
      <p>© ${new Date().getFullYear()} Haaflah. All rights reserved.</p>
      <p>
        <a href="https://haaflah.vercel.app">haaflah.com</a> • 
        <a href="https://haaflah.vercel.app">Help Center</a> • 
        <a href="https://haaflah.vercel.app">Contact Us</a>
      </p>
    </div>
  </div>
</body>
</html>

  `;
}

export function registrationConfirmationTemplate({
  name,
  eventName,
  eventDate,
  eventVenue,
  ticketNumber,
}) {
  const formattedDate = new Date(eventDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>You’re Confirmed! • ${eventName}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
    }
    .container {
      max-width: 600px;
      margin: 32px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.08);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      padding: 40px 24px;
      text-align: center;
      color: white;
    }
    .logo {
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      border-radius: 16px;
      background: rgba(255,255,255,0.2);
      backdrop-filter: blur(10px);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 700;
      font-size: 28px;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 12px 0 0;
      opacity: 0.9;
      font-size: 16px;
    }
    .content {
      padding: 40px 32px;
      text-align: center;
      color: #334155;
    }
    .greeting {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 16px;
      color: #1e293b;
    }
    .message {
      font-size: 16px;
      color: #475569;
      margin-bottom: 32px;
    }
    .ticket {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      border: 2px dashed #cbd5e1;
      border-radius: 16px;
      padding: 32px 24px;
      margin: 32px 0;
      position: relative;
    }
    .ticket::before,
    .ticket::after {
      content: '';
      position: absolute;
      width: 32px;
      height: 32px;
      background: #f8fafc;
      border-radius: 50%;
      top: 50%;
      transform: translateY(-50%);
    }
    .ticket::before { left: -16px; }
    .ticket::after { right: -16px; }
    .event-title {
      font-size: 26px;
      font-weight: 800;
      color: #1e293b;
      margin: 0 0 24px 0;
      letter-spacing: -0.5px;
    }
    .details-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      margin: 24px 0;
      text-align: left;
      font-size: 15px;
    }
    .detail-label {
      color: #64748b;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .detail-value {
      font-weight: 600;
      color: #1e293b;
    }
    .ticket-number {
      background: linear-gradient(135deg, #7c3aed 0%, #ec4899 100%);
      color: white;
      padding: 20px;
      border-radius: 16px;
      font-size: 32px;
      font-weight: 900;
      letter-spacing: 3px;
      margin: 32px 0;
      text-shadow: 0 2px 8px rgba(0,0,0,0.3);
    }
    .ticket-note {
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }
    .footer {
      background: #f8fafc;
      padding: 32px;
      text-align: center;
      color: #94a3b8;
      font-size: 14px;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #7c3aed;
      text-decoration: none;
    }
    @media (max-width: 480px) {
      .container { margin: 16px; border-radius: 12px; }
      .content { padding: 32px 20px; }
      .header { padding: 32px 20px; }
      .details-grid { grid-template-columns: 1fr; }
      .ticket::before, .ticket::after { display: none; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">H</div>
      <h1>You're Confirmed!</h1>
      <p>Your spot is officially reserved</p>
    </div>

    <div class="content">
      <div class="greeting">Hi ${name},</div>
      <div class="message">
        Great news — your registration for <strong>${eventName}</strong> is confirmed!
      </div>

      <div class="ticket">
        <h2 class="event-title">${eventName}</h2>

        <div class="details-grid">
          <div>
            <div class="detail-label">Date & Time</div>
            <div class="detail-value">${formattedDate}</div>
          </div>
          <div>
            <div class="detail-label">Venue</div>
            <div class="detail-value">${eventVenue}</div>
          </div>
        </div>

        <div class="ticket-number">${ticketNumber}</div>
        <p class="ticket-note">
          Present this ticket at check-in • Face ID available on-site
        </p>
      </div>

      <p style="color: #475569; margin-top: 32px;">
        Save this email — it’s your official ticket. We can’t wait to see you there!
      </p>

      <p style="margin-top: 32px;">
        See you soon,<br>
        <strong>The Haaflah Team</strong>
      </p>
    </div>

    <div class="footer">
      <p>© ${new Date().getFullYear()} Haaflah. All rights reserved.</p>
      <p>
        <a href="https://haaflah.com">haaflah.com</a> • 
        <a href="#">Help Center</a> • 
        <a href="#">Contact Support</a>
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
