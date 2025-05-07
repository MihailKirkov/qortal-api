import express from 'express';
import { handleAddBlurb } from '../controllers/blurbController.js';

const router = express.Router();

router.post('/', handleAddBlurb);

export default router;  // ES module export
