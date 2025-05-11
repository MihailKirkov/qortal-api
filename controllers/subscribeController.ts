import { Request, Response } from 'express';
import sendEmail from '../services/sendgridServices';
import { saveSubscriber } from '../services/firebaseServices';
import isEmail from '../utils/validators';

interface SubscribeRequestBody {
    name: string;
    email: string;
}

const handleSubscription = async (
    req: Request<{}, {}, SubscribeRequestBody>,
    res: Response
): Promise<void> => {
    console.log('handleSubscription', req.body)
    const { name, email } = req.body;

    if (!name || !email) {
        res.status(400).json({ error: 'Missing name or email!' });
        return;
    }

    if (!isEmail(email)) {
        res.status(400).json({ error: 'Invalid email format!' });
        return;
    }

    try {
        await saveSubscriber({ name, email });
    } catch (error) {
        console.error('[Subscription Error] Failed to save subscriber:', error);
        res.status(500).json({ error: 'Failed to process subscription. Please try again later.' });
        return;
    }

    try {
        await sendEmail({
            to:'mihailkirkov04@gmail.com',
            subject:'subject',
            templateId:'templateid',
            dynamicTemplateData:{test:'dynamicData'}}
        );
    } catch (error) {
        console.error('[Email Error on Subscription] Failed to send email:', error);
        res.status(500).json({ error: 'Failed to process subscription. Please try again later.' });
        return;
    }

    res.status(200).json({
        message: 'Subscription successful.',
    });
};

export { handleSubscription };
