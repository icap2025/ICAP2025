const createTransporter = require('../config/email');

// Send verification email
exports.sendVerificationEmail = async (to, name, verificationURL) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"ICAP 2025" <${process.env.EMAIL_FROM}>`,
    to,
    subject: 'Email Verification - ICAP 2025',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f3f4f6; }
          .email-wrapper { width: 100%; background-color: #f3f4f6; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
          .header h1 { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
          .header p { font-size: 14px; opacity: 0.95; }
          .content { padding: 40px 30px; }
          .greeting { font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 20px; }
          .message { font-size: 15px; color: #4b5563; margin-bottom: 16px; line-height: 1.8; }
          .button-container { text-align: center; margin: 35px 0; }
          .button { display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; transition: transform 0.2s; }
          .button:hover { transform: translateY(-2px); }
          .divider { height: 1px; background-color: #e5e7eb; margin: 30px 0; }
          .link-section { background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 25px 0; border-left: 3px solid #10b981; }
          .link-label { font-size: 13px; color: #6b7280; margin-bottom: 8px; font-weight: 600; }
          .link-text { font-size: 13px; color: #10b981; word-break: break-all; }
          .info-box { background-color: #ecfdf5; border: 1px solid #10b981; border-radius: 6px; padding: 16px; margin: 25px 0; }
          .info-box p { font-size: 13px; color: #065f46; margin: 0; }
          .footer { background-color: #111827; color: #9ca3af; padding: 30px; text-align: center; }
          .footer p { font-size: 13px; margin-bottom: 8px; }
          .footer-links { margin-top: 15px; }
          .footer-link { color: #10b981; text-decoration: none; margin: 0 10px; font-size: 12px; }
          @media only screen and (max-width: 600px) {
            .email-wrapper { padding: 20px 10px; }
            .header { padding: 30px 20px; }
            .header h1 { font-size: 24px; }
            .content { padding: 30px 20px; }
            .button { padding: 12px 30px; font-size: 14px; }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="container">
            <div class="header">
              <h1>Welcome to ICAP 2025</h1>
              <p>International Conference on Advanced Practices</p>
            </div>
            <div class="content">
              <p class="greeting">Hello ${name},</p>
              <p class="message">Thank you for registering with ICAP 2025. We are excited to have you join our community of researchers and innovators.</p>
              <p class="message">To complete your registration and activate your account, please verify your email address by clicking the button below:</p>
              
              <div class="button-container">
                <a href="${verificationURL}" class="button">Verify Email Address</a>
              </div>

              <div class="divider"></div>

              <div class="link-section">
                <p class="link-label">Or copy and paste this link in your browser:</p>
                <p class="link-text">${verificationURL}</p>
              </div>

              <div class="info-box">
                <p><strong>⏰ Important:</strong> This verification link will expire in 24 hours for security purposes.</p>
              </div>

              <p class="message">If you did not create an account with ICAP 2025, please disregard this email. No further action is required.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 ICAP Conference. All rights reserved.</p>
              <p>International Conference on Advanced Practices</p>
              <div class="footer-links">
                <a href="#" class="footer-link">Contact Support</a>
                <a href="#" class="footer-link">Privacy Policy</a>
                <a href="#" class="footer-link">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};

// Send password reset email
exports.sendPasswordResetEmail = async (to, name, resetURL) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"ICAP 2025" <${process.env.EMAIL_FROM}>`,
    to,
    subject: 'Password Reset - ICAP 2025',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #1f2937; background-color: #f3f4f6; }
          .email-wrapper { width: 100%; background-color: #f3f4f6; padding: 40px 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
          .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; padding: 40px 30px; text-align: center; }
          .header h1 { font-size: 28px; font-weight: 600; margin-bottom: 8px; }
          .header p { font-size: 14px; opacity: 0.95; }
          .content { padding: 40px 30px; }
          .greeting { font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 20px; }
          .message { font-size: 15px; color: #4b5563; margin-bottom: 16px; line-height: 1.8; }
          .button-container { text-align: center; margin: 35px 0; }
          .button { display: inline-block; padding: 14px 40px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 15px; transition: transform 0.2s; }
          .button:hover { transform: translateY(-2px); }
          .divider { height: 1px; background-color: #e5e7eb; margin: 30px 0; }
          .link-section { background-color: #f9fafb; padding: 20px; border-radius: 6px; margin: 25px 0; border-left: 3px solid #10b981; }
          .link-label { font-size: 13px; color: #6b7280; margin-bottom: 8px; font-weight: 600; }
          .link-text { font-size: 13px; color: #10b981; word-break: break-all; }
          .warning-box { background-color: #fef3c7; border: 2px solid #f59e0b; border-radius: 6px; padding: 20px; margin: 25px 0; }
          .warning-box h3 { color: #92400e; font-size: 16px; margin-bottom: 10px; display: flex; align-items: center; gap: 8px; }
          .warning-box p { font-size: 14px; color: #78350f; margin: 0; line-height: 1.6; }
          .security-tips { background-color: #f9fafb; border-radius: 6px; padding: 20px; margin: 25px 0; }
          .security-tips h4 { color: #111827; font-size: 14px; margin-bottom: 12px; }
          .security-tips ul { margin-left: 20px; }
          .security-tips li { font-size: 13px; color: #4b5563; margin-bottom: 8px; }
          .footer { background-color: #111827; color: #9ca3af; padding: 30px; text-align: center; }
          .footer p { font-size: 13px; margin-bottom: 8px; }
          .footer-links { margin-top: 15px; }
          .footer-link { color: #10b981; text-decoration: none; margin: 0 10px; font-size: 12px; }
          @media only screen and (max-width: 600px) {
            .email-wrapper { padding: 20px 10px; }
            .header { padding: 30px 20px; }
            .header h1 { font-size: 24px; }
            .content { padding: 30px 20px; }
            .button { padding: 12px 30px; font-size: 14px; }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="container">
            <div class="header">
              <h1>Password Reset Request</h1>
              <p>ICAP 2025 Security Center</p>
            </div>
            <div class="content">
              <p class="greeting">Hello ${name},</p>
              <p class="message">We received a request to reset the password for your ICAP 2025 account. If you made this request, click the button below to reset your password:</p>
              
              <div class="button-container">
                <a href="${resetURL}" class="button">Reset Password</a>
              </div>

              <div class="divider"></div>

              <div class="link-section">
                <p class="link-label">Or copy and paste this link in your browser:</p>
                <p class="link-text">${resetURL}</p>
              </div>

              <div class="warning-box">
                <h3>🔒 Security Notice</h3>
                <p>This password reset link will expire in <strong>10 minutes</strong> for your account security. If you need more time, please request a new password reset.</p>
              </div>

              <div class="security-tips">
                <h4>Security Tips:</h4>
                <ul>
                  <li>Never share your password with anyone</li>
                  <li>Use a strong, unique password</li>
                  <li>Enable two-factor authentication when available</li>
                  <li>Be cautious of phishing attempts</li>
                </ul>
              </div>

              <p class="message">If you did not request a password reset, please ignore this email or contact our support team immediately if you have security concerns about your account.</p>
            </div>
            <div class="footer">
              <p>&copy; 2025 ICAP Conference. All rights reserved.</p>
              <p>International Conference on Advanced Practices</p>
              <div class="footer-links">
                <a href="#" class="footer-link">Contact Support</a>
                <a href="#" class="footer-link">Privacy Policy</a>
                <a href="#" class="footer-link">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
};