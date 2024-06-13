import { Router } from 'express';
import { createPlan, updatePlan, deletePlan, getPlans } from '../controllers/adminController';

const router = Router();

router.post('/manage-subscription', createPlan);
router.put('/manage-subscription/:id', updatePlan);
router.delete('/manage-subscription/:id', deletePlan);
router.get('/manage-subscription', getPlans);

export default router;
