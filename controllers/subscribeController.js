const sendEmail = require('../services/sendEmail');

const handleSubscription = async (req, res) => {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    // TODO: Save to DB here
    console.log('Saving user:', { name, email, message });

    try {
        await sendEmail(name, email);
        res.status(200).json({ message: 'Subscription successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Email failed to send' });
    }
};

module.exports = { handleSubscription };
