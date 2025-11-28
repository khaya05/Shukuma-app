import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Shukuma - Email Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 28px;">🃏 SHUKUMA</h1>
            <p style="margin: 10px 0 0 0; color: #eab308; font-size: 14px;">Fitness Cards</p>
          </div>
          <div style="background: #f9f9f9; padding: 40px; border-radius: 0 0 8px 8px;">
            <h2 style="color: #1a1a1a; margin-top: 0;">Verify Your Email</h2>
            <p style="color: #666; line-height: 1.6;">
              Welcome to Shukuma! To complete your account setup, please verify your email using the code below. This code expires in 10 minutes.
            </p>
            <div style="background: white; border: 2px solid #eab308; padding: 20px; text-align: center; border-radius: 8px; margin: 30px 0;">
              <p style="color: #666; margin: 0; font-size: 14px; text-transform: uppercase; letter-spacing: 2px;">Your verification code</p>
              <p style="color: #000000; font-size: 36px; font-weight: bold; margin: 10px 0; letter-spacing: 4px; font-family: monospace;">${verificationCode}</p>
            </div>
            <p style="color: #666; font-size: 14px; margin-top: 30px;">
              If you didn't request this code, please ignore this email. Your email will not be verified unless you enter this code.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 40px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
              © 2024 Shukuma. All rights reserved.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw error;
  }
};
