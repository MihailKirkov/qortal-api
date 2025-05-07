import isEmail from 'validator/lib/isEmail.js';
import sendEmail from '../services/sendEmail.js';  // ES module import
import { saveSubscriber } from '../services/firebaseServices.js';

const handleSubscription = async (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) {
        return res.status(400).json({ error: 'Missing name or email!' });
    }

    // Additional email validation
    if (!isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format!' });
    }

    try {
        // Step 1: Save subscriber to Firebase (must succeed)
        await saveSubscriber(name, email);
    } catch (error) {
        console.error('[Subscription Error] Failed to save subscriber:', error);
        return res.status(500).json({ error: 'Failed to process subscription. Please try again later.' });
    }

    let emailSent = true;
    try {
        // Step 2: Send confirmation email (non-blocking)
        await sendEmail(name, email);
    } catch (error) {
        console.error('[Email Error on Subscription] Failed to send email:', error);
        emailSent = false;
    }

    
    return res.status(emailSent ? 200 : 202).json({
        message: 'Subscription successful.',
        warning: !emailSent ? 'Failed to send subscription email.' : undefined
    });
};

export { handleSubscription };  // ES module export
