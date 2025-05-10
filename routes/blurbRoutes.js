import express from 'express';
import { handleAddBlurb } from '../controllers/blurbController.js';

const router = express.Router();

router.put('/', handleAddBlurb);

export default router;  // ES module export
