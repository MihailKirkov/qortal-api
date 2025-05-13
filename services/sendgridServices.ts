// services/sendgridServices.ts

import { sgMail, SENDGRID_SENDER_EMAIL, sgClient, SENDGRID_LIST_ID } from '../config/sendgridConfig';

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
export const sendEmail = async ({
    to,
    subject,
    templateId,
    dynamicTemplateData,
}: SendEmailParams): Promise<{ success: boolean }> => {
    if (!SENDGRID_SENDER_EMAIL) {
        return {success: false};
    }
    const msg = {
        to: to,
        from: SENDGRID_SENDER_EMAIL,
        templateId: templateId,
        dynamic_template_data: {...dynamicTemplateData, subject:subject}
    };

    try {
        const [response] = await sgMail.send(msg); // returns an array: [response, body?]
        // console.log('SendGrid response statusCode:', response.statusCode);
        // console.log('SendGrid response headers:', response.headers);
        // console.log('Email payload:', msg);
        return { success: true };
    } catch (error: any) {
        console.error('[SendGrid Email Error]', error?.response?.body || error);
        return { success: false };
    }

};


export const addToSendGridList = async ( email: string ): Promise<void> => {
    const requestBody = {
        list_ids: [SENDGRID_LIST_ID],
        contacts: [{ email }],
    };

    try {
        const [response, body] = await sgClient.request({
            method: 'PUT',
            url: '/v3/marketing/contacts',
            body: requestBody,
        });

        if (response.statusCode === 202) {
            console.log('[SendGrid List] Subscriber added successfully');
        } else {
            console.error('[SendGrid List] Failed to add subscriber:', body);
            throw new Error('Failed to add subscriber to SendGrid list');
        }
    } catch (error) {
        console.error('[SendGrid List] Error:', error);
        throw new Error('Failed to add subscriber to SendGrid list');
    }
};