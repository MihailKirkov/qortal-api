import sendEmail from '../services/sendgridServices.js';  // ES module import
import { saveSubscriber } from '../services/firebaseServices.js';
import isEmail from 'validator/lib/isEmail.js';

const handleSubscription = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing name or email!' });
    }

    if (!isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format!' });
    }

    try { // Step 1: Save subscriber to Firebase
        await saveSubscriber({name, email});
    } catch (error) {
        console.error('[Subscription Error] Failed to save subscriber:', error);
        return res.status(500).json({ error: 'Failed to process subscription. Please try again later.' });
    }
    
    try { // Step 2: Send Email
        await sendEmail(name, email);
    } catch (error) {
        console.error('[Email Error on Subscription] Failed to send email:', error);
        return res.status(500).json({ error: 'Failed to process subscription. Please try again later.' });
    }

    
    return res.status(200).json({
        message: 'Subscription successful.',
    });
};

export { handleSubscription }; 