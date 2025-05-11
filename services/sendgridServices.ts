// services/sendgridServices.ts

import { sgMail, SENDGRID_SENDER_EMAIL } from '../config/sendgridConfig';

interface SendEmailParams {
    to: string;
    subject: string;
    templateId: string;
    dynamicTemplateData: Record<string, any>;
}

/**
 * Sends an email using SendGrid's dynamic templates
 * @param params - Email details
 */
const sendEmail = async ({
    to,
    subject,
    templateId,
    dynamicTemplateData,
}: SendEmailParams): Promise<{ success: boolean }> => {
    const msg = {
        to: 'test@example.com', // Change to your recipient
        from: 'test@example.com', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
        }
        sgMail
        .send(msg)
        .then(() => {
            console.log('Email sent')
        })
        .catch((error) => {
            console.error(error)
            return {success: false};
        })

    return {success: true};
    // const msg = {
    //     to,
    //     from: SENDGRID_SENDER_EMAIL as string,
    //     subject,
    //     templateId,
    //     dynamic_template_data: dynamicTemplateData,
    // };

    // try {
    //     await sgMail.send(msg);
    //     console.log(`Email sent to ${to}`);
    //     return { success: true };
    // } catch (error) {
    //     console.error('Error sending email:', error);
    //     throw new Error('Failed to send email.');
    // }
};

export default sendEmail;
