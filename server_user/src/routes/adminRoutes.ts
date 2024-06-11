import { Router } from 'express'
import { createPlan, updatePlan, deletePlan } from '../controllers/adminController';


const router = Router();

router.post('/manage-subscription', createPlan);
router.put('/manage-subscription/:id', updatePlan);
router.delete('/manage-subscription/:id', deletePlan);

export default router;
