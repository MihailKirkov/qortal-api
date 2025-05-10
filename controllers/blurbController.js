import isEmail from "validator/lib/isEmail.js";
import { addBlurbByEmail } from "../services/firebaseServices.js";

const handleAddBlurb = async (req, res) => {
    const {email, blurb} = req.body;
    if (!email || !blurb) {
        return res.status(400).json({ error: 'Missing email or blurb!' });
    }

    // Additional email validation
    if (!isEmail(email)) {
        return res.status(400).json({ error: 'Invalid email format!' });
    }

    try {
        await addBlurbByEmail({email,blurb});
    } catch (error) {
        console.error('[Email Error on Subscription] Failed to add blurb', error);
        return res.status(500).json({ error: 'Failed to add blurb. Please try again later.' });
    }
    
    return res.status(200).json({
        message: 'Blurb successfully added.',
    });
}

export {handleAddBlurb};