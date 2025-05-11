import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL;

if (!SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined in environment variables.');
}

if (!SENDGRID_SENDER_EMAIL) {
  throw new Error('SENDGRID_SENDER_EMAIL is not defined in environment variables.');
}

sgMail.setApiKey(SENDGRID_API_KEY);

// ✅ TypeScript now knows it's a guaranteed string
export { sgMail, SENDGRID_SENDER_EMAIL };
