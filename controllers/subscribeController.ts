import { Request, Response } from 'express';
import { saveSubscriber } from '../services/firebaseServices';
import isEmail from '../utils/validators';
import { addToSendGridList, sendEmail } from '../services/sendgridServices';
import { SENDGRID_EBOOK_DELIVERY_EMAIL_ID } from '../config/sendgridConfig';


// Interface for the expected request body from the /subscribe endpoint
interface SubscribeRequestBody {
    name: string;
    email: string;
}


/**
 * Handles user subscription by validating the input, sending a welcome email,
 * saving the subscriber to Firestore, and adding the email to the SendGrid list.
 */
const handleSubscription = async (
    req: Request<{}, {}, SubscribeRequestBody>,
    res: Response
): Promise<void> => {
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({ error: 'Missing name or email!' });
        return;
    }
    if (!isEmail(email)) {
        res.status(400).json({ error: 'Invalid email format!' });
        return;
    }

    try { // Sending the initial eBook delivery email
        await sendEmail({
            to: email,
            subject:'Your Qortal Ebook is here. Thanks for signing up!',
            templateId: SENDGRID_EBOOK_DELIVERY_EMAIL_ID as string,
            dynamicTemplateData:{first_name:name}}
        );
    } catch (error) {
        console.error('[Email Error on Subscription] Failed to send email:', error);
        res.status(500).json({ error: 'Failed to process subscription. Please try again later.' });
        return;
    }

    try { // Saving the subscriber's data in Firestore
        await saveSubscriber({ name, email });
    } catch (error) {
        console.error('[Subscription Error] Failed to save subscriber:', error);
        res.status(500).json({ error: 'Failed to process subscription. Please try again later.' });
        return;
    }

    try {// Adding the subscriber to SendGrid list for marketing purposes
        await addToSendGridList(email);
    } catch (error) {
        console.error('[SendGrid List Error] Failed to add subscriber:', error);
        res.status(500).json({ error: 'Failed to add subscriber to SendGrid list. Please try again later.' });
        return;
    }


    res.status(200).json({
        message: 'Subscription successful.',
    });
};

export { handleSubscription };
