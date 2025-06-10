// services/firebaseServices.ts
import { db } from '../config/firebaseConfig';
import { Firestore } from 'firebase-admin/firestore';

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
  const timestamp = new Date();
  const subscriberData = {
    name,
    email,
    timestamp,
    blurb: ''
  };

  try {
    await db.collection(COLLECTIONS.SUBSCRIBERS).add(subscriberData);
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

    if (!subscriberData) {
      throw new Error(`Subscriber not found for email: ${email}`);
    }

    await db.collection(COLLECTIONS.SUBSCRIBERS)
      .doc(subscriberData.id)
      .update({ blurb });

    return { success: true, message: `Blurb added for ${email}` };
  } catch (error) {
    console.error('Failed to add blurb:', error);
    throw new Error('Could not add blurb.');
  }
};

/**
 * Fetches a subscriber by their email address.
 * @param {string} email - The email of the subscriber.
 * @returns {Promise<Object>} - The subscriber data.
 */
const getSubscriberByEmail = async (email: string): Promise<{ id: string; [key: string]: any }> => {
  const snapshot = await db.collection(COLLECTIONS.SUBSCRIBERS)
    .where('email', '==', email)
    .get();

  if (!snapshot.empty) {
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
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
    const snapshot = await db.collection(COLLECTIONS.SUBSCRIBERS).get();

    return snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        name: data.name || '',
        blurb: data.blurb || '',
      };
    });
  } catch (error) {
    console.error('[Firestore Error] Failed to fetch subscribers:', error);
    throw new Error('Could not retrieve subscribers.');
  }
};
