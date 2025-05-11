import sgMail from '@sendgrid/mail';  // For sending emails using SendGrid
import { Client } from '@sendgrid/client' // For interacting with SendGrid's API for management
import dotenv from 'dotenv';

dotenv.config();

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL;
const SENDGRID_LIST_ID = process.env.SENDGRID_LIST_ID;
const SENDGRID_FOLLOWUP_EMAIL_ID = process.env.SENDGRID_FOLLOWUP_EMAIL_ID;
const SENDGRID_EBOOK_DELIVERY_EMAIL_ID = process.env.SENDGRID_EBOOK_DELIVERY_EMAIL_ID;


// Ensure required SendGrid environment variables are set
if (!SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not defined in environment variables.');
}

if (!SENDGRID_SENDER_EMAIL) {
  throw new Error('SENDGRID_SENDER_EMAIL is not defined in environment variables.');
}

if (!SENDGRID_LIST_ID) {
  throw new Error('SENDGRID_LIST_ID is not defined in environment variables.');
}


sgMail.setApiKey(SENDGRID_API_KEY);
const sgClient = new Client();
sgClient.setApiKey(SENDGRID_API_KEY);

export { 
  sgMail, // Email sending instance
  sgClient,  // SendGrid client instance
  SENDGRID_SENDER_EMAIL, // Sender's email address (used in email headers)
  SENDGRID_LIST_ID,  // SendGrid list ID (used to add subscribers to lists)
  SENDGRID_FOLLOWUP_EMAIL_ID, // Follow-up email template ID ( currently not used anywhere)
  SENDGRID_EBOOK_DELIVERY_EMAIL_ID // eBook delivery email template ID
};
