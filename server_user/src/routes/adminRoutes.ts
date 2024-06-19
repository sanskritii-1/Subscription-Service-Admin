import { Router } from 'express';
import { createPlan, updatePlan, deletePlan, getPlans } from '../controllers/adminController';
import { adminMiddleware, authMiddleware } from '../middlewares/utils/auth';

const router = Router();

router.post('/manage-subscription', authMiddleware, adminMiddleware, createPlan);
router.put('/manage-subscription/:id', authMiddleware, adminMiddleware, updatePlan);
router.delete('/manage-subscription/:id', authMiddleware, adminMiddleware, deletePlan);
router.get('/manage-subscription', getPlans);
router.get('/current-plan-details', adminMiddleware, authMiddleware); //,getCurrentPlan

export default router;
