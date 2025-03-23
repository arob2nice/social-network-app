import { Router } from 'express';
import thoughtsRoutes from './thoughtsRoutes.js';
import usersRoutes from './usersRoutes.js';

const router = Router();

router.use('/apps', thoughtsRoutes);
router.use('/users', usersRoutes);

export default router;
