// services/sendEmail.js

import { SENDGRID_SENDER_EMAIL, sgMail } from '../config/sendgridConfig.js'; // Import config details

/**
 * Sends an email using SendGrid's dynamic templates
 * @param {Object} params - The email parameters
 * @param {string} params.to - The recipient's email address
 * @param {string} params.subject - The subject of the email
 * @param {string} params.templateId - The dynamic template ID from SendGrid
 * @param {Object} params.dynamicTemplateData - The data to fill the template placeholders
 */

const sendEmail = async ({ to, subject, templateId, dynamicTemplateData }) => {
    const msg = {
        to,
        from: SENDGRID_SENDER_EMAIL,
        subject,
        templateId,
        dynamic_template_data: dynamicTemplateData, // Template-specific dynamic data
    };

    try {
        await sgMail.send(msg);
        console.log(`Email sent to ${to}`);
        return { success: true };
    } catch (error) {
        console.error("Error sending email:", error);
        throw new Error('Failed to send email.');
    }
};

export default sendEmail;
