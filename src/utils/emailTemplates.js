export function passwordResetTemplate({ name, resetLink }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Reset Your Password</title>
    <style>
      body {
        background-color: #f7f9fb;
        font-family: 'Segoe UI', Roboto, Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 40px auto;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #6c63ff;
        padding: 24px;
        text-align: center;
        color: #fff;
      }
      .header img {
        width: 60px;
        margin-bottom: 10px;
      }
      .body {
        padding: 30px;
        color: #333;
      }
      .body h2 {
        color: #333;
        margin-top: 0;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #6c63ff;
        color: #fff;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
      }
      .footer {
        background-color: #f1f3f7;
        padding: 16px;
        text-align: center;
        color: #777;
        font-size: 13px;
      }
      .footer a {
        color: #6c63ff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="https://i.imgur.com/oZ6M8FZ.png" alt="Haaflah Logo" />
        <h1>Haaflah</h1>
      </div>
      <div class="body">
        <h2>Password Reset Request</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>You recently requested to reset your password for your Haaflah account. Click the button below to set a new password:</p>
        <p style="text-align:center;">
          <a href="${resetLink}" class="button">Reset Password</a>
        </p>
        <p>If you didn’t request this, you can safely ignore this email. This link will expire in 1 hour.</p>
        <p>Stay connected,<br/>The Haaflah Team</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Haaflah. All rights reserved.</p>
        <p><a href="https://haaflah.com">Visit our website</a></p>
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
    <title>Welcome to Haaflah</title>
    <style>
      body {
        background-color: #f7f9fb;
        font-family: 'Segoe UI', Roboto, Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 40px auto;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #6c63ff;
        padding: 24px;
        text-align: center;
        color: #fff;
      }
      .header img {
        width: 60px;
        margin-bottom: 10px;
      }
      .body {
        padding: 30px;
        color: #333;
      }
      .body h2 {
        color: #333;
        margin-top: 0;
      }
      .button {
        display: inline-block;
        padding: 12px 24px;
        background-color: #6c63ff;
        color: #fff;
        border-radius: 6px;
        text-decoration: none;
        font-weight: 600;
      }
      .footer {
        background-color: #f1f3f7;
        padding: 16px;
        text-align: center;
        color: #777;
        font-size: 13px;
      }
      .footer a {
        color: #6c63ff;
        text-decoration: none;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <img src="../assets/logo.svg" alt="Haaflah Logo" />
        <h1>Welcome to Haaflah 🎉</h1>
      </div>
      <div class="body">
        <h2>Hi ${name},</h2>
        <p>Welcome to <strong>Haaflah</strong> — the easiest way to create, manage, and enjoy events.</p>
        <p>With Haaflah, you can:</p>
        <ul>
          <li>Create and manage your own events effortlessly</li>
          <li>Track attendees and check them in using Face ID</li>
          <li>Stream your events live for virtual participants</li>
        </ul>
        <p style="text-align:center;">
          <a href="${process.env.FRONTEND_URL}/dashboard" class="button">Go to Dashboard</a>
        </p>
        <p>We’re excited to have you on board — your journey to better event management starts now!</p>
        <p>– The Haaflah Team</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Haaflah. All rights reserved.</p>
        <p><a href="https://haaflah.com">Visit our website</a></p>
      </div>
    </div>
  </body>
  </html>
  `;
}

export function registrationConfirmationTemplate({ name, eventName, eventDate, eventVenue, ticketNumber }) {
  const formattedDate = new Date(eventDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Registration Confirmed</title>
    <style>
      body {
        background-color: #f7f9fb;
        font-family: 'Segoe UI', Roboto, Arial, sans-serif;
        margin: 0;
        padding: 0;
      }
      .container {
        background-color: #ffffff;
        max-width: 600px;
        margin: 40px auto;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
      .header {
        background-color: #6c63ff;
        padding: 24px;
        text-align: center;
        color: #fff;
      }
      .body {
        padding: 30px;
        color: #333;
      }
      .ticket-box {
        background-color: #f1f3f7;
        padding: 20px;
        border-radius: 8px;
        margin: 20px 0;
        text-align: center;
      }
      .ticket-number {
        font-size: 24px;
        font-weight: bold;
        color: #6c63ff;
        margin: 10px 0;
      }
      .footer {
        background-color: #f1f3f7;
        padding: 16px;
        text-align: center;
        color: #777;
        font-size: 13px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>✅ Registration Confirmed!</h1>
      </div>
      <div class="body">
        <h2>Hi ${name},</h2>
        <p>You're all set! Your registration for <strong>${eventName}</strong> has been confirmed.</p>
        
        <div class="ticket-box">
          <p><strong>Event:</strong> ${eventName}</p>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Venue:</strong> ${eventVenue}</p>
          <div class="ticket-number">${ticketNumber}</div>
          <p style="font-size: 12px; color: #777;">Your Ticket Number</p>
        </div>

        <p>Please keep this email for your records. You'll need your ticket number to check in at the event.</p>
        <p>We look forward to seeing you there!</p>
        <p>– The Haaflah Team</p>
      </div>
      <div class="footer">
        <p>© ${new Date().getFullYear()} Haaflah. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}
