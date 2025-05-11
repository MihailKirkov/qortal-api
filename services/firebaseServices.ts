import { db } from '../config/firebaseConfig.js';
import { collection, query, doc, where, getDocs, addDoc, Timestamp, updateDoc } from 'firebase/firestore';

const COLLECTIONS = {
    SUBSCRIBERS: 'subscribers',
};

/**
 * Saves or updates a subscriber document in Firestore.
 * @param {Object} params
 * @param {string} params.name
 * @param {string} params.email
 * @returns {Promise<{ success: boolean, data: Object }>}
*/
export const saveSubscriber = async ({ name, email }: { name: string; email: string }) => {
    const timestamp = Timestamp.fromDate(new Date());
    const subscriberData = {
        name,
        email,
        timestamp,
        blurb: ""
    };
    const subscriberRef = collection(db, COLLECTIONS.SUBSCRIBERS);

    try {
        await addDoc(subscriberRef, subscriberData);
        return { success: true, data: subscriberData };
    } catch (error) {
        console.error('[Firestore Error] Failed to save subscriber:', error);
        throw new Error('Could not save subscriber.');
    }
};

/**
 * Adds or updates a blurb to an existing subscriber.
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.blurb
 * @returns {Promise<{ success: boolean, message: string }>}
 */
export const addBlurbByEmail = async ({ email, blurb }: { email: string; blurb: string }) => {
    try {
        const subscriberData = await getSubscriberByEmail(email);
        
        // Check if the subscriber exists (safety check)
        if (!subscriberData) {
            throw new Error(`Subscriber not found for email: ${email}`);
        }

        // Update the subscriber with the new blurb
        const subscriberRef = doc(db, COLLECTIONS.SUBSCRIBERS, subscriberData.id); // use the generated ID

        await updateDoc(subscriberRef, {
            blurb: blurb,
        });

        return { success: true, message: `Blurb added for ${email}` };
    } catch (error) {
        console.error("Failed to add blurb:", error);
        throw new Error('Could not add blurb.');
    }
};



/**
 * Fetches a subscriber by their email address.
 * @param {string} email - The email of the subscriber.
 * @returns {Promise<Object>} - The subscriber data.
 */
const getSubscriberByEmail = async (email: string) => {
    const q = query(collection(db, 'subscribers'), where('email', '==', email));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
        // We return the subscriber document's data, and add the document ID
        return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
    } else {
        throw new Error('Subscriber not found.');
    }
};

/**
 * Retrieves all subscribers with name and blurb.
 * @returns {Promise<Array<{ name: string; blurb: string }>>}
 */
export const getAllBlurbs = async (): Promise<{ name: string; blurb: string }[]> => {
    try {
        const subscriberRef = collection(db, COLLECTIONS.SUBSCRIBERS);
        const snapshot = await getDocs(subscriberRef);

        const subscribers = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                name: data.name || '',
                blurb: data.blurb || '',
            };
        });

        return subscribers;
    } catch (error) {
        console.error('[Firestore Error] Failed to fetch subscribers:', error);
        throw new Error('Could not retrieve subscribers.');
    }
};
