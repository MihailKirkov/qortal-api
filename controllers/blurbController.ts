// controllers/blurbController.ts
import { Request, Response } from 'express';
import isEmail from '../utils/validators';
import { addBlurbByEmail } from '../services/firebaseServices';

interface BlurbRequestBody {
    email: string,
    blurb: string
}

export const handleAddBlurb = async (
    req: Request<{}, {}, BlurbRequestBody>,
    res: Response
): Promise<void> => {
    const { email, blurb } = req.body;

    if (!email || !blurb) {
        res.status(400).json({ error: 'Missing email or blurb!' });
        return;
    }

    if (!isEmail(email)) {
        res.status(400).json({ error: 'Invalid email format!' });
        return;
    }

    try {
        await addBlurbByEmail({ email, blurb });
        res.status(200).json({ message: 'Blurb successfully added.' });
    } catch (error) {
        console.error('[Email Error on Subscription] Failed to add blurb', error);
        res.status(500).json({ error: 'Failed to add blurb. Please try again later.' });
    }
};
