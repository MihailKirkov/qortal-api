import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL;

sgMail.setApiKey(SENDGRID_API_KEY);

export { sgMail, SENDGRID_SENDER_EMAIL };
