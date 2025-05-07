import express from 'express';
import { handleSubscription } from '../controllers/subscribeController.js';  // ES module import

const router = express.Router();

router.post('/', handleSubscription);

export default router;  // ES module export
