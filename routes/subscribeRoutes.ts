import express from 'express';
import { handleSubscription } from '../controllers/subscribeController';

const router = express.Router();

router.post('/', handleSubscription);

export default router;
