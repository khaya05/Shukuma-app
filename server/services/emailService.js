import SibApiV3Sdk from 'sib-api-v3-sdk';
import dotenv from 'dotenv';

dotenv.config();

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

export const sendVerificationEmail = async (email, verificationCode) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = 'Shukuma - Email Verification Code';
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">SHUKUMA</h1>
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
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 40px 0;">
          <p style="color: #999; font-size: 12px; margin: 0;">
            © 2024 Shukuma. All rights reserved.
          </p>
        </div>
      </div>
    `;

    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'Shukuma',
      email: process.env.BREVO_SENDER_EMAIL,
    };

    sendSmtpEmail.to = [{ email: email }];

    const response = await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log('Email sent successfully via Brevo:', response);
    return true;
  } catch (error) {
    console.error('Error sending verification email via Brevo:', error);
    throw error;
  }
};

export const sendWelcomeEmail = async (email, userName) => {
  try {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = 'Welcome to Shukuma!';
    sendSmtpEmail.htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="margin: 0; font-size: 28px;">SHUKUMA</h1>
          <p style="margin: 10px 0 0 0; color: #eab308; font-size: 14px;">Fitness Cards</p>
        </div>
        <div style="background: #f9f9f9; padding: 40px; border-radius: 0 0 8px 8px;">
          <h2 style="color: #1a1a1a; margin-top: 0;">Welcome, ${userName}! 🎉</h2>
          <p style="color: #666; line-height: 1.6;">
            Your email has been verified and you're all set to start your fitness journey with Shukuma!
          </p>
          <p style="color: #666; line-height: 1.6;">
            Start shuffling the deck and pick your first exercise. Whether it's cardio, strength training, or flexibility work, we've got you covered with our unique card-based workout system.
          </p>
          <div style="background: white; border-left: 4px solid #eab308; padding: 20px; margin: 30px 0; border-radius: 4px;">
            <h3 style="color: #1a1a1a; margin-top: 0;">🚀 Get Started:</h3>
            <ul style="color: #666; line-height: 1.8;">
              <li>Shuffle the deck to get a random exercise</li>
              <li>Follow the step-by-step instructions</li>
              <li>Track your progress and build streaks</li>
              <li>Challenge yourself with new exercises</li>
            </ul>
          </div>
          <p style="color: #999; font-size: 12px; margin-top: 40px; border-top: 1px solid #e0e0e0; padding-top: 20px;">
            © 2024 Shukuma. All rights reserved.
          </p>
        </div>
      </div>
    `;

    sendSmtpEmail.sender = {
      name: process.env.BREVO_SENDER_NAME || 'Shukuma',
      email: process.env.BREVO_SENDER_EMAIL,
    };

    sendSmtpEmail.to = [{ email: email }];

    sendSmtpEmail.replyTo = {
      email: process.env.BREVO_SENDER_EMAIL,
      name: process.env.BREVO_SENDER_NAME || 'Shukuma',
    };

    await apiInstance.sendTransacEmail(sendSmtpEmail);
    return true;
  } catch (error) {
    console.error('Error sending welcome email via Brevo:', error);
    throw error;
  }
};