import { Request, Response } from 'express';
import isEmail from '../utils/validators';
import { addBlurbByEmail, getAllBlurbs } from '../services/firebaseServices';

// Interface defining the structure of the expected request body for /submit-blurt endpoint
interface BlurbRequestBody {
    email: string,
    blurb: string
}

/**
 * Handles the submission of a blurb by a subscriber.
 * This updates the subscriber's document in Firestore with the new blurb.
 */
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

    try { // Update the blurb in Firestore for the subscriber
        await addBlurbByEmail({ email, blurb });
    } catch (error) {
        console.error('[Error while adding a blurb] Failed to add blurb.', error);
        res.status(500).json({ error: 'Failed to add blurb. Please try again later.' });
        return;
    }

    res.status(200).json({ message: 'Blurb successfully added.' });
};

/**
 * Retrieves all blurbs submitted by subscribers from Firestore.
 * This is used for viewing all blurbs.
 */
export const handleGetAllBlurbs = async (
    req: Request<{}, {}, {}>, // No request body needed for this endpoint
    res: Response
): Promise<void> => {
    try { // Fetch all blurbs from Firestore
        const data = await getAllBlurbs();
        res.status(200).json(data);
    } catch (error) {
        console.error("[Error while getting all blurbs] Failed in handleGetAllBlurbs.", error);
        res.status(500).json({ error: 'Failed to get blurbs. Please try again later'});
    }
}