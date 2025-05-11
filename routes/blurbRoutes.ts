// routes/blurbRoutes.ts
import { Router } from 'express';
import { handleAddBlurb } from '../controllers/blurbController';

const router = Router();

router.put('/', handleAddBlurb);

export default router;
